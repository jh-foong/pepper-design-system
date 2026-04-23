# Pepper Design System — Claude Context

Pepper is Pepperstone's design system. This repository holds the AI-ingestable spec (`DESIGN.md`), design tokens (CSS + Flutter), Figma source exports, and documentation.

The person working in this repo is **Junhan Foong**, a Product Designer with no coding background. Keep all explanations non-technical. Prefer UI-based workflows over CLI or code where possible.

---

## Key Resources

| Resource | URL | Notes |
|----------|-----|-------|
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

### ⚠️ Standing rule: rename `pepper-` → `pepper-core-` on every sync

DesignBridge emits tokens with the `pepper-` prefix and has no setting to change it. Junhan has decided the canonical prefix should be `pepper-core-` instead.

**Every time a DesignBridge export is processed, Claude MUST rename the prefix before regenerating any output files.** Apply across all formats:

| Format | Rename |
|---|---|
| CSS custom properties | `--pepper-*` → `--pepper-core-*` |
| Flutter / Dart | `pepper*` identifiers → `pepperCore*` |
| JSON (DTCG) | Top-level group keys stay semantic; any prefixed names become `pepper-core-*` |
| iOS Swift | `Pepper*` enums → `PepperCore*` |
| Android XML | `pepper_*` names → `pepper_core_*` |
| React Native TS | `pepper*` exports → `pepperCore*` |
| Tailwind config | `pepper-*` keys → `pepper-core-*` |
| DESIGN.md · docs | Every visible `--pepper-*` reference → `--pepper-core-*` |

If the incoming DesignBridge export still uses the raw `pepper-` prefix, treat that as expected — just rename on the way through. Do NOT commit files with the raw `pepper-` prefix to `tokens/` after a sync.

---

## Repo Structure

```
/
├── DESIGN.md                # AI-ingestable visual spec for Claude Design, Cursor, Copilot
├── README.md                # Project overview
├── CLAUDE.md                # This file — AI context
├── docs/
│   ├── designer-quickstart.md  # 10-min designer handoff guide
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
