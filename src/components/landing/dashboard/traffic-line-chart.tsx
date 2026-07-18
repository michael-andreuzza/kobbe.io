import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  Cell,
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
import { hostnameFromReferrer } from "@/lib/referrer-favicon";

import {
  BrandActiveLollipopBarShape,
  LollipopBarShape,
  chartBarCategoryGap,
  chartBarMaxSize,
} from "./chart-lollipop";
import { ReferrerFavicon } from "./referrer-favicon";

const TRAFFIC_CHART_TOOLTIP_LINE_GAP = 16;

export type TrafficStackBucket = "hour" | "day";

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

const primaryChartColor = "var(--primary)";

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: primaryChartColor,
  },
  visits: {
    label: "Visits",
    color: primaryChartColor,
  },
  pageviews: {
    label: "Views",
    color: primaryChartColor,
  },
  bounceRate: {
    label: "Bounce rate",
    color: primaryChartColor,
  },
  sessionTime: {
    label: "Session time",
    color: primaryChartColor,
  },
  revenue: {
    label: "Revenue",
    color: primaryChartColor,
  },
} satisfies ChartConfig;

type PinnedTooltipState = {
  index: number;
  x: number;
  y: number;
  chartWidth: number;
  chartHeight: number;
};

type AnnotationMarker = {
  day: string;
  index: number;
  label: string;
  notes: string[];
};

type AnnotationDotShapeProps = {
  cx?: number;
  cy?: number;
  viewBox?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
  notes: string[];
  onSelect: (coordinate: { x?: number; y?: number }) => void;
};

export type TrafficChartAnnotation = {
  id: string;
  /** UTC calendar day, YYYY-MM-DD. */
  day: string;
  label: string;
};

function pointUtcDay(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
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
  variant?: "default" | "hero" | "compact";
  metric?: TrafficChartMetric;
  spotlightIndex?: number;
  displayTimeZone?: string;
  revenueCurrency?: string | null;
  annotations?: TrafficChartAnnotation[] | null;
  /** Marketing preview: keep the annotation popover open for this UTC day. */
  previewPinnedDay?: string | null;
  /** Marketing preview: pin by chart point index (overrides day lookup when set). */
  previewPinnedIndex?: number | null;
  /** Fill the parent height instead of a fixed chart height. */
  fitContainer?: boolean;
  /** Interactive note editor rendered inside the pinned annotation popover. */
  annotationFooter?: ReactNode;
}) {
  const {
    points,
    bucket,
    variant = "default",
    metric = "visitors",
    spotlightIndex,
    displayTimeZone = "UTC",
    revenueCurrency = null,
    annotations = null,
    previewPinnedDay = null,
    previewPinnedIndex = null,
    fitContainer = false,
    annotationFooter = null,
  } = props;
  const hero = variant === "hero";
  const compact = variant === "compact";
  const chartRootRef = useRef<HTMLDivElement>(null);
  const [pinnedTooltip, setPinnedTooltip] = useState<PinnedTooltipState | null>(
    null,
  );
  const [pinnedAnnotation, setPinnedAnnotation] =
    useState<PinnedTooltipState | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const annotationsByDay = (() => {
    const map = new Map<string, TrafficChartAnnotation[]>();
    if (!annotations?.length) {
      return map;
    }
    for (const annotation of annotations) {
      const list = map.get(annotation.day) ?? [];
      list.push(annotation);
      map.set(annotation.day, list);
    }
    return map;
  })();

  const pinAnnotationAtIndex = useCallback(
    (nextIndex: number, coordinate?: { x?: number; y?: number }) => {
      if (!Number.isInteger(nextIndex) || nextIndex < 0) {
        return;
      }
      setPinnedAnnotation((current) => {
        if (current?.index === nextIndex) {
          return null;
        }
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
    },
    [],
  );

  useEffect(() => {
    if (previewPinnedIndex == null && !previewPinnedDay) {
      return;
    }

    const index =
      previewPinnedIndex != null &&
      previewPinnedIndex >= 0 &&
      previewPinnedIndex < points.length
        ? previewPinnedIndex
        : points.findIndex(
            (point) => pointUtcDay(point.t) === previewPinnedDay,
          );
    if (index < 0) {
      return;
    }

    const metricKey = metricToDataKey(metric);
    const metricValues = points
      .map((point) => {
        if (metricKey === "visitors") return point.visitors;
        if (metricKey === "visits") return point.visits;
        if (metricKey === "pageviews") return point.pageviews;
        if (metricKey === "bounceRate") {
          return point.visits > 0 ? point.bounceRate * 100 : 0;
        }
        if (metricKey === "sessionTime") return point.avgDurationMs / 1000;
        return point.revenueMinor ?? 0;
      })
      .filter((value): value is number => typeof value === "number");
    const maxMetric = Math.max(1, ...metricValues);
    const trafficYMax =
      metric === "bounceRate"
        ? 100
        : metric === "sessionTime" || metric === "revenue"
          ? chartCountAxisUpperBound(Math.ceil(maxMetric))
          : chartCountAxisUpperBound(maxMetric);
    const pinnedValue = metricValues[index] ?? 0;
    const displayDotValue = Math.max(pinnedValue, trafficYMax * 0.025);

    const applyPin = () => {
      const bounds = chartRootRef.current?.getBoundingClientRect();
      if (!bounds?.width) {
        return;
      }

      setPinnedAnnotation({
        index,
        x: (chartCursorXPercent(index, points.length) / 100) * bounds.width,
        y:
          (chartCursorYPercent(displayDotValue, trafficYMax) / 100) *
          bounds.height,
        chartWidth: bounds.width,
        chartHeight: bounds.height,
      });
    };

    applyPin();
    const frame = requestAnimationFrame(applyPin);
    const observer = new ResizeObserver(applyPin);
    const node = chartRootRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [previewPinnedDay, previewPinnedIndex, points, metric]);

  if (points.length === 0) {
    return (
      <div
        className={`border-border/80 bg-muted/15 text-muted-foreground flex w-full min-w-0 items-center justify-center rounded-xl border border-dashed text-sm ${hero ? "h-64 sm:h-72" : compact ? "h-40" : "h-52"}`}
      >
        No pageviews in this range yet
      </div>
    );
  }

  const data = points.map((point) => {
    const day = pointUtcDay(point.t);
    return {
      label: point.label,
      visitors: point.visitors,
      visits: point.visits,
      pageviews: point.pageviews,
      bounceRate: point.visits > 0 ? point.bounceRate * 100 : null,
      sessionTime: point.avgDurationMs / 1000,
      revenue: point.revenueMinor ?? 0,
      t: point.t,
      annotationNotes:
        annotationsByDay.get(day)?.map((annotation) => annotation.label) ??
        null,
      topReferrer: point.topReferrer ?? null,
    };
  });

  const annotationMarkers = (() => {
    if (annotationsByDay.size === 0) {
      return [] as AnnotationMarker[];
    }
    const firstIndexByDay = new Map<string, number>();
    data.forEach((point, index) => {
      const day = pointUtcDay(point.t);
      if (annotationsByDay.has(day) && !firstIndexByDay.has(day)) {
        firstIndexByDay.set(day, index);
      }
    });
    return [...firstIndexByDay.entries()]
      .map(([day, index]) => {
        const point = data[index];
        if (!point) {
          return null;
        }
        const notes =
          annotationsByDay.get(day)?.map((annotation) => annotation.label) ??
          [];
        return {
          day,
          index,
          label: point.label,
          notes,
        };
      })
      .filter((marker): marker is AnnotationMarker => marker != null)
      .sort((a, b) => a.index - b.index);
  })();

  const metricKey = metricToDataKey(metric);
  const metricColor = primaryChartColor;
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
  const pinnedAnnotationIndex = pinnedAnnotation?.index ?? null;
  const heroPinnedIndex =
    hero && previewPinnedIndex != null ? previewPinnedIndex : null;
  const disableHoverChartInteraction = hero && heroPinnedIndex != null;
  const activeBarIndex =
    heroPinnedIndex ?? pinnedAnnotationIndex ?? pinnedTooltip?.index ?? null;
  const pinnedAnnotationPoint =
    pinnedAnnotationIndex != null &&
    pinnedAnnotationIndex >= 0 &&
    pinnedAnnotationIndex < data.length
      ? data[pinnedAnnotationIndex]
      : null;
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
  const displayPoint =
    pinnedAnnotationPoint ??
    pinnedPoint ??
    (hero && heroPinnedIndex == null ? spotlightPoint : null);
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
  const pinnedAnnotationPayload = pinnedAnnotationPoint
    ? [
        {
          dataKey: metricKey,
          value: pinnedAnnotationPoint[metricKey],
          payload: pinnedAnnotationPoint,
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
  const showHeroSpotlight =
    hero &&
    heroPinnedIndex == null &&
    spotlightIndex != null &&
    spotlightPoint &&
    displayDotValue != null;
  const spotlightCursor = showHeroSpotlight
    ? {
        x: chartCursorXPercent(spotlightIndex!, data.length),
        y: chartCursorYPercent(displayDotValue!, trafficYMax),
      }
    : null;
  const showHeroPinnedTooltip =
    hero &&
    heroPinnedIndex != null &&
    pinnedAnnotationPoint &&
    pinnedAnnotation != null;

  return (
    <div
      ref={chartRootRef}
      className={`text-primary relative w-full min-w-0${fitContainer ? " h-full min-h-0" : ""}${disableHoverChartInteraction ? " pointer-events-none" : ""}`}
    >
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
          (fitContainer
            ? "h-full min-h-0 w-full"
            : hero
              ? "h-64 w-full sm:h-72"
              : compact
                ? "h-40 w-full"
                : "h-52 w-full") +
          " min-w-0 [&_.recharts-label-list]:hidden [&_.recharts-curve.recharts-tooltip-cursor]:hidden [&_.recharts-rectangle.recharts-tooltip-cursor]:hidden [&_.recharts-tooltip-cursor]:hidden"
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
            scale="point"
            padding={{ left: 6, right: 6 }}
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            interval="preserveStartEnd"
            minTickGap={hero ? 28 : compact ? 18 : 22}
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
          {disableHoverChartInteraction ? null : (
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
          )}
          <Bar
            key={metricKey}
            yAxisId="traffic"
            dataKey={metricKey}
            fill={metricColor}
            maxBarSize={barMaxSize}
            shape={(barProps) => (
              <LollipopBarShape
                x={barProps.x}
                y={barProps.y ?? undefined}
                width={barProps.width}
                height={barProps.height}
                fill={barProps.fill}
                fillOpacity={barProps.fillOpacity}
                background={
                  barProps.background
                    ? {
                        y: barProps.background.y ?? undefined,
                        height: barProps.background.height ?? undefined,
                      }
                    : undefined
                }
                active={
                  activeBarIndex != null && barProps.index === activeBarIndex
                }
                widget={disableHoverChartInteraction}
              />
            )}
            activeBar={
              disableHoverChartInteraction ? undefined : (
                <BrandActiveLollipopBarShape />
              )
            }
            isAnimationActive={!prefersReducedMotion}
            animationDuration={320}
            animationEasing="ease-out"
          >
            {data.map((point) => (
              <Cell key={`${point.t}-${metricKey}`} fill={metricColor} />
            ))}
          </Bar>
          {annotationMarkers.map((marker) => (
            <ReferenceDot
              key={`annotation-dot-${marker.day}`}
              yAxisId="traffic"
              x={marker.label}
              y={trafficYMax}
              r={0}
              ifOverflow="extendDomain"
              shape={(dotProps) => (
                <AnnotationDotShape
                  cx={dotProps.cx}
                  viewBox={
                    dotProps.viewBox as AnnotationDotShapeProps["viewBox"]
                  }
                  notes={marker.notes}
                  onSelect={(coordinate) => {
                    pinAnnotationAtIndex(marker.index, coordinate);
                  }}
                />
              )}
            />
          ))}
          {displayPoint && !disableHoverChartInteraction ? (
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
      {showHeroPinnedTooltip || (pinnedAnnotationPoint && pinnedAnnotation && annotationFooter) ? (
        <div
          className="pointer-events-none absolute z-20"
          style={pinnedTooltipStyle(pinnedAnnotation!)}
        >
          <TrafficChartTooltip
            active
            payload={pinnedAnnotationPayload}
            bucket={bucket}
            displayTimeZone={displayTimeZone}
            metric={metric}
            revenueCurrency={revenueCurrency}
            pinned
            footer={annotationFooter}
            showAnnotationNotes={annotationFooter == null}
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
  footer,
  showAnnotationNotes = true,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string | null;
      payload?: {
      t?: number;
      label?: string;
      visitors?: number;
      annotationNotes?: string[] | null;
      topReferrer?: ChartTopReferrer | null;
    };
  }>;
  bucket: TrafficStackBucket;
  displayTimeZone: string;
  metric: TrafficChartMetric;
  revenueCurrency: string | null;
  pinned?: boolean;
  footer?: ReactNode;
  showAnnotationNotes?: boolean;
}) {
  if (!active || !payload?.length) {
    return null;
  }
  const pl = payload[0]?.payload;
  const title =
    pl?.t != null
      ? formatTrafficChartTooltipTitle(bucket, pl.t, displayTimeZone)
      : String(pl?.label ?? "");
  const annotationNotes = Array.isArray(pl?.annotationNotes)
    ? pl.annotationNotes
    : [];
  const metricKey = metricToDataKey(metric);
  const metricRow = payload.find((row) => String(row.dataKey) === metricKey);
  const topReferrer =
    pl?.topReferrer && typeof pl.topReferrer === "object"
      ? (pl.topReferrer as ChartTopReferrer)
      : null;
  const visitorsInBucket =
    typeof pl?.visitors === "number" ? pl.visitors : Number(pl?.visitors) || 0;
  const topReferrerShare =
    topReferrer && visitorsInBucket > 0
      ? Math.round((topReferrer.count / visitorsInBucket) * 100)
      : null;
  const topReferrerLabel =
    topReferrer != null
      ? (hostnameFromReferrer(topReferrer.host)?.replace(/^www\./i, "") ??
        topReferrer.host)
      : null;

  return (
    <div
      className={`border-background/10 bg-foreground text-background grid max-w-xs gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl ${footer != null ? "min-w-60 pb-2" : "min-w-44"}`}
    >
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
      {topReferrer && topReferrerLabel ? (
        <div className="grid gap-1.5 border-t border-background/15 pt-1.5">
          <div className="text-background/70 text-[10px] font-medium tracking-wide uppercase">
            Top referrer
          </div>
          <div className="flex items-center justify-between gap-3 leading-none">
            <span className="text-background/85 inline-flex min-w-0 items-center gap-1.5">
              <ReferrerFavicon
                referrer={topReferrer.host}
                title={topReferrerLabel}
              />
              <span className="truncate">{topReferrerLabel}</span>
            </span>
            <span className="text-background shrink-0 font-mono font-medium tabular-nums">
              {Math.round(topReferrer.count).toLocaleString()}
            </span>
          </div>
          {topReferrerShare != null && topReferrerShare > 0 ? (
            <p className="text-background/65 text-[11px] leading-snug">
              Accounted for {topReferrerShare}% of visitors that day.
            </p>
          ) : null}
        </div>
      ) : null}
      {showAnnotationNotes && footer == null && annotationNotes.length > 0 ? (
        <div className="grid gap-0.5 border-t border-background/15 pt-1.5">
          {annotationNotes.map((note, index) => (
            <div
              key={`${note}-${index}`}
              className="text-background/85"
            >
              <span className="min-w-0">{note}</span>
            </div>
          ))}
        </div>
      ) : null}
      {footer}
    </div>
  );
}

function AnnotationDotShape(props: AnnotationDotShapeProps) {
  const cx = props.cx ?? 0;
  const topY = (props.viewBox?.y ?? 0) + 10;
  const noteLabel = props.notes.join(", ");

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={noteLabel ? `Chart note: ${noteLabel}` : "Chart note"}
      style={{ cursor: "pointer" }}
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        props.onSelect({ x: cx, y: topY });
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          props.onSelect({ x: cx, y: topY });
        }
      }}
    >
      <rect
        x={cx - 4}
        y={topY - 4}
        width={8}
        height={8}
        rx={2}
        ry={2}
        fill="var(--brand)"
      />
    </g>
  );
}

function pinnedTooltipStyle(pinned: PinnedTooltipState): CSSProperties {
  const gap = TRAFFIC_CHART_TOOLTIP_LINE_GAP;
  const placeRight = pinned.chartWidth - pinned.x >= 220;
  const vertical = pinned.y < 96 ? "below" : "above";
  const translateY = vertical === "above" ? "-100%" : "0";
  const translateX = placeRight ? "0" : "-100%";

  return {
    left: placeRight ? pinned.x + gap : pinned.x - gap,
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

  // Match point-scale XAxis: first/last buckets sit near the plot edges.
  const plotStart = 6;
  const plotEnd = 94;
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
