/** Ratio applied above the highest data value so peaks are not flush with the chart top. */
const COUNT_PAD = 1.12;

/**
 * Upper bound for count-like Y axes (visitors, revenue minor units, event totals, etc.).
 */
export function chartCountAxisUpperBound(dataMax: number): number {
  if (!Number.isFinite(dataMax) || dataMax <= 0) return 1;
  const padded = Math.ceil(dataMax * COUNT_PAD);
  const bumped = Math.ceil(dataMax + Math.max(1, Math.ceil(dataMax * 0.08)));
  return niceChartAxisCeiling(Math.max(1, padded, bumped));
}

function niceChartAxisCeiling(value: number): number {
  if (value <= 10) return Math.ceil(value);
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const niceNormalized =
    normalized <= 1
      ? 1
      : normalized <= 1.2
        ? 1.2
        : normalized <= 1.5
          ? 1.5
          : normalized <= 2
            ? 2
            : normalized <= 2.5
              ? 2.5
              : normalized <= 3
                ? 3
                : normalized <= 4
                  ? 4
                  : normalized <= 5
                    ? 5
                    : normalized <= 7.5
                      ? 7.5
                      : 10;
  return Math.ceil(niceNormalized * magnitude);
}
