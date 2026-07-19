import { useRef } from "react";

import { useIdlePulse } from "@/components/landing/use-idle-pulse";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardStackClass,
  dashboardCardTitleClass,
} from "../dashboard-card-layout";
import {
  DashboardCardTable,
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "../dashboard-table";
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
          <DashboardCardTable>
            <DashboardTable>
              <DashboardTableHeader>
                <DashboardTableRow>
                  <DashboardTableHead>Campaign</DashboardTableHead>
                  <DashboardTableHead className="text-right">
                    Visitors
                  </DashboardTableHead>
                  <DashboardTableHead className="text-right">Views</DashboardTableHead>
                  <DashboardTableHead className="text-right">Conv.</DashboardTableHead>
                </DashboardTableRow>
              </DashboardTableHeader>
              <DashboardTableBody>
                {campaigns.rows.map((row) => (
                  <DashboardTableRow key={row.name}>
                    <DashboardTableCell className="max-w-[min(100%,16rem)]">
                      <span className="text-foreground block truncate font-medium">
                        {row.name}
                      </span>
                      <span className="text-muted-foreground block truncate text-[11px]">
                        {row.source} / {row.medium}
                      </span>
                    </DashboardTableCell>
                    <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
                      {row.visitors.toLocaleString()}
                    </DashboardTableCell>
                    <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
                      {(row.views ?? row.visitors * 2).toLocaleString()}
                    </DashboardTableCell>
                    <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
                      {(row.conversions ?? 0).toLocaleString()}
                    </DashboardTableCell>
                  </DashboardTableRow>
                ))}
              </DashboardTableBody>
            </DashboardTable>
          </DashboardCardTable>
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
