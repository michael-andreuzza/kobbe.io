import type { ReactNode } from "react";

import type { TrafficChartAnnotation } from "./traffic-line-chart";

const noteIconButtonClassName =
  "rounded p-0.5 text-background/50 transition-colors hover:bg-background/10 hover:text-background disabled:opacity-50";
const noteInputClassName =
  "h-6 min-w-0 flex-1 rounded bg-background/15 px-1.5 text-xs text-background outline-none placeholder:text-background/45 focus:bg-background/25";
const noteSubmitClassName =
  "h-6 shrink-0 rounded bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-background/90 disabled:bg-background/25 disabled:text-background/70";
const noteInputCompactClassName =
  "h-5 min-w-0 flex-1 rounded bg-background/15 px-1.5 text-[10px] text-background outline-none placeholder:text-background/45";
const noteSubmitCompactClassName =
  "h-5 shrink-0 rounded bg-background px-1.5 text-[10px] font-medium text-foreground disabled:bg-background/25 disabled:text-background/70";

function NoteIconButton(props: {
  label: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={props.label}
      className={noteIconButtonClassName}
    >
      {props.children}
    </button>
  );
}

function PencilIcon(props: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={props.compact ? "size-2.5" : "size-3"}
      aria-hidden
    >
      <path
        d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12L15.62 4.5a1.5 1.5 0 0 0-2.12 0L3 15v5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m13.5 6.5 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeleteIcon(props: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={props.compact ? "size-2.5" : "size-3"}
      aria-hidden
    >
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7h10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Static note editor for marketing previews; matches the app chart annotation popover. */
export function ChartNoteTooltipEditorPreview(props: {
  day: string;
  annotations: TrafficChartAnnotation[];
  compact?: boolean;
}) {
  const dayNotes = props.annotations.filter(
    (annotation) => annotation.day === props.day,
  );
  const compact = props.compact === true;

  return (
    <div
      className={
        compact
          ? "grid gap-1 border-t border-background/15 pt-1"
          : "grid gap-1.5 border-t border-background/15 pt-1.5"
      }
    >
      {dayNotes.length > 0 ? (
        <ul className="grid gap-1">
          {dayNotes.map((annotation) => (
            <li
              key={annotation.id}
              className="flex items-center gap-1.5 text-background/85"
            >
              <span className="min-w-0 flex-1 truncate">{annotation.label}</span>
              <NoteIconButton
                compact={compact}
                label={`Edit note "${annotation.label}"`}
              >
                <PencilIcon compact={compact} />
              </NoteIconButton>
              <NoteIconButton
                compact={compact}
                label={`Delete note "${annotation.label}"`}
              >
                <DeleteIcon compact={compact} />
              </NoteIconButton>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          readOnly
          value=""
          placeholder="Add a note for this day…"
          aria-label="Note for this day"
          className={compact ? noteInputCompactClassName : noteInputClassName}
        />
        <button
          type="button"
          disabled
          className={compact ? noteSubmitCompactClassName : noteSubmitClassName}
        >
          Add
        </button>
      </div>
    </div>
  );
}
