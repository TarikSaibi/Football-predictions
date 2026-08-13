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

// Buteurs par championnat (pour la prédiction "Meilleur Buteur" de chaque ligue).
export const LIGUE1_SCORERS = [
  { id: "lacazette", name: "Alexandre Lacazette", club: "Lyon", country: "FR" },
  { id: "greenwood", name: "Mason Greenwood", club: "Marseille", country: "GB-ENG" },
  { id: "barcola", name: "Bradley Barcola", club: "PSG", country: "FR" },
  { id: "balogun", name: "Folarin Balogun", club: "AS Monaco", country: "US" },
  { id: "kalimuendo", name: "Arnaud Kalimuendo", club: "Rennes", country: "FR" },
];

export const PREMIER_LEAGUE_SCORERS = [
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "isak", name: "Alexander Isak", club: "Liverpool", country: "SE" },
  { id: "watkins", name: "Ollie Watkins", club: "Aston Villa", country: "GB-ENG" },
  { id: "wood", name: "Chris Wood", club: "Nottingham Forest", country: "NZ" },
  { id: "wissa", name: "Yoane Wissa", club: "Brentford", country: "CD" },
];

export const LALIGA_SCORERS = [
  { id: "lewandowski", name: "Robert Lewandowski", club: "Barcelone", country: "PL" },
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "budimir", name: "Ante Budimir", club: "Osasuna", country: "HR" },
  { id: "sorloth", name: "Alexander Sørloth", club: "Atlético Madrid", country: "NO" },
  { id: "ayoze", name: "Ayoze Pérez", club: "Villarreal", country: "ES" },
];

export const AWARD_CATEGORIES = [
  { id: "ballonDor", label: "Ballon d'Or", icon: "🏆", nominees: BALLON_DOR_NOMINEES },
  { id: "topScorer", label: "Meilleur Buteur d'Europe", icon: "⚽", nominees: TOP_SCORER_NOMINEES },
  { id: "revelation", label: "Joueur Révélation", icon: "✨", nominees: REVELATION_NOMINEES },
  { id: "flop", label: "Plus Gros Flop", icon: "💩", nominees: FLOP_NOMINEES },
];
