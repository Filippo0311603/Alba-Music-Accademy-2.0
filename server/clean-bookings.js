import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local'), override: true });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function cleanBookings() {
  console.log('🗑️  Pulizia bookings da Supabase...');
  
  // First get count
  const { count: beforeCount } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true });

  const { error } = await supabase
    .from('bookings')
    .delete()
    .gt('created_at', '1970-01-01'); // True for all records

  if (error) {
    console.error('❌ Errore:', error.message);
    process.exit(1);
  }

  console.log(`✅ Pulizia completa - Eliminati ${beforeCount} booking`);
}

cleanBookings().catch(e => {
  console.error(e);
  process.exit(1);
});
