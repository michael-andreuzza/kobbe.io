import { useEffect, useId, useRef, useState } from "react";
import { GripIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SiteMegaMenuPanel } from "@/components/global/site-mega-menu-panel";
import { cn } from "@/lib/utils";

/**
 * "Explore" entry for the fixed sidebar: opens the same mega menu panel as
 * the top navigation, floating over the content area to the right of the
 * sidebar. Desktop only; mobile uses the sheet menus instead.
 */
export function SidebarMegaMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="hidden lg:block">
      <button
        type="button"
        aria-label="Explore"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-foreground hover:text-foreground/70 inline-flex items-center transition-colors outline-none"
      >
        <HugeiconsIcon
          icon={GripIcon}
          className={cn(
            "size-6 transition-transform duration-200",
            open && "rotate-45",
          )}
          aria-hidden="true"
        />
      </button>
      {/* Soft blur over the whole page (sidebar included) while open. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "bg-background/1 fixed inset-0 z-70 backdrop-blur transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      {/* Floats over the content feed, aligned with its rounded panels. */}
      <div
        id={panelId}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
        className={cn(
          // Above the docs ToC (z-50) and the progressive blur layers (z-40).
          "fixed inset-y-2 right-1 left-80 z-80 transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="inverted bg-card text-foreground flex h-full touch-pan-y flex-col overflow-y-auto overscroll-y-contain rounded-lg p-6 shadow-lg">
          <SiteMegaMenuPanel />
        </div>
      </div>
    </div>
  );
}

export default SidebarMegaMenu;
