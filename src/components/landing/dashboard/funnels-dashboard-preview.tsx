import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";
import { FunnelsCard } from "./cards/funnels-card";
import {
  dashboardCardContentTableClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function FunnelsDashboardPreview({ funnel }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || funnel.steps.length <= 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveStep((currentStep) => (currentStep + 1) % funnel.steps.length);
    }, 950);

    return () => window.clearTimeout(timeout);
  }, [activeStep, funnel.steps.length, shouldReduceMotion]);

  return (
    <div className="bg-muted p-8 lg:p-42">
      <div className="relative min-w-0">
        <FunnelsCard
          funnel={funnel}
          activeStep={shouldReduceMotion ? undefined : activeStep}
        />

        <Card className={`${dashboardCardRootClass} mt-4`}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Step breakdown
            </CardTitle>
            <CardDescription>Last 14 days</CardDescription>
          </CardHeader>
          <CardContent className={dashboardCardContentTableClass}>
            <div className="text-muted-foreground grid grid-cols-[minmax(0,1fr)_5rem_5rem_5rem] gap-2 px-2 pb-2 text-[11px] font-medium sm:px-2.5">
              <span>Step</span>
              <span className="text-right">Visitors</span>
              <span className="text-right">Conv.</span>
              <span className="text-right">Drop-off</span>
            </div>
            <ul className="flex flex-col">
              {funnel.steps.map((step, index) => (
                <li key={step.label} className="list-none">
                  <div
                    className={cn(
                      "border-border/50 grid min-w-0 grid-cols-[minmax(0,1fr)_5rem_5rem_5rem] items-center gap-2 border-t px-2 py-2 text-xs transition-colors duration-500 sm:px-2.5",
                      !shouldReduceMotion &&
                        index === activeStep &&
                        "bg-muted/50",
                    )}
                  >
                    <span className="text-foreground min-w-0 truncate font-medium">
                      {index + 1}. {step.label}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {step.visitors.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {formatPercent(step.conversionRate)}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {step.dropoffRate == null
                        ? "—"
                        : formatPercent(step.dropoffRate)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FunnelsDashboardPreview;
