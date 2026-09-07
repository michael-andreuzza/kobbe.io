import { navigate } from "astro:transitions/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type DocsPageSelectGroup = {
  category: string;
  items: { href: string; label: string; isActive: boolean }[];
};

/**
 * Mobile docs navigator: the whole docs tree in one Select, grouped by
 * category, with the current page selected. Picking a page navigates through
 * the ClientRouter so swaps stay SPA-style.
 */
export function DocsPageSelect({
  groups,
  className,
}: {
  groups: DocsPageSelectGroup[];
  className?: string;
}) {
  const items = groups.flatMap((group) =>
    group.items.map((item) => ({ value: item.href, label: item.label })),
  );
  const current = groups
    .flatMap((group) => group.items)
    .find((item) => item.isActive)?.href;

  return (
    <Select
      items={items}
      value={current ?? null}
      onValueChange={(value) => {
        if (typeof value === "string" && value !== current) navigate(value);
      }}
    >
      <SelectTrigger
        aria-label="Docs page"
        className={cn("text-xs", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group) => (
          <SelectGroup key={group.category}>
            <SelectLabel>{group.category}</SelectLabel>
            {group.items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DocsPageSelect;
