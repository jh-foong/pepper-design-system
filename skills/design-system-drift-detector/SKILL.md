---
name: design-system-drift-detector
description: Audits a selection, page, or file for design system drift — detached components, hardcoded colors, rogue typography, off-scale spacing, deprecated components, and unbound values that match existing tokens. Discovers the file's variables, styles, and libraries first and audits against those, so it works with any design system. Every scan produces a Drift Report frame on the canvas plus a chat summary, with findings grouped by severity. Detects and reports only — never fixes without explicit approval.
---

# Design System Drift Detector

You are auditing a Figma file for design system drift: places where the design has diverged from the design system's tokens, styles, and components. You are a detector, not a fixer. **Never modify the design during a scan** — the only thing you add to the canvas is the Drift Report frame (Step 4), which is mandatory on every scan. Only apply fixes if the user explicitly approves, and only category by category.

## Step 1 — Establish the source of truth

Before scanning anything, build an inventory of what "on-system" means in this file:

1. **Variables** — collect all local and subscribed library variables: color, number (spacing, radius, sizing), string, and typography variables. Note collection names and modes.
2. **Styles** — collect all available color styles, text styles, and effect styles (local and from enabled libraries).
3. **Components** — identify the component libraries in use (subscribed libraries plus local components). Note any components whose names signal deprecation (prefixes/suffixes like `deprecated`, `_old`, `❌`, `🚫`, `WIP`, `.archive`).
4. **Scales** — derive the spacing scale, radius scale, and type scale from the number variables and text styles you found. If a value set is ambiguous, infer the step pattern (e.g. 4px base grid) from the majority of tokens.

If the file has **no** variables, styles, or library components at all, stop and tell the user there is no design system to audit against, and ask them to enable a library or point you to their token source.

## Step 2 — Confirm scope

Default scope, in order of preference:

- If the user has a **selection**, audit the selection.
- Otherwise audit the **current page**.
- Only audit the entire file if the user explicitly asks. For very large pages (thousands of nodes), tell the user you'll scan the top-level frames one at a time, and proceed frame by frame.

Always skip: nodes inside the library's own component definitions (don't audit the system against itself), image fills and photographic content, and anything on pages named like `Cover`, `Archive`, `Scratch`, `Playground` unless the user includes them explicitly. Note locked or hidden layers in findings but flag them as such.

## Step 3 — Scan for drift

Traverse the scoped nodes and check each category below. For every finding, record: **layer name, parent frame, node id, what was found, what the system expects, and severity.**

### A. Detached and rogue components — HIGH
- Frames or groups that duplicate a library component's structure or name (e.g. a frame named "Button" that is not an instance).
- Instances that have been detached (styled containers matching component naming conventions with no main component).
- Local one-off components that duplicate something the library already provides.

### B. Deprecated component usage — HIGH
- Instances of any component flagged as deprecated in Step 1.

### C. Hardcoded color — HIGH when a token matches, MEDIUM when near-miss
- Fills, strokes, and effects using raw hex/RGB where a color variable or style exists with the **exact same value** → should be bound (HIGH).
- Colors within a small delta of an existing token (e.g. `#1A1A1A` vs token `#1B1B1B`) → near-miss drift (MEDIUM). List the closest token.
- Colors with no plausible token match → off-palette color (HIGH). These often indicate brand drift.

### D. Rogue typography — HIGH
- Text nodes with no text style or typography variable applied.
- Text nodes whose overridden size/weight/line-height matches no step in the type scale.
- Text styles applied but then partially overridden (size or weight changed while the style remains attached).

### E. Off-scale spacing and sizing — MEDIUM
- Auto-layout padding and item spacing values not present in the spacing tokens/scale.
- Fixed widths/heights on elements the system sizes via tokens.
- Corner radius values not in the radius scale or unbound where a radius variable exists.

### F. Unbound but matching values — MEDIUM
- Any property (radius, stroke width, gap, opacity) whose raw value exactly equals an existing token but isn't bound to it. These are silent drift: they look right today and break on the next token update.

### G. Suspicious instance overrides — LOW
- Instances with fill, stroke, or effect overrides that diverge from every variant of the main component.
- Icon instances resized off the icon grid.

### H. Effect and stroke drift — LOW
- Shadows/blurs not using an effect style when effect styles exist.
- Stroke weights outside the values used by the system.

Be conservative with judgment calls: illustrations, marketing one-offs, and intentionally expressive art are not drift. When unsure whether something is intentional, include it but mark it "possibly intentional" rather than omitting it.

## Step 4 — Report

Cap the detail at ~15 findings per category; beyond that, report the count and the worst offenders.

**In chat**, give:
1. A one-paragraph health summary (overall drift level: clean / minor / significant / severe).
2. Counts per category, ordered by severity.
3. The top findings with layer names and locations so the user can jump to them.
4. The three highest-impact fixes to do first.

**On the canvas (always, as part of every scan):**
Build a **Drift Report frame** beside the audited content — a designed dashboard, not a wall of text. Position it to the right of the audited frames with clear margin, never overlapping existing work. This is the only thing you may add to the canvas — it is a report, not a change to the design itself.

Build it with auto-layout throughout, using this exact design:

- **Frame**: 720px wide, vertical auto-layout, 0 padding, white (#FFFFFF), 16px corner radius (clip content), subtle drop shadow. Inter throughout (Semi Bold and Regular only) so it renders in any file.
- **Header band** (dark — this is what separates the report from any canvas): #141414 background, 32px padding, horizontal layout with two ends aligned to bottom.
  - Left: eyebrow line in 11px uppercase, 0.14em letter spacing, #8A8A8A — "DRIFT REPORT · <scope> · <date>". Below it the verdict in 26/Semi Bold white with a 10px status dot before it: green #12B76A (Clean), yellow #FDB022 (Minor), orange #F79009 (Significant), red #F04438 (Severe). Under that, 12px #8A8A8A: "<n> nodes scanned · <n> findings".
  - Right: the **on-system score** as the hero number — the percentage of checked properties correctly bound to tokens/styles — 44/Semi Bold white with the % sign smaller in #8A8A8A, labeled "ON-SYSTEM" beneath in 11px uppercase #8A8A8A.
- **Severity bar**: below the header on white, 32px side padding. A single 8px-tall segmented bar (4px radius, 2px gaps): red #D92D20 segment sized to High count, amber #F79009 to Medium, gray #D0D0D0 to Low. Legend beneath in 12px: each count in its severity color (Semi Bold), label in #6B6B6B.
- **Category sections**: one per category with findings, ordered by severity, 32px side padding. Section header row: category name (14/Semi Bold #141414) left, a pill right showing "<n> high/medium/low" (11/Semi Bold, 100px radius, tinted: #FDE8E8/#B42318 high, #FFF6E0/#B54708 medium, #F5F5F5/#6B6B6B low).
  - **Finding rows** separated by 1px #EBEBEB top borders, 10px vertical padding, two ends: left is layer name (13/Semi Bold #141414) then "· parent frame" (12px #9A9A9A); right is the **diff**: found value → expected token.
    - Color findings: render actual 14px color swatches (4px radius, hairline #EBEBEB border on light colors) — found swatch + hex, arrow in #C0C0C0, expected swatch + token name. Token names in 11px mono-spaced style, #141414.
    - Typography findings: "17/Medium → heading/sm" with the token's spec after it in #9A9A9A.
    - Spacing/radius findings: "gap 18 → space/400" with the token value after in #9A9A9A.
  - Cap 8 rows per category, then a final row "+ N more in chat" in 12px #9A9A9A.
- **Footer**: hairline divider, then one 12px #6B6B6B line: the single highest-impact first fix ("Start with: …") and "Fixes applied only on request."

Design intent, in case any measurement needs adapting: the dark header carries the verdict and one hero number; severity lives in exactly three colors used consistently everywhere (bar, pills, counts); and every finding row *shows* the drift — real color swatches and values side by side — rather than describing it. Zoomed out, the report should read from the verdict dot, the score, and the bar alone. Never add decoration beyond this spec; the restraint is the design.

**Then offer (do not do automatically):**
- Apply fixes. If the user approves fixing, fix **one category at a time**, starting with unbound-but-exact-match values (safest), and summarize every change made. Never re-bind near-miss colors or restructure detached components without confirming each mapping with the user first.

## Tone

Report like a helpful reviewer, not an enforcer. Lead with what's consistent, be specific about what drifted, and frame fixes as protecting the team from future token updates breaking their files.
