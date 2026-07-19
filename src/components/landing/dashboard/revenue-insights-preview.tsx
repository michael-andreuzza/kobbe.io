import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { PagesCard } from "./cards/pages-card";
import { SourcesCard } from "./cards/sources-card";
import { dashboardCardStackClass } from "./dashboard-card-layout";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import {
  dashboardPreviewData,
  formatDashboardPreviewRevenue,
} from "./dashboard-preview-data";
import { DashboardTrafficChart } from "./dashboard-traffic-chart";

const data = dashboardPreviewData["30d"];
const revenueSpotlightIndexes = [8, 15, 23] as const;
const revenueFormat = formatDashboardPreviewRevenue;

export function RevenueInsightsPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [spotlightStep, setSpotlightStep] = useState(0);
  const spotlightIndex = shouldReduceMotion
    ? undefined
    : revenueSpotlightIndexes[spotlightStep];

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSpotlightStep(
        (currentStep) => (currentStep + 1) % revenueSpotlightIndexes.length,
      );
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, spotlightStep]);

  return (
    <>
      <style>{`
        @keyframes kobbeRevenueBarRise {
          from {
            opacity: 0.55;
            transform: scaleY(0.42);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .kobbe-revenue-chart .recharts-bar-rectangle path {
            animation: kobbeRevenueBarRise 620ms cubic-bezier(0.16, 1, 0.3, 1) both;
            transform-box: fill-box;
            transform-origin: center bottom;
          }

          .kobbe-revenue-chart .recharts-bar-rectangle:nth-child(3n + 1) path {
            animation-delay: 40ms;
          }

          .kobbe-revenue-chart .recharts-bar-rectangle:nth-child(3n + 2) path {
            animation-delay: 80ms;
          }
        }
      `}</style>
      <div className="relative min-w-0">
        <DashboardKpiStrip
          showComparison={data.kpi.showComparison}
          visitors={data.kpi.visitors}
          visits={data.kpi.visits}
          views={data.kpi.views}
          bounceRate={data.kpi.bounceRate}
          sessionTime={data.kpi.sessionTime}
          revenue={data.kpi.revenue}
          activeMetric="revenue"
        />
        <div className={cn(dashboardCardStackClass, "mt-2")}>
          <div className="kobbe-revenue-chart">
            <DashboardTrafficChart
              points={data.points}
              metric="revenue"
              rangeLabel={data.label}
              spotlightIndex={spotlightIndex}
            >
              Revenue
            </DashboardTrafficChart>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
            <PagesCard
              pages={data.pages}
              revenueFormat={revenueFormat}
            />
            <SourcesCard
              sources={data.sources}
              revenueFormat={revenueFormat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RevenueInsightsPreview;
