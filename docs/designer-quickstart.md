# Designer Quickstart — Vibe Coding with Pepper

A 15-minute setup to go from "I just got handed this repo" to "I'm generating on-brand Pepper UI with my AI tool of choice."

Made for designers. No coding required.

---

> ⚠️ **Pre-merge state:** These tokens are from an in-progress Figma branch. Use for **new/exploratory** design work only — not for extending existing production designs (they'll mismatch until after AKQA handover and component refactoring). See [README](../README.md#-pepper-design-system) for full scope.

---

## What you'll get

By the end of this guide you'll be able to:

- Sketch UI in your AI tool (Claude Design, Claude Code, Cursor, v0, Lovable, etc.) and have it output **real Pepper designs** — correct colours, typography, spacing, shadows, no guessing
- Download or reference the Pepper design tokens for any project
- Know where to go when you need to update something

---

## 1. Install the fonts (2 min)

Pepper uses **Manrope** as its primary typeface, plus Noto fonts for Arabic, Traditional Chinese, and Japanese.

### Manrope (required)

> ⚠️ Use the **Pepperstone fork** — not the version on Google Fonts.

1. Go to [github.com/jh-foong/manrope](https://github.com/jh-foong/manrope)
2. Click the green **Code** button → **Download ZIP**
3. Unzip → open the `fonts/` folder
4. Double-click each `.ttf` file → **Install Font**

### Noto fonts (required if you work on AR / TC / JP)

Download from Google Fonts and install the same way:

- [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic)
- [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC)
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)

---

## 2. Get Figma access (2 min)

The Pepper Figma file is where all visual decisions originate.

1. Ask your design system lead for access to: [Pepperstone DS (branch)](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT)
2. Once you have access, open Figma
3. In your project file, go to **Assets → book icon (Libraries) → Add to file**
4. Search **Pepper Design System** → click **Add to file**

You now have the Pepper component library and styles available in your Figma files.

---

## 3. Start designing — pick one option

### Option 1 — Claude Design *(recommended, no install)*

1. Open [DESIGN.md](https://github.com/jh-foong/pepper-design-system/blob/main/DESIGN.md) → click **Raw** → **Cmd+S** to save it locally
2. Open [claude.ai](https://claude.ai) → start a new chat → click **+** and attach `DESIGN.md`
3. Prompt: *"Follow DESIGN.md. Design a [thing]."*

> 💡 **Pro tip — use a Claude Project:** go to [claude.ai/projects](https://claude.ai/projects), create a project called "Pepper Design," and upload `DESIGN.md` once into **Project knowledge**. Every chat inside that project automatically uses it — no re-uploading.

### Option 2 — Claude Code *(for semi-technical users who want the full repo)*

Best if you want Claude to have access to the full token files, not just `DESIGN.md`.

1. Clone the repo via GitHub Desktop (**File → Clone** → paste URL), or run `git clone https://github.com/jh-foong/pepper-design-system` in Terminal
2. Open Terminal → `cd` into the cloned folder → run `claude`
3. Prompt: *"Follow @DESIGN.md. Design a [thing]."*

Requires: [Claude Code installed](https://docs.anthropic.com/claude/docs/claude-code).

> 💡 Re-download `DESIGN.md` (or re-clone) whenever there's a new release (see [Releases](https://github.com/jh-foong/pepper-design-system/releases)).

---

## 4. Your first prompt (3 min)

Try one of these starter prompts in your AI tool of choice. All of them assume `DESIGN.md` is loaded as context.

### Starter prompts

| Goal | Prompt |
|------|--------|
| A landing hero | *"Design a landing page hero for a trading platform. Headline: 'Trade smarter.' Include a primary CTA and a secondary text link. Follow DESIGN.md."* |
| A pricing card | *"Design a pricing card with a title, monthly price, 4 feature bullet points, and a primary CTA at the bottom. Use Pepper tokens from DESIGN.md."* |
| A form | *"Design a sign-up form: email input, password input, a 'Create account' primary button, and a legal disclaimer below. Use DESIGN.md."* |
| A trading panel | *"Design a buy/sell button pair for a trading interface. Use the Pepper buysell component tokens from DESIGN.md."* |
| A dark-mode card | *"Design a dark-mode dashboard card showing 'Daily P&L' with a value, a positive/negative indicator, and a small sparkline. Use DESIGN.md inverse tokens."* |

---

## What happens when the AI invents something

`DESIGN.md` covers **tokens** (colours, typography, spacing, shadows, radii) but does **not** yet cover full component specs. If the AI generates a button that looks off, it's probably inventing the spec.

**Fix:** refine the prompt. E.g. *"Button should use `--pepper-typography-label-md`, 12px vertical padding, 24px horizontal, radius `md`, shadow `xs`."*

Longer-term, Pepper will add component specs directly to `DESIGN.md` to reduce this.

---

## Updating to the latest Pepper version

Every new release bumps the tokens and (sometimes) `DESIGN.md`. To stay current:

1. Check [Releases](https://github.com/jh-foong/pepper-design-system/releases) every so often
2. Re-download `DESIGN.md` if the release notes mention it
3. Re-import updated components in Figma when prompted

---

## Where to go for help

- **Slack:** `#design-system`
- **Figma:** comment directly on components in the library file
- **GitHub:** open an issue at [jh-foong/pepper-design-system/issues](https://github.com/jh-foong/pepper-design-system/issues)

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-23 | Initial designer quickstart — fonts, Figma, DESIGN.md, AI tool setup, starter prompts |
| v1.1.0 | 2026-04-23 | Simplified AI tool setup — two clear options (Claude Code recommended, or quick-trial with any AI) |
