import { useState, type ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import {
  ArrowDown01Icon,
  ChatGptIcon,
  ClaudeIcon,
  Copy01Icon,
  Note01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type DocsPageActionsProps = {
  markdown: string;
  markdownHref?: string;
  className?: string;
};

const chipClass =
  "border-border bg-background text-muted-foreground hover:text-foreground flex h-8 items-center gap-1.5 border text-xs font-medium whitespace-nowrap transition-colors outline-none";

const itemClass =
  "data-highlighted:bg-muted-surface flex cursor-pointer items-start gap-3 rounded-md px-2.5 py-2 whitespace-nowrap outline-none select-none";

/** Cursor's cube mark, single color so it sits with the line icons. */
function CursorMark() {
  return (
    <svg viewBox="56 50 138 155" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M186.118 89.3203L128.071 55.8073C126.207 54.7309 123.907 54.7309 122.043 55.8073L63.9987 89.3203C62.4318 90.225 61.4644 91.8981 61.4644 93.7103V161.29C61.4644 163.099 62.4318 164.775 63.9987 165.68L122.046 199.193C123.91 200.269 126.21 200.269 128.074 199.193L186.12 165.68C187.687 164.775 188.655 163.102 188.655 161.29V93.7103C188.655 91.9009 187.687 90.225 186.12 89.3203H186.118ZM182.472 96.4191L126.436 193.476C126.057 194.13 125.057 193.862 125.057 193.105V129.553C125.057 128.283 124.378 127.109 123.277 126.471L68.2416 94.6969C67.5876 94.3182 67.8547 93.3179 68.6122 93.3179H180.684C182.275 93.3179 183.27 95.0429 182.474 96.4219H182.472V96.4191Z" />
    </svg>
  );
}

function ItemContent({
  icon,
  title,
  detail,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <>
      <span className="text-muted-foreground mt-0.5 flex size-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-foreground text-[0.8125rem] leading-5 font-medium">
          {title}
        </span>
        <span className="text-muted-foreground text-xs leading-4">{detail}</span>
      </span>
    </>
  );
}

const lineIcon = (icon: typeof Copy01Icon) => (
  <HugeiconsIcon icon={icon} size={16} strokeWidth={1.7} aria-hidden="true" />
);

function askPrompt() {
  const { origin, pathname } = window.location;
  return `Read ${origin}${pathname} so I can ask questions about it.`;
}

/** "Copy page" split button: copies the page as Markdown, with a menu to
 * view the Markdown or open the page in ChatGPT, Claude, or Cursor. */
export function DocsPageActions({
  markdown,
  markdownHref,
  className,
}: DocsPageActionsProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked; nothing useful to show.
    }
  };

  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        onClick={copy}
        className={cn(chipClass, "rounded-l-md px-2.5")}
      >
        <HugeiconsIcon
          icon={copied ? Tick02Icon : Copy01Icon}
          size={14}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        {copied ? "Copied" : "Copy page"}
      </button>
      <Menu.Root>
        <Menu.Trigger
          className={cn(chipClass, "-ml-px rounded-r-md px-1.5")}
          aria-label="More page actions"
        >
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6} align="end" className="z-50">
            <Menu.Popup className="bg-background border-border min-w-60 rounded-lg border p-1 shadow-lg outline-none">
              <Menu.Item className={itemClass} onClick={copy}>
                <ItemContent
                  icon={lineIcon(Copy01Icon)}
                  title="Copy page"
                  detail="Markdown for AI tools"
                />
              </Menu.Item>
              {markdownHref ? (
                <Menu.Item className={itemClass} onClick={() => open(markdownHref)}>
                  <ItemContent
                    icon={lineIcon(Note01Icon)}
                    title="View as Markdown"
                    detail="The page as plain text"
                  />
                </Menu.Item>
              ) : null}
              <Menu.Item
                className={itemClass}
                onClick={() =>
                  open(`https://chatgpt.com/?q=${encodeURIComponent(askPrompt())}`)
                }
              >
                <ItemContent
                  icon={lineIcon(ChatGptIcon)}
                  title="Open in ChatGPT"
                  detail="Ask questions about this page"
                />
              </Menu.Item>
              <Menu.Item
                className={itemClass}
                onClick={() =>
                  open(`https://claude.ai/new?q=${encodeURIComponent(askPrompt())}`)
                }
              >
                <ItemContent
                  icon={lineIcon(ClaudeIcon)}
                  title="Open in Claude"
                  detail="Ask questions about this page"
                />
              </Menu.Item>
              <Menu.Item
                className={itemClass}
                onClick={() =>
                  open(
                    `https://cursor.com/link/prompt?text=${encodeURIComponent(askPrompt())}`,
                  )
                }
              >
                <ItemContent
                  icon={<CursorMark />}
                  title="Open in Cursor"
                  detail="Ask questions about this page"
                />
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
