import { HugeiconsIcon } from "@hugeicons/react";
import { Share08Icon } from "@hugeicons/core-free-icons";

type ChartShareButtonProps = {
  ariaLabel?: string;
};

/** Decorative share affordance for marketing dashboard previews. */
export function ChartShareButton({
  ariaLabel = "Share chart",
}: ChartShareButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      tabIndex={-1}
      aria-hidden
      className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground"
    >
      <HugeiconsIcon
        icon={Share08Icon}
        className="size-3.5"
        strokeWidth={1.8}
        aria-hidden
      />
    </button>
  );
}
