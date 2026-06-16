import { useRef } from "react";

import { useIdlePulse } from "@/components/landing/use-idle-pulse";
import { cn } from "@/lib/utils";
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
    <div ref={rootRef} className="grid min-w-0 gap-4">
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
    </div>
  );
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
      activeColor="var(--chart-1)"
      surface="muted"
      className="shadow"
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <span
          className={cn(
            "truncate text-xs leading-tight font-medium",
            "text-muted-foreground",
          )}
        >
          {props.label}
        </span>
        <div className="mt-auto min-w-0">
          <span
            className={cn(
              "text-lg leading-tight font-semibold tracking-tight tabular-nums sm:text-xl",
              "text-foreground",
            )}
          >
            {props.value}
          </span>
        </div>
        <span
          className={cn(
            "truncate text-xs leading-tight",
            "text-muted-foreground",
          )}
        >
          {props.hint}
        </span>
      </div>
    </DashboardMetricTile>
  );
}

export default CampaignsCard;
