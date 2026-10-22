/**
 * The full feature catalog for /features, grouped into stacked sections in
 * the landing language, each feature linking to its docs page. The flat list
 * feeds the JSON-LD ItemList.
 */
export interface FeatureItem {
  title: string;
  description: string;
  href: string;
}

export interface FeatureGroup {
  /** Two-tone sentence on the left of the 12 column grid. */
  lead: string;
  summary: string;
  title: string;
  blurb: string;
  items: FeatureItem[];
}

export const featureGroups: FeatureGroup[] = [
  {
    lead: "Accurate data,",
    summary: "with everything that is not a person removed.",
    title: "Only real visitors make it into your stats",
    blurb:
      "Numbers you can trust, because everything that is not a person is removed before it counts.",
    items: [
      {
        title: "Bot filtering",
        description:
          "Headless browsers, datacenter traffic, and referrer spam are dropped before they touch your stats. Filtered bots never count toward your quota.",
        href: "/docs/bot-filtering",
      },
      {
        title: "Realtime visitors",
        description:
          "Who is on your site right now: live pages, sources, and countries, updating as it happens.",
        href: "/docs/realtime-visitors",
      },
      {
        title: "Pages, sources, and more",
        description:
          "Top pages, referrers, locations, devices, and browsers in one dashboard, each one a click away from filtering everything else.",
        href: "/docs/dashboard-overview",
      },
      {
        title: "Saved views",
        description:
          "Save the filters you use most, like Google visitors on mobile, and get back to them in one click.",
        href: "/docs/dashboard-overview#saved-views",
      },
      {
        title: "Page groups",
        description:
          "Combine pages into sections like Blog or Docs with path patterns, and see unique visitors per section.",
        href: "/docs/dashboard-stats-pages#page-groups",
      },
      {
        title: "Previous and next pages",
        description:
          "Open any page to see where its visitors came from and where they went next, within the same visit.",
        href: "/docs/dashboard-stats-pages#previous-and-next-pages",
      },
      {
        title: "Exclude your own visits",
        description:
          "Keep yourself, your team, and your office IPs out of the numbers.",
        href: "/docs/exclude-visits",
      },
      {
        title: "First-party collection",
        description:
          "Serve the tracker from your own domain, so ad blockers treat it like the rest of your site.",
        href: "/docs/first-party-collect",
      },
      {
        title: "Cross-domain and subdomains",
        description:
          "Follow a visit across your marketing site, app, and checkout as one session. Roll subdomains into one site or keep them separate.",
        href: "/docs/cross-domain-tracking",
      },
      {
        title: "SPA and hash routing",
        description:
          "Single-page apps and hash-based routers are tracked correctly out of the box.",
        href: "/docs/hash-page-paths",
      },
    ],
  },
  {
    lead: "Revenue and goals,",
    summary: "from the first visit to the conversion.",
    title: "Attribute revenue, not just visits",
    blurb:
      "Traffic is a vanity metric. See what every page, source, and campaign actually earns.",
    items: [
      {
        title: "Revenue attribution",
        description:
          "Connect Stripe, Polar, Paddle, Shopify, and more to see the revenue every page, source, and campaign actually produced.",
        href: "/docs/revenue-attribution",
      },
      {
        title: "Conversions and goals",
        description:
          "Mark any event or page as a conversion and track rates by source, campaign, device, and page.",
        href: "/docs/conversions",
      },
      {
        title: "File download tracking",
        description:
          "Clicks on PDFs, ZIPs, DMGs, and other files are tracked automatically, with the file name and extension.",
        href: "/docs/conversions#file-downloads",
      },
      {
        title: "Site search",
        description:
          "See what visitors type into your search box, and filter the dashboard by any search term.",
        href: "/docs/site-search",
      },
      {
        title: "Funnels",
        description:
          "Build multi-step funnels from pages and events you already collect, and see exactly where people drop off.",
        href: "/docs/funnels",
      },
      {
        title: "UTM campaigns",
        description:
          "Every UTM parameter captured and broken down, so paid, organic, and newsletter campaigns are comparable at a glance.",
        href: "/docs/utm-campaigns",
      },
      {
        title: "Custom events",
        description:
          "Track signups, clicks, downloads, and any action that matters with a single function call.",
        href: "/docs/custom-events",
      },
    ],
  },
  {
    lead: "Privacy,",
    summary: "cookieless by default, and always portable.",
    title: "Privacy by default, with your data always portable",
    blurb:
      "No cookies, no consent banner, nothing personal stored. Analytics that do not need forgiveness.",
    items: [
      {
        title: "Cookieless tracking",
        description:
          "No cookies, no fingerprinting, no consent banner to click away. Global Privacy Control and Do Not Track are honored before a single request is sent.",
        href: "/docs/privacy-and-cookieless-tracking",
      },
      {
        title: "Import your history",
        description:
          "Move in from Google Analytics, Plausible, Matomo, Fathom, and more with your historical data intact.",
        href: "/docs/import-analytics-data",
      },
      {
        title: "Export anytime",
        description:
          "Your data stays yours. Export everything whenever you want, no lock-in, no waiting period.",
        href: "/docs/data-export",
      },
    ],
  },
  {
    lead: "Performance,",
    summary: "speed and search beside your traffic.",
    title: "Speed and search visibility, in the same dashboard",
    blurb:
      "How fast your pages feel and how they rank, measured on real visitors instead of lab runs.",
    items: [
      {
        title: "Core Web Vitals",
        description:
          "LCP, CLS, and INP with percentile trends. See which pages feel slow before Google tells you.",
        href: "/docs/performance-web-vitals",
      },
      {
        title: "JavaScript error tracking",
        description:
          "See which errors visitors hit, on which pages and browsers, and whether they cost you conversions.",
        href: "/docs/error-tracking",
      },
      {
        title: "Google Search Console",
        description:
          "Search queries, impressions, and positions beside your traffic, plus the queries closest to page one.",
        href: "/docs/search-console",
      },
      {
        title: "404 tracking",
        description:
          "Broken links surface in your dashboard with the page that sent people there.",
        href: "/docs/404-tracking",
      },
      {
        title: "Scroll tracking",
        description:
          "See how far people actually read on every page, so you know whether the problem is the headline or the second half.",
        href: "/docs/scroll-tracking",
      },
    ],
  },
  {
    lead: "Integrations,",
    summary: "for the tools you already work in.",
    title: "Bring Kobbe to wherever you already work",
    blurb:
      "The dashboard is one way in. The terminal, your editor, your menu bar, and your inbox are others.",
    items: [
      {
        title: "CLI, MCP, and AI agents",
        description:
          "Query your analytics from the terminal, or plug Kobbe into Claude, Cursor, and other agents over MCP.",
        href: "/docs/cli",
      },
      {
        title: "Raycast extension",
        description:
          "Live visitors in your menu bar and every dashboard one keystroke away.",
        href: "/docs/raycast",
      },
      {
        title: "Shared dashboards",
        description:
          "Share a read-only dashboard with a private link, protected by a password if you like.",
        href: "/docs/shared-dashboards",
      },
      {
        title: "Embed widgets",
        description:
          "Drop live stats into your own site with embeddable widgets.",
        href: "/docs/embed-widgets",
      },
      {
        title: "Public profiles",
        description:
          "A public page listing the dashboards you have chosen to share, for building in public.",
        href: "/docs/public-profiles",
      },
      {
        title: "Team access",
        description:
          "Invite teammates to a workspace with their own logins. No shared passwords.",
        href: "/docs/team-access",
      },
      {
        title: "Traffic alerts",
        description:
          "An email when traffic spikes or dips beyond your usual range.",
        href: "/docs/traffic-alerts",
      },
      {
        title: "Monthly reports",
        description:
          "A clean monthly summary of traffic, sources, conversions, and revenue, delivered to your inbox.",
        href: "/docs/monthly-reports",
      },
    ],
  },
];

/** Flat list for JSON-LD and anywhere that needs the whole catalog. */
export const featureItems: FeatureItem[] = featureGroups.flatMap(
  (group) => group.items,
);
