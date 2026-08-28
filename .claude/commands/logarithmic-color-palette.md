# Logarithmic Color Palette

Generate a logarithmically distributed color swatch family based on human color perception physiology. Everything is computed in OKLCH so every step is perceptually even (min ΔE 3.5) for every hue, including yellows and greens. Supports multiple base colors, light/dark scales, and optional Figma variable storage.

## Usage

```
/logarithmic-color-palette [hex color(s), or select layer(s) with a fill]
```

## What this command does

Read and follow `skills/logarithmic-color-palette/SKILL.md` in this repo **in full, exactly as written**, applied to the base color(s) given as `$ARGUMENTS` or the user's current Figma selection. Do not summarize or paraphrase that file — load it and execute its instructions directly: gather the base color(s), ask the grade count / primary mode / Back-Front questions exactly once each, generate the OKLCH ladder per the exact formulas given (never HSL-based spacing), run the Step 4e ΔE verification and report it, then build the swatches on canvas and optionally bind them to Figma variables.
