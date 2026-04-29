import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] Variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no definidas. Los leads no se guardarán en BD.'
  );
}

export const supabase = client;
