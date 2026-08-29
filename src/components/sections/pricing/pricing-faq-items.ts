import { PRICING_DATA_RETENTION_YEARS } from "./pricing-tiers";

export type PricingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const pricingFaqItems = [
  {
    id: "event-pricing",
    question: "How does event-based pricing work?",
    answer:
      "Move the slider to pick your monthly event allowance for the whole workspace. You pay for capacity, not feature tiers. Upgrade or downgrade any time as traffic changes.",
  },
  {
    id: "events",
    question: "What counts toward my monthly event limit?",
    answer:
      "Pageviews, custom events, scroll visibility events, and accepted Web Vitals payloads count toward your workspace limit. Funnels use the pageviews and events you already collect.",
  },
  {
    id: "over-limit",
    question: "What happens if I exceed my event limit?",
    answer:
      "When a workspace reaches its monthly cap, Kobbe stops ingesting new analytics events until the next monthly reset or you move to a higher tier.",
  },
  {
    id: "over-25m",
    question: "What happens if I need more than 25 million monthly events?",
    answer:
      "Contact support@kobbe.io. Billing stays in Polar. We can help you choose the right published tier or discuss options if you are above the listed volumes.",
  },
  {
    id: "trial",
    question: "Do I need a credit card to start the trial?",
    answer:
      "No. Start with a 15-day free trial without entering a card. Add billing details when you are ready to continue after the trial.",
  },
  {
    id: "yearly",
    question: "Is yearly billing discounted?",
    answer:
      "Yes. Yearly billing includes two months free compared to paying monthly at every tier. Use discount code hellokobbe at checkout for an additional 20% off yearly plans.",
  },
  {
    id: "features",
    question: "Do all plans include the same features?",
    answer:
      "Yes. Every paid volume includes the same product features: up to 30 websites per workspace, revenue attribution, first-party collect, UTM campaigns, traffic alerts, data export, Web Vitals, team access, and agent API or CLI access. Monthly email reports are included from 5M events.",
  },
  {
    id: "retention",
    question: "How long is analytics data retained?",
    answer: `Analytics data is kept for ${PRICING_DATA_RETENTION_YEARS} years on every plan, regardless of volume. Older events and rollups are deleted automatically after that, and you can delete data earlier at any time by resetting a site's statistics or deleting the site.`,
  },
  {
    id: "cookie-banner",
    question: "Do I need a cookie banner for Kobbe?",
    answer:
      "Usually no, not for Kobbe on its own. The default tracker is cookieless: no analytics cookies, no persistent browser identifiers, and no analytics request when Global Privacy Control or Do Not Track is on. Many sites run Kobbe without a cookie banner for analytics. You may still need one if other tools on your site use cookies, if you enable optional Kobbe features such as cross-domain tracking, or if your jurisdiction requires consent for analytics. Check what applies to your site and audience.",
  },
  {
    id: "gdpr",
    question: "Is Kobbe GDPR friendly?",
    answer:
      "Kobbe is built for GDPR-conscious analytics: cookieless by default, no raw IP storage in the app database, no persistent visitor profiles, and a published Data Processing Addendum for the hosted service. You remain responsible for your site's privacy notice, lawful basis, and consent where required. Read our GDPR overview and DPA in the docs.",
  },
  {
    id: "charges",
    question: "I saw a Kobbe charge on my statement. What is it?",
    answer:
      "It is usually a Kobbe subscription charge for a workspace, trial conversion, or renewal. If you do not recognize it, see our statement charges guide (/support/charges) or email support@kobbe.io.",
  },
] as const satisfies ReadonlyArray<PricingFaqItem>;
