import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { pricingTiers } from "@/components/sections/pricing/pricing-tiers";

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
  const maxIndex = pricingTiers.length - 1;
  const stepCount = pricingTiers.length;
  // Ticks sit at cell centers, so the fill edge stops there; at the top
  // tier the bar fills completely instead of stopping at the last tick.
  const fillPercent =
    value === maxIndex ? "100%" : `${((value + 0.5) / stepCount) * 100}%`;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="group relative min-w-0">
        <div className="bg-muted relative h-11 w-full overflow-hidden rounded-lg">
          <motion.div
            aria-hidden="true"
            className="bg-primary absolute inset-y-0 left-0 rounded-r-lg"
            initial={false}
            animate={{ width: fillPercent }}
            transition={reduceMotion ? { duration: 0 } : fillSpring}
          />

          <div
            className="relative grid h-full items-center"
            style={{
              gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))`,
            }}
            aria-hidden="true"
          >
            {pricingTiers.map((tier, index) => (
              <div key={tier.key} className="flex justify-center">
                <span
                  className={cn(
                    "h-2.5 w-px rounded-full transition-colors duration-200",
                    index <= value
                      ? "bg-transparent"
                      : "bg-muted-foreground/45",
                  )}
                />
              </div>
            ))}

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2"
              initial={false}
              animate={{ left: fillPercent }}
              transition={reduceMotion ? { duration: 0 } : fillSpring}
            >
              <span className="bg-background block h-7 w-1.5 -translate-x-[calc(100%+8px)] rounded-full shadow-sm" />
            </motion.span>
          </div>
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
          className="absolute inset-0 h-full w-full cursor-grab appearance-none bg-transparent opacity-0 active:cursor-grabbing"
        />
      </div>
    </div>
  );
}

export default PricingVolumeSlider;
