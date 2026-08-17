/** Shared lollipop bar shape and sizing used by landing dashboard previews. */

export type LollipopShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  fillOpacity?: number | string;
  active?: boolean;
  /** Override fill when active/hovered (defaults to brand on traffic charts). */
  activeFill?: string;
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

/** Solid rounded bars for the main traffic chart (easier to read than lollipop stems). */
export function RoundedBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  if (height <= 0 || width <= 0) return null;

  const highlighted = Boolean(props.active || props.isActive);
  const fill = highlighted
    ? (props.activeFill ?? props.fill ?? "var(--brand)")
    : (props.fill ?? "var(--foreground)");
  const baseOpacity = Number(props.fillOpacity ?? 1) || 1;
  const opacity =
    props.widget || props.solid
      ? baseOpacity
      : highlighted
        ? 1
        : 0.88 * baseOpacity;

  const inset =
    props.solid || props.widget ? 0 : Math.max(1, width * 0.05);
  const barWidth =
    props.solid || props.widget ? width : Math.max(4, width - inset * 2);
  const barX =
    props.solid || props.widget ? x : x + (width - barWidth) / 2;
  const radius = Math.min(3, barWidth / 4);
  const bottom = y + height;

  const path =
    radius > 0
      ? [
          `M ${barX} ${bottom}`,
          `L ${barX} ${y + radius}`,
          `Q ${barX} ${y} ${barX + radius} ${y}`,
          `L ${barX + barWidth - radius} ${y}`,
          `Q ${barX + barWidth} ${y} ${barX + barWidth} ${y + radius}`,
          `L ${barX + barWidth} ${bottom}`,
          "Z",
        ].join(" ")
      : undefined;

  if (path) {
    return <path d={path} fill={fill} fillOpacity={opacity} />;
  }

  return (
    <rect
      x={barX}
      y={y}
      width={barWidth}
      height={height}
      fill={fill}
      fillOpacity={opacity}
    />
  );
}

export function BrandActiveRoundedBarShape(props: LollipopShapeProps) {
  return (
    <RoundedBarShape
      {...props}
      active
      activeFill="var(--brand)"
      fill="var(--brand)"
    />
  );
}

/** Hover/active bar that keeps the series fill (e.g. Web Vitals rating colors). */
export function PreserveFillActiveRoundedBarShape(props: LollipopShapeProps) {
  return <RoundedBarShape {...props} solid active />;
}

export function StackedTrafficBarShape(
  props: LollipopShapeProps & { roundedTop?: boolean },
) {
  const { roundedTop = true, ...barProps } = props;
  if (roundedTop) {
    return <RoundedBarShape {...barProps} />;
  }
  return <FlatBarShape {...barProps} />;
}

export function StackedRevenueBarShape(props: LollipopShapeProps) {
  return <RoundedBarShape {...props} />;
}

function FlatBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  if (height <= 0 || width <= 0) return null;

  const highlighted = Boolean(props.active || props.isActive);
  const fill = highlighted
    ? (props.activeFill ?? props.fill ?? "var(--foreground)")
    : (props.fill ?? "var(--foreground)");
  const baseOpacity = Number(props.fillOpacity ?? 1) || 1;
  const opacity =
    props.widget || props.solid
      ? baseOpacity
      : highlighted
        ? 1
        : 0.92 * baseOpacity;

  const inset =
    props.solid || props.widget ? 0 : Math.max(1, width * 0.05);
  const barWidth =
    props.solid || props.widget ? width : Math.max(4, width - inset * 2);
  const barX =
    props.solid || props.widget ? x : x + (width - barWidth) / 2;

  return (
    <rect
      x={barX}
      y={y}
      width={barWidth}
      height={height}
      fill={fill}
      fillOpacity={opacity}
    />
  );
}

export function BrandActiveStackedTrafficBarShape(
  props: LollipopShapeProps & { roundedTop?: boolean },
) {
  return (
    <StackedTrafficBarShape
      {...props}
      solid
      fill="var(--brand)"
      active
      activeFill="var(--brand)"
    />
  );
}

export function BrandActiveStackedRevenueBarShape(props: LollipopShapeProps) {
  return (
    <StackedRevenueBarShape
      {...props}
      solid
      fill="var(--brand)"
      active
      activeFill="var(--brand)"
    />
  );
}

export function chartBarMaxSize(pointCount: number): number {
  if (pointCount <= 7) return 80;
  if (pointCount <= 14) return 64;
  if (pointCount <= 30) return 48;
  if (pointCount <= 60) return 32;
  if (pointCount <= 120) return 24;
  return 16;
}

export function chartBarCategoryGap(pointCount: number): string | number {
  if (pointCount <= 7) return "16%";
  if (pointCount <= 30) return "12%";
  if (pointCount <= 90) return "8%";
  return "4%";
}

/** Inset for point-scale X axes so edge bars are not clipped by the plot bounds. */
export function chartAxisEdgePadding(
  pointCount: number,
  barMaxSize: number,
  seriesCount = 1,
) {
  const barGroupWidth =
    barMaxSize * seriesCount + (seriesCount > 1 ? (seriesCount - 1) * 2 : 0);
  const minPadding = Math.ceil(barGroupWidth / 2) + 4;
  const sparseBoost =
    pointCount <= 7 ? 8 : pointCount <= 14 ? 4 : 0;
  const padding = Math.max(12, minPadding + sparseBoost);
  return { left: padding, right: padding };
}

export function resolveTrafficChartClickIndex(
  state: {
    activeTooltipIndex?: number | string;
    activeCoordinate?: { x?: number; y?: number };
  },
  pointCount: number,
  plotWidth: number,
  marginLeft: number,
  marginRight: number,
): number | null {
  const fromIndex = Number(state.activeTooltipIndex);
  if (
    Number.isInteger(fromIndex) &&
    fromIndex >= 0 &&
    fromIndex < pointCount
  ) {
    return fromIndex;
  }

  const x = state.activeCoordinate?.x;
  if (typeof x !== "number" || !Number.isFinite(x) || pointCount <= 0) {
    return null;
  }

  const plotLeft = marginLeft;
  const innerWidth = Math.max(1, plotWidth - marginLeft - marginRight);

  if (pointCount === 1) {
    return 0;
  }

  const ratio = (x - plotLeft) / innerWidth;
  const index = Math.round(ratio * (pointCount - 1));
  return Math.max(0, Math.min(pointCount - 1, index));
}
