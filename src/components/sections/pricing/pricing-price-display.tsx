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
  monthlyAmount: number;
  displayAmount: number;
  className?: string;
  compareClassName?: string;
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
}: {
  amount: number;
  className?: string;
  suffix?: string;
}) {
  const reduceMotion = useReducedMotion();
  const previousAmount = useRef(amount);
  const direction = amount >= previousAmount.current ? 1 : -1;
  previousAmount.current = amount;

  return (
    <span
      className={cn(
        "inline-flex items-baseline leading-[1.45] tabular-nums",
        className,
      )}
    >
      <span className="text-foreground font-display overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] py-0.5 pr-2 text-4xl font-normal tracking-tight italic sm:text-5xl">
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
            ${formatPricingCurrency(amount)}
          </motion.span>
        </AnimatePresence>
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
  monthlyAmount,
  displayAmount,
  className,
  compareClassName,
}: PricingPriceDisplayProps) {
  const showYearlyCompare =
    period === "yearly" && monthlyAmount !== displayAmount;

  if (!showYearlyCompare) {
    return <PriceAmount amount={displayAmount} className={className} />;
  }

  const compareLabel = `$${formatPricingCurrency(monthlyAmount)}`;

  return (
    <span
      className="inline-flex items-baseline gap-1.5 leading-[1.45] tabular-nums"
      aria-label={`$${formatPricingCurrency(displayAmount)} per month, billed annually, regular price ${compareLabel} per month`}
    >
      <span
        aria-hidden="true"
        className={cn(
          "text-muted-foreground decoration-muted-foreground font-medium line-through opacity-40",
          compareClassName ?? className,
        )}
      >
        {compareLabel}
      </span>
      <PriceAmount amount={displayAmount} className={className} />
    </span>
  );
}

export default PricingPriceDisplay;
