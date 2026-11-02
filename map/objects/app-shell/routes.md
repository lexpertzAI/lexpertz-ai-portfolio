---
type: object
cluster: app-shell
universe: live
status: verified
verified: 2026-11-01
commit: 5b7fcc2
entity: src/app
---

# Routes

The URL surface: one page file per route, one `(marketing)` group for shared chrome, and a sitemap built from the content modules.

## Why this shape

The App Router maps files to URLs, so the route table *is* the file tree. A single `(marketing)` group keeps its URL prefix empty while still giving those pages a shared segment. Everything that repeats per item — service, case study, insight — is a `[slug]` page reading a content module, so adding an entry publishes a page without touching `src/app/`. Insights and services are prerendered (`generateStaticParams`); case studies still render on demand.

## Shape

| URL | File | Render |
|---|---|---|
| `/` | `src/app/page.tsx:16` | static; top 3 insights |
| `/services` | `src/app/(marketing)/services/page.tsx` | static |
| `/services/[slug]` | `src/app/(marketing)/services/[slug]/page.tsx:13` | `generateStaticParams` over the 4 services |
| `/case-studies` | `src/app/(marketing)/case-studies/page.tsx` | static |
| `/case-studies/[slug]` | `src/app/(marketing)/case-studies/[slug]/page.tsx` | dynamic; no `generateStaticParams` |
| `/insights` | `src/app/(marketing)/insights/page.tsx:13` | static; `BlogPostCard` media grid |
| `/insights/[slug]` | `src/app/(marketing)/insights/[slug]/page.tsx:16` | `generateStaticParams` from disk |
| `/about`, `/contact` | `src/app/(marketing)/<name>/page.tsx` | static |
| `/products/axiom-verify` | `src/app/products/axiom-verify/page.tsx` | static |
| `/api/contact` | `src/app/api/contact/route.ts:1` | POST handler; validates and forwards the brief |
| `/sitemap.xml` | `src/app/sitemap.ts:21` | generated |

Old service slugs are redirected to the current offers in `next.config.mjs:12-40`; do not delete those without checking inbound links.

Citations: `src/app/sitemap.ts:26-60`

## Connected to

- **owns:** the file tree under `src/app/`
- **owned-by:** [content-modules](../content-and-insights/content-modules.md) supplies the slugs each `[slug]` page enumerates
- **joins:** [layout-and-seo](layout-and-seo.md) wraps every route
- **looks-like-but-is-not:** `src/app/sitemap.ts` is not auto-derived from the file tree — static URLs are hand-listed at `src/app/sitemap.ts:29-48`

## If you change this

- **Hits:** a new top-level route needs a line in `staticRoutes` (`src/app/sitemap.ts:29`); a renamed content slug changes its public URL and every internal link in `src/content/`; moving a page between route groups changes which layout wraps it.
- **Does not hit:** `src/components/ui/`, `src/lib/markdown.ts`, design tokens.

## Surfaces

| Surface | Role |
|---|---|
| crawlers | read `/sitemap.xml` and each page's `<head>` |
| `src/app/page.tsx` | reads `getPublishedInsights()` for the homepage preview |
| humans | navigate; the navbar links are `src/lib/constants.ts:18` |

## See

- Source: `src/app/`
- Sitemap: `src/app/sitemap.ts`
