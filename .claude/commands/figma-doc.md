# Figma Component Documentation

Generate token-scanned, copy-paste Figma component descriptions for Pepper DS ii components.

## Usage

```
/figma-doc [Figma URL]
```

## What this command does

Read and follow `skills/figma-doc/SKILL.md` in this repo **in full, exactly as written**, applied to the Figma URL given as `$ARGUMENTS`. Do not summarize or paraphrase that file — load it and execute its instructions directly: extract the node ID and file key from the URL, run the token scan and flag old-DS tokens before writing anything, get a screenshot if the component is unfamiliar, then write the full Pepper DS-format description.

If no Figma URL is provided, ask for one before starting.
