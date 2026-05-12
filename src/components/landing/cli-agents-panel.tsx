"use client";

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

const userQuestion =
  "What's my traffic and revenue today, and which page should I improve next?";

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
    <div className="bg-surface text-foreground border-border/60 flex h-135 flex-col overflow-hidden rounded-lg border">
      <style>{`
        @keyframes kobbe-agent-caret {
          0%, 48% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }
      `}</style>
      <div className="grid h-9 grid-cols-[1fr_auto_1fr] items-center px-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="bg-chart-2 size-2.5 rounded-full" />
          <span className="bg-chart-3 size-2.5 rounded-full" />
          <span className="bg-chart-4 size-2.5 rounded-full" />
        </div>
        <span className="text-foreground font-medium">Ask Kobbe</span>
        <span />
      </div>

      <div className="border-border/60 bg-background flex min-h-0 flex-1 items-stretch justify-center border-t px-4 py-4">
        <div className="flex min-h-0 w-full flex-col">
          <div className="!scrollbar-hide min-h-0 flex-1 overflow-y-auto p-4">
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
                  <p>Kobbe is checking analytics...</p>
                  <ToolLine name="get_overview" detail="range: today" />
                  <ToolLine name="get_revenue" detail="range: today" />
                  <ToolLine name="get_top_pages" detail="include revenue" />
                  <ToolLine name="get_next_actions" detail="site: kobbe.io" />
                </div>
              ) : null}

              {phase === "answer" ? <AgentAnswer /> : null}
            </div>
          </div>
          <div className="shrink-0 p-4">
            <div className="bg-background border-border/50 rounded-lg border p-3 shadow-xs">
              <p className="text-foreground min-h-10 text-sm leading-6">
                Ask about traffic, revenue, sources...
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-2 text-xs">
                  <ComposerChip label="Agent" detail="Kobbe" />
                  <ComposerChip label="Model" detail="GPT-5.5" />
                  <ComposerChip label="Context" detail="MCP" />
                </div>
                <div className="text-muted-foreground flex shrink-0 items-center gap-2">
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
    </div>
  );
}

function ComposerChip(props: { label: string; detail: string }) {
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 rounded-full text-xs">
      <span className="text-muted-foreground">{props.label}</span>
      <span>{props.detail}</span>
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        strokeWidth={1.7}
        className="text-muted-foreground size-4"
        aria-hidden="true"
      />
    </span>
  );
}

function ToolLine(props: { name: string; detail: string }) {
  return (
    <div className="bg-muted flex items-center justify-between rounded-md px-3 py-2">
      <span className="text-foreground font-mono">{props.name}</span>
      <span>{props.detail}</span>
    </div>
  );
}

function AgentAnswer() {
  return (
    <div className="space-y-3 text-xs leading-6">
      <p>
        Today you have <strong className="font-semibold">1,284 visitors</strong>{" "}
        and <strong className="font-semibold">US$228 revenue</strong> from 3
        paid conversions.
      </p>
      <p>
        <span className="font-mono">/pricing</span> is the highest-value page.
        It drove US$199, so I would improve that CTA before changing lower
        traffic pages.
      </p>
    </div>
  );
}

export default CliAgentsPanel;
