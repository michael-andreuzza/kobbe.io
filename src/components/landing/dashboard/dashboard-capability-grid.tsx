import type { ReactNode } from "react";
import type { ImageMetadata } from "astro";

import { cn } from "@/lib/utils";
import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import {
  ConversionsBreakdownList,
  EventsSummaryTable,
  NotFoundBreakdownList,
  ReferrerBreakdownList,
  SearchTermsBreakdownList,
} from "./dashboard-list-card";
import { ChartAnnotationsPreview } from "./chart-annotations-preview";
import { McpPreview } from "./mcp-preview";
import { RealtimePreview } from "./realtime-preview";
import { DashboardMetricTile } from "./dashboard-metric-strip";
import { capabilityMockupStackSurfaceClass } from "./dashboard-card-layout";
import { dashboardPreviewData } from "./dashboard-preview-data";

import bgTrafficOverview from "@/images/assets/backgrounds/1.png";
import bgConversions from "@/images/assets/backgrounds/2.png";
import bgChartAnnotations from "@/images/assets/backgrounds/3.png";
import bgSources from "@/images/assets/backgrounds/4.png";
import bgSearchKeywords from "@/images/assets/backgrounds/5.png";
import bgCustomEvents from "@/images/assets/backgrounds/6.png";
import bgRealtime from "@/images/assets/backgrounds/7.png";
import bgNotFound from "@/images/assets/backgrounds/8.png";
import bgMcp from "@/images/assets/backgrounds/9.png";

const data = dashboardPreviewData["14d"];

const capabilityPreviewRowLimit = 2;

type CapabilityCardProps = {
  title: string;
  description: string;
  background: ImageMetadata;
  children: ReactNode;
  mockupClassName?: string;
};

export function DashboardCapabilityGrid() {
  return (
    <div className="relative grid items-start gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
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
        description="Switch between visitors and revenue in one compact view to see when traffic turns into paid orders."
        mockupClassName="w-full max-w-md"
        background={bgTrafficOverview}
      >
        <TrafficOverviewPreview />
      </CapabilityCard>

      <CapabilityCard
        title="Conversions"
        description="Auto-track form submits, contact clicks, outbound links, and messaging taps, then filter the dashboard by goal."
        mockupClassName="w-full max-w-md"
        background={bgConversions}
      >
        <CapabilityListPreview>
          <ConversionsBreakdownList
            rows={data.conversions.rows.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Chart annotations"
        description="Pin notes to specific days on your traffic chart so launches, campaigns, and incidents stay tied to the numbers."
        mockupClassName="w-full max-w-md"
        background={bgChartAnnotations}
      >
        <ChartAnnotationsPreview />
      </CapabilityCard>

      <CapabilityCard
        title="Sources and AI traffic"
        description="Break down referrers, channels, hostnames, and AI tools so you can tell where meaningful traffic is coming from."
        mockupClassName="w-full max-w-md"
        background={bgSources}
      >
        <CapabilityListPreview>
          <ReferrerBreakdownList
            rows={data.sources.referrers.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Google search keywords"
        description="Connect Search Console to see which queries bring people to your site and tie search demand back to traffic."
        mockupClassName="w-full max-w-md"
        background={bgSearchKeywords}
      >
        <CapabilityListPreview>
          <SearchTermsBreakdownList
            rows={data.searchKeywords.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="Custom events"
        description="Measure the actions that matter, from sign-ups and CTA clicks to downloads and product interactions."
        mockupClassName="w-full max-w-md"
        background={bgCustomEvents}
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
        title="Realtime"
        description="See who is on your site right now, where they are, and what pages they are viewing as activity comes in."
        mockupClassName="w-full max-w-md"
        background={bgRealtime}
      >
        <RealtimePreview />
      </CapabilityCard>

      <CapabilityCard
        title="404 tracking"
        description="Flag your not-found page once, then see broken URLs, hit counts, and which internal page linked to them."
        mockupClassName="w-full max-w-md"
        background={bgNotFound}
      >
        <CapabilityListPreview>
          <NotFoundBreakdownList
            rows={data.notFoundPages.rows.slice(0, capabilityPreviewRowLimit)}
          />
        </CapabilityListPreview>
      </CapabilityCard>

      <CapabilityCard
        title="MCP for agents"
        description="Connect Cursor, Claude Code, or Codex to pull traffic, pages, and setup health without leaving your editor."
        mockupClassName="w-full max-w-md"
        background={bgMcp}
      >
        <McpPreview />
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
      hintTone: "good" as const,
      active: true,
    },
    {
      label: "Revenue",
      value: data.kpi.revenue.display,
      hint: data.kpi.revenue.rightHint,
      hintTone: "neutral" as const,
      active: false,
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
          hintTone={tile.hintTone}
          active={tile.active}
        />
      ))}
    </div>
  );
}

function TrafficKpiTile(props: {
  label: string;
  value: string;
  hint: string | null;
  hintTone?: "good" | "neutral";
  active?: boolean;
}) {
  const hintClassName =
    props.hintTone === "good" ? "text-success" : "text-muted-foreground";

  return (
    <DashboardMetricTile
      surface="muted"
      className={cn(
        "aspect-square min-h-0 min-w-0 flex-1 p-2.5 sm:p-3",
        props.active && "border-foreground/40",
      )}
    >
      <div className="flex h-full min-w-0 flex-col gap-1">
        <div className="flex w-full min-w-0 items-baseline justify-between gap-2">
          <span className="text-muted-foreground truncate text-xs leading-tight font-medium">
            {props.label}
          </span>
          {props.hint ? (
            <span
              className={cn(
                "relative inline-flex shrink-0 text-xs leading-tight font-medium tabular-nums",
                hintClassName,
              )}
            >
              {props.hint}
            </span>
          ) : null}
        </div>
        <div className="mt-auto min-w-0">
          <span className="text-foreground truncate text-base leading-tight font-medium tracking-tight tabular-nums">
            {props.value}
          </span>
        </div>
      </div>
    </DashboardMetricTile>
  );
}

function CapabilityCard(props: CapabilityCardProps) {
  return (
    <div className="group flex h-full min-w-0 flex-col gap-4 overflow-visible">
      <AnimatedPanelReveal trigger="scroll" mask={false}>
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
          <div className="border-border/40 relative flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded border">
            <img
              src={props.background.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-110 object-cover blur"
            />
            <div
              className={cn(
                "kobbe-capability-mockup pointer-events-none relative z-10 mx-auto w-full px-5 sm:px-6",
                props.mockupClassName,
              )}
            >
              {props.children}
            </div>
          </div>
        </div>
      </AnimatedPanelReveal>
      <div className="space-y-1">
        <p className="text-foreground text-base font-medium">{props.title}</p>
        <p className="text-muted-foreground text-sm text-pretty">
          {props.description}
        </p>
      </div>
    </div>
  );
}

function CapabilityListPreview(props: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "kobbe-capability-stack w-full",
        capabilityMockupStackSurfaceClass,
      )}
    >
      {props.children}
    </div>
  );
}

export default DashboardCapabilityGrid;
