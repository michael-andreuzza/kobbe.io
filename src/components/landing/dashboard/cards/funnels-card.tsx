import { useState } from "react";

import { cn } from "@/lib/utils";

import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

type MarketingFunnelStep =
  DashboardPreviewRangeData["funnels"]["steps"][number] & {
    id: string;
    dropoff: number;
    ratio: number;
  };

const funnelBaselineY = 280;

export function FunnelsCard({ funnel }: Props) {
  return <MarketingFunnelChart steps={funnel.steps} />;
}

function MarketingFunnelChart(props: {
  steps: DashboardPreviewRangeData["funnels"]["steps"];
}) {
  if (props.steps.length === 0) {
    return null;
  }

  const maxVisitors = Math.max(1, ...props.steps.map((step) => step.visitors));
  const steps = props.steps.map((step, index) => {
    const previous = props.steps[index - 1];
    const dropoff =
      previous && previous.visitors > 0
        ? 1 - step.visitors / previous.visitors
        : 0;
    const ratio = Math.max(0, Math.min(1, step.visitors / maxVisitors));

    return {
      ...step,
      id: `${index}-${step.label}`,
      dropoff,
      ratio,
    };
  });

  return (
    <div className="w-full min-w-0 px-3 pb-4 sm:px-4 sm:pb-5">
      <div className="space-y-2 sm:hidden">
        {steps.map((step, index) => {
          return (
            <div
              key={step.id}
              className="group relative overflow-hidden px-1 py-3"
              aria-label={`${step.label}: ${step.visitors.toLocaleString()} visitors, ${formatPercent(step.conversionRate)} conversion`}
            >
              <div
                className="bg-foreground/10 absolute inset-y-3 left-3 w-px rounded-full"
                aria-hidden
              >
                <div
                  className="bg-primary absolute bottom-0 left-0 w-px rounded-full transition-[height] duration-300"
                  style={{ height: `${Math.max(12, step.ratio * 100)}%` }}
                />
              </div>
              <div className="min-w-0 pl-4">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-muted-foreground text-[11px] font-medium">
                      Step {index + 1}
                    </div>
                    <div
                      className="text-foreground mt-1 line-clamp-2 text-sm font-medium"
                      title={step.label}
                    >
                      {step.label}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-foreground text-sm font-semibold tabular-nums">
                      {step.visitors.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      visitors
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 pt-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Conversion</div>
                    <div className="text-foreground mt-0.5 font-medium tabular-nums">
                      {formatPercent(step.conversionRate)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Drop-off</div>
                    <div className="text-foreground mt-0.5 font-medium tabular-nums">
                      {index === 0
                        ? "-"
                        : formatPercent(Math.max(0, step.dropoff))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MarketingFunnelDesktopFlow steps={steps} />
    </div>
  );
}

function MarketingFunnelDesktopFlow(props: { steps: MarketingFunnelStep[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linePath = funnelLinePath(props.steps);

  return (
    <div className="hidden min-w-0 sm:block">
      <div
        className="border-border/50 relative min-h-80 overflow-hidden border-x bg-transparent"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={linePath}
            className={cn(
              "fill-none transition-colors duration-200",
              hoveredIndex != null ? "stroke-brand" : "stroke-primary",
            )}
            strokeWidth={2}
          />
        </svg>
        <div
          className="relative z-10 grid min-h-80 min-w-0"
          style={{
            gridTemplateColumns: `repeat(${props.steps.length}, minmax(0, 1fr))`,
          }}
        >
          {props.steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "border-border/35 relative flex min-h-80 min-w-0 flex-col border-l px-3 py-5 transition-colors duration-200 first:border-l-0 lg:px-5",
                hoveredIndex === index && "bg-muted/25",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              aria-label={`${step.label}: ${step.visitors.toLocaleString()} visitors, ${formatPercent(step.conversionRate)} conversion`}
            >
              <div className="min-w-0 text-left">
                <div className="text-muted-foreground text-[11px] font-medium tracking-wide">
                  Step {index + 1}
                </div>
                <div
                  className="text-foreground mt-1 truncate text-xs font-semibold"
                  title={step.label}
                >
                  {step.label}
                </div>
                <div className="text-muted-foreground mt-4 truncate text-xs font-medium tabular-nums">
                  {step.visitors.toLocaleString()} visitors
                </div>
                <div className="text-muted-foreground/80 mt-1 text-[11px] tabular-nums">
                  {index === 0
                    ? "- drop-off"
                    : `${formatPercent(Math.max(0, step.dropoff))} drop-off`}
                </div>
              </div>
              <div className="absolute inset-x-3 bottom-4 text-left lg:inset-x-5">
                <div
                  className={cn(
                    "text-lg font-semibold tabular-nums transition-colors duration-200",
                    hoveredIndex === index ? "text-brand" : "text-primary",
                  )}
                >
                  {formatPercent(step.conversionRate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function funnelStageHeight(ratio: number) {
  return 36 + ratio * 110;
}

function funnelLinePath(steps: MarketingFunnelStep[]): string {
  if (steps.length === 0) {
    return "";
  }

  const segmentWidth = 1000 / steps.length;
  const heights = steps.map((step) => funnelStageHeight(step.ratio));
  const parts: string[] = [];

  for (let index = 0; index < steps.length; index += 1) {
    const leftX = index * segmentWidth;
    const rightX = (index + 1) * segmentWidth;
    const leftHeight =
      index === 0 ? heights[0] : (heights[index - 1] + heights[index]) / 2;
    const rightHeight =
      index === steps.length - 1
        ? heights[index]
        : (heights[index] + heights[index + 1]) / 2;
    const midX = (leftX + rightX) / 2;
    const topLeftY = funnelBaselineY - leftHeight;
    const topRightY = funnelBaselineY - rightHeight;

    if (index === 0) {
      parts.push(`M ${leftX} ${topLeftY}`);
    }
    parts.push(
      `C ${midX} ${topLeftY}, ${midX} ${topRightY}, ${rightX} ${topRightY}`,
    );
  }

  return parts.join(" ");
}

export default FunnelsCard;
