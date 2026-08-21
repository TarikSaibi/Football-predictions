import { useState } from "react";
import TeamSlot from "./TeamSlot";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import { UCL_CONTENDERS } from "../data/clubs";
import "./LeagueSection.css";

// Vainqueur / finaliste : choix rapide parmi les prétendants habituels, ou saisie libre
// si le club prédit n'est pas dans la liste (ex. outsider). Les deux écrivent dans le
// même champ : un club choisi dans la liste écrase une saisie libre, et inversement.
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

  const renderPick = (key, label, pillClass) => {
    const club = findClub(data[key]);
    const freeText = data[key] && !club ? data[key] : "";
    return (
      <div className="league-section__group">
        <span className={`league-section__label pill ${pillClass}`}>{label}</span>
        <TeamSlot label={label} size="lg" club={club} onClick={() => setPicker(key)} />
        <input
          className="league-section__text-input"
          type="text"
          placeholder="Autre club (saisie libre)"
          value={freeText}
          onChange={(e) => setField("ucl", key, e.target.value)}
        />
      </div>
    );
  };

  return (
    <section className="league-section glass-panel fade-in" style={{ "--league-accent": "#2d8cff" }}>
      <div className="section-title">
        <span className="accent" style={{ background: "#2d8cff", boxShadow: "0 0 12px #2d8cff80" }} />
        <h2>🏆 Ligue des Champions</h2>
      </div>

      <div className="league-section__row">
        {renderPick("winner", "Vainqueur", "pill--yellow")}
        {renderPick("finalist", "Finaliste", "pill--green")}
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
