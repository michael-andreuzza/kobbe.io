/** Best-effort hostname from a raw referrer string. */
export function hostnameFromReferrer(referrer: string): string | null {
  const t = referrer.trim();
  if (!t) return null;
  try {
    return new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`).hostname;
  } catch {
    return null;
  }
}

function faviconUrlForHost(hostname: string, size: number = 32): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=${size}`;
}

export function faviconUrlForReferrer(referrer: string): string | null {
  const host = hostnameFromReferrer(referrer);
  return host ? faviconUrlForHost(host) : null;
}

function siteDomainToHostname(domain: string | null | undefined): string | null {
  const t = (domain ?? "").trim();
  if (!t) return null;
  try {
    return new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`).hostname.replace(/^www\./i, "");
  } catch {
    return null;
  }
}

export function faviconUrlForSiteDomain(domain: string | null | undefined, size: number = 32): string | null {
  const host = siteDomainToHostname(domain);
  return host ? faviconUrlForHost(host, size) : null;
}

/** Prefer initials tile for local / low-signal hosts so generic globe favicons don’t show. */
export function shouldPreferFaviconInitials(domain: string | null | undefined): boolean {
  const host = siteDomainToHostname(domain);
  if (host == null) return true;
  const h = host.toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0" || h === "[::1]" || h === "::1")
    return true;
  if (h.endsWith(".local") || h.endsWith(".localhost")) return true;
  if (h.startsWith("::ffff:127.")) return true;
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  return false;
}
