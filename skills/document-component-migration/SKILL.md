---
name: document-component-migration
description: Compare a legacy and new component side-by-side, documenting what's new (with rationale), a property comparison table, annotated visual/structural differences on the new component, and deprecation notes.
---

# Document Component Migration

Generate a structured migration guide comparing a legacy component to its replacement. The user will select both components (legacy and new). The output is a documentation frame placed on the current page.

## Required Inputs

- Two selected component sets: one legacy, one new
- Inspect both components to extract: variant options, property definitions, internal structure (children, nesting, auto-layout), corner radius, padding, and any other differing attributes

**Before starting, always ask the user which of the two selected components is the updated/new version.** Do not assume based on naming. Use the `AskUserQuestion` tool with the two component names as options.

**Then ask the user about the deprecation timeline for the legacy component.** Use the `AskUserQuestion` tool with the question "When will the legacy component be deprecated?" and these options:
- Immediately
- Next sprint cycle
- Once full migration is complete

## Output Structure

The documentation frame uses a 1280px-wide vertical auto-layout with white background. It contains these sections in order:

### 1. What's New

A text section summarizing the meaningful changes with rationale. Each change should be a numbered item with:
- **What** changed (e.g., "Tertiary variant added")
- **Why** it was introduced (e.g., "Provides a low-emphasis option for dismissive actions like Cancel or Skip, establishing clearer visual hierarchy when paired with Primary or Secondary buttons")

Derive rationale from the structural and visual evidence — if a trailing icon was added, the rationale is likely flexibility for directional cues; if corner radius went to pill, it's likely modernization/scalability.

### 2. Property Comparison Table

A table with columns: Property | Legacy | New

Include rows for:
- Variant options
- Size options
- State options
- Icon/boolean properties (note defaults)
- Corner radius
- Internal structure summary
- Total variant count
- Any other differing properties discovered during inspection

Use the documentation page table helper (rows of horizontal auto-layout frames inside a vertical container with rounded gray backgrounds).

### 3. Visual & Structural Differences

Create side-by-side visual comparisons using actual instances of both components. Organize into labeled subsections (e.g., "Shape", "Icon Architecture", "Variants", "Layer Architecture").

Each subsection shows:
- Legacy instance(s) on the left, new instance(s) on the right
- Column headers labeled "Legacy" and "New"
- Where applicable, a layer-tree diagram showing internal node structure

**Annotations — apply ONLY to the new component instances, and ONLY for things that differ from legacy.** Use native Figma Annotations (`node.annotations`) with pinned properties where relevant.

Annotation categories (create these if they don't exist):
- **Variants** (blue) — new or changed variant options, variant-specific usage guidance
- **Structure** (teal) — internal layer hierarchy changes, nesting, wrapper frames
- **Tokens** (green) — changed design tokens: radius, padding, spacing, colors
- **Usage** (orange) — behavioral changes: default values, interaction patterns, when-to-use guidance

Each annotation should use `labelMarkdown` with:
- A bold title naming the difference
- A short explanation of what changed vs. legacy
- Guidance for adoption

### 4. Deprecation Notes

Use the deprecation timeline answer from the user's earlier response to populate this section. A text section stating:
- The legacy component is deprecated
- **Deprecation timeline:** reflect the user's chosen timeline (e.g., "Effective immediately", "Deprecated as of next sprint cycle", or "Will be deprecated once full migration is complete" — or the user's custom answer if they provided one)
- It should not be used in new work
- All existing instances should be migrated to the new component
- The legacy component will be removed according to the stated timeline
- Contact info or team reference for edge cases

## Design

- **Canvas:** 1504px fixed width, white, vertical Auto Layout with HUG height; use 120px vertical padding, 80px horizontal padding, and 88px between major sections. Place clear of existing content; never at `(0, 0)`.
- **Grid:** Content is 1344px wide; major sections use a 250px label column, 48px gutter, and a flexible content column up to 1046px.
- **Sections:** Keep label and content top-aligned; stack modules with 80px gaps and separate major sections with a full-width 1px `#E5E5EB` rule.
- **Type:** Use Inter with `#1A1A1A` headings and `#4D4D4D` supporting text; use JetBrains Mono only for chips. Bind semantic text variables when the file has them.
- **Display / 44:** Inter Semi Bold, auto line height; use for the document title.
- **Section / 24:** Inter Semi Bold, auto line height; use in the left label column.
- **Subhead / 18:** Inter Bold for module titles; Inter Regular for the document subtitle.
- **List title / 16:** Inter Semi Bold; pair with Body and keep 4px between title and copy.
- **Body / 14:** Inter Regular; use Bold for property names and Semi Bold for emphasized "New" values; labels may use 13px Bold.
- **Text/list block:** Cap prose at 700px; stack items with 16px gaps and let all text grow vertically.
- **Table:** Use a 1046px vertical stack with 4px row gaps; divide each row into three equal columns (Property · Legacy · New).
- **Table header:** Transparent, 12px vertical/16px horizontal padding, 14px Semi Bold text.
- **Table row:** `#F9F9FB` fill, 2px radius, 16px padding; grow height for wrapping content.
- **Comparison group:** Two equal 503px tiles in a 1046px row with a 40px gutter; match paired heights.
- **Comparison tile:** `#F9F9FB` fill, 1px `#E5E5EB` border, 12px radius, 32px horizontal and 80px vertical padding.
- **Tile chip:** Pin at 16px top/left; use 4px/8px padding, 4px radius, and 11px JetBrains Mono Medium.

| Doc type | Left chip | Right chip |
|----------|-----------|------------|
| Usage guidelines | **Green** Do (`success` / `#22C55E`) | **Red** Don't (`danger` / `#EF4444`) |
| Migration | Legacy (`#E5E5EB` bg / `#4D4D4D` text) | New (`#1a1a1a` bg / `#FFFFFF` text) |

Green/red is for Do/Don't only — never use for Legacy/New labels.

- **Tile stage:** Center **real component instances** only; add a 13px Bold row label 16px above a comparison when needed.
- **Construction:** Use nested Auto Layout for every frame; bind file semantic variables when available (flag when falling back to defaults); load Inter and JetBrains Mono before setting text; build incrementally — one section, verify, next.
- **Callouts & footer:** Full-width note callouts with pink left-border for extra context. Footer: library name · Inter (left), doc title (right), 11px mono, `#8C8C87`.
- **Annotations:** After build, add via `use_figma` (Figma Plugin API — `node.annotations`) to target instances. Categories: Usage (orange), Variants (blue), Tokens (green), Structure (teal). `labelMarkdown`: **bold title**, one sentence, bullet guidance; pin `properties` when measurable. Annotation cards flank the frame; don't overlap content.
- **Rules:** Never `resize()` one axis on auto-layout frames — use `layoutSizingHorizontal` / `layoutSizingVertical` independently.

## Annotation Rules

1. Only annotate the NEW component instances — never the legacy ones
2. Only annotate differences — if a property is identical between legacy and new, skip it
3. Use the four categories above exclusively (Variants, Structure, Tokens, Usage)
4. Include pinned `properties` in annotations when the difference is a specific measurable property (e.g., cornerRadius, layoutMode, padding, itemSpacing, fills, strokes)
5. Use markdown formatting in labels: bold for titles, backticks for prop names, bullet lists for usage guidance

## Implementation Notes

**Tool note (adapted for this project):** this project's Figma access is the `use_figma` MCP tool (arbitrary JS against the Figma Plugin API), plus `get_screenshot`, `get_metadata`/`get_design_context`, and `get_variable_defs` for reads. There is no separate `evaluate_script` or `create_design` tool here — build the comparison frame the same way as any other documentation frame this session: with `use_figma` calls that create real frames/instances directly (see `design-system-documentation` for the established pattern of building a documentation frame section-by-section with validated screenshots in between).

- Use `use_figma` to inspect both component sets (propertyDefinitions, children structure, layout properties)
- Use `use_figma` to build the visual comparison frame, instancing both component sets side by side
- Use `use_figma` to add native Figma annotations to the new component instances after creation
- Load Inter Regular and Medium for the documentation text
- Position the output frame in the user's viewport on the same page as the updated component
