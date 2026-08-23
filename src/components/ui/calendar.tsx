import {
  DayPicker,
  getDefaultClassNames,
  type DayPickerProps,
} from "react-day-picker";

import { cn } from "@/lib/utils";

import "react-day-picker/style.css";
import "@/styles/calendar-rdp.css";

type CalendarProps = DayPickerProps;

/**
 * shadcn-style wrapper around [react-day-picker](https://daypicker.dev) (v9);
 * same setup as the app. `calendar-rdp.css` maps the package tokens to ours.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("calendar-rdp p-3", className)}
      classNames={{
        ...defaultClassNames,
        caption_label: cn(
          "text-xs font-medium",
          defaultClassNames.caption_label,
        ),
        weekday: cn("text-muted-foreground", defaultClassNames.weekday),
        chevron: cn("size-4", defaultClassNames.chevron),
        button_next: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground",
          defaultClassNames.button_next,
        ),
        button_previous: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground",
          defaultClassNames.button_previous,
        ),
        day_button: cn("font-normal", defaultClassNames.day_button),
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
