# Accessibility Review

Audit a Figma selection against WCAG 2.2, pin one consolidated violation annotation per failing element on the canvas plus a frame-level summary badge, and write final specs to the "Accessibility" annotation category.

## Usage

```
/accessibility-review
```

Select the Page contents, Section, Frame, Group, or Component in Figma first, then run this command.

## What this command does

Read and follow `skills/accessibility-review/SKILL.md` in this repo **in full, exactly as written**, applied to the user's current Figma selection (or the arguments given as `$ARGUMENTS`, if any). Do not summarize or paraphrase that file — load it and execute its instructions directly, including the annotation model, contrast math, full WCAG 2.2 checkpoint table, and report template.

If nothing is selected, ask the user to select the frame(s) first, per the skill's own scope-resolution rule.
