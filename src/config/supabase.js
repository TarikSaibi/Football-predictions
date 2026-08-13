import { createClient } from "@supabase/supabase-js";

// Config publique du projet Supabase (voir README § "Collecte des pronos").
// La "anon key" n'est PAS un secret à cacher : comme le token GitHub n'existe plus dans
// cette architecture, la protection contre la triche vient entièrement des règles Row
// Level Security définies dans supabase/schema.sql (pseudo unique + fiches non
// modifiables) — jamais de la confidentialité de ces valeurs, ni d'un compte utilisateur.
//
// À récupérer dans le dashboard Supabase : Project Settings > API.
const SUPABASE_URL = "https://hdgyhihnbwrskpnhxmeh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZ3loaWhuYndyc2twbmh4bWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDczOTYsImV4cCI6MjEwMjIyMzM5Nn0.o2U4XqGPrKoZwsAhl1ZZICt3pnrZcXXC2KW_zyBMrX0";

export function isSupabaseConfigured() {
  return !SUPABASE_URL.includes("REMPLACER") && !SUPABASE_ANON_KEY.includes("REMPLACER");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: "pkce",
    detectSessionInUrl: true,
    persistSession: true,
  },
});
