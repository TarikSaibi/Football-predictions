import { supabase } from "../config/supabase";
import { pickColor } from "./avatarColor";

// Table `predictions` (voir supabase/schema.sql) : 1 ligne par participant, identifiée
// par un pseudo unique (pas de compte / connexion). Les règles RLS n'autorisent QUE la
// lecture publique et l'insertion — aucune règle "update"/"delete" n'existe, donc une
// fiche envoyée est techniquement impossible à modifier ou supprimer, même en
// trafiquant les appels réseau depuis la console.

function rowToPrediction(row) {
  return {
    id: row.id,
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

function predictionToRow(prediction) {
  return {
    display_name: prediction.displayName,
    avatar_color: prediction.avatarColor || pickColor(prediction.displayName),
    ligue1: prediction.ligue1,
    premier_league: prediction.premierLeague,
    laliga: prediction.laliga,
    ucl: prediction.ucl,
    awards: prediction.awards,
  };
}

// Erreur Postgres 23505 = violation de contrainte unique (pseudo déjà pris).
export const ERR_NAME_TAKEN = "NAME_TAKEN";

export async function sendPrediction(prediction) {
  const { data, error } = await supabase
    .from("predictions")
    .insert(predictionToRow(prediction))
    .select()
    .single();
  if (error) {
    if (error.code === "23505") throw new Error(ERR_NAME_TAKEN);
    throw error;
  }
  return rowToPrediction(data);
}

export async function fetchAllPredictions() {
  const { data, error } = await supabase.from("predictions").select("*").order("display_name");
  if (error) throw error;
  return (data || []).map(rowToPrediction);
}

// Abonnement temps réel : callback rappelé avec la liste à jour à chaque insert.
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
