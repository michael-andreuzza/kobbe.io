import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  return (
    <div className="bg-muted p-8 lg:p-42">
      <div className="relative min-w-0">
        <FunnelsCard funnel={funnel} />

        <Card className={`${dashboardCardRootClass} mt-4`}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Step breakdown
            </CardTitle>
            <CardDescription>Last 14 days</CardDescription>
          </CardHeader>
          <CardContent className={dashboardCardContentTableClass}>
            <div className="grid grid-cols-[minmax(0,1fr)_5rem_5rem_5rem] gap-2 px-2 pb-2 text-[11px] font-medium text-muted-foreground sm:px-2.5">
              <span>Step</span>
              <span className="text-right">Visitors</span>
              <span className="text-right">Conv.</span>
              <span className="text-right">Drop-off</span>
            </div>
            <ul className="flex flex-col">
              {funnel.steps.map((step, index) => (
                <li key={step.label} className="list-none">
                  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_5rem_5rem_5rem] items-center gap-2 border-t border-border/50 px-2 py-2 text-xs sm:px-2.5">
                    <span className="min-w-0 truncate font-medium text-foreground">
                      {index + 1}. {step.label}
                    </span>
                    <span className="text-right text-muted-foreground tabular-nums">
                      {step.visitors.toLocaleString()}
                    </span>
                    <span className="text-right text-muted-foreground tabular-nums">
                      {formatPercent(step.conversionRate)}
                    </span>
                    <span className="text-right text-muted-foreground tabular-nums">
                      {step.dropoffRate == null ? "—" : formatPercent(step.dropoffRate)}
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
