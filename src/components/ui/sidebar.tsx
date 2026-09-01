import { useLayoutEffect, useState } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BrandLogo } from "@/components/foundations/brand-logo";
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

/**
 * Open/closed choices the user made by clicking group triggers, remembered
 * for the session so navigating between docs pages doesn't reset them.
 */
const NAV_OPEN_STORAGE_KEY = "kobbe-docs-nav-open";

function readStoredOpenState(): Record<string, boolean> {
  try {
    const raw = window.sessionStorage.getItem(NAV_OPEN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function storeOpenChoice(category: string, open: boolean) {
  try {
    const next = { ...readStoredOpenState(), [category]: open };
    window.sessionStorage.setItem(NAV_OPEN_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Session storage unavailable; state just won't persist.
  }
}

export function SidebarGroups({
  groups,
  forceOpen = false,
}: SidebarGroupsProps) {
  const hasActiveItem = groups.some((group) =>
    group.items.some((item) => item.isActive),
  );

  // SSR and first client render use the defaults (active group open) so
  // hydration matches; the session's manual choices are merged in after
  // mount and win over the defaults.
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      groups.map((group, index) => [
        group.category,
        forceOpen ||
          group.items.some((item) => item.isActive) ||
          (!hasActiveItem && index === 0),
      ]),
    ),
  );

  // Panels stay unanimated until the stored state has painted, so restoring
  // a remembered open/closed group on page load snaps instead of sliding.
  const [animationsReady, setAnimationsReady] = useState(false);

  useLayoutEffect(() => {
    if (!forceOpen) {
      const stored = readStoredOpenState();
      setOpenMap((prev) => {
        const next = { ...prev };
        for (const group of groups) {
          const choice = stored[group.category];
          if (typeof choice === "boolean") next[group.category] = choice;
        }
        return next;
      });
    }
    const id = requestAnimationFrame(() => setAnimationsReady(true));
    return () => cancelAnimationFrame(id);
    // Groups are static per page; run once after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {groups.map((group) => {
        const isActiveGroup = group.items.some((item) => item.isActive);

        return (
          <Collapsible.Root
            key={group.category}
            open={openMap[group.category] ?? false}
            onOpenChange={(open) => {
              setOpenMap((prev) => ({ ...prev, [group.category]: open }));
              if (!forceOpen) storeOpenChoice(group.category, open);
            }}
            className="min-w-0 w-full"
          >
            <Collapsible.Trigger
              className={cn(
                "flex w-full min-w-0 items-center gap-2 py-0.5 text-left text-sm font-medium leading-5 transition-colors outline-none focus-visible:ring-0",
                isActiveGroup
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                "[&[data-panel-open]_.sidebar-chevron]:rotate-90",
              )}
            >
              <span className="min-w-0 flex-1 truncate font-medium">{group.category}</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={13}
                strokeWidth={2}
                className="sidebar-chevron shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-hidden="true"
              />
            </Collapsible.Trigger>
            <Collapsible.Panel
              keepMounted
              className={cn(
                "h-(--collapsible-panel-height) overflow-hidden opacity-100 outline-none data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0",
                animationsReady
                  ? "transition-[height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  : "transition-none",
              )}
            >
              <div className="mt-1 pb-2 flex flex-col gap-1.5 pl-3">
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={item.isActive ? "page" : undefined}
                    className={cn(
                      "text-sm leading-5 transition-colors",
                      item.logo ? "flex min-w-0 items-center gap-1.5" : "block",
                      item.isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.logo ? (
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <BrandLogo
                          src={item.logo.src}
                          className="size-3.5 rounded-xs object-contain"
                          width={14}
                          height={14}
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
    <aside className="hidden w-44 min-w-44 shrink-0 lg:block">
      <div className="sticky top-24 flex max-h-[calc(100svh-6rem)] min-w-0 flex-col">
        <DocsCommandSearchTrigger className="mb-3 w-full shrink-0 self-stretch focus-visible:ring-0" />
        <nav
          aria-label="Docs navigation"
          className="text-foreground min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pr-2 scrollbar-none!"
        >
          <SidebarGroups groups={groups} />
        </nav>
      </div>
    </aside>
  );
}
