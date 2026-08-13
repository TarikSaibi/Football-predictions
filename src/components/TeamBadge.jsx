// Blason généré en SVG (aucune image externe nécessaire).
// Remplacez-le à terme par de vrais logos dans /assets/images/clubs/<id>.svg (voir README).
export default function TeamBadge({ club, size = 48 }) {
  if (!club) return null;
  const { short, colorA, colorB } = club;
  const gradId = `grad-${club.id}`;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={club.name}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorA} />
          <stop offset="100%" stopColor={colorB} />
        </linearGradient>
      </defs>
      <path
        d="M32 2 L58 12 V30 C58 46 47 57 32 62 C17 57 6 46 6 30 V12 Z"
        fill={`url(#${gradId})`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="800"
        fontSize={short.length > 3 ? 14 : 18}
        fill="#ffffff"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
      >
        {short}
      </text>
    </svg>
  );
}
