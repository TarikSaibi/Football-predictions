import { useMemo, useState } from "react";
import RecapCard from "../components/RecapCard";
import { loadAllPredictions } from "../data/loadUsers";
import "./ParticipantsPage.css";

export default function ParticipantsPage() {
  const users = useMemo(() => loadAllPredictions(), []);
  const [selected, setSelected] = useState(users[0]?.username ?? null);

  const current = users.find((u) => u.username === selected) || null;

  return (
    <div className="participants-page container">
      <div className="section-title fade-in">
        <span className="accent" />
        <h1>Les pronos du groupe 👥</h1>
      </div>
      <p className="text-muted">
        {users.length} participant{users.length > 1 ? "s ont" : " a"} déjà envoyé sa fiche. Choisis un nom pour
        consulter ses prédictions.
      </p>

      <div className="participants-page__toolbar">
        <select
          className="participants-page__select"
          value={selected ?? ""}
          onChange={(e) => setSelected(e.target.value)}
        >
          {users.map((u) => (
            <option key={u.username} value={u.username}>
              {u.displayName}
            </option>
          ))}
        </select>
      </div>

      <div className="participants-page__cards">
        {users.map((u) => (
          <button
            key={u.username}
            className={`participants-page__user-card neon-border ${
              u.username === selected ? "is-active" : ""
            }`}
            style={{ "--accent": u.avatarColor }}
            onClick={() => setSelected(u.username)}
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

      {users.length === 0 && (
        <p className="text-muted">Aucune fiche pour le moment — reviens quand le groupe aura répondu !</p>
      )}
    </div>
  );
}
