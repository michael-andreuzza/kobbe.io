import { useState } from "react";

import { faviconDisplayInitial } from "@/lib/favicon-initials";
import {
  faviconUrlForSiteDomain,
  shouldPreferFaviconInitials,
} from "@/lib/referrer-favicon";
import { cn } from "@/lib/utils";

type SiteFaviconProps = {
  domain: string | null | undefined;
  title: string;
  /** Use a bundled/local favicon when the domain is known (e.g. kobbe.io on marketing). */
  localSrc?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

const FAVICON_FALLBACK_THRESHOLD_PX = 24;

function isLikelyGenericGlobe(img: HTMLImageElement) {
  return (
    img.naturalWidth < FAVICON_FALLBACK_THRESHOLD_PX ||
    img.naturalHeight < FAVICON_FALLBACK_THRESHOLD_PX
  );
}

export function SiteFaviconLg({
  domain,
  title,
  localSrc,
  className,
  imageClassName,
  fallbackClassName,
}: SiteFaviconProps) {
  const [failed, setFailed] = useState(false);
  const initial = faviconDisplayInitial(title, domain);
  const useInitials = !localSrc && shouldPreferFaviconInitials(domain);
  const src = localSrc ?? (useInitials ? null : faviconUrlForSiteDomain(domain, 64));

  if (failed || !src) {
    return (
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-sm leading-none font-semibold text-muted-foreground select-none",
          className,
          fallbackClassName,
        )}
        title={title}
        aria-hidden
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      title={title}
      width={32}
      height={32}
      className={cn(
        "size-8 shrink-0 rounded-md bg-muted/40 object-cover",
        className,
        imageClassName,
      )}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={(event) => {
        if (isLikelyGenericGlobe(event.currentTarget)) {
          setFailed(true);
        }
      }}
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
