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

export const pricingTiers = [
  { key: "events_100k", events: "100K", monthly: 7.12, yearly: 47.88 },
  { key: "events_1m", events: "1M", monthly: 15.99, yearly: 107.88 },
  { key: "events_3m", events: "3M", monthly: 45.99, yearly: 311.88 },
  { key: "events_5m", events: "5M", monthly: 100.99, yearly: 683.88 },
  { key: "events_10m", events: "10M", monthly: 200.99, yearly: 1367.88 },
  { key: "events_15m", events: "15M", monthly: 290.99, yearly: 1979.88 },
  { key: "events_20m", events: "20M", monthly: 380.99, yearly: 2591.88 },
  { key: "events_25m", events: "25M", monthly: 470.99, yearly: 3203.88 },
] as const satisfies ReadonlyArray<{
  key: PricingTierKey;
  events: string;
  monthly: number;
  yearly: number;
}>;

export const pricingTrialDays = 15;

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
      "Funnels",
      "Conversions",
      "Custom events",
      "Referrer and channel breakdown",
      "Realtime visitors",
      "Shared dashboard links",
      "Bot filtering and visit filters",
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
      "First-party collect hostname",
      "UTM campaign and channel reports",
      "Traffic alerts",
      "Data export",
      "Import analytics data",
      "Web Vitals and performance",
      "Team access",
      "Agent API and CLI access",
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
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  return period === "monthly" ? tier.monthly : tier.yearly / 12;
}

export function formatPricingCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatTierPrice(
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  const amount = getTierDisplayAmount(tier, period);
  return `$${formatPricingCurrency(amount)}/month`;
}

export function formatTierPriceAmount(
  tier: (typeof pricingTiers)[number],
  period: BillingPeriod,
) {
  const amount = getTierDisplayAmount(tier, period);
  return `$${formatPricingCurrency(amount)}`;
}

export function formatTierPricePeriod(_period: BillingPeriod) {
  return "/ month";
}

export function formatTierBillingNote(period: BillingPeriod) {
  return period === "monthly" ? "Billed monthly." : "Billed yearly.";
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
