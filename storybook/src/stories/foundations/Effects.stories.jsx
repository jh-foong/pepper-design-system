import { useMemo } from 'react';
import { listTokens } from '../../utils/tokens';

const swatchBase = {
  width: 96,
  height: 64,
  background: 'var(--pepper-color-bg-surface-brand-primary, #0064fa)',
};

function EffectRow({ name, value, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0' }}>
      <div style={{ ...swatchBase, ...style }} />
      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
        <div>{name}</div>
        <div style={{ opacity: 0.6 }}>{value}</div>
      </div>
    </div>
  );
}

export default {
  title: 'Foundations/Effects',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const BorderRadius = {
  render: () => {
    const tokens = listTokens('--pepper-border-radius-');
    return (
      <div>
        {tokens.map((t) => (
          <EffectRow key={t.name} {...t} style={{ borderRadius: t.value }} />
        ))}
      </div>
    );
  },
};

export const BorderWidth = {
  render: () => {
    const tokens = listTokens('--pepper-border-width-');
    return (
      <div>
        {tokens.map((t) => (
          <EffectRow
            key={t.name}
            {...t}
            style={{ background: 'transparent', border: `${t.value} solid var(--pepper-color-fg-stroke, #333)` }}
          />
        ))}
      </div>
    );
  },
};

export const Shadow = {
  render: () => {
    const tokens = listTokens('--pepper-shadow-').filter((t) => !t.name.includes('offset'));
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 32, padding: 16 }}>
        {tokens.map((t) => (
          <div key={t.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                ...swatchBase,
                width: '100%',
                borderRadius: 8,
                boxShadow: `var(${t.name})`,
                margin: '0 auto 12px',
              }}
            />
            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.name}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Blur = {
  render: () => {
    const tokens = listTokens('--pepper-blur-');
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 24, padding: 16 }}>
        {tokens.map((t) => (
          <div key={t.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                ...swatchBase,
                width: '100%',
                borderRadius: 8,
                filter: `var(${t.name})`,
                margin: '0 auto 12px',
              }}
            />
            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.name}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Opacity = {
  render: () => {
    const tokens = listTokens('--pepper-core-opacity-values-');
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 12, padding: 16 }}>
        {tokens.map((t) => (
          <div key={t.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                margin: '0 auto 8px',
                background: 'var(--pepper-core-color-brand-primary-blue-400, #0064fa)',
                opacity: `var(${t.name})`,
              }}
            />
            <div style={{ fontFamily: 'monospace', fontSize: 11 }}>{t.value}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const Gradient = {
  render: () => {
    const tokens = listTokens('--pepper-gradient-');
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24, padding: 16 }}>
        {tokens.map((t) => (
          <div key={t.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                ...swatchBase,
                width: '100%',
                height: 100,
                borderRadius: 8,
                background: `var(${t.name})`,
                margin: '0 auto 12px',
              }}
            />
            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.name}</div>
          </div>
        ))}
      </div>
    );
  },
};
