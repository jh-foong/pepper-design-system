---
name: ds-compliance-review
description: |-
  Audit the selected Figma layers against the live published design system via Figma MCP. Flag and annotate non-compliance for:

  * Hardcoded colors
  * Off-token spacing
  * Local/orphaned styles
  * Detached instances
  * Missing component reuse

  Add one consolidated annotation per violating layer and a frame-level compliance score.
  Use for DS compliance/governance checks—not accessibility, redlines or design-vs-build QA.
---

# DS Compliance Review — token- and component-aware, canvas-native

This skill answers one question objectively: **does this file actually use the
design system, or does it just look like it does?** It walks every layer in
the selection and checks it against your *actual current* published library —
read live through the Figma MCP on every run, never against a memorized list
of tokens that may have drifted. A screen can be pixel-perfect and still fail
this review: pixel-perfect only means nothing looks wrong today; DS compliance
means a global token or component fix will actually reach this file tomorrow.

**Source of truth = the published library**, not the file being reviewed. A
violation is always stated as `found (in this file) → should be (from the DS)`.

**Tool note:** every tool named below (`get_libraries`, `get_variable_defs`, `search_design_system`, `get_screenshot`, `get_metadata`/`get_design_context`, `use_figma`) is a real tool available in this project already — no companion skill needs loading first.

## Hard rule — per-element pins are the deliverable, the badge is not a substitute (READ FIRST)

**The single most common way to fail this skill is to write only the
`[DSCR-SUMMARY]` frame badge and skip the individual `[DSCR]` element pins.**
This has actually happened — on a large multi-screen file the run produced one
badge per screen reading e.g. `220 violations | 4 hardcoded colors | 19
unstyled text | 174 off-token spacing | 23 off-token radius` and stopped
there, with not one pin on any actual layer. That is not a smaller version of
the deliverable — it's a different, useless deliverable. A rollup count tells
a designer nothing about which layer to fix; the whole reason this skill pins
comments on canvas instead of writing a report is so someone can open the
file and see the fix sitting on the exact broken layer.

**Banned, always:**
- Reporting any violation count — in the badge, in chat, in the saved report —
  that isn't backed by an equal number of violation *lines* across the actual
  `[DSCR]` element pins on canvas. If the badge says 220 violations, there
  must be 220 violation lines you can point to across real pins.
- Treating "too many elements" or "large file" as a reason to summarize
  instead of pin. Scale is handled by working frame-by-frame (see next
  section), never by skipping the per-element work.
- Ending a run having written a frame badge but zero element pins when the
  badge's own violation count is greater than zero.

**Required, always:** for every element found non-compliant in Step 3 of the
algorithm, an individual `[DSCR]` pin gets written on that exact layer, with
the exact templated fix message (see "Comment / fix-message format" below) —
*before* the frame badge is written. The badge is computed *from* the pins
that already exist, never written in their place.

## Scope size — large selections are worked frame-by-frame, never rolled up

A selection spanning many screens (a whole page, a multi-screen flow) is
real and common — don't ask the user to shrink it. Instead:

1. Enumerate the frames/screens in scope from `get_metadata`.
2. Process **one frame completely at a time**: walk every node in that frame,
   pin every violation on that frame's layers, write that frame's
   `[DSCR-SUMMARY]` badge — all before moving to the next frame.
3. Report progress as you go (e.g. "Screen 3 of 32 done — 41 pins written")
   rather than going silent and returning only at the very end.
4. If the total violation count across the whole selection is large enough
   that finishing all frames isn't practical in one pass, say so explicitly,
   finish the frames you can completely (pins AND badge, not badge alone),
   and tell the user exactly which frames are done vs. still pending — never
   silently degrade every frame to badge-only to make the run finish faster.

There is no scope size at which pinning becomes optional. A 4,000-element
file takes longer than a 40-element one; it does not get a different,
lighter-weight output.

## The four things being checked, in one sentence each

- **Color** — is this fill/stroke bound to a `color/*` variable, or a raw hex?
- **Spacing/radius** — is this padding, gap, or corner radius bound to a
  `spacing/*` or `radius/*` variable, or an arbitrary number?
- **Type** — is this text using a published library text style, or a manually
  set font/size/weight (or a *local* style masquerading as a DS one)?
- **Structure** — is this a live instance of a library component, or a
  detached/custom-built copy that should have been an instance?

## Scope resolution

- Nothing selected → **ask the user to select the frame(s)/page first.** Don't
  guess which part of a busy file they mean.
- Accepts Page contents, Section, Frame, Group, or Component/Set.
- **Walk into every instance.** A row of 10 repeated chips is 10 elements to
  check, not 1 — a component repeated in many overrides is exactly where
  compliance quietly breaks (one variant hand-tweaked, the rest fine).
- Report an honest, itemized element count equal to what was actually checked.

## Figma MCP tools this skill calls

| Tool | Role |
|---|---|
| `get_libraries` | Enumerate the file's **subscribed** libraries first. Only variables/styles/components from these count as "the DS" — a local style or component that happens to look similar is not compliance, see Honest limits. |
| `get_variable_defs` | Build the `value → token name` lookup for the selection (colors, spacing, radius, type scale), scoped to the subscribed libraries. |
| `search_design_system` | (a) Resolve a raw value to the *nearest* token when no exact bound match exists, so the fix message can name a real candidate. (b) Core tool for the "missing component reuse" check — query by node name / apparent role to see if a library component should have been used instead. |
| `get_screenshot` | Visual sanity check before/after the walk; confirms reading order and that nothing in scope was missed. |
| `get_metadata` / `get_design_context` | Fast structural overview of the selection (node tree, names, types) before drilling into individual nodes with the Plugin API. |
| `use_figma` (Plugin API) | The actual per-node compliance read: `node.fills[i].boundVariables`, `node.textStyleId` + `figma.getStyleByIdAsync(...).remote`, `instance.mainComponent.remote`, `node.boundVariables.paddingLeft` etc. Also the only way to **write** the annotations this skill produces. |

Batch every read (`get_libraries`, `get_variable_defs`, `get_screenshot`,
`get_metadata`) before any `use_figma` write call.

## Full checkpoint table

| Check | Compliant when | Violation type | Detection (Plugin API) |
|---|---|---|---|
| Fill / stroke color | Bound to a `color/*` variable sourced from a subscribed library | **Hardcoded color** | `paint.type === 'SOLID'` and `paint.boundVariables?.color` is absent, or present but its variable's containing library is not subscribed |
| Padding / gap (auto-layout) | Bound to a `spacing/*` variable | **Off-token spacing** | `node.boundVariables?.paddingLeft` (etc.) / `itemSpacing` absent, numeric value only |
| Corner radius | Bound to a `radius/*` variable | **Off-token spacing** *(same bucket — see note)* | `node.boundVariables?.topLeftRadius` etc. absent |
| Text style | `node.textStyleId` resolves to a style with `remote === true` (published library style) | **Orphaned local style** if `textStyleId` is set but resolves `remote === false`; counts as **hardcoded color/spacing-equivalent manual override** if `textStyleId` is empty and font/size/weight are set directly | `figma.getStyleByIdAsync(node.textStyleId)` |
| Component instance | `instance.mainComponent?.remote === true` | **Detached instance** | `instance.mainComponent` is null, or `.remote === false` |
| Custom-built equivalent | No library component's shape/role matches this hand-built group | **Missing component reuse** | Heuristic — see below |

**Note on radius/spacing sharing a bucket:** report them as one violation type
(`off-token spacing`) in the summary and score, but keep them as separate
lines within an element's consolidated pin so the fix is unambiguous (a radius
fix and a padding fix are different edits).

## Token & style resolution

```js
// Once per run, scoped to the selection root.
const libs = await getLibraries(fileKey);              // REST tool
const subscribedKeys = new Set(libs.libraries.map(l => l.key));
const varDefs = await getVariableDefs(fileKey, rootNodeId); // value → {name, key}

// Plugin-API side: resolve a bound variable's library membership.
async function isFromSubscribedLibrary(variableId) {
  const v = await figma.variables.getVariableByIdAsync(variableId);
  if (!v) return false;
  const collection = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
  return collection?.remote === true; // remote === bound to a library, not a local collection
}
```

When a raw value has **no** bound variable, don't just say "hardcoded" and
stop — call `search_design_system` with the raw value/nearby role (e.g. "blue
button background", "spacing 12") so the fix message can name the *actual*
closest token rather than a generic instruction. If nothing close exists,
say so explicitly — that's a real design-system gap, not a violation to hide.

## Detecting detached instances and missing component reuse

**Detached instance** is straightforward for nodes still typed `INSTANCE`:
check `mainComponent.remote`. But Figma has no "was detached" flag — once a
designer fully detaches an instance it becomes a plain `FRAME`/`GROUP` with no
trace of its origin. So this skill treats the two related failure modes
separately and says so in the report, rather than conflating them:

1. **Instance backed by a local component** (`INSTANCE` node, `mainComponent`
   present but `remote === false`, or `mainComponent` null) → **Detached
   instance**, high confidence, exact.
2. **A hand-built `FRAME`/`GROUP` that structurally resembles a library
   component** (same/similar name, similar child shape — e.g. a frame named
   "Button" containing a text child and no instance anywhere in its subtree)
   → **Missing component reuse**, heuristic, lower confidence. Confirm with
   `search_design_system(query: node.name, includeComponents: true)`; only
   flag when a name/role match scores clearly (don't flag every generic
   "Frame 1"). State the matched library component in the fix message.

```js
function classifyInstance(node) {
  if (node.type !== 'INSTANCE') return null; // handled by missing-reuse heuristic instead
  const mc = node.mainComponent;
  if (!mc || mc.remote === false) {
    return { type: 'detached-instance', confidence: 'high' };
  }
  return null; // compliant
}
```

## The algorithm (runs identically every time)

1. **Read prior state** — existing `[DSCR]` pins per node and the `[DSCR-SUMMARY]`
   badge on the frame, so a re-run replaces stale findings instead of stacking.
2. **Resolve the library** — `get_libraries`, `get_variable_defs` scoped to the
   selection, `get_screenshot` + `get_metadata`/`get_design_context` for the
   structural overview.
3. **Walk every node in scope** via the Plugin API, including inside instances
   (measured as rendered, overrides applied). For each node, run every
   applicable row of the checkpoint table.
4. **Resolve unmatched raw values** against the nearest token via
   `search_design_system` before writing the fix message.
5. **Run the missing-component-reuse heuristic** on non-instance containers.
6. **Collect violations per element**, classify by type, assign severity.
7. **Upsert one `[DSCR]` annotation per violating element, on that element's
   own node — not on the frame.** Every one, no sampling, no rollup-only
   shortcut (see the Hard rule above). Compliant elements get no pin — don't
   flood the canvas with passes. Do this for the whole frame before moving on.
8. **Compute the compliance score and the frame badge text by counting the
   pins you just wrote** — never from a running tally computed separately,
   so the two numbers can't drift apart.
9. **Upsert the `[DSCR-SUMMARY]` badge** on the frame.
10. **Self-check — MANDATORY HARD GATE, per frame before moving to the next
    one.** Two things must both be true: (a) every fill/stroke, every spacing
    value, every text node, every instance, and every custom-built container
    in this frame appears in the tally as either a violation or an explicit
    compliant count — if the screenshot shows an element the walk didn't
    reach, go back and check it; (b) the number of violation lines across
    this frame's `[DSCR]` pins equals the violation count in this frame's
    `[DSCR-SUMMARY]` badge. If (b) fails, the badge is lying — fix the pins,
    don't edit the badge number down to match.
11. Move to the next frame and repeat from step 3. Once every frame in scope
    is done, **save + print the full report.**

## Annotation model — two tiers: one summary badge, plain-worded per-element pins

Mirrors the accessibility-review / design-qa-diff / redline-spec pattern in
mechanics (native Figma **annotations**, not the separate Comments/REST
feature — see "Why annotations, not Comments" below), but the *wording* of
the per-element pins here is deliberately plainer than the sibling skills':
they should read like a colleague left a one-line note on the layer, not like
a system report card.

- **One `[DSCR-SUMMARY]` badge per frame**, filed under the **`DS Summary`**
  category — the only place counts/rollups appear. Compliance score +
  breakdown, exactly as before:
  `📊 72% DS-compliant · 14 hardcoded colors · 6 off-token spacing · 3 orphaned styles · 4 detached instances · 2 missing-reuse`,
  or when clean `✅ 100% DS-compliant · 0 violations`. The category's color
  reflects the score band (see "Summary badge color bands" below) — the
  heading always reads `DS Summary`, only the color changes.
- **One `[DSCR]` annotation per non-compliant element**, filed under the
  **`DS Error`** category, colored **red** (it's an error to fix, not a
  passive note). No violation-count header, no bullets, no "Fix:" label —
  just the one-line `problem → fix` message(s) from the "Comment /
  fix-message format" table below. One violation on a layer → one line.
  Multiple violations on the same layer → each on its own line, blank line
  between them, still ONE annotation on that one node:
  ```
  Raw hex #3B82F6 → bind to color/primary-500

  Detached from the DS → reattach to Button/Primary
  ```
  Exact found value + exact token/component name, every time — never vague
  ("use a token here") — but never a "N violations" wrapper around it either.
- Re-run upserts: preserve unrelated annotations, replace only `[DSCR]` /
  `[DSCR-SUMMARY]`, and clear a pin the moment that element becomes compliant.

## Summary badge color bands

Figma ties a color to a **category**, not to an individual annotation — there
is no per-annotation color override in the Plugin API. So a badge that needs
to change color as the score changes across runs has to switch which category
record it's filed under, not recolor one category in place. The fix: create
one category per band, all sharing the exact label `DS Summary` (Figma does
not require category labels to be unique, only stores them as display
strings), distinguished internally by `(label, color)` together rather than
label alone. The visible pill always reads `DS Summary`; only its color moves
as the score does.

| Score | Color | Category color value |
|---|---|---|
| 0–30 | Red | `red` |
| 31–50 | Grey | `gray` |
| 51–85 | Orange | `orange` |
| 86–95 | Blue | `blue` |
| 96–100 | Green | `green` |

```js
function summaryBandColor(score) {
  if (score <= 30) return 'red';
  if (score <= 50) return 'gray';
  if (score <= 85) return 'orange';
  if (score <= 95) return 'blue';
  return 'green';
}
```

### Category setup + upsert (Plugin API via use_figma)

```js
const existing = await figma.annotations.getAnnotationCategoriesAsync();

// Per-element pins: one stable category, looked up by label alone.
//
// GOTCHA (bit us once already): the Plugin API has no way to change an
// existing category's color after creation — getOrCreateByLabel matches on
// `label` only, so if a file already has an old category under this exact
// label, its original color wins forever, silently, no matter what `color`
// you pass here. This is exactly how an earlier version of this category
// (then named "DS Compliance", created purple) kept showing up purple after
// the spec was changed to red — the code was right, the stale category
// wasn't. If this category's color ever needs to change again, rename the
// label too (as happened here: "DS Compliance" → "DS Error") rather than
// trying to recolor it in place, or match on (label, color) like the
// DS Summary bands below do.
async function getOrCreateByLabel(label, color) {
  const found = existing.find(c => c.label === label);
  return found || await figma.annotations.addAnnotationCategoryAsync({ label, color });
}
const dsCat = await getOrCreateByLabel('DS Error', 'red'); // red = this is an error to fix, not a note

// Summary badge: multiple categories can share the label 'DS Summary', one
// per color band — so lookup/reuse must match on (label, color) together,
// never label alone, or the wrong band's category gets reused.
async function getOrCreateSummaryCategory(color) {
  const found = existing.find(c => c.label === 'DS Summary' && c.color === color);
  return found || await figma.annotations.addAnnotationCategoryAsync({ label: 'DS Summary', color });
}

// `messages` = array of plain-English fix sentences for this one node, each
// already the exact wording from the fix-message table — no header, no
// bullets, no count. This is what makes the pin read like a comment.
function upsertNodeCompliance(node, categoryId, messages) {
  const others = (node.annotations || []).filter(a => !/^\[DSCR\]/.test(a.label || ''));
  if (!messages.length) { node.annotations = others; return }   // now compliant → clear
  node.annotations = [...others,
    { categoryId, label: '[DSCR]', labelMarkdown: messages.join('\n\n') }];
}

// `score` = this frame's compliance score (0-100); picks the band category.
async function upsertSummary(frameNode, score, text) {
  const categoryId = (await getOrCreateSummaryCategory(summaryBandColor(score))).id;
  const others = (frameNode.annotations || []).filter(a => !/^\[DSCR-SUMMARY\]/.test(a.label || ''));
  frameNode.annotations = [...others, { categoryId, label: `[DSCR-SUMMARY] ${text}` }];
}
```

Re-running after fixes that move a frame from, say, 62% (orange) to 91%
(blue) correctly moves the badge to the blue `DS Summary` category and drops
it from the orange one — the upsert filters by the `[DSCR-SUMMARY]` label
prefix on the node's annotations regardless of which category they're
currently in, so the old-band pin never lingers alongside the new one.

If native annotations are unavailable, fall back to a locked overlay frame
`🚫 DS Error` sized to the reviewed frame: outline each violating element
(red `#E5484D`, 2px), a leader line, and one auto-sizing callout per
element, callout text worded the same plain-sentence way as the annotation
body — same fallback pattern as the sibling skills. Never skip on-canvas
output.

### Why annotations, not Comments

Figma's native Comments (the pin-and-thread feature, attributed to whichever
account posts it) are a REST-API-only surface — there is no way to create one
from the Plugin API that `use_figma` runs, and no comment-posting tool is
exposed by the Figma MCP server this skill uses. So "post this as a comment
from whoever's logged in" isn't reachable from here; a Figma Annotation is
the closest available primitive that pins directly on a layer with no extra
auth. This skill leans into that by wording the annotation body as a plain
sentence rather than a structured violation card, so it reads like a note
someone left rather than a report — see the annotation model above.

## Comment / fix-message format (this text IS the annotation body, verbatim)

One line per violation: **what's wrong, in plain words, then `→` then the
exact one-line fix.** No grammar-heavy sentences, no repeated jargon like
"system gap" in the visible text, no template to paraphrase from — this is
the literal text that goes into the `[DSCR]` pin, copy it as-is:

| Type | Template |
|---|---|
| Hardcoded color (a token matches) | `Raw hex #<hex> → bind to <token-name>` |
| Hardcoded color (no close token) | `Raw hex #<hex>, no matching token → closest is <token-name> (Δ<value>), or this may be worth adding as a new token` |
| Off-token spacing/radius (a token matches) | `<Padding/Gap/Radius> is <n>px, not bound → bind to <token-name> (<token-value>px)` |
| Off-token spacing/radius (no token collection exists yet) | `<Padding/Gap/Radius> is <n>px, no spacing token exists yet → create <property>/<n> and bind it` |
| Orphaned local style | `Text uses local style "<style-name>", not published → switch to <library-style-name>` |
| Detached instance | `Detached from the DS → reattach to <Component/Name>` |
| Missing component reuse | `Hand-built, but <Component/Name> already exists and matches → replace with an instance` |

The second row above is the one the last test run got wrong — when no
spacing/radius tokens exist in the file at all, don't just state the gap and
stop ("no radius variable exists yet (system gap)"); still give one concrete
next step ("create radius/2 and bind it"). A pin should always end on an
action, even when that action is "create the token," never just a diagnosis.

When a layer has more than one violation, each row's message becomes its own
line in that layer's single `[DSCR]` annotation (blank line between them) —
never merged into one run-on sentence, and never wrapped in a count header.

## Severity model (for triage, not just a flat violation count)

- **Blocker** — **Detached instance** (always — it silently stops receiving
  every future fix to that component, the exact failure mode this skill
  exists to catch) and **hardcoded color that exactly matches a published
  token's value** (zero excuse, one-line fix, currently zero propagation).
- **Warning** — **Off-token spacing**, **orphaned local style**, and
  hardcoded colors that are close-but-not-exact to a token (may need the
  token nudged, or may be a real one-off — flag either way).
- **Advisory** — **Missing component reuse** (a judgment call; the "custom
  equivalent" may be intentional) and hardcoded colors with no close token at
  all (possible legitimate DS gap, not carelessness).

## Compliance score

One check per applicable property per element; score = compliant checks ÷
total checks. Count generously but consistently — don't double-count the same
property from two different report sections:

```
checks =
    (1 per SOLID fill/stroke)
  + (1 per auto-layout container: itemSpacing, if it has ≥2 children)
  + (1 per padding group: all 4 sides equal → 1 check; else 1 per distinct side)
  + (1 per node with a corner radius set)
  + (1 per text node)
  + (1 per component instance)
  + (1 per flagged missing-component-reuse candidate — only counted once a
     plausible library match exists; don't manufacture checks against nothing)

score = compliant_checks / total_checks * 100
```

Report the overall score AND the breakdown by violation type (counts, not
just percentages) so the reader can tell "minor tidy-up" from "needs rework"
at a glance — e.g. 14 hardcoded colors is a find-and-replace pass; 4 detached
instances is a structural conversation.

## Report template (SAVE to a Markdown file AND print in chat)

This is the saved/printed report, not the on-canvas pin, but it quotes the
exact same one-line `problem → fix` messages as the pins — one source of
truth, never two different wordings for the same violation.

```
## DS Compliance Review — <selection name>
Scope: <N> elements checked  ·  Libraries: <subscribed library names>
Verdict: 📊 <score>% DS-compliant  ·  <N> violations  ·  <N> resolved since last run

### Compliance by check type
| Check | Compliant | Violations | Rate |
|---|---|---|---|
| Color | 41 | 14 | 75% |
| Spacing / radius | 22 | 6 | 79% |
| Text style | 18 | 3 | 86% |
| Component instance | 26 | 4 | 87% |
| Component reuse | — | 2 | (advisory, not scored against total) |

### Violations (grouped by element, ranked Blocker → Advisory)
1. **Primary CTA button** [Blocker]
   Detached from the DS → reattach to Button/Primary
2. **Hero heading** [Blocker]
   Raw hex #3B82F6 → bind to color/primary-500
… every violating element …

### Missing component reuse (advisory)
- "Custom tag pill" (frame, no instance) closely matches Tag/Default in the
  library — consider replacing.

### System gaps (no close token/component found)
- Divider color #E2E8F0 used 6× with nothing within tolerance — may be a
  legitimate gap worth adding to the DS, not a violation.

### Resolved since last run
- "Footer link" — was hardcoded color, now bound to color/text-secondary. Pin cleared.
```

Always write this to a file AND print it AND pin the annotations — three
outputs every run, not a subset. Do not end by asking "want me to annotate?"
— annotating is part of the run.

## Honest limits

- **Full detachment is not directly detectable.** Once an instance is fully
  detached it's just a frame — the "missing component reuse" heuristic is a
  best-effort name/structure match, not certainty. Say so; don't overstate
  confidence on that category.
- **Local ≠ automatically wrong.** A team sometimes has a legitimate reason
  for a local style/component (in-progress, deliberately one-off). This skill
  reports facts (bound vs. not, library vs. local) — it doesn't assume intent.
  Frame findings as "here's what's not connected to the DS," and let the
  designer confirm which are deliberate.
- **Only subscribed libraries count — with one practical fallback.** A file
  with local styles/components that merely resemble a DS pattern is not
  compliance. But if `get_libraries` returns no subscribed libraries at all,
  don't conclude "0% compliant, nothing to check against" — many teams keep
  their token source in a local variable collection inside the working file
  itself (e.g. a "Tokens" or "01 Tokens" page) rather than a separate library
  file. In that case, treat that local collection as the DS source of truth
  for this run, and say so plainly in the report ("no subscribed library —
  scored against this file's own local token collection"), so the user knows
  which mode ran. If neither a subscribed library nor an identifiable local
  token collection exists, say that too — there's nothing to score against.
- Runtime-only concerns (a token that's correct today but the component's
  behavior having drifted, animation, interaction) are out of scope — this is
  a static-file governance check, not a behavior check. Pair with
  design-qa-diff for build-fidelity and accessibility-review for usability.

## Execution notes

- Batch all reads (`get_libraries`, `get_variable_defs`, `get_screenshot`,
  `get_metadata`/`get_design_context`) before any `use_figma` write call.
- One consolidated `[DSCR]` pin per non-compliant element (all its violations
  in that one pin) — never one pin per property — plus one `[DSCR-SUMMARY]`
  badge whose counts must equal the sum across all element pins.
- Compliant elements get no pin. Don't flood the canvas with passes.
- Always save the report, print it, and annotate — every run, not on request.
- **A badge with no matching element pins is a failed run, not a smaller
  one.** If you find yourself about to write a frame's violation count
  without having pinned every one of those violations on its actual layer
  first, stop and go pin them — see the Hard rule near the top of this file.
