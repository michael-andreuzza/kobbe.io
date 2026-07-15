import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowRight01Icon, Search01Icon } from "@hugeicons/core-free-icons";
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
        "border-border bg-background text-muted-foreground hover:bg-muted flex h-8 w-full items-center gap-2 rounded-md border px-2.5 text-left text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      aria-label="Search docs"
    >
      <HugeiconsIcon
        icon={Search01Icon}
        strokeWidth={1.7}
        className="size-4 shrink-0"
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate">Search docs…</span>
      <kbd className="bg-muted text-muted-foreground shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.65rem] leading-none">
        {shortcutLabel}
      </kbd>
    </button>
  );
}

export function DocsCommandSearch({
  items,
  hideTrigger = false,
}: DocsCommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () => filterDocsSearchItems(items, query),
    [items, query],
  );
  const groupedItems = useMemo(
    () => groupDocsSearchItems(filteredItems),
    [filteredItems],
  );
  const flatItems = useMemo(
    () => flattenGroupedDocsSearchItems(groupedItems),
    [groupedItems],
  );

  const close = () => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const openSearch = () => {
    setQuery("");
    setSelectedIndex(0);
    setOpen(true);
  };

  const navigateTo = (href: string) => {
    close();
    window.location.assign(href);
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
      flatItems.length === 0 ? 0 : Math.min(current, flatItems.length - 1),
    );
  }, [flatItems.length, query]);

  useEffect(() => {
    if (!open || !listRef.current) {
      return;
    }

    const selected = listRef.current.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    selected?.scrollIntoView({ block: "nearest" });
  }, [open, selectedIndex, flatItems]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (flatItems.length === 0) {
        return;
      }
      setSelectedIndex((current) => (current + 1) % flatItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (flatItems.length === 0) {
        return;
      }
      setSelectedIndex(
        (current) => (current - 1 + flatItems.length) % flatItems.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) {
        navigateTo(item.href);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  let runningIndex = -1;

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
          <Dialog.Backdrop className="bg-background/50 fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            data-lenis-prevent
            onWheel={(event) => {
              event.stopPropagation();
            }}
            className="bg-background fixed top-[min(18%,7rem)] left-1/2 z-50 flex w-[min(36rem,calc(100vw-2rem))] max-h-[min(32rem,calc(100svh-6rem))] -translate-x-1/2 flex-col overflow-hidden rounded-xl border-0 shadow-lg outline-none"
          >
            <div className="flex items-center gap-2 px-3 py-2.5">
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={1.7}
                className="text-muted-foreground size-4 shrink-0"
                aria-hidden
              />
              <Input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search docs…"
                aria-label="Search docs"
                className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
              <kbd className="bg-muted text-muted-foreground shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.65rem] leading-none">
                Esc
              </kbd>
            </div>

            <div
              ref={listRef}
              data-lenis-prevent
              className="min-h-0 flex-1 overscroll-y-contain overflow-y-auto p-2"
              role="listbox"
              aria-label="Docs search results"
              onWheel={(event) => {
                event.stopPropagation();
              }}
            >
              {flatItems.length === 0 ? (
                <p className="text-muted-foreground px-2 py-8 text-center text-sm">
                  No docs matched your search.
                </p>
              ) : (
                groupedItems.map((group) => (
                  <div key={group.category} className="not-first:mt-3">
                    <p className="text-muted-foreground px-2 py-1 text-[0.65rem] font-medium tracking-wide uppercase">
                      {group.category}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        runningIndex += 1;
                        const itemIndex = runningIndex;
                        const isSelected = itemIndex === selectedIndex;

                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              data-selected={isSelected ? "true" : undefined}
                              role="option"
                              aria-selected={isSelected}
                              onMouseEnter={() => {
                                setSelectedIndex(itemIndex);
                              }}
                              onClick={() => {
                                navigateTo(item.href);
                              }}
                              className={cn(
                                "hover:bg-muted flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors outline-none",
                                isSelected && "bg-muted",
                              )}
                            >
                              <span className="min-w-0 flex-1">
                                <span className="text-foreground block text-sm font-medium">
                                  {item.title}
                                </span>
                                <span className="text-muted-foreground mt-0.5 line-clamp-2 text-xs text-balance">
                                  {item.description}
                                </span>
                              </span>
                              <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                strokeWidth={1.7}
                                className="text-muted-foreground mt-0.5 size-4 shrink-0"
                                aria-hidden
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className="text-muted-foreground flex items-center justify-between gap-3 px-3 py-2 text-[0.65rem]">
              <span className="inline-flex items-center gap-1.5">
                <kbd className="bg-muted rounded px-1 py-0.5 font-mono">↑</kbd>
                <kbd className="bg-muted rounded px-1 py-0.5 font-mono">↓</kbd>
                <span>to move</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <kbd className="bg-muted rounded px-1 py-0.5 font-mono">
                  Enter
                </kbd>
                <span>to open</span>
              </span>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default DocsCommandSearch;
