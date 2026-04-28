# Resources

All external sources used in the Pepper Design System.

---

## Design

| Resource | Link | Notes |
|----------|------|-------|
| Figma — Pepper DS | [Open in Figma](https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT) | Working branch — read-only until merged to main |

---

## Tokens

Design tokens are authored in Figma as Variables and synced to this repo using the **DesignBridge** Figma plugin and Claude.

| Resource | Link | Notes |
|----------|------|-------|
| Token files | [`tokens/`](../tokens/) | CSS and Dart outputs, updated on each sync |
| Sync guide | [Figma → Claude Sync](./figma-claude-sync.md) | How to export and sync tokens |

Token categories: Color, Typography, Font Family, Font Size, Font Weight, Line Height, Space, Dimension, Size, Border Radius, Border Width, Blur, Shadow, Opacity, Gradient.

---

## Fonts

| Font | Source | Use |
|------|--------|-----|
| Manrope (Pepperstone fork) | [github.com/jh-foong/manrope](https://github.com/jh-foong/manrope) | Primary typeface — headings, body, labels. **Use this fork, not Google Fonts.** |
| Noto Sans Arabic | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) | Arabic language support |
| Noto Sans TC | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+TC) | Traditional Chinese support |
| Noto Sans JP | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP) | Japanese support |

> Install instructions: [Designer Quickstart → Install the fonts](designer-quickstart.md#1-install-the-fonts-2-min)

---

## Code

| Resource | Link | Notes |
|----------|------|-------|
| Docs site | [jh-foong.github.io/pepper-design-system](https://jh-foong.github.io/pepper-design-system/) | Hosted docs — the front door for designers, PMs, and devs |
| GitHub repository | [jh-foong/pepper-design-system](https://github.com/jh-foong/pepper-design-system) | Public sandbox — official home will move to Pepperstone org once permissions are sorted |

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.4 | 2026-04-23 | Replaced Supernova token section with DesignBridge + Claude workflow. Removed broken link to deleted Supernova sync doc |
| v1.0.5 | 2026-04-23 | Updated GitHub URL to new public sandbox (`jh-foong/pepper-design-system`) with updated note on its sandbox status |
