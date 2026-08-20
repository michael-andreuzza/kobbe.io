import type {
  ChartTopReferrer,
  StackedChartPoint,
  TrafficStackBucket,
} from "@/components/landing/dashboard/traffic-chart-types";

const MS_DAY = 86_400_000;

/** Daily buckets above this switch to weekly chart bins. */
export const TRAFFIC_CHART_DAY_BIN_LIMIT = 90;
/** Daily buckets above this switch to monthly chart bins. */
export const TRAFFIC_CHART_WEEK_BIN_LIMIT = 630;

function atUtcStartOfDay(ms: number): number {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function utcWeekStart(ms: number): number {
  const day = new Date(ms).getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  return atUtcStartOfDay(ms - daysSinceMonday * MS_DAY);
}

export function utcMonthStart(ms: number): number {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
}

export function resolveTrafficChartDisplayBucket(
  dayCount: number,
): "day" | "week" | "month" {
  if (dayCount <= TRAFFIC_CHART_DAY_BIN_LIMIT) {
    return "day";
  }
  if (dayCount <= TRAFFIC_CHART_WEEK_BIN_LIMIT) {
    return "week";
  }
  return "month";
}

export function estimateDayCountFromPoints(points: StackedChartPoint[]): number {
  if (points.length === 0) {
    return 0;
  }
  if (points.length === 1) {
    return 1;
  }
  const sortedSpan =
    Math.floor((points[points.length - 1]!.t - points[0]!.t) / MS_DAY) + 1;
  return Math.max(points.length, sortedSpan);
}

function formatBinDateParts(
  ms: number,
  displayTimeZone: string,
): { month: string; day: string; year: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: displayTimeZone,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).formatToParts(new Date(ms));
  return {
    month: parts.find((part) => part.type === "month")?.value ?? "",
    day: parts.find((part) => part.type === "day")?.value ?? "",
    year: parts.find((part) => part.type === "year")?.value ?? "",
  };
}

function formatWeekBinLabel(weekStart: number, displayTimeZone: string): string {
  const weekEnd = weekStart + 6 * MS_DAY;
  const start = formatBinDateParts(weekStart, displayTimeZone);
  const end = formatBinDateParts(weekEnd, displayTimeZone);
  if (start.month === end.month && start.year === end.year) {
    return `${start.month} ${start.day}–${end.day}, ${start.year}`;
  }
  return `${start.month} ${start.day} – ${end.month} ${end.day}, ${end.year}`;
}

function formatMonthBinLabel(monthStart: number, displayTimeZone: string): string {
  return new Date(monthStart).toLocaleDateString("en-US", {
    timeZone: displayTimeZone,
    month: "short",
    year: "numeric",
  });
}

function mergeStackedPointsGroup(
  binStart: number,
  group: StackedChartPoint[],
  bin: "week" | "month",
  displayTimeZone: string,
): StackedChartPoint {
  let pageviews = 0;
  let visitors = 0;
  let visits = 0;
  let revenueMinor = 0;
  let bounceWeighted = 0;
  let durationWeighted = 0;
  let visitWeight = 0;
  const referrerCounts = new Map<string, number>();

  for (const point of group) {
    pageviews += point.pageviews;
    visitors += point.visitors;
    visits += point.visits;
    revenueMinor += point.revenueMinor ?? 0;
    if (point.visits > 0) {
      bounceWeighted += point.bounceRate * point.visits;
      durationWeighted += point.avgDurationMs * point.visits;
      visitWeight += point.visits;
    }
    if (point.topReferrer) {
      referrerCounts.set(
        point.topReferrer.host,
        (referrerCounts.get(point.topReferrer.host) ?? 0) +
          point.topReferrer.count,
      );
    }
  }

  let topReferrer: ChartTopReferrer | null = null;
  for (const [host, count] of referrerCounts) {
    if (!topReferrer || count > topReferrer.count) {
      topReferrer = { host, count };
    }
  }

  const v = Math.min(visitors, pageviews);
  return {
    t: binStart,
    label:
      bin === "week"
        ? formatWeekBinLabel(binStart, displayTimeZone)
        : formatMonthBinLabel(binStart, displayTimeZone),
    pageviews,
    visitors: v,
    visits,
    bounceRate: visitWeight > 0 ? bounceWeighted / visitWeight : 0,
    avgDurationMs: visitWeight > 0 ? durationWeighted / visitWeight : 0,
    revenueMinor,
    topReferrer,
  };
}

function aggregateStackedPointsByBin(
  points: StackedChartPoint[],
  bin: "week" | "month",
  displayTimeZone: string,
): StackedChartPoint[] {
  const groups = new Map<number, StackedChartPoint[]>();
  for (const point of points) {
    const key = bin === "week" ? utcWeekStart(point.t) : utcMonthStart(point.t);
    const group = groups.get(key) ?? [];
    group.push(point);
    groups.set(key, group);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left - right)
    .map(([binStart, group]) =>
      mergeStackedPointsGroup(binStart, group, bin, displayTimeZone),
    );
}

export function finalizeTrafficChartSeries(
  points: StackedChartPoint[],
  sqlBucket: TrafficStackBucket,
  displayTimeZone: string,
  opts?: { forceDisplayBucket?: "day" | "week" | "month" },
): { points: StackedChartPoint[]; bucket: TrafficStackBucket } {
  if (sqlBucket !== "day" || points.length === 0) {
    return { points, bucket: sqlBucket };
  }

  const displayBucket =
    opts?.forceDisplayBucket ??
    resolveTrafficChartDisplayBucket(estimateDayCountFromPoints(points));

  if (displayBucket === "day") {
    return { points, bucket: "day" };
  }

  return {
    points: aggregateStackedPointsByBin(points, displayBucket, displayTimeZone),
    bucket: displayBucket,
  };
}

export function resolveDisplayPinnedIndex(
  dailyPoints: StackedChartPoint[],
  displayPoints: StackedChartPoint[],
  bucket: TrafficStackBucket,
  pinnedIndex: number | null | undefined,
  pinnedDay: string | null | undefined,
): number | null {
  if (bucket === "day") {
    return pinnedIndex ?? null;
  }

  let timestamp: number | undefined;
  if (
    pinnedIndex != null &&
    pinnedIndex >= 0 &&
    pinnedIndex < dailyPoints.length
  ) {
    timestamp = dailyPoints[pinnedIndex]!.t;
  } else if (pinnedDay) {
    const parsed = Date.parse(`${pinnedDay}T00:00:00.000Z`);
    if (Number.isFinite(parsed)) {
      timestamp = parsed;
    }
  }

  if (timestamp == null) {
    return null;
  }

  const binStart =
    bucket === "week" ? utcWeekStart(timestamp) : utcMonthStart(timestamp);
  const index = displayPoints.findIndex((point) => point.t === binStart);
  return index >= 0 ? index : null;
}

export function annotationDayMatchesBucket(
  annotationDay: string,
  bucketStart: number,
  bucket: TrafficStackBucket,
): boolean {
  const parsed = Date.parse(`${annotationDay}T00:00:00.000Z`);
  if (!Number.isFinite(parsed)) {
    return false;
  }
  if (bucket === "day") {
    return atUtcStartOfDay(parsed) === atUtcStartOfDay(bucketStart);
  }
  if (bucket === "week") {
    return utcWeekStart(parsed) === utcWeekStart(bucketStart);
  }
  if (bucket === "month") {
    return utcMonthStart(parsed) === utcMonthStart(bucketStart);
  }
  return false;
}
