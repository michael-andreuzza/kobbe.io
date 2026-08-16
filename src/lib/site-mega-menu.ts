import astroLogo from "@/images/brands/astro.svg";
import boltLogo from "@/images/brands/bolt.svg";
import creemLogo from "@/images/brands/creem.svg";
import framerLogo from "@/images/brands/framer.svg";
import ghostLogo from "@/images/brands/ghost.png";
import kajabiLogo from "@/images/brands/kajabi.svg";
import laravelLogo from "@/images/brands/laravel.svg";
import lovableLogo from "@/images/brands/lovable.svg";
import nextjsLogo from "@/images/brands/nextjs.svg";
import mollieLogo from "@/images/brands/mollie.svg";
import paddleLogo from "@/images/brands/paddle.svg";
import plausibleLogo from "@/images/brands/plausible.svg";
import fathomLogo from "@/images/brands/fathom.svg";
import umamiLogo from "@/images/brands/umami.svg";
import datafastLogo from "@/images/brands/datafast.svg";
import podiaLogo from "@/images/brands/podia.svg";
import polarLogo from "@/images/brands/polar.svg";
import reactRouterLogo from "@/images/brands/reactrouter.svg";
import replitLogo from "@/images/brands/replit.svg";
import shopifyLogo from "@/images/brands/shopify.svg";
import squarespaceLogo from "@/images/brands/squarespace.svg";
import stripeLogo from "@/images/brands/stripe.svg";
import v0Logo from "@/images/brands/v0.svg";
import vueLogo from "@/images/brands/vue.svg";
import webflowLogo from "@/images/brands/webflow.svg";
import wixLogo from "@/images/brands/wix.svg";
import wordpressLogo from "@/images/brands/wordpress.svg";

export type MegaMenuLinkLogo = {
  src: string;
  alt: string;
};

export type MegaMenuLink = {
  id: string;
  href: string;
  label: string;
  description?: string;
  target?: string;
  rel?: string;
  logo?: MegaMenuLinkLogo;
};

export type MegaMenuColumn = {
  title: string;
  href?: string;
  links: MegaMenuLink[];
  layout?: "detailed" | "compact" | "compact-grid";
};

function sortMegaMenuLinksByLabel(links: MegaMenuLink[]) {
  return [...links].sort((a, b) => a.label.localeCompare(b.label));
}

const installationGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "install-astro",
    href: "/docs/install-astro",
    label: "Astro",
    logo: { src: astroLogo.src, alt: "Astro logo" },
  },
  {
    id: "install-bolt",
    href: "/docs/install-bolt",
    label: "Bolt",
    logo: { src: boltLogo.src, alt: "Bolt logo" },
  },
  {
    id: "install-framer",
    href: "/docs/install-framer",
    label: "Framer",
    logo: { src: framerLogo.src, alt: "Framer logo" },
  },
  {
    id: "install-ghost",
    href: "/docs/install-ghost",
    label: "Ghost",
    logo: { src: ghostLogo.src, alt: "Ghost logo" },
  },
  {
    id: "install-kajabi",
    href: "/docs/install-kajabi",
    label: "Kajabi",
    logo: { src: kajabiLogo.src, alt: "Kajabi logo" },
  },
  {
    id: "install-laravel",
    href: "/docs/install-laravel",
    label: "Laravel",
    logo: { src: laravelLogo.src, alt: "Laravel logo" },
  },
  {
    id: "install-lovable",
    href: "/docs/install-lovable",
    label: "Lovable",
    logo: { src: lovableLogo.src, alt: "Lovable logo" },
  },
  {
    id: "install-nextjs",
    href: "/docs/install-nextjs",
    label: "Next.js",
    logo: { src: nextjsLogo.src, alt: "Next.js logo" },
  },
  {
    id: "install-podia",
    href: "/docs/install-podia",
    label: "Podia",
    logo: { src: podiaLogo.src, alt: "Podia logo" },
  },
  {
    id: "install-react-router",
    href: "/docs/install-react-router",
    label: "React Router",
    logo: { src: reactRouterLogo.src, alt: "React Router logo" },
  },
  {
    id: "install-replit",
    href: "/docs/install-replit",
    label: "Replit",
    logo: { src: replitLogo.src, alt: "Replit logo" },
  },
  {
    id: "install-shopify",
    href: "/docs/install-shopify",
    label: "Shopify",
    logo: { src: shopifyLogo.src, alt: "Shopify logo" },
  },
  {
    id: "install-squarespace",
    href: "/docs/install-squarespace",
    label: "Squarespace",
    logo: { src: squarespaceLogo.src, alt: "Squarespace logo" },
  },
  {
    id: "install-vercel-v0",
    href: "/docs/install-vercel-v0",
    label: "Vercel v0",
    logo: { src: v0Logo.src, alt: "Vercel v0 logo" },
  },
  {
    id: "install-vue",
    href: "/docs/install-vue",
    label: "Vue.js",
    logo: { src: vueLogo.src, alt: "Vue.js logo" },
  },
  {
    id: "install-webflow",
    href: "/docs/install-webflow",
    label: "Webflow",
    logo: { src: webflowLogo.src, alt: "Webflow logo" },
  },
  {
    id: "install-wix",
    href: "/docs/install-wix",
    label: "Wix",
    logo: { src: wixLogo.src, alt: "Wix logo" },
  },
  {
    id: "install-wordpress",
    href: "/docs/install-wordpress",
    label: "WordPress",
    logo: { src: wordpressLogo.src, alt: "WordPress logo" },
  },
]);

const revenueGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "revenue-attribution-creem",
    href: "/docs/revenue-attribution-creem",
    label: "Creem",
    logo: { src: creemLogo.src, alt: "Creem logo" },
  },
  {
    id: "revenue-attribution-mollie",
    href: "/docs/revenue-attribution-mollie",
    label: "Mollie",
    logo: { src: mollieLogo.src, alt: "Mollie logo" },
  },
  {
    id: "revenue-attribution-paddle",
    href: "/docs/revenue-attribution-paddle",
    label: "Paddle",
    logo: { src: paddleLogo.src, alt: "Paddle logo" },
  },
  {
    id: "revenue-attribution-polar",
    href: "/docs/revenue-attribution-polar",
    label: "Polar",
    logo: { src: polarLogo.src, alt: "Polar logo" },
  },
  {
    id: "revenue-attribution-stripe",
    href: "/docs/revenue-attribution-stripe",
    label: "Stripe",
    logo: { src: stripeLogo.src, alt: "Stripe logo" },
  },
]);

const importGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "import-from-plausible",
    href: "/docs/import-from-plausible",
    label: "Plausible",
    logo: { src: plausibleLogo.src, alt: "Plausible logo" },
  },
  {
    id: "import-from-fathom",
    href: "/docs/import-from-fathom",
    label: "Fathom",
    logo: { src: fathomLogo.src, alt: "Fathom logo" },
  },
  {
    id: "import-from-umami",
    href: "/docs/import-from-umami",
    label: "Umami",
    logo: { src: umamiLogo.src, alt: "Umami logo" },
  },
  {
    id: "import-from-datafast",
    href: "/docs/import-from-datafast",
    label: "DataFast",
    logo: { src: datafastLogo.src, alt: "DataFast logo" },
  },
]);

export const APP_DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";
export const APP_SIGNIN_URL = "https://app.kobbe.io";
export const APP_SIGNUP_URL = "https://app.kobbe.io/signup";

export const siteMegaMenuColumns: MegaMenuColumn[] = [
  {
    title: "Explore",
    links: [
      {
        id: "demo",
        href: APP_DEMO_URL,
        label: "Live demo",
        description: "Browse a real dashboard without signing up.",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      {
        id: "features",
        href: "/#benefits",
        label: "All features",
        description: "Overview, funnels, revenue, privacy, and more.",
      },
      {
        id: "pricing",
        href: "/#pricing",
        label: "Pricing",
        description: "Event-based plans with every feature included.",
      },
    ],
  },
  {
    title: "Capabilities",
    links: [
      {
        id: "funnels",
        href: "/docs/funnels",
        label: "Funnels",
        description: "See where visitors drop off step by step.",
      },
      {
        id: "revenue",
        href: "/docs/revenue-attribution",
        label: "Revenue attribution",
        description: "Connect Stripe, Polar, Paddle, or Creem.",
      },
      {
        id: "conversions",
        href: "/docs/conversions",
        label: "Conversions",
        description: "Track goals without wiring every click.",
      },
      {
        id: "realtime",
        href: "/docs/realtime-visitors",
        label: "Realtime visitors",
        description: "Watch live traffic and recent events.",
      },
    ],
  },
  {
    title: "Get started",
    links: [
      {
        id: "docs-home",
        href: "/docs",
        label: "Documentation",
        description: "Guides for setup, tracking, and dashboards.",
      },
      {
        id: "add-tracker",
        href: "/docs/add-the-tracker",
        label: "Add the tracker",
        description: "Copy the snippet and verify pageviews.",
      },
      {
        id: "install-guides",
        href: "/docs/installation-guides",
        label: "All installation guides",
        description: "Every platform and framework we support.",
      },
    ],
  },
  {
    title: "Installation guides",
    href: "/docs/installation-guides",
    layout: "compact-grid",
    links: installationGuideLinks,
  },
  {
    title: "Tracking & integrations",
    links: [
      {
        id: "custom-events",
        href: "/docs/custom-events",
        label: "Custom events",
        description: "Track clicks, signups, and product actions.",
      },
      {
        id: "ai-agents",
        href: "/docs/ai-agents",
        label: "AI agents and MCP",
        description: "Query analytics from Cursor and other tools.",
      },
      {
        id: "utm-campaigns",
        href: "/docs/utm-campaigns",
        label: "UTM campaigns",
        description: "See which campaigns drive traffic and signups.",
      },
      {
        id: "search-console",
        href: "/docs/search-console",
        label: "Search Console",
        description: "Connect Google Search Console data.",
      },
    ],
  },
  {
    title: "Revenue guides",
    href: "/docs/revenue-attribution",
    layout: "compact-grid",
    links: revenueGuideLinks,
  },
  {
    title: "Import guides",
    href: "/docs/import-analytics-data",
    layout: "compact-grid",
    links: importGuideLinks,
  },
];

export type MegaMenuGroup = {
  id: string;
  columns: MegaMenuColumn[];
};

export const siteMegaMenuGroups: MegaMenuGroup[] = [
  { id: "product", columns: siteMegaMenuColumns.slice(0, 2) },
  {
    id: "docs",
    columns: [siteMegaMenuColumns[2]!, siteMegaMenuColumns[4]!],
  },
  {
    id: "setup",
    columns: [siteMegaMenuColumns[3]!, siteMegaMenuColumns[5]!],
  },
];

/** Flat links for simple mobile fallbacks and docs sidebar header. */
export function flattenMegaMenuLinks(): MegaMenuLink[] {
  return siteMegaMenuColumns.flatMap((column) => column.links);
}
