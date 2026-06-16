export type BillingPeriod = "monthly" | "yearly";

export type PricingTierKey =
  | "events_100k"
  | "events_200k"
  | "events_500k"
  | "events_1m"
  | "events_2m"
  | "events_5m"
  | "events_10m"
  | "events_15m"
  | "events_20m"
  | "events_25m";

export const pricingTiers = [
  { key: "events_100k", events: "100k", monthly: 15, yearly: 165 },
  { key: "events_200k", events: "200k", monthly: 25, yearly: 275 },
  { key: "events_500k", events: "500k", monthly: 45, yearly: 495 },
  { key: "events_1m", events: "1M", monthly: 60, yearly: 660 },
  { key: "events_2m", events: "2M", monthly: 100, yearly: 1100 },
  { key: "events_5m", events: "5M", monthly: 140, yearly: 1540 },
  { key: "events_10m", events: "10M", monthly: 200, yearly: 2200 },
  { key: "events_15m", events: "15M", monthly: 290, yearly: 3190 },
  { key: "events_20m", events: "20M", monthly: 380, yearly: 4180 },
  { key: "events_25m", events: "25M", monthly: 470, yearly: 5170 },
] as const satisfies ReadonlyArray<{
  key: PricingTierKey;
  events: string;
  monthly: number;
  yearly: number;
}>;

export const pricingTrialDays = 15;

export const defaultPricingTierIndex = 0;

export const popularPricingTierIndices = [0, 2, 3] as const;

export const pricingPlanCards = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Solo sites and side projects.",
    tierKey: "events_100k",
    popular: false,
    features: [
      "Up to 100k monthly events",
      "All analytics and reporting features",
      "Cookieless tracking by default",
      "Dashboards, exports, and share links",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Steady traffic and small teams.",
    tierKey: "events_500k",
    popular: true,
    features: [
      "Up to 500k monthly events",
      "Everything in Starter",
      "Alerts and monthly reports",
      "Team access and agent integrations",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Agencies and high-traffic products.",
    tierKey: "events_2m",
    popular: false,
    features: [
      "Up to 2M monthly events",
      "Everything in Growth",
      "50 sites per workspace",
      "Higher-volume headroom",
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

export function formatTierPrice(
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  const amount = period === "monthly" ? tier.monthly : tier.yearly;
  const suffix = period === "monthly" ? "month" : "year";
  return `$${formatPricingCurrency(amount)}/${suffix}`;
}

export function formatTierPriceAmount(
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  const amount = period === "monthly" ? tier.monthly : tier.yearly;
  return `$${formatPricingCurrency(amount)}`;
}

export function formatTierPricePeriod(period: BillingPeriod) {
  return period === "monthly" ? "/ month" : "/ year";
}

export function formatPricingCurrency(amount: number) {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function formatIncludedEventsPhrase(events: string) {
  return `${events} monthly events`;
}

export function formatTierLimitLabel(events: string) {
  return `Up to ${formatIncludedEventsPhrase(events)}`;
}

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
