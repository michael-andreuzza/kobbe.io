import { useState } from "react";
import { MouseLeftClick01Icon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { EventsSummaryTable } from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function EventsCard({
  rows,
  className,
}: {
  rows: DashboardPreviewRangeData["events"];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardTabbedBreakdownCard
      title="Events"
      className={className}
      isEmpty={rows.total < 1}
      empty={{ icon: MouseLeftClick01Icon, title: "No custom events in range" }}
      tabs={{
        label: "Events metric",
        tabs: ["Count", "Share"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
      }}
    >
      <EventsSummaryTable
        rows={rows.rows}
        total={rows.total}
        valueMode={activeTab === 0 ? "count" : "share"}
      />
    </DashboardTabbedBreakdownCard>
  );
}
