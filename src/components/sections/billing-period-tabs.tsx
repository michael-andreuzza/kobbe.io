import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

const billingPeriodEvent = "kobbe:billing-period-change";

function isBillingPeriod(value: unknown): value is BillingPeriod {
  return value === "monthly" || value === "yearly";
}

export function BillingPeriodTabs({
  className,
  yearlyLabel = "1 month free",
}: {
  className?: string;
  yearlyLabel?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const yearlyRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 2, width: 0 });

  useEffect(() => {
    function handlePeriodChange(event: Event) {
      const next = (event as CustomEvent<{ period?: unknown }>).detail?.period;
      if (isBillingPeriod(next)) {
        setPeriod(next);
      }
    }

    window.addEventListener(billingPeriodEvent, handlePeriodChange);
    return () =>
      window.removeEventListener(billingPeriodEvent, handlePeriodChange);
  }, []);

  function selectPeriod(value: BillingPeriod) {
    setPeriod(value);
    window.dispatchEvent(
      new CustomEvent(billingPeriodEvent, { detail: { period: value } }),
    );
  }

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
        " relative inline-flex h-7 w-fit justify-self-start overflow-hidden rounded-md  p-0.5",
        className,
      )}
      role="group"
      aria-label="Billing period"
    >
      <span
        aria-hidden="true"
        className="bg-muted pointer-events-none absolute top-0.5 bottom-0.5 rounded-sm transition-all duration-200 ease-out"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
        }}
      />
      <button
        ref={monthlyRef}
        type="button"
        data-billing-toggle="monthly"
        data-active={period === "monthly" ? "" : undefined}
        aria-pressed={period === "monthly"}
        onClick={() => selectPeriod("monthly")}
        className={cn(
          "relative z-10 h-6 rounded-sm bg-transparent px-2 text-xs transition-colors",
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
        data-billing-toggle="yearly"
        data-active={period === "yearly" ? "" : undefined}
        aria-pressed={period === "yearly"}
        onClick={() => selectPeriod("yearly")}
        className={cn(
          "relative z-10 h-6 rounded-sm bg-transparent px-2 text-xs transition-colors",
          period === "yearly"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Yearly <span className="ml-1 text-brand">{yearlyLabel}</span>
      </button>
    </div>
  );
}
