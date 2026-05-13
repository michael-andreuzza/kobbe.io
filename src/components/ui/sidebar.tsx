import { Collapsible } from "@base-ui/react/collapsible";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  isActive: boolean;
};

export type NavGroup = {
  category: string;
  items: NavItem[];
};

type SidebarGroupsProps = {
  groups: NavGroup[];
  forceOpen?: boolean;
};

export function SidebarGroups({
  groups,
  forceOpen = false,
}: SidebarGroupsProps) {
  const hasActiveItem = groups.some((group) =>
    group.items.some((item) => item.isActive),
  );

  return (
    <div className="flex flex-col gap-1.5">
      {groups.map((group, index) => {
        const isActiveGroup = group.items.some((item) => item.isActive);
        const defaultOpen =
          forceOpen || isActiveGroup || (!hasActiveItem && index === 0);

        return (
          <Collapsible.Root
            key={`${group.category}:${forceOpen ? "open" : "default"}`}
            defaultOpen={defaultOpen}
          >
            <Collapsible.Trigger
              className={cn(
                "text-muted-foreground flex min-h-7 w-full items-center gap-2 text-left text-sm leading-5 transition-colors outline-none",
                "hover:text-foreground focus-visible:ring-ring/40 font-medium focus-visible:ring-2",
                isActiveGroup
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                "[&[data-panel-open]_.sidebar-chevron]:rotate-90",
              )}
            >
              <span className="min-w-0 flex-1 truncate">{group.category}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                strokeWidth={2}
                className="sidebar-chevron shrink-0 transition-transform duration-150"
                aria-hidden="true"
              />
            </Collapsible.Trigger>
            <Collapsible.Panel
              keepMounted
              className="h-(--collapsible-panel-height) overflow-hidden opacity-100 transition-[height,opacity] duration-200 ease-out outline-none data-ending-style:h-0 data-[ending-style]:opacity-0 data-[starting-style]:h-0 data-[starting-style]:opacity-0 motion-reduce:transition-none"
            >
              <div className="mt-0.5 flex flex-col gap-1 pl-2">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={item.isActive ? "page" : undefined}
                    className={cn(
                      "block text-xs leading-5 font-medium transition-colors",
                      item.isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="block truncate">{item.label}</span>
                  </a>
                ))}
              </div>
            </Collapsible.Panel>
          </Collapsible.Root>
        );
      })}
    </div>
  );
}

type SidebarProps = {
  groups: NavGroup[];
};

export default function Sidebar({ groups }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav
        aria-label="Docs navigation"
        className="!scrollbar-none text-sidebar-foreground sticky top-24 flex max-h-[calc(100svh-6rem)] flex-col overflow-y-auto pr-5"
      >
        <SidebarGroups groups={groups} />
      </nav>
    </aside>
  );
}
