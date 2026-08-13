import { useState } from "react";
import TeamSlot from "./TeamSlot";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import "./LeagueSection.css";

// Section générique "Championnat" : Champion (+ éventuellement TOP4 / Relégués).
export default function LeagueSection({ sectionKey, title, icon, accentColor, clubs, showTop4, showRelegated }) {
  const { prediction, setField, setArrayField } = usePrediction();
  const data = prediction[sectionKey];
  const [picker, setPicker] = useState(null); // { type: 'champion' | 'top4' | 'relegated', index }

  const findClub = (id) => clubs.find((c) => c.id === id) || null;

  const usedIds = [
    data.champion,
    ...(data.top4 || []),
    ...(data.relegated || []),
  ].filter(Boolean);

  const closePicker = () => setPicker(null);

  const handlePick = (club) => {
    if (picker.type === "champion") setField(sectionKey, "champion", club.id);
    if (picker.type === "top4") setArrayField(sectionKey, "top4", picker.index, club.id);
    if (picker.type === "relegated") setArrayField(sectionKey, "relegated", picker.index, club.id);
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

        {showTop4 && (
          <div className="league-section__group">
            <span className="league-section__label pill pill--green">TOP 4</span>
            <div className="league-section__slots">
              {data.top4.map((id, i) => (
                <TeamSlot
                  key={i}
                  label={`#${i + 1}`}
                  club={findClub(id)}
                  onClick={() => setPicker({ type: "top4", index: i })}
                />
              ))}
            </div>
          </div>
        )}

        {showRelegated && (
          <div className="league-section__group">
            <span className="league-section__label pill pill--red">Relégués</span>
            <div className="league-section__slots">
              {data.relegated.map((id, i) => (
                <TeamSlot
                  key={i}
                  label={`Reléc. ${i + 1}`}
                  club={findClub(id)}
                  onClick={() => setPicker({ type: "relegated", index: i })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {picker && (
        <SelectorModal
          title={`Choisir un club — ${title}`}
          items={clubs}
          getLabel={(c) => c.name}
          excludeIds={usedIds}
          onPick={handlePick}
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
