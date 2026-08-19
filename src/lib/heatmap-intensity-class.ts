/** Shared intensity steps for activity and conversion heatmaps. */
export const HEATMAP_LEGEND_INTENSITIES = [0, 0.25, 0.5, 0.75, 1] as const;

/** Corner radius for heatmap grid cells. */
export const HEATMAP_CELL_RADIUS_CLASS = "rounded-md";

export type HeatmapIntensityTone = "grid" | "total";

/** Sqrt curve so mid-range buckets stay visible when one cell dominates. */
export function scaleHeatmapIntensity(value: number, max: number): number {
  if (max <= 0 || value <= 0) return 0;
  return Math.sqrt(value / max);
}

/**
 * Matches dashboard lollipops: gray traffic stems (`foreground`) and brand
 * accent on totals (same as revenue / active lollipop heads).
 */
export function heatmapIntensityCellClass(
  intensity: number,
  tone: HeatmapIntensityTone = "grid",
): string {
  if (tone === "total") {
    if (intensity <= 0) return "bg-brand/10";
    if (intensity < 0.25) return "bg-brand/25";
    if (intensity < 0.5) return "bg-brand/45";
    if (intensity < 0.75) return "bg-brand/65";
    return "bg-brand/90";
  }

  if (intensity <= 0) return "bg-foreground/8";
  if (intensity < 0.25) return "bg-foreground/20";
  if (intensity < 0.5) return "bg-foreground/35";
  if (intensity < 0.75) return "bg-foreground/55";
  return "bg-foreground/80";
}

/** Label color matched to cell fill for readable counts. */
export function heatmapIntensityLabelClass(
  intensity: number,
  tone: HeatmapIntensityTone = "grid",
): string {
  if (tone === "total") {
    if (intensity >= 0.45) return "text-white";
    if (intensity <= 0) return "text-muted-foreground/70";
    return "text-foreground";
  }

  if (intensity >= 0.55) {
    return "text-background";
  }
  if (intensity <= 0) {
    return "text-muted-foreground/70";
  }
  return "text-foreground";
}
