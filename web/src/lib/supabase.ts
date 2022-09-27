import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing supabase url in environment variables.");
}

if (!supabaseAnonKey) {
  throw new Error("Missing supabase anon key in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  persistSession: true,
  autoRefreshToken: true,
});
