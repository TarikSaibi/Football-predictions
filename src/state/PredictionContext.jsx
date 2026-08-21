import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pronos-saison:draft";

const EMPTY_PREDICTION = {
  displayName: "",
  ligue1: { champion: null, top: [null, null, null], topScorer: null },
  premierLeague: { champion: null, top: [null, null, null, null, null, null], topScorer: null },
  laliga: { champion: null, top: [null, null, null], topScorer: null },
  ucl: { winner: null, finalist: null },
  awards: { ballonDor2026: null, ballonDor2027: null, topScorer: null, revelation: null, flop: null },
};

const PredictionContext = createContext(null);

// Fusionne un brouillon sauvegardé (potentiellement d'une ancienne version de l'appli,
// ex. tailles de TOP différentes) avec la forme actuelle, section par section, pour
// éviter un plantage si la forme a changé entre deux visites.
function mergeSection(empty, saved) {
  if (!saved || typeof saved !== "object") return empty;
  const merged = { ...empty, ...saved };
  if (Array.isArray(empty.top) && !(Array.isArray(saved.top) && saved.top.length === empty.top.length)) {
    merged.top = empty.top;
  }
  return merged;
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PREDICTION;
    const saved = JSON.parse(raw);
    const merged = { ...EMPTY_PREDICTION, ...saved };
    for (const key of ["ligue1", "premierLeague", "laliga", "ucl", "awards"]) {
      merged[key] = mergeSection(EMPTY_PREDICTION[key], saved[key]);
    }
    return merged;
  } catch {
    return EMPTY_PREDICTION;
  }
}

export function PredictionProvider({ children }) {
  const [prediction, setPrediction] = useState(loadDraft);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prediction));
  }, [prediction]);

  const api = useMemo(
    () => ({
      prediction,
      setDisplayName: (displayName) => setPrediction((p) => ({ ...p, displayName })),
      setField: (section, key, value) =>
        setPrediction((p) => ({ ...p, [section]: { ...p[section], [key]: value } })),
      setArrayField: (section, key, index, value) =>
        setPrediction((p) => {
          const arr = [...p[section][key]];
          arr[index] = value;
          return { ...p, [section]: { ...p[section], [key]: arr } };
        }),
      reset: () => setPrediction(EMPTY_PREDICTION),
      markSubmitted: (submittedAt) => setPrediction((p) => ({ ...p, submittedAt })),
    }),
    [prediction]
  );

  return <PredictionContext.Provider value={api}>{children}</PredictionContext.Provider>;
}

export function usePrediction() {
  const ctx = useContext(PredictionContext);
  if (!ctx) throw new Error("usePrediction doit être utilisé dans <PredictionProvider>");
  return ctx;
}

export { EMPTY_PREDICTION };
