import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import {
  PricingPriceDisplay,
  PricingTickerText,
} from "@/components/sections/pricing/pricing-price-display";
import { PricingVolumeSlider } from "@/components/sections/pricing/pricing-volume-slider";
import { buttonVariants } from "@/components/ui/button";
import { sampleTrafficGradient } from "@/components/landing/dashboard/traffic-gradient";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  buildSimplifiedPricingFeatureRows,
  formatTierBillingPeriodLabel,
  formatTierTrialPriceNote,
  formatYearlyEquivalentBillingLabel,
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

  const cardClassName =
    "bg-card text-foreground relative flex min-w-0 flex-col overflow-hidden rounded-lg p-4 shadow-sm lg:p-8 dark:bg-linear-to-b dark:from-white/3 dark:to-white/0";

  // Aurora glow along the bottom of the features card: soft radial blobs
  // sampled from the traffic chart ramp (violet -> magenta -> pink -> orange).
  const auroraGlow = [
    `radial-gradient(55% 90% at 8% 100%, ${sampleTrafficGradient(0)}, transparent 70%)`,
    `radial-gradient(45% 75% at 38% 100%, ${sampleTrafficGradient(0.38)}, transparent 70%)`,
    `radial-gradient(50% 80% at 70% 100%, ${sampleTrafficGradient(0.7)}, transparent 70%)`,
    `radial-gradient(55% 95% at 100% 100%, ${sampleTrafficGradient(1)}, transparent 70%)`,
  ].join(", ");

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <article className={cardClassName}>
          <BillingPeriodTabs
            period={period}
            onPeriodChange={setPeriod}
            className="shrink-0"
          />

          <p className="text-muted-foreground mt-12 text-sm font-medium text-balance">
            Pageviews, custom events, and Web Vitals share one monthly limit
            across your workspace.
          </p>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-foreground font-display text-4xl font-medium tracking-tight sm:text-5xl">
                <PricingTickerText text={tier.events} value={tierIndex} />
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                Events
              </p>
            </div>

            <div className="flex flex-col items-end">
              <PricingPriceDisplay
                period={period}
                displayAmount={displayAmount}
                yearlyTotalAmount={period === "yearly" ? tier.yearly : undefined}
                className="text-foreground text-xl font-semibold tracking-tighter"
              />
              <p className="text-muted-foreground ml-auto text-sm font-medium">
                {period === "monthly"
                  ? formatTierBillingPeriodLabel(period)
                  : formatYearlyEquivalentBillingLabel(displayAmount)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <PricingVolumeSlider
              value={tierIndex}
              onChange={setTierIndex}
              valueLabel={tier.events}
            />
          </div>

          <div className="mt-auto pt-8">
            <a
              href={signupHref}
              data-kobbe-event={`Simplified pricing - ${tier.events} ${period}`}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full",
              )}
            >
              {trialCtaLabel}
            </a>
            <p className="text-muted-foreground border-border mt-4 border-t pt-4 text-xs font-medium text-balance">
              {formatTierTrialPriceNote(displayAmount, period)} Upgrade or
              downgrade anytime and cancel anytime
            </p>
          </div>
        </article>

        <article className={cardClassName}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-16 h-56 opacity-25 blur-2xl saturate-150 dark:opacity-40"
            style={{ backgroundImage: auroraGlow }}
          />
          <div className="relative">
            <p className="text-foreground text-base font-medium">
              Everything included
            </p>
            <p className="text-muted-foreground mt-1 text-sm text-pretty">
              Same features on every plan; only the event volume changes.
            </p>
            <ul
              className="text-foreground mt-6 grid list-none grid-cols-1 items-start gap-y-1.5 font-medium"
              role="list"
            >
              {featureRows.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <PricingFeatureMark />
                  <p className="text-sm tracking-tight text-foreground">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

export default SimplifiedPricingSection;
