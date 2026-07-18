/** Shared lollipop bar shape and sizing used by landing dashboard previews. */

export type LollipopShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  fillOpacity?: number | string;
  active?: boolean;
  /** Recharts active-bar layer passes `isActive` instead of `active`. */
  isActive?: boolean;
  solid?: boolean;
  /** Embed widgets, solid stems only, no faint background rails. */
  widget?: boolean;
  background?: { y?: number; height?: number };
};

export function LollipopBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  const highlighted = Boolean(props.active || props.isActive);
  const fill = highlighted
    ? "var(--brand)"
    : (props.fill ?? "var(--foreground)");
  const baseOpacity = Number(props.fillOpacity ?? 1) || 1;
  const cx = x + width / 2;
  const railTop =
    typeof props.background?.y === "number" ? props.background.y : y;
  const railBottom =
    typeof props.background?.height === "number"
      ? railTop + props.background.height
      : y + height;
  const stemOpacity =
    props.widget || props.solid
      ? baseOpacity
      : highlighted
        ? 1
        : 0.7 * baseOpacity;
  const railOpacity = props.widget ? 0 : highlighted ? 1 : 0.1 * baseOpacity;
  const stemWidth = 2;

  return (
    <g>
      {!props.widget ? (
        <line
          x1={cx}
          y1={railTop}
          x2={cx}
          y2={railBottom}
          stroke={fill}
          strokeOpacity={railOpacity}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : null}
      {height > 0 ? (
        <line
          x1={cx}
          y1={y}
          x2={cx}
          y2={railBottom}
          stroke={fill}
          strokeOpacity={stemOpacity}
          strokeWidth={stemWidth}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

export function BrandActiveLollipopBarShape(props: LollipopShapeProps) {
  return <LollipopBarShape {...props} active fill="var(--brand)" />;
}

export function chartBarMaxSize(pointCount: number): number {
  if (pointCount <= 7) return 64;
  if (pointCount <= 14) return 48;
  if (pointCount <= 30) return 32;
  if (pointCount <= 60) return 22;
  if (pointCount <= 120) return 14;
  return 10;
}

export function chartBarCategoryGap(pointCount: number): string | number {
  if (pointCount <= 7) return "12%";
  if (pointCount <= 30) return "10%";
  if (pointCount <= 90) return "6%";
  return "2%";
}
