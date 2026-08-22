import { cn } from "@/lib/utils";
import { GRADIENT_ACCENT, TRAFFIC_GRADIENT_STOPS } from "./traffic-gradient";

/**
 * Radically simplified fragments of Kobbe's own dashboard UI, used as the
 * capability grid mockups. Built from the product's design tokens (cards,
 * chips, gradient charts, inverted tooltips) instead of imagery.
 */

/** Shared defs + paths for the mini gradient line charts in the vignettes. */
function VignetteGradientChart(props: {
  idPrefix: string;
  /** Values on a 0-100 scale, evenly spaced along the x axis. */
  values: number[];
  className?: string;
}) {
  const W = 200;
  const H = 80;
  const xAt = (index: number) => (index / (props.values.length - 1)) * W;
  const yAt = (value: number) => H - (value / 100) * H;
  const linePath = props.values
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${xAt(index).toFixed(2)} ${yAt(value).toFixed(2)}`,
    )
    .join(" ");
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", props.className)}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${props.idPrefix}-stroke`} x1="0" y1="0" x2="1" y2="0">
          {TRAFFIC_GRADIENT_STOPS.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <linearGradient id={`${props.idPrefix}-fill`} x1="0" y1="0" x2="1" y2="0">
          {TRAFFIC_GRADIENT_STOPS.map((stop) => (
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
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Goal filter chips with one selected: auto-tracked conversions become filters. */
export function ConversionsVignette() {
  const goals = [
    { label: "Form submit", active: true },
    { label: "Contact click", active: false },
    { label: "Outbound link", active: false },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {goals.map((goal) => (
        <span
          key={goal.label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
            goal.active
              ? "bg-foreground text-background shadow-xs"
              : "border-border/70 text-muted-foreground bg-card border",
          )}
        >
          {goal.active ? (
            <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
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
  );
}

/** Mini gradient line chart with an inverted tooltip pinned to one day. */
export function AnnotationsVignette() {
  const values = [42, 58, 34, 70, 96, 52, 64];
  const highlighted = 4;
  const pinnedLeft = (highlighted / (values.length - 1)) * 100;
  const pinnedTop = 100 - values[highlighted];
  return (
    <div className="w-full pt-8">
      <div className="relative h-24">
        <VignetteGradientChart idPrefix="vignette-annotations" values={values} />
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
            background: GRADIENT_ACCENT,
          }}
          aria-hidden="true"
        />
        <div
          className="bg-foreground text-background absolute -top-7 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap shadow-md"
          style={{ left: `${pinnedLeft}%` }}
        >
          <span className="bg-brand size-1.5 rounded-[2px]" aria-hidden="true" />
          Launch day
        </div>
      </div>
    </div>
  );
}

/** Keyword breakdown rows with fraction bars, straight from the dashboard. */
export function SearchKeywordsVignette() {
  const rows = [
    { keyword: "privacy analytics", count: "764", width: "82%" },
    { keyword: "cookieless analytics", count: "621", width: "64%" },
  ];
  return (
    <div className="w-full space-y-1.5">
      {rows.map((row) => (
        <div
          key={row.keyword}
          className="border-border/60 bg-card relative overflow-hidden rounded-md border px-2.5 py-2"
        >
          <div
            className="bg-brand/10 absolute inset-y-0 left-0"
            style={{ width: row.width }}
            aria-hidden="true"
          />
          <div className="relative flex items-baseline justify-between gap-3 text-xs">
            <span className="text-foreground truncate">{row.keyword}</span>
            <span className="text-muted-foreground tabular-nums">
              {row.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Hourly conversion profile: gradient curve peaking in the evening. */
export function ConversionPeakVignette() {
  // 24 hourly values (0-100): quiet night, midday bump, evening peak.
  const values = [
    8, 6, 5, 4, 5, 8, 14, 22, 32, 40, 46, 52, 56, 52, 48, 52, 62, 78, 96, 84,
    62, 42, 26, 14,
  ];
  const peak = values.indexOf(Math.max(...values));
  const peakLeft = (peak / (values.length - 1)) * 100;
  const peakTop = 100 - values[peak];
  return (
    <div className="w-full">
      <div className="relative h-24">
        <VignetteGradientChart idPrefix="vignette-peak" values={values} />
        <div
          className="border-background pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{
            left: `${peakLeft}%`,
            top: `${peakTop}%`,
            background: GRADIENT_ACCENT,
          }}
          aria-hidden="true"
        />
      </div>
      <div className="text-muted-foreground mt-2 flex justify-between text-[10px] tabular-nums">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </div>
    </div>
  );
}

/** Live badge with a pulsing dot and the pages visitors are on right now. */
export function RealtimeVignette() {
  const visitors = [
    { cc: "SE", path: "/pricing", when: "just now" },
    { cc: "US", path: "/docs/install", when: "2m ago" },
    { cc: "DE", path: "/blog/launch", when: "4m ago" },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <span className="border-border/70 bg-card text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-xs">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
          <span className="bg-brand relative inline-flex size-2 rounded-full" />
        </span>
        3 online now
      </span>
      <div className="w-full space-y-2.5">
        {visitors.map((visitor) => (
          <div
            key={visitor.path}
            className="flex items-center gap-2 text-[11px]"
          >
            <span className="border-border/60 bg-muted text-muted-foreground inline-flex size-4 items-center justify-center rounded-[4px] border text-[8px] font-semibold">
              {visitor.cc}
            </span>
            <span className="text-foreground truncate">{visitor.path}</span>
            <span className="text-muted-foreground ml-auto shrink-0 tabular-nums">
              {visitor.when}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Broken URLs with hit counts and the internal page that linked to them. */
export function NotFoundVignette() {
  const rows = [
    { path: "/pricing-2024", from: "from /blog/launch", count: "31" },
    { path: "/docs/old-install", from: "from /docs/overview", count: "12" },
  ];
  return (
    <div className="w-full space-y-1.5">
      {rows.map((row) => (
        <div
          key={row.path}
          className="border-border/60 bg-card rounded-md border px-2.5 py-2"
        >
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="bg-brand/10 text-brand rounded px-1 py-0.5 text-[9px] font-semibold tabular-nums">
                404
              </span>
              <span className="text-foreground truncate">{row.path}</span>
            </span>
            <span className="text-muted-foreground shrink-0 tabular-nums">
              {row.count}
            </span>
          </div>
          <div className="text-muted-foreground mt-1 truncate text-[10px]">
            {row.from}
          </div>
        </div>
      ))}
    </div>
  );
}
