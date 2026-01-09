import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createSupabaseSafe = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Avoid failing builds when env vars are missing; fail fast only when used at runtime.
    console.warn(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
    return new Proxy({} as SupabaseClient, {
      get() {
        throw new Error(
          "Supabase client unavailable. Missing NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY."
        );
      },
    });
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseSafe();
export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
