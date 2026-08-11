import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function tabsChromeButtonClass(active = false): string {
  return cn(
    "rounded transition-colors",
    active
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground/80",
  );
}

export function TabsChrome(props: {
  tabs: string[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  label: string;
  trailing?: ReactNode;
}) {
  const baseId = useId();
  return (
    <div
      className="flex max-w-full flex-wrap items-center gap-2 text-xs font-medium sm:gap-3 sm:text-xs"
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
          className={tabsChromeButtonClass(index === props.activeIndex)}
        >
          {tab}
        </button>
      ))}
      {props.trailing}
    </div>
  );
}
