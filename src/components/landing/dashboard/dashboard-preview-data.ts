import type { StackedChartPoint, TrafficChartAnnotation } from "./traffic-line-chart";

const MS_DAY = 86_400_000;

type PreviewChartConfig = {
  dayCount: number;
  startMs: number;
  pinnedOffset: number;
  visitorPeak: number;
  revenueStartIndex: number;
};

const defaultPreviewChartConfig: PreviewChartConfig = {
  dayCount: 90,
  startMs: Date.UTC(2026, 4, 21),
  pinnedOffset: 14,
  visitorPeak: 720,
  revenueStartIndex: 42,
};

/** High-traffic marketplace shape for local chart QA (Lexington Themes–scale bars). */
const densePreviewChartConfig: PreviewChartConfig = {
  dayCount: 180,
  startMs: Date.UTC(2026, 1, 4),
  pinnedOffset: 8,
  visitorPeak: 18_500,
  revenueStartIndex: 0,
};

function shouldUseDensePreviewChart(): boolean {
  const flag = import.meta.env.PUBLIC_DENSE_DASHBOARD_PREVIEW;
  return flag === "1" || flag === "true";
}

const activePreviewChartConfig = shouldUseDensePreviewChart()
  ? densePreviewChartConfig
  : defaultPreviewChartConfig;

function formatPreviewDayLabel(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function formatPreviewRangeLabel(points: StackedChartPoint[]): string {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  return `${formatPreviewDayLabel(first.t)} – ${formatPreviewDayLabel(last.t)}`;
}

function pointUtcDay(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

const PREVIEW_CHART_SEED = 0x4b0bb4;

function previewRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function utcDayOfWeek(ms: number): number {
  return new Date(ms).getUTCDay();
}

function generatePreviewChartPoints(config: PreviewChartConfig): StackedChartPoint[] {
  const dense = config.visitorPeak >= 2_000;
  const rng = previewRng(PREVIEW_CHART_SEED + config.dayCount + config.visitorPeak);
  const count = config.dayCount;

  return Array.from({ length: count }, (_, index) => {
    const t = config.startMs + index * MS_DAY;
    const isPinnedDay = index === config.pinnedOffset;
    const dayOfWeek = utcDayOfWeek(t);
    const trend = 0.52 + 0.36 * (index / Math.max(1, count - 1));
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    const midweekBoost = dayOfWeek >= 2 && dayOfWeek <= 4 ? 1.05 : 1;
    const noise = 0.76 + rng() * 0.48;
    const spikeRoll = rng();
    const spike =
      spikeRoll > 0.968 ? 1.38 : spikeRoll > 0.905 ? 1.14 : 1;
    const dip = rng() > 0.972 ? 0.52 : 1;

    let ratio = trend * weekendFactor * midweekBoost * noise * spike * dip;
    ratio = Math.min(0.96, Math.max(0.12, ratio));

    const visitors = isPinnedDay
      ? Math.round(config.visitorPeak * 0.91)
      : Math.max(8, Math.round(ratio * config.visitorPeak));

    const visits = Math.max(
      visitors,
      Math.round(visitors * (1.01 + rng() * 0.13)),
    );
    const pageviews = Math.max(
      visits,
      Math.round(visits * (1.82 + rng() * 0.62)),
    );

    const bounceBase =
      0.3 + (dayOfWeek === 0 || dayOfWeek === 6 ? 0.05 : 0);
    const bounceRate = Math.min(
      0.56,
      Math.max(0.22, bounceBase + (rng() - 0.5) * 0.11),
    );

    const avgDurationMs = Math.round(86_000 + ratio * 54_000 + rng() * 16_000);

    let revenueMinor = 0;
    if (index >= config.revenueStartIndex && rng() > 0.4) {
      revenueMinor = Math.round(
        visitors * (0.48 + rng() * 0.92) * (420 + rng() * 360),
      );
    }
    if (isPinnedDay) {
      revenueMinor = Math.max(
        revenueMinor,
        Math.round(visitors * (dense ? 640 : 520)),
      );
    }

    const point: StackedChartPoint = {
      label: formatPreviewDayLabel(t),
      visitors,
      visits,
      pageviews,
      bounceRate,
      avgDurationMs,
      revenueMinor,
      t,
    };

    if (isPinnedDay) {
      point.topReferrer = {
        host: "lexingtonthemes.com",
        count: dense ? 4_820 : Math.round(visitors * 0.48),
      };
    }

    return point;
  });
}

const basePoints = generatePreviewChartPoints(activePreviewChartConfig);

/** Hero dashboard preview: pinned chart day with note + top referrer. */
export const heroChartPoints = basePoints;

export const heroChartRangeLabel = formatPreviewRangeLabel(basePoints);

export const heroChartPinnedIndex = activePreviewChartConfig.pinnedOffset;

export const heroChartPinnedDay =
  pointUtcDay(
    basePoints[activePreviewChartConfig.pinnedOffset]?.t ??
      activePreviewChartConfig.startMs +
        activePreviewChartConfig.pinnedOffset * MS_DAY,
  );

export const heroChartAnnotations: TrafficChartAnnotation[] = [
  {
    id: "hero-note-1",
    day: heroChartPinnedDay,
    label: "X launch on 28.5.26",
    color: "4",
  },
];

function sumMetric(
  points: StackedChartPoint[],
  metric: keyof StackedChartPoint,
) {
  return points.reduce((total, point) => total + Number(point[metric] ?? 0), 0);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatMoneyMinor(minor: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: minor >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(minor / 100);
}

function formatRevenueKpi(points: StackedChartPoint[]) {
  const grossMinor = sumMetric(points, "revenueMinor");
  const refundMinor = Math.round(grossMinor * 0.018);
  const netMinor = grossMinor - refundMinor;
  const paidOrders = Math.max(1, Math.round(grossMinor / 41_700));
  const refundCount = Math.max(1, Math.round(paidOrders * 0.015));
  const netOrders = Math.max(0, paidOrders - refundCount);
  return {
    revenue: {
      display: formatMoneyMinor(netMinor),
      rightHint: netOrders.toLocaleString(),
      label: "Net revenue",
    },
    refunds: {
      display: formatMoneyMinor(refundMinor),
      rightHint: refundCount.toLocaleString(),
    },
  };
}

function buildKpi(points: StackedChartPoint[]) {
  const visits = sumMetric(points, "visits");
  const bounceAvg =
    points.reduce((sum, point) => sum + point.bounceRate, 0) /
    Math.max(1, points.length);
  const sessionAvg =
    points.reduce((sum, point) => sum + point.avgDurationMs, 0) /
    Math.max(1, points.length);
  return {
    showComparison: true,
    visitors: {
      display: formatCompact(sumMetric(points, "visitors")),
      deltaPct: 18.4,
      tone: "good" as const,
    },
    visits: {
      display: formatCompact(visits),
      deltaPct: 15.2,
      tone: "good" as const,
    },
    views: {
      display: formatCompact(sumMetric(points, "pageviews")),
      deltaPct: 22.1,
      tone: "good" as const,
    },
    bounceRate: {
      display: `${Math.round(bounceAvg * 100)}%`,
      deltaPct: -6.3,
      tone: "good" as const,
    },
    sessionTime: {
      display: `${Math.floor(sessionAvg / 60000)}m ${Math.round((sessionAvg % 60000) / 1000)}s`,
      deltaPct: 9.8,
      tone: "good" as const,
    },
    ...formatRevenueKpi(points),
  };
}

export const heroChartKpi = buildKpi(heroChartPoints);
