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
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('date', date)
    .eq('status', 'confirmed');

  if (error) throw error;
  return data || [];
}

/**
 * Creates a new booking
 */
export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data;
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
