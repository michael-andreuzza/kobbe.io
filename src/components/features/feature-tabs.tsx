import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { TrackingModeBadge } from "@/components/landing/tracking-mode-badge";
import type { TrackingMode } from "@/components/landing/tracking-mode-badge";

type Feature = {
  title: string;
  description: string;
  href: string;
  mode?: TrackingMode;
};

type FeatureGroup = {
  category: string;
  features: readonly Feature[];
};

type FeatureTabsProps = {
  groups: readonly FeatureGroup[];
};

const VISIBLE_FEATURE_LIMIT = 6;

export function FeatureTabs({ groups }: FeatureTabsProps) {
  const defaultValue = groups[0] ? toFeatureGroupValue(groups[0].category) : "";
  const [activeValue, setActiveValue] = useState(defaultValue);
  const activeGroup =
    groups.find(
      (group) => toFeatureGroupValue(group.category) === activeValue,
    ) ?? groups[0];

  return (
    <Tabs
      value={activeValue}
      onValueChange={(nextValue) => setActiveValue(nextValue)}
      className="gap-8"
    >
      <TabsList
        aria-label="Feature categories"
        className="w-full gap-x-4 gap-y-2 sm:gap-x-6 lg:mx-auto lg:w-fit"
      >
        {groups.map((group) => {
          const value = toFeatureGroupValue(group.category);

          return (
            <TabsTrigger
              key={group.category}
              value={value}
              onClick={() => setActiveValue(value)}
              className="px-0 pb-3"
            >
              {group.category}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {activeGroup ? (
        <TabsContent value={activeValue} className="mt-0">
          <FeatureGroupPanel key={activeValue} group={activeGroup} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

function FeatureGroupPanel({ group }: { group: FeatureGroup }) {
  const headingId = `features-${toFeatureGroupValue(group.category)}`;
  const [expanded, setExpanded] = useState(false);
  const needsCollapse = group.features.length > VISIBLE_FEATURE_LIMIT;
  const hiddenCount = group.features.length - VISIBLE_FEATURE_LIMIT;

  return (
    <section aria-labelledby={headingId}>
      <h3 id={headingId} className="sr-only">
        {group.category}
      </h3>
      <div className="relative">
        <div
          className={cn(
            needsCollapse &&
              !expanded &&
              "max-h-160 overflow-hidden mask-[linear-gradient(to_bottom,black_calc(100%-6rem),transparent)] md:max-h-136 lg:max-h-104",
          )}
        >
          <FeatureGrid features={group.features} />
        </div>

        {needsCollapse && !expanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-28 mask-[linear-gradient(to_top,black,transparent)] backdrop-blur-[3px]"
            />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className={cn(
                buttonVariants({ variant: "outline", size: "xs" }),
                "pointer-events-auto relative z-10 shadow",
              )}
            >
              Show {hiddenCount} more
            </button>
          </div>
        ) : null}

        {needsCollapse && expanded ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className={buttonVariants({ variant: "outline", size: "xs" })}
            >
              Show less
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeatureGrid({ features }: { features: readonly Feature[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-12 lg:text-center">
      {features.map((feature) => (
        <Card
          key={feature.href}
          className="feature-card w-full rounded-lg bg-transparent p-0 transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
        >
          <CardHeader className="p-0">
            <CardTitle className="text-foreground text-base font-medium">
              <a
                href={feature.href}
                className="outline-none hover:underline focus-visible:underline"
              >
                {feature.title}
              </a>
            </CardTitle>
            <CardDescription>{feature.description}</CardDescription>
            {feature.mode === "extended" ? (
              <div className="mt-3 flex justify-center">
                <TrackingModeBadge mode="extended" />
              </div>
            ) : null}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function toFeatureGroupValue(category: string) {
  return category.toLowerCase().replaceAll(" ", "-");
}

export default FeatureTabs;
