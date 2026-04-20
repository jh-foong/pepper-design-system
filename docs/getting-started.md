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

Colors, typography, spacing, and other values are published as Figma variables. Always use these tokens rather than hardcoded values to ensure your designs stay in sync with the codebase.

- **Color** — Use semantic tokens (e.g. `color/text/primary`) rather than raw palette values
- **Typography** — Apply text styles from the Pepper type scale
- **Spacing** — Use the 4px grid. Spacing tokens follow a `space-{n}` naming convention

### 3. Stay in sync

When the Figma library is updated, Figma will prompt you to **Review and update** components in your file. Accept updates regularly to stay on the latest version.

---

## For Developers

### 1. Install the package

```bash
npm install @pepperstone/pepper-ds
# or
yarn add @pepperstone/pepper-ds
```

### 2. Import styles

Import the base stylesheet in your app's entry point:

```js
import '@pepperstone/pepper-ds/styles/index.css';
```

This loads design tokens as CSS custom properties and base global styles.

### 3. Use components

Import components directly from the package:

```jsx
import { Button, Input, Badge } from '@pepperstone/pepper-ds';

function Example() {
  return (
    <Button variant="primary" size="md">
      Get started
    </Button>
  );
}
```

### 4. Use design tokens in custom code

If you need to reference tokens outside of components, use the CSS custom properties:

```css
.my-element {
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

Or import token values in JS/TS:

```js
import tokens from '@pepperstone/pepper-ds/tokens';

const primaryColor = tokens.color.text.primary;
```

---

## Browser support

Pepper supports the same browsers as Pepperstone's production applications:

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

---

## Need help?

- **Slack** — Post in `#design-system` for questions or feedback
- **Figma** — Comment directly on components in the library file
- **GitHub** — Open an issue or discussion in the Pepper repository
