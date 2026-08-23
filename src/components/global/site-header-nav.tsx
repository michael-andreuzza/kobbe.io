import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SiteMegaMenuPanel } from "@/components/global/site-mega-menu-panel";
import { pricingTrialDays } from "@/components/sections/pricing/pricing-tiers";
import { buttonVariants } from "@/components/ui/button";
import {
  APP_DEMO_URL,
  APP_SIGNIN_URL,
  APP_SIGNUP_URL,
} from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "text-foreground hover:text-foreground/70 text-sm transition-colors";

const trialCtaLabel = `Start a ${pricingTrialDays}-day free trial`;

/**
 * Desktop top navigation: wordmark, plain text links, and an Explore
 * trigger that floats the carbon mega menu panel over the page. Mobile
 * uses the pinned SiteMobileMenu card instead.
 */
export function SiteHeaderNav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!megaOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMegaOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [megaOpen]);

  return (
    <div ref={headerRef} className="relative">
      <div className="flex items-center justify-between gap-3 py-2.5">
        <a
          href="/"
          aria-label="Kobbe homepage"
          className="text-foreground w-fit font-semibold"
        >
          KOBBE
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-4 overflow-visible"
        >
          <button
            type="button"
            aria-expanded={megaOpen}
            aria-controls={panelId}
            onClick={() => setMegaOpen((open) => !open)}
            className={cn(
              navLinkClassName,
              "inline-flex items-center gap-1 outline-none",
            )}
          >
            Explore
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className={cn(
                "size-3.5 transition-transform duration-200",
                megaOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          <a
            href={APP_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            Live demo
          </a>
          <a href="/#pricing" className={navLinkClassName}>
            Pricing
          </a>
          <a
            href={APP_SIGNIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            Sign in
          </a>
          <a
            href={APP_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-kobbe-event="Nav - start trial"
            className={buttonVariants({ variant: "default", size: "xs" })}
          >
            {trialCtaLabel}
          </a>
        </nav>
      </div>

      {/* Floats over the page content instead of expanding the header, so the
          header background never paints a slab behind the panel. */}
      {/* Overhangs the panel width (-inset-x-10 / px-11 / pb-10) so the
          collapse animation's overflow-hidden doesn't clip the shadow. */}
      <div
        className={cn(
          "absolute -inset-x-10 top-full z-50 grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          megaOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-11 pt-2 pb-10">
            <div
              id={panelId}
              aria-hidden={!megaOpen}
              {...(!megaOpen ? { inert: true } : {})}
              className={cn(
                "inverted bg-card text-foreground max-h-[calc(100dvh-6rem)] touch-pan-y overflow-y-auto overscroll-y-contain rounded-lg p-6 shadow-lg transition-opacity duration-300 motion-reduce:transition-none sm:p-8",
                megaOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <SiteMegaMenuPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteHeaderNav;
