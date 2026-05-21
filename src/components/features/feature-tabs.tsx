import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

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
  const panelRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedTabRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const [activeValue, setActiveValue] = useState(defaultValue);
  const activeGroup =
    groups.find(
      (group) => toFeatureGroupValue(group.category) === activeValue,
    ) ?? groups[0];

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !hasAnimatedTabRef.current) {
      hasAnimatedTabRef.current = true;
      return;
    }
    const element: HTMLDivElement = panel;

    if (shouldReduceMotion) {
      element.style.opacity = "1";
      element.style.transform = "none";
      for (const item of element.querySelectorAll<HTMLElement>(
        "[data-feature-tab-stagger]",
      )) {
        item.style.opacity = "1";
        item.style.transform = "none";
      }
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | undefined;

    async function animateTabPanel() {
      const { gsap } = await import("gsap");
      if (!mounted) return;

      const context = gsap.context(() => {
        const items = Array.from(
          element.querySelectorAll<HTMLElement>("[data-feature-tab-stagger]"),
        );

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
        );

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              ease: "power3.out",
              stagger: { each: 0.035, from: "start" },
            },
          );
        }
      }, element);

      cleanup = () => context.revert();
    }

    void animateTabPanel();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [activeValue, shouldReduceMotion]);

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
              className="lg:w-full lg:justify-start lg:pr-4 lg:text-left"
              data-kobbe-stagger
            >
              {group.category}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {activeGroup ? (
        <TabsContent value={activeValue} className="mt-8 lg:mt-0">
          <div ref={panelRef} key={activeValue}>
            <FeatureGroupPanel group={activeGroup} />
          </div>
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
        <div
          className="max-w-lg text-balance"
          data-feature-tab-stagger
          data-kobbe-stagger
        >
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
              className="group rounded-lg bg-transparent p-0 transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              data-feature-tab-stagger
              data-kobbe-stagger
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
