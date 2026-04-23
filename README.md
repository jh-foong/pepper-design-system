# Pepper Design System

Pepper is Pepperstone's design system — a shared library of design decisions, UI components, and guidelines that helps teams build consistent, high-quality digital experiences.

**Current version:** [`v1.1.0`](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.1.0) · [See all releases →](https://github.com/jh-foong/pepper-design-system/releases)

---

## 🎨 Designers — start here

**Option 1 — Claude Code (recommended)**
1. Open Claude Code → **File → Clone repository**
2. Paste: `https://github.com/jh-foong/pepper-design-system`
3. Prompt: *"Follow @DESIGN.md. Design a [thing]."*

**Option 2 — Quick trial (any AI)**
1. Download [DESIGN.md](DESIGN.md) → click **Raw** → **Cmd+S**
2. Upload it to Claude Design / ChatGPT / Cursor
3. Prompt: *"Follow DESIGN.md. Design a [thing]."*

Full walkthrough: [Designer Quickstart →](docs/designer-quickstart.md)

---

## What's in this repo

- **[DESIGN.md](DESIGN.md)** — Curated AI-ingestable visual spec. Drop into Claude Design, Claude Code, Cursor, or Copilot to generate on-brand Pepper UI
- **Design tokens** — Colour, typography, spacing, shadows, and more:
  - CSS variables → [`tokens/css/`](tokens/css/)
  - Flutter / Dart → [`tokens/flutter/`](tokens/flutter/)
- **Figma source files** — Raw DesignBridge exports in [`source/`](source/) for version history and diffing
- **Documentation** — Guides for designers and developers on how to use the system

## Key Links

| | Link |
|-|------|
| Figma | [Pepperstone DS (branch)](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT) |
| Fonts | [Manrope fork](https://github.com/jh-foong/manrope) · [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) · [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC) · [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) |
| GitHub | [jh-foong/pepper-design-system](https://github.com/jh-foong/pepper-design-system) _(public sandbox — official home will move to Pepperstone org once permissions are sorted)_ |
| Releases | [All versions](https://github.com/jh-foong/pepper-design-system/releases) |

## Documentation

- [DESIGN.md](DESIGN.md) — Full AI-ready visual spec (colours, typography, spacing, shadows, rules)
- [Designer Quickstart](docs/designer-quickstart.md) — 15-min setup to vibe code with Pepper in Claude Design, Claude Code, Cursor, or any AI tool
- [Getting Started](docs/getting-started.md) — How to use Pepper as a designer or developer
- [Resources](docs/resources.md) — Fonts, Figma, and all external sources
- [Figma → Claude Sync](docs/figma-claude-sync.md) — How design tokens are synced from Figma to this repo

## Using with AI tools

[`DESIGN.md`](DESIGN.md) is the single source of truth for AI tools generating Pepper UI.

| Tool | How to use |
|------|-----------|
| **Claude Design** | Upload as a design asset: *Add assets → DESIGN.md* |
| **Claude Code** | Place in project root, reference as `@DESIGN.md` |
| **Cursor / Windsurf** | Add to context, prompt: *"Follow @DESIGN.md for all visual decisions"* |
| **GitHub Copilot** | Place in project root — picked up automatically |
| **Any LLM** | Paste at top of session as system context |

## Repo structure

```
/
├── DESIGN.md                # AI-ingestable visual spec
├── README.md                # This file
├── CLAUDE.md                # Project context for Claude
├── docs/                    # Designer and developer guides
├── tokens/
│   ├── css/                 # CSS custom properties
│   └── flutter/             # Flutter / Dart equivalents
└── source/                  # Raw Figma DesignBridge exports
```

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| [v1.1.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.1.0) | 2026-04-23 | Added `DESIGN.md`, raw Figma source files, and legal text styles (+ body-2xs, label-xs/2xs). Fixed Flutter `labelLabelLg` weight bug |
| v1.0.4 | 2026-04-23 | Cleaned up docs — removed Supernova references, added changelogs |
| v1.0.3 | 2026-04-23 | Removed Supernova scripts |
| v1.0.2 | 2026-04-23 | Replaced Supernova sync doc with Figma + Claude workflow guide |
| v1.0.1 | 2026-04-23 | Migrated pipeline attribution from Supernova to Claude + Figma across all token files |
| v1.0.0 | 2026-04-23 | Initial release — baseline Pepper token set (CSS + Dart) |
