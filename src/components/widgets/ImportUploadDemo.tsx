import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  Zip01Icon,
} from "@hugeicons/core-free-icons";

import { ARRIVE, DemoCursor, cursorDriver, sleep } from "./demo-cursor";

/**
 * A miniature of Site settings → Import history: the cursor drops a
 * Plausible ZIP on the dropzone, starts the import, and the app's success
 * toast lands. The dropzone clears after the import, as it does in the app.
 */

const FILE = "plausible-export.zip";

type Scene = {
  dragging: boolean;
  over: boolean;
  file: boolean;
  hot: boolean;
  importing: boolean;
  toast: boolean;
};

const START: Scene = {
  dragging: false,
  over: false,
  file: false,
  hot: false,
  importing: false,
  toast: false,
};
const POSTER: Scene = { ...START, file: true, toast: true };

export default function ImportUploadDemo(props: { logoSrc: string }) {
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
      x: root.offsetWidth - 36,
      y: root.offsetHeight - 96,
    });
    const set = (patch: Partial<Scene>) => {
      if (!cancelled) setScene((s) => ({ ...s, ...patch }));
    };

    const run = async () => {
      await place(rest());
      while (!cancelled) {
        await sleep(600);
        set({ dragging: true });
        await sleep(350);
        await moveTo(pointAt("drop", 0.55, 0.5));
        if (cancelled) break;
        set({ over: true });
        await sleep(400);
        await press();
        set({ dragging: false, over: false, file: true });
        await sleep(600);

        await moveTo(pointAt("start", 0.5, 0.6));
        if (cancelled) break;
        set({ hot: true });
        await sleep(180);
        await press();
        set({ hot: false, importing: true });
        await sleep(1500);
        if (cancelled) break;
        set({ importing: false, toast: true });
        await moveTo(rest());
        await sleep(2400);
        if (cancelled) break;
        set({ toast: false, file: false });
        await sleep(700);
      }
    };

    void run();
    return () => {
      cancelled = true;
      setScene(START);
    };
  }, [inView, reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="bg-background shadow-panel-lifted relative flex w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground text-sm font-medium">
          Import history
        </span>
      </div>
      <div className="flex flex-col px-4 py-3.5 text-xs">
        <span className="text-foreground font-medium">Import from</span>
        <span className="border-border text-foreground mt-2 flex h-8 items-center gap-2 rounded-md border px-2.5 shadow-xs">
          <img
            src={props.logoSrc}
            alt=""
            width={16}
            height={16}
            className="size-4 rounded-sm"
          />
          Plausible
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={12}
            strokeWidth={1.8}
            className="text-muted-foreground ml-auto"
          />
        </span>
        <div
          data-target="drop"
          className={`mt-3 flex h-24 flex-col items-center justify-center gap-1 rounded-md border border-dashed px-4 text-center transition-colors duration-200 ${
            shown.over
              ? "border-foreground/40 bg-muted-surface"
              : "border-border"
          } ${shown.importing ? "opacity-50" : ""}`}
        >
          <span className="text-foreground font-medium">
            {shown.file ? FILE : "Drop ZIP file here"}
          </span>
          <span className="text-muted-foreground">
            {shown.file
              ? "Click or drop another file to replace"
              : "Plausible full export, click to browse"}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="border-border text-foreground flex h-7 flex-1 items-center rounded-md border px-2.5 shadow-xs">
            Fill gaps only
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={12}
              strokeWidth={1.8}
              className="text-muted-foreground ml-auto"
            />
          </span>
          <span
            data-target="start"
            className={`bg-foreground text-background flex h-7 items-center rounded-md px-2.5 font-medium shadow-xs transition-opacity ${
              shown.hot ? "opacity-85" : ""
            } ${shown.importing ? "opacity-60" : ""}`}
          >
            {shown.importing ? "Importing..." : "Start import"}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {shown.toast ? (
          <motion.div
            className="bg-background shadow-panel-lifted absolute inset-x-3 -bottom-4 flex items-start gap-2 rounded-lg p-3 text-xs"
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: ARRIVE }}
          >
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={16}
              strokeWidth={1.8}
              className="text-success shrink-0"
            />
            <span className="text-foreground">
              Imported 412 days from Plausible. You're all set.
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {reduceMotion ? null : (
        <DemoCursor ref={cursorRef}>
          {shown.dragging ? (
            <motion.span
              className="bg-background shadow-panel-lifted text-foreground absolute top-4 left-3 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <HugeiconsIcon
                icon={Zip01Icon}
                size={14}
                strokeWidth={1.8}
                className="text-muted-foreground"
              />
              {FILE}
            </motion.span>
          ) : null}
        </DemoCursor>
      )}
    </div>
  );
}
