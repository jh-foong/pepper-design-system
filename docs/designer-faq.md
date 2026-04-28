# Designer FAQ

Things not working? Start here. This page is written for designers using the Pepper Design System with any AI tool — 5-minute read, scan by heading.

---

## When something looks off, check this first

Four quickest fixes that solve most problems:

1. **Re-download `DESIGN.md`** from the [canonical URL](https://raw.githubusercontent.com/jh-foong/pepper-design-system/main/DESIGN.md) — stale copies drift fast.
2. **Confirm Manrope is installed** on your Mac (Font Book → search "Manrope"). Use the [Pepperstone fork](https://github.com/jh-foong/manrope), not Google Fonts.
3. **Confirm `DESIGN.md` is attached to your AI** — in Claude Project knowledge, your Claude Code scratch folder, or pasted into the current chat.
4. **Re-prompt with "follow DESIGN.md strictly"** — AI tools forget context mid-session. A single explicit instruction usually snaps output back on-brand.

If those four don't fix it, keep reading.

---

## Common symptoms

| Symptom | Likely cause | Fix |
|---|---|---|
| AI generates wrong fonts | Manrope not installed | Install the [Pepperstone fork of Manrope](resources.md#fonts) |
| AI hardcodes hex values | `DESIGN.md` not attached to the AI | Re-attach it — see [Designer Quickstart](designer-quickstart.md) |
| Output only uses one prefix (all `--pepper-core-*` or all `--pepper-*`) | Stale `DESIGN.md` (pre-v2.0.0) | Re-download from the [canonical URL](https://raw.githubusercontent.com/jh-foong/pepper-design-system/main/DESIGN.md) |
| "I don't see new tokens in Figma" | They're on a branch, not main | Use the Figma branch linked in the [README](../README.md#key-links) |
| "I edited `DESIGN.md` and now things break" | Edits make your copy drift from canonical | Re-download the clean copy. If the change matters, [raise an issue](https://github.com/jh-foong/pepper-design-system/issues) |
| "How do I apply a token in Figma?" | — | See [Token Reference](token-reference.md#applying-tokens-in-figma) |
| "AI output looks nothing like Pepper Design System" | Usually stale `DESIGN.md` + missing Manrope + weak prompt | Walk through the [Designer Quickstart](designer-quickstart.md) from the top |

---

## What's the difference between `--pepper-core-*` and `--pepper-*`?

Short version: **`--pepper-core-*` are raw ingredients, `--pepper-*` are finished recipes.** You almost always want finished recipes.

- **`--pepper-core-*` (primitives)** — the raw colour, spacing, and radius values from the palette. Things like `--pepper-core-color-red-500` or `--pepper-core-space-4`. These are the building blocks — they don't know anything about where they're used in the UI.
- **`--pepper-*` (semantic)** — tokens with a UI job. Things like `--pepper-color-bg-surface-primary` or `--pepper-color-fg-text-error`. These *reference* a primitive under the hood, but the name tells you where it's meant to go. They also flip automatically between light and dark mode.

**Rule of thumb:** if the name tells you *what it's for* (a surface, text, a border, an error state), it's semantic — use it. If the name only tells you *what it is* (a shade, a step on a scale), it's a primitive — skip it unless you've got a specific reason.

Claude should almost always suggest semantic `--pepper-*` tokens in UI work. If it suggests a primitive like `--pepper-core-color-red-500` for a button, re-prompt: *"Use semantic `--pepper-*` tokens, not primitives."*

---

## Still stuck?

Raise an issue on GitHub: [pepper-design-system/issues](https://github.com/jh-foong/pepper-design-system/issues).

Include:
- What you prompted
- What you got (screenshot or code snippet)
- What you expected
- Your `DESIGN.md` version stamp (line at the top of the file)

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | 2026-04-24 | Initial designer FAQ — quick fixes, symptom table, prompting tips, issue link |
| v1.1.0 | 2026-04-24 | v2.0.0 sweep — added primitive vs semantic explainer (`--pepper-core-*` vs `--pepper-*`), updated stale-prefix symptom row for the two-prefix model |
