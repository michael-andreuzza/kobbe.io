import { dashboardPreviewData } from "./dashboard-preview-data";
import { ChartAnnotationPinnedTooltipPreview } from "./chart-annotation-tooltip-preview";
import type { TrafficChartAnnotation } from "./traffic-line-chart";

const data = dashboardPreviewData["14d"];
const previewPoints = data.points.slice(-7);
const previewPinnedIndex = 4;
const pinnedPoint = previewPoints[previewPinnedIndex]!;
const previewPinnedDay = new Date(pinnedPoint.t).toISOString().slice(0, 10);

const previewAnnotations: TrafficChartAnnotation[] = [
  {
    id: "preview-note-1",
    day: previewPinnedDay,
    label: "Product launch campaign went live",
    color: "1",
  },
  {
    id: "preview-note-2",
    day: previewPinnedDay,
    label: "Newsletter sent to 12k subscribers",
    color: "4",
  },
];

const pinnedTitle = new Date(pinnedPoint.t).toLocaleDateString("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function ChartAnnotationsPreview() {
  return (
    <div className="w-full min-w-0">
      <ChartAnnotationPinnedTooltipPreview
        title={pinnedTitle}
        metric="visitors"
        metricValue={pinnedPoint.visitors.toLocaleString()}
        day={previewPinnedDay}
        annotations={previewAnnotations}
      />
    </div>
  );
}
