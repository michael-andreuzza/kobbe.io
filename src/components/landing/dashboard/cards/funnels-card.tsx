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
  const geometry = buildFunnelFlowGeometry(props.steps, maxVisitors);
  const filledSegmentCount =
    props.activeStep == null
      ? geometry.segments.length
      : Math.max(1, Math.min(geometry.segments.length, props.activeStep + 1));

  return (
    <div className="relative h-80 w-full min-w-0 overflow-hidden rounded-b-xl sm:h-88">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .kobbe-funnel-flow {
            transition:
              opacity 460ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
            transform-box: fill-box;
            transform-origin: left center;
          }
        }
      `}</style>
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${props.steps.length}, minmax(0, 1fr))`,
        }}
        aria-hidden
      >
        {props.steps.map((step) => (
          <div
            key={step.label}
            className="border-border/40 even:bg-muted/15 border-r last:border-r-0"
          />
        ))}
      </div>
      <svg
        viewBox="0 0 1000 280"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-60 w-full sm:h-64"
        role="img"
        aria-label="Funnel conversion flow"
      >
        <defs>
          {geometry.segments.map((segment) => (
            <linearGradient
              key={`funnel-flow-fill-${segment.index}`}
              id={`marketing-funnel-flow-fill-${segment.index}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="var(--foreground)"
                stopOpacity="0.14"
              />
              <stop
                offset="100%"
                stopColor="var(--foreground)"
                stopOpacity="0.58"
              />
            </linearGradient>
          ))}
        </defs>
        {geometry.segments.map((segment) => (
          <path
            key={`base-${segment.index}`}
            d={segment.path}
            fill={`url(#marketing-funnel-flow-fill-${segment.index})`}
            opacity={0.1}
          />
        ))}
        {geometry.segments.map((segment) => {
          const filled = segment.index < filledSegmentCount;

          return (
            <path
              key={segment.index}
              className="kobbe-funnel-flow"
              d={segment.path}
              fill={`url(#marketing-funnel-flow-fill-${segment.index})`}
              opacity={filled ? 1 : 0}
              style={{
                transform: filled ? "scaleX(1)" : "scaleX(0.04)",
                transitionDelay: filled ? `${segment.index * 70}ms` : "0ms",
              }}
            />
          );
        })}
      </svg>
      {props.steps.slice(1).map((step, index) => {
        const previous = props.steps[index];
        const dropoff =
          previous && previous.visitors > 0
            ? 1 - step.visitors / previous.visitors
            : 0;
        const left = `${((index + 1) / props.steps.length) * 100}%`;
        return (
          <span
            key={`${step.label}-dropoff`}
            className={cn(
              "bg-muted text-muted-foreground absolute top-0 z-10 -translate-x-1/2 rounded-md px-2 py-0.5 text-xs font-medium transition-colors duration-500",
              props.activeStep === index + 1 && "text-foreground",
            )}
            style={{ left }}
          >
            -{formatPercent(Math.max(0, dropoff))}
          </span>
        );
      })}
      <div
        className="border-border/50 absolute inset-x-0 bottom-0 grid border-t"
        style={{
          gridTemplateColumns: `repeat(${props.steps.length}, minmax(0, 1fr))`,
        }}
      >
        {props.steps.map((step, index) => (
          <div
            key={step.label}
            className={cn(
              "border-border/40 min-w-0 border-r px-4 py-3 transition-colors duration-500 last:border-r-0",
              props.activeStep === index && "bg-muted/35",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "bg-foreground size-2 shrink-0 rounded-full transition-transform duration-500",
                  props.activeStep === index && "scale-125",
                )}
                aria-hidden
              />
              <div className="text-foreground truncate text-sm font-semibold">
                {step.visitors.toLocaleString()} visitors
              </div>
            </div>
            <div
              className="text-muted-foreground mt-1 truncate text-xs"
              title={step.label}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketingFunnelTrend(props: {
  steps: DashboardPreviewRangeData["funnels"]["steps"];
}) {
  return (
    <div className="border-border/50 bg-background text-muted-foreground flex h-80 min-w-0 items-center justify-center rounded-b-xl border-t text-sm sm:h-88">
      {props.steps.length.toLocaleString()} steps grouped by when each step was
      reached
    </div>
  );
}

function buildFunnelFlowGeometry(
  steps: DashboardPreviewRangeData["funnels"]["steps"],
  maxVisitors: number,
): { segments: { index: number; path: string }[] } {
  const width = 1000;
  const centerY = 136;
  const maxHalfHeight = 92;
  const minHalfHeight = 20;
  const count = steps.length;
  const points = steps.map((step, index) => {
    const x = count === 1 ? width / 2 : (index / (count - 1)) * width;
    const ratio = Math.max(0, Math.min(1, step.visitors / maxVisitors));
    const halfHeight = Math.max(
      minHalfHeight,
      maxHalfHeight * Math.pow(ratio, 0.72),
    );
    return {
      x,
      top: centerY - halfHeight,
      bottom: centerY + halfHeight,
    };
  });

  if (points.length === 1) {
    const p = points[0]!;
    return {
      segments: [
        {
          index: 0,
          path: `M 0 ${p.top} L ${width} ${p.top} L ${width} ${p.bottom} L 0 ${p.bottom} Z`,
        },
      ],
    };
  }

  return {
    segments: points.slice(0, -1).map((point, index) => ({
      index,
      path: segmentPath(point, points[index + 1]!),
    })),
  };
}

function segmentPath(
  start: { x: number; top: number; bottom: number },
  end: { x: number; top: number; bottom: number },
): string {
  const cp1x = start.x + (end.x - start.x) * 0.45;
  const cp2x = start.x + (end.x - start.x) * 0.55;
  return [
    `M ${start.x} ${start.top}`,
    `C ${cp1x} ${start.top}, ${cp2x} ${end.top}, ${end.x} ${end.top}`,
    `L ${end.x} ${end.bottom}`,
    `C ${cp2x} ${end.bottom}, ${cp1x} ${start.bottom}, ${start.x} ${start.bottom}`,
    "Z",
  ].join(" ");
}

export default FunnelsCard;
