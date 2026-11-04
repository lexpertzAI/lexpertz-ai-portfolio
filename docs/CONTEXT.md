# docs — the factory

Stable reference that every change reads but no run produces. If a doc here grows past easy scanning, split it and route to it from this file.

| Folder | Holds | Read it when |
|---|---|---|
| [design/](design/) | [design-system.md](design/design-system.md), [design-concepts.md](design/design-concepts.md) | choosing values, or checking what was shipped vs. planned |
| [process/](process/) | [development.md](process/development.md), [blog-pipeline.md](process/blog-pipeline.md), [lessons-learned.md](process/lessons-learned.md) | setting up, publishing, or avoiding a known bug class |
| [standards/](standards/) | [code-floor.md](standards/code-floor.md), [reusable-blocks.md](standards/reusable-blocks.md), [responsive.md](standards/responsive.md), [rtk.md](standards/rtk.md), [analytics.md](standards/analytics.md) | before writing a block, a layout, a shell command, or an event |
| [decisions/](decisions/) | open and closed decisions, one file each | before committing to a tool, vendor, or structural change |

## Rules

- One home per fact: the map cards cite these docs, they do not copy them.
- A design rule lives in `design/` or `standards/`, never in a component comment alone.
- When a lesson repeats, add it to `process/lessons-learned.md` and link it from the relevant map card.
