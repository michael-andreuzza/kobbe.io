import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

export type TrafficStackBucket = "hour" | "day";

export type StackedChartPoint = {
  label: string;
  visitors: number;
  visits: number;
  pageviews: number;
  bounceRate: number;
  avgDurationMs: number;
  revenueMinor?: number;
  t: number;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
  visits: {
    label: "Visits",
    color: "var(--chart-2)",
  },
  pageviews: {
    label: "Views",
    color: "var(--chart-3)",
  },
  bounceRate: {
    label: "Bounce rate",
    color: "var(--chart-4)",
  },
  sessionTime: {
    label: "Session time",
    color: "var(--chart-5)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

type PinnedTooltipState = {
  index: number;
  x: number;
  y: number;
  chartWidth: number;
  chartHeight: number;
};

export type TrafficChartMetric =
  | "views"
  | "visitors"
  | "visits"
  | "bounceRate"
  | "sessionTime"
  | "revenue";

export function TrafficLineChart(props: {
  points: StackedChartPoint[];
  bucket: TrafficStackBucket;
  variant?: "default" | "hero";
  metric?: TrafficChartMetric;
  displayTimeZone?: string;
  revenueCurrency?: string | null;
}) {
  const {
    points,
    bucket,
    variant = "default",
    metric = "visitors",
    displayTimeZone = "UTC",
    revenueCurrency = null,
  } = props;
  const hero = variant === "hero";
  const chartRootRef = useRef<HTMLDivElement>(null);
  const [pinnedTooltip, setPinnedTooltip] = useState<PinnedTooltipState | null>(null);
  const compactBarRadius = useCompactChartBarRadius();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (points.length === 0) {
    return (
      <div className={`flex w-full min-w-0 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/15 text-sm text-muted-foreground ${hero ? "h-64 sm:h-72" : "h-52"}`}>
        No pageviews in this range yet
      </div>
    );
  }

  const data = points.map((point) => ({
    label: point.label,
    visitors: point.visitors,
    visits: point.visits,
    pageviews: point.pageviews,
    bounceRate: point.visits > 0 ? point.bounceRate * 100 : null,
    sessionTime: point.avgDurationMs / 1000,
    revenue: point.revenueMinor ?? 0,
    t: point.t,
  }));

  const metricKey = metricToDataKey(metric);
  const metricColor = `var(--color-${metricKey})`;
  const metricValues = data
    .map((point) => point[metricKey])
    .filter((value): value is number => typeof value === "number");
  const maxMetric = Math.max(1, ...metricValues);
  const trafficYMax =
    metric === "bounceRate"
      ? 100
      : metric === "sessionTime" || metric === "revenue"
        ? chartCountAxisUpperBound(Math.ceil(maxMetric))
        : chartCountAxisUpperBound(maxMetric);
  const yAxisWidth = metric === "revenue" ? 60 : metric === "sessionTime" ? 44 : 40;
  const maxBarSize = trafficChartMaxBarSize({
    bucket,
    pointCount: data.length,
    hero,
  });
  const pinnedIndex = pinnedTooltip?.index ?? null;
  const pinnedPoint =
    pinnedIndex != null && pinnedIndex >= 0 && pinnedIndex < data.length
      ? data[pinnedIndex]
      : null;
  const pinnedMetricValue = pinnedPoint ? pinnedPoint[metricKey] : null;
  const pinnedMetricNumber =
    typeof pinnedMetricValue === "number" && Number.isFinite(pinnedMetricValue)
      ? pinnedMetricValue
      : null;
  const pinnedDotValue =
    pinnedMetricNumber != null ? Math.max(pinnedMetricNumber, trafficYMax * 0.025) : null;
  const pinnedPayload = pinnedPoint
    ? [{ dataKey: metricKey, value: pinnedMetricValue, payload: pinnedPoint }]
    : [];

  return (
    <div ref={chartRootRef} className="relative w-full min-w-0 text-primary">
      <ChartContainer
        config={chartConfig}
        className={
          (hero ? "h-64 w-full sm:h-72" : "h-52 w-full") + " min-w-0 [&_.recharts-label-list]:hidden"
        }
      >
        <ComposedChart
          accessibilityLayer={false}
          data={data}
          barCategoryGap="10%"
          barGap={1}
          onClick={(nextState) => {
            const nextIndex = Number(nextState.activeTooltipIndex);
            if (!Number.isInteger(nextIndex) || nextIndex < 0) {
              return;
            }
            setPinnedTooltip((current) => {
              if (current?.index === nextIndex) {
                return null;
              }

              const coordinate = nextState.activeCoordinate as
                | { x?: number; y?: number }
                | undefined;
              const bounds = chartRootRef.current?.getBoundingClientRect();
              const chartWidth = bounds?.width ?? 0;
              const chartHeight = bounds?.height ?? 0;
              return {
                index: nextIndex,
                x: typeof coordinate?.x === "number" ? coordinate.x : chartWidth / 2,
                y: typeof coordinate?.y === "number" ? coordinate.y : chartHeight / 2,
                chartWidth,
                chartHeight,
              };
            });
          }}
          margin={
            hero
              ? { top: 16, right: 12, left: metric === "revenue" ? 8 : 4, bottom: 4 }
              : { top: 14, right: 8, left: metric === "revenue" ? 8 : 4, bottom: 4 }
          }
        >
          <CartesianGrid
            yAxisId="traffic"
            strokeDasharray="4 4"
            vertical={false}
            stroke="var(--foreground)"
            strokeOpacity={0.18}
            strokeWidth={1}
            syncWithTicks
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={hero ? 22 : 18}
            tick={{ fontSize: 11, className: "text-muted-foreground" }}
          />
          <YAxis
            yAxisId="traffic"
            tickLine={false}
            axisLine={false}
            width={yAxisWidth}
            allowDecimals={false}
            tickCount={6}
            tickFormatter={(value) =>
              formatTrafficYAxisTick(metric, Number(value), revenueCurrency)
            }
            tick={{ fontSize: 11, className: "text-muted-foreground" }}
            domain={[0, trafficYMax]}
          />
          <ChartTooltip
            content={
              <TrafficChartTooltip
                bucket={bucket}
                displayTimeZone={displayTimeZone}
                metric={metric}
                revenueCurrency={revenueCurrency}
              />
            }
            cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeOpacity: 0.9 }}
          />
          <Bar
            key={metricKey}
            yAxisId="traffic"
            dataKey={metricKey}
            fill={metricColor}
            fillOpacity={1}
            radius={[
              compactBarRadius,
              compactBarRadius,
              compactBarRadius,
              compactBarRadius,
            ]}
            maxBarSize={maxBarSize}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={260}
            animationEasing="ease-out"
            label={false}
            activeBar={{
              fill: metricColor,
              fillOpacity: 1,
              stroke: metricColor,
              strokeWidth: 1,
            }}
          />
          {pinnedPoint ? (
            <ReferenceLine
              yAxisId="traffic"
              x={pinnedPoint.label}
              stroke="var(--border)"
              strokeWidth={1}
              strokeOpacity={0.9}
            />
          ) : null}
          {pinnedPoint && pinnedDotValue != null ? (
            <ReferenceDot
              yAxisId="traffic"
              x={pinnedPoint.label}
              y={pinnedDotValue}
              r={4}
              fill="var(--background)"
              stroke={metricColor}
              strokeWidth={2}
            />
          ) : null}
        </ComposedChart>
      </ChartContainer>
      {pinnedPoint && pinnedTooltip ? (
        <div
          className="pointer-events-none absolute z-10"
          style={pinnedTooltipStyle(pinnedTooltip)}
        >
          <TrafficChartTooltip
            active
            payload={pinnedPayload}
            bucket={bucket}
            displayTimeZone={displayTimeZone}
            metric={metric}
            revenueCurrency={revenueCurrency}
            pinned
          />
        </div>
      ) : null}
    </div>
  );
}

function TrafficChartTooltip({
  active,
  payload,
  bucket,
  displayTimeZone,
  metric,
  revenueCurrency,
  pinned = false,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string | null;
    payload?: { t?: number; label?: string };
  }>;
  bucket: TrafficStackBucket;
  displayTimeZone: string;
  metric: TrafficChartMetric;
  revenueCurrency: string | null;
  pinned?: boolean;
}) {
  if (!active || !payload?.length) {
    return null;
  }
  const pl = payload[0]?.payload;
  const title =
    pl?.t != null
      ? formatTrafficChartTooltipTitle(bucket, pl.t, displayTimeZone)
      : String(pl?.label ?? "");
  const metricKey = metricToDataKey(metric);
  const metricRow = payload.find((row) => String(row.dataKey) === metricKey);

  return (
    <div className="grid max-w-xs min-w-44 gap-1.5 rounded-lg border border-background/10 bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md">
      {pinned ? (
        <div className="text-[10px] font-medium tracking-wide text-background/70 uppercase">
          Pinned
        </div>
      ) : null}
      <div className="font-medium text-background">{title}</div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
          <span className="text-background/70">
            {getMetricLabel(metricKey) ?? metricKey}
          </span>
          <span className="font-mono font-medium text-background tabular-nums">
            {formatMetricValue(metric, metricRow?.value, revenueCurrency)}
          </span>
        </div>
      </div>
    </div>
  );
}

function pinnedTooltipStyle(pinned: PinnedTooltipState): CSSProperties {
  const horizontal =
    pinned.x < 140
      ? "left"
      : pinned.chartWidth - pinned.x < 220
        ? "right"
        : "center";
  const vertical = pinned.y < 96 ? "below" : "above";
  const translateX =
    horizontal === "left" ? "0" : horizontal === "right" ? "-100%" : "-50%";
  const translateY = vertical === "above" ? "-100%" : "0";

  return {
    left: pinned.x,
    top: vertical === "above" ? pinned.y - 12 : pinned.y + 12,
    transform: `translate(${translateX}, ${translateY})`,
  };
}

function metricToDataKey(metric: TrafficChartMetric) {
  if (metric === "visitors") return "visitors";
  if (metric === "visits") return "visits";
  if (metric === "bounceRate") return "bounceRate";
  if (metric === "sessionTime") return "sessionTime";
  if (metric === "revenue") return "revenue";
  return "pageviews";
}

function getMetricLabel(key: string) {
  if (key in chartConfig) {
    return chartConfig[key as keyof typeof chartConfig].label;
  }
  return null;
}

function trafficChartMaxBarSize({
  bucket,
  pointCount,
  hero,
}: {
  bucket: TrafficStackBucket;
  pointCount: number;
  hero: boolean;
}) {
  if (bucket === "hour") {
    return hero ? 18 : 14;
  }
  if (pointCount <= 8) {
    return hero ? 56 : 44;
  }
  if (pointCount <= 14) {
    return hero ? 44 : 34;
  }
  if (pointCount <= 31) {
    return hero ? 30 : 24;
  }
  return hero ? 22 : 18;
}

function useCompactChartBarRadius() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact ? 1 : 3;
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function chartCountAxisUpperBound(maxValue: number) {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return 1;
  }
  const magnitude = 10 ** Math.floor(Math.log10(maxValue));
  const normalized = maxValue / magnitude;
  const nice =
    normalized <= 1
      ? 1
      : normalized <= 2
        ? 2
        : normalized <= 5
          ? 5
          : 10;
  return nice * magnitude;
}

function formatTrafficYAxisTick(
  metric: TrafficChartMetric,
  value: number,
  revenueCurrency?: string | null,
): string {
  if (!Number.isFinite(value)) return "0";
  const rounded = Math.round(value);
  if (metric === "revenue") {
    return formatMinorForAxis(rounded, revenueCurrency);
  }
  return rounded.toLocaleString();
}

function formatMetricValue(
  metric: TrafficChartMetric,
  value: number | string | null | undefined,
  revenueCurrency?: string | null,
): string {
  if (value == null) {
    return metric === "revenue" ? formatMinorForTooltip(0, revenueCurrency ?? null) : "0";
  }
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return metric === "revenue" ? formatMinorForTooltip(0, revenueCurrency ?? null) : "0";
  }
  if (metric === "bounceRate") {
    return `${numericValue.toFixed(1)}%`;
  }
  if (metric === "sessionTime") {
    return formatSecondsShort(numericValue);
  }
  if (metric === "revenue") {
    return formatMinorForTooltip(numericValue, revenueCurrency ?? null);
  }
  return Math.round(numericValue).toLocaleString();
}

function formatMinorForAxis(minor: number, currency: string | null | undefined): string {
  if (!currency) {
    return minor >= 1000 ? `${Math.round(minor / 100)}` : `${minor}`;
  }
  const major = minor / 100;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      notation: major >= 10_000 ? "compact" : "standard",
      maximumFractionDigits: major >= 100 ? 0 : 2,
    }).format(major);
  } catch {
    return `${major.toLocaleString()}`;
  }
}

function formatMinorForTooltip(minor: number, currency: string | null): string {
  if (!currency) {
    return minor > 0 ? `${minor}` : "0";
  }
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(minor / 100);
  } catch {
    return String(minor);
  }
}

function formatSecondsShort(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes < 60) {
    return remainder > 0 ? `${minutes}m ${remainder}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatTrafficChartTooltipTitle(
  bucket: TrafficStackBucket,
  timestamp: number,
  timeZone: string,
): string {
  if (bucket === "day") {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      timeZone,
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(timestamp).toLocaleString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
