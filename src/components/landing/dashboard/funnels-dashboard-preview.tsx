import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { FunnelsCard } from "./cards/funnels-card";
import {
  dashboardCardDescriptionClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardStackClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import { DashboardCardTable } from "./dashboard-table";
import { FunnelStepTable } from "./funnel-step-table";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
  rangeLabel?: string;
};

export function FunnelsDashboardPreview({
  funnel,
  rangeLabel = "All time",
}: Props) {
  return (
    <div className={cn(dashboardCardStackClass, "w-full")}>
      <Card
        variant="bordered"
        className={cn(dashboardCardRootClass, "h-auto w-full")}
      >
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>{funnel.name}</CardTitle>
          <CardDescription className={dashboardCardDescriptionClass}>
            {funnel.completed.toLocaleString()} completed,{" "}
            {Math.round(funnel.conversionRate * 1000) / 10}% total conversion
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-0 p-0 pt-2">
          <div className="kobbe-funnel-chart w-full">
            <FunnelsCard funnel={funnel} />
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered" className={cn(dashboardCardRootClass, "h-auto w-full")}>
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>Step breakdown</CardTitle>
          <CardDescription className={dashboardCardDescriptionClass}>
            {rangeLabel}
          </CardDescription>
        </CardHeader>
        <DashboardCardTable>
          <FunnelStepTable steps={funnel.steps} />
        </DashboardCardTable>
      </Card>
    </div>
  );
}

export default FunnelsDashboardPreview;
