/** Shared intensity steps for activity and conversion heatmaps. */
export const HEATMAP_LEGEND_INTENSITIES = [0, 0.25, 0.5, 0.75, 1] as const;

/** Corner radius for heatmap grid cells. */
export const HEATMAP_CELL_RADIUS_CLASS = "rounded-sm";

export function heatmapIntensityCellClass(intensity: number): string {
  if (intensity <= 0) {
    return "bg-muted";
  }
  if (intensity < 0.25) {
    return "bg-primary/20";
  }
  if (intensity < 0.5) {
    return "bg-primary/35";
  }
  if (intensity < 0.75) {
    return "bg-primary/55";
  }
  return "bg-primary/80";
}
