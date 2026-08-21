// Catégories de récompenses individuelles. Les joueurs ne sont plus choisis dans une
// liste fermée : chacun saisit librement le nom qu'il veut (voir AwardsSection.jsx /
// LeagueSection.jsx). Ballon d'Or scindé en deux éditions car les deux se prédisent
// avant le début de saison : celui de 2026 (déjà quasi joué, cérémonie à l'automne) et
// celui de 2027 (sur la saison 2026-2027 couverte par l'appli).
export const AWARD_CATEGORIES = [
  { id: "ballonDor2026", label: "Ballon d'Or 2026", icon: "🏆" },
  { id: "ballonDor2027", label: "Ballon d'Or 2027", icon: "🏆" },
  { id: "topScorer", label: "Meilleur Buteur d'Europe", icon: "⚽" },
  { id: "revelation", label: "Joueur Révélation", icon: "✨" },
  { id: "flop", label: "Plus Gros Flop", icon: "💩" },
];
