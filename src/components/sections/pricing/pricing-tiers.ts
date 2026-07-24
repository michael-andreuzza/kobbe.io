export type BillingPeriod = "monthly" | "yearly";

export type PricingTierKey =
  | "events_20k"
  | "events_100k"
  | "events_250k"
  | "events_500k"
  | "events_750k"
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
    key: "events_20k",
    events: "20K",
    monthly: 8,
    yearlyMonthly: 7,
    yearly: 80,
  },
  {
    key: "events_100k",
    events: "100K",
    monthly: 15,
    yearlyMonthly: 13,
    yearly: 150,
  },
  {
    key: "events_250k",
    events: "250K",
    monthly: 25,
    yearlyMonthly: 21,
    yearly: 250,
  },
  {
    key: "events_500k",
    events: "500K",
    monthly: 39,
    yearlyMonthly: 33,
    yearly: 390,
  },
  {
    key: "events_750k",
    events: "750K",
    monthly: 59,
    yearlyMonthly: 49,
    yearly: 590,
  },
  {
    key: "events_1m",
    events: "1M",
    monthly: 79,
    yearlyMonthly: 66,
    yearly: 790,
  },
  {
    key: "events_3m",
    events: "3M",
    monthly: 119,
    yearlyMonthly: 99,
    yearly: 1190,
  },
  {
    key: "events_5m",
    events: "5M",
    monthly: 169,
    yearlyMonthly: 141,
    yearly: 1690,
  },
  {
    key: "events_10m",
    events: "10M",
    monthly: 249,
    yearlyMonthly: 208,
    yearly: 2490,
  },
  {
    key: "events_15m",
    events: "15M",
    monthly: 329,
    yearlyMonthly: 274,
    yearly: 3290,
  },
  {
    key: "events_20m",
    events: "20M",
    monthly: 399,
    yearlyMonthly: 333,
    yearly: 3990,
  },
  {
    key: "events_25m",
    events: "25M",
    monthly: 469,
    yearlyMonthly: 391,
    yearly: 4690,
  },
] as const satisfies ReadonlyArray<PricingTier>;

export const pricingTrialDays = 15;

export const yearlyBillingSavingsLabel = "2 months free";

export const pricingAmountSuffix = "/mo";

export const defaultPricingTierIndex = 0;

/** Minimum event volume before monthly email reports are included. */
export const MONTHLY_EMAIL_REPORTS_MIN_TIER_KEY = "events_5m" as const satisfies PricingTierKey;

export const MONTHLY_EMAIL_REPORTS_FEATURE =
  "Monthly email reports from 5M events" as const;

/** Flat feature list for the simplified slider pricing card. */
export const simplifiedPricingFeatures = [
  "Unlimited websites",
  "Privacy-first, cookieless tracking",
  "GDPR-ready analytics (DPA included)",
  "Realtime visitors and shared dashboards",
  "Funnels, conversions, and custom events",
  "Revenue attribution",
  "UTM campaign and channel reports",
  "First-party collect hostname",
  "Traffic alerts",
  "Web Vitals and performance insights",
  "Data export and import",
  "Team access, agent API, and CLI",
  MONTHLY_EMAIL_REPORTS_FEATURE,
] as const;

export function tierIncludesMonthlyEmailReports(tierKey: PricingTierKey) {
  const tierIndex = pricingTiers.findIndex((entry) => entry.key === tierKey);
  const minIndex = pricingTiers.findIndex(
    (entry) => entry.key === MONTHLY_EMAIL_REPORTS_MIN_TIER_KEY,
  );

  return tierIndex >= minIndex;
}

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
  return period === "monthly" ? "Billed monthly." : "Billed annually.";
}

export function formatTierTrialPriceNote(
  amount: number,
  period: BillingPeriod,
  trialDays: number = pricingTrialDays,
) {
  const price = `$${formatPricingCurrency(amount)}${pricingAmountSuffix}`;

  if (period === "monthly") {
    return `Free for ${trialDays} days · then ${price}, billed monthly + local taxes`;
  }

  return `Free for ${trialDays} days · then ${price}, billed annually + local taxes`;
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
