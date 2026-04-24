# Token Reference & Cheatsheet

A lookup guide for when Claude suggests a token and you need to know what it is or how to apply it in Figma.

---

## How to use this doc

1. Claude suggests something like *"use `--pepper-color-bg-surface-brand-primary`"*
2. Find the token category below (colour, typography, spacing, etc.)
3. Look up the value or its linked source file
4. Apply it in Figma — see [Applying tokens in Figma](#applying-tokens-in-figma) at the bottom

All token values are sourced from [`tokens/css/base/`](../tokens/css/). If a token isn't listed here, check the raw CSS file for that category.

---

## Naming convention

Pepper Design System uses a **two-prefix model** (v2.0.0+):

```
--pepper-core-[category]-[scale]   ← primitives (raw values, building blocks)
--pepper-[category]-[group]-[variant]   ← semantic / component / static / state / overlay (use these)
```

Examples:

**Primitives (`--pepper-core-*`) — raw ingredients, don't use directly:**
- `--pepper-core-color-brand-primary-blue-500` — a specific blue on the palette
- `--pepper-core-color-neutral-950` — a specific neutral step

**Semantic (`--pepper-*`) — use these in UI work:**
- `--pepper-color-bg-surface-brand-primary` — a brand surface background
- `--pepper-typography-heading-h1` — composite text style for H1
- `--pepper-space-inset-md` — medium inset (internal padding)
- `--pepper-border-radius-lg` — large border radius

> 💡 Prefer **semantic tokens** (`--pepper-*`, e.g. `surface-brand-primary`) over **primitive tokens** (`--pepper-core-*`, e.g. `red-700`). Semantic tokens adapt to light/dark themes automatically.

---

## Colour

Colour tokens are layered:

- **Primitive** — raw palette (e.g. `red-700`, `neutral-950`). Don't use directly.
- **Semantic** — meaning-based (e.g. `surface-brand-primary`, `text/primary`). **Use these by default.** Automatically swap between light and dark themes.
- **Static** — theme-agnostic (e.g. `static-color-surface-brand-primary`). Keep the same value in light and dark mode. Use only when you need a fixed colour that shouldn't flip with theme.

### Understanding light vs dark (and inverse)

Before picking a colour token, it helps to understand how Pepper Design System handles themes and what "inverse" actually means.

#### The mirror line

Picture a neutral colour scale running from white to near-black. There's a "mirror line" roughly in the middle. Everything on one side is the **default family**; everything on the other is the **inverse family**.

```
Default  ←————————|————————→  Inverse
 0  100  200  300 | 900  1000  1100  1200
```

- In **light mode**, default = light end, inverse = dark end
- In **dark mode**, the scale flips — default = dark end, inverse = light end

**Same tokens. The values behind them swap when the theme changes.** Designers don't manually re-tag anything — picking `surface-primary` and `surface-inverse-primary` is enough.

#### Default vs Inverse

- **Default** — the colour you'd expect for this theme (e.g. a light surface in light mode)
- **Inverse** — the *opposite end of the scale within the current theme*, used for emphasis

> ⚠️ **"Inverse" is not a synonym for "dark."** A banner using `surface-inverse-primary` in **light** mode reads as dark-on-light. Flip to **dark** mode and that same banner becomes light-on-dark — because inverse means "the other end," and the other end has moved.

**Example:** a hero banner inside a light-mode page. Use `surface-inverse-primary` + `text-inverse-primary` → banner reads dark. Toggle to dark mode → banner reads light. You didn't change tokens, the theme did.

#### What flips, what doesn't

| Token layer | Behaviour when theme switches |
|---|---|
| **Semantic — default** (e.g. `surface-primary`) | Flips — light-end ↔ dark-end |
| **Semantic — inverse** (e.g. `surface-inverse-primary`) | Flips in sync — dark-end ↔ light-end |
| **Static** (e.g. `static-color-surface-brand-primary`) | Does **not** flip — anchored to a specific value |

#### How to choose (3-question flow)

1. **Should this element feel "default" within whatever theme the user is on?** → use a **default semantic** token (`surface-primary`, `text-primary`, `stroke-default`)
2. **Do I want high contrast emphasis within the theme?** (e.g. hero banner, inverse card) → use an **inverse semantic** token (`surface-inverse-primary`, `text-inverse-primary`)
3. **Must this colour stay the same regardless of theme?** → use a **static** token (see [Static colours](#static-colours-theme-agnostic) below)

Common static use cases: **brand identity** (logos, brand-blue buttons), **text over media** (image/video backgrounds that don't flip with theme), **system status** (success/error/warning — red shouldn't invert).

#### 1:1 mirror is a concept, not a constraint

Defaults and inverses don't have to be exact mathematical opposites. The DS team picks inverse values that respect **brand and accessibility** — so `surface-inverse-primary` might land on neutral-1200 while `surface-primary` is neutral-0, even if the "true" mirror would be neutral-1100. Think "opposite end of the scale," not "exact complement."

---

### Semantic colour groups

| Group | Use for | Example token |
|-------|---------|---------------|
| `text/*` | Body text, headings, labels | `--pepper-color-fg-text-primary` |
| `stroke/*` | Borders, dividers, outlines | `--pepper-color-fg-stroke-default` |
| `surface/*` | Backgrounds, fills, cards | `--pepper-color-bg-surface-primary` |
| `brand/*` | Brand-specific fills and accents | `--pepper-color-fg-stroke-brand-default` |

**Full reference:** [`tokens/css/base/color.css`](../tokens/css/base/color.css) — 860+ lines, searchable with Cmd+F

> 💡 Ask Claude: *"What's the hex value of `--pepper-color-bg-surface-primary` in light mode?"* — it can trace the alias chain for you.

### Static colours (theme-agnostic)

Static tokens **do not flip between light and dark mode** — they hold the same value regardless of theme. Use them when a colour must stay fixed (e.g. a brand-blue surface that should read as brand-blue in both light and dark mode, not invert).

See [Understanding light vs dark (and inverse)](#understanding-light-vs-dark-and-inverse) above for how static fits alongside default and inverse semantics.

Common static groups:

| Group | Use for | Example token |
|-------|---------|---------------|
| `static-color-surface-brand-*` | Brand fills that must not invert | `--pepper-color-static-surface-brand-primary` |
| `static-color-surface-system-*` | System status fills (success, error, warning) that keep hue across themes | `--pepper-color-static-surface-system-error` |
| `static-color-text-*` / `-icon-*` | Fixed text/icon colours (e.g. always-white on a brand fill) | `--pepper-color-static-text-inverse-primary` |
| `static-color-stroke-inverse-*` | Borders on inverse surfaces | `--pepper-color-static-stroke-inverse-strong` |
| `static-overlay-*` | Scrim / modal backdrops | `--pepper-color-static-overlay-medium` |
| `static-effect-glass-*` | Frosted-glass effects | `--pepper-color-static-effect-glass-primary-low` |

> ⚠️ **Rule of thumb:** reach for **semantic** first. Only use **static** when you've got a specific reason the colour shouldn't adapt to theme — otherwise dark-mode users will see a glaring light-mode colour (or vice versa).

> 📝 **Coming from the old DS?** These were previously called **"fixed"** tokens. They've been renamed to **"static"** and split into their own layer to make theme-agnostic colours easier to manage and isolate from the semantic set.

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

## Stroke (border width)

Line thickness for borders, dividers, and outlines. Pair with a `stroke/*` colour token (see [Colour](#colour)) to set both width and colour.

### General strokes

| Token | Value | Use for |
|-------|-------|---------|
| `--pepper-border-width-stroke-width-none` | 0 | No border |
| `--pepper-border-width-stroke-width-xs` | 1px | Default — inputs, cards, dividers |
| `--pepper-border-width-stroke-width-sm` | 2px | Emphasised borders, focus edges |
| `--pepper-border-width-stroke-width-md` | 4px | Heavy borders, selected states |
| `--pepper-border-width-stroke-width-lg` | 8px | Very heavy accents |

### Icon strokes (scale with icon size)

Icon line thickness scales proportionally to icon size — roughly **6.25% of the icon's pixel size**. Use the token that matches the icon you're drawing.

| Token | Icon size | Stroke |
|-------|-----------|--------|
| `--pepper-border-width-stroke-icon-width-icon-12` | 12px | 0.75px |
| `--pepper-border-width-stroke-icon-width-icon-16` | 16px | 1px |
| `--pepper-border-width-stroke-icon-width-icon-20` | 20px | 1.25px |
| `--pepper-border-width-stroke-icon-width-icon-24` | 24px | 1.5px |
| `--pepper-border-width-stroke-icon-width-icon-28` | 28px | 1.75px |
| `--pepper-border-width-stroke-icon-width-icon-32` | 32px | 2px |
| `--pepper-border-width-stroke-icon-width-icon-36` | 36px | 2.25px |
| `--pepper-border-width-stroke-icon-width-icon-40` | 40px | 2.5px |
| `--pepper-border-width-stroke-icon-width-icon-48` | 48px | 3px |
| `--pepper-border-width-stroke-icon-width-icon-56` | 56px | 3.5px |
| `--pepper-border-width-stroke-icon-width-icon-64` | 64px | 4px |

**Full reference:** [`tokens/css/base/border-width.css`](../tokens/css/base/border-width.css)

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

> ⚠️ **The new Pepper Design System Figma library isn't merged yet** (pending vendor A handover). Until then, use the interim workflow below.

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
   > *"Using `--pepper-color-bg-surface-brand-primary` (#XYZ) — swap to variable once library merges."*

### Proper workflow (post-merge)

Once the Figma branch is merged:

1. Open **Variables** panel (right side, in design mode)
2. Find the Pepper Design System collection → search for the token name
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
Re-prompt: *"Rewrite using only `--pepper-*` semantic tokens from DESIGN.md (or `--pepper-core-*` primitives where genuinely needed). Do not inline any values."*

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-23 | Initial token reference — colour (semantic groups), typography (full scale), spacing (inset + gap), radius, shadows, focus rings. Interim + proper Figma workflows. Troubleshooting section |
| v1.0.1 | 2026-04-23 | Split typography into Headings (responsive — size changes with screen via Figma modes) and Body / Label / Legal (fixed across screens) |
| v1.0.2 | 2026-04-23 | Added Stroke (border width) section — general strokes (none → lg) and icon strokes that scale with icon size |
| v1.0.3 | 2026-04-23 | Added Static colours subsection — theme-agnostic tokens that don't flip between light/dark mode (brand, system, overlay, glass) |
| v1.0.4 | 2026-04-23 | Added migration note for designers coming from the old DS — "fixed" tokens have been renamed to "static" and separated into their own layer |
| v1.0.5 | 2026-04-23 | Added "Understanding light vs dark (and inverse)" section — mirror-line mental model, default vs inverse clarified (inverse ≠ dark), flip-vs-static behaviour table, 3-question decision flow, and a 1:1 mirror caveat. Adapted from the old Figma explainer frames. |
| v1.1.0 | 2026-04-24 | v2.0.0 sweep — rewrote naming-convention section for two-prefix model (`--pepper-core-*` primitives vs `--pepper-*` semantic/static/etc), fixed semantic-example tokens that were still prefixed `--pepper-core-*` (static overlay, static glass, brand-primary mentions, typography in troubleshooting prompt). |
