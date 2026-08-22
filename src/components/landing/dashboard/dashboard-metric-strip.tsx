import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DashboardMetricStripProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  lgCols: 4 | 5 | 6 | 7;
};

export function DashboardMetricStrip(props: DashboardMetricStripProps) {
  const lgColsClass =
    props.lgCols === 7
      ? "lg:grid-cols-7"
      : props.lgCols === 6
        ? "lg:grid-cols-6"
        : props.lgCols === 5
          ? "lg:grid-cols-5"
          : "lg:grid-cols-4";

  return (
    <section
      className={cn("-mx-2 p-2", props.className)}
      aria-label={props.ariaLabel}
    >
      <div
        className={cn(
          "relative grid grid-cols-2 gap-4 sm:grid-cols-3",
          lgColsClass,
        )}
      >
        {props.children}
      </div>
    </section>
  );
}

type DashboardMetricTileProps = {
  children: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  surface?: "card" | "muted";
};

const metricTileBorderClass = "";

const metricTileBaseClass =
  "relative flex min-h-0 min-w-0 flex-col p-4 lg:min-h-32 text-left text-foreground transition-[background-color,box-shadow,color,transform,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

/* Same elevated chrome as the app KPI tiles: AlignUI shadow + dark sheen. */
const metricTileElevatedClass =
  "shadow-sm dark:bg-linear-to-b dark:from-white/3 dark:to-white/0";

const metricTileCardClass = cn(
  metricTileBaseClass,
  "rounded-xl bg-card",
  metricTileElevatedClass,
  metricTileBorderClass,
);

const metricTileMutedClass = cn(
  metricTileBaseClass,
  "rounded-xl bg-card",
  metricTileElevatedClass,
  metricTileBorderClass,
);

const metricTileInteractiveMutedClass =
  "cursor-pointer hover:shadow-md hover:ring-0 dark:hover:bg-accent dark:hover:shadow-sm";

export function DashboardMetricTile(props: DashboardMetricTileProps) {
  const surface = props.surface ?? "card";
  const isInteractive = Boolean(props.onClick);
  const className = cn(
    surface === "muted" ? metricTileMutedClass : metricTileCardClass,
    surface === "muted" && isInteractive && metricTileInteractiveMutedClass,
    props.active &&
      // Light: inverted (dark tile, light text). Dark: soft wash slightly
      // lighter than the hover accent — no full white inversion.
      "border-transparent bg-foreground text-background ring-0 hover:bg-foreground hover:shadow-sm dark:bg-foreground/20 dark:text-foreground dark:ring-1 dark:ring-foreground/10 dark:bg-none dark:hover:bg-foreground/20",
    props.className,
  );

  if (props.onClick) {
    return (
      <button
        type="button"
        className={cn("group w-full", className)}
        onClick={props.onClick}
        aria-pressed={props.active}
        data-active={props.active ? "true" : "false"}
        data-dashboard-metric-tile
        data-kobbe-stagger
      >
        {props.children}
      </button>
    );
  }

  return (
    <div
      className={className}
      data-active={props.active ? "true" : "false"}
      data-dashboard-metric-tile
      data-kobbe-stagger
    >
      {props.children}
    </div>
  );
}
