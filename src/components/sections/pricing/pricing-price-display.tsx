import NumberFlow from "@number-flow/react";

import { cn } from "@/lib/utils";
import {
  formatPricingCurrency,
  pricingAmountSuffix,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

type PricingPriceDisplayProps = {
  period: BillingPeriod;
  displayAmount: number;
  /** Full annual charge when `period` is yearly. */
  yearlyTotalAmount?: number;
  className?: string;
};

/** All plan amounts are whole dollars, so never show cents. */
const priceFormat: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};

function PriceAmount({
  amount,
  className,
  suffix = pricingAmountSuffix,
}: {
  amount: number;
  className?: string;
  suffix?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline leading-[1.45] tabular-nums",
        className,
      )}
    >
      <NumberFlow
        value={amount}
        locales="en-US"
        format={priceFormat}
        className="text-foreground font-display pr-2 text-xl font-medium tracking-tight sm:text-2xl"
      />
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
  displayAmount,
  yearlyTotalAmount,
  className,
}: PricingPriceDisplayProps) {
  const showYearlyTotal =
    period === "yearly" && yearlyTotalAmount != null;

  const ariaLabel =
    period === "yearly" && yearlyTotalAmount != null
      ? `$${formatPricingCurrency(yearlyTotalAmount)} per year, $${formatPricingCurrency(displayAmount)} per month, billed annually`
      : `$${formatPricingCurrency(displayAmount)} per month, billed monthly`;

  if (showYearlyTotal) {
    return (
      <span aria-label={ariaLabel} className="inline-flex">
        <PriceAmount
          amount={yearlyTotalAmount}
          className={className}
          suffix="/yr"
        />
      </span>
    );
  }

  return (
    <span aria-label={ariaLabel} className="inline-flex">
      <PriceAmount amount={displayAmount} className={className} />
    </span>
  );
}

export default PricingPriceDisplay;
