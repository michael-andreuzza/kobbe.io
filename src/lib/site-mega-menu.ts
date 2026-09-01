import astroLogo from "@/images/brands/astro.svg";
import creemLogo from "@/images/brands/creem.svg";
import framerLogo from "@/images/brands/framer.svg";
import ghostLogo from "@/images/brands/ghost.png";
import lovableLogo from "@/images/brands/lovable.svg";
import mollieLogo from "@/images/brands/mollie.svg";
import nextjsLogo from "@/images/brands/nextjs.svg";
import paddleLogo from "@/images/brands/paddle.svg";
import plausibleLogo from "@/images/brands/plausible.svg";
import fathomLogo from "@/images/brands/fathom.svg";
import umamiLogo from "@/images/brands/umami.svg";
import datafastLogo from "@/images/brands/datafast.svg";
import polarLogo from "@/images/brands/polar.svg";
import replitLogo from "@/images/brands/replit.svg";
import revenuecatLogo from "@/images/brands/revenuecat.svg";
import revolutLogo from "@/images/brands/revolut.svg";
import shopifyLogo from "@/images/brands/shopify.svg";
import superwallLogo from "@/images/brands/superwall.svg";
import whopLogo from "@/images/brands/whop.svg";
import stripeLogo from "@/images/brands/stripe.svg";
import v0Logo from "@/images/brands/v0.svg";
import vueLogo from "@/images/brands/vue.svg";
import webflowLogo from "@/images/brands/webflow.svg";

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
  /** Shown in the desktop mega menu's capped logo grids; the full list stays
      reachable via "See all" and the mobile menu. */
  featured?: boolean;
};

export type MegaMenuColumn = {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  links: MegaMenuLink[];
  layout?: "detailed" | "compact" | "compact-grid" | "compact-grid-3" | "compact-grid-4";
};

export type MegaMenuGroup = {
  id: string;
  columns: MegaMenuColumn[];
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
    featured: true,
  },
  {
    id: "install-framer",
    href: "/docs/install-framer",
    label: "Framer",
    logo: { src: framerLogo.src, alt: "Framer logo" },
    featured: true,
  },
  {
    id: "install-ghost",
    href: "/docs/install-ghost",
    label: "Ghost",
    logo: { src: ghostLogo.src, alt: "Ghost logo" },
  },
  {
    id: "install-lovable",
    href: "/docs/install-lovable",
    label: "Lovable",
    logo: { src: lovableLogo.src, alt: "Lovable logo" },
    featured: true,
  },
  {
    id: "install-nextjs",
    href: "/docs/install-nextjs",
    label: "Next.js",
    logo: { src: nextjsLogo.src, alt: "Next.js logo" },
    featured: true,
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
    featured: true,
  },
  {
    id: "install-vercel-v0",
    href: "/docs/install-vercel-v0",
    label: "Vercel v0",
    logo: { src: v0Logo.src, alt: "Vercel v0 logo" },
    featured: true,
  },
  {
    id: "install-vue",
    href: "/docs/install-vue",
    label: "Vue.js",
    logo: { src: vueLogo.src, alt: "Vue.js logo" },
    featured: true,
  },
  {
    id: "install-webflow",
    href: "/docs/install-webflow",
    label: "Webflow",
    logo: { src: webflowLogo.src, alt: "Webflow logo" },
    featured: true,
  },
]);

const revenueGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "revenue-attribution-creem",
    href: "/docs/revenue-attribution-creem",
    label: "Creem",
    logo: { src: creemLogo.src, alt: "Creem logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-mollie",
    href: "/docs/revenue-attribution-mollie",
    label: "Mollie",
    logo: { src: mollieLogo.src, alt: "Mollie logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-paddle",
    href: "/docs/revenue-attribution-paddle",
    label: "Paddle",
    logo: { src: paddleLogo.src, alt: "Paddle logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-polar",
    href: "/docs/revenue-attribution-polar",
    label: "Polar",
    logo: { src: polarLogo.src, alt: "Polar logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-revolut",
    href: "/docs/revenue-attribution-revolut",
    label: "Revolut",
    logo: { src: revolutLogo.src, alt: "Revolut logo" },
  },
  {
    id: "revenue-attribution-stripe",
    href: "/docs/revenue-attribution-stripe",
    label: "Stripe",
    logo: { src: stripeLogo.src, alt: "Stripe logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-revenuecat",
    href: "/docs/revenue-attribution-revenuecat",
    label: "RevenueCat",
    logo: { src: revenuecatLogo.src, alt: "RevenueCat logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-shopify",
    href: "/docs/revenue-attribution-shopify",
    label: "Shopify",
    logo: { src: shopifyLogo.src, alt: "Shopify logo" },
    featured: true,
  },
  {
    id: "revenue-attribution-superwall",
    href: "/docs/revenue-attribution-superwall",
    label: "Superwall",
    logo: { src: superwallLogo.src, alt: "Superwall logo" },
  },
  {
    id: "revenue-attribution-whop",
    href: "/docs/revenue-attribution-whop",
    label: "Whop",
    logo: { src: whopLogo.src, alt: "Whop logo" },
    featured: true,
  },
]);

const importProviderGuideLinks = sortMegaMenuLinksByLabel([
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

const dataGuideLinks: MegaMenuLink[] = importProviderGuideLinks;

export const APP_DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";
export const APP_SIGNIN_URL = "https://app.kobbe.io";
export const APP_SIGNUP_URL = "https://app.kobbe.io/signup";

const exploreColumn: MegaMenuColumn = {
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
};

const getStartedColumn: MegaMenuColumn = {
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
};

const capabilitiesColumn: MegaMenuColumn = {
  title: "Capabilities",
  links: [
    {
      id: "funnels",
      href: "/docs/funnels",
      label: "Funnels",
      description: "See where visitors drop off step by step.",
    },
    {
      id: "insights",
      href: "/docs/insights",
      label: "Insights",
      description: "Engagement KPIs, breakdown tables, and heatmaps.",
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
};

const trackingColumn: MegaMenuColumn = {
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
};

const installationGuidesColumn: MegaMenuColumn = {
  title: "Installation guides",
  seeAllHref: "/docs/installation-guides",
  layout: "compact-grid-3",
  links: installationGuideLinks,
};

const revenueGuidesColumn: MegaMenuColumn = {
  title: "Revenue guides",
  seeAllHref: "/docs/revenue-attribution",
  layout: "compact-grid-3",
  links: revenueGuideLinks,
};

const dataGuidesColumn: MegaMenuColumn = {
  title: "Import & export",
  seeAllHref: "/docs/import-analytics-data",
  layout: "compact-grid-3",
  links: dataGuideLinks,
};

export const siteMegaMenuGroups: MegaMenuGroup[] = [
  {
    id: "product",
    columns: [exploreColumn, capabilitiesColumn],
  },
  {
    id: "docs",
    columns: [getStartedColumn, trackingColumn],
  },
  {
    id: "setup",
    columns: [
      installationGuidesColumn,
      revenueGuidesColumn,
      dataGuidesColumn,
    ],
  },
];

export const siteMegaMenuColumns: MegaMenuColumn[] =
  siteMegaMenuGroups.flatMap((group) => group.columns);

/** Flat links for simple mobile fallbacks and docs sidebar header. */
export function flattenMegaMenuLinks(): MegaMenuLink[] {
  return siteMegaMenuColumns.flatMap((column) => column.links);
}
