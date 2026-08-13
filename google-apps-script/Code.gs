/**
 * PRONOS DE SAISON — Pont Google Form -> GitHub (data/users/<slug>.json)
 * ------------------------------------------------------------------
 * Ce script tourne DANS Google Apps Script (lié au Google Form), jamais
 * dans le navigateur du participant. C'est la clé de la sécurité :
 *   - Le token GitHub (droits "contents: write") n'est connu que du script,
 *     stocké dans les Script Properties (jamais exposé côté client).
 *   - Les participants n'interagissent qu'avec le Google Form. Ils n'ont
 *     ni accès en écriture au repo, ni au token.
 *   - Le Form est configuré en "Limiter à 1 réponse" + "Le compte
 *     enregistre l'adresse e-mail" (Google Sign-In obligatoire) => une
 *     personne = un compte Google = une seule réponse possible, donc
 *     impossible de se faire passer pour quelqu'un d'autre ou de
 *     resoumettre 100 fois.
 *   - Le nom de fichier JSON est dérivé de l'e-mail du répondant (pas
 *     d'un champ texte libre), donc personne ne peut écrire dans le
 *     fichier d'un autre participant en tapant son pseudo.
 *
 * Installation : voir le README, section "Collecte des pronos".
 */

// ==== 1. CONFIGURATION ======================================================

const GITHUB_OWNER = "TarikSaibi";
const GITHUB_REPO = "Football-predictions";
const GITHUB_BRANCH = "main";
// Créé dans Script Properties (menu Project Settings > Script properties),
// PAS écrit en dur ici : clé "GITHUB_TOKEN", valeur = fine-grained PAT avec
// le scope "Contents: Read and write" limité à ce seul repo.
const GITHUB_TOKEN = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");

// ==== 2. TABLES DE CORRESPONDANCE (nom affiché dans le Form -> id JSON) ====
// Doivent rester alignées avec src/data/clubs.js et src/data/players.js.

const LIGUE1 = {
  "Paris Saint-Germain": "psg", "Olympique de Marseille": "om", "AS Monaco": "asm",
  "Olympique Lyonnais": "ol", "LOSC Lille": "losc", "OGC Nice": "ogcn", "RC Lens": "rcl",
  "Stade Rennais": "sr", "RC Strasbourg": "rcsa", "Toulouse FC": "tfc", "FC Nantes": "fcn",
  "Montpellier HSC": "mhsc", "Stade Brestois": "sb29", "Stade de Reims": "sdr",
  "Le Havre AC": "hac", "AJ Auxerre": "aja", "Angers SCO": "saco", "FC Metz": "fcm",
};

const PREMIER_LEAGUE = {
  "Manchester City": "mci", "Arsenal": "ars", "Liverpool": "liv", "Chelsea": "che",
  "Manchester United": "mun", "Tottenham": "tot", "Aston Villa": "avl", "Newcastle": "new",
  "West Ham": "whu", "Brighton": "bha", "Everton": "eve", "Wolves": "wol",
  "Crystal Palace": "cry", "Fulham": "ful", "Brentford": "bre", "Bournemouth": "bou",
  "Nottingham Forest": "nfo", "Burnley": "afc", "Sunderland": "sun", "Leeds United": "lee",
};

const LALIGA = {
  "Real Madrid": "rma", "FC Barcelone": "fcb", "Atlético Madrid": "atm",
  "Athletic Bilbao": "ath", "Real Sociedad": "rso", "Real Betis": "bet",
  "Villarreal CF": "vil", "Séville FC": "sev", "Valence CF": "val", "Girona FC": "gir",
};

const UCL = Object.assign({}, LIGUE1, PREMIER_LEAGUE, LALIGA, {
  "Bayern Munich": "fcb-munich", "Borussia Dortmund": "bvb", "Inter Milan": "inter",
  "Juventus": "juve", "AC Milan": "milan", "SSC Napoli": "napoli",
});

const AWARD_LISTS = {
  ballonDor: {
    "Kylian Mbappé": "mbappe", "Vinícius Júnior": "vinicius", "Erling Haaland": "haaland",
    "Jude Bellingham": "bellingham", "Ousmane Dembélé": "dembele", "Lamine Yamal": "yamal",
    "Mohamed Salah": "salah", "Raphinha": "raphinha",
  },
  topScorer: {
    "Erling Haaland": "haaland", "Kylian Mbappé": "mbappe", "Harry Kane": "kane",
    "Robert Lewandowski": "lewandowski", "Victor Osimhen": "osimhen", "Ousmane Dembélé": "dembele",
  },
  revelation: {
    "Lamine Yamal": "yamal", "Endrick": "endrick", "Désiré Doué": "desire-doue",
    "Kenan Yıldız": "kenan-yildiz", "Estêvão": "estevao", "Warren Zaïre-Emery": "warren-zaire-emery",
  },
  flop: {
    "Antony": "antony", "Jadon Sancho": "jadon-sancho", "Hakim Ziyech": "hakim-ziyech",
    "Romelu Lukaku": "romelu-lukaku", "Nicolas Pépé": "nicolas-pepe",
  },
};

// ==== 3. POINT D'ENTRÉE (déclencheur "Depuis le formulaire" > onFormSubmit) =

function onFormSubmit(e) {
  const answers = e.namedValues; // { "Titre de la question": ["réponse"] }
  const email = e.response.getRespondentEmail(); // nécessite "Recueillir les adresses e-mail"
  const get = (title) => (answers[title] ? answers[title][0] : "");

  const displayName = get("Prénom / Pseudo") || email.split("@")[0];
  const username = slugify(email.split("@")[0]);

  const payload = {
    username,
    displayName,
    avatarColor: pickColor(username),
    submittedAt: new Date().toISOString(),
    ligue1: {
      champion: LIGUE1[get("Ligue 1 - Champion")] || null,
      top4: [1, 2, 3, 4].map((i) => LIGUE1[get(`Ligue 1 - Top 4 (place ${i})`)] || null),
      relegated: [1, 2, 3].map((i) => LIGUE1[get(`Ligue 1 - Relégué ${i}`)] || null),
    },
    premierLeague: {
      champion: PREMIER_LEAGUE[get("Premier League - Champion")] || null,
      top4: [1, 2, 3, 4].map((i) => PREMIER_LEAGUE[get(`Premier League - Top 4 (place ${i})`)] || null),
    },
    laliga: { champion: LALIGA[get("LaLiga - Champion")] || null },
    ucl: {
      winner: UCL[get("Ligue des Champions - Vainqueur")] || null,
      finalist: UCL[get("Ligue des Champions - Finaliste")] || null,
    },
    awards: {
      ballonDor: AWARD_LISTS.ballonDor[get("Ballon d'Or")] || null,
      topScorer: AWARD_LISTS.topScorer[get("Meilleur Buteur d'Europe")] || null,
      revelation: AWARD_LISTS.revelation[get("Joueur Révélation")] || null,
      flop: AWARD_LISTS.flop[get("Plus gros Flop")] || null,
    },
  };

  commitJsonToGitHub(`data/users/${username}.json`, payload);
}

// ==== 4. ÉCRITURE SUR GITHUB (Contents API) =================================

function commitJsonToGitHub(path, payload) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  };

  // 1. Le fichier existe-t-il déjà (mise à jour d'un prono) ? Il faut son "sha".
  let sha = null;
  const getResp = UrlFetchApp.fetch(`${url}?ref=${GITHUB_BRANCH}`, {
    headers,
    muteHttpExceptions: true,
  });
  if (getResp.getResponseCode() === 200) {
    sha = JSON.parse(getResp.getContentText()).sha;
  }

  // 2. Création / mise à jour du fichier (un participant ne peut écrire QUE
  //    son propre fichier, calculé côté serveur à partir de son e-mail).
  const body = {
    message: `Prono de ${payload.displayName} (${payload.username})`,
    content: Utilities.base64Encode(JSON.stringify(payload, null, 2), Utilities.Charset.UTF_8),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const putResp = UrlFetchApp.fetch(url, {
    method: "put",
    headers,
    contentType: "application/json",
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });

  if (putResp.getResponseCode() >= 300) {
    throw new Error(`Échec de l'écriture GitHub (${putResp.getResponseCode()}) : ${putResp.getContentText()}`);
  }
}

// ==== 5. UTILITAIRES =========================================================

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PALETTE = ["#e10600", "#39ff88", "#ffe600", "#2d8cff", "#ff8a00", "#c04dff"];
function pickColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
