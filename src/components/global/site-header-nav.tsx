import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Logo } from "@/components/assets/logo";
import { SiteMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
import { SiteMegaMenuPanel } from "@/components/global/site-mega-menu-panel";
import { SiteMobileMenu } from "@/components/global/site-mobile-menu";
import {
  APP_SIGNIN_URL,
  APP_SIGNUP_URL,
} from "@/lib/site-mega-menu";
import type { NavGroup } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type SiteHeaderNavProps = {
  docsNavGroups?: NavGroup[];
};

const navLinkClassName =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

export function siteMobilePrimaryLinks() {
  return [
    { href: "/#pricing", label: "Pricing" },
    {
      href: APP_SIGNUP_URL,
      label: "Start free trial",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      href: APP_SIGNIN_URL,
      label: "Sign in",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];
}

export function SiteHeaderNav({ docsNavGroups }: SiteHeaderNavProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLDivElement>(null);
  const hasDocsNavigation = Boolean(docsNavGroups?.length);

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
    <div ref={headerRef}>
      <div className="flex items-center justify-between gap-3 py-4">
        <a
          href="/"
          aria-label="Homepage"
          className="text-foreground flex min-w-0 items-center gap-1 font-semibold tracking-tight"
        >
          <Logo className="h-5 rounded" />
          <span>kobbe</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-3 overflow-visible md:flex lg:gap-4"
          >
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls={panelId}
              onClick={() => setMegaOpen((open) => !open)}
              className={cn(
                navLinkClassName,
                "inline-flex items-center gap-1 outline-none",
                megaOpen && "text-foreground",
              )}
            >
              Explore
              <ChevronDownIcon
                className={cn(
                  "size-3 transition-transform duration-200",
                  megaOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <a href="/#pricing" className={navLinkClassName}>
              Pricing
            </a>
            <a
              href={APP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClassName}
            >
              Start free trial
            </a>
            <a
              href={APP_SIGNIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(navLinkClassName, "hidden sm:inline")}
            >
              Sign in
            </a>
          </nav>

          {hasDocsNavigation ? (
            <SiteMobileNavDialog
              groups={docsNavGroups}
              links={siteMobilePrimaryLinks()}
            />
          ) : (
            <SiteMobileMenu />
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:grid",
          megaOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-1 pt-2 pb-2">
            <div
              id={panelId}
              aria-hidden={!megaOpen}
              {...(!megaOpen ? { inert: true } : {})}
              className={cn(
                "mega-menu-inverted border-border bg-card text-foreground max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-y-contain touch-pan-y rounded-xl border p-6 transition-opacity duration-300 motion-reduce:transition-none sm:p-8",
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
