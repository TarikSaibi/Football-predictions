import { useMemo, useState } from "react";
import LeagueSection from "../components/LeagueSection";
import UCLSection from "../components/UCLSection";
import AwardsSection from "../components/AwardsSection";
import RecapCard from "../components/RecapCard";
import { usePrediction } from "../state/PredictionContext";
import { LIGUE1, PREMIER_LEAGUE, LALIGA } from "../data/clubs";
import { AWARD_CATEGORIES } from "../data/players";
import "./PredictPage.css";

// Remplacez par l'URL réelle de votre Google Form (voir README > Étape "Collecte des pronos").
const GOOGLE_FORM_URL = "https://forms.gle/REMPLACER_PAR_VOTRE_FORMULAIRE";

function buildSummaryText(prediction) {
  const name = (list, id) => list.find((c) => c.id === id)?.name || "—";
  const award = (catId) => {
    const cat = AWARD_CATEGORIES.find((c) => c.id === catId);
    return cat?.nominees.find((p) => p.id === prediction.awards[catId])?.name || "—";
  };

  return `PRONOS DE SAISON — ${prediction.displayName || "?"}
—— Ligue 1 ——
Champion : ${name(LIGUE1, prediction.ligue1.champion)}
TOP 4 : ${prediction.ligue1.top4.map((id) => name(LIGUE1, id)).join(", ")}
Relégués : ${prediction.ligue1.relegated.map((id) => name(LIGUE1, id)).join(", ")}

—— Premier League ——
Champion : ${name(PREMIER_LEAGUE, prediction.premierLeague.champion)}
TOP 4 : ${prediction.premierLeague.top4.map((id) => name(PREMIER_LEAGUE, id)).join(", ")}

—— LaLiga ——
Champion : ${name(LALIGA, prediction.laliga.champion)}

—— Ligue des Champions ——
Vainqueur : ${prediction.ucl.winner || "—"}
Finaliste : ${prediction.ucl.finalist || "—"}

—— Récompenses ——
Ballon d'Or : ${award("ballonDor")}
Meilleur Buteur : ${award("topScorer")}
Révélation : ${award("revelation")}
Flop : ${award("flop")}`;
}

export default function PredictPage() {
  const { prediction, setDisplayName } = usePrediction();
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummaryText(prediction), [prediction]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="predict-page container">
      <div className="predict-page__hero fade-in">
        <h1>
          Fais tes <span className="predict-page__accent">pronos</span> avant le coup d'envoi 🎙️
        </h1>
        <p className="text-muted">
          Remplis ta fiche comme au FC Silmi. Une fois terminé, envoie ta réponse via le formulaire officiel
          pour qu'elle soit enregistrée définitivement (voir en bas de page).
        </p>
        <input
          className="predict-page__name-input"
          placeholder="Ton prénom / pseudo"
          value={prediction.displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className="predict-page__sections">
        <LeagueSection
          sectionKey="ligue1"
          title="Ligue 1"
          icon="🇫🇷"
          accentColor="#e10600"
          clubs={LIGUE1}
          showTop4
          showRelegated
        />
        <LeagueSection
          sectionKey="premierLeague"
          title="Premier League"
          icon="🏴󠁧󠁢󠁥󠁮󠁧󠁿"
          accentColor="#3d195b"
          clubs={PREMIER_LEAGUE}
          showTop4
        />
        <LeagueSection
          sectionKey="laliga"
          title="LaLiga"
          icon="🇪🇸"
          accentColor="#ff4b44"
          clubs={LALIGA}
        />
        <UCLSection />
        <AwardsSection />
      </div>

      <div className="predict-page__recap">
        <div className="section-title">
          <span className="accent" />
          <h2>Aperçu de ma fiche</h2>
        </div>
        <RecapCard prediction={prediction} />
      </div>

      <div className="predict-page__submit glass-panel fade-in">
        <div className="section-title">
          <span className="accent" />
          <h2>Dernière étape : envoyer mon prono ✅</h2>
        </div>
        <p className="text-muted">
          Pour éviter que quelqu'un modifie les pronos des autres, cette page ne sauvegarde tes choix qu'en
          local (brouillon). L'enregistrement officiel se fait via notre formulaire — copie ton résumé
          ci-dessous puis colle-le (ou recopie tes choix) dans le formulaire.
        </p>
        <textarea className="predict-page__summary" readOnly value={summary} rows={14} />
        <div className="predict-page__actions">
          <button className="btn btn--ghost" onClick={handleCopy} type="button">
            {copied ? "✅ Copié !" : "📋 Copier mon résumé"}
          </button>
          <a className="btn btn--primary" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
            📨 Ouvrir le formulaire officiel
          </a>
        </div>
      </div>
    </div>
  );
}
