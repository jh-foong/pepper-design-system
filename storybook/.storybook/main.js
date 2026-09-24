

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // Only Color (Primitives + Opacities + Semantic), Typography, Shape
  // (Radius + Stroke Width), Effects (Shadow + Focus Ring + Blur), Spacing
  // (Primitives + Gap + Inset), and Layout (Breakpoints + Responsive
  // Spacing) are ready to show. TokensLoaded is still being ironed out —
  // widen this back to "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)" once
  // it's ready.
  "stories": [
    "../src/**/*.mdx",
    "../src/stories/foundations/Color.stories.jsx",
    "../src/stories/foundations/Opacity.stories.jsx",
    "../src/stories/foundations/Semantic.stories.jsx",
    "../src/stories/foundations/Typography.stories.jsx",
    "../src/stories/foundations/Shape.stories.jsx",
    "../src/stories/foundations/Effects.stories.jsx",
    "../src/stories/foundations/Spacing.stories.jsx",
    "../src/stories/foundations/Layout.stories.jsx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite"
};
export default config;