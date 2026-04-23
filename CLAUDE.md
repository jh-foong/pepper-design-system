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

Figma Variables → DesignBridge plugin → `.md` export → Claude → CSS + Dart token files → GitHub PR → merge → GitHub Release tag.

See [`docs/figma-claude-sync.md`](docs/figma-claude-sync.md) for the full workflow.

---

## Repo Structure

```
/
├── DESIGN.md                # AI-ingestable visual spec for Claude Design, Cursor, Copilot
├── README.md                # Project overview
├── CLAUDE.md                # This file — AI context
├── docs/
│   ├── designer-quickstart.md  # 10-min designer handoff guide
│   ├── getting-started.md      # Designer + developer setup
│   ├── resources.md            # External sources (fonts, Figma, GitHub)
│   └── figma-claude-sync.md    # Token sync workflow
├── tokens/
│   ├── css/                 # CSS custom properties
│   └── flutter/             # Flutter / Dart equivalents
└── source/                  # Raw Figma DesignBridge exports (version history)
```
