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
};

export function DashboardTrafficChart(props: Props) {
  return (
    <section className="mt-4 sm:mt-5">
      <Card className={cn(dashboardCardRootClass, props.className)}>
        <CardContent className="min-w-0 p-0 pt-4">
          {props.children ? (
            <div className="pb-1 pl-2 text-sm font-semibold text-foreground ">
              {props.children}
            </div>
          ) : null}
          <TrafficLineChart
            points={props.points}
            bucket="day"
            variant="hero"
            metric={props.metric}
            displayTimeZone="UTC"
            revenueCurrency="USD"
          />
        </CardContent>
      </Card>
    </section>
  );
}

