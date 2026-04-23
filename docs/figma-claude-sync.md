# Figma → Claude → GitHub Sync

This guide explains how to sync design tokens from Figma to GitHub using Claude. No coding required.

---

## How it works

Tokens live in Figma as Variables. When they change, you export them using the **DesignBridge** plugin, share the file with Claude, and Claude handles the rest — transforming the tokens, opening a pull request, and tagging the version.

```
Figma Variables → DesignBridge export → Claude → GitHub PR → Merge → Version tagged
```

---

## How to sync

### 1. Export from Figma

1. Open your Figma file
2. Run the **DesignBridge** plugin
3. Export the variable collections as a `.md` file
4. Save it somewhere accessible (e.g. Desktop)

### 2. Ask Claude to sync

Share the exported file with Claude and say:

> "Sync tokens from this file"

Claude will:
- Read the new token values
- Compare against what's currently in the repo
- Push the changes to a new branch
- Open a pull request with a summary of what changed and a version suggestion

### 3. Review and merge the PR

1. Open the pull request link Claude provides
2. Review the diff — check that the changes look right
3. Click **Merge pull request**
4. Claude tags the new version (e.g. `v1.1.0`)

---

## Versioning

Claude suggests the version bump based on what changed:

| Change | Version bump | Example |
|--------|-------------|---------|
| Token renamed or removed | Major | `v1.0.0 → v2.0.0` |
| New token added | Minor | `v1.0.0 → v1.1.0` |
| Token value changed | Patch | `v1.0.0 → v1.0.1` |

---

## Output formats

Each sync updates two sets of token files:

| Format | Location | Used by |
|--------|----------|---------|
| CSS Variables | `tokens/css/` | Web developers |
| Dart | `tokens/flutter/` | Flutter developers |

---

## Questions?

Ask in `#design-system` on Slack or open an issue in [GitHub](https://github.com/jh-foong/pepper-design-system).
