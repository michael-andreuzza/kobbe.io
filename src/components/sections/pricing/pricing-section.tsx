import { useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingComparisonTable } from "@/components/sections/pricing/pricing-comparison-table";
import { RollingPriceAmount } from "@/components/sections/pricing/rolling-price-amount";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildSignupHref,
  formatTierTrialPriceNote,
  getPricingTierByKey,
  getTierDisplayAmount,
  pricingPlanCards,
  pricingTrialDays,
  type BillingPeriod,
} from "@/components/sections/pricing/pricing-tiers";

const paymentMethods = [
  "Visa",
  "Amex",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
] as const;

function PricingFeatureMark() {
  return (
    <svg
      className="mt-1.5 size-3 shrink-0"
      viewBox="0 0 542 542"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M295.5 246.25V0H246.25V246.25H0V295.5H246.25V541.75H295.5V295.5H541.75V246.25H295.5Z"
        className="fill-muted-foreground/80"
      />
      <rect
        width="63"
        height="63"
        transform="translate(239.875 239.875)"
        className="fill-background"
      />
    </svg>
  );
}

function PricingTierPanel({
  name,
  tagline,
  priceAmount,
  trialPriceNote,
  features,
  checkoutHref,
  ctaLabel,
  period,
  popular = false,
}: {
  name: string;
  tagline: string;
  priceAmount: number;
  trialPriceNote: string;
  features: readonly string[];
  checkoutHref: string;
  ctaLabel: string;
  period: BillingPeriod;
  popular?: boolean;
}) {
  return (
    <article className="bg-card text-foreground relative flex h-full w-full flex-col rounded-xl p-4 lg:p-6">
      <div>
        <h3 className="text-foreground text-2xl font-semibold tracking-tight">
          {name}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm font-medium text-balance">
          {tagline}
        </p>
      </div>

      <ul
        className="text-foreground mt-8 flex-1 list-none space-y-1.5 font-medium 2xl:space-y-2"
        role="list"
      >
        {features.map((feature) =>
          feature.endsWith("plus:") ? (
            <li key={feature} className="pt-1 first:pt-0">
              <p className="text-muted-foreground pb-2 text-sm font-medium tracking-tight">
                {feature}
              </p>
            </li>
          ) : (
            <li key={feature} className="flex items-start gap-2">
              <PricingFeatureMark />
              <p className="text-sm tracking-tight">{feature}</p>
            </li>
          ),
        )}
      </ul>

      <div className="mt-4">
        <div className="overflow-visible pt-1">
          <RollingPriceAmount
            amount={priceAmount}
            spinToken={period}
            className="text-foreground text-xl font-semibold tracking-tighter"
          />
          <p className="text-muted-foreground text-sm font-medium text-balance">
            {trialPriceNote}
          </p>
        </div>
        <a
          href={checkoutHref}
          data-kobbe-event={`Pricing - ${name} ${period}`}
          className={cn(
            buttonVariants({
              variant: popular ? "default" : "secondary",
              size: "sm",
            }),
            "mt-2 w-full",
          )}
        >
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}

export function PricingSection({
  appBaseUrl = "https://app.kobbe.io",

  className,
}: {
  appBaseUrl?: string;
  paintSrc: string;
  paintWidth: number;
  paintHeight: number;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("yearly");
  const trialCtaLabel = `Start free for ${pricingTrialDays} days`;

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="flex justify-center">
        <BillingPeriodTabs period={period} onPeriodChange={setPeriod} />
      </div>

      <div className="relative mt-8">
        <div className="relative z-10">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
            {pricingPlanCards.map((plan) => {
              const tier = getPricingTierByKey(plan.tierKey);

              return (
                <PricingTierPanel
                  key={plan.id}
                  name={plan.name}
                  tagline={plan.tagline}
                  priceAmount={getTierDisplayAmount(tier, period)}
                  trialPriceNote={formatTierTrialPriceNote(
                    getTierDisplayAmount(tier, period),
                    period,
                  )}
                  features={plan.features}
                  checkoutHref={buildSignupHref(
                    appBaseUrl,
                    plan.tierKey,
                    period,
                  )}
                  ctaLabel={trialCtaLabel}
                  period={period}
                  popular={plan.popular}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-foreground mt-2 flex flex-wrap items-center justify-between font-semibold lg:items-start">
        <p className="text-sm 2xl:text-base">Secure payments via Polar</p>
        <p className="text-muted-foreground mt-1 flex flex-wrap gap-2 text-sm font-medium 2xl:text-base">
          {paymentMethods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </p>
      </div>

      <PricingComparisonTable />

      <p className="text-muted-foreground relative z-10 mt-8 text-center text-sm">
        Need a different event volume?{" "}
        <a
          href="/docs/billing-and-usage-limits#all-event-volumes"
          className="text-foreground font-medium underline underline-offset-4"
        >
          View all plans
        </a>
      </p>
    </div>
  );
}

export default PricingSection;
