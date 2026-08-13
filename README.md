# 🏆 Les Pronos de Saison

Web app de pronostics de début de saison façon "Winamax TV / FC Silmi", pour un groupe
de 10 à 20 potes. 100% statique, hébergée gratuitement sur GitHub Pages.

## 1. Architecture du projet

```
Football-predictions/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + déploiement automatique sur GitHub Pages
├── data/
│   └── users/                  # 🔒 Les pronos "officiels" — 1 fichier JSON par participant
│       ├── tarik.json          #    (alimenté UNIQUEMENT par le pipeline Google Form, voir §2)
│       ├── sofiane.json
│       ├── lea.json
│       └── yanis.json
├── google-apps-script/
│   └── Code.gs                 # Script à coller dans le Google Form (pont Form -> GitHub)
├── src/
│   ├── assets/images/          # (optionnel) vrais logos/drapeaux si vous en ajoutez
│   ├── components/             # TeamBadge, PlayerCard, TeamSlot, SelectorModal,
│   │                           # LeagueSection, UCLSection, AwardsSection, RecapCard, Navbar
│   ├── data/                   # clubs.js, players.js (données), loadUsers.js (charge /data/users)
│   ├── pages/                  # PredictPage (formulaire), ParticipantsPage (galerie)
│   ├── state/                  # PredictionContext (brouillon local, localStorage)
│   ├── styles/global.css       # Design system Winamax TV (dark + néon + glassmorphism)
│   ├── utils/flags.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

**Stack :** React 18 + Vite, `react-router-dom` (HashRouter, compatible GitHub Pages sans
config serveur), `html-to-image` pour l'export PNG de la fiche récap. Aucune base de
données : les données de référence (clubs, joueurs) sont des fichiers JS statiques, et les
réponses du groupe sont des fichiers JSON versionnés dans `/data/users/`.

## 2. La meilleure solution gratuite pour collecter les pronos sans backend

**Recommandation : Google Form + Google Apps Script → GitHub Contents API.**

### Pourquoi pas autre chose ?

| Option | Problème |
|---|---|
| Écriture directe depuis le navigateur (JS + token GitHub) | Le token serait visible dans le code client → n'importe qui peut écrire/écraser les fichiers des autres. **À bannir.** |
| Formspree / Tally seuls | Très bien pour recevoir les réponses, mais il faut ensuite un humain pour transformer chaque réponse en JSON et commit — fastidieux à 20 personnes, et rien n'empêche visuellement de detecter un doublon. |
| GitHub Issue Forms + Action | Solution élégante mais impose à chaque participant d'avoir un compte GitHub et de comprendre "ouvrir une issue" — trop de friction pour un groupe d'amis non-tech. |
| **Google Form + Apps Script + GitHub API** | Zéro friction (tout le monde a un compte Google), zéro backend à héberger (Apps Script tourne gratuitement chez Google), et le token GitHub ne quitte jamais le serveur d'Apps Script. |

### Comment ça empêche la triche

1. **Le token GitHub reste secret côté serveur.** Il est stocké dans les *Script
   Properties* d'Apps Script (jamais dans le code, jamais côté client) et n'est utilisé
   que par le script — jamais transmis au navigateur du participant.
2. **Une personne = une réponse.** Dans les paramètres du Google Form : `Réponses >
   Limiter à 1 réponse` + `Recueillir les adresses e-mail` (connexion Google
   obligatoire). Impossible de soumettre 10 fois ou de se faire passer pour un autre
   compte Google.
3. **Le nom de fichier n'est jamais fourni par l'utilisateur.** `Code.gs` calcule
   `data/users/<slug-de-l-email>.json` à partir de l'e-mail Google authentifié du
   répondant, pas d'un champ texte libre. Un participant malveillant ne peut donc pas
   écrire "tarik" dans un champ pour écraser le fichier de Tarik.
4. **Le site lui-même (React) est en lecture seule.** L'app ne fait *aucune* écriture
   réseau : elle affiche ce qui est dans `/data/users/`, point.
5. *(Optionnel, pour un niveau de protection supplémentaire)* activez la protection de
   branche `main` sur GitHub pour interdire les pushs directs et n'autoriser que le
   token de l'Apps Script (via une branche dédiée + review), ou utilisez un token
   *fine-grained* limité au seul repo avec scope `Contents: Read and write`.

### Mise en place (10 minutes)

1. Créez un Google Form reprenant les questions listées dans `google-apps-script/Code.gs`
   (les titres de question doivent correspondre exactement — voir les appels à `get("...")`
   dans le script). Pour chaque championnat, utilisez des questions de type **Liste
   déroulante** avec les noms de clubs de `src/data/clubs.js`.
2. Dans le Form : `⋮ > Script editor` pour ouvrir Apps Script, collez le contenu de
   `google-apps-script/Code.gs`.
3. `Project Settings > Script Properties` : ajoutez `GITHUB_TOKEN` = votre Personal
   Access Token GitHub *fine-grained* (scope `Contents: Read and write`, limité au repo
   `Football-predictions`).
4. Modifiez `GITHUB_OWNER` / `GITHUB_REPO` en haut du script.
5. Dans Apps Script : `Déclencheurs (horloge à gauche) > Ajouter un déclencheur` :
   fonction `onFormSubmit`, événement `Depuis le formulaire` > `Lors de la validation
   du formulaire`.
6. Dans les paramètres du Form : `Réponses` → activez `Limiter à 1 réponse` (cela force
   la connexion à un compte Google).
7. Partagez le lien du Form à votre groupe. Chaque réponse crée/actualise
   automatiquement un commit `data/users/<pseudo>.json`, ce qui redéclenche le
   déploiement GitHub Pages (`deploy.yml` écoute les push sur `main`).

## 3. Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:5173`. Les 4 fiches d'exemple (`data/users/*.json`) sont déjà
visibles dans l'onglet "Les participants".

## 4. Déployer sur GitHub Pages — guide pas à pas

1. **Créer le repo GitHub** : nommez-le par exemple `Football-predictions` (public, gratuit).
2. **Adapter `vite.config.js`** : `base: "/Football-predictions/"` doit correspondre
   exactement au nom de votre repo (déjà fait dans ce projet — changez si votre repo
   porte un autre nom).
3. **Pousser le code** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TarikSaibi/Football-predictions.git
   git push -u origin main
   ```
4. **Activer GitHub Pages** : sur GitHub, `Settings > Pages > Build and deployment >
   Source` → sélectionnez **GitHub Actions** (pas "Deploy from a branch").
5. Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement à chaque push
   sur `main` : il build le projet (`npm run build`) et publie `dist/` sur Pages.
6. Après quelques minutes, votre site est en ligne à
   `https://TarikSaibi.github.io/Football-predictions/`.
7. **Mettre en place la collecte des pronos** : suivez la section 2 ci-dessus (Google
   Form + Apps Script). Chaque soumission créera un commit qui redéploiera
   automatiquement le site avec la nouvelle fiche visible dans "Les participants".

## 5. Personnaliser

- **Vrais logos** : remplacez `TeamBadge.jsx` (SVG généré) par des `<img>` pointant vers
  `src/assets/images/clubs/<id>.png`, en respectant le droit à l'image/les CGU des
  fédérations si vous rendez le site public.
- **Composition des championnats** : éditez `src/data/clubs.js` (promus/relégués de la
  vraie saison).
- **Nominés récompenses** : éditez `src/data/players.js`.
- **Couleurs / thème** : variables CSS en haut de `src/styles/global.css`.
