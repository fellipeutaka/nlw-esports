import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing supabase url in .env file");
}

if (!supabaseAnonKey) {
  throw new Error("Missing supabase anon key in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
  localStorage: AsyncStorage,
});
