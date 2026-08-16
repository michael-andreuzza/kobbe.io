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
  { id: "install-astro", href: "/docs/install-astro", label: "Astro" },
  { id: "install-bolt", href: "/docs/install-bolt", label: "Bolt" },
  { id: "install-bubble", href: "/docs/install-bubble", label: "Bubble" },
  { id: "install-django", href: "/docs/install-django", label: "Django" },
  { id: "install-framer", href: "/docs/install-framer", label: "Framer" },
  {
    id: "install-google-tag-manager",
    href: "/docs/install-google-tag-manager",
    label: "Google Tag Manager",
  },
  { id: "install-ghost", href: "/docs/install-ghost", label: "Ghost" },
  { id: "install-kajabi", href: "/docs/install-kajabi", label: "Kajabi" },
  { id: "install-laravel", href: "/docs/install-laravel", label: "Laravel" },
  { id: "install-lovable", href: "/docs/install-lovable", label: "Lovable" },
  { id: "install-nextjs", href: "/docs/install-nextjs", label: "Next.js" },
  { id: "install-podia", href: "/docs/install-podia", label: "Podia" },
  {
    id: "install-react-router",
    href: "/docs/install-react-router",
    label: "React Router",
  },
  { id: "install-replit", href: "/docs/install-replit", label: "Replit" },
  { id: "install-shopify", href: "/docs/install-shopify", label: "Shopify" },
  {
    id: "install-squarespace",
    href: "/docs/install-squarespace",
    label: "Squarespace",
  },
  {
    id: "install-vercel-v0",
    href: "/docs/install-vercel-v0",
    label: "Vercel v0",
  },
  { id: "install-vue", href: "/docs/install-vue", label: "Vue.js" },
  { id: "install-webflow", href: "/docs/install-webflow", label: "Webflow" },
  { id: "install-wix", href: "/docs/install-wix", label: "Wix" },
  {
    id: "install-woocommerce",
    href: "/docs/install-woocommerce",
    label: "WooCommerce",
  },
  { id: "install-wordpress", href: "/docs/install-wordpress", label: "WordPress" },
]);

const revenueGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "revenue-attribution-creem",
    href: "/docs/revenue-attribution-creem",
    label: "Creem",
  },
  {
    id: "revenue-attribution-mollie",
    href: "/docs/revenue-attribution-mollie",
    label: "Mollie",
  },
  {
    id: "revenue-attribution-paddle",
    href: "/docs/revenue-attribution-paddle",
    label: "Paddle",
  },
  {
    id: "revenue-attribution-polar",
    href: "/docs/revenue-attribution-polar",
    label: "Polar",
  },
  {
    id: "revenue-attribution-revolut",
    href: "/docs/revenue-attribution-revolut",
    label: "Revolut",
  },
  {
    id: "revenue-attribution-stripe",
    href: "/docs/revenue-attribution-stripe",
    label: "Stripe",
  },
]);

const dataGuideLinks = sortMegaMenuLinksByLabel([
  {
    id: "import-analytics-data",
    href: "/docs/import-analytics-data",
    label: "Import",
  },
  {
    id: "data-export",
    href: "/docs/data-export",
    label: "Export",
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
        description: "Connect Stripe, Polar, Paddle, Creem, Mollie, or Revolut.",
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
    title: "Data",
    layout: "compact-grid",
    links: dataGuideLinks,
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
    columns: [
      siteMegaMenuColumns[3]!,
      siteMegaMenuColumns[5]!,
      siteMegaMenuColumns[6]!,
    ],
  },
];

/** Flat links for simple mobile fallbacks and docs sidebar header. */
export function flattenMegaMenuLinks(): MegaMenuLink[] {
  return siteMegaMenuColumns.flatMap((column) => column.links);
}
