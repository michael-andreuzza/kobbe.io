import { Bar, ComposedChart, XAxis, YAxis } from "recharts";

import {
  LollipopBarShape,
  lollipopWidgetStemWidth,
  revenueLollipopHeadRadius,
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

const trafficBarStackColor = "var(--traffic-bar-stack)";
const revenueBarStackColor = "var(--revenue-bar-stack)";

export type IndexSparklinePoint = {
  t: number;
  visitors: number;
  revenueMinor: number;
};

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
  const data = points.map((p, index) => ({
    slot: String(index),
    t: p.t,
    visitors: p.visitors,
    revenueMinor: p.revenueMinor,
  }));
  const barSize = points.length > 45 ? 2 : points.length > 28 ? 3 : 4;
  const stemWidth = lollipopWidgetStemWidth(barSize);

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
        margin={{ top: 8, right: 2, left: 2, bottom: 5 }}
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
        <YAxis yAxisId="visitors" hide domain={[0, yMax]} />
        <Bar
          yAxisId="visitors"
          dataKey="visitors"
          fill={trafficBarStackColor}
          barSize={barSize}
          shape={(barProps) => {
            const payload = barProps.payload as {
              visitors?: number;
              revenueMinor?: number;
            };
            const showRevenueHead =
              hasRevenue &&
              (payload.visitors ?? 0) > 0 &&
              (payload.revenueMinor ?? 0) > 0;
            return (
              <LollipopBarShape
                {...barProps}
                widget
                solid
                fill={trafficBarStackColor}
                stemWidth={stemWidth}
                revenueHeadRadius={
                  showRevenueHead
                    ? revenueLollipopHeadRadius(
                        payload.revenueMinor ?? 0,
                        maxRevenue,
                        true,
                        points.length,
                        barSize,
                      )
                    : 0
                }
                revenueHeadFill={revenueBarStackColor}
              />
            );
          }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
