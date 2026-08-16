import {
  SiteMegaMenuPlainLink,
  MegaMenuColumnTitle,
} from "@/components/global/site-mega-menu-link";
import {
  siteMegaMenuGroups,
  type MegaMenuColumn,
} from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

function compactGridClassName(layout: MegaMenuColumn["layout"]) {
  switch (layout) {
    case "compact-grid-4":
      return "grid grid-cols-2 gap-x-1 gap-y-1 sm:grid-cols-3 lg:grid-cols-4";
    case "compact-grid-3":
      return "grid grid-cols-2 gap-x-1 gap-y-1 sm:grid-cols-3";
    case "compact-grid":
      return "grid grid-cols-2 gap-x-1 gap-y-1";
    default:
      return "grid gap-y-1";
  }
}

function MegaMenuColumnSection({ column }: { column: MegaMenuColumn }) {
  const isCompactGrid = column.layout?.startsWith("compact-grid");
  const isCompact = column.layout === "compact" || isCompactGrid;

  return (
    <div>
      <MegaMenuColumnTitle column={column} className="px-2.5" />
      <ul className={cn("mt-3", compactGridClassName(column.layout))}>
        {column.links.map((link) => (
          <li key={link.id}>
            <SiteMegaMenuPlainLink link={link} compact={isCompact} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteMegaMenuPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
      {siteMegaMenuGroups.map((group) => (
        <div key={group.id} className="space-y-6 lg:space-y-12">
          {group.columns.map((column) => (
            <MegaMenuColumnSection key={column.title} column={column} />
          ))}
        </div>
      ))}
    </div>
  );
}
