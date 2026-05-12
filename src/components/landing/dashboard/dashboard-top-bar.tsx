"use client";

import { useMemo } from "react";
import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { SiteFavicon } from "./site-favicon";
import {
  dashboardPreviewSites,
  dashboardRangeOptions,
  type DashboardRangeKey,
} from "./dashboard-preview-data";

type DashboardTopBarProps = {
  range: DashboardRangeKey;
  onRangeChange: (range: DashboardRangeKey) => void;
  siteId: string;
  onSiteChange: (siteId: string) => void;
};

export function DashboardTopBar({ range, onRangeChange, siteId, onSiteChange }: DashboardTopBarProps) {
  const site = dashboardPreviewSites.find((row) => row.id === siteId) ?? dashboardPreviewSites[0]!;
  const siteCrumb = site.domain ?? site.name;
  const rangeLabel = dashboardRangeOptions.find((row) => row.key === range)?.label ?? "Last 7 days";

  const siteItems = useMemo(
    () =>
      Object.fromEntries(dashboardPreviewSites.map((s) => [s.id, s.domain ?? s.name])) as Record<
        string,
        string
      >,
    [],
  );

  const rangeItems = useMemo(
    () =>
      Object.fromEntries(dashboardRangeOptions.map((o) => [o.key, o.label])) as Record<
        DashboardRangeKey,
        string
      >,
    [],
  );

  const siteLabel = site.domain ?? site.name;

  return (
    <div className="min-w-0 space-y-3">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-1">
            <span className="text-muted-foreground">Kobbe</span>
          </li>
          <li role="presentation" aria-hidden className="[&>svg]:size-3.5">
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </li>
          <li className="inline-flex min-w-0 items-center gap-1" title={siteCrumb}>
            <span className="max-w-[min(100%,16rem)] min-w-0 truncate">{siteCrumb}</span>
          </li>
          <li role="presentation" aria-hidden className="[&>svg]:size-3.5">
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </li>
          <li className="inline-flex items-center gap-1">
            <span className="font-semibold text-foreground" aria-current="page">
              Overview
            </span>
          </li>
        </ol>
      </nav>

      <div
        className="flex min-h-7 w-full min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-between sm:gap-3 mt-12"
        data-slot="dashboard-filters"
      >
        <div className="flex min-h-7 min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="w-full max-w-34 min-w-0 shrink sm:max-w-44">
            <Select
              value={siteId}
              onValueChange={(value) => {
                if (value == null) {
                  return;
                }
                onSiteChange(String(value));
              }}
              items={siteItems}
            >
              <SelectTrigger
                aria-label="Site"
                size="sm"
                title={siteLabel}
                className={cn(
                  "h-7 min-h-7 !w-full max-w-full min-w-0 overflow-hidden rounded-md border-0 bg-card px-2.5 text-[0.8rem] font-medium text-foreground shadow-none ring-0 focus-visible:ring-0",
                )}
              >
                <span className="grid max-w-full min-w-0 flex-1 grid-cols-[auto_1fr] items-center gap-1.5">
                  <SiteFavicon domain={site.domain} title={site.name} className="shrink-0" />
                  <span className="min-w-0 overflow-hidden text-left">
                    <SelectValue className="block w-full min-w-0 truncate text-left" />
                  </span>
                </span>
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                className="max-w-96 border-0 text-xs leading-snug shadow-md ring-0"
              >
                {dashboardPreviewSites.map((s) => {
                  const label = s.domain ?? s.name;
                  return (
                    <SelectItem key={s.id} value={s.id} label={label}>
                      <span className="flex min-w-0 items-center gap-2">
                        <SiteFavicon domain={s.domain} title={s.name} className="shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Select
            value={range}
            onValueChange={(value) => {
              if (value == null) {
                return;
              }
              onRangeChange(value as DashboardRangeKey);
            }}
            items={rangeItems}
          >
            <SelectTrigger
              aria-label="Time range"
              size="sm"
              fullWidth={false}
              title={rangeLabel}
              className={cn(
                "min-h-7 max-w-25 min-w-0 rounded-md border-0 bg-card text-[0.8rem] font-medium text-foreground shadow-none ring-0 focus-visible:ring-0 sm:max-w-34",
              )}
            >
              <span className="flex max-w-25 min-w-0 items-center gap-1.5 sm:max-w-34">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  strokeWidth={1.8}
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">
                  <SelectValue />
                </span>
              </span>
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              className="max-w-72 border-0 text-xs leading-snug shadow-md ring-0"
            >
              {dashboardRangeOptions.map((option) => (
                <SelectItem key={option.key} value={option.key} label={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
