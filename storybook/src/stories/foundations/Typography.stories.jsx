import { useMemo, useState } from 'react';
import { listTokens, resolvedValue } from '../../utils/tokens';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";
const DEFAULT_SAMPLE = 'The quick brown fox jumps over the lazy dog';

// Matches the section order on the Bell "Typography" spec board (node
// 40000617:2476). Heading and Display scale across Desktop/Tablet/Mobile —
// confirmed against Figma's bound Tablet/Mobile-mode variables, not
// inferred. Body/Label/Legal don't resize: the board is explicit that
// Body/md and Body/sm "stay the same size on every screen".
const CATEGORIES = [
  { key: 'heading', label: 'Heading', responsive: true },
  { key: 'display', label: 'Display', responsive: true },
  { key: 'body', label: 'Body', responsive: false },
  { key: 'label', label: 'Label', responsive: false },
  { key: 'legal', label: 'Legal', responsive: false },
];

const HEADING_ORDER = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const SIZE_ORDER = ['xl', 'lg', 'md', 'sm', 'xs', '2xs'];

function stepSortValue(category, step) {
  const order = category === 'heading' ? HEADING_ORDER : SIZE_ORDER;
  const idx = order.indexOf(step);
  return idx === -1 ? order.length : idx;
}

/** --pepper-typography-<category>-<step>[-tablet|-mobile] -> parts. */
function parseTypographyName(name) {
  const rest = name.replace('--pepper-typography-', '');
  const bpMatch = rest.match(/-(tablet|mobile)$/);
  const breakpoint = bpMatch ? bpMatch[1] : 'desktop';
  const base = bpMatch ? rest.slice(0, rest.length - bpMatch[0].length) : rest;
  const [category, ...stepParts] = base.split('-');
  return { category, step: stepParts.join('-'), breakpoint };
}

/** Groups every --pepper-typography-* token into one entry per (category, step), keyed by breakpoint. */
function buildTypeStyles(tokens) {
  const entries = new Map();
  for (const token of tokens) {
    if (token.name.includes('underlined') || token.name.includes('dashed')) continue;
    const { category, step, breakpoint } = parseTypographyName(token.name);
    const key = `${category}-${step}`;
    if (!entries.has(key)) entries.set(key, { category, step, tokens: {} });
    entries.get(key).tokens[breakpoint] = token.name;
  }
  return [...entries.values()].sort(
    (a, b) =>
      CATEGORIES.findIndex((c) => c.key === a.category) - CATEGORIES.findIndex((c) => c.key === b.category) ||
      stepSortValue(a.category, a.step) - stepSortValue(b.category, b.step),
  );
}

/** Resolved `font` shorthand ("700 96px/100px "Manrope"") -> its parts. */
function parseFontShorthand(value) {
  const match = value.match(/^(\d+)\s+([\d.]+)px\/([\d.]+)px\s+"?([^"]+)"?$/);
  if (!match) return null;
  const [, weight, size, lineHeight, family] = match;
  return { weight, size: `${size}px`, lineHeight: `${lineHeight}px`, family };
}

function BreakpointToggle({ value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', border: '1px solid #d4d4d4', borderRadius: 8, overflow: 'hidden' }}>
      {['desktop', 'tablet', 'mobile'].map((bp) => (
        <button
          key={bp}
          type="button"
          onClick={() => onChange(bp)}
          style={{
            border: 'none',
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'capitalize',
            cursor: 'pointer',
            background: value === bp ? '#0a0a0a' : '#fff',
            color: value === bp ? '#fff' : '#0a0a0a',
          }}
        >
          {bp}
        </button>
      ))}
    </div>
  );
}

function TypeRow({ meta, breakpoint, responsive, sampleText }) {
  const tokenName = (responsive && meta.tokens[breakpoint]) || meta.tokens.desktop;
  const value = resolvedValue(tokenName);
  const spec = parseFontShorthand(value);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(220px, 1fr)',
        gap: 24,
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      <div
        style={{
          font: `var(${tokenName})`,
          overflowWrap: 'break-word',
        }}
      >
        {sampleText || DEFAULT_SAMPLE}
      </div>
      <div style={{ fontFamily: CODE_FONT, fontSize: 12, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, fontFamily: 'inherit' }}>
          {meta.step.toUpperCase()}
        </div>
        {spec && (
          <>
            <div>size: {spec.size}</div>
            <div>line-height: {spec.lineHeight}</div>
            <div>weight: {spec.weight}</div>
          </>
        )}
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <CopyLabel text="Token" value={tokenName} />
          <CopyIcon color="#0a0a0a" />
        </div>
      </div>
    </div>
  );
}

function TypographyShowcase() {
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [sampleText, setSampleText] = useState('');

  const tokens = useMemo(() => listTokens('--pepper-typography-'), []);
  const styles = useMemo(() => buildTypeStyles(tokens), [tokens]);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Typography</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Composite type styles — each one bundles weight, size, line-height and family into a single{' '}
        <code>font</code> shorthand. Heading and Display scale down at Tablet and Mobile; Body, Label and
        Legal stay the same size at every breakpoint.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          marginBottom: 32,
          padding: 16,
          background: '#fafafa',
          borderRadius: 8,
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 320px' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Preview text</span>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder={DEFAULT_SAMPLE}
            style={{
              padding: '8px 12px',
              fontSize: 14,
              border: '1px solid #d4d4d4',
              borderRadius: 6,
            }}
          />
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Breakpoint (Heading &amp; Display only)</span>
          <BreakpointToggle value={breakpoint} onChange={setBreakpoint} />
        </div>
      </div>

      {CATEGORIES.map(({ key, label, responsive }) => {
        const rows = styles.filter((s) => s.category === key);
        if (rows.length === 0) return null;
        return (
          <section key={key} style={{ marginBottom: 32 }}>
            <h4 style={{ font: 'var(--pepper-typography-label-lg)', margin: '0 0 4px' }}>{label}</h4>
            {rows.map((meta) => (
              <TypeRow
                key={`${meta.category}-${meta.step}`}
                meta={meta}
                breakpoint={breakpoint}
                responsive={responsive}
                sampleText={sampleText}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default {
  title: 'Foundations/Typography',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Showcase = {
  render: () => <TypographyShowcase />,
};
