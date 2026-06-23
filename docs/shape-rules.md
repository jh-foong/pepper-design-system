# Shape Rules

Shape (rounded vs square) must be **consistent within a context**. If buttons are rounded, segmented controls, inputs, and cards in the same UI follow. Same for square. Never mix.

---

## The shortcut rule

> Match the shape of the button in the same context. If buttons are rounded, everything is rounded. If buttons are square, everything is square.

---

## When to use each

| Context | Shape | Why |
|---------|-------|-----|
| Marketing, onboarding, consumer-facing | **Rounded** (pill / full — 999px) | Feels approachable, lifestyle, friendly |
| Mobile UI | **Rounded** (pill / full — 999px) | More touch-friendly |
| Trading dashboard, data-dense UI | **Square** (sm — 4px / md — 8px) | Precision and compactness |
| Enterprise, toolbar, professional contexts | **Square** (sm — 4px / md — 8px) | Structured, focused |

---

## Per-component rules

### Button

The `Shape` property on the Button component has two values: **Rounded** and **Square**.

| Size | Square | Rounded |
|------|--------|---------|
| XL | `md` — 8px | `full` — 999px |
| LG | `md` — 8px | `full` — 999px |
| MD | `md` — 8px | `full` — 999px |
| SM | `sm` — 4px | `full` — 999px |
| XS | `sm` — 4px | `full` — 999px |

### Segmented control

Follows the button shape in the same context:

- Marketing / onboarding → **rounded**
- Trading dashboard / data UI → **square**

### Tag

Always pill-shaped (`full` — 999px). No square variant needed.

### Card

Follows the shape convention of its context. No pill variant — card is always `sm`, `md`, or square (0px).

---

## For AI tools

If you have `DESIGN.md` loaded, shape rules are already included — Claude will apply them automatically. If the context is ambiguous (e.g. the user hasn't specified trading vs marketing), default to **rounded** and flag the assumption.
