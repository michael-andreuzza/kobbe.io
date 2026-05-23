import { useId } from "react";

import { cn } from "@/lib/utils";

export function TabsChrome(props: {
  tabs: string[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  label: string;
}) {
  const baseId = useId();
  return (
    <div
      className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium sm:text-xs"
      role="tablist"
      aria-label={props.label}
    >
      {props.tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          role="tab"
          id={`${baseId}-t-${index}`}
          tabIndex={index === props.activeIndex ? 0 : -1}
          aria-selected={index === props.activeIndex}
          onClick={() => props.onActiveIndexChange(index)}
          className={cn(
            "rounded transition-colors",
            index === props.activeIndex
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/80",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
