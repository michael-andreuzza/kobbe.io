import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { DevicesCard } from "./cards/devices-card";
import { EventsCard } from "./cards/events-card";
import { LocationsCard } from "./cards/locations-card";
import { PagesCard } from "./cards/pages-card";
import { SearchKeywordsCard } from "./cards/search-keywords-card";
import { SourcesCard } from "./cards/sources-card";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import {
  dashboardPreviewData,
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

const heroMetricSequence = [
  "visitors",
  "views",
  "visits",
  "bounceRate",
] satisfies TrafficChartMetric[];

export function DashboardPreview() {
  const [chartMetric, setChartMetric] =
    useState<TrafficChartMetric>("visitors");
  const [autoplayStep, setAutoplayStep] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const data = dashboardPreviewData["30d"];

  useEffect(() => {
    if (autoplayPaused || prefersReducedMotion) return;
    if (autoplayStep >= heroMetricSequence.length - 1) return;

    const timeout = window.setTimeout(() => {
      setAutoplayStep((currentStep) => {
        const nextStep = (currentStep + 1) % heroMetricSequence.length;
        setChartMetric(heroMetricSequence[nextStep]);
        return nextStep;
      });
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [autoplayPaused, autoplayStep, prefersReducedMotion]);

  const handleMetricClick = (metric: TrafficChartMetric) => {
    setAutoplayPaused(true);
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
      <div className={cn(dashboardCardStackClass, "mt-2")}>
        <DashboardTrafficChart
          points={heroChartPoints}
          metric={chartMetric}
          rangeLabel={heroChartRangeLabel}
          previewPinnedIndex={heroChartPinnedIndex}
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
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <PagesCard pages={data.pages} />
          <SourcesCard sources={data.sources} />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <LocationsCard locations={data.locations} />
          <DevicesCard devices={data.devices} />
          <SearchKeywordsCard rows={data.searchKeywords} />
          <EventsCard rows={data.events} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}
