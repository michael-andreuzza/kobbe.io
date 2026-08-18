"use client";

import { useReducedMotion } from "motion/react";

import {
  HEATMAP_CELL_RADIUS_CLASS,
  heatmapIntensityCellClass,
} from "@/lib/heatmap-intensity-class";
import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

/**
 * Cropped slice of the app's conversion peak heatmap (7 days x 12 midday hours)
 * at the same compact cell size as the live dashboard chart.
 */
const PREVIEW_HOURS = 12;

function buildPreviewHeatmapGrid(): number[][] {
  const grid = Array.from({ length: 7 }, () =>
    Array.from({ length: PREVIEW_HOURS }, () => 0),
  );

  for (let day = 0; day < 7; day += 1) {
    const isWeekend = day === 0 || day === 6;
    const weekdayScale = isWeekend ? 0.3 : 1;

    for (let col = 0; col < PREVIEW_HOURS; col += 1) {
      const hour = col + 8;
      const middayBoost =
        hour >= 10 && hour <= 18
          ? 0.18 + (hour >= 13 && hour <= 16 ? 0.22 : 0.12)
          : 0.08;

      grid[day]![col] = Math.min(0.82, weekdayScale * middayBoost);
    }
  }

  grid[2]![6] = 0.82;
  grid[2]![7] = 1;
  grid[2]![8] = 0.88;
  grid[4]![3] = 0.72;
  grid[4]![4] = 0.78;

  return grid;
}

const PREVIEW_GRID = buildPreviewHeatmapGrid();

export function InsightsHeatmapPreview() {
  const shouldReduceMotion = useReducedMotion();
  const motionEnabled = !shouldReduceMotion;

  return (
    <div
      className={cn(
        capabilityMockupSurfaceClass,
        "w-full overflow-hidden p-3 sm:p-3.5",
      )}
    >
      {motionEnabled ? (
        <style>{`
          @keyframes kobbeHeatmapPreviewCellReveal {
            from {
              opacity: 0;
              transform: scale(0.78);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .kobbe-heatmap-preview-cell {
            animation: kobbeHeatmapPreviewCellReveal 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
            transition: transform 280ms ease, opacity 280ms ease;
          }

          .group:hover .kobbe-capability-mockup .kobbe-heatmap-preview-cell {
            transform: scale(1.04);
          }
        `}</style>
      ) : null}
      <div className="grid w-full min-w-0 grid-cols-12 gap-0.5">
        {PREVIEW_GRID.flatMap((dayRow, dayIndex) =>
          dayRow.map((intensity, col) => {
            const cellIndex = dayIndex * PREVIEW_HOURS + col;

            return (
              <div
                key={`${dayIndex}-${col}`}
                className={cn(
                  "aspect-square w-full min-w-0",
                  HEATMAP_CELL_RADIUS_CLASS,
                  heatmapIntensityCellClass(intensity),
                  motionEnabled && "kobbe-heatmap-preview-cell",
                )}
                style={
                  motionEnabled
                    ? { animationDelay: `${cellIndex * 16}ms` }
                    : undefined
                }
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
