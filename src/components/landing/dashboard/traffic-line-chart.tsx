import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  Cell,
  ComposedChart,
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

type LollipopShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  active?: boolean;
  background?: { y?: number; height?: number };
};

function LollipopBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  const fill = props.active
    ? "var(--brand)"
    : (props.fill ?? "var(--foreground)");
  const cx = x + width / 2;
  const railTop = typeof props.background?.y === "number" ? props.background.y : y;
  const railBottom =
    typeof props.background?.height === "number"
      ? railTop + props.background.height
      : y + height;
  const stemOpacity = props.active ? 0.9 : 0.7;
  const railOpacity = props.active ? 0.18 : 0.1;

  return (
    <g>
      <line
        x1={cx}
        y1={railTop}
        x2={cx}
        y2={railBottom}
        stroke={fill}
        strokeOpacity={railOpacity}
        strokeWidth={1}
        strokeLinecap="round"
      />
      {height > 0 ? (
        <line
          x1={cx}
          y1={y}
          x2={cx}
          y2={railBottom}
          stroke={fill}
          strokeOpacity={stemOpacity}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

function BrandActiveLollipopBarShape(props: LollipopShapeProps) {
  return <LollipopBarShape {...props} active fill="var(--brand)" />;
}

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
  spotlightIndex?: number;
  displayTimeZone?: string;
  revenueCurrency?: string | null;
}) {
  const {
    points,
    bucket,
    variant = "default",
    metric = "visitors",
    spotlightIndex,
    displayTimeZone = "UTC",
    revenueCurrency = null,
  } = props;
  const hero = variant === "hero";
  const chartRootRef = useRef<HTMLDivElement>(null);
  const [pinnedTooltip, setPinnedTooltip] = useState<PinnedTooltipState | null>(
    null,
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  if (points.length === 0) {
    return (
      <div
        className={`border-border/80 bg-muted/15 text-muted-foreground flex w-full min-w-0 items-center justify-center rounded-xl border border-dashed text-sm ${hero ? "h-64 sm:h-72" : "h-52"}`}
      >
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
  const yAxisWidth =
    metric === "revenue" ? 60 : metric === "sessionTime" ? 44 : 40;
  const barMaxSize = chartBarMaxSize(data.length);
  const barCategoryGap = chartBarCategoryGap(data.length);
  const pinnedIndex = pinnedTooltip?.index ?? null;
  const pinnedPoint =
    pinnedIndex != null && pinnedIndex >= 0 && pinnedIndex < data.length
      ? data[pinnedIndex]
      : null;
  const spotlightPoint =
    spotlightIndex != null &&
    spotlightIndex >= 0 &&
    spotlightIndex < data.length
      ? data[spotlightIndex]
      : null;
  const displayPoint = pinnedPoint ?? spotlightPoint;
  const displayMetricValue = displayPoint ? displayPoint[metricKey] : null;
  const displayMetricNumber =
    typeof displayMetricValue === "number" &&
    Number.isFinite(displayMetricValue)
      ? displayMetricValue
      : null;
  const displayDotValue =
    displayMetricNumber != null
      ? Math.max(displayMetricNumber, trafficYMax * 0.025)
      : null;
  const pinnedPayload = pinnedPoint
    ? [
        {
          dataKey: metricKey,
          value: pinnedPoint[metricKey],
          payload: pinnedPoint,
        },
      ]
    : [];
  const spotlightPayload = spotlightPoint
    ? [
        {
          dataKey: metricKey,
          value: spotlightPoint[metricKey],
          payload: spotlightPoint,
        },
      ]
    : [];
  const spotlightCursor =
    hero && spotlightIndex != null && spotlightPoint && displayDotValue != null
      ? {
          x: chartCursorXPercent(spotlightIndex, data.length),
          y: chartCursorYPercent(displayDotValue, trafficYMax),
        }
      : null;

  return (
    <div ref={chartRootRef} className="text-primary relative w-full min-w-0">
      <style>{`
        @keyframes kobbeHeroCursorClick {
          0%, 56%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.45);
          }
          68% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(1);
          }
          84% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.55);
          }
        }
      `}</style>
      <ChartContainer
        config={chartConfig}
        className={
          (hero ? "h-64 w-full sm:h-72" : "h-52 w-full") +
          " min-w-0 [&_.recharts-label-list]:hidden"
        }
      >
        <ComposedChart
          accessibilityLayer={false}
          data={data}
          barCategoryGap={barCategoryGap}
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
                x:
                  typeof coordinate?.x === "number"
                    ? coordinate.x
                    : chartWidth / 2,
                y:
                  typeof coordinate?.y === "number"
                    ? coordinate.y
                    : chartHeight / 2,
                chartWidth,
                chartHeight,
              };
            });
          }}
          margin={
            hero
              ? {
                  top: 20,
                  right: 12,
                  left: 0,
                  bottom: 16,
                }
              : {
                  top: 18,
                  right: 8,
                  left: 0,
                  bottom: 16,
                }
          }
        >
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            interval="preserveStartEnd"
            minTickGap={hero ? 28 : 22}
            tick={{
              fontSize: 10.5,
              className: "fill-muted-foreground/80 font-medium",
            }}
          />
          <YAxis
            yAxisId="traffic"
            orientation="right"
            tickLine={false}
            axisLine={false}
            width={yAxisWidth}
            allowDecimals={false}
            tickCount={3}
            tickMargin={4}
            tickFormatter={(value) =>
              formatTrafficYAxisTick(metric, Number(value), revenueCurrency)
            }
            tick={{
              fontSize: 10.5,
              className: "fill-muted-foreground/70 font-medium tabular-nums",
            }}
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
            cursor={false}
          />
          <Bar
            key={metricKey}
            yAxisId="traffic"
            dataKey={metricKey}
            fill={metricColor}
            maxBarSize={barMaxSize}
            shape={<LollipopBarShape />}
            activeBar={<BrandActiveLollipopBarShape />}
            isAnimationActive={!prefersReducedMotion}
            animationDuration={320}
            animationEasing="ease-out"
          >
            {data.map((point, index) => (
              <Cell
                key={`${point.t}-${metricKey}`}
                fill={
                  index === pinnedIndex || index === spotlightIndex
                    ? "var(--brand)"
                    : metricColor
                }
              />
            ))}
          </Bar>
          {displayPoint ? (
            <ReferenceLine
              key={`spotlight-line-${metricKey}-${displayPoint.label}`}
              yAxisId="traffic"
              x={displayPoint.label}
              stroke="var(--brand)"
              strokeWidth={1}
              strokeOpacity={0.45}
              strokeDasharray="3 3"
            />
          ) : null}
        </ComposedChart>
      </ChartContainer>
      {spotlightCursor && !pinnedTooltip ? (
        <div
          className="pointer-events-none absolute z-10 transition-[top,left] duration-700 ease-out"
          style={{
            left: `${spotlightCursor.x}%`,
            top: `${spotlightCursor.y}%`,
          }}
          aria-hidden="true"
        >
          <span
            key={`spotlight-click-${metricKey}-${spotlightIndex}`}
            className="border-foreground/40 absolute size-8 rounded-full border"
            style={{ animation: "kobbeHeroCursorClick 1.2s ease-out both" }}
          />
          <span className="text-foreground relative block h-5 w-4 -translate-x-1 -translate-y-1 rotate-[-18deg] drop-shadow-sm">
            <svg
              viewBox="0 0 18 22"
              fill="none"
              className="h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M3 2.5L15 13.5L9.4 14.1L6.5 19.2L3 2.5Z"
                fill="var(--background)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      ) : null}
      {spotlightCursor && spotlightPoint && !pinnedTooltip ? (
        <div
          className="pointer-events-none absolute z-20 transition-[top,left] duration-700 ease-out"
          style={spotlightTooltipStyle(spotlightCursor)}
          aria-hidden="true"
        >
          <TrafficChartTooltip
            active
            payload={spotlightPayload}
            bucket={bucket}
            displayTimeZone={displayTimeZone}
            metric={metric}
            revenueCurrency={revenueCurrency}
          />
        </div>
      ) : null}
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
    <div className="border-background/10 bg-foreground text-background grid max-w-xs min-w-44 gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-md">
      {pinned ? (
        <div className="text-background/70 text-[10px] font-medium tracking-wide uppercase">
          Pinned
        </div>
      ) : null}
      <div className="text-background font-medium">{title}</div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
          <span className="text-background/70">
            {getMetricLabel(metricKey) ?? metricKey}
          </span>
          <span className="text-background font-mono font-medium tabular-nums">
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

function spotlightTooltipStyle(cursor: {
  x: number;
  y: number;
}): CSSProperties {
  const alignRight = cursor.x > 72;
  const placeBelow = cursor.y < 28;

  return {
    left: `${cursor.x}%`,
    top: placeBelow ? `${cursor.y + 8}%` : `${cursor.y - 6}%`,
    transform: `translate(${alignRight ? "-100%" : "12px"}, ${
      placeBelow ? "0" : "-100%"
    })`,
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

function chartCursorXPercent(index: number, pointCount: number) {
  if (pointCount <= 1) {
    return 52;
  }

  const plotStart = 14;
  const plotEnd = 92;
  return plotStart + (index / (pointCount - 1)) * (plotEnd - plotStart);
}

function chartCursorYPercent(value: number, maxValue: number) {
  const ratio = maxValue > 0 ? Math.min(Math.max(value / maxValue, 0), 1) : 0;
  const plotTop = 20;
  const plotBottom = 72;
  return plotBottom - ratio * (plotBottom - plotTop);
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

function chartBarMaxSize(pointCount: number): number {
  if (pointCount <= 7) return 64;
  if (pointCount <= 14) return 48;
  if (pointCount <= 30) return 32;
  if (pointCount <= 60) return 22;
  if (pointCount <= 120) return 14;
  return 10;
}

function chartBarCategoryGap(pointCount: number): string | number {
  if (pointCount <= 7) return "12%";
  if (pointCount <= 30) return "10%";
  if (pointCount <= 90) return "6%";
  return "2%";
}

function chartCountAxisUpperBound(maxValue: number) {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return 1;
  }
  const magnitude = 10 ** Math.floor(Math.log10(maxValue));
  const normalized = maxValue / magnitude;
  const nice =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
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
    return metric === "revenue"
      ? formatMinorForTooltip(0, revenueCurrency ?? null)
      : "0";
  }
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return metric === "revenue"
      ? formatMinorForTooltip(0, revenueCurrency ?? null)
      : "0";
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

function formatMinorForAxis(
  minor: number,
  currency: string | null | undefined,
): string {
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
