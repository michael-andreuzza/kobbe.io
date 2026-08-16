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
