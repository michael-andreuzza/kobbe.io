import { cn } from "@/lib/utils";

/**
 * Radically simplified fragments of Kobbe's own dashboard UI, used as the
 * capability grid mockups. Built from the product's design tokens (cards,
 * chips, lollipops, heatmap cells, inverted tooltips) instead of imagery.
 */

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

/** Mini lollipop chart with an inverted tooltip pinned to one day. */
export function AnnotationsVignette() {
  const stems = [42, 58, 34, 70, 96, 52, 64];
  const highlighted = 4;
  return (
    <div className="w-full pt-8">
      <div className="relative flex h-24 items-end justify-between px-1">
        {stems.map((height, index) => {
          const active = index === highlighted;
          return (
            <div
              key={index}
              className="relative flex h-full w-3 items-end justify-center"
            >
              {active ? (
                <>
                  <div
                    className="border-foreground/25 absolute inset-y-0 left-1/2 border-l border-dashed"
                    aria-hidden="true"
                  />
                  <div className="bg-foreground text-background absolute -top-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap shadow-md">
                    <span className="bg-brand size-1.5 rounded-[2px]" aria-hidden="true" />
                    Launch day
                  </div>
                </>
              ) : null}
              <div
                className="relative flex flex-col items-center"
                style={{ height: `${height}%` }}
              >
                <div
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    active ? "bg-brand" : "bg-foreground/75",
                  )}
                />
                <div
                  className={cn(
                    "w-px flex-1",
                    active ? "bg-brand" : "bg-foreground/40",
                  )}
                />
              </div>
            </div>
          );
        })}
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

/** Conversion heatmap cells with the peak hours in brand orange. */
export function InsightsVignette() {
  const cols = 8;
  const rows = 5;
  const level = (col: number, row: number) => {
    if ((col === 4 && row === 1) || (col === 5 && row === 1)) return 4;
    if (col === 4 && row === 2) return 3;
    // Everything outside the peak stays on the gray ramp.
    return (col * 5 + row * 3) % 3;
  };
  const cellClass = (value: number) =>
    value === 4
      ? "bg-brand"
      : value === 3
        ? "bg-brand/50"
        : value === 2
          ? "bg-foreground/20"
          : value === 1
            ? "bg-foreground/10"
            : "bg-foreground/5";
  return (
    <div
      className="grid w-full gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => (
          <div
            key={`${col}-${row}`}
            className={cn(
              "aspect-square w-full rounded-sm",
              cellClass(level(col, row)),
            )}
          />
        )),
      )}
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
