/**
 * Cool-to-warm gradient used by every chart mockup on the landing page.
 * Keep in sync with TRAFFIC_GRADIENT_STOP_VALUES in the app's
 * traffic-gradient-chart. Hues increase monotonically (0° pink stored as
 * 360°, orange as 410°) so positions between stops can be interpolated.
 */
const TRAFFIC_GRADIENT_STOP_VALUES = [
  { at: 0, l: 0.42, c: 0.2, h: 295 },
  { at: 0.38, l: 0.62, c: 0.28, h: 330 },
  { at: 0.7, l: 0.66, c: 0.24, h: 360 },
  { at: 1, l: 0.72, c: 0.19, h: 410 },
] as const;

export const TRAFFIC_GRADIENT_STOPS = TRAFFIC_GRADIENT_STOP_VALUES.map(
  (stop) => ({
    offset: `${Math.round(stop.at * 100)}%`,
    color: `oklch(${stop.l} ${stop.c} ${stop.h % 360})`,
  }),
);

/** Sample the traffic gradient at position `t` (0-1). */
export function sampleTrafficGradient(t: number, alpha = 1): string {
  const clamped = Math.min(1, Math.max(0, t));
  let from = TRAFFIC_GRADIENT_STOP_VALUES[0];
  let to = TRAFFIC_GRADIENT_STOP_VALUES[TRAFFIC_GRADIENT_STOP_VALUES.length - 1]!;
  for (let i = 0; i < TRAFFIC_GRADIENT_STOP_VALUES.length - 1; i += 1) {
    if (clamped <= TRAFFIC_GRADIENT_STOP_VALUES[i + 1]!.at) {
      from = TRAFFIC_GRADIENT_STOP_VALUES[i]!;
      to = TRAFFIC_GRADIENT_STOP_VALUES[i + 1]!;
      break;
    }
  }
  const span = to.at - from.at;
  const ratio = span > 0 ? (clamped - from.at) / span : 0;
  const l = from.l + (to.l - from.l) * ratio;
  const c = from.c + (to.c - from.c) * ratio;
  const h = (from.h + (to.h - from.h) * ratio) % 360;
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)} / ${alpha})`;
}

/** Active-dot accent from the middle of the ramp. */
export const GRADIENT_ACCENT = "oklch(0.62 0.28 330)";
