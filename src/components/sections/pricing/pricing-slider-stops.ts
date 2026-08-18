/** Label/tick positions: "0" at the left edge, tiers evenly spaced after it. */
export function pricingSliderTierStopPercent(
  tierIndex: number,
  tierCount: number,
): number {
  if (tierCount <= 0) return 0;
  return ((tierIndex + 1) / tierCount) * 100;
}

export function pricingSliderTierStopOffsetClass(
  tierIndex: number,
  maxTierIndex: number,
): string {
  if (tierIndex === maxTierIndex) return "-translate-x-full";
  return "-translate-x-1/2";
}

/** Map a pointer position on the track (0–100%) to the nearest tier index. */
export function pricingSliderTierIndexFromPercent(
  percent: number,
  tierCount: number,
): number {
  if (tierCount <= 0) return 0;
  const maxIndex = tierCount - 1;
  const clamped = Math.min(100, Math.max(0, percent));

  for (let index = 0; index <= maxIndex; index++) {
    const stop = pricingSliderTierStopPercent(index, tierCount);
    const prevStop =
      index === 0 ? 0 : pricingSliderTierStopPercent(index - 1, tierCount);
    const nextStop =
      index === maxIndex
        ? 100
        : pricingSliderTierStopPercent(index + 1, tierCount);
    const lower = (prevStop + stop) / 2;
    const upper = (stop + nextStop) / 2;

    if (clamped >= lower && clamped <= upper) {
      return index;
    }
  }

  return maxIndex;
}

/** Evenly spaced scale labels including the visual "0" anchor at the start. */
export function pricingSliderScaleStopPercent(
  scaleIndex: number,
  scaleCount: number,
): number {
  if (scaleCount <= 1) return 0;
  return (scaleIndex / (scaleCount - 1)) * 100;
}

export function pricingSliderScaleStopOffsetClass(
  scaleIndex: number,
  maxScaleIndex: number,
): string {
  if (scaleIndex === 0) return "translate-x-0";
  if (scaleIndex === maxScaleIndex) return "-translate-x-full";
  return "-translate-x-1/2";
}
