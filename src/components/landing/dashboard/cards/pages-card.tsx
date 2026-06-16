import { useState } from "react";
import { File01Icon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { PageBreakdownList } from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function PagesCard({
  pages,
  className,
}: {
  pages: DashboardPreviewRangeData["pages"];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const rows =
    activeTab === 0 ? pages.top : activeTab === 1 ? pages.entered : pages.exited;

  return (
    <DashboardTabbedBreakdownCard
      title="Pages"
      className={className}
      isEmpty={rows.length === 0}
      empty={{ icon: File01Icon, title: "No pages in range" }}
      tabs={{
        label: "Page breakdown",
        tabs: ["Top", "Entered", "Exited"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
      }}
    >
      <PageBreakdownList rows={rows} />
    </DashboardTabbedBreakdownCard>
  );
}

export default PagesCard;
