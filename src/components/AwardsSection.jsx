import { useState } from "react";
import PlayerCard from "./PlayerCard";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import { AWARD_CATEGORIES } from "../data/players";
import "./LeagueSection.css";

export default function AwardsSection() {
  const { prediction, setField } = usePrediction();
  const [picker, setPicker] = useState(null); // categoryId

  const category = AWARD_CATEGORIES.find((c) => c.id === picker);
  const findPlayer = (cat, id) => cat.nominees.find((p) => p.id === id) || null;

  const handlePick = (player) => {
    setField("awards", picker, player.id);
    setPicker(null);
  };

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
            <PlayerCard
              player={findPlayer(cat, prediction.awards[cat.id])}
              selected={Boolean(prediction.awards[cat.id])}
              onClick={() => setPicker(cat.id)}
            />
          </div>
        ))}
      </div>

      {category && (
        <SelectorModal
          title={`${category.icon} ${category.label}`}
          items={category.nominees}
          getLabel={(p) => p.name}
          excludeIds={[]}
          onPick={handlePick}
          onClose={() => setPicker(null)}
          renderItem={(player) => <PlayerCard player={player} onClick={() => {}} />}
        />
      )}
    </section>
  );
}
