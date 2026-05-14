import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    if (shouldReduceMotion || spotlightStep >= revenueSpotlightIndexes.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSpotlightStep((currentStep) => currentStep + 1);
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, spotlightStep]);

  return (
    <div className="grid gap-8 gap-x-12">
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
      <Card className="bg-muted gap-0 overflow-hidden p-8 lg:p-42">
        <CardContent className="bg-card p-0 py-4">
          <div className="relative h-80 overflow-hidden rounded-md">
            <div className="[data-dashboard-metric-tile]]:bg-transparent pointer-events-none absolute top-0 left-0 w-full origin-top-left **:data-[slot=card]:bg-transparent">
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

      <div className="grid gap-4 text-balance sm:grid-cols-3">
        <RevenueNote
          title="Connect a source"
          description="Use Stripe, Polar, Paddle, or Creem webhooks from site settings."
        />
        <RevenueNote
          title="Keep attribution scoped"
          description="Pass Kobbe's session attribution through checkout instead of profiling visitors."
        />
        <RevenueNote
          title="Read it in context"
          description="Revenue shows up beside traffic KPIs, pages, and sources."
        />
      </div>
    </div>
  );
}

function RevenueNote(props: { title: string; description: string }) {
  return (
    <Card className="bg-transparent gap-0 p-0 ">
      <CardHeader className="p-0">
        <CardTitle className="text-foreground font-sm  uppercase font-semibold">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-3 pb-4">
        <p className="text-muted-foreground text-base font-medium">{props.description}</p>
      </CardContent>
    </Card>
  );
}

export default RevenueInsightsPreview;
