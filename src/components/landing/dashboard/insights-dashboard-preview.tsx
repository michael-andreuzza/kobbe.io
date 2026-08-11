import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { ChartShareButton } from "./chart-share-button";
import { ConversionHeatmapGrid } from "./conversion-heatmap-grid";
import {
  dashboardCardContentListClass,
  dashboardCardHeaderClass,
  dashboardCardRootClass,
  dashboardCardRowInsetXClass,
  dashboardCardStackClass,
  dashboardCardTitleClass,
} from "./dashboard-card-layout";
import { DashboardCustomKpiStrip } from "./dashboard-kpi-strip";
import { dashboardPreviewData } from "./dashboard-preview-data";
import {
  CountryNameCell,
  InsightsDimensionTable,
  InsightsPageNameCell,
  ReferrerNameCell,
} from "./insights-dimension-table";

const data = dashboardPreviewData["30d"];

export function InsightsDashboardPreview() {
  const pageviewTotal = data.pages.top.reduce((sum, row) => sum + row.count, 0);
  const eventsPageviewTotal = Math.max(pageviewTotal, data.events.total);

  const sourceRows = data.sources.referrers.map((row) => ({
    key: row.referrer,
    name: row.referrer,
    count: row.count,
    revenueMinor: row.revenueMinor,
  }));
  const countryRows = data.locations.countries.map((row) => ({
    key: row.key,
    name: row.label,
    count: row.count,
    countryCode: row.countryCode,
    revenueMinor:
      "revenueMinor" in row
        ? (row.revenueMinor as number | undefined)
        : undefined,
  }));
  const deviceRows = data.devices.deviceTypes.map((row) => ({
    key: row.name,
    name: row.name,
    count: row.count,
    revenueMinor:
      "revenueMinor" in row
        ? (row.revenueMinor as number | undefined)
        : undefined,
  }));
  const browserRows = data.devices.browsers.map((row) => ({
    key: row.name,
    name: row.name,
    count: row.count,
    revenueMinor:
      "revenueMinor" in row
        ? (row.revenueMinor as number | undefined)
        : undefined,
  }));
  const pageRows = data.pages.top.map((row) => ({
    key: row.path,
    name: row.path,
    count: row.count,
    revenueMinor: row.revenueMinor,
  }));
  const eventRows = data.events.rows.map((row) => ({
    key: row.name,
    name: row.name,
    count: row.count,
  }));

  return (
    <div className={cn(dashboardCardStackClass, "w-full")}>
      <DashboardCustomKpiStrip
        presentation="mutedBand"
        ariaLabel="Insight metrics"
        lgCols={6}
        items={data.insights.metrics}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InsightsDimensionTable
          title="Top sources"
          rows={sourceRows}
          pageviewTotal={pageviewTotal}
          nameHeader="Source"
          showRevenue
          menuAriaLabel="Top sources actions"
          renderNameCell={(row) => <ReferrerNameCell referrer={row.name} />}
        />
        <InsightsDimensionTable
          title="Top countries"
          rows={countryRows}
          pageviewTotal={pageviewTotal}
          nameHeader="Country"
          showRevenue
          menuAriaLabel="Top countries actions"
          renderNameCell={(row) => (
            <CountryNameCell
              label={row.name}
              countryCode={row.countryCode ?? null}
            />
          )}
        />
        <InsightsDimensionTable
          title="Devices"
          rows={deviceRows}
          pageviewTotal={pageviewTotal}
          showRevenue
          menuAriaLabel="Devices actions"
        />
        <InsightsDimensionTable
          title="Browsers"
          rows={browserRows}
          pageviewTotal={pageviewTotal}
          showRevenue
          menuAriaLabel="Browsers actions"
        />
        <InsightsDimensionTable
          title="Top pages"
          rows={pageRows}
          pageviewTotal={pageviewTotal}
          nameHeader="Page"
          showRevenue
          menuAriaLabel="Top pages actions"
          renderNameCell={(row) => <InsightsPageNameCell path={row.name} />}
        />
        <InsightsDimensionTable
          title="Top converting events"
          rows={eventRows}
          pageviewTotal={eventsPageviewTotal}
          nameHeader="Event"
          menuAriaLabel="Top converting events actions"
        />
      </div>

      <Card variant="bordered" className={cn(dashboardCardRootClass, "min-w-0")}>
        <CardHeader className={dashboardCardHeaderClass}>
          <CardTitle className={dashboardCardTitleClass}>Conversion peak</CardTitle>
          <CardAction className="flex items-center gap-0.5 self-start pt-0.5">
            <ChartShareButton ariaLabel="Conversion peak chart image" />
          </CardAction>
        </CardHeader>
        <CardContent className={dashboardCardContentListClass}>
          <div className={dashboardCardRowInsetXClass}>
            <ConversionHeatmapGrid cells={data.insights.heatmap} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InsightsDashboardPreview;
