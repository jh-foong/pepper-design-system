# Design System Audit for MCP (AI-Readability Audit)

Strictly read-only audit of an entire Figma design system for ambiguity, inconsistency, schema mismatches, structural confusion, and other patterns that make components, properties, variants, layers, tokens, or documentation difficult for AI agents to interpret and use reliably. Never modifies the file.

## Usage

```
/design-system-audit-for-mcp
```

## What this command does

Read and follow `skills/design-system-audit-for-mcp/SKILL.md` in this repo **in full, exactly as written**, applied to the entire Figma design system file (unless the user explicitly narrows scope). Do not summarize or paraphrase that file — load it and execute its instructions directly, including the read-only contract (Section 1 — no writes of any kind), inferring the file's own dominant conventions before flagging deviations, ranking findings by AI failure risk rather than count, and producing the full output format in Section 8.

Use for AI-agent-readability specifically — not accessibility (`/accessibility-review`), not published-library compliance scoring (`/ds-compliance-review`), not general drift detection (`/design-system-drift-detector`), and not asset counting (`/design-system-inventory`). If it's unclear which of these four audit-style skills the user means, ask before picking one.
