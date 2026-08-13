// Charge tous les fichiers /data/users/*.json (les prédictions "officielles" du groupe).
// En prod, ce dossier est alimenté uniquement via le pipeline Google Form -> GitHub API
// (voir google-apps-script/Code.gs et le README) : aucun utilisateur n'y écrit directement.
const modules = import.meta.glob("../../data/users/*.json", { eager: true });

export function loadAllPredictions() {
  return Object.values(modules)
    .map((mod) => mod.default ?? mod)
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}
