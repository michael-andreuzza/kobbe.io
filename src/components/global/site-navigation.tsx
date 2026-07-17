import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SiteMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
import type { NavGroup } from "@/components/ui/sidebar";

export type SiteNavigationProps = {
  docsNavGroups?: NavGroup[];
};
export default function SiteNavigation({ docsNavGroups }: SiteNavigationProps) {
  const hasDocsNavigation = Boolean(docsNavGroups?.length);
  const linkClassName =
    "bg-transparent p-0 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent";
  const siteLinks = [
    { href: "/#pricing", label: "Pricing" },
    ...(!hasDocsNavigation
      ? [{ href: "/#faq", label: "FAQ" }]
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
            <NavigationMenuLink href="/#pricing" className={linkClassName}>
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
          {!hasDocsNavigation ? (
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink
                href="/#faq"
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
        </NavigationMenuList>
      </NavigationMenu>
      <SiteMobileNavDialog links={siteLinks} groups={docsNavGroups} />
    </div>
  );
}
