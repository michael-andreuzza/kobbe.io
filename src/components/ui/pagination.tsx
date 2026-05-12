import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  variant,
  size = "default",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: variant ?? (isActive ? "outline" : "ghost"),
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <span>{children}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  children = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{children}</span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </PaginationLink>
  );
}

function PaginationPreviousIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PaginationLink>, "children" | "size">) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="icon"
      variant="secondary"
      className={className}
      {...props}
    >
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </PaginationLink>
  );
}

function PaginationNextIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PaginationLink>, "children" | "size">) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="icon"
      variant="secondary"
      className={className}
      {...props}
    >
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={14}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNextIcon,
  PaginationPrevious,
  PaginationPreviousIcon,
};
