import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  description: string;
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
      className="gap-8 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start"
    >
      <TabsList
        aria-label="Feature categories"
        className="lg:flex-col lg:items-stretch lg:gap-0 lg:border-b-0 lg:pr-6 lg:[&_[data-slot=tabs-trigger]>span]:hidden"
      >
        {groups.map((group) => {
          const value = toFeatureGroupValue(group.category);

          return (
            <TabsTrigger
              key={group.category}
              value={value}
              onClick={() => setActiveValue(value)}
              className="lg:w-full lg:justify-start  lg:pr-4 lg:text-left"
            >
              {group.category}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {activeGroup ? (
        <TabsContent value={activeValue} className="mt-8 lg:mt-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <FeatureGroupPanel group={activeGroup} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

function FeatureGroupPanel({ group }: { group: FeatureGroup }) {
  const headingId = `features-${toFeatureGroupValue(group.category)}`;

  return (
    <section aria-labelledby={headingId}>
      <div>
        <div className="max-w-lg text-balance">
          <h2 id={headingId} className="text-foreground text-xl font-medium">
            {group.category}
            <span className="text-muted-foreground font-normal">
              {group.description}
            </span>
          </h2>
        </div>

        <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-3">
          {group.features.map((feature) => (
            <Card
              key={feature.href}
              className="group rounded-lg bg-transparent p-0"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-foreground text-lg font-medium">
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
      </div>
    </section>
  );
}

function toFeatureGroupValue(category: string) {
  return category.toLowerCase().replaceAll(" ", "-");
}

export default FeatureTabs;
