<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run this project locally

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. (Optional but recommended) create `.env.local` from `.env.example` and configure SMTP credentials for real emails.
3. Run frontend + booking server together:
   `npm run dev:full`

If port 3000 is already occupied, Vite will automatically use the next available port (for example 3001).

## Booking System

The project now includes a real booking backend with:

1. User booking form (name, email, phone, notes)
2. Email with "Conferma prenotazione" button after form submit
3. Automatic reminder email 24h before the lesson (only for confirmed bookings)
4. One-click cancellation from email
5. Automatic slot release after cancellation

### API Server

The booking server runs on `http://localhost:8787` by default and stores data in:

- `server/data/bookings.json`

### Email behavior

If SMTP credentials are set, real emails are sent.
If SMTP credentials are not set, an Ethereal test inbox is used and preview links are printed in terminal.

## Admin Panel

Admin is now a dedicated page at `/admin` with login + server session.

Features:

1. View all bookings and status
2. See confirmation/reminder delivery status
3. Cancel a booking manually (slot becomes available again)
4. Run reminder worker manually for testing only
5. Send a real SMTP test email from admin page

Note: after form submit, booking is in pending state until user clicks "Conferma prenotazione" from email. Admin actions are not required for normal delivery.

### Admin credentials and session

Set these values in `.env.local`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_TTL_HOURS`
- `ADMIN_ALLOWED_ORIGINS` (optional, comma-separated)

Then open `http://localhost:3000/admin` (or 3001 if 3000 is busy) and login.

### Security hardening

1. Use a strong `ADMIN_PASSWORD` (never keep `change-me-now` in production)
2. Use `ADMIN_SESSION_SECRET` with at least 32 random characters
3. Configure `ADMIN_ALLOWED_ORIGINS` with only trusted frontend origins
4. In production, app startup is blocked if password/secret are weak

## SMTP Real Configuration (for real tests)

1. Fill SMTP values in `.env.local`:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_FROM`
2. Restart app: `npm run dev:full`
3. Login to `/admin`
4. In "Test SMTP reale", enter your destination email and click "Invia test SMTP"
5. If email is delivered, booking confirmations/reminders will also be real

## End-to-end test flow

1. Start app with `npm run dev:full`
2. Open `/admin`, login, and send SMTP test email
3. Open booking form and create a reservation with a real/test email
4. Verify confirmation email is sent
5. Click cancellation link in email and verify slot is available again
6. Open admin page and verify booking status (`confirmed` or `cancelled`)

## Production Deployment

### Architecture
- **Frontend**: Vercel (React + Vite) - Fast, no servers needed
- **Backend**: Render (Express.js) - Bookings API + email service

### Deployment Steps
See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete step-by-step guide.

**TL;DR:**
1. Push code to GitHub
2. Deploy backend to Render (`alba-music-backend.onrender.com`)
3. Deploy frontend to Vercel (`alba-music-academy.vercel.app`)
4. Connect with environment variables

### Important Notes
- Data persists as JSON file on Render (free tier resets on redeploy)
- For production, add a database like Render PostgreSQL
- Always use strong passwords and secrets in production
- Rotate Mailjet credentials regularly
