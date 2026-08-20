import { useState } from "react";
import { File01Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import {
  DashboardBreakdownCard,
  DashboardTabbedBreakdownCard,
} from "./dashboard-breakdown-card";
import { dashboardCardStackClass } from "./dashboard-card-layout";
import { DashboardCustomKpiStrip } from "./dashboard-kpi-strip";
import { PageBreakdownList } from "./dashboard-list-card";
import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "./dashboard-table";
import {
  dashboardPreviewData,
  formatDashboardPreviewRevenue,
} from "./dashboard-preview-data";

const data = dashboardPreviewData["30d"];
const revenueFormat = formatDashboardPreviewRevenue;

const revenueKpis = [
  { key: "gross", label: "Gross revenue", valueDisplay: "$19.4K", rightHint: "412 paid" },
  {
    key: "refunds",
    label: "Refunds",
    valueDisplay: "$486",
    valueClassName: "text-destructive",
    rightHint: "11",
    rightHintTone: "bad" as const,
  },
  { key: "net", label: "Net revenue", valueDisplay: "$18.9K" },
  {
    key: "attributed",
    label: "Attributed revenue",
    valueDisplay: "$14.6K",
    rightHint: "318",
  },
  { key: "rate", label: "Attribution rate", valueDisplay: "77%" },
  { key: "median", label: "Median time to purchase", valueDisplay: "2.6h" },
];

const productRows = [
  { name: "Growth plan", orders: 214, revenue: "$8.9K", share: "46%" },
  { name: "Starter plan", orders: 141, revenue: "$5.6K", share: "29%" },
  { name: "Lifetime deal", orders: 57, revenue: "$4.9K", share: "25%" },
];

const metricHeadRightClass = "text-right";
const metricCellRightClass = "text-right tabular-nums";

export function RevenueInsightsPreview() {
  const [attributionTab, setAttributionTab] = useState(0);

  const attributionRows = attributionTab === 0 ? data.pages.entered : data.pages.top;

  return (
    <div className="relative min-w-0">
      <DashboardCustomKpiStrip
        ariaLabel="Revenue summary"
        presentation="mutedBand"
        lgCols={6}
        items={revenueKpis}
      />
      <div className={cn(dashboardCardStackClass, "mt-2")}>
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <DashboardTabbedBreakdownCard
            title="Attribution breakdown"
            isEmpty={attributionRows.length === 0}
            empty={{ icon: File01Icon, title: "No attributed revenue in range" }}
            tabs={{
              label: "Attribution breakdown",
              tabs: ["Landing pages", "Converting pages"],
              activeIndex: attributionTab,
              onActiveIndexChange: setAttributionTab,
            }}
          >
            <PageBreakdownList rows={attributionRows} revenueFormat={revenueFormat} />
          </DashboardTabbedBreakdownCard>
          <DashboardBreakdownCard
            title="Revenue by product"
            isEmpty={false}
            empty={{ icon: File01Icon, title: "No product data in range" }}
          >
            <DashboardTable>
              <DashboardTableHeader>
                <DashboardTableRow>
                  <DashboardTableHead>Product</DashboardTableHead>
                  <DashboardTableHead className={metricHeadRightClass}>
                    Orders
                  </DashboardTableHead>
                  <DashboardTableHead className={metricHeadRightClass}>
                    Revenue
                  </DashboardTableHead>
                  <DashboardTableHead className={metricHeadRightClass}>
                    Share
                  </DashboardTableHead>
                </DashboardTableRow>
              </DashboardTableHeader>
              <DashboardTableBody>
                {productRows.map((row) => (
                  <DashboardTableRow key={row.name}>
                    <DashboardTableCell className="text-foreground font-medium">
                      {row.name}
                    </DashboardTableCell>
                    <DashboardTableCell
                      className={cn(metricCellRightClass, "text-muted-foreground")}
                    >
                      {row.orders.toLocaleString()}
                    </DashboardTableCell>
                    <DashboardTableCell className={cn(metricCellRightClass, "font-medium")}>
                      {row.revenue}
                    </DashboardTableCell>
                    <DashboardTableCell
                      className={cn(metricCellRightClass, "text-muted-foreground")}
                    >
                      {row.share}
                    </DashboardTableCell>
                  </DashboardTableRow>
                ))}
              </DashboardTableBody>
            </DashboardTable>
          </DashboardBreakdownCard>
        </div>
      </div>
    </div>
  );
}

export default RevenueInsightsPreview;
