/** Shared lollipop bar shape and sizing used by landing dashboard previews. */

import { useEffect, useState } from "react";

export type LollipopShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  fillOpacity?: number | string;
  active?: boolean;
  /** Stem color when active (hover or pinned). Defaults to brand. */
  activeFill?: string;
  /** Recharts active-bar layer passes `isActive` instead of `active`. */
  isActive?: boolean;
  solid?: boolean;
  /** Embed widgets, solid stems only, no faint background rails. */
  widget?: boolean;
  background?: { y?: number; height?: number };
  /** Orange lollipop head radius when revenue overlays traffic bars. */
  revenueHeadRadius?: number;
  revenueHeadFill?: string;
  /** Override stem/rail width (dense charts use a thinner line + dot). */
  stemWidth?: number;
};

/** Fixed orange head radius when a day has revenue (not scaled by amount). */
const REVENUE_LOLLIPOP_HEAD_RADIUS = 5;
/** Sentinel for ultra-dense charts — head renders as a square cap matching stem width. */
const REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE = 1;
const REVENUE_LOLLIPOP_HEAD_RADIUS_WIDGET = 1.5;
/** Outline around revenue heads so they separate from nearby stems. */
const REVENUE_LOLLIPOP_HEAD_STROKE = "var(--background)";
/** Slightly shrink revenue heads on narrow viewports. */
const REVENUE_LOLLIPOP_HEAD_COMPACT_SCALE = 0.72;
/** Thin stems + square caps only when bars are packed (≈12mo+ / All time). */
const ULTRA_DENSE_LOLLIPOP_POINT_THRESHOLD = 200;
export const LOLLIPOP_STEM_WIDTH_DENSE = 1.5;

export function isUltraDenseLollipopChart(pointCount: number): boolean {
  return pointCount > ULTRA_DENSE_LOLLIPOP_POINT_THRESHOLD;
}

/** @deprecated Prefer {@link isUltraDenseLollipopChart}. */
export function isDenseLollipopChart(pointCount: number): boolean {
  return isUltraDenseLollipopChart(pointCount);
}

export function lollipopStemWidth(pointCount?: number): number {
  if (pointCount != null && isUltraDenseLollipopChart(pointCount)) {
    return LOLLIPOP_STEM_WIDTH_DENSE;
  }
  return LOLLIPOP_STEM_WIDTH;
}

/** Match embed / home-card sparkline stems to Recharts `barSize`. */
export function sparklineBarSize(pointCount: number): number {
  if (pointCount > ULTRA_DENSE_LOLLIPOP_POINT_THRESHOLD) {
    return LOLLIPOP_STEM_WIDTH_DENSE;
  }
  if (pointCount > 45) return 2;
  if (pointCount > 28) return 3;
  return 4;
}

export function lollipopWidgetStemWidth(
  barSize: number,
  pointCount?: number,
): number {
  if (pointCount != null && isUltraDenseLollipopChart(pointCount)) {
    return LOLLIPOP_STEM_WIDTH_DENSE;
  }
  // Keep card stems hairline — barSize only controls Recharts slot spacing.
  return Math.max(1.5, Math.min(LOLLIPOP_STEM_WIDTH, barSize));
}

export function revenueLollipopHeadRadius(
  revenue: number,
  _maxRevenue?: number,
  widget = false,
  pointCount?: number,
  barSize?: number,
  compact = false,
): number {
  if (revenue <= 0) return 0;
  let radius = 0;
  if (widget && barSize != null) {
    if (pointCount != null && isUltraDenseLollipopChart(pointCount)) {
      radius = REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE;
    } else {
      radius = REVENUE_LOLLIPOP_HEAD_RADIUS;
    }
  } else if (widget) {
    radius = REVENUE_LOLLIPOP_HEAD_RADIUS_WIDGET;
  } else if (pointCount != null && isUltraDenseLollipopChart(pointCount)) {
    radius = REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE;
  } else {
    radius = REVENUE_LOLLIPOP_HEAD_RADIUS;
  }

  if (compact && radius > REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE) {
    radius = Math.max(
      REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE,
      radius * REVENUE_LOLLIPOP_HEAD_COMPACT_SCALE,
    );
  }

  return radius;
}

/** Opacity for the full-height background rail behind lollipop stems (disabled). */
export const LOLLIPOP_RAIL_OPACITY = 0;
export const LOLLIPOP_STEM_WIDTH = 2.5;
const STEM_TOP_RADIUS = 1;
/** Visible stem when a zero-value bar is pinned or hovered. */
const PINNED_MIN_STEM_HEIGHT = 10;

function resolveStemWidth(props: LollipopShapeProps): number {
  const width = props.stemWidth ?? LOLLIPOP_STEM_WIDTH;
  return width > 0 ? width : LOLLIPOP_STEM_WIDTH;
}

function usesSquareRevenueHead(stemWidth: number, revenueHeadRadius: number): boolean {
  return (
    revenueHeadRadius > 0 &&
    revenueHeadRadius <= REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE &&
    stemWidth <= 2 + 0.01
  );
}

function revenueHeadStrokeWidth(
  revenueHeadRadius: number,
  stemWidth: number,
): number {
  if (usesSquareRevenueHead(stemWidth, revenueHeadRadius)) {
    return 0;
  }
  if (revenueHeadRadius <= 2) {
    return 1;
  }
  return 1.5;
}

function RevenueHead(props: {
  cx: number;
  y: number;
  stemWidth: number;
  fill: string;
  revenueHeadRadius: number;
}) {
  const strokeWidth = revenueHeadStrokeWidth(
    props.revenueHeadRadius,
    props.stemWidth,
  );

  if (usesSquareRevenueHead(props.stemWidth, props.revenueHeadRadius)) {
    return (
      <rect
        x={props.cx - props.stemWidth / 2}
        y={props.y - props.stemWidth}
        width={props.stemWidth}
        height={props.stemWidth}
        fill={props.fill}
      />
    );
  }

  return (
    <circle
      cx={props.cx}
      cy={props.y}
      r={props.revenueHeadRadius}
      fill={props.fill}
      stroke={strokeWidth > 0 ? REVENUE_LOLLIPOP_HEAD_STROKE : undefined}
      strokeWidth={strokeWidth > 0 ? strokeWidth : undefined}
    />
  );
}

function stemBarPath(
  cx: number,
  top: number,
  bottom: number,
  roundTop: boolean,
  stemWidth: number,
): string {
  if (bottom <= top) return "";
  const left = cx - stemWidth / 2;
  const right = cx + stemWidth / 2;
  const radius = roundTop
    ? Math.min(STEM_TOP_RADIUS, stemWidth / 2, (bottom - top) / 2)
    : 0;

  if (radius <= 0) {
    return `M ${left} ${bottom} L ${left} ${top} L ${right} ${top} L ${right} ${bottom} Z`;
  }

  return [
    `M ${left} ${bottom}`,
    `L ${left} ${top + radius}`,
    `Q ${left} ${top} ${left + radius} ${top}`,
    `L ${right - radius} ${top}`,
    `Q ${right} ${top} ${right} ${top + radius}`,
    `L ${right} ${bottom}`,
    "Z",
  ].join(" ");
}

function StemBar(props: {
  cx: number;
  top: number;
  bottom: number;
  fill: string;
  fillOpacity: number;
  roundTop: boolean;
  stemWidth: number;
}) {
  const d = stemBarPath(
    props.cx,
    props.top,
    props.bottom,
    props.roundTop,
    props.stemWidth,
  );
  if (!d) return null;
  return (
    <path d={d} fill={props.fill} fillOpacity={props.fillOpacity} />
  );
}

export function LollipopBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  const highlighted = Boolean(props.active || props.isActive);
  const defaultFill = props.fill ?? "var(--foreground)";
  const stemFill = highlighted
    ? (props.activeFill ?? "var(--brand)")
    : defaultFill;
  const baseOpacity = Number(props.fillOpacity ?? 1) || 1;
  const cx = x + width / 2;
  const stemWidth = resolveStemWidth(props);
  const railTop =
    typeof props.background?.y === "number" ? props.background.y : y;
  const railBottom =
    typeof props.background?.height === "number"
      ? railTop + props.background.height
      : y + height;
  const stemOpacity = props.widget ? baseOpacity : baseOpacity;
  const revenueHeadRadius = props.revenueHeadRadius ?? 0;
  const revenueHeadFill = highlighted
    ? (props.activeFill ?? "var(--brand)")
    : (props.revenueHeadFill ?? "var(--revenue-bar-stack)");
  const showStem =
    height > 0 || (highlighted && !props.widget);
  const stemTop =
    height > 0 ? y : Math.max(railTop, railBottom - PINNED_MIN_STEM_HEIGHT);

  return (
    <g>
      {showStem ? (
        <StemBar
          cx={cx}
          top={stemTop}
          bottom={railBottom}
          fill={stemFill}
          fillOpacity={stemOpacity}
          roundTop={revenueHeadRadius <= 0}
          stemWidth={stemWidth}
        />
      ) : null}
      {revenueHeadRadius > 0 ? (
        <RevenueHead
          cx={cx}
          y={y}
          stemWidth={stemWidth}
          fill={revenueHeadFill}
          revenueHeadRadius={revenueHeadRadius}
        />
      ) : null}
    </g>
  );
}

/** Lollipop stem for the traffic segment when revenue stacks above (flat top). */
function SegmentLollipopBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  if (height <= 0 && props.widget) return null;

  const highlighted = Boolean(props.active || props.isActive);
  const defaultFill = props.fill ?? "var(--foreground)";
  const stemFill = highlighted
    ? (props.activeFill ?? "var(--brand)")
    : defaultFill;
  const cx = x + width / 2;
  const stemWidth = resolveStemWidth(props);
  const segmentBottom = y + height;

  return (
    <g>
      {height > 0 ? (
        <StemBar
          cx={cx}
          top={y}
          bottom={segmentBottom}
          fill={stemFill}
          fillOpacity={1}
          roundTop={false}
          stemWidth={stemWidth}
        />
      ) : null}
    </g>
  );
}

export function BrandActiveLollipopBarShape(props: LollipopShapeProps) {
  return <LollipopBarShape {...props} active fill="var(--brand)" />;
}

/** Traffic segment in a stacked lollipop — flat top when revenue sits above. */
export function StackedTrafficBarShape(
  props: LollipopShapeProps & { roundedTop?: boolean },
) {
  const { roundedTop = true, ...barProps } = props;
  if (roundedTop) {
    return <LollipopBarShape {...barProps} solid />;
  }
  return <SegmentLollipopBarShape {...barProps} solid />;
}

/** Revenue segment stacked on traffic — thin lollipop stem. */
export function StackedRevenueBarShape(props: LollipopShapeProps) {
  const x = Number(props.x) || 0;
  const y = Number(props.y) || 0;
  const width = Number(props.width) || 0;
  const height = Number(props.height) || 0;
  if (height <= 0) return null;

  const highlighted = Boolean(props.active || props.isActive);
  const stroke = highlighted
    ? (props.activeFill ?? "var(--brand)")
    : (props.fill ?? "var(--revenue-bar-stack)");
  const cx = x + width / 2;
  const stemWidth = resolveStemWidth(props);

  return (
    <StemBar
      cx={cx}
      top={y}
      bottom={y + height}
      fill={stroke}
      fillOpacity={1}
      roundTop
      stemWidth={stemWidth}
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

/** Alias kept for pricing sparklines that expect a rounded bar export. */
export function RoundedBarShape(props: LollipopShapeProps) {
  return <LollipopBarShape {...props} solid />;
}

export function BrandActiveRoundedBarShape(props: LollipopShapeProps) {
  return <BrandActiveLollipopBarShape {...props} />;
}

export function PreserveFillActiveRoundedBarShape(props: LollipopShapeProps) {
  return <LollipopBarShape {...props} solid active />;
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

/** Below bar layer (300) so hover guide sits behind lollipop stems and heads. */
export const TRAFFIC_CHART_HOVER_GUIDE_Z_INDEX = 250;

/** Vertical hover/pin guide — dashed; uses full-opacity grid hue for readability. */
export const chartVerticalGuideProps = {
  stroke: "var(--chart-guide-stroke)",
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: "4 4",
} as const;

/** Narrow viewports: tighter chart chrome and smaller revenue heads. */
export function useCompactChartLayout() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return compact;
}
