import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { ARRIVE, DemoCursor, cursorDriver, sleep } from "./demo-cursor";

/**
 * A miniature of the revenue dashboard's Attribution breakdown card: the
 * cursor switches from Landing pages to First source and back, and the
 * revenue follows each sale to the page or source that brought it in.
 */

const TABS = ["Landing pages", "First source", "Last source"] as const;
type Tab = (typeof TABS)[number];

const ROWS: Partial<
  Record<Tab, { label: string; orders: number; revenue: string }[]>
> = {
  "Landing pages": [
    { label: "/blog/launch", orders: 9, revenue: "$891" },
    { label: "/pricing", orders: 6, revenue: "$594" },
    { label: "/", orders: 4, revenue: "$396" },
  ],
  "First source": [
    { label: "x.com", orders: 8, revenue: "$792" },
    { label: "google.com", orders: 7, revenue: "$693" },
    { label: "Direct", orders: 4, revenue: "$396" },
  ],
};

export default function RevenueJourneyDemo() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.6 });
  const [tab, setTab] = useState<Tab>("Landing pages");
  const [hot, setHot] = useState<Tab | null>(null);

  const shown: Tab = reduceMotion ? "First source" : tab;
  const rows = ROWS[shown] ?? [];

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let cancelled = false;
    const root = rootRef.current;
    const cursor = cursorRef.current;
    if (!root || !cursor) return;

    const { pointAt, place, moveTo, press } = cursorDriver(root, cursor);
    const rest = () => ({
      x: root.offsetWidth - 44,
      y: root.offsetHeight - 24,
    });
    const pick = async (next: Tab) => {
      await moveTo(pointAt(next, 0.5, 0.6));
      if (cancelled) return;
      setHot(next);
      await sleep(180);
      await press();
      if (cancelled) return;
      setHot(null);
      setTab(next);
      await sleep(250);
      await moveTo(rest());
    };

    const run = async () => {
      await place(rest());
      while (!cancelled) {
        await sleep(900);
        await pick("First source");
        if (cancelled) break;
        await sleep(2200);
        await pick("Landing pages");
        if (cancelled) break;
        await sleep(1600);
      }
    };

    void run();
    return () => {
      cancelled = true;
      setTab("Landing pages");
      setHot(null);
    };
  }, [inView, reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="bg-background shadow-panel-lifted relative flex w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground text-sm font-medium">
          Attribution breakdown
        </span>
      </div>
      <div className="flex px-4 pt-3 text-xs font-medium">
        {TABS.map((name) => (
          <span
            key={name}
            data-target={name}
            className={`relative flex h-7 shrink-0 items-center rounded-md px-2 transition-colors ${
              name === shown || name === hot
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {name === shown ? (
              <motion.span
                layoutId="revenue-journey-tab"
                className="bg-muted-surface absolute inset-0 rounded-md"
                transition={{ duration: 0.3, ease: ARRIVE }}
              />
            ) : null}
            <span className="relative">{name}</span>
          </span>
        ))}
      </div>
      <div className="px-4 pt-3 pb-4 text-xs">
        <div className="text-muted-foreground flex pb-2">
          <span className="flex-1">
            {shown === "Landing pages" ? "Page" : "Source"}
          </span>
          <span className="w-12 text-right">Orders</span>
          <span className="w-16 text-right">Revenue</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={shown}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: ARRIVE }}
          >
            {rows.map((row) => (
              <li
                key={row.label}
                className="border-border/60 flex items-center border-t py-2"
              >
                <span className="text-foreground flex-1 truncate font-medium">
                  {row.label}
                </span>
                <span className="text-muted-foreground w-12 text-right tabular-nums">
                  {row.orders}
                </span>
                <span className="text-foreground w-16 text-right font-medium tabular-nums">
                  {row.revenue}
                </span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
      {reduceMotion ? null : <DemoCursor ref={cursorRef} />}
    </div>
  );
}
