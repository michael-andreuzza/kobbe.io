import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

const billingPeriodEvent = "kobbe:billing-period-change";

function isBillingPeriod(value: unknown): value is BillingPeriod {
  return value === "monthly" || value === "yearly";
}

function DigitReel({ digit }: { digit: number | null }) {
  return (
    <span
      className={cn(
        "inline-block h-[1em] overflow-hidden align-[-0.06em] transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none",
        digit === null ? "w-0 opacity-0" : "w-[0.62em] opacity-100",
      )}
    >
      <span
        className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${digit ?? 0}em)` }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className="h-[1em] text-center leading-[1em]">
            {index}
          </span>
        ))}
      </span>
    </span>
  );
}

export function AnimatedStartingPrice({ className }: { className?: string }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

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

  const price = period === "monthly" ? "From $15" : "From $165";
  const digits = period === "monthly" ? [null, 1, 5] : [1, 6, 5];
  const unit = period === "monthly" ? "/ month" : "/ year";

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <p className="text-foreground text-3xl tracking-tight tabular-nums font-display">
        <span className="sr-only">{price}</span>
        <span aria-hidden="true">From $</span>
        <span aria-hidden="true" className="inline-flex">
          {digits.map((digit, index) => (
            <DigitReel key={index} digit={digit} />
          ))}
        </span>
      </p>
      <span className="text-muted-foreground text-sm">{unit}</span>
    </div>
  );
}
