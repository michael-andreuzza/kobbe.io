import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BrandLogo } from "@/components/foundations/brand-logo";
import {
  filterDocsSearchItems,
  flattenGroupedDocsSearchItems,
  groupDocsSearchItems,
  type DocsSearchItem,
} from "@/lib/docs-search";
import { cn } from "@/lib/utils";

export const DOCS_SEARCH_OPEN_EVENT = "kobbe:docs-search-open";

type DocsCommandSearchProps = {
  items: DocsSearchItem[];
  /** When true, only renders the dialog and keyboard shortcut (no trigger button). */
  hideTrigger?: boolean;
};

type SearchListEntry =
  { type: "group"; category: string } | { type: "item"; item: DocsSearchItem };

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  );
}

/** Plain `F` opens Find on every platform (⌘K/Ctrl K still works, unlabeled). */
export function useDocsSearchShortcutLabel() {
  return "F";
}

export function openDocsSearch() {
  window.dispatchEvent(new Event(DOCS_SEARCH_OPEN_EVENT));
}

export function DocsCommandSearchTrigger({
  className,
}: {
  className?: string;
}) {
  const shortcutLabel = useDocsSearchShortcutLabel();

  return (
    // Quiet field: white box on the light canvas; inside inverted panels
    // bg-card matches the panel so only the border outlines the field.
    <button
      type="button"
      onClick={openDocsSearch}
      className={cn(
        "border-border bg-card text-muted-foreground hover:text-foreground flex h-8 w-full items-center gap-2 rounded-md border px-2.5 text-left text-xs transition-colors outline-none",
        className,
      )}
      aria-label="Find"
    >
      <HugeiconsIcon
        icon={Search01Icon}
        strokeWidth={1.7}
        className="size-4 shrink-0"
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate">Find...</span>
      <kbd className="text-muted-foreground/60 shrink-0 font-mono text-[0.65rem] leading-none">
        {shortcutLabel}
      </kbd>
    </button>
  );
}

function ItemIcon({ item }: { item: DocsSearchItem }) {
  if (!item.logo) {
    return null;
  }

  return (
    <BrandLogo
      src={item.logo.src}
      className="size-4 shrink-0 rounded-sm object-contain"
      width={16}
      height={16}
    />
  );
}

export function DocsCommandSearch({
  items,
  hideTrigger = false,
}: DocsCommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allGroupedItems = useMemo(() => groupDocsSearchItems(items), [items]);
  const isSearching = query.trim().length > 0;

  const searchGroups = useMemo(
    () => groupDocsSearchItems(filterDocsSearchItems(items, query)),
    [items, query],
  );

  const listEntries = useMemo((): SearchListEntry[] => {
    if (isSearching) {
      return flattenGroupedDocsSearchItems(searchGroups).map((item) => ({
        type: "item",
        item,
      }));
    }

    if (activeGroup) {
      const group = allGroupedItems.find(
        (entry) => entry.category === activeGroup,
      );
      return (group?.items ?? []).map((item) => ({ type: "item", item }));
    }

    return allGroupedItems.map((group) => ({
      type: "group",
      category: group.category,
    }));
  }, [activeGroup, allGroupedItems, isSearching, searchGroups]);

  const resetBrowseState = () => {
    setActiveGroup(null);
    setSelectedIndex(0);
  };

  const close = () => {
    setOpen(false);
    setQuery("");
    resetBrowseState();
  };

  const openSearch = () => {
    setQuery("");
    resetBrowseState();
    setOpen(true);
  };

  const goBack = () => {
    setActiveGroup(null);
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  const navigateTo = (href: string) => {
    close();
    window.location.assign(href);
  };

  const activateEntry = (entry: SearchListEntry | undefined) => {
    if (!entry) {
      return;
    }

    if (entry.type === "group") {
      setActiveGroup(entry.category);
      setSelectedIndex(0);
      return;
    }

    navigateTo(entry.item.href);
  };

  useEffect(() => {
    const onOpen = () => {
      openSearch();
    };

    window.addEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Plain `F` opens Find (Vercel-style); ⌘K/Ctrl K kept as a fallback.
      const plainF =
        event.key.toLowerCase() === "f" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;
      const cmdK =
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        !event.altKey;
      if ((plainF || cmdK) && !isEditableTarget(event.target)) {
        event.preventDefault();
        if (open) {
          close();
          return;
        }
        openSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    setSelectedIndex((current) =>
      listEntries.length === 0 ? 0 : Math.min(current, listEntries.length - 1),
    );
  }, [listEntries.length, query, activeGroup]);

  useEffect(() => {
    if (!open || !listRef.current) {
      return;
    }

    const selected = listRef.current.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    selected?.scrollIntoView({ block: "nearest" });
  }, [open, selectedIndex, listEntries]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (listEntries.length === 0) {
        return;
      }
      setSelectedIndex((current) => (current + 1) % listEntries.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (listEntries.length === 0) {
        return;
      }
      setSelectedIndex(
        (current) => (current - 1 + listEntries.length) % listEntries.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      activateEntry(listEntries[selectedIndex]);
      return;
    }

    if (event.key === "Backspace" && query.length === 0 && activeGroup) {
      event.preventDefault();
      goBack();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      if (activeGroup && !isSearching) {
        goBack();
        return;
      }
      close();
    }
  };

  const selectedEntry = listEntries[selectedIndex];
  const enterLabel =
    selectedEntry?.type === "group" && !isSearching ? "Browse" : "Open";

  const renderItemRow = (
    item: DocsSearchItem,
    index: number,
    isSelected: boolean,
  ) => (
    <li key={item.id}>
      <button
        type="button"
        data-selected={isSelected ? "true" : undefined}
        role="option"
        aria-selected={isSelected}
        onMouseEnter={() => {
          setSelectedIndex(index);
        }}
        onClick={() => {
          navigateTo(item.href);
        }}
        className="flex min-h-8 w-full cursor-default items-center py-1.5 text-left text-xs leading-snug transition-colors outline-none"
      >
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
          <ItemIcon item={item} />
          <span className="min-w-0">
            {/* Mega menu link states: selected brightens, the rest stay gray. */}
            <span
              className={cn(
                "block truncate text-sm transition-colors",
                isSelected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.title}
            </span>
          </span>
        </span>
      </button>
    </li>
  );

  return (
    <>
      {hideTrigger ? null : <DocsCommandSearchTrigger className="mb-3" />}

      <Dialog.Root
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            close();
            return;
          }
          openSearch();
        }}
      >
        <Dialog.Portal>
          {/* Same soft page blur as the mega menu overlay, no dark scrim. */}
          <Dialog.Backdrop className="bg-background/1 fixed inset-0 z-50 backdrop-blur transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
          <Dialog.Popup
            onWheel={(event) => {
              event.stopPropagation();
            }}
            className="inverted bg-background text-foreground fixed top-[min(22%,9rem)] left-1/2 z-50 flex max-h-[min(30rem,calc(100svh-6rem))] w-full max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-lg shadow-lg outline-none max-sm:w-[calc(100vw-2rem)]"
          >
            <div className="flex min-h-0 flex-col p-4">
              {/* Light sand field on the carbon panel, like the ToC box. */}
              <div className="uninverted bg-background flex h-14 shrink-0 items-center gap-2.5 rounded-md px-3">
                {activeGroup && !isSearching ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-muted-foreground hover:text-foreground inline-flex size-5 shrink-0 items-center justify-center transition-colors outline-none"
                    aria-label="Back to categories"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft02Icon}
                      strokeWidth={1.7}
                      className="size-4"
                      aria-hidden
                    />
                  </button>
                ) : (
                  <HugeiconsIcon
                    icon={Search01Icon}
                    strokeWidth={1.7}
                    className="text-muted-foreground pointer-events-none size-4 shrink-0"
                    aria-hidden
                  />
                )}
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveGroup(null);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder={
                    activeGroup && !isSearching
                      ? `Find in ${activeGroup}...`
                      : "Find docs and pages..."
                  }
                  aria-label="Find"
                  className="text-foreground placeholder:text-muted-foreground/60 h-6 min-w-0 flex-1 bg-transparent text-sm leading-tight outline-none"
                />
              </div>

              <div
                ref={listRef}
                className="mt-3 max-h-[min(20rem,calc(100svh-14rem))] min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
                role="listbox"
                aria-label="Search results"
                onWheel={(event) => {
                  event.stopPropagation();
                }}
              >
                {listEntries.length === 0 ? (
                  <p className="text-muted-foreground/60 py-2.5 text-sm">
                    No pages matched your search.
                  </p>
                ) : isSearching ? (
                  searchGroups.map((group) => (
                    <div key={group.category} className="py-1.5">
                      {/* Mega menu column labels: quiet, no uppercase. */}
                      <p className="text-muted-foreground/60 pb-1 text-sm">
                        {group.category}
                      </p>
                      <ul>
                        {group.items.map((item) => {
                          const itemIndex = listEntries.findIndex(
                            (entry) =>
                              entry.type === "item" &&
                              entry.item.id === item.id,
                          );
                          return renderItemRow(
                            item,
                            itemIndex,
                            itemIndex === selectedIndex,
                          );
                        })}
                      </ul>
                    </div>
                  ))
                ) : activeGroup ? (
                  <div className="py-1.5">
                    <p className="text-muted-foreground/60 pb-1 text-sm">
                      {activeGroup}
                    </p>
                    <ul>
                      {listEntries.map((entry, index) =>
                        entry.type === "item"
                          ? renderItemRow(
                              entry.item,
                              index,
                              index === selectedIndex,
                            )
                          : null,
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="py-1.5">
                    <p className="text-muted-foreground/60 pb-1 text-sm">
                      Browse
                    </p>
                    <ul>
                      {listEntries.map((entry, index) => {
                        if (entry.type !== "group") {
                          return null;
                        }
                        const isSelected = index === selectedIndex;
                        return (
                          <li key={entry.category}>
                            <button
                              type="button"
                              data-selected={isSelected ? "true" : undefined}
                              role="option"
                              aria-selected={isSelected}
                              onMouseEnter={() => {
                                setSelectedIndex(index);
                              }}
                              onClick={() => {
                                activateEntry(entry);
                              }}
                              className={cn(
                                "flex min-h-8 w-full cursor-default items-center gap-2 py-1.5 text-left text-sm transition-colors outline-none",
                                isSelected
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                            >
                              <span className="min-w-0 flex-1 truncate">
                                {entry.category}
                              </span>
                              <HugeiconsIcon
                                icon={ArrowRight02Icon}
                                strokeWidth={1.7}
                                className={cn(
                                  "text-muted-foreground size-4 shrink-0 transition-opacity",
                                  isSelected ? "opacity-100" : "opacity-0",
                                )}
                                aria-hidden
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Quiet hint line, no bordered key chips. */}
            <div className="text-muted-foreground/60 flex items-center justify-between gap-3 p-4 text-xs">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="hidden items-center gap-1.5 sm:inline-flex">
                  <kbd className="font-mono">↵</kbd>
                  {enterLabel}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5">
                <kbd className="font-mono">esc</kbd>
                Close
              </span>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default DocsCommandSearch;
