---
type: object
cluster: component-library
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/components/sections
---

# Page sections

Thin composition layer: each section pairs primitives with data from `src/content/*` and is mounted by one page.

## Why this shape

A section is the smallest thing a page composes, so it is where content and layout meet. Keeping them out of `ui/` stops site-specific copy from leaking into primitives; keeping them out of `app/` stops route files from growing into layouts. The homepage is the proof: `src/app/page.tsx` is nine imports and nine elements.

## Shape

| Section | Owns |
|---|---|
| `hero-cinematic.tsx` | homepage hero; wraps `ui/cinematic-hero` and handles the `-mt-16` pull under the navbar |
| `featured-stats-section.tsx` | stat cards + `GrowthChart`, data from `src/content/featured-stats.ts` |
| `services-grid.tsx` | service cards, `src/content/services.ts` |
| `process-section.tsx` | process steps, `src/content/process.ts` |
| `team-section.tsx` | team grid, `src/content/team.ts` |
| `case-study-card.tsx` | card + `CaseStudiesPreview` |
| `insights-preview.tsx` | client component; dispatch-ledger layout where the newest post is the lead story and the next two stack in an index rail; receives posts as props (`src/components/sections/insights-preview.tsx:27`) |
| `cta-section.tsx` | closing call to action |
| `contact-form.tsx` | react-hook-form + Zod, `src/lib/validators/contact.ts` |

Citations: `src/app/page.tsx:1-23`

## Connected to

- **owns:** `src/components/sections/*`
- **owned-by:** pages under `src/app/`
- **joins:** [ui-primitives](ui-primitives.md), [content-modules](../content-and-insights/content-modules.md)
- **looks-like-but-is-not:** `case-study-card.tsx` exports both a card and a preview — it is a section file with two exports, not a primitive

## If you change this

- **Hits:** renaming an exported section breaks its page import; changing a section's data prop means changing the page that reads the module; `insights-preview` is a client component, so it must stay fed by a server component (`src/app/page.tsx:19`).
- **Does not hit:** other sections, `src/lib/*`, the sitemap.

## Surfaces

| Surface | Role |
|---|---|
| `src/app/page.tsx` | mounts the homepage sections |
| marketing routes | mount page-specific sections |

## See

- Source: `src/components/sections/`
- Reference: `docs/standards/reusable-blocks.md`
