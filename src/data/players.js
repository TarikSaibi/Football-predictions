// Données FICTIVES / illustratives — à mettre à jour selon la saison réelle.
// Chaque joueur : id, name, club (short), country (code ISO2 pour le drapeau), colorA/colorB (accent carte).
// Volumes volontairement plus fournis pour Ligue des Champions / Premier League / LaLiga,
// et plus légers pour la Ligue 1.

export const BALLON_DOR_NOMINEES = [
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "vinicius", name: "Vinícius Júnior", club: "Real Madrid", country: "BR" },
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "bellingham", name: "Jude Bellingham", club: "Real Madrid", country: "GB-ENG" },
  { id: "dembele", name: "Ousmane Dembélé", club: "PSG", country: "FR" },
  { id: "yamal", name: "Lamine Yamal", club: "Barcelone", country: "ES" },
  { id: "salah", name: "Mohamed Salah", club: "Liverpool", country: "EG" },
  { id: "raphinha", name: "Raphinha", club: "Barcelone", country: "BR" },
  { id: "pedri", name: "Pedri", club: "Barcelone", country: "ES" },
  { id: "rodri", name: "Rodri", club: "Man City", country: "ES" },
  { id: "odegaard", name: "Martin Ødegaard", club: "Arsenal", country: "NO" },
  { id: "saka", name: "Bukayo Saka", club: "Arsenal", country: "GB-ENG" },
  { id: "wirtz", name: "Florian Wirtz", club: "Liverpool", country: "DE" },
  { id: "hakimi", name: "Achraf Hakimi", club: "PSG", country: "MA" },
];

export const TOP_SCORER_NOMINEES = [
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "kane", name: "Harry Kane", club: "Bayern Munich", country: "GB-ENG" },
  { id: "lewandowski", name: "Robert Lewandowski", club: "Barcelone", country: "PL" },
  { id: "osimhen", name: "Victor Osimhen", club: "Galatasaray", country: "NG" },
  { id: "dembele", name: "Ousmane Dembélé", club: "PSG", country: "FR" },
  { id: "gyokeres", name: "Viktor Gyökeres", club: "Arsenal", country: "SE" },
  { id: "isak", name: "Alexander Isak", club: "Liverpool", country: "SE" },
  { id: "watkins", name: "Ollie Watkins", club: "Aston Villa", country: "GB-ENG" },
  { id: "vinicius", name: "Vinícius Júnior", club: "Real Madrid", country: "BR" },
  { id: "raphinha", name: "Raphinha", club: "Barcelone", country: "BR" },
  { id: "guirassy", name: "Serhou Guirassy", club: "Dortmund", country: "GN" },
];

export const REVELATION_NOMINEES = [
  { id: "yamal", name: "Lamine Yamal", club: "Barcelone", country: "ES" },
  { id: "endrick", name: "Endrick", club: "Real Madrid", country: "BR" },
  { id: "desire-doue", name: "Désiré Doué", club: "PSG", country: "FR" },
  { id: "kenan-yildiz", name: "Kenan Yıldız", club: "Juventus", country: "TR" },
  { id: "estevao", name: "Estêvão", club: "Chelsea", country: "BR" },
  { id: "warren-zaire-emery", name: "Warren Zaïre-Emery", club: "PSG", country: "FR" },
  { id: "rico-lewis", name: "Rico Lewis", club: "Man City", country: "GB-ENG" },
  { id: "lewis-skelly", name: "Myles Lewis-Skelly", club: "Arsenal", country: "GB-ENG" },
  { id: "cubarsi", name: "Pau Cubarsí", club: "Barcelone", country: "ES" },
  { id: "huijsen", name: "Dean Huijsen", club: "Real Madrid", country: "ES" },
];

export const FLOP_NOMINEES = [
  { id: "antony", name: "Antony", club: "Man United", country: "BR" },
  { id: "jadon-sancho", name: "Jadon Sancho", club: "Man United", country: "GB-ENG" },
  { id: "hakim-ziyech", name: "Hakim Ziyech", club: "Free agent", country: "MA" },
  { id: "romelu-lukaku", name: "Romelu Lukaku", club: "Napoli", country: "BE" },
  { id: "nicolas-pepe", name: "Nicolas Pépé", club: "Villarreal", country: "CI" },
  { id: "hojlund", name: "Rasmus Højlund", club: "Man United", country: "DK" },
  { id: "rashford", name: "Marcus Rashford", club: "Barcelone", country: "GB-ENG" },
  { id: "grealish", name: "Jack Grealish", club: "Everton", country: "GB-ENG" },
];

// Buteurs par championnat (pour la prédiction "Meilleur Buteur" de chaque ligue).
export const LIGUE1_SCORERS = [
  { id: "lacazette", name: "Alexandre Lacazette", club: "Lyon", country: "FR" },
  { id: "greenwood", name: "Mason Greenwood", club: "Marseille", country: "GB-ENG" },
  { id: "barcola", name: "Bradley Barcola", club: "PSG", country: "FR" },
  { id: "balogun", name: "Folarin Balogun", club: "AS Monaco", country: "US" },
  { id: "kalimuendo", name: "Arnaud Kalimuendo", club: "Rennes", country: "FR" },
  { id: "biereth", name: "Mika Biereth", club: "AS Monaco", country: "DK" },
  { id: "nuamah", name: "Ernest Nuamah", club: "Lyon", country: "GH" },
  { id: "emegha", name: "Emanuel Emegha", club: "Strasbourg", country: "NL" },
];

export const PREMIER_LEAGUE_SCORERS = [
  { id: "haaland", name: "Erling Haaland", club: "Man City", country: "NO" },
  { id: "isak", name: "Alexander Isak", club: "Liverpool", country: "SE" },
  { id: "watkins", name: "Ollie Watkins", club: "Aston Villa", country: "GB-ENG" },
  { id: "wood", name: "Chris Wood", club: "Nottingham Forest", country: "NZ" },
  { id: "wissa", name: "Yoane Wissa", club: "Brentford", country: "CD" },
  { id: "gyokeres", name: "Viktor Gyökeres", club: "Arsenal", country: "SE" },
  { id: "salah", name: "Mohamed Salah", club: "Liverpool", country: "EG" },
  { id: "palmer", name: "Cole Palmer", club: "Chelsea", country: "GB-ENG" },
  { id: "saka", name: "Bukayo Saka", club: "Arsenal", country: "GB-ENG" },
  { id: "mbeumo", name: "Bryan Mbeumo", club: "Man United", country: "CM" },
  { id: "cunha", name: "Matheus Cunha", club: "Man United", country: "BR" },
  { id: "mateta", name: "Jean-Philippe Mateta", club: "Crystal Palace", country: "FR" },
  { id: "welbeck", name: "Danny Welbeck", club: "Brighton", country: "GB-ENG" },
  { id: "muniz", name: "Rodrigo Muniz", club: "Fulham", country: "BR" },
];

export const LALIGA_SCORERS = [
  { id: "lewandowski", name: "Robert Lewandowski", club: "Barcelone", country: "PL" },
  { id: "mbappe", name: "Kylian Mbappé", club: "Real Madrid", country: "FR" },
  { id: "budimir", name: "Ante Budimir", club: "Osasuna", country: "HR" },
  { id: "sorloth", name: "Alexander Sørloth", club: "Atlético Madrid", country: "NO" },
  { id: "ayoze", name: "Ayoze Pérez", club: "Villarreal", country: "ES" },
  { id: "vinicius", name: "Vinícius Júnior", club: "Real Madrid", country: "BR" },
  { id: "raphinha", name: "Raphinha", club: "Barcelone", country: "BR" },
  { id: "griezmann", name: "Antoine Griezmann", club: "Atlético Madrid", country: "FR" },
  { id: "alvarez", name: "Julián Álvarez", club: "Atlético Madrid", country: "AR" },
  { id: "ferran-torres", name: "Ferran Torres", club: "Barcelone", country: "ES" },
  { id: "aspas", name: "Iago Aspas", club: "Celta Vigo", country: "ES" },
  { id: "nico-williams", name: "Nico Williams", club: "Athletic Bilbao", country: "ES" },
];

export const AWARD_CATEGORIES = [
  { id: "ballonDor", label: "Ballon d'Or", icon: "🏆", nominees: BALLON_DOR_NOMINEES },
  { id: "topScorer", label: "Meilleur Buteur d'Europe", icon: "⚽", nominees: TOP_SCORER_NOMINEES },
  { id: "revelation", label: "Joueur Révélation", icon: "✨", nominees: REVELATION_NOMINEES },
  { id: "flop", label: "Plus Gros Flop", icon: "💩", nominees: FLOP_NOMINEES },
];
