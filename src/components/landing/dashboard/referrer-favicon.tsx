import { useState } from "react";

import { faviconDisplayInitial } from "@/lib/favicon-initials";
import {
  faviconUrlForReferrer,
  hostnameFromReferrer,
  shouldPreferFaviconInitials,
} from "@/lib/referrer-favicon";
import { cn } from "@/lib/utils";

const fallbackTileClass = cn(
  "inline-flex size-4 shrink-0 select-none items-center justify-center overflow-hidden",
  "border border-border/70 bg-muted text-[0.65rem] font-semibold leading-none text-muted-foreground",
  "rounded-sm",
);

export function ReferrerFavicon({ referrer, title }: { referrer: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const host = hostnameFromReferrer(referrer);
  const initial = faviconDisplayInitial(title, host);
  const useInitials = shouldPreferFaviconInitials(host);
  const src = useInitials ? null : faviconUrlForReferrer(referrer);
  if (failed || !src) {
    return (
      <span className={fallbackTileClass} title={title} aria-hidden>
        {initial}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      title={title}
      width={16}
      height={16}
      className="size-4 shrink-0 rounded-sm bg-muted/40 object-contain"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
