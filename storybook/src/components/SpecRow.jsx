import { CopyLabel, CopyIcon } from './ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";

/**
 * One row of a token spec table: a visual preview, step name + raw value,
 * a real-world usage description, and a copyable token name. Shared by the
 * Shape (Radius/Stroke Width) and Effects (Shadow/Focus Ring) stories.
 */
export function SpecRow({ preview, step, value, description, tokenName }) {
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
