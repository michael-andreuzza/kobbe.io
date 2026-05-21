import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type FooterLogoRevealProps = {
  children: ReactNode;
  className?: string;
};

export function FooterLogoReveal({
  children,
  className,
}: FooterLogoRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const animationRoot = root;

    const letters = Array.from(
      animationRoot.querySelectorAll<HTMLElement>("[data-footer-logo-letter]"),
    );

    if (letters.length === 0) return;

    if (shouldReduceMotion) {
      for (const letter of letters) {
        letter.style.transform = "none";
        letter.style.opacity = "1";
      }
      return;
    }

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
        gsap.set(letters, {
          y: "0.45em",
          opacity: 0,
          rotate: 3,
          transformOrigin: "50% 100%",
        });

        const timeline = gsap.timeline({ paused: true }).to(letters, {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            each: 0.06,
            from: "start",
          },
        });

        ScrollTrigger.create({
          trigger: animationRoot,
          start: "top 90%",
          once: true,
          onEnter: () => timeline.play(),
        });

        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(animationRoot)) {
          timeline.play();
        }
      }, animationRoot);

      cleanup = () => context.revert();
    }

    void animate();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

export default FooterLogoReveal;
