import {
  pricingFaqItems,
  type PricingFaqItem,
} from "@/components/sections/pricing/pricing-faq-items";

const shared = (id: (typeof pricingFaqItems)[number]["id"]): PricingFaqItem =>
  pricingFaqItems.find((item) => item.id === id)!;

/** Questions people ask before they sign up, then the billing basics. */
export const landingFaqItems: ReadonlyArray<PricingFaqItem> = [
  {
    id: "speed",
    question: "Will Kobbe slow my site down?",
    answer:
      "No. The default tracker is about 2.5 KB gzipped, loads with defer so it never holds up your page, and is served from Cloudflare's global network. The full build with scroll tracking, cross-domain tracking, and Web Vitals is about 5 KB.",
  },
  {
    id: "platforms",
    question: "Will it work with my site?",
    answer:
      "If your site can add a script tag, yes. There are step-by-step guides for 22 platforms, including WordPress, Shopify, Webflow, Framer, Next.js, Astro, and Google Tag Manager.",
  },
  {
    id: "agents",
    question: "How do AI agents connect to Kobbe?",
    answer:
      "Through the MCP server in the Kobbe CLI. Create a token under Agent access, add kobbe mcp to any MCP-compatible agent, and it can read your traffic, revenue, funnels, and campaigns, or set up goals and funnels for you. Tokens are scoped, destructive actions need typed confirmation, and agent access is included on every plan, trial too.",
  },
  {
    id: "import",
    question: "Can I bring my data from another tool?",
    answer:
      "Yes. Import your history from Plausible, Fathom, Umami, or DataFast. By default Kobbe only fills the days before your first Kobbe pageview, so nothing gets overwritten. Funnels, realtime, and revenue attribution start from live Kobbe data.",
  },
  shared("cookie-banner"),
  shared("gdpr"),
  shared("trial"),
  shared("event-pricing"),
  shared("over-limit"),
];
