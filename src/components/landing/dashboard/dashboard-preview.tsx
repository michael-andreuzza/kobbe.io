import { useState } from "react";

import { DevicesCard } from "./cards/devices-card";
import { EventsCard } from "./cards/events-card";
import { LocationsCard } from "./cards/locations-card";
import { PagesCard } from "./cards/pages-card";
import { SearchKeywordsCard } from "./cards/search-keywords-card";
import { SourcesCard } from "./cards/sources-card";
import { DashboardKpiStrip } from "./dashboard-kpi-strip";
import {
  dashboardPreviewData,
  dashboardPreviewSites,
  type DashboardRangeKey,
} from "./dashboard-preview-data";
import { DashboardTopBar } from "./dashboard-top-bar";
import { DashboardTrafficChart } from "./dashboard-traffic-chart";
import type { TrafficChartMetric } from "./traffic-line-chart";

const trafficChartMetricLabels = {
  views: "Views",
  visitors: "Visitors",
  visits: "Visits",
  bounceRate: "Bounce rate",
  sessionTime: "Session time",
  revenue: "Revenue",
} satisfies Record<TrafficChartMetric, string>;

export function DashboardPreview() {
  const [range, setRange] = useState<DashboardRangeKey>("7d");
  const [siteId, setSiteId] = useState(dashboardPreviewSites[0]!.id);
  const [chartMetric, setChartMetric] =
    useState<TrafficChartMetric>("visitors");
  const data = dashboardPreviewData[range];

  return (
    <div className="bg-muted relative w-full rounded-lg p-8">
      <div className="relative min-w-0">
        <DashboardTopBar
          range={range}
          onRangeChange={setRange}
          siteId={siteId}
          onSiteChange={setSiteId}
        />
        <DashboardKpiStrip
          showComparison={data.kpi.showComparison}
          visitors={data.kpi.visitors}
          visits={data.kpi.visits}
          views={data.kpi.views}
          bounceRate={data.kpi.bounceRate}
          sessionTime={data.kpi.sessionTime}
          revenue={data.kpi.revenue}
          activeMetric={chartMetric}
          onMetricClick={setChartMetric}
        />
        <DashboardTrafficChart
          points={data.points}
          metric={chartMetric}
          rangeLabel={data.label}
        >
          {trafficChartMetricLabels[chartMetric]}
        </DashboardTrafficChart>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <PagesCard pages={data.pages} />
          <SourcesCard sources={data.sources} />
        </div>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <LocationsCard locations={data.locations} />
          <DevicesCard devices={data.devices} />
          <SearchKeywordsCard rows={data.searchKeywords} />
          <EventsCard rows={data.events} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
