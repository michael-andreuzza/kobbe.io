import { useState } from "react";
import { ComputerPhoneSyncIcon } from "@hugeicons/core-free-icons";

import { DashboardTabbedBreakdownCard } from "../dashboard-breakdown-card";
import { DeviceBreakdownList } from "../dashboard-list-card";
import type { DashboardPreviewRangeData } from "../dashboard-preview-data";

export function DevicesCard({
  devices,
}: {
  devices: DashboardPreviewRangeData["devices"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const rows =
    activeTab === 0
      ? devices.browsers
      : activeTab === 1
        ? devices.os
        : devices.deviceTypes;

  return (
    <DashboardTabbedBreakdownCard
      title="Devices"
      isEmpty={rows.length === 0}
      empty={{ icon: ComputerPhoneSyncIcon, title: "No devices in range" }}
      tabs={{
        label: "Devices",
        tabs: ["Browsers", "OS", "Devices"],
        activeIndex: activeTab,
        onActiveIndexChange: setActiveTab,
      }}
    >
      <DeviceBreakdownList rows={rows} />
    </DashboardTabbedBreakdownCard>
  );
}
