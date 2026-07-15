export type PricingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const pricingFaqItems = [
  {
    id: "privacy",
    question: "Is Kobbe privacy-first?",
    answer:
      "Yes. Kobbe defaults to cookieless, privacy-friendly tracking — no analytics cookies, no raw IP storage, and no persistent visitor profiles. You choose what to enable: keep the default for traffic insights, or turn on extended tracking when you need revenue attribution, cross-domain journeys, Web Vitals, scroll visibility, and more.",
  },
  {
    id: "events",
    question: "What counts toward my monthly event limit?",
    answer:
      "Pageviews, custom events, scroll visibility events, and accepted Web Vitals payloads count toward your workspace limit. Funnels use the pageviews and events you already collect.",
  },
  {
    id: "features",
    question: "Do all plans include the same features?",
    answer:
      "No. Lite includes core analytics for up to 3 websites. Starter adds revenue attribution, first-party collect, UTM campaigns, traffic alerts, data export, Web Vitals, team access, and agent API or CLI access for up to 30 websites. Growth and higher tiers add monthly email reports for up to 50 websites. Above Growth, plans mainly increase monthly event volume.",
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
      "Yes. Yearly billing saves about 44% compared to paying monthly at every tier.",
  },
  {
    id: "over-limit",
    question: "What happens if I exceed my event limit?",
    answer:
      "When a workspace reaches its monthly cap, Kobbe stops ingesting new analytics events until the next monthly reset or you move to a higher tier.",
  },
] as const satisfies ReadonlyArray<PricingFaqItem>;
