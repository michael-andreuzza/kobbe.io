export type PricingComparisonCell = boolean | string;

export type PricingComparisonFeature = {
  id: string;
  title: string;
  description: string;
  included: PricingComparisonCell;
};

export type PricingComparisonSection = {
  id: string;
  title: string;
  description: string;
  features: readonly PricingComparisonFeature[];
};

export const pricingComparisonSections = [
  {
    id: "limits",
    title: "Usage limits",
    description:
      "Choose your monthly event cap with the slider. Pageviews, custom events, scroll visibility, and accepted Web Vitals payloads all count toward it.",
    features: [
      {
        id: "monthly-events",
        title: "Monthly events",
        description:
          "Pick the cap that fits your traffic. Upgrade or downgrade any time.",
        included: "Slider from 20K to 25M",
      },
      {
        id: "websites",
        title: "Websites",
        description: "Track multiple sites from one workspace.",
        included: "Unlimited",
      },
    ],
  },
  {
    id: "core-analytics",
    title: "Core analytics",
    description:
      "Everything you need to understand traffic, journeys, and on-site behavior.",
    features: [
      {
        id: "overview-realtime",
        title: "Overview and realtime",
        description:
          "Visitors, views, bounce rate, session time, and a live activity feed.",
        included: true,
      },
      {
        id: "funnels",
        title: "Funnels",
        description:
          "Build multi-step funnels from pageviews and custom events with drop-off rates.",
        included: true,
      },
      {
        id: "conversions",
        title: "Conversions",
        description:
          "Name and track conversion actions from your install snippet or dashboard.",
        included: true,
      },
      {
        id: "custom-events",
        title: "Custom events",
        description: "Send named events from your site and filter dashboards by them.",
        included: true,
      },
      {
        id: "insights",
        title: "Insights",
        description:
          "Engagement KPIs, ranked breakdown tables, and a conversion peak heatmap by day and hour.",
        included: true,
      },
      {
        id: "events-activity-log",
        title: "Events activity log",
        description:
          "Paginated log of pageviews and custom events with event filters, referrer and country context, and CSV export.",
        included: true,
      },
      {
        id: "referrers-channels",
        title: "Referrers and channels",
        description:
          "Break down traffic by referrer, channel, source, medium, and AI referrers.",
        included: true,
      },
      {
        id: "share-links",
        title: "Shared dashboard links",
        description:
          "Create read-only share links with scoped access and optional expiry.",
        included: true,
      },
      {
        id: "visit-filters",
        title: "Filter your visits",
        description:
          "Exclude your own IP, hostname, or path patterns so internal traffic stays out.",
        included: true,
      },
    ],
  },
  {
    id: "privacy-compliance",
    title: "Privacy and compliance",
    description:
      "Included on every plan. Your lawful basis, notices, and consent still depend on your site and configuration.",
    features: [
      {
        id: "cookieless-default",
        title: "Cookieless by default",
        description:
          "No analytics cookies or persistent browser-side visitor identifiers in the default tracker.",
        included: true,
      },
      {
        id: "gdpr-ready",
        title: "GDPR-ready analytics",
        description:
          "Privacy-minimized collection, published legal docs, and a hosted-service DPA incorporated into our Terms.",
        included: true,
      },
      {
        id: "privacy-signals",
        title: "Global Privacy Control and Do Not Track",
        description:
          "The default tracker sends no analytics request when either browser signal is enabled.",
        included: true,
      },
    ],
  },
  {
    id: "growth-monetization",
    title: "Growth and monetization",
    description:
      "Connect payments, campaigns, and first-party collect when you ship a real product.",
    features: [
      {
        id: "revenue-attribution",
        title: "Revenue attribution",
        description:
          "Connect Stripe, Polar, Paddle, or Creem webhooks and see revenue beside traffic, pages, and campaigns.",
        included: true,
      },
      {
        id: "first-party-collect",
        title: "First-party collect",
        description:
          "Serve the tracker from your own subdomain with wildcard or custom CNAME hostnames.",
        included: true,
      },
      {
        id: "utm-campaigns",
        title: "UTM campaigns",
        description:
          "Create tracked links, compare campaign performance, and tie conversions to source and medium.",
        included: true,
      },
    ],
  },
  {
    id: "operations",
    title: "Operations and integrations",
    description:
      "Alerts, exports, performance monitoring, team access, and programmatic tooling.",
    features: [
      {
        id: "traffic-alerts",
        title: "Traffic alerts",
        description:
          "Email when the last 24 hours spikes or drops sharply against your recent baseline.",
        included: true,
      },
      {
        id: "data-export",
        title: "Data export",
        description:
          "Download pageviews and custom events as CSV for reporting or backups.",
        included: true,
      },
      {
        id: "analytics-import",
        title: "Import analytics data",
        description:
          "Bring historical traffic from Plausible, Fathom, or Umami exports into your dashboard.",
        included: true,
      },
      {
        id: "web-vitals",
        title: "Web Vitals and performance",
        description:
          "Collect real-user LCP, INP, CLS, and more with per-page and environment breakdowns.",
        included: true,
      },
      {
        id: "team-access",
        title: "Team access",
        description:
          "Invite teammates to view project dashboards without sharing your owner account.",
        included: true,
      },
      {
        id: "agent-api-cli",
        title: "Agent API and CLI",
        description:
          "Scoped API tokens for @kobbe/cli and MCP-compatible agents such as Cursor and Claude Code.",
        included: true,
      },
    ],
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Automated summaries when you want less time in the dashboard.",
    features: [
      {
        id: "monthly-reports",
        title: "Monthly email reports",
        description:
          "A concise month-in-review email with traffic, top pages, sources, and revenue when available.",
        included: "From 5M events",
      },
    ],
  },
] as const satisfies ReadonlyArray<PricingComparisonSection>;
