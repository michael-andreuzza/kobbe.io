import { ComputerPhoneSyncIcon, Globe02Icon } from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import { Bar, Cell, ComposedChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
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
import { buttonVariants } from "@/components/ui/button";
import {
  formatPerfValue,
  ratingColorForValue,
  ratingDisplayLabel,
  ratingForMetric,
  ratingLabelForValue,
  formatPerfTooltipValue,
  type WebVitalName,
} from "@/lib/performance-metrics";
import { cn } from "@/lib/utils";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";
import {
  DashboardMetricStrip,
  DashboardMetricTile,
} from "./dashboard-metric-strip";
import {
  DashboardBreakdownCard,
  DashboardTabbedBreakdownCard,
} from "./dashboard-breakdown-card";
import {
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardStackClass,
  dashboardCardTitleClass,
  dashboardCardDescriptionClass,
} from "./dashboard-card-layout";
import {
  BrandActiveLollipopBarShape,
  LollipopBarShape,
  chartBarCategoryGap,
  chartBarMaxSize,
} from "./chart-lollipop";
import {
  PerformanceEnvBreakdownList,
  type PerformanceEnvBreakdownRow,
} from "./dashboard-list-card";
import {
  DashboardCardTable,
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "./dashboard-table";

type Props = {
  webVitals: DashboardPreviewRangeData["webVitals"];
};

type PerformancePercentileVisibility = {
  p50: boolean;
  p75: boolean;
  p95: boolean;
};

const defaultPerformancePercentileVisibility: PerformancePercentileVisibility =
  {
    p50: false,
    p75: true,
    p95: false,
  };

function PerformancePercentileToggles(props: {
  value: PerformancePercentileVisibility;
  onChange: (next: PerformancePercentileVisibility) => void;
}) {
  const { value, onChange } = props;
  return (
    <div className="flex flex-wrap items-center gap-1">
      {(["p50", "p75", "p95"] as const).map((key) => (
        <button
          key={key}
          type="button"
          className={cn(
            buttonVariants({
              variant: value[key] ? "default" : "ghost",
              size: "xs",
            }),
            "h-5 min-h-5 rounded-md border-transparent px-1.5 text-[0.6875rem]",
            !value[key] &&
              "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-muted-foreground",
          )}
          onClick={() => onChange({ ...value, [key]: !value[key] })}
          aria-pressed={value[key]}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

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
  { path: "/pricing", p75: 2800, n: 184 },
  { path: "/docs/install-nextjs", p75: 2400, n: 142 },
  { path: "/demo/kobbe-studio", p75: 2100, n: 96 },
  { path: "/docs/overview", p75: 2000, n: 82 },
];

const perfBrowserRows: PerformanceEnvBreakdownRow[] = [
  { key: "browser:Safari", label: "Safari", p75: 2140, n: 318 },
  { key: "browser:Chrome", label: "Chrome", p75: 1680, n: 624 },
  { key: "browser:Firefox", label: "Firefox", p75: 1980, n: 144 },
  { key: "browser:Edge", label: "Edge", p75: 1860, n: 96 },
];

const perfCountryRows: PerformanceEnvBreakdownRow[] = [
  { key: "country:US", label: "US", p75: 2400, n: 412, countryCode: "US" },
  { key: "country:DE", label: "DE", p75: 2280, n: 180, countryCode: "DE" },
  { key: "country:GB", label: "GB", p75: 2160, n: 166, countryCode: "GB" },
  { key: "country:ES", label: "ES", p75: 2040, n: 121, countryCode: "ES" },
];

function performanceEnvListRows(
  rows: { name: string; p75: number; n: number }[],
  kind: "device" | "browser",
): PerformanceEnvBreakdownRow[] {
  return rows.map((row) => ({
    key: `${kind}:${row.name}`,
    label: row.name,
    p75: row.p75,
    n: row.n,
  }));
}

const performanceChartConfig = {
  p50: { label: "Median (p50)", color: "var(--foreground)" },
  p75: { label: "p75", color: "var(--foreground)" },
  p95: { label: "p95", color: "var(--foreground)" },
} satisfies ChartConfig;

const performancePercentileLabels = {
  p50: "Median (p50)",
  p75: "p75",
  p95: "p95",
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

function kobbeRatingClassName(
  rating: ReturnType<typeof ratingForMetric>,
): string {
  if (rating === "good") return "text-success";
  if (rating === "needs-improvement") return "text-warning";
  return "text-destructive";
}

export function PerformanceDashboardPreview({ webVitals }: Props) {
  const metrics = webVitals.metrics.slice(0, 5);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const [envTab, setEnvTab] = useState(0);
  const activeMetric = (metrics[activeMetricIndex]?.name ??
    "LCP") as WebVitalName;
  const envRows =
    envTab === 0
      ? perfBrowserRows
      : performanceEnvListRows(webVitals.environments, "device");
  const formatActiveP75 = (value: number) => formatPerfValue(activeMetric, value);

  return (
    <div className="relative mx-auto min-w-0">
      <DashboardMetricStrip ariaLabel="Web Vitals metrics" lgCols={5}>
        {metrics.map((metric, index) => {
          const active = index === activeMetricIndex;
          const rating = ratingForMetric(metric.name, metric.p75);
          return (
            <DashboardMetricTile
              key={metric.name}
              active={active}
              surface="muted"
              onClick={() => setActiveMetricIndex(index)}
            >
              <div className="flex h-full min-w-0 flex-col gap-1">
                <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
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
                      "shrink-0 text-xs leading-tight font-medium tabular-nums",
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
                    {formatPerfValue(metric.name, metric.p75)}
                  </span>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs">
                    <span
                      className={cn(
                        "font-medium",
                        active
                          ? "text-background/70"
                          : kobbeRatingClassName(rating),
                      )}
                    >
                      {ratingDisplayLabel(rating)}
                    </span>
                  </div>
                </div>
              </div>
            </DashboardMetricTile>
          );
        })}
      </DashboardMetricStrip>

      <div className={cn(dashboardCardStackClass, "mt-2")}>
        <PerformanceTrendCard metric={activeMetric} points={trendPoints} />

        <Card variant="bordered" className={cn(dashboardCardRootClass, "h-auto min-h-0")}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Needs attention
            </CardTitle>
            <CardDescription className={dashboardCardDescriptionClass}>
              Pages with the highest p75 for {activeMetric} (min. 3 samples per
              path)
            </CardDescription>
          </CardHeader>
          <DashboardCardTable className="h-auto">
            <DashboardTable>
              <DashboardTableHeader>
                <DashboardTableRow>
                  <DashboardTableHead>Page</DashboardTableHead>
                  <DashboardTableHead className="text-right">
                    p75
                  </DashboardTableHead>
                  <DashboardTableHead className="text-right">
                    Samples
                  </DashboardTableHead>
                </DashboardTableRow>
              </DashboardTableHeader>
              <DashboardTableBody>
                {attentionRows.map((row) => (
                  <DashboardTableRow key={row.path}>
                    <DashboardTableCell className="max-w-[min(100%,20rem)] font-medium">
                      <span className="truncate">{row.path}</span>
                    </DashboardTableCell>
                    <DashboardTableCell className="text-right tabular-nums">
                      {formatPerfValue(activeMetric, row.p75)}
                    </DashboardTableCell>
                    <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
                      {row.n.toLocaleString()}
                    </DashboardTableCell>
                  </DashboardTableRow>
                ))}
              </DashboardTableBody>
            </DashboardTable>
          </DashboardCardTable>
        </Card>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardTabbedBreakdownCard
            title="Devices"
            isEmpty={envRows.length === 0}
            empty={{
              icon: ComputerPhoneSyncIcon,
              title:
                envTab === 0
                  ? "No browsers in range"
                  : "No device types in range",
            }}
            tabs={{
              label: "Devices",
              tabs: ["Browsers", "Devices"],
              activeIndex: envTab,
              onActiveIndexChange: setEnvTab,
            }}
          >
            <PerformanceEnvBreakdownList
              rows={envRows}
              formatP75={formatActiveP75}
            />
          </DashboardTabbedBreakdownCard>
          <DashboardBreakdownCard
            title="Country"
            description={`Slowest dimensions by p75 · ${activeMetric}`}
            isEmpty={perfCountryRows.length === 0}
            empty={{
              icon: Globe02Icon,
              title: "No countries in range",
            }}
          >
            <PerformanceEnvBreakdownList
              rows={perfCountryRows}
              formatP75={formatActiveP75}
            />
          </DashboardBreakdownCard>
        </section>
      </div>
    </div>
  );
}

function PerformanceTrendCard(props: {
  metric: WebVitalName;
  points: typeof trendPoints;
}) {
  const [visible, setVisible] = useState(defaultPerformancePercentileVisibility);

  return (
    <Card variant="bordered" className={cn(dashboardCardRootClass, "h-auto")}>
      <CardHeader className={dashboardCardHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          {props.metric} over time
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Last 7 days
        </CardDescription>
        <CardAction>
          <PerformancePercentileToggles
            value={visible}
            onChange={setVisible}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="h-auto min-w-0 !px-0 !pt-0 pb-4 sm:pb-5">
        <div className="min-w-0 px-3 sm:px-4">
          <PerformanceTrendPreview
            metric={props.metric}
            points={props.points}
            visible={visible}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PerformanceTrendPreview(props: {
  metric: WebVitalName;
  points: typeof trendPoints;
  visible: PerformancePercentileVisibility;
}) {
  const { metric, visible } = props;
  const { p50: showP50, p75: showP75, p95: showP95 } = visible;
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
  const visibleSeries = useMemo(() => {
    const keys: Array<keyof typeof performanceChartConfig> = [];
    if (showP50) keys.push("p50");
    if (showP75) keys.push("p75");
    if (showP95) keys.push("p95");
    return keys;
  }, [showP50, showP75, showP95]);
  const barMaxSize = Math.min(
    24,
    Math.floor(
      chartBarMaxSize(props.points.length) / Math.max(1, visibleSeries.length),
    ),
  );
  const barCategoryGap = chartBarCategoryGap(props.points.length);

  return (
    <div className="relative min-w-0 w-full">
      <ChartContainer
        config={performanceChartConfig}
        className="h-64 w-full min-w-0 sm:h-72 [&_.recharts-label-list]:hidden [&_.recharts-curve.recharts-tooltip-cursor]:hidden [&_.recharts-rectangle.recharts-tooltip-cursor]:hidden [&_.recharts-tooltip-cursor]:hidden"
      >
        <ComposedChart
          accessibilityLayer
          data={props.points}
          margin={{ top: 20, right: 12, left: 0, bottom: 16 }}
          barCategoryGap={barCategoryGap}
          barGap={visibleSeries.length > 1 ? 2 : 0}
        >
          <XAxis
            dataKey="label"
            scale="point"
            padding={{ left: 6, right: 6 }}
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            interval="preserveStartEnd"
            minTickGap={28}
            tick={{
              fontSize: 10.5,
              className: "fill-muted-foreground/80 font-medium",
            }}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            width={48}
            domain={[0, yMax]}
            ticks={yTicks}
            tickCount={3}
            tickMargin={4}
            tickFormatter={(v) => formatAxisTick(Number(v))}
            tick={{
              fontSize: 10.5,
              className: "fill-muted-foreground/70 font-medium tabular-nums",
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<PerformanceChartTooltip metric={metric} />}
          />
          {visibleSeries.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill="var(--foreground)"
              maxBarSize={barMaxSize}
              shape={<LollipopBarShape />}
              activeBar={<BrandActiveLollipopBarShape />}
              isAnimationActive={false}
            >
              {props.points.map((point) => (
                <Cell
                  key={`${key}-${point.t}`}
                  fill={ratingColorForValue(metric, point[key])}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          ))}
        </ComposedChart>
      </ChartContainer>
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 px-1 pt-2 text-[0.6875rem] leading-relaxed">
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-success size-2 rounded-[2px]" aria-hidden />
          Good
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-warning size-2 rounded-[2px]" aria-hidden />
          Watch
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-destructive size-2 rounded-[2px]" aria-hidden />
          Poor
        </span>
      </div>
    </div>
  );
}

function PerformanceChartTooltip({
  metric,
  active,
  payload,
}: {
  metric: WebVitalName;
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string | null;
    payload?: Record<string, unknown> & { label?: string };
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const title = String(payload[0]?.payload?.label ?? "");

  return (
    <div className="border-background/10 bg-foreground text-background grid max-w-xs min-w-48 gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-md">
      <div className="text-background font-medium">{title}</div>
      <div className="grid gap-1">
        {payload.map((row) => {
          const key = String(row.dataKey ?? "");
          const label =
            performancePercentileLabels[
              key as keyof typeof performancePercentileLabels
            ] ?? key;
          const metricValue =
            typeof row.value === "number" && Number.isFinite(row.value)
              ? row.value
              : null;
          const color = ratingColorForValue(metric, metricValue);
          const rating = ratingLabelForValue(metric, metricValue);
          const raw = row.payload?.[key] != null ? row.payload[key] : row.value;

          return (
            <div key={key} className="flex items-center gap-2 leading-none">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              <div className="flex flex-1 items-baseline justify-between gap-4 leading-none">
                <span className="text-background/70">{label}</span>
                <span className="flex items-baseline gap-2">
                  <span className="text-background/60 text-[0.6875rem] font-medium">
                    {rating}
                  </span>
                  <span className="text-background font-mono font-medium tabular-nums">
                    {formatPerfTooltipValue(metric, raw)}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PerformanceDashboardPreview;
