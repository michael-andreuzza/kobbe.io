import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type AnimatedPanelRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "mount" | "view" | "scroll";
  /** When false, scroll reveal uses translate/scale only so shadows are not clipped. */
  mask?: boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  staggerSelector?: string;
  staggerEach?: number;
};

export function AnimatedPanelReveal({
  children,
  className,
  delay = 0.1,
  trigger = "view",
  mask = true,
  pin = false,
  start,
  end,
  staggerSelector = "[data-kobbe-stagger]",
  staggerEach = 0.05,
}: AnimatedPanelRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const animationRoot = root;

    if (shouldReduceMotion) {
      animationRoot.style.opacity = "1";
      animationRoot.style.filter = "blur(0px)";
      animationRoot.style.transform = "none";
      animationRoot.style.clipPath = "none";
      return;
    }

    const useScrollMask = trigger === "scroll" && mask;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    async function animate() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const staggerTargets = Array.from(
          animationRoot.querySelectorAll<HTMLElement>(staggerSelector),
        );

        function runInnerStagger(options?: {
          scrollTrigger?: gsap.TweenVars["scrollTrigger"];
          delay?: number;
        }) {
          if (staggerTargets.length === 0) return;

          gsap.fromTo(
            staggerTargets,
            { autoAlpha: 0, y: 12, scale: 0.985 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
              stagger: { each: staggerEach, from: "start" },
              delay: options?.delay,
              scrollTrigger: options?.scrollTrigger,
            },
          );
        }

        if (trigger === "mount") {
          gsap.fromTo(
            animationRoot,
            { autoAlpha: 0, filter: "blur(6px)", y: 18, scale: 0.992 },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1,
              duration: 1,
              delay,
              ease: "power3.out",
              onComplete: () => runInnerStagger(),
            },
          );
          return;
        }

        if (trigger === "scroll") {
          gsap.set(animationRoot, {
            autoAlpha: 1,
            filter: "blur(0px)",
            clipPath: useScrollMask ? "inset(0% 0% 100% 0%)" : "none",
          });

          const scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: animationRoot,
              start: start ?? "top 96%",
              end: end ?? "top 18%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });

          if (useScrollMask) {
            scrollTimeline
              .fromTo(
                animationRoot,
                { clipPath: "inset(0% 0% 100% 0%)", y: 18, scale: 0.996 },
                {
                  clipPath: "inset(0% 0% 18% 0%)",
                  y: 4,
                  scale: 0.999,
                  ease: "none",
                  duration: 0.45,
                },
              )
              .to(animationRoot, {
                clipPath: "inset(0% 0% 18% 0%)",
                y: 4,
                scale: 0.999,
                ease: "none",
                duration: 0.18,
              })
              .to(animationRoot, {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                scale: 1,
                ease: "none",
                duration: 0.37,
              });
          } else {
            scrollTimeline.fromTo(
              animationRoot,
              { y: 18, scale: 0.996 },
              {
                y: 0,
                scale: 1,
                ease: "none",
                duration: 1,
              },
            );
          }

          runInnerStagger({
            delay: 0.1,
            scrollTrigger: {
              trigger: animationRoot,
              start: "top 80%",
              once: true,
            },
          });
          return;
        }

        gsap.fromTo(
          animationRoot,
          { autoAlpha: 0, filter: "blur(6px)", y: 18, scale: 0.992 },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: animationRoot,
              start: start ?? "top 82%",
              once: true,
            },
            onComplete: () => runInnerStagger(),
          },
        );
      }, animationRoot);

      cleanup = () => context.revert();
    }

    void animate();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [
    delay,
    end,
    mask,
    pin,
    shouldReduceMotion,
    staggerEach,
    staggerSelector,
    start,
    trigger,
  ]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        opacity: shouldReduceMotion || trigger === "scroll" ? 1 : 0,
        filter:
          shouldReduceMotion || trigger === "scroll"
            ? "blur(0px)"
            : "blur(6px)",
        clipPath:
          shouldReduceMotion || !mask || trigger !== "scroll"
            ? "none"
            : "inset(0% 0% 100% 0%)",
        transformOrigin: "center top",
      }}
    >
      {children}
    </div>
  );
}
