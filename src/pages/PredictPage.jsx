import { useEffect, useMemo, useState } from "react";
import LeagueSection from "../components/LeagueSection";
import UCLSection from "../components/UCLSection";
import AwardsSection from "../components/AwardsSection";
import RecapCard from "../components/RecapCard";
import { usePrediction } from "../state/PredictionContext";
import { LIGUE1, PREMIER_LEAGUE, LALIGA } from "../data/clubs";
import { AWARD_CATEGORIES, LIGUE1_SCORERS, PREMIER_LEAGUE_SCORERS, LALIGA_SCORERS } from "../data/players";
import { isSupabaseConfigured } from "../config/supabase";
import { sendPrediction, ERR_NAME_TAKEN } from "../utils/predictionsApi";
import "./PredictPage.css";

const SUBMITTED_KEY = "pronos-saison:submitted";

function loadSubmitted() {
  try {
    const raw = localStorage.getItem(SUBMITTED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function buildSummaryText(prediction) {
  const name = (list, id) => list.find((c) => c.id === id)?.name || "—";
  const scorer = (list, id) => list.find((p) => p.id === id)?.name || "—";
  const award = (catId) => {
    const cat = AWARD_CATEGORIES.find((c) => c.id === catId);
    return cat?.nominees.find((p) => p.id === prediction.awards[catId])?.name || "—";
  };

  return `PRONOS DE SAISON — ${prediction.displayName || "?"}
—— Ligue 1 ——
Champion : ${name(LIGUE1, prediction.ligue1.champion)}
TOP 4 : ${prediction.ligue1.top4.map((id) => name(LIGUE1, id)).join(", ")}
Meilleur Buteur : ${scorer(LIGUE1_SCORERS, prediction.ligue1.topScorer)}

—— Premier League ——
Champion : ${name(PREMIER_LEAGUE, prediction.premierLeague.champion)}
TOP 4 : ${prediction.premierLeague.top4.map((id) => name(PREMIER_LEAGUE, id)).join(", ")}
Meilleur Buteur : ${scorer(PREMIER_LEAGUE_SCORERS, prediction.premierLeague.topScorer)}

—— LaLiga ——
Champion : ${name(LALIGA, prediction.laliga.champion)}
Meilleur Buteur : ${scorer(LALIGA_SCORERS, prediction.laliga.topScorer)}

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
  const { prediction, setDisplayName, markSubmitted } = usePrediction();
  const [submitted, setSubmitted] = useState(loadSubmitted);
  const [sendState, setSendState] = useState(submitted ? "sent" : "idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummaryText(prediction), [prediction]);
  const supabaseReady = useMemo(() => isSupabaseConfigured(), []);

  // Fiche déjà envoyée depuis ce navigateur (persistée localement) : on ré-affiche la
  // date figée sur la RecapCard même après un rechargement de page.
  useEffect(() => {
    if (submitted) markSubmitted(submitted.submittedAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    setSendState("sending");
    setErrorMsg("");
    try {
      const saved = await sendPrediction(prediction);
      const record = { displayName: saved.displayName, submittedAt: saved.submittedAt };
      localStorage.setItem(SUBMITTED_KEY, JSON.stringify(record));
      setSubmitted(record);
      markSubmitted(saved.submittedAt);
      setSendState("sent");
    } catch (err) {
      setErrorMsg(
        err?.message === ERR_NAME_TAKEN
          ? "❌ Ce pseudo est déjà pris par quelqu'un d'autre — choisis-en un autre (ou vérifie que tu n'as pas déjà envoyé ta fiche)."
          : "❌ L'envoi a échoué. Vérifie ta connexion et réessaie."
      );
      setSendState("error");
    }
  };

  return (
    <div className="predict-page container">
      <div className="predict-page__hero fade-in">
        <h1>
          Fais tes <span className="predict-page__accent">pronos</span> avant le coup d'envoi 🎙️
        </h1>
        <p className="text-muted">
          Remplis ta fiche comme au FC Silmi, choisis un pseudo puis clique sur "Envoyer mon prono" tout en bas.
          Attention : une fois envoyée, ta fiche est <strong>définitivement figée</strong> (impossible à modifier
          ou supprimer) et la date d'envoi est visible par tout le monde — vérifie bien avant d'envoyer !
        </p>

        {!supabaseReady && (
          <p className="warning-banner">
            ⚠️ Le site n'est pas encore relié à Supabase (voir README § "Collecte des pronos" —
            src/config/supabase.js).
          </p>
        )}

        <input
          className="predict-page__name-input"
          placeholder="Ton prénom / pseudo"
          value={prediction.displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={sendState === "sent"}
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
          scorers={LIGUE1_SCORERS}
        />
        <LeagueSection
          sectionKey="premierLeague"
          title="Premier League"
          icon="🏴󠁧󠁢󠁥󠁮󠁧󠁿"
          accentColor="#3d195b"
          clubs={PREMIER_LEAGUE}
          showTop4
          scorers={PREMIER_LEAGUE_SCORERS}
        />
        <LeagueSection
          sectionKey="laliga"
          title="LaLiga"
          icon="🇪🇸"
          accentColor="#ff4b44"
          clubs={LALIGA}
          scorers={LALIGA_SCORERS}
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
        <button className="btn btn--ghost predict-page__copy-btn" onClick={handleCopy} type="button">
          {copied ? "✅ Copié !" : "📋 Copier mon résumé (texte, pour WhatsApp/Discord...)"}
        </button>
      </div>

      <div className="predict-page__submit glass-panel fade-in">
        <div className="section-title">
          <span className="accent" />
          <h2>Dernière étape : envoyer mon prono ✅</h2>
        </div>

        {sendState === "sent" ? (
          <p className="predict-page__sent">
            ✅ Prono envoyé sous le pseudo « {submitted?.displayName} » ! Il apparaît déjà dans "Les
            participants", en direct, pour tout le groupe — figé définitivement, impossible à modifier.
          </p>
        ) : (
          <>
            {sendState === "error" && <p className="warning-banner">{errorMsg}</p>}
            <p className="text-muted">
              Un clic suffit : ton prono part directement, en clair pour tout le groupe. Relis bien ta fiche
              ci-dessus avant d'envoyer, tu ne pourras plus la changer ensuite.
            </p>
            <button
              className="btn btn--primary predict-page__send-btn"
              onClick={handleSend}
              disabled={!supabaseReady || !prediction.displayName || sendState === "sending"}
              type="button"
            >
              {sendState === "sending" ? "Envoi en cours..." : "🚀 Envoyer mon prono (définitif)"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
