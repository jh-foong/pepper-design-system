---
name: design-system-inventory
description: AI-powered Figma design system inventory skill. Analyze a Figma file, page, library, or selected screens to identify and count components, variants, variables, colors, typography styles, spacing patterns, icons, and reusable UI patterns. Detect potential duplicates, inconsistent usage, and missing design tokens, then produce a structured inventory with evidence and actionable recommendations without modifying the design unless explicitly asked.
---

# Design System Inventory — AI Design System Analyzer

## What this skill does

Analyze a Figma design and automatically create a structured inventory of its design-system assets.

The goal is to understand what already exists, identify reusable foundations, surface inconsistencies and duplication, and reveal opportunities to improve the design system.

Do not modify the Figma file during inventory analysis unless the user explicitly asks for changes.

## Best used for

- SaaS products
- Web applications
- Mobile applications
- Product redesigns
- Existing Figma libraries
- Design-system audits
- Multi-product design systems
- Component libraries
- Design-system documentation
- Design-to-development handoff

## Inventory categories

Analyze the available Figma context across these categories.

### 1. Components

Identify:
- Main components
- Component instances
- Component sets
- Nested components
- Reusable patterns
- Component naming conventions
- Component usage frequency

Report:
- Total components
- Most-used components
- Rarely used components
- Components with inconsistent naming
- Potential duplicate components

### 2. Variants

Identify:
- Variant sets
- Variant properties
- Variant values
- State variants
- Size variants
- Theme variants
- Responsive variants
- Interaction variants

Check for:
- Duplicate variants
- Missing expected states
- Inconsistent property names
- Excessive variant combinations
- Unused variants

### 3. Variables

Identify:
- Color variables
- Number variables
- String variables
- Boolean variables
- Collection names
- Modes
- Semantic variables
- Primitive variables

Check for:
- Missing semantic tokens
- Hard-coded values
- Duplicate variables
- Inconsistent naming
- Variables that could be consolidated

### 4. Colors

Inventory:
- Primary colors
- Secondary colors
- Neutral colors
- Semantic colors
- Background colors
- Surface colors
- Border colors
- Text colors
- Accent colors

Flag:
- Near-duplicate colors
- Unused colors
- Hard-coded colors
- Colors without semantic naming
- Inconsistent semantic usage

### 5. Typography

Identify:
- Font families
- Font weights
- Font sizes
- Line heights
- Letter spacing
- Text styles
- Heading styles
- Body styles
- Label styles
- Caption styles

Check for:
- Duplicate text styles
- Similar styles with different names
- Missing hierarchy levels
- Inconsistent line heights
- Unused styles

### 6. Spacing

Identify recurring spacing values from the actual Figma file.

Flag:
- Repeated one-off values
- Near-duplicate spacing values
- Values outside the dominant spacing scale
- Hard-coded spacing that could potentially become tokens

### 7. Icons

Inventory:
- Icon components
- Icon sets
- Icon sizes
- Naming conventions
- Filled vs outlined styles
- Duplicate icons
- Inconsistent icon dimensions

### 8. Patterns

Identify reusable patterns such as:
- Navigation
- Headers
- Sidebars
- Cards
- Tables
- Forms
- Modals
- Drawers
- Filters
- Search
- Pagination
- Empty states
- Alerts
- Toasts
- Authentication patterns
- Dashboard patterns

Separate reusable patterns from one-off screens.

## Analysis process

### Step 1 — Understand the design context

Inspect available Figma context and determine:
- File or page scope
- Product type
- Design-system maturity
- Library structure
- Naming conventions
- Component organization
- Token structure

If the user selects a specific page or frame, prioritize that scope.

### Step 2 — Extract design-system assets

Collect evidence for:
- Components
- Variants
- Variables
- Colors
- Typography
- Spacing
- Icons
- Patterns

Do not invent values that cannot be observed.

### Step 3 — Normalize the inventory

Group equivalent or closely related assets while clearly distinguishing observed values from inferred opportunities.

### Step 4 — Detect duplicates

Look for potential duplicates based on:
- Name similarity
- Visual similarity
- Property similarity
- Structural similarity
- Identical or near-identical values
- Same semantic purpose

Do not automatically merge duplicates. Mark them as potential duplicates and explain the evidence.

### Step 5 — Find missing tokens

Identify repeated raw values that could potentially become reusable tokens, such as repeated colors, spacing, typography properties, corner radii, or shadows.

Only recommend tokenization when repetition and semantic relevance support it.

## Inventory output

Start with a summary:

```text
Design System Inventory

Components: [actual count]
Variants: [actual count]
Variables: [actual count]
Colors: [actual count]
Typography styles: [actual count]
Spacing values: [actual count]
Icons: [actual count]
Patterns: [actual count]

Potential duplicates: [actual count]
Missing tokens: [actual count]
Naming inconsistencies: [actual count]
Unused assets: [actual count]
```

Never use example numbers as actual findings.

## Detailed inventory

### Components

| Component | Type | Variants | Usage | Status |
|---|---|---:|---:|---|
| Button | Component set | 18 | 142 | Healthy |

### Variables

| Variable | Type | Collection | Modes | Usage | Recommendation |
|---|---|---|---:|---:|---|
| color/text/primary | Color | Semantic | 2 | High | Keep |

### Colors

| Value | Usage | Similar Colors | Tokenized | Recommendation |
|---|---:|---:|---|---|
| #FFFFFF | 182 | 2 | Yes | Keep |

### Typography

| Style | Family | Size | Weight | Usage | Status |
|---|---|---:|---:|---:|---|
| Heading/L | Inter | 32 | 600 | 26 | Healthy |

### Spacing

Show the observed spacing scale and identify outliers.

### Icons

Show icon families, sizes, naming patterns, and duplicates.

### Patterns

Group reusable patterns by product area.

## Duplicate detection

Report potential duplicates like this:

```text
Potential Duplicate #1
Component A: Button / Primary
Component B: CTA / Main

Evidence:
- Same visual structure
- Same interaction behavior
- Same spacing
- Similar naming purpose

Recommendation:
Evaluate whether these should become one shared component.
```

Never recommend deletion without evidence.

## Missing token detection

Report opportunities like this:

```text
Missing Token #1
Category: Color
Observed value: #E5E7EB
Occurrences: 31
Current usage: hard-coded

Recommendation:
Create a semantic border token if this value represents the same design intent.
```

## Design-system health indicators

Evaluate:

### Component reuse
Are common UI elements centralized or recreated?

### Token coverage
Are repeated visual values represented as variables or styles?

### Naming consistency
Do components and variables follow a predictable naming structure?

### Variant efficiency
Are variants organized logically without unnecessary combinations?

### Visual consistency
Are similar components visually aligned?

### Pattern reuse
Are recurring workflows represented by reusable patterns?

## Final recommendations

Prioritize recommendations:

**P0 — Critical**
- Major structural duplication
- Broken or conflicting design-system foundations
- High-risk inconsistencies affecting product-wide UI

**P1 — High**
- Frequently duplicated components
- Missing important semantic tokens
- Major naming or variant inconsistencies

**P2 — Medium**
- Local inconsistencies
- Low-value duplicate styles
- Unused or outdated assets

**P3 — Low**
- Documentation improvements
- Minor naming cleanup
- Long-tail polish

## Figma inspection rules

When Figma tools are available:

1. Inspect the selected design context first.
2. Inspect metadata when component, variable, or layer information is required.
3. Inspect screenshots when visual comparison is required.
4. Analyze library relationships when available.
5. Respect the user's selected scope.
6. Do not modify the Figma file during inventory analysis.
7. Clearly distinguish observed evidence from recommendations.
8. Do not invent component counts or token values.

## Important constraint

This skill is an inventory and analysis tool.

Do not automatically rename, merge, delete, create, or modify Figma components, variables, styles, or layers.

Only make changes when the user explicitly asks for implementation or cleanup.
