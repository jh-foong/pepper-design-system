---
name: layer-cleanup
description: Cleans up a messy Figma file — renames layers semantically, removes hidden junk, groups logically, and normalizes structure. Use when someone says "clean up my file", "rename layers", "organize this file", "fix layer names", or invokes /layer-cleanup. Turns 30 minutes of busywork into one prompt.
---

# Layer Cleanup

Clean up the selected frame (or the current page if nothing is selected) so the layers panel reads like documentation, not chaos.

## Step 1 — Audit

Read the node tree of the selection. Count and report before making changes:
- Layers with default names (Frame 427, Rectangle 12, Group 8, image 4...)
- Hidden layers
- Empty groups and frames
- Detached component instances (note them, do not fix)
- Layers positioned far outside their parent bounds (stray/orphan layers)

Show the user this summary and proceed.

## Step 2 — Rename semantically

Rename every default-named layer based on its role and content:

- Text layers → their content, truncated to ~30 chars: `"Get started today"` not `Text 14`
- Buttons → `btn/primary/get-started`, `btn/ghost/cancel`
- Icons → `icon/arrow-right`, `icon/close`
- Images → `img/hero-product`, `img/avatar-user`
- Containers → their role: `nav`, `hero`, `card/pricing`, `footer`, `section/testimonials`
- Backgrounds and decorative shapes → `bg/gradient`, `decor/blob-01`

Rules:
- kebab-case, lowercase, `/` for grouping
- Never rename component instances or layers that already have intentional, non-default names
- Keep names in English

## Step 3 — Structural cleanup

- Delete empty groups and frames (zero children, zero fills/effects)
- Delete fully transparent layers with no effects that serve no purpose
- Ungroup single-child groups (unless they carry styles or constraints)
- Move stray layers back inside the nearest logical parent, or collect them into a frame named `_orphans` at the edge of the selection
- Order layers top-to-bottom to match visual top-to-bottom reading order where possible

Do NOT:
- Delete hidden layers without listing them first and asking — they may be alternate states
- Detach or restructure component instances
- Change any visual property (position within parent, size, fills, effects)

## Step 4 — Report

Finish with a short before/after summary:
- X layers renamed
- X empty groups removed
- X strays relocated
- Anything skipped and why (e.g., hidden layers left untouched pending confirmation)
