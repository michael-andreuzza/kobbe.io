import { Fragment } from "react";

import {
  HEATMAP_CELL_RADIUS_CLASS,
  HEATMAP_LEGEND_INTENSITIES,
  heatmapIntensityCellClass,
} from "@/lib/heatmap-intensity-class";
import { CHART_LEGEND_CHIP_RADIUS_CLASS } from "@/lib/chart-legend-chip";
import { cn } from "@/lib/utils";

export const CONVERSION_HEATMAP_DAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export type ConversionHeatmapCell = {
  dayOfWeek: number;
  hour: number;
  count: number;
};

function buildHeatmapGrid(cells: ConversionHeatmapCell[]) {
  const grid = Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => 0),
  );
  for (const cell of cells) {
    if (
      cell.dayOfWeek >= 0 &&
      cell.dayOfWeek <= 6 &&
      cell.hour >= 0 &&
      cell.hour <= 23
    ) {
      grid[cell.dayOfWeek]![cell.hour] = cell.count;
    }
  }
  const max = grid.reduce(
    (peak, dayRow) => Math.max(peak, ...dayRow),
    0,
  );
  return { grid, max };
}

function formatHeatmapTooltipTitle(dayLabel: string, hour: number): string {
  return `${dayLabel} ${hour}:00 UTC`;
}

function ConversionHeatmapLegendRow() {
  return (
    <>
      <div />
      <div
        className="col-span-24 flex items-center justify-start gap-1.5 pt-2 text-[0.6875rem] leading-relaxed text-muted-foreground"
        aria-hidden
      >
        <span>Less</span>
        <div className="flex items-center gap-0.5">
          {HEATMAP_LEGEND_INTENSITIES.map((intensity) => (
            <span
              key={intensity}
              className={cn(
                "size-2 shrink-0",
                CHART_LEGEND_CHIP_RADIUS_CLASS,
                heatmapIntensityCellClass(intensity),
              )}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </>
  );
}

export function ConversionHeatmapGrid(props: {
  cells: ConversionHeatmapCell[];
  className?: string;
  minWidthClass?: string;
}) {
  const { grid, max } = buildHeatmapGrid(props.cells);

  return (
    <div
      className={cn(
        "min-w-0 overflow-x-auto [contain:inline-size] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        props.className,
      )}
    >
      <div className={cn("w-full min-w-0", props.minWidthClass)}>
        <div className="grid w-full min-w-0 grid-cols-[2rem_repeat(24,minmax(0,1fr))] gap-0.5 text-[10px] text-muted-foreground">
          <div />
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={`hour-${hour}`} className="text-center tabular-nums">
              {hour % 3 === 0 ? `${hour}` : ""}
            </div>
          ))}
          {grid.map((dayRow, dayIndex) => (
            <Fragment key={`day-${dayIndex}`}>
              <div className="flex items-center pr-1 text-[0.625rem] leading-none text-muted-foreground">
                {CONVERSION_HEATMAP_DAY_LABELS[dayIndex]}
              </div>
              {dayRow.map((count, hour) => {
                const intensity = max > 0 ? count / max : 0;
                const dayLabel = CONVERSION_HEATMAP_DAY_LABELS[dayIndex] ?? "?";
                const tooltipLabel = `${formatHeatmapTooltipTitle(dayLabel, hour)}, ${count.toLocaleString()} events`;

                return (
                  <span
                    key={`${dayIndex}-${hour}`}
                    className={cn(
                      "block aspect-square w-full min-w-0",
                      HEATMAP_CELL_RADIUS_CLASS,
                      heatmapIntensityCellClass(intensity),
                    )}
                    title={tooltipLabel}
                    aria-label={tooltipLabel}
                  />
                );
              })}
            </Fragment>
          ))}
          <ConversionHeatmapLegendRow />
        </div>
      </div>
    </div>
  );
}
