---
name: design-system-audit-for-mcp
description: Read-only audit of an entire Figma design system for ambiguity, inconsistency, schema mismatches, structural confusion, and other patterns that make components, properties, variants, layers, tokens, or documentation difficult for AI agents to interpret and use reliably. Trigger when asked to audit, lint, review, assess, or improve the AI-readability / agent-readiness of a Figma design system. Never modify the file.
---

# Figma Design System AI Audit

Audit a Figma design system as a **strictly read-only** system.

The purpose of this skill is not to redesign, clean up, normalize, or repair the file. Its purpose is to identify the parts of the system that are hardest for an AI agent to parse, understand, select, configure, and use reliably.

The central question is:

> If another AI agent encountered this design system without tribal knowledge, what could it reasonably misunderstand?

Prioritize ambiguity that can cause an AI agent, designer, or developer to choose the wrong component, property, variant, token, layer interpretation, or behavioral model.

---

## 1. Non-negotiable read-only contract

**DO NOT make any changes to the Figma file.**

Do not:

- rename nodes, components, component sets, properties, variables, styles, pages, or sections
- move or reorder nodes
- restructure layers or component hierarchies
- create or delete anything
- detach instances
- publish or unpublish libraries
- modify component properties
- modify variant properties or values
- change variables, modes, collections, aliases, or bindings
- change descriptions
- change Auto Layout settings
- change constraints, sizing, visibility, fills, strokes, effects, typography, or other properties
- swap instances
- set plugin data
- mutate any Figma node or file property for the purpose of the audit

When using Figma tooling, prefer dedicated read/inspection operations.

If `use_figma` is required for inspection (this project's Figma MCP tool for arbitrary JS against the Plugin API — no separate companion skill needs loading first):

1. Use JavaScript only to **read and return data**.
3. Do not call setters, creation APIs, mutation helpers, or methods that modify document state.
4. Do not use `node.set(...)`.
5. Do not assign to node properties.
6. Do not call `setPluginData`, `setSharedPluginData`, variable setters, component-property setters, or any creation/deletion method.
7. Return structured audit data only.

If a requested inspection cannot be completed without modifying the file, omit that inspection and state the limitation.

---

## 2. Scope

Audit the **entire design system file**, not only the current selection or visible page, unless the user explicitly narrows the scope.

Inspect, where available:

- pages and sections
- components
- component sets
- variants
- component properties
- exposed nested-instance properties
- instance-swap properties
- text properties
- boolean properties
- slots
- internal layer structure
- nested instances
- Auto Layout and resizing behavior
- variables
- variable collections and modes
- aliases and bindings
- local styles
- component descriptions and documentation
- deprecated or legacy patterns
- relationships among related component families

Do not treat every visual node as equally important. Focus on nodes that communicate **API, semantic, structural, or behavioral intent**.

---

## 3. Required audit method

### Step 1 — Inventory the file

Build a read-only inventory before judging anything.

At minimum, capture:

- page and section names
- component and component-set names
- component locations
- variant dimensions and values
- component-property names, types, defaults, and available values
- important exposed nested-instance properties
- descriptions
- relevant internal layer names
- nested component/instance relationships
- Auto Layout and sizing information where it affects API intent
- variable collections, variable names, modes, aliases, and bindings where observable
- styles and bindings used by comparable components

For multi-page files, inspect pages independently. Do not assume the first page represents the entire system.

### Step 2 — Infer the system's dominant conventions

Before flagging inconsistencies, infer the conventions the file itself appears to use most consistently.

Infer dominant patterns for:

- component naming
- component hierarchy and slash taxonomy
- layer naming
- property naming
- boolean-property naming
- size vocabulary
- state vocabulary
- type/style/intent vocabulary
- icon terminology
- slot terminology
- variable/token naming
- variable collections and modes
- documentation conventions

Use frequency, consistency across mature component families, and apparent intentionality as evidence.

**Do not impose a new convention merely because it is cleaner or more familiar.**

When no dominant convention is evident, say so.

### Step 3 — Establish comparable families

Group related components before judging individual offenders.

Examples:

- Button / Icon Button / Split Button / Link Button
- Input / Textarea / Select / Search / Combobox
- Checkbox / Radio / Switch
- Modal / Dialog / Drawer / Sheet
- Card families
- Navigation families
- Badge / Tag / Chip
- Tooltip / Popover / Menu

Prefer comparisons between components that appear to solve similar problems or expose similar conceptual dimensions.

### Step 4 — Audit against the inferred conventions

Evaluate components and families using the categories in this skill.

### Step 5 — Rank by AI failure risk

Do not optimize for finding the largest number of issues.

Rank findings according to the probability and consequence of an incorrect inference.

A useful finding explains:

1. what the agent sees,
2. why more than one interpretation is plausible,
3. what the agent could infer incorrectly,
4. what evidence elsewhere in the file suggests the intended convention.

### Step 6 — Separate evidence from uncertainty

Do not guess.

If the file does not contain enough evidence to determine intent, label the finding:

**Needs human confirmation**

Explain exactly what is uncertain.

---

## 4. Audit categories

### 4.1 Component and component-set names

Look for:

- inconsistent naming conventions or casing
- inconsistent slash hierarchy or categorization
- synonyms for the same concept, such as `Modal` vs `Dialog`
- the same term used for different concepts
- vague or overly generic names
- names based on current visual appearance rather than semantic purpose
- default or meaningless names
- duplicate or near-duplicate components with unclear distinctions
- names that do not match related component families
- deprecated or legacy components that are not clearly distinguishable
- names that make component selection ambiguous for an AI

The key test is not whether the name is aesthetically ideal. The key test is whether an AI can reliably distinguish the component's role from neighboring choices.

### 4.2 Component property names

Review:

- variant properties
- booleans
- text properties
- instance-swap properties
- slots
- exposed nested-instance properties

Look for:

- different property names representing the same concept
- inconsistent casing or grammar
- unclear abbreviations
- misleading names
- names that do not explain what they control
- inconsistent boolean conventions such as `Icon`, `Has Icon`, `Show Icon`, `Icon Visible`, `isIconVisible`
- overlapping meanings
- property names contradicted by their values
- properties representing the wrong conceptual dimension
- implementation-detail properties exposed as if they were semantic choices
- equivalent controls exposed differently in related components

### 4.3 Variant property values

Look for:

- `Small / Medium / Large` versus `SM / MD / LG`
- `Default / Hover / Pressed` versus `Rest / Hovered / Active`
- `True / False` mixed with `Yes / No` or `On / Off`
- inconsistent capitalization
- equivalent concepts with different names
- visually or behaviorally identical variants with different values
- values that are impossible to understand without visually inspecting the component
- missing obvious states
- contradictory or impossible combinations
- duplicated or unnecessarily fragmented dimensions
- values that appear to encode multiple concepts at once

### 4.4 Internal layer names

Prioritize layers that communicate structure, role, or customization.

Flag high-impact examples such as:

- `Frame 123`
- `Group 45`
- `Rectangle 6`
- `Vector 19`
- `Copy 2`
- generic names such as `Container`, `Wrapper`, `Content`, or `Item` when context does not clarify the role
- identical names for different structural roles
- different names for the same structural role
- misleading names
- appearance-only names where semantic role matters
- inconsistent names for equivalent structures across related components

Do **not** report every unimportant decorative layer.

Report layer naming only when it could cause an agent to misunderstand hierarchy, semantics, editability, slots, or component behavior.

### 4.5 Component architecture

Look for cases where the component API is difficult to infer because of structure.

Examples:

- important customization hidden in nested layers instead of exposed as properties
- equivalent components exposing controls in different ways
- excessive or redundant variants
- components that appear to represent the same abstraction but are modeled differently
- nested instances whose roles are unclear
- properties that expose implementation details rather than meaningful choices
- unnecessarily deep or confusing hierarchies
- similar components constructed in substantially different ways without an obvious reason
- semantic choices encoded by layer visibility or nested swaps in one family but variants in another
- API surface that depends on knowing internal implementation details

### 4.6 Auto Layout and structural intent

Only report layout issues when they create meaningful ambiguity about intended behavior.

Look for:

- missing Auto Layout where structure appears responsive
- resizing behavior inconsistent with comparable components
- fixed, hug, or fill behavior that appears contradictory to the component's purpose
- manually encoded spacing relationships that obscure intended behavior
- structurally similar components using inconsistent layout approaches
- nested structures whose resizing model makes slot/content behavior difficult to infer

This is **not** a generic Auto Layout cleanup audit.

### 4.7 Variables, tokens, and styles

Look for:

- hardcoded values where equivalent components consistently use variables
- inconsistent variable usage across equivalent components
- semantic variables mixed unpredictably with primitive/raw variables
- ambiguous variable names
- different token names representing the same semantic role
- inconsistent collection/grouping conventions
- inconsistent mode naming
- literal-value names where the surrounding system uses semantic naming
- apparently incorrect variable or style references
- components using tokens from an unexpected library or category
- comparable states or intents bound at different semantic levels
- aliases that obscure rather than clarify intent

Do not flag every hardcoded value. Flag mismatches that create uncertainty about what token or semantic role an agent should use.

### 4.8 Descriptions and documentation

Prioritize missing or incorrect documentation only when it materially increases misuse risk.

Especially inspect:

- visually similar components with different intended purposes
- components with non-obvious constraints
- ambiguous property or variant terminology
- deprecated components
- unusual behaviors or exceptions
- components whose description conflicts with their actual structure or API

Do not list every component without a description.

### 4.9 Cross-component consistency

Compare related families for equivalent concepts represented differently.

Examples:

- `Size` vs `Scale`
- `State` vs `Status`
- `Type` vs `Variant` vs `Style`
- `Leading Icon` vs `Start Icon` vs `Left Icon`
- `Disabled=true` vs `State=Disabled`
- inconsistent state vocabularies
- inconsistent size vocabularies
- inconsistent internal-layer naming
- inconsistent property ordering or modeling when it makes APIs harder to understand
- semantically equivalent slots modeled as booleans in one component and instance swaps in another

Focus on mismatches that increase the amount of special-case knowledge an agent needs.

### 4.10 AI-specific ambiguity

Ask:

> If an AI agent had no tribal knowledge and only the observable Figma system to work from, what could it reasonably misunderstand?

Pay particular attention to:

- two components that appear to solve the same problem
- two properties whose meanings overlap
- terminology that requires internal company knowledge
- abbreviations without an obvious expansion
- visually similar components with unclear semantic differences
- values that do not reveal their meaning
- contradictory naming between parent and nested components
- misleading hierarchy
- naming that conflicts with actual structure or behavior
- defaults that conceal meaningful distinctions
- legacy/new component pairs without a clear migration signal

If multiple interpretations are plausible but none is well-supported, use **Needs human confirmation**.

---

## 5. Evidence rules

Every reported offender should be grounded in observable evidence from the file.

Prefer exact evidence:

- exact component or component-set name
- exact property name
- exact variant value
- exact layer name
- exact variable/token name
- exact comparable component
- exact location/page/section where identifiable

Avoid weak claims such as:

- "naming seems inconsistent"
- "this could be cleaner"
- "consider standardizing"
- "Auto Layout should be improved"

Instead state the actual mismatch and its likely failure mode.

### Comparison rule

Do not call something inconsistent until there is a meaningful comparison point.

Good:

> `Icon Button` uses `Size = SM / MD / LG`, while `Button`, `Split Button`, and `Link Button` use `Size = Small / Medium / Large`.

Weak:

> `SM` is a bad size label.

### Visual evidence

Use screenshots or visual inspection when needed to distinguish:

- visually similar variants
- semantically different components with similar names
- layer roles not clear from metadata
- suspicious state/value mismatches
- layout behavior whose meaning cannot be inferred from raw properties

Visual inspection supports the audit but does not justify modifying anything.

---

## 6. Severity and confidence

### Severity

**Critical**
- likely to cause selection of the wrong component or fundamentally incorrect usage
- contradictory APIs can silently produce incorrect product behavior
- duplicated semantic concepts are indistinguishable without tribal knowledge

**High**
- significant ambiguity across a commonly used component or family
- an agent is likely to choose the wrong property/value/state/token
- mismatch forces substantial special-case reasoning

**Medium**
- meaningful inconsistency that increases interpretation cost or error risk but usually has recoverable context

**Low**
- localized ambiguity with limited practical impact

Do not inflate severity.

### Confidence

**High**
- directly supported by repeated comparable patterns or clear contradiction

**Medium**
- evidence is persuasive but there are plausible exceptions

**Low**
- suspicious pattern, but intent is not determinable from the file

Low-confidence items usually belong in **Needs human confirmation** unless the ambiguity itself is the finding.

---

## 7. What not to report

Do not report:

- harmless stylistic differences with no semantic consequence
- every unnamed decorative vector
- every component missing a description
- purely aesthetic preferences
- generic "best practice" violations that do not contradict this system's own conventions
- hypothetical missing variants without evidence that the family is intended to support them
- token choices merely because another token architecture would be preferable
- differences that are clearly purposeful and documented
- changes you would personally make without evidence from the file

This is not a redesign proposal.

---

## 8. Output format

Produce the report in the following order.

# AI-Readability Audit Summary

Start with **5–10 of the most important systemic problems**.

Each summary item should name the recurring issue and briefly explain its AI failure mode.

Then provide:

# Worst Component Offenders

Rank the highest-risk components or component sets from worst to least severe.

For each offender include:

## <rank>. <Component or component-set name>

- **Location:** page / section / hierarchy, if identifiable
- **Severity:** Critical / High / Medium / Low
- **Confidence:** High / Medium / Low
- **Category:** one or more audit categories
- **Exact evidence:** exact problematic names, properties, values, layers, tokens, or relationships
- **Why this is ambiguous:** why the observable API or structure admits multiple interpretations
- **What an AI could incorrectly infer:** the specific likely failure mode
- **Comparable convention elsewhere:** the dominant or stronger pattern used by related components in this file
- **Recommended direction:** the direction a human maintainer could take to reduce ambiguity; do not perform the fix

Do not pad this section to reach an arbitrary number of offenders.

After the ranked list, include all of the following sections.

# A. Cross-System Inconsistencies

Recurring naming or modeling inconsistencies affecting multiple component families.

# B. Ambiguous Vocabulary

Terms that overlap, conflict, are overloaded, require tribal knowledge, or lack stable meaning.

Where possible, show the competing uses.

# C. Property-Schema Mismatches

Equivalent concepts modeled differently across components.

Examples:

- boolean vs state dimension
- variant vs instance swap
- `Size` vs `Scale`
- `Leading Icon` vs `Start Icon`
- text property vs exposed nested property

# D. Layer-Naming Problems

Only the highest-impact examples.

Explain why each layer name obscures semantic or structural intent.

# E. Variable/Token Inconsistencies

Only meaningful mismatches or ambiguity.

Include comparable bindings where useful.

# F. Possible Structural Errors

Things that look accidental, contradictory, duplicated, incorrectly connected, or incorrectly modeled.

Do not present uncertain structural issues as facts.

# G. Needs Human Confirmation

List suspicious cases where the intended convention cannot be determined confidently.

For each item state:

- what is observable
- what is ambiguous
- the plausible interpretations
- what a human would need to confirm

# H. Recommended Canonical Conventions

Based **only** on dominant patterns already present in this design system, summarize the apparent intended convention for:

- component naming
- layer naming
- property naming
- boolean properties
- sizes
- states
- types / styles / intents
- icons
- slots
- variables / tokens
- modes

For each convention:

- state the observed dominant pattern
- provide representative examples from the file
- mention notable exceptions if relevant
- state `No stable convention detected` when evidence is insufficient

Do not invent a new standard.

---

## 9. Reporting style

Be specific, comparative, and evidence-led.

Prefer:

> `Select` uses `State = Default / Focus / Error / Disabled`, while `Input` and `Textarea` use `Status = Rest / Focused / Invalid / Disabled`. Because both families represent form controls, an agent cannot safely map shared interaction states without special-case logic.

Avoid:

> The state naming could be more consistent.

For every major finding, make the likely AI error explicit.

---

## 10. Completion criteria

The audit is complete when:

- the entire accessible design-system file has been inspected
- dominant conventions have been inferred before deviations are judged
- related component families have been compared
- findings are ranked by misuse risk rather than count
- high-severity claims are supported by exact evidence
- uncertainty is clearly separated into `Needs human confirmation`
- canonical conventions are derived from the file itself
- no modifications have been made

Before returning the final report, verify once more:

**This audit performed no writes to the Figma file.**
