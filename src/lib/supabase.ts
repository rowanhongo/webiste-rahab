import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

// Fallback values for development/demo purposes
const defaultUrl = 'https://nxpibfbykzeapwizlpvl.supabase.co';
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGliZmJ5a3plYXB3aXpscHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDM5NDQsImV4cCI6MjA2NzM3OTk0NH0.TQHBJpnstqFNzNOtNVe8zVU-lHJkJtgjQBWYdGE_Xtw';
const defaultServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGliZmJ5a3plYXB3aXpscHZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTgwMzk0NCwiZXhwIjoyMDY3Mzc5OTQ0fQ.MM64-e7FGVuBFTsDuzMV9nCyMZakAkl_zjyEvnvSFfc';

// Use environment variables if available, otherwise use defaults
const finalUrl = supabaseUrl || defaultUrl;
const finalAnonKey = supabaseAnonKey || defaultAnonKey;
const finalServiceKey = supabaseServiceKey || defaultServiceKey;

console.log('Supabase configuration:', {
  url: finalUrl,
  hasAnonKey: !!finalAnonKey,
  hasServiceKey: !!finalServiceKey
});

if (!finalUrl || !finalAnonKey) {
  console.error('Missing Supabase configuration');
}

// Public client for read operations and user registrations
export const supabase = createClient(finalUrl, finalAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Admin client with service role for admin operations
export const supabaseAdmin = createClient(
  finalUrl, 
  finalServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'apikey': finalServiceKey,
        'Authorization': `Bearer ${finalServiceKey}`
      }
    }
  }
);

// Test connection on initialization
supabase.from('businesses').select('count', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful');
    }
  });