import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  MouseLeftClick01Icon,
  PlusSignIcon,
  RouteIcon,
} from "@hugeicons/core-free-icons";

import { ARRIVE, DemoCursor, TRAVEL, cursorDriver, sleep } from "./demo-cursor";

/**
 * A miniature of the app's Create funnel modal playing its real flow on a
 * loop: Add step, pick Event, search "sign", pick "Signup completed", and the
 * step lands in the list. The cursor then removes it so the loop resets with
 * a visible cause.
 */

type StepType = "pageview" | "event";

const BASE_STEPS: { type: StepType; value: string }[] = [
  { type: "pageview", value: "/pricing" },
  { type: "event", value: "Checkout started" },
];
const NEW_STEP = "Signup completed";
const QUERY = "sign";
const EVENTS = ["Checkout started", "Signup completed", "Demo booked"];

type Stage = "steps" | "type" | "event";
type Target = "add" | "event" | "option" | "remove";

type Scene = {
  stage: Stage;
  added: boolean;
  query: string;
  hot: Target | null;
};

const START: Scene = { stage: "steps", added: false, query: "", hot: null };
const POSTER: Scene = { stage: "steps", added: true, query: "", hot: null };

const HEADERS: Record<Stage, string> = {
  steps: "Add steps",
  type: "Select step type",
  event: "Event triggered",
};

export default function FunnelBuilderDemo() {
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
      y: root.offsetHeight - 70,
    });
    const set = (patch: Partial<Scene>) => {
      if (!cancelled) setScene((s) => ({ ...s, ...patch }));
    };
    const click = async (target: Target) => {
      set({ hot: target });
      await sleep(180);
      await press();
      set({ hot: null });
    };

    const run = async () => {
      await place(rest());

      while (!cancelled) {
        await sleep(700);
        await moveTo(pointAt("add", 0.3, 0.5));
        if (cancelled) break;
        await click("add");
        set({ stage: "type" });
        await sleep(450);

        await moveTo(pointAt("event", 0.5, 0.5));
        if (cancelled) break;
        await click("event");
        set({ stage: "event" });
        await sleep(500);

        for (let i = 1; i <= QUERY.length && !cancelled; i++) {
          set({ query: QUERY.slice(0, i) });
          await sleep(110);
        }
        await sleep(450);

        await moveTo(pointAt("option", 0.5, 0.5));
        if (cancelled) break;
        await click("option");
        set({ stage: "steps", added: true, query: "" });
        await sleep(300);
        await moveTo(rest());
        await sleep(2000);
        if (cancelled) break;

        await moveTo(pointAt("remove", 0.5, 0.5));
        if (cancelled) break;
        await click("remove");
        set({ added: false });
        await sleep(350);
        await moveTo(rest());
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
      className="bg-background shadow-panel-lifted relative flex h-80 w-72 flex-col rounded-lg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={shown.stage}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16 }}
        >
          <div className="border-border/60 border-b px-4 pt-3.5 pb-3">
            <span className="text-foreground text-sm font-medium">
              {HEADERS[shown.stage]}
            </span>
          </div>
          <div className="flex flex-1 flex-col px-4 py-3.5">
            {shown.stage === "steps" ? (
              <StepsBody
                added={shown.added}
                hot={shown.hot}
                animateIn={!reduceMotion}
              />
            ) : shown.stage === "type" ? (
              <TypeBody hot={shown.hot} />
            ) : (
              <EventBody query={shown.query} hot={shown.hot} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      {reduceMotion ? null : <DemoCursor ref={cursorRef} />}
    </div>
  );
}

function StepsBody(props: {
  added: boolean;
  hot: Target | null;
  animateIn: boolean;
}) {
  const steps = props.added
    ? [...BASE_STEPS, { type: "event" as const, value: NEW_STEP }]
    : BASE_STEPS;

  return (
    <>
      <div className="flex flex-col">
        <AnimatePresence>
          {steps.map((step, index) => {
            const isNew = index === BASE_STEPS.length;
            return (
              <motion.div
                key={step.value}
                initial={
                  isNew && props.animateIn ? { height: 0, opacity: 0 } : false
                }
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.45, delay: 0.15, ease: TRAVEL },
                  opacity: { duration: 0.3, delay: 0.3, ease: ARRIVE },
                }}
                className="overflow-hidden"
              >
                <div
                  className={`border-border/70 flex items-center gap-2 rounded-lg border py-1.5 pr-1.5 pl-2.5 text-xs ${
                    index > 0 ? "mt-2" : ""
                  }`}
                >
                  <span className="text-muted-foreground w-3 tabular-nums">
                    {index + 1}
                  </span>
                  <Icon
                    icon={
                      step.type === "pageview"
                        ? RouteIcon
                        : MouseLeftClick01Icon
                    }
                    className="text-muted-foreground size-3.5"
                  />
                  <span className="text-foreground min-w-0 flex-1 truncate">
                    {step.value}
                  </span>
                  <span
                    data-target={isNew ? "remove" : undefined}
                    className={`text-muted-foreground flex size-6 items-center justify-center rounded-md transition-colors ${
                      isNew && props.hot === "remove"
                        ? "bg-muted-surface text-foreground"
                        : ""
                    }`}
                  >
                    <Icon icon={Cancel01Icon} className="size-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <OutlineButton
        target="add"
        hot={props.hot}
        className="mt-2 h-8 justify-start gap-1.5 px-2.5"
      >
        <Icon icon={PlusSignIcon} className="size-3" />
        Add step
      </OutlineButton>
      <div className="mt-auto flex justify-end gap-2 pt-3">
        <span className="border-border text-foreground flex h-7 items-center rounded-md border px-2.5 text-xs font-medium shadow-xs">
          Back
        </span>
        <span className="bg-foreground text-background flex h-7 items-center rounded-md px-2.5 text-xs font-medium shadow-xs">
          Create
        </span>
      </div>
    </>
  );
}

function TypeBody(props: { hot: Target | null }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <OutlineButton hot={props.hot} className="gap-2 px-2.5 py-2.5">
          <Icon icon={RouteIcon} className="text-muted-foreground size-3.5" />
          Pageview
          <Icon
            icon={ArrowRight01Icon}
            className="text-muted-foreground ml-auto size-3.5"
          />
        </OutlineButton>
        <OutlineButton
          target="event"
          hot={props.hot}
          className="gap-2 px-2.5 py-2.5"
        >
          <Icon
            icon={MouseLeftClick01Icon}
            className="text-muted-foreground size-3.5"
          />
          Event
          <Icon
            icon={ArrowRight01Icon}
            className="text-muted-foreground ml-auto size-3.5"
          />
        </OutlineButton>
      </div>
      <BackFooter />
    </>
  );
}

function EventBody(props: { query: string; hot: Target | null }) {
  const options = EVENTS.filter((event) =>
    event.toLowerCase().includes(props.query),
  );

  return (
    <>
      <div className="border-foreground/30 flex h-8 items-center rounded-md border px-2.5 text-xs">
        {props.query ? (
          <span className="text-foreground">{props.query}</span>
        ) : null}
        <motion.span
          aria-hidden
          className="bg-foreground mx-px inline-block h-3.5 w-px"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {props.query ? null : (
          <span className="text-muted-foreground">Search events</span>
        )}
      </div>
      <div className="mt-2 flex flex-col">
        <AnimatePresence initial={false}>
          {options.map((event) => (
            <motion.div
              key={event}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: TRAVEL }}
              className="mt-2 overflow-hidden first:mt-0"
            >
              <OutlineButton
                target={event === NEW_STEP ? "option" : undefined}
                hot={props.hot}
                className="gap-2 px-2.5 py-2.5"
              >
                {event}
                <Icon
                  icon={PlusSignIcon}
                  className="text-muted-foreground ml-auto size-3.5"
                />
              </OutlineButton>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <BackFooter />
    </>
  );
}

function OutlineButton(props: {
  target?: Target;
  hot: Target | null;
  className: string;
  children: ReactNode;
}) {
  const active = props.target !== undefined && props.hot === props.target;
  return (
    <span
      data-target={props.target}
      className={`border-border text-foreground flex items-center rounded-md border text-xs font-medium shadow-xs transition-colors ${
        active ? "bg-muted-surface" : ""
      } ${props.className}`}
    >
      {props.children}
    </span>
  );
}

function BackFooter() {
  return (
    <div className="mt-auto flex justify-end pt-3">
      <span className="border-border text-foreground flex h-7 items-center rounded-md border px-2.5 text-xs font-medium shadow-xs">
        Back
      </span>
    </div>
  );
}

function Icon(props: { icon: typeof RouteIcon; className: string }) {
  return (
    <HugeiconsIcon
      icon={props.icon}
      className={`shrink-0 ${props.className}`}
      strokeWidth={1.8}
      aria-hidden
    />
  );
}
