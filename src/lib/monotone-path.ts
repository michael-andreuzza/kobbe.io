/**
 * Monotone cubic interpolation (Fritsch–Carlson), matching d3's curveMonotoneX
 * used by the app's recharts `type="monotone"` series. Produces a smooth SVG
 * path through the points without overshooting local extrema.
 */
export function monotoneLinePath(
  points: ReadonlyArray<{ x: number; y: number }>,
): string {
  const n = points.length;
  if (n === 0) return "";
  if (n === 1) return `M ${points[0]!.x.toFixed(2)} ${points[0]!.y.toFixed(2)}`;

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const run = points[i + 1]!.x - points[i]!.x;
    dx.push(run);
    slope.push((points[i + 1]!.y - points[i]!.y) / run);
  }

  const tangent: number[] = [slope[0]!];
  for (let i = 1; i < n - 1; i++) {
    if (slope[i - 1]! * slope[i]! <= 0) {
      tangent.push(0);
    } else {
      const w1 = 2 * dx[i]! + dx[i - 1]!;
      const w2 = dx[i]! + 2 * dx[i - 1]!;
      tangent.push((w1 + w2) / (w1 / slope[i - 1]! + w2 / slope[i]!));
    }
  }
  tangent.push(slope[n - 2]!);

  let d = `M ${points[0]!.x.toFixed(2)} ${points[0]!.y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const third = dx[i]! / 3;
    const c1x = points[i]!.x + third;
    const c1y = points[i]!.y + tangent[i]! * third;
    const c2x = points[i + 1]!.x - third;
    const c2y = points[i + 1]!.y - tangent[i + 1]! * third;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${points[i + 1]!.x.toFixed(2)} ${points[i + 1]!.y.toFixed(2)}`;
  }
  return d;
}
