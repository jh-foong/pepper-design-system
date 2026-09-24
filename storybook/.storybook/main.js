

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // Only Color (Primitives + Opacities), Typography, Shape (Radius + Stroke
  // Width), Effects (Shadow + Focus Ring + Blur), and Spacing (Primitives +
  // Gap + Inset) are ready to show. Semantic colours and TokensLoaded are
  // still being ironed out — widen this back to
  // "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)" once they're ready.
  "stories": [
    "../src/**/*.mdx",
    "../src/stories/foundations/Color.stories.jsx",
    "../src/stories/foundations/Opacity.stories.jsx",
    "../src/stories/foundations/Typography.stories.jsx",
    "../src/stories/foundations/Shape.stories.jsx",
    "../src/stories/foundations/Effects.stories.jsx",
    "../src/stories/foundations/Spacing.stories.jsx"
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