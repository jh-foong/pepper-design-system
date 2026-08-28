---
name: tokenize
description: Replaces hardcoded values (colors, padding, gap, corner radius, stroke, opacity, etc.) on selected layers with matching variables/tokens from the current file or attached libraries. Prioritizes same-project variables over third-party libraries. Use when asked to tokenize, variablize, replace hardcoded values, bind tokens, or connect layers to variables.
---

# Tokenize — Replace Hardcoded Values with Variables

Replace hardcoded property values on selected layers (and their descendants) with matching variables/tokens that already exist in the file or its attached libraries. The goal is design-system alignment: every value that has a matching token should be bound to it.

**Tool note:** every API call below (`figma.variables.*`, `node.setBoundVariable`, `figma.teamLibrary.*`, etc.) is a real Figma Plugin API call — run it via this project's `use_figma` tool, which executes arbitrary JS against that same `figma` global. `figma.teamLibrary.*` calls depend on the file actually having attached team libraries; if it has none, source priority 2/3 below simply find nothing and priority 1 (local variables) is all that applies.

## Properties to tokenize

Scan and bind ALL of the following when a matching variable exists:

### Node-level (use `node.setBoundVariable(field, variable)`)
- **Padding:** `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- **Gap / spacing:** `itemSpacing`, `counterAxisSpacing`
- **Corner radius:** `cornerRadius`, `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius`
- **Size:** `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- **Stroke weight:** `strokeWeight`, `strokeTopWeight`, `strokeRightWeight`, `strokeBottomWeight`, `strokeLeftWeight`
- **Opacity:** `opacity`

### Fill and stroke colors (use `figma.variables.setBoundVariableForPaint(paint, 'color', variable)`)
- Solid fill colors
- Solid stroke colors

### Effect properties (use `figma.variables.setBoundVariableForEffect(effect, field, variable)`)
- Shadow/blur `color`, `radius`, `spread`, `offsetX`, `offsetY`

### Text properties (use `node.setBoundVariable(field, variable)` on TEXT nodes)
- `fontSize`, `fontFamily`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `paragraphSpacing`

## Matching strategy

### Step 1 — Build the variable index

Collect all available variables into a lookup structure, grouped by resolved type (`COLOR`, `FLOAT`, `STRING`). For each variable, store its resolved value(s), scopes, name, and source priority.

**Source priority (bind from highest priority first):**

1. **Local variables** — from the current file (`figma.variables.getLocalVariablesAsync()`)
2. **Same-project library variables** — from libraries whose `libraryName` matches the current file's project or team. Use `figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()` → for each collection, `figma.teamLibrary.getVariablesInLibraryCollectionAsync(collection.key)` → `figma.variables.importVariableByKeyAsync(variable.key)` to get the full `Variable` object with resolved values.
3. **Third-party library variables** — all remaining attached libraries, same API calls as above.

When multiple variables match the same value, prefer the one from the highest-priority source. If still tied, prefer variables whose `scopes` array includes the specific scope for the property being bound (e.g., a variable scoped to `GAP` is preferred over `ALL_SCOPES` when binding `itemSpacing`). If still tied, prefer variables with shorter/simpler names (likely primitives or semantic tokens rather than deeply nested aliases).

### Step 2 — Walk the selected nodes

Recursively traverse each selected node and its descendants. For every node:

1. **Skip already-bound properties.** Check `node.boundVariables` — if a field already has a `VariableAlias`, skip it. For fills/strokes, check `paint.boundVariables?.color`. This avoids overwriting intentional bindings.

2. **Match and bind each unbound property:**
   - For FLOAT properties: find a FLOAT variable whose resolved value matches the node's current value exactly (within ±0.01 tolerance). Respect `scopes` — only bind if the variable's scopes include the relevant scope for that property, OR the variable has `ALL_SCOPES`.
   - For COLOR properties: find a COLOR variable whose resolved RGBA matches the paint's color + opacity (within ±0.01 per channel). Convert paint `{r,g,b}` + paint `opacity` to `{r,g,b,a}` for comparison. Respect scopes (e.g., `ALL_FILLS`, `FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE_COLOR`).
   - For STRING properties (fontFamily, fontStyle): find a STRING variable whose resolved value matches.

3. **Bind using the correct API:**
   - Node fields: `node.setBoundVariable(field, variable)`
   - Paint colors: `const boundPaint = figma.variables.setBoundVariableForPaint(paint, 'color', variable); node.fills = [boundPaint]` (reassign the entire fills/strokes array)
   - Effect fields: `const boundEffect = figma.variables.setBoundVariableForEffect(effect, field, variable); node.effects = [...updatedEffects]`

### Step 3 — Scope-to-property mapping

Use this mapping when checking whether a variable's scopes are appropriate for a given property:

| Property | Relevant scopes |
|---|---|
| `paddingTop/Right/Bottom/Left` | `GAP`, `ALL_SCOPES` |
| `itemSpacing`, `counterAxisSpacing` | `GAP`, `ALL_SCOPES` |
| `cornerRadius`, `topLeftRadius`, etc. | `CORNER_RADIUS`, `ALL_SCOPES` |
| `width`, `height`, `min/maxWidth`, `min/maxHeight` | `WIDTH_HEIGHT`, `ALL_SCOPES` |
| `strokeWeight`, `strokeTopWeight`, etc. | `STROKE_FLOAT`, `ALL_SCOPES` |
| `opacity` | `OPACITY`, `ALL_SCOPES` |
| Fill color (frame) | `ALL_FILLS`, `FRAME_FILL`, `ALL_SCOPES` |
| Fill color (shape/vector) | `ALL_FILLS`, `SHAPE_FILL`, `ALL_SCOPES` |
| Fill color (text) | `ALL_FILLS`, `TEXT_FILL`, `ALL_SCOPES` |
| Stroke color | `STROKE_COLOR`, `ALL_SCOPES` |
| Effect color | `EFFECT_COLOR`, `ALL_SCOPES` |
| Effect float (radius, spread, offset) | `EFFECT_FLOAT`, `ALL_SCOPES` |
| `fontSize` | `FONT_SIZE`, `ALL_SCOPES` |
| `fontFamily` | `FONT_FAMILY`, `ALL_SCOPES` |
| `fontStyle` | `FONT_STYLE`, `ALL_SCOPES` |
| `fontWeight` | `FONT_WEIGHT`, `ALL_SCOPES` |
| `letterSpacing` | `LETTER_SPACING`, `ALL_SCOPES` |
| `lineHeight` | `LINE_HEIGHT`, `ALL_SCOPES` |
| `paragraphSpacing` | `PARAGRAPH_SPACING`, `ALL_SCOPES` |

## Reporting

After processing, log a summary:
- Total nodes scanned
- Total properties tokenized (broken down by category: colors, spacing, radius, typography, etc.)
- Properties skipped (already bound)
- Unmatched values (hardcoded values with no matching variable — list the top 5-10 most common unmatched values so the user knows what tokens might be missing)

## Important notes

- `node.fills` and `node.strokes` can be `figma.mixed`. Guard with `!== figma.mixed` before iterating.
- `node.fontName` can be `figma.mixed` on TEXT nodes with mixed fonts. Use `node.getStyledTextSegments(['fontName', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight'])` to handle mixed-font text.
- When resolving variable values for comparison, use `variable.resolveForConsumer(node)` if available, otherwise use `variable.valuesByMode` with the node's explicit variable mode or the collection's default mode.
- Always wrap fill/stroke/effect binding in try-catch — some node types don't support certain paint operations.
- For large selections, process in chunks to avoid timeout. If there are more than 200 descendant nodes, process 50 at a time with progress logging.
- When importing library variables via `importVariableByKeyAsync`, batch imports and cache the results to avoid redundant network calls.
