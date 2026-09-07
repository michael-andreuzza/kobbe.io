import { useState, type ReactNode } from "react";
import { Popover } from "@base-ui/react/popover";

import { Button } from "@/components/ui/button";
import {
  APP_DEMO_URL,
  APP_SIGNIN_URL,
  APP_SIGNUP_URL,
} from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

type SiteMobileMenuProps = {
  className?: string;
  /** Logo mark rendered inside the white chip (slotted from Astro). */
  children?: ReactNode;
};

/**
 * Minimal by design: just the top-level destinations. Everything deeper is
 * reachable from these pages, the docs page select, and docs search.
 */
const mobileNavLinks = [
  { id: "features", href: "/features", label: "All features" },
  { id: "pricing", href: "/#pricing", label: "Pricing" },
  {
    id: "demo",
    href: APP_DEMO_URL,
    label: "Live demo",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { id: "docs", href: "/docs", label: "Documentation" },
  { id: "changelog", href: "/changelog", label: "Changelog" },
];

/**
 * Mobile navigation, mirroring the desktop pills: a brand pill (logo chip +
 * Menu trigger) on the left and a Sign in / Try free pill on the right.
 * The Menu trigger opens a small dropdown under the pill, no full-height
 * panel. Docs pages navigate through their own sticky page select
 * (DocsLayout), not through this menu.
 */
export function SiteMobileMenu({ className, children }: SiteMobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 py-2.5">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <div className="bg-muted-surface flex items-center gap-1 rounded-lg p-1 text-sm">
            <a
              href="/"
              className="bg-background flex size-8 items-center justify-center rounded-md shadow-xs"
              aria-label="Kobbe home"
            >
              {children}
            </a>
            <Popover.Trigger className="text-foreground py-1.5 pr-2.5 pl-1.5 font-medium transition-opacity outline-none hover:opacity-70">
              Menu
            </Popover.Trigger>
          </div>
          <Popover.Portal>
            <Popover.Positioner side="bottom" align="start" sideOffset={8}>
              <Popover.Popup
                className={cn(
                  "bg-dark-background text-surface z-101 min-w-44 rounded-lg p-1.5 shadow-lg outline-none",
                  "origin-(--transform-origin) transition-[opacity,transform] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
                )}
              >
                <nav aria-label="Site navigation">
                  <ul className="flex flex-col">
                    {mobileNavLinks.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          target={link.target}
                          rel={link.rel}
                          onClick={() => setOpen(false)}
                          className="text-surface/80 hover:bg-surface/10 hover:text-surface focus-visible:bg-surface/10 focus-visible:text-surface block rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors outline-none"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>

        <div className="bg-muted-surface flex items-center gap-1 rounded-lg p-1 text-sm">
          <a
            href={APP_SIGNIN_URL}
            className="text-foreground py-1.5 pr-1.5 pl-2.5 font-medium transition-opacity hover:opacity-70"
          >
            Sign in
          </a>
          <Button
            href={APP_SIGNUP_URL}
            label="Try free"
            variant="solid"
            size="xs"
            data-kobbe-event="Nav - start trial"
          />
        </div>
      </div>
    </div>
  );
}

export default SiteMobileMenu;
