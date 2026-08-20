import { cn } from "@/lib/utils";

const stems = [34, 52, 40, 64, 46, 58, 72, 50, 96, 62, 78, 56];
const highlighted = 8;

/**
 * Simplified brand vignette for the footer CTA: a lollipop traffic chart
 * with a pinned annotation tooltip, in the product's monochrome + orange
 * language instead of a full dashboard screenshot.
 */
export function FooterCtaVisual() {
  return (
    <div
      aria-hidden
      className="bg-muted relative flex min-h-64 w-full items-end overflow-hidden lg:min-h-full"
    >
      <div className="pointer-events-none w-full px-8 pt-16 pb-10 sm:px-12 lg:px-10">
        <div className="relative flex h-40 items-end justify-between">
          {stems.map((height, index) => {
            const active = index === highlighted;
            return (
              <div
                key={index}
                className="relative flex h-full w-4 items-end justify-center"
              >
                {active ? (
                  <>
                    <div
                      className="border-foreground/25 absolute inset-y-0 left-1/2 border-l border-dashed"
                      aria-hidden="true"
                    />
                    <div className="bg-foreground text-background absolute -top-9 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shadow-md">
                      <span
                        className="bg-brand size-1.5 rounded-[2px]"
                        aria-hidden="true"
                      />
                      1,204 visitors
                    </div>
                  </>
                ) : null}
                <div
                  className="relative flex flex-col items-center"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className={cn(
                      "size-3 shrink-0 rounded-full",
                      active ? "bg-brand" : "bg-foreground/75",
                    )}
                  />
                  <div
                    className={cn(
                      "w-px flex-1",
                      active ? "bg-brand" : "bg-foreground/40",
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FooterCtaVisual;
