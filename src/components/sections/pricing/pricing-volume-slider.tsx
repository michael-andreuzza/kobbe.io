import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { pricingTiers } from "@/components/sections/pricing/pricing-tiers";
import {
  pricingSliderScaleStopOffsetClass,
  pricingSliderScaleStopPercent,
  pricingSliderTierStopOffsetClass,
  pricingSliderTierStopPercent,
} from "@/components/sections/pricing/pricing-slider-stops";

type PricingVolumeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
  className?: string;
};

/** Critically damped so the fill glides between stops without overshoot. */
const fillSpring = {
  type: "spring" as const,
  stiffness: 550,
  damping: 45,
};

export function PricingVolumeSlider({
  value,
  onChange,
  valueLabel,
  className,
}: PricingVolumeSliderProps) {
  const reduceMotion = useReducedMotion();
  const tierCount = pricingTiers.length;
  const maxIndex = tierCount - 1;
  const scaleLabels = ["0", ...pricingTiers.map((tier) => tier.events)];
  const maxScaleIndex = scaleLabels.length - 1;
  const stopPercent = pricingSliderTierStopPercent(value, tierCount);
  const fillWidth = value === maxIndex ? "100%" : `${stopPercent}%`;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="group relative h-11 w-full">
        <div className="bg-muted absolute inset-0 overflow-hidden rounded-lg">
          <motion.div
            aria-hidden="true"
            className="bg-primary absolute inset-y-0 left-0 rounded-r-lg"
            initial={false}
            animate={{ width: fillWidth }}
            transition={reduceMotion ? { duration: 0 } : fillSpring}
          />
        </div>

        <div className="relative h-full" aria-hidden="true">
          {pricingTiers.map((tier, index) => (
            <span
              key={tier.key}
              className={cn(
                "absolute top-1/2 z-[1] h-2.5 w-px -translate-y-1/2 rounded-full transition-colors duration-200",
                pricingSliderTierStopOffsetClass(index, maxIndex),
                index <= value ? "bg-transparent" : "bg-muted-foreground/45",
              )}
              style={{
                left: `${pricingSliderTierStopPercent(index, tierCount)}%`,
              }}
            />
          ))}

          <motion.span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2",
              pricingSliderTierStopOffsetClass(value, maxIndex),
            )}
            initial={false}
            animate={{ left: `${stopPercent}%` }}
            transition={reduceMotion ? { duration: 0 } : fillSpring}
          >
            <span className="bg-background block h-7 w-1.5 rounded-full shadow-sm" />
          </motion.span>
        </div>

        <input
          type="range"
          min={0}
          max={maxIndex}
          step={1}
          value={value}
          onChange={(event) => onChange(Number(event.currentTarget.value))}
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          aria-valuenow={value}
          aria-valuetext={`${valueLabel} monthly events`}
          className="absolute inset-0 z-20 h-full w-full cursor-grab appearance-none bg-transparent opacity-0 active:cursor-grabbing"
        />
      </div>

      <div className="relative mt-2 h-4 w-full" aria-hidden="true">
        {scaleLabels.map((label, scaleIndex) => {
          const tierIndex = scaleIndex - 1;
          const isSelected = scaleIndex > 0 && tierIndex === value;

          return (
            <span
              key={label}
              className={cn(
                "absolute text-xs tabular-nums transition-colors duration-200",
                pricingSliderScaleStopOffsetClass(scaleIndex, maxScaleIndex),
                isSelected
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted-foreground",
              )}
              style={{
                left: `${pricingSliderScaleStopPercent(scaleIndex, scaleLabels.length)}%`,
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default PricingVolumeSlider;
