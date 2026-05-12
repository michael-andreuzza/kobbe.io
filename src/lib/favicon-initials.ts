const FIRST_RELEVANT_CHAR = /[\p{L}\d]/u;

function firstRelevantCodePoint(s: string): string {
  for (const ch of s) {
    if (FIRST_RELEVANT_CHAR.test(ch)) return ch;
  }
  return "";
}

/** One character for a non-image marker: title, then host, else "?". */
export function faviconDisplayInitial(title: string, domainOrHost: string | null | undefined): string {
  const t = firstRelevantCodePoint(title);
  if (t) return t.toLocaleUpperCase();
  if (domainOrHost != null) {
    const d = firstRelevantCodePoint(
      domainOrHost.replace(/^https?:\/\//i, "").replace(/^www\./i, ""),
    );
    if (d) return d.toLocaleUpperCase();
  }
  return "?";
}
