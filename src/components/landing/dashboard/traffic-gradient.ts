/**
 * Gradient ramp for the landing chart mockups. All showcase charts share the
 * app ramp, kept in sync with TRAFFIC_GRADIENT_STOP_VALUES in the app's
 * traffic-gradient-chart so mockups match the real dashboard.
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

/**
 * App ramp: the real dashboard's single azure-blue chart color. Mirrors
 * TRAFFIC_CHART_COLOR in the app's traffic-gradient-chart so the hero mockup
 * matches what users actually see (the ramp structure is kept so gradient
 * consumers keep working — every position resolves to the same color).
 */
function flatRamp(l: number, c: number, h: number): GradientRamp {
  return makeRamp(
    [
      { at: 0, l, c, h },
      { at: 1, l, c, h },
    ],
    `oklch(${l} ${c} ${h})`,
  );
}

export const APP_RAMP = flatRamp(0.49, 0.091, 241.534);

/* Per-metric ramps matching the app's chart tokens (colors.css), so each
   showcase chart wears its own metric color. */
export const REVENUE_RAMP = flatRamp(0.581, 0.106, 126.684);
export const PERFORMANCE_RAMP = flatRamp(0.748, 0.161, 56.883);
export const CONVERSIONS_RAMP = flatRamp(0.64, 0.09, 306.519);

/** Default ramp used where a chart has not picked its own. */
export const TRAFFIC_GRADIENT_STOPS = APP_RAMP.stops;

/** Sample the default traffic gradient at position `t` (0-1). */
export const sampleTrafficGradient = APP_RAMP.sample;

/** Active-dot accent from the middle of the default ramp. */
export const GRADIENT_ACCENT = APP_RAMP.accent;
