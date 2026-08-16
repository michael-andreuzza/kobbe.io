import { BrandLogo } from "@/components/foundations/brand-logo";
import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

import datafastLogo from "@/images/brands/datafast.svg";
import fathomLogo from "@/images/brands/fathom.svg";
import plausibleLogo from "@/images/brands/plausible.svg";
import umamiLogo from "@/images/brands/umami.svg";

const providers = [
  { id: "plausible", label: "Plausible", logo: plausibleLogo.src, active: true },
  { id: "fathom", label: "Fathom", logo: fathomLogo.src, active: false },
  { id: "umami", label: "Umami", logo: umamiLogo.src, active: false },
  { id: "datafast", label: "DataFast", logo: datafastLogo.src, active: false },
] as const;

export function ImportInsightsPreview() {
  return (
    <div
      className={cn(
        capabilityMockupSurfaceClass,
        "w-full p-5 sm:p-7",
      )}
      aria-hidden
    >
      <div className="space-y-1.5">
        <p className="text-foreground text-base font-medium">Import history</p>
        <p className="text-muted-foreground text-sm leading-snug">
          Bring historical traffic from another analytics tool into Kobbe.
        </p>
      </div>

      <div className="relative mt-5">
        <div
          className="flex max-w-full gap-1.5 overflow-x-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-hidden
        >
          {providers.map((provider) => (
            <span
              key={provider.id}
              className={cn(
                "relative z-10 inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3.5 text-sm font-medium",
                provider.active
                  ? "bg-foreground/8 text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <BrandLogo
                src={provider.logo}
                alt=""
                className="size-4 rounded object-contain"
                width={16}
                height={16}
              />
              {provider.label}
            </span>
          ))}
        </div>
      </div>

      <div className="border-border mt-5 flex min-h-44 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-6 py-12 text-center sm:min-h-52 sm:py-14">
        <p className="text-foreground text-sm font-medium">
          Plausible full export
        </p>
        <p className="text-muted-foreground text-sm">
          Drop a ZIP here or click to browse
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-foreground text-sm font-medium">Fill gaps only</p>
          <p className="text-muted-foreground text-xs leading-snug sm:text-sm">
            Import history before your first pageview.
          </p>
        </div>
        <span className="bg-primary text-primary-foreground inline-flex h-9 shrink-0 items-center rounded-md px-4 text-sm font-medium">
          Start import
        </span>
      </div>
    </div>
  );
}

export default ImportInsightsPreview;
