import type { StackedChartPoint, TrafficChartAnnotation } from "./traffic-line-chart";

export type DashboardRangeKey = "7d" | "14d" | "30d";

export type DashboardPreviewSite = {
  id: string;
  name: string;
  domain: string | null;
};

/** Static sites for the landing preview site switcher (same analytics data; labels only). */
export const dashboardPreviewSites: DashboardPreviewSite[] = [
  { id: "studio", name: "Kobbe Studio", domain: "app.kobbe.io" },
  { id: "marketing", name: "Marketing site", domain: "kobbe.io" },
];

export type TrafficChannelRow = {
  id: string;
  label: string;
  count: number;
  percent: number;
  revenueMinor?: number;
};

export type LocationRow = {
  key: string;
  label: string;
  count: number;
  countryCode?: string | null;
  revenueMinor?: number;
};

export type DashboardPreviewRangeData = {
  label: string;
  points: StackedChartPoint[];
  kpi: {
    showComparison: boolean;
    visitors: {
      display: string;
      deltaPct: number | null;
      tone: "good" | "bad" | "neutral";
    };
    visits: {
      display: string;
      deltaPct: number | null;
      tone: "good" | "bad" | "neutral";
    };
    views: {
      display: string;
      deltaPct: number | null;
      tone: "good" | "bad" | "neutral";
    };
    bounceRate: {
      display: string;
      deltaPct: number | null;
      tone: "good" | "bad" | "neutral";
    };
    sessionTime: {
      display: string;
      deltaPct: number | null;
      tone: "good" | "bad" | "neutral";
    };
    revenue: {
      display: string;
      rightHint: string;
    };
  };
  pages: {
    top: { path: string; count: number; revenueMinor?: number }[];
    entered: { path: string; count: number; revenueMinor?: number }[];
    exited: { path: string; count: number; revenueMinor?: number }[];
  };
  sources: {
    referrers: { referrer: string; count: number; revenueMinor?: number }[];
    hostnames: { name: string; count: number; revenueMinor?: number }[];
    channels: TrafficChannelRow[];
    ai: { name: string; count: number; revenueMinor?: number }[];
  };
  locations: {
    countries: LocationRow[];
    regions: LocationRow[];
    cities: LocationRow[];
  };
  devices: {
    browsers: { name: string; count: number; revenueMinor?: number }[];
    os: { name: string; count: number; revenueMinor?: number }[];
    deviceTypes: { name: string; count: number; revenueMinor?: number }[];
  };
  searchKeywords: { query: string; clicks: number; revenueMinor?: number }[];
  events: {
    total: number;
    rows: { name: string; visitors: number; count: number }[];
  };
  conversions: {
    rows: { name: string; count: number }[];
  };
  notFoundPages: {
    rows: { path: string; count: number; topFrom: string | null }[];
  };
  funnels: {
    name: string;
    completed: number;
    conversionRate: number;
    steps: {
      label: string;
      visitors: number;
      conversionRate: number;
      dropoffRate?: number;
    }[];
  };
  campaigns: {
    rows: {
      name: string;
      source: string;
      medium: string;
      visitors: number;
      conversions: number;
    }[];
  };
  webVitals: {
    metrics: {
      name: "LCP" | "INP" | "CLS" | "TTFB" | "FCP";
      value: string;
      rating: "Good" | "Watch" | "Poor";
      sampleCount: number;
    }[];
    environments: { name: string; count: number }[];
  };
};

const MS_DAY = 86_400_000;
const HERO_CHART_DAY_COUNT = 79;
const HERO_CHART_START_MS = Date.UTC(2026, 4, 2);
const HERO_CHART_PINNED_OFFSET = 3;

function formatPreviewDayLabel(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
}

function previewVisitorRatio(index: number, count: number): number {
  const phase = index / Math.max(1, count - 1);
  const primary = 0.42 + 0.32 * Math.sin(phase * Math.PI * 5.2);
  const secondary = 0.08 * Math.sin(index * 0.81 + 0.6);
  const weekly = 0.06 * Math.sin((index / 7) * Math.PI * 2);
  return Math.min(0.94, Math.max(0.12, primary + secondary + weekly));
}

function generatePreviewChartPoints(): StackedChartPoint[] {
  const visitorPeak = 890;

  return Array.from({ length: HERO_CHART_DAY_COUNT }, (_, index) => {
    const t = HERO_CHART_START_MS + index * MS_DAY;
    const isPinnedDay = index === HERO_CHART_PINNED_OFFSET;
    const ratio = previewVisitorRatio(index, HERO_CHART_DAY_COUNT);
    const visitors = isPinnedDay ? 846 : Math.round(ratio * visitorPeak);
    const visits = Math.round(visitors * (1.02 + 0.08 * Math.sin(index * 0.4)));
    const pageviews = Math.round(
      visits * (2.05 + 0.15 * Math.sin(index * 0.31)),
    );
    const bounceRate = 0.28 + 0.08 * Math.sin(index * 0.19 + 1);
    const avgDurationMs = Math.round(95_000 + 45_000 * ratio);
    const revenueMinor = Math.round(
      visitors * (380 + 40 * Math.sin(index * 0.22)),
    );

    const point: StackedChartPoint = {
      label: formatPreviewDayLabel(t),
      visitors,
      visits,
      pageviews,
      bounceRate,
      avgDurationMs,
      revenueMinor,
      t,
    };

    if (isPinnedDay) {
      point.topReferrer = { host: "lexingtonthemes.com", count: 312 };
    }

    return point;
  });
}

const basePoints = generatePreviewChartPoints();

/** Hero dashboard preview: pinned chart day (May 5) with note + top referrer. */
export const heroChartPoints = basePoints;

export const heroChartRangeLabel = "May 2 – Jul 19";

export const heroChartPinnedIndex = HERO_CHART_PINNED_OFFSET;

export const heroChartPinnedDay = "2026-05-05";

export const heroChartAnnotations: TrafficChartAnnotation[] = [
  {
    id: "hero-note-1",
    day: heroChartPinnedDay,
    label: "X launch on 28.5.26",
  },
];

function lastPoints(count: number) {
  return basePoints.slice(-count);
}

function sumMetric(
  points: StackedChartPoint[],
  metric: keyof StackedChartPoint,
) {
  return points.reduce((total, point) => total + Number(point[metric] ?? 0), 0);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatRevenueKpi(points: StackedChartPoint[]) {
  const revenueMinor = sumMetric(points, "revenueMinor");
  const display = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: revenueMinor >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(revenueMinor / 100);
  const paidOrders = Math.max(1, Math.round(revenueMinor / 41_700));
  return {
    display,
    rightHint: `${paidOrders.toLocaleString()} paid`,
  };
}

function buildKpi(points: StackedChartPoint[]) {
  const visits = sumMetric(points, "visits");
  const bounceAvg =
    points.reduce((sum, point) => sum + point.bounceRate, 0) /
    Math.max(1, points.length);
  const sessionAvg =
    points.reduce((sum, point) => sum + point.avgDurationMs, 0) /
    Math.max(1, points.length);
  return {
    showComparison: true,
    visitors: {
      display: formatCompact(sumMetric(points, "visitors")),
      deltaPct: 18.4,
      tone: "good" as const,
    },
    visits: {
      display: formatCompact(visits),
      deltaPct: 15.2,
      tone: "good" as const,
    },
    views: {
      display: formatCompact(sumMetric(points, "pageviews")),
      deltaPct: 22.1,
      tone: "good" as const,
    },
    bounceRate: {
      display: `${Math.round(bounceAvg * 100)}%`,
      deltaPct: -6.3,
      tone: "good" as const,
    },
    sessionTime: {
      display: `${Math.floor(sessionAvg / 60000)}m ${Math.round((sessionAvg % 60000) / 1000)}s`,
      deltaPct: 9.8,
      tone: "good" as const,
    },
    revenue: formatRevenueKpi(points),
  };
}

export const heroChartKpi = buildKpi(heroChartPoints);

const pages = {
  top: [
    { path: "/", count: 9842, revenueMinor: 418_000 },
    { path: "/pricing", count: 4118, revenueMinor: 624_000 },
    { path: "/docs/install-astro", count: 2906, revenueMinor: 182_000 },
    { path: "/docs/overview", count: 2442, revenueMinor: 94_000 },
    { path: "/demo/kobbe-studio", count: 1885, revenueMinor: 156_000 },
  ],
  entered: [
    { path: "/", count: 5731, revenueMinor: 248_000 },
    { path: "/pricing", count: 1942, revenueMinor: 312_000 },
    { path: "/docs/overview", count: 1206, revenueMinor: 48_000 },
    { path: "/docs/install-nextjs", count: 842, revenueMinor: 36_000 },
  ],
  exited: [
    { path: "/pricing", count: 1134, revenueMinor: 88_000 },
    { path: "/docs/add-the-tracker", count: 936, revenueMinor: 22_000 },
    { path: "/legal/privacy", count: 611, revenueMinor: 0 },
    { path: "/demo/kobbe-studio", count: 498, revenueMinor: 41_000 },
  ],
};

const sources = {
  referrers: [
    { referrer: "google.com", count: 6140, revenueMinor: 412_000 },
    { referrer: "t.co", count: 2284, revenueMinor: 286_000 },
    { referrer: "github.com", count: 1903, revenueMinor: 118_000 },
    { referrer: "producthunt.com", count: 1522, revenueMinor: 224_000 },
    { referrer: "direct", count: 1177, revenueMinor: 86_000 },
  ],
  hostnames: [
    { name: "kobbe.io", count: 10422 },
    { name: "docs.kobbe.io", count: 4120 },
    { name: "app.kobbe.io", count: 2188 },
  ],
  channels: [
    { id: "organic", label: "Organic search", count: 6140, percent: 45 },
    { id: "social", label: "Social", count: 2884, percent: 21 },
    { id: "referral", label: "Referral", count: 2466, percent: 18 },
    { id: "direct", label: "Direct", count: 2177, percent: 16 },
  ],
  ai: [
    { name: "ChatGPT", count: 802 },
    { name: "Perplexity", count: 446 },
    { name: "Claude", count: 284 },
  ],
};

const locations = {
  countries: [
    { key: "us", label: "United States", count: 4126, countryCode: "US" },
    { key: "de", label: "Germany", count: 1804, countryCode: "DE" },
    { key: "gb", label: "United Kingdom", count: 1662, countryCode: "GB" },
    { key: "es", label: "Spain", count: 1214, countryCode: "ES" },
    { key: "ca", label: "Canada", count: 982, countryCode: "CA" },
  ],
  regions: [
    { key: "california", label: "California", count: 1288 },
    { key: "berlin", label: "Berlin", count: 806 },
    { key: "england", label: "England", count: 734 },
    { key: "catalonia", label: "Catalonia", count: 522 },
  ],
  cities: [
    { key: "san-francisco", label: "San Francisco", count: 922 },
    { key: "berlin", label: "Berlin", count: 806 },
    { key: "london", label: "London", count: 691 },
    { key: "barcelona", label: "Barcelona", count: 488 },
  ],
};

const devices = {
  browsers: [
    { name: "Chrome", count: 5924 },
    { name: "Safari", count: 2622 },
    { name: "Firefox", count: 1038 },
    { name: "Edge", count: 716 },
  ],
  os: [
    { name: "macOS", count: 3488 },
    { name: "iOS", count: 2460 },
    { name: "Windows", count: 2182 },
    { name: "Android", count: 1190 },
  ],
  deviceTypes: [
    { name: "Desktop", count: 5842 },
    { name: "Mobile", count: 3182 },
    { name: "Tablet", count: 436 },
  ],
};

const funnels = {
  name: "Trial signup",
  completed: 700,
  conversionRate: 0.38,
  steps: [
    { label: "Visited pricing", visitors: 1840, conversionRate: 1 },
    {
      label: "Opened signup",
      visitors: 1380,
      conversionRate: 0.75,
      dropoffRate: 0.25,
    },
    {
      label: "Created workspace",
      visitors: 980,
      conversionRate: 0.71,
      dropoffRate: 0.29,
    },
    {
      label: "Installed tracker",
      visitors: 700,
      conversionRate: 0.71,
      dropoffRate: 0.29,
    },
  ],
};

const campaigns = {
  rows: [
    {
      name: "launch-week",
      source: "producthunt",
      medium: "referral",
      visitors: 1842,
      conversions: 126,
    },
    {
      name: "docs-retargeting",
      source: "google",
      medium: "cpc",
      visitors: 1134,
      conversions: 88,
    },
    {
      name: "ai-builders",
      source: "newsletter",
      medium: "email",
      visitors: 826,
      conversions: 62,
    },
    {
      name: "founder-social",
      source: "x",
      medium: "social",
      visitors: 604,
      conversions: 31,
    },
  ],
};

const conversions = {
  rows: [
    { name: "Form submit", count: 342 },
    { name: "Contact click", count: 224 },
    { name: "Outbound link", count: 518 },
    { name: "Messaging click", count: 104 },
  ],
};

const notFoundPages = {
  rows: [
    { path: "/docs/old-install", count: 48, topFrom: "/docs/overview" },
    { path: "/pricing-2024", count: 31, topFrom: "/blog/launch" },
    { path: "/features/security", count: 22, topFrom: "/" },
    { path: "/app/login", count: 18, topFrom: "/docs/overview" },
  ],
};

const webVitals = {
  metrics: [
    {
      name: "LCP" as const,
      value: "1.8s",
      rating: "Good" as const,
      sampleCount: 1284,
    },
    {
      name: "INP" as const,
      value: "92ms",
      rating: "Good" as const,
      sampleCount: 1172,
    },
    {
      name: "CLS" as const,
      value: "0.03",
      rating: "Good" as const,
      sampleCount: 1218,
    },
    {
      name: "TTFB" as const,
      value: "420ms",
      rating: "Watch" as const,
      sampleCount: 984,
    },
    {
      name: "FCP" as const,
      value: "1.1s",
      rating: "Good" as const,
      sampleCount: 1246,
    },
  ],
  environments: [
    { name: "Chrome desktop", count: 624 },
    { name: "Safari mobile", count: 318 },
    { name: "Firefox desktop", count: 144 },
    { name: "Edge desktop", count: 96 },
  ],
};

export const dashboardPreviewData = {
  "7d": {
    label: "Last 7 days",
    points: lastPoints(7),
    kpi: buildKpi(lastPoints(7)),
    pages,
    sources,
    locations,
    devices,
    searchKeywords: [
      { query: "privacy friendly analytics", clicks: 421 },
      { query: "cookieless analytics", clicks: 338 },
      { query: "simple analytics alternative", clicks: 214 },
      { query: "analytics for saas", clicks: 156 },
    ],
    events: {
      total: 1260,
      rows: [
        { name: "Clicked live demo", visitors: 512, count: 642 },
        { name: "Copied install script", visitors: 316, count: 418 },
        { name: "Opened pricing", visitors: 102, count: 126 },
        { name: "Started trial", visitors: 61, count: 74 },
      ],
    },
    funnels,
    campaigns,
    conversions,
    notFoundPages,
    webVitals,
  },
  "14d": {
    label: "Last 14 days",
    points: lastPoints(14),
    kpi: buildKpi(lastPoints(14)),
    pages,
    sources,
    locations,
    devices,
    searchKeywords: [
      { query: "privacy friendly analytics", clicks: 764 },
      { query: "cookieless analytics", clicks: 621 },
      { query: "google analytics alternative", clicks: 448 },
      { query: "analytics without cookies", clicks: 336 },
    ],
    events: {
      total: 2344,
      rows: [
        { name: "Clicked live demo", visitors: 956, count: 1184 },
        { name: "Copied install script", visitors: 604, count: 792 },
        { name: "Opened pricing", visitors: 186, count: 236 },
        { name: "Started trial", visitors: 112, count: 132 },
      ],
    },
    funnels,
    campaigns,
    conversions,
    notFoundPages,
    webVitals,
  },
  "30d": {
    label: "Last 30 days",
    points: lastPoints(30),
    kpi: buildKpi(lastPoints(30)),
    pages,
    sources,
    locations,
    devices,
    searchKeywords: [
      { query: "privacy friendly analytics", clicks: 1548 },
      { query: "cookieless analytics", clicks: 1206 },
      { query: "google analytics alternative", clicks: 972 },
      { query: "analytics without cookies", clicks: 774 },
    ],
    events: {
      total: 4839,
      rows: [
        { name: "Clicked live demo", visitors: 1994, count: 2428 },
        { name: "Copied install script", visitors: 1240, count: 1611 },
        { name: "Opened pricing", visitors: 408, count: 516 },
        { name: "Started trial", visitors: 228, count: 284 },
      ],
    },
    funnels,
    campaigns,
    conversions,
    notFoundPages,
    webVitals,
  },
} satisfies Record<DashboardRangeKey, DashboardPreviewRangeData>;

export const dashboardPreviewRevenueCurrency = "USD";

export function formatDashboardPreviewRevenue(minor: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: dashboardPreviewRevenueCurrency,
    maximumFractionDigits: minor >= 100_000 ? 0 : 2,
  }).format(minor / 100);
}

export const dashboardRangeOptions: {
  key: DashboardRangeKey;
  label: string;
}[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "14d", label: "Last 14 days" },
  { key: "30d", label: "Last 30 days" },
];
