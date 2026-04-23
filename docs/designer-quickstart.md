# Designer Quickstart — Vibe Coding with Pepper

A 10-minute setup to go from "I just got handed this repo" to "I'm generating on-brand Pepper UI with my AI tool of choice."

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

## 2. Start designing — pick one option

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

## 3. Your first prompt (3 min)

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

## Working with existing Figma designs (old tokens) 🥵🌶️🔥

Got a Figma file that uses the **original** Pepper tokens and want to see what it'd look like in the new system? Claude can retokenize it for you.

Each method below is rated by **spice level** — more chillis = more setup required.

### 🌶️ Easiest — screenshot + Claude Design

1. In Figma: frame the design → **Export → PNG** (or take a screenshot)
2. In Claude Design (with `DESIGN.md` attached): drag the image into the chat
3. Prompt:
   > *"This is a current Figma design using old Pepper tokens. Redesign it using only DESIGN.md tokens — same layout and content, but swap every colour, typography, spacing, radius, and shadow to the closest equivalent. Flag any values you can't map 1:1."*
4. You'll get a new version + a list of mismatches (e.g. *"old `brand-500` has no direct match, used `surface/brand/primary` as closest"*)

### 🌶️🌶️ More accurate — paste CSS from Figma Dev Mode

Figma's **Dev Mode** exports exact CSS for any element (colours as hex, sizes in px, etc). Paste that into Claude and ask it to translate to Pepper tokens.

**Setup (one-time):**
- Dev Mode is included on all paid Figma seats. If you don't see the toggle, your Figma role is likely Viewer/Edit-only — ask your Figma admin for Dev Mode access.

**Per element:**
1. In your Figma file, click the **</> toggle** in the top-right toolbar to switch to **Dev Mode** (or press **Shift+D**)
2. Click the element you want to translate (a button, card, text, whatever)
3. On the right panel, find the **Code** section → the CSS is shown there. Click the **copy** icon in the top-right of that block
4. Open Claude Design (with `DESIGN.md` attached) and paste the CSS into a new chat
5. Prompt:
   > *"Here's CSS from a current Figma design using old Pepper tokens. Rewrite it using only the tokens in DESIGN.md. For each old value (hex, px, shadow, radius), map it to the closest Pepper token or flag as no-match. Output as a table: old value → new token → notes."*
6. You'll get a clean mapping you can apply back in Figma manually

**Best for:** single components (one button, one card). Tedious for whole screens — use the screenshot method for those.

### 🌶️🌶️🌶️ Most accurate — Figma MCP *(semi-technical)*

> 💡 Skip this method if you're using **Option 1 (Claude Design web)**. MCP only works with Claude Code or Cursor — go with the screenshot or Dev Mode CSS method instead.

Figma's official **Dev Mode MCP server** lets Claude read your selected Figma frame directly — no exporting or pasting. Claude sees the real structure (layers, auto-layout, variants) and can translate it to DESIGN.md tokens precisely.

**Requirements:**
- [Figma desktop app](https://www.figma.com/downloads/) (not the browser version)
- A Figma seat with **Dev Mode** enabled
- [Claude Code](https://docs.anthropic.com/claude/docs/claude-code) or [Cursor](https://cursor.sh) installed

**Setup (one-time):**
1. Open Figma desktop → menu bar → **Figma → Preferences → Enable local MCP Server**
2. In Claude Code, open your config (or ask Claude Code: *"Add the Figma MCP server to my config"*)
3. Detailed guide: [Figma's Dev Mode MCP docs](https://help.figma.com/hc/en-us/articles/32132100833559)

**Using it:**
1. In Figma desktop, select the frame you want translated
2. In Claude Code (inside your cloned Pepper repo folder), prompt:
   > *"Using the Figma MCP, read my current selection. Then rewrite it using only the tokens in `@DESIGN.md`. Output the translation as CSS/JSX plus a table of which old values mapped to which new Pepper tokens."*
3. Claude pulls the Figma data live, applies DESIGN.md, and returns code + mapping

**Best for:** full-screen translations, working at scale, or when you want Claude to understand layout structure (not just visual output).

> ⚠️ These methods help you **visualise** what old designs would look like in the new system. They don't update your actual Figma file — treat the output as a reference while manually re-tokenizing, or as a starting point for concept work.

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

- **Slack:** `#design-systems-dojo`
- **Figma:** comment directly on components in the library file
- **GitHub:** open an issue at [jh-foong/pepper-design-system/issues](https://github.com/jh-foong/pepper-design-system/issues)

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-23 | Initial designer quickstart — fonts, Figma, DESIGN.md, AI tool setup, starter prompts |
| v1.1.0 | 2026-04-23 | Simplified AI tool setup — two clear options (Claude Code recommended, or quick-trial with any AI) |
| v1.2.0 | 2026-04-23 | Swapped recommended option to Claude Design (web, no install). Added "Working with existing Figma designs" section with three retokenization methods |
| v1.2.1 | 2026-04-23 | Expanded Dev Mode CSS and Figma MCP methods with concrete step-by-step instructions (enabling Dev Mode, installing Figma's MCP server, linking to official docs) |
| v1.2.2 | 2026-04-23 | Removed "Get Figma access" step — all designers already have it. Renumbered remaining sections (now 3 steps instead of 4). Updated setup time estimate to 10 min |
| v1.2.3 | 2026-04-23 | Updated Slack channel to `#design-systems-dojo`. Added 🌶️ spice-level ratings to the three retokenization methods (easiest → hardest) |
