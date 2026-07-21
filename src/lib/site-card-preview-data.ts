/** Upward-trending sparkline for kobbe.io site card widgets (footer CTA, etc.). */

export type SiteCardSparklinePoint = {
  t: number;
  visitors: number;
  revenueMinor: number;
};

const SITE_CARD_SPARKLINE_DAYS = 60;

function siteCardSparklineRatio(index: number, count: number): number {
  const phase = index / Math.max(1, count - 1);
  const trend = 0.26 + 0.68 * phase ** 0.9;
  const weekly = 0.07 * Math.sin((index / 7) * Math.PI * 2);
  const ripple = 0.06 * Math.sin(index * 0.81 + 0.6);
  return Math.min(0.98, Math.max(0.16, trend + weekly + ripple));
}

function generateSiteCardSparkline(dayCount = SITE_CARD_SPARKLINE_DAYS) {
  const visitorPeak = 760;

  return Array.from({ length: dayCount }, (_, index) => {
    const isLast = index === dayCount - 1;
    const ratio = siteCardSparklineRatio(index, dayCount);
    const visitors = isLast
      ? Math.round(visitorPeak * 1.32)
      : Math.round(ratio * visitorPeak);
    const revenueMinor = Math.round(
      visitors * (410 + 48 * Math.sin(index * 0.22 + 0.4)),
    );

    return { visitors, revenueMinor };
  });
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatRevenueDisplay(revenueMinor: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: revenueMinor >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(revenueMinor / 100);
}

const siteCardSparklineRaw = generateSiteCardSparkline();

const visitorsTotal = siteCardSparklineRaw.reduce(
  (total, point) => total + point.visitors,
  0,
);
const revenueTotal = siteCardSparklineRaw.reduce(
  (total, point) => total + point.revenueMinor,
  0,
);

export const siteCardSparkline: SiteCardSparklinePoint[] =
  siteCardSparklineRaw.map((point, index) => ({
    t: index,
    visitors: point.visitors,
    revenueMinor: point.revenueMinor,
  }));

export const siteCardPreview = {
  name: "Kobbe",
  domain: "kobbe.io",
  faviconSrc: "/images/favicons/favicon-32x32.png",
  visitors: formatCompact(visitorsTotal),
  revenue: formatRevenueDisplay(revenueTotal),
} as const;

export function siteCardSparklineBarSize(pointCount: number) {
  if (pointCount > 45) return 2;
  if (pointCount > 28) return 3;
  return 4;
}
