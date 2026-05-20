import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";
import { dashboardPreviewData } from "./dashboard-preview-data";
import { DashboardTrafficChart } from "./dashboard-traffic-chart";

const data = dashboardPreviewData["30d"];
const revenueSpotlightIndexes = [8, 15, 23] as const;

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
      <Card className="bg-muted gap-0 overflow-hidden border-0 p-8 pb-0 lg:p-42 lg:pb-0">
        <CardContent className="bg-card -mb-10 rounded-xl p-0 py-4">
          <div className="bg-background relative h-80 overflow-hidden rounded-xl">
            <div className="pointer-events-none absolute top-0 left-0 w-full origin-top-left">
              <div className="kobbe-revenue-chart pointer-events-auto relative z-10">
                <DashboardTrafficChart
                  points={data.points}
                  metric="revenue"
                  rangeLabel={data.label}
                  spotlightIndex={spotlightIndex}
                ></DashboardTrafficChart>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default RevenueInsightsPreview;
