# Lexpertz AI Portfolio

Next.js 16 marketing site for Lexpertz AI (live at `lexpertzai.cc`): the app in `src/`, published insights in `content/insights/`, and an OpenCode V2 harness. This file routes; content lives one hop away.

## Where things live

| Path | Holds |
|---|---|
| `src/` | app: routes, components, content modules, lib |
| `content/insights/` | published markdown posts |
| `marketing/` | campaign briefs, calendars, post drafts, results |
| `map/` | System map: what each part is and what a change hits |
| `docs/` | factory: `design/`, `process/`, `standards/` |
| `skills/`, `.opencode/` | harness: skills, commands, subagents |
| `_archive/` | dead code, kept, never imported |

## Route by task

| If | Go to |
|---|---|
| understand the repo, or ask "what does this change hit?" | [map/AGENTS.md](map/AGENTS.md), then [map/effects/CONTEXT.md](map/effects/CONTEXT.md) |
| change a route, page, section, or component | [map/objects/component-library/CONTEXT.md](map/objects/component-library/CONTEXT.md), [app-shell](map/objects/app-shell/CONTEXT.md) |
| publish or fix an insight | [map/processes/publish-insight.md](map/processes/publish-insight.md), then [blog-pipeline](docs/process/blog-pipeline.md) |
| change color, type, or spacing | [map/objects/design-system/CONTEXT.md](map/objects/design-system/CONTEXT.md), then [design-system](docs/design/design-system.md) |
| harness, skills, commands | [map/objects/agent-tooling/CONTEXT.md](map/objects/agent-tooling/CONTEXT.md), then [development](docs/process/development.md) |
| run or verify the build | [map/processes/dev-and-build.md](map/processes/dev-and-build.md) |

## Commands

| Action | Command |
|---|---|
| Dev server (port 3000) | `npm run dev` |
| Build + typecheck — the only typecheck path | `npm run build` |
| Lint | `npm run lint` |
| Add shadcn/ui component | `npm install` then `npx shadcn add <name>` |
| Check map links | `python -I map/_tools/links.py` |
| Sync the map after a change | `/map-update` |

No test framework is installed: `npm test` fails. There is no `tsc --noEmit` path.

## Non-negotiables (full text in `docs/standards/`)

- Mobile-first; verified at ~375px and ≥1280px; touch targets ≥44px; reduced motion gated everywhere → [responsive](docs/standards/responsive.md)
- Reuse before writing: check [reusable-blocks](docs/standards/reusable-blocks.md) first. Page data goes in `src/content/*`, never inline.
- Code floor: no hardcoded secrets, immutable updates, no `console.log` → [code-floor](docs/standards/code-floor.md)
- Prefix shell commands with `rtk` → [rtk](docs/standards/rtk.md)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
