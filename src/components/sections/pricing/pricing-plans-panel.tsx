import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BillingPeriodToggle } from "@/components/sections/pricing/billing-period-toggle";
import { PricingPriceDisplay } from "@/components/sections/pricing/pricing-price-display";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  formatTierTrialPriceNote,
  getTierDisplayAmount,
  pricingTiers,
  pricingTrialDays,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

export function PricingPlansPanel({
  appBaseUrl = "https://app.kobbe.io",
  className,
}: {
  appBaseUrl?: string;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const startingTier = pricingTiers[0]!;
  const signupHref = buildSignupHref(appBaseUrl, startingTier.key, period);
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <BillingPeriodToggle
        period={period}
        onPeriodChange={setPeriod}
        className="shrink-0"
      />

      <ul className="mt-6 list-none" role="list">
        {pricingTiers.map((tier, i) => (
          <li
            key={tier.key}
            className={cn(
              "border-border flex items-baseline justify-between gap-4 py-1",
              i > 0 && "border-t",
            )}
          >
            <span className="text-foreground text-sm font-medium">
              {tier.events} events a month
            </span>
            <PricingPriceDisplay
              period={period}
              displayAmount={getTierDisplayAmount(tier, period)}
              yearlyTotalAmount={period === "yearly" ? tier.yearly : undefined}
              className="text-foreground text-sm font-medium"
              amountClassName="pr-1 text-base sm:text-lg"
            />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          href={signupHref}
          label={trialCtaLabel}
          variant="solid"
          size="lg"
          block
          data-kobbe-event={`Simplified pricing - ${startingTier.events} ${period}`}
        />
        <p className="text-muted-foreground mt-4 text-xs text-balance">
          {formatTierTrialPriceNote(startingTier, period)} Upgrade or downgrade
          anytime and cancel anytime
        </p>
      </div>
    </div>
  );
}

export default PricingPlansPanel;
