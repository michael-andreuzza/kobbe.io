import { Dialog } from "@base-ui/react/dialog";
import { PanelLeftCloseIcon, PanelLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SidebarGroups, type NavGroup } from "@/components/ui/sidebar";

type SiteMobileNavLink = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

type SiteMobileNavDialogProps = {
  groups?: NavGroup[];
  links: SiteMobileNavLink[];
};

export function SiteMobileNavDialog({
  groups = [],
  links,
}: SiteMobileNavDialogProps) {
  const hasDocsNavigation = groups.length > 0;

  return (
    <div className="md:hidden">
      <Dialog.Root>
        <Dialog.Trigger className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
          <HugeiconsIcon
            icon={PanelLeftIcon}
            size={18}
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <span className="sr-only">Open navigation</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-background/70 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="border-border bg-background fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r p-5 shadow-lg transition-transform duration-200 ease-out data-ending-style:-translate-x-full data-starting-style:-translate-x-full motion-reduce:transition-none">
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className="text-foreground text-sm font-medium">
                Navigation
              </Dialog.Title>
              <Dialog.Close className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-7 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
                <HugeiconsIcon
                  icon={PanelLeftCloseIcon}
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="sr-only">Close navigation</span>
              </Dialog.Close>
            </div>
            <nav
              aria-label="Site navigation"
              className="text-sidebar-foreground mt-5 min-h-0 flex-1 scrollbar-none! overflow-y-auto pr-1"
            >
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Dialog.Close
                    key={link.href}
                    nativeButton={false}
                    render={
                      <a
                        href={link.href}
                        target={link.target}
                        rel={link.rel}
                        className="text-foreground hover:text-muted-foreground text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    }
                  />
                ))}
              </div>
              {hasDocsNavigation ? (
                <div className="border-border mt-5 border-t pt-5">
                  <p className="text-muted-foreground mb-3 text-xs font-medium uppercase">
                    Docs
                  </p>
                  <SidebarGroups groups={groups} />
                </div>
              ) : null}
            </nav>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
