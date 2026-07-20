import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";

import {
  pricingComparisonSections,
  pricingComparisonTierLabels,
  type PricingComparisonCell,
  type PricingComparisonTierId,
} from "@/components/sections/pricing/pricing-comparison-data";
import { cn } from "@/lib/utils";

const tierColumnOrder: PricingComparisonTierId[] = [
  "lite",
  "starter",
  "growth",
];

const featureValueOffsetClass = "mt-5";

const tierColumnCount = tierColumnOrder.length + 1;

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
        "bg-card relative z-0 mt-12 hidden w-full scrollbar-none overflow-x-auto lg:block",
        className,
      )}
    >
      <div className="min-w-[768px] overflow-hidden">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Feature comparison across Lite, Starter, and Growth plans
          </caption>
          <thead className="text-center text-2xl font-medium tracking-wide">
            <tr>
              <th
                scope="col"
                className="text-foreground px-4 py-4 text-left font-medium tracking-tight"
              >
                Features
              </th>
              {tierColumnOrder.map((tierId) => (
                <th
                  key={tierId}
                  scope="col"
                  className="text-foreground px-4 py-4 font-medium tracking-tight"
                >
                  {pricingComparisonTierLabels[tierId]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricingComparisonSections.map((section) => (
              <Fragment key={section.id}>
                <tr>
                  <td
                    colSpan={tierColumnCount}
                    className="bg-muted text-foreground px-4 pt-12 pb-4 font-normal"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-foreground size-2.5"
                        aria-hidden="true"
                      ></div>
                      <h3 className="text-foreground text-sm font-medium uppercase">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-foreground mt-1 max-w-xs text-sm text-balance">
                      {section.description}
                    </p>
                  </td>
                </tr>
                {section.features.map((feature) => (
                  <tr key={feature.id} className="even:bg-muted/50">
                    <th
                      scope="row"
                      className="text-muted-foreground px-4 py-8 text-left align-top font-normal"
                    >
                      <h4 className="text-muted-foreground text-xs font-medium uppercase">
                        {feature.title}
                      </h4>
                      <p className="text-foreground mt-1 max-w-xs text-sm text-balance">
                        {feature.description}
                      </p>
                    </th>
                    {tierColumnOrder.map((tierId) => (
                      <td
                        key={`${feature.id}-${tierId}`}
                        className="px-4 py-8 text-center align-top"
                      >
                        <div
                          className={cn(
                            featureValueOffsetClass,
                            "flex justify-center",
                          )}
                        >
                          <ComparisonCell value={feature[tierId]} />
                        </div>
                      </td>
                    ))}
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
