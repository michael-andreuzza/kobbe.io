import { playUiSound } from "@/lib/ui-sounds";
import { cn } from "@/lib/utils";
import { yearlyBillingSavingsLabel, type BillingPeriod } from "./pricing-tiers";

type BillingPeriodToggleProps = {
  period: BillingPeriod;
  onPeriodChange: (period: BillingPeriod) => void;
  /** Use on `bg-dark-background` panels where ink tokens would disappear. */
  variant?: "default" | "dark";
  className?: string;
};

export function BillingPeriodToggle({
  period,
  onPeriodChange,
  variant = "default",
  className,
}: BillingPeriodToggleProps) {
  const isYearly = period === "yearly";
  const isDark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "text-sm font-medium",
          isDark
            ? isYearly
              ? "text-surface/70"
              : "text-surface"
            : isYearly
              ? "text-muted-foreground"
              : "text-foreground",
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        aria-label={`${isYearly ? "Yearly" : "Monthly"} billing. Switch to ${isYearly ? "monthly" : "yearly"}.`}
        onClick={() => {
          playUiSound(isYearly ? "toggle-off" : "toggle-on");
          onPeriodChange(isYearly ? "monthly" : "yearly");
        }}
        className="focus-visible:ring-border/50 relative inline-flex h-4 w-7 shrink-0 border-0 bg-transparent p-0 outline-none focus-visible:ring-3"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full transition-colors",
            isYearly
              ? "bg-brand"
              : isDark
                ? "bg-surface/25"
                : "bg-foreground/25",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full transition-transform duration-200 ease-out",
            isDark ? "bg-surface" : "bg-foreground",
            isYearly ? "translate-x-3.5" : "translate-x-0",
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium",
          isDark
            ? isYearly
              ? "text-surface"
              : "text-surface/70"
            : isYearly
              ? "text-foreground"
              : "text-muted-foreground",
        )}
      >
        Yearly
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          isDark ? "text-surface/50" : "text-muted-foreground",
        )}
      >
        {yearlyBillingSavingsLabel}
      </span>
    </div>
  );
}

export default BillingPeriodToggle;
