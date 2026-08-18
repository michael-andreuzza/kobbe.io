import { Area, ComposedChart, XAxis, YAxis } from "recharts";

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

const trafficAreaFillColor = "var(--traffic-area-fill)";
const revenueAreaFillColor = "var(--revenue-area-fill)";
const REVENUE_AREA_BAND_RATIO = 0.22;
const REVENUE_AREA_DATA_KEY = "revenueAreaOverlay";
const TRAFFIC_AREA_STACK_KEY = "trafficAreaStack";
const TRAFFIC_AREA_STACK_ID = "trafficAreaStack";
const TRAFFIC_AREA_CURVE_TYPE = "monotone" as const;

function shouldStackRevenueOnPoint(
  point: { revenue?: number; visitors?: number },
  metricKey: "visitors",
): boolean {
  if ((point.revenue ?? 0) <= 0) return false;
  const metricValue = point[metricKey];
  return typeof metricValue === "number" && Number.isFinite(metricValue) && metricValue > 0;
}

function attachSparklineAreaStackValues(input: {
  point: { revenue?: number; visitors: number };
  maxRevenueOverlay: number;
  trafficYMax: number;
}) {
  const metricNumber = input.point.visitors;
  if (!shouldStackRevenueOnPoint(input.point, "visitors")) {
    return {
      [REVENUE_AREA_DATA_KEY]: 0,
      [TRAFFIC_AREA_STACK_KEY]: metricNumber,
    };
  }
  const revenueOverlay =
    (input.point.revenue! / input.maxRevenueOverlay) *
    input.trafficYMax *
    REVENUE_AREA_BAND_RATIO;
  return {
    [REVENUE_AREA_DATA_KEY]: revenueOverlay,
    [TRAFFIC_AREA_STACK_KEY]: Math.max(0, metricNumber - revenueOverlay),
  };
}

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
  const maxRevenueOverlay = Math.max(1, ...points.map((p) => p.revenueMinor));
  const data = points.map((p, index) => {
    const point = {
      slot: String(index),
      t: p.t,
      visitors: p.visitors,
      revenue: p.revenueMinor,
    };
    if (!hasRevenue) return point;
    return {
      ...point,
      ...attachSparklineAreaStackValues({
        point,
        maxRevenueOverlay,
        trafficYMax: yMax,
      }),
    };
  });

  return (
    <ChartContainer
      config={sparklineChartConfig}
      initialDimension={{ width: 320, height: 48 }}
      className={cn(
        "pointer-events-none h-12 min-h-12 w-full min-w-0 overflow-hidden rounded-md",
        className,
      )}
      aria-hidden
    >
      <ComposedChart
        data={data}
        margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
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
        {hasRevenue ? (
          <>
            <Area
              yAxisId="visitors"
              stackId={TRAFFIC_AREA_STACK_ID}
              type={TRAFFIC_AREA_CURVE_TYPE}
              dataKey={REVENUE_AREA_DATA_KEY}
              fill={revenueAreaFillColor}
              stroke="none"
              strokeWidth={0}
              fillOpacity={1}
              dot={false}
              activeDot={false}
              connectNulls
              isAnimationActive={false}
            />
            <Area
              yAxisId="visitors"
              stackId={TRAFFIC_AREA_STACK_ID}
              type={TRAFFIC_AREA_CURVE_TYPE}
              dataKey={TRAFFIC_AREA_STACK_KEY}
              fill={trafficAreaFillColor}
              stroke="none"
              strokeWidth={0}
              fillOpacity={1}
              dot={false}
              activeDot={false}
              connectNulls
              isAnimationActive={false}
            />
          </>
        ) : (
          <Area
            yAxisId="visitors"
            type={TRAFFIC_AREA_CURVE_TYPE}
            dataKey="visitors"
            fill={trafficAreaFillColor}
            stroke="none"
            strokeWidth={0}
            fillOpacity={1}
            dot={false}
            activeDot={false}
            connectNulls
            isAnimationActive={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
