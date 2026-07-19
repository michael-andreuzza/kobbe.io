/**
 * Class fragments for analytics dashboard cards: use with `Card variant="bordered"` and
 * {@link dashboardCardRootClass} so padding and gaps match the app dashboard.
 */
export const dashboardCardRootClass = "mt-0 gap-0 px-0 py-0";

/** Vertical rhythm between stacked dashboard cards (overview, performance, etc.). */
export const dashboardCardStackClass = "space-y-4";

/** Replaces former shell header padding (aligned with row inset). */
export const dashboardCardHeaderClass =
  "!px-3 pt-4 pb-3 sm:!px-4 sm:pt-5 sm:pb-4";

/** Horizontal inset aligned with {@link dashboardCardHeaderClass}. */
export const dashboardCardRowInsetXClass = "px-3 sm:px-4";

/**
 * Use with {@link dashboardCardHeaderClass} on `CardHeader` **without** `CardAction`.
 * Title on the start edge; tabs + expand grouped on the end.
 */
export const dashboardTabbedCardHeaderClass =
  "grid-cols-1 items-start gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-3";

export const dashboardCardTitleClass = "text-sm font-medium leading-snug";

export const dashboardCardDescriptionClass =
  "text-xs text-balance text-muted-foreground";

/** CardContent shell for lists — pair with an inset wrapper around children. */
export const dashboardCardContentListClass =
  "min-w-0 !px-0 !pt-0 pb-3 sm:pb-4";

/** CardContent shell for default/empty bodies — pair with an inset wrapper around children. */
export const dashboardCardContentDefaultClass =
  "min-w-0 !px-0 !pt-0 pb-4 sm:pb-5";

/** CardContent shell for dashboard tables — same horizontal inset as the card header. */
export const dashboardCardContentTableClass =
  "min-w-0 !px-3 !pt-0 pb-4 sm:!px-4 sm:pb-5";
