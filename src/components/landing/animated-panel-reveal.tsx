import type { ReactNode } from "react";

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
}: AnimatedPanelRevealProps) {
  return <div className={className}>{children}</div>;
}
