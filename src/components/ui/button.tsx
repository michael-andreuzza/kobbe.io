import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowDownRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

/**
 * The site's only button. Plain editorial style: solid ink, hairline outline
 * on paper, or a light outline for colored/dark panels. Sentence case,
 * optional down-right arrow.
 *
 * One component for both worlds: .astro files render it statically (no
 * client: directive, no JS shipped) and React islands import it directly.
 * Renders an <a> when `href` is given, otherwise a <button type="button">.
 * Pass `label` or children.
 *
 * IMPORTANT: in .astro call sites always pass `className`, never `class` —
 * Astro silently drops `class` on framework components.
 */

export type ButtonVariant =
  | "solid"
  | "solid-light"
  | "brand"
  | "muted"
  | "outline"
  | "outline-light"
  | "ghost";

export type ButtonSize = "xs" | "sm" | "base" | "lg" | "icon";

const base =
  "inline-flex cursor-pointer items-center gap-2 font-medium transition-colors";

// sm is the compact pill used in the navs, xs/icon are toolbar sizes.
const sizes: Record<ButtonSize, string> = {
  xs: "rounded-md px-3 py-1.5 text-xs",
  sm: "rounded-md px-3 py-1.5 text-sm",
  base: "rounded-lg px-4 py-2.5 text-sm",
  lg: "rounded-lg px-5 py-3 text-base",
  icon: "size-8 justify-center rounded-md",
};

const variants: Record<ButtonVariant, string> = {
  solid: "bg-dark-background text-surface hover:bg-dark-background/85",
  /* White fill: the CTA on dark panels (footer, offer banner). */
  "solid-light": "bg-background text-foreground hover:bg-background/85",
  /* Brand-blue fill: the loudest CTA; white ink on both light and dark. */
  brand: "bg-brand text-white hover:bg-brand/90",
  /* Warm-gray fill on the canvas: secondary actions beside a solid CTA. */
  muted: "bg-muted-surface text-foreground hover:bg-border/60",
  outline:
    "border border-foreground/30 text-foreground hover:border-foreground",
  "outline-light": "border border-surface/40 text-surface hover:border-surface",
  /* Quiet toolbar/icon actions; call sites set their own active colors. */
  ghost: "text-muted-foreground hover:text-foreground",
};

type AnchorProps = ComponentPropsWithoutRef<"a">;
type NativeButtonProps = ComponentPropsWithoutRef<"button">;

export type ButtonProps = Omit<AnchorProps & NativeButtonProps, "type"> & {
  label?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width, label left and arrow right (card CTAs). */
  block?: boolean;
  arrow?: boolean;
  external?: boolean;
  type?: NativeButtonProps["type"];
  /** Astro call sites pass `class`; merged with className. */
  class?: string;
  children?: ReactNode;
};

export function Button({
  label,
  href,
  variant = "solid",
  size = "base",
  block = false,
  arrow = false,
  external = false,
  type,
  class: classProp,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    block ? "w-full justify-between" : "w-fit",
    sizes[size],
    variants[variant],
    classProp,
    className,
  );

  const content = (
    <>
      {label ?? children}
      {arrow ? (
        <HugeiconsIcon
          icon={ArrowDownRight01Icon}
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={classes}
        {...(rest as AnchorProps)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={classes}
      {...(rest as NativeButtonProps)}
    >
      {content}
    </button>
  );
}

export default Button;
