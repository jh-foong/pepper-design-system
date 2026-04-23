# Token Reference & Cheatsheet

A lookup guide for when Claude suggests a token and you need to know what it is or how to apply it in Figma.

---

## How to use this doc

1. Claude suggests something like *"use `--pepper-surface-brand-primary`"*
2. Find the token category below (colour, typography, spacing, etc.)
3. Look up the value or its linked source file
4. Apply it in Figma — see [Applying tokens in Figma](#applying-tokens-in-figma) at the bottom

All token values are sourced from [`tokens/css/base/`](../tokens/css/). If a token isn't listed here, check the raw CSS file for that category.

---

## Naming convention

Pepper tokens follow this pattern:

```
--pepper-[category]-[group]-[variant]
```

Examples:
- `--pepper-color-semantic-surface-brand-primary` — a colour, semantic layer, used for brand surfaces
- `--pepper-typography-heading-h1` — a composite text style for H1
- `--pepper-space-inset-md` — medium inset (internal padding)
- `--pepper-border-radius-lg` — large border radius

> 💡 Prefer **semantic tokens** (e.g. `surface-brand-primary`) over **primitive tokens** (e.g. `red-700`). Semantic tokens adapt to light/dark themes automatically.

---

## Colour

Colour tokens are layered:

- **Primitive** — raw palette (e.g. `red-700`, `neutral-950`). Don't use directly.
- **Semantic** — meaning-based (e.g. `surface-brand-primary`, `text/primary`). **Use these.**

Semantic colour groups:

| Group | Use for | Example token |
|-------|---------|---------------|
| `text/*` | Body text, headings, labels | `--pepper-color-semantic-color-foreground-text-primary` |
| `stroke/*` | Borders, dividers, outlines | `--pepper-color-semantic-color-foreground-stroke-default` |
| `surface/*` | Backgrounds, fills, cards | `--pepper-color-semantic-color-background-surface-primary` |
| `brand/*` | Brand-specific fills and accents | `--pepper-color-semantic-color-foreground-stroke-brand-default` |

**Full reference:** [`tokens/css/base/color.css`](../tokens/css/base/color.css) — 860+ lines, searchable with Cmd+F

> 💡 Ask Claude: *"What's the hex value of `--pepper-color-semantic-color-background-surface-primary` in light mode?"* — it can trace the alias chain for you.

---

## Typography

Composite text styles that bundle weight + size + line-height + font-family. All use **Manrope** by default.

### Headings — responsive (size changes with screen)

Heading sizes **adapt automatically** to screen size. A `h1` on desktop is larger than a `h1` on mobile — same token, different rendered size.

| Token | Weight | Use for |
|-------|--------|---------|
| `--pepper-typography-heading-h1` | 700 (Bold) | Page titles, hero headlines |
| `--pepper-typography-heading-h2` | 700 | Section titles |
| `--pepper-typography-heading-h3` | 700 | Subsection titles |
| `--pepper-typography-heading-h4` | 700 | Card titles, small headers |
| `--pepper-typography-heading-h5` | 700 | Minor headings |
| `--pepper-typography-heading-h6` | 700 | Smallest headings / eyebrows |

> 💡 **In Figma:** switch **modes** on the heading style to preview each breakpoint (e.g. mobile / tablet / desktop). The text resizes itself — you don't need separate styles per screen size.

### Body, Label, Legal — fixed (same size across screens)

These styles render at the **same size on every screen**. Pick the token that fits the role; it won't scale with viewport.

| Token | Weight | Use for |
|-------|--------|---------|
| `--pepper-typography-body-lg` | 400 (Regular) | Large body copy |
| `--pepper-typography-body-md` | 400 | Default body copy |
| `--pepper-typography-body-sm` | 400 | Secondary body copy |
| `--pepper-typography-body-xs` | 400 | Metadata, captions |
| `--pepper-typography-body-2xs` | 400 | Very small body (legal footnotes, timestamps) |
| `--pepper-typography-label-lg` | 600 (Semibold) | Large UI labels |
| `--pepper-typography-label-md` | 600 | Default UI labels, button text |
| `--pepper-typography-label-sm` | 600 | Small UI labels |
| `--pepper-typography-label-xs` | 600 | Form labels, tags |
| `--pepper-typography-label-2xs` | 600 | Smallest UI labels |
| `--pepper-typography-legal-md` | 400 | Legal / disclaimer default |
| `--pepper-typography-legal-xs` | 400 | Legal / disclaimer small |

Variants available: `-underlined`, `-dashed` (for link states).

**Full reference:** [`tokens/css/base/typography.css`](../tokens/css/base/typography.css)

---

## Spacing

Two flavours:

- **Inset** — internal padding (inside a container)
- **Gap** — space between elements

### Inset (internal padding)

| Token | Value |
|-------|-------|
| `--pepper-space-inset-none` | 0 |
| `--pepper-space-inset-3xs` | 2px |
| `--pepper-space-inset-2xs` | 4px |
| `--pepper-space-inset-xs` | 8px |
| `--pepper-space-inset-sm` | 12px |
| `--pepper-space-inset-md` | 16px |
| `--pepper-space-inset-lg` | 24px |
| `--pepper-space-inset-xl` | 32px |

### Gap (between elements)

| Token | Value |
|-------|-------|
| `--pepper-space-gap-none` | 0 |
| `--pepper-space-gap-xs` | 4px |
| `--pepper-space-gap-sm` | 8px |
| `--pepper-space-gap-md` | 16px |
| `--pepper-space-gap-lg` | 24px |
| `--pepper-space-gap-xl` | 48px |

> 💡 Everything is on a **4px grid**. If a value isn't a multiple of 4, it's probably wrong.

**Full reference:** [`tokens/css/base/space.css`](../tokens/css/base/space.css)

---

## Border radius

| Token | Value | Use for |
|-------|-------|---------|
| `--pepper-border-radius-none` | 0 | Sharp corners, tabs |
| `--pepper-border-radius-xs` | 2px | Subtle rounding |
| `--pepper-border-radius-sm` | 4px | Small elements, inputs |
| `--pepper-border-radius-md` | 8px | Default — buttons, cards |
| `--pepper-border-radius-lg` | 12px | Larger cards, modals |
| `--pepper-border-radius-xl` | 16px | Hero cards, prominent surfaces |
| `--pepper-border-radius-2xl` | 24px | Large containers |
| `--pepper-border-radius-3xl` | 32px | Very large surfaces |
| `--pepper-border-radius-full` | 9999px | Pills, circles, avatars |

**Full reference:** [`tokens/css/base/border-radius.css`](../tokens/css/base/border-radius.css)

---

## Shadows

Elevation shadows — from subtle to prominent.

| Token | Use for |
|-------|---------|
| `--pepper-shadow-2xs` | Subtle separation |
| `--pepper-shadow-xs` | Default resting state for cards |
| `--pepper-shadow-sm` | Slight lift (hover states) |
| `--pepper-shadow-md` | Medium elevation (popovers, dropdowns) |
| `--pepper-shadow-lg` | High elevation (sticky panels) |
| `--pepper-shadow-xl` | Very high elevation (modals) |
| `--pepper-shadow-2xl` | Maximum elevation (dialogs over modals) |

Plus focus-ring tokens (for accessibility):

| Token | Use for |
|-------|---------|
| `--pepper-shadow-focus-rings-default` | Default focus indicator |
| `--pepper-shadow-focus-rings-inverse` | Focus on dark surfaces |
| `--pepper-shadow-focus-rings-error` | Focus on error states |
| `--pepper-shadow-focus-rings-subtle` | Subtle focus (e.g. icon buttons) |

**Full reference:** [`tokens/css/base/shadow.css`](../tokens/css/base/shadow.css)

---

## Applying tokens in Figma

> ⚠️ **The new Pepper Figma library isn't merged yet** (pending AKQA handover). Until then, use the interim workflow below.

### Interim workflow (now)

For any token Claude suggests:

1. **Look up the value** in this cheatsheet or the [CSS token files](../tokens/css/)
2. **Apply manually in Figma:**
   - **Colour:** paste the hex into the fill field
   - **Typography:** set font (Manrope), weight, size, and line-height manually
   - **Spacing:** enter the pixel value directly in auto-layout settings
   - **Border radius:** paste the px value into corner radius
   - **Shadow:** copy values into Figma's effect panel
3. **Leave a comment** noting the token name so future designers know what to swap in once the library merges:
   > *"Using `--pepper-surface-brand-primary` (#XYZ) — swap to variable once library merges."*

### Proper workflow (post-merge)

Once the Figma branch is merged:

1. Open **Variables** panel (right side, in design mode)
2. Find the Pepper collection → search for the token name
3. Right-click an element → **Apply variable**
4. Or use **Styles** for composite tokens (typography, effects)

---

## Troubleshooting

### Claude suggested a token I can't find
Three possibilities:
1. **Typo** — check the name carefully (e.g. `surface-brand-primary` vs `surface-primary-brand`)
2. **Alias chain** — the token might exist but point to another token. Open the CSS file and trace the `var()` chain.
3. **Invented** — Claude may have generated a plausible-looking token that doesn't actually exist. Ask: *"Is `[token-name]` actually defined in DESIGN.md, or did you invent it?"*

### I need a colour that isn't in any semantic token
Check primitives in `color.css`. If still nothing fits, the design may need a new token — flag it in `#design-systems-dojo`.

### Claude keeps using inline hex values instead of tokens
Re-prompt: *"Rewrite using only `--pepper-*` tokens from DESIGN.md. Do not inline any values."*

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-23 | Initial token reference — colour (semantic groups), typography (full scale), spacing (inset + gap), radius, shadows, focus rings. Interim + proper Figma workflows. Troubleshooting section |
| v1.0.1 | 2026-04-23 | Split typography into Headings (responsive — size changes with screen via Figma modes) and Body / Label / Legal (fixed across screens) |
