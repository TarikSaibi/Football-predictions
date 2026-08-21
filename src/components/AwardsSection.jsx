import { usePrediction } from "../state/PredictionContext";
import { AWARD_CATEGORIES } from "../data/awards";
import "./LeagueSection.css";

// Récompenses individuelles : saisie libre du nom (pas de liste fermée de joueurs).
export default function AwardsSection() {
  const { prediction, setField } = usePrediction();

  return (
    <section className="league-section glass-panel fade-in" style={{ "--league-accent": "#ffe600" }}>
      <div className="section-title">
        <span className="accent" style={{ background: "#ffe600", boxShadow: "0 0 12px #ffe60080" }} />
        <h2>✨ Récompenses individuelles</h2>
      </div>

      <div className="awards-grid">
        {AWARD_CATEGORIES.map((cat) => (
          <div key={cat.id} className="league-section__group">
            <span className="league-section__label pill pill--yellow">
              {cat.icon} {cat.label}
            </span>
            <input
              className="league-section__text-input"
              type="text"
              placeholder="Nom du joueur"
              value={prediction.awards[cat.id] || ""}
              onChange={(e) => setField("awards", cat.id, e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
