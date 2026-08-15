import { cn } from "@/lib/utils";

/** Square brand marks with a black background and light icon artwork. */
export const BRAND_LOGOS_INVERT_ON_DARK_SURFACE = new Set([
  "astro.svg",
  "framer.svg",
  "nextjs.svg",
  "reactrouter.svg",
  "shopify.svg",
  "squarespace.svg",
  "v0.svg",
  "wix.svg",
]);

export function brandLogoFilename(src: string) {
  return src.split("/").pop()?.split("?")[0] ?? "";
}

export function brandLogoInvertsOnDarkSurface(src: string) {
  return BRAND_LOGOS_INVERT_ON_DARK_SURFACE.has(brandLogoFilename(src));
}

export function brandLogoImageClass(src: string, className?: string) {
  return cn(
    className,
    brandLogoInvertsOnDarkSurface(src) && "brand-logo-invert-on-dark",
  );
}
