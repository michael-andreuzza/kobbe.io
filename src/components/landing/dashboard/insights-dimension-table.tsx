import type { ReactNode } from "react";
import { ChartLineData01Icon, Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { ChartShareButton } from "./chart-share-button";
import {
  dashboardCardContentDefaultClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import { formatDashboardPreviewRevenue } from "./dashboard-preview-data";
import { ReferrerFavicon } from "./referrer-favicon";
import {
  DashboardCardTable,
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "./dashboard-table";

type DimensionRow = {
  key: string;
  name: string;
  count: number;
  revenueMinor?: number;
  countryCode?: string | null;
};

function normalizedCountryCode(countryCode: string | null | undefined): string | null {
  if (!countryCode) return null;
  const code = countryCode.trim().toLowerCase();
  if (code.length !== 2 || !/^[a-z]{2}$/.test(code)) return null;
  return code;
}

function prettyReferrer(url: string): string {
  try {
    const parsed = new URL(/^https?:\/\//.test(url) ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatSharePct(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${value}%`;
}

function ReferrerNameCell(props: { referrer: string }) {
  const host = prettyReferrer(props.referrer);
  return (
    <span className="flex min-w-0 items-center gap-2">
      <ReferrerFavicon referrer={props.referrer} title={host} />
      <span className="min-w-0 truncate" title={props.referrer}>
        {host}
      </span>
    </span>
  );
}

function CountryNameCell(props: { label: string; countryCode: string | null }) {
  const code = normalizedCountryCode(props.countryCode);
  return (
    <span className="flex min-w-0 items-center gap-2">
      {code ? (
        <div
          className={`fi fi-${code} overflow inline-block size-auto shrink-0 overflow-hidden rounded-xs bg-cover bg-center`}
          aria-hidden
          title={props.countryCode ?? undefined}
        />
      ) : (
        <HugeiconsIcon
          icon={Globe02Icon}
          className="size-3.5 shrink-0 text-muted-foreground"
          strokeWidth={1.8}
          aria-hidden
        />
      )}
      <span className="min-w-0 truncate" title={props.label}>
        {props.label}
      </span>
    </span>
  );
}

function EmptyRows(props: { title: string }) {
  return (
    <div className="text-muted-foreground flex min-h-32 flex-col items-center justify-center gap-2 px-3 text-center sm:px-4">
      <HugeiconsIcon icon={ChartLineData01Icon} className="size-5" strokeWidth={1.7} />
      <p className="text-foreground text-sm font-medium">{props.title}</p>
    </div>
  );
}

export function InsightsDimensionTable(props: {
  title: string;
  rows: DimensionRow[];
  pageviewTotal: number;
  nameHeader?: string;
  showRevenue?: boolean;
  renderNameCell?: (row: DimensionRow) => ReactNode;
  shareAriaLabel?: string;
}) {
  const visibleRows = props.rows.filter((row) => row.count > 0).slice(0, 8);
  const showRevenue = props.showRevenue ?? false;

  if (visibleRows.length === 0) {
    return (
      <Card variant="bordered" className={cn(dashboardCardRootClass, "min-w-0")}>
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>{props.title}</CardTitle>
        </CardHeader>
        <div className={dashboardCardContentDefaultClass}>
          <EmptyRows title="No data in this period" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="bordered" className={cn(dashboardCardRootClass, "min-w-0")}>
      <CardHeader className={dashboardCardHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>{props.title}</CardTitle>
        {props.shareAriaLabel ? (
          <CardAction className="flex items-center gap-0.5 self-start pt-0.5">
            <ChartShareButton ariaLabel={props.shareAriaLabel} />
          </CardAction>
        ) : null}
      </CardHeader>
      <DashboardCardTable className="min-w-0 [&_[data-slot=table-container]]:overflow-x-visible">
        <DashboardTable className="w-full table-fixed">
          <DashboardTableHeader>
            <DashboardTableRow>
              <DashboardTableHead className={showRevenue ? "w-[44%]" : "w-[52%]"}>
                {props.nameHeader ?? "Name"}
              </DashboardTableHead>
              <DashboardTableHead className="w-[22%] text-right">Views</DashboardTableHead>
              <DashboardTableHead className={cn("text-right", showRevenue ? "w-[16%]" : "w-[26%]")}>
                Share
              </DashboardTableHead>
              {showRevenue ? (
                <DashboardTableHead className="w-[18%] text-right">Revenue</DashboardTableHead>
              ) : null}
            </DashboardTableRow>
          </DashboardTableHeader>
          <DashboardTableBody>
            {visibleRows.map((row) => {
              const share =
                props.pageviewTotal > 0
                  ? Math.round((row.count / props.pageviewTotal) * 1000) / 10
                  : null;
              const revenueMinor = row.revenueMinor ?? 0;
              const revenueDisplay =
                revenueMinor > 0
                  ? formatDashboardPreviewRevenue(revenueMinor)
                  : "—";

              return (
                <DashboardTableRow key={row.key}>
                  <DashboardTableCell className="max-w-0 font-medium">
                    {props.renderNameCell ? (
                      props.renderNameCell(row)
                    ) : (
                      <span className="block truncate" title={row.name}>
                        {row.name}
                      </span>
                    )}
                  </DashboardTableCell>
                  <DashboardTableCell className="text-right tabular-nums text-muted-foreground">
                    {row.count.toLocaleString()}
                  </DashboardTableCell>
                  <DashboardTableCell className="text-right tabular-nums text-muted-foreground">
                    {formatSharePct(share)}
                  </DashboardTableCell>
                  {showRevenue ? (
                    <DashboardTableCell
                      className="text-right tabular-nums text-muted-foreground"
                      title={revenueDisplay}
                    >
                      <span className="block truncate">{revenueDisplay}</span>
                    </DashboardTableCell>
                  ) : null}
                </DashboardTableRow>
              );
            })}
          </DashboardTableBody>
        </DashboardTable>
      </DashboardCardTable>
    </Card>
  );
}

export function InsightsPageNameCell(props: { path: string }) {
  return (
    <span
      className="block min-w-0 truncate font-medium text-foreground"
      title={props.path}
    >
      {props.path}
    </span>
  );
}

export { ReferrerNameCell, CountryNameCell };
