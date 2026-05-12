import { cn } from "@/lib/utils";

const KOBBE_FAVICON_SRC = "/images/favicons/favicon-32x32.png";

export function SiteFavicon({
  title,
  className,
}: {
  domain?: string | null;
  title: string;
  className?: string;
}) {
  return (
    <img
      src={KOBBE_FAVICON_SRC}
      alt=""
      title={title}
      width={14}
      height={14}
      className={cn("size-3.5 shrink-0 rounded bg-muted/40 object-contain", className)}
      loading="lazy"
      decoding="async"
    />
  );
}
