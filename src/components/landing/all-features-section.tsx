import { PricingFeatureMark } from "@/components/sections/pricing/pricing-feature-mark";
import { type TrackingMode } from "@/components/landing/tracking-mode-badge";
import { cn } from "@/lib/utils";

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

type AllFeaturesSectionProps = {
  groups: readonly FeatureGroup[];
  className?: string;
};

export function AllFeaturesSection({
  groups,
  className,
}: AllFeaturesSectionProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {groups.map((group) => (
          <section key={group.category} className="min-w-0">
            <h3 className="text-foreground text-sm font-semibold tracking-tight">
              {group.category}
            </h3>
            <ul
              className="text-foreground mt-3 grid list-none gap-y-4"
              role="list"
            >
              {group.features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-2">
                  <PricingFeatureMark />
                  <div className="min-w-0">
                    <p className="text-foreground text-sm font-medium tracking-tight">
                      <a
                        href={feature.href}
                        className="outline-none hover:underline focus-visible:underline"
                      >
                        {feature.title}
                      </a>
                      {feature.trackingMode === "extended" ? (
                        <span className="text-brand ml-1.5 text-xs font-medium">
                          Opt in
                        </span>
                      ) : null}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-snug font-medium text-pretty">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default AllFeaturesSection;
