import { Dialog } from "@base-ui/react/dialog";
import { PanelLeftCloseIcon, PanelLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SidebarGroups, type NavGroup } from "@/components/ui/sidebar";

type DocsMobileNavDialogProps = {
  groups: NavGroup[];
};

export function DocsMobileNavDialog({ groups }: DocsMobileNavDialogProps) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <Dialog.Root>
        <Dialog.Trigger className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
          <HugeiconsIcon
            icon={PanelLeftIcon}
            size={18}
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <span className="sr-only">Open docs navigation</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-background/70 fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup className="border-border bg-background fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r p-5 shadow-lg transition-transform duration-200 ease-out data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full motion-reduce:transition-none">
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className="text-foreground text-sm font-medium">
                Docs navigation
              </Dialog.Title>
              <Dialog.Close className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 inline-flex size-7 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-2">
                <HugeiconsIcon
                  icon={PanelLeftCloseIcon}
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="sr-only">Close docs navigation</span>
              </Dialog.Close>
            </div>
            <nav
              aria-label="Docs navigation"
              className="!scrollbar-hide text-sidebar-foreground mt-5 min-h-0 flex-1 overflow-y-auto pr-1"
            >
              <SidebarGroups groups={groups} />
            </nav>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
