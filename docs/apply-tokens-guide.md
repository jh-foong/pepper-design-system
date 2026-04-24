# Apply Pepper Tokens to a New Design

A step-by-step guide for designers: take a new design (yours or a teammate's) and have Claude Code apply Pepper tokens to it — colours, typography, spacing, shadows, radii.

No coding required. ~5–15 min per screen depending on which method you use.

---

> 💡 **Before you start:** make sure you've done the [designer quickstart](designer-quickstart.md) — fonts installed, repo cloned, Claude Code working.

---

## What you'll get

By the end of this guide:

- A tokenized version of your design (as code or visual reference)
- A **mapping table** showing which old values became which Pepper tokens
- A list of anything Claude couldn't map 1:1 (flagged for your review)

You can then use the output as a reference while updating your Figma file.

---

## The flow at a glance

1. Open Claude Code inside your cloned Pepper repo
2. Give Claude your design (3 ways — pick one)
3. Ask Claude to apply `DESIGN.md` tokens
4. Review the mapping table
5. Apply changes back in Figma manually

---

## Step 1 — Open Claude Code in the Pepper repo

1. Open Terminal
2. `cd` into your cloned Pepper repo folder
   - E.g. `cd ~/Documents/pepper-design-system`
3. Run `claude`

You should see Claude Code start up. It now has access to `DESIGN.md` and all the token files.

---

## Step 2 — Give Claude your design (pick one method)

### 🌶️ Easiest — Screenshot

**Best for:** full screens, quick visual translation

1. In Figma: frame your design → **Export → PNG** (or take a screenshot)
2. Drag the image into the Claude Code terminal window

### 🌶️🌶️ More accurate — Dev Mode CSS

**Best for:** a single component (one button, one card)

1. In Figma, press **Shift+D** to toggle Dev Mode
2. Click the element you want to translate
3. In the right panel, find the **Code** section → click the **copy** icon
4. Paste into Claude Code

### 🌶️🌶️🌶️ Most accurate — Figma MCP

**Best for:** full-screen translations with layout structure preserved

Requires one-time setup — see [designer-quickstart.md § Figma MCP](designer-quickstart.md#-most-accurate--figma-mcp-semi-technical).

Once set up: in Figma desktop, select the frame. Then in Claude Code prompt step 3.

---

## Step 3 — The prompt

Copy-paste this into Claude Code:

> *"Apply Pepper tokens from @DESIGN.md to this design.*
>
> *Swap every colour, typography style, spacing value, radius, and shadow to the closest Pepper token.*
>
> *Output:*
> *1. The updated design (as code or visual description)*
> *2. A mapping table: old value → new Pepper token → notes*
> *3. Flag any values you couldn't map 1:1 and explain why."*

---

## Step 4 — Review the mapping table

Claude will return something like this:

| Old value | New Pepper token | Notes |
|-----------|------------------|-------|
| `#0165FA` | `fg-text-brand` | Exact match |
| `24px padding` | `space-inset-lg` | Exact match |
| `#FF5733` | `fg-text-error` | Closest match — old was slightly more orange |
| `shadow: 0 2px 8px rgba(0,0,0,0.1)` | `shadow-sm` | Exact match |
| `12px radius` | ⚠️ No match | Closest: `radius-sm` (8px) or `radius-md` (16px). Pick one. |

**What to look for:**
- ✅ **Exact match** — apply directly in Figma
- ⚠️ **Closest match** — review visually. Usually fine, but check side-by-side
- ❌ **No match** — you decide: pick the closest Pepper token, or flag it for the design system team

---

## Step 5 — Apply back in Figma

Claude's output is a **reference**, not an automatic update. To apply it:

1. Open your Figma file
2. For each row in the mapping table: select the element → swap the variable/style to the new Pepper token
3. For ⚠️ and ❌ rows: use your judgment or ask in Slack `#design-systems-dojo`

---

## Tips

- **Start small.** Tokenize one component first (a button, a card) before doing a whole screen.
- **Keep the original nearby.** Open the old and new side-by-side to spot drift.
- **Don't force 1:1.** If Pepper doesn't have an exact match, the closest token is usually the right answer — the system is the source of truth now.
- **Ask Claude to explain.** If a mapping looks wrong, reply: *"Why did you pick `fg-text-brand` for `#0165FA`?"* — it'll walk you through.

---

## When to ask for help

- **Multiple ❌ no-matches on the same token type** (e.g. 5 different greys with no match) → flag to design systems team, we may need to add tokens
- **Mapping feels off visually** → post in `#design-systems-dojo` with a before/after screenshot
- **Claude refuses or gets confused** → check `DESIGN.md` is in the repo (it should be at the root)

---

## Where to go next

- [Token Reference & Cheatsheet](token-reference.md) — look up any token value
- [Designer Quickstart](designer-quickstart.md) — the full 10-min setup guide
- [DESIGN.md](../DESIGN.md) — the full AI-ingestable spec

---

## Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.0.0 | TBD | Initial guide — 3 input methods (screenshot, Dev Mode CSS, Figma MCP) + standard prompt + mapping review flow |
