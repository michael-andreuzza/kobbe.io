import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import { useIdlePulse } from "@/components/landing/use-idle-pulse";
import {
  EventsSummaryTable,
  LocationBreakdownList,
  PageBreakdownList,
  ReferrerBreakdownList,
  SearchTermsBreakdownList,
} from "./dashboard-list-card";
import { DashboardMetricTile } from "./dashboard-metric-strip";
import { dashboardPreviewData } from "./dashboard-preview-data";

const data = dashboardPreviewData["14d"];

const capabilityPreviewRowLimit = 2;

type CapabilityCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  mockupClassName?: string;
  unframed?: boolean;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative grid items-end gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
      <style>{`
        @keyframes kobbeCapabilityBarRise {
          from {
            opacity: 0.72;
            transform: scaleY(0.72);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .group:hover .kobbe-capability-mockup .recharts-bar-rectangle path {
            animation: kobbeCapabilityBarRise 520ms ease-out both;
            transform-box: fill-box;
            transform-origin: center bottom;
          }

          .group:hover .kobbe-capability-mockup .recharts-bar-rectangle:nth-child(2) path {
            animation-delay: 40ms;
          }

          .group:hover .kobbe-capability-mockup .recharts-bar-rectangle:nth-child(3) path {
            animation-delay: 80ms;
          }

          .group:hover .kobbe-capability-mockup .recharts-bar-rectangle:nth-child(4) path {
            animation-delay: 120ms;
          }

          .group:hover .kobbe-capability-stack li:first-child {
            transform: translateX(6px) rotate(-2deg);
          }

          .group:hover .kobbe-capability-stack li:nth-child(2) {
            transform: translateX(-6px) rotate(1.5deg);
          }
        }

        .kobbe-capability-stack ul {
          position: relative;
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 4rem;
        }

        .kobbe-capability-stack li {
          list-style: none;
          position: absolute;
          inset-inline: 0;
          width: 100%;
          transition: transform 300ms ease-out;
        }

        .kobbe-capability-stack li:first-child {
          top: 0;
          z-index: 10;
          transform: translateX(8px) rotate(-1.5deg);
        }

        .kobbe-capability-stack li:nth-child(2) {
          top: 1.625rem;
          z-index: 20;
          transform: translateX(-4px) rotate(1deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .kobbe-capability-stack li:first-child,
          .kobbe-capability-stack li:nth-child(2) {
            transform: none;
          }
        }

      `}</style>
      <CapabilityCard
        title="Traffic overview"
        description="Understand traffic quality at a glance with visitors, visits, page views, engagement, and recent movement in one compact view."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <TrafficOverviewPreview />
      </CapabilityCard>

      <CapabilityCard
        title="Pages and paths"
        description="See which pages bring people in, where they continue browsing, and which paths lead visitors to drop off."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <CapabilityListPreview>
          <PageBreakdownList
            rows={data.pages.top.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Sources and AI traffic"
        description="Break down referrers, channels, hostnames, and AI tools so you can tell where meaningful traffic is coming from."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <CapabilityListPreview>
          <ReferrerBreakdownList
            rows={data.sources.referrers.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Audience context"
        description="Learn where your audience is, what devices they use, and how browser or operating system trends affect their experience."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <CapabilityListPreview>
          <LocationBreakdownList
            rows={data.locations.countries.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Custom events"
        description="Measure the actions that matter, from sign-ups and CTA clicks to downloads and product interactions."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <CapabilityListPreview>
          <EventsSummaryTable
            rows={data.events.rows.slice(0, capabilityPreviewRowLimit)}
            total={data.events.total}
            valueMode="count"
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Search insights"
        description="Connect Search Console queries with traffic behavior to understand which searches bring qualified visitors."
        mockupClassName="w-full max-w-md"
        unframed
      >
        <CapabilityListPreview>
          <SearchTermsBreakdownList
            rows={data.searchKeywords.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>
    </div>
  );
}

function TrafficOverviewPreview() {
  const formatDelta = (deltaPct: number | null) => {
    if (deltaPct == null || !Number.isFinite(deltaPct)) {
      return null;
    }

    const sign = deltaPct > 0 ? "+" : "";
    return `${sign}${deltaPct}%`;
  };

  const tiles = [
    {
      label: "Visitors",
      value: data.kpi.visitors.display,
      hint: formatDelta(data.kpi.visitors.deltaPct),
    },
    {
      label: "Visits",
      value: data.kpi.visits.display,
      hint: formatDelta(data.kpi.visits.deltaPct),
    },
    {
      label: "Page views",
      value: data.kpi.views.display,
      hint: formatDelta(data.kpi.views.deltaPct),
    },
    
  ];

  return (
    <div className="flex w-full flex-row gap-2 sm:gap-3">
      {tiles.map((tile) => (
        <TrafficKpiTile
          key={tile.label}
          label={tile.label}
          value={tile.value}
          hint={tile.hint}
        />
      ))}
    </div>
  );
}

function TrafficKpiTile(props: {
  label: string;
  value: string;
  hint: string | null;
}) {
  return (
    <DashboardMetricTile
      surface="muted"
      className="aspect-square min-h-0 min-w-0 flex-1 p-2.5 sm:p-3"
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
          <span className="text-muted-foreground truncate text-xs leading-tight font-medium">
            {props.label}
          </span>
          {props.hint ? (
            <span className="text-success relative inline-flex shrink-0 text-xs leading-tight font-medium tabular-nums">
              {props.hint}
            </span>
          ) : null}
        </div>
        <div className="mt-auto min-w-0">
          <span className="text-foreground truncate text-base leading-tight font-medium tracking-tight tabular-nums sm:text-lg">
            {props.value}
          </span>
        </div>
      </div>
    </DashboardMetricTile>
  );
}

function CapabilityCard(props: CapabilityCardProps) {
  return (
    <div className="group flex min-w-0 flex-col overflow-visible h-full justify-start gap-4">
      <AnimatedPanelReveal trigger="scroll" mask={false}>
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
          {props.unframed ? (
            <div
              className={cn(
                "kobbe-capability-mockup pointer-events-none relative flex w-full origin-top items-start justify-start",
                props.mockupClassName,
              )}
            >
              {props.children}
            </div>
          ) : (
            <PreviewFrame mockupClassName={props.mockupClassName}>
              {props.children}
            </PreviewFrame>
          )}
        </div>
      </AnimatedPanelReveal>
      <p className="text-foreground  text-base font-medium text-pretty order-first">
        {props.title}.
        <span className="text-muted-foreground"> {props.description}</span>
      </p>
    </div>
  );
}

function CapabilityListPreview(props: { children: ReactNode }) {
  return (
    <div className="kobbe-capability-stack [&_li>div]:bg-card [&_li>div]:border-border w-full [&_li>div]:rounded-lg [&_li>div]:border">
      {props.children}
    </div>
  );
}

function PreviewFrame(props: {
  children: ReactNode;
  mockupClassName?: string;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useIdlePulse(frameRef, {
    selector: "[data-kobbe-stagger]:not([data-dashboard-metric-tile])",
    interval: 2800,
    initialDelay: 1800,
    scaleTo: 1.008,
    staggerEach: 0.08,
  });

  return (
    <div
      ref={frameRef}
      className="bg-card relative flex h-72 w-full items-start justify-center rounded-xl"
    >
      <div
        className={cn(
          "kobbe-capability-mockup pointer-events-none relative origin-center",
          props.mockupClassName,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export default DashboardCapabilityGrid;
