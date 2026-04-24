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
| Output uses `--pepper-*` instead of `--pepper-core-*` | Stale `DESIGN.md` (pre-v1.3.0) | Re-download from the [canonical URL](https://raw.githubusercontent.com/jh-foong/pepper-design-system/main/DESIGN.md) |
| "I don't see new tokens in Figma" | They're on a branch, not main | Use the Figma branch linked in the [README](../README.md#key-links) |
| "I edited `DESIGN.md` and now things break" | Edits make your copy drift from canonical | Re-download the clean copy. If the change matters, [raise an issue](https://github.com/jh-foong/pepper-design-system/issues) |
| "How do I apply a token in Figma?" | — | See [Token Reference](token-reference.md#applying-tokens-in-figma) |
| "AI output looks nothing like Pepper Design System" | Usually stale `DESIGN.md` + missing Manrope + weak prompt | Walk through the [Designer Quickstart](designer-quickstart.md) from the top |

---

## How to prompt well

Three things turn weak AI output into on-brand Pepper Design System output:

- **Always say "follow DESIGN.md"** in every prompt — it anchors the model to the tokens.
- **Specify the surface** — web, app, email. Different surfaces use different density and type scales.
- **Describe what, not how** — *"a pricing card with 4 features and a primary CTA"* beats *"a card with 16px padding, brand-blue button, and…"*. Let the AI pick tokens; you review.

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
