import { useMemo, useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildCheckoutReturnPath,
  formatTierLimitLabel,
  formatTierPrice,
  formatTierPriceAmount,
  formatTierPricePeriod,
  getPricingTierByKey,
  pricingPlanCards,
  pricingTiers,
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
  popular?: boolean;
  features: readonly string[];
  checkoutHref: string;
  ctaLabel: string;
  period: BillingPeriod;
}) {
  return (
    <article className="bg-background text-foreground relative grid h-full w-full grid-rows-[auto_1fr_auto_auto] p-8">
      {popular ? (
        <span className="text-muted-foreground absolute top-4 right-4 text-[10px] font-semibold tracking-wide uppercase">
          Popular
        </span>
      ) : null}
      <div>
        <h3 className="text-foreground font-display text-2xl font-medium tracking-tight italic sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-4xl">
          {name}
        </h3>
        <p className="text-muted-foreground mt-1 text-base font-medium">
          {tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1 lg:items-center">
          <p className="text-foreground font-display text-4xl tracking-tighter italic sm:text-4xl md:text-5xl lg:text-6xl">
            {priceAmount}
          </p>
          <div>
            <p className="text-foreground flex items-center gap-1 text-sm font-medium tracking-tight lg:text-sm">
              {pricePeriod}
            </p>
            <p className="text-muted-foreground text-sm lg:text-sm">
              + applicable taxes
            </p>
          </div>
        </div>
      </div>

      <ul
        className="text-foreground mt-12 list-none space-y-1 self-start font-medium 2xl:space-y-2"
        role="list"
      >
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <PricingFeatureMark />
            <p className="text-base tracking-tight">{feature}</p>
          </li>
        ))}
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

function PricingVolumeTable({
  appBaseUrl,
  period,
}: {
  appBaseUrl: string;
  period: BillingPeriod;
}) {
  return (
    <div className="mt-16">
      <div className="mx-auto max-w-xl text-center text-balance">
        <h3 className="text-foreground font-display text-2xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">
          All event volumes
        </h3>
        <p className="text-muted-foreground mt-2 text-base 2xl:text-lg">
          Same features on every tier — choose the monthly event cap that fits.
          Prices update with your billing period above.
        </p>
      </div>

      <div className="mt-6 grid min-w-0 grid-cols-1">
        <div className="min-w-0 overflow-x-auto [contain:inline-size]">
          <table className="w-full border-collapse text-left text-xs sm:min-w-[640px] lg:mx-auto lg:max-w-2xl">
            <thead>
              <tr className="border-border/70 border-b">
                <th className="text-muted-foreground py-2 font-medium">
                  Monthly events
                </th>
                <th className="text-muted-foreground py-2 font-medium">
                  {period === "monthly" ? "Monthly price" : "Yearly price"}
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
                    {formatTierPrice(tier, period)}
                  </td>
                  <td className="py-2 text-right">
                    <a
                      href={buildSignupHref(appBaseUrl, tier.key, period)}
                      data-kobbe-event={`Pricing table — ${tier.events} ${period}`}
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
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const trialCtaLabel = useMemo(
    () => `Start ${pricingTrialDays}-day trial`,
    [],
  );

  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="flex justify-center">
        <BillingPeriodTabs period={period} onPeriodChange={setPeriod} />
      </div>

      <div className="relative mt-10 overflow-hidden px-4 py-12 sm:px-8 lg:p-12">
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

      <PricingVolumeTable appBaseUrl={appBaseUrl} period={period} />
    </div>
  );
}

export default PricingSection;
