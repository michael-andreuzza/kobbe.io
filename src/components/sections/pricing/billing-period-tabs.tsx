import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { BillingPeriod } from "./pricing-tiers";

type BillingPeriodTabsProps = {
  period: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
  className?: string;
  yearlyLabel?: string;
};

export function BillingPeriodTabs({
  period,
  onPeriodChange,
  className,
  yearlyLabel = "Yearly -44%",
}: BillingPeriodTabsProps) {
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const yearlyRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 2, width: 0 });

  useLayoutEffect(() => {
    const activeButton =
      period === "monthly" ? monthlyRef.current : yearlyRef.current;

    if (!activeButton) return;

    setSliderStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    });
  }, [period, yearlyLabel]);

  return (
    <div
      className={cn(
        "bg-muted relative mx-auto flex h-7 w-fit shrink-0 overflow-hidden rounded-md p-0.5",
        className,
      )}
      role="group"
      aria-label="Billing period"
    >
      <span
        aria-hidden="true"
        className="bg-card pointer-events-none absolute top-0.5 bottom-0.5 rounded-sm shadow-sm transition-all duration-200 ease-out"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
        }}
      />
      <button
        ref={monthlyRef}
        type="button"
        aria-pressed={period === "monthly"}
        onClick={() => onPeriodChange("monthly")}
        className={cn(
          "relative z-10 h-6 rounded-sm bg-transparent px-2 text-xs font-medium transition-colors",
          period === "monthly"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Monthly
      </button>
      <button
        ref={yearlyRef}
        type="button"
        aria-pressed={period === "yearly"}
        onClick={() => onPeriodChange("yearly")}
        className={cn(
          "relative z-10 h-6 rounded-sm bg-transparent px-2 text-xs font-medium transition-colors",
          period === "yearly"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Yearly{" "}
        <span className="text-foreground ml-1 font-semibold uppercase">
          {yearlyLabel}
        </span>
      </button>
    </div>
  );
}

export default BillingPeriodTabs;
