# Pepper Design System — Claude Context

Pepper Design System is Pepperstone's design system. This repository holds the AI-ingestable spec (`DESIGN.md`), design tokens (CSS + Flutter), Figma source exports, and documentation.

**Audience for this file:** anyone using Claude (Claude Code, Claude Design, etc.) to work on this repo. For personal preferences and individual workflow notes, see `CLAUDE.local.md` (gitignored, optional).

---

## Standing rule: surface ready-to-use PR text after every push

After pushing changes, always surface:

1. **The PR link** (create-PR URL if the PR doesn't exist yet, or the existing PR URL)
2. **A copy-paste-ready PR title** (under 70 chars)
3. **A copy-paste-ready PR description** in a fenced code block so it can be pasted into GitHub without formatting breaking

Designers and PMs reviewing the PR shouldn't have to hunt for URLs or write PR copy from scratch.

## Standing rule: always add a plain-English recap

For anything significant — a PR, a new doc section, a strategic decision, a multi-step change, or anything a non-technical reviewer needs to evaluate — finish with a **"Plain-English recap"** section.

**Why:** this repo is owned and maintained primarily by designers and PMs, many without coding backgrounds. PR titles and technical bullet points alone aren't enough to make a confident review decision.

**Format:** numbered list, 1-3 sentences per point, zero jargon. Translate "we added a CDN `<link>` for token loading" into "if a designer drops DESIGN.md into an empty folder and asks Claude to build something, the result will now actually look like Pepper." Lead with the *user-visible outcome*, not the implementation.

**Always include after:**
- Pushing a PR (alongside the copy-paste title + description)
- Completing a multi-file change
- Drafting a release plan, migration plan, or roadmap update
- Anything where the user said "explain this" or "review this"

**Skip for:** trivial one-liners, follow-up clarifications mid-thread, quick status checks ("merged it", "pushed").

---

## Naming convention in prose

- **"Pepper Design System"** — use in headings and body copy when referring to the product/brand
- **"Pepper DS"** — acceptable shorthand in tight spaces (tables, short headings)
- **"Pepperstone"** — company name, untouched
- **`pepper-core-*`** / **`PepperCore*`** — primitive token identifiers (raw scale values)
- **`pepper-*`** / **`Pepper*`** — semantic/component/state/overlay token identifiers (use these in UI)
- **Never "Pepper" alone in prose** — ambiguous; always qualify

## Standing rule: preserve the README headline + humour

The `README.md` top-of-page must always keep:

1. **Heading:** `# 🥵 🌶️ 🔥 Pepper Design System` — emojis in front
2. **Intro line:** `Pepper DS Core is Pepperstone's design system — ...`
3. **Spicy tagline** (below the version line): `> 🌶️ **Heads up — things are about to get spicy.** 🎵 [Press play first](https://www.youtube.com/watch?v=rbc_LxfhSoY)`

Do NOT remove these in future edits. If you're restructuring the README, move them together as a unit but keep them. The spice is part of the brand voice.

---

## Key Resources

| Resource | URL | Notes |
|----------|-----|-------|
| Docs site | https://jh-foong.github.io/pepper-design-system/ | Front door — hosted docs for designers, PMs, devs |
| Figma | https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT | Branch of main file — read-only until merged |
| GitHub | https://github.com/jh-foong/pepper-design-system | Public sandbox — official home will move to Pepperstone org once permissions are sorted |

---

## Fonts

| Font | Source | Use |
|------|--------|-----|
| Manrope (Pepperstone fork) | https://github.com/jh-foong/manrope | Primary — headings, body, labels |
| Noto Sans Arabic | Google Fonts | Arabic language support |
| Noto Sans TC | Google Fonts | Traditional Chinese support |
| Noto Sans JP | Google Fonts | Japanese support |

---

## Design Token Categories

Token groups exported from Figma via DesignBridge:

- **Color** — semantic and primitive tokens
- **Typography** — composite text styles (Heading, Body, Label, Legal)
- **Font Family / Font Size / Font Weight / Line Height** — individual type primitives
- **Space** — spacing scale (4px base grid)
- **Dimension** — global unit scale
- **Size** — component sizing
- **Border Radius / Border Width** — shape tokens
- **Blur / Shadow / Opacity / Gradient** — effect tokens (includes focus rings)

---

## Token Pipeline

Figma Variables → DesignBridge plugin → `.md` export → Claude → CSS + Dart token files → downstream formats (`tokens/json/` DTCG, `tokens/experimental/*`) → GitHub PR → merge → GitHub Release tag.

The CSS files in `tokens/css/base/` are the source of truth. Every other format is derived from them:
- `tokens/json/tokens.json` — Tier 2, W3C DTCG, semantic aliases preserved
- `tokens/experimental/` — Tier 3, untested platform exports (iOS Swift, Android XML, React Native TS, Tailwind), semantic tokens resolved to final values

See [`docs/figma-claude-sync.md`](docs/figma-claude-sync.md) for the full workflow.

### Standing flow: token sync

When the user says "I just updated some tokens — what do I do now?" (or any variant like "new token export", "I updated Figma tokens", "synced from Figma"), run this flow without re-asking the steps:

1. **Locate the new DesignBridge export** — ask for the path if not obvious (usually `source/designbridge-YYYY-MM-DD.md`)
2. **Apply the two-prefix split** (primitives → `pepper-core-*`, semantics → `pepper-*`) per the rename table below
3. **Regenerate** `tokens/css/`, `tokens/flutter/`, `tokens/json/`, `tokens/experimental/*`
4. **Update** `DESIGN.md` version stamp + any affected token references
5. **Diff summary** — explain in plain English what actually changed (colours renamed, new tokens added, removed tokens). No jargon.
6. **Branch + commit + push** on a new branch named `tokens/sync-YYYY-MM-DD`
7. **Surface** (per the "after every push" standing rule): PR link + copy-paste title + copy-paste description in a fenced code block
8. **After PR is merged**, proactively offer:
   - GitHub release draft — tag (bump per semver: new tokens = minor, fix = patch), title, description — link: https://github.com/jh-foong/pepper-design-system/releases/new
   - Slack post copy for `#design-systems-dojo` including: what changed, what designers need to do (re-download `DESIGN.md` from Raw), release link

Treat any similar phrasing the same way.

---

### ⚠️ Standing rule: two-prefix model on every sync

As of v2.0.0, Pepper Design System uses a **two-prefix token model**:

- **`--pepper-core-*`** = **primitive** tokens. Raw scale values with no UI meaning (e.g. `color-red-500`, `space-4`, `radius-md` as raw `8px`). Building blocks. Don't use directly in product.
- **`--pepper-*`** = **semantic, component, static, state, and overlay** tokens. These reference primitives and carry UI meaning (e.g. `bg-primary`, `text-error`, `surface-brand-primary`). Use these in product.

DesignBridge exports **everything** with the raw `pepper-` prefix. Claude MUST split on processing: primitives get renamed to `--pepper-core-*`, semantics stay as `--pepper-*`.

**How to tell primitive vs semantic (heuristic):**

- **Primitive** — raw scale value, no UI meaning. Name looks like a palette entry or a step on a scale: `color-red-500`, `color-neutral-900`, `space-4`, `radius-md`, `font-size-16`, `line-height-24`.
- **Semantic / component / state / overlay** — references a primitive and names a UI role: `bg-primary`, `text-error`, `surface-brand-primary`, `stroke-default`, `overlay-medium`, `color-static-surface-system-error`. If the name tells you *where it goes in the UI*, it's semantic.

When in doubt, check `tokens/css/base/` — the canonical files already reflect the split.

**Per-format rename table:**

| Format | Primitives (→ Core) | Semantics (stay) |
|---|---|---|
| CSS custom properties | raw-scale `--pepper-*` → `--pepper-core-*` | semantic `--pepper-*` stays as-is |
| Flutter / Dart | primitive `pepper*` identifiers → `pepperCore*` | semantic `pepper*` stays as `pepper*` |
| JSON (DTCG) | primitive prefixed names → `pepper-core-*` | semantic group keys stay as-is |
| iOS Swift | primitive `Pepper*` enums → `PepperCore*` | semantic `Pepper*` stays as `Pepper*` |
| Android XML | primitive `pepper_*` names → `pepper_core_*` | semantic `pepper_*` stays as `pepper_*` |
| React Native TS | primitive `pepper*` exports → `pepperCore*` | semantic `pepper*` stays as `pepper*` |
| Tailwind config | primitive `pepper-*` keys → `pepper-core-*` | semantic `pepper-*` stays as `pepper-*` |
| DESIGN.md · docs | primitive refs → `--pepper-core-*` | semantic refs → `--pepper-*` |

Do NOT commit files with the raw DesignBridge `pepper-` prefix on primitives. Do NOT rename semantic `pepper-*` tokens to `pepper-core-*` — that was the v1.3.0 rule and is no longer correct.

---

## Repo Structure

```
/
├── DESIGN.md                # AI-ingestable visual spec for Claude Design, Cursor, Copilot
├── README.md                # Project overview
├── CLAUDE.md                # This file — universal AI context (committed)
├── CLAUDE.local.md          # Personal AI context (gitignored, optional)
├── docs/
│   ├── designer-quickstart.md  # 10-min designer handoff guide
│   ├── designer-cheat-sheet.md # Two-prompt vibe-coding workflow
│   ├── token-reference.md      # Token cheatsheet + how to apply in Figma
│   ├── getting-started.md      # Designer + developer setup
│   ├── resources.md            # External sources (fonts, Figma, GitHub)
│   └── figma-claude-sync.md    # Token sync workflow
├── tokens/
│   ├── css/                 # Tier 1: CSS custom properties (canonical)
│   ├── flutter/             # Tier 1: Flutter / Dart equivalents (canonical)
│   ├── json/                # Tier 2: W3C DTCG JSON (interop)
│   └── experimental/        # Tier 3: untested iOS/Android/RN/Tailwind exports
└── source/                  # Raw Figma DesignBridge exports (version history)
```
