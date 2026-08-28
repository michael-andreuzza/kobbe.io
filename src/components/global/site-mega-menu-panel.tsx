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

/** Reorders a row-major two-column grid so each column reads top-to-bottom
    in the original (alphabetical) order. */
function toColumnMajor(links: MegaMenuColumn["links"]) {
  const rows = Math.ceil(links.length / 2);
  const reordered: typeof links = [];
  for (let row = 0; row < rows; row++) {
    reordered.push(links[row]!);
    const second = links[row + rows];
    if (second) {
      reordered.push(second);
    }
  }
  return reordered;
}

function MegaMenuColumnSection({ column }: { column: MegaMenuColumn }) {
  const isCompactGrid = column.layout?.startsWith("compact-grid");
  const isCompact = column.layout === "compact" || isCompactGrid;
  // Logo grids stay short: featured picks only (the full list lives behind
  // "See all" and in the mobile menu). Columns without featured flags show
  // everything.
  const featured = column.links.filter((link) => link.featured);
  const visible = isCompactGrid && featured.length > 0 ? featured : column.links;
  const links =
    column.layout === "compact-grid" ? toColumnMajor(visible) : visible;

  return (
    <div>
      <MegaMenuColumnTitle column={column} className="px-2.5" />
      <ul className={cn("mt-3", compactGridClassName(column.layout))}>
        {links.map((link) => (
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
