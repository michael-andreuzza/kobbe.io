import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedPanelRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "mount" | "view";
};

export function AnimatedPanelReveal({
  children,
  className,
  delay = 0.2,
  trigger = "view",
}: AnimatedPanelRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const visibleState = {
    opacity: 1,
    filter: "blur(0px)",
  };

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              filter: "blur(6px)",
            }
      }
      animate={trigger === "mount" ? visibleState : undefined}
      whileInView={trigger === "view" ? visibleState : undefined}
      viewport={trigger === "view" ? { once: true, amount: 0.35 } : undefined}
      transition={{
        type: "spring",
        visualDuration: 1,
        bounce: 0.08,
        delay,
      }}
      style={{ originY: 0 }}
    >
      {children}
    </motion.div>
  );
}
