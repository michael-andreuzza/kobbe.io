import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DocsMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
import type { NavGroup } from "@/components/ui/sidebar";
export type SiteNavigationProps = {
  docsNavGroups?: NavGroup[];
};
export default function SiteNavigation({ docsNavGroups }: SiteNavigationProps) {
  const hasDocsNavigation = Boolean(docsNavGroups?.length);
  const linkClassName =
    "rounded-none bg-transparent p-0 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent";
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NavigationMenu className="max-w-none">
        <NavigationMenuList className="flex flex-wrap justify-end gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs" className={linkClassName}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          {!hasDocsNavigation ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/docs/support-faq"
                className={linkClassName}
              >
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : null}
          <NavigationMenuItem>
            <NavigationMenuLink href="/pricing" className={linkClassName}>
              Free trial
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
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
      {hasDocsNavigation && docsNavGroups ? (
        <DocsMobileNavDialog groups={docsNavGroups} />
      ) : null}
    </div>
  );
}
