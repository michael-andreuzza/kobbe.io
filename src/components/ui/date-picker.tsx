import { useEffect, useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Calendar } from "@/components/ui/calendar";
import { fieldChromeClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  /** The hidden input's id, so plain scripts can read/listen to the value. */
  id?: string;
  name?: string;
  /** Initial value as `yyyy-mm-dd`. */
  defaultValue?: string;
  placeholder?: string;
  className?: string;
};

function parseIsoDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

/** Local-date ISO string; avoids the timezone shift of `toISOString()`. */
function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Fixed locale so the server and client render the same label. */
function formatLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Field-styled date picker: a trigger with the input chrome that opens a
 * calendar popover. The value is mirrored into a hidden input (with a
 * bubbling `input` event) so non-React scripts can consume it.
 */
export function DatePicker({
  id,
  name,
  defaultValue,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(() =>
    parseIsoDate(defaultValue),
  );
  const [open, setOpen] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Let listeners (the DPA sync script) know about both the initial value
  // and every selection, since React state changes fire no native events.
  useEffect(() => {
    hiddenInputRef.current?.dispatchEvent(
      new Event("input", { bubbles: true }),
    );
  }, [date]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <input
        ref={hiddenInputRef}
        type="hidden"
        id={id}
        name={name}
        value={date ? toIsoDate(date) : ""}
        readOnly
      />
      <Popover.Trigger
        className={cn(
          fieldChromeClassName,
          "h-9 cursor-pointer items-center justify-between gap-2 px-3 text-left leading-tight",
          className,
        )}
      >
        <span className={cn(!date && "text-muted-foreground")}>
          {date ? formatLabel(date) : placeholder}
        </span>
        <HugeiconsIcon
          icon={Calendar03Icon}
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden="true"
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={6} align="start" className="z-90">
          <Popover.Popup
            className={cn(
              "bg-background rounded-lg shadow-lg outline-none",
              "transition-[opacity,transform] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
            )}
          >
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              onSelect={(next) => {
                setDate(next);
                if (next) setOpen(false);
              }}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
