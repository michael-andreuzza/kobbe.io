"use client";

import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

const VISITOR_MARKERS = [
  { x: 26, y: 58, large: false },
  { x: 74, y: 52, large: true },
  { x: 168, y: 44, large: false },
  { x: 182, y: 42, large: false },
] as const;

export function RealtimePreview() {
  return (
    <div
      className={cn(
        capabilityMockupSurfaceClass,
        "relative h-36 w-full overflow-hidden",
      )}
    >
      <svg
        viewBox="0 0 360 144"
        className="text-background h-full w-full"
        aria-hidden
      >
        <rect width="360" height="144" className="fill-background" />

        <g className="fill-muted">
          <path d="M 8 52 C 18 34 44 28 72 34 C 98 38 112 48 108 62 C 104 76 86 84 62 82 C 38 80 18 68 8 52 Z" />
          <path d="M 58 88 C 68 78 82 76 94 84 C 104 92 98 108 84 112 C 70 116 54 104 58 88 Z" />
          <path d="M 148 46 C 164 38 188 40 204 48 C 214 54 212 66 198 72 C 182 78 158 72 148 62 Z" />
          <path d="M 168 72 C 182 66 198 68 208 78 C 216 86 210 102 194 108 C 178 114 162 104 168 72 Z" />
          <path d="M 228 54 C 244 48 262 52 270 64 C 276 74 266 84 250 82 C 234 80 224 66 228 54 Z" />
        </g>

        {VISITOR_MARKERS.map((marker, index) => (
          <circle
            key={index}
            cx={marker.x}
            cy={marker.y}
            r={marker.large ? 8 : 7}
            className="fill-foreground stroke-card"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="border-border bg-card/95 pointer-events-none absolute top-2 right-2 flex flex-col overflow-hidden rounded-md border">
        <span className="border-border text-muted-foreground flex size-6 items-center justify-center border-b text-xs leading-none">
          +
        </span>
        <span className="text-muted-foreground flex size-6 items-center justify-center text-xs leading-none">
          −
        </span>
      </div>
    </div>
  );
}
