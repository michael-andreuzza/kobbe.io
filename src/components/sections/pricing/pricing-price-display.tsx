import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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

const tickerSpring = {
  type: "spring" as const,
  stiffness: 900,
  damping: 60,
  mass: 0.8,
};

function PriceAmount({
  amount,
  className,
  suffix = pricingAmountSuffix,
  animate = true,
}: {
  amount: number;
  className?: string;
  suffix?: string;
  animate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const previousAmount = useRef(amount);
  const direction = amount >= previousAmount.current ? 1 : -1;
  previousAmount.current = amount;

  const amountClassName =
    "text-foreground font-display overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] py-0.5 pr-2 text-4xl font-normal tracking-tight italic sm:text-5xl";

  const formattedAmount = `$${formatPricingCurrency(amount)}`;

  return (
    <span
      className={cn(
        "inline-flex items-baseline leading-[1.45] tabular-nums",
        className,
      )}
    >
      <span className={amountClassName}>
        {animate ? (
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.span
              key={amount}
              custom={direction}
              className="inline-block will-change-transform"
              variants={{
                enter: (dir: number) =>
                  reduceMotion
                    ? {}
                    : { y: dir > 0 ? "100%" : "-100%", opacity: 0 },
                center: { y: "0%", opacity: 1 },
                exit: (dir: number) =>
                  reduceMotion
                    ? {}
                    : { y: dir > 0 ? "-100%" : "100%", opacity: 0 },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduceMotion ? { duration: 0 } : tickerSpring}
            >
              {formattedAmount}
            </motion.span>
          </AnimatePresence>
        ) : (
          formattedAmount
        )}
      </span>
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
