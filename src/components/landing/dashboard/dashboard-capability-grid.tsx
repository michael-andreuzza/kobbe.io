import type { ReactNode } from "react";
import { useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import { useIdlePulse } from "@/components/landing/use-idle-pulse";
import { EventsCard } from "./cards/events-card";
import { LocationsCard } from "./cards/locations-card";
import { PagesCard } from "./cards/pages-card";
import { SearchKeywordsCard } from "./cards/search-keywords-card";
import { SourcesCard } from "./cards/sources-card";
import { DashboardMetricTile } from "./dashboard-metric-strip";
import { dashboardPreviewData } from "./dashboard-preview-data";

const data = dashboardPreviewData["14d"];

type CapabilityCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  mockupClassName?: string;
  unframed?: boolean;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative mt-8 grid auto-rows-fr gap-x-8 gap-y-24 md:grid-cols-2 lg:grid-cols-2">
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

        }
      `}</style>
      <CapabilityCard
        title="Traffic overview"
        description="Understand traffic quality at a glance with visitors, visits, page views, engagement, and recent movement in one compact view."
        mockupClassName="w-full"
        unframed
      >
        <TrafficOverviewPreview />
      </CapabilityCard>

      <CapabilityCard
        title="Pages and paths"
        description="See which pages bring people in, where they continue browsing, and which paths lead visitors to drop off."
        mockupClassName="w-[calc(100%-0.5rem)]"
      >
        <PagesCard pages={data.pages} />
      </CapabilityCard>

      <CapabilityCard
        title="Sources and AI traffic"
        description="Break down referrers, channels, hostnames, and AI tools so you can tell where meaningful traffic is coming from."
        mockupClassName="w-[calc(100%-0.5rem)]"
      >
        <SourcesCard sources={data.sources} />
      </CapabilityCard>

      <CapabilityCard
        title="Audience context"
        description="Learn where your audience is, what devices they use, and how browser or operating system trends affect their experience."
        mockupClassName="w-[calc(100%-0.5rem)]"
      >
        <LocationsCard locations={data.locations} />
      </CapabilityCard>

      <CapabilityCard
        title="Custom events"
        description="Measure the actions that matter, from sign-ups and CTA clicks to checkout starts and product interactions."
        mockupClassName="w-[calc(100%-0.5rem)]"
      >
        <EventsCard rows={data.events} />
      </CapabilityCard>

      <CapabilityCard
        title="Search insights"
        description="Connect Search Console queries with traffic behavior to understand which searches bring qualified visitors."
        mockupClassName="w-[calc(100%-0.5rem)]"
      >
        <SearchKeywordsCard rows={data.searchKeywords} />
      </CapabilityCard>
    </div>
  );
}

function TrafficOverviewPreview() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useIdlePulse(rootRef, {
    selector: '[data-dashboard-metric-tile][data-active="true"]',
    interval: 5200,
    initialDelay: 1200,
    scaleTo: 1.018,
  });

  return (
    <div ref={rootRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <TrafficKpi
        label="Visitors"
        value={data.kpi.visitors.display}
        hint="+18.4%"
        active
      />
      <TrafficKpi
        label="Visits"
        value={data.kpi.visits.display}
        hint="+15.2%"
        activeColor="var(--chart-2)"
      />
      <TrafficKpi
        label="Views"
        value={data.kpi.views.display}
        hint="+22.1%"
        activeColor="var(--chart-3)"
        className="hidden lg:block"
      />
    </div>
  );
}

function TrafficKpi(props: {
  label: string;
  value: string;
  hint: string;
  active?: boolean;
  activeColor?: string;
  className?: string;
}) {
  return (
    <DashboardMetricTile
      active={props.active}
      activeColor={props.activeColor ?? "var(--chart-1)"}
      surface="muted"
      className={cn("aspect-auto min-h-28", props.className)}
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
          <span
            className={cn(
              "truncate text-xs leading-tight font-medium",
              "text-muted-foreground",
            )}
          >
            {props.label}
          </span>
          <span
            className={cn(
              "relative inline-flex shrink-0 text-xs leading-tight font-medium tabular-nums",
              "text-success",
            )}
          >
            {props.hint}
          </span>
        </div>
        <div className="mt-auto min-w-0">
          <span
            className={cn(
              "text-lg leading-tight font-medium tracking-tight tabular-nums sm:text-xl",
              "text-foreground",
            )}
          >
            {props.value}
          </span>
        </div>
      </div>
    </DashboardMetricTile>
  );
}

function CapabilityCard(props: CapabilityCardProps) {
  return (
    <Card className="group flex h-full min-w-0 flex-col gap-0 overflow-hidden bg-transparent p-0">
      <CardHeader className="p-0">
        <CardTitle className="text-foreground text-base font-medium text-pretty">
          {props.title}.
          <span className="text-muted-foreground"> {props.description}</span>
        </CardTitle>
      </CardHeader>
      <AnimatedPanelReveal trigger="scroll" className="mt-auto pt-4">
        <CardContent className="bg-muted rounded-xl min-w-0 overflow-hidden p-4 pb-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none lg:p-8 lg:pb-0">
          <div className="mx-auto -mb-4 w-full">
            {props.unframed ? (
              <div
                className={cn(
                  "kobbe-capability-mockup pointer-events-none relative flex h-72 origin-center items-center justify-center",
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
        </CardContent>
      </AnimatedPanelReveal>
    </Card>
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
      className="bg-card relative flex h-72 w-full items-start justify-center overflow-hidden rounded-xl"
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
