import { SiteMegaMenuPlainLink, MegaMenuColumnTitle } from "@/components/global/site-mega-menu-link";
import { siteMegaMenuGroups, type MegaMenuColumn } from "@/lib/site-mega-menu";
import { cn } from "@/lib/utils";

function MegaMenuColumnSection({ column }: { column: MegaMenuColumn }) {
  const isCompactGrid = column.layout === "compact-grid";
  const isCompact = column.layout === "compact" || isCompactGrid;

  return (
    <div>
      <MegaMenuColumnTitle column={column} className="px-2.5" />
      <ul
        className={cn(
          "mt-3",
          isCompactGrid
            ? "grid grid-cols-2 gap-x-1 gap-y-1"
            : "grid gap-y-1",
        )}
      >
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
    <>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        {siteMegaMenuGroups.map((group) => (
          <div key={group.id} className="space-y-12">
            {group.columns.map((column) => (
              <MegaMenuColumnSection key={column.title} column={column} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
