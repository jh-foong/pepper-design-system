---
name: component-spec-docs
description: Generate designer-facing component spec docs and build them on the canvas as a complete documentation frame. Covers what each component is for, every variant and when to reach for it, the property API, dos and don'ts, and accessibility considerations, with live component previews. Always use this skill when the user selects or references components and asks for component specs, spec docs, or to document them, write usage guidelines, or explain when to use each variant. Also use it for casual asks like "write docs for these buttons," "spec out these badges for the team," or "the team keeps misusing this, write something up." For engineer-facing build specs, this is the wrong skill; component spec docs are for designers choosing and applying a component.
---

# Component spec docs

Write documentation that helps a designer answer one question fast: which component do I use here, and how do I use it correctly. Then build it on the canvas as a complete documentation frame, so the spec lives in the file next to the components it documents.

The audience is a designer opening the library at 2pm with a screen to build. They are not reading for pleasure. They are scanning for the variant that matches their situation, then checking they are not about to do something the system already has an opinion about. Engineer-facing build specs (sizing, tokens, ARIA contracts) are a different deliverable; this doc answers "should I use this, which variant, and what will get me in trouble."

## Before building

1. Identify the target. If nothing is selected and no components are named, ask which components to document. Never guess. If the selection covers more than about eight components, propose starting with a subset before building; a wall of unreviewed documentation pushed into a live file helps nobody.
2. Study the components thoroughly: every component in the selection, their names and nesting, every variant property and its exact values, the visible parts, and the bound variables. Look at each variant visually; a variant that renders differently than its name suggests is exactly the trap this doc exists to prevent.
3. Check for an existing frame named `Spec / <Component or group name>` on this page. If one exists, ask whether to replace it or place the new version beside it. Never delete anything without being told to.

Use the exact names from the file everywhere, including casing quirks and typos. If a variant value reads `Destructve`, write `Destructve` and note the typo separately rather than silently correcting it. Documentation that renames a variant is worse than useless: it teaches the team a vocabulary the file does not use.

## The document content

Sections 1 through 9 are per component. When documenting more than one component, open with two group-level sections, then repeat per component.

**Group level:**

- **Overview**: what this family of components is for, in two or three sentences. Skip the history and the philosophy.
- **Choosing between them**: a table mapping situation to component. The single most valuable thing in a multi-component doc.

| If you need to | Use | Why |
|---|---|---|
| Show a non-interactive status on a record | Badge | Read-only, no click target |
| Let a user remove a selected filter | Tag | Has a dismiss affordance |

Cover the confusions that actually happen: Badge versus Tag, Menu versus Dropdown, Switch versus Checkbox. If two components in the selection look nearly identical, that pair belongs in this table.

**Per component:**

### 1. What it is

One or two sentences. Plain description of the thing, not its implementation. "A short, non-interactive label that communicates the status of an item" beats "an atomic display element."

### 2. When to use

Three to six bullets, each naming a concrete situation, not a category.

Good: "Showing order status in a table row."
Bad: "When you need to display status information."

The difference is that a designer can match the first one against the screen in front of them.

### 3. When not to use

Same format, just as important, and each item points somewhere else:

- Not for anything clickable. Use Tag if the item can be dismissed, or Button if it triggers an action.
- Not for long text. Anything over about 20 characters belongs in body copy.

This section is where you prevent the misuse that made someone ask for docs in the first place.

### 4. Anatomy

The visible parts in a numbered list, using the names from the file. Keep it short: designers need the vocabulary so the rest of the doc makes sense, not a part-by-part engineering breakdown. Mark optional parts, and say which variant a variant-only part belongs to.

### 5. Variants

The core of the document. For each variant: a live instance of it as the preview, then what it looks like in a short phrase, when to use it, and when not to if there is a common mistake.

**Subtle**: low-contrast background, no border. Use inside dense surfaces like tables and lists where a solid badge would fight for attention. Not for standalone use on a page background, where it reads as disabled.

Do not write a variant entry that only restates the name. "Large: the large size" tells a designer nothing. If a variant genuinely has no usage rule beyond the obvious, say what determines the choice: "Size follows the density of the surrounding surface, not the importance of the content."

For components with multiple variant axes (size and style and state), organize by axis with a subheading per axis. Do not enumerate the cross-product; four sizes and five styles does not mean twenty entries.

### 6. Properties

A table: property name, type, values, default, and a notes column for anything non-obvious.

| Property | Type | Values | Default | Notes |
|---|---|---|---|---|
| Size | variant | sm, md, lg | md | Match the surface density |
| Icon | boolean | true, false | false | Leading position only |

Use property names exactly as they appear in the properties panel, including spaces and capitalization; a designer will look for that string. If a property only applies to certain variants, or two properties interact, that goes in notes.

### 7. Dos and don'ts

Four to eight pairs, each do matched with a don't where the pairing is natural, and the reason on the don't:

**Do** use sentence case for labels.
**Don't** use all caps. It reduces scannability and breaks the type ramp.

"Don't do X" is a rule. "Don't do X because Y" is something a designer can apply to a case you did not anticipate. Prefer specific, checkable rules over principles: "Don't stack more than three badges in a row" beats "don't overuse badges."

### 8. Accessibility considerations

Written for a designer, not an engineer. Four areas, kept short:

**Color and contrast**: which variants meet contrast requirements and which do not. Call out any variant that relies on color alone to carry meaning, and say what to pair it with.
**Text alternatives**: what a screen reader needs. For icon-only variants, note that a label is required and where it comes from.
**Target size**: for interactive components, whether the smallest variant meets the minimum touch target. Flag it if the small variant is below 44x44px including padding.
**Keyboard and focus**: whether the component is reachable by keyboard and what the focus state looks like. Designers need to know if they are responsible for designing one.

Skip the ARIA attribute list; a designer will not act on it. If a component has a known accessibility problem in its current form, say so plainly. That is one of the highest-value lines a doc can contain.

### 9. Related components

Three to five entries, one line each: the component and the one-phrase distinction.

**Tag**: same visual family, but dismissible and interactive.
**Chip**: for selection within a filter set, not for status.

Point to the neighbours a designer might land on by mistake. If the group-level table already covers a pair, keep this short or omit it.

## Building the frame

One vertical auto-layout frame per document, named `Spec / <Component or group name>`. This naming is what makes re-runs findable, so use it every time.

**Placement.** Directly to the right of the documented components, top-aligned, 96px gap. Before placing, check that nothing occupies that space; if the right side is taken, place below instead (same left edge, 96px gap). If the components live inside a section, place the frame inside the same section so it travels with them. If the user names a different destination (a docs page, a specific spot), use that instead. Never reposition the components or their neighbours to make room.

**Dimensions.** Fixed width 1200px, content hugs vertically. Padding 64px, gap between major sections 48px, corner radius 16px. If this file already contains documentation frames at a different width or style, match the file's convention instead.

**Styling.** The frame must look native to this file, not imported. Apply the file's own text styles (a large heading for the title, a heading style for sections, a body style for content, a secondary style for captions) and bind fills to the file's semantic variables: surface for the background, primary text for copy, secondary text for meta lines, border for dividers and the frame's 1px outline. Only if the file has no styles or variables at all, fall back to Inter, near-black on white, and say so afterward.

**Structure, top to bottom.**

1. Title and one-line description, with a small secondary-text meta line carrying the date.
2. Live instances of the documented components as previews. Never screenshots; instances stay current when a component changes, screenshots go stale and quietly become wrong.
3. The group-level sections when there is more than one component, then the nine sections per component, each its own sub auto-layout. In the Variants section, place a live instance of each variant beside its entry.

**Tables.** Build the choosing-between and properties tables as auto-layout grids: a vertical stack of rows, each row a horizontal layout of fixed-width cells, header row in a stronger weight with a bottom divider. If the file's design system has a table component, instance it instead.

**Do/don't blocks.** Two columns, do on the left, with accents bound to the file's success and error variables, not raw hex. If the file already has a do/don't pattern, match it.

**Flags.** Every guess gets flagged inline with `[assumed]` or `[needs confirmation]`, and the flags must survive into the frame as visible callout rows bound to the file's warning variable. They are the most valuable lines in it. A designer reading a confident sentence about when to use the Warning variant will believe it, and if you invented it, that invention is now the team's convention.

## Tone and conventions

- No em dashes. Use commas, colons, parentheses, or sentence breaks.
- No AI hedges. Cut "it's important to note," "in conclusion," "when it comes to."
- Practitioner voice: the way a senior designer writes documentation for their own team.
- Sentence case headings. Second person for guidance ("use this when").
- Component, variant, and property names exactly as the file spells them, in backticks when referring to them as values.
- Numbers over adjectives: "under 20 characters" beats "keep it short."
- Short paragraphs, two to three sentences. Designers scan.

## When information is missing

Documentation gets treated as the source of truth, so a confident wrong line propagates.

- **Usage rules**: if the file gives variants but no intent, infer from the visual and the name, mark `[assumed]`, and list the ones you are least sure about in the report afterward.
- **Property behaviour**: describe what you can see. Do not invent interactions between properties.
- **Accessibility**: state what is checkable from the design (contrast, target size, reliance on color). For anything implementation-dependent, write what the designer is responsible for and leave the rest.
- **Content rules**: character limits and casing are almost never in the file. Propose sensible ones marked `[needs confirmation]` rather than presenting them as existing convention.

A short accurate doc beats a long one with invented rules. The moment a designer finds one wrong line, they stop trusting the whole page.

## Hard rules

- Never modify the documented components, their variants, or their properties. This skill only adds a documentation frame.
- Never delete or overwrite an existing frame without asking first.
- Never publish the library. Publishing is the user's call and usually has release process attached.

## After building

Summarize in chat: the frame name and where it sits, every `[assumed]` and `[needs confirmation]` flag so the user can resolve them, and anything that could not be fully reproduced (a table that had to be simplified, a variant that could not be instanced). Offer the document as text as well, since most teams also want it somewhere searchable like Notion or Storybook.
