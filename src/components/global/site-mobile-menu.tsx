import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";
import { DocsCommandSearchTrigger } from "@/components/docs/docs-command-search";
import {
  APP_SIGNIN_URL,
  APP_SIGNUP_URL,
  siteMegaMenuColumns,
} from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

export type SiteMobileDocsGroup = {
  category: string;
  items: { href: string; label: string; isActive: boolean }[];
};

type SiteMobileMenuProps = {
  /** When set, the panel lists the docs navigation instead of the mega menu. */
  docsGroups?: SiteMobileDocsGroup[];
  className?: string;
  /** Logo mark rendered inside the white chip (slotted from Astro). */
  children?: ReactNode;
};

/**
 * Mobile navigation, mirroring the desktop pills: a brand pill (logo chip +
 * Menu trigger) on the left and a Sign in / Try free pill on the right. The
 * Menu trigger opens a side panel with the mega menu groups (or the docs
 * tree on docs pages) and a sticky account row at the bottom.
 */
export function SiteMobileMenu({
  docsGroups,
  className,
  children,
}: SiteMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isDocs = Boolean(docsGroups?.length);

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 py-2.5">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <div className="bg-muted flex items-center gap-1 rounded-lg p-1 text-sm">
            <a
              href="/"
              className="bg-card flex size-8 items-center justify-center rounded-md shadow-xs"
              aria-label="Kobbe home"
            >
              {children}
            </a>
            <Dialog.Trigger className="text-foreground py-1.5 pr-2.5 pl-1.5 font-medium transition-opacity outline-none hover:opacity-70">
              Menu
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
                {/* Near-transparent: the site stays visible behind the panel. */}
                <Dialog.Backdrop className="bg-background/1 fixed inset-0 z-100 backdrop-blur transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
                <Dialog.Popup
                  className={cn(
                    "inverted bg-card text-foreground fixed inset-y-2 right-2 z-101 flex w-[min(22rem,calc(100vw-1rem))] flex-col rounded-lg shadow-lg outline-none",
                    "transition-transform duration-300 ease-out data-ending-style:translate-x-[calc(100%+0.5rem)] data-starting-style:translate-x-[calc(100%+0.5rem)] motion-reduce:transition-none",
                  )}
                >
                  <div className="flex shrink-0 items-center justify-between gap-3 p-4">
                    <Dialog.Title className="text-foreground font-semibold tracking-tight">
                      Kobbe.
                    </Dialog.Title>
                    <Dialog.Close className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none">
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        className="size-5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close menu</span>
                    </Dialog.Close>
                  </div>

                  <nav
                    aria-label="Site navigation"
                    className="min-h-0 flex-1 touch-pan-y space-y-6 overflow-y-auto overscroll-y-contain px-4 pb-4"
                  >
                    {isDocs ? (
                      <>
                        <DocsCommandSearchTrigger className="w-full focus-visible:ring-0" />
                        {docsGroups!.map((group) => (
                          <div key={group.category}>
                            <p className="text-muted-foreground/60 text-sm">
                              {group.category}
                            </p>
                            <ul className="mt-2 flex flex-col gap-1.5">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <a
                                    href={item.href}
                                    className={cn(
                                      "text-sm transition-colors",
                                      item.isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground",
                                    )}
                                  >
                                    {item.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </>
                    ) : (
                      siteMegaMenuColumns.map((column) => (
                        <div key={column.title}>
                          <p className="text-muted-foreground/60 text-sm">
                            {column.title}
                          </p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {column.links.map((link) => (
                              <li key={link.id}>
                                <a
                                  href={link.href}
                                  target={link.target}
                                  rel={link.rel}
                                  onClick={() => setOpen(false)}
                                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                            {column.seeAllHref ? (
                              <li>
                                <a
                                  href={column.seeAllHref}
                                  onClick={() => setOpen(false)}
                                  className="text-muted-foreground/60 hover:text-foreground text-sm transition-colors"
                                >
                                  {column.seeAllLabel ?? "See all"}
                                </a>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      ))
                    )}
                  </nav>

                  {/* Sticky account row. */}
                  <div className="border-border flex shrink-0 items-center justify-between gap-3 border-t p-4">
                    <a
                      href={APP_SIGNIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      Sign in
                    </a>
                    <a
                      href={APP_SIGNUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-kobbe-event="Nav - start trial"
                      className={buttonVariants({
                        variant: "secondary",
                        size: "xs",
                      })}
                    >
                      Start a free trial
                    </a>
                  </div>
                </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="bg-muted flex items-center gap-1 rounded-lg p-1 text-sm">
          <a
            href={APP_SIGNIN_URL}
            className="text-foreground py-1.5 pr-1.5 pl-2.5 font-medium transition-opacity hover:opacity-70"
          >
            Sign in
          </a>
          <a
            href={APP_SIGNUP_URL}
            data-kobbe-event="Nav - start trial"
            className="bg-carbon text-background hover:bg-carbon/85 rounded-md px-3 py-1.5 font-medium transition-colors"
          >
            Try free
          </a>
        </div>
      </div>
    </div>
  );
}

export default SiteMobileMenu;
