import { cn } from "@/lib/utils";
import {
  formatPricingCurrency,
  pricingAmountSuffix,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

type PricingPriceDisplayProps = {
  period: BillingPeriod;
  monthlyAmount: number;
  displayAmount: number;
  className?: string;
  compareClassName?: string;
};

function StaticPriceAmount({
  amount,
  className,
  suffix = pricingAmountSuffix,
}: {
  amount: number;
  className?: string;
  suffix?: string;
}) {
  const formattedAmount = formatPricingCurrency(amount);

  return (
    <span
      className={cn(
        "inline-flex items-baseline tabular-nums leading-[1.45]",
        className,
      )}
    >
      ${formattedAmount}
      {suffix ? (
        <span className="text-muted-foreground ml-0.5 text-sm font-medium">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

export function PricingPriceDisplay({
  period,
  monthlyAmount,
  displayAmount,
  className,
  compareClassName,
}: PricingPriceDisplayProps) {
  const showYearlyCompare =
    period === "yearly" && monthlyAmount !== displayAmount;

  if (!showYearlyCompare) {
    return <StaticPriceAmount amount={displayAmount} className={className} />;
  }

  const compareLabel = `$${formatPricingCurrency(monthlyAmount)}`;

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 leading-[1.45] tabular-nums",
      )}
      aria-label={`$${formatPricingCurrency(displayAmount)} per month, billed annually, regular price ${compareLabel} per month`}
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
      <StaticPriceAmount amount={displayAmount} className={className} />
    </span>
  );
}

export default PricingPriceDisplay;
