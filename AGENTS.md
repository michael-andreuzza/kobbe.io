# Agent Notes

This repository is the Kobbe marketing and docs site built with Astro.

## Non-Negotiables

- Prefer existing shared components in `src/components/ui`, `src/components/foundations`, `src/components/global`, and nearby feature folders before creating new primitives.
- Avoid raw Tailwind palette classes like `blue-500` in product code; use semantic theme tokens such as `text-foreground`, `text-muted-foreground`, `bg-background`, `bg-surface`, `bg-muted`, `border-border`, and related variables.
- Avoid `mb-*` for page-level vertical spacing; use `mt-*`, `gap-*`, or `space-y-*` instead.
- Keep legal, support, and docs copy in content collections under `src/content/*` unless the user explicitly asks for a hardcoded page.
- Do not add new markdown docs outside content collections unless the user asks for standalone documentation.

## Layout And Content

- Legal and support markdown pages should render through the shared layout pattern, with page titles and descriptions coming from frontmatter.
- Use `Text.astro` for page-level titles and descriptions when creating or changing layouts.
- Keep changes small and directly tied to the user request. Avoid drive-by redesigns, broad formatting sweeps, or unrelated refactors.
