import { createClient } from "@supabase/supabase-js";

// Config publique du projet Supabase (voir README § "Collecte des pronos").
// La "anon key" n'est PAS un secret à cacher : comme le token GitHub n'existe plus dans
// cette architecture, la protection contre la triche vient entièrement des règles Row
// Level Security définies dans supabase/schema.sql + de l'authentification Google —
// jamais de la confidentialité de ces valeurs.
//
// À récupérer dans le dashboard Supabase : Project Settings > API.
const SUPABASE_URL = "https://REMPLACER.supabase.co";
const SUPABASE_ANON_KEY = "REMPLACER_PAR_VOTRE_ANON_KEY";

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
