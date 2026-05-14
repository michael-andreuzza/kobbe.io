import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = Omit<
  React.ComponentProps<typeof BaseSlider.Root>,
  "className" | "children"
> & {
  className?: string;
};

function Slider({ className, defaultValue, value, ...props }: SliderProps) {
  const sliderValue = value ?? defaultValue;
  const isRange = Array.isArray(sliderValue);

  return (
    <BaseSlider.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-60",
        className,
      )}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <BaseSlider.Control
        data-slot="slider-control"
        className="relative flex h-10 w-full items-center"
      >
        <BaseSlider.Track
          data-slot="slider-track"
          className="bg-muted relative h-10 w-full overflow-hidden rounded-lg"
        >
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className="bg-border h-full rounded-lg"
          />
        </BaseSlider.Track>
        <BaseSlider.Thumb
          data-slot="slider-thumb"
          index={0}
          className="bg-foreground/60 block h-6 w-1 rounded-full transition-shadow data-disabled:pointer-events-none"
        />
        {isRange ? (
          <BaseSlider.Thumb
            data-slot="slider-thumb"
            index={1}
            className="bg-foreground/60 block h-6 w-1 rounded-full transition-shadow data-disabled:pointer-events-none"
          />
        ) : null}
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export { Slider };
