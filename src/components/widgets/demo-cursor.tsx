import { forwardRef, type ReactNode } from "react";
import { animate } from "motion/react";

export const TRAVEL = [0.45, 0, 0.1, 1] as const;
export const ARRIVE = [0.25, 0.8, 0.25, 1] as const;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type Point = { x: number; y: number };

/**
 * Drives the demo cursor inside `root`: travel in a shallow arc, press with a
 * visible squeeze, and resolve targets by their `data-target` attribute.
 */
export function cursorDriver(root: HTMLElement, cursor: HTMLElement) {
  const pointAt = (target: string, fx = 0.5, fy = 0.5): Point | null => {
    const el = root.querySelector(`[data-target="${target}"]`);
    if (!el) return null;
    const box = root.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - box.left + r.width * fx,
      y: r.top - box.top + r.height * fy,
    };
  };

  const place = async (to: Point) => {
    cursor.dataset.x = String(to.x);
    cursor.dataset.y = String(to.y);
    await animate(cursor, { x: to.x, y: to.y, opacity: 0 }, { duration: 0 });
    await animate(cursor, { opacity: 1 }, { duration: 0.4 });
  };

  const moveTo = async (to: Point | null) => {
    if (!to) return;
    const from = {
      x: Number(cursor.dataset.x ?? 0),
      y: Number(cursor.dataset.y ?? 0),
    };
    const lift = Math.min(24, Math.hypot(to.x - from.x, to.y - from.y) * 0.15);
    const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - lift };
    cursor.dataset.x = String(to.x);
    cursor.dataset.y = String(to.y);
    await animate(
      cursor,
      { x: [from.x, mid.x, to.x], y: [from.y, mid.y, to.y] },
      { duration: 0.85, ease: TRAVEL },
    );
  };

  const press = async () => {
    await animate(cursor, { scale: 0.82 }, { duration: 0.09 });
    await animate(cursor, { scale: 1 }, { duration: 0.16 });
  };

  return { pointAt, place, moveTo, press };
}

export const DemoCursor = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  function DemoCursor({ children }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 opacity-0"
      >
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          className="drop-shadow-sm"
        >
          <path
            d="M1 1v15.5l4.2-4 2.9 6.6 2.6-1.1-2.9-6.5H14L1 1z"
            className="fill-foreground stroke-background"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </div>
    );
  },
);
