import { useEffect, useRef, useState } from "react";

import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import DashboardPreview from "@/components/landing/dashboard/dashboard-preview";
import { cn } from "@/lib/utils";

const DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";

export function HeroDashboardPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [embedHeight, setEmbedHeight] = useState<number | null>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  // Desktop: the static preview paints instantly, then the real demo loads
  // behind the scenes and fades in over it. Mobile keeps the static preview.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }
    const timer = window.setTimeout(() => {
      setEmbedHeight(Math.max(wrapperRef.current?.offsetHeight ?? 640, 560));
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={embedHeight != null ? { height: embedHeight } : undefined}
    >
      <AnimatedPanelReveal trigger="mount" mask={false}>
        <DashboardPreview />
      </AnimatedPanelReveal>
      {embedHeight != null && (
        <>
          <iframe
            src={DEMO_URL}
            title="Kobbe live demo"
            onLoad={() => setEmbedLoaded(true)}
            className={cn(
              "border-border/60 bg-card absolute inset-0 z-20 h-full w-full rounded-lg border shadow-sm transition-opacity duration-500",
              embedLoaded ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
          {embedLoaded && (
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-kobbe-event="Hero - open demo new tab"
              className="text-muted-foreground hover:text-foreground absolute right-1 -bottom-7 z-20 text-xs font-medium transition-colors"
            >
              Open in a new tab ↗
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default HeroDashboardPreview;
