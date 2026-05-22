import type { DashboardPreviewRangeData } from "./dashboard-preview-data";
import { FunnelsCard } from "./cards/funnels-card";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

export function FunnelsDashboardPreview({ funnel }: Props) {
  return (
    <div className="bg-muted overflow-hidden p-4 pb-0 lg:p-8 lg:pb-0">
      <div className="relative -mb-10 min-w-0">
        <FunnelsCard funnel={funnel} />
      </div>
    </div>
  );
}

export default FunnelsDashboardPreview;
