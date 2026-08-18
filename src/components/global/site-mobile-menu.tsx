import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";

import { Logo } from "@/components/assets/logo";
import { siteMobilePrimaryLinks } from "@/components/global/site-header-nav";
import {
  MegaMenuColumnTitle,
  MegaMenuLinkContent,
} from "@/components/global/site-mega-menu-link";
import { siteMegaMenuGroups } from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

import type { SiteMobileNavLink } from "@/components/global/docs-mobile-nav-dialog";

type SiteMobileMenuProps = {
  links?: SiteMobileNavLink[];
};

const menuItemClassName =
  "text-foreground hover:bg-muted focus-visible:bg-muted flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors";

const megaLinkClassName =
  "hover:bg-muted block w-full rounded-lg px-2 py-2.5 text-left outline-none transition-colors";

const megaCompactLinkClassName =
  "hover:bg-muted flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left outline-none transition-colors";

export function SiteMobileMenu({ links }: SiteMobileMenuProps) {
  const primaryLinks = links ?? siteMobilePrimaryLinks();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
          <MenuIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-background/70 fixed inset-0 z-[100] backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            className={cn(
              "mega-menu-inverted border-border bg-popover text-popover-foreground fixed inset-y-0 right-0 z-[101] flex w-[min(24rem,calc(100vw-1rem))] flex-col border-l shadow-lg outline-none",
              "transition-transform duration-200 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full motion-reduce:transition-none",
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <Dialog.Close
                nativeButton={false}
                render={
                  <a
                    href="/"
                    aria-label="Homepage"
                    className="text-foreground flex items-center"
                  >
                    <Logo className="h-8 w-auto" />
                  </a>
                }
              />
              <Dialog.Title className="sr-only">Site menu</Dialog.Title>
              <Dialog.Close className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
                <XIcon className="size-4" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </Dialog.Close>
            </div>

            <nav
              aria-label="Site navigation"
              className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-y-contain px-3 py-4"
            >
              <div className="space-y-8">
                {siteMegaMenuGroups.map((group) => (
                  <div key={group.id} className="space-y-5">
                    {group.columns.map((column) => (
                      <div key={column.title}>
                        <MegaMenuColumnTitle column={column} className="px-2" />
                        <div
                          className={cn(
                            "mt-2",
                            column.layout === "compact-grid-4"
                              ? "grid grid-cols-2 gap-x-1 gap-y-1 sm:grid-cols-3"
                              : column.layout === "compact-grid-3"
                                ? "grid grid-cols-2 gap-x-1 gap-y-1 sm:grid-cols-3"
                                : column.layout === "compact-grid"
                                  ? "grid grid-cols-2 gap-x-1 gap-y-1"
                                  : "grid gap-0.5",
                          )}
                        >
                          {column.links.map((link) => {
                            const isCompact =
                              column.layout === "compact" ||
                              column.layout?.startsWith("compact-grid");

                            return (
                              <Dialog.Close
                                key={link.id}
                                nativeButton={false}
                                render={
                                  <a
                                    href={link.href}
                                    target={link.target}
                                    rel={link.rel}
                                    className={
                                      isCompact
                                        ? megaCompactLinkClassName
                                        : megaLinkClassName
                                    }
                                  >
                                    <MegaMenuLinkContent
                                      link={link}
                                      compact={isCompact}
                                    />
                                  </a>
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </nav>

            <div className="border-border shrink-0 space-y-1 border-t px-3 py-3">
              {primaryLinks.map((link) => (
                <Dialog.Close
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.rel}
                      className={menuItemClassName}
                    >
                      {link.label}
                    </a>
                  }
                />
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default SiteMobileMenu;
