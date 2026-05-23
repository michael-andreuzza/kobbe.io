import type { DashboardPreviewRangeData } from "./dashboard-preview-data";
import { FunnelsCard } from "./cards/funnels-card";

type Props = {
  funnel: DashboardPreviewRangeData["funnels"];
};

export function FunnelsDashboardPreview({ funnel }: Props) {
  return (
    <div className="bg-muted overflow-hidden p-4 pb-0 lg:p-8 lg:pb-0 rounded-2xl">
      <div className="relative mx-auto -mb-10 max-w-4xl min-w-0">
        <FunnelsCard funnel={funnel} />
      </div>
    </div>
  );
}

export default FunnelsDashboardPreview;
