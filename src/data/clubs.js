// Données FICTIVES / à ajuster par vous-même chaque saison (promotions, relégations...).
// colorA/colorB alimentent le blason SVG généré (voir components/TeamBadge.jsx).

export const LIGUE1 = [
  { id: "psg", name: "Paris Saint-Germain", short: "PSG", colorA: "#0b1a4d", colorB: "#e10600" },
  { id: "om", name: "Olympique de Marseille", short: "OM", colorA: "#1a5fb4", colorB: "#ffffff" },
  { id: "asm", name: "AS Monaco", short: "ASM", colorA: "#e2001a", colorB: "#ffffff" },
  { id: "ol", name: "Olympique Lyonnais", short: "OL", colorA: "#1c2b5c", colorB: "#e2001a" },
  { id: "losc", name: "LOSC Lille", short: "LOSC", colorA: "#c8102e", colorB: "#001489" },
  { id: "ogcn", name: "OGC Nice", short: "OGCN", colorA: "#c8102e", colorB: "#000000" },
  { id: "rcl", name: "RC Lens", short: "RCL", colorA: "#c8102e", colorB: "#ffe600" },
  { id: "sr", name: "Stade Rennais", short: "SRFC", colorA: "#e2001a", colorB: "#000000" },
  { id: "rcsa", name: "RC Strasbourg", short: "RCSA", colorA: "#1a5fb4", colorB: "#ffffff" },
  { id: "tfc", name: "Toulouse FC", short: "TFC", colorA: "#5b2a86", colorB: "#e2001a" },
  { id: "fcn", name: "FC Nantes", short: "FCN", colorA: "#fce300", colorB: "#1c8a3c" },
  { id: "mhsc", name: "Montpellier HSC", short: "MHSC", colorA: "#f6871f", colorB: "#1a1a1a" },
  { id: "sb29", name: "Stade Brestois", short: "SB29", colorA: "#e2001a", colorB: "#ffffff" },
  { id: "sdr", name: "Stade de Reims", short: "SDR", colorA: "#e2001a", colorB: "#ffffff" },
  { id: "hac", name: "Le Havre AC", short: "HAC", colorA: "#1a5fb4", colorB: "#ffffff" },
  { id: "aja", name: "AJ Auxerre", short: "AJA", colorA: "#1a1a1a", colorB: "#ffffff" },
  { id: "saco", name: "Angers SCO", short: "SCO", colorA: "#000000", colorB: "#ffffff" },
  { id: "fcm", name: "FC Metz", short: "FCM", colorA: "#8a0303", colorB: "#ffe600" },
];

export const PREMIER_LEAGUE = [
  { id: "mci", name: "Manchester City", short: "MCI", colorA: "#6cabdd", colorB: "#1c2c5b" },
  { id: "ars", name: "Arsenal", short: "ARS", colorA: "#ef0107", colorB: "#023474" },
  { id: "liv", name: "Liverpool", short: "LIV", colorA: "#c8102e", colorB: "#f6ec37" },
  { id: "che", name: "Chelsea", short: "CHE", colorA: "#034694", colorB: "#ffffff" },
  { id: "mun", name: "Manchester United", short: "MUN", colorA: "#da291c", colorB: "#fbe122" },
  { id: "tot", name: "Tottenham", short: "TOT", colorA: "#132257", colorB: "#ffffff" },
  { id: "avl", name: "Aston Villa", short: "AVL", colorA: "#670e36", colorB: "#95bfe5" },
  { id: "new", name: "Newcastle", short: "NEW", colorA: "#241f20", colorB: "#ffffff" },
  { id: "whu", name: "West Ham", short: "WHU", colorA: "#7a263a", colorB: "#1bb1e7" },
  { id: "bha", name: "Brighton", short: "BHA", colorA: "#0057b8", colorB: "#ffcd00" },
  { id: "eve", name: "Everton", short: "EVE", colorA: "#003399", colorB: "#ffffff" },
  { id: "wol", name: "Wolves", short: "WOL", colorA: "#fdb913", colorB: "#231f20" },
  { id: "cry", name: "Crystal Palace", short: "CRY", colorA: "#1b458f", colorB: "#c4122e" },
  { id: "ful", name: "Fulham", short: "FUL", colorA: "#000000", colorB: "#ffffff" },
  { id: "bre", name: "Brentford", short: "BRE", colorA: "#e30613", colorB: "#ffffff" },
  { id: "bou", name: "Bournemouth", short: "BOU", colorA: "#da291c", colorB: "#000000" },
  { id: "nfo", name: "Nottingham Forest", short: "NFO", colorA: "#dd0000", colorB: "#ffffff" },
  { id: "afc", name: "Burnley", short: "BUR", colorA: "#6c1d45", colorB: "#99d6ea" },
  { id: "sun", name: "Sunderland", short: "SUN", colorA: "#eb172b", colorB: "#ffffff" },
  { id: "lee", name: "Leeds United", short: "LEE", colorA: "#ffffff", colorB: "#1d428a" },
];

export const LALIGA = [
  { id: "rma", name: "Real Madrid", short: "RMA", colorA: "#ffffff", colorB: "#febe10" },
  { id: "fcb", name: "FC Barcelone", short: "FCB", colorA: "#a50044", colorB: "#004d98" },
  { id: "atm", name: "Atlético Madrid", short: "ATM", colorA: "#c8102e", colorB: "#1c2c5b" },
  { id: "ath", name: "Athletic Bilbao", short: "ATH", colorA: "#e2001a", colorB: "#ffffff" },
  { id: "rso", name: "Real Sociedad", short: "RSO", colorA: "#0067b1", colorB: "#ffffff" },
  { id: "bet", name: "Real Betis", short: "BET", colorA: "#1c8a3c", colorB: "#ffffff" },
  { id: "vil", name: "Villarreal CF", short: "VIL", colorA: "#ffe600", colorB: "#1c2c5b" },
  { id: "sev", name: "Séville FC", short: "SEV", colorA: "#ffffff", colorB: "#c8102e" },
  { id: "val", name: "Valence CF", short: "VAL", colorA: "#ff7900", colorB: "#000000" },
  { id: "gir", name: "Girona FC", short: "GIR", colorA: "#e2001a", colorB: "#ffffff" },
];

// Sélection élargie pour la Ligue des Champions (vainqueur / finaliste)
export const UCL_CONTENDERS = [
  ...["psg", "om", "asm"].map((id) => LIGUE1.find((c) => c.id === id)),
  ...["mci", "ars", "liv", "che", "mun", "tot"].map((id) => PREMIER_LEAGUE.find((c) => c.id === id)),
  ...["rma", "fcb", "atm", "ath"].map((id) => LALIGA.find((c) => c.id === id)),
  { id: "fcb-munich", name: "Bayern Munich", short: "FCB.M", colorA: "#dc052d", colorB: "#0066b2" },
  { id: "bvb", name: "Borussia Dortmund", short: "BVB", colorA: "#fde100", colorB: "#000000" },
  { id: "inter", name: "Inter Milan", short: "INT", colorA: "#0068a8", colorB: "#000000" },
  { id: "juve", name: "Juventus", short: "JUV", colorA: "#000000", colorB: "#ffffff" },
  { id: "milan", name: "AC Milan", short: "MIL", colorA: "#fb090b", colorB: "#000000" },
  { id: "napoli", name: "SSC Napoli", short: "NAP", colorA: "#12a0d7", colorB: "#ffffff" },
];

export const LEAGUES = {
  ligue1: { label: "Ligue 1", clubs: LIGUE1, color: "#e2001a" },
  premierLeague: { label: "Premier League", clubs: PREMIER_LEAGUE, color: "#3d195b" },
  laliga: { label: "LaLiga", clubs: LALIGA, color: "#ff4b44" },
};
