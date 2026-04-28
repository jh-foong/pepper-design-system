# Pepper Design System — Roadmap

Where Pepper Design System is heading, in phases. Owned by the DS team.

> 📌 **Note for maintainers:** this is the org-facing version. The personal/strategic version lives at `ROADMAP.md` on the canonical (jh-foong/pepper-design-system) repo and may include private decision context. When `pdorg` syncs to the org repo, this file is renamed to `ROADMAP.md` so org consumers see one clean roadmap.

**Strategic context:** Supernova access is ending. This roadmap covers the transition to a self-owned, AI-native pipeline that replaces Supernova's core value with tools we already use (Figma, GitHub, Claude, eventually Storybook).

---

## 🎯 North star

> **Everything in Pepper Design System is centralised, versioned, and controlled by the DS team — tokens today, components tomorrow. Designers, developers, and AI tools all pull from one source of truth.**

---

## The three pillars (post-Supernova)

Instead of one "single pane of glass" tool, each audience uses the surface that serves them best — all pulling from the same underlying GitHub repo.

| Surface | Audience | Shows | Source of truth for |
|---|---|---|---|
| **Figma** | Designers | Tokens (variables), components, real usage | Visual design decisions |
| **Storybook** *(future)* | Developers | Components with live states, props, code | Implementation quality |
| **Docs site** | PMs / stakeholders / newcomers | Guides, token reference, changelogs | Narrative + onboarding |
| **This GitHub repo** | Everyone + AI tools | Token files, DESIGN.md, docs | Underlying truth |

Figma + Storybook together cover ~95% of Supernova's "Browse design system" feature. The docs site is the front door that links them.

---

## Phases

### ✅ Phase 0 — Foundation (done)

- [x] Figma tokens → DesignBridge → Claude → CSS / Flutter / JSON / experimental exports
- [x] Token prefix standardised: `pepper-core-*`
- [x] `DESIGN.md` as AI-ingestable spec with edit guardrails + Edit log
- [x] Designer Quickstart, FAQ, Token Reference, Resources docs
- [x] Supporting-designers playbook for the DS team
- [x] GitHub repo public (interim sandbox)

---

### ✅ Phase 1 — Docs site (done 2026-04-24)

**Goal:** Replace Supernova's Documentation destination with a hosted docs site.

- [x] Set up **MkDocs Material** in the repo
- [x] Point it at existing markdown — no new content needed
- [x] Configure Pepper Design System brand colours + Manrope font
- [x] Deploy to **GitHub Pages** (interim hosting, see canonical repo)
- [x] Add site URL to README as the "front door"

**Open decision:** Custom domain (e.g. `pepper.pepperstone.com`) — not blocking anything, revisit when org access is fully sorted.

---

### 🔄 Phase 2 — Automated Figma sync (before Supernova shutdown)

**Goal:** Tokens auto-update from Figma. Replaces the main thing Supernova does mechanically.

- [ ] Build a **GitHub Action** that calls the Figma API
- [ ] Action regenerates CSS, Flutter, JSON, experimental files
- [ ] Applies the `pepper-` → `pepper-core-` rename per [CLAUDE.md](CLAUDE.md) standing rule
- [ ] Opens a PR for DS team review
- [ ] DS team reviews + merges + tags release
- [ ] Triggered on: schedule (weekly) + manual ("Sync now" button) + webhook (if Figma supports)

**What this unlocks:** Zero-touch token updates. No more manual DesignBridge paste-into-Claude.

**Decisions needed:**
- Figma API token: personal vs service account?
- Change notifications: GitHub Releases only, or add Slack webhook to `#design-systems-dojo`?
- Schedule cadence: weekly? On every Figma branch merge? Both?

---

### 🔄 Phase 3 — Token preview page (interim visual inspector)

**Goal:** Fill the "visual inspector" gap until components exist.

- [ ] Single HTML page at `docs/token-preview/` (or on the docs site)
- [ ] Renders every `--pepper-core-*` token as a live visual:
  - Colours → swatches with hex values
  - Typography → rendered specimens in Manrope
  - Spacing → measured bars
  - Radius → sample corners
  - Shadows → cards with shadow applied
- [ ] Pulls from `tokens/css/` — auto-updates when tokens change
- [ ] Respects light/dark mode toggle
- [ ] Deployed alongside the docs site

**What this unlocks:** Visual browsing without Supernova's Portal. Designers can "see" the system at a glance.

**Decision needed:** Build from scratch (pure HTML/CSS, matches Pepper brand) vs use a tool like Style Dictionary's preview?

---

### 🔄 Phase 4 — Core components + Storybook (later)

**Goal:** Ship the first core components. Storybook becomes the dev surface.

- [ ] Decide component language(s) — Flutter first? React? Both?
- [ ] Decide package naming — `pepper-core-components` or split?
- [ ] Build first components (button, input, card, stepper?) using `pepper-core-*` tokens
- [ ] Set up **Storybook** with live stories for each component + state
- [ ] Deploy Storybook to GitHub Pages subpath (`/storybook/`)
- [ ] Set up **Figma Code Connect** — maps Figma components → code snippets in Storybook
- [ ] Add "Components" section to the docs site pointing at Storybook

**What this unlocks:** Designers get component behaviour spec for free (Figma → Storybook round-trip). Devs get a QA surface. Pepper Design System goes from "tokens-only" to "full DS."

**Decisions needed:**
- Language priority (Flutter confirmed; React? Web Components for framework-agnostic?)
- Private vs public Storybook (auth cost if private)
- First component to build — biggest impact, lowest risk?

---

### 🔄 Phase 5 — AI portal (optional, maybe never)

**Goal:** A conversational "Ask" interface on the docs site, like Supernova's Portal.

- [ ] Claude API-powered search over markdown + tokens + components
- [ ] Embedded chat on the docs site ("Ask about Pepper Design System")
- [ ] Links answers back to source docs

**Only build if:**
- Designers actually want it (DESIGN.md + Claude Design might already cover)
- Someone's willing to maintain the API integration

**Cost:** ongoing Anthropic API spend, plus setup time.

---

## Replaces-what-from-Supernova matrix

| Supernova feature | Pepper Design System replacement | Phase |
|---|---|---|
| Figma sync (tokens + variables) | GitHub Action + Figma API | Phase 2 |
| Storybook sync | Native Storybook | Phase 4 |
| Design tokens (1197 count) | `tokens/css/` + `tokens/json/` + experimental | ✅ Done |
| Components (0 count) | Storybook + Figma Code Connect | Phase 4 |
| Docs pages (7 count) | MkDocs site | Phase 1 |
| Portal (Create AI) | DESIGN.md + Claude Design | ✅ Done (distributed) |
| Portal (Ask AI) | Phase 5 — or skip, use DESIGN.md in Claude | Phase 5 / skip |
| Portal (Browse) | Figma + Storybook + token preview page | Phase 3 + 4 |
| Code automation (Flutter, CSS) | Tier 1 token exports | ✅ Done |
| Documentation editor | Markdown in GitHub | ✅ Done |

**Coverage estimate: ~95% of Supernova's value, self-owned, free (bar time).** Remaining 5% = visual polish of the hosted portal.

---

## Open decisions

- [ ] **Supernova shutdown date** — firm this up with stakeholders; Phase 2 must land before this
- [ ] **Figma API token scope** — personal vs service account
- [ ] **Naming: components** — "Pepper Core Components"? Separate package? Match token prefix?
- [ ] **Public vs private Storybook** when it exists
- [ ] **Migration path for existing Supernova consumers** — anyone currently linking to Supernova docs / components needs a redirect story

---

## What we're explicitly NOT doing

- **Building a hosted portal** — overkill, DESIGN.md + Claude handles it
- **Matching Supernova's visual polish 1:1** — diminishing returns for a self-maintained tool
- **Real-time sync** — batched via GitHub Actions is fine
- **Vendor replacement procurement** — if Supernova access ends, self-host before evaluating alternatives
- **Building our own Figma plugin** — Figma's native variable panel + DesignBridge is enough

---

## Cadence

- **Roadmap review:** monthly
- **Phase kick-off:** when previous phase is green (not strict deadlines)
- **Stakeholder update:** after each phase lands — quick Slack post in `#design-systems-dojo`

---

## Starting a new chat with Claude (carrying this roadmap forward)

Context doesn't survive across Claude chats by default. Use one of these patterns so you don't have to re-explain Pepper Design System every time.

### 1. Claude Code in this repo (best for real work)

Open Claude Code in the repo folder. `CLAUDE.md` loads automatically. Then say:

> *"Read ROADMAP.md. We're working on Phase [N]. Let's start."*

Use this for: token work, PRs, doc edits, anything that touches files.

### 2. Claude Project (best for planning / strategy chats)

Create a Claude Project called **"Pepper Design System — Roadmap"** and attach:

- `ROADMAP.md`
- `CLAUDE.md`
- `DESIGN.md`
- `README.md`

Every chat inside that project already "knows" everything. No re-uploading.

Use this for: brainstorming phases, stakeholder talking points, decision-making away from the repo.

### 3. One-shot handoff prompt (for any fresh chat)

Paste this into any new Claude chat:

> *"I work on Pepper Design System (Pepperstone's design system). Read these three files from the repo: CLAUDE.md (standing rules), ROADMAP.md (Supernova replacement plan), DESIGN.md (token spec). Then help me with [X]."*

Claude will fetch them and be caught up in ~30 seconds.

**Golden rule:** as long as `CLAUDE.md` + `ROADMAP.md` stay in the repo and stay current, the plan survives any chat reset.

---

## How to contribute

- **Raise an issue** on GitHub
- **Suggest a phase change** → comment on this file via a PR
- **Add a component request** → GitHub issue tagged `component-request`

---

_Last updated: 2026-04-24. Next review: Phase 2 completion._
