import { Bar, ComposedChart, XAxis, YAxis } from "recharts";

import {
  LollipopBarShape,
  StackedRevenueBarShape,
  StackedTrafficBarShape,
} from "@/components/landing/dashboard/chart-lollipop";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { chartCountAxisUpperBound } from "@/lib/chart-y-axis";
import { cn } from "@/lib/utils";

const sparklineChartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--foreground)",
  },
  revenueMinor: {
    label: "Revenue",
    color: "var(--brand)",
  },
} satisfies ChartConfig;

const REVENUE_BAR_BAND_RATIO = 0.28;
const REVENUE_BAR_DATA_KEY = "revenueBarValue";
const trafficBarStackColor = "var(--traffic-bar-stack)";
const revenueBarStackColor = "var(--revenue-bar-stack)";

export type IndexSparklinePoint = {
  t: number;
  visitors: number;
  revenueMinor: number;
};

function sparklineRevenueStackValue(input: {
  visitors: number;
  revenueMinor: number;
  maxRevenue: number;
  trafficYMax: number;
}): number {
  if (input.revenueMinor <= 0 || input.visitors <= 0) return 0;
  return (
    (input.revenueMinor / input.maxRevenue) *
    input.trafficYMax *
    REVENUE_BAR_BAND_RATIO
  );
}

export function IndexSiteVisitorsSparkline(props: {
  points: IndexSparklinePoint[];
  showRevenue?: boolean;
  className?: string;
}) {
  const { points, className } = props;

  if (points.length === 0) {
    return (
      <div
        className={cn(
          "bg-muted/25 ring-border/40 h-12 w-full rounded-md ring-1 ring-inset",
          className,
        )}
        aria-hidden
      />
    );
  }

  const maxV = Math.max(1, ...points.map((p) => p.visitors));
  const yMax = chartCountAxisUpperBound(maxV);
  const hasRevenue =
    Boolean(props.showRevenue) && points.some((p) => p.revenueMinor > 0);
  const maxRevenue = Math.max(1, ...points.map((p) => p.revenueMinor));
  const chartYMax = hasRevenue ? yMax * (1 + REVENUE_BAR_BAND_RATIO) : yMax;
  const data = points.map((p, index) => ({
    slot: String(index),
    t: p.t,
    visitors: p.visitors,
    revenueMinor: p.revenueMinor,
    ...(hasRevenue
      ? {
          [REVENUE_BAR_DATA_KEY]: sparklineRevenueStackValue({
            visitors: p.visitors,
            revenueMinor: p.revenueMinor,
            maxRevenue,
            trafficYMax: yMax,
          }),
        }
      : {}),
  }));
  const barSize = points.length > 45 ? 2 : points.length > 28 ? 3 : 4;

  return (
    <ChartContainer
      config={sparklineChartConfig}
      initialDimension={{ width: 320, height: 48 }}
      className={cn(
        "pointer-events-none h-12 min-h-12 w-full min-w-0",
        className,
      )}
      aria-hidden
    >
      <ComposedChart
        data={data}
        margin={{ top: 7, right: 2, left: 2, bottom: 5 }}
        accessibilityLayer
      >
        <XAxis
          dataKey="slot"
          scale="point"
          padding={{ left: 0, right: 0 }}
          hide
          axisLine={false}
          tickLine={false}
        />
        <YAxis yAxisId="visitors" hide domain={[0, chartYMax]} />
        <Bar
          yAxisId="visitors"
          dataKey="visitors"
          stackId={hasRevenue ? "sparkline" : undefined}
          fill={trafficBarStackColor}
          barSize={barSize}
          shape={(barProps) => {
            if (!hasRevenue) {
              return <LollipopBarShape {...barProps} widget solid />;
            }
            const payload = barProps.payload as Record<string, unknown>;
            const hasRevenueSegment =
              Number(payload[REVENUE_BAR_DATA_KEY] ?? 0) > 0;
            return (
              <StackedTrafficBarShape
                {...barProps}
                widget
                solid
                roundedTop={!hasRevenueSegment}
                fill={trafficBarStackColor}
              />
            );
          }}
          isAnimationActive={false}
        />
        {hasRevenue ? (
          <Bar
            yAxisId="visitors"
            dataKey={REVENUE_BAR_DATA_KEY}
            stackId="sparkline"
            fill={revenueBarStackColor}
            barSize={barSize}
            shape={(barProps) => (
              <StackedRevenueBarShape
                {...barProps}
                widget
                solid
                fill={revenueBarStackColor}
              />
            )}
            isAnimationActive={false}
          />
        ) : null}
      </ComposedChart>
    </ChartContainer>
  );
}
