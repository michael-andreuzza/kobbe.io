import { cn } from "@/lib/utils";

/** Relative stem shape (percent of chart height at the top tier). */
const stems = [
  26, 40, 32, 52, 38, 60, 46, 70, 54, 64, 44, 78, 58, 92, 66, 80, 56, 72,
];

type SimplifiedPricingPreviewProps = {
  /** Selected volume tier (0-based). */
  tierIndex: number;
  tierCount: number;
  /** Tier volume label, e.g. "20K" or "10M". */
  eventsLabel: string;
  className?: string;
};

/**
 * Brand vignette for the pricing card: a lollipop traffic chart that reacts
 * to the volume slider — stems grow with the selected tier and the pinned
 * tooltip mirrors the chosen event volume.
 */
export function SimplifiedPricingPreview({
  tierIndex,
  tierCount,
  eventsLabel,
  className,
}: SimplifiedPricingPreviewProps) {
  const progress = tierCount > 1 ? tierIndex / (tierCount - 1) : 1;
  // Square root keeps the first slider steps visibly distinct instead of
  // bunching all the growth at the top tiers.
  const eased = Math.sqrt(progress);
  const scale = 0.8 + 0.2 * eased;
  const highlighted = 9 + Math.round(eased * 4);

  return (
    <div
      className={cn(
        "bg-muted relative flex min-h-72 items-end overflow-hidden lg:min-h-full",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none flex h-full w-full px-8 pt-20 pb-10 sm:px-12 lg:px-10">
        <div className="relative flex h-full min-h-56 w-full items-end justify-between">
          {stems.map((base, index) => {
            const active = index === highlighted;
            const heightPct = Math.max(8, base * scale);
            return (
              <div
                key={index}
                className="relative flex h-full w-3 items-end justify-center"
              >
                {active ? (
                  <>
                    <div
                      className="border-foreground/25 absolute inset-y-0 left-1/2 border-l border-dashed"
                      aria-hidden="true"
                    />
                    <div className="bg-foreground text-background absolute -top-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shadow-md">
                      <span
                        className="bg-brand size-1.5 rounded-[2px]"
                        aria-hidden="true"
                      />
                      {eventsLabel} events/mo
                    </div>
                  </>
                ) : null}
                <div
                  className="relative flex flex-col items-center transition-[height] duration-500 ease-out motion-reduce:transition-none"
                  style={{ height: `${heightPct}%` }}
                >
                  <div
                    className={cn(
                      "size-3 shrink-0 rounded-full",
                      active ? "bg-brand" : "bg-foreground/75",
                    )}
                  />
                  <div
                    className={cn(
                      "w-px flex-1",
                      active ? "bg-brand" : "bg-foreground/40",
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SimplifiedPricingPreview;
