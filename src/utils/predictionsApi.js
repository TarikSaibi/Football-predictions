import { supabase } from "../config/supabase";
import { pickColor } from "./avatarColor";

// Table `predictions` (voir supabase/schema.sql) : 1 ligne par participant, clé primaire
// user_id = auth.uid(). Les règles RLS garantissent que chacun ne peut écrire QUE sa
// propre ligne, même si quelqu'un bidouille les appels réseau depuis la console.

function rowToPrediction(row) {
  return {
    username: row.user_id,
    displayName: row.display_name,
    avatarColor: row.avatar_color,
    submittedAt: row.submitted_at,
    ligue1: row.ligue1,
    premierLeague: row.premier_league,
    laliga: row.laliga,
    ucl: row.ucl,
    awards: row.awards,
  };
}

function predictionToRow(userId, prediction) {
  return {
    user_id: userId,
    display_name: prediction.displayName,
    avatar_color: prediction.avatarColor || pickColor(userId),
    ligue1: prediction.ligue1,
    premier_league: prediction.premierLeague,
    laliga: prediction.laliga,
    ucl: prediction.ucl,
    awards: prediction.awards,
    submitted_at: new Date().toISOString(),
  };
}

export async function upsertPrediction(userId, prediction) {
  const { error } = await supabase.from("predictions").upsert(predictionToRow(userId, prediction));
  if (error) throw error;
}

export async function fetchMyPrediction(userId) {
  const { data, error } = await supabase.from("predictions").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? rowToPrediction(data) : null;
}

export async function fetchAllPredictions() {
  const { data, error } = await supabase.from("predictions").select("*").order("display_name");
  if (error) throw error;
  return (data || []).map(rowToPrediction);
}

// Abonnement temps réel : callback rappelé avec la liste à jour à chaque insert/update.
// Retourne une fonction de désabonnement à appeler au démontage du composant.
export function subscribeToPredictions(onChange) {
  fetchAllPredictions().then(onChange).catch(() => {});

  const channel = supabase
    .channel("predictions-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "predictions" }, () => {
      fetchAllPredictions().then(onChange).catch(() => {});
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}
