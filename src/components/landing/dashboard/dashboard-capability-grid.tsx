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
        title="Sources, campaigns, and AI traffic"
        description="Break down referrers, UTM campaigns, channels, hostnames, and AI tools so you can tell where meaningful traffic is coming from."
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
        title="Events and funnels"
        description="Measure the actions that matter, from sign-ups and CTA clicks to checkout starts and funnel conversion steps."
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
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-3 pr-2">
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
    <div className="bg-background rounded-xl p-3">
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
    <div className="bg-muted relative h-72 w-full overflow-hidden rounded-xl">
      <motion.div
        className={cn(
          "kobbe-capability-mockup pointer-events-none absolute top-2 left-2 origin-top-left",
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
