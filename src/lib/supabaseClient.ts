import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Prefer VITE_ prefixed envs (exposed to client builds). Fall back to SUPABASE_*
// if the project is using non-prefixed names in local development.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) as string | undefined;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY) as string | undefined;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  // Helpful debug in local dev: show which URL was picked (no keys printed)
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[supabase] initialized with url:', supabaseUrl ? supabaseUrl.replace(/https?:\/\//, '') : '');
  }
} else {
  console.warn('Supabase URL/key missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export { supabase };
