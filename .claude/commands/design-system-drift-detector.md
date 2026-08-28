# Design System Drift Detector

Audits a selection, page, or file for design system drift — detached components, hardcoded colors, rogue typography, off-scale spacing, deprecated components, and unbound values that match existing tokens. Discovers the file's variables, styles, and libraries first, then audits against those, so it works with any design system.

## Usage

```
/design-system-drift-detector
```

## What this command does

Read and follow `skills/design-system-drift-detector/SKILL.md` in this repo **in full, exactly as written**, applied to the user's current Figma selection, page, or file (or the arguments given as `$ARGUMENTS`, if any). Do not summarize or paraphrase that file — load it and execute its instructions directly, including building the on-canvas Drift Report frame (mandatory on every scan) to the exact visual spec given, and never applying fixes without explicit per-category approval.

Use for general design-system drift — not accessibility (`/accessibility-review`), not published-library compliance scoring (`/ds-compliance-review`), not AI-readability (`/design-system-audit-for-mcp`), and not asset counting (`/design-system-inventory`). If it's unclear which of these four audit-style skills the user means, ask before picking one.
