import { cn } from "@/lib/utils";

export type TrackingMode = "default" | "extended";

type TrackingModeBadgeProps = {
  mode: TrackingMode;
  className?: string;
};

const trackingModeLabels: Record<TrackingMode, string> = {
  default: "Default",
  extended: "Extended",
};

export function TrackingModeBadge({
  mode,
  className,
}: TrackingModeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-grid h-5 shrink-0 place-items-center rounded-full px-2 shadow",
        mode === "default"
          ? "bg-muted/50 text-muted-foreground"
          : "bg-background text-foreground",
        className,
      )}
    >
      <span className="translate-y-px text-[10px] leading-none font-semibold tracking-wide uppercase">
        {trackingModeLabels[mode]}
      </span>
    </span>
  );
}

export default TrackingModeBadge;
