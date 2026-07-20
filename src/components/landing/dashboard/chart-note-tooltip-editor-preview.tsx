import type { ReactNode } from "react";

import type { TrafficChartAnnotation } from "./traffic-line-chart";

/** `inverted` matches the dark chart tooltip; `surface` sits on normal cards. */
type NoteEditorTone = "inverted" | "surface";

const noteToneClasses = {
  inverted: {
    divider: "border-background/15",
    note: "text-background/85",
    iconButton:
      "rounded p-0.5 text-background/50 transition-colors hover:bg-background/10 hover:text-background disabled:opacity-50",
    input:
      "h-6 min-w-0 flex-1 rounded bg-background/15 px-1.5 text-xs text-background outline-none placeholder:text-background/45 focus:bg-background/25",
    submit:
      "h-6 shrink-0 rounded bg-background px-2 text-xs font-medium text-foreground transition-colors hover:bg-background/90 disabled:bg-background/25 disabled:text-background/70",
    inputCompact:
      "h-5 min-w-0 flex-1 rounded bg-background/15 px-1.5 text-[10px] text-background outline-none placeholder:text-background/45",
    submitCompact:
      "h-5 shrink-0 rounded bg-background px-1.5 text-[10px] font-medium text-foreground disabled:bg-background/25 disabled:text-background/70",
  },
  surface: {
    divider: "border-border",
    note: "text-foreground/85",
    iconButton:
      "rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50",
    input:
      "h-6 min-w-0 flex-1 rounded bg-muted px-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground/70 focus:bg-muted/70",
    submit:
      "h-6 shrink-0 rounded bg-foreground px-2 text-xs font-medium text-background transition-colors hover:bg-foreground/90 disabled:bg-foreground/25 disabled:text-background/70",
    inputCompact:
      "h-5 min-w-0 flex-1 rounded bg-muted px-1.5 text-[10px] text-foreground outline-none placeholder:text-muted-foreground/70",
    submitCompact:
      "h-5 shrink-0 rounded bg-foreground px-1.5 text-[10px] font-medium text-background disabled:bg-foreground/25 disabled:text-background/70",
  },
} satisfies Record<NoteEditorTone, Record<string, string>>;

function NoteIconButton(props: {
  label: string;
  compact?: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={props.label}
      className={props.className}
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
  tone?: NoteEditorTone;
}) {
  const dayNotes = props.annotations.filter(
    (annotation) => annotation.day === props.day,
  );
  const compact = props.compact === true;
  const tone = noteToneClasses[props.tone ?? "inverted"];

  return (
    <div
      className={`grid border-t ${tone.divider} ${compact ? "gap-1 pt-1" : "gap-1.5 pt-1.5"}`}
    >
      {dayNotes.length > 0 ? (
        <ul className="grid gap-1">
          {dayNotes.map((annotation) => (
            <li
              key={annotation.id}
              className={`flex items-center gap-1.5 ${tone.note}`}
            >
              <span className="min-w-0 flex-1 truncate">{annotation.label}</span>
              <NoteIconButton
                compact={compact}
                className={tone.iconButton}
                label={`Edit note "${annotation.label}"`}
              >
                <PencilIcon compact={compact} />
              </NoteIconButton>
              <NoteIconButton
                compact={compact}
                className={tone.iconButton}
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
          className={compact ? tone.inputCompact : tone.input}
        />
        <button
          type="button"
          disabled
          className={compact ? tone.submitCompact : tone.submit}
        >
          Add
        </button>
      </div>
    </div>
  );
}
