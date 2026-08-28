# DS Compliance Review

Audit the selected Figma layers against the live published design system via Figma MCP. Flags and annotates hardcoded colors, off-token spacing, local/orphaned styles, detached instances, and missing component reuse. Adds one consolidated annotation per violating layer and a frame-level compliance score.

## Usage

```
/ds-compliance-review
```

Select the Page contents, Section, Frame, Group, or Component/Set in Figma first, then run this command.

## What this command does

Read and follow `skills/ds-compliance-review/SKILL.md` in this repo **in full, exactly as written**, applied to the user's current Figma selection (or the arguments given as `$ARGUMENTS`, if any). Do not summarize or paraphrase that file — load it and execute its instructions directly. In particular, do not stop at the frame-level `[DSCR-SUMMARY]` badge — every violating element must get its own `[DSCR]` pin first, per the skill's hard rule, worked frame-by-frame for large selections.

Use for DS compliance/governance checks — not accessibility (`/accessibility-review`), not general drift (`/design-system-drift-detector`), not AI-readability (`/design-system-audit-for-mcp`), and not asset counting (`/design-system-inventory`). If it's unclear which of these four audit-style skills the user means, ask before picking one.
