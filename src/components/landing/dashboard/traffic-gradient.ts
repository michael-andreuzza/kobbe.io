/**
 * Gradient ramps for the landing chart mockups. Each chart on the showcase
 * can use its own ramp; the army ramp stays the default and is kept in sync
 * with TRAFFIC_GRADIENT_STOP_VALUES in the app's traffic-gradient-chart.
 */

type GradientStopValue = { at: number; l: number; c: number; h: number };

export type GradientRamp = {
  stops: { offset: string; color: string }[];
  /** Active-dot accent from the middle of the ramp. */
  accent: string;
  /** Sample the ramp at position `t` (0-1). */
  sample: (t: number, alpha?: number) => string;
};

function makeRamp(
  values: readonly GradientStopValue[],
  accent: string,
): GradientRamp {
  return {
    stops: values.map((stop) => ({
      offset: `${Math.round(stop.at * 100)}%`,
      color: `oklch(${stop.l} ${stop.c} ${stop.h % 360})`,
    })),
    accent,
    sample: (t, alpha = 1) => {
      const clamped = Math.min(1, Math.max(0, t));
      let from = values[0]!;
      let to = values[values.length - 1]!;
      for (let i = 0; i < values.length - 1; i += 1) {
        if (clamped <= values[i + 1]!.at) {
          from = values[i]!;
          to = values[i + 1]!;
          break;
        }
      }
      const span = to.at - from.at;
      const ratio = span > 0 ? (clamped - from.at) / span : 0;
      const l = from.l + (to.l - from.l) * ratio;
      const c = from.c + (to.c - from.c) * ratio;
      const h = (from.h + (to.h - from.h) * ratio) % 360;
      return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)} / ${alpha})`;
    },
  };
}

/** Klein ramp: single electric ultramarine hue, light → saturated dark. */
export const KLEIN_RAMP = makeRamp(
  [
    { at: 0, l: 0.82, c: 0.08, h: 264 },
    { at: 0.38, l: 0.62, c: 0.18, h: 264 },
    { at: 0.7, l: 0.48, c: 0.25, h: 264 },
    { at: 1, l: 0.38, c: 0.22, h: 264 },
  ],
  "oklch(0.5 0.24 264)",
);

/** Signal ramp: the old Kobbe brand orange as a single hue, light → deep. */
export const SIGNAL_RAMP = makeRamp(
  [
    { at: 0, l: 0.88, c: 0.06, h: 35 },
    { at: 0.38, l: 0.74, c: 0.16, h: 35 },
    { at: 0.7, l: 0.62, c: 0.22, h: 35 },
    { at: 1, l: 0.5, c: 0.19, h: 35 },
  ],
  "oklch(0.657 0.23 35.095)",
);

/** Rose ramp: single dusty old-rose hue, light → deep (funnels). */
export const ROSE_RAMP = makeRamp(
  [
    { at: 0, l: 0.9, c: 0.03, h: 15 },
    { at: 0.38, l: 0.74, c: 0.08, h: 15 },
    { at: 0.7, l: 0.6, c: 0.1, h: 15 },
    { at: 1, l: 0.46, c: 0.09, h: 15 },
  ],
  "oklch(0.64 0.09 15)",
);

/** Volt ramp: single highlighter yellow-green hue, bright → deep. */
export const VOLT_RAMP = makeRamp(
  [
    { at: 0, l: 0.95, c: 0.11, h: 125 },
    { at: 0.38, l: 0.84, c: 0.22, h: 125 },
    { at: 0.7, l: 0.68, c: 0.2, h: 125 },
    { at: 1, l: 0.5, c: 0.14, h: 125 },
  ],
  "oklch(0.74 0.21 125)",
);

/** Default ramp used where a chart has not picked its own. */
export const TRAFFIC_GRADIENT_STOPS = KLEIN_RAMP.stops;

/** Sample the default traffic gradient at position `t` (0-1). */
export const sampleTrafficGradient = KLEIN_RAMP.sample;

/** Active-dot accent from the middle of the default ramp. */
export const GRADIENT_ACCENT = KLEIN_RAMP.accent;
