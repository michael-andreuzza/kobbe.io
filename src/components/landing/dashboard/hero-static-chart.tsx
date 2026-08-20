import {
  finalizeTrafficChartSeries,
  resolveDisplayPinnedIndex,
} from "@/lib/traffic-chart-binning";
import { chartCountAxisUpperBound } from "@/lib/chart-y-axis";
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

/**
 * Zero-JS replacement for the recharts hero chart: the same lollipop series
 * rendered as plain markup so the landing page ships no chart runtime.
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
    ? (pinnedIndex + 0.5) / points.length
    : 0.5;
/** Keep the tooltip inside the card when the pinned day is near an edge. */
const tooltipTranslateClass =
  pinnedRatio < 0.2
    ? "translate-x-0"
    : pinnedRatio > 0.8
      ? "-translate-x-full"
      : "-translate-x-1/2";

const denseSeries = points.length > 45;
const headClass = denseSeries ? "size-1.5" : "size-2.5";

const axisLabelIndexes = [
  0,
  Math.round((points.length - 1) / 3),
  Math.round(((points.length - 1) * 2) / 3),
  points.length - 1,
];

export function HeroStaticChart() {
  return (
    <Card className={cn(dashboardCardRootClass, "h-auto")}>
      <CardHeader className={dashboardCardHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Visitors over time
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          {heroChartRangeLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-auto min-w-0 px-0! pt-0! pb-4 sm:pb-5">
        <div className="min-w-0 px-3 sm:px-4">
          <div className="relative mt-8 h-48 sm:h-56">
            {[0, 0.5].map((fraction) => (
              <div
                key={fraction}
                className="border-border/60 pointer-events-none absolute inset-x-0 border-t"
                style={{ top: `${fraction * 100}%` }}
              >
                <span className="text-muted-foreground absolute -top-4 right-0 text-[10px] tabular-nums">
                  {formatAxisCount(Math.round(yMax * (1 - fraction)))}
                </span>
              </div>
            ))}
            <div className="absolute inset-0 flex items-end">
              {points.map((point, index) => {
                const active = index === pinnedIndex;
                const heightPct = Math.max(2, (point.visitors / yMax) * 100);
                return (
                  <div
                    key={point.t}
                    className="relative flex h-full min-w-0 flex-1 items-end justify-center"
                  >
                    {active ? (
                      <div
                        className="border-foreground/25 pointer-events-none absolute inset-y-0 left-1/2 hidden border-l border-dashed sm:block"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div
                      className="flex flex-col items-center"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div
                        className={cn(
                          "shrink-0 rounded-full",
                          headClass,
                          active ? "bg-brand" : "bg-foreground/75",
                        )}
                      />
                      <div
                        className={cn(
                          "w-px flex-1",
                          active ? "bg-brand" : "bg-foreground/40",
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {pinnedPoint ? (
              <div
                className="pointer-events-none absolute top-0 z-10 hidden sm:block"
                style={{ left: `${pinnedRatio * 100}%` }}
              >
                <div
                  className={cn(
                    "border-background/10 bg-foreground text-background grid max-w-64 min-w-52 -translate-y-3 gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
                    tooltipTranslateClass,
                  )}
                >
                  <div className="text-background/70 text-[10px] font-medium tracking-wide uppercase">
                    Pinned
                  </div>
                  <div className="text-background font-medium">
                    {formatTooltipTitle(pinnedPoint.t, bucket)}
                  </div>
                  <div className="flex items-center justify-between gap-4 leading-none">
                    <span className="text-background/70">Visitors</span>
                    <span className="text-background font-mono font-medium tabular-nums">
                      {pinnedPoint.visitors.toLocaleString()}
                    </span>
                  </div>
                  {(pinnedPoint.revenueMinor ?? 0) > 0 ? (
                    <div className="border-background/15 flex items-center justify-between gap-4 border-t pt-1.5 leading-none">
                      <span className="text-background/70">Revenue</span>
                      <span className="text-background font-mono font-medium tabular-nums">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format((pinnedPoint.revenueMinor ?? 0) / 100)}
                      </span>
                    </div>
                  ) : null}
                  {pinnedTopReferrer && pinnedReferrerLabel ? (
                    <div className="border-background/15 grid gap-1.5 border-t pt-1.5">
                      <div className="text-background/70 text-[10px] font-medium tracking-wide uppercase">
                        Top referrer
                      </div>
                      <div className="flex items-center justify-between gap-3 leading-none">
                        <span className="text-background/85 inline-flex min-w-0 items-center gap-1.5">
                          <ReferrerFavicon
                            referrer={pinnedTopReferrer.host}
                            title={pinnedReferrerLabel}
                          />
                          <span className="truncate">
                            {pinnedReferrerLabel}
                          </span>
                        </span>
                        <span className="text-background shrink-0 font-mono font-medium tabular-nums">
                          {Math.round(pinnedTopReferrer.count).toLocaleString()}
                        </span>
                      </div>
                      {pinnedReferrerShare != null &&
                      pinnedReferrerShare > 0 ? (
                        <p className="text-background/65 text-[11px] leading-snug">
                          Accounted for {pinnedReferrerShare}% of visitors that
                          day.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {pinnedNote ? (
                    <div className="border-background/15 flex items-center gap-1.5 border-t pt-1.5 leading-none">
                      <span
                        className="bg-brand size-1.5 shrink-0 rounded-[2px]"
                        aria-hidden="true"
                      />
                      <span className="text-background/85 truncate">
                        {pinnedNote.label}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <div className="text-muted-foreground mt-2 flex justify-between text-[10px] tabular-nums">
            {axisLabelIndexes.map((index) => (
              <span key={index}>{points[index]?.label}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroStaticChart;
