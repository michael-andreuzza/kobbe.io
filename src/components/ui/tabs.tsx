import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  indicatorId: string;
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

type TabsListProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  value: string;
};

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  value: string;
};

function Tabs({
  className,
  defaultValue = "",
  value,
  onValueChange,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const indicatorId = React.useId();
  const currentValue = value ?? internalValue;

  const setValue = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [onValueChange, value],
  );

  return (
    <TabsContext.Provider
      value={{ indicatorId, value: currentValue, setValue }}
    >
      <div
        data-slot="tabs"
        className={cn("flex w-full flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={cn(
        "border-border flex max-w-full flex-wrap items-center gap-x-6 gap-y-2 lg:border-b",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  children,
  className,
  onClick,
  type = "button",
  value,
  ...props
}: TabsTriggerProps) {
  const tabs = useTabsContext("TabsTrigger");
  const active = tabs.value === value;

  return (
    <button
      data-slot="tabs-trigger"
      type={type}
      role="tab"
      aria-selected={active}
      data-active={active ? "" : undefined}
      className={cn(
        "text-muted-foreground hover:text-foreground focus-visible:text-foreground relative -mb-px inline-flex shrink-0 items-center justify-center py-3 text-sm font-medium whitespace-nowrap transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
        active && "text-foreground",
        className,
      )}
      onClick={(event) => {
        tabs.setValue(value);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
      {active ? (
        <motion.span
          layoutId={`${tabs.indicatorId}-active-tab-border`}
          className="bg-foreground absolute inset-x-0 bottom-0 h-px"
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 34,
            mass: 0.8,
          }}
        />
      ) : null}
    </button>
  );
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const tabs = useTabsContext("TabsContent");

  if (tabs.value !== value) {
    return null;
  }

  return (
    <div
      data-slot="tabs-content"
      role="tabpanel"
      className={cn("mt-8 outline-none", className)}
      {...props}
    />
  );
}

function useTabsContext(componentName: string) {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside Tabs.`);
  }

  return context;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
