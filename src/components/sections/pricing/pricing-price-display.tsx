import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  formatPricingCurrency,
  pricingAmountSuffix,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

/**
 * NumberFlow's custom element attaches a shadow root, which throws when the
 * ClientRouter swaps server-rendered markup back into the live document
 * (attachShadow on a host that already has one) and kills the whole island.
 * So the server renders the same value as plain text and NumberFlow mounts
 * client-side only, where it always creates its element fresh.
 */
export function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format?: Intl.NumberFormatOptions;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className={className}>
        {new Intl.NumberFormat("en-US", format).format(value)}
      </span>
    );
  }
  return (
    <NumberFlow
      value={value}
      locales="en-US"
      format={format}
      className={className}
    />
  );
}

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
      <AnimatedNumber
        value={amount}
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

  // No rounded per-month equivalent here: it reads as a price and never
  // multiplies back to the total. The breakdown label carries the math.
  const ariaLabel =
    period === "yearly" && yearlyTotalAmount != null
      ? `$${formatPricingCurrency(yearlyTotalAmount)} per year, billed annually — 2 months free`
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
