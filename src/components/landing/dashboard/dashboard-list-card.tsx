import {
  FullscreenIcon,
  Globe02Icon,
  LinkSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { LocationRow, TrafficChannelRow } from "./dashboard-preview-data";
import { ReferrerFavicon } from "./referrer-favicon";

const breakdownListClassName = "flex flex-col";

export type BreakdownRevenueFormat = (minor: number) => string;

const breakdownRowBarFillClass = "bg-foreground/3";
const breakdownValueClassName =
  "text-muted-foreground w-12 text-right text-[11px] leading-none tabular-nums sm:w-14";
const breakdownRevenueClassName =
  "text-foreground w-14 text-right text-[11px] leading-none font-medium tabular-nums sm:w-16";

export function CardExpandButton(props: {
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      className="text-muted-foreground hover:bg-muted/60 hover:text-foreground inline-flex size-6 items-center justify-center rounded-md transition-colors"
    >
      <HugeiconsIcon
        icon={FullscreenIcon}
        className="size-3.5"
        strokeWidth={1.8}
        aria-hidden
      />
    </button>
  );
}

function rowHasRevenueHit(revenueMinor: number | undefined): boolean {
  const value = revenueMinor ?? 0;
  return Number.isFinite(value) && value > 0;
}

function toFiniteCount(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) {
    return 0;
  }

  return n;
}

function sumCountFromRows(counts: readonly unknown[]): number {
  return counts.reduce<number>((total, count) => total + toFiniteCount(count), 0);
}

function BreakdownListRow(props: {
  children: ReactNode;
  className?: string;
  count?: number;
  listTotal?: number;
}) {
  const total = toFiniteCount(props.listTotal);
  const count = toFiniteCount(props.count);
  const widthPercent = total > 0 ? Math.min(100, (count / total) * 100) : 0;

  return (
    <div
      className={cn(
        "relative w-full min-w-0 overflow-hidden rounded-md",
        props.className,
      )}
    >
      <style>{`
        @keyframes kobbeBreakdownBarGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kobbe-breakdown-row-bar {
            animation: none !important;
            transform: scaleX(1);
          }
        }
      `}</style>
      {props.listTotal == null ? null : (
        <div
          className={cn(
            "kobbe-breakdown-row-bar pointer-events-none absolute inset-y-1 left-0 min-w-0 origin-left rounded-sm",
            breakdownRowBarFillClass,
          )}
          style={{
            width: `${widthPercent}%`,
            animation: "kobbeBreakdownBarGrow 720ms ease-out both",
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10 flex min-w-0 items-center justify-between gap-3 px-2 py-2 sm:px-2.5">
        {props.children}
      </div>
    </div>
  );
}

function normalizedCountryCode(
  countryCode: string | null | undefined,
): string | null {
  if (!countryCode) return null;
  const u = countryCode.trim().toLowerCase();
  if (u.length !== 2 || !/^[a-z]{2}$/.test(u)) return null;
  return u;
}

export function PageBreakdownList(props: {
  rows: { path: string; count: number; revenueMinor?: number }[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => {
        const showRev =
          Boolean(props.revenueFormat) && rowHasRevenueHit(row.revenueMinor);
        const revText =
          showRev && props.revenueFormat
            ? props.revenueFormat(row.revenueMinor ?? 0)
            : "";
        return (
          <li key={row.path} className="list-none">
            <BreakdownListRow count={row.count} listTotal={listTotal}>
              <span
                className="text-foreground block min-w-0 flex-1 truncate text-xs"
                title={row.path}
              >
                {row.path}
              </span>
              <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
                {showRev ? (
                  <p className={breakdownRevenueClassName}>
                    {revText}
                  </p>
                ) : null}
                <p className={breakdownValueClassName}>
                  {row.count.toLocaleString()}
                </p>
              </div>
            </BreakdownListRow>
          </li>
        );
      })}
    </ul>
  );
}

function prettyReferrer(url: string): string {
  try {
    const parsed = new URL(/^https?:\/\//.test(url) ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function referrerToOpenUrl(referrer: string): string | null {
  const trimmed = referrer.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(href);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

export function ReferrerBreakdownList(props: {
  rows: { referrer: string; count: number; revenueMinor?: number }[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => {
        const openUrl = referrerToOpenUrl(row.referrer);
        const hostLabel = prettyReferrer(row.referrer);
        return (
          <li key={row.referrer} className="list-none">
            <BreakdownListRow count={row.count} listTotal={listTotal}>
              {openUrl ? (
                <span
                  className="group/referrer flex min-w-0 flex-1 cursor-default items-center gap-2 rounded-sm no-underline outline-offset-2 hover:underline"
                  title={`${hostLabel} (preview — not a link)`}
                >
                  <ReferrerFavicon referrer={row.referrer} title={hostLabel} />
                  <span className="text-foreground min-w-0 flex-1 truncate text-xs">
                    {hostLabel}
                  </span>
                  <HugeiconsIcon
                    icon={LinkSquare01Icon}
                    strokeWidth={1.8}
                    className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover/referrer:opacity-100"
                    aria-hidden
                  />
                </span>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <ReferrerFavicon referrer={row.referrer} title={hostLabel} />
                  <span
                    className="min-w-0 flex-1 truncate text-xs"
                    title={row.referrer}
                  >
                    {hostLabel}
                  </span>
                </div>
              )}
              <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
                {props.revenueFormat && rowHasRevenueHit(row.revenueMinor) ? (
                  <span className={breakdownRevenueClassName}>
                    {props.revenueFormat(row.revenueMinor ?? 0)}
                  </span>
                ) : null}
                <span className={breakdownValueClassName}>
                  {row.count.toLocaleString()}
                </span>
              </div>
            </BreakdownListRow>
          </li>
        );
      })}
    </ul>
  );
}

export function TrafficChannelList(props: {
  rows: TrafficChannelRow[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => (
        <li key={row.id} className="list-none">
          <BreakdownListRow count={row.count} listTotal={listTotal}>
            <span className="text-foreground min-w-0 flex-1 truncate text-xs">
              {row.label}
            </span>
            <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
              <span className={breakdownValueClassName}>
                {row.count.toLocaleString()}
              </span>
              <span className="text-muted-foreground/90 w-12 text-right text-[11px] leading-none tabular-nums sm:w-14">
                {row.percent}%
              </span>
            </div>
          </BreakdownListRow>
        </li>
      ))}
    </ul>
  );
}

export function DeviceBreakdownList(props: {
  rows: { name: string; count: number; revenueMinor?: number }[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => (
        <li key={row.name} className="list-none">
          <BreakdownListRow count={row.count} listTotal={listTotal}>
            <span className="min-w-0 flex-1 truncate text-xs" title={row.name}>
              {row.name}
            </span>
            <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
              {props.revenueFormat && rowHasRevenueHit(row.revenueMinor) ? (
                <span className={breakdownRevenueClassName}>
                  {props.revenueFormat(row.revenueMinor ?? 0)}
                </span>
              ) : null}
              <span className={breakdownValueClassName}>
                {row.count.toLocaleString()}
              </span>
            </div>
          </BreakdownListRow>
        </li>
      ))}
    </ul>
  );
}

export function LocationBreakdownList(props: {
  rows: LocationRow[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => {
        const cc = normalizedCountryCode(row.countryCode);
        return (
          <li key={row.key} className="list-none">
            <BreakdownListRow count={row.count} listTotal={listTotal}>
              <span className="flex min-w-0 flex-1 items-center gap-2">
                {cc ? (
                  <span
                    className={`fi fi-${cc} inline-block size-4 shrink-0 overflow-hidden rounded-xs bg-cover bg-center`}
                    aria-hidden
                    title={row.countryCode ?? undefined}
                  />
                ) : (
                  <HugeiconsIcon
                    icon={Globe02Icon}
                    className="text-muted-foreground size-3.5 shrink-0"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
                <span
                  className="min-w-0 flex-1 truncate text-xs"
                  title={row.label}
                >
                  {row.label}
                </span>
              </span>
              <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
                {props.revenueFormat && rowHasRevenueHit(row.revenueMinor) ? (
                  <span className={breakdownRevenueClassName}>
                    {props.revenueFormat(row.revenueMinor ?? 0)}
                  </span>
                ) : null}
                <span className={breakdownValueClassName}>
                  {row.count.toLocaleString()}
                </span>
              </div>
            </BreakdownListRow>
          </li>
        );
      })}
    </ul>
  );
}

export function SearchTermsBreakdownList(props: {
  rows: { query: string; clicks: number; revenueMinor?: number }[];
  revenueFormat?: BreakdownRevenueFormat;
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.clicks));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => (
        <li key={row.query} className="list-none">
          <BreakdownListRow count={row.clicks} listTotal={listTotal}>
            <span className="text-foreground min-w-0 flex-1 truncate text-xs">
              {row.query}
            </span>
            <span className="text-muted-foreground w-12 shrink-0 text-right text-[11px] leading-none tabular-nums sm:w-14">
              {row.clicks.toLocaleString()}
            </span>
          </BreakdownListRow>
        </li>
      ))}
    </ul>
  );
}

export function EventsSummaryTable(props: {
  rows: { name: string; visitors: number; count: number }[];
  total: number;
  valueMode: "count" | "share";
}) {
  const listTotal = sumCountFromRows(props.rows.map((row) => row.count));

  return (
    <ul className={breakdownListClassName}>
      {props.rows.map((row) => {
        const value =
          props.valueMode === "share"
            ? `${Math.round((row.count / props.total) * 1000) / 10}%`
            : row.count.toLocaleString();
        return (
          <li key={row.name} className="list-none">
            <BreakdownListRow count={row.count} listTotal={listTotal}>
              <span className="text-foreground min-w-0 flex-1 truncate text-xs">
                {row.name}
              </span>
              <div className="flex shrink-0 items-baseline justify-end gap-2 sm:gap-4">
                <span className={breakdownValueClassName}>
                  {row.visitors.toLocaleString()}
                </span>
                <span className={breakdownValueClassName}>
                  {value}
                </span>
              </div>
            </BreakdownListRow>
          </li>
        );
      })}
    </ul>
  );
}
