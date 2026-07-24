import {
  IndexSiteVisitorsSparkline,
  type IndexSparklinePoint,
} from "@/components/sections/pricing/index-site-visitors-sparkline";

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

function formatAuthPanelCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatAuthPanelRevenue(revenueMinor: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: revenueMinor >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(revenueMinor / 100);
}

const authPanelSparklineRaw = generateSiteCardSparkline();

const authPanelVisitorsTotal = authPanelSparklineRaw.reduce(
  (total, point) => total + point.visitors,
  0,
);
const authPanelRevenueTotal = authPanelSparklineRaw.reduce(
  (total, point) => total + point.revenueMinor,
  0,
);

const authPanelSparkline: IndexSparklinePoint[] = authPanelSparklineRaw.map(
  (point, index) => ({
    t: index,
    visitors: point.visitors,
    revenueMinor: point.revenueMinor,
  }),
);

const authPanelSiteCard = {
  name: "Kobbe",
  domain: "kobbe.io",
  faviconSrc: "/images/favicons/favicon-32x32.png",
  visitors: formatAuthPanelCompact(authPanelVisitorsTotal),
  revenue: formatAuthPanelRevenue(authPanelRevenueTotal),
} as const;

function AuthPanelMetricRow(props: {
  label: string;
  value: string;
  chipClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 leading-none">
      <span className="text-muted-foreground inline-flex min-w-0 items-center gap-1.5 text-xs">
        <span
          className={`size-2 shrink-0 rounded-[2px] ${props.chipClassName}`}
        />
        {props.label}
      </span>
      <span className="text-foreground shrink-0 text-xs font-medium tabular-nums">
        {props.value}
      </span>
    </div>
  );
}

export function AuthPanelSiteCardWidget() {
  return (
    <div className="border-border/70 bg-card pointer-events-none w-full max-w-xs rounded-xl border p-4 shadow-lg sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <img
          src={authPanelSiteCard.faviconSrc}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-md border-none object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm leading-tight font-semibold">
            {authPanelSiteCard.name}
          </div>
          <div className="text-muted-foreground truncate text-xs leading-snug">
            {authPanelSiteCard.domain}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <IndexSiteVisitorsSparkline
          points={authPanelSparkline}
          showRevenue
          className="h-12 min-h-12"
        />
      </div>
      <div className="mt-4 space-y-2">
        <AuthPanelMetricRow
          label="Visitors"
          value={authPanelSiteCard.visitors}
          chipClassName="bg-foreground"
        />
        <AuthPanelMetricRow
          label="Revenue"
          value={authPanelSiteCard.revenue}
          chipClassName="bg-brand"
        />
      </div>
    </div>
  );
}

export default AuthPanelSiteCardWidget;
