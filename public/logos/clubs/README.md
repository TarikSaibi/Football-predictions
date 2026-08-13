# Vrais logos de clubs (optionnel)

Par défaut, chaque club affiche un blason généré en SVG (aucune image externe, donc aucun
souci de droits). Si vous voulez afficher les vrais logos, déposez simplement un fichier
`<id-du-club>.png` dans ce dossier — l'app le détecte automatiquement et l'affiche à la
place du blason généré (repli propre si le fichier est absent).

Exemple : pour Paris Saint-Germain (`id: "psg"`, voir `src/data/clubs.js`), ajoutez
`public/logos/clubs/psg.png`.

Format recommandé : PNG carré, fond transparent, ~256×256px.

**Attention aux droits d'image** : les logos de clubs sont des marques déposées. Ce projet
ne fournit délibérément aucun logo officiel pré-intégré. Si vous en ajoutez, faites-le en
usage privé/non-commercial entre amis, à vos risques, et retirez-les si le club/la ligue
vous le demande.

Liste des ids attendus :

**Ligue 1** : psg, om, asm, ol, losc, ogcn, rcl, sr, rcsa, tfc, fcn, mhsc, sb29, sdr, hac, aja, saco, fcm
**Premier League** : mci, ars, liv, che, mun, tot, avl, new, whu, bha, eve, wol, cry, ful, bre, bou, nfo, afc, sun, lee
**LaLiga** : rma, fcb, atm, ath, rso, bet, vil, sev, val, gir
**Autres (Ligue des Champions)** : fcb-munich, bvb, inter, juve, milan, napoli
