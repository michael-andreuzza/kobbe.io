import { useRef } from "react";

import { useIdlePulse } from "@/components/landing/use-idle-pulse";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  dashboardCardContentTableClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardStackClass,
  dashboardCardTitleClass,
} from "../dashboard-card-layout";
import {
  DashboardMetricStrip,
  DashboardMetricTile,
} from "../dashboard-metric-strip";

type Props = {
  campaigns: CampaignsPreviewData;
};

export type CampaignsPreviewData = {
  summary?: {
    campaigns: number;
    visitors: number;
    views: number;
    conversions: number;
  };
  rows: {
    name: string;
    source: string;
    medium: string;
    visitors: number;
    views?: number;
    conversions?: number;
  }[];
};

export function CampaignsCard({ campaigns }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useIdlePulse(rootRef, {
    selector: "[data-dashboard-metric-tile]",
    interval: 6000,
    initialDelay: 1400,
    scaleTo: 1.012,
    staggerEach: 0.08,
  });
  const summary = campaigns.summary ?? {
    campaigns: campaigns.rows.length,
    visitors: campaigns.rows.reduce((sum, row) => sum + row.visitors, 0),
    views: campaigns.rows.reduce(
      (sum, row) => sum + (row.views ?? row.visitors * 2),
      0,
    ),
    conversions: campaigns.rows.reduce(
      (sum, row) => sum + (row.conversions ?? 0),
      0,
    ),
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      <DashboardMetricStrip ariaLabel="Campaign metrics" lgCols={4}>
        <CampaignMetric
          label="Campaigns"
          value={summary.campaigns.toLocaleString()}
          hint="tracked in range"
        />
        <CampaignMetric
          label="Visitors"
          value={summary.visitors.toLocaleString()}
          hint="campaign visitors"
        />
        <CampaignMetric
          label="Views"
          value={summary.views.toLocaleString()}
          hint="Last 14 days"
        />
        <CampaignMetric
          label="Conversions"
          value={summary.conversions.toLocaleString()}
          hint="custom events"
        />
      </DashboardMetricStrip>
      <div className={cn(dashboardCardStackClass, "mt-2")}>
        <Card variant="bordered" className={dashboardCardRootClass}>
          <CardHeader className={dashboardCardHeaderClass}>
            <CardTitle className={dashboardCardTitleClass}>
              Campaign performance
            </CardTitle>
          </CardHeader>
          <CardContent className={dashboardCardContentTableClass}>
            <div className="text-muted-foreground grid grid-cols-[minmax(0,1fr)_4rem_4rem_4rem] gap-2 pb-2 text-[11px] font-medium">
              <span>Campaign</span>
              <span className="text-right">Visitors</span>
              <span className="text-right">Views</span>
              <span className="text-right">Conv.</span>
            </div>
            <ul className="flex flex-col">
              {campaigns.rows.map((row) => (
                <li key={row.name} className="list-none">
                  <div
                    className="border-border/40 grid min-w-0 grid-cols-[minmax(0,1fr)_4rem_4rem_4rem] items-center gap-2 border-b py-2 text-xs last:border-b-0"
                    data-kobbe-stagger
                  >
                    <div className="min-w-0">
                      <p className="text-foreground truncate font-medium">
                        {row.name}
                      </p>
                      <p className="text-muted-foreground truncate text-[11px]">
                        {row.source} / {row.medium}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.visitors.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {(row.views ?? row.visitors * 2).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {(row.conversions ?? 0).toLocaleString()}
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

function CampaignMetric(props: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <DashboardMetricTile surface="muted">
      <div className="flex h-full min-w-0 flex-col gap-1">
        <span className="text-muted-foreground truncate text-xs leading-tight font-medium">
          {props.label}
        </span>
        <div className="mt-auto min-w-0">
          <span className="text-foreground text-base leading-tight font-medium tracking-tight tabular-nums">
            {props.value}
          </span>
        </div>
        <span className="text-muted-foreground truncate text-xs leading-tight">
          {props.hint}
        </span>
      </div>
    </DashboardMetricTile>
  );
}

export default CampaignsCard;
