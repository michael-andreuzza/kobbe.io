import { useState } from "react";
import { Globe02Icon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { LocationBreakdownList } from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function LocationsCard({
  locations,
}: {
  locations: DashboardPreviewRangeData["locations"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const rows =
    activeTab === 0
      ? locations.countries
      : activeTab === 1
        ? locations.regions
        : locations.cities;

  return (
    <DashboardTabbedBreakdownCard
      title="Locations"
      isEmpty={rows.length === 0}
      empty={{ icon: Globe02Icon, title: "No locations in range" }}
      tabs={{
        label: "Locations",
        tabs: ["Countries", "Regions", "Cities"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
      }}
    >
      <LocationBreakdownList rows={rows} />
    </DashboardTabbedBreakdownCard>
  );
}
