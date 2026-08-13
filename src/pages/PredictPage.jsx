import { useEffect, useMemo, useState } from "react";
import LeagueSection from "../components/LeagueSection";
import UCLSection from "../components/UCLSection";
import AwardsSection from "../components/AwardsSection";
import RecapCard from "../components/RecapCard";
import { usePrediction } from "../state/PredictionContext";
import { useAuth } from "../state/AuthContext";
import { LIGUE1, PREMIER_LEAGUE, LALIGA } from "../data/clubs";
import { AWARD_CATEGORIES, LIGUE1_SCORERS, PREMIER_LEAGUE_SCORERS, LALIGA_SCORERS } from "../data/players";
import { isSupabaseConfigured } from "../config/supabase";
import { upsertPrediction, fetchMyPrediction } from "../utils/predictionsApi";
import "./PredictPage.css";

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
  const { prediction, setDisplayName, loadPrediction } = usePrediction();
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const [sendState, setSendState] = useState("idle"); // idle | sending | sent | error
  const [prefilled, setPrefilled] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummaryText(prediction), [prediction]);
  const supabaseReady = useMemo(() => isSupabaseConfigured(), []);

  // Si l'ami s'est déjà connecté et a déjà envoyé un prono, on précharge sa fiche
  // pour qu'il puisse la corriger avant le début de la saison.
  useEffect(() => {
    if (!user || prefilled || !supabaseReady) return;
    setPrefilled(true);
    fetchMyPrediction(user.id)
      .then((existing) => {
        if (existing) loadPrediction(existing);
        else if (!prediction.displayName) setDisplayName(user.user_metadata?.full_name || "");
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabaseReady]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    setSendState("sending");
    try {
      await upsertPrediction(user.id, prediction);
      setSendState("sent");
    } catch {
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
          Remplis ta fiche comme au FC Silmi, connecte-toi avec Google puis clique sur "Envoyer mon prono" tout
          en bas — c'est instantané, personne d'autre ne peut voir ta fiche avant que tu l'envoies.
        </p>

        {!supabaseReady ? (
          <p className="warning-banner">
            ⚠️ Le site n'est pas encore relié à Supabase (voir README § "Collecte des pronos" —
            src/config/supabase.js).
          </p>
        ) : authLoading ? (
          <p className="text-muted">Chargement…</p>
        ) : user ? (
          <div className="predict-page__account">
            <span>
              Connecté en tant que <strong>{user.email}</strong>
            </span>
            <button className="predict-page__signout" onClick={signOut} type="button">
              Se déconnecter
            </button>
          </div>
        ) : (
          <button className="btn btn--primary" onClick={signInWithGoogle} type="button">
            🔐 Se connecter avec Google
          </button>
        )}

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
            ✅ Prono envoyé ! Il apparaît déjà dans "Les participants", en direct, pour tout le groupe. Tu peux
            revenir modifier ta fiche à tout moment tant que la saison n'a pas commencé.
          </p>
        ) : (
          <>
            {sendState === "error" && (
              <p className="warning-banner">
                ❌ L'envoi a échoué. Vérifie ta connexion et réessaie.
              </p>
            )}
            <p className="text-muted">
              {user
                ? "Un clic suffit : ton prono part directement, personne ne peut voir ni modifier celui des autres."
                : "Connecte-toi avec Google ci-dessus pour pouvoir envoyer ton prono."}
            </p>
            <button
              className="btn btn--primary predict-page__send-btn"
              onClick={handleSend}
              disabled={!supabaseReady || !user || !prediction.displayName || sendState === "sending"}
              type="button"
            >
              {sendState === "sending" ? "Envoi en cours..." : "🚀 Envoyer mon prono"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
