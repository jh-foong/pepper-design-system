import { useMemo, useState } from 'react';
import { listTokens, resolvedValue } from '../../utils/tokens';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";
const DEFAULT_SAMPLE = 'ABC123';

// Real-world sample copy per style, taken directly from the Bell "Typography"
// spec board's own preview rows (node 40000617:2476) — e.g. H1's preview
// literally reads "Hero Headline", Display/xl reads "$1,245,890.00". Used
// whenever the Controls panel's "Preview text" override is left blank.
const EXAMPLES = {
  heading: {
    h1: 'Hero Headline',
    h2: 'Section Title',
    h3: 'Feature Group Header',
    h4: 'Card Title',
    h5: 'Panel Title',
    h6: 'Inline Section Divider',
  },
  display: {
    xl: '$1,245,890.00',
    lg: '$84,520.75',
    md: '2,847.50 USD',
    sm: '98.72%',
  },
  body: {
    lg: 'This is a lead paragraph introducing a feature or section. It provides context and sets expectations for the content that follows.',
    md: 'Standard body copy used throughout the interface for descriptions, explanations, and general content. This is the default reading size for Desktop.',
    sm: 'Secondary text that provides additional context. Default reading size for Mobile and Tablet breakpoints.',
    xs: 'Caption text — Jan 15, 2025 at 3:42 PM',
    '2xs': 'Fine print or compact metadata',
  },
  label: {
    lg: 'Navigation Item',
    md: 'Button Text',
    sm: 'Tag Label',
    xs: 'Status',
    '2xs': 'OVERLINE',
  },
  legal: {
    md: 'By continuing, you agree to our Terms of Service and Privacy Policy. Your data will be processed in accordance with applicable regulations.',
    xs: 'Copyright 2025 Pepper DS. All rights reserved.',
  },
};

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

function TypeRow({ meta, breakpoint, responsive, sampleTextOverride }) {
  const tokenName = (responsive && meta.tokens[breakpoint]) || meta.tokens.desktop;
  const value = resolvedValue(tokenName);
  const spec = parseFontShorthand(value);
  const sampleText = sampleTextOverride || EXAMPLES[meta.category]?.[meta.step] || DEFAULT_SAMPLE;

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
        {sampleText}
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

function TypographyShowcase({ sampleTextOverride }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [breakpoint, setBreakpoint] = useState('desktop');

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
        Legal stay the same size at every breakpoint. Each row previews real sample copy from the Bell
        spec board — use the "Preview text" control below to override it for every row at once.
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

      {category.responsive && (
        <div style={{ marginBottom: 32 }}>
          <BreakpointToggle value={breakpoint} onChange={setBreakpoint} />
        </div>
      )}

      {rows.map((meta) => (
        <TypeRow
          key={`${meta.category}-${meta.step}`}
          meta={meta}
          breakpoint={breakpoint}
          responsive={category.responsive}
          sampleTextOverride={sampleTextOverride}
        />
      ))}
    </div>
  );
}

export default {
  title: 'Foundations/Typography',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
  argTypes: {
    previewText: {
      control: 'text',
      name: 'Preview text',
      description: 'Override the example text shown for every row. Leave blank to use each style\'s own real-world sample from the Bell spec board.',
    },
  },
  args: {
    previewText: '',
  },
};

export const Showcase = {
  render: (args) => <TypographyShowcase sampleTextOverride={args.previewText} />,
};
