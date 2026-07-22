import { useState } from "react";
import { MouseLeftClick01Icon } from "@hugeicons/core-free-icons";

import { ChartShareButton } from "../chart-share-button";
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
      }}
      showPreviewActions={!hasEvents}
      headerActions={
        hasEvents ? (
          <>
            <span
              className="text-muted-foreground text-xs font-medium underline decoration-dotted underline-offset-2"
              aria-hidden
            >
              Activity log
            </span>
            <ChartShareButton ariaLabel="Share events breakdown" />
          </>
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
