import { useMemo } from 'react';
import { listTokens, groupPrimitives } from '../../utils/tokens';

function Swatch({ name, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          border: '1px solid var(--pepper-color-fg-stroke, #ccc)',
          background: `var(${name})`,
          flexShrink: 0,
        }}
      />
      <div style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.4 }}>
        <div>{name}</div>
        <div style={{ opacity: 0.6 }}>{value}</div>
      </div>
    </div>
  );
}

function TokenGrid({ tokens }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 4 }}>
      {tokens.map((t) => (
        <Swatch key={t.name} {...t} />
      ))}
    </div>
  );
}

function PrimitivePalette() {
  const tokens = useMemo(
    () => listTokens('--pepper-core-color-').filter((t) => !t.name.includes('opacity')),
    [],
  );
  const families = useMemo(() => groupPrimitives(tokens, '--pepper-core-color-'), [tokens]);

  return (
    <div>
      <p>
        Primitives (<code>--pepper-core-color-*</code>) — raw palette scales. Don't reference these
        directly in product code; use the semantic tokens below instead.
      </p>
      {[...families.entries()].map(([family, familyTokens]) => (
        <section key={family} style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 4 }}>{family}</h4>
          <TokenGrid tokens={familyTokens} />
        </section>
      ))}
    </div>
  );
}

function semanticGroup(name) {
  const rest = name.replace('--pepper-color-', '');
  const segs = rest.split('-');
  if (segs[0] === 'fg') return `fg-${segs[1]}`; // fg-text, fg-icon, fg-stroke
  return segs[0]; // bg, component, static, border, etc.
}

function SemanticPalette() {
  const tokens = useMemo(
    () =>
      listTokens('--pepper-color-').concat(listTokens('--pepper-overlay-')).concat(listTokens('--pepper-state-')),
    [],
  );
  const groups = useMemo(() => {
    const map = new Map();
    for (const token of tokens) {
      const key = token.name.startsWith('--pepper-color-')
        ? semanticGroup(token.name)
        : token.name.startsWith('--pepper-overlay-')
          ? 'overlay'
          : 'state';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(token);
    }
    return map;
  }, [tokens]);

  return (
    <div>
      <p>
        Semantic / component / static / overlay / state tokens (<code>--pepper-*</code>) — use these
        in product. They reference primitives above and are the ones that flip with the theme toggle
        in the toolbar.
      </p>
      {[...groups.entries()].map(([group, groupTokens]) => (
        <section key={group} style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 4 }}>{group}</h4>
          <TokenGrid tokens={groupTokens} />
        </section>
      ))}
    </div>
  );
}

export default {
  title: 'Foundations/Color',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Semantic = {
  render: () => <SemanticPalette />,
};

export const Primitives = {
  render: () => <PrimitivePalette />,
};
