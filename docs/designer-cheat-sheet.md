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
