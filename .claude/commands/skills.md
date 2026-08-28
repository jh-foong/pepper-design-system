# Skills

List every custom skill installed in this project, with a one-line description and its slash command — a quick reference for when you forget a command name.

## Usage

```
/skills
```

## What this command does

Read `skills/manifest.json` in this repo and print its `skills` array as a simple list, one line per skill, in this format:

```
/<skillId> — <description, trimmed to roughly one sentence>
```

Keep each description short (cut it to the first sentence or ~120 characters if the manifest entry is longer) — this is a quick-reference list, not the full skill documentation. Group loosely by rough purpose if it helps scanning (e.g. "Figma documentation", "Design system audits", "Component tooling", "Utilities") only if there are enough skills to make grouping useful; otherwise a flat list is fine. Do not read each skill's full `SKILL.md` file for this — the manifest's own `description` field is enough.

End with a one-line reminder that any of these can also be triggered by describing the task in plain language, not just by typing the slash command.
