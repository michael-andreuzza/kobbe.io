import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";
import {
  DashboardMetricStrip,
  DashboardMetricTile,
} from "./dashboard-metric-strip";
import {
  dashboardCardContentListClass,
  dashboardCardContentTableClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import {
  DeviceBreakdownList,
  LocationBreakdownList,
} from "./dashboard-list-card";

type Props = {
  webVitals: DashboardPreviewRangeData["webVitals"];
};

const trendPoints = [
  {
    t: Date.UTC(2026, 4, 4),
    label: "May 4",
    p50: 1180,
    p75: 2200,
    p95: 3380,
    n: 164,
  },
  {
    t: Date.UTC(2026, 4, 5),
    label: "May 5",
    p50: 1080,
    p75: 2000,
    p95: 3120,
    n: 188,
  },
  {
    t: Date.UTC(2026, 4, 6),
    label: "May 6",
    p50: 1020,
    p75: 1900,
    p95: 2860,
    n: 176,
  },
  {
    t: Date.UTC(2026, 4, 7),
    label: "May 7",
    p50: 960,
    p75: 1800,
    p95: 2680,
    n: 204,
  },
  {
    t: Date.UTC(2026, 4, 8),
    label: "May 8",
    p50: 920,
    p75: 1700,
    p95: 2520,
    n: 216,
  },
  {
    t: Date.UTC(2026, 4, 9),
    label: "May 9",
    p50: 1010,
    p75: 1900,
    p95: 2740,
    n: 198,
  },
  {
    t: Date.UTC(2026, 4, 10),
    label: "May 10",
    p50: 940,
    p75: 1800,
    p95: 2600,
    n: 224,
  },
];

const attentionRows = [
  { path: "/pricing", value: "2.8s", samples: 184 },
  { path: "/docs/install-nextjs", value: "2.4s", samples: 142 },
  { path: "/demo/kobbe-studio", value: "2.1s", samples: 96 },
  { path: "/docs/revenue-attribution", value: "2.0s", samples: 82 },
];

const browserRows = [
  { name: "Safari", count: 318 },
  { name: "Chrome", count: 624 },
  { name: "Firefox", count: 144 },
  { name: "Edge", count: 96 },
];

const countryRows = [
  { key: "us", label: "United States", count: 412, countryCode: "US" },
  { key: "de", label: "Germany", count: 180, countryCode: "DE" },
  { key: "gb", label: "United Kingdom", count: 166, countryCode: "GB" },
  { key: "es", label: "Spain", count: 121, countryCode: "ES" },
];

function ratingClassName(
  rating: DashboardPreviewRangeData["webVitals"]["metrics"][number]["rating"],
) {
  return rating === "Good"
    ? "text-success"
    : rating === "Watch"
      ? "text-warning"
      : "text-destructive";
}

const performanceChartConfig = {
  p50: { label: "Median (p50)", color: "var(--foreground)" },
  p75: { label: "p75", color: "var(--foreground)" },
  p95: { label: "p95", color: "var(--foreground)" },
} satisfies ChartConfig;

const performanceMetricSequence = [0, 1, 2, 3, 4] as const;

const performancePercentileLabels = {
  p50: "Median (p50)",
  p75: "p75",
  p95: "p95",
} as const;

const performancePercentileFillOpacity = {
  p50: 0.42,
  p75: 0.82,
  p95: 0.58,
} as const;

function linearYTicksMs(max: number, targetSteps: number): number[] {
  if (!Number.isFinite(max) || max <= 0) {
    return [0, 250, 500, 750, 1000];
  }

  const hi = max * 1.02;
  const raw = hi / Math.max(1, targetSteps - 1);
  const exp = Math.floor(Math.log10(raw));
  const pow = 10 ** exp;
  const n = raw / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  const step = nice * pow;
  const count = Math.ceil(hi / step);
  const out: number[] = [];

  for (let i = 0; i <= count; i++) {
    out.push(Math.round(i * step));
  }

  return out;
}

function formatAxisTick(v: number): string {
  if (!Number.isFinite(v)) return "";
  const rounded = Math.round(v);
  if (rounded >= 10_000) {
    const k = rounded / 1000;
    return k % 1 === 0 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`;
  }
  return rounded.toLocaleString();
}

function formatMsValue(value: number | string | null | undefined): string {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return "0 ms";
  return `${Math.round(numeric).toLocaleString()} ms`;
}

export function PerformanceDashboardPreview({ webVitals }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const metrics = webVitals.metrics.slice(0, 5);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || metrics.length <= 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveMetricIndex((currentIndex) => {
        const currentSequenceIndex = performanceMetricSequence.indexOf(
          currentIndex as (typeof performanceMetricSequence)[number],
        );
        const nextSequenceIndex =
          (Math.max(0, currentSequenceIndex) + 1) %
          performanceMetricSequence.length;
        return Math.min(
          performanceMetricSequence[nextSequenceIndex] ?? 0,
          metrics.length - 1,
        );
      });
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [activeMetricIndex, metrics.length, shouldReduceMotion]);

  return (
    <div className="bg-muted p-8 lg:p-42">
      <div className="relative min-w-0">
        <DashboardMetricStrip ariaLabel="Web Vitals metrics" lgCols={5}>
          {metrics.map((metric, index) => {
            const active = index === activeMetricIndex;
            return (
              <DashboardMetricTile
                key={metric.name}
                active={active}
                activeColor="var(--foreground)"
                surface="muted"
              >
                <div className="flex h-full min-w-0 flex-col gap-1">
                  <div className="flex min-w-0 items-baseline justify-between gap-2">
                    <span
                      className={cn(
                        "truncate text-xs leading-tight font-medium",
                        active ? "text-background/70" : "text-muted-foreground",
                      )}
                    >
                      {metric.name}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-xs leading-tight tabular-nums",
                        active ? "text-background/70" : "text-muted-foreground",
                      )}
                    >
                      n={metric.sampleCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-auto min-w-0">
                    <span
                      className={cn(
                        "text-lg leading-tight font-medium tracking-tight tabular-nums sm:text-xl",
                        active ? "text-background" : "text-foreground",
                      )}
                    >
                      {metric.value}
                    </span>
                    <div className="mt-0.5 text-xs">
                      <span
                        className={cn(
                          "font-medium",
                          active
                            ? "text-background/70"
                            : ratingClassName(metric.rating),
                        )}
                      >
                        {metric.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </DashboardMetricTile>
            );
          })}
        </DashboardMetricStrip>

        <Card className={cn("mt-4 sm:mt-5", dashboardCardRootClass)}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              LCP over time
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 px-3 pb-4 sm:px-4">
            <PerformanceTrendPreview points={trendPoints} />
          </CardContent>
        </Card>

        <Card className={cn("mt-4", dashboardCardRootClass)}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Needs attention
            </CardTitle>
            <CardDescription>
              Pages with the highest p75 for LCP (min. 3 samples per path)
            </CardDescription>
          </CardHeader>
          <CardContent className={dashboardCardContentTableClass}>
            <div className="text-muted-foreground grid grid-cols-[minmax(0,1fr)_4rem_4rem] gap-2 px-2 pb-2 text-[11px] font-medium sm:px-2.5">
              <span>Page</span>
              <span className="text-right">p75</span>
              <span className="text-right">Samples</span>
            </div>
            <ul className="flex flex-col">
              {attentionRows.map((row, index) => (
                <li key={row.path} className="list-none">
                  <div
                    className={cn(
                      "grid min-w-0 grid-cols-[minmax(0,1fr)_4rem_4rem] items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors duration-500 sm:px-2.5",
                      !shouldReduceMotion &&
                        index === activeMetricIndex % attentionRows.length &&
                        "bg-muted/45",
                    )}
                  >
                    <span className="text-foreground min-w-0 truncate font-medium">
                      {row.path}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.value}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.samples.toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <PerformanceBreakdownCard
            title="Device"
            description="Slowest dimensions by p75 · LCP"
          >
            <DeviceBreakdownList rows={webVitals.environments} />
          </PerformanceBreakdownCard>
          <PerformanceBreakdownCard
            title="Browser"
            description="Slowest dimensions by p75 · LCP"
          >
            <DeviceBreakdownList rows={browserRows} />
          </PerformanceBreakdownCard>
          <PerformanceBreakdownCard
            title="Country"
            description="Slowest dimensions by p75 · LCP"
          >
            <LocationBreakdownList rows={countryRows} />
          </PerformanceBreakdownCard>
        </div>
      </div>
    </div>
  );
}

function PerformanceTrendPreview(props: { points: typeof trendPoints }) {
  const shouldReduceMotion = useReducedMotion();
  const [showP50, setShowP50] = useState(false);
  const [showP75, setShowP75] = useState(true);
  const [showP95, setShowP95] = useState(false);
  const [userSelectedMetric, setUserSelectedMetric] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || userSelectedMetric) {
      return;
    }

    const sequence = [
      { p50: false, p75: true, p95: false },
      { p50: true, p75: true, p95: false },
      { p50: true, p75: true, p95: true },
      { p50: false, p75: true, p95: true },
    ];
    const timeout = window.setTimeout(() => {
      const currentIndex = sequence.findIndex(
        (item) =>
          item.p50 === showP50 && item.p75 === showP75 && item.p95 === showP95,
      );
      const next = sequence[(Math.max(0, currentIndex) + 1) % sequence.length]!;
      setShowP50(next.p50);
      setShowP75(next.p75);
      setShowP95(next.p95);
    }, 2100);

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, showP50, showP75, showP95, userSelectedMetric]);
  const maxY = useMemo(() => {
    let m = 0;
    for (const p of props.points) {
      if (showP50 && p.p50 != null && Number.isFinite(p.p50))
        m = Math.max(m, p.p50);
      if (showP75 && p.p75 != null && Number.isFinite(p.p75))
        m = Math.max(m, p.p75);
      if (showP95 && p.p95 != null && Number.isFinite(p.p95))
        m = Math.max(m, p.p95);
    }
    return m <= 0 ? 1000 : m * 1.12;
  }, [props.points, showP50, showP75, showP95]);
  const yTicks = useMemo(() => linearYTicksMs(maxY, 6), [maxY]);
  const yMax = yTicks[yTicks.length - 1] ?? maxY;

  return (
    <div className="min-w-0 space-y-3">
      <div className="flex flex-wrap items-center justify-end gap-2 px-1">
        <span className="text-muted-foreground mr-auto text-xs">Show</span>
        <PerformanceToggle
          active={showP50}
          onClick={() => {
            setUserSelectedMetric(true);
            setShowP50((v) => !v);
          }}
        >
          p50
        </PerformanceToggle>
        <PerformanceToggle
          active={showP75}
          onClick={() => {
            setUserSelectedMetric(true);
            setShowP75((v) => !v);
          }}
        >
          p75
        </PerformanceToggle>
        <PerformanceToggle
          active={showP95}
          onClick={() => {
            setUserSelectedMetric(true);
            setShowP95((v) => !v);
          }}
        >
          p95
        </PerformanceToggle>
      </div>
      <ChartContainer
        config={performanceChartConfig}
        className="h-64 w-full min-w-0 sm:h-72"
      >
        <BarChart
          accessibilityLayer
          data={props.points}
          margin={{ top: 12, right: 8, left: 4, bottom: 4 }}
          barGap={3}
          barCategoryGap="25%"
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="var(--foreground)"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={18}
            tick={{ fontSize: 11, className: "text-muted-foreground" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={52}
            domain={[0, yMax]}
            ticks={yTicks}
            tickFormatter={(v) => formatAxisTick(Number(v))}
            tick={{ fontSize: 11, className: "text-muted-foreground" }}
          />
          <ChartTooltip
            cursor={{
              fill: "var(--muted)",
              fillOpacity: 0.45,
            }}
            content={<PerformanceChartTooltip />}
          />
          {showP50 ? (
            <Bar
              dataKey="p50"
              fill="var(--foreground)"
              fillOpacity={performancePercentileFillOpacity.p50}
              radius={0}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={480}
              animationEasing="ease-out"
            />
          ) : null}
          {showP75 ? (
            <Bar
              dataKey="p75"
              fill="var(--foreground)"
              fillOpacity={performancePercentileFillOpacity.p75}
              radius={0}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={480}
              animationEasing="ease-out"
            />
          ) : null}
          {showP95 ? (
            <Bar
              dataKey="p95"
              fill="var(--foreground)"
              fillOpacity={performancePercentileFillOpacity.p95}
              radius={0}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={480}
              animationEasing="ease-out"
            />
          ) : null}
        </BarChart>
      </ChartContainer>
      <p className="text-muted-foreground px-1 text-[0.6875rem] leading-relaxed">
        Bucket: day (UTC)
      </p>
    </div>
  );
}

function PerformanceChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string | null;
    payload?: { label?: string };
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const title = String(payload[0]?.payload?.label ?? "");

  return (
    <div className="border-background/10 bg-foreground text-background grid max-w-xs min-w-44 gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-md">
      <div className="text-background font-medium">{title}</div>
      <div className="grid gap-1">
        {payload.map((row) => {
          const key = String(row.dataKey ?? "");
          const label =
            performancePercentileLabels[
              key as keyof typeof performancePercentileLabels
            ] ?? key;

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-4 leading-none"
            >
              <span className="text-background/70">{label}</span>
              <span className="text-background font-mono font-medium tabular-nums">
                {formatMsValue(row.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PerformanceToggle(props: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-md px-2.5 text-xs font-medium transition-colors",
        props.active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      onClick={props.onClick}
      aria-pressed={props.active}
    >
      {props.children}
    </button>
  );
}

function PerformanceBreakdownCard(props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={dashboardCardRootClass}>
      <CardHeader className={dashboardCardHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className={dashboardCardContentListClass}>
        {props.children}
      </CardContent>
    </Card>
  );
}

export default PerformanceDashboardPreview;
