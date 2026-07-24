import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";

import {
  pricingComparisonSections,
  type PricingComparisonCell,
} from "@/components/sections/pricing/pricing-comparison-data";
import { cn } from "@/lib/utils";

function ComparisonCell({ value }: { value: PricingComparisonCell }) {
  if (typeof value === "string") {
    return <span className="text-foreground text-sm font-medium">{value}</span>;
  }

  if (value) {
    return (
      <CheckIcon
        aria-hidden
        strokeWidth={3}
        className="text-brand mx-auto size-5"
      />
    );
  }

  return (
    <MinusIcon
      aria-hidden
      strokeWidth={3}
      className="text-foreground mx-auto size-5"
    />
  );
}

type PricingComparisonTableProps = {
  className?: string;
};

export function PricingComparisonTable({
  className,
}: PricingComparisonTableProps) {
  return (
    <div
      className={cn(
        "relative z-0 mt-12 hidden w-full scrollbar-none overflow-x-auto lg:block",
        className,
      )}
    >
      <div className="min-w-[640px] overflow-hidden">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <caption className="sr-only">
            Feature list included with every Kobbe event volume
          </caption>
          <thead className="text-center text-base font-medium tracking-wide">
            <tr>
              <th
                scope="col"
                className="bg-card text-foreground border-border rounded-l-lg border-t border-b border-l px-4 py-4 text-left font-medium tracking-tight"
              >
                Features
              </th>
              <th
                scope="col"
                className="bg-card text-foreground border-border rounded-r-lg border-t border-r border-b px-4 py-4 font-medium tracking-tight"
              >
                Included
              </th>
            </tr>
          </thead>
          <tbody>
            {pricingComparisonSections.map((section) => (
              <Fragment key={section.id}>
                <tr>
                  <td
                    colSpan={2}
                    className="bg-muted text-foreground px-4 pt-12 pb-4 font-normal"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground text-sm font-medium uppercase">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-foreground mt-1 max-w-xl text-sm text-balance">
                      {section.description}
                    </p>
                  </td>
                </tr>
                {section.features.map((feature, featureIndex) => (
                  <tr key={feature.id}>
                    <th
                      scope="row"
                      className={cn(
                        "text-muted-foreground px-4 py-8 text-left align-top font-normal",
                        featureIndex % 2 === 0 ? "bg-card" : "bg-muted/50",
                      )}
                    >
                      <h4 className="text-muted-foreground text-xs font-medium uppercase">
                        {feature.title}
                      </h4>
                      <p className="text-foreground mt-1 max-w-xl text-sm text-balance">
                        {feature.description}
                      </p>
                    </th>
                    <td
                      className={cn(
                        "px-4 py-8 text-center align-top",
                        featureIndex % 2 === 0 ? "bg-card" : "bg-muted/50",
                      )}
                    >
                      <div className="flex justify-center">
                        <ComparisonCell value={feature.included} />
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PricingComparisonTable;
