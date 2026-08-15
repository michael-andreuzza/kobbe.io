import { DashboardTrafficChart } from "@/components/landing/dashboard/dashboard-traffic-chart";
import { ChartNoteTooltipEditorPreview } from "@/components/landing/dashboard/chart-note-tooltip-editor-preview";
import {
  heroChartAnnotations,
  heroChartPinnedDay,
  heroChartPinnedIndex,
  heroChartPoints,
  heroChartRangeLabel,
} from "@/components/landing/dashboard/dashboard-preview-data";

import authPanelBg from "@/images/assets/backgrounds/4.png";

export function FooterChartClippedPreview() {
  return (
    <div
      aria-hidden
      className="relative flex min-h-64 w-full items-center overflow-hidden lg:min-h-full"
    >
      <img
        src={authPanelBg.src}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur"
      />

      <div className="relative z-10 w-full overflow-hidden py-8 pl-2 sm:pl-4">
        <div className="pointer-events-none w-[175%] min-w-135 shrink-0">
          <DashboardTrafficChart
            points={heroChartPoints}
            metric="bounceRate"
            rangeLabel={heroChartRangeLabel}
            previewPinnedIndex={heroChartPinnedIndex}
            annotations={heroChartAnnotations}
            annotationFooter={
              <ChartNoteTooltipEditorPreview
                day={heroChartPinnedDay}
                annotations={heroChartAnnotations}
              />
            }
            showShare={false}
            showChartStyleTabs={false}
          >
            Bounce rate
          </DashboardTrafficChart>
        </div>
      </div>
    </div>
  );
}

export default FooterChartClippedPreview;
