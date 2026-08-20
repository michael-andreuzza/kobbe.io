import { useRef, useState } from "react";

import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import DashboardPreview from "@/components/landing/dashboard/dashboard-preview";

const DEMO_URL = "https://app.kobbe.io/demo/kobbe-studio";

export function HeroDashboardPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [embedHeight, setEmbedHeight] = useState<number | null>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  // Facade pattern: the static preview stands in for the demo until a desktop
  // visitor asks for it, so the hero pays no iframe cost on page load.
  const handleOpenDemo = () => {
    setEmbedHeight(Math.max(wrapperRef.current?.offsetHeight ?? 640, 480));
  };

  if (embedHeight != null) {
    return (
      <div className="relative" style={{ height: embedHeight }}>
        {!embedLoaded && (
          <div className="border-border/60 bg-muted absolute inset-0 flex animate-pulse items-center justify-center rounded-lg border">
            <span className="text-muted-foreground text-xs font-medium">
              Loading the live demo…
            </span>
          </div>
        )}
        <iframe
          src={DEMO_URL}
          title="Kobbe live demo"
          className="border-border/60 bg-card relative h-full w-full rounded-lg border shadow-sm"
          onLoad={() => setEmbedLoaded(true)}
        />
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-kobbe-event="Hero - open demo new tab"
          className="text-muted-foreground hover:text-foreground absolute -bottom-7 right-1 text-xs font-medium transition-colors"
        >
          Open in a new tab ↗
        </a>
      </div>
    );
  }

  return (
    <div ref={wrapperRef}>
      <AnimatedPanelReveal trigger="mount" mask={false}>
        <DashboardPreview onOpenDemo={handleOpenDemo} />
      </AnimatedPanelReveal>
    </div>
  );
}

export default HeroDashboardPreview;
