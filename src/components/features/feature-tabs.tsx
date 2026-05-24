import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Feature = {
  title: string;
  description: string;
  href: string;
};

type FeatureGroup = {
  category: string;
  features: readonly Feature[];
};

type FeatureTabsProps = {
  groups: readonly FeatureGroup[];
};

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
          <FeatureGroupPanel group={activeGroup} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

function FeatureGroupPanel({ group }: { group: FeatureGroup }) {
  const headingId = `features-${toFeatureGroupValue(group.category)}`;

  return (
    <section aria-labelledby={headingId}>
      <h3 id={headingId} className="sr-only">
        {group.category}
      </h3>
      <div className="flex flex-wrap justify-center gap-12 lg:text-center">
        {group.features.map((feature) => (
          <Card
            key={feature.href}
            className="group w-full rounded-lg bg-transparent p-0 transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-foreground text-base font-medium">
                <a
                  href={feature.href}
                  className="outline-none group-hover:underline focus-visible:underline"
                >
                  {feature.title}
                </a>
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function toFeatureGroupValue(category: string) {
  return category.toLowerCase().replaceAll(" ", "-");
}

export default FeatureTabs;
