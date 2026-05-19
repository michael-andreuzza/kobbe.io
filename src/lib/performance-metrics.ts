/** Mirrors app.kobbe.io `app/lib/performance-metrics.ts` — keep thresholds in sync. */

export const WEB_VITAL_NAMES = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const
export type WebVitalName = (typeof WEB_VITAL_NAMES)[number]

export type WebVitalRating = "good" | "needs-improvement" | "poor"

export function ratingForMetric(
  name: WebVitalName,
  value: number,
): WebVitalRating {
  switch (name) {
    case "LCP":
      if (value < 2500) return "good"
      if (value <= 4000) return "needs-improvement"
      return "poor"
    case "INP":
      if (value < 200) return "good"
      if (value <= 500) return "needs-improvement"
      return "poor"
    case "CLS":
      if (value < 0.1) return "good"
      if (value <= 0.25) return "needs-improvement"
      return "poor"
    case "FCP":
      if (value < 1800) return "good"
      if (value <= 3000) return "needs-improvement"
      return "poor"
    case "TTFB":
      if (value < 800) return "good"
      if (value <= 1800) return "needs-improvement"
      return "poor"
    default:
      return "poor"
  }
}

export function ratingDisplayLabel(rating: WebVitalRating): string {
  if (rating === "good") return "Good"
  if (rating === "needs-improvement") return "Watch"
  return "Poor"
}

export function ratingColorForValue(
  metric: WebVitalName,
  value: number | null,
): string {
  if (value == null || !Number.isFinite(value)) {
    return "var(--muted)"
  }
  const rating = ratingForMetric(metric, value)
  if (rating === "good") return "var(--success)"
  if (rating === "needs-improvement") return "var(--warning)"
  return "var(--destructive)"
}

export function ratingLabelForValue(
  metric: WebVitalName,
  value: number | null,
): string {
  if (value == null || !Number.isFinite(value)) {
    return "No sample"
  }
  return ratingDisplayLabel(ratingForMetric(metric, value))
}

export function formatPerfTooltipValue(
  metric: WebVitalName,
  value: unknown,
): string {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n)) {
    return "—"
  }
  if (metric === "CLS") {
    return n.toFixed(3)
  }
  return `${Math.round(n).toLocaleString()} ms`
}
