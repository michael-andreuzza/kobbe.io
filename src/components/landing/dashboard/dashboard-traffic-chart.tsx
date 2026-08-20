import { type ReactNode, useMemo } from "react";

import {
  finalizeTrafficChartSeries,
  resolveDisplayPinnedIndex,
} from "@/lib/traffic-chart-binning";

import {
  Card,
  CardAction,
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
import { ChartShareButton } from "./chart-share-button";

type Props = {
  points: StackedChartPoint[];
  metric: TrafficChartMetric;
  rangeLabel: string;
  children?: ReactNode;
  className?: string;
  spotlightIndex?: number;
  previewPinnedIndex?: number | null;
  /** UTC calendar day (YYYY-MM-DD) for pinned note when index is daily grain. */
  previewPinnedDay?: string | null;
  annotations?: TrafficChartAnnotation[] | null;
  annotationFooter?: ReactNode;
  showShare?: boolean;
};

export function DashboardTrafficChart(props: Props) {
  const showShare = props.showShare ?? true;
  const displayTimeZone = "UTC";
  const { points: chartPoints, bucket } = useMemo(
    () =>
      finalizeTrafficChartSeries(props.points, "day", displayTimeZone),
    [props.points],
  );
  const previewPinnedIndex = useMemo(
    () =>
      resolveDisplayPinnedIndex(
        props.points,
        chartPoints,
        bucket,
        props.previewPinnedIndex,
        props.previewPinnedDay ?? null,
      ),
    [
      props.points,
      chartPoints,
      bucket,
      props.previewPinnedIndex,
      props.previewPinnedDay,
    ],
  );

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
          {showShare ? (
            <CardAction>
              <ChartShareButton />
            </CardAction>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className="h-auto min-w-0 !px-0 !pt-0 pb-4 sm:pb-5">
        <div className="min-w-0 px-3 sm:px-4">
          <TrafficLineChart
            points={chartPoints}
            bucket={bucket}
            variant="hero"
            metric={props.metric}
            spotlightIndex={props.spotlightIndex}
            previewPinnedIndex={previewPinnedIndex}
            annotations={props.annotations}
            annotationFooter={props.annotationFooter}
            displayTimeZone={displayTimeZone}
            revenueCurrency="USD"
          />
        </div>
      </CardContent>
    </Card>
  );
}
