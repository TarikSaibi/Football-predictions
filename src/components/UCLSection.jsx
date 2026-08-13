import { useState } from "react";
import TeamSlot from "./TeamSlot";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import { UCL_CONTENDERS } from "../data/clubs";
import "./LeagueSection.css";

export default function UCLSection() {
  const { prediction, setField } = usePrediction();
  const data = prediction.ucl;
  const [picker, setPicker] = useState(null); // 'winner' | 'finalist'

  const findClub = (id) => UCL_CONTENDERS.find((c) => c.id === id) || null;
  const usedIds = [data.winner, data.finalist].filter(Boolean);

  const handlePick = (club) => {
    setField("ucl", picker, club.id);
    setPicker(null);
  };

  return (
    <section className="league-section glass-panel fade-in" style={{ "--league-accent": "#2d8cff" }}>
      <div className="section-title">
        <span className="accent" style={{ background: "#2d8cff", boxShadow: "0 0 12px #2d8cff80" }} />
        <h2>🏆 Ligue des Champions</h2>
      </div>

      <div className="league-section__row">
        <div className="league-section__group">
          <span className="league-section__label pill pill--yellow">Vainqueur</span>
          <TeamSlot label="Vainqueur" size="lg" club={findClub(data.winner)} onClick={() => setPicker("winner")} />
        </div>
        <div className="league-section__group">
          <span className="league-section__label pill pill--green">Finaliste</span>
          <TeamSlot label="Finaliste" size="lg" club={findClub(data.finalist)} onClick={() => setPicker("finalist")} />
        </div>
      </div>

      {picker && (
        <SelectorModal
          title={picker === "winner" ? "Choisir le vainqueur" : "Choisir le finaliste"}
          items={UCL_CONTENDERS}
          getLabel={(c) => c.name}
          excludeIds={usedIds}
          onPick={handlePick}
          onClose={() => setPicker(null)}
          renderItem={(club) => (
            <>
              <TeamSlot label="" club={club} onClick={() => {}} />
              <span style={{ fontSize: "0.78rem" }}>{club.name}</span>
            </>
          )}
        />
      )}
    </section>
  );
}
