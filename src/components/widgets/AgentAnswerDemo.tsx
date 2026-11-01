import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp02Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { ARRIVE, sleep } from "./demo-cursor";

/**
 * An agent answering a revenue question through the Kobbe MCP: the question
 * is typed and sent, the real tools run, then the answer and the pages behind
 * it arrive. Sending the question again restarts the loop.
 */

const QUESTION = "Which pages earned the most this week?";
const TOOLS = ["get_revenue", "get_top_pages"];
const ANSWER = "Pricing earned more than half.";
const PAGES = [
  { path: "/pricing", amount: "$1,240" },
  { path: "/templates", amount: "$680" },
  { path: "/blog/launch", amount: "$210" },
];

type Scene = {
  typed: string;
  sent: boolean;
  tools: number;
  running: boolean;
  answered: boolean;
};

const START: Scene = {
  typed: "",
  sent: false,
  tools: 0,
  running: false,
  answered: false,
};
const POSTER: Scene = {
  typed: "",
  sent: true,
  tools: TOOLS.length,
  running: false,
  answered: true,
};

export default function AgentAnswerDemo() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.6 });
  const [scene, setScene] = useState<Scene>(START);
  const [round, setRound] = useState(0);

  const shown = reduceMotion ? POSTER : scene;

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let cancelled = false;
    const set = (patch: Partial<Scene>) => {
      if (!cancelled) setScene((s) => ({ ...s, ...patch }));
    };

    const run = async () => {
      while (!cancelled) {
        setScene(START);
        await sleep(600);
        for (let i = 1; i <= QUESTION.length && !cancelled; i++) {
          set({ typed: QUESTION.slice(0, i) });
          await sleep(38);
        }
        await sleep(350);
        if (cancelled) break;
        set({ typed: "", sent: true });
        await sleep(500);

        for (let t = 1; t <= TOOLS.length && !cancelled; t++) {
          set({ tools: t, running: true });
          await sleep(750);
          set({ running: false });
          await sleep(200);
        }
        if (cancelled) break;
        set({ answered: true });
        await sleep(3000);
        if (cancelled) break;
        setRound((r) => r + 1);
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
      className="bg-background shadow-panel-lifted flex h-84 w-72 flex-col rounded-lg"
    >
      <div className="border-border/60 flex items-center justify-between border-b px-4 pt-3.5 pb-3">
        <span className="text-foreground text-sm font-medium">Chat</span>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="bg-success size-1.5 rounded-full" />
          kobbe mcp
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={round}
          className="flex flex-1 flex-col gap-3 px-4 py-3.5 text-xs"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {shown.sent ? (
            <motion.p
              className="bg-muted-surface text-foreground self-end rounded-lg px-3 py-2"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: ARRIVE }}
            >
              {QUESTION}
            </motion.p>
          ) : null}
          {shown.tools > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {TOOLS.slice(0, shown.tools).map((tool, i) => {
                const running = shown.running && i === shown.tools - 1;
                return (
                  <motion.li
                    key={tool}
                    className="text-muted-foreground flex items-center gap-2"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: ARRIVE }}
                  >
                    <span className="flex size-3.5 items-center justify-center">
                      {running ? (
                        <motion.span
                          className="border-border border-t-foreground size-3 rounded-full border-[1.5px]"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          size={13}
                          strokeWidth={2}
                          className="text-success"
                        />
                      )}
                    </span>
                    {running ? "Running" : "Ran"}
                    <span className="text-foreground font-medium">{tool}</span>
                  </motion.li>
                );
              })}
            </ul>
          ) : null}
          {shown.answered ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: ARRIVE }}
            >
              <p className="text-foreground text-sm font-medium">{ANSWER}</p>
              <ul className="mt-2">
                {PAGES.map((page, i) => (
                  <motion.li
                    key={page.path}
                    className="border-border/60 flex items-center justify-between border-t py-1.5"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.12 }}
                  >
                    <span className="text-muted-foreground">{page.path}</span>
                    <span className="text-foreground font-medium tabular-nums">
                      {page.amount}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <div className="px-3 pb-3">
        <div className="border-border flex h-9 items-center gap-2 rounded-lg border pr-1.5 pl-3 text-xs">
          <span className="min-w-0 flex-1 truncate">
            {shown.typed ? (
              <span className="text-foreground">{shown.typed}</span>
            ) : (
              <span className="text-muted-foreground">Ask anything</span>
            )}
          </span>
          <span
            className={`flex size-6 shrink-0 items-center justify-center rounded-md transition-colors ${
              shown.typed
                ? "bg-foreground text-background"
                : "bg-muted-surface text-muted-foreground"
            }`}
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={13} strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}
