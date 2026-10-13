import { Button, BUTTON_STYLES, BUTTON_SIZES } from '../../components/Button';

// Spec taken from the Habanero "Button / Standard Button" master component
// (file ASQlBKQihYPIRGnZEgGQWg, node 6557:510743) — checked via
// get_design_context (exact padding/gap/font per size) and get_variable_defs
// (exact colour per style) before writing Button.jsx. See that file's own
// header comment for the full verification trail.
const STYLE_LABELS = {
  brand: 'Brand',
  'brand-secondary': 'Brand: Secondary',
  'brand-crypto': 'Brand: Crypto',
  tonal: 'Tonal',
  outline: 'Outline',
  'outline-brand': 'Outline: Brand',
  ghost: 'Empty (Ghost)',
  positive: 'Positive',
  negative: 'Negative',
};

function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['ai-generated', 'autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    style: {
      control: 'select',
      options: BUTTON_STYLES,
      description: 'Visual style. Brand = primary action, one per screen. See the usage notes below each example for the rest.',
    },
    size: {
      control: 'radio',
      options: BUTTON_SIZES,
      description: 'xs = dense UI, sm = compact toolbar actions, md = default for web, lg = default for mobile / primary CTA, xl = marketing/hero only (never inside product UI).',
    },
    shape: {
      control: 'radio',
      options: ['pill', 'square'],
      description: "Default (pill) for marketing/consumer UI; Square for trading dashboards and data-dense, enterprise UI. Match the shape of everything else on the same surface — don't mix.",
    },
    children: { control: 'text', name: 'Label' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
  args: {
    style: 'brand',
    size: 'md',
    shape: 'pill',
    children: 'Button',
    disabled: false,
    loading: false,
  },
};

export const Playground = {
  render: (args) => <Button {...args} />,
};

export const WithIcons = {
  args: { children: 'Add to watchlist' },
  render: (args) => (
    <Button {...args} iconLeft={<PlusIcon />}>
      {args.children}
    </Button>
  ),
};

export const AllStyles = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        All 9 styles at md (40px), pill shape. <strong>Brand</strong> is the primary action — use once per
        screen. <strong>Positive</strong> / <strong>Negative</strong> are for trading contexts (buy/sell) and
        destructive actions — pair them together, don't use for low-stakes actions.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {BUTTON_STYLES.map((style) => (
          <div key={style} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Button style={style}>{STYLE_LABELS[style]}</Button>
            <span style={{ font: 'var(--pepper-typography-label-xs)', color: 'var(--pepper-color-fg-text-secondary)' }}>
              {STYLE_LABELS[style]}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AllSizes = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        All 5 sizes, Brand style, pill shape. Match size to platform: <strong>md</strong> default for web,{' '}
        <strong>lg</strong> default for mobile / primary CTA, <strong>xl</strong> marketing/hero only — never
        inside product UI, <strong>xs</strong> for dense UI (data tables, sidebars, filter bars).
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        {BUTTON_SIZES.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Button size={size}>Button</Button>
            <span style={{ font: 'var(--pepper-typography-label-xs)', color: 'var(--pepper-color-fg-text-secondary)' }}>
              {size}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shape = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Shape is set once per surface, not per button — pill for marketing/consumer/general UI, square for
        trading dashboards and data-dense, enterprise UI. Square's radius scales with size: 8px for md/lg/xl,
        4px for xs/sm.
      </p>
      <div style={{ display: 'flex', gap: 32 }}>
        {['pill', 'square'].map((shape) => (
          <div key={shape} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ font: 'var(--pepper-typography-label-sm)', textTransform: 'capitalize' }}>{shape}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {BUTTON_SIZES.map((size) => (
                <Button key={size} shape={shape} size={size}>
                  {size}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const States = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Hover and Focused aren't shown here since they're purely interaction-driven (try tabbing to or
        hovering the Playground button above) — per the component's own Figma spec, state is never set
        manually. Disabled and Loading are genuine props since they're app-driven, not pointer-driven.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Button>Default</Button>
          <span style={{ font: 'var(--pepper-typography-label-xs)', color: 'var(--pepper-color-fg-text-secondary)' }}>
            Default
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Button disabled>Disabled</Button>
          <span style={{ font: 'var(--pepper-typography-label-xs)', color: 'var(--pepper-color-fg-text-secondary)' }}>
            Disabled
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Button loading>Loading</Button>
          <span style={{ font: 'var(--pepper-typography-label-xs)', color: 'var(--pepper-color-fg-text-secondary)' }}>
            Loading
          </span>
        </div>
      </div>
    </div>
  ),
};
