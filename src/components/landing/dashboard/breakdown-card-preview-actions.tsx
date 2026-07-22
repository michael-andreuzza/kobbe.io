import { ChartShareButton } from "./chart-share-button";
import { CardExpandButton } from "./dashboard-list-card";

/** Decorative expand + share controls for marketing dashboard previews. */
export function BreakdownCardPreviewActions() {
  return (
    <>
      <CardExpandButton decorative ariaLabel="Open full breakdown" />
      <ChartShareButton ariaLabel="Share breakdown" />
    </>
  );
}
