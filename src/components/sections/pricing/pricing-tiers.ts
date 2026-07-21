export type BillingPeriod = "monthly" | "yearly";

export type PricingTierKey =
  | "events_100k"
  | "events_1m"
  | "events_3m"
  | "events_5m"
  | "events_10m"
  | "events_15m"
  | "events_20m"
  | "events_25m";

export type PricingTier = {
  key: PricingTierKey;
  events: string;
  /** Billed monthly. */
  monthly: number;
  /** Shown as $X/mo when yearly billing is selected. */
  yearlyMonthly: number;
  /** Total annual charge (pay 10 months, get 12). */
  yearly: number;
};

export const pricingTiers = [
  {
    key: "events_100k",
    events: "100K",
    monthly: 15,
    yearlyMonthly: 13,
    yearly: 150,
  },
  {
    key: "events_1m",
    events: "1M",
    monthly: 50,
    yearlyMonthly: 42,
    yearly: 500,
  },
  {
    key: "events_3m",
    events: "3M",
    monthly: 90,
    yearlyMonthly: 75,
    yearly: 900,
  },
  {
    key: "events_5m",
    events: "5M",
    monthly: 130,
    yearlyMonthly: 110,
    yearly: 1300,
  },
  {
    key: "events_10m",
    events: "10M",
    monthly: 200,
    yearlyMonthly: 170,
    yearly: 2000,
  },
  {
    key: "events_15m",
    events: "15M",
    monthly: 280,
    yearlyMonthly: 235,
    yearly: 2800,
  },
  {
    key: "events_20m",
    events: "20M",
    monthly: 350,
    yearlyMonthly: 290,
    yearly: 3500,
  },
  {
    key: "events_25m",
    events: "25M",
    monthly: 420,
    yearlyMonthly: 350,
    yearly: 4200,
  },
] as const satisfies ReadonlyArray<PricingTier>;

export const pricingTrialDays = 15;

export const yearlyBillingSavingsLabel = "2 months free";

export const pricingAmountSuffix = "/mo";

export const defaultPricingTierIndex = 0;

export const popularPricingTierIndices = [1, 2, 3] as const;

/** On the Lite card; Starter and Growth inherit via “Everything in …, plus:”. */
export const pricingPrivacyFeatures = [
  "Privacy-first, cookieless by default",
  "GDPR-ready analytics (DPA included)",
] as const;

export const pricingPlanCards = [
  {
    id: "lite",
    name: "Lite",
    tagline: "Core analytics for a few personal sites.",
    tierKey: "events_100k",
    popular: false,
    features: [
      "Up to 100K monthly events",
      "Up to 3 websites",
      ...pricingPrivacyFeatures,
      "Funnels, conversions, and custom events",
      "Realtime visitors and shared dashboards",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Everything you need for a real product site.",
    tierKey: "events_1m",
    popular: true,
    features: [
      "Everything in Lite, plus:",
      "Up to 1M monthly events",
      "Up to 30 websites",
      "Revenue attribution",
      "UTM campaign and channel reports",
      "First-party collect hostname",
      "Traffic alerts",
      "Data export and import",
      "Team access, agent API, and CLI",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "More volume, reports, and team workflows.",
    tierKey: "events_3m",
    popular: false,
    features: [
      "Everything in Starter, plus:",
      "Up to 3M monthly events",
      "Up to 50 websites",
      "Monthly email reports",
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  tagline: string;
  tierKey: PricingTierKey;
  popular: boolean;
  features: readonly string[];
}>;

export function getPricingTierByKey(tierKey: PricingTierKey) {
  const tier = pricingTiers.find((entry) => entry.key === tierKey);
  if (!tier) {
    throw new Error(`Unknown pricing tier: ${tierKey}`);
  }
  return tier;
}

export function getTierDisplayAmount(
  tier: PricingTier,
  period: BillingPeriod,
) {
  return period === "monthly" ? tier.monthly : tier.yearlyMonthly;
}

export function formatPricingCurrency(amount: number) {
  const isWhole = Number.isInteger(amount);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  }).format(amount);
}

export function formatTierPrice(
  tier: PricingTier,
  period: BillingPeriod,
) {
  const amount = getTierDisplayAmount(tier, period);
  return `$${formatPricingCurrency(amount)}${pricingAmountSuffix}`;
}

export function formatTierPriceAmount(
  tier: PricingTier,
  period: BillingPeriod,
) {
  const amount = getTierDisplayAmount(tier, period);
  return `$${formatPricingCurrency(amount)}`;
}

export function formatTierPricePeriod(_period: BillingPeriod) {
  return pricingAmountSuffix;
}

export function formatTierBillingNote(period: BillingPeriod) {
  return period === "monthly" ? "Billed monthly." : "Billed yearly.";
}

export function formatTierTrialPriceNote(
  amount: number,
  period: BillingPeriod,
  trialDays: number = pricingTrialDays,
) {
  const billingCadence = period === "monthly" ? "monthly" : "yearly";

  return `Free for ${trialDays} days · then $${formatPricingCurrency(amount)}${pricingAmountSuffix} billed ${billingCadence} + local taxes`;
}

export function formatIncludedEventsPhrase(events: string) {
  return `${events} monthly events`;
}

export function formatTierLimitLabel(events: string) {
  return `Up to ${formatIncludedEventsPhrase(events)}`;
}

export function buildSignupHref(
  appBaseUrl: string,
  tierKey: PricingTierKey,
  period: BillingPeriod,
) {
  const params = new URLSearchParams({ tier: tierKey, period });
  return `${appBaseUrl}/signup?${params.toString()}`;
}

/** @deprecated Use buildSignupHref — checkout is only needed after the trial ends. */
export function buildCheckoutReturnPath(
  tierKey: PricingTierKey,
  period: BillingPeriod,
) {
  return `/checkout?tier=${tierKey}&period=${period}`;
}

export function buildPricingJsonLdOffers(canonical: string) {
  return pricingTiers.flatMap((tier) => [
    {
      "@type": "Offer",
      name: `${tier.events} monthly events`,
      price: String(tier.monthly),
      priceCurrency: "USD",
      url: `${canonical}?tier=${tier.key}&period=monthly`,
      category: "monthly",
      description: `Kobbe analytics plan with up to ${tier.events} monthly events.`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: `${tier.events} monthly events yearly billing`,
      price: String(tier.yearly),
      priceCurrency: "USD",
      url: `${canonical}?tier=${tier.key}&period=yearly`,
      category: "yearly",
      description: `Kobbe analytics yearly plan with up to ${tier.events} monthly events.`,
      availability: "https://schema.org/InStock",
    },
  ]);
}
