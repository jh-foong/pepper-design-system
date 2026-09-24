import { useMemo } from 'react';
import { listTokens } from '../../utils/tokens';
import { SpecRow } from '../../components/SpecRow';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";
const SCALE_ORDER = ['none', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

function stepFromName(name, prefix) {
  return name.replace(prefix, '');
}

function stepSortValue(step) {
  const idx = SCALE_ORDER.indexOf(step);
  return idx === -1 ? SCALE_ORDER.length : idx;
}

// Do/Don't and "common mistakes" copy taken verbatim from the Bell "Spacing"
// board (node 40000018:881) — checked against Figma's bound variables first;
// the primitive scale and Gap/Inset values already match tokens/css/base/
// space.css exactly (that file documents its own prior re-sync), no drift.
function GuidanceList({ title, items }) {
  return (
    <div style={{ flex: '1 1 280px' }}>
      <div style={{ font: 'var(--pepper-typography-label-md)', marginBottom: 8 }}>{title}</div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 20,
          font: 'var(--pepper-typography-body-sm)',
          color: 'var(--pepper-color-fg-text-secondary)',
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuidanceBox({ doItems, dontItems }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        marginBottom: 32,
        padding: 16,
        background: '#fafafa',
        borderRadius: 8,
      }}
    >
      <GuidanceList title="Do" items={doItems} />
      <GuidanceList title="Common mistakes to avoid" items={dontItems} />
    </div>
  );
}

function PrimitivesShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-core-spacing-'), []);
  const sorted = useMemo(() => [...tokens].sort((a, b) => parseFloat(a.value) - parseFloat(b.value)), [tokens]);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Spacing: Primitives</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Our spacing system is built around a base unit of 8 pixels. This base unit determines the
        spacing scale and ensures visual consistency across apps. These are used directly by the
        Gap and Inset semantic tokens below — don't reference the raw scale directly in product.
      </p>
      {sorted.map((token) => (
        <div
          key={token.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 60px 1fr auto',
            gap: 24,
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #eee',
          }}
        >
          <div
            style={{
              width: token.value,
              maxWidth: 160,
              height: 16,
              background: 'var(--pepper-color-bg-surface-brand-primary)',
            }}
          />
          <div style={{ fontFamily: CODE_FONT, fontSize: 12 }}>{token.value}</div>
          <div />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: CODE_FONT, fontSize: 12 }}>
            <CopyLabel text="Token" value={token.name} />
            <CopyIcon color="#0a0a0a" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GapShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-space-gap-'), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-space-gap-') }))
        .sort((a, b) => stepSortValue(a.step) - stepSortValue(b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Gap</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        The space between elements. Gap tokens control the distance between two separate
        components, cards, or content blocks sitting next to or above each other.
      </p>
      <GuidanceBox
        doItems={[
          'Use gap tokens for spacing between two or more separate elements, components or content blocks.',
          'Always use gap when elements sit side by side or stack vertically with space between them.',
        ]}
        dontItems={[
          "Never use gap inside a single component — that's an inset.",
          'Never hardcode spacing values — always reference a gap token.',
          'Using layout/theme spacing tokens (64px, 80px) for component-level spacing — those are reserved for page-level layout only.',
        ]}
      />
      {sorted.map((token) => (
        <SpecRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description=""
          preview={
            <div style={{ display: 'flex', alignItems: 'center', gap: token.value, margin: '0 12px' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--pepper-color-bg-surface-brand-primary)' }} />
              <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--pepper-color-bg-surface-accent-orange-strong)' }} />
            </div>
          }
        />
      ))}
    </div>
  );
}

function InsetShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-space-inset-'), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-space-inset-') }))
        .sort((a, b) => stepSortValue(a.step) - stepSortValue(b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Inset</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        The space inside a component. Inset tokens control the internal padding within a single
        element — the breathing room between a component's edges and its content.
      </p>
      <GuidanceBox
        doItems={[
          'Use inset tokens for internal padding within a single component or container.',
          "Always use inset for the space between a component's boundary and its content.",
        ]}
        dontItems={[
          "Never use inset between two separate elements — that's a gap.",
          'Never mix inset and gap within the same spacing decision.',
          'Never hardcode padding values — always reference an inset token.',
        ]}
      />
      {sorted.map((token) => (
        <SpecRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description=""
          preview={
            <div
              style={{
                margin: '0 12px',
                padding: token.value,
                background: 'var(--pepper-color-bg-surface-accent-tonal-subtle)',
                borderRadius: 8,
              }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--pepper-color-bg-surface-brand-primary)' }} />
            </div>
          }
        />
      ))}
    </div>
  );
}

export default {
  title: 'Foundations/Spacing',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Primitives = {
  render: () => <PrimitivesShowcase />,
};

export const Gap = {
  render: () => <GapShowcase />,
};

export const Inset = {
  render: () => <InsetShowcase />,
};
