import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

if (!supabaseServiceKey) {
  console.warn('Service role key not found, using anon key for admin operations');
}

// Public client for read operations and user registrations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl, 
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'apikey': supabaseServiceKey || supabaseAnonKey,
        'Authorization': `Bearer ${supabaseServiceKey || supabaseAnonKey}`
      }
    }
  }
);