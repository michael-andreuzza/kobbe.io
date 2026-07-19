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
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

export function FunnelsDashboardPreview({ funnel }: Props) {
  return (
    <Card
      variant="bordered"
      className={cn(dashboardCardRootClass, "h-auto w-full")}
    >
      <CardHeader className={dashboardCardHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>{funnel.name}</CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          {funnel.completed.toLocaleString()} completed,{" "}
          {Math.round(funnel.conversionRate * 100)}% total conversion
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 p-0 pt-2">
        <div className="kobbe-funnel-chart w-full">
          <FunnelsCard funnel={funnel} />
        </div>
      </CardContent>
    </Card>
  );
}

export default FunnelsDashboardPreview;
