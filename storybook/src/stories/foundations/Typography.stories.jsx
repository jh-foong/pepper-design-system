import { useMemo, useState } from 'react';
import { listTokens, resolvedValue } from '../../utils/tokens';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";
const DEFAULT_SAMPLE = 'ABC123';

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

// Habanero "Filter Buttons" component, Style=Bold (Brand), Size=md (node
// 9336:5302): selected = brand-blue fill + inverse text; unselected = white
// fill + subtle border. Fully rounded (corner-radius/button-md = 999).
function FilterButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: 'var(--pepper-typography-label-sm)',
        padding: '10px 16px',
        borderRadius: 999,
        border: active ? 'none' : '1px solid var(--pepper-color-fg-stroke-subtle)',
        background: active ? 'var(--pepper-color-bg-surface-brand-primary)' : 'var(--pepper-color-bg-surface-primary)',
        color: active ? 'var(--pepper-color-static-text-inverse-primary)' : 'var(--pepper-color-fg-text-primary)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

// Habanero "Segment Control" component, Selected Color=Default, Size=md
// (node 6003:322218): a bordered, unfilled track; the active segment gets a
// tonal-grey "thumb" pill, inactive segments sit directly on the track.
function BreakpointToggle({ value, onChange }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        border: '1px solid var(--pepper-color-fg-stroke-subtle)',
        borderRadius: 8,
        padding: 2,
        gap: 2,
      }}
    >
      {['desktop', 'tablet', 'mobile'].map((bp) => {
        const active = value === bp;
        return (
          <button
            key={bp}
            type="button"
            onClick={() => onChange(bp)}
            style={{
              font: 'var(--pepper-typography-label-sm)',
              textTransform: 'capitalize',
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: active ? 'var(--pepper-color-bg-surface-accent-tonal-subtle)' : 'transparent',
              color: 'var(--pepper-color-fg-text-primary)',
            }}
          >
            {bp}
          </button>
        );
      })}
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
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [sampleText, setSampleText] = useState('');

  const tokens = useMemo(() => listTokens('--pepper-typography-'), []);
  const styles = useMemo(() => buildTypeStyles(tokens), [tokens]);

  const category = CATEGORIES.find((c) => c.key === activeCategory);
  const rows = styles.filter((s) => s.category === activeCategory);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Typography</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Composite type styles — each one bundles weight, size, line-height and family into a single{' '}
        <code>font</code> shorthand. Heading and Display scale down at Tablet and Mobile; Body, Label and
        Legal stay the same size at every breakpoint.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {CATEGORIES.map((c) => (
          <FilterButton
            key={c.key}
            label={c.label}
            active={c.key === activeCategory}
            onClick={() => setActiveCategory(c.key)}
          />
        ))}
      </div>

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
        {category.responsive && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Breakpoint</span>
            <BreakpointToggle value={breakpoint} onChange={setBreakpoint} />
          </div>
        )}
      </div>

      {rows.map((meta) => (
        <TypeRow
          key={`${meta.category}-${meta.step}`}
          meta={meta}
          breakpoint={breakpoint}
          responsive={category.responsive}
          sampleText={sampleText}
        />
      ))}
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
