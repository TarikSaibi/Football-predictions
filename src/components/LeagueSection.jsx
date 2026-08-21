import { useState } from "react";
import TeamSlot from "./TeamSlot";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import "./LeagueSection.css";

// Section générique "Championnat" : Champion (+ éventuellement TOP N / Meilleur buteur).
// Le buteur est saisi librement (pas de liste fermée de joueurs à choisir).
export default function LeagueSection({ sectionKey, title, icon, accentColor, clubs, topCount, showScorer }) {
  const { prediction, setField, setArrayField } = usePrediction();
  const data = prediction[sectionKey];
  const [picker, setPicker] = useState(null); // { type: 'champion' | 'top', index }

  const findClub = (id) => clubs.find((c) => c.id === id) || null;

  const usedClubIds = [data.champion, ...(data.top || [])].filter(Boolean);

  const closePicker = () => setPicker(null);

  const handlePickClub = (club) => {
    if (picker.type === "champion") setField(sectionKey, "champion", club.id);
    if (picker.type === "top") setArrayField(sectionKey, "top", picker.index, club.id);
    closePicker();
  };

  return (
    <section className="league-section glass-panel fade-in" style={{ "--league-accent": accentColor }}>
      <div className="section-title">
        <span className="accent" style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}80` }} />
        <h2>
          {icon} {title}
        </h2>
      </div>

      <div className="league-section__row">
        <div className="league-section__group">
          <span className="league-section__label pill pill--yellow">Champion</span>
          <TeamSlot
            label="Champion"
            size="lg"
            club={findClub(data.champion)}
            onClick={() => setPicker({ type: "champion" })}
          />
        </div>

        {topCount > 0 && (
          <div className="league-section__group">
            <span className="league-section__label pill pill--green">TOP {topCount}</span>
            <div className="league-section__slots">
              {data.top.map((id, i) => (
                <TeamSlot
                  key={i}
                  label={`#${i + 1}`}
                  club={findClub(id)}
                  onClick={() => setPicker({ type: "top", index: i })}
                />
              ))}
            </div>
          </div>
        )}

        {showScorer && (
          <div className="league-section__group">
            <span className="league-section__label pill pill--yellow">⚽ Meilleur Buteur</span>
            <input
              className="league-section__text-input"
              type="text"
              placeholder="Nom du buteur"
              value={data.topScorer || ""}
              onChange={(e) => setField(sectionKey, "topScorer", e.target.value)}
            />
          </div>
        )}
      </div>

      {picker && (
        <SelectorModal
          title={`Choisir un club — ${title}`}
          items={clubs}
          getLabel={(c) => c.name}
          excludeIds={usedClubIds}
          onPick={handlePickClub}
          onClose={closePicker}
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
