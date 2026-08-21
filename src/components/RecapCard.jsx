import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import TeamBadge from "./TeamBadge";
import { LIGUE1, PREMIER_LEAGUE, LALIGA, UCL_CONTENDERS } from "../data/clubs";
import { AWARD_CATEGORIES } from "../data/awards";
import "./RecapCard.css";

const findClub = (list, id) => list.find((c) => c.id === id) || null;

function MiniTeam({ club, fallbackText }) {
  if (!club) return <span className="recap-card__empty">{fallbackText || "—"}</span>;
  return (
    <span className="recap-card__mini-team">
      <TeamBadge club={club} size={26} />
      {club.short}
    </span>
  );
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return null;
  }
}

export default function RecapCard({ prediction, accentColor = "#e10600" }) {
  const cardRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const l1 = prediction.ligue1 || {};
  const pl = prediction.premierLeague || {};
  const ll = prediction.laliga || {};
  const ucl = prediction.ucl || {};
  const awards = prediction.awards || {};
  const submittedDate = formatDate(prediction.submittedAt);

  const handleExport = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#121212" });
      const link = document.createElement("a");
      link.download = `pronos-${(prediction.displayName || "joueur").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="recap-wrapper">
      <div className="recap-card glass-panel" ref={cardRef} style={{ "--accent": accentColor }}>
        <div className="recap-card__header">
          <div className="recap-card__avatar">{(prediction.displayName || "?")[0]?.toUpperCase()}</div>
          <div>
            <h2>{prediction.displayName || "Joueur inconnu"}</h2>
            <span className="text-muted">Fiche de prédictions — Saison 2026-2027</span>
          </div>
        </div>

        <div className="recap-card__grid">
          <div className="recap-card__block">
            <h4>🇫🇷 Ligue 1</h4>
            <p>
              Champion <MiniTeam club={findClub(LIGUE1, l1.champion)} />
            </p>
            <p className="recap-card__row">
              TOP {(l1.top || []).length || 3}{" "}
              {(l1.top || []).map((id, i) => (
                <MiniTeam key={i} club={findClub(LIGUE1, id)} />
              ))}
            </p>
            <p>
              ⚽ Buteur <strong>{l1.topScorer || "—"}</strong>
            </p>
          </div>

          <div className="recap-card__block">
            <h4>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League</h4>
            <p>
              Champion <MiniTeam club={findClub(PREMIER_LEAGUE, pl.champion)} />
            </p>
            <p className="recap-card__row">
              TOP {(pl.top || []).length || 6}{" "}
              {(pl.top || []).map((id, i) => (
                <MiniTeam key={i} club={findClub(PREMIER_LEAGUE, id)} />
              ))}
            </p>
            <p>
              ⚽ Buteur <strong>{pl.topScorer || "—"}</strong>
            </p>
          </div>

          <div className="recap-card__block">
            <h4>🇪🇸 LaLiga</h4>
            <p>
              Champion <MiniTeam club={findClub(LALIGA, ll.champion)} />
            </p>
            <p className="recap-card__row">
              TOP {(ll.top || []).length || 3}{" "}
              {(ll.top || []).map((id, i) => (
                <MiniTeam key={i} club={findClub(LALIGA, id)} />
              ))}
            </p>
            <p>
              ⚽ Buteur <strong>{ll.topScorer || "—"}</strong>
            </p>
          </div>

          <div className="recap-card__block">
            <h4>🏆 Ligue des Champions</h4>
            <p>
              Vainqueur <MiniTeam club={findClub(UCL_CONTENDERS, ucl.winner)} fallbackText={ucl.winner} />
            </p>
            <p>
              Finaliste <MiniTeam club={findClub(UCL_CONTENDERS, ucl.finalist)} fallbackText={ucl.finalist} />
            </p>
          </div>

          <div className="recap-card__block recap-card__block--wide">
            <h4>✨ Récompenses individuelles</h4>
            <div className="recap-card__awards">
              {AWARD_CATEGORIES.map((cat) => (
                <div key={cat.id} className="recap-card__award">
                  <span className="text-muted">
                    {cat.icon} {cat.label}
                  </span>
                  <strong>{awards[cat.id] || "—"}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recap-card__footer">
          <span className="text-muted recap-card__timestamp">
            {submittedDate ? `🔒 Envoyé le ${submittedDate} — figé définitivement` : "📝 Brouillon non envoyé"}
          </span>
          <span className="pill pill--red">#LesPronosDeSaison</span>
        </div>
      </div>

      <button className="btn btn--primary" onClick={handleExport} disabled={exporting} type="button">
        {exporting ? "Export en cours..." : "📸 Exporter la fiche en image"}
      </button>
    </div>
  );
}
