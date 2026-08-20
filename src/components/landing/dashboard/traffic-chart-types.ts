/** Shared shapes for the marketing traffic charts (static hero + pricing sparkline). */

export type TrafficStackBucket = "hour" | "day" | "week" | "month";

export type ChartTopReferrer = {
  host: string;
  count: number;
};

export type StackedChartPoint = {
  label: string;
  visitors: number;
  visits: number;
  pageviews: number;
  bounceRate: number;
  avgDurationMs: number;
  revenueMinor?: number;
  topReferrer?: ChartTopReferrer | null;
  t: number;
};

export type TrafficChartMetric =
  | "views"
  | "visitors"
  | "visits"
  | "bounceRate"
  | "sessionTime"
  | "revenue";

export type TrafficChartAnnotation = {
  id: string;
  /** UTC calendar day, YYYY-MM-DD. */
  day: string;
  label: string;
  /** Chart palette id (`1`–`6`). */
  color?: string;
};
