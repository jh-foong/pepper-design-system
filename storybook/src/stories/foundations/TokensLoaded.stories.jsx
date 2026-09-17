import { expect } from 'storybook/test';

/**
 * Sanity check that pepper-tokens.css actually loaded and resolves to the
 * values declared in tokens/css/base/color.css — not a component test, just
 * a guard so a broken import path fails loudly instead of silently.
 */
function TokenProbe() {
  return (
    <div
      data-testid="token-probe"
      style={{ background: 'var(--pepper-core-color-brand-primary-blue-400)', width: 40, height: 40 }}
    />
  );
}

export default {
  title: 'Foundations/TokensLoaded',
  component: TokenProbe,
  tags: ['ai-generated'],
};

export const CssCheck = {
  play: async ({ canvas }) => {
    const probe = canvas.getByTestId('token-probe');
    const resolved = getComputedStyle(probe).backgroundColor;
    // --pepper-core-color-brand-primary-blue-400 is #0064fa in tokens/css/base/color.css
    await expect(resolved).toBe('rgb(0, 100, 250)');
  },
};
