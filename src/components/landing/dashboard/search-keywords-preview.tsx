import { dashboardPreviewData } from "./dashboard-preview-data";

const data = dashboardPreviewData["14d"];
const rows = data.searchKeywords.slice(0, 2);

export function SearchKeywordsPreview() {
  return (
    <div className="border-border bg-card w-full min-w-0 rounded-xl border p-3 shadow-sm">
      <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
        Search Console
      </p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <li
            key={row.query}
            className="bg-muted/40 flex items-center justify-between gap-3 rounded-lg px-2.5 py-2"
          >
            <span className="text-foreground min-w-0 flex-1 truncate text-xs">
              {row.query}
            </span>
            <span className="text-muted-foreground shrink-0 text-[11px] tabular-nums">
              {row.clicks.toLocaleString()} clicks
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
