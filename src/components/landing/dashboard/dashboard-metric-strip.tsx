import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DashboardMetricStripProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  lgCols: 4 | 5 | 6;
};

export function DashboardMetricStrip(props: DashboardMetricStripProps) {
  const lgColsClass =
    props.lgCols === 6
      ? "lg:grid-cols-6"
      : props.lgCols === 5
        ? "lg:grid-cols-5"
        : "lg:grid-cols-4";

  return (
    <section
      className={cn("mt-2 -mx-2 p-2", props.className)}
      aria-label={props.ariaLabel}
    >
      <div className={cn("relative grid grid-cols-2 gap-3 sm:grid-cols-3", lgColsClass)}>
        {props.children}
      </div>
    </section>
  );
}

type DashboardMetricTileProps = {
  children: ReactNode;
  active?: boolean;
  activeColor?: string;
  className?: string;
  onClick?: () => void;
  surface?: "card" | "muted";
};

const metricTileBaseClass =
  "relative min-w-0 p-4 lg:aspect-square text-left text-foreground transition-[background-color,box-shadow,color,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

const metricTileCardClass = cn(metricTileBaseClass, "rounded-md border bg-card");

const metricTileMutedClass = cn(
  metricTileBaseClass,
  "rounded-xl bg-background",
);

const metricTileInteractiveMutedClass = "cursor-pointer hover:bg-surface hover:ring-0";

export function DashboardMetricTile(props: DashboardMetricTileProps) {
  const surface = props.surface ?? "card";
  const isInteractive = Boolean(props.onClick);
  const activeStyle =
    props.active && props.activeColor
      ? ({
          "--metric-active-color": props.activeColor,
        } as CSSProperties)
      : undefined;
  const className = cn(
    surface === "muted" ? metricTileMutedClass : metricTileCardClass,
    surface === "muted" && isInteractive && metricTileInteractiveMutedClass,
    props.active && "bg-foreground text-background ring-0 hover:bg-foreground",
    props.className,
  );

  if (props.onClick) {
    return (
      <button
        type="button"
        className={cn("group w-full", className)}
        style={activeStyle}
        onClick={props.onClick}
        aria-pressed={props.active}
        data-active={props.active ? "true" : "false"}
        data-dashboard-metric-tile
      >
        {props.children}
      </button>
    );
  }

  return (
    <div
      className={className}
      style={activeStyle}
      data-active={props.active ? "true" : "false"}
      data-dashboard-metric-tile
    >
      {props.children}
    </div>
  );
}
