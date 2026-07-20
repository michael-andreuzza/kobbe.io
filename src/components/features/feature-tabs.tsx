import { ChevronDownIcon } from "lucide-react";

import { type TrackingMode } from "@/components/landing/tracking-mode-badge";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Feature = {
  title: string;
  description: string;
  href: string;
  trackingMode?: TrackingMode;
};

type FeatureGroup = {
  category: string;
  features: readonly Feature[];
};

type FeatureAccordionProps = {
  groups: readonly FeatureGroup[];
};

export function FeatureAccordion({ groups }: FeatureAccordionProps) {
  const defaultValue = groups[0]
    ? [toFeatureGroupValue(groups[0].category)]
    : [];

  return (
    <Accordion
      keepMounted
      defaultValue={defaultValue}
      className="border-border border-y"
    >
      {groups.map((group) => {
        const value = toFeatureGroupValue(group.category);

        return (
          <AccordionItem key={group.category} value={value}>
            <AccordionTrigger className="gap-4 py-5 [&[data-panel-open]_svg]:rotate-180">
              <span className="font-atipla text-lg font-medium">
                {group.category}
              </span>
              <ChevronDownIcon
                aria-hidden
                strokeWidth={2.25}
                className="text-muted-foreground size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </AccordionTrigger>
            <AccordionPanel>
              <ul className="grid items-start gap-x-10 gap-y-8 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3">
                {group.features.map((feature) => (
                  <li key={feature.title}>
                    <div>
                      <h4 className="text-foreground text-base font-medium">
                        <a
                          href={feature.href}
                          className="outline-none hover:underline focus-visible:underline"
                        >
                          {feature.title}
                        </a>
                      </h4>
                      <p className="text-muted-foreground mt-1 text-sm font-medium">
                        {feature.description}
                      </p>
                    </div>
                    {feature.trackingMode === "extended" ? (
                      <span className="text-brand mt-2 block text-xs font-medium">
                        Opt in
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function toFeatureGroupValue(category: string) {
  return category.toLowerCase().replaceAll(" ", "-");
}

export default FeatureAccordion;
