import { AuthPanelSiteCardWidget } from "@/components/sections/pricing/auth-panel-site-card-widget";
import { cn } from "@/lib/utils";

type SimplifiedPricingPreviewProps = {
  className?: string;
};

export function SimplifiedPricingPreview({
  className,
}: SimplifiedPricingPreviewProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-72 items-center justify-center overflow-hidden lg:min-h-full",
        className,
      )}
      aria-hidden
    >
      <img
        src="/auth-panel-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur"
      />
      <div className="relative z-10 flex w-full justify-center px-6 py-10">
        <AuthPanelSiteCardWidget />
      </div>
    </div>
  );
}

export default SimplifiedPricingPreview;
