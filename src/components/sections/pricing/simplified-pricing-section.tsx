import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import { PricingPriceDisplay } from "@/components/sections/pricing/pricing-price-display";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  buildSimplifiedPricingFeatureRows,
  formatTierTrialPriceNote,
  getTierDisplayAmount,
  pricingTiers,
  pricingTrialDays,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

export function SimplifiedPricingSection({
  appBaseUrl = "https://app.kobbe.io",
  className,
}: {
  appBaseUrl?: string;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const startingTier = pricingTiers[0]!;
  const featureRows = buildSimplifiedPricingFeatureRows(startingTier.key);

  const signupHref = buildSignupHref(appBaseUrl, startingTier.key, period);
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  /** Flat panels, copy top, content bottom. */
  const panelClassName =
    "text-foreground relative flex min-w-0 flex-col justify-between gap-10 overflow-hidden rounded-lg p-4 sm:p-6";

  return (
    <div
      id="pricing"
      className={cn(
        "grid w-full min-w-0 grid-cols-1 items-stretch gap-8 lg:grid-cols-2",
        className,
      )}
    >
      {/* Carbon card first on mobile; checklist left, carbon right on lg. */}
      <article
        className={cn(panelClassName, "bg-muted", "order-2 lg:order-1")}
        aria-label="Included features"
      >
        <div className="max-w-md space-y-1">
          <p className="text-foreground text-base font-medium">
            Everything included
          </p>
          <p className="text-muted-foreground text-base text-pretty lg:text-balance">
            Same features on every plan; only the event volume changes.
          </p>
        </div>
        <ul
          className="text-foreground grid list-none grid-cols-1 items-start gap-y-1.5 font-medium"
          role="list"
        >
          {featureRows.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <PricingFeatureMark />
              <p className="text-foreground text-sm tracking-tight">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </article>

      <article
        className={cn(panelClassName, "inverted bg-card", "order-1 lg:order-2")}
        aria-label="Pricing plans"
      >
        <div className="max-w-md space-y-1">
          <p className="text-foreground text-base font-medium">Pricing</p>
          <p className="text-muted-foreground text-base text-pretty lg:text-balance">
            Same features on every plan. Start with a {pricingTrialDays}-day
            free trial, no credit card required.
          </p>
        </div>

        <div className="flex min-w-0 flex-col">
          <BillingPeriodTabs
            period={period}
            onPeriodChange={setPeriod}
            className="mt-6 shrink-0"
          />

          {/* The full ladder, one hairline row per tier. */}
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
                  yearlyTotalAmount={
                    period === "yearly" ? tier.yearly : undefined
                  }
                  className="text-foreground text-sm font-medium"
                  amountClassName="pr-1 text-base sm:text-lg"
                />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <a
              href={signupHref}
              data-kobbe-event={`Simplified pricing - ${startingTier.events} ${period}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                /* Same docs-arrow chrome as the hero's Live demo button;
                   uninverted so the card fill stays light inside this
                   carbon panel. */
                "uninverted border-border bg-card text-muted-foreground hover:bg-card hover:text-foreground",
                "w-full",
              )}
            >
              {trialCtaLabel}
            </a>
            <p className="text-muted-foreground mt-4 text-xs text-balance">
              {formatTierTrialPriceNote(startingTier, period)} Upgrade or
              downgrade anytime and cancel anytime
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default SimplifiedPricingSection;
