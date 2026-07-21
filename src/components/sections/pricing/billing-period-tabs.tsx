import { cn } from "@/lib/utils";
import { yearlyBillingSavingsLabel, type BillingPeriod } from "./pricing-tiers";

type BillingPeriodTabsProps = {
  period: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
  className?: string;
};

export function BillingPeriodTabs({
  period,
  onPeriodChange,
  className,
}: BillingPeriodTabsProps) {
  const isYearly = period === "yearly";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "text-sm font-medium",
          isYearly ? "text-muted-foreground" : "text-foreground",
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label={`${isYearly ? "Yearly" : "Monthly"} billing. Switch to ${isYearly ? "monthly" : "yearly"}.`}
        onClick={() => onPeriodChange(isYearly ? "monthly" : "yearly")}
        className="focus-visible:ring-ring/50 relative inline-flex h-4 w-7 shrink-0 border-0 bg-transparent p-0 outline-none focus-visible:ring-3"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full transition-colors",
            isYearly ? "bg-brand" : "bg-foreground/15",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "bg-foreground absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full transition-transform duration-200 ease-out",
            isYearly ? "translate-x-3.5" : "translate-x-0",
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium",
          isYearly ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Yearly
      </span>
      <span className="text-muted-foreground text-sm font-medium">
        {yearlyBillingSavingsLabel}
      </span>
    </div>
  );
}

export default BillingPeriodTabs;
