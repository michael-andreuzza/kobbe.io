import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EventsCard } from "./cards/events-card";
import { LocationsCard } from "./cards/locations-card";
import { PagesCard } from "./cards/pages-card";
import { SearchKeywordsCard } from "./cards/search-keywords-card";
import { SourcesCard } from "./cards/sources-card";
import { dashboardPreviewData } from "./dashboard-preview-data";
import { DashboardTrafficChart } from "./dashboard-traffic-chart";

const data = dashboardPreviewData["14d"];

type CapabilityCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  mockupClassName?: string;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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
        description="Visitors, visits, views, engagement, and live trends in one quick scan."
        mockupClassName="w-[30rem]"
      >
        <TrafficOverviewPreview />
      </CapabilityCard>

      <CapabilityCard
        title="Pages and paths"
        description="Top pages, entries, and exits show what attracts and retains visitors."
        mockupClassName="w-[30rem]"
      >
        <PagesCard pages={data.pages} />
      </CapabilityCard>

      <CapabilityCard
        title="Sources and AI traffic"
        description="Referrers, channels, hostnames, and AI tools grouped together."
        mockupClassName="w-[30rem]"
      >
        <SourcesCard sources={data.sources} />
      </CapabilityCard>

      <CapabilityCard
        title="Audience context"
        description="Countries, cities, browsers, operating systems, and devices."
        mockupClassName="w-[30rem]"
      >
        <LocationsCard locations={data.locations} />
      </CapabilityCard>

      <CapabilityCard
        title="Events and funnels"
        description="Track sign-ups, clicks, checkout starts, and conversion steps."
        mockupClassName="w-[30rem]"
      >
        <EventsCard rows={data.events} />
      </CapabilityCard>

      <CapabilityCard
        title="Search insights"
        description="Bring Search Console queries into the same place as traffic data."
        mockupClassName="w-[30rem]"
      >
        <SearchKeywordsCard rows={data.searchKeywords} />
      </CapabilityCard>
    </div>
  );
}

function TrafficOverviewPreview() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-3">
        <TrafficMetric label="Visitors" value={data.kpi.visitors.display} />
        <TrafficMetric label="Views" value={data.kpi.views.display} />
        <TrafficMetric label="Bounce" value={data.kpi.bounceRate.display} />
      </div>
      {/*
        PreviewFrame uses pointer-events-none so buried links don't steal clicks.
        Re-enable events on the chart only so hover + pinned tooltip work like the app.
      */}
      <div className="pointer-events-auto relative z-20">
        <DashboardTrafficChart
          points={data.points}
          metric="visitors"
          rangeLabel={data.label}
        >
          Visitors
        </DashboardTrafficChart>
      </div>
    </div>
  );
}

function TrafficMetric(props: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg p-3">
      <p className="text-muted-foreground truncate text-xs font-medium">
        {props.label}
      </p>
      <p className="text-foreground mt-2 text-xl font-semibold tracking-tight tabular-nums">
        {props.value}
      </p>
    </div>
  );
}

function CapabilityCard(props: CapabilityCardProps) {
  return (
    <Card className="group bg-surface min-w-0 gap-0 overflow-hidden p-0">
      <CardHeader className="px-4 pt-4 sm:px-5 sm:pt-5">
        <CardTitle className="text-foreground text-base font-medium tracking-tight">
          {props.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-sm leading-6">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 pt-5 pr-0 pb-0 pl-4 sm:pl-5">
        <PreviewFrame mockupClassName={props.mockupClassName}>
          {props.children}
        </PreviewFrame>
      </CardContent>
    </Card>
  );
}

function PreviewFrame(props: {
  children: ReactNode;
  mockupClassName?: string;
}) {
  return (
    <div className="bg-card border-border/60 relative h-72 overflow-hidden rounded-tl-xl border-t border-l ">
      <div
        className={cn(
          "kobbe-capability-mockup pointer-events-none absolute top-2 left-2 origin-top-left **:data-dashboard-metric-tile:bg-transparent **:data-[slot=card]:bg-transparent",
          props.mockupClassName,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export default DashboardCapabilityGrid;
