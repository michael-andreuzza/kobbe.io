import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

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
import { DashboardMetricTile } from "./dashboard-metric-strip";
import { dashboardPreviewData } from "./dashboard-preview-data";

const data = dashboardPreviewData["14d"];

type CapabilityCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  mockupClassName?: string;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative mt-8 grid gap-4 gap-y-24 md:grid-cols-2 lg:grid-cols-2">
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
        mockupClassName="w-[calc(100%-0.5rem)]"
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
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-3 pr-2">
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
        />
        <TrafficKpi
          label="Views"
          value={data.kpi.views.display}
          hint="+22.1%"
        />
      </div>
    </div>
  );
}

function TrafficKpi(props: {
  label: string;
  value: string;
  hint: string;
  active?: boolean;
}) {
  return (
    <DashboardMetricTile
      active={props.active}
      activeColor="var(--foreground)"
      surface="muted"
      className="aspect-auto min-h-28"
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
          <span
            className={cn(
              "truncate text-xs leading-tight font-medium",
              props.active ? "text-background/70" : "text-muted-foreground",
            )}
          >
            {props.label}
          </span>
          <span
            className={cn(
              "relative inline-flex shrink-0 text-xs leading-tight font-medium tabular-nums",
              props.active ? "text-background/70" : "text-success",
            )}
          >
            {props.hint}
          </span>
        </div>
        <div className="mt-auto min-w-0">
          <span
            className={cn(
              "text-lg leading-tight font-medium tracking-tight tabular-nums sm:text-xl",
              props.active ? "text-background" : "text-foreground",
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
    <Card className="group min-w-0 gap-0 overflow-hidden bg-transparent p-0">
      <CardHeader className="px-0 pt-4 sm:pt-5">
        <CardTitle className="text-foreground text-base font-semibold tracking-tight uppercase">
          {props.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-base leading-6 text-balance">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-muted mt-8 min-w-0 rounded-xl p-8 lg:p-20">
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-muted relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl">
      <motion.div
        className={cn(
          "kobbe-capability-mockup pointer-events-none relative origin-center",
          props.mockupClassName,
        )}
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
                scale: 0.96,
                filter: "blur(6px)",
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          type: "spring",
          visualDuration: 0.8,
          bounce: 0.12,
          delay: 0.12,
        }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}

export default DashboardCapabilityGrid;
