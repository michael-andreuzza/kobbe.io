import { useEffect, useMemo, useRef, useState } from "react";

/**
 * "Visitors over time" reimagined in the Devouring Details language:
 * hairline strokes, barcode-texture columns, ruler ticks, mono uppercase
 * labels, and a single orange cursor. Hand-rolled SVG on purpose — the
 * schematic look needs full control over every line.
 */

const MONO_STACK =
  'ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", Menlo, monospace';

const INK = "var(--sch-ink, #161616)";
const PAPER = "var(--sch-paper, #f6f5f2)";
const ACCENT = "var(--brand, #f54900)";
const HAIRLINE_OPACITY = 0.16;

/** Dash cell rhythm for the barcode columns: 2px ink, 2px air. */
const DASH = 2;
const DASH_GAP = 2;
const DASH_CELL = DASH + DASH_GAP;

const RULER_WIDTH = 40;
const CHIP_GUTTER = 78;
const TOP_PAD = 18;
const BOTTOM_PAD = 34;

const MS_DAY = 24 * 60 * 60 * 1000;
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

type DayPoint = {
  t: number;
  visitors: number;
  revenue: number;
  monthStart: boolean;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic 90-day series: drift + weekly rhythm + noise + one spike. */
function buildSeries(days: number, spikeIndex: number): DayPoint[] {
  const rand = mulberry32(20260820);
  const end = Date.UTC(2026, 7, 20);
  const start = end - (days - 1) * MS_DAY;
  const points: DayPoint[] = [];
  let drift = 0;

  for (let i = 0; i < days; i += 1) {
    const t = start + i * MS_DAY;
    const date = new Date(t);
    const weekday = date.getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    drift += (rand() - 0.46) * 9;
    drift = Math.max(-60, Math.min(150, drift));
    let visitors =
      170 + drift + i * 0.9 + (weekend ? -52 : 14) + rand() * 46;
    if (i === spikeIndex) visitors *= 2.6;
    if (i === spikeIndex + 1) visitors *= 1.5;
    const revenue = rand() > 0.68 ? Math.round(40 + rand() * 380) : 0;
    points.push({
      t,
      visitors: Math.max(24, Math.round(visitors)),
      revenue,
      monthStart: date.getUTCDate() === 1,
    });
  }
  return points;
}

function dayLabel(t: number): string {
  const d = new Date(t);
  return `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, "0")}`;
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useMeasuredWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.round(el.getBoundingClientRect().width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

const MICRO_LABEL: React.CSSProperties = {
  fontFamily: MONO_STACK,
  fontSize: 9,
  letterSpacing: "0.08em",
  fill: INK,
};

export function SchematicOverviewChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useMeasuredWidth(containerRef);
  const reducedMotion = usePrefersReducedMotion();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [swept, setSwept] = useState(false);

  const height = 300;
  const compact = width > 0 && width < 560;
  const days = compact ? 60 : 90;
  const spikeIndex = days - 22;
  const points = useMemo(() => buildSeries(days, spikeIndex), [days, spikeIndex]);

  useEffect(() => {
    if (reducedMotion) {
      setSwept(true);
      return;
    }
    setSwept(false);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setSwept(true))
    );
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, days, width > 0]);

  if (width <= 0) {
    return <div ref={containerRef} style={{ height }} />;
  }

  const plotLeft = RULER_WIDTH;
  const plotRight = width - CHIP_GUTTER;
  const plotWidth = Math.max(40, plotRight - plotLeft);
  const plotTop = TOP_PAD;
  const plotBottom = height - BOTTOM_PAD;
  const plotHeight = plotBottom - plotTop;

  const maxVisitors = Math.max(...points.map((p) => p.visitors));
  const step = points.length > 1 ? plotWidth / (points.length - 1) : plotWidth;
  const xAt = (index: number) => plotLeft + index * step;
  const cellsFor = (visitors: number) =>
    Math.max(1, Math.round(((visitors / maxVisitors) * plotHeight) / DASH_CELL));
  const topFor = (visitors: number) => plotBottom - cellsFor(visitors) * DASH_CELL;

  const hovered = hoverIndex != null ? points[hoverIndex] : null;
  const latestIndex = points.length - 1;
  const spike = points[spikeIndex];

  const rulerTicks: number[] = [];
  for (let y = plotBottom; y >= plotTop; y -= 6) rulerTicks.push(y);

  const monthTicks = points
    .map((p, index) => ({ p, index }))
    .filter(({ p, index }) => p.monthStart && index > 2 && index < points.length - 3);

  const handlePointerMove = (event: React.PointerEvent<SVGRectElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const index = Math.round(x / step);
    setHoverIndex(Math.max(0, Math.min(points.length - 1, index)));
  };

  const activeIndex = hoverIndex ?? latestIndex;
  const active = points[activeIndex];
  const activeX = xAt(activeIndex);
  const activeY = topFor(active.visitors);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Visitors over the last ${days} days, peaking at ${formatCount(maxVisitors)}`}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* ── Left ruler: short hairline ticks, longer every 5th ── */}
        <g shapeRendering="crispEdges">
          {rulerTicks.map((y, index) => (
            <line
              key={y}
              x1={plotLeft - (index % 5 === 0 ? 14 : 8)}
              x2={plotLeft - 4}
              y1={y}
              y2={y}
              stroke={INK}
              strokeOpacity={index % 5 === 0 ? 0.45 : 0.22}
              strokeWidth={1}
            />
          ))}
        </g>
        <text x={plotLeft - 14} y={plotTop - 6} style={MICRO_LABEL} opacity={0.55}>
          {formatCount(maxVisitors)} —
        </text>

        {/* ── Baseline + x-axis month ticks ── */}
        <g shapeRendering="crispEdges">
          <line
            x1={plotLeft}
            x2={plotRight}
            y1={plotBottom + 0.5}
            y2={plotBottom + 0.5}
            stroke={INK}
            strokeOpacity={HAIRLINE_OPACITY}
            strokeWidth={1}
          />
          {monthTicks.map(({ p, index }) => (
            <g key={p.t}>
              <line
                x1={xAt(index)}
                x2={xAt(index)}
                y1={plotBottom + 1}
                y2={plotBottom + 7}
                stroke={INK}
                strokeOpacity={0.45}
                strokeWidth={1}
              />
              <text
                x={xAt(index) + 4}
                y={plotBottom + 16}
                style={MICRO_LABEL}
                opacity={0.55}
              >
                {MONTHS[new Date(p.t).getUTCMonth()]}
              </text>
            </g>
          ))}
        </g>

        {/* ── Barcode columns, swept in left→right by a clip that widens ── */}
        <defs>
          <clipPath id="sch-sweep">
            <rect
              x={plotLeft - 2}
              y={plotTop - 10}
              height={plotHeight + 14}
              width={swept ? plotWidth + 8 : 0}
              style={{
                transition: reducedMotion
                  ? "none"
                  : "width 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#sch-sweep)">
          <g shapeRendering="crispEdges">
            {points.map((p, index) => {
              const x = Math.round(xAt(index)) + 0.5;
              const cells = cellsFor(p.visitors);
              const columnTop = plotBottom - cells * DASH_CELL + DASH_GAP;
              return (
                <line
                  key={p.t}
                  x1={x}
                  x2={x}
                  y1={plotBottom - 1}
                  y2={columnTop}
                  stroke={INK}
                  strokeOpacity={hoverIndex === index ? 1 : 0.82}
                  strokeWidth={compact ? 1.25 : 1.5}
                  strokeDasharray={`${DASH} ${DASH_GAP}`}
                />
              );
            })}
          </g>

          {/* Revenue days: single orange dash under the baseline (machine tape). */}
          <g shapeRendering="crispEdges">
            {points.map((p, index) =>
              p.revenue > 0 ? (
                <line
                  key={`rev-${p.t}`}
                  x1={Math.round(xAt(index)) + 0.5}
                  x2={Math.round(xAt(index)) + 0.5}
                  y1={plotBottom + 3}
                  y2={plotBottom + 3 + DASH}
                  stroke={ACCENT}
                  strokeWidth={compact ? 1.25 : 1.5}
                />
              ) : null
            )}
          </g>
        </g>

        {/* ── Schematic callout on the spike day ── */}
        <g
          opacity={swept ? 1 : 0}
          style={{
            transition: reducedMotion ? "none" : "opacity 500ms ease 900ms",
          }}
        >
          <circle
            cx={xAt(spikeIndex)}
            cy={topFor(spike.visitors) - 6}
            r={3.5}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1}
          />
          <line
            x1={xAt(spikeIndex) + 3}
            y1={topFor(spike.visitors) - 9}
            x2={xAt(spikeIndex) + 26}
            y2={topFor(spike.visitors) - 26}
            stroke={INK}
            strokeOpacity={0.45}
            strokeWidth={1}
          />
          <text
            x={xAt(spikeIndex) + 30}
            y={topFor(spike.visitors) - 24}
            style={MICRO_LABEL}
          >
            LAUNCH DAY
          </text>
        </g>

        {/* ── Resting cursor: one orange dot on the latest day ── */}
        {hoverIndex == null ? (
          <circle
            cx={xAt(latestIndex)}
            cy={topFor(points[latestIndex].visitors)}
            r={3.5}
            fill={ACCENT}
            opacity={swept ? 1 : 0}
            style={{
              transition: reducedMotion ? "none" : "opacity 400ms ease 1050ms",
            }}
          />
        ) : null}

        {/* ── Hover crosshair: annotation lives on the geometry ── */}
        {hovered != null ? (
          <g>
            <line
              x1={activeX}
              x2={activeX}
              y1={plotTop - 4}
              y2={plotBottom}
              stroke={INK}
              strokeOpacity={0.3}
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
            <line
              x1={plotLeft}
              x2={width - 6}
              y1={activeY}
              y2={activeY}
              stroke={ACCENT}
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
            <circle cx={activeX} cy={activeY} r={3.5} fill={ACCENT} />

            {/* Right-edge boxed value chip, sitting on the horizontal rule */}
            <g
              transform={`translate(${width - 6}, ${activeY})`}
              style={{ fontFamily: MONO_STACK }}
            >
              <rect
                x={-CHIP_GUTTER + 6}
                y={-9}
                width={CHIP_GUTTER - 6}
                height={18}
                fill={ACCENT}
              />
              <text
                x={-CHIP_GUTTER / 2 + 3}
                y={3.5}
                textAnchor="middle"
                style={{ ...MICRO_LABEL, fill: PAPER }}
              >
                {formatCount(hovered.visitors)} VIS
              </text>
            </g>

            {/* Bottom boxed date chip on the vertical rule */}
            <g transform={`translate(${activeX}, ${plotBottom + 12})`}>
              <rect
                x={-27}
                y={0}
                width={54}
                height={15}
                fill={PAPER}
                stroke={INK}
                strokeOpacity={0.4}
                strokeWidth={1}
              />
              <text x={0} y={10.5} textAnchor="middle" style={MICRO_LABEL}>
                {dayLabel(hovered.t)}
              </text>
            </g>

            {/* Revenue readout under the value chip when the day earned */}
            {hovered.revenue > 0 ? (
              <text
                x={width - 6}
                y={activeY + 22}
                textAnchor="end"
                style={{ ...MICRO_LABEL, fill: ACCENT }}
              >
                +${formatCount(hovered.revenue)}
              </text>
            ) : null}
          </g>
        ) : null}

        {/* Pointer capture layer */}
        <rect
          x={plotLeft}
          y={plotTop - 8}
          width={plotWidth}
          height={plotHeight + 16 + BOTTOM_PAD}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          style={{ cursor: "crosshair", touchAction: "pan-y" }}
        />
      </svg>
    </div>
  );
}
