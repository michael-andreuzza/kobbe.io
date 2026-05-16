import type { StackedChartPoint } from "./traffic-line-chart";

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
    visitors: { display: string; deltaPct: number | null; tone: "good" | "bad" | "neutral" };
    visits: { display: string; deltaPct: number | null; tone: "good" | "bad" | "neutral" };
    views: { display: string; deltaPct: number | null; tone: "good" | "bad" | "neutral" };
    bounceRate: { display: string; deltaPct: number | null; tone: "good" | "bad" | "neutral" };
    sessionTime: { display: string; deltaPct: number | null; tone: "good" | "bad" | "neutral" };
    revenue: { display: string; rightHint?: string };
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
  funnels: {
    name: string;
    completed: number;
    conversionRate: number;
    steps: { label: string; visitors: number; conversionRate: number; dropoffRate?: number }[];
  };
  campaigns: {
    rows: { name: string; source: string; medium: string; visitors: number; conversions: number }[];
  };
  webVitals: {
    metrics: { name: "LCP" | "INP" | "CLS" | "TTFB" | "FCP"; value: string; rating: "Good" | "Needs work" | "Poor"; sampleCount: number }[];
    environments: { name: string; count: number }[];
  };
};

const basePoints: StackedChartPoint[] = [
  { label: "Apr 11", visitors: 314, visits: 436, pageviews: 889, bounceRate: 0.41, avgDurationMs: 96200, revenueMinor: 68000, t: Date.UTC(2026, 3, 11) },
  { label: "Apr 12", visitors: 366, visits: 492, pageviews: 971, bounceRate: 0.39, avgDurationMs: 101000, revenueMinor: 82000, t: Date.UTC(2026, 3, 12) },
  { label: "Apr 13", visitors: 343, visits: 461, pageviews: 924, bounceRate: 0.42, avgDurationMs: 94000, revenueMinor: 76000, t: Date.UTC(2026, 3, 13) },
  { label: "Apr 14", visitors: 418, visits: 552, pageviews: 1186, bounceRate: 0.38, avgDurationMs: 108000, revenueMinor: 104000, t: Date.UTC(2026, 3, 14) },
  { label: "Apr 15", visitors: 396, visits: 527, pageviews: 1098, bounceRate: 0.4, avgDurationMs: 103000, revenueMinor: 93000, t: Date.UTC(2026, 3, 15) },
  { label: "Apr 16", visitors: 451, visits: 603, pageviews: 1272, bounceRate: 0.37, avgDurationMs: 115000, revenueMinor: 118000, t: Date.UTC(2026, 3, 16) },
  { label: "Apr 17", visitors: 489, visits: 646, pageviews: 1338, bounceRate: 0.36, avgDurationMs: 119000, revenueMinor: 132000, t: Date.UTC(2026, 3, 17) },
  { label: "Apr 18", visitors: 472, visits: 621, pageviews: 1296, bounceRate: 0.38, avgDurationMs: 112000, revenueMinor: 126000, t: Date.UTC(2026, 3, 18) },
  { label: "Apr 19", visitors: 528, visits: 708, pageviews: 1452, bounceRate: 0.35, avgDurationMs: 121000, revenueMinor: 154000, t: Date.UTC(2026, 3, 19) },
  { label: "Apr 20", visitors: 501, visits: 674, pageviews: 1384, bounceRate: 0.37, avgDurationMs: 116000, revenueMinor: 141000, t: Date.UTC(2026, 3, 20) },
  { label: "Apr 21", visitors: 546, visits: 728, pageviews: 1490, bounceRate: 0.35, avgDurationMs: 124000, revenueMinor: 168000, t: Date.UTC(2026, 3, 21) },
  { label: "Apr 22", visitors: 579, visits: 781, pageviews: 1601, bounceRate: 0.34, avgDurationMs: 129000, revenueMinor: 183000, t: Date.UTC(2026, 3, 22) },
  { label: "Apr 23", visitors: 557, visits: 742, pageviews: 1528, bounceRate: 0.36, avgDurationMs: 126000, revenueMinor: 176000, t: Date.UTC(2026, 3, 23) },
  { label: "Apr 24", visitors: 621, visits: 829, pageviews: 1724, bounceRate: 0.33, avgDurationMs: 134000, revenueMinor: 206000, t: Date.UTC(2026, 3, 24) },
  { label: "Apr 25", visitors: 604, visits: 807, pageviews: 1667, bounceRate: 0.34, avgDurationMs: 132000, revenueMinor: 198000, t: Date.UTC(2026, 3, 25) },
  { label: "Apr 26", visitors: 638, visits: 858, pageviews: 1788, bounceRate: 0.33, avgDurationMs: 138000, revenueMinor: 224000, t: Date.UTC(2026, 3, 26) },
  { label: "Apr 27", visitors: 612, visits: 816, pageviews: 1711, bounceRate: 0.35, avgDurationMs: 129000, revenueMinor: 211000, t: Date.UTC(2026, 3, 27) },
  { label: "Apr 28", visitors: 676, visits: 912, pageviews: 1886, bounceRate: 0.32, avgDurationMs: 141000, revenueMinor: 246000, t: Date.UTC(2026, 3, 28) },
  { label: "Apr 29", visitors: 704, visits: 942, pageviews: 1960, bounceRate: 0.31, avgDurationMs: 144000, revenueMinor: 262000, t: Date.UTC(2026, 3, 29) },
  { label: "Apr 30", visitors: 689, visits: 927, pageviews: 1918, bounceRate: 0.33, avgDurationMs: 139000, revenueMinor: 251000, t: Date.UTC(2026, 3, 30) },
  { label: "May 1", visitors: 731, visits: 984, pageviews: 2055, bounceRate: 0.31, avgDurationMs: 148000, revenueMinor: 286000, t: Date.UTC(2026, 4, 1) },
  { label: "May 2", visitors: 758, visits: 1021, pageviews: 2140, bounceRate: 0.3, avgDurationMs: 151000, revenueMinor: 302000, t: Date.UTC(2026, 4, 2) },
  { label: "May 3", visitors: 724, visits: 968, pageviews: 2016, bounceRate: 0.32, avgDurationMs: 146000, revenueMinor: 278000, t: Date.UTC(2026, 4, 3) },
  { label: "May 4", visitors: 792, visits: 1068, pageviews: 2235, bounceRate: 0.3, avgDurationMs: 154000, revenueMinor: 334000, t: Date.UTC(2026, 4, 4) },
  { label: "May 5", visitors: 846, visits: 1134, pageviews: 2388, bounceRate: 0.29, avgDurationMs: 162000, revenueMinor: 376000, t: Date.UTC(2026, 4, 5) },
  { label: "May 6", visitors: 818, visits: 1092, pageviews: 2296, bounceRate: 0.31, avgDurationMs: 157000, revenueMinor: 352000, t: Date.UTC(2026, 4, 6) },
  { label: "May 7", visitors: 882, visits: 1194, pageviews: 2498, bounceRate: 0.28, avgDurationMs: 168000, revenueMinor: 418000, t: Date.UTC(2026, 4, 7) },
  { label: "May 8", visitors: 911, visits: 1246, pageviews: 2614, bounceRate: 0.28, avgDurationMs: 171000, revenueMinor: 444000, t: Date.UTC(2026, 4, 8) },
  { label: "May 9", visitors: 894, visits: 1218, pageviews: 2546, bounceRate: 0.29, avgDurationMs: 166000, revenueMinor: 432000, t: Date.UTC(2026, 4, 9) },
  { label: "May 10", visitors: 948, visits: 1296, pageviews: 2718, bounceRate: 0.27, avgDurationMs: 176000, revenueMinor: 486000, t: Date.UTC(2026, 4, 10) },
];

function lastPoints(count: number) {
  return basePoints.slice(-count);
}

function sumMetric(points: StackedChartPoint[], metric: keyof StackedChartPoint) {
  return points.reduce((total, point) => total + Number(point[metric] ?? 0), 0);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function buildKpi(points: StackedChartPoint[]) {
  const visits = sumMetric(points, "visits");
  const bounceAvg =
    points.reduce((sum, point) => sum + point.bounceRate, 0) / Math.max(1, points.length);
  const sessionAvg =
    points.reduce((sum, point) => sum + point.avgDurationMs, 0) / Math.max(1, points.length);
  return {
    showComparison: true,
    visitors: { display: formatCompact(sumMetric(points, "visitors")), deltaPct: 18.4, tone: "good" as const },
    visits: { display: formatCompact(visits), deltaPct: 15.2, tone: "good" as const },
    views: { display: formatCompact(sumMetric(points, "pageviews")), deltaPct: 22.1, tone: "good" as const },
    bounceRate: { display: `${Math.round(bounceAvg * 100)}%`, deltaPct: -6.3, tone: "good" as const },
    sessionTime: { display: `${Math.floor(sessionAvg / 60000)}m ${Math.round((sessionAvg % 60000) / 1000)}s`, deltaPct: 9.8, tone: "good" as const },
    revenue: {
      display: `$${formatCompact(sumMetric(points, "revenueMinor") / 100)}`,
      rightHint: "184 paid",
    },
  };
}

const pages = {
  top: [
    { path: "/", count: 9842, revenueMinor: 114000 },
    { path: "/pricing", count: 4118, revenueMinor: 94000 },
    { path: "/docs/install-astro", count: 2906 },
    { path: "/docs/revenue-attribution", count: 2442, revenueMinor: 182000 },
    { path: "/demo/kobbe-studio", count: 1885 },
  ],
  entered: [
    { path: "/", count: 5731 },
    { path: "/pricing", count: 1942, revenueMinor: 62000 },
    { path: "/docs/overview", count: 1206 },
    { path: "/docs/install-nextjs", count: 842 },
  ],
  exited: [
    { path: "/pricing", count: 1134 },
    { path: "/docs/add-the-tracker", count: 936 },
    { path: "/docs/legal-privacy", count: 611 },
    { path: "/demo/kobbe-studio", count: 498 },
  ],
};

const sources = {
  referrers: [
    { referrer: "google.com", count: 6140 },
    { referrer: "twitter.com", count: 2284 },
    { referrer: "github.com", count: 1903 },
    { referrer: "producthunt.com", count: 1522 },
    { referrer: "direct", count: 1177 },
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
  completed: 236,
  conversionRate: 0.38,
  steps: [
    { label: "Visited pricing", visitors: 1840, conversionRate: 1 },
    { label: "Opened signup", visitors: 902, conversionRate: 0.49, dropoffRate: 0.51 },
    { label: "Created workspace", visitors: 418, conversionRate: 0.46, dropoffRate: 0.54 },
    { label: "Installed tracker", visitors: 236, conversionRate: 0.56, dropoffRate: 0.44 },
  ],
};

const campaigns = {
  rows: [
    { name: "launch-week", source: "producthunt", medium: "referral", visitors: 1842, conversions: 126 },
    { name: "docs-retargeting", source: "google", medium: "cpc", visitors: 1134, conversions: 88 },
    { name: "ai-builders", source: "newsletter", medium: "email", visitors: 826, conversions: 62 },
    { name: "founder-social", source: "x", medium: "social", visitors: 604, conversions: 31 },
  ],
};

const webVitals = {
  metrics: [
    { name: "LCP" as const, value: "1.8s", rating: "Good" as const, sampleCount: 1284 },
    { name: "INP" as const, value: "92ms", rating: "Good" as const, sampleCount: 1172 },
    { name: "CLS" as const, value: "0.03", rating: "Good" as const, sampleCount: 1218 },
    { name: "TTFB" as const, value: "420ms", rating: "Needs work" as const, sampleCount: 984 },
    { name: "FCP" as const, value: "1.1s", rating: "Good" as const, sampleCount: 1246 },
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
        { name: "Started checkout", visitors: 102, count: 126 },
        { name: "Connected revenue source", visitors: 61, count: 74 },
      ],
    },
    funnels,
    campaigns,
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
        { name: "Started checkout", visitors: 186, count: 236 },
        { name: "Connected revenue source", visitors: 112, count: 132 },
      ],
    },
    funnels,
    campaigns,
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
        { name: "Started checkout", visitors: 408, count: 516 },
        { name: "Connected revenue source", visitors: 228, count: 284 },
      ],
    },
    funnels,
    campaigns,
    webVitals,
  },
} satisfies Record<DashboardRangeKey, DashboardPreviewRangeData>;

export const dashboardRangeOptions: { key: DashboardRangeKey; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "14d", label: "Last 14 days" },
  { key: "30d", label: "Last 30 days" },
];
