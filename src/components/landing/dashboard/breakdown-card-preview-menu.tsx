import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type BreakdownCardPreviewMenuProps = {
  ariaLabel?: string;
};

/** Decorative 3-dot menu affordance for marketing dashboard previews. */
export function BreakdownCardPreviewMenu({
  ariaLabel = "Card actions",
}: BreakdownCardPreviewMenuProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      tabIndex={-1}
      aria-hidden
      className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground"
    >
      <HugeiconsIcon
        icon={MoreVerticalIcon}
        className="size-3.5"
        strokeWidth={1.8}
        aria-hidden
      />
    </button>
  );
}
