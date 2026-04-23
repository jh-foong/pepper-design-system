# Pepper Design System

Pepper is Pepperstone's design system — a shared library of design decisions, UI components, and guidelines that helps teams build consistent, high-quality digital experiences.

## What's in this repo

- **[`DESIGN.md`](DESIGN.md)** — Curated, AI-ingestable visual spec for use with Claude Design, Claude Code, Cursor, Copilot, and other LLMs
- **Design tokens** — Colour, typography, spacing, elevation, and more, exported as CSS variables (`tokens/css/`) and Flutter Dart (`tokens/flutter/`)
- **Source files** — Raw Figma DesignBridge exports in `source/` for version history and diffing
- **Documentation** — Guides for designers and developers on how to use the system

## Key Links

| | Link |
|-|------|
| Figma | [Pepperstone DS (branch)](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT) |
| Fonts | [Manrope fork](https://github.com/jh-foong/manrope) · Noto Sans Arabic · Noto Sans TC · Noto Sans JP |
| GitHub | [jh-foong/pepper-ds](https://github.com/jh-foong/pepper-ds) _(test repo — will migrate to Pepperstone org)_ |
| Releases | [All versions](https://github.com/jh-foong/pepper-ds/releases) |

## Documentation

- [DESIGN.md](DESIGN.md) — Full AI-ready visual spec (colours, typography, spacing, shadows, rules)
- [Getting Started](docs/getting-started.md) — How to use Pepper as a designer or developer
- [Resources](docs/resources.md) — Fonts, Figma, and all external sources
- [Figma → Claude Sync](docs/figma-claude-sync.md) — How design tokens are synced from Figma to this repo

## Using with AI tools

`DESIGN.md` is designed to be the single source of truth for any AI tool generating Pepper UI. Upload it to Claude Design as an asset, reference it in Claude Code / Cursor as `@DESIGN.md`, or place it at the root of any project for automatic pickup by GitHub Copilot.

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.1.0 | 2026-04-23 | Added DESIGN.md, raw Figma source files, and legal text styles (+ body-2xs, label-xs/2xs). Fixed Flutter labelLabelLg weight bug |
| v1.0.4 | 2026-04-23 | Cleaned up docs — removed Supernova references, added changelogs |
| v1.0.3 | 2026-04-23 | Removed Supernova scripts |
| v1.0.2 | 2026-04-23 | Replaced Supernova sync doc with Figma + Claude workflow guide |
| v1.0.1 | 2026-04-23 | Migrated pipeline attribution from Supernova to Claude + Figma across all token files |
| v1.0.0 | 2026-04-23 | Initial release — baseline Pepper token set (CSS + Dart) |
