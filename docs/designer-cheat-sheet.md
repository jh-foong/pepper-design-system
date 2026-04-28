# 🌶️ Pepper Design System — Designer Cheat Sheet

Two prompts. That's the whole workflow.

---

## 🎨 STEP A — Design → tokenised HTML

**You'll need open in Claude Design (claude.ai):**
- 📄 `DESIGN.md` (download from GitHub repo, Raw view → Cmd+S)
- 🖼️ Screenshot of the design you want to rebuild (legacy screen, sketch, or reference)
- 🖼️ *(Optional)* Component reference PNGs — buttons, cards, inputs from the Pepper Figma branch

**Drag all files into Claude Design, then paste this prompt:**

> Follow `DESIGN.md` strictly. Rebuild the attached screen using Pepper Design System tokens (`--pepper-*` CSS variables) for all colours, typography, spacing, radius, and shadows.
>
> Use the attached component PNGs as **visual style reference only** — match the look (button shapes, card padding, input style). All token values must come from `DESIGN.md`, not the PNGs.
>
> Output a single self-contained `index.html` file.

**You get:** an `index.html` you can open in any browser. Tokens already correct.

---

## 📝 In between — rename your file

Before moving to Step B, **rename `index.html`** to something descriptive — e.g. `pricing-page.html`, `signup-form.html`, `home-hero.html`.

**Why?**
- Step B uses the filename to name your React component
- Stops you overwriting it next time you run Step A
- Easier to find later

---

## ⚛️ STEP B — HTML → React component

**You'll need open in Claude Design:**
- 📄 Your renamed HTML file from Step A (e.g. `pricing-page.html`)

**Drag the file in, then paste:**

> Convert this HTML file into a React component (`.jsx`).
>
> Preserve all `--pepper-*` CSS variables exactly — do not replace them with hard-coded values. Keep the same class names and structure. Name the component after the HTML filename. Output a single `.jsx` file.

**You get:** a `.jsx` file (e.g. `PricingPage.jsx`). A developer can drop it straight into the codebase.

---

## ⚠️ Quick rules

- ✅ Always attach `DESIGN.md` in Step A
- ✅ Always rename `index.html` before Step B
- ✅ Use component PNGs as **style reference**, not layout to copy
- ❌ Don't ask Claude to "make it look nice" — let `DESIGN.md` do the work
- ❌ Don't skip Step A — the React component needs the tokenised HTML as a base

---

## 🆘 Stuck?

- Wrong colours / fonts? → `DESIGN.md` probably wasn't attached. Re-attach and re-prompt.
- Buttons/cards look off? → Add component PNG references and re-run Step A.
- Need help? → `#design-systems-dojo` on Slack.

---

## 🎁 Bonus — Token-annotated screenshots

For documentation, design reviews, or "show your working" decks: turn an `index.html` from Step A into an annotated version where each component is labelled with the Pepper tokens it uses.

**You'll need open in Claude Design:**
- 📄 `DESIGN.md`
- 📄 The `index.html` from Step A

**Drag both in, then paste:**

> Take the attached `index.html` and produce a **token-annotated version** for documentation screenshots.
>
> **Rules:**
> - Keep the original components rendering exactly as they are — don't restyle them.
> - Wrap each distinct component (button, card, input, heading, hero, etc.) in a labelled annotation block.
> - For each component, list every Pepper token it uses, grouped by category:
>   - 🎨 **Colour** — every `--pepper-color-*` referenced
>   - 🔠 **Typography** — `--pepper-typography-*`, `--pepper-font-*`, `--pepper-line-height-*`
>   - 📐 **Spacing** — `--pepper-space-*`
>   - 🔳 **Radius** — `--pepper-border-radius-*`
>   - 🌫️ **Shadow** — `--pepper-shadow-*`
>   - 💪 **Border** — `--pepper-border-width-*`
> - Annotations should sit **beside or beneath** each component (whichever fits), in a small monospace pill or card with subtle border. Use neutral greys (`--pepper-color-bg-surface-muted`, `--pepper-color-fg-text-secondary`) so the annotations don't compete with the component visuals.
> - Add a **numbered marker** (① ② ③…) on the component and the matching annotation, so they pair up cleanly when screenshotted.
> - Page layout: a single static page, generous whitespace, white background, components stacked vertically. Optimised for clean Figma screenshots — no scrolling tricks, no JS interactions.
> - Output a single self-contained `index-annotated.html`.
>
> **Skip:** any token not actually used. Don't invent tokens. If a value in the original isn't a Pepper token (e.g. hard-coded colour), flag it as `⚠️ NON-TOKEN: <value>` in the annotation.

**You get:** an `index-annotated.html` ready to screenshot section-by-section into Figma.

> 💡 This is a **documentation artefact**, not a shipping component. Use it for design reviews, audit decks, and "explain my thinking" moments.
