import { Menu } from "@base-ui/react/menu";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SiteMobileNavLink } from "@/components/global/docs-mobile-nav-dialog";

type SiteMobileMenuProps = {
  links: SiteMobileNavLink[];
};

const menuItemClassName =
  "text-foreground hover:bg-muted focus-visible:bg-muted flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors";

export function SiteMobileMenu({ links }: SiteMobileMenuProps) {
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
                "border-border bg-popover text-popover-foreground min-w-40 rounded-lg border p-1 shadow-md outline-none",
                "origin-(--transform-origin) transition-[transform,scale,opacity] duration-150 ease-out",
                "data-starting-style:scale-95 data-starting-style:opacity-0",
                "data-ending-style:scale-95 data-ending-style:opacity-0",
              )}
            >
              {links.map((link) => (
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
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}

export default SiteMobileMenu;
