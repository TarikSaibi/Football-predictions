import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecapCard from "../components/RecapCard";
import { subscribeToPredictions } from "../utils/predictionsApi";
import { isSupabaseConfigured } from "../config/supabase";
import "./ParticipantsPage.css";

// Export JSON complet des pronos — bouton volontairement absent de l'UI normale,
// accessible uniquement via ?export dans l'URL (ex. .../#/participants?export).
// Aucune donnée sensible : tout est déjà public en lecture (voir supabase/schema.sql).
function exportPredictions(users) {
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pronos-de-saison-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ParticipantsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [searchParams] = useSearchParams();
  const showExport = searchParams.has("export");
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    if (!supabaseReady) {
      setLoading(false);
      return;
    }
    const unsubscribe = subscribeToPredictions((list) => {
      setUsers(list);
      setLoading(false);
      setSelected((prev) => (prev && list.some((u) => u.id === prev) ? prev : list[0]?.id ?? null));
    });
    return unsubscribe;
  }, [supabaseReady]);

  const current = users.find((u) => u.id === selected) || null;

  return (
    <div className="participants-page container">
      <div className="section-title fade-in">
        <span className="accent" />
        <h1>Les pronos du groupe 👥</h1>
      </div>

      {!supabaseReady ? (
        <p className="warning-banner">
          ⚠️ Le site n'est pas encore relié à Supabase (voir README § "Collecte des pronos").
        </p>
      ) : (
        <p className="text-muted">
          <span className="participants-page__live">🔴 En direct</span> —{" "}
          {loading
            ? "Chargement…"
            : `${users.length} participant${users.length > 1 ? "s ont" : users.length === 1 ? " a" : ""} déjà envoyé sa fiche.`}{" "}
          Choisis un nom pour consulter ses prédictions.
        </p>
      )}

      <div className="participants-page__toolbar">
        <select
          className="participants-page__select"
          value={selected ?? ""}
          onChange={(e) => setSelected(e.target.value)}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.displayName}
            </option>
          ))}
        </select>
      </div>

      <div className="participants-page__cards">
        {users.map((u) => (
          <button
            key={u.id}
            className={`participants-page__user-card neon-border ${
              u.id === selected ? "is-active" : ""
            }`}
            style={{ "--accent": u.avatarColor }}
            onClick={() => setSelected(u.id)}
            type="button"
          >
            <span className="participants-page__avatar">{u.displayName[0].toUpperCase()}</span>
            <span>{u.displayName}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="participants-page__recap">
          <RecapCard prediction={current} accentColor={current.avatarColor} />
        </div>
      )}

      {!loading && supabaseReady && users.length === 0 && (
        <p className="text-muted">Aucune fiche pour le moment — reviens quand le groupe aura répondu !</p>
      )}

      {showExport && (
        <button
          className="btn btn--ghost participants-page__export-btn"
          onClick={() => exportPredictions(users)}
          type="button"
        >
          ⬇️ Export JSON ({users.length})
        </button>
      )}
    </div>
  );
}
