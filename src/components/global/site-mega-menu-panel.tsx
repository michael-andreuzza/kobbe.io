import { siteMegaMenuColumns } from "@/lib/site-mega-menu";

/**
 * The navigation of the mega menu as columns: each group is a muted
 * label with its links stacked underneath, laid out in a grid.
 */
export function SiteMegaMenuColumns() {
  return (
    <nav
      aria-label="Explore"
      className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 xl:grid-cols-5"
    >
      {siteMegaMenuColumns.map((column) => (
        <div key={column.title} className="flex flex-col gap-1.5">
          <p className="text-muted-foreground/60 text-sm">{column.title}</p>
          <ul className="mt-1 flex flex-col gap-1.5">
            {column.links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {column.seeAllHref ? (
              <li>
                <a
                  href={column.seeAllHref}
                  className="text-muted-foreground/60 hover:text-foreground text-sm transition-colors"
                >
                  {column.seeAllLabel ?? "See all"}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/**
 * Solomon-style mega menu: a dark carbon panel with a large typographic
 * header up top and the navigation as plain-text columns at the bottom.
 * No cards, no logos, no descriptions.
 */
export function SiteMegaMenuPanel() {
  return (
    <div className="flex min-h-full flex-col justify-between gap-16">
      <div>
        <p className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Kobbe.
        </p>
        <p className="text-muted-foreground mt-1 text-2xl tracking-tight sm:text-3xl">
          Stop counting visitors. Start counting revenue.
        </p>
      </div>

      <SiteMegaMenuColumns />
    </div>
  );
}
