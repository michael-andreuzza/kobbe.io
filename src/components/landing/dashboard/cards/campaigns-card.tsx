import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";
import { DashboardTabbedCardHeaderContent } from "../dashboard-breakdown-card";
import {
  dashboardCardContentTableClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardTabbedCardHeaderClass,
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
    orders: number;
    revenue: string;
  };
  rows: (DashboardPreviewRangeData["campaigns"]["rows"][number] & {
    views?: number;
    orders?: number;
    revenue?: string;
  })[];
};

type CampaignTableRow = {
  label: string;
  detail?: string;
  visitors: number;
  views: number;
  conversions: number;
  orders: number;
  revenue: string;
};

export function CampaignsCard({ campaigns }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const summary = campaigns.summary ?? {
    campaigns: campaigns.rows.length,
    visitors: campaigns.rows.reduce((sum, row) => sum + row.visitors, 0),
    views: campaigns.rows.reduce(
      (sum, row) => sum + (row.views ?? row.visitors * 2),
      0,
    ),
    conversions: campaigns.rows.reduce((sum, row) => sum + row.conversions, 0),
    orders: campaigns.rows.reduce((sum, row) => sum + (row.orders ?? 0), 0),
    revenue: "0",
  };
  const tableRows: CampaignTableRow[] =
    activeTab === 1
      ? groupCampaignRows(campaigns.rows, "source")
      : activeTab === 2
        ? groupCampaignRows(campaigns.rows, "medium")
        : activeTab === 3
          ? groupSourceMediumRows(campaigns.rows)
          : campaigns.rows.map((row) => ({
              label: row.name,
              detail: `${row.source} / ${row.medium}`,
              visitors: row.visitors,
              views: row.views ?? row.visitors * 2,
              conversions: row.conversions,
              orders: row.orders ?? 0,
              revenue: row.revenue ?? "0",
            }));
  const label =
    activeTab === 1
      ? "Source"
      : activeTab === 2
        ? "Medium"
        : activeTab === 3
          ? "Source / medium"
          : "Campaign";
  const showActions = activeTab === 0;

  return (
    <div className="grid min-w-0 gap-4">
      <DashboardMetricStrip ariaLabel="Campaign metrics" lgCols={6}>
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
        <CampaignMetric
          label="Orders"
          value={summary.orders.toLocaleString()}
          hint="attributed revenue"
        />
        <CampaignMetric
          label="Revenue"
          value={summary.revenue}
          hint="campaign journeys"
        />
      </DashboardMetricStrip>

      <Card className={dashboardCardRootClass}>
        <CardHeader
          className={`${dashboardCardHeaderClass} ${dashboardTabbedCardHeaderClass}`}
        >
          <DashboardTabbedCardHeaderContent
            title="Campaign performance"
            tabs={{
              label: "Campaign breakdown",
              tabs: ["Campaigns", "Sources", "Mediums", "Source / medium"],
              activeIndex: activeTab,
              onActiveIndexChange: setActiveTab,
            }}
          />
        </CardHeader>
        <CardContent className={dashboardCardContentTableClass}>
          <div
            className={tableGridClass(
              showActions,
              "text-muted-foreground px-2 pb-2 text-[11px] font-medium sm:px-2.5",
            )}
          >
            <span>{label}</span>
            <span className="text-right">Visitors</span>
            <span className="text-right">Views</span>
            <span className="text-right">Conversions</span>
            <span className="text-right">Orders</span>
            <span className="text-right">Revenue</span>
            {showActions ? <span className="text-right">Actions</span> : null}
          </div>
          <ul className="flex flex-col">
            {tableRows.map((row) => {
              return (
                <li key={row.label} className="list-none">
                  <div
                    className={tableGridClass(
                      showActions,
                      "border-border/50 min-w-0 items-center border-t px-2 py-2 text-xs sm:px-2.5",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="text-foreground block truncate font-medium">
                        {row.label}
                      </span>
                      {row.detail ? (
                        <span className="text-muted-foreground mt-0.5 block truncate text-[11px]">
                          {row.detail}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.visitors.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.views.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.conversions.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.orders.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-right tabular-nums">
                      {row.revenue}
                    </span>
                    {showActions ? (
                      <span className="text-destructive text-right text-[11px] font-medium">
                        Delete
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

type CampaignPreviewRow = Props["campaigns"]["rows"][number];

function groupCampaignRows(
  rows: CampaignPreviewRow[],
  key: "source" | "medium",
): CampaignTableRow[] {
  const grouped = new Map<string, CampaignTableRow>();

  for (const row of rows) {
    const label = row[key];
    const existing = grouped.get(label) ?? {
      label,
      visitors: 0,
      views: 0,
      conversions: 0,
      orders: 0,
      revenue: "0",
    };
    existing.visitors += row.visitors;
    existing.views += row.views ?? row.visitors * 2;
    existing.conversions += row.conversions;
    existing.orders += row.orders ?? 0;
    grouped.set(label, existing);
  }

  return Array.from(grouped.values()).sort((a, b) => b.visitors - a.visitors);
}

function groupSourceMediumRows(rows: CampaignPreviewRow[]): CampaignTableRow[] {
  const grouped = new Map<string, CampaignTableRow>();

  for (const row of rows) {
    const label = `${row.source} / ${row.medium}`;
    const existing = grouped.get(label) ?? {
      label,
      visitors: 0,
      views: 0,
      conversions: 0,
      orders: 0,
      revenue: "0",
    };
    existing.visitors += row.visitors;
    existing.views += row.views ?? row.visitors * 2;
    existing.conversions += row.conversions;
    existing.orders += row.orders ?? 0;
    grouped.set(label, existing);
  }

  return Array.from(grouped.values()).sort((a, b) => b.visitors - a.visitors);
}

function tableGridClass(showActions: boolean, className: string) {
  return [
    "grid gap-2",
    showActions
      ? "grid-cols-[minmax(0,1.4fr)_4rem_4rem_5rem_4rem_4rem_4rem]"
      : "grid-cols-[minmax(0,1.4fr)_4rem_4rem_5rem_4rem_4rem]",
    className,
  ].join(" ");
}

function CampaignMetric(props: {
  label: string;
  value: string;
  hint: string;
  active?: boolean;
}) {
  return (
    <DashboardMetricTile
      active={props.active}
      activeColor="var(--foreground)"
      surface="muted"
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <span
          className={cn(
            "truncate text-xs leading-tight font-medium",
            props.active ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {props.label}
        </span>
        <div className="mt-auto min-w-0">
          <span
            className={cn(
              "text-lg leading-tight font-semibold tracking-tight tabular-nums sm:text-xl",
              props.active ? "text-background" : "text-foreground",
            )}
          >
            {props.value}
          </span>
        </div>
        <span
          className={cn(
            "truncate text-xs leading-tight",
            props.active ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {props.hint}
        </span>
      </div>
    </DashboardMetricTile>
  );
}

export default CampaignsCard;
