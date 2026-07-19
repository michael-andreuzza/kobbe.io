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
  dashboardCardDescriptionClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import {
  TrafficLineChart,
  type StackedChartPoint,
  type TrafficChartAnnotation,
  type TrafficChartMetric,
} from "./traffic-line-chart";

type Props = {
  points: StackedChartPoint[];
  metric: TrafficChartMetric;
  rangeLabel: string;
  children?: ReactNode;
  className?: string;
  spotlightIndex?: number;
  previewPinnedIndex?: number | null;
  annotations?: TrafficChartAnnotation[] | null;
  annotationFooter?: ReactNode;
};

export function DashboardTrafficChart(props: Props) {
  return (
    <Card
      variant="bordered"
      className={cn(dashboardCardRootClass, "h-auto", props.className)}
    >
      {props.children ? (
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>
            {props.children} over time
          </CardTitle>
          <CardDescription className={dashboardCardDescriptionClass}>
            {props.rangeLabel}
          </CardDescription>
        </CardHeader>
      ) : null}
      <CardContent className="h-auto min-w-0 !px-0 !pt-0 pb-4 sm:pb-5">
        <div className="min-w-0 px-3 sm:px-4">
          <TrafficLineChart
            points={props.points}
            bucket="day"
            variant="hero"
            metric={props.metric}
            spotlightIndex={props.spotlightIndex}
            previewPinnedIndex={props.previewPinnedIndex}
            annotations={props.annotations}
            annotationFooter={props.annotationFooter}
            displayTimeZone="UTC"
            revenueCurrency="USD"
          />
        </div>
      </CardContent>
    </Card>
  );
}
