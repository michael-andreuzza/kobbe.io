/** Entry files are named `YYYY-MM-DD-slug.md`; URLs drop the date prefix. */
export function changelogSlug(entryId: string): string {
  return entryId.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

export const changelogDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
