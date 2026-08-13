import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pronos-saison:draft";

const EMPTY_PREDICTION = {
  displayName: "",
  ligue1: { champion: null, top4: [null, null, null, null], relegated: [null, null, null] },
  premierLeague: { champion: null, top4: [null, null, null, null] },
  laliga: { champion: null },
  ucl: { winner: null, finalist: null },
  awards: { ballonDor: null, topScorer: null, revelation: null, flop: null },
};

const PredictionContext = createContext(null);

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PREDICTION;
    return { ...EMPTY_PREDICTION, ...JSON.parse(raw) };
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
