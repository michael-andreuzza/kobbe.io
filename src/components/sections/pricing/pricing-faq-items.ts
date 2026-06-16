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
      "Yes. Kobbe defaults to cookieless, privacy-friendly tracking — no analytics cookies, no raw IP storage, and no persistent visitor profiles. You choose what to enable: keep the default for traffic insights, or turn on extended tracking when you need cross-domain journeys, Web Vitals, scroll visibility, and more.",
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
      "Yes. Every paid tier includes the same product features. You only choose how many monthly events your workspace needs.",
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
      "Yes. Yearly billing gives one month free at every tier, so you pay for eleven months instead of twelve.",
  },
  {
    id: "over-limit",
    question: "What happens if I exceed my event limit?",
    answer:
      "When a workspace reaches its monthly cap, Kobbe stops ingesting new analytics events until the next monthly reset or you move to a higher tier.",
  },
] as const satisfies ReadonlyArray<PricingFaqItem>;
