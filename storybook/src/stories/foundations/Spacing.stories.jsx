import { useMemo } from 'react';
import { listTokens } from '../../utils/tokens';

function SpaceGroup({ prefix, label }) {
  const tokens = useMemo(() => listTokens(prefix), [prefix]);
  return (
    <section style={{ marginBottom: 24 }}>
      <h4>{label}</h4>
      {tokens.map(({ name, value }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
          <div style={{ width: value, height: 16, background: 'var(--pepper-core-color-brand-primary-blue-400, #0064fa)' }} />
          <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {name} — {value}
          </div>
        </div>
      ))}
    </section>
  );
}

export default {
  title: 'Foundations/Spacing',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const InsetAndGap = {
  render: () => (
    <div>
      <p>
        <code>--pepper-space-inset-*</code> (internal padding) and <code>--pepper-space-gap-*</code>
        (space between elements). Bar width shows the actual token value.
      </p>
      <SpaceGroup prefix="--pepper-space-inset-" label="Inset (padding)" />
      <SpaceGroup prefix="--pepper-space-gap-" label="Gap (proximity/stacking)" />
    </div>
  ),
};

export const LayoutSpacing = {
  render: () => (
    <div>
      <p>
        Responsive layout tokens — desktop values shown here. Tablet/mobile overrides live under
        <code> [data-theme="tablet"|"mobile"]</code> in <code>space.css</code>.
      </p>
      <SpaceGroup prefix="--pepper-space-theme-spacing-" label="Layout spacing (desktop)" />
    </div>
  ),
};
