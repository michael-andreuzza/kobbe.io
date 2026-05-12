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
    <section className={cn("mt-4", props.className)} aria-label={props.ariaLabel}>
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
};

const metricTileClass =
  "relative min-w-0 rounded-md bg-card p-3 text-left text-foreground transition-[background-color,box-shadow,color,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

export function DashboardMetricTile(props: DashboardMetricTileProps) {
  const activeStyle =
    props.active && props.activeColor
      ? ({
          "--metric-active-color": props.activeColor,
        } as CSSProperties)
      : undefined;
  const className = cn(
    metricTileClass,
    props.active &&
      "bg-[color-mix(in_oklch,var(--metric-active-color,var(--foreground))_15%,transparent)] text-foreground dark:bg-[color-mix(in_oklch,var(--metric-active-color,var(--foreground))_30%,transparent)]",
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
