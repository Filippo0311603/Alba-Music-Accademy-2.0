/**
 * Migration Script: JSON → Supabase
 * 
 * Uso: node migrate-bookings.js
 * 
 * Converte i bookings da bookings.json a Supabase PostgreSQL
 * con mapping completo dei campi e validazione dati.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local'), override: true });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JSON_FILE = path.join(__dirname, 'data', 'bookings.json');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERRORE: Imposta SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function readJsonBookings() {
  try {
    const raw = await fs.readFile(JSON_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('❌ Errore lettura JSON:', error.message);
    process.exit(1);
  }
}

function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

function convertBooking(jsonBooking) {
  return {
    id: jsonBooking.id,
    user_id: null, // Booking legacy senza utente associato
    email: jsonBooking.email?.toLowerCase() || '',
    full_name: jsonBooking.fullName || '',
    phone: jsonBooking.phone || null,
    notes: jsonBooking.notes || null,
    date: jsonBooking.date,
    time: jsonBooking.time,
    confirm_token: jsonBooking.confirmToken && jsonBooking.confirmToken.trim() 
      ? jsonBooking.confirmToken 
      : generateToken(),
    cancel_token: jsonBooking.cancelToken && jsonBooking.cancelToken.trim() 
      ? jsonBooking.cancelToken 
      : generateToken(),
    status: jsonBooking.status || 'pending',
    created_at: jsonBooking.createdAt,
    confirmed_at: jsonBooking.confirmedAt || null,
    confirmation_sent_at: jsonBooking.confirmationSentAt || null,
    reminder_sent_at: jsonBooking.reminderSentAt || null,
    canceled_at: jsonBooking.canceledAt || null,
  };
}

async function migrateBookings() {
  console.log('🚀 Inizio migrazione bookings JSON → Supabase...\n');

  // 1. Leggi JSON
  const jsonBookings = await readJsonBookings();
  console.log(`📋 Trovati ${jsonBookings.length} booking nel JSON\n`);

  // 2. Converti
  const bookingsToInsert = jsonBookings.map((b, idx) => {
    try {
      return convertBooking(b);
    } catch (error) {
      console.warn(`⚠️  Booking ${idx}: ${error.message}`);
      return null;
    }
  }).filter(Boolean);

  console.log(`✅ Convertiti ${bookingsToInsert.length} booking validi\n`);

  if (bookingsToInsert.length === 0) {
    console.error('❌ Nessun booking da migrare.');
    process.exit(1);
  }

  // 3. Verifica che la tabella esista
  console.log('🔍 Verifico schema Supabase...');
  const { data: columns, error: schemaError } = await supabase
    .from('bookings')
    .select('*')
    .limit(0);

  if (schemaError) {
    console.error('❌ Errore schema:', schemaError.message);
    process.exit(1);
  }
  console.log('✅ Schema OK\n');

  // 4. Batch insert (Supabase supporta ~1MB per request)
  const BATCH_SIZE = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < bookingsToInsert.length; i += BATCH_SIZE) {
    const batch = bookingsToInsert.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    console.log(`📦 Batch ${batchNum}/${Math.ceil(bookingsToInsert.length / BATCH_SIZE)}...`);

    const { data, error } = await supabase
      .from('bookings')
      .insert(batch, { count: 'estimated' });

    if (error) {
      console.error(`  ❌ Errore batch ${batchNum}:`, error.message);
      errorCount += batch.length;
    } else {
      console.log(`  ✅ Inseriti ${batch.length} booking`);
      successCount += batch.length;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 REPORT MIGRAZIONE');
  console.log('='.repeat(60));
  console.log(`✅ Successo: ${successCount}`);
  console.log(`❌ Errori: ${errorCount}`);
  console.log(`📈 Totale: ${successCount + errorCount}/${jsonBookings.length}`);
  console.log('='.repeat(60));

  if (errorCount > 0) {
    console.warn('\n⚠️  Alcuni booking non sono stati migranti.');
    process.exit(1);
  }

  console.log('\n🎉 Migrazione completata con successo!');
  console.log('\n✨ Prossimi step:');
  console.log('1. Verifica i dati in Supabase Dashboard');
  console.log('2. Aggiorna il backend per usare Supabase');
  console.log('3. Disabilita il file JSON (oppure tennilo come backup)');
}

migrateBookings().catch((error) => {
  console.error('❌ Errore migrazione:', error);
  process.exit(1);
});
