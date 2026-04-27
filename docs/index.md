# Pepper Design System

Pepper DS Core is Pepperstone's design system — a shared library of design decisions, tokens, and guidelines that helps teams build consistent, high-quality digital experiences.

**Current version:** [v1.3.0](https://github.com/jh-foong/pepper-design-system/releases/tag/v1.3.0) · [See all releases →](https://github.com/jh-foong/pepper-design-system/releases)

---

## Quick scope

| | |
|---|---|
| ✅ **Use Pepper for** | New features, concepts, prototypes, pitches |
| ⚠️ **Don't use for** | Extending existing production designs (they'll mismatch until Figma library merges) |
| 🎨 **Where to start** | See "Designers" below |
| 🆘 **Stuck?** | [Designer FAQ](designer-faq.md) |

---

## Designers — start here

**Option 1 — Claude Design (recommended, no install)**

1. Download [DESIGN.md](https://github.com/jh-foong/pepper-design-system/blob/main/DESIGN.md) → click **Raw** → **Cmd+S**
2. Open [claude.ai](https://claude.ai) → attach `DESIGN.md` (or add it to a Claude Project)
3. Prompt: *"Follow DESIGN.md. Design a [thing]."*

**Option 2 — Claude Code (for local prototype files)**

1. Make a scratch folder (e.g. `~/Documents/Pepper Prototypes/`) and drop `DESIGN.md` into it
2. In Terminal, `cd` into the scratch folder and run `claude`
3. Prompt: *"Follow @DESIGN.md. Build a [thing] and save it to `[feature]/index.html`."*

Full walkthrough: [Designer Quickstart →](designer-quickstart.md)

---

## What's in this repo

| Path | What it is |
|---|---|
| `DESIGN.md` | AI-ingestable visual spec — attach to Claude to design with Pepper |
| `tokens/css/` | CSS custom properties (`--pepper-core-*`) |
| `tokens/flutter/` | Dart token file for Flutter |
| `tokens/json/` | Machine-readable token export |
| `tokens/experimental/` | Android, iOS, React Native, Tailwind formats |
| `docs/` | Guides and reference (you're reading it) |
| `source/` | Raw Figma DesignBridge exports |

---

## Key links

- [Figma file](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI) — source of truth for design
- [GitHub repo](https://github.com/jh-foong/pepper-design-system) — source of truth for tokens + docs
- [Token Reference](token-reference.md) — every token, explained
- [Getting Started](getting-started.md) — setup guide for designers and developers
