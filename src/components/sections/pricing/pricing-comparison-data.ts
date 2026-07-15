export type PricingComparisonTierId = "lite" | "starter" | "growth";

/** `true` = included, `false` = not included, string = tier-specific detail. */
export type PricingComparisonCell = boolean | string;

export type PricingComparisonFeature = {
  id: string;
  title: string;
  description: string;
  lite: PricingComparisonCell;
  starter: PricingComparisonCell;
  growth: PricingComparisonCell;
};

export type PricingComparisonSection = {
  id: string;
  title: string;
  description: string;
  features: readonly PricingComparisonFeature[];
};

export const pricingComparisonTierLabels: Record<
  PricingComparisonTierId,
  string
> = {
  lite: "Lite",
  starter: "Starter",
  growth: "Growth",
};

export const pricingComparisonSections = [
  {
    id: "limits",
    title: "Usage limits",
    description:
      "Monthly event caps and how many websites you can track per workspace.",
    features: [
      {
        id: "monthly-events",
        title: "Monthly events",
        description:
          "Pageviews, custom events, scroll visibility, and accepted Web Vitals payloads count toward your cap.",
        lite: "100K",
        starter: "1M",
        growth: "3M",
      },
      {
        id: "websites",
        title: "Websites",
        description: "Track multiple sites from one workspace.",
        lite: "3",
        starter: "30",
        growth: "50",
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
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "funnels",
        title: "Funnels",
        description:
          "Build multi-step funnels from pageviews and custom events with drop-off rates.",
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "conversions",
        title: "Conversions",
        description:
          "Name and track conversion actions from your install snippet or dashboard.",
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "custom-events",
        title: "Custom events",
        description: "Send named events from your site and filter dashboards by them.",
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "referrers-channels",
        title: "Referrers and channels",
        description:
          "Break down traffic by referrer, channel, source, medium, and AI referrers.",
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "share-links",
        title: "Shared dashboard links",
        description:
          "Create read-only share links with scoped access and optional expiry.",
        lite: true,
        starter: true,
        growth: true,
      },
      {
        id: "visit-filters",
        title: "Filter your visits",
        description:
          "Exclude your own IP, hostname, or path patterns so internal traffic stays out.",
        lite: true,
        starter: true,
        growth: true,
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
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "first-party-collect",
        title: "First-party collect",
        description:
          "Serve the tracker from your own subdomain with wildcard or custom CNAME hostnames.",
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "utm-campaigns",
        title: "UTM campaigns",
        description:
          "Create tracked links, compare campaign performance, and tie conversions to source and medium.",
        lite: false,
        starter: true,
        growth: true,
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
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "data-export",
        title: "Data export",
        description:
          "Download pageviews and custom events as CSV for reporting or backups.",
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "web-vitals",
        title: "Web Vitals and performance",
        description:
          "Collect real-user LCP, INP, CLS, and more with per-page and environment breakdowns.",
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "team-access",
        title: "Team access",
        description:
          "Invite teammates to view project dashboards without sharing your owner account.",
        lite: false,
        starter: true,
        growth: true,
      },
      {
        id: "agent-api-cli",
        title: "Agent API and CLI",
        description:
          "Scoped API tokens for @kobbe/cli and MCP-compatible agents such as Cursor and Claude Code.",
        lite: false,
        starter: true,
        growth: true,
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
        lite: false,
        starter: false,
        growth: true,
      },
    ],
  },
] as const satisfies ReadonlyArray<PricingComparisonSection>;
