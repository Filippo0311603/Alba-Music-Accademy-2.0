import express from 'express';
import session from 'express-session';
import fsSync from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  getAllBookings,
  getBookingsByDate,
  createBooking,
  updateBookingStatus,
  findBookingByConfirmToken,
  findBookingByCancelToken,
  getBookingsNeedingReminder,
  updateReminderSent,
  getUserByEmail,
  getUserById,
  createUser,
  getUserBookings,
  markUserEmailVerified,
  updateConfirmationSent,
} from './lib/supabase-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envLocalPath = path.resolve(__dirname, '..', '.env.local');
const envPath = path.resolve(__dirname, '..', '.env');

dotenv.config({path: envPath});
dotenv.config({path: envLocalPath, override: true});

const app = express();
const port = Number(process.env.BOOKING_SERVER_PORT || 8787);
function normalizePublicAppUrl(rawValue, fallbackPort) {
  const fallback = `http://localhost:${fallbackPort}`;
  const value = String(rawValue || fallback).trim();

  try {
    const parsed = new URL(value);
    parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    if (parsed.pathname.endsWith('/api')) {
      parsed.pathname = parsed.pathname.slice(0, -4) || '/';
    }
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

const publicAppUrl = normalizePublicAppUrl(process.env.PUBLIC_APP_URL, port);
const frontendAppUrl = normalizePublicAppUrl(
  process.env.FRONTEND_APP_URL || String(process.env.ADMIN_ALLOWED_ORIGINS || '').split(',')[0],
  port,
);
const reminderWindowMs = 24 * 60 * 60 * 1000;
const smtpTimeoutMs = Number(process.env.SMTP_TIMEOUT_MS || 12000);
const mailjetApiTimeoutMs = Number(process.env.MAILJET_API_TIMEOUT_MS || 15000);
const mailjetApiEndpoint = String(process.env.MAILJET_API_ENDPOINT || 'https://api.mailjet.com/v3.1/send').trim();
const smtpFallbackPorts = String(process.env.SMTP_FALLBACK_PORTS || '587,465,2525')
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value > 0);
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-now';
const sessionSecret = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(48).toString('hex');
const sessionTtlHours = Number(process.env.ADMIN_SESSION_TTL_HOURS || 8);
const isProduction = process.env.NODE_ENV === 'production';
const envJwtSecret = String(process.env.JWT_SECRET || '').trim();
const jwtSecret = envJwtSecret || (isProduction ? '' : crypto.randomBytes(32).toString('hex'));
const bcryptRounds = 10;
const defaultAdminPassword = adminPassword === 'change-me-now';
const weakSessionSecret = sessionSecret.length < 32;
const weakJwtSecret = envJwtSecret.length > 0 && envJwtSecret.length < 32;

const loginAttempts = new Map();
const loginWindowMs = 15 * 60 * 1000;
const maxLoginAttempts = 5;

function parseAllowedOrigins() {
  const fromEnv = String(process.env.ADMIN_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const defaults = [
    publicAppUrl,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ];

  const origins = new Set();
  for (const value of [...defaults, ...fromEnv]) {
    try {
      origins.add(new URL(value).origin);
    } catch {
      // Ignore invalid origins in env values.
    }
  }

  return origins;
}

const allowedAdminOrigins = parseAllowedOrigins();

function parseCorsAllowedOrigins() {
  const fromEnv = String(process.env.CORS_ALLOWED_ORIGINS || process.env.ADMIN_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const defaults = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ];

  const origins = new Set();
  for (const value of [...defaults, ...fromEnv]) {
    try {
      origins.add(new URL(value).origin);
    } catch {
      // Ignore invalid origins in env values.
    }
  }

  return origins;
}

const corsAllowedOrigins = parseCorsAllowedOrigins();

if (defaultAdminPassword) {
  console.warn('[admin-auth] ADMIN_PASSWORD usa il valore di default: aggiornalo prima del deploy.');
}

if (weakSessionSecret) {
  console.warn('[admin-auth] ADMIN_SESSION_SECRET dovrebbe avere almeno 32 caratteri.');
}

if (!jwtSecret) {
  console.warn('[auth] JWT_SECRET non configurata: token login e conferma email non affidabili dopo i riavvii.');
} else if (weakJwtSecret) {
  console.warn('[auth] JWT_SECRET dovrebbe avere almeno 32 caratteri.');
}

if (isProduction && (defaultAdminPassword || weakSessionSecret || !jwtSecret || weakJwtSecret)) {
  throw new Error('Hardening check failed: imposta ADMIN_PASSWORD sicura, ADMIN_SESSION_SECRET >= 32 caratteri e JWT_SECRET >= 32 caratteri.');
}

app.disable('x-powered-by');
if (isProduction) {
  app.set('trust proxy', 1);
}

app.use((req, res, next) => {
  const origin = String(req.get('origin') || '').trim();

  if (origin) {
    let normalizedOrigin = '';
    try {
      normalizedOrigin = new URL(origin).origin;
    } catch {
      normalizedOrigin = '';
    }

    if (normalizedOrigin && corsAllowedOrigins.has(normalizedOrigin)) {
      res.setHeader('Access-Control-Allow-Origin', normalizedOrigin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Max-Age', '86400');
    }
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

app.use(express.json({limit: '32kb'}));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
app.use(
  session({
    name: 'alba_admin_session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProduction,
      maxAge: sessionTtlHours * 60 * 60 * 1000,
    },
  }),
);

let mailTransporterPromise;

function getClientIdentifier(req) {
  return String(req.ip || req.connection?.remoteAddress || 'unknown');
}

function getLoginAttemptEntry(req) {
  const key = getClientIdentifier(req);
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry || now > entry.expiresAt) {
    const fresh = {count: 0, expiresAt: now + loginWindowMs};
    loginAttempts.set(key, fresh);
    return fresh;
  }

  return entry;
}

function registerFailedLogin(req) {
  const entry = getLoginAttemptEntry(req);
  entry.count += 1;
}

function clearLoginAttempts(req) {
  const key = getClientIdentifier(req);
  loginAttempts.delete(key);
}

function isLoginRateLimited(req) {
  const entry = getLoginAttemptEntry(req);
  return entry.count >= maxLoginAttempts;
}

function requireAllowedAdminOrigin(req, res, next) {
  const origin = String(req.get('origin') || '');
  if (!origin) {
    return next();
  }

  try {
    const normalizedOrigin = new URL(origin).origin;
    if (allowedAdminOrigins.has(normalizedOrigin)) {
      return next();
    }
  } catch {
    return res.status(403).json({error: 'origin non valido'});
  }

  return res.status(403).json({error: 'origin non autorizzato'});
}

function parseBookingStart(date, time) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function validateBookingInput(payload) {
  const required = ['date', 'time'];
  for (const key of required) {
    if (!payload[key] || typeof payload[key] !== 'string' || !payload[key].trim()) {
      return `${key} is required`;
    }
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const timePattern = /^\d{2}:\d{2}$/;
  if (!datePattern.test(payload.date)) {
    return 'date must be in YYYY-MM-DD format';
  }
  if (!timePattern.test(payload.time)) {
    return 'time must be in HH:mm format';
  }

  const startAt = parseBookingStart(payload.date, payload.time);
  if (Number.isNaN(startAt.getTime())) {
    return 'date/time is invalid';
  }

  if (startAt.getTime() <= Date.now()) {
    return 'booking must be in the future';
  }

  return null;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;

function isValidEmail(value) {
  return emailPattern.test(String(value || '').trim());
}

function isValidPhone(value) {
  return phonePattern.test(String(value || '').trim());
}

async function getMailer() {
  if (mailTransporterPromise) {
    return mailTransporterPromise;
  }

  mailTransporterPromise = (async () => {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT || 587);

    if (host && user && pass) {
      return {
        kind: 'smtp',
        host,
        user,
        pass,
        ports: [smtpPort, ...smtpFallbackPorts.filter((value) => value !== smtpPort)],
      };
    }

    const testAccount = await nodemailer.createTestAccount();
    return {
      kind: 'ethereal',
      user: testAccount.user,
      pass: testAccount.pass,
    };
  })();

  return mailTransporterPromise;
}

async function sendBookingEmail({to, subject, html, text}) {
  const mailer = await getMailer();
  const from = process.env.MAIL_FROM || 'Alba Music Academy <no-reply@albamusic.local>';
  const mailPayload = {from, to, subject, html, text};

  if (mailer.kind === 'ethereal') {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: mailer.user,
        pass: mailer.pass,
      },
      connectionTimeout: smtpTimeoutMs,
      greetingTimeout: smtpTimeoutMs,
      socketTimeout: smtpTimeoutMs,
    });

    const info = await transporter.sendMail(mailPayload);
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log(`[mail-preview] ${preview}`);
    }
    return;
  }

  const smtpHost = String(process.env.SMTP_HOST || '').toLowerCase();
  const shouldTryMailjetApiFirst = smtpHost.includes('mailjet') && process.env.MAILJET_API_ENABLED !== 'false';

  if (shouldTryMailjetApiFirst) {
    const match = from.match(/^(.*)<([^>]+)>\s*$/);
    const fromName = match ? match[1].trim().replace(/^"|"$/g, '') : 'Alba Music Academy';
    const fromEmail = match ? match[2].trim() : from.trim();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), mailjetApiTimeoutMs);

    try {
      const auth = Buffer.from(`${mailer.user}:${mailer.pass}`).toString('base64');
      const response = await fetch(mailjetApiEndpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {Email: fromEmail, Name: fromName || 'Alba Music Academy'},
              To: [{Email: String(to)}],
              Subject: String(subject),
              TextPart: String(text || ''),
              HTMLPart: String(html || ''),
            },
          ],
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`mailjet api ${response.status}: ${details}`);
      }

      return;
    } catch (error) {
      console.error('[mailjet-api] send failed, fallback to smtp', {
        message: error?.message,
        name: error?.name,
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  let lastError = null;
  for (const portOption of mailer.ports) {
    const transporter = nodemailer.createTransport({
      host: mailer.host,
      port: portOption,
      secure: portOption === 465,
      requireTLS: portOption !== 465,
      auth: {user: mailer.user, pass: mailer.pass},
      connectionTimeout: smtpTimeoutMs,
      greetingTimeout: smtpTimeoutMs,
      socketTimeout: smtpTimeoutMs,
      tls: {
        minVersion: 'TLSv1.2',
      },
    });

    try {
      const info = await transporter.sendMail(mailPayload);
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) {
        console.log(`[mail-preview] ${preview}`);
      }
      return;
    } catch (error) {
      lastError = error;
      console.error(`[smtp] send failed on port ${portOption}`, {
        code: error?.code,
        responseCode: error?.responseCode,
        command: error?.command,
        message: error?.message,
      });
    }
  }

  throw lastError || new Error('smtp send failed on all configured ports');
}

function buildCancelUrl(cancelToken) {
  return `${frontendAppUrl}/booking/cancel/${cancelToken}`;
}

function buildConfirmUrl(confirmToken) {
  return `${frontendAppUrl}/booking/confirm/${confirmToken}`;
}

function buildRegistrationConfirmApiUrl(token) {
  return `${publicAppUrl}/api/auth/confirm-email/${token}`;
}

async function confirmBookingByToken(confirmToken) {
  const booking = await findBookingByConfirmToken(confirmToken);

  if (!booking) {
    return {type: 'not-found'};
  }

  if (booking.status === 'cancelled') {
    return {type: 'cancelled', booking};
  }

  if (booking.status === 'confirmed') {
    return {type: 'already-confirmed', booking};
  }

  // Check for slot conflict
  const bookings = await getBookingsByDate(booking.date);
  const conflict = bookings.find(
    (b) => b.id !== booking.id && b.status === 'confirmed' && b.time === booking.time,
  );

  if (conflict) {
    await updateBookingStatus(booking.id, 'cancelled', {
      canceled_at: new Date().toISOString(),
    });
    return {type: 'slot-taken', booking};
  }

  const confirmed = await updateBookingStatus(booking.id, 'confirmed', {
    confirmed_at: new Date().toISOString(),
  });

  return {type: 'confirmed', booking: confirmed};
}

async function cancelBookingByToken(cancelToken) {
  const booking = await findBookingByCancelToken(cancelToken);

  if (!booking) {
    return {type: 'not-found'};
  }

  if (booking.status === 'cancelled') {
    return {type: 'already-cancelled', booking};
  }

  const cancelled = await updateBookingStatus(booking.id, 'cancelled', {
    canceled_at: new Date().toISOString(),
  });

  return {type: 'cancelled', booking: cancelled};
}

function serializeBookingForAdmin(booking) {
  return {
    id: booking.id,
    fullName: booking.full_name,
    email: booking.email,
    phone: booking.phone,
    notes: booking.notes,
    date: booking.date,
    time: booking.time,
    status: booking.status,
    createdAt: booking.created_at,
    confirmedAt: booking.confirmed_at,
    confirmationSentAt: booking.confirmation_sent_at,
    reminderSentAt: booking.reminder_sent_at,
    canceledAt: booking.canceled_at,
  };
}

function safeText(value) {
  return Buffer.from(String(value || ''), 'utf8');
}

function timingSafeCompare(left, right) {
  const a = safeText(left);
  const b = safeText(right);

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

function toBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function signTokenPayload(encodedPayload) {
  return crypto.createHmac('sha256', jwtSecret).update(encodedPayload).digest('base64url');
}

function generateSignedToken(payload, ttlSeconds) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const signedPayload = {
    ...payload,
    iat: nowSeconds,
    exp: nowSeconds + ttlSeconds,
  };
  const encodedPayload = toBase64Url(JSON.stringify(signedPayload));
  const signature = signTokenPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function verifySignedToken(token) {
  const [encodedPayload, receivedSignature] = String(token || '').split('.');
  if (!encodedPayload || !receivedSignature) {
    return null;
  }

  const expectedSignature = signTokenPayload(encodedPayload);
  if (!timingSafeCompare(receivedSignature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function generateAccessToken(user) {
  return generateSignedToken(
    {
      type: 'access',
      sub: user.id,
      email: user.email,
    },
    7 * 24 * 60 * 60,
  );
}

function generateEmailConfirmationToken(user) {
  return generateSignedToken(
    {
      type: 'email-confirmation',
      sub: user.id,
      email: user.email,
    },
    24 * 60 * 60,
  );
}

function extractBearerToken(req) {
  const authHeader = String(req.get('authorization') || '');
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }
  return token.trim();
}

async function requireUserAuth(req, res, next) {
  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({error: 'Not authenticated'});
  }

  const payload = verifySignedToken(token);
  if (!payload || payload.type !== 'access' || !payload.sub) {
    return res.status(401).json({error: 'Invalid token'});
  }

  try {
    const user = await getUserById(payload.sub);
    if (!user) {
      return res.status(401).json({error: 'User not found'});
    }
    req.authUser = user;
    return next();
  } catch (error) {
    console.error('requireUserAuth error', error);
    return res.status(500).json({error: 'Internal server error'});
  }
}

function requireAdminSession(req, res, next) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({error: 'not authenticated'});
  }

  return next();
}

function regenerateSession(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function sendConfirmationEmail(booking) {
  const confirmUrl = buildConfirmUrl(booking.confirmToken);
  const cancelUrl = buildCancelUrl(booking.cancelToken);
  const subject = 'Conferma la tua prenotazione - Alba Music Academy';
  const text = `Ciao ${booking.fullName},\n\nabbiamo ricevuto la tua richiesta per il ${booking.date} alle ${booking.time}.\n\nPer completare la prenotazione clicca qui: ${confirmUrl}\n\nSe vuoi annullare la richiesta: ${cancelUrl}\n\nGrazie.`;
  const html = `
    <p>Ciao <strong>${booking.fullName}</strong>,</p>
    <p>abbiamo ricevuto la tua richiesta per <strong>${booking.date}</strong> alle <strong>${booking.time}</strong>.</p>
    <p>Per completare la prenotazione clicca su <strong>Conferma prenotazione</strong>:</p>
    <p style="display:flex;gap:10px;flex-wrap:wrap;">
      <a href="${confirmUrl}" style="display:inline-block;padding:10px 16px;background:#61dee3;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:700;">Conferma prenotazione</a>
      <a href="${cancelUrl}" style="display:inline-block;padding:10px 16px;background:#222;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;border:1px solid #555;">Annulla richiesta</a>
    </p>
    <p>Grazie,<br/>Alba Music Academy</p>
  `;

  await sendBookingEmail({to: booking.email, subject, text, html});
}

async function sendReminderEmail(booking) {
  const cancelUrl = buildCancelUrl(booking.cancelToken);
  const subject = 'Promemoria prenotazione - manca 1 giorno';
  const text = `Ciao ${booking.fullName},\n\nti ricordiamo che domani hai la prenotazione alle ${booking.time}.\n\nSe vuoi disdire: ${cancelUrl}`;
  const html = `
    <p>Ciao <strong>${booking.fullName}</strong>,</p>
    <p>ti ricordiamo che <strong>domani</strong> hai la prenotazione alle <strong>${booking.time}</strong>.</p>
    <p>Se vuoi disdire, clicca qui:</p>
    <p><a href="${cancelUrl}" style="display:inline-block;padding:10px 16px;background:#61dee3;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:700;">Disdici prenotazione</a></p>
    <p>A presto,<br/>Alba Music Academy</p>
  `;

  await sendBookingEmail({to: booking.email, subject, text, html});
}

async function sendRegistrationConfirmationEmail(user, confirmationToken) {
  const confirmationUrl = buildRegistrationConfirmApiUrl(confirmationToken);
  const subject = 'Conferma il tuo account - Alba Music Academy';
  const text = `Ciao ${user.full_name},\n\nconferma la registrazione cliccando qui: ${confirmationUrl}\n\nIl link scade tra 24 ore.`;
  const html = `
    <p>Ciao <strong>${user.full_name}</strong>,</p>
    <p>grazie per esserti registrato su Alba Music Academy.</p>
    <p>Per attivare il tuo account clicca qui:</p>
    <p>
      <a href="${confirmationUrl}" style="display:inline-block;padding:10px 16px;background:#61dee3;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:700;">Conferma registrazione</a>
    </p>
    <p>Il link scade tra 24 ore.</p>
    <p>Grazie,<br/>Alba Music Academy</p>
  `;

  await sendBookingEmail({to: user.email, subject, text, html});
}

// ============ SERVE STATIC FRONTEND ============
const distPath = path.join(__dirname, '..', 'dist');
const distExists = (() => {
  try {
    fsSync.accessSync(distPath);
    return true;
  } catch {
    return false;
  }
})();

if (distExists) {
  app.use(express.static(distPath, {
    maxAge: '1h',
    etag: false
  }));

  // SPA fallback: serve index.html for non-API routes
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
      return res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) next();
      });
    }
    next();
  });
}

app.get('/api/slots', async (req, res) => {
  try {
    const date = String(req.query.date || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({error: 'date must be in YYYY-MM-DD format'});
    }

    const bookings = await getBookingsByDate(date);
    const bookedTimes = bookings.map((b) => b.time);

    res.json({bookedTimes});
  } catch (error) {
    console.error('[api] /api/slots error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/api/bookings', requireUserAuth, async (req, res) => {
  try {
    const payload = req.body || {};
    const validationError = validateBookingInput(payload);
    if (validationError) {
      return res.status(400).json({error: validationError});
    }

    // Check for time slot conflict
    const existingBookings = await getBookingsByDate(payload.date);
    const conflict = existingBookings.find((b) => b.time === payload.time);

    if (conflict) {
      return res.status(409).json({error: 'slot is already booked'});
    }

    const user = req.authUser;
    if (!user?.verified_email) {
      return res.status(403).json({error: 'Conferma prima la tua email per prenotare'});
    }

    // Create booking
    const booking = await createBooking({
      user_id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: String(user.phone || '').trim() || null,
      notes: String(payload.notes || '').trim() || null,
      date: payload.date,
      time: payload.time,
      confirm_token: crypto.randomBytes(24).toString('hex'),
      cancel_token: crypto.randomBytes(24).toString('hex'),
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    let emailSent = false;

    try {
      await sendConfirmationEmail({
        ...booking,
        fullName: booking.full_name,
        confirmToken: booking.confirm_token,
        cancelToken: booking.cancel_token,
      });
      await updateConfirmationSent(booking.id);
      emailSent = true;
    } catch (error) {
      console.error('failed to send confirmation email', error);
    }

    res.status(201).json({
      bookingId: booking.id,
      email: booking.email,
      emailSent,
      message: emailSent
        ? `Richiesta prenotazione inviata. Controlla ${booking.email} e conferma dalla email per completare.`
        : `Richiesta creata, ma non siamo riusciti a inviare la email di conferma a ${booking.email}. Riprova o contatta l'accademia.`,
    });
  } catch (error) {
    console.error('[api] POST /api/bookings error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

async function handleConfirmBooking(req, res) {
  const {token} = req.params;
  return res.redirect(302, `${frontendAppUrl}/booking/confirm/${token}`);
}

async function handleConfirmBookingActionApi(req, res) {
  const {token} = req.params;
  const outcome = await confirmBookingByToken(token);

  if (outcome.type === 'not-found') {
    return res.status(404).json({
      type: outcome.type,
      title: 'Richiesta non trovata',
      message: 'Il link non e valido.',
    });
  }

  if (outcome.type === 'cancelled') {
    return res.status(409).json({
      type: outcome.type,
      title: 'Richiesta annullata',
      message: 'Questa prenotazione e gia stata annullata.',
    });
  }

  if (outcome.type === 'already-confirmed') {
    return res.status(200).json({
      type: outcome.type,
      title: 'Prenotazione gia confermata',
      message: 'La tua prenotazione risulta gia attiva.',
    });
  }

  if (outcome.type === 'slot-taken') {
    return res.status(409).json({
      type: outcome.type,
      title: 'Slot non piu disponibile',
      message: 'Lo slot e stato gia confermato da un altra richiesta. Prenota un altro orario dal sito.',
    });
  }

  return res.status(200).json({
    type: outcome.type,
    title: 'Prenotazione confermata',
    message: 'La tua prenotazione e ora attiva. Ti aspettiamo in accademia.',
  });
}

app.get('/api/bookings/confirm/:token', handleConfirmBooking);
app.get('/bookings/confirm/:token', handleConfirmBooking);
app.get('/booking/confirm/:token', handleConfirmBooking);
app.get('/api/bookings/action/confirm/:token', handleConfirmBookingActionApi);

async function handleCancelBooking(req, res) {
  const {token} = req.params;
  return res.redirect(302, `${frontendAppUrl}/booking/cancel/${token}`);
}

async function handleCancelBookingActionApi(req, res) {
  const {token} = req.params;
  const outcome = await cancelBookingByToken(token);

  if (outcome.type === 'not-found') {
    return res.status(404).json({
      type: outcome.type,
      title: 'Prenotazione non trovata',
      message: 'Il link non e valido.',
    });
  }

  if (outcome.type === 'already-cancelled') {
    return res.status(200).json({
      type: outcome.type,
      title: 'Prenotazione gia disdetta',
      message: 'Lo slot risulta gia disponibile.',
    });
  }

  return res.status(200).json({
    type: outcome.type,
    title: 'Prenotazione disdetta con successo',
    message: 'Lo slot e stato liberato ed e di nuovo disponibile sul sito.',
  });
}

app.get('/api/bookings/cancel/:token', handleCancelBooking);
app.get('/bookings/cancel/:token', handleCancelBooking);
app.get('/booking/cancel/:token', handleCancelBooking);
app.get('/api/bookings/action/cancel/:token', handleCancelBookingActionApi);

app.post('/api/admin/auth/login', async (req, res) => {
  try {
    if (isLoginRateLimited(req)) {
      return res.status(429).json({error: 'Troppi tentativi di login. Riprova tra 15 minuti.'});
    }

    const username = String(req.body?.username || '').trim();
    const password = String(req.body?.password || '');

    const usernameOk = timingSafeCompare(username, adminUsername);
    const passwordOk = timingSafeCompare(password, adminPassword);

    if (!usernameOk || !passwordOk) {
      registerFailedLogin(req);
      return res.status(401).json({error: 'Credenziali non valide'});
    }

    await regenerateSession(req);
    req.session.isAdmin = true;
    req.session.adminUser = adminUsername;
    clearLoginAttempts(req);

    return res.json({message: 'Login effettuato', username: adminUsername});
  } catch (error) {
    console.error('login error', error);
    return res.status(500).json({error: 'Errore login admin'});
  }
});

app.get('/api/admin/auth/me', (req, res) => {
  if (!req.session?.isAdmin) {
    return res.status(401).json({authenticated: false});
  }

  return res.json({
    authenticated: true,
    username: req.session.adminUser || adminUsername,
  });
});

app.post('/api/admin/auth/logout', requireAllowedAdminOrigin, async (req, res) => {
  try {
    if (req.session) {
      await destroySession(req);
    }

    res.clearCookie('alba_admin_session');
    return res.json({message: 'Logout eseguito'});
  } catch (error) {
    console.error('logout error', error);
    return res.status(500).json({error: 'Errore logout admin'});
  }
});

app.get('/api/admin/bookings', requireAdminSession, async (req, res) => {
  try {
    const bookings = await getAllBookings();
    return res.json({bookings: bookings.map(serializeBookingForAdmin)});
  } catch (error) {
    console.error('[api] GET /api/admin/bookings error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/api/admin/bookings/:id/cancel', requireAllowedAdminOrigin, requireAdminSession, async (req, res) => {
  try {
    const {id} = req.params;
    const booking = await findBookingByConfirmToken(id) || await findBookingByCancelToken(id);

    if (!booking || booking.id !== id) {
      return res.status(404).json({error: 'booking not found'});
    }

    if (booking.status === 'cancelled') {
      return res.json({message: 'booking is already cancelled'});
    }

    await updateBookingStatus(id, 'cancelled', {
      canceled_at: new Date().toISOString(),
    });

    return res.json({message: 'booking cancelled successfully'});
  } catch (error) {
    console.error('[api] POST /api/admin/bookings/:id/cancel error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/api/admin/reminders/run', requireAllowedAdminOrigin, requireAdminSession, async (req, res) => {
  await processReminders();
  return res.json({message: 'reminder worker executed'});
});

app.post('/api/admin/smtp/test', requireAllowedAdminOrigin, requireAdminSession, async (req, res) => {
  try {
    const to = String(req.body?.to || '').trim().toLowerCase();
    if (!to) {
      return res.status(400).json({error: 'email destinatario richiesta'});
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(to)) {
      return res.status(400).json({error: 'email destinatario non valida'});
    }

    await sendBookingEmail({
      to,
      subject: 'Test SMTP Alba Music Academy',
      text: 'Questa e una email di test SMTP inviata dal pannello admin.',
      html: '<p>Questa e una email di test SMTP inviata dal pannello admin.</p>',
    });

    return res.json({message: 'Email di test inviata'});
  } catch (error) {
    console.error('smtp test error', error);
    return res.status(500).json({error: 'Invio SMTP fallito. Controlla configurazione SMTP.'});
  }
});

// ============ USER AUTH ENDPOINTS ============

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body || {};

    if (!email || !password || !fullName || !phone) {
      return res.status(400).json({error: 'Email, password, full name and phone are required'});
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({error: 'Invalid email format'});
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({error: 'Numero di telefono non valido'});
    }

    if (password.length < 6) {
      return res.status(400).json({error: 'Password must be at least 6 characters'});
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({error: 'User already exists with this email'});
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, bcryptRounds);

    // Create user
    const user = await createUser({
      email: email.toLowerCase().trim(),
      full_name: fullName.trim(),
      phone: String(phone).trim(),
      password_hash: passwordHash,
      verified_email: false,
      created_at: new Date().toISOString(),
    });

    let confirmationEmailSent = false;
    try {
      const confirmationToken = generateEmailConfirmationToken(user);
      await sendRegistrationConfirmationEmail(user, confirmationToken);
      confirmationEmailSent = true;
    } catch (mailError) {
      console.error('[api] POST /api/auth/signup confirmation mail error', mailError);
    }

    return res.status(201).json({
      message: confirmationEmailSent
        ? 'Registrazione completata. Controlla la tua email per confermare l account.'
        : 'Registrazione completata, ma non siamo riusciti a inviare l email di conferma. Contatta la segreteria.',
      confirmationEmailSent,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone || String(phone).trim(),
      },
    });
  } catch (error) {
    console.error('[api] POST /api/auth/signup error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({error: 'Email and password required'});
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({error: 'Invalid email or password'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({error: 'Invalid email or password'});
    }

    if (!user.verified_email) {
      return res.status(403).json({error: 'Conferma prima la tua email per accedere'});
    }

    const accessToken = generateAccessToken(user);

    return res.json({
      message: 'Login successful',
      token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone || null,
      },
    });
  } catch (error) {
    console.error('[api] POST /api/auth/login error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.post('/api/auth/logout', async (_req, res) => {
  return res.json({message: 'Logout successful'});
});

app.get('/api/auth/confirm-email/:token', async (req, res) => {
  try {
    const {token} = req.params;
    const payload = verifySignedToken(token);

    if (!payload || payload.type !== 'email-confirmation' || !payload.sub) {
      return res.redirect(302, `${frontendAppUrl}/login?emailConfirmed=0`);
    }

    const user = await getUserById(payload.sub);
    if (!user) {
      return res.redirect(302, `${frontendAppUrl}/login?emailConfirmed=0`);
    }

    if (!user.verified_email) {
      await markUserEmailVerified(user.id);
    }

    return res.redirect(302, `${frontendAppUrl}/login?emailConfirmed=1`);
  } catch (error) {
    console.error('[api] GET /api/auth/confirm-email/:token error', error);
    return res.redirect(302, `${frontendAppUrl}/login?emailConfirmed=0`);
  }
});

app.get('/api/auth/me', requireUserAuth, async (req, res) => {
  try {
    const user = req.authUser;
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone || null,
      },
    });
  } catch (error) {
    console.error('[api] GET /api/auth/me error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

app.get('/api/user/bookings', requireUserAuth, async (req, res) => {
  try {
    const bookings = await getUserBookings(req.authUser.id);
    return res.json({bookings});
  } catch (error) {
    console.error('[api] GET /api/user/bookings error', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

// ============ REMINDER WORKER ============

async function processReminders() {
  try {
    const now = Date.now();
    const bookingsNeedingReminder = await getBookingsNeedingReminder();

    for (const booking of bookingsNeedingReminder) {
      const bookingStart = parseBookingStart(booking.date, booking.time).getTime();
      const reminderAt = bookingStart - reminderWindowMs;

      if (now >= reminderAt && now < bookingStart) {
        try {
          await sendReminderEmail({
            ...booking,
            fullName: booking.full_name,
            cancelToken: booking.cancel_token,
          });
          await updateReminderSent(booking.id);
        } catch (error) {
          console.error('failed to send reminder email for booking', booking.id, error);
        }
      }
    }
  } catch (error) {
    console.error('processReminders error', error);
  }
}

setInterval(() => {
  processReminders().catch((error) => {
    console.error('reminder worker error', error);
  });
}, 60 * 1000);

processReminders().catch((error) => {
  console.error('reminder worker bootstrap error', error);
});

app.listen(port, () => {
  console.log(`Booking server listening on http://localhost:${port}`);
});
