# Designer Quickstart — Vibe Coding with Pepper

A 15-minute setup to go from "I just got handed this repo" to "I'm generating on-brand Pepper UI with my AI tool of choice."

Made for designers. No coding required.

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

## 3. Get the AI spec — `DESIGN.md` (1 min)

`DESIGN.md` is the single file that tells any AI tool how to generate Pepper UI. It lives at the root of this repo.

1. Open: [DESIGN.md on GitHub](https://github.com/jh-foong/pepper-ds/blob/main/DESIGN.md)
2. Click the **Download raw file** button (top right of the file view) — or click **Raw** and save the page as `DESIGN.md`
3. Save it somewhere you can find it — e.g. `~/Desktop/DESIGN.md` or your project folder

> 💡 Bookmark the GitHub link — `DESIGN.md` updates with every Pepper release, so re-download whenever there's a new version.

---

## 4. Set up your AI tool (5 min)

Pick the tool you use. The setup is different for each, but the outcome is the same: the AI sees `DESIGN.md` as context and designs on-brand.

### Claude Design *(design-focused chat)*

1. Open a new design chat
2. Click **+ Add assets** → upload `DESIGN.md`
3. Start chatting — no special prompt needed

### Claude Code *(terminal / IDE coding)*

1. Place `DESIGN.md` in your project's root folder
2. In Claude Code, reference it: `Follow @DESIGN.md for all visual decisions`

### Cursor / Windsurf *(AI code editor)*

1. Place `DESIGN.md` in your project root
2. In the chat sidebar, attach `DESIGN.md` or mention `@DESIGN.md` in prompts
3. Starter prompt: *"Follow @DESIGN.md for all visual decisions. No deviations."*

### GitHub Copilot *(inline code completion)*

1. Place `DESIGN.md` in your project root
2. Copilot picks it up automatically for context

### Any other LLM (ChatGPT, Gemini, etc.)

Paste the contents of `DESIGN.md` at the start of your session as system context, then say:

> "Use this as the design system spec for everything you generate."

---

## 5. Your first prompt (3 min)

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

1. Check [Releases](https://github.com/jh-foong/pepper-ds/releases) every so often
2. Re-download `DESIGN.md` if the release notes mention it
3. Re-import updated components in Figma when prompted

---

## Where to go for help

- **Slack:** `#design-system`
- **Figma:** comment directly on components in the library file
- **GitHub:** open an issue at [jh-foong/pepper-ds/issues](https://github.com/jh-foong/pepper-ds/issues)

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-23 | Initial designer quickstart — fonts, Figma, DESIGN.md, AI tool setup, starter prompts |
