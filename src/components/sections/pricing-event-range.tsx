import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  defaultPricingTierIndex,
  pricingTierEvent,
  pricingTiers,
} from "./pricing-tiers";

type PricingEventRangeProps = {
  className?: string;
};

export function PricingEventRange({ className }: PricingEventRangeProps) {
  const [tierIndex, setTierIndex] = useState(defaultPricingTierIndex);
  const maxTierIndex = pricingTiers.length - 1;
  const fillWidth = `${((tierIndex + 1) / pricingTiers.length) * 100}%`;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(pricingTierEvent, { detail: { tierIndex } }),
    );
  }, [tierIndex]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative h-10">
        <div
          aria-hidden="true"
          className="bg-muted absolute inset-0 overflow-hidden rounded-lg"
        >
          <div
            className="bg-border h-full rounded-lg transition-[width] duration-150 ease-out"
            style={{ width: fillWidth }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={maxTierIndex}
          step={1}
          value={tierIndex}
          onChange={(event) => {
            setTierIndex(Number(event.currentTarget.value));
          }}
          className="absolute inset-0 z-10 h-10 w-full cursor-pointer opacity-0"
          aria-label="Estimate event volume tier"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between"
        >
          {pricingTiers.map((tier, index) => (
            <span
              key={tier.events}
              className={cn(
                "size-1 rounded-full transition-colors",
                index <= tierIndex ? "bg-background/80" : "bg-foreground/20",
              )}
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="bg-foreground/60 pointer-events-none absolute top-1/2 z-30 h-6 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left] duration-150 ease-out"
          style={{ left: fillWidth }}
        />
      </div>
      <div className="text-foreground flex items-center justify-between text-xs font-semibold uppercase">
        <span>100k events</span>
        <span>25M events</span>
      </div>
    </div>
  );
}

export default PricingEventRange;
