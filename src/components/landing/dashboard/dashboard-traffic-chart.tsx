import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
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
        {props.children ? (
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              {props.children} over time
            </CardTitle>
            <CardDescription>{props.rangeLabel}</CardDescription>
          </CardHeader>
        ) : null}
        <CardContent className="min-w-0 px-0 pt-0 pb-4">
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
