---
type: object
cluster: component-library
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/components/ui
---

# UI primitives

Generic, content-free building blocks in `src/components/ui/`, re-exported from one barrel.

## Why this shape

Pages compose primitives; primitives know nothing about the site's content. That split is why a design change lands in one file, and why `docs/standards/reusable-blocks.md` insists on checking this folder before writing a new block. The barrel (`src/components/ui/index.ts`) is the public API: import from `@/components/ui`, not from the file inside it, so a primitive can be reorganised without touching call sites.

## Shape

- Barrel: `src/components/ui/index.ts:1-67` — 22 export statements.
- shadcn-generated: `button`, `badge`, `card`, `input`, `label`, `separator`, `dialog`, `dropdown-menu`, `navigation-menu`, `scroll-area`, `tooltip`, `avatar`.
- Site-specific: `section` (vertical rhythm + variants, `src/components/ui/section.tsx:26-36`), `container`, `stat-card`, `bento-card`, `blog-post-card` (dispatch-ledger card), `growth-chart` (recharts, `src/components/ui/growth-chart.tsx:45`), `cinematic-hero` (GSAP scene), `animated-roadmap`, `cards-stack`, `process-steps`, `profile-card`, `social-cloud`.
- Styling goes through `cn()` (`src/lib/utils.ts`) and Tailwind tokens — no inline hex.

Citations: `src/components/ui/index.ts:1`

## Connected to

- **owns:** `src/components/ui/*`
- **owned-by:** consumed by `sections/`, `layout/`, `blog/`, and pages
- **joins:** [design-tokens](../design-system/design-tokens.md) supplies the token classes
- **looks-like-but-is-not:** `src/components/ui/index.ts` is a barrel, not a registry — nothing auto-discovers components

## If you change this

- **Hits:** a prop rename breaks every call site (grep the component name, not the barrel); a removed export breaks the build; a style change in `section`, `container`, or `card` shifts every page.
- **Does not hit:** route files (they import sections), `src/content/*` data, markdown rendering.

## Surfaces

| Surface | Role |
|---|---|
| `sections/`, `layout/`, `blog/`, `app/*/page.tsx` | import primitives |
| `docs/standards/reusable-blocks.md` | the inventory a new block must be checked against |

## See

- Source: `src/components/ui/index.ts`
- Reference: `docs/standards/reusable-blocks.md`
