import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  APP_DEMO_URL,
  APP_SIGNIN_URL,
  APP_SIGNUP_URL,
  siteMegaMenuGuideGroups,
  siteNavLinks,
} from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

type SiteMobileMenuProps = {
  className?: string;
  /** Logo mark rendered inside the white chip (slotted from Astro). */
  children?: ReactNode;
};

// Same picks as the desktop mega menu (Navigation.astro): product links up
// top, the remaining docs pages as a grid, and the platform guide groups.
const featuresLink = siteNavLinks.find((link) => link.id === "features");
const raycastLink = siteNavLinks.find((link) => link.id === "raycast");
const docsPageLinks = siteNavLinks.filter(
  (link) =>
    link.id !== "features" &&
    link.id !== "raycast" &&
    link.id !== "install-guides" &&
    link.id !== "revenue-attribution",
);

/**
 * Mobile navigation, mirroring the desktop pills: a brand pill (logo chip +
 * Menu trigger) on the left and a Sign in / Try free pill on the right.
 * The Menu trigger opens a full-height dark sheet with the same sections as
 * the desktop mega menu: product, docs pages, and the platform guide grids,
 * plus the Pricing and Live demo links from the desktop nav pill.
 */
export function SiteMobileMenu({ className, children }: SiteMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 py-2.5">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <div className="bg-muted-surface flex items-center gap-1 rounded-lg p-1 text-sm">
            <a
              href="/"
              className="bg-background flex size-8 items-center justify-center rounded-md shadow-xs"
              aria-label="Kobbe home"
            >
              {children}
            </a>
            <Dialog.Trigger className="text-foreground py-1.5 pr-2.5 pl-1.5 font-medium transition-opacity outline-none hover:opacity-70">
              Menu
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-100 bg-black/40 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
            <Dialog.Popup
              className={cn(
                "bg-dark-background text-surface fixed inset-x-2 top-2 bottom-2 z-101 flex flex-col overflow-hidden rounded-lg shadow-lg outline-none",
                "transition-[opacity,transform] duration-150 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none",
              )}
            >
              <div className="border-surface/10 flex items-center justify-between border-b px-5 py-3">
                <Dialog.Title className="text-surface text-sm font-medium">
                  Menu
                </Dialog.Title>
                <Dialog.Close
                  className="text-surface/70 hover:text-surface -mr-1.5 rounded-md p-1.5 transition-colors outline-none"
                  aria-label="Close menu"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Dialog.Close>
              </div>

              <nav
                aria-label="Site navigation"
                className="divide-surface/10 flex flex-col divide-y overflow-y-auto overscroll-contain"
              >
                {/* Top-level links from the desktop nav pill. */}
                <div className="grid grid-cols-2 gap-x-8 p-5">
                  <a
                    href="/#pricing"
                    onClick={close}
                    className="text-surface py-1 text-sm font-medium transition-opacity hover:opacity-70"
                  >
                    Pricing
                  </a>
                  <a
                    href={APP_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="text-surface flex items-center gap-1 py-1 text-sm font-medium transition-opacity hover:opacity-70"
                  >
                    Live demo
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Section 1: product, same picks as the desktop panel. */}
                <div className="p-5">
                  <p className="text-surface/70 text-xs font-medium tracking-wide uppercase">
                    Product
                  </p>
                  <div className="mt-4 flex flex-col gap-5">
                    {featuresLink ? (
                      <a
                        href={featuresLink.href}
                        onClick={close}
                        className="group block"
                      >
                        <span className="text-surface block text-sm font-medium transition-opacity group-hover:opacity-70">
                          {featuresLink.label}
                        </span>
                        <span className="text-surface/70 mt-0.5 block text-sm leading-snug">
                          {featuresLink.description}
                        </span>
                      </a>
                    ) : null}
                    <a href="/docs" onClick={close} className="group block">
                      <span className="text-surface flex items-center gap-1 text-sm font-medium transition-opacity group-hover:opacity-70">
                        Read the docs
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-surface/70 mt-0.5 block text-sm leading-snug">
                        Guides for setup, tracking, and dashboards, plus every
                        installation and revenue guide.
                      </span>
                    </a>
                    <a
                      href="/changelog"
                      onClick={close}
                      className="group block"
                    >
                      <span className="text-surface flex items-center gap-1 text-sm font-medium transition-opacity group-hover:opacity-70">
                        Changelog
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-surface/70 mt-0.5 block text-sm leading-snug">
                        New features and fixes as they ship.
                      </span>
                    </a>
                    {raycastLink ? (
                      <a
                        href={raycastLink.href}
                        onClick={close}
                        className="group block"
                      >
                        <span className="text-surface block text-sm font-medium transition-opacity group-hover:opacity-70">
                          {raycastLink.label}
                        </span>
                        <span className="text-surface/70 mt-0.5 block text-sm leading-snug">
                          {raycastLink.description}
                        </span>
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Section 2: docs pages, labels only so the list stays scannable. */}
                <div className="p-5">
                  <p className="text-surface/70 text-xs font-medium tracking-wide uppercase">
                    Docs
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                    {docsPageLinks.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          onClick={close}
                          className="text-surface block text-sm font-medium transition-opacity hover:opacity-70"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: featured platforms per guide family. */}
                {siteMegaMenuGuideGroups.map((group) => (
                  <div key={group.id} className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-surface/70 text-xs font-medium tracking-wide uppercase">
                        {group.title}
                      </p>
                      <a
                        href={group.seeAllHref}
                        onClick={close}
                        className="text-surface/70 hover:text-surface shrink-0 text-xs font-medium transition-colors"
                      >
                        See all
                      </a>
                    </div>
                    <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                      {group.links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            onClick={close}
                            className="text-surface/80 hover:text-surface flex items-center gap-2 text-sm transition-colors"
                          >
                            <img
                              src={link.logo.src}
                              alt=""
                              width={16}
                              height={16}
                              loading="lazy"
                              className="size-4 shrink-0 rounded-xs object-contain"
                            />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>

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
