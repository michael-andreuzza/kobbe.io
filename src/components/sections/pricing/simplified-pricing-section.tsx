import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import {
  AnimatedNumber,
  PricingPriceDisplay,
} from "@/components/sections/pricing/pricing-price-display";
import { PricingVolumeSlider } from "@/components/sections/pricing/pricing-volume-slider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  buildSimplifiedPricingFeatureRows,
  formatTierBillingPeriodLabel,
  formatTierTrialPriceNote,
  formatYearlyBillingBreakdownLabel,
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
  const [tierIndex, setTierIndex] = useState(0);

  const tier = pricingTiers[tierIndex]!;
  const displayAmount = getTierDisplayAmount(tier, period);
  const featureRows = buildSimplifiedPricingFeatureRows(tier.key);

  const signupHref = buildSignupHref(appBaseUrl, tier.key, period);
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  /** Muted panels matching the showcase feed cards: copy top, content bottom. */
  const panelClassName =
    "bg-card text-foreground relative flex min-w-0 flex-col justify-between gap-10 overflow-hidden rounded-lg p-4 shadow-sm sm:p-6";

  return (
    <div
      id="pricing"
      className={cn(
        "grid w-full min-w-0 grid-cols-1 items-stretch gap-2 lg:grid-cols-2",
        className,
      )}
    >
      {/* Carbon box, shown after the feature list on desktop. */}
      <article
        className={cn(panelClassName, "inverted bg-card")}
        aria-label="Pricing plans"
      >
        <div className="max-w-md space-y-1">
          <p className="text-foreground text-xs font-medium">Pricing</p>
          <p className="text-muted-foreground text-xs text-balance">
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

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-foreground font-display text-xl font-medium tracking-tight sm:text-2xl">
                <AnimatedNumber
                  value={tier.eventsCount}
                  format={{ notation: "compact" }}
                  className="tabular-nums"
                />
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                Events
              </p>
            </div>

            <div className="flex flex-col items-end">
              <PricingPriceDisplay
                period={period}
                displayAmount={displayAmount}
                yearlyTotalAmount={
                  period === "yearly" ? tier.yearly : undefined
                }
                className="text-foreground text-lg font-semibold tracking-tighter"
              />
              <p className="text-muted-foreground ml-auto text-sm font-medium">
                {period === "monthly"
                  ? formatTierBillingPeriodLabel(period)
                  : formatYearlyBillingBreakdownLabel(tier)}
              </p>
            </div>
          </div>

          {/* Sand fill on a dark muted rail inside the inverted panel. */}
          <div className="mt-4 [--background:var(--sand)] [--card:var(--muted)]">
            <PricingVolumeSlider
              value={tierIndex}
              onChange={setTierIndex}
              valueLabel={tier.events}
            />
          </div>

          <div className="mt-4">
            <a
              href={signupHref}
              data-kobbe-event={`Simplified pricing - ${tier.events} ${period}`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              {trialCtaLabel}
            </a>
            <p className="text-muted-foreground mt-4 text-xs text-balance">
              {formatTierTrialPriceNote(tier, period)} Upgrade or downgrade
              anytime and cancel anytime
            </p>
          </div>
        </div>
      </article>

      <article className={cn(panelClassName)} aria-label="Included features">
        <div className="max-w-md space-y-1">
          <p className="text-foreground text-xs font-medium">
            Everything included
          </p>
          <p className="text-muted-foreground text-xs text-pretty">
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
    </div>
  );
}

export default SimplifiedPricingSection;
