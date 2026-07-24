import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingPriceDisplay } from "@/components/sections/pricing/pricing-price-display";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  formatTierLimitLabel,
  getTierDisplayAmount,
  pricingTiers,
  type BillingPeriod,
} from "./pricing-tiers";

type PricingVolumeTableProps = {
  appBaseUrl?: string;
  className?: string;
  showHeading?: boolean;
};

export function PricingVolumeTable({
  appBaseUrl = "https://app.kobbe.io",
  className,
  showHeading = true,
}: PricingVolumeTableProps) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div className={cn("min-w-0", className)}>
      {showHeading ? (
        <div className="text-balance">
          <h2 className="text-foreground text-xl font-semibold md:text-2xl">
            All event volumes
          </h2>
          <p className="text-muted-foreground mt-2 text-base">
            Same features on every tier — choose the monthly event cap that fits,
            then compare billing periods below.
          </p>
        </div>
      ) : null}

      <div className={cn("flex justify-start", showHeading ? "mt-6" : "")}>
        <BillingPeriodTabs
          period={period}
          onPeriodChange={setPeriod}
          className="mx-0"
        />
      </div>

      <div className={cn("grid min-w-0 grid-cols-1", showHeading ? "mt-6" : "mt-4")}>
        <div className="min-w-0 overflow-x-auto [contain:inline-size]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-border/70 border-b">
                <th className="text-muted-foreground py-2 font-medium">
                  Monthly events
                </th>
                <th className="text-muted-foreground py-2 font-medium">
                  {period === "monthly"
                    ? "Monthly price"
                    : "Price (billed annually)"}
                </th>
                <th className="text-muted-foreground py-2 font-medium">
                  <span className="sr-only">Start trial</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingTiers.map((tier) => (
                <tr
                  key={tier.key}
                  className="border-border border-b last:border-b-0"
                >
                  <td className="text-foreground py-2 font-medium">
                    {formatTierLimitLabel(tier.events)}
                  </td>
                  <td className="text-foreground py-2 tabular-nums">
                    <PricingPriceDisplay
                      period={period}
                      monthlyAmount={tier.monthly}
                      displayAmount={getTierDisplayAmount(tier, period)}
                      className="text-sm font-medium"
                      compareClassName="text-sm"
                    />
                  </td>
                  <td className="py-2 text-right">
                    <a
                      href={buildSignupHref(appBaseUrl, tier.key, period)}
                      data-kobbe-event={`Pricing table - ${tier.events} ${period}`}
                      className={cn(
                        buttonVariants({ variant: "default", size: "xs" }),
                      )}
                    >
                      Start trial
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PricingVolumeTable;
