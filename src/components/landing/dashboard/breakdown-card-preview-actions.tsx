import { BreakdownCardPreviewMenu } from "./breakdown-card-preview-menu";
import { CardExpandButton } from "./dashboard-list-card";

/** Decorative expand + menu controls for marketing dashboard previews. */
export function BreakdownCardPreviewActions() {
  return (
    <>
      <CardExpandButton decorative ariaLabel="Open full breakdown" />
      <BreakdownCardPreviewMenu ariaLabel="Breakdown actions" />
    </>
  );
}
