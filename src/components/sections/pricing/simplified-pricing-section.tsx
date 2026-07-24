import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import { PricingPriceDisplay } from "@/components/sections/pricing/pricing-price-display";
import { PricingVolumeSlider } from "@/components/sections/pricing/pricing-volume-slider";
import { SimplifiedPricingPreview } from "@/components/sections/pricing/simplified-pricing-preview";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  formatTierTrialPriceNote,
  getTierDisplayAmount,
  MONTHLY_EMAIL_REPORTS_FEATURE,
  pricingTiers,
  pricingTrialDays,
  simplifiedPricingFeatures,
  tierIncludesMonthlyEmailReports,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

export function SimplifiedPricingSection({
  appBaseUrl = "https://app.kobbe.io",
  className,
}: {
  appBaseUrl?: string;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("yearly");
  const [tierIndex, setTierIndex] = useState(0);

  const tier = pricingTiers[tierIndex]!;
  const displayAmount = getTierDisplayAmount(tier, period);

  const signupHref = buildSignupHref(appBaseUrl, tier.key, period);
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  return (
    <div className={cn("w-full min-w-0", className)}>
      <article className="bg-card text-foreground relative w-full overflow-hidden rounded-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col p-4 lg:w-2/3 lg:p-6">
            <BillingPeriodTabs
              period={period}
              onPeriodChange={setPeriod}
              className="shrink-0"
            />

            <p className="text-muted-foreground mt-4 text-sm font-medium text-balance">
              Pageviews, custom events, and Web Vitals share one monthly limit
              across your workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <p className="text-foreground font-display text-4xl tracking-tight italic sm:text-5xl">
                {tier.events}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-muted-foreground text-sm font-medium">
                  for
                </span>
                <PricingPriceDisplay
                  period={period}
                  monthlyAmount={tier.monthly}
                  displayAmount={displayAmount}
                  className="text-foreground text-xl font-semibold tracking-tighter"
                />
              </div>
            </div>

            <div className="mt-4">
              <PricingVolumeSlider
                value={tierIndex}
                onChange={setTierIndex}
                valueLabel={tier.events}
              />
            </div>

            <div className="mt-1">
              <a
                href={signupHref}
                data-kobbe-event={`Simplified pricing - ${tier.events} ${period}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "mt-2 w-full",
                )}
              >
                {trialCtaLabel}
              </a>
            </div>

            <ul
              className="text-foreground mt-8 grid flex-1 list-none grid-cols-1 items-start gap-x-6 gap-y-1.5 font-medium sm:grid-cols-2 2xl:gap-y-2"
              role="list"
            >
              {simplifiedPricingFeatures.map((feature) => {
                const isEmailReportsFeature =
                  feature === MONTHLY_EMAIL_REPORTS_FEATURE;
                const isIncluded =
                  !isEmailReportsFeature ||
                  tierIncludesMonthlyEmailReports(tier.key);

                return (
                  <li key={feature} className="flex items-start gap-2">
                    <PricingFeatureMark muted={!isIncluded} />
                    <p
                      className={cn(
                        "text-sm tracking-tight transition-colors",
                        isIncluded
                          ? "text-foreground"
                          : "text-muted-foreground/50 decoration-muted-foreground/40 line-through",
                      )}
                    >
                      {feature}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="text-muted-foreground mt-8 text-xs font-medium text-balance">
              {formatTierTrialPriceNote(displayAmount, period)} Upgrade or
              downgrade anytime and cancel anytime
            </p>
          </div>

          <SimplifiedPricingPreview className="border-border hidden lg:flex lg:min-h-full lg:w-1/2" />
        </div>
      </article>
    </div>
  );
}

export default SimplifiedPricingSection;
