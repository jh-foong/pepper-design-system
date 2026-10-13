# Pepper DS Storybook (pilot)

A pilot Storybook covering the Pepper Design System **foundations** — no
components yet, that's a deliberate v1 scope decision. Built to test whether
Storybook is the right long-term home for the design system, and to start
working out a designer-in-the-loop workflow for maintaining it in code.

## Run it

```bash
npm install
npm run storybook
```

Opens at http://localhost:6006. Stories live under `src/stories/foundations/`:

- **Color** — primitives (`--pepper-core-color-*`) and semantic/state/overlay
  tokens (`--pepper-color-*`, `--pepper-state-*`, `--pepper-overlay-*`)
- **Typography** — composite `--pepper-typography-*` styles, plus the
  font-size/weight/line-height/family primitives they're built from
- **Spacing** — inset, gap, and desktop layout spacing tokens
- **Effects** — border radius, border width, shadow (incl. focus rings),
  blur, opacity, gradient

Use the **Theme** toggle in the toolbar to flip light/dark — it sets
`data-theme` on the document root, which is what `color.css`'s dark-mode
overrides key off.

## How this stays honest to the tokens

Nothing here hardcodes a token list. `src/utils/tokens.js` reads whatever
custom properties are actually declared in the loaded stylesheets at
render time, so if a token is renamed or removed upstream, it disappears
from the Storybook too — the story files don't need editing when tokens
change, only when a new *category* of token is added.

`src/pepper-tokens.css` imports the canonical files straight from
`../tokens/css/base/*.css` (one directory up) — nothing is copied or
duplicated. After you sync a new DesignBridge export into that folder,
this Storybook picks it up on the next reload, no extra step.

## Known issue: Manrope font CDN link

`DESIGN.md`'s documented snippet for loading Manrope —
`https://cdn.jsdelivr.net/gh/jh-foong/manrope@main/fonts/webfonts/Manrope.css`
— 404s. The fork's default branch is `master`, not `main`, and there's no
bundled `Manrope.css` in the repo at all, just individual `.woff2` files.
`.storybook/preview-head.html` works around it with its own `@font-face`
block pointing at the individual files on the `master` branch. Worth fixing
at the source (add `fonts/webfonts/Manrope.css` to the fork, or update
`DESIGN.md`'s snippet) so every other consumer of that snippet — including
Claude Design HTML prototypes — isn't silently falling back to a system font.

## What's deliberately not here yet

- Components (Button, Input, etc.) — parked per pilot scope
- Live Figma sync — the `figma-desktop` MCP connector wasn't available when
  this was built; tokens are read from the canonical CSS files instead
- Dark-mode shadow palette — `shadow.css` notes this is theme-agnostic for
  now, a v2.1 item upstream
