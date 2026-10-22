import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BrandLogo } from "@/components/foundations/brand-logo";
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
};

/**
 * Docs navigation, styled like the dashboard sidebar: collapsible groups,
 * closed except the one holding the current page. Native <details>, so it
 * works without client JS; DocsLayout carries open groups across page swaps.
 */
export function SidebarGroups({ groups }: SidebarGroupsProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {groups.map((group) => {
        const isActiveGroup = group.items.some((item) => item.isActive);

        return (
          <details
            key={group.category}
            data-docs-nav-group={group.category}
            data-active-group={isActiveGroup ? "" : undefined}
            open={isActiveGroup}
            className="docs-nav-group group/nav-group min-w-0"
          >
            <summary className="text-foreground/70 hover:text-foreground group/nav-trigger flex h-8 cursor-pointer list-none items-center gap-1 rounded-md px-2 text-xs font-medium transition-colors select-none [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 truncate">{group.category}</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={1.7}
                className="size-3 shrink-0 -rotate-90 transition-[transform,opacity] duration-200 group-open/nav-group:rotate-0 group-open/nav-group:opacity-0 group-hover/nav-trigger:opacity-100"
                aria-hidden="true"
              />
            </summary>
            <ul className="border-border/70 mb-2 ml-2.5 flex flex-col gap-px border-l">
              {group.items.map((item) => (
                <li key={item.href} className="relative pl-2.5">
                  {item.isActive ? (
                    <>
                      {/* Wash pill and brand marker on the rail, as in the
                          dashboard; DocsLayout slides both between pages. */}
                      <span
                        data-docs-nav-pill
                        className="bg-border/60 pointer-events-none absolute inset-y-0 right-0 left-2.5 rounded-md"
                        aria-hidden="true"
                      />
                      <span
                        data-docs-nav-marker
                        className="bg-brand pointer-events-none absolute top-1/2 -left-px h-4 w-0.5 -translate-y-1/2"
                        aria-hidden="true"
                      />
                    </>
                  ) : null}
                  <a
                    href={item.href}
                    aria-current={item.isActive ? "page" : undefined}
                    className={cn(
                      "relative flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-xs leading-5 transition-colors",
                      item.isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:bg-border/40 hover:text-foreground",
                    )}
                  >
                    {item.logo ? (
                      <BrandLogo
                        src={item.logo.src}
                        className="size-3.5 shrink-0 rounded-xs object-contain"
                        width={14}
                        height={14}
                      />
                    ) : null}
                    <span className="min-w-0 truncate">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

export default SidebarGroups;
