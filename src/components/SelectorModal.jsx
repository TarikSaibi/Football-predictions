import { useMemo, useState } from "react";
import "./SelectorModal.css";

// Modale de sélection générique (clubs ou joueurs), avec recherche.
export default function SelectorModal({ title, items, getLabel, renderItem, onPick, onClose, excludeIds = [] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => !excludeIds.includes(item.id))
      .filter((item) => (q ? getLabel(item).toLowerCase().includes(q) : true));
  }, [items, query, excludeIds, getLabel]);

  return (
    <div className="selector-modal__overlay" onClick={onClose}>
      <div className="selector-modal glass-panel fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="selector-modal__header">
          <h3>{title}</h3>
          <button className="selector-modal__close" onClick={onClose} type="button" aria-label="Fermer">
            ✕
          </button>
        </div>
        <input
          className="selector-modal__search"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="selector-modal__grid">
          {filtered.map((item) => (
            <button
              key={item.id}
              className="selector-modal__item neon-border"
              onClick={() => onPick(item)}
              type="button"
            >
              {renderItem(item)}
            </button>
          ))}
          {filtered.length === 0 && <p className="text-muted">Aucun résultat.</p>}
        </div>
      </div>
    </div>
  );
}
