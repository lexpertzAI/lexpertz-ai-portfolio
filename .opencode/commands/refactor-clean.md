---
description: Remove dead code and consolidate duplicates
---

# Refactor Clean Command

Analyze and clean up the codebase: $ARGUMENTS

## Your Task

1. **Detect dead code** using static searches (no knip/depcheck/ts-prune — not installed)
2. **Identify duplicates** and consolidation opportunities
3. **Safely remove** unused code with documentation
4. **Verify** no functionality broken

## Detection Phase

### Static Analysis (available tools)

```bash
rtk grep <function-name> src/   # find all references
rtk grep <import-name> src/     # check import usage
```

### Manual Checks

- Unused functions (no callers)
- Unused variables
- Unused imports
- Commented-out code
- Unreachable code
- Unused CSS classes
- Files in `src/components/.old/` (never import from them)

## Removal Phase

### Before Removing

1. **Search for usage** — `rtk grep` across `src/` for every reference
2. **Check exports** — might be used via a barrel (`index.ts`)
3. **Document removal** — explain in commit message

### Safe Removal Order

1. Remove unused imports first
2. Remove unused private functions
3. Remove unused exported functions
4. Remove unused types/interfaces
5. Remove unused files

## Consolidation Phase

### Identify Duplicates

- Similar functions with minor differences
- Copy-pasted code blocks
- Repeated patterns

### Consolidation Strategies

1. **Extract utility function** — for repeated logic (put in `src/lib/`)
2. **Reuse existing primitives** — check `docs/reusable-blocks.md` before writing new components
3. **Create shared constants** — for magic values

## Verification

After cleanup:

1. `npm run build` - builds successfully (typecheck)
2. `npm run lint` - no new lint errors
3. `git diff --stat` - confirm only intended files changed

## Report Format

```
Dead Code Analysis
==================

Removed:
- file.ts: functionName (unused export)
- utils.ts: helperFunction (no callers)

Consolidated:
- formatDate() and formatDateTime() → dateUtils.format()

Remaining (manual review needed):
- oldComponent.tsx: potentially unused, verify with team
```

---

**CAUTION**: Always verify before removing. When in doubt, ask or leave it. Never run `npm test` (no test runner installed).
