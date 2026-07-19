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
      "Yes. Kobbe defaults to cookieless, privacy-friendly tracking with no analytics cookies, no raw IP storage, and no persistent visitor profiles. You choose what to enable: keep the default for traffic insights, or turn on extended tracking when you need revenue attribution, cross-domain journeys, Web Vitals, scroll visibility, and more.",
  },
  {
    id: "cookie-banner",
    question: "Do I need a cookie banner for Kobbe?",
    answer:
      "Usually no, not for Kobbe on its own. The default tracker is cookieless: no analytics cookies, no persistent browser identifiers, and no analytics request when Global Privacy Control or Do Not Track is on. Many sites run Kobbe without a cookie banner for analytics. You may still need one if other tools on your site use cookies, if you enable optional Kobbe features such as cross-domain tracking, or if your jurisdiction requires consent for analytics. Check what applies to your site and audience.",
  },
  {
    id: "unique-visitors",
    question: "How does Kobbe count unique visitors without cookies?",
    answer:
      "Kobbe derives a daily rotating, non-reversible identifier from minimized request data. The identifier changes each day, is scoped to the site, and is not used to build long-term visitor profiles.",
  },
  {
    id: "raw-ip",
    question: "Does Kobbe store raw IP addresses?",
    answer:
      "No. The hosted analytics app is designed around privacy-minimized event records and does not store raw visitor IP addresses in the application database.",
  },
  {
    id: "gdpr",
    question: "Is Kobbe GDPR friendly?",
    answer:
      "Kobbe is designed to reduce personal data collection, avoid analytics cookies by default, and support privacy-conscious analytics workflows. Legal obligations still depend on how you configure and use the product.",
  },
  {
    id: "events",
    question: "What counts toward my monthly event limit?",
    answer:
      "Pageviews, custom events, scroll visibility events, and accepted Web Vitals payloads count toward your workspace limit. Funnels use the pageviews and events you already collect.",
  },
  {
    id: "bots",
    question: "Are bots counted in my stats?",
    answer:
      "No. Kobbe includes bot filtering for crawlers, referrer spam, and common data-center traffic so your reports stay focused on real visitors.",
  },
  {
    id: "retention",
    question: "How long is analytics data retained?",
    answer:
      "Paid workspaces keep analytics data for as long as the workspace remains active, unless you delete data or a legal requirement requires removal.",
  },
  {
    id: "export",
    question: "Can I export my data?",
    answer:
      "Yes. Kobbe is built for ownership and portability, with export options for teams that need to analyze or archive their analytics data elsewhere.",
  },
  {
    id: "features",
    question: "Do all plans include the same features?",
    answer:
      "No. Lite includes core analytics for up to 3 websites. Starter adds revenue attribution, first-party collect, UTM campaigns, traffic alerts, data export, Web Vitals, team access, and agent API or CLI access for up to 30 websites. Growth and higher tiers add monthly email reports for up to 50 websites. Above Growth, plans mainly increase monthly event volume.",
  },
  {
    id: "event-pricing",
    question: "How does event-based pricing work?",
    answer:
      "Each plan includes a monthly event allowance for the whole workspace. You choose the tier that matches your traffic volume, and the product remains the same across tiers.",
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
      "Yes. Yearly billing saves about 44% compared to paying monthly at every tier. Use discount code hellokobbe when you upgrade to a yearly plan for an extra 20% off.",
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
    id: "charges",
    question: "I saw a Kobbe charge on my statement. What is it?",
    answer:
      "It is usually a Kobbe subscription charge for a workspace, trial conversion, or renewal. If you do not recognize it, see our statement charges guide (/docs/support-charges) or email support@kobbe.io.",
  },
  {
    id: "script-speed",
    question: "Will the script slow down my site?",
    answer:
      "The tracker is small, loads asynchronously, and avoids blocking the critical rendering path. It is designed to collect analytics without getting in the way of your site.",
  },
  {
    id: "any-website",
    question: "Can I use Kobbe with any website?",
    answer:
      "Yes. Kobbe works with plain HTML sites and common frameworks or platforms, including Astro, Next.js, React Router, WordPress, Shopify, Webflow, and more.",
  },
  {
    id: "share-dashboards",
    question: "Can I share dashboards with clients?",
    answer:
      "Yes. You can create public, read-only dashboard links for clients or teammates and revoke them whenever needed.",
  },
  {
    id: "support",
    question: "Where do I get help?",
    answer:
      "Email support@kobbe.io for help with setup, billing, privacy questions, or anything else around your workspace.",
  },
] as const satisfies ReadonlyArray<PricingFaqItem>;
