/**
 * Chart colors for the landing mockups: a single cobalt hue where depth
 * carries intensity. The spectrum ramp renders value-mapped gradients; the
 * flat ramps carry one shade each for small details (breakdown bars, pills,
 * dots).
 */

export type GradientRamp = {
  stops: { offset: string; color: string }[];
  /** Accent for dots, chips, and bars. */
  accent: string;
  /** Sample the ramp at position `t` (0-1). */
  sample: (t: number, alpha?: number) => string;
};

type HexStop = { at: number; hex: string };

const SPECTRUM: readonly HexStop[] = [
  { at: 0, hex: "#2f5fd0" },
  { at: 0.5, hex: "#5b8ae0" },
  { at: 1, hex: "#a3c2ef" },
];

function hexChannel(hex: string, index: number): number {
  return parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16);
}

function sampleHexStops(stops: readonly HexStop[], t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  let from = stops[0]!;
  let to = stops[stops.length - 1]!;
  for (let i = 0; i < stops.length - 1; i += 1) {
    if (clamped <= stops[i + 1]!.at) {
      from = stops[i]!;
      to = stops[i + 1]!;
      break;
    }
  }
  const span = to.at - from.at;
  const ratio = span > 0 ? (clamped - from.at) / span : 0;
  const channels = [0, 1, 2].map((index) =>
    Math.round(
      hexChannel(from.hex, index) +
        (hexChannel(to.hex, index) - hexChannel(from.hex, index)) * ratio,
    ),
  );
  return `rgb(${channels[0]} ${channels[1]} ${channels[2]})`;
}

/**
 * Single-hue ramp: rendered vertically over a series, strong maps to the
 * peaks and pale to the baseline, so depth reads as intensity.
 */
export const SPECTRUM_RAMP: GradientRamp = {
  stops: SPECTRUM.map((stop) => ({
    offset: `${Math.round(stop.at * 100)}%`,
    color: stop.hex,
  })),
  accent: "#2f5fd0",
  sample: (t, alpha = 1) => {
    const color = sampleHexStops(SPECTRUM, t);
    return alpha >= 1 ? color : color.replace(")", ` / ${alpha})`);
  },
};

function flatRamp(hex: string): GradientRamp {
  return {
    stops: [
      { offset: "0%", color: hex },
      { offset: "100%", color: hex },
    ],
    accent: hex,
    sample: (_t, alpha = 1) =>
      alpha >= 1
        ? hex
        : `color-mix(in oklab, ${hex} ${Math.round(alpha * 100)}%, transparent)`,
  };
}

/* Per-metric shades of the cobalt accent. Keep in sync with the --chart-*
   tokens in colors.css. */
export const APP_RAMP = flatRamp("#2f5fd0");
export const REVENUE_RAMP = flatRamp("#1e3f96");
export const PERFORMANCE_RAMP = flatRamp("#6d93e0");
export const CONVERSIONS_RAMP = flatRamp("#4a76d8");
