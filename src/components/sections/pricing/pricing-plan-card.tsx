import { useMemo, useState } from "react";

import { BillingPeriodTabs } from "@/components/sections/pricing/billing-period-tabs";
import { PricingTierSelectors } from "@/components/sections/pricing/pricing-tier-selectors";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  buildCheckoutReturnPath,
  defaultPricingTierIndex,
  pricingTiers,
  type BillingPeriod,
  type PricingTierKey,
} from "./pricing-tiers";

const includedFeatures = [
  "50 sites per workspace",
  "Long-term data history",
  "Pageviews, events, funnels, UTM campaigns, and revenue tracking",
  "Realtime dashboards",
  "Share links, CSV exports, and monthly reports",
  "Traffic spike/drop alerts",
  "Cookie-free tracking with privacy signals",
] as const;

type KobbeWindow = Window &
  typeof globalThis & {
    kobbe?: {
      attributionId?: string;
      getAttributionId?: () => string | undefined;
    };
  };

function checkoutHrefWithAttribution(href: string) {
  const kobbe = (window as KobbeWindow).kobbe;
  const attributionId = kobbe?.getAttributionId?.() ?? kobbe?.attributionId;
  if (!attributionId) return href;
  try {
    const url = new URL(href, window.location.href);
    url.searchParams.set("kobbe_attribution_id", attributionId);
    return url.toString();
  } catch {
    return href;
  }
}

function buildSignupHref(
  appBaseUrl: string,
  tierKey: PricingTierKey,
  period: BillingPeriod,
) {
  const returnTo = buildCheckoutReturnPath(tierKey, period);
  return `${appBaseUrl}/signup?returnTo=${encodeURIComponent(returnTo)}`;
}

export function PricingPlanCard({
  appBaseUrl = "https://app.kobbe.io",
  className,
}: {
  appBaseUrl?: string;
  className?: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [tierIndex, setTierIndex] = useState(defaultPricingTierIndex);

  const tier = pricingTiers[tierIndex] ?? pricingTiers[0];

  const checkoutHref = useMemo(() => {
    const base = buildSignupHref(appBaseUrl, tier.key, period);
    if (typeof window === "undefined") return base;
    return checkoutHrefWithAttribution(base);
  }, [appBaseUrl, period, tier.key]);

  return (
    <Card
      variant="default"
      className={cn("bg-muted mx-auto gap-0 p-0 py-0 lg:max-w-xl", className)}
    >
      <CardHeader className="pt-0">
        <BillingPeriodTabs period={period} onPeriodChange={setPeriod} />
        <PricingTierSelectors
          period={period}
          tierIndex={tierIndex}
          onTierIndexChange={setTierIndex}
          className="mt-4"
        />
      </CardHeader>

      <CardContent className="">
        <p className="text-foreground text-base font-semibold">
          Included in every plan
        </p>
        <p className="text-muted-foreground mt-2 text-sm font-medium text-balance">
          Every volume tier includes the same features — you only pay for more
          events.
        </p>
        <ul
          className="text-muted-foreground mt-4 grid gap-y-1 text-base"
          role="list"
        >
          {includedFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <svg
                className="mt-1.5 size-3 shrink-0"
                viewBox="0 0 542 542"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M295.5 246.25V0H246.25V246.25H0V295.5H246.25V541.75H295.5V295.5H541.75V246.25H295.5Z"
                  fill="#7C7C7C"
                ></path>{" "}
                <rect
                  width="63"
                  height="63"
                  transform="translate(239.875 239.875)"
                  fill="#FFF"
                ></rect>{" "}
              </svg>
              <span className="text-base tracking-tight">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:items-center">
          <a
            href={checkoutHref}
            data-kobbe-event={`Pricing — start trial ${period}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full sm:w-fit",
            )}
          >
            Start 3-day free trial
          </a>
          <p className="text-muted-foreground text-xs">
            No credit card required.
            <br />
            Cancel anytime.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PricingPlanCard;
