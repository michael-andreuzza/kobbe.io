export type BillingPeriod = "monthly" | "yearly";

export type PricingTierKey =
  | "events_100k"
  | "events_500k"
  | "events_1m"
  | "events_3m"
  | "events_5m"
  | "events_10m";

export type PricingTier = {
  key: PricingTierKey;
  events: string;
  /** Numeric event volume, for animated number displays. */
  eventsCount: number;
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
    eventsCount: 100_000,
    monthly: 9,
    yearlyMonthly: 8,
    yearly: 90,
  },
  {
    key: "events_500k",
    events: "500K",
    eventsCount: 500_000,
    monthly: 19,
    yearlyMonthly: 16,
    yearly: 190,
  },
  {
    key: "events_1m",
    events: "1M",
    eventsCount: 1_000_000,
    monthly: 29,
    yearlyMonthly: 24,
    yearly: 290,
  },
  {
    key: "events_3m",
    events: "3M",
    eventsCount: 3_000_000,
    monthly: 59,
    yearlyMonthly: 49,
    yearly: 590,
  },
  {
    key: "events_5m",
    events: "5M",
    eventsCount: 5_000_000,
    monthly: 89,
    yearlyMonthly: 74,
    yearly: 890,
  },
  {
    key: "events_10m",
    events: "10M",
    eventsCount: 10_000_000,
    monthly: 169,
    yearlyMonthly: 141,
    yearly: 1690,
  },
] as const satisfies ReadonlyArray<PricingTier>;

export const pricingTrialDays = 15;

/** Maximum websites per workspace on paid plans. */
export const PRICING_MAX_SITES_PER_WORKSPACE = 30;

export const yearlyBillingSavingsLabel = "2 months free";

export const pricingAmountSuffix = "/mo";

export const defaultPricingTierIndex = 0;

/** Minimum event volume before monthly email reports are included. */
export const MONTHLY_EMAIL_REPORTS_MIN_TIER_KEY = "events_100k" as const satisfies PricingTierKey;

export const MONTHLY_EMAIL_REPORTS_FEATURE =
  "Monthly email reports" as const;

/** Historical analytics window included with every plan. */
export const PRICING_DATA_RETENTION_YEARS = 3;

/** Per-tier retention labels (uniform today; keyed for future tiering). */
export const TIER_DATA_RETENTION_YEARS = {
  events_100k: PRICING_DATA_RETENTION_YEARS,
  events_500k: PRICING_DATA_RETENTION_YEARS,
  events_1m: PRICING_DATA_RETENTION_YEARS,
  events_3m: PRICING_DATA_RETENTION_YEARS,
  events_5m: PRICING_DATA_RETENTION_YEARS,
  events_10m: PRICING_DATA_RETENTION_YEARS,
} as const satisfies Record<PricingTierKey, number>;

export function formatTierDataRetentionLabel(tierKey: PricingTierKey): string {
  const years = TIER_DATA_RETENTION_YEARS[tierKey];
  return years === 1
    ? "1 year of data retention"
    : `${years} years of data retention`;
}

/** Flat feature list for the simplified slider pricing card. */
export const simplifiedPricingFeatures = [
  `Up to ${PRICING_MAX_SITES_PER_WORKSPACE} websites`,
  "Privacy-first, cookieless tracking",
  "GDPR-ready analytics (DPA included)",
  "Realtime visitors map",
  "Funnels",
  "Conversions",
  "Custom events",
  "Revenue attribution",
  "UTM campaign and channel reports",
  "First-party collect hostname",
  "Traffic alerts",
  "Web Vitals and performance insights",
  "Data export and import",
  "Team access, agent API, and CLI",
  "Raycast extension",
  MONTHLY_EMAIL_REPORTS_FEATURE,
] as const;

export function buildSimplifiedPricingFeatureRows(tierKey: PricingTierKey) {
  return [
    ...simplifiedPricingFeatures.slice(0, 3),
    formatTierDataRetentionLabel(tierKey),
    ...simplifiedPricingFeatures.slice(3),
  ];
}

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

export function formatTierYearlyTotalPrice(tier: PricingTier) {
  return `$${formatPricingCurrency(tier.yearly)}/yr`;
}

export function formatTierBillingNote(period: BillingPeriod) {
  return period === "monthly" ? "Billed monthly." : "Billed annually.";
}

export function formatTierBillingPeriodLabel(period: BillingPeriod) {
  return period === "monthly" ? "Billed monthly" : "Per month, billed yearly";
}

/**
 * Yearly sublabel that makes the math self-evident: the yearly total is
 * 10 × the real monthly price. A rounded "$X/mo equivalent" reads as a
 * price and never multiplies back to the total (confused real customers).
 */
export function formatYearlyBillingBreakdownLabel(tier: PricingTier) {
  return `10 × $${formatPricingCurrency(tier.monthly)}/mo — 2 months free`;
}

export function formatTierTrialPriceNote(
  tier: PricingTier,
  period: BillingPeriod,
  trialDays: number = pricingTrialDays,
) {
  if (period === "monthly") {
    return `Free for ${trialDays} days, then $${formatPricingCurrency(tier.monthly)}/mo, billed monthly + local taxes`;
  }

  return `Free for ${trialDays} days, then $${formatPricingCurrency(tier.yearly)}/yr, billed annually + local taxes`;
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
