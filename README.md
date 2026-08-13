# 🏆 Les Pronos de Saison

Web app de pronostics de début de saison façon "Winamax TV / FC Silmi", pour un groupe
privé de 10 à 20 potes. Front hébergé gratuitement sur GitHub Pages, données stockées en
temps réel sur Supabase (gratuit).

## 1. Architecture du projet

```
Football-predictions/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + déploiement automatique sur GitHub Pages
├── public/
│   └── logos/clubs/            # (optionnel) déposez id.png pour afficher un vrai logo
├── supabase/
│   └── schema.sql              # Table `predictions` + règles Row Level Security à exécuter
├── src/
│   ├── components/             # TeamBadge, PlayerCard, TeamSlot, SelectorModal,
│   │                           # LeagueSection, UCLSection, AwardsSection, RecapCard, Navbar
│   ├── config/supabase.js      # URL + clé publique Supabase (à remplir, voir §2)
│   ├── data/                   # clubs.js, players.js — données de référence statiques
│   ├── pages/                  # PredictPage (formulaire + envoi), ParticipantsPage (galerie live)
│   ├── state/                  # PredictionContext (brouillon local)
│   ├── styles/global.css       # Design system Winamax TV (dark + néon + glassmorphism)
│   ├── utils/                  # flags.js, avatarColor.js, predictionsApi.js (lecture/écriture Supabase)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

**Stack :** React 18 + Vite, `react-router-dom` (HashRouter, compatible GitHub Pages sans
config serveur), `html-to-image` pour l'export PNG de la fiche récap, `@supabase/supabase-js`
pour le stockage temps réel. Les données de référence (clubs, joueurs) restent des
fichiers JS statiques ; les pronos du groupe vivent dans Supabase. Pas de compte, pas de
connexion : chaque pote choisit juste un pseudo.

## 2. Comment les pronos sont stockés et partagés (gratuit, sans backend à héberger)

**Recommandation : Supabase (Postgres + Realtime), plan gratuit.**

### Comment ça marche concrètement

1. Ton pote ouvre le site, choisit un pseudo et remplit sa fiche stylée.
2. Il clique **"🚀 Envoyer mon prono"**.
3. Le navigateur écrit directement sa ligne dans la table `predictions` sur Supabase
   (`src/utils/predictionsApi.js`).
4. La page **"Les participants"** est abonnée en temps réel (`Realtime` Supabase) : la
   fiche apparaît **instantanément** chez tout le monde, sans rebuild, sans attendre.
5. Sa fiche est alors **figée définitivement** — impossible de la modifier ou de la
   supprimer, même pour lui. La date d'envoi (`submitted_at`) reste affichée sur sa
   fiche, visible par tout le groupe, comme preuve que rien n'a bougé depuis.

Pas de GitHub Pages à reconstruire pour chaque prono, pas de Google Form caché, pas de
jeton à faire circuler, pas de compte à créer : le site parle directement (et en toute
sécurité) à Supabase.

### Pourquoi cette solution plutôt qu'une autre

| Option | Problème |
|---|---|
| Écriture directe dans le repo GitHub (JS + token) | Le token serait visible côté client → n'importe qui pourrait écrire/écraser les fichiers des autres. **À bannir.** |
| Google Form + Apps Script + commit GitHub | Fonctionne, mais ajoute un rebuild GitHub Pages (1-2 min de latence) et une pièce mobile de plus (Apps Script) pour un résultat moins "temps réel". |
| **Supabase (Postgres + Realtime)** | Gratuit (plan Free très généreux pour 10-20 utilisateurs), écriture directe et instantanée, sécurité appliquée **côté serveur** par des règles Row Level Security — pas par la confidentialité d'une clé, ni par un compte utilisateur. |

### Comment ça empêche la triche (sans aucune connexion/compte)

1. **Une fiche envoyée est techniquement impossible à modifier ou supprimer.** Les
   règles *Row Level Security* (voir `supabase/schema.sql`) n'autorisent que la lecture
   et l'insertion — aucune règle `update` ni `delete` n'existe. En RLS, l'absence de
   policy pour une commande bloque cette commande pour tout le monde, sans exception :
   **Supabase lui-même** refuse la requête, impossible à contourner depuis le
   navigateur, même en trafiquant le code.
2. **Le pseudo est unique.** Impossible pour quelqu'un d'envoyer une fiche sous un
   pseudo déjà pris — la base de données rejette l'insertion (contrainte `unique`,
   insensible à la casse).
3. **La clé publique Supabase (`anon key`) n'est pas un secret.** Contrairement à un
   token GitHub, elle est conçue pour être visible côté client — elle identifie juste le
   projet, elle ne donne aucun droit d'écriture en elle-même (ce sont les règles RLS qui
   décident).
4. **Date d'envoi visible et figée.** Chaque fiche récap affiche `🔒 Envoyé le
   <date/heure> — figé définitivement` (`submitted_at`) — tout le monde peut vérifier
   quand chaque prono a été envoyé, et savoir qu'il n'a plus bougé depuis.
5. **Lecture publique, écriture publique une seule fois.** Tout le monde peut
   *consulter* toutes les fiches (page "Les participants") et en *envoyer* une, mais
   plus jamais la modifier une fois partie.

Seul angle mort (accepté, groupe de potes qui se connaissent) : rien n'empêche
techniquement quelqu'un d'envoyer une fiche bidon sous le pseudo d'un ami avant que
celui-ci envoie la sienne — le pseudo serait alors "pris". Ce serait immédiatement
visible (mauvaise fiche sous son nom) et n'a aucun intérêt pour tricher sur son propre
classement.

### Mise en place (5-10 minutes, une seule fois)

1. Créez un compte sur [supabase.com](https://supabase.com) (gratuit) et un nouveau
   projet.
2. **Base de données** : ouvrez `SQL Editor` dans le dashboard, collez le contenu de
   `supabase/schema.sql`, cliquez `Run`. Ça crée la table `predictions` + les règles de
   sécurité + active le temps réel dessus.
3. **Connecter le site à Supabase** : `Project Settings > API` → copiez `Project URL` et
   la clé `anon public`, collez-les dans `src/config/supabase.js`.
4. Commitez et poussez — c'est prêt, tout le monde peut pronostiquer.

## 3. Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:5173/Football-predictions/`. Tant que `src/config/supabase.js`
n'est pas rempli, le site affiche un avertissement clair à la place du formulaire de
connexion/envoi — le reste de l'interface (blasons, sélecteurs, fiche récap) reste
consultable.

## 4. Déployer sur GitHub Pages — guide pas à pas

1. **Créer le repo GitHub** : nommez-le par exemple `Football-predictions` (public, gratuit).
2. **Adapter `vite.config.js`** : `base: "/Football-predictions/"` doit correspondre
   exactement au nom de votre repo (déjà fait dans ce projet).
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
   Source` → sélectionnez **GitHub Actions** (pas "Deploy from a branch" — sinon GitHub
   utilise son pipeline Jekyll par défaut et ignore complètement le build React).
5. Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement à chaque push
   sur `main` : il build le projet (`npm run build`) et publie `dist/` sur Pages.
6. Après quelques minutes, votre site est en ligne à
   `https://TarikSaibi.github.io/Football-predictions/`.
7. **Mettre en place Supabase** : suivez la section 2 ci-dessus. Une fois
   `src/config/supabase.js` rempli et poussé, tout le monde peut se connecter et
   pronostiquer — les fiches apparaissent en direct pour le groupe.

## 5. Personnaliser

- **Vrais logos de clubs** : déposez `<id>.png` dans `public/logos/clubs/` (voir le
  README de ce dossier pour la liste des ids) — détecté automatiquement, repli propre
  sur le blason généré si absent. Attention aux droits d'image si le site est public.
- **Composition des championnats** : éditez `src/data/clubs.js` (promus/relégués de la
  vraie saison).
- **Buteurs par ligue / nominés récompenses** : éditez `src/data/players.js`.
- **Couleurs / thème** : variables CSS en haut de `src/styles/global.css`.
