/** Shared height, padding, and text scale for `SelectTrigger` (mirrors app.kobbe.io). */
export const controlFieldRadiusClass = "rounded-lg";

export const controlShellClass = {
  sm: "h-8 min-h-8 px-2.5 text-xs leading-tight",
  md: "h-9 min-h-9 px-3 text-sm leading-tight",
  lg: "h-10 min-h-10 px-3.5 text-sm leading-tight",
} as const;

export const controlFieldSizeClass = {
  default: controlShellClass.md,
  sm: controlShellClass.sm,
} as const;

export type ControlFieldSize = keyof typeof controlFieldSizeClass;
