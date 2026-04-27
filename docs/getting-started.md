# Getting Started

This guide helps designers and developers get up and running with the Pepper Design System.

---

## For Designers

### 1. Access the Figma library

Pepper's component library lives in Figma. To use it:

1. Open Figma and navigate to your project file
2. Go to **Assets** (left panel) → click the **book icon** to open Libraries
3. Search for **Pepper Design System** and click **Add to file**

Once added, all Pepper components and styles will be available in the Assets panel.

### 2. Use design tokens

Colors, typography, spacing, and other values are published as Figma Variables. Always use these tokens rather than hardcoded values to ensure your designs stay in sync with the codebase.

- **Color** — Use semantic tokens (e.g. `semantic/color/foreground/text/primary`) rather than raw palette values
- **Typography** — Apply text styles from the Pepper type scale
- **Spacing** — Use the 4px grid. Spacing tokens follow a `scale/spacing-{n}` naming convention

### 3. Vibe code with AI

Want to skip Figma and design directly with AI tools? See the [Designer Cheat Sheet](designer-cheat-sheet.md) — two prompts to go from screenshot to React component.

### 4. Stay in sync

When the Figma library is updated, Figma will prompt you to **Review and update** components in your file. Accept updates regularly to stay on the latest version.

---

## For Developers

### 1. Access token files

Token files live in this repo under `tokens/`:

| Folder | Format | Use |
|--------|--------|-----|
| `tokens/css/` | CSS Variables | Web projects |
| `tokens/flutter/` | Dart | Flutter projects |

Pull the latest from `main` to get the most recent token values.

### 2. Use tokens in CSS

Reference tokens as CSS custom properties:

```css
.my-element {
  color: var(--pepper-color-semantic-color-foreground-text-primary);
  padding: var(--pepper-dimension-scale-spacing-16);
  border-radius: var(--pepper-border-radius-md);
}
```

### 3. Use tokens in Flutter

Import the relevant Dart class from `tokens/flutter/`:

```dart
import 'tokens/flutter/colors.dart';
import 'tokens/flutter/dimensions.dart';

// Usage
Color bg = AppColors.semanticColorBackgroundSurfacePrimary;
double spacing = AppDimensions.scaleSpacing16;
```

### 4. Staying up to date

Token updates are published as versioned GitHub Releases. Watch the repo or check [Releases](https://github.com/jh-foong/pepper-design-system/releases) to see what changed in each version.

---

## Need help?

- **Slack** — Post in `#design-systems-dojo` for questions or feedback
- **Figma** — Comment directly on components in the library file
- **GitHub** — Open an issue in the [Pepper repository](https://github.com/jh-foong/pepper-design-system)

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.4 | 2026-04-23 | Rewrote to reflect actual repo state — removed aspirational npm package references, updated token paths and usage examples |
| v1.0.5 | 2026-04-23 | Updated GitHub URL to new public sandbox (`jh-foong/pepper-design-system`) and Slack channel to `#design-systems-dojo` |
