import {
  finalizeTrafficChartSeries,
  resolveDisplayPinnedIndex,
} from "@/lib/traffic-chart-binning";
import { chartCountAxisUpperBound } from "@/lib/chart-y-axis";
import { monotoneLinePath } from "@/lib/monotone-path";
import { hostnameFromReferrer } from "@/lib/referrer-favicon";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  dashboardCardDescriptionClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import {
  heroChartAnnotations,
  heroChartPinnedDay,
  heroChartPinnedIndex,
  heroChartPoints,
  heroChartRangeLabel,
} from "./dashboard-preview-data";
import type { TrafficStackBucket } from "./traffic-chart-types";
import { ReferrerFavicon } from "./referrer-favicon";
import { APP_RAMP } from "./traffic-gradient";

/**
 * Zero-JS replacement for the recharts hero chart: the same line series
 * rendered as static SVG so the landing page ships no chart runtime.
 * Mirrors the app's TrafficGradientChart (single-color stroke, faint wash,
 * dotted foreground revenue line).
 */

const { points, bucket } = finalizeTrafficChartSeries(
  heroChartPoints,
  "day",
  "UTC",
);

const pinnedIndex = resolveDisplayPinnedIndex(
  heroChartPoints,
  points,
  bucket,
  heroChartPinnedIndex,
  heroChartPinnedDay,
);

const yMax = chartCountAxisUpperBound(
  Math.max(...points.map((point) => point.visitors)),
);

const MS_DAY = 86_400_000;

function formatTooltipTitle(t: number, tooltipBucket: TrafficStackBucket) {
  const long = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  if (tooltipBucket === "week") {
    const short = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
    });
    return `${short.format(t)} – ${long.format(t + 6 * MS_DAY)}`;
  }
  if (tooltipBucket === "month") {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: "long",
      year: "numeric",
    }).format(t);
  }
  return long.format(t);
}

function formatAxisCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

const pinnedPoint = pinnedIndex != null ? points[pinnedIndex] : undefined;
const pinnedNote = heroChartAnnotations[0];
const pinnedTopReferrer = pinnedPoint?.topReferrer ?? null;
const pinnedReferrerLabel = pinnedTopReferrer
  ? (hostnameFromReferrer(pinnedTopReferrer.host)?.replace(/^www\./i, "") ??
    pinnedTopReferrer.host)
  : null;
const pinnedReferrerShare =
  pinnedTopReferrer && (pinnedPoint?.visitors ?? 0) > 0
    ? Math.round((pinnedTopReferrer.count / pinnedPoint!.visitors) * 100)
    : null;
const pinnedRatio =
  pinnedIndex != null && points.length > 1
    ? pinnedIndex / (points.length - 1)
    : 0.5;

/* The stroke gradient is vertical over the line's bounding box (warm at the
   peaks, cool at the lows), so the dot samples the spectrum by value. */
const visitorsMin = Math.min(...points.map((point) => point.visitors));
const visitorsMax = Math.max(...points.map((point) => point.visitors));
const pinnedValueRatio =
  pinnedPoint && visitorsMax > visitorsMin
    ? (visitorsMax - pinnedPoint.visitors) / (visitorsMax - visitorsMin)
    : 0.5;

/** Fixed drawing space; the svg stretches to the container (non-scaling strokes). */
const VIEW_W = 600;
const VIEW_H = 224;

function xAt(index: number): number {
  return points.length > 1
    ? (index / (points.length - 1)) * VIEW_W
    : VIEW_W / 2;
}

function yAt(visitors: number): number {
  return VIEW_H - (visitors / yMax) * VIEW_H;
}

const linePath = monotoneLinePath(
  points.map((point, index) => ({ x: xAt(index), y: yAt(point.visitors) })),
);

const areaPath = `${linePath} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`;

const revenueMax = Math.max(...points.map((point) => point.revenueMinor ?? 0));
/** Revenue rides its own scale in the lower part of the plot, like the app chart. */
const revenuePath =
  revenueMax > 0
    ? monotoneLinePath(
        points.map((point, index) => ({
          x: xAt(index),
          y: VIEW_H - ((point.revenueMinor ?? 0) / revenueMax) * VIEW_H * 0.45,
        })),
      )
    : null;

const axisLabelIndexes = [
  0,
  Math.round((points.length - 1) / 3),
  Math.round(((points.length - 1) * 2) / 3),
  points.length - 1,
];

export function HeroStaticChart(props: {
  /** Render without the card surface: no background, padding, or shadow. */
  frameless?: boolean;
  /** Skip the pinned marker and its tooltip card (for small placements). */
  hidePinned?: boolean;
}) {
  const frameless = props.frameless ?? false;
  const showPinned = !(props.hidePinned ?? false);
  const Shell = frameless ? "div" : Card;
  return (
    <Shell
      className={cn(
        frameless ? "flex w-full flex-col" : dashboardCardRootClass,
        "h-auto",
      )}
    >
      {/* Frameless (showcase panel) skips the header: the panel's own copy
          already titles the card, so the widget renders chart-only. */}
      {frameless ? null : (
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>
            Visitors over time
          </CardTitle>
          <CardDescription className={dashboardCardDescriptionClass}>
            {heroChartRangeLabel}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent
        className={cn(
          "h-auto min-w-0 px-0! pt-0!",
          frameless ? "pb-0" : "pb-4 sm:pb-5",
        )}
      >
        <div className={cn("min-w-0", !frameless && "px-3 sm:px-4")}>
          <div
            className={cn(
              "relative mt-8 h-48 sm:h-56",
              // Full bleed on the panel: cancel its padding so the area
              // reaches both sides and the bottom edge.
              frameless && "-mx-4 -mb-4 sm:-mx-6 sm:-mb-6",
            )}
          >
            {[0, 0.5].map((fraction) => (
              <div
                key={fraction}
                className="border-border/60 pointer-events-none absolute inset-x-0 border-t"
                style={{ top: `${fraction * 100}%` }}
              >
                <span
                  className={cn(
                    "text-muted-foreground absolute -top-4 text-[10px] tabular-nums",
                    frameless ? "right-4 sm:right-6" : "right-0",
                  )}
                >
                  {formatAxisCount(Math.round(yMax * (1 - fraction)))}
                </span>
              </div>
            ))}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Value-mapped spectrum, like the app chart: vertical over
                    the series bbox so warm reads as the peaks. */}
                <linearGradient
                  id="hero-traffic-stroke"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {APP_RAMP.stops.map((stop) => (
                    <stop
                      key={stop.offset}
                      offset={stop.offset}
                      stopColor={stop.color}
                    />
                  ))}
                </linearGradient>
                {/* Soft wash of the same spectrum, fading to the baseline. */}
                <linearGradient
                  id="hero-traffic-fill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {APP_RAMP.stops.map((stop, index) => (
                    <stop
                      key={stop.offset}
                      offset={stop.offset}
                      stopColor={stop.color}
                      stopOpacity={
                        0.16 -
                        (0.14 * index) / (APP_RAMP.stops.length - 1)
                      }
                    />
                  ))}
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#hero-traffic-fill)" />
              {revenuePath ? (
                <path
                  d={revenuePath}
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  strokeDasharray="1 5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              <path
                d={linePath}
                fill="none"
                stroke="url(#hero-traffic-stroke)"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {showPinned && pinnedPoint ? (
              <>
                <div
                  className="border-foreground/25 pointer-events-none absolute inset-y-0 hidden border-l border-dashed sm:block"
                  style={{ left: `${pinnedRatio * 100}%` }}
                  aria-hidden="true"
                />
                <div
                  className="border-background pointer-events-none absolute hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 sm:block"
                  style={{
                    left: `${pinnedRatio * 100}%`,
                    top: `${(yAt(pinnedPoint.visitors) / VIEW_H) * 100}%`,
                    background: APP_RAMP.sample(pinnedValueRatio),
                  }}
                  aria-hidden="true"
                />
              </>
            ) : null}
            {showPinned && pinnedPoint ? (
              <div
                className={cn(
                  // Parked at the card's right edge, off the pinned marker.
                  "pointer-events-none absolute top-0 z-10 hidden sm:block",
                  frameless ? "right-4 sm:right-6" : "right-2",
                )}
              >
                {/* Card-style tooltip, banded like the app's chart tooltips. */}
                <div className="bg-card text-card-foreground grid max-w-64 min-w-52 -translate-y-3 overflow-hidden rounded-xl text-xs shadow-lg">
                  <div className="border-border/60 border-b px-4 pt-3 pb-2.5">
                    <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                      Pinned
                    </div>
                    <div className="text-foreground font-medium">
                      {formatTooltipTitle(pinnedPoint.t, bucket)}
                    </div>
                  </div>
                  <div className="grid gap-2 px-4 py-3">
                    <div className="flex items-center justify-between gap-4 leading-none">
                      <span className="text-muted-foreground">Visitors</span>
                      <span className="text-foreground font-medium tabular-nums">
                        {pinnedPoint.visitors.toLocaleString()}
                      </span>
                    </div>
                    {(pinnedPoint.revenueMinor ?? 0) > 0 ? (
                      <div className="flex items-center justify-between gap-4 leading-none">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="text-foreground font-medium tabular-nums">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format((pinnedPoint.revenueMinor ?? 0) / 100)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  {pinnedTopReferrer && pinnedReferrerLabel ? (
                    <div className="border-border/60 grid gap-2 border-t px-4 py-2.5">
                      <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                        Top referrer
                      </div>
                      <div className="flex items-center justify-between gap-3 leading-none">
                        <span className="text-foreground/90 inline-flex min-w-0 items-center gap-1.5">
                          <ReferrerFavicon
                            referrer={pinnedTopReferrer.host}
                            title={pinnedReferrerLabel}
                          />
                          <span className="truncate">
                            {pinnedReferrerLabel}
                          </span>
                        </span>
                        <span className="text-foreground shrink-0 font-medium tabular-nums">
                          {Math.round(pinnedTopReferrer.count).toLocaleString()}
                        </span>
                      </div>
                      {pinnedReferrerShare != null &&
                      pinnedReferrerShare > 0 ? (
                        <p className="text-muted-foreground text-[11px] leading-snug">
                          Accounted for {pinnedReferrerShare}% of visitors that
                          day.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {pinnedNote ? (
                    <div className="border-border/60 flex items-center gap-1.5 border-t px-4 py-2.5 leading-none">
                      <span
                        className="bg-brand size-1.5 shrink-0 rounded-[2px]"
                        aria-hidden="true"
                      />
                      <span className="text-foreground/90 truncate">
                        {pinnedNote.label}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          {!frameless && (
            <div className="text-muted-foreground mt-2 flex justify-between text-[10px] tabular-nums">
              {axisLabelIndexes.map((index) => (
                <span key={index}>{points[index]?.label}</span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Shell>
  );
}

export default HeroStaticChart;
