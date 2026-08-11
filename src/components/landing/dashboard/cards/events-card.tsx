import { useState } from "react";
import { MouseLeftClick01Icon } from "@hugeicons/core-free-icons";

import { BreakdownCardPreviewMenu } from "../breakdown-card-preview-menu";
import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { EventsSummaryTable } from "../dashboard-list-card";
import { tabsChromeButtonClass } from "../dashboard-tabs-chrome";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function EventsCard({
  rows,
  className,
}: {
  rows: DashboardPreviewRangeData["events"];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const hasEvents = rows.total >= 1;

  return (
    <DashboardTabbedBreakdownCard
      title="Events"
      className={className}
      isEmpty={!hasEvents}
      empty={{ icon: MouseLeftClick01Icon, title: "No custom events in range" }}
      tabs={{
        label: "Events metric",
        tabs: ["Count", "Share"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
        trailing: hasEvents ? (
          <span className={tabsChromeButtonClass()} aria-hidden>
            Activity log
          </span>
        ) : undefined,
      }}
      showPreviewActions={!hasEvents}
      headerActions={
        hasEvents ? (
          <BreakdownCardPreviewMenu ariaLabel="Events breakdown actions" />
        ) : undefined
      }
      expandAction={
        hasEvents
          ? {
              ariaLabel: "Open activity log",
              decorative: true,
            }
          : undefined
      }
    >
      <EventsSummaryTable
        rows={rows.rows}
        total={rows.total}
        valueMode={activeTab === 0 ? "count" : "share"}
      />
    </DashboardTabbedBreakdownCard>
  );
}
