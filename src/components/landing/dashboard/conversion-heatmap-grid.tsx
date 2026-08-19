import { Fragment } from "react";

import {
  HEATMAP_CELL_RADIUS_CLASS,
  HEATMAP_LEGEND_INTENSITIES,
  heatmapIntensityCellClass,
  heatmapIntensityLabelClass,
  scaleHeatmapIntensity,
  type HeatmapIntensityTone,
} from "@/lib/heatmap-intensity-class";
import { CHART_LEGEND_CHIP_RADIUS_CLASS } from "@/lib/chart-legend-chip";
import { cn } from "@/lib/utils";

/** SQLite / JS weekday index: 0 = Sun … 6 = Sat. Display Mon → Sun. */
export const CONVERSION_HEATMAP_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

export const CONVERSION_HEATMAP_DAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
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

  const rowTotals = grid.map((dayRow) =>
    dayRow.reduce((sum, count) => sum + count, 0),
  );
  const columnTotals = Array.from({ length: 24 }, (_, hour) =>
    grid.reduce((sum, dayRow) => sum + dayRow[hour]!, 0),
  );
  const grandTotal = rowTotals.reduce((sum, count) => sum + count, 0);
  const maxCell = grid.reduce(
    (peak, dayRow) => Math.max(peak, ...dayRow),
    0,
  );
  const maxRowTotal = rowTotals.reduce(
    (peak, count) => Math.max(peak, count),
    0,
  );
  const maxColumnTotal = columnTotals.reduce(
    (peak, count) => Math.max(peak, count),
    0,
  );

  return {
    grid,
    rowTotals,
    columnTotals,
    grandTotal,
    maxCell,
    maxRowTotal,
    maxColumnTotal,
  };
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
      <div />
    </>
  );
}

function HeatmapCell(props: {
  count: number;
  intensity: number;
  tone?: HeatmapIntensityTone;
  tooltipTitle: string;
  compact?: boolean;
  className?: string;
}) {
  const tone = props.tone ?? "grid";
  const tooltipLabel = `${props.tooltipTitle}, ${props.count.toLocaleString()} events`;

  return (
    <span
      className={cn(
        "flex aspect-square w-full min-w-0 items-center justify-center font-medium tabular-nums leading-none",
        props.compact ? "text-[0.5rem]" : "text-[0.5625rem]",
        HEATMAP_CELL_RADIUS_CLASS,
        heatmapIntensityCellClass(props.intensity, tone),
        heatmapIntensityLabelClass(props.intensity, tone),
        props.className,
      )}
      title={tooltipLabel}
      aria-label={tooltipLabel}
    >
      {props.count}
    </span>
  );
}

export function ConversionHeatmapGrid(props: {
  cells: ConversionHeatmapCell[];
  className?: string;
  minWidthClass?: string;
}) {
  const {
    grid,
    rowTotals,
    columnTotals,
    grandTotal,
    maxCell,
    maxRowTotal,
    maxColumnTotal,
  } = buildHeatmapGrid(props.cells);

  return (
    <div
      className={cn(
        "min-w-0 overflow-x-auto [contain:inline-size] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        props.className,
      )}
    >
      <div className={cn("w-full min-w-0", props.minWidthClass)}>
        <div className="grid w-full min-w-0 grid-cols-[2rem_repeat(24,minmax(0,1fr))_2.25rem] gap-0.5 text-[10px] text-muted-foreground">
          <div />
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={`hour-${hour}`} className="text-center tabular-nums">
              {hour % 3 === 0 ? `${hour}` : ""}
            </div>
          ))}
          <div className="text-center text-[0.625rem] leading-none">All</div>

          {CONVERSION_HEATMAP_DAY_ORDER.map((dayIndex, displayIndex) => {
            const dayRow = grid[dayIndex]!;
            const dayLabel = CONVERSION_HEATMAP_DAY_LABELS[displayIndex] ?? "?";
            const rowTotal = rowTotals[dayIndex] ?? 0;

            return (
              <Fragment key={`day-${dayIndex}`}>
                <div className="flex items-center pr-1 text-[0.625rem] leading-none text-muted-foreground">
                  {dayLabel}
                </div>
                {dayRow.map((count, hour) => (
                  <HeatmapCell
                    key={`${dayIndex}-${hour}`}
                    count={count}
                    intensity={scaleHeatmapIntensity(count, maxCell)}
                    compact
                    tooltipTitle={`${dayLabel} ${hour}:00 UTC`}
                  />
                ))}
                <HeatmapCell
                  count={rowTotal}
                  intensity={scaleHeatmapIntensity(rowTotal, maxRowTotal)}
                  tone="total"
                  tooltipTitle={`${dayLabel} total`}
                />
              </Fragment>
            );
          })}

          <div className="flex items-center pr-1 text-[0.625rem] leading-none text-muted-foreground">
            All
          </div>
          {columnTotals.map((count, hour) => (
            <HeatmapCell
              key={`col-total-${hour}`}
              count={count}
              intensity={scaleHeatmapIntensity(count, maxColumnTotal)}
              tone="total"
              tooltipTitle={`${hour}:00 UTC total`}
            />
          ))}
          <HeatmapCell
            count={grandTotal}
            intensity={scaleHeatmapIntensity(
              grandTotal,
              Math.max(maxRowTotal, maxColumnTotal, grandTotal),
            )}
            tone="total"
            tooltipTitle="Total"
          />

          <ConversionHeatmapLegendRow />
        </div>
      </div>
    </div>
  );
}
