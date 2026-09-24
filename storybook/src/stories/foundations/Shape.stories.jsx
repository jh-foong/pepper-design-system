import { useMemo } from 'react';
import { listTokens } from '../../utils/tokens';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";

const RADIUS_ORDER = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
const STROKE_ORDER = ['none', 'xs', 'sm', 'md', 'lg'];

// Descriptions copied verbatim from the Bell "Radius: Primitives" board
// (node 40000018:882) — checked against Figma's bound variables, which match
// tokens/css/base/border-radius.css and border-width.css exactly (no drift).
const RADIUS_DESCRIPTIONS = {
  none: 'No border radius. Use for full-bleed layouts, edge-to-edge components, or when a sharp structured feel is needed. Common in trading UI and data tables.',
  xs: 'Hairline radius. Barely perceptible rounding. Use for very small components.',
  sm: 'Subtle radius. Use for small interactive elements and tight UI components.',
  md: 'Default radius. The most commonly used value across the DS. Use for standard cards, containers, dropdowns, and most interactive components.',
  lg: 'Slightly more rounded. Use components that need a softer, more approachable feel.',
  xl: 'Prominent rounding. Use for consumer-facing cards, or app contexts.',
  '2xl': 'Large radius. Use for prominent UI elements like hero cards or marketing-style components.',
  '3xl': 'Very rounded. Use for hero/marketing cards and prominent promotional components. Avoid for data-heavy or trading UI.',
  full: 'Fully pill-shaped. Use for tags, badges, pill buttons, progress bars, and any component that should appear fully rounded regardless of height.',
};

const STROKE_DESCRIPTIONS = {
  none: 'No border.',
  xs: 'Standard border.',
  sm: 'Border, accents, etc. Can also be used for "focus states" or to imply when something is being "selected".',
  md: 'Heavy. Use for decorative accents.',
  lg: 'Very heavy. Use for heavy branding or for decorative use.',
};

function stepFromName(name, prefix) {
  return name.replace(prefix, '');
}

function stepSortValue(order, step) {
  const idx = order.indexOf(step);
  return idx === -1 ? order.length : idx;
}

function ShapeRow({ step, value, tokenName, description, preview }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '88px 100px minmax(0, 1fr) auto',
        gap: 24,
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      {preview}
      <div>
        <div style={{ font: 'var(--pepper-typography-label-sm)', textTransform: 'uppercase' }}>{step}</div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 12, opacity: 0.6 }}>{value}</div>
      </div>
      <div style={{ font: 'var(--pepper-typography-body-sm)', color: 'var(--pepper-color-fg-text-secondary)' }}>
        {description}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: CODE_FONT, fontSize: 12 }}>
        <CopyLabel text="Token" value={tokenName} />
        <CopyIcon color="#0a0a0a" />
      </div>
    </div>
  );
}

function RadiusShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-border-radius-'), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-border-radius-') }))
        .sort((a, b) => stepSortValue(RADIUS_ORDER, a.step) - stepSortValue(RADIUS_ORDER, b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Radius</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Corner roundness for visual elements. These are used directly in product code — radius
        values don't carry enough UI-role meaning to warrant semantic aliases at this stage.
      </p>
      {sorted.map((token) => (
        <ShapeRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description={RADIUS_DESCRIPTIONS[token.step] ?? ''}
          preview={
            <div
              style={{
                width: 56,
                height: 56,
                background: 'var(--pepper-color-bg-surface-secondary)',
                border: '2px solid var(--pepper-color-fg-stroke-brand-default)',
                borderRadius: token.value,
              }}
            />
          }
        />
      ))}
    </div>
  );
}

function StrokeWidthShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-border-width-stroke-'), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-border-width-stroke-') }))
        .sort((a, b) => stepSortValue(STROKE_ORDER, a.step) - stepSortValue(STROKE_ORDER, b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Stroke Width</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Border thickness for outlines, accents, and dividers.
      </p>
      {sorted.map((token) => (
        <ShapeRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description={STROKE_DESCRIPTIONS[token.step] ?? ''}
          preview={
            <div
              style={{
                width: 56,
                height: 56,
                background: 'var(--pepper-color-bg-surface-secondary)',
                border: `${token.value} solid var(--pepper-color-fg-text-primary)`,
                borderRadius: 8,
                boxSizing: 'border-box',
              }}
            />
          }
        />
      ))}
    </div>
  );
}

export default {
  title: 'Foundations/Shape',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Radius = {
  render: () => <RadiusShowcase />,
};

export const StrokeWidth = {
  render: () => <StrokeWidthShowcase />,
};
