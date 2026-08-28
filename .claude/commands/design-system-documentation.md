# Design System Documentation

Generate structured design-system documentation directly inside a Figma file — tables of Colors, Typography, Spacing, Sizing, Radius, Borders, Opacity, Effects, Grid, and other Variables/Styles — following the Pepper DS-aware ruleset.

## Usage

```
/design-system-documentation [Figma file or node URL]
```

## What this command does

Read and follow `skills/design-system-documentation/SKILL.md` in this repo **in full, exactly as written**, applied to the Figma file/selection the user provides as `$ARGUMENTS`.

That file defines the complete pipeline (Discover → Build Source Inventories → Classify → Resolve Aliases → Normalize → Group → Generate Developer Tokens → **verify prefixes against Pepper DS's two-prefix model per Section 123B** → Render → Read Back → Assert → Repair → Finalize) plus every visual/table spec and fail-closed validation rule.

Do not summarize or paraphrase that file — load it and execute its instructions directly. In particular, do not finalize any Developer Token column without first applying the Section 123B check (Pepper DS uses `pepper-core-*` for primitives and `pepper-*` for semantic/component/state/overlay tokens, not the generic category prefixes in Section 123) — flag anything ambiguous for manual review rather than guessing.

If no Figma URL/selection is provided, ask for one before starting.
