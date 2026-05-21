import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

type IdlePulseOptions = {
  interval?: number;
  initialDelay?: number;
  scaleTo?: number;
  opacityTo?: number;
  selector?: string;
  staggerEach?: number;
  paused?: boolean;
};

export function useIdlePulse<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    interval = 5600,
    initialDelay = 0,
    scaleTo = 1.012,
    opacityTo = 1,
    selector,
    staggerEach = 0.06,
    paused = false,
  }: IdlePulseOptions = {},
) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || shouldReduceMotion || paused) return;
    const element: T = root;

    let mounted = true;
    let timeoutId: number | undefined;
    let intervalId: number | undefined;
    let cleanup: (() => void) | undefined;

    async function start() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const pulse = () => {
          if (!ScrollTrigger.isInViewport(element)) return;

          const targets = selector
            ? Array.from(element.querySelectorAll<HTMLElement>(selector))
            : [element];

          if (targets.length === 0) return;

          gsap.to(targets, {
            scale: scaleTo,
            opacity: opacityTo,
            duration: 0.18,
            ease: "power2.out",
            repeat: 1,
            yoyo: true,
            transformOrigin: "center center",
            stagger: selector ? { each: staggerEach, from: "start" } : 0,
          });
        };

        timeoutId = window.setTimeout(() => {
          pulse();
          intervalId = window.setInterval(pulse, interval);
        }, initialDelay);
      }, element);

      cleanup = () => context.revert();
    }

    void start();

    return () => {
      mounted = false;
      if (timeoutId != null) window.clearTimeout(timeoutId);
      if (intervalId != null) window.clearInterval(intervalId);
      cleanup?.();
    };
  }, [
    initialDelay,
    interval,
    opacityTo,
    paused,
    ref,
    scaleTo,
    selector,
    shouldReduceMotion,
    staggerEach,
  ]);
}
