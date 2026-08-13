const PALETTE = ["#e10600", "#39ff88", "#ffe600", "#2d8cff", "#ff8a00", "#c04dff"];

export function pickColor(seed = "") {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
