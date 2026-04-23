# Experimental token exports — Tier 3

**Status: untested.** These files are auto-generated from `tokens/css/base/*.css` as a convenience for teams prototyping on iOS, Android, React Native, and Tailwind. They have **not** been compiled, linted, or validated on any real project.

## Tiers

| Tier | Location | Status |
|------|----------|--------|
| Tier 1 (canonical) | `tokens/css/` · `tokens/flutter/` | Used in production Pepperstone surfaces |
| Tier 2 (interop)   | `tokens/json/` (DTCG) | Stable — any Style Dictionary / Token Studio pipeline can consume |
| Tier 3 (experimental) | `tokens/experimental/` | **This folder.** Untested. No guarantees. |

## What's here

| File | What it is |
|------|------------|
| `ios/PepperTokens.swift` | Swift enums: `PepperColor`, `PepperSpacing`, `PepperDimension`, `PepperSize`, `PepperRadius`, `PepperBorderWidth`, `PepperFontSize`, `PepperLineHeight`, `PepperOpacity`, `PepperFontWeight`, `PepperFontFamily`. Colours as `UIColor` literals. |
| `android/values/colors.xml` | Android `<color>` resources (ARGB). |
| `android/values/dimens.xml` | Android `<dimen>` resources in `dp`. Use `sp` for text in code. |
| `android/values/styles.xml` | `TextAppearance`-style entries per typography composite. `fontFamily` is not wired — replace `sans-serif` with your loaded font. |
| `react-native/tokens.ts` | TypeScript `export const` objects, nested by category. `as const` for literal types. |
| `tailwind/tailwind.config.js` | `theme.extend` snippet — colours, spacing, radii, border widths, font sizes/weights/families, line heights, opacity, screens. |

All platform files **resolve semantic tokens to their final primitive values** — easier for consumers, at the cost of losing the alias layer. If you need aliases, use `tokens/json/tokens.json`.

## How to graduate a file to Tier 1

A file leaves Tier 3 when:

1. A real downstream project is using it and reports back that it compiles and renders correctly.
2. At least one round of feedback has been incorporated (naming clashes, missing tokens, wrong type coercions).
3. A maintainer moves it out of `experimental/` into its own top-level folder (e.g. `tokens/ios/`, `tokens/android/`) and adds it to the `README.md` Tier 1 list.

## Something wrong?

Raise an issue on GitHub — include the file, the token key, and what you expected vs what you got. Don't silently patch the generated file; it will be overwritten the next time tokens sync from Figma.

## Regeneration

These files are regenerated from `tokens/css/base/*.css` as part of the Figma → Claude sync. They are **not** hand-edited.
