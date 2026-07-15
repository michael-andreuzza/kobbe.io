import { useMemo, useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingComparisonTable } from "@/components/sections/pricing/pricing-comparison-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildCheckoutReturnPath,
  formatTierBillingNote,
  formatTierPriceAmount,
  formatTierPricePeriod,
  getPricingTierByKey,
  pricingPlanCards,
  pricingTrialDays,
  type BillingPeriod,
  type PricingTierKey,
} from "./pricing-tiers";

function buildSignupHref(
  appBaseUrl: string,
  tierKey: PricingTierKey,
  period: BillingPeriod,
) {
  const returnTo = buildCheckoutReturnPath(tierKey, period);
  return `${appBaseUrl}/signup?returnTo=${encodeURIComponent(returnTo)}`;
}

function PricingFeatureMark() {
  return (
    <svg
      className="mt-1.5 size-4 shrink-0"
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
  pricePeriod,
  billingNote,
  popular,
  features,
  checkoutHref,
  ctaLabel,
  period,
}: {
  name: string;
  tagline: string;
  priceAmount: string;
  pricePeriod: string;
  billingNote: string;
  popular?: boolean;
  features: readonly string[];
  checkoutHref: string;
  ctaLabel: string;
  period: BillingPeriod;
}) {
  return (
    <article className="bg-background text-foreground relative grid h-full w-full grid-rows-[auto_1fr_auto_auto] p-8">
      <div>
        <h3 className="text-foreground font-display text-2xl font-medium tracking-tight italic md:text-3xl">
          {name}
        </h3>
        <p className="text-muted-foreground mt-1 max-w-50 text-sm font-medium text-balance">
          {tagline}
        </p>

        <div className="mt-4 flex flex-row items-center gap-x-3 gap-y-1">
          <p className="text-foreground font-display text-4xl tracking-tighter italic">
            {priceAmount}
          </p>
          <div>
            <p className="text-foreground flex items-center gap-1 text-sm font-medium tracking-tight lg:text-sm">
              {pricePeriod}
            </p>
            <p className="text-muted-foreground text-sm lg:text-xs">
              {billingNote}
            </p>
          </div>
        </div>
      </div>

      <ul
        className="text-foreground mt-4 list-none space-y-1 self-start font-medium 2xl:space-y-2"
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
              <p className="text-base tracking-tight">{feature}</p>
            </li>
          ),
        )}
      </ul>

      <div className="mt-8">
        <a
          href={checkoutHref}
          data-kobbe-event={`Pricing — ${name} ${period}`}
          className={cn(
            buttonVariants({
              variant: popular ? "brand" : "default",
              size: "sm",
            }),
            "w-full justify-center",
          )}
        >
          {ctaLabel}
        </a>
      </div>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        {pricingTrialDays}-day trial · no card required
      </p>
    </article>
  );
}

export function PricingSection({
  appBaseUrl = "https://app.kobbe.io",
  paintSrc,
  paintWidth,
  paintHeight,
  className,
}: {
  appBaseUrl?: string;
  paintSrc: string;
  paintWidth: number;
  paintHeight: number;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("yearly");

  const trialCtaLabel = useMemo(
    () => `Start ${pricingTrialDays}-day trial`,
    [],
  );

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="flex justify-center">
        <BillingPeriodTabs period={period} onPeriodChange={setPeriod} />
      </div>

      <div className="relative mt-10 overflow-hidden p-4 sm:p-8">
        <img
          src={paintSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={paintWidth}
          height={paintHeight}
          className="absolute inset-0 size-full bg-cover object-cover"
        />

        <div className="relative z-10">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {pricingPlanCards.map((plan) => {
              const tier = getPricingTierByKey(plan.tierKey);

              return (
                <PricingTierPanel
                  key={plan.id}
                  name={plan.name}
                  tagline={plan.tagline}
                  priceAmount={formatTierPriceAmount(tier, period)}
                  pricePeriod={formatTierPricePeriod(period)}
                  billingNote={formatTierBillingNote(period)}
                  popular={plan.popular}
                  features={plan.features}
                  checkoutHref={buildSignupHref(
                    appBaseUrl,
                    plan.tierKey,
                    period,
                  )}
                  ctaLabel={trialCtaLabel}
                  period={period}
                />
              );
            })}
          </div>
        </div>
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
