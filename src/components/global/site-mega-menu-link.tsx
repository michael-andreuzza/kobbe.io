import { BrandLogo } from "@/components/foundations/brand-logo";
import { cn } from "@/lib/utils";
import type { MegaMenuColumn, MegaMenuLink } from "@/lib/site-mega-menu";

type SiteMegaMenuLinkProps = {
  link: MegaMenuLink;
  compact?: boolean;
  className?: string;
  onNavigate?: () => void;
};

const detailedLinkClassName =
  "hover:bg-muted block rounded-lg px-2.5 py-2 transition-colors focus:bg-transparent focus-visible:ring-0";

const compactLinkClassName =
  "hover:bg-muted flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors focus:bg-transparent focus-visible:ring-0";

const columnTitleClassName =
  "text-foreground text-sm font-semibold tracking-tight transition-colors";

const brandLogoClassName = "size-4 shrink-0 rounded-[0.2rem] object-contain";

export function MegaMenuColumnTitle({
  column,
  className,
}: {
  column: MegaMenuColumn;
  className?: string;
}) {
  if (column.seeAllHref) {
    return (
      <div className={cn("flex items-center justify-between gap-3", className)}>
        <p className={columnTitleClassName}>{column.title}</p>
        <a
          href={column.seeAllHref}
          className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-medium transition-colors"
        >
          {column.seeAllLabel ?? "See all"}
        </a>
      </div>
    );
  }

  return <p className={cn(columnTitleClassName, className)}>{column.title}</p>;
}

export function MegaMenuLinkContent({
  link,
  compact = false,
}: {
  link: MegaMenuLink;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <>
        {link.logo ? (
          <BrandLogo
            src={link.logo.src}
            className={brandLogoClassName}
            width={16}
            height={16}
          />
        ) : null}
        <span className="text-foreground text-sm leading-snug font-medium">
          {link.label}
        </span>
      </>
    );
  }

  return (
    <>
      <span className="flex items-center gap-2">
        {link.logo ? (
          <BrandLogo
            src={link.logo.src}
            className={brandLogoClassName}
            width={16}
            height={16}
          />
        ) : null}
        <span className="text-foreground text-sm leading-snug font-medium">
          {link.label}
        </span>
      </span>
      {link.description ? (
        <span className="text-muted-foreground mt-0.5 block text-xs leading-normal">
          {link.description}
        </span>
      ) : null}
    </>
  );
}

export function SiteMegaMenuPlainLink({
  link,
  compact = false,
  className,
  onNavigate,
}: SiteMegaMenuLinkProps) {
  return (
    <a
      href={link.href}
      target={link.target}
      rel={link.rel}
      onClick={onNavigate}
      className={cn(
        compact ? compactLinkClassName : detailedLinkClassName,
        className,
      )}
    >
      <MegaMenuLinkContent link={link} compact={compact} />
    </a>
  );
}
