import { useState } from "react";
import TeamSlot from "./TeamSlot";
import PlayerCard from "./PlayerCard";
import SelectorModal from "./SelectorModal";
import { usePrediction } from "../state/PredictionContext";
import "./LeagueSection.css";

// Section générique "Championnat" : Champion (+ éventuellement TOP4 / Meilleur buteur).
export default function LeagueSection({ sectionKey, title, icon, accentColor, clubs, showTop4, scorers }) {
  const { prediction, setField, setArrayField } = usePrediction();
  const data = prediction[sectionKey];
  const [picker, setPicker] = useState(null); // { type: 'champion' | 'top4' | 'scorer', index }

  const findClub = (id) => clubs.find((c) => c.id === id) || null;
  const findScorer = (id) => scorers?.find((p) => p.id === id) || null;

  const usedClubIds = [data.champion, ...(data.top4 || [])].filter(Boolean);

  const closePicker = () => setPicker(null);

  const handlePickClub = (club) => {
    if (picker.type === "champion") setField(sectionKey, "champion", club.id);
    if (picker.type === "top4") setArrayField(sectionKey, "top4", picker.index, club.id);
    closePicker();
  };

  const handlePickScorer = (player) => {
    setField(sectionKey, "topScorer", player.id);
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

        {scorers && (
          <div className="league-section__group">
            <span className="league-section__label pill pill--yellow">⚽ Meilleur Buteur</span>
            <div className="league-section__scorer">
              <PlayerCard
                player={findScorer(data.topScorer)}
                selected={Boolean(data.topScorer)}
                onClick={() => setPicker({ type: "scorer" })}
                accent={accentColor}
              />
            </div>
          </div>
        )}
      </div>

      {picker && picker.type !== "scorer" && (
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

      {picker && picker.type === "scorer" && (
        <SelectorModal
          title={`Meilleur buteur — ${title}`}
          items={scorers}
          getLabel={(p) => p.name}
          excludeIds={[]}
          onPick={handlePickScorer}
          onClose={closePicker}
          renderItem={(player) => <PlayerCard player={player} onClick={() => {}} accent={accentColor} />}
        />
      )}
    </section>
  );
}
