"use client";

import { ArrowUp01Icon, Image01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

const userQuestion =
  "What's my traffic today, and which page should I improve next?";

type ConversationPhase = "typing" | "working" | "answer";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CliAgentsPanel() {
  const [typedText, setTypedText] = useState(() =>
    prefersReducedMotion() ? userQuestion : "",
  );
  const [phase, setPhase] = useState<ConversationPhase>(() =>
    prefersReducedMotion() ? "answer" : "typing",
  );

  useEffect(() => {
    if (phase === "typing") {
      if (typedText.length < userQuestion.length) {
        const timeout = window.setTimeout(() => {
          setTypedText(userQuestion.slice(0, typedText.length + 1));
        }, 34);

        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(() => {
        setPhase("working");
      }, 500);

      return () => window.clearTimeout(timeout);
    }

    if (phase === "working") {
      const timeout = window.setTimeout(() => {
        setPhase("answer");
      }, 1600);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setTypedText("");
      setPhase("typing");
    }, 5200);

    return () => window.clearTimeout(timeout);
  }, [phase, typedText]);

  return (
    <div className="border-border/70 bg-card text-foreground mx-auto flex h-135 flex-col overflow-hidden rounded-xl border lg:h-172">
      <style>{`
        @keyframes kobbe-agent-caret {
          0%, 48% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }

        @keyframes kobbe-agent-tool-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .kobbe-agent-tool-line {
            animation: none !important;
          }
        }
      `}</style>
      <div className="grid h-9 grid-cols-[1fr_auto_1fr] items-center px-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="bg-foreground size-2.5 rounded-full" />
          <span className="bg-foreground size-2.5 rounded-full" />
          <span className="bg-foreground size-2.5 rounded-full" />
        </div>
        <span className="text-foreground font-mono font-medium">
          $ npm install -g @kobbe/cli
        </span>
        <span className="text-muted-foreground flex items-center justify-end gap-1.5 font-medium">
          <span
            aria-hidden="true"
            className="bg-success size-1.5 rounded-full motion-safe:animate-pulse"
          />
          kobbe mcp
        </span>
      </div>

      <div className="border-border/60 bg-card flex min-h-0 flex-1 items-stretch justify-center border-t px-4 py-4">
        <div className="flex min-h-0 w-full flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="bg-muted rounded-lg px-3 py-2.5 text-xs leading-5">
                {typedText}
                {phase === "typing" ? (
                  <span
                    aria-hidden="true"
                    className="bg-foreground ml-0.5 inline-block h-3 w-px translate-y-0.5"
                    style={{
                      animation: "kobbe-agent-caret 1s steps(1) infinite",
                    }}
                  />
                ) : null}
              </div>

              {phase !== "typing" ? (
                <div className="text-muted-foreground space-y-2 text-xs">
                  <p>
                    Calling tools on the{" "}
                    <span className="text-foreground font-mono">kobbe</span> MCP
                    server...
                  </p>
                  <ToolLine
                    name="get_overview"
                    detail="range: today"
                    done={phase === "answer"}
                    delayMs={0}
                  />
                  <ToolLine
                    name="get_top_pages"
                    detail="limit: 5"
                    done={phase === "answer"}
                    delayMs={380}
                  />
                  <ToolLine
                    name="get_next_actions"
                    detail="site: kobbe.io"
                    done={phase === "answer"}
                    delayMs={760}
                  />
                </div>
              ) : null}

              {phase === "answer" ? <AgentAnswer /> : null}
            </div>
          </div>
          <div className="shrink-0 p-4">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground min-h-10 text-sm leading-6">
                Ask about traffic, sources, pages...
              </p>

              <div className="text-muted-foreground mt-8 ml-auto flex w-fit shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="hover:bg-muted grid size-7 place-items-center rounded-md transition-colors"
                  aria-label="Attach image"
                >
                  <HugeiconsIcon
                    icon={Image01Icon}
                    strokeWidth={1.8}
                    className="size-4"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="bg-foreground text-background grid size-7 place-items-center rounded-full transition-opacity hover:opacity-90"
                  aria-label="Send message"
                >
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    className="size-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolLine(props: {
  name: string;
  detail: string;
  done: boolean;
  delayMs: number;
}) {
  return (
    <div
      className="kobbe-agent-tool-line bg-muted flex items-center justify-between rounded-md px-3 py-2"
      style={{
        animation: "kobbe-agent-tool-in 360ms ease-out both",
        animationDelay: `${props.delayMs}ms`,
      }}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="border-border text-muted-foreground shrink-0 rounded border px-1 py-px text-[10px] leading-4 font-medium">
          MCP
        </span>
        <span className="text-foreground truncate font-mono">{props.name}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {props.detail}
        {props.done ? (
          <span className="text-success" aria-label="Tool call finished">
            ✓
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="bg-foreground/40 size-1.5 rounded-full motion-safe:animate-pulse"
          />
        )}
      </span>
    </div>
  );
}

function AgentAnswer() {
  return (
    <div className="space-y-3 text-xs leading-6">
      <p>
        Today you have <strong className="font-semibold">1,284 visitors</strong>{" "}
        and <strong className="font-semibold">3,842 views</strong> across your
        top pages.
      </p>
      <p>
        <span className="font-mono">/pricing</span> is the highest-traffic page.
        It drove 612 views, so I would improve that CTA before changing lower
        traffic pages.
      </p>
      <p className="text-muted-foreground text-[11px]">
        3 MCP tool calls · kobbe CLI in MCP mode
      </p>
    </div>
  );
}

export default CliAgentsPanel;
