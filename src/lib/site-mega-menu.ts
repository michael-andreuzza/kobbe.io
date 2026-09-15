import astroLogo from "@/images/brands/astro.svg";
import creemLogo from "@/images/brands/creem.svg";
import datafastLogo from "@/images/brands/datafast.svg";
import fathomLogo from "@/images/brands/fathom.svg";
import framerLogo from "@/images/brands/framer.svg";
import lovableLogo from "@/images/brands/lovable.svg";
import mollieLogo from "@/images/brands/mollie.svg";
import nextjsLogo from "@/images/brands/nextjs.svg";
import paddleLogo from "@/images/brands/paddle.svg";
import plausibleLogo from "@/images/brands/plausible.svg";
import polarLogo from "@/images/brands/polar.svg";
import revenuecatLogo from "@/images/brands/revenuecat.svg";
import shopifyLogo from "@/images/brands/shopify.svg";
import stripeLogo from "@/images/brands/stripe.svg";
import umamiLogo from "@/images/brands/umami.svg";
import v0Logo from "@/images/brands/v0.svg";
import vueLogo from "@/images/brands/vue.svg";
import webflowLogo from "@/images/brands/webflow.svg";
import whopLogo from "@/images/brands/whop.svg";
import wordpressLogo from "@/images/brands/wordpress.svg";

export type MegaMenuLink = {
  id: string;
  href: string;
  label: string;
  description?: string;
  target?: string;
  rel?: string;
};

export type MegaMenuGuideLink = {
  id: string;
  href: string;
  label: string;
  logo: { src: string; alt: string };
};

export type MegaMenuGuideGroup = {
  id: string;
  title: string;
  seeAllHref: string;
  links: MegaMenuGuideLink[];
};

function byLabel(links: MegaMenuGuideLink[]) {
  return [...links].sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Compact logo grids in the desktop mega menu: the most-used platforms per
 * guide family, capped at 8 so the panel stays scannable. The full lists live
 * on each "See all" index page.
 */
export const siteMegaMenuGuideGroups: MegaMenuGuideGroup[] = [
  {
    id: "install",
    title: "Installation guides",
    seeAllHref: "/docs/installation-guides",
    links: byLabel([
      { id: "install-astro", href: "/docs/install-astro", label: "Astro", logo: { src: astroLogo.src, alt: "Astro logo" } },
      { id: "install-framer", href: "/docs/install-framer", label: "Framer", logo: { src: framerLogo.src, alt: "Framer logo" } },
      { id: "install-lovable", href: "/docs/install-lovable", label: "Lovable", logo: { src: lovableLogo.src, alt: "Lovable logo" } },
      { id: "install-nextjs", href: "/docs/install-nextjs", label: "Next.js", logo: { src: nextjsLogo.src, alt: "Next.js logo" } },
      { id: "install-shopify", href: "/docs/install-shopify", label: "Shopify", logo: { src: shopifyLogo.src, alt: "Shopify logo" } },
      { id: "install-vercel-v0", href: "/docs/install-vercel-v0", label: "Vercel v0", logo: { src: v0Logo.src, alt: "Vercel v0 logo" } },
      { id: "install-vue", href: "/docs/install-vue", label: "Vue.js", logo: { src: vueLogo.src, alt: "Vue.js logo" } },
      { id: "install-webflow", href: "/docs/install-webflow", label: "Webflow", logo: { src: webflowLogo.src, alt: "Webflow logo" } },
      { id: "install-wordpress", href: "/docs/install-wordpress", label: "WordPress", logo: { src: wordpressLogo.src, alt: "WordPress logo" } },
    ]).slice(0, 8),
  },
  {
    id: "revenue",
    title: "Revenue attribution",
    seeAllHref: "/docs/revenue-attribution",
    links: byLabel([
      { id: "revenue-creem", href: "/docs/revenue-attribution-creem", label: "Creem", logo: { src: creemLogo.src, alt: "Creem logo" } },
      { id: "revenue-mollie", href: "/docs/revenue-attribution-mollie", label: "Mollie", logo: { src: mollieLogo.src, alt: "Mollie logo" } },
      { id: "revenue-paddle", href: "/docs/revenue-attribution-paddle", label: "Paddle", logo: { src: paddleLogo.src, alt: "Paddle logo" } },
      { id: "revenue-polar", href: "/docs/revenue-attribution-polar", label: "Polar", logo: { src: polarLogo.src, alt: "Polar logo" } },
      { id: "revenue-revenuecat", href: "/docs/revenue-attribution-revenuecat", label: "RevenueCat", logo: { src: revenuecatLogo.src, alt: "RevenueCat logo" } },
      { id: "revenue-shopify", href: "/docs/revenue-attribution-shopify", label: "Shopify", logo: { src: shopifyLogo.src, alt: "Shopify logo" } },
      { id: "revenue-stripe", href: "/docs/revenue-attribution-stripe", label: "Stripe", logo: { src: stripeLogo.src, alt: "Stripe logo" } },
      { id: "revenue-whop", href: "/docs/revenue-attribution-whop", label: "Whop", logo: { src: whopLogo.src, alt: "Whop logo" } },
    ]),
  },
  {
    id: "import",
    title: "Import your data",
    seeAllHref: "/docs/import-analytics-data",
    links: byLabel([
      { id: "import-datafast", href: "/docs/import-from-datafast", label: "DataFast", logo: { src: datafastLogo.src, alt: "DataFast logo" } },
      { id: "import-fathom", href: "/docs/import-from-fathom", label: "Fathom", logo: { src: fathomLogo.src, alt: "Fathom logo" } },
      { id: "import-plausible", href: "/docs/import-from-plausible", label: "Plausible", logo: { src: plausibleLogo.src, alt: "Plausible logo" } },
      { id: "import-umami", href: "/docs/import-from-umami", label: "Umami", logo: { src: umamiLogo.src, alt: "Umami logo" } },
    ]),
  },
];

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
    id: "custom-events",
    href: "/docs/custom-events",
    label: "Custom events",
    description: "Track clicks, signups, downloads, and purchases.",
  },
  {
    id: "utm-campaigns",
    href: "/docs/utm-campaigns",
    label: "UTM campaigns",
    description: "Traffic and conversions per marketing campaign.",
  },
  {
    id: "bot-filtering",
    href: "/docs/bot-filtering",
    label: "Bot filtering",
    description: "How bots, scrapers, and headless browsers get dropped.",
  },
  {
    id: "search-console",
    href: "/docs/search-console",
    label: "Search Console",
    description: "Google search queries and clicks beside your traffic.",
  },
  {
    id: "web-vitals",
    href: "/docs/performance-web-vitals",
    label: "Web Vitals",
    description: "Real-user performance by page, device, and country.",
  },
  {
    id: "traffic-alerts",
    href: "/docs/traffic-alerts",
    label: "Traffic alerts",
    description: "Email alerts when traffic spikes or drops.",
  },
  {
    id: "raycast",
    href: "/docs/raycast",
    label: "Raycast extension",
    description:
      "Live visitors in your menu bar, dashboards one keystroke away.",
  },
];
