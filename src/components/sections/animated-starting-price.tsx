import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  billingPeriodEvent,
  defaultPricingTierIndex,
  formatPricingCurrency,
  isBillingPeriod,
  pricingTierEvent,
  pricingTiers,
  type BillingPeriod,
} from "./pricing-tiers";

function DigitReel({ character }: { character: string }) {
  const digit = Number(character);
  const isDigit = !Number.isNaN(digit);

  return (
    <span
      className={cn(
        "inline-block h-[1em] overflow-hidden align-[-0.06em] transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none",
        isDigit ? "w-[0.62em] opacity-100" : "w-[0.3em] opacity-100",
      )}
    >
      {isDigit ? (
        <span
          className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateY(-${digit}em)` }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} className="h-[1em] text-center leading-[1em]">
              {index}
            </span>
          ))}
        </span>
      ) : (
        <span className="block h-[1em] leading-[1em]">{character}</span>
      )}
    </span>
  );
}

export function AnimatedStartingPrice({ className }: { className?: string }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [tierIndex, setTierIndex] = useState(defaultPricingTierIndex);

  useEffect(() => {
    function handlePeriodChange(event: Event) {
      const next = (event as CustomEvent<{ period?: unknown }>).detail?.period;
      if (isBillingPeriod(next)) {
        setPeriod(next);
      }
    }
    function handleTierChange(event: Event) {
      const next = (event as CustomEvent<{ tierIndex?: unknown }>).detail
        ?.tierIndex;

      if (
        typeof next === "number" &&
        Number.isInteger(next) &&
        pricingTiers[next]
      ) {
        setTierIndex(next);
      }
    }

    window.addEventListener(billingPeriodEvent, handlePeriodChange);
    window.addEventListener(pricingTierEvent, handleTierChange);
    return () => {
      window.removeEventListener(billingPeriodEvent, handlePeriodChange);
      window.removeEventListener(pricingTierEvent, handleTierChange);
    };
  }, []);

  const tier = pricingTiers[tierIndex] ?? pricingTiers[0];
  const price = period === "monthly" ? tier.monthly : tier.yearly;
  const formattedPrice = formatPricingCurrency(price);
  const unit = period === "monthly" ? "/ month" : "/ year";

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <p className="text-foreground text-3xl tracking-tight tabular-nums  uppercase font-semibold">
        <span className="sr-only">
          ${formattedPrice} {unit}
        </span>
        <span aria-hidden="true">$</span>
        <span aria-hidden="true" className="inline-flex">
          {formattedPrice.split("").map((character, index) => (
            <DigitReel key={index} character={character} />
          ))}
        </span>
      </p>
      <span className="text-muted-foreground text-sm">{unit}</span>
    </div>
  );
}
