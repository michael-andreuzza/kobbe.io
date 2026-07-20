import { Collapsible } from "@base-ui/react/collapsible";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { DocsCommandSearchTrigger } from "@/components/docs/docs-command-search";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  isActive: boolean;
  logo?: {
    src: string;
    alt: string;
  };
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
    <div className="flex min-w-0 flex-col gap-1.5">
      {groups.map((group, index) => {
        const isActiveGroup = group.items.some((item) => item.isActive);
        const defaultOpen =
          forceOpen || isActiveGroup || (!hasActiveItem && index === 0);

        return (
          <Collapsible.Root
            key={`${group.category}:${forceOpen ? "open" : "default"}`}
            defaultOpen={defaultOpen}
            className="min-w-0 w-full"
          >
            <Collapsible.Trigger
              className={cn(
                "text-muted-foreground flex min-h-7 w-full min-w-0 items-center gap-2 text-left text-sm leading-5 font-medium transition-colors outline-none focus-visible:ring-0",
                "hover:text-foreground",
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
                      "text-xs leading-5 font-medium transition-colors",
                      item.logo ? "flex min-w-0 items-center gap-1.5" : "block",
                      item.isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.logo ? (
                      <span className="flex size-3.5 shrink-0 items-center justify-center">
                        <img
                          src={item.logo.src}
                          alt=""
                          className="size-3 rounded-[0.15rem] object-contain"
                          loading="lazy"
                          width={12}
                          height={12}
                        />
                      </span>
                    ) : null}
                    <span className="min-w-0 truncate">{item.label}</span>
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
    <aside className="hidden w-52 min-w-52 shrink-0 lg:block">
      <div className="sticky top-24 flex max-h-[calc(100svh-6rem)] min-w-0 flex-col">
        <DocsCommandSearchTrigger className="mb-3 w-full shrink-0 self-stretch focus-visible:ring-0" />
        <nav
          aria-label="Docs navigation"
          className="text-sidebar-foreground min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pr-5 scrollbar-none!"
        >
          <SidebarGroups groups={groups} />
        </nav>
      </div>
    </aside>
  );
}
