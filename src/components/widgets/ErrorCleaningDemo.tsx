import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { ARRIVE, sleep } from "./demo-cursor";

/**
 * An error message arriving from the page and the cleaning Kobbe applies
 * before storing it: emails and long numbers become placeholders and query
 * strings are dropped from URLs. Each new error restarts the loop.
 */

type Part = string | { raw: string; clean: string };

const EXAMPLES: { parts: Part[]; detail: string }[] = [
  {
    parts: [
      "No account for ",
      { raw: "anna@mail.com", clean: "[email]" },
      ", order ",
      { raw: "48213977", clean: "[number]" },
    ],
    detail: "login.js:44 on /login",
  },
  {
    parts: [
      "Coupon failed for ",
      { raw: "ben@site.io", clean: "[email]" },
      " at https://kobbe.io/checkout",
      { raw: "?coupon=SPRING", clean: "" },
    ],
    detail: "pay.js:12 on /checkout",
  },
];

type Phase = "raw" | "mark" | "clean";

export default function ErrorCleaningDemo() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.6 });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("raw");

  const shownPhase: Phase = reduceMotion ? "clean" : phase;
  const example = EXAMPLES[reduceMotion ? 0 : index]!;

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let cancelled = false;

    const run = async () => {
      let i = 0;
      while (!cancelled) {
        setIndex(i);
        setPhase("raw");
        await sleep(1300);
        if (cancelled) break;
        setPhase("mark");
        await sleep(900);
        if (cancelled) break;
        setPhase("clean");
        await sleep(2400);
        i = (i + 1) % EXAMPLES.length;
      }
    };

    void run();
    return () => {
      cancelled = true;
      setIndex(0);
      setPhase("raw");
    };
  }, [inView, reduceMotion]);

  const stored = shownPhase === "clean";

  return (
    <div
      ref={rootRef}
      className="bg-background shadow-panel-lifted flex w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground text-sm font-medium">
          JavaScript errors
        </span>
      </div>
      <div className="h-40 px-4 py-3.5 text-xs">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: ARRIVE }}
          >
            <div className="text-muted-foreground relative h-4">
              <AnimatePresence initial={false}>
                <motion.span
                  key={stored ? "stored" : "page"}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {stored ? "Stored" : "From the page"}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="bg-muted-surface text-foreground mt-2 rounded-md p-3 leading-5 font-medium wrap-break-word">
              {example.parts.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <Sensitive key={i} part={part} phase={shownPhase} />
                ),
              )}
            </p>
            <span className="text-muted-foreground mt-2 block">
              {example.detail}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Sensitive(props: {
  part: { raw: string; clean: string };
  phase: Phase;
}) {
  const clean = props.phase === "clean";
  const text = clean ? props.part.clean : props.part.raw;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {text ? (
        <motion.span
          key={clean ? "clean" : "raw"}
          className={`rounded-sm transition-colors duration-300 ${
            clean
              ? "bg-background text-muted-foreground px-0.5"
              : props.phase === "mark"
                ? "bg-caution/15"
                : ""
          }`}
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}
