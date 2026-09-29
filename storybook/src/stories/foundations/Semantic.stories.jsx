import { useMemo, useState } from 'react';
import { listTokens, groupByFirstSegment, resolvedValueForBreakpoint } from '../../utils/tokens';
import { ColorRamp } from '../../components/ColorRampUI';

// Category copy taken verbatim from the Bell "Semantic Colours & Opacities"
// board (node 40001204:1646) — checked against Figma's live bound variables
// first. Only Light and Dark modes are covered here (Dark: Neutral is a
// separate variant, out of scope for this pass).
const CATEGORIES = [
  {
    key: 'surface',
    label: 'Surface',
    description:
      'Surface tokens for the background colour of containers, cards, modals and page layouts. This set covers base, brand, status and accent variants, along with their hover states.',
    note:
      "Primary and Elevated both resolve to #FFFFFF. The difference is in elevation, not colour — Elevated is for floating elements like cards, modals and bottom sheets, and should be paired with a shadow (e.g. shadow/lg), since the fill alone won't separate it from Primary. Secondary and Sunken both resolve to #F5F5F5: Secondary describes a raised area, a component sitting on the canvas; Sunken describes a canvas that is recessed. In practice, Sunken is usually the base layer itself, with an Elevated card floating on top (shadow included) to create that sense of depth — an app home screen, for example.",
    sections: [{ prefix: '--pepper-color-bg-surface-' }],
  },
  {
    key: 'overlay',
    label: 'Overlay',
    description:
      'An overlay is a temporary transparent layer that covers page content, shifting focus to a new content element.',
    sections: [{ prefix: '--pepper-color-bg-overlay-' }],
  },
  {
    key: 'text',
    label: 'Text',
    description:
      'The colour of text and labels across the interface, from primary content down to disabled and placeholder states. This set covers primary, secondary, tertiary and disabled variants, so every level of emphasis has a clear, consistent home.',
    sections: [{ prefix: '--pepper-color-fg-text-' }],
  },
  {
    key: 'icon',
    label: 'Icon',
    description:
      'Icon colours across the interface, from primary content down to disabled and placeholder states. This set covers primary, secondary, tertiary and disabled variants, so every level of emphasis has a clear, consistent home.',
    sections: [{ prefix: '--pepper-color-fg-icon-' }],
  },
  {
    key: 'stroke',
    label: 'Stroke',
    description:
      'Border and outline colours used across the interface, from structural dividers to interactive and status states. This set covers neutral, brand, status and accent-tonal variants, so every level of emphasis on an edge has a clear, consistent home.',
    sections: [{ prefix: '--pepper-color-fg-stroke-' }],
  },
  {
    key: 'static',
    label: 'Static',
    description:
      'Theme-agnostic colour tokens that stay fixed regardless of light or dark mode. This collection covers text, icon, stroke, surface and effect colours for contexts where a value must render identically no matter what theme the app is in.',
    note: "These values are identical in both Light and Dark — the toggle above won't change anything here, which is the point.",
    sections: [{ prefix: '--pepper-color-static-' }],
  },
  {
    key: 'state-effects',
    label: 'State & Effects',
    // Figma's own board reuses the Overlay board's description text for this
    // section verbatim ("An overlay is a temporary transparent layer…"),
    // which doesn't actually describe what's here — looks like a copy-paste
    // leftover in the source file rather than real documentation, so it's
    // skipped in favour of a plain structural note instead of reproducing
    // copy that would mislead. Worth fixing on the Figma board itself.
    description:
      "Utility tokens that don't fit the Surface/Text/Icon/Stroke categories above: trading buy/sell component colours, gradient stops, and the low-level state-overlay opacities used to build hover/press states.",
    sections: [
      { prefix: '--pepper-color-component-', label: 'Component (trading buy/sell, input)' },
      { prefix: '--pepper-color-fg-effects-gradient-', label: 'Gradient stops' },
      { prefix: '--pepper-state-overlay-', label: 'State overlay opacities' },
    ],
  },
];

function labelForGroup(token, group, stripPrefix) {
  const rest = token.name.slice(stripPrefix.length);
  return rest.length > group.length ? rest.slice(group.length + 1) : group;
}

// Habanero "Filter Buttons" component (node 9336:5302) — same pattern used
// on the Typography page for its category switcher.
function FilterButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: 'var(--pepper-typography-label-sm)',
        height: 40,
        padding: '0 16px',
        display: 'inline-flex',
        alignItems: 'center',
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

// Habanero "Tab" component (node 9171:6561) — same underline-tab pattern
// used for Typography's breakpoint switcher, here toggling Light/Dark.
function ThemeTabs({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--pepper-color-fg-stroke-subtle)' }}>
      {['light', 'dark'].map((mode) => {
        const active = value === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            style={{
              font: 'var(--pepper-typography-label-sm)',
              textTransform: 'capitalize',
              padding: '8px 2px',
              marginBottom: -1,
              border: 'none',
              borderBottom: active ? '2px solid var(--pepper-color-fg-stroke-brand-default)' : '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              color: active ? 'var(--pepper-color-fg-text-brand-default)' : 'var(--pepper-color-fg-text-secondary)',
            }}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
}

function GoodToKnow({ children }) {
  return (
    <div
      style={{
        marginBottom: 24,
        padding: 16,
        background: 'var(--pepper-color-bg-surface-accent-tonal-subtle)',
        borderRadius: 8,
        font: 'var(--pepper-typography-body-sm)',
        color: 'var(--pepper-color-fg-text-secondary)',
      }}
    >
      <strong style={{ color: 'var(--pepper-color-fg-text-primary)' }}>Good to know: </strong>
      {children}
    </div>
  );
}

/** One prefix's tokens, grouped by their first dash segment (the closest thing a semantic name has to a "family"), re-resolved for the active theme. */
function TokenGroups({ prefix, theme }) {
  const baseTokens = useMemo(() => listTokens(prefix), [prefix]);
  const themedTokens = useMemo(
    () =>
      baseTokens.map((t) => ({
        ...t,
        value: theme === 'dark' ? resolvedValueForBreakpoint(t.name, 'dark') : t.value,
      })),
    [baseTokens, theme],
  );
  const groups = useMemo(() => groupByFirstSegment(themedTokens, prefix), [themedTokens, prefix]);
  const groupKeys = useMemo(() => [...groups.keys()].sort(), [groups]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
      {groupKeys.map((g) => {
        const sorted = [...groups.get(g)].sort((a, b) => a.name.localeCompare(b.name));
        return (
          <ColorRamp key={g} title={g.split('-').join(' / ')} tokens={sorted} labelFor={(t) => labelForGroup(t, g, prefix)} />
        );
      })}
    </div>
  );
}

function CategoryShowcase({ category, theme }) {
  return (
    <div data-theme={theme === 'dark' ? 'dark' : undefined}>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 16px' }}>{category.description}</p>
      {category.note && <GoodToKnow>{category.note}</GoodToKnow>}
      {category.sections.map((section) => (
        <div key={section.prefix}>
          {section.label && (
            <h4 style={{ font: 'var(--pepper-typography-label-lg)', margin: '0 0 12px' }}>{section.label}</h4>
          )}
          <TokenGroups prefix={section.prefix} theme={theme} />
        </div>
      ))}
    </div>
  );
}

function SemanticShowcase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [theme, setTheme] = useState('light');
  const category = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Semantic Colours</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Semantic tokens carry UI meaning and reference the primitives shown on the Color / Primitives
        page. Use these in product — never the raw <code>pepper-core-color-*</code> scale directly.
        Only Light and Dark modes are shown here (Dark: Neutral is a separate variant).
      </p>

      <div style={{ marginBottom: 24 }}>
        <ThemeTabs value={theme} onChange={setTheme} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {CATEGORIES.map((c) => (
          <FilterButton key={c.key} label={c.label} active={c.key === activeCategory} onClick={() => setActiveCategory(c.key)} />
        ))}
      </div>

      <CategoryShowcase category={category} theme={theme} />
    </div>
  );
}

export default {
  title: 'Foundations/Color',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Semantic = {
  render: () => <SemanticShowcase />,
};
