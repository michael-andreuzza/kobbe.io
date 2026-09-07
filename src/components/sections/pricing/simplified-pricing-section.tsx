import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BillingPeriodToggle } from "@/components/sections/pricing/billing-period-toggle";
import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import { PricingPriceDisplay } from "@/components/sections/pricing/pricing-price-display";
import { TwoToneHeading } from "@/components/ui/two-tone-heading";
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

/** Optimised image props handed over from Astro (`getImage`). */
export type PricingSpotArt = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
};

export function SimplifiedPricingSection({
  appBaseUrl = "https://app.kobbe.io",
  className,
  spotArt,
}: {
  appBaseUrl?: string;
  className?: string;
  /** Small gull perched on the top-left corner of the features card. */
  spotArt?: PricingSpotArt;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const startingTier = pricingTiers[0]!;
  const featureRows = buildSimplifiedPricingFeatureRows(startingTier.key);

  const signupHref = buildSignupHref(appBaseUrl, startingTier.key, period);
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  /** Flat panels: features checklist and pricing ladder side by side. */
  const panelClassName =
    "text-foreground relative flex min-w-0 flex-col gap-8 p-4 sm:p-6 rounded-lg justify-start";

  return (
    <div id="pricing" className={cn("scroll-mt-24", className)}>
      <div className="mt-8 grid w-full min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {/* Features card first on desktop; pricing card first on mobile. */}
        <article
          className={cn(panelClassName, "bg-muted-surface justify-between")}
          aria-label="Included features"
        >
          {" "}
          {spotArt ? (
            // Perched on the card's top edge at the far right, beyond the
            // heading's column, so it never sits on the text.
            <img
              src={spotArt.src}
              srcSet={spotArt.srcSet}
              width={spotArt.width}
              height={spotArt.height}
              alt=""
              loading="lazy"
              className="pointer-events-none absolute bottom-full left-6 w-16"
            />
          ) : null}
          <TwoToneHeading title="Pricing.">
            Same features on every plan; only the event volume changes. Nothing
            to pay today: start with a {pricingTrialDays}-day free trial, no
            credit card required, and pick your volume when the trial ends.
          </TwoToneHeading>
          <ul
            className="text-foreground grid list-none grid-cols-1 items-start gap-x-6 gap-y-1.5 font-medium lg:grid-cols-2 lg:gap-x-4"
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
          className={cn(
            panelClassName,
            "bg-muted-surface",
            "order-1 lg:order-2",
          )}
          aria-label="Pricing plans"
        >
          <div className="flex min-w-0 flex-col">
            <BillingPeriodToggle
              period={period}
              onPeriodChange={setPeriod}
              className="shrink-0"
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
              <Button
                href={signupHref}
                label={trialCtaLabel}
                variant="solid"
                size="lg"
                block
                data-kobbe-event={`Simplified pricing - ${startingTier.events} ${period}`}
              />
              <p className="text-muted-foreground mt-4 text-xs text-balance">
                {formatTierTrialPriceNote(startingTier, period)} Upgrade or
                downgrade anytime and cancel anytime
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default SimplifiedPricingSection;
