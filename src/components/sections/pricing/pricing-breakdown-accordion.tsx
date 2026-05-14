import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const pricingTiers = [
  { events: "100k", monthly: "$15", yearly: "$165" },
  { events: "200k", monthly: "$25", yearly: "$275" },
  { events: "500k", monthly: "$45", yearly: "$495" },
  { events: "1M", monthly: "$60", yearly: "$660" },
  { events: "2M", monthly: "$100", yearly: "$1.1k" },
  { events: "5M", monthly: "$140", yearly: "$1.5k" },
  { events: "10M", monthly: "$200", yearly: "$2.2k" },
  { events: "15M", monthly: "$290", yearly: "$3.2k" },
  { events: "20M", monthly: "$380", yearly: "$4.2k" },
  { events: "25M", monthly: "$470", yearly: "$5.2k" },
  { events: "25M+", monthly: "Custom", yearly: "Custom" },
] as const;

export function PricingBreakdownAccordion({
  className,
}: {
  className?: string;
}) {
  return (
    <Accordion className={className} defaultValue={[]}>
      <AccordionItem
        value="pricing-breakdown"
        className="border-border border-t"
      >
        <AccordionTrigger className="group px-5 sm:px-8">
          <span className="text-xs font-semibold uppercase sm:text-sm">
            Pricing breakdown
          </span>
          <HugeiconsIcon
            icon={Add01Icon}
            size={28}
            strokeWidth={1}
            className="text-foreground shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open:rotate-45"
            aria-hidden="true"
          />
        </AccordionTrigger>
        <AccordionPanel>
          <div className="border-border border-t px-5 pb-6 sm:px-8 sm:pb-8">
            <table className="w-full table-fixed text-xs tabular-nums sm:text-sm">
              <thead className="border-border border-b">
                <tr className="text-muted-foreground text-left text-[0.65rem] font-semibold tracking-wide uppercase sm:text-xs">
                  <th className="w-1/3 py-2 pr-2 font-semibold sm:py-2.5 sm:pr-4">
                    Events
                  </th>
                  <th className="w-1/3 py-2 pr-2 text-right font-semibold sm:py-2.5 sm:pr-4">
                    Mo
                  </th>
                  <th className="w-1/3 py-2 text-right font-semibold sm:py-2.5">
                    Yr
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {pricingTiers.map((tier) => (
                  <tr
                    key={tier.events}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="text-foreground py-2 pr-2 font-medium whitespace-nowrap sm:py-2.5 sm:pr-4">
                      {tier.events}
                    </td>
                    <td className="text-muted-foreground py-2 pr-2 text-right font-medium whitespace-nowrap sm:py-2.5 sm:pr-4">
                      {tier.monthly}
                    </td>
                    <td
                      className={cn(
                        "text-muted-foreground py-2 text-right font-medium whitespace-nowrap sm:py-2.5",
                        tier.events === "25M+" && "uppercase",
                      )}
                    >
                      {tier.yearly}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
