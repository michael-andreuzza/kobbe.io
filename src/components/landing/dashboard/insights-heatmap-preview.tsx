"use client";

import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

/**
 * Cropped slice of the app's conversion peak heatmap (7 days x 12 midday hours)
 * so cells render at their real size instead of shrinking into dots.
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
              opacity: var(--kobbe-heatmap-preview-opacity, 1);
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
      <div className="grid grid-cols-12 gap-0.5">
        {PREVIEW_GRID.flatMap((dayRow, dayIndex) =>
          dayRow.map((intensity, col) => {
            const opacity = intensity > 0 ? 0.15 + intensity * 0.85 : undefined;
            const cellIndex = dayIndex * PREVIEW_HOURS + col;

            return (
              <div
                key={`${dayIndex}-${col}`}
                className={cn(
                  "aspect-square rounded-sm border border-border/30",
                  intensity > 0 ? "bg-foreground" : "bg-muted/20",
                  motionEnabled && "kobbe-heatmap-preview-cell",
                )}
                style={{
                  ...(opacity != null
                    ? {
                        opacity,
                        ["--kobbe-heatmap-preview-opacity" as string]: opacity,
                      }
                    : undefined),
                  ...(motionEnabled
                    ? { animationDelay: `${cellIndex * 16}ms` }
                    : undefined),
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
