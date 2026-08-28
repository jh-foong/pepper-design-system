# Tokenize

Replaces hardcoded values (colors, padding, gap, corner radius, stroke, opacity, typography, etc.) on selected layers with matching variables/tokens from the current file or attached libraries. Prioritizes same-project variables over third-party libraries.

## Usage

```
/tokenize
```

Select the layer(s) to tokenize first, then run this command.

## What this command does

Read and follow `skills/tokenize/SKILL.md` in this repo **in full, exactly as written**, applied to the user's current Figma selection (or the arguments given as `$ARGUMENTS`, if any). Do not summarize or paraphrase that file — load it and execute its instructions directly: build the variable index in source-priority order (local → same-project library → third-party library), walk every selected node and descendant, skip already-bound properties, match and bind using the correct API per property type, and finish with the full reporting summary (tokenized, skipped, unmatched values).
