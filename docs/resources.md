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
| Manrope (Pepperstone fork) | [github.com/jh-foong/manrope](https://github.com/jh-foong/manrope) | Primary typeface — headings, body, labels |
| Noto Sans Arabic | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) | Arabic language support |
| Noto Sans TC | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+TC) | Traditional Chinese support |
| Noto Sans JP | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP) | Japanese support |

> **Important:** Always use the Pepperstone fork of Manrope linked above — not the original Google Fonts version. The fork is the controlled source for this design system.

### How to download Manrope

1. Go to [github.com/jh-foong/manrope](https://github.com/jh-foong/manrope)
2. Click the green **Code** button
3. Select **Download ZIP**
4. Unzip the file — the font files (.ttf) are inside the `fonts/` folder
5. Install by double-clicking each font file and clicking **Install Font**

### How to download Noto fonts

1. Click the Google Fonts link for the language you need (above)
2. Click **Download family** (top right of the Google Fonts page)
3. Unzip and install the same way as above

---

## Code

| Resource | Link | Notes |
|----------|------|-------|
| GitHub repository | [jh-foong/pepper-ds](https://github.com/jh-foong/pepper-ds) | Test repo — will migrate to official Pepperstone org |

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.4 | 2026-04-23 | Replaced Supernova token section with DesignBridge + Claude workflow. Removed broken link to deleted Supernova sync doc |
