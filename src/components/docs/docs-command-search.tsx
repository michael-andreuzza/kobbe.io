import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowLeft02Icon,
  ArrowDownRight01Icon,
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
  iconOnly = false,
}: {
  className?: string;
  /** Square search button, for the mobile bar where a fake field with a
   * keyboard shortcut makes no sense. */
  iconOnly?: boolean;
}) {
  const shortcutLabel = useDocsSearchShortcutLabel();

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={openDocsSearch}
        className={cn(
          "border-border bg-background text-muted-foreground hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors outline-none",
          className,
        )}
        aria-label="Find"
      >
        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={1.7}
          className="size-4"
          aria-hidden
        />
      </button>
    );
  }

  return (
    // Quiet field: white box on the light canvas; on dark panels use
    // bg-background so only the border outlines the field.
    <button
      type="button"
      onClick={openDocsSearch}
      className={cn(
        "border-border bg-background text-muted-foreground hover:text-foreground flex h-8 w-full items-center gap-2 rounded-md border px-2.5 text-left text-xs transition-colors outline-none",
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
      <kbd className="text-muted-foreground/60 pointer-coarse:hidden shrink-0 font-mono text-[0.65rem] leading-none">
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
    const term = query.trim();
    close();
    if (!term) {
      window.location.assign(href);
      return;
    }
    // Kobbe site search reads the term from `?q=` on the page we open.
    const url = new URL(href, window.location.href);
    url.searchParams.set("q", term);
    window.location.assign(url.toString());
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
        className={cn(
          "flex h-10 w-full cursor-default items-center rounded-md px-3 text-left transition-colors outline-none",
          isSelected && "bg-surface/8",
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
          <ItemIcon item={item} />
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate text-sm font-medium transition-colors",
                isSelected ? "text-surface" : "text-surface/70",
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
          <Dialog.Backdrop className="fixed inset-0 z-50" />
          <Dialog.Popup
            onWheel={(event) => {
              event.stopPropagation();
            }}
            className="bg-dark-background text-surface fixed top-[min(22%,9rem)] left-1/2 z-50 flex max-h-[min(32rem,calc(100svh-6rem))] w-full max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-lg shadow-lg outline-none max-sm:w-[calc(100vw-2rem)]"
          >
            <div className="flex min-h-0 flex-col">
              <div className="border-surface/10 flex h-16 shrink-0 items-center gap-3 border-b px-5">
                {activeGroup && !isSearching ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-surface/60 hover:text-surface inline-flex size-5 shrink-0 items-center justify-center transition-colors outline-none"
                    aria-label="Back to categories"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft02Icon}
                      strokeWidth={1.7}
                      className="size-5"
                      aria-hidden
                    />
                  </button>
                ) : (
                  <HugeiconsIcon
                    icon={Search01Icon}
                    strokeWidth={1.7}
                    className="text-surface/60 pointer-events-none size-5 shrink-0"
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
                  className="text-surface placeholder:text-surface/40 h-8 min-w-0 flex-1 bg-transparent text-base font-medium leading-tight outline-none"
                />
              </div>

              <div
                ref={listRef}
                className="max-h-[min(22rem,calc(100svh-14rem))] min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-2 scrollbar-none!"
                role="listbox"
                aria-label="Search results"
                onWheel={(event) => {
                  event.stopPropagation();
                }}
              >
                {listEntries.length === 0 ? (
                  <p className="text-surface/50 px-3 py-3 text-sm">
                    No pages matched your search.
                  </p>
                ) : isSearching ? (
                  searchGroups.map((group) => (
                    <div key={group.category} className="pb-2">
                      {/* Mega menu column labels: quiet, no uppercase. */}
                      <p className="text-surface/50 px-3 pt-2 pb-1 text-xs font-medium">
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
                  <div className="pb-2">
                    <p className="text-surface/50 px-3 pt-2 pb-1 text-xs font-medium">
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
                  <div className="pb-2">
                    <p className="text-surface/50 px-3 pt-2 pb-1 text-xs font-medium">
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
                                "flex h-10 w-full cursor-default items-center gap-2 rounded-md px-3 text-left text-sm font-medium transition-colors outline-none",
                                isSelected
                                  ? "bg-surface/8 text-surface"
                                  : "text-surface/70",
                              )}
                            >
                              <span className="min-w-0 flex-1 truncate">
                                {entry.category}
                              </span>
                              <HugeiconsIcon
                                icon={ArrowDownRight01Icon}
                                strokeWidth={1.7}
                                className={cn(
                                  "text-surface/70 size-4 shrink-0 transition-opacity",
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

            {/* Quiet hint line, no bordered key chips. Keyboard-only, so
                touch screens skip it. */}
            <div className="border-surface/10 text-surface/50 pointer-coarse:hidden flex items-center justify-between gap-3 border-t px-5 py-3 text-xs">
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
