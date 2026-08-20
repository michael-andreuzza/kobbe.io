import { useState } from "react";

import { cn } from "@/lib/utils";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import {
  heroChartAnnotations,
  heroChartKpi,
  heroChartPinnedDay,
  heroChartPinnedIndex,
  heroChartPoints,
  heroChartRangeLabel,
} from "./dashboard-preview-data";
import { dashboardCardStackClass } from "./dashboard-card-layout";
import { ChartNoteTooltipEditorPreview } from "./chart-note-tooltip-editor-preview";
import { DashboardTrafficChart } from "./dashboard-traffic-chart";
import type { TrafficChartMetric } from "./traffic-line-chart";

const trafficChartMetricLabels = {
  views: "Views",
  visitors: "Visitors",
  visits: "Visits",
  bounceRate: "Bounce rate",
  sessionTime: "Session time",
  revenue: "Revenue",
} satisfies Record<TrafficChartMetric, string>;

export function DashboardPreview() {
  const [chartMetric, setChartMetric] =
    useState<TrafficChartMetric>("visitors");

  const handleMetricClick = (metric: TrafficChartMetric) => {
    setChartMetric(metric);
  };

  return (
    <div className="relative min-w-0">
      <DashboardKpiStrip
        showComparison={heroChartKpi.showComparison}
        visitors={heroChartKpi.visitors}
        visits={heroChartKpi.visits}
        views={heroChartKpi.views}
        bounceRate={heroChartKpi.bounceRate}
        sessionTime={heroChartKpi.sessionTime}
        revenue={heroChartKpi.revenue}
        activeMetric={chartMetric}
        onMetricClick={handleMetricClick}
      />
      <div className={cn(dashboardCardStackClass, "group/demo relative mt-2")}>
        <DashboardTrafficChart
          points={heroChartPoints}
          metric={chartMetric}
          rangeLabel={heroChartRangeLabel}
          previewPinnedIndex={heroChartPinnedIndex}
          previewPinnedDay={heroChartPinnedDay}
          annotations={heroChartAnnotations}
          annotationFooter={
            <ChartNoteTooltipEditorPreview
              day={heroChartPinnedDay}
              annotations={heroChartAnnotations}
            />
          }
        >
          {trafficChartMetricLabels[chartMetric]}
        </DashboardTrafficChart>
        <a
          href="https://app.kobbe.io/demo/kobbe-studio"
          target="_blank"
          rel="noopener noreferrer"
          data-kobbe-event="Hero - dashboard preview demo"
          aria-label="Open the live demo"
          className="absolute inset-0 z-10 rounded-[inherit]"
        >
          <span className="border-border bg-background/90 text-foreground pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-1.5 text-xs font-medium opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover/demo:opacity-100">
            Open the live demo
          </span>
        </a>
      </div>
    </div>
  );
}

export default DashboardPreview;
