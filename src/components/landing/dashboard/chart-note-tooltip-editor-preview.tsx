import type { ReactNode } from "react";

import type { TrafficChartAnnotation } from "./traffic-line-chart";

/** `inverted` matches the dark chart tooltip; `surface` sits on normal cards. */
type NoteEditorTone = "inverted" | "surface";

function chartNoteColorVar(colorId: string | undefined): string {
  if (colorId && /^[1-6]$/.test(colorId)) {
    return `var(--chart-${colorId})`;
  }
  return "var(--chart-1)";
}

const noteToneClasses = {
  inverted: {
    divider: "border-background/15",
    note: "text-background/85",
    iconButton:
      "rounded p-0.5 text-background/50 transition-colors hover:bg-background/10 hover:text-background disabled:opacity-50",
    addNote:
      "w-full rounded bg-background/10 px-2 py-1.5 text-center text-xs font-medium text-background transition-colors hover:bg-background/15 disabled:opacity-50",
    addNoteCompact:
      "w-full rounded bg-background/10 px-2 py-1 text-center text-[10px] font-medium text-background disabled:opacity-50",
  },
  surface: {
    divider: "border-border",
    note: "text-foreground/85",
    iconButton:
      "rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50",
    addNote:
      "w-full rounded bg-muted px-2 py-1.5 text-center text-xs font-medium text-foreground transition-colors hover:bg-muted/80 disabled:opacity-50",
    addNoteCompact:
      "w-full rounded bg-muted px-2 py-1 text-center text-[10px] font-medium text-foreground disabled:opacity-50",
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
      className={`grid min-w-0 border-t ${tone.divider} ${compact ? "gap-1 pt-1" : "gap-1.5 pt-1.5"}`}
    >
      {dayNotes.length > 0 ? (
        <ul className="grid min-w-0 gap-1">
          {dayNotes.map((annotation) => (
            <li
              key={annotation.id}
              className={`flex min-w-0 items-center gap-1.5 ${tone.note}`}
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: chartNoteColorVar(annotation.color),
                }}
              />
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
      <button
        type="button"
        disabled
        className={compact ? tone.addNoteCompact : tone.addNote}
      >
        Add a note
      </button>
    </div>
  );
}
