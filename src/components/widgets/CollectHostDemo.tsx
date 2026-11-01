import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Loading03Icon } from "@hugeicons/core-free-icons";

import { ARRIVE, DemoCursor, cursorDriver, sleep } from "./demo-cursor";

/**
 * A miniature of Site settings → First-party collect: the cursor types a
 * subdomain and connects it, the app asks for the CNAME while DNS and SSL
 * verify, and the active collect host replaces the form. Disconnect resets it.
 */

const HOST = "data.example.com";
const TARGET = "collect.kobbe.io";

type Phase = "form" | "pending" | "active";

type Scene = {
  phase: Phase;
  typed: string;
  focus: boolean;
  hot: "" | "connect" | "disconnect";
};

const START: Scene = { phase: "form", typed: "", focus: false, hot: "" };
const POSTER: Scene = { ...START, phase: "active", typed: HOST };

export default function CollectHostDemo() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.6 });
  const [scene, setScene] = useState<Scene>(START);

  const shown = reduceMotion ? POSTER : scene;

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let cancelled = false;
    const root = rootRef.current;
    const cursor = cursorRef.current;
    if (!root || !cursor) return;

    const { pointAt, place, moveTo, press } = cursorDriver(root, cursor);
    const rest = () => ({
      x: root.offsetWidth - 40,
      y: root.offsetHeight - 28,
    });
    const set = (patch: Partial<Scene>) => {
      if (!cancelled) setScene((s) => ({ ...s, ...patch }));
    };

    const run = async () => {
      await place(rest());
      while (!cancelled) {
        await sleep(500);
        await moveTo(pointAt("input", 0.3, 0.55));
        if (cancelled) break;
        await press();
        set({ focus: true });
        await sleep(250);
        for (let i = 1; i <= HOST.length && !cancelled; i++) {
          set({ typed: HOST.slice(0, i) });
          await sleep(55);
        }
        await sleep(350);

        await moveTo(pointAt("connect", 0.5, 0.6));
        if (cancelled) break;
        set({ hot: "connect" });
        await sleep(160);
        await press();
        set({ hot: "", focus: false, phase: "pending" });
        await moveTo(rest());
        await sleep(1900);
        if (cancelled) break;
        set({ phase: "active" });
        await sleep(2200);

        await moveTo(pointAt("disconnect", 0.5, 0.6));
        if (cancelled) break;
        set({ hot: "disconnect" });
        await sleep(160);
        await press();
        set({ ...START });
        await moveTo(rest());
        await sleep(600);
      }
    };

    void run();
    return () => {
      cancelled = true;
      setScene(START);
    };
  }, [inView, reduceMotion]);

  const fade = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.3, ease: ARRIVE },
  };

  return (
    <div
      ref={rootRef}
      className="bg-background shadow-panel-lifted relative flex w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground text-sm font-medium">
          First-party collect
        </span>
      </div>
      <div className="relative h-52 px-4 py-3.5 text-xs">
        <AnimatePresence mode="wait" initial={false}>
          {shown.phase === "active" ? (
            <motion.div key="active" className="flex flex-col" {...fade}>
              <div className="flex items-start gap-3">
                <div className="flex flex-1 flex-col">
                  <span className="text-foreground font-medium">
                    Active collect host
                  </span>
                  <span className="text-muted-foreground mt-0.5 text-balance">
                    Your install snippet already uses this origin.
                  </span>
                </div>
                <span
                  data-target="disconnect"
                  className={`border-border text-foreground flex h-7 shrink-0 items-center rounded-md border px-2.5 font-medium shadow-xs transition-colors ${
                    shown.hot === "disconnect" ? "bg-muted-surface" : ""
                  }`}
                >
                  Disconnect
                </span>
              </div>
              <div className="border-border/60 mt-3.5 flex items-center gap-3 border-t pt-3">
                <span className="text-foreground flex-1 truncate font-medium">
                  {HOST}
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <HugeiconsIcon
                    icon={Copy01Icon}
                    size={12}
                    strokeWidth={1.8}
                  />
                  Copy
                </span>
              </div>
              <span className="bg-success/5 text-success mt-3 self-start rounded-md px-2 py-1 font-medium">
                DNS and SSL verified
              </span>
            </motion.div>
          ) : (
            <motion.div key="form" className="flex flex-col" {...fade}>
              <span className="text-foreground font-medium">
                Your collect subdomain
              </span>
              <span className="text-muted-foreground mt-0.5 text-balance">
                Point a subdomain on example.com with a CNAME record.
              </span>
              <div className="mt-2.5 flex items-center gap-2">
                <span
                  data-target="input"
                  className={`border-border flex h-7 min-w-0 flex-1 items-center rounded-md border px-2.5 shadow-xs transition-shadow ${
                    shown.focus ? "ring-foreground/15 ring-2" : ""
                  }`}
                >
                  {shown.typed ? (
                    <span className="text-foreground truncate">
                      {shown.typed}
                    </span>
                  ) : (
                    <span className="text-muted-foreground/70">{HOST}</span>
                  )}
                  {shown.focus ? (
                    <span className="bg-foreground ml-px h-3.5 w-px animate-pulse" />
                  ) : null}
                </span>
                <span
                  data-target="connect"
                  className={`border-border text-foreground flex h-7 shrink-0 items-center rounded-md border px-2.5 font-medium shadow-xs transition-colors ${
                    shown.hot === "connect" ? "bg-muted-surface" : ""
                  }`}
                >
                  Connect
                </span>
              </div>
              <AnimatePresence initial={false}>
                {shown.phase === "pending" ? (
                  <motion.div
                    key="pending"
                    className="bg-caution/10 mt-3 flex flex-col rounded-md px-3 py-2.5"
                    {...fade}
                  >
                    <span className="text-foreground flex items-center justify-between font-medium">
                      DNS setup required
                      <HugeiconsIcon
                        icon={Loading03Icon}
                        size={12}
                        strokeWidth={1.8}
                        className="text-muted-foreground animate-spin"
                      />
                    </span>
                    <span className="text-muted-foreground mt-0.5">
                      Create a CNAME from {HOST} to {TARGET}.
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <DemoCursor ref={cursorRef} />
    </div>
  );
}
