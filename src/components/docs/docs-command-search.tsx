import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Input } from "@/components/ui/input";
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
  | { type: "group"; category: string }
  | { type: "item"; item: DocsSearchItem };

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  );
}

export function getDocsSearchShortcutLabel() {
  if (typeof navigator === "undefined") {
    return "⌘K";
  }

  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘K" : "Ctrl K";
}

export function openDocsSearch() {
  window.dispatchEvent(new Event(DOCS_SEARCH_OPEN_EVENT));
}

export function DocsCommandSearchTrigger({
  className,
}: {
  className?: string;
}) {
  const shortcutLabel = getDocsSearchShortcutLabel();

  return (
    <button
      type="button"
      onClick={openDocsSearch}
      className={cn(
        "border-border/70 bg-card/60 text-muted-foreground hover:text-foreground flex h-8 w-full items-center gap-2 rounded-md border px-2.5 text-left text-xs transition-colors outline-none",
        className,
      )}
      aria-label="Search"
    >
      <HugeiconsIcon
        icon={Search01Icon}
        strokeWidth={1.7}
        className="size-4 shrink-0"
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate">Search</span>
      <kbd className="border-border/70 text-muted-foreground shrink-0 rounded border px-1 py-0.5 font-mono text-[0.65rem] leading-none">
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
    <img
      src={item.logo.src}
      alt=""
      className="size-4 shrink-0 rounded-sm object-contain"
      loading="lazy"
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
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey &&
        !event.altKey &&
        !isEditableTarget(event.target)
      ) {
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
    document.documentElement.classList.add("lenis-stopped");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("lenis-stopped");
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
          "flex min-h-8 w-full cursor-default items-center rounded-md py-1.5 pr-1.5 pl-2.5 text-left text-xs leading-snug transition-colors outline-none",
          isSelected && "bg-foreground/6 dark:bg-foreground/10",
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <ItemIcon item={item} />
          <span className="min-w-0">
            <span className="text-foreground block truncate text-xs font-medium">
              {item.title}
            </span>
            {item.description ? (
              <span className="text-muted-foreground mt-0.5 block truncate text-[0.7rem]">
                {item.description}
              </span>
            ) : null}
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
          <Dialog.Backdrop className="bg-foreground/20 fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            data-lenis-prevent
            onWheel={(event) => {
              event.stopPropagation();
            }}
            className="bg-card fixed top-[min(22%,9rem)] left-1/2 z-50 flex max-h-[min(28rem,calc(100svh-6rem))] w-full max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-xl shadow-md outline-none max-sm:w-[calc(100vw-2rem)]"
          >
            <div className="border-border/60 border-b px-3 py-2">
              <div className="border-border/70 bg-background/70 dark:bg-background/40 flex h-8 items-center rounded-md border px-2">
                {activeGroup && !isSearching ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-muted-foreground hover:text-foreground mr-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded transition-colors outline-none"
                    aria-label="Back to categories"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      strokeWidth={1.7}
                      className="size-4"
                      aria-hidden
                    />
                  </button>
                ) : (
                  <HugeiconsIcon
                    icon={Search01Icon}
                    strokeWidth={2}
                    className="text-muted-foreground pointer-events-none mr-1.5 size-4 shrink-0"
                    aria-hidden
                  />
                )}
                <Input
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
                      ? `Search in ${activeGroup}...`
                      : "Search docs and pages..."
                  }
                  aria-label="Search"
                  className="h-8 min-w-0 border-0 bg-transparent px-0 text-sm leading-tight shadow-none focus-visible:ring-0"
                />
              </div>

              <div
                ref={listRef}
                data-lenis-prevent
                className="mt-1 max-h-[min(19rem,calc(100svh-14rem))] min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-1"
                role="listbox"
                aria-label="Search results"
                onWheel={(event) => {
                  event.stopPropagation();
                }}
              >
                {listEntries.length === 0 ? (
                  <p className="text-muted-foreground px-3 py-2.5 text-center text-xs">
                    No pages matched your search.
                  </p>
                ) : isSearching ? (
                  searchGroups.map((group) => (
                    <div key={group.category} className="py-0.5">
                      <p className="text-muted-foreground px-2 pt-1.5 pb-1 text-[0.7rem] font-medium tracking-wide uppercase">
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
                  <div className="py-0.5">
                    <p className="text-muted-foreground px-2 pt-1.5 pb-1 text-[0.7rem] font-medium tracking-wide uppercase">
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
                  <div className="py-0.5">
                    <p className="text-muted-foreground px-2 pt-1.5 pb-1 text-[0.7rem] font-medium tracking-wide uppercase">
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
                                "text-foreground flex min-h-8 w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-1.5 pl-2.5 text-left text-xs font-medium transition-colors outline-none",
                                isSelected &&
                                  "bg-foreground/6 dark:bg-foreground/10",
                              )}
                            >
                              <span className="min-w-0 flex-1 truncate">
                                {entry.category}
                              </span>
                              <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                strokeWidth={1.7}
                                className={cn(
                                  "text-muted-foreground size-3.5 shrink-0 transition-opacity",
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

            <div className="border-border/60 text-muted-foreground flex items-center justify-between gap-3 px-3 py-2 text-[0.7rem]">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <kbd className="border-border/70 rounded border px-1 font-mono">
                    ↑
                  </kbd>
                  <kbd className="border-border/70 rounded border px-1 font-mono">
                    ↓
                  </kbd>
                  Navigate
                </span>
                <span className="hidden items-center gap-1 sm:inline-flex">
                  <kbd className="border-border/70 rounded border px-1 font-mono">
                    ↵
                  </kbd>
                  {enterLabel}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1">
                <kbd className="border-border/70 rounded border px-1 font-mono">
                  Esc
                </kbd>
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
