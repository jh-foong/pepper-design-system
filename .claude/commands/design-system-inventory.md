# Design System Inventory

AI-powered Figma design system inventory: analyzes a file, page, library, or selected screens to identify and count components, variants, variables, colors, typography styles, spacing patterns, icons, and reusable UI patterns. Detects potential duplicates, inconsistent usage, and missing design tokens.

## Usage

```
/design-system-inventory
```

## What this command does

Read and follow `skills/design-system-inventory/SKILL.md` in this repo **in full, exactly as written**, applied to the user's current Figma selection, page, or file (or the arguments given as `$ARGUMENTS`, if any). Do not summarize or paraphrase that file — load it and execute its instructions directly, including the full inventory categories, the duplicate-detection and missing-token-detection report formats, and the P0–P3 recommendation priorities. Never invent counts or values that weren't actually observed. Do not modify the file during inventory analysis unless the user explicitly asks for changes.

Use for counting/cataloguing what already exists — not accessibility (`/accessibility-review`), not published-library compliance scoring (`/ds-compliance-review`), not general drift detection (`/design-system-drift-detector`), and not AI-readability (`/design-system-audit-for-mcp`). If it's unclear which of these four audit-style skills the user means, ask before picking one.
