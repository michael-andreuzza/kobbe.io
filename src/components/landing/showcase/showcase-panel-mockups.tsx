import type { ImageMetadata } from "astro";

import {
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import claudeLogo from "@/images/brands/claude.svg";
import codexLogo from "@/images/brands/codex.svg";
import copilotLogo from "@/images/brands/copilot.svg";
import creemLogo from "@/images/brands/creem.svg";
import cursorLogo from "@/images/brands/cursor.svg";
import datafastLogo from "@/images/brands/datafast.svg";
import fathomLogo from "@/images/brands/fathom.svg";
import mollieLogo from "@/images/brands/mollie.svg";
import opencodeLogo from "@/images/brands/opencode.svg";
import paddleLogo from "@/images/brands/paddle.svg";
import plausibleLogo from "@/images/brands/plausible.svg";
import polarLogo from "@/images/brands/polar.svg";
import revenuecatLogo from "@/images/brands/revenuecat.svg";
import revolutLogo from "@/images/brands/revolut.svg";
import rooCodeLogo from "@/images/brands/roo code.svg";
import shopifyLogo from "@/images/brands/shopify.svg";
import stripeLogo from "@/images/brands/stripe.svg";
import superwallLogo from "@/images/brands/superwall.svg";
import umamiLogo from "@/images/brands/umami.svg";
import whopLogo from "@/images/brands/whop.svg";
import windsurfLogo from "@/images/brands/windsurf.svg";
import zedLogo from "@/images/brands/zed.svg";
import { monotoneLinePath } from "@/lib/monotone-path";
import { cn } from "@/lib/utils";
import {
  dashboardCardDescriptionClass,
  dashboardCardTitleClass,
} from "../dashboard/dashboard-card-layout";
import {
  APP_RAMP,
  type GradientRamp,
} from "../dashboard/traffic-gradient";

/**
 * Dashboard mockups for the landing showcase panels. Each mirrors the
 * actual app UI (breakdown lists with inset fraction bars, activity tables,
 * gradient charts, goal chips) rendered flush on the panel background: no
 * card surface, padding, or shadow of their own.
 */

const panelHeaderClass = "px-0! pt-0 pb-3 sm:pb-4";
const panelContentClass = "min-w-0 px-0! py-0!";

type BrandLogo = { name: string; logo: ImageMetadata };

const revenueProviders: BrandLogo[] = [
  { name: "Stripe", logo: stripeLogo },
  { name: "Polar", logo: polarLogo },
  { name: "Paddle", logo: paddleLogo },
  { name: "Creem", logo: creemLogo },
  { name: "Mollie", logo: mollieLogo },
  { name: "Revolut", logo: revolutLogo },
  { name: "Whop", logo: whopLogo },
  { name: "RevenueCat", logo: revenuecatLogo },
  { name: "Superwall", logo: superwallLogo },
  { name: "Shopify", logo: shopifyLogo },
];

const importProviders: BrandLogo[] = [
  { name: "Plausible", logo: plausibleLogo },
  { name: "Fathom", logo: fathomLogo },
  { name: "Umami", logo: umamiLogo },
  { name: "DataFast", logo: datafastLogo },
];

const codeEditors: BrandLogo[] = [
  { name: "Cursor", logo: cursorLogo },
  { name: "Claude Code", logo: claudeLogo },
  { name: "Codex", logo: codexLogo },
  { name: "GitHub Copilot", logo: copilotLogo },
  { name: "Zed", logo: zedLogo },
  { name: "OpenCode", logo: opencodeLogo },
  { name: "Roo Code", logo: rooCodeLogo },
  { name: "Windsurf", logo: windsurfLogo },
];

/** Row of brand marks, desaturated so they sit quietly on the panel. */
export function PanelLogoStrip(props: {
  logos: BrandLogo[];
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", props.className)}
      aria-label={props.label}
    >
      {props.logos.map((brand) => (
        <span key={brand.name}>
          <img
            src={brand.logo.src}
            alt={`${brand.name} logo`}
            className="size-5 rounded object-contain grayscale"
            loading="lazy"
            width="20"
            height="20"
          />
          <span className="sr-only">{brand.name}</span>
        </span>
      ))}
    </div>
  );
}

/** Header strips: rendered by the panel under the copy, not by the mockups. */
export function RevenueLogoStrip(props: { className?: string }) {
  return (
    <PanelLogoStrip
      logos={revenueProviders}
      label="Supported revenue providers"
      className={props.className}
    />
  );
}

export function ImportLogoStrip(props: { className?: string }) {
  return (
    <PanelLogoStrip
      logos={importProviders}
      label="Supported import providers"
      className={props.className}
    />
  );
}

export function CliLogoStrip(props: { className?: string }) {
  return (
    <PanelLogoStrip
      logos={codeEditors}
      label="Supported code editors and agents"
      className={props.className}
    />
  );
}

function PanelCard(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex w-full flex-col select-none",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

/** Gradient line + wash, same drawing as the app's traffic chart. */
function PanelGradientChart(props: {
  idPrefix: string;
  /** Values on a 0-100 scale, evenly spaced along the x axis. */
  values: number[];
  /** Each showcase chart picks its own ramp. */
  ramp: GradientRamp;
  className?: string;
}) {
  const W = 600;
  const H = 160;
  const xAt = (index: number) => (index / (props.values.length - 1)) * W;
  const yAt = (value: number) => H - (value / 100) * H;
  const linePath = monotoneLinePath(
    props.values.map((value, index) => ({ x: xAt(index), y: yAt(value) })),
  );
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", props.className)}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${props.idPrefix}-stroke`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          {props.ramp.stops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <linearGradient
          id={`${props.idPrefix}-fill`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          {props.ramp.stops.map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={0.1}
            />
          ))}
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${props.idPrefix}-fill)`} />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#${props.idPrefix}-stroke)`}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Breakdown list row exactly like the app: inset `bg-foreground/7` fraction
 * bar, label on the start edge, percent + count cluster on the end.
 */
function BreakdownRow(props: {
  label: React.ReactNode;
  percent: string;
  count: string;
  /** Share of the list total, as a CSS width. */
  width: string;
}) {
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-md">
      <div
        className="bg-foreground/7 pointer-events-none absolute inset-y-1 left-0 min-w-0 rounded-sm"
        style={{ width: props.width }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-w-0 items-center justify-between gap-3 px-2 py-2">
        <span className="text-foreground min-w-0 truncate text-xs">
          {props.label}
        </span>
        <span className="flex shrink-0 items-center justify-end gap-2 text-xs tabular-nums sm:gap-2.5">
          <span className="text-muted-foreground/90 min-w-11 shrink-0 text-right">
            {props.percent}
          </span>
          <span className="text-muted-foreground min-w-11 shrink-0 text-right">
            {props.count}
          </span>
        </span>
      </div>
    </div>
  );
}

/** Realtime: recent activity table with the live "online now" pill. */
export function RealtimePanelMockup() {
  const rows = [
    { page: "/pricing", time: "just now" },
    { page: "/docs/install", time: "1m ago" },
    { page: "/blog/launch", time: "2m ago" },
    { page: "/", time: "3m ago" },
    { page: "/docs/events", time: "4m ago" },
    { page: "/changelog", time: "6m ago" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Recent activity
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Last 30 minutes
        </CardDescription>
        <CardAction>
          <span className="bg-background text-foreground inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
              <span className="bg-brand relative inline-flex size-2 rounded-full" />
            </span>
            12 online now
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div>
          <div className="text-muted-foreground border-border/40 flex items-center justify-between border-b py-2 text-xs font-medium">
            <span>Page</span>
            <span>Time</span>
          </div>
          {rows.map((row, index) => (
            <div
              key={row.page}
              className={cn(
                "flex items-center justify-between gap-3 py-2 text-xs",
                index < rows.length - 1 && "border-border/40 border-b",
              )}
            >
              <span className="text-foreground min-w-0 truncate font-medium">
                {row.page}
              </span>
              <span className="text-muted-foreground shrink-0 tabular-nums">
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Conversions: goal filter chips over the converting-pages breakdown list. */
export function ConversionsPanelMockup() {
  const goals = [
    { label: "Form submit", active: true },
    { label: "Contact click", active: false },
    { label: "Outbound link", active: false },
    { label: "Signup (custom)", active: false },
  ];
  const rows = [
    { label: "/pricing", percent: "41%", count: "412", width: "41%" },
    { label: "/docs/install", percent: "29%", count: "286", width: "29%" },
    { label: "/blog/launch", percent: "17%", count: "173", width: "17%" },
    { label: "/", percent: "13%", count: "129", width: "13%" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>Pages</CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Converting on the selected goal
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div className={"space-y-3"}>
          <div className="flex flex-wrap items-center gap-2">
            {goals.map((goal) => (
              <span
                key={goal.label}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
                  goal.active
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground",
                )}
              >
                {goal.active ? (
                  <svg
                    viewBox="0 0 12 12"
                    className="size-3"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 6.5 L5 9 L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
                {goal.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col">
            {rows.map((row) => (
              <BreakdownRow key={row.label} {...row} />
            ))}
          </div>
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Traffic chart with a pinned note, like the app's chart annotations. */
export function AnnotationsPanelMockup() {
  const values = [
    30, 34, 28, 38, 42, 36, 44, 40, 52, 46, 58, 92, 74, 62, 66, 58, 64, 70, 62,
    68,
  ];
  const pinned = 11;
  const pinnedLeft = (pinned / (values.length - 1)) * 100;
  const pinnedTop = 100 - values[pinned]!;
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Visitors over time
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          May 4 – May 31
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div>
          {/* Full bleed: cancel the panel padding so the area hugs the edges. */}
          <div className="relative mt-8 -mx-4 -mb-4 h-40 sm:-mx-6 sm:-mb-6">
            <PanelGradientChart
              idPrefix="showcase-annotations"
              values={values}
              ramp={APP_RAMP}
            />
            <div
              className="border-foreground/25 pointer-events-none absolute inset-y-0 border-l border-dashed"
              style={{ left: `${pinnedLeft}%` }}
              aria-hidden="true"
            />
            <div
              className="border-background pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${pinnedLeft}%`,
                top: `${pinnedTop}%`,
                background: APP_RAMP.accent,
              }}
              aria-hidden="true"
            />
            <div
              className="bg-foreground text-background absolute -top-7 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap shadow-md"
              style={{ left: `${pinnedLeft}%` }}
            >
              <span
                className="size-1.5 rounded-[2px]"
                style={{ background: APP_RAMP.accent }}
                aria-hidden="true"
              />
              Uneed launch
            </div>
          </div>
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Conversion peak: day chips plus the 24-hour gradient profile. */
export function ConversionPeakPanelMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activeDay = "Thu";
  const values = [
    8, 6, 5, 4, 5, 8, 14, 22, 32, 40, 46, 52, 56, 52, 48, 52, 62, 78, 96, 84,
    62, 42, 26, 14,
  ];
  const peak = values.indexOf(Math.max(...values));
  const peakLeft = (peak / (values.length - 1)) * 100;
  const peakTop = 100 - values[peak]!;
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Conversion peak
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Hourly profile, split by day of week
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {days.map((day) => (
              <span
                key={day}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium",
                  day === activeDay
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground",
                )}
              >
                {day}
              </span>
            ))}
          </div>
          {/* Full bleed: cancel the panel padding so the area hugs the edges. */}
          <div className="relative mt-8 -mx-4 -mb-4 h-36 sm:-mx-6 sm:-mb-6">
            <PanelGradientChart
              idPrefix="showcase-peak"
              values={values}
              ramp={APP_RAMP}
            />
            <div
              className="border-background pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${peakLeft}%`,
                top: `${peakTop}%`,
                background: APP_RAMP.accent,
              }}
              aria-hidden="true"
            />
            <div
              className="bg-foreground text-background absolute z-10 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap tabular-nums shadow-md"
              style={{ left: `${peakLeft}%`, top: `calc(${peakTop}% - 28px)` }}
            >
              18:00 · 96 conversions
            </div>
          </div>
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Search keywords: Search Console breakdown list. */
export function SearchKeywordsPanelMockup() {
  const rows = [
    { label: "privacy analytics", percent: "31%", count: "764", width: "31%" },
    {
      label: "cookieless analytics",
      percent: "25%",
      count: "621",
      width: "25%",
    },
    {
      label: "google analytics alternative",
      percent: "20%",
      count: "512",
      width: "20%",
    },
    { label: "gdpr web analytics", percent: "14%", count: "348", width: "14%" },
    { label: "kobbe analytics", percent: "10%", count: "266", width: "10%" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Search keywords
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Clicks from Google Search
        </CardDescription>
        <CardAction>
          <span className="bg-background text-muted-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium">
            <svg
              viewBox="0 0 12 12"
              className="size-3"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6.5 L5 9 L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Search Console connected
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div className={"flex flex-col"}>
          {rows.map((row) => (
            <BreakdownRow key={row.label} {...row} />
          ))}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/**
 * Funnel body geometry, ported from the app's funnel chart: a mirrored
 * shape around a center line, layered into translucent bands.
 */
const FUNNEL_VIEW_W = 1000;
/** Short viewport: just enough headroom for the widest band, so the card
    title sits right above the funnel instead of floating mid-panel. */
const FUNNEL_VIEW_H = 180;
/** Low center line so the body's lower half bleeds out of the panel. */
const FUNNEL_CENTER_Y = 135;
const FUNNEL_BANDS = [
  { scale: 1, opacity: 0.08 },
  { scale: 0.78, opacity: 0.18 },
  { scale: 0.55, opacity: 0.38 },
  { scale: 0.32, opacity: 1 },
] as const;

function funnelStageThickness(ratio: number) {
  return 16 + ratio * 200;
}

function funnelSegmentGeometry(ratios: number[], index: number) {
  const segmentWidth = FUNNEL_VIEW_W / ratios.length;
  const thicknesses = ratios.map(funnelStageThickness);
  const leftThickness =
    index === 0
      ? thicknesses[0]!
      : (thicknesses[index - 1]! + thicknesses[index]!) / 2;
  const rightThickness =
    index === ratios.length - 1
      ? thicknesses[index]!
      : (thicknesses[index]! + thicknesses[index + 1]!) / 2;
  const leftX = index * segmentWidth;
  const rightX = (index + 1) * segmentWidth;
  return {
    leftX,
    rightX,
    midX: (leftX + rightX) / 2,
    leftThickness,
    rightThickness,
  };
}

function funnelBandSegmentPath(
  ratios: number[],
  index: number,
  scale: number,
): string {
  const { leftX, rightX, midX, leftThickness, rightThickness } =
    funnelSegmentGeometry(ratios, index);
  const leftHalf = (leftThickness * scale) / 2;
  const rightHalf = (rightThickness * scale) / 2;
  const topLeftY = FUNNEL_CENTER_Y - leftHalf;
  const topRightY = FUNNEL_CENTER_Y - rightHalf;
  const bottomLeftY = FUNNEL_CENTER_Y + leftHalf;
  const bottomRightY = FUNNEL_CENTER_Y + rightHalf;
  return [
    `M ${leftX} ${topLeftY}`,
    `C ${midX} ${topLeftY}, ${midX} ${topRightY}, ${rightX} ${topRightY}`,
    `L ${rightX} ${bottomRightY}`,
    `C ${midX} ${bottomRightY}, ${midX} ${bottomLeftY}, ${leftX} ${bottomLeftY}`,
    "Z",
  ].join(" ");
}

/** Funnels: the app's mirrored line-flow funnel as full-bleed decoration. */
export function FunnelsPanelMockup() {
  const steps = [
    { label: "/", percent: "100%", ratio: 1 },
    { label: "/pricing", percent: "85%", ratio: 0.85 },
    { label: "signup", percent: "52%", ratio: 0.52 },
  ];
  const ratios = steps.map((step) => step.ratio);
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Landing to signup
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          3 steps · 52% overall conversion
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        {/* Full bleed: cancel the panel padding so the body hugs the edges. */}
        <div className="relative mt-8 -mx-4 -mb-4 h-40 sm:-mx-6 sm:-mb-6">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${FUNNEL_VIEW_W} ${FUNNEL_VIEW_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* userSpaceOnUse spans the full funnel, so each segment
                  samples its slice of the ramp instead of restarting it. */}
              <linearGradient
                id="showcase-funnel"
                x1="0"
                y1="0"
                x2={FUNNEL_VIEW_W}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                {APP_RAMP.stops.map((stop) => (
                  <stop
                    key={stop.offset}
                    offset={stop.offset}
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
            </defs>
            {steps.map((step, index) => (
              <g key={`funnel-segment-${step.label}`}>
                {FUNNEL_BANDS.map((band) => (
                  <path
                    key={`funnel-band-${step.label}-${band.scale}`}
                    d={funnelBandSegmentPath(ratios, index, band.scale)}
                    fill="url(#showcase-funnel)"
                    fillOpacity={band.opacity}
                  />
                ))}
              </g>
            ))}
          </svg>
          {/* Conversion pills riding the curve at each stage midpoint. */}
          {steps.map((step, index) => {
            const { midX } = funnelSegmentGeometry(ratios, index);
            return (
              <span
                key={`funnel-pill-${step.label}`}
                className="bg-background text-foreground absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums"
                style={{
                  left: `${(midX / FUNNEL_VIEW_W) * 100}%`,
                  top: `${(FUNNEL_CENTER_Y / FUNNEL_VIEW_H) * 100}%`,
                }}
              >
                {step.percent}
              </span>
            );
          })}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Revenue attribution: referrers with attributed revenue. */
export function RevenuePanelMockup() {
  const rows = [
    { label: "google.com", percent: "38%", count: "$2,412", width: "38%" },
    { label: "x.com", percent: "26%", count: "$1,684", width: "26%" },
    { label: "newsletter", percent: "19%", count: "$1,205", width: "19%" },
    { label: "linkedin.com", percent: "17%", count: "$1,072", width: "17%" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Revenue by source
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Attributed through checkout · last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div className={"flex flex-col"}>
          {rows.map((row) => (
            <BreakdownRow key={row.label} {...row} />
          ))}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Performance: Core Web Vitals p75 table with rating pills. */
export function PerformancePanelMockup() {
  const rows = [
    { metric: "LCP", detail: "Largest Contentful Paint", value: "1.8s" },
    { metric: "INP", detail: "Interaction to Next Paint", value: "120ms" },
    { metric: "CLS", detail: "Cumulative Layout Shift", value: "0.02" },
    { metric: "TTFB", detail: "Time to First Byte", value: "210ms" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>Web Vitals</CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          p75 across all pages · last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div>
          {rows.map((row, index) => (
            <div
              key={row.metric}
              className={cn(
                "flex items-center justify-between gap-3 py-2.5 text-xs",
                index < rows.length - 1 && "border-border/40 border-b",
              )}
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="text-foreground font-medium">
                  {row.metric}
                </span>
                <span className="text-muted-foreground hidden truncate text-[11px] sm:inline">
                  {row.detail}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2.5">
                <span className="text-foreground tabular-nums">
                  {row.value}
                </span>
                <span className="bg-background text-muted-foreground rounded-md px-2 py-0.5 text-[10px] font-medium">
                  Good
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** Import: analytics history brought in from other tools. */
export function ImportPanelMockup() {
  const rows = [
    { provider: "Plausible", events: "2.4M pageviews", status: "Imported" },
    { provider: "Fathom", events: "860K pageviews", status: "Imported" },
    { provider: "Umami", events: "410K pageviews", status: "Imported" },
    { provider: "DataFast", events: "120K pageviews", status: "Ready" },
  ];
  return (
    <PanelCard>
      <CardHeader className={panelHeaderClass}>
        <CardTitle className={dashboardCardTitleClass}>
          Import history
        </CardTitle>
        <CardDescription className={dashboardCardDescriptionClass}>
          Keep collecting on the same site
        </CardDescription>
      </CardHeader>
      <CardContent className={panelContentClass}>
        <div>
          {rows.map((row, index) => (
            <div
              key={row.provider}
              className={cn(
                "flex items-center justify-between gap-3 py-2.5 text-xs",
                index < rows.length - 1 && "border-border/40 border-b",
              )}
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="text-foreground font-medium">
                  {row.provider}
                </span>
                <span className="text-muted-foreground hidden truncate text-[11px] sm:inline">
                  {row.events}
                </span>
              </span>
              <span className="text-muted-foreground flex shrink-0 items-center gap-1.5">
                <svg
                  viewBox="0 0 12 12"
                  className="size-3"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6.5 L5 9 L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </PanelCard>
  );
}

/** CLI and MCP: an agent chat querying Kobbe over MCP, plain on the panel. */
export function CliPanelMockup() {
  const stats = [
    { label: "Visitors", value: "12,480", change: "+12%" },
    { label: "Visits", value: "14,102", change: "+9%" },
    { label: "Views", value: "28,455", change: "+15%" },
    { label: "Revenue", value: "$4,320", change: "+21%" },
  ];
  return (
    <PanelCard>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <p className="bg-background text-foreground max-w-[80%] rounded-lg px-3 py-2 text-xs">
            How did kobbe.io do this week?
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-muted-foreground font-mono text-[11px]">
            Called kobbe · get_overview
          </p>
          <p className="text-foreground text-xs leading-relaxed">
            A good week — visitors are up 12% and revenue is up 21% over the
            last 7 days:
          </p>
          <div>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex items-center justify-between gap-3 py-2 text-xs",
                  index < stats.length - 1 && "border-border/40 border-b",
                )}
              >
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="text-foreground tabular-nums">
                  {stat.value}
                  <span className="text-muted-foreground"> {stat.change}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="text-foreground text-xs leading-relaxed">
            Most of the lift came from /pricing — want the source breakdown?
          </p>
        </div>
      </div>
    </PanelCard>
  );
}
