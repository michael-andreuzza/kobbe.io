import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Heading in the two-tone statement style used across the site, same styles
 * as lexingtonthemes.com's TwoToneHeading: the claim in ink and the
 * elaboration in muted gray inside one clamped heading, with an optional
 * muted eyebrow above. Not tied to sections; use it anywhere a two-tone
 * statement fits.
 *
 * Like Button, .astro files render it statically (no client: directive) and
 * React islands import it directly. The gray elaboration goes in the
 * default slot/children so call sites can mix in inline links.
 *
 * IMPORTANT: in .astro call sites always pass `className`, never `class` —
 * Astro silently drops `class` on framework components.
 */

export type TwoToneHeadingProps = {
  /** Small muted line above the heading. */
  eyebrow?: string;
  /** The claim, rendered in ink. */
  title: string;
  /** Heading level for the title. */
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Astro call sites pass `class`; merged with className. */
  class?: string;
  /** The elaboration, rendered in muted gray; may include inline links. */
  children?: ReactNode;
};

export function TwoToneHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  className,
  class: classProp,
  children,
}: TwoToneHeadingProps) {
  return (
    <div className={cn("max-w-4xl", classProp, className)}>
      {eyebrow ? (
        <p className="text-muted-foreground font-medium">{eyebrow}</p>
      ) : null}
      <Tag
        className={cn(
          "text-[clamp(1.25rem,2vw,1.35rem)] leading-tight tracking-tight text-balance",
          eyebrow && "mt-4",
        )}
      >
        <span className="text-foreground">{title}</span>
        {children ? (
          <>
            {" "}
            <span className="text-muted-foreground">{children}</span>
          </>
        ) : null}
      </Tag>
    </div>
  );
}

export default TwoToneHeading;
