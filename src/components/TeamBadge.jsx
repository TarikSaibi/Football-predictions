import { useState } from "react";

// Charge un vrai logo depuis /public/logos/clubs/<id>.png si présent
// (voir public/logos/clubs/README.md pour la marche à suivre). Sinon,
// repli automatique sur un blason SVG généré (aucune image externe requise).
export default function TeamBadge({ club, size = 48 }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!club) return null;

  const logoSrc = `${import.meta.env.BASE_URL}logos/clubs/${club.id}.png`;

  if (!imgFailed) {
    return (
      <img
        src={logoSrc}
        width={size}
        height={size}
        alt={club.name}
        style={{ objectFit: "contain", flexShrink: 0 }}
        onError={() => setImgFailed(true)}
      />
    );
  }

  const { short, colorA, colorB } = club;
  const clipId = `clip-${club.id}`;
  const shieldPath = "M32 2 L58 12 V30 C58 46 47 57 32 62 C17 57 6 46 6 30 V12 Z";

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={club.name}>
      <defs>
        <clipPath id={clipId}>
          <path d={shieldPath} />
        </clipPath>
      </defs>

      {/* Écusson bicolore façon maillot (moitié colorA / moitié colorB) plutôt qu'un
          simple dégradé : plus lisible et plus proche d'une identité de club au coup d'œil. */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="32" height="64" fill={colorA} />
        <rect x="32" y="0" width="32" height="64" fill={colorB} />
      </g>

      <path
        d={shieldPath}
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1"
      />
      <path
        d={shieldPath}
        fill="none"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="2.5"
        transform="scale(0.94)"
        style={{ transformOrigin: "32px 32px" }}
      />

      <circle cx="32" cy="32" r="15" fill="rgba(0,0,0,0.32)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="800"
        letterSpacing="0.5"
        fontSize={short.length > 3 ? 12 : 15}
        fill="#ffffff"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
      >
        {short}
      </text>
    </svg>
  );
}
