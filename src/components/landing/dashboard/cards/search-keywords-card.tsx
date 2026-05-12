import { Search01Icon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { SearchTermsBreakdownList } from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function SearchKeywordsCard({
  rows,
}: {
  rows: DashboardPreviewRangeData["searchKeywords"];
}) {
  return (
    <DashboardTabbedBreakdownCard
      title="Google Search"
      isEmpty={rows.length === 0}
      empty={{ icon: Search01Icon, title: "No search terms in range" }}
      tabs={{
        label: "Google Search",
        tabs: ["Queries"],
        activeIndex: 0,
        onActiveIndexChange: () => undefined,
      }}
    >
      <SearchTermsBreakdownList rows={rows} />
    </DashboardTabbedBreakdownCard>
  );
}
