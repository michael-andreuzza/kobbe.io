import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Shared chrome for `Input`, `Textarea`, and field-style triggers
 * (e.g. the date picker). Matches the app's control fields: transparent
 * fill, `--input` border, brand focus ring.
 */
export const fieldChromeClassName = cn(
  "border-input flex w-full min-w-0 rounded-md border bg-transparent text-sm",
  "text-foreground placeholder:text-muted-foreground",
  "transition-all outline-none focus-visible:border-brand/40 focus-visible:ring-3 focus-visible:ring-brand/10",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
);

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function Input({ className, type, ...props }, ref) {
    return (
      <input
        ref={ref}
        data-slot="input"
        type={type}
        className={cn(fieldChromeClassName, "h-9 px-3 leading-tight", className)}
        {...props}
      />
    );
  },
);

export { Input };
