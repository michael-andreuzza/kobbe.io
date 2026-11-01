import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

import { ARRIVE, TRAVEL, sleep } from "./demo-cursor";

/**
 * A miniature of the dashboard's Sources card on its Bots tab: each incoming
 * hit is tagged with why it was filtered and drops into that reason, so the
 * count goes up while nothing reaches the stats.
 */

const TABS = ["Referrers", "Channels", "AI", "Bots"];

const REASONS = [
  { key: "webdriver", label: "Browser automation" },
  { key: "client", label: "Automated client" },
  { key: "datacenter", label: "Datacenter traffic" },
  { key: "isbot", label: "Known bot signature" },
] as const;
type Reason = (typeof REASONS)[number]["key"];

const START: Record<Reason, number> = {
  webdriver: 412,
  client: 356,
  datacenter: 281,
  isbot: 155,
};

const HITS: { label: string; reason: Reason }[] = [
  { label: "Headless Chrome, webdriver: true", reason: "webdriver" },
  { label: "python-requests/2.32", reason: "client" },
  { label: "Chrome 141 from an AWS server", reason: "datacenter" },
];

export default function BotAutomationDemo() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.6 });
  const [counts, setCounts] = useState(START);
  const [hit, setHit] = useState(HITS[0]!);
  const [bumped, setBumped] = useState<Reason | null>(null);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let cancelled = false;
    const root = rootRef.current;
    const chip = chipRef.current;
    if (!root || !chip) return;

    const run = async () => {
      let i = 0;
      while (!cancelled) {
        const next = HITS[i % HITS.length]!;
        setHit(next);
        await animate(chip, { y: -6, opacity: 0, scale: 1 }, { duration: 0 });
        await sleep(500);
        if (cancelled) break;
        await animate(
          chip,
          { y: 0, opacity: 1 },
          { duration: 0.4, ease: ARRIVE },
        );
        await sleep(900);
        if (cancelled) break;

        const row = root.querySelector<HTMLElement>(
          `[data-reason="${next.reason}"]`,
        );
        const from = chip.getBoundingClientRect();
        const to = row?.getBoundingClientRect();
        const dy = to
          ? to.top + to.height / 2 - (from.top + from.height / 2)
          : 40;
        await animate(
          chip,
          { y: dy, opacity: 0, scale: 0.92 },
          { duration: 0.6, ease: TRAVEL },
        );
        if (cancelled) break;
        setCounts((c) => ({ ...c, [next.reason]: c[next.reason] + 1 }));
        setBumped(next.reason);
        await sleep(700);
        setBumped(null);
        await sleep(600);
        i++;
      }
    };

    void run();
    return () => {
      cancelled = true;
      setCounts(START);
      setBumped(null);
    };
  }, [inView, reduceMotion]);

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const max = Math.max(...Object.values(counts));

  return (
    <div
      ref={rootRef}
      className="bg-background shadow-panel-lifted relative flex w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground block text-sm font-medium">
          Sources
        </span>
        <span className="text-muted-foreground mt-0.5 block text-xs tabular-nums">
          {total.toLocaleString("en-US")} hits kept out of stats, 11% of
          requests
        </span>
      </div>
      <div className="flex px-4 pt-3 text-xs font-medium">
        {TABS.map((name) => (
          <span
            key={name}
            className={`flex h-7 items-center rounded-md px-2 ${
              name === "Bots"
                ? "bg-muted-surface text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="px-4 pt-3 pb-4 text-xs">
        <div className="flex h-7 items-center">
          <div
            ref={chipRef}
            className={`border-border text-foreground flex h-7 items-center gap-1.5 rounded-md border px-2.5 shadow-xs ${
              reduceMotion ? "" : "opacity-0"
            }`}
          >
            <span className="bg-caution size-1.5 rounded-full" />
            {hit.label}
          </div>
        </div>
        <ul className="mt-2 flex flex-col gap-1">
          {REASONS.map((reason) => (
            <li
              key={reason.key}
              data-reason={reason.key}
              className="relative flex h-7 items-center px-2"
            >
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-md transition-colors duration-300 ${
                  bumped === reason.key ? "bg-caution/20" : "bg-muted-surface"
                }`}
                initial={false}
                animate={{ width: `${(counts[reason.key] / max) * 100}%` }}
                transition={{ duration: 0.4, ease: ARRIVE }}
              />
              <span className="text-foreground relative flex-1 truncate">
                {reason.label}
              </span>
              <span className="text-foreground relative tabular-nums">
                {counts[reason.key].toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
