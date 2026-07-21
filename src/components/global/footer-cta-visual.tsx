import { Bar, ComposedChart, Line, XAxis, YAxis } from "recharts";

import { LollipopBarShape } from "@/components/landing/dashboard/chart-lollipop";
import { SiteFaviconLg } from "@/components/landing/dashboard/site-favicon";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  siteCardPreview,
  siteCardSparkline,
  siteCardSparklineBarSize,
} from "@/lib/site-card-preview-data";
import { cn } from "@/lib/utils";

import authPanelBg from "@/images/assets/backgrounds/4.png";

const sparklinePoints = siteCardSparkline;
const kobbeSiteCard = siteCardPreview;

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

function chartCountAxisUpperBound(maxValue: number) {
  if (maxValue <= 1) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(maxValue));
  const normalized = maxValue / magnitude;
  const step =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

function SiteVisitorsSparkline(props: { className?: string }) {
  const data = sparklinePoints.map((point, index) => ({
    slot: String(index),
    visitors: point.visitors,
    revenueMinor: point.revenueMinor,
  }));
  const maxVisitors = Math.max(
    1,
    ...sparklinePoints.map((point) => point.visitors),
  );
  const yMax = chartCountAxisUpperBound(maxVisitors);
  const maxRevenue = Math.max(
    1,
    ...sparklinePoints.map((point) => point.revenueMinor),
  );
  const revenueYMax = chartCountAxisUpperBound(maxRevenue);

  return (
    <ChartContainer
      config={sparklineChartConfig}
      initialDimension={{ width: 320, height: 48 }}
      className={cn(
        "pointer-events-none h-12 min-h-12 w-full min-w-0",
        props.className,
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
        <YAxis yAxisId="visitors" hide domain={[0, yMax]} />
        <YAxis yAxisId="revenue" hide domain={[0, revenueYMax]} />
        <Bar
          yAxisId="visitors"
          dataKey="visitors"
          fill="var(--foreground)"
          barSize={siteCardSparklineBarSize(sparklinePoints.length)}
          shape={<LollipopBarShape solid />}
          isAnimationActive={false}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenueMinor"
          stroke="var(--brand)"
          strokeWidth={1.4}
          strokeOpacity={0.75}
          dot={false}
          activeDot={false}
          connectNulls
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

function MetricRow(props: {
  label: string;
  value: string;
  chipClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 leading-none">
      <span className="text-muted-foreground inline-flex min-w-0 items-center gap-1.5 text-xs">
        <span
          className={cn("size-2 shrink-0 rounded-[2px]", props.chipClassName)}
        />
        {props.label}
      </span>
      <span className="text-foreground shrink-0 text-xs font-medium tabular-nums">
        {props.value}
      </span>
    </div>
  );
}

function SiteCardWidget() {
  return (
    <div className="border-border/70 bg-card pointer-events-none w-full max-w-xs rounded-xl border p-4 shadow-lg sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <SiteFaviconLg
          domain={kobbeSiteCard.domain}
          title={kobbeSiteCard.name}
          localSrc={kobbeSiteCard.faviconSrc}
          className="border-none"
        />
        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm leading-tight font-semibold">
            {kobbeSiteCard.name}
          </div>
          <div className="text-muted-foreground truncate text-xs leading-snug">
            {kobbeSiteCard.domain}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <SiteVisitorsSparkline />
      </div>
      <div className="mt-4 space-y-2">
        <MetricRow
          label="Visitors"
          value={kobbeSiteCard.visitors}
          chipClassName="bg-foreground"
        />
        <MetricRow
          label="Revenue"
          value={kobbeSiteCard.revenue}
          chipClassName="bg-brand"
        />
      </div>
    </div>
  );
}

export function FooterCtaVisual() {
  return (
    <div
      aria-hidden
      className="relative flex min-h-64 w-full items-center justify-center overflow-hidden lg:min-h-full"
    >
      <img
        src={authPanelBg.src}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur"
      />
      <div className="relative z-10 flex w-full justify-center px-6 py-10 sm:px-10">
        <SiteCardWidget />
      </div>
    </div>
  );
}

export default FooterCtaVisual;
