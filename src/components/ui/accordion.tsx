import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-border border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "text-foreground focus-visible:ring-ring/50 hover:text-muted-foreground flex flex-1 items-center justify-between gap-3 py-4 text-left text-sm font-semibold transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden opacity-100 transition-[height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionPanel, AccordionTrigger };
