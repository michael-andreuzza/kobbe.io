import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

/** Dotted-texture land patches on the visible top of the sphere (impressionistic continents). */
const LAND_PATCHES = [
  {
    left: "8%",
    top: "6%",
    width: "30%",
    height: "34%",
    radius: "58% 42% 55% 45% / 52% 48% 58% 42%",
  },
  {
    left: "44%",
    top: "2%",
    width: "38%",
    height: "30%",
    radius: "45% 55% 48% 52% / 55% 45% 52% 48%",
  },
  {
    left: "58%",
    top: "34%",
    width: "24%",
    height: "30%",
    radius: "52% 48% 60% 40% / 48% 52% 45% 55%",
  },
  {
    left: "22%",
    top: "44%",
    width: "18%",
    height: "24%",
    radius: "60% 40% 50% 50% / 45% 55% 60% 40%",
  },
] as const;

/** Live-visitor pins over the land patches (percentages of the card). */
const VISITOR_DOTS = [
  { left: "31%", top: "44%", larger: false },
  { left: "51%", top: "34%", larger: true },
  { left: "62%", top: "52%", larger: false },
  { left: "42%", top: "64%", larger: false },
] as const;

/** Sparse starfield around the globe. */
const STARS = [
  { left: "7%", top: "18%" },
  { left: "14%", top: "62%" },
  { left: "21%", top: "10%" },
  { left: "36%", top: "16%" },
  { left: "58%", top: "8%" },
  { left: "72%", top: "20%" },
  { left: "84%", top: "12%" },
  { left: "91%", top: "48%" },
  { left: "88%", top: "74%" },
  { left: "5%", top: "84%" },
] as const;

/**
 * Static mockup of the Realtime globe (the product renders a Three.js globe;
 * the landing preview fakes the same look with CSS only — no WebGL bundle).
 */
export function RealtimePreview() {
  return (
    <div
      className={cn(
        capabilityMockupSurfaceClass,
        "bg-background relative aspect-5/2 max-h-36 w-full overflow-hidden",
      )}
    >
      <div aria-hidden className="absolute inset-0">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="bg-muted-foreground/40 absolute size-px rounded-full"
            style={{ left: star.left, top: star.top }}
          />
        ))}

        {/* Sphere rising from the bottom of the card, like the product's hero view. */}
        <div
          className={cn(
            "bg-card absolute left-1/2 top-[16%] aspect-square w-[78%] -translate-x-1/2 overflow-hidden rounded-full",
            "shadow-[inset_0_-18px_36px_-18px_rgb(0_0_0/0.14),0_10px_30px_-12px_rgb(0_0_0/0.25)]",
          )}
        >
          {LAND_PATCHES.map((patch, index) => (
            <span
              key={index}
              className="absolute bg-[radial-gradient(var(--color-muted-foreground)_1px,transparent_1.1px)] bg-size-[6px_6px] opacity-35"
              style={{
                left: patch.left,
                top: patch.top,
                width: patch.width,
                height: patch.height,
                borderRadius: patch.radius,
              }}
            />
          ))}
        </div>

        {VISITOR_DOTS.map((dot, index) => (
          <span
            key={index}
            className={cn(
              "bg-brand ring-card absolute rounded-full ring-2",
              dot.larger ? "size-2.5" : "size-2",
            )}
            style={{ left: dot.left, top: dot.top }}
          />
        ))}
      </div>

      <div className="border-border bg-card/95 pointer-events-none absolute top-2 right-2 flex flex-col overflow-hidden rounded-md border">
        <span className="border-border text-muted-foreground flex size-6 items-center justify-center border-b text-xs leading-none">
          +
        </span>
        <span className="text-muted-foreground flex size-6 items-center justify-center text-xs leading-none">
          −
        </span>
      </div>
    </div>
  );
}
