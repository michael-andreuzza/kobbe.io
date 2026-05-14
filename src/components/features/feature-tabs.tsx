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
    >
      <TabsList aria-label="Feature categories">
        {groups.map((group) => {
          const value = toFeatureGroupValue(group.category);

          return (
            <TabsTrigger
              key={group.category}
              value={value}
              onClick={() => setActiveValue(value)}
            >
              {group.category}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {activeGroup ? (
        <TabsContent value={activeValue}>
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
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="text-balance">
          <h2
            id={headingId}
            className="text-foreground text-base font-semibold tracking-tight uppercase"
          >
            {group.category}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            {group.description}
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {group.features.map((feature) => (
            <Card
              key={feature.href}
              className="group rounded-lg bg-transparent p-0"
            >
              <CardHeader>
                <CardTitle className="text-foreground text-sm font-semibold uppercase">
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
