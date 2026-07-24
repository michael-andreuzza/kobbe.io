import { cn } from "@/lib/utils";
import { pricingTiers } from "@/components/sections/pricing/pricing-tiers";

type PricingVolumeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  valueLabel: string;
  className?: string;
};

export function PricingVolumeSlider({
  value,
  onChange,
  valueLabel,
  className,
}: PricingVolumeSliderProps) {
  const maxIndex = pricingTiers.length - 1;
  const stepCount = pricingTiers.length;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="bg-muted relative min-w-0 flex-1 rounded-xl px-2 py-2">
          <div
            className="grid h-9 items-center"
            style={{
              gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))`,
            }}
            aria-hidden="true"
          >
            {pricingTiers.map((tier, index) => (
              <div key={tier.key} className="flex justify-center">
                {index === value ? (
                  <span className="bg-brand h-9 w-2 rounded-full shadow-[0_0_0_1px_oklch(from_var(--brand)_l_c_h/0.15)]" />
                ) : (
                  <span
                    className={cn(
                      "w-px rounded-full transition-colors duration-200",
                      index < value
                        ? "bg-brand/35 h-4"
                        : "bg-foreground/15 h-3",
                    )}
                  />
                )}
              </div>
            ))}
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
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          />
        </div>
      </div>
    </div>
  );
}

export default PricingVolumeSlider;
