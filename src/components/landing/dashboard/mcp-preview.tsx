import { dashboardPreviewData } from "./dashboard-preview-data";

const data = dashboardPreviewData["14d"];

export function McpPreview() {
  return (
    <div className="border-border/70 bg-card w-full min-w-0 space-y-1.5 rounded-xl border p-2.5">
      <div className="bg-muted ml-auto max-w-[90%] rounded-md px-2 py-1.5 text-[11px] leading-snug">
        What changed on my site this week?
      </div>

      <div className="bg-surface rounded-md px-2 py-1.5 text-[11px] leading-snug">
        <p className="text-muted-foreground truncate">
          Kobbe · get_overview, get_top_pages
        </p>
        <p className="text-foreground mt-1 line-clamp-2">
          <strong className="font-semibold">
            {data.kpi.visitors.display} visitors
          </strong>{" "}
          over 14 days. Improve <span className="font-mono">/pricing</span>{" "}
          first.
        </p>
      </div>
    </div>
  );
}
