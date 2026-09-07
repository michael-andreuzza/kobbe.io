export type MegaMenuLink = {
  id: string;
  href: string;
  label: string;
  description?: string;
  target?: string;
  rel?: string;
};

export const APP_DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";
export const APP_SIGNIN_URL = "https://app.kobbe.io";
export const APP_SIGNUP_URL = "https://app.kobbe.io/signup";

/**
 * The curated nav picks, shared by the desktop mega menu and the mobile
 * panel. Pricing and the live demo live in the nav pills; the long
 * per-platform guide lists stay on their index pages (and in docs search).
 */
export const siteNavLinks: MegaMenuLink[] = [
  {
    id: "features",
    href: "/features",
    label: "All features",
    description: "Overview, funnels, revenue, privacy, and more.",
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
    label: "Installation guides",
    description: "Astro, Next.js, Framer, Shopify, Webflow, and more.",
  },
  {
    id: "revenue-attribution",
    href: "/docs/revenue-attribution",
    label: "Revenue attribution",
    description: "Connect Stripe, Polar, Paddle, Shopify, and more.",
  },
  {
    id: "funnels",
    href: "/docs/funnels",
    label: "Funnels",
    description: "See where visitors drop off step by step.",
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
  {
    id: "raycast",
    href: "/docs/raycast",
    label: "Raycast extension",
    description:
      "Live visitors in your menu bar, dashboards one keystroke away.",
  },
];
