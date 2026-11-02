# marketing

Campaign work: briefs, calendars, post drafts, and results. Not site content (that is `content/`), not factory (that is `docs/`).

## Rules

- One campaign per file: `campaigns/YYYY-MM-<slug>.md`.
- Strategy and research live in `strategy/YYYY-MM-<topic>.md`. A campaign cites the strategy it follows; it does not restate it.
- Every campaign reads `.agents/product-marketing.md` first. If positioning changed, update that doc, not each campaign.
- Status lives in the file's frontmatter: `draft` → `running` → `reviewed` → `archived`. A campaign whose dates have passed and whose results are not written down is unfinished.
- Drafts are copy-paste ready. Do not store half-written ideas here; use the issue tracker or a scratch note.
- Media sources and renders live in `assets/`. Commit the GIF and PNG a campaign actually used, alongside its HTML source.

## Check

Before a post ships: no AI tells (see `.agents/skills/social/SKILL.md`), claims match `.agents/product-marketing.md` proof points, and every link carries a UTM.
