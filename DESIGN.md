<!-- Pepper DESIGN.md · v1.2.0 · 2026-04-23 · compare against https://github.com/jh-foong/pepper-design-system/releases -->

# Pepper Design System — DESIGN.md

**Version:** `v1.2.0` · Released 2026-04-23 · [Check for newer](https://github.com/jh-foong/pepper-design-system/releases)

> ⚠️ **Scope — pre-merge state**
>
> These tokens come from an in-progress Figma branch that hasn't been merged to the main Pepperstone library yet. Existing Pepperstone production designs still reference the original token set.
>
> - **Use this spec for:** new designs, concepts, and exploratory work
> - **Do not use for:** extending existing production designs — they will visually mismatch until the Figma branch is merged and legacy designs are migrated (pending AKQA handover and component refactoring)
>
> When generating UI, prefer greenfield output. If a user asks you to extend or match an existing production design that references older tokens, flag the mismatch before proceeding.

> **AI AGENT INSTRUCTIONS — READ FIRST, APPLY TO ALL OUTPUT**
>
> This file is the complete visual specification for **Pepper**, Pepperstone's design system.
> Every UI, HTML, CSS, JSX, or component you generate must comply with the rules and tokens below.
>
> 1. **Colours** — Use only the semantic tokens below, as `var(--token-name)`. Never hard-code hex values.
> 2. **Typography** — Match font family, weight, size, and line-height exactly. Always Manrope.
> 3. **Spacing** — Use only values from the spacing scale (4px grid). No arbitrary numbers.
> 4. **Border radius** — Use only the defined radius tokens.
> 5. **Shadows** — Apply defined elevation tokens. Do not invent shadows.
> 6. **Focus rings** — All interactive elements must use a focus-ring token for accessibility.
> 7. **Language** — Use semantic tokens (e.g. `foreground/text/primary`) over primitive tokens (e.g. `neutral/950`).
> 8. **Unknowns** — If a visual decision is not defined here, ask before inventing it.

## How to use this file

| Platform | Instructions |
|----------|-------------|
| **Claude Design** | Upload as design asset: *Add assets → DESIGN.md*, or attach in chat: *"Design using this DESIGN.md"* |
| **Claude Code** | Place in project root, reference as `@DESIGN.md` |
| **Cursor / Windsurf** | Add to context, prompt: *"Follow @DESIGN.md for all visual decisions"* |
| **GitHub Copilot** | Place in project root for automatic context |
| **Any LLM** | Paste at top of session as system context |

```
You have the Pepper Design System in DESIGN.md. Follow it precisely for ALL visual decisions. No deviations.
```

## What this file covers (and what it doesn't)

**Covered — use tokens from this file, never invent:**

- ✅ Colour (semantic tokens for text, stroke, surface, component-specific)
- ✅ Typography (full type scale with weight, size, line-height)
- ✅ Spacing (4px grid scale + semantic layout/content tokens)
- ✅ Border radius (full radius scale)
- ✅ Shadows and elevation (including focus rings — mandatory for accessibility)
- ✅ Blur (backdrop filters)
- ✅ Font weights

**Not covered yet — ask the user before inventing:**

- ❌ Full component specs (button padding, card anatomy, input states) — ask for specifics or use sensible defaults tied to tokens above
- ❌ Usage patterns (when to use brand/primary vs brand/secondary, when to use shadow-md vs shadow-lg)
- ❌ Motion / animation curves
- ❌ Iconography library and sizes
- ❌ Illustration / imagery guidelines
- ❌ Responsive breakpoints beyond the 1440×1024 canvas

If a visual decision falls into the "not covered" list, pick reasonable defaults that use tokens from this file and explicitly note the assumption to the user.

## Example prompts

Starter prompts that produce on-brand Pepper output. Assume `DESIGN.md` is loaded as context.

| Intent | Prompt |
|--------|--------|
| Landing hero | *"Design a landing page hero for a trading platform. Headline: 'Trade smarter.' Supporting body paragraph, primary CTA, secondary text link. Use DESIGN.md."* |
| Pricing card | *"Design a pricing card: plan name (label-lg), monthly price (heading-h3), four feature bullets (body-md), primary CTA. Radius lg, shadow sm. Use DESIGN.md tokens."* |
| Form | *"Design a sign-up form: email input, password input, primary submit button, legal-xs disclaimer below. Input uses component/input tokens from DESIGN.md."* |
| Buy/sell pair | *"Design a buy/sell button pair for a trading panel. Use component/buysell button tokens. Include hover states. Radius md."* |
| Dark-mode card | *"Design a dark-mode dashboard card showing 'Daily P&L' — value heading-h4, positive/negative indicator using text/positive or text/negative, small sparkline placeholder. Use inverse surface tokens from DESIGN.md."* |
| Notification banners | *"Design success, warning, and error notification banners. Use background/surface/system tokens, text/system tokens, border-radius md, icon on the left."* |

### Prompt tips

- **Always reference DESIGN.md explicitly.** Say *"follow DESIGN.md"* or *"use DESIGN.md tokens"* — this anchors the model.
- **Name the token category** when you can (e.g. *"use component/buysell"* rather than *"green button"*).
- **If the AI invents a spec**, reply with the specific tokens it should use (e.g. *"Use label-md, 12px vertical padding, 24px horizontal padding, radius md, shadow xs"*) and it will correct itself for the rest of the session.

---

## Overview

Pepper is Pepperstone's design system. It defines the complete visual language: colour palette, typography, spacing, shape, elevation, and effects. All tokens are synced from Figma via DesignBridge and published as CSS custom properties and Flutter Dart classes.

- **Primary font**: Manrope (Pepperstone fork)
- **Language support**: English (Manrope), Arabic (Noto Sans Arabic), Traditional Chinese (Noto Sans TC), Japanese (Noto Sans JP)
- **Grid**: 4px base unit
- **Theme**: Light mode by default; dark-mode tokens use `inverse` variants

---

## Colour

### Semantic tokens (use these)

All colours are referenced via CSS custom properties with the `--pepper-color-` prefix.

#### Text (foreground/text/*)

| Token | Value | Use |
|-------|-------|-----|
| `foreground/text/primary` | `#0a0a0a` | Primary body and heading text |
| `foreground/text/secondary` | `#525252` | Secondary / supporting text |
| `foreground/text/disabled` | `#a1a1a1` | Disabled states |
| `foreground/text/brand/default` | `#0165fa` | Links, brand-accented text |
| `foreground/text/brand/strong` | `#000061` | Strong brand headings |
| `foreground/text/inverse/primary` | `#ffffff` | Text on dark surfaces |
| `foreground/text/inverse/secondary` | `#a1a1a1` | Secondary text on dark surfaces |
| `foreground/text/positive` | `#008236` | Gains, confirmations |
| `foreground/text/negative` | `#e7000b` | Losses, errors |
| `foreground/text/system/success` | `#008236` | Success messages |
| `foreground/text/system/error` | `#e7000b` | Error messages |
| `foreground/text/system/warning` | `#ca3500` | Warning messages |

#### Stroke / borders (foreground/stroke/*)

| Token | Value | Use |
|-------|-------|-----|
| `foreground/stroke/strong` | `#0a0a0a` | High-emphasis borders |
| `foreground/stroke/subtle` | `#d4d4d4` | Dividers, subtle borders |
| `foreground/stroke/brand/default` | `#0165fa` | Focused, selected borders |
| `foreground/stroke/brand/strong` | `#000061` | Emphasised brand borders |
| `foreground/stroke/inverse/strong` | `#ffffff` | Borders on dark surfaces |
| `foreground/stroke/inverse/subtle` | `#525252` | Subtle borders on dark surfaces |

#### Surfaces (background/surface/*)

| Token | Value | Use |
|-------|-------|-----|
| `background/surface/primary` | `#ffffff` | Default page / card background |
| `background/surface/brand/primary` | `#0165fa` | Primary CTAs, brand surfaces |
| `background/surface/brand/primary/hover` | `#0032c7` | Primary CTA hover |
| `background/surface/brand/secondary` | `#00d3f3` | Secondary brand surfaces |
| `background/surface/brand/secondary/hover` | `#00b8db` | Secondary brand hover |
| `background/surface/brand/subtle` | `#e6f0ff` | Subtle brand tinted backgrounds |
| `background/surface/brand/subtle/hover` | `#99c1fd` | Subtle brand hover |
| `background/surface/brand/crypto` | `#ff5000` | Crypto-specific brand surface |
| `background/surface/inverse/primary` | `#0a0a0a` | Dark-mode default surface |
| `background/surface/inverse/secondary` | `#262626` | Dark-mode secondary surface |
| `background/surface/system/success` | `#dcfce7` | Success notification background |
| `background/surface/system/error` | `#ffe2e2` | Error notification background |
| `background/surface/system/warning` | `#ffedd4` | Warning notification background |

#### Component-specific

| Token | Value | Use |
|-------|-------|-----|
| `component/input/surface` | `#ffffff` | Input field background |
| `component/input/stroke-default` | `#d4d4d4` | Input default border |
| `component/input/stroke-active` | `#0a0a0a` | Input focused border |
| `component/buysell button/bg-buy-default` | `#008236` | Buy button background |
| `component/buysell button/bg-buy-hover` | `#016630` | Buy button hover |
| `component/buysell button/bg-sell-default` | `#e7000b` | Sell button background |
| `component/buysell button/bg-sell-hover` | `#c10007` | Sell button hover |

> For the full colour set (primitives, opacity variants, state layers, gradients) see [`tokens/css/base/color.css`](tokens/css/base/color.css).

---

## Typography

Always Manrope. Match weight, size, and line-height exactly.

| Style | Weight | Size | Line height | Token |
|-------|--------|------|-------------|-------|
| Heading H1 | 700 | 96px | 100px | `--pepper-typography-heading-h1` |
| Heading H2 | 700 | 72px | 76px | `--pepper-typography-heading-h2` |
| Heading H3 | 700 | 48px | 52px | `--pepper-typography-heading-h3` |
| Heading H4 | 700 | 30px | 36px | `--pepper-typography-heading-h4` |
| Heading H5 | 700 | 24px | 32px | `--pepper-typography-heading-h5` |
| Heading H6 | 700 | 20px | 28px | `--pepper-typography-heading-h6` |
| Body lg | 400 | 18px | 28px | `--pepper-typography-body-lg` |
| Body md | 400 | 16px | 24px | `--pepper-typography-body-md` |
| Body sm | 400 | 14px | 20px | `--pepper-typography-body-sm` |
| Body xs | 400 | 12px | 16px | `--pepper-typography-body-xs` |
| Body 2xs | 400 | 10px | 14px | `--pepper-typography-body-2xs` |
| Label lg | 600 | 18px | 24px | `--pepper-typography-label-lg` |
| Label md | 600 | 16px | 24px | `--pepper-typography-label-md` |
| Label sm | 600 | 14px | 20px | `--pepper-typography-label-sm` |
| Label xs | 600 | 12px | 16px | `--pepper-typography-label-xs` |
| Label 2xs | 600 | 10px | 14px | `--pepper-typography-label-2xs` |
| Legal md | 400 | 16px | 24px | `--pepper-typography-legal-md` |
| Legal xs | 400 | 12px | 16px | `--pepper-typography-legal-xs` |

**Each style also has `*-underlined` and (for md sizes) `*-dashed` variants.**

### When to use what

- **Headings (H1–H6)** — Page titles, section titles, hero text. Never use for body copy.
- **Body** — Paragraph text, descriptions, long-form content. Use `body-md` as default.
- **Label** — Button text, form labels, UI affordances, metadata. Always 600 weight.
- **Legal** — Disclaimers, compliance notices, fine print.

---

## Spacing

4px base grid. Use spacing tokens for all margins, padding, and gaps.

### Scale (`scale/spacing-*`)

| Token | Value | Common use |
|-------|-------|------------|
| `spacing-none` | `0px` | Reset |
| `spacing-2` | `2px` | Hairline gaps |
| `spacing-4` | `4px` | Icon-to-text gaps |
| `spacing-8` | `8px` | Tight component padding |
| `spacing-12` | `12px` | Compact button padding |
| `spacing-16` | `16px` | Default component padding |
| `spacing-20` | `20px` | Card padding (sm) |
| `spacing-24` | `24px` | Card padding (md) |
| `spacing-28` | `28px` | — |
| `spacing-32` | `32px` | Section gaps (sm) |
| `spacing-36` | `36px` | — |
| `spacing-40` | `40px` | Section gaps (md) |
| `spacing-48` | `48px` | Section gaps (lg) |
| `spacing-56` | `56px` | — |
| `spacing-64` | `64px` | Large content gaps |
| `spacing-80` | `80px` | Layout padding / margin |
| `spacing-96` | `96px` | — |
| `spacing-128` | `128px` | Hero / feature sections |
| `spacing-160` | `160px` | — |
| `spacing-256` | `256px` | — |

### Semantic layout

| Token | Value | Use |
|-------|-------|-----|
| `layout/margin` | `80px` | Outer page margin |
| `layout/gutter` | `20px` | Column gutter |
| `layout/pad` | `80px` | Section padding |
| `layout/gap/md` | `40px` | Between layout blocks |
| `layout/gap/lg` | `80px` | Between large sections |
| `content/pad/sm` | `32px` | Card / container padding (sm) |
| `content/pad/md` | `40px` | Card / container padding (md) |
| `content/pad/lg` | `64px` | Card / container padding (lg) |
| `content/gap/xs` | `24px` | Between related content items |
| `content/gap/sm` | `32px` | Between content groups (sm) |
| `content/gap/md` | `40px` | Between content groups (md) |
| `content/gap/lg` | `64px` | Between content groups (lg) |

### Canvas

- **Viewport width**: 1440px
- **Viewport height**: 1024px
- **Columns**: 12

---

## Border radius

| Token | Value | Use |
|-------|-------|-----|
| `radius/none` | `0px` | Sharp edges |
| `radius/xs` | `2px` | Small chips, badges |
| `radius/sm` | `4px` | Inputs, small buttons |
| `radius/md` | `8px` | Buttons, small cards |
| `radius/lg` | `12px` | Cards |
| `radius/xl` | `16px` | Large cards, modals |
| `radius/2xl` | `24px` | Feature cards |
| `radius/3xl` | `32px` | Hero blocks |
| `radius/full` | `9999px` | Pills, avatars |

---

## Elevation — Shadows

| Token | Use |
|-------|-----|
| `--pepper-shadow-2xs` | Subtle lift (input focus, small chip) |
| `--pepper-shadow-xs` | Low elevation (resting button) |
| `--pepper-shadow-sm` | Card resting state |
| `--pepper-shadow-md` | Card hover, dropdown |
| `--pepper-shadow-lg` | Popover, menu |
| `--pepper-shadow-xl` | Modal, dialog |
| `--pepper-shadow-2xl` | Top-level overlay, drawer |

### Focus rings (accessibility — mandatory on interactive elements)

| Token | Use |
|-------|-----|
| `--pepper-shadow-focus-rings-default` | Default focus ring (brand blue) |
| `--pepper-shadow-focus-rings-error` | Focus ring on error states (red) |
| `--pepper-shadow-focus-rings-inverse` | Focus ring on dark surfaces |
| `--pepper-shadow-focus-rings-subtle` | Focus ring on light neutral surfaces |

### Icon effects

| Token | Use |
|-------|-----|
| `--pepper-shadow-icon-light-effect` | Glass / light icon treatment |
| `--pepper-shadow-icon-dark-effect` | Glass / dark icon treatment |

---

## Blur (backdrop filters)

| Token | Value | Use |
|-------|-------|-----|
| `blur/xs` | `4px` | Subtle frosted overlay |
| `blur/sm` | `8px` | Soft frosted overlay |
| `blur/md` | `12px` | Card backdrop |
| `blur/lg` | `16px` | Modal backdrop |
| `blur/xl` | `24px` | Hero glass effect |
| `blur/2xl` | `40px` | Heavy frosted backdrop |
| `blur/3xl` | `64px` | Full-screen blur |

---

## Font weights

| Weight | Value | Use |
|--------|-------|-----|
| Regular | 400 | Body, legal |
| Semi-bold | 600 | Labels |
| Bold | 700 | Headings |

---

## Design rules — mandatory for AI agents

| Category | Rule |
|----------|------|
| Colour | Use semantic tokens only. Reference as `var(--pepper-color-semantic-color-*)`. Never hex literals. |
| Typography | Match family, weight, size, line-height exactly. Always Manrope. |
| Spacing | Use tokens only. Never arbitrary px values. 4px grid. |
| Radius | Use radius tokens only. |
| Shadows | Use shadow tokens. Interactive elements must have a focus-ring token. |
| Components | Mirror defined patterns. Buy actions use green buysell tokens; sell uses red. |
| Accessibility | Every interactive element has a visible focus state. Respect contrast ratios. |
| HTML | Output semantic HTML5 with ARIA roles. Responsive by default. |
| Unknowns | If a decision isn't defined here, ask the user. Do not invent. |

---

## Using tokens in code

### CSS

```css
.button-primary {
  background: var(--pepper-color-semantic-color-background-surface-brand-primary);
  color: var(--pepper-color-semantic-color-foreground-text-inverse-primary);
  padding: var(--pepper-dimension-scale-spacing-12) var(--pepper-dimension-scale-spacing-24);
  border-radius: var(--pepper-border-radius-md);
  font: var(--pepper-typography-label-md);
  box-shadow: var(--pepper-shadow-xs);
}

.button-primary:focus-visible {
  outline: none;
  box-shadow: var(--pepper-shadow-focus-rings-default);
}

.button-primary:hover {
  background: var(--pepper-color-semantic-color-background-surface-brand-primary-hover);
}
```

### Flutter / Dart

```dart
import 'tokens/flutter/colors.dart';
import 'tokens/flutter/dimensions.dart';
import 'tokens/flutter/text_styles.dart';
import 'tokens/flutter/radii.dart';

Container(
  padding: EdgeInsets.symmetric(
    horizontal: AppDimensions.scaleSpacing24,
    vertical: AppDimensions.scaleSpacing12,
  ),
  decoration: BoxDecoration(
    color: AppColors.semanticColorBackgroundSurfaceBrandPrimary,
    borderRadius: BorderRadius.circular(AppRadii.md),
  ),
  child: Text(
    "Sign up",
    style: AppTextStyles.labelLabelMd.copyWith(
      color: AppColors.semanticColorForegroundTextInversePrimary,
    ),
  ),
)
```

---

## Reference — full token files

Everything summarised here is derived from the authoritative token files in this repo:

| File | Contents |
|------|----------|
| [`tokens/css/base/color.css`](tokens/css/base/color.css) | All colour tokens (primitives + semantic) |
| [`tokens/css/base/typography.css`](tokens/css/base/typography.css) | Composite text style tokens |
| [`tokens/css/base/font-size.css`](tokens/css/base/font-size.css) | Font size scale |
| [`tokens/css/base/line-height.css`](tokens/css/base/line-height.css) | Line height scale |
| [`tokens/css/base/font-weight.css`](tokens/css/base/font-weight.css) | Font weight tokens |
| [`tokens/css/base/space.css`](tokens/css/base/space.css) | Spacing scale |
| [`tokens/css/base/dimension.css`](tokens/css/base/dimension.css) | Global dimension units |
| [`tokens/css/base/border-radius.css`](tokens/css/base/border-radius.css) | Radius tokens |
| [`tokens/css/base/shadow.css`](tokens/css/base/shadow.css) | Shadows + focus rings |
| [`tokens/css/base/blur.css`](tokens/css/base/blur.css) | Backdrop blur tokens |
| [`tokens/css/base/opacity.css`](tokens/css/base/opacity.css) | Opacity tokens |
| [`tokens/css/base/gradient.css`](tokens/css/base/gradient.css) | Named gradients |
| [`tokens/flutter/`](tokens/flutter/) | Flutter / Dart equivalents |
| [`source/VARIABLE COLLECTIONS v1.0.0.md`](source/VARIABLE%20COLLECTIONS%20v1.0.0.md) | Raw Figma variable export |
| [`source/STYLES v1.0.0.md`](source/STYLES%20v1.0.0.md) | Raw Figma style export |

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.2.0 | 2026-04-23 | Added pre-merge scope callout at top — flags this as for new/exploratory work only, instructs AI agents to surface mismatches when asked to extend existing designs |
| v1.1.0 | 2026-04-23 | Added "What this file covers" (known limitations) and "Example prompts" sections |
| v1.0.0 | 2026-04-23 | Initial DESIGN.md — curated AI-ingestable spec for Pepper |
