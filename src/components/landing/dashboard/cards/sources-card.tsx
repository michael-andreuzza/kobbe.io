import { useState } from "react";
import { RouteIcon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import {
  DeviceBreakdownList,
  ReferrerBreakdownList,
  TrafficChannelList,
} from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function SourcesCard({
  sources,
}: {
  sources: DashboardPreviewRangeData["sources"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const isEmpty =
    (activeTab === 0 && sources.referrers.length === 0) ||
    (activeTab === 1 && sources.hostnames.length === 0) ||
    (activeTab === 2 && sources.channels.length === 0) ||
    (activeTab === 3 && sources.ai.length === 0);

  return (
    <DashboardTabbedBreakdownCard
      title="Sources"
      isEmpty={isEmpty}
      empty={{ icon: RouteIcon, title: "No sources in range" }}
      tabs={{
        label: "Traffic sources",
        tabs: ["Referrers", "Hostnames", "Channels", "AI"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
      }}
    >
      {activeTab === 3 ? (
        <DeviceBreakdownList rows={sources.ai} />
      ) : activeTab === 2 ? (
        <TrafficChannelList rows={sources.channels} />
      ) : activeTab === 1 ? (
        <DeviceBreakdownList rows={sources.hostnames} />
      ) : (
        <ReferrerBreakdownList rows={sources.referrers} />
      )}
    </DashboardTabbedBreakdownCard>
  );
}
