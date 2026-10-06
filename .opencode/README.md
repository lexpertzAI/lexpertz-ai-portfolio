# OpenCode configuration (skills-first)

This directory holds the OpenCode configuration for this repo. It targets
**OpenCode V2** (`opencode@2.x`) and uses only native V2 discovery.

## What is here

```text
.opencode/
├── agents/      # Subagents: .opencode/agents/<id>.md  (auto-discovered)
├── commands/    # Slash commands: .opencode/commands/<id>.md  (auto-discovered)
└── skills/      # Skills: .opencode/skills/<id>/SKILL.md  (auto-discovered)
```

Plus one repo-root `skills/` directory, registered in `opencode.json`.

Nothing here needs a plugin, a build step, or `node_modules`.

## Skills

V2 discovers skills from directories on disk. `.opencode/skills/` needs no
configuration. The repo-root `skills/` directory is not a default discovery
path, so it is listed explicitly in `opencode.json`:

```jsonc
{
  "skills": ["skills"],
}
```

Each skill is a directory containing `SKILL.md` with optional frontmatter:

```markdown
---
name: my-skill
description: When the model should reach for this
---
```

The `description` is the only part the model sees up front; it loads the body
via the `skill` tool when relevant. A skill without a description is never
advertised.

Verify a skill loads:

```sh
opencode                       # then ask, or:
opencode api get /api/skill    # note: reports the service's default directory
```

The reliable check is the `skill` tool itself — see the Troubleshooting section.

## Agents

Agents are Markdown files. The frontmatter carries metadata and the body
becomes the system prompt. There is no separate prompt file to keep in sync.

```markdown
---
description: Expert planning specialist for complex features
mode: subagent
permissions:
  - action: edit
    resource: "*"
    effect: deny
---
You are an expert planning specialist...
```

V2 renamed these agent fields. Do not reintroduce the V1 names:

| V1            | V2              |
| ------------- | --------------- |
| `agent` map   | `agents`        |
| `prompt`      | `system`        |
| `tools` map   | `permissions`   |
| `mode` map    | `mode` on entry |
| `disable`     | `disabled`      |
| `maxSteps`    | `steps`         |

Only `edit` needs an explicit rule when a subagent must stay read-only. The
base policy already allows everything else, and the last matching rule wins.

## Commands

Commands are Markdown files with frontmatter:

```markdown
---
description: Create a detailed implementation plan
agent: planner
subagent: true
---
Create a detailed implementation plan for: $ARGUMENTS
```

`$ARGUMENTS` is the raw argument string; `$1`, `$2` are positional. Use
`!`backticks`` around a shell command to insert its output.

V2 renamed `command` to `commands` and `subtask` to `subagent`. `subtask`
still parses but is a deprecated alias — use `subagent`.

## MCP servers

Servers are declared under `mcp.servers` in `opencode.json`. V1 put them
directly under `mcp`; that shape is no longer the documented form.

```jsonc
{
  "mcp": {
    "servers": {
      "example": {
        "type": "remote",
        "url": "https://mcp.example.com/mcp",
      },
    },
  },
}
```

Use `disabled: true` to keep a server configured without connecting it.
`enabled` is the V1 inverse and is gone.

Remote servers use OAuth by default. Sign in with `/mcps` in the TUI. Do not
put an API key in a committed config when the server supports OAuth; if a
header credential is genuinely required, use `{env:MCP_API_KEY}` substitution.

A `npx`-based local server downloads its package on first run and can exceed
the 30s startup timeout. Either pre-install the package, or raise
`mcp.timeout.startup`.

## What this config does not use

The upstream ECC distribution also ships a plugin (`plugins/`) and custom
tools (`tools/`). Neither is installed here:

- **The plugin** is V1 code. V2 changed the plugin API outright — a V1 plugin
  does not run, and loading one only produces a "failed to load plugin"
  warning. Its hooks also duplicated rules that belong in `AGENTS.md`.
- **The custom tools** (`changed-files`, `dependency-analyzer`, `run-tests`,
  `lint-check`, `format-code`, `git-summary`, `security-audit`,
  `check-coverage`) were only reachable through that plugin. Several merely
  returned a command string that `npm run lint` / `npm run build` already
  provide.

If you later want them, port the plugin to `Plugin.define({ id, setup(ctx) })`
against `@opencode/plugin`, and register tools through `ctx.tool.transform`
with JSON Schema `input` and a `{ content }` result. See
<https://opencode.ai/v2/docs/build/plugins/migrate-v1/>.

## Troubleshooting

**A skill does not load.** Confirm the file is `SKILL.md` inside
`.opencode/skills/<id>/`, or a root-level `*.md` in a configured source. The ID
is the path-derived directory name, not the frontmatter `name`. Add a
`description` or it will not be advertised.

**`instructions` seems ignored.** It is. V2 accepts the field but does not
resolve its files. Use `AGENTS.md` for project instructions.

**Commands or agents missing.** Both directories are auto-discovered, so a file
placed in the wrong directory is simply not found. Confirm the path, and note
that frontmatter keys are case-sensitive.

**Config warnings on startup.** Compare against the V2 migration guide at
<https://opencode.ai/v2/docs/migrate-v1/>. V1 fields still parse for
compatibility, but silently — relying on them means relying on a compat shim.

## References

- Config: <https://opencode.ai/v2/docs/config/>
- Skills: <https://opencode.ai/v2/docs/skills/>
- Agents: <https://opencode.ai/v2/docs/agents/>
- Commands: <https://opencode.ai/v2/docs/commands/>
- MCP servers: <https://opencode.ai/v2/docs/mcp-servers/>
- V1 to V2: <https://opencode.ai/v2/docs/migrate-v1/>
