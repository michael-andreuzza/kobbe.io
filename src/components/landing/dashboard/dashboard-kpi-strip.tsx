import { cn } from "@/lib/utils";
import {
  DashboardMetricStrip,
  DashboardMetricTile,
} from "./dashboard-metric-strip";
import type { TrafficChartMetric } from "./traffic-line-chart";

type KpiPillTone = "good" | "bad" | "neutral";
type TrendKpi = { display: string; deltaPct: number | null; tone: KpiPillTone };

type KpiTile = {
  key: string;
  label: string;
  valueDisplay: string;
  valueClassName?: string;
  rightHint?: string;
  rightHintTone?: KpiPillTone;
  rightHintAriaLabel?: string;
  active?: boolean;
  activeColor?: string;
  onClick?: () => void;
};

type KpiTileBodyProps = Omit<KpiTile, "key" | "onClick">;

function KpiStripGrid(props: {
  items: KpiTile[];
  ariaLabel: string;
  lgCols: 4 | 5 | 6;
  tileSurface?: "card" | "muted";
}) {
  const tileSurface = props.tileSurface ?? "card";
  return (
    <DashboardMetricStrip ariaLabel={props.ariaLabel} lgCols={props.lgCols}>
      {props.items.map((item) => {
        const { key, active, onClick, ...tile } = item;
        return (
          <DashboardMetricTile
            key={key}
            active={active}
            activeColor={tile.activeColor}
            onClick={onClick}
            surface={tileSurface}
          >
            <KpiTileBody {...tile} active={active} />
          </DashboardMetricTile>
        );
      })}
    </DashboardMetricStrip>
  );
}

function KpiTileBody(kpi: KpiTileBodyProps) {
  const toneClass = kpi.active
    ? "text-background/70"
    : kpi.rightHintTone === "good"
      ? "text-success"
      : kpi.rightHintTone === "bad"
        ? "text-destructive"
        : "text-muted-foreground";
  return (
    <div className="flex h-full min-w-0 flex-col gap-1">
      <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
        <span
          className={cn(
            "truncate text-xs leading-tight font-medium",
            kpi.active ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {kpi.label}
        </span>
        {kpi.rightHint != null && kpi.rightHint !== "—" ? (
          <span className="relative inline-flex shrink-0 text-xs leading-tight font-medium">
            <span
              className={cn("tabular-nums transition-opacity duration-150", toneClass)}
              aria-label={kpi.rightHintAriaLabel}
            >
              {kpi.rightHint}
            </span>
          </span>
        ) : null}
      </div>
      <div className="mt-auto min-w-0">
        <span
          className={cn(
            "text-lg leading-tight font-medium tracking-tight tabular-nums sm:text-xl",
            kpi.active ? "text-background" : "text-foreground",
            kpi.valueClassName,
          )}
        >
          {kpi.valueDisplay}
        </span>
      </div>
    </div>
  );
}

const chartMetricActiveColor = {
  visitors: "var(--foreground)",
  visits: "var(--foreground)",
  views: "var(--foreground)",
  bounceRate: "var(--foreground)",
  sessionTime: "var(--foreground)",
  revenue: "var(--foreground)",
} satisfies Record<TrafficChartMetric, string>;

export function DashboardKpiStrip(props: {
  showComparison: boolean;
  visitors: TrendKpi;
  visits: TrendKpi;
  views: TrendKpi;
  bounceRate: TrendKpi;
  sessionTime: TrendKpi;
  revenue?: { display: string; rightHint?: string };
  activeMetric?: TrafficChartMetric;
  onMetricClick?: (metric: TrafficChartMetric) => void;
}) {
  const trendHint = (kpi: TrendKpi): string =>
    formatKpiDeltaLabel(props.showComparison, kpi.deltaPct);
  const trendAria = props.showComparison ? "Change vs previous period" : undefined;
  const items: KpiTile[] = [
    {
      key: "visitors",
      label: "Visitors",
      valueDisplay: props.visitors.display,
      rightHint: trendHint(props.visitors),
      rightHintTone: props.visitors.tone,
      rightHintAriaLabel: trendAria,
      active: props.activeMetric === "visitors",
      activeColor: chartMetricActiveColor.visitors,
      onClick: props.onMetricClick
        ? () => props.onMetricClick?.("visitors")
        : undefined,
    },
    {
      key: "visits",
      label: "Visits",
      valueDisplay: props.visits.display,
      rightHint: trendHint(props.visits),
      rightHintTone: props.visits.tone,
      rightHintAriaLabel: trendAria,
      active: props.activeMetric === "visits",
      activeColor: chartMetricActiveColor.visits,
      onClick: props.onMetricClick ? () => props.onMetricClick?.("visits") : undefined,
    },
    {
      key: "views",
      label: "Views",
      valueDisplay: props.views.display,
      rightHint: trendHint(props.views),
      rightHintTone: props.views.tone,
      rightHintAriaLabel: trendAria,
      active: props.activeMetric === "views",
      activeColor: chartMetricActiveColor.views,
      onClick: props.onMetricClick ? () => props.onMetricClick?.("views") : undefined,
    },
    {
      key: "bounce",
      label: "Bounce rate",
      valueDisplay: props.bounceRate.display,
      rightHint: trendHint(props.bounceRate),
      rightHintTone: props.bounceRate.tone,
      rightHintAriaLabel: trendAria,
      active: props.activeMetric === "bounceRate",
      activeColor: chartMetricActiveColor.bounceRate,
      onClick: props.onMetricClick
        ? () => props.onMetricClick?.("bounceRate")
        : undefined,
    },
    {
      key: "session",
      label: "Session time",
      valueDisplay: props.sessionTime.display,
      rightHint: trendHint(props.sessionTime),
      rightHintTone: props.sessionTime.tone,
      rightHintAriaLabel: trendAria,
      active: props.activeMetric === "sessionTime",
      activeColor: chartMetricActiveColor.sessionTime,
      onClick: props.onMetricClick
        ? () => props.onMetricClick?.("sessionTime")
        : undefined,
    },
  ];
  if (props.revenue) {
    items.push({
      key: "revenue",
      label: "Revenue",
      valueDisplay: props.revenue.display,
      valueClassName: "text-base sm:text-lg",
      rightHint: props.revenue.rightHint,
      active: props.activeMetric === "revenue",
      activeColor: chartMetricActiveColor.revenue,
      onClick: props.onMetricClick ? () => props.onMetricClick?.("revenue") : undefined,
    });
  }
  return (
    <KpiStripGrid
      items={items}
      ariaLabel="Key metrics"
      lgCols={props.revenue ? 6 : 5}
      tileSurface="muted"
    />
  );
}

function formatKpiDeltaLabel(showComparison: boolean, deltaPct: number | null): string {
  if (!showComparison) {
    return "—";
  }
  if (deltaPct == null) {
    return "New";
  }
  if (Number.isNaN(deltaPct) || !Number.isFinite(deltaPct)) {
    return "—";
  }
  const capped = Math.max(-100, Math.min(100, deltaPct));
  if (Math.abs(capped) < 0.05) {
    return "0%";
  }
  const rounded = Math.round(capped * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}
