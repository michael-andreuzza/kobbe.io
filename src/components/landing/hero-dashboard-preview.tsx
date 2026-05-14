import { AnimatedPanelReveal } from "@/components/landing/animated-panel-reveal";
import DashboardPreview from "@/components/landing/dashboard/dashboard-preview";

export function HeroDashboardPreview() {
  return (
    <AnimatedPanelReveal trigger="mount">
      <DashboardPreview />
    </AnimatedPanelReveal>
  );
}

export default HeroDashboardPreview;
