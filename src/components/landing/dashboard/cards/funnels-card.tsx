import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";
import {
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "../dashboard-card-layout";
import { TabsChrome } from "../dashboard-tabs-chrome";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
  activeStep?: number;
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function FunnelsCard({ funnel, activeStep }: Props) {
  const [reportTab, setReportTab] = useState(0);

  return (
    <Card className={dashboardCardRootClass}>
      <CardHeader className={dashboardCardHeaderClass}>
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className={dashboardCardTitleClass}>
              {funnel.name}
            </CardTitle>
            <CardDescription>
              {funnel.completed.toLocaleString()} completed,{" "}
              {formatPercent(funnel.conversionRate)} total conversion
            </CardDescription>
          </div>
          <TabsChrome
            tabs={["Steps", "Over time"]}
            activeIndex={reportTab}
            onActiveIndexChange={setReportTab}
            label="Funnel report view"
          />
        </div>
      </CardHeader>
      <CardContent className="min-w-0 p-0 pt-2">
        {reportTab === 0 ? (
          <MarketingFunnelChart steps={funnel.steps} activeStep={activeStep} />
        ) : (
          <MarketingFunnelTrend steps={funnel.steps} />
        )}
      </CardContent>
    </Card>
  );
}

function MarketingFunnelChart(props: {
  steps: DashboardPreviewRangeData["funnels"]["steps"];
  activeStep?: number;
}) {
  if (props.steps.length === 0) {
    return null;
  }

  const maxVisitors = Math.max(1, ...props.steps.map((step) => step.visitors));

  return (
    <div className="w-full min-w-0 px-4 pt-2 pb-4 sm:px-5">
      <div
        className="grid min-w-0 gap-3"
        style={{
          gridTemplateColumns: `repeat(${props.steps.length}, minmax(0, 1fr))`,
        }}
      >
        {props.steps.map((step, index) => {
          const previous = props.steps[index - 1];
          const dropoff =
            previous && previous.visitors > 0
              ? 1 - step.visitors / previous.visitors
              : 0;
          const ratio = Math.max(0, Math.min(1, step.visitors / maxVisitors));
          const stemHeight = 44 + ratio * 132;
          const active = props.activeStep === index;
          return (
            <div
              key={step.label}
              className="group relative flex min-w-0 flex-col items-center"
              aria-label={`${step.label}: ${step.visitors.toLocaleString()} visitors, ${formatPercent(step.conversionRate)} conversion`}
              data-kobbe-stagger
            >
              {index > 0 ? (
                <span
                  className={cn(
                    "bg-background text-muted-foreground ring-border/50 absolute top-2 left-0 z-10 -translate-x-1/2 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 transition-colors duration-500",
                    active && "text-foreground",
                  )}
                  title={`${formatPercent(Math.max(0, dropoff))} drop-off`}
                >
                  -{formatPercent(Math.max(0, dropoff))}
                </span>
              ) : null}
              <div className="flex h-48 w-full items-end justify-center">
                <div className="relative flex h-full items-end justify-center">
                  <div className="bg-foreground/10 absolute inset-y-0 left-1/2 w-px -translate-x-1/2 rounded-full" />
                  <div
                    className={cn(
                      "bg-foreground relative w-0.5 rounded-full transition-[height,background-color,transform] duration-500",
                      active && "bg-brand scale-y-105",
                    )}
                    style={{ height: `${stemHeight}px` }}
                    aria-hidden
                  />
                </div>
              </div>
              <div
                className={cn(
                  "border-border/50 mt-3 w-full min-w-0 border-t pt-3 text-center transition-colors duration-500",
                  active && "border-brand/40",
                )}
              >
                <div className="text-foreground truncate text-sm font-semibold">
                  {step.visitors.toLocaleString()} visitors
                </div>
                <div
                  className="text-muted-foreground mt-1 truncate text-xs"
                  title={step.label}
                >
                  {step.label}
                </div>
                <div className="text-muted-foreground/80 mt-1 text-xs">
                  {formatPercent(step.conversionRate)} conv.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarketingFunnelTrend(props: {
  steps: DashboardPreviewRangeData["funnels"]["steps"];
}) {
  const entrants = props.steps[0]?.visitors ?? 0;
  const completed = props.steps.at(-1)?.visitors ?? 0;
  const points = buildMarketingFunnelTrend(entrants);
  const maxVisitors = Math.max(1, ...points.map((point) => point.visitors));
  const completedRate = entrants > 0 ? completed / entrants : 0;

  return (
    <div className="w-full min-w-0 px-4 pt-2 pb-4 sm:px-5">
      <div className="flex h-48 min-w-0 items-end gap-2">
        {points.map((point, index) => {
          const ratio = Math.max(0, Math.min(1, point.visitors / maxVisitors));
          const stemHeight = 28 + ratio * 132;
          return (
            <div
              key={`${point.label}-${index}`}
              className="group flex min-w-0 flex-1 flex-col items-center justify-end"
              title={`${point.label}: ${point.visitors.toLocaleString()} entrants`}
              data-kobbe-stagger
            >
              <div className="relative flex h-full items-end justify-center">
                <div className="bg-foreground/10 absolute inset-y-0 left-1/2 w-px -translate-x-1/2 rounded-full" />
                <div
                  className="bg-foreground group-hover:bg-brand relative w-0.5 rounded-full transition-[height,background-color] duration-300"
                  style={{ height: `${stemHeight}px` }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-border/50 mt-3 grid grid-cols-3 gap-3 border-t pt-3 text-xs">
        <div className="min-w-0" data-kobbe-stagger>
          <div className="text-muted-foreground">Entrants</div>
          <div className="text-foreground mt-0.5 font-semibold tabular-nums">
            {entrants.toLocaleString()}
          </div>
        </div>
        <div className="min-w-0 text-center" data-kobbe-stagger>
          <div className="text-muted-foreground">Completed</div>
          <div className="text-foreground mt-0.5 font-semibold tabular-nums">
            {completed.toLocaleString()}
          </div>
        </div>
        <div className="min-w-0 text-right" data-kobbe-stagger>
          <div className="text-muted-foreground">Conversion</div>
          <div className="text-foreground mt-0.5 font-semibold tabular-nums">
            {formatPercent(completedRate)}
          </div>
        </div>
      </div>
    </div>
  );
}

function buildMarketingFunnelTrend(entrants: number) {
  const weights = [
    0.42, 0.58, 0.34, 0.66, 0.52, 0.74, 0.4, 0.62, 0.8, 0.56, 0.7, 0.48, 0.76,
    0.6,
  ];
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const perWeight = entrants / Math.max(1, totalWeight);

  return weights.map((weight, index) => ({
    label: `Day ${index + 1}`,
    visitors: Math.max(1, Math.round(perWeight * weight)),
  }));
}

export default FunnelsCard;
