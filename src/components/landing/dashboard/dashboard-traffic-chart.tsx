import { useState, type ReactNode } from "react";

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
  dashboardTabbedCardHeaderClass,
} from "./dashboard-card-layout";
import {
  TrafficLineChart,
  type StackedChartPoint,
  type TrafficChartAnnotation,
  type TrafficChartMetric,
} from "./traffic-line-chart";
import { ChartShareButton } from "./chart-share-button";
import { TabsChrome } from "./dashboard-tabs-chrome";

export type OverviewChartStyle = "bars" | "area";

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
  showShare?: boolean;
  showChartStyleTabs?: boolean;
};

export function DashboardTrafficChart(props: Props) {
  const showShare = props.showShare ?? true;
  const showChartStyleTabs = props.showChartStyleTabs ?? true;
  const [chartStyle, setChartStyle] = useState<OverviewChartStyle>("bars");
  const chartStyleIndex = chartStyle === "bars" ? 0 : 1;

  return (
    <Card
      variant="bordered"
      className={cn(dashboardCardRootClass, "h-auto", props.className)}
    >
      {props.children ? (
        <CardHeader
          className={cn(
            dashboardCardHeaderClass,
            showShare || showChartStyleTabs
              ? dashboardTabbedCardHeaderClass
              : undefined,
          )}
        >
          <CardTitle className={dashboardCardTitleClass}>
            {props.children} over time
          </CardTitle>
          <CardDescription className={dashboardCardDescriptionClass}>
            {props.rangeLabel}
          </CardDescription>
          {showShare || showChartStyleTabs ? (
            <CardAction>
              <div className="flex flex-wrap items-center justify-end gap-3">
                {showChartStyleTabs ? (
                  <TabsChrome
                    label="Chart style"
                    tabs={["Bars", "Area"]}
                    activeIndex={chartStyleIndex}
                    onActiveIndexChange={(index) =>
                      setChartStyle(index === 0 ? "bars" : "area")
                    }
                  />
                ) : null}
                {showShare ? <ChartShareButton /> : null}
              </div>
            </CardAction>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className="h-auto min-w-0 !px-0 !pt-0 pb-4 sm:pb-5">
        <div className="min-w-0 px-3 sm:px-4">
          <TrafficLineChart
            points={props.points}
            bucket="day"
            variant="hero"
            metric={props.metric}
            chartStyle={chartStyle}
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
