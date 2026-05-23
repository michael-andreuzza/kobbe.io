import { useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatPricingCurrency,
  formatTierLimitLabel,
  popularPricingTierIndices,
  pricingTiers,
  type BillingPeriod,
} from "./pricing-tiers";

type PricingTierSelectorsProps = {
  period: BillingPeriod;
  tierIndex: number;
  onTierIndexChange: (index: number) => void;
  className?: string;
};

function formatTierPrice(
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  const amount = period === "monthly" ? tier.monthly : tier.yearly;
  const suffix = period === "monthly" ? "month" : "year";
  return `$${formatPricingCurrency(amount)}/${suffix}`;
}

export function PricingTierSelectors({
  period,
  tierIndex,
  onTierIndexChange,
  className,
}: PricingTierSelectorsProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleIndices = useMemo(() => {
    if (showAll) {
      return pricingTiers.map((_tier, index) => index);
    }

    return [...popularPricingTierIndices].sort((a, b) => a - b);
  }, [showAll]);

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className="grid gap-2"
        role="radiogroup"
        aria-label="Monthly event volume"
      >
        {visibleIndices.map((index) => {
          const tier = pricingTiers[index] ?? pricingTiers[0];
          const selected = index === tierIndex;

          return (
            <button
              key={tier.key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onTierIndexChange(index)}
              className={cn(
                "ring-border bg-card flex w-full flex-col justify-between gap-x-4 gap-y-2 rounded-md border border-transparent p-3 text-left text-sm shadow transition-colors duration-300 ease-in lg:flex-row lg:items-center",
                selected
                  ? "text-foreground border-transparent invert"
                  : "text-muted-foreground hover:border-brand hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  selected ? "text-foreground" : "text-foreground",
                )}
              >
                {formatTierPrice(tier, period)}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm lg:text-right",
                  selected ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {formatTierLimitLabel(tier.events)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="text-center">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-muted-foreground px-0 ring-0 hover:bg-transparent",
          )}
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? "Show fewer plans" : "Show all plans"}
        </button>
      </div>
    </div>
  );
}

export default PricingTierSelectors;
