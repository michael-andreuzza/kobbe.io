import { siteMobilePrimaryLinks } from "@/components/global/site-header-nav";
import { siteMegaMenuGroups } from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

import type { SiteMobileNavLink } from "@/components/global/docs-mobile-nav-dialog";
import { MegaMenuLinkContent, MegaMenuColumnTitle } from "@/components/global/site-mega-menu-link";
import { Menu } from "@base-ui/react/menu";
import { MenuIcon } from "lucide-react";

type SiteMobileMenuProps = {
  links?: SiteMobileNavLink[];
};

const menuItemClassName =
  "text-foreground hover:bg-muted focus-visible:bg-muted flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors";

const megaLinkClassName =
  "hover:bg-muted flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left outline-none transition-colors";

export function SiteMobileMenu({ links }: SiteMobileMenuProps) {
  const primaryLinks = links ?? siteMobilePrimaryLinks();

  return (
    <div className="overflow-visible md:hidden">
      <Menu.Root>
        <Menu.Trigger className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
          <MenuIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            align="end"
            side="bottom"
            sideOffset={10}
            className="isolate z-[100] outline-none"
          >
            <Menu.Popup
              className={cn(
                "mega-menu-inverted border-border bg-popover text-popover-foreground max-h-[min(32rem,calc(100dvh-5rem))] w-[min(calc(100vw-1.5rem),24rem)] overflow-y-auto rounded-xl border p-3 shadow-lg outline-none",
                "origin-(--transform-origin) transition-[transform,scale,opacity] duration-150 ease-out",
                "data-starting-style:scale-95 data-starting-style:opacity-0",
                "data-ending-style:scale-95 data-ending-style:opacity-0",
              )}
            >
              <div className="space-y-5">
                {siteMegaMenuGroups.map((group) => (
                  <div key={group.id} className="space-y-4">
                    {group.columns.map((column) => (
                      <div key={column.title}>
                        <MegaMenuColumnTitle column={column} className="px-3" />
                        <div className="mt-2 grid gap-0.5 px-1">
                          {column.links.map((link) => (
                            <Menu.LinkItem
                              key={link.id}
                              href={link.href}
                              target={link.target}
                              rel={link.rel}
                              closeOnClick
                              className={megaLinkClassName}
                            >
                              <MegaMenuLinkContent
                                link={link}
                                compact={
                                  column.layout === "compact" ||
                                  column.layout === "compact-grid"
                                }
                              />
                            </Menu.LinkItem>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="border-border mt-4 space-y-1 border-t pt-3">
                {primaryLinks.map((link) => (
                  <Menu.LinkItem
                    key={link.href}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    closeOnClick
                    className={menuItemClassName}
                  >
                    {link.label}
                  </Menu.LinkItem>
                ))}
              </div>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}

export default SiteMobileMenu;
