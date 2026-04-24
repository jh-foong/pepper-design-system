# Supporting designers using Pepper Design System

For the DS team (currently Junhan). A quick playbook for when a designer says *"Pepper isn't working for me"* or *"Claude is generating something weird."*

---

## Most common root cause: stale or edited `DESIGN.md`

`DESIGN.md` is the single source of truth. If a designer's local copy has drifted — either because it's old, or because they edited it — AI output will drift too. Always check this first.

### Step 1 — Ask them for their file

> *"Can you send me the `DESIGN.md` you're using? Just drag it into Slack / email it over."*

Don't ask them to describe it. Get the actual bytes.

### Step 2 — Check integrity

Three quick signals, in order of severity:

1. **Does it have an "Edit log" section at the bottom with entries?**
   → Yes = it's been modified via AI. The entries show what changed, when, and who.
   → No entries = either canonical, or someone hand-edited without the AI knowing.

2. **Does the version stamp at the top match the latest release?**
   Compare their `Version: vX.Y.Z` line against https://github.com/jh-foong/pepper-design-system/releases.
   → Older = they need to re-download.

3. **Diff against canonical.** Save their file as `their.md`, then:
   ```
   curl -s https://raw.githubusercontent.com/jh-foong/pepper-design-system/main/DESIGN.md > canonical.md
   diff canonical.md their.md
   ```
   → Any output = their file has drifted. The diff shows exactly what.

### Step 3 — Fix it

- **If stale** → tell them to re-download from the canonical URL.
- **If edited** → tell them (a) their edits are now lost by re-downloading, and (b) if the change is something Pepper Design System should adopt, they need to raise an issue on GitHub so it goes into the next release.
- **If the diff is small and cosmetic** (e.g. they added a personal note, changed a heading) → harmless, but explain that any future re-download will wipe it.

---

## Other support checks (after DESIGN.md is ruled out)

| Symptom | Likely cause | Fix |
|---|---|---|
| AI output uses wrong fonts | Manrope not installed locally, or tool doesn't support the font fork | Send them the Manrope fork URL; confirm which tool they're using |
| AI hardcodes hex values instead of tokens | DESIGN.md not attached / not in context | Ask them to confirm attachment method — see `docs/designer-quickstart.md` |
| AI uses `--pepper-*` instead of `--pepper-core-*` | Their copy predates the v1.3.0 rename | Have them re-download |
| Figma doesn't show the new tokens | Pre-merge — new tokens live on the Figma branch, not main | Expected — point them to the branch URL in `README.md` |
| They say "it just doesn't look like Pepper" | Usually a combination of stale DESIGN.md + missing Manrope + not prompting the AI to follow it | Walk through `docs/designer-quickstart.md` from the top |

---

## Diagnostic prompt for the designer

If you want Claude to self-diagnose before escalating to you, tell the designer to paste this into whatever AI tool they're using:

> *"Check if the DESIGN.md I've given you is canonical. Look at: (1) the version stamp at the top vs https://github.com/jh-foong/pepper-design-system/releases, (2) whether the 'Edit log' section at the bottom has any entries, (3) any obvious inconsistencies. Report what you find."*

Claude will report drift the designer didn't know about.

---

## What we can't see

- **Hand-edits made via TextEdit / Sublime / etc.** — no AI involved, no audit trail. Only a diff against canonical catches these.
- **Who edited it.** Markdown has no authorship. You have to trust what the designer says — or use the Edit log entries (which rely on them being honest with the AI about who they are).
- **When they downloaded the file.** Best signal is the version stamp vs release dates on GitHub.

For anything beyond that, they need to share the file and you diff it. That's the forensic ceiling.
