/**
 * Supabase Client - Server-side (Node.js)
 * 
 * Usa service_role_key per operazioni server-side con accesso totale
 * (bypassa RLS policies)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

dotenv.config({ path: path.resolve(projectRoot, '.env') });
dotenv.config({ path: path.resolve(projectRoot, '.env.local'), override: true });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env vars');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

function normalizeTimeLabel(rawTime) {
  const value = String(rawTime || '').trim();
  const match = value.match(/^(\d{1,2}):(\d{2})/);

  if (!match) {
    return value;
  }

  const hours = String(Number(match[1])).padStart(2, '0');
  return `${hours}:${match[2]}`;
}

function isMissingColumnError(rawMessage, columnName) {
  const message = String(rawMessage || '').toLowerCase();
  const column = String(columnName || '').toLowerCase();

  if (!message || !column) {
    return false;
  }

  return (
    message.includes(`column '${column}'`) ||
    message.includes(`column ${column}`) ||
    message.includes(`'${column}' column`) ||
    message.includes(`bookings.${column}`)
  );
}

function parseRangeEndTimeFromNotes(notes) {
  const value = String(notes || '');
  const match = value.match(/\[ALBA_RANGE_END:(\d{2}:\d{2})\]/);
  return match ? normalizeTimeLabel(match[1]) : null;
}

function parseRangeSlotsFromNotes(notes) {
  const value = String(notes || '');
  const match = value.match(/\[ALBA_RANGE_SLOTS:([0-9:,]+)\]\s*$/);

  if (!match) {
    return [];
  }

  return match[1]
    .split(',')
    .map((slot) => normalizeTimeLabel(slot))
    .filter((slot) => /^\d{2}:\d{2}$/.test(slot));
}

function timeToMinutes(rawTime) {
  const normalized = normalizeTimeLabel(rawTime);
  const match = normalized.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToTime(totalMinutes) {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getBookingTimeSlots(booking) {
  const slotsFromNotes = parseRangeSlotsFromNotes(booking?.notes);
  if (slotsFromNotes.length > 0) {
    return [...new Set(slotsFromNotes)];
  }

  const start = normalizeTimeLabel(booking?.time);
  const startMinutes = timeToMinutes(start);

  if (startMinutes === null) {
    return [];
  }

  const parsedEnd = normalizeTimeLabel(booking?.end_time || parseRangeEndTimeFromNotes(booking?.notes));
  const endMinutes = timeToMinutes(parsedEnd);

  if (endMinutes === null || endMinutes <= startMinutes) {
    return [start];
  }

  const slots = [];
  for (let cursor = startMinutes; cursor < endMinutes; cursor += 60) {
    slots.push(minutesToTime(cursor));
  }

  return slots;
}

function shouldIncludeAsBlockedSlot(booking) {
  const status = String(booking?.status || '').toLowerCase();

  if (!status || status === 'confirmed') {
    return true;
  }

  if (status === 'pending') {
    const holdMinutes = Number(process.env.PENDING_BOOKING_HOLD_MINUTES || 30);
    const holdMs = Number.isFinite(holdMinutes) && holdMinutes > 0 ? holdMinutes * 60 * 1000 : 30 * 60 * 1000;
    const createdAtMs = booking?.created_at ? new Date(booking.created_at).getTime() : NaN;

    if (!Number.isFinite(createdAtMs)) {
      return false;
    }

    return Date.now() - createdAtMs <= holdMs;
  }

  return false;
}

/**
 * Fetches all bookings (for admin panel)
 */
export async function getAllBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Fetches bookings for a specific date
 */
export async function getBookingsByDate(date) {
  const withStatus = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date)
    .eq('status', 'confirmed');

  if (!withStatus.error) {
    return withStatus.data || [];
  }

  const message = String(withStatus.error.message || '').toLowerCase();
  const missingStatusColumn = message.includes("column 'status'") || message.includes('column bookings.status');

  if (!missingStatusColumn) {
    throw withStatus.error;
  }

  // Backward-compatibility for legacy schemas without `status`.
  const legacy = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date);

  if (legacy.error) throw legacy.error;

  return (legacy.data || []).filter((booking) => {
    const status = String(booking?.status || '').toLowerCase();
    return !status || status === 'confirmed';
  });
}

/**
 * Fetches booked time slots for a specific date.
 * This helper is intentionally narrow so the calendar can keep working even if
 * the bookings schema changes around status fields.
 */
export async function getBookedTimesByDate(date) {
  const result = await supabase
    .from('bookings')
    .select('time, status, end_time, notes, created_at')
    .eq('date', date);

  if (result.error) {
    const message = String(result.error.message || '');
    const missingStatusColumn = isMissingColumnError(message, 'status');
    const missingEndTimeColumn = isMissingColumnError(message, 'end_time');

    if (missingEndTimeColumn && !missingStatusColumn) {
      const withoutEndTime = await supabase
        .from('bookings')
        .select('time, status, notes, created_at')
        .eq('date', date);

      if (withoutEndTime.error) {
        throw withoutEndTime.error;
      }

      return (withoutEndTime.data || [])
        .filter((booking) => shouldIncludeAsBlockedSlot(booking))
        .flatMap((booking) => getBookingTimeSlots(booking))
        .filter(Boolean);
    }

    if (!missingStatusColumn) {
      throw result.error;
    }

    const legacy = await supabase
      .from('bookings')
      .select('time, notes, created_at')
      .eq('date', date);

    if (legacy.error) {
      throw legacy.error;
    }

    return (legacy.data || [])
      .flatMap((booking) => getBookingTimeSlots(booking))
      .filter(Boolean);
  }

  return (result.data || [])
    .filter((booking) => shouldIncludeAsBlockedSlot(booking))
    .flatMap((booking) => getBookingTimeSlots(booking))
    .filter(Boolean);
}

/**
 * Fetches bookings for a specific date that should actively block new bookings
 * (confirmed + recent pending holds).
 */
export async function getActiveBookingsByDate(date) {
  const result = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date);

  if (result.error) {
    throw result.error;
  }

  return (result.data || []).filter((booking) => shouldIncludeAsBlockedSlot(booking));
}

/**
 * Creates a new booking
 */
export async function createBooking(bookingData) {
  const firstAttempt = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (!firstAttempt.error) {
    return firstAttempt.data;
  }

  const message = String(firstAttempt.error.message || '');
  const missingEndTimeColumn = isMissingColumnError(message, 'end_time');

  if (!missingEndTimeColumn) {
    throw firstAttempt.error;
  }

  const fallbackPayload = { ...bookingData };
  delete fallbackPayload.end_time;

  const fallbackAttempt = await supabase
    .from('bookings')
    .insert([fallbackPayload])
    .select()
    .single();

  if (fallbackAttempt.error) throw fallbackAttempt.error;
  return fallbackAttempt.data;
}

/**
 * Updates booking status
 */
export async function updateBookingStatus(bookingId, status, updates = {}) {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status,
      ...updates,
    })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Finds booking by confirm token
 */
export async function findBookingByConfirmToken(token) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('confirm_token', token)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data || null;
}

/**
 * Finds booking by cancel token
 */
export async function findBookingByCancelToken(token) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cancel_token', token)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Finds booking by id
 */
export async function getBookingById(bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Finds bookings needing reminder (confirmed, no reminder sent, within 24h of booking)
 */
export async function getBookingsNeedingReminder() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('status', 'confirmed')
    .is('reminder_sent_at', null);

  if (error) throw error;
  return data || [];
}

/**
 * Updates reminder sent timestamp
 */
export async function updateReminderSent(bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      reminder_sent_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Updates confirmation sent timestamp
 */
export async function updateConfirmationSent(bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      confirmation_sent_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Gets a user by email
 */
export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Creates a new user
 */
export async function createUser(userData) {
  const { data, error } = await supabase.from('users').insert([userData]).select().single();

  // Backward-compatibility for legacy schemas without `phone`.
  if (error && String(error.message || '').includes("column 'phone'")) {
    const userDataWithoutPhone = {
      ...userData,
    };
    delete userDataWithoutPhone.phone;

    const retry = await supabase
      .from('users')
      .insert([userDataWithoutPhone])
      .select()
      .single();

    if (retry.error) throw retry.error;
    return retry.data;
  }

  if (error) throw error;
  return data;
}

/**
 * Gets a user by id
 */
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

/**
 * Marks a user email as verified
 */
export async function markUserEmailVerified(userId) {
  const { data, error } = await supabase
    .from('users')
    .update({
      verified_email: true,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Gets bookings for a user
 */
export async function getUserBookings(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Gets a single booking by id for a specific user
 */
export async function getUserBookingById(userId, bookingId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}
