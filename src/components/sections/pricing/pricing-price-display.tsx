import { cn } from "@/lib/utils";
import { RollingPriceAmount } from "@/components/sections/pricing/rolling-price-amount";
import {
  formatPricingCurrency,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

type PricingPriceDisplayProps = {
  period: BillingPeriod;
  monthlyAmount: number;
  displayAmount: number;
  spinToken: string | number;
  className?: string;
  compareClassName?: string;
};

export function PricingPriceDisplay({
  period,
  monthlyAmount,
  displayAmount,
  spinToken,
  className,
  compareClassName,
}: PricingPriceDisplayProps) {
  const showYearlyCompare =
    period === "yearly" && monthlyAmount !== displayAmount;

  if (!showYearlyCompare) {
    return (
      <RollingPriceAmount
        amount={displayAmount}
        spinToken={spinToken}
        className={className}
      />
    );
  }

  const compareLabel = `$${formatPricingCurrency(monthlyAmount)}`;

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 leading-[1.45] tabular-nums",
      )}
      aria-label={`$${formatPricingCurrency(displayAmount)} per month billed yearly, regular price ${compareLabel} per month`}
    >
      <span
        aria-hidden="true"
        className={cn(
          "text-muted-foreground decoration-muted-foreground/50 font-medium line-through",
          compareClassName ?? className,
        )}
      >
        {compareLabel}
      </span>
      <RollingPriceAmount
        amount={displayAmount}
        spinToken={spinToken}
        className={className}
      />
    </span>
  );
}

export default PricingPriceDisplay;
