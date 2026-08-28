import { Suspense, lazy, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * SSR-safe shell for the realtime globe mockup. The Three.js scene is a
 * heavy client-only chunk, so it is lazy-loaded after mount (hydrate this
 * island with `client:visible`); until then the box just holds its height.
 */
const RealtimeGlobeScene = lazy(() => import("./realtime-globe-scene"));

export function RealtimeGlobe({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    // Bleeds to the panel edges like the charts (negative margins matching
    // the section padding; the section's overflow-hidden crops the sphere).
    <div
      className={cn(
        "relative -mx-4 -mb-4 h-72 sm:-mx-6 sm:-mb-6 sm:h-96",
        className,
      )}
    >
      {/* Same live pill as the app's realtime card, kept inside the panel
          padding despite the bleed. */}
      <div className="absolute top-0 right-4 z-10 sm:right-6">
        <span className="bg-muted text-foreground inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
            <span className="bg-brand relative inline-flex size-2 rounded-full" />
          </span>
          12 online now
        </span>
      </div>
      {/* Oversized box hanging below the panel edge: the sphere's rounded
          top starts mid-panel and the bottom and sides crop away. */}
      <div className="absolute inset-x-0 top-[28%] -bottom-[115%]">
        {mounted ? (
          <Suspense fallback={null}>
            <RealtimeGlobeScene />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}
