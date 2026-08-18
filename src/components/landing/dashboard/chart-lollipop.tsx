/** Shared lollipop bar shape and sizing used by landing dashboard previews. */

import { usePlotArea, useXAxisScale } from "recharts";

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
const REVENUE_LOLLIPOP_HEAD_RADIUS = 3;
/** Sentinel for ultra-dense charts — head renders as a square cap matching stem width. */
const REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE = 1;
const REVENUE_LOLLIPOP_HEAD_RADIUS_WIDGET = 1.5;
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

export function revenueLollipopHeadRadius(
  revenue: number,
  _maxRevenue?: number,
  widget = false,
  pointCount?: number,
): number {
  if (revenue <= 0) return 0;
  if (widget) return REVENUE_LOLLIPOP_HEAD_RADIUS_WIDGET;
  if (pointCount != null && isUltraDenseLollipopChart(pointCount)) {
    return REVENUE_LOLLIPOP_HEAD_RADIUS_ULTRA_DENSE;
  }
  return REVENUE_LOLLIPOP_HEAD_RADIUS;
}

/** Opacity for the full-height background rail behind lollipop stems. */
export const LOLLIPOP_RAIL_OPACITY = 0.06;
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
    stemWidth <= LOLLIPOP_STEM_WIDTH_DENSE + 0.01
  );
}

function RevenueHead(props: {
  cx: number;
  y: number;
  stemWidth: number;
  fill: string;
  revenueHeadRadius: number;
}) {
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
  const railFill = defaultFill;
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
  const railOpacity = props.widget ? 0 : LOLLIPOP_RAIL_OPACITY * baseOpacity;
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
      {!props.widget ? (
        <line
          x1={cx}
          y1={railTop}
          x2={cx}
          y2={railBottom}
          stroke={railFill}
          strokeOpacity={railOpacity}
          strokeWidth={stemWidth}
          strokeLinecap="butt"
        />
      ) : null}
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
  const railFill = defaultFill;
  const cx = x + width / 2;
  const stemWidth = resolveStemWidth(props);
  const railTop =
    typeof props.background?.y === "number" ? props.background.y : y;
  const railBottom =
    typeof props.background?.height === "number"
      ? railTop + props.background.height
      : y + height;
  const segmentBottom = y + height;

  return (
    <g>
      {!props.widget ? (
        <line
          x1={cx}
          y1={railTop}
          x2={cx}
          y2={railBottom}
          stroke={railFill}
          strokeOpacity={LOLLIPOP_RAIL_OPACITY}
          strokeWidth={stemWidth}
          strokeLinecap="butt"
        />
      ) : null}
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

/** Full-height faint rails behind area charts — same look as bar-mode lollipop rails. */
export function AreaChartLollipopRails(props: {
  labels: readonly string[];
  fill?: string;
}) {
  const xScale = useXAxisScale();
  const plotArea = usePlotArea();
  const { labels, fill = "var(--foreground)" } = props;

  if (!xScale || !plotArea || labels.length === 0) {
    return null;
  }

  const railTop = plotArea.y;
  const railBottom = plotArea.y + plotArea.height;

  return (
    <g className="kobbe-area-chart-rails" aria-hidden="true">
      {labels.map((label, index) => {
        const cx = xScale(label);
        if (cx == null || !Number.isFinite(cx)) {
          return null;
        }

        return (
          <line
            key={`area-rail-${label}-${index}`}
            x1={cx}
            y1={railTop}
            x2={cx}
            y2={railBottom}
            stroke={fill}
            strokeOpacity={LOLLIPOP_RAIL_OPACITY}
            strokeWidth={LOLLIPOP_STEM_WIDTH}
            strokeLinecap="butt"
          />
        );
      })}
    </g>
  );
}

/** Full-height brand stem for a pinned chart day (area mode). Matches lollipop width. */
export function PinnedFullHeightBarShape(props: {
  x?: number;
  width?: number;
  background?: { y?: number; height?: number };
  fill?: string;
  fillOpacity?: number;
}) {
  const x = Number(props.x) || 0;
  const slotWidth = Number(props.width) || 0;
  const top =
    typeof props.background?.y === "number" ? props.background.y : null;
  const height =
    typeof props.background?.height === "number"
      ? props.background.height
      : null;
  if (top == null || height == null || height <= 0 || slotWidth <= 0) return null;
  const cx = x + slotWidth / 2;
  return (
    <line
      x1={cx}
      y1={top}
      x2={cx}
      y2={top + height}
      stroke={props.fill ?? "var(--brand)"}
      strokeWidth={LOLLIPOP_STEM_WIDTH}
      strokeOpacity={props.fillOpacity ?? 1}
      strokeLinecap="butt"
    />
  );
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
