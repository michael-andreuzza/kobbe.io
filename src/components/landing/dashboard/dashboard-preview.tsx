import { cn } from "@/lib/utils";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import { heroChartKpi } from "./dashboard-preview-data";
import { dashboardCardStackClass } from "./dashboard-card-layout";
import { HeroStaticChart } from "./hero-static-chart";

/**
 * Static, non-interactive dashboard mockup for the hero. Server-rendered only:
 * no hydration, no chart runtime, no click targets.
 */
export function DashboardPreview() {
  return (
    <div className="relative min-w-0" aria-hidden="true">
      <DashboardKpiStrip
        showComparison={heroChartKpi.showComparison}
        visitors={heroChartKpi.visitors}
        visits={heroChartKpi.visits}
        views={heroChartKpi.views}
        bounceRate={heroChartKpi.bounceRate}
        sessionTime={heroChartKpi.sessionTime}
        revenue={heroChartKpi.revenue}
        activeMetric="visitors"
      />
      <div className={cn(dashboardCardStackClass, "mt-2")}>
        <HeroStaticChart />
      </div>
    </div>
  );
}

export default DashboardPreview;
