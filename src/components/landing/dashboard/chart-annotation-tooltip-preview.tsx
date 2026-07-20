import type { TrafficChartAnnotation, TrafficChartMetric } from "./traffic-line-chart";
import { ChartNoteTooltipEditorPreview } from "./chart-note-tooltip-editor-preview";

type ChartAnnotationPinnedTooltipPreviewProps = {
  title: string;
  metric: TrafficChartMetric;
  metricValue: string;
  day: string;
  annotations: TrafficChartAnnotation[];
};

/** Pinned annotation popover for marketing previews; matches the app tooltip. */
export function ChartAnnotationPinnedTooltipPreview(
  props: ChartAnnotationPinnedTooltipPreviewProps,
) {
  const metricLabel =
    props.metric === "visitors"
      ? "Visitors"
      : props.metric === "visits"
        ? "Visits"
        : props.metric === "views"
          ? "Views"
          : "Visitors";

  return (
    <div className="border-border/70 bg-card text-foreground grid w-full min-w-0 gap-1.5 rounded-lg border px-2.5 py-1.5 pb-2 text-xs">
      <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
        Pinned
      </div>
      <div className="text-foreground font-medium">{props.title}</div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
          <span className="text-muted-foreground">{metricLabel}</span>
          <span className="text-foreground font-mono font-medium tabular-nums">
            {props.metricValue}
          </span>
        </div>
      </div>
      <ChartNoteTooltipEditorPreview
        day={props.day}
        annotations={props.annotations}
        tone="surface"
      />
    </div>
  );
}
