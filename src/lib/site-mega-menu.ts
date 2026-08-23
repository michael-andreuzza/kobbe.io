export type MegaMenuLink = {
  id: string;
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

export type MegaMenuColumn = {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  links: MegaMenuLink[];
};

export const APP_DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";
export const APP_SIGNIN_URL = "https://app.kobbe.io";
export const APP_SIGNUP_URL = "https://app.kobbe.io/signup";

/**
 * The menu stays at three featured links per column; the full guide
 * catalogs live behind the "See all" index pages.
 */
export const siteMegaMenuColumns: MegaMenuColumn[] = [
  {
    title: "Product",
    links: [
      {
        id: "demo",
        href: APP_DEMO_URL,
        label: "Live demo",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      { id: "features", href: "/#benefits", label: "All features" },
      { id: "pricing", href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { id: "docs-home", href: "/docs", label: "Documentation" },
      {
        id: "dashboard-overview",
        href: "/docs/dashboard-overview",
        label: "Dashboard overview",
      },
      {
        id: "privacy",
        href: "/docs/privacy-and-cookieless-tracking",
        label: "Privacy and cookieless tracking",
      },
    ],
  },
  {
    title: "Installation guides",
    seeAllHref: "/docs/installation-guides",
    links: [
      { id: "install-nextjs", href: "/docs/install-nextjs", label: "Next.js" },
      { id: "install-shopify", href: "/docs/install-shopify", label: "Shopify" },
      { id: "install-webflow", href: "/docs/install-webflow", label: "Webflow" },
    ],
  },
  {
    title: "Revenue guides",
    seeAllHref: "/docs/revenue-attribution",
    links: [
      {
        id: "revenue-attribution-stripe",
        href: "/docs/revenue-attribution-stripe",
        label: "Stripe",
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
    ],
  },
  {
    title: "Import & export",
    seeAllHref: "/docs/import-analytics-data",
    links: [
      {
        id: "import-from-plausible",
        href: "/docs/import-from-plausible",
        label: "Plausible",
      },
      {
        id: "import-from-fathom",
        href: "/docs/import-from-fathom",
        label: "Fathom",
      },
      {
        id: "import-from-umami",
        href: "/docs/import-from-umami",
        label: "Umami",
      },
    ],
  },
];
