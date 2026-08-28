# Figma Component Documentation

Generate token-scanned, copy-paste Figma component descriptions for Pepper DS ii components.

## Usage

```
/figma-doc [Figma URL]
```

## What this command does

1. **Token scan** — runs `get_variable_defs` on the component node
2. **Flag issues** — checks for old DS tokens and reports them before writing anything
3. **Write description** — generates copy-paste Figma component documentation in the established Pepper DS format

## Steps

### 1. Extract node ID and file key from the URL
- URL format: `https://www.figma.com/design/{fileKey}/...?node-id={node-id}`
- Convert node-id from `XXXX-YYYY` format to `XXXX:YYYY`

### 2. Run token scan
Call `get_variable_defs` on the node. Then check for:

**Old DS tokens to flag:**
- `text/family/body` = "Roboto" ⚠️
- `text/family/emphasis` = "Plus Jakarta Sans" ⚠️
- `text/family/body/weight/default` ⚠️
- `Label/Label - *` text styles (e.g. `Label/Label - SM`, `Label/Label - XS`) ⚠️
- `Body/Body - *` text styles (e.g. `Body/Body - SM`) ⚠️
- `Body/Body (U) - *` text styles ⚠️
- `typography/size/*` ⚠️
- `color/text/*` or `color/icon/*` (old prefix) ⚠️
- `spacing/*` used for gap/padding (old spacing tokens) ⚠️

**Error colour to check:**
- `icon/error`, `text/error`, `stroke/error` should all resolve to `#e7000b` — flag if different

Report results as:
- ✅ **Token scan — all clear** if nothing found
- ⚠️ **Issues found** with a table listing each problem, which node/token, and what to fix

### 2b. Locate where issues are (if any found)
When issues are found, call `use_figma` with JavaScript to find the exact layers using the bad tokens, so the user can navigate directly to them in Figma:

```js
// Example: find all nodes using spacing/* tokens
const results = [];
function walk(node) {
  const vars = node.boundVariables || {};
  for (const [prop, binding] of Object.entries(vars)) {
    const name = binding?.variable?.name || binding?.name || '';
    if (name.startsWith('spacing/')) {
      results.push({ layer: node.name, id: node.id, property: prop, token: name });
    }
  }
  if ('children' in node) node.children.forEach(walk);
}
figma.currentPage.selection.forEach(walk);
return results;
```

Adapt the filter to match whatever tokens were flagged. Report results as a table:

| Layer name | Node ID | Property | Bad token | Replace with |
|---|---|---|---|---|
| [layer] | [id] | [fill/padding/gap/etc] | `spacing/8` | `gap/sm` or `inset/xs` |

This lets the user cmd+click or search by node ID directly in Figma to find and fix each instance.

### 3. Get screenshot (if component is unfamiliar)
Call `get_screenshot` to visually confirm what the component is before writing documentation.

### 4. Write Figma description
Use the established Pepper DS format. Include only sections relevant to the component:

```
[One-line description of what this component is and when to use it.]

SIZE GUIDE (if component has multiple sizes)
• [size]px — [platform / use case]
...

STYLES (if component has named style variants)
• [Style name] — [usage]
...

STATES
• [State list]
• Do not set state manually — it is interaction-driven

VARIANTS / INPUTS / [component-specific section name]
• [variant] — [description]
...

OPTIONAL PARTS (if component has toggleable props)
• [Prop name] — [what it shows/hides]
...

APPEARANCE (if component has Default / Inverse / onSecondary modes)
• Default — use on light or neutral backgrounds
• Inverse — use on dark or emphasis (onEmphasis) backgrounds
• onSecondary — use on secondary surface backgrounds

MODES (include whenever Inverse or Static: Inverse modes are available)
• Default — standard appearance. Use on light or neutral surfaces.
• Inverse — use on onEmphasis (dark or brand) backgrounds. Switches colours to maintain contrast.
• Static: Inverse — always renders in inverse regardless of light/dark theme. Use when the surface is permanently dark (e.g. a fixed dark hero or persistent emphasis panel).
⚠️ Always apply Inverse mode when placing this component on an onEmphasis background. Using Default mode on a dark surface will produce incorrect contrast and colour rendering.

CORNER RADIUS (include for all input field components)
• Controlled via Figma variable modes
• Default — square with a subtle radius. Recommended for most product surfaces
• Round — softer, rounder corners. Use when the surrounding UI calls for a more rounded aesthetic
• Corner mode is a product-team decision — align with the button radius used on the same surface

ICON SIZES — do not resize manually (include for input field components)
• 40px input (web) → 16px icons
• 48px input (mobile / native) → 20px icons

DOS
✓ [Do item]
...

DON'TS
✗ Don't [don't item]
...

FOR AI
Component: [exact Figma component name]
Prop: [PropName] → [Value1] | [Value2] | ...
Mode: [ModeName] → [Value1] | [Value2]
Rules: [Key rules for AI code generation]
```

## Token reference — what good looks like

| Token type | Correct new DS | Old DS (flag these) |
|------------|---------------|---------------------|
| Font family | `body/body-sm/font-family` = Manrope | `text/family/body` = Roboto |
| Font family | `label/label-md/font-family` = Manrope | `text/family/emphasis` = Plus Jakarta Sans |
| Text style | `Label/sm`, `Body/sm`, `Body/xs` | `Label/Label - SM`, `Body/Body - SM` |
| Surface | `surface/default`, `surface/state/hover` | — |
| Text colour | `text/primary`, `text/secondary` | `color/text/primary` |
| Icon colour | `icon/primary`, `icon/secondary` | `color/icon/primary` |
| Error colour | `#e7000b` | `#d6313b` (wrong alias) |
| Spacing | `gap/sm`, `gap/xs`, `inset/md` | `spacing/8`, `spacing/16` |
| Corner radius | `input-md`, `input-lg`, `radius/*` | hardcoded px values |
| Focus ring | `stroke/focused`, `Focus Ring/focus-default` | — |
