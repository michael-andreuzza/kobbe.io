import {
  CampaignsCard,
  type CampaignsPreviewData,
} from "./cards/campaigns-card";

type Props = {
  campaigns: CampaignsPreviewData;
};

export function CampaignsDashboardPreview({ campaigns }: Props) {
  return (
    <div className="relative mx-auto max-w-4xl min-w-0">
      <CampaignsCard campaigns={campaigns} />
    </div>
  );
}

export default CampaignsDashboardPreview;
