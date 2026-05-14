import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { SiteMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
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
                buttonVariants({ variant: "default" }),
                "px-3 whitespace-nowrap sm:px-4",
              )}
            >
              <span className="inline">Start 3-day free trial</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <SiteMobileNavDialog links={siteLinks} groups={docsNavGroups} />
    </div>
  );
}
