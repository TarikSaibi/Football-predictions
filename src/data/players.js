// Données FICTIVES / illustratives — à mettre à jour selon la saison réelle.
// Chaque joueur : id, name, club (short), country (code ISO2 pour le drapeau), colorA/colorB (accent carte).

export const BALLON_DOR_NOMINEES = [
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "vinicius", name: "Vinícius Júnior", club: "Real Madrid", country: "BR" },
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "bellingham", name: "Jude Bellingham", club: "Real Madrid", country: "GB-ENG" },
  { id: "dembele", name: "Ousmane Dembélé", club: "PSG", country: "FR" },
  { id: "yamal", name: "Lamine Yamal", club: "Barcelone", country: "ES" },
  { id: "salah", name: "Mohamed Salah", club: "Liverpool", country: "EG" },
  { id: "raphinha", name: "Raphinha", club: "Barcelone", country: "BR" },
];

export const TOP_SCORER_NOMINEES = [
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "kane", name: "Harry Kane", club: "Bayern Munich", country: "GB-ENG" },
  { id: "lewandowski", name: "Robert Lewandowski", club: "Barcelone", country: "PL" },
  { id: "osimhen", name: "Victor Osimhen", club: "Galatasaray", country: "NG" },
  { id: "dembele", name: "Ousmane Dembélé", club: "PSG", country: "FR" },
];

export const REVELATION_NOMINEES = [
  { id: "yamal", name: "Lamine Yamal", club: "Barcelone", country: "ES" },
  { id: "endrick", name: "Endrick", club: "Real Madrid", country: "BR" },
  { id: "desire-doue", name: "Désiré Doué", club: "PSG", country: "FR" },
  { id: "kenan-yildiz", name: "Kenan Yıldız", club: "Juventus", country: "TR" },
  { id: "estevao", name: "Estêvão", club: "Chelsea", country: "BR" },
  { id: "warren-zaire-emery", name: "Warren Zaïre-Emery", club: "PSG", country: "FR" },
];

export const FLOP_NOMINEES = [
  { id: "antony", name: "Antony", club: "Man United", country: "BR" },
  { id: "jadon-sancho", name: "Jadon Sancho", club: "Man United", country: "GB-ENG" },
  { id: "hakim-ziyech", name: "Hakim Ziyech", club: "Free agent", country: "MA" },
  { id: "romelu-lukaku", name: "Romelu Lukaku", club: "Napoli", country: "BE" },
  { id: "nicolas-pepe", name: "Nicolas Pépé", club: "Villarreal", country: "CI" },
];

export const AWARD_CATEGORIES = [
  { id: "ballonDor", label: "Ballon d'Or", icon: "🏆", nominees: BALLON_DOR_NOMINEES },
  { id: "topScorer", label: "Meilleur Buteur d'Europe", icon: "⚽", nominees: TOP_SCORER_NOMINEES },
  { id: "revelation", label: "Joueur Révélation", icon: "✨", nominees: REVELATION_NOMINEES },
  { id: "flop", label: "Plus Gros Flop", icon: "💩", nominees: FLOP_NOMINEES },
];
