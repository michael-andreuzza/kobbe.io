import { useState } from "react";
import { EqualSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { DocsMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
import type { NavGroup } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export type SiteNavigationProps = {
  docsNavGroups?: NavGroup[];
};
export default function SiteNavigation({ docsNavGroups }: SiteNavigationProps) {
  const hasDocsNavigation = Boolean(docsNavGroups?.length);
  const linkClassName =
    "rounded-none bg-transparent p-0 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent";
  const siteLinks = [
    { href: "/pricing#benefits", label: "All Features" },
    { href: "/docs", label: "Docs" },
    ...(!hasDocsNavigation
      ? [{ href: "/docs/support-faq", label: "FAQ" }]
      : []),
    {
      href: "https://app.kobbe.io",
      label: "Sign in",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NavigationMenu className="max-w-none">
        <NavigationMenuList className="flex flex-nowrap justify-end gap-2 sm:gap-4">
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink
              href="/pricing#benefits"
              className={linkClassName}
            >
              All Features
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink href="/docs" className={linkClassName}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          {!hasDocsNavigation ? (
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink
                href="/docs/support-faq"
                className={linkClassName}
              >
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
          <NavigationMenuItem className="hidden sm:block">
            <NavigationMenuLink
              href="https://app.kobbe.io"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Sign in
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "whitespace-nowrap px-3 sm:px-4",
              )}
            >

              <span className="inline">Start 3-day free trial</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <MobileSiteNavAccordion links={siteLinks} />
      {hasDocsNavigation && docsNavGroups ? (
        <DocsMobileNavDialog groups={docsNavGroups} />
      ) : null}
    </div>
  );
}

function MobileSiteNavAccordion({
  links,
}: {
  links: {
    href: string;
    label: string;
    target?: string;
    rel?: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="text-foreground focus-visible:ring-ring/40 inline-flex size-8 items-center justify-center rounded-md outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2"
      >
        <HugeiconsIcon
          icon={EqualSignIcon}
          size={20}
          strokeWidth={1.8}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-90",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "bg-muted absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden   transition-[opacity,transform,visibility] duration-200 ease-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <nav
          aria-label="Site navigation"
          className="grid gap-1 p-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.target}
              rel={link.rel}
              onClick={() => setIsOpen(false)}
              className="text-foreground uppercase  hover:bg-muted text-xl font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
