# Pepper Design System — Claude Context

Pepper is Pepperstone's design system. This repository holds documentation, scripts, and token exports for the system.

The person working in this repo is **Junhan Foong**, a Product Designer with no coding background. Keep all explanations non-technical. Prefer UI-based workflows over CLI or code where possible.

---

## Key Resources

| Resource | URL | Notes |
|----------|-----|-------|
| Figma | https://www.figma.com/design/0iR1o4UTpxXfbfviJD1HeI/branch/LTzjOzO6BCMCrsARXh61Wi/Pepperstone-DS-SSOT | Branch of main file — read-only until merged |
| Supernova | https://app.supernova.io/711966-pepperstone/764138-pepper-design-system-v-2/803332-shared-draft/810225-default/overview | Token and documentation management |
| GitHub | https://github.com/jh-foong/pepper-ds | Test repo — will migrate to org repo later |

---

## Fonts

| Font | Source | Use |
|------|--------|-----|
| Manrope (fork) | https://github.com/cssobral2013/manrope | Primary — headings, body, labels |
| Noto Sans Arabic | Google Fonts | Arabic language support |
| Noto Sans TC | Google Fonts | Traditional Chinese support |
| Noto Sans JP | Google Fonts | Japanese support |

---

## Design Token Categories (from Supernova)

These are the live token groups in the Supernova project:

- **Color** — semantic and palette tokens
- **Typography** — composite type styles (Heading, Body, Label)
- **Font Family / Font Size / Font Weight / Line Height** — individual type primitives
- **Space** — spacing scale
- **Dimension** — global unit scale (4px base grid)
- **Size** — component sizing
- **Border Radius / Border Width** — shape tokens
- **Blur / Shadow / Opacity / Gradient** — effect tokens

---

## Project Status

- **Figma**: Working in a branch — cannot push to main yet
- **GitHub**: Using `jh-foong/pepper-ds` as a test space — will migrate to the official Pepperstone org repo
- **Supernova**: Connected and live with tokens
- **Token pipeline**: Supernova → GitHub sync not yet configured

---

## Repo Structure

```
/
├── CLAUDE.md              # This file — AI context
├── README.md              # Project overview
├── docs/
│   ├── getting-started.md # Setup guide for designers and developers
│   ├── resources.md       # All external source links
│   └── supernova-github-sync.md  # How to sync tokens to GitHub
└── supernova-scripts/     # Scripts for Supernova automation
```
