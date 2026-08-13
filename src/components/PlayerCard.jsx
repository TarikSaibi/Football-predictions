import { flagEmoji } from "../utils/flags";
import "./PlayerCard.css";

// Carte type "FIFA" pour un joueur. `selected` affiche l'état actif (bordure néon).
export default function PlayerCard({ player, selected, onClick, accent = "#e10600" }) {
  if (!player) {
    return (
      <button className="player-card player-card--empty" onClick={onClick} type="button">
        <span className="player-card__plus">+</span>
        <span className="text-muted">Choisir un joueur</span>
      </button>
    );
  }

  const initials = player.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <button
      className={`player-card neon-border ${selected ? "is-active" : ""}`}
      onClick={onClick}
      type="button"
      style={{ "--accent": accent }}
    >
      <div className="player-card__avatar">{initials}</div>
      <div className="player-card__body">
        <span className="player-card__name">{player.name}</span>
        <span className="player-card__club text-muted">
          {flagEmoji(player.country)} {player.club}
        </span>
      </div>
    </button>
  );
}
