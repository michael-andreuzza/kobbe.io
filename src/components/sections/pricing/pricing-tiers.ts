export type BillingPeriod = "monthly" | "yearly";

export const billingPeriodEvent = "kobbe:billing-period-change";
export const pricingTierEvent = "kobbe:pricing-tier-change";

export const pricingTiers = [
  { events: "100k", monthly: 15, yearly: 165 },
  { events: "200k", monthly: 25, yearly: 275 },
  { events: "500k", monthly: 45, yearly: 495 },
  { events: "1M", monthly: 60, yearly: 660 },
  { events: "2M", monthly: 100, yearly: 1100 },
  { events: "5M", monthly: 140, yearly: 1540 },
  { events: "10M", monthly: 200, yearly: 2200 },
  { events: "15M", monthly: 290, yearly: 3190 },
  { events: "20M", monthly: 380, yearly: 4180 },
  { events: "25M", monthly: 470, yearly: 5170 },
] as const;

export const defaultPricingTierIndex = 0;

export function isBillingPeriod(value: unknown): value is BillingPeriod {
  return value === "monthly" || value === "yearly";
}

export function formatPricingCurrency(amount: number) {
  return new Intl.NumberFormat("en-US").format(amount);
}
