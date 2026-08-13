import TeamBadge from "./TeamBadge";
import "./TeamSlot.css";

// "Slot de roster" cliquable : vide -> "+", rempli -> blason + nom.
export default function TeamSlot({ label, club, onClick, size = "md" }) {
  return (
    <button
      className={`team-slot team-slot--${size} neon-border ${club ? "is-active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {club ? (
        <>
          <TeamBadge club={club} size={size === "lg" ? 56 : 40} />
          <span className="team-slot__name">{club.short}</span>
        </>
      ) : (
        <>
          <span className="team-slot__plus">+</span>
          <span className="team-slot__label text-muted">{label}</span>
        </>
      )}
    </button>
  );
}
