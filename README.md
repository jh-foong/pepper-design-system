# 🥵 🌶️ 🔥 Pepper Design System

Pepper DS Core is Pepperstone's design system — a shared library of design decisions, UI components, and guidelines that helps teams build consistent, high-quality digital experiences.

**Current version:** [`v2.0.0`](https://github.com/jh-foong/pepper-design-system/releases/tag/v2.0.0) · [See all releases →](https://github.com/jh-foong/pepper-design-system/releases)

**Docs site:** [jh-foong.github.io/pepper-design-system](https://jh-foong.github.io/pepper-design-system/)

> 🌶️ **Heads up — things are about to get spicy.** 🎵 [Press play first](https://www.youtube.com/watch?v=rbc_LxfhSoY)

---

> ### Quick scope
>
> - ✅ **Use Pepper Design System for:** new features, concepts, prototypes, pitches
> - ⚠️ **Don't use for:** extending existing production designs (they'll mismatch until Figma library merges — pending vendor A handover)
> - 🎨 **Where to start:** see "Designers — start here" below
> - 🆘 **Stuck?** → [Designer FAQ](docs/designer-faq.md)

---

## 🎨 Designers — start here

**Option 1 — Claude Design (recommended, no install)**
1. Download [DESIGN.md](DESIGN.md) → click **Raw** → **Cmd+S**
2. Open [claude.ai](https://claude.ai) → attach `DESIGN.md` (or add it to a Claude Project so it persists across chats)
3. Prompt: *"Follow DESIGN.md. Design a [thing]."*

**Option 2 — Claude Code (for designers who want local prototype files)**

> ⚠️ Don't clone *this* repo to prototype in — it's the source of truth for tokens. Use a separate scratch folder.

1. Make a scratch folder (e.g. `~/Documents/Pepper Prototypes/`) and drop [DESIGN.md](DESIGN.md) into it
2. In Terminal, `cd` into the scratch folder and run `claude`
3. Prompt: *"Follow @DESIGN.md. Build a [thing] and save it to `[feature]/index.html`."*

Full walkthrough: [Designer Quickstart →](docs/designer-quickstart.md)

📋 **Need just the prompts?** [Designer Cheat Sheet →](docs/designer-cheat-sheet.md) — the two key prompts (Design → HTML → React) on one page.

---

## What's in this repo

- **[DESIGN.md](DESIGN.md)** — Curated AI-ingestable visual spec. Drop into Claude Design, Claude Code, Cursor, or Copilot to generate on-brand UI with Pepper Design System
- **Design tokens** — Colour, typography, spacing, shadows, and more. See the [Token formats](#token-formats) table below for all available exports.
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

**Designers — start here:**
- [Designer Quickstart](docs/designer-quickstart.md) — 10-min setup, attach DESIGN.md to your AI tool
- [Designer Cheat Sheet](docs/designer-cheat-sheet.md) — the two key prompts (Design → HTML → React) on one page
- [Designer FAQ](docs/designer-faq.md) — troubleshooting and common gotchas

**Reference (when you need it):**
- [DESIGN.md](DESIGN.md) — AI-ingestable visual spec
- [Token Reference](docs/token-reference.md) — look up any token + how to apply in Figma
- [Resources](docs/resources.md) — fonts, Figma, external sources
- [Getting Started](docs/getting-started.md) — general intro for designers and developers

**For maintainers:**
- [Figma → Claude Sync](docs/figma-claude-sync.md) — how tokens are synced from Figma
- [Supporting designers](docs/supporting-designers.md) — DS-team playbook for diagnosing stale or edited DESIGN.md copies

## Using with AI tools

[`DESIGN.md`](DESIGN.md) is the single source of truth for AI tools generating UI with Pepper Design System.

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
│   ├── css/                 # CSS custom properties (canonical)
│   ├── flutter/             # Flutter / Dart equivalents (canonical)
│   ├── json/                # W3C DTCG JSON (interop — Style Dictionary, Token Studio)
│   └── experimental/        # Tier 3 untested: iOS, Android, React Native, Tailwind
└── source/                  # Raw Figma DesignBridge exports
```

---

## Token formats

| Tier | Format | Path | Status |
|------|--------|------|--------|
| 1 | CSS custom properties | [`tokens/css/`](tokens/css/) | Canonical |
| 1 | Flutter / Dart | [`tokens/flutter/`](tokens/flutter/) | Canonical |
| 2 | JSON (W3C DTCG) | [`tokens/json/tokens.json`](tokens/json/tokens.json) | Interop — feed into Style Dictionary, Token Studio, etc. |
| 3 | iOS Swift | [`tokens/experimental/ios/`](tokens/experimental/ios/) | **Experimental, untested** |
| 3 | Android XML | [`tokens/experimental/android/`](tokens/experimental/android/) | **Experimental, untested** |
| 3 | React Native (TypeScript) | [`tokens/experimental/react-native/`](tokens/experimental/react-native/) | **Experimental, untested** |
| 3 | Tailwind config | [`tokens/experimental/tailwind/`](tokens/experimental/tailwind/) | **Experimental, untested** |

See [`tokens/experimental/README.md`](tokens/experimental/README.md) for how Tier 3 files graduate to Tier 1.

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| [v2.0.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v2.0.0) | 2026-04-24 | **Breaking:** two-prefix token model — primitives now `--pepper-core-*`, semantic/component/state/overlay tokens now `--pepper-*`. Added dark mode via `[data-theme="dark"]`. New composite typography tokens `--pepper-typography-*` using CSS `font:` shorthand. Fixed shadow `--rgb-pepper-*` bug (colour vars consumed directly). Dark shadow palette deferred to v2.1. |
| [v1.3.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.3.0) | 2026-04-23 | **Breaking rename:** token prefix changed from `pepper-` to `pepper-core-` across all formats (CSS vars, Swift enums, Android XML, React Native, Tailwind, docs). Added JSON (W3C DTCG) canonical export at `tokens/json/tokens.json` for Style Dictionary / Token Studio interop. Added experimental Tier 3 exports for iOS (Swift), Android (XML), React Native (TS), and Tailwind — all untested, see `tokens/experimental/README.md` |
| [v1.2.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.2.0) | 2026-04-23 | Designer onboarding release: moved repo to public personal sandbox, added pre-merge scope callout, swapped recommended AI tool to Claude Design (web), added three retokenization methods for legacy Figma designs (screenshot, Dev Mode CSS, Figma MCP) with spice-level ratings, trimmed quickstart to 3 steps (10 min), updated Slack channel to `#design-systems-dojo`, added `docs/token-reference.md` cheatsheet for looking up tokens + applying them in Figma |
| [v1.1.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.1.0) | 2026-04-23 | Added `DESIGN.md`, raw Figma source files, and legal text styles (+ body-2xs, label-xs/2xs). Fixed Flutter `labelLabelLg` weight bug |
| v1.0.4 | 2026-04-23 | Cleaned up docs — removed Supernova references, added changelogs |
| v1.0.3 | 2026-04-23 | Removed Supernova scripts |
| v1.0.2 | 2026-04-23 | Replaced Supernova sync doc with Figma + Claude workflow guide |
| v1.0.1 | 2026-04-23 | Migrated pipeline attribution from Supernova to Claude + Figma across all token files |
| v1.0.0 | 2026-04-23 | Initial release — baseline Pepper Design System token set (CSS + Dart) |
