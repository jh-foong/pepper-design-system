import { useMemo } from 'react';
import { listTokens } from '../../utils/tokens';

function TypeSample() {
  const styles = useMemo(() => listTokens('--pepper-typography-'), []);

  return (
    <div>
      <p>
        Composite <code>--pepper-typography-*</code> tokens — each one bundles weight, size,
        line-height and family from the primitives below into a single <code>font</code> shorthand.
        Rendered with the real token, not a hardcoded style.
      </p>
      {styles.map(({ name }) => (
        <div key={name} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
          <div style={{ font: `var(${name})` }}>The quick brown fox jumps over the lazy dog</div>
          <div style={{ fontFamily: 'monospace', fontSize: 11, opacity: 0.6, marginTop: 4 }}>{name}</div>
        </div>
      ))}
    </div>
  );
}

function PrimitiveScale({ prefix, label, render }) {
  const tokens = useMemo(() => listTokens(prefix), [prefix]);
  return (
    <section style={{ marginBottom: 24 }}>
      <h4>{label}</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {tokens.map(({ name, value }) => (
            <tr key={name} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ fontFamily: 'monospace', fontSize: 12, padding: '4px 12px 4px 0' }}>{name}</td>
              <td style={{ fontFamily: 'monospace', fontSize: 12, padding: '4px 12px', opacity: 0.6 }}>
                {value}
              </td>
              <td style={{ padding: '4px 0' }}>{render(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default {
  title: 'Foundations/Typography',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const CompositeStyles = {
  render: () => <TypeSample />,
};

export const Primitives = {
  render: () => (
    <div>
      <PrimitiveScale
        prefix="--pepper-font-size-"
        label="Font size"
        render={(v) => <span style={{ fontSize: v }}>Aa</span>}
      />
      <PrimitiveScale
        prefix="--pepper-font-weight-"
        label="Font weight"
        render={(v) => <span style={{ fontWeight: v }}>Aa</span>}
      />
      <PrimitiveScale
        prefix="--pepper-line-height-"
        label="Line height"
        render={(v) => <span>{v}</span>}
      />
      <PrimitiveScale
        prefix="--pepper-core-font-family-"
        label="Font family"
        render={(v) => <span style={{ fontFamily: v }}>Aa Bb Cc</span>}
      />
    </div>
  ),
};
