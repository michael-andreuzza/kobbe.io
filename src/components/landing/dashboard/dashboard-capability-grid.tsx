import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import {
  AnnotationsVignette,
  ConversionsVignette,
  InsightsVignette,
  NotFoundVignette,
  RealtimeVignette,
  SearchKeywordsVignette,
} from "./capability-vignettes";

type CapabilityCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  mockupClassName?: string;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CapabilityCard
        title="Conversions"
        description="Auto-track form submits, contact clicks, outbound links, and messaging taps, plus custom events for anything else, then filter the dashboard by goal."
      >
        <ConversionsVignette />
      </CapabilityCard>

      <CapabilityCard
        title="Chart annotations"
        description="Pin notes to specific days on your traffic chart so launches, campaigns, and incidents stay tied to the numbers."
      >
        <AnnotationsVignette />
      </CapabilityCard>

      <CapabilityCard
        title="Google search keywords"
        description="Connect Search Console to see which queries bring people to your site and tie search demand back to traffic."
      >
        <SearchKeywordsVignette />
      </CapabilityCard>

      <CapabilityCard
        title="Insights"
        description="See when conversions peak by day and hour, with engagement metrics and breakdowns for sources, pages, and events."
      >
        <InsightsVignette />
      </CapabilityCard>

      <CapabilityCard
        title="Realtime"
        description="See who is on your site right now, where they are, and what pages they are viewing as activity comes in."
      >
        <RealtimeVignette />
      </CapabilityCard>

      <CapabilityCard
        title="404 tracking"
        description="Flag your not-found page once, then see broken URLs, hit counts, and which internal page linked to them."
      >
        <NotFoundVignette />
      </CapabilityCard>
    </div>
  );
}

function CapabilityCard(props: CapabilityCardProps) {
  return (
    <div className="group h-full min-w-0 overflow-visible">
      <AnimatedPanelReveal trigger="scroll" mask={false} className="h-full">
        <div className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
          <div className="bg-card relative flex h-full min-h-80 w-full flex-col overflow-hidden rounded-lg">
            <div className="space-y-1 p-5">
              <p className="text-foreground text-base font-medium">
                {props.title}
              </p>
              <p className="text-muted-foreground text-sm text-pretty">
                {props.description}
              </p>
            </div>
            <div className="flex min-h-44 flex-1 items-end justify-center pb-5">
              <div
                className={cn(
                  "pointer-events-none relative w-full px-5",
                  props.mockupClassName,
                )}
              >
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </AnimatedPanelReveal>
    </div>
  );
}

export default DashboardCapabilityGrid;
