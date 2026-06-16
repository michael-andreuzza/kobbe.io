import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { FunnelsCard } from "./cards/funnels-card";
import { dashboardCardRootClass } from "./dashboard-card-layout";
import type { DashboardPreviewRangeData } from "./dashboard-preview-data";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

export function FunnelsDashboardPreview({ funnel }: Props) {
  return (
    <Card
      className={cn(
        dashboardCardRootClass,
        "mx-auto w-full max-w-4xl shadow-none",
      )}
    >
      <CardContent className="w-full p-0">
        <div className="kobbe-funnel-chart w-full">
          <FunnelsCard funnel={funnel} />
        </div>
      </CardContent>
    </Card>
  );
}

export default FunnelsDashboardPreview;
