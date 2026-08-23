export type LandingFeatureItem = {
  label: string;
  href: string;
  /** Requires the extended tracker script. */
  optIn?: boolean;
};

export type LandingFeatureGroup = {
  category: string;
  items: LandingFeatureItem[];
};

/**
 * Full feature catalog: rendered on the landing "Everything included" panel
 * and repeated as link columns in the footer (mostly for SEO).
 */
export const landingFeatureCard = {
  title: "Everything included, on every plan",
  description:
    "Same full toolkit at every event volume. Only the monthly event limit changes; nothing is gated behind a higher tier.",
  groups: [
    {
      category: "Overview",
      items: [
        { label: "Traffic overview", href: "/docs/dashboard-stats-kpis" },
        { label: "Range comparisons", href: "/docs/dashboard-overview" },
        { label: "Realtime visitors", href: "/docs/realtime-visitors" },
        {
          label: "Conversion peak",
          href: "/docs/dashboard-overview#conversion-peak",
        },
        { label: "Chart notes", href: "/docs/dashboard-overview#chart-notes" },
      ],
    },
    {
      category: "Breakdowns",
      items: [
        { label: "Pages and paths", href: "/docs/dashboard-stats-pages" },
        {
          label: "Sources, channels, and AI traffic",
          href: "/docs/dashboard-stats-sources",
        },
        {
          label: "Locations and devices",
          href: "/docs/dashboard-stats-locations",
        },
        {
          label: "Search Console insights",
          href: "/docs/search-console",
          optIn: true,
        },
        { label: "UTM campaigns", href: "/docs/utm-campaigns", optIn: true },
      ],
    },
    {
      category: "Events",
      items: [
        { label: "Custom events", href: "/docs/custom-events" },
        { label: "Events activity log", href: "/docs/events-activity-log" },
        { label: "Conversions", href: "/docs/conversions" },
        { label: "Funnels", href: "/docs/funnels" },
        {
          label: "Scroll visibility events",
          href: "/docs/scroll-tracking",
          optIn: true,
        },
      ],
    },
    {
      category: "Tracking",
      items: [
        { label: "Filter your visits", href: "/docs/exclude-visits" },
        { label: "Usage controls", href: "/docs/reduce-usage" },
        { label: "Hash routes", href: "/docs/hash-page-paths", optIn: true },
        {
          label: "Cross-domain tracking",
          href: "/docs/cross-domain-tracking",
          optIn: true,
        },
        { label: "404 tracking", href: "/docs/404-tracking" },
      ],
    },
    {
      category: "Revenue",
      items: [
        { label: "Revenue page", href: "/docs/revenue", optIn: true },
        { label: "Attribution breakdown", href: "/docs/revenue", optIn: true },
        { label: "Purchase journeys", href: "/docs/revenue", optIn: true },
        {
          label: "Checkout attribution",
          href: "/docs/revenue-attribution",
          optIn: true,
        },
        {
          label: "Payment integrations",
          href: "/docs/revenue-attribution",
          optIn: true,
        },
      ],
    },
    {
      category: "Privacy",
      items: [
        {
          label: "Private by default",
          href: "/docs/privacy-and-cookieless-tracking",
        },
        { label: "No raw IP storage", href: "/legal/gdpr-compliance" },
        {
          label: "Bot filtering",
          href: "/docs/script-options#bot-filtering-and-exclusions",
        },
        {
          label: "Privacy signals",
          href: "/docs/privacy-and-cookieless-tracking",
        },
        { label: "Data export and import", href: "/docs/data-export" },
      ],
    },
    {
      category: "Setup",
      items: [
        { label: "Lightweight tracker", href: "/docs/add-the-tracker" },
        { label: "Install guides", href: "/docs/installation-guides" },
        { label: "CLI and Raycast extension", href: "/docs/cli" },
        { label: "AI agents and MCP", href: "/docs/ai-agents" },
        {
          label: "Web Vitals",
          href: "/docs/performance-web-vitals",
          optIn: true,
        },
      ],
    },
    {
      category: "Sharing",
      items: [
        { label: "Team access", href: "/docs/team-access" },
        { label: "Shared dashboards", href: "/docs/shared-dashboards" },
        { label: "Embed widgets", href: "/docs/embed-widgets" },
        {
          label: "Monthly reports and alerts",
          href: "/docs/monthly-reports",
          optIn: true,
        },
      ],
    },
  ],
} satisfies {
  title: string;
  description: string;
  groups: LandingFeatureGroup[];
};
