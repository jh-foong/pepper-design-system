# Designer Quickstart — Vibe Coding with Pepper Design System

A 10-minute setup to go from "I just got handed this repo" to "I'm generating on-brand UI with Pepper Design System in my AI tool of choice."

Made for designers. No coding required.

---

> ⚠️ **Pre-merge state:** These tokens are from an in-progress Figma branch. Use for **new/exploratory** design work only — not for extending existing production designs (they'll mismatch until after vendor A handover and component refactoring). See [README](../README.md#-pepper-design-system) for full scope.

---

## How this fits together (30-second mental model)

- **`DESIGN.md`** is a single text file that tells any AI tool what on-brand Pepper Design System looks like (colours, type, spacing, shadows). It's the only thing you *have* to keep fresh.
- **This GitHub repo** is the source of truth — where `DESIGN.md` and the raw token files live. You don't work *inside* the repo; you just pull `DESIGN.md` out of it.
- **Your AI tool** (Claude Design / Claude Code) reads `DESIGN.md` as context, then outputs real coded prototypes or design artifacts using Pepper Design System tokens.
- **Figma stays as-is for production work.** New Pepper Design System tokens aren't merged into the main Figma library yet, so keep shipping production designs on the existing library. Use this flow for concepts, pitches, user tests, and anything not shipping to prod.

---

## What you'll get

By the end of this guide you'll be able to:

- Sketch UI in your AI tool (Claude Design, Claude Code, Cursor, v0, Lovable, etc.) and have it output **real Pepper Design System designs** — correct colours, typography, spacing, shadows, no guessing
- Download or reference the Pepper Design System tokens for any project
- Know where to go when you need to update something

---

## 1. Install the fonts (2 min)

Pepper Design System uses **Manrope** as its primary typeface, plus Noto fonts for Arabic, Traditional Chinese, and Japanese.

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

### Option 2 — Claude Code *(for designers who want local prototype files)*

Best if you want Claude to save prototypes as real files you can open in a browser, share, or screenshot.

> ⚠️ **Don't clone the Pepper Design System repo to prototype in.** That repo is the source of truth for tokens — keep it clean. Make a **separate scratch folder** on your Mac and just drop `DESIGN.md` into it.

**Setup (one-time, ~5 min):**

1. Make a folder anywhere on your Mac — e.g. `~/Documents/Pepper Prototypes/`
2. Download [DESIGN.md](https://github.com/jh-foong/pepper-design-system/blob/main/DESIGN.md) → click **Raw** → Cmd+S → save into that folder
3. *(Optional but recommended)* also download [docs/token-reference.md](https://github.com/jh-foong/pepper-design-system/blob/main/docs/token-reference.md) into the same folder for the cheatsheet
4. Open Terminal → `cd` into the folder → run `claude`
5. Prompt: *"Follow `@DESIGN.md`. Build a [thing] and save it to `[feature-name]/index.html`."*

Your folder ends up looking like:
```
Pepper Prototypes/
├── DESIGN.md
├── token-reference.md
├── login-flow/
├── trade-ticket/
└── pricing-page/
```

The DS repo stays untouched. Reorganise or delete prototypes however you like — they're yours.

Requires: [Claude Code installed](https://docs.anthropic.com/claude/docs/claude-code).

> 💡 **Updating tokens:** when a new Pepper Design System release lands ([see Releases](https://github.com/jh-foong/pepper-design-system/releases)), re-download `DESIGN.md` and overwrite the old copy in your scratch folder.

---

## 3. Your first prompt (3 min)

### Pre-session checklist ✅

Before you prompt anything, take 30 seconds to check:

- [ ] **Manrope** is installed on your Mac (Font Book → search "Manrope")
- [ ] Your local `DESIGN.md` version matches the [latest release](https://github.com/jh-foong/pepper-design-system/releases) — check the version line at the top of the file
- [ ] `DESIGN.md` is attached to your Claude Project / in your scratch folder / in the current Claude Code directory

If all three are ✅, you're good. If `DESIGN.md` is out of date, grab the new one (see [Stay up to date](#stay-up-to-date) below).

### Starter prompts

Try one of these in your AI tool of choice. All of them assume `DESIGN.md` is loaded as context.

| Goal | Prompt |
|------|--------|
| A landing hero | *"Design a landing page hero for a trading platform. Headline: 'Trade smarter.' Include a primary CTA and a secondary text link. Follow DESIGN.md."* |
| A pricing card | *"Design a pricing card with a title, monthly price, 4 feature bullet points, and a primary CTA at the bottom. Use Pepper tokens from DESIGN.md."* |
| A form | *"Design a sign-up form: email input, password input, a 'Create account' primary button, and a legal disclaimer below. Use DESIGN.md."* |
| A trading panel | *"Design a buy/sell button pair for a trading interface. Use the Pepper buysell component tokens from DESIGN.md."* |
| A dark-mode card | *"Design a dark-mode dashboard card showing 'Daily P&L' with a value, a positive/negative indicator, and a small sparkline. Use DESIGN.md inverse tokens."* |

---

## Working with existing Figma designs (old tokens) 🥵🌶️🔥

Got a Figma file that uses the **original** Pepper Design System tokens and want to see what it'd look like in the new system? Claude can retokenize it for you.

Each method below is rated by **spice level** — more chillis = more setup required.

### 🌶️ Easiest — screenshot + Claude Design

1. In Figma: frame the design → **Export → PNG** (or take a screenshot)
2. In Claude Design (with `DESIGN.md` attached): drag the image into the chat
3. Prompt:
   > *"This is a current Figma design using old Pepper tokens. Redesign it using only DESIGN.md tokens — same layout and content, but swap every colour, typography, spacing, radius, and shadow to the closest equivalent. Flag any values you can't map 1:1."*
4. You'll get a new version + a list of mismatches (e.g. *"old `brand-500` has no direct match, used `surface/brand/primary` as closest"*)

### 🌶️🌶️ More accurate — paste CSS from Figma Dev Mode

Figma's **Dev Mode** exports exact CSS for any element (colours as hex, sizes in px, etc). Paste that into Claude and ask it to translate to Pepper Design System tokens.

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
2. In Claude Code (inside your cloned Pepper Design System repo folder), prompt:
   > *"Using the Figma MCP, read my current selection. Then rewrite it using only the tokens in `@DESIGN.md`. Output the translation as CSS/JSX plus a table of which old values mapped to which new Pepper tokens."*
3. Claude pulls the Figma data live, applies DESIGN.md, and returns code + mapping

**Best for:** full-screen translations, working at scale, or when you want Claude to understand layout structure (not just visual output).

> ⚠️ These methods help you **visualise** what old designs would look like in the new system. They don't update your actual Figma file — treat the output as a reference while manually re-tokenizing, or as a starting point for concept work.

---

## What happens when the AI invents something

`DESIGN.md` covers **tokens** (colours, typography, spacing, shadows, radii) but does **not** yet cover full component specs. If the AI generates a button that looks off, it's probably inventing the spec.

**Fix:** refine the prompt. E.g. *"Button should use `--pepper-typography-label-md`, 12px vertical padding, 24px horizontal, radius `md`, shadow `xs`."*

Longer-term, Pepper Design System will add component specs directly to `DESIGN.md` to reduce this.

> 💡 Need to look up a token Claude suggested? See the [Token Reference & Cheatsheet](token-reference.md) — values for every category plus how to apply them in Figma.

---

## Stay up to date

`DESIGN.md` is the only thing you *must* keep fresh. Three ways to stay in sync — pick whichever fits your workflow:

### 1. Watch the repo on GitHub *(recommended — set up once)*

1. Go to [jh-foong/pepper-design-system](https://github.com/jh-foong/pepper-design-system)
2. Top-right: click **Watch** → **Custom** → check **Releases** → **Apply**

You'll get an email every time a new release ships. 5-second setup, zero ongoing effort.

### 2. Version-stamp self-check

Every `DESIGN.md` has a version line at the top (e.g. `Version: v1.2.0`). Before a session, glance at it and compare against the [Releases page](https://github.com/jh-foong/pepper-design-system/releases). If they differ, re-download.

### 3. Claude Code users — fetch the latest every session *(most foolproof)*

Instead of keeping a local copy, prompt Claude Code to pull the live version straight from GitHub:

> *"Fetch the latest DESIGN.md from `https://raw.githubusercontent.com/jh-foong/pepper-design-system/main/DESIGN.md` and follow it. Build a [thing]."*

No syncing, always current. Only works with Claude Code (which has web access) — not Claude Design.

### When `DESIGN.md` changes

1. Overwrite the old `DESIGN.md` in your scratch folder / Claude Project knowledge
2. Skim the [release notes](https://github.com/jh-foong/pepper-design-system/releases) — if tokens were renamed, old prototypes may need a refresh
3. Carry on

---

## Ping vs ship it yourself

To save everyone time, here's when to reach out and when to just go.

**Ship it yourself if:**
- AI invented a token name → check [`docs/token-reference.md`](token-reference.md), pick the right one, and re-prompt
- The output looks "off" → refine your prompt with specific token names (see [AI invents something](#what-happens-when-the-ai-invents-something))
- You need to retokenize an old Figma design → use the [3 retokenization methods](#working-with-existing-figma-designs-old-tokens) above

**Ping the DS team in `#design-systems-dojo` if:**
- A token you need genuinely doesn't exist in `DESIGN.md` or the [cheatsheet](token-reference.md)
- Something in `DESIGN.md` looks wrong or contradicts itself
- You've found a bug in the tokens (e.g. a colour alias pointing at the wrong thing)
- You want to propose a new component spec or token

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
| v1.2.4 | 2026-04-23 | Linked to the new `docs/token-reference.md` cheatsheet in the "AI invents something" section |
| v1.2.5 | 2026-04-23 | Rewrote Option 2 (Claude Code) — designers now set up a separate scratch folder with `DESIGN.md` instead of cloning the DS repo. Keeps the source-of-truth repo clean and gives designers a dedicated prototype space. |
| v1.2.6 | 2026-04-23 | Added mental-model intro, pre-session checklist, "Stay up to date" section (Watch releases / version-stamp self-check / Claude Code WebFetch pattern), and "Ping vs ship it yourself" box — to help designers work independently. |
| v1.2.7 | 2026-04-24 | v2.0.0 sweep — corrected `--pepper-core-typography-label-md` example to `--pepper-typography-label-md` (typography is semantic, stays `--pepper-*`). |
