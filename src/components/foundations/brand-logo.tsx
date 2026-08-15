import { brandLogoImageClass } from "@/lib/brand-logos";

type BrandLogoProps = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

export function BrandLogo({
  src,
  alt = "",
  className,
  loading = "lazy",
  width,
  height,
}: BrandLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={brandLogoImageClass(src, className)}
      loading={loading}
      width={width}
      height={height}
    />
  );
}

export default BrandLogo;
