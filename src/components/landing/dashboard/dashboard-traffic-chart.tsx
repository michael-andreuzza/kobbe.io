import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dashboardCardRootClass } from "./dashboard-card-layout";
import {
  TrafficLineChart,
  type StackedChartPoint,
  type TrafficChartMetric,
} from "./traffic-line-chart";

type Props = {
  points: StackedChartPoint[];
  metric: TrafficChartMetric;
  rangeLabel: string;
  children?: ReactNode;
  className?: string;
  spotlightIndex?: number;
};

export function DashboardTrafficChart(props: Props) {
  return (
    <section className="mt-4 sm:mt-5">
      <Card className={cn(dashboardCardRootClass, props.className)}>
        <CardContent className="min-w-0 p-0">
          {props.children ? (
            <div className="px-4 pt-3.5 pb-1 sm:px-5 sm:pt-4">
              <h3 className="text-sm leading-snug font-semibold text-foreground sm:text-base">
                {props.children} over time
              </h3>
            </div>
          ) : null}
          <TrafficLineChart
            points={props.points}
            bucket="day"
            variant="hero"
            metric={props.metric}
            spotlightIndex={props.spotlightIndex}
            displayTimeZone="UTC"
            revenueCurrency="USD"
          />
        </CardContent>
      </Card>
    </section>
  );
}
