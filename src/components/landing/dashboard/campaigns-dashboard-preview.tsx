import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CampaignsCard,
  type CampaignsPreviewData,
} from "./cards/campaigns-card";
import {
  dashboardCardContentTableClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";

type Props = {
  campaigns: CampaignsPreviewData;
};

const conversionEvents = [
  { campaign: "agency-bundle", eventName: "cta_click", count: 5 },
  { campaign: "agency-bundle", eventName: "download", count: 4 },
  { campaign: "privacy-analytics", eventName: "cta_click", count: 4 },
  { campaign: "agency-bundle", eventName: "Newsletter signup", count: 3 },
  { campaign: "launch-day", eventName: "cta_click", count: 3 },
  { campaign: "launch-week", eventName: "signup", count: 3 },
  { campaign: "privacy-analytics", eventName: "download", count: 3 },
  { campaign: "founder-post", eventName: "cta_click", count: 2 },
  { campaign: "founder-post", eventName: "download", count: 2 },
  { campaign: "founder-post", eventName: "signup", count: 2 },
];

export function CampaignsDashboardPreview({ campaigns }: Props) {
  return (
    <div className="bg-muted p-8 lg:p-42">
      <div className="relative min-w-0">
        <CampaignsCard campaigns={campaigns} />

        <Card className={`${dashboardCardRootClass} mt-4`}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Conversion events
            </CardTitle>
            <CardDescription>
              Custom events grouped by campaign for the selected range.
            </CardDescription>
          </CardHeader>
          <CardContent className={dashboardCardContentTableClass}>
            <div className="text-muted-foreground grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_4rem] gap-2 px-2 pb-2 text-[11px] font-medium sm:px-2.5">
              <span>Campaign</span>
              <span>Event</span>
              <span className="text-right">Count</span>
            </div>
            <ul className="flex flex-col">
              {conversionEvents.map((row) => (
                <li
                  key={`${row.campaign}:${row.eventName}`}
                  className="list-none"
                >
                  <div className="border-border/50 grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_4rem] items-center gap-2 border-t px-2 py-2 text-xs sm:px-2.5">
                    <span className="text-foreground min-w-0 truncate font-medium">
                      {row.campaign}
                    </span>
                    <span className="text-muted-foreground min-w-0 truncate">
                      {row.eventName}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.count.toLocaleString()}
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

export default CampaignsDashboardPreview;
