import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocsMobileNavDialog } from "@/components/global/docs-mobile-nav-dialog";
import type { NavGroup } from "@/components/ui/sidebar";
export type SiteNavigationProps = {
  docsNavGroups?: NavGroup[];
};
export default function SiteNavigation({ docsNavGroups }: SiteNavigationProps) {
  const hasDocsNavigation = Boolean(docsNavGroups?.length);
  const linkClassName = cn(buttonVariants({ variant: "ghost", size: "sm" }));
  const signInClassName = cn(
    buttonVariants({ variant: "secondary", size: "sm" }),
  );
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <NavigationMenu className="max-w-none">
        <NavigationMenuList className="flex flex-wrap justify-end gap-0">
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
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="https://app.kobbe.io"
              target="_blank"
              rel="noopener noreferrer"
              className={signInClassName}
            >
              Sign in
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {hasDocsNavigation ? (
        <DocsMobileNavDialog groups={docsNavGroups} />
      ) : null}
    </div>
  );
}
