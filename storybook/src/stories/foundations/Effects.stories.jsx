import { useMemo } from 'react';
import { listTokens, resolvedValue } from '../../utils/tokens';
import { SpecRow } from '../../components/SpecRow';

// Descriptions copied verbatim from the Bell "Effects" board (node
// 40000018:883) — checked against Figma's bound variables first. Shadow and
// Blur geometry match tokens/css/base/shadow.css and blur.css exactly (no
// drift); Focus Ring colours match tokens/css/base/shadow.css exactly too.
const SHADOW_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const SHADOW_DESCRIPTIONS = {
  xs: 'Hairline lift. Use on chips, badges, and input fields at rest — when an element needs the faintest sense of depth without drawing attention.',
  sm: 'Default surface shadow. Use on cards, buttons, and inline panels that sit slightly above the page background.',
  md: 'Floating UI. Use on dropdowns, tooltips, and contextual menus that pop above content.',
  lg: 'Elevated panel. Use on date pickers, popovers, and secondary overlays that need clear separation from the page.',
  xl: "Large dialog. Use on wide overlays and multi-step modals (400–700px) that need more presence than a floating panel but aren't full drawers.",
  '2xl': 'Heavy lift. Use on primary modals, bottom sheets, and drawers — surfaces that demand maximum depth and focus.',
};

// "xs" and "3xl" aren't on the Bell board (which only documents sm–2xl) but
// do exist as real primitives in blur.css, so they're shown too — just
// without invented description copy for the two undocumented steps.
const BLUR_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const BLUR_DESCRIPTIONS = {
  sm: 'Subtle glass — nav, chips, muted overlays.',
  md: 'Card backdrops, contextual panels.',
  lg: 'Modal/drawer backdrops.',
  xl: 'Heavy glass, spotlight effects.',
  '2xl': 'Full overlay, frosted screen.',
};

const FOCUS_RINGS = [
  {
    step: 'default',
    tokenName: '--pepper-shadow-focus-rings-default',
    description:
      'The ring to use for almost every case, and the required variant unless a component specifically needs something else. Flips to its dark-mode colour automatically.',
  },
  {
    step: 'subtle',
    tokenName: '--pepper-shadow-focus-rings-subtle',
    description: 'Use only where a neutral ring is needed instead of blue. Also flips to its dark-mode colour automatically.',
  },
  {
    step: 'error',
    tokenName: '--pepper-shadow-focus-rings-error',
    description: 'Use for focus on a control that is currently in an error/invalid state.',
  },
  {
    step: 'inverse',
    tokenName: '--pepper-shadow-focus-rings-inverse',
    description:
      "Use only in light mode, for focus on something placed on a dark surface. Not needed in dark mode, since default and subtle already switch colour there.",
  },
];

function stepFromName(name, prefix) {
  return name.replace(prefix, '');
}

function stepSortValue(order, step) {
  const idx = order.indexOf(step);
  return idx === -1 ? order.length : idx;
}

function ShadowShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-shadow-').filter((t) => !t.name.includes('offset')), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-shadow-') }))
        .filter((t) => SHADOW_ORDER.includes(t.step))
        .sort((a, b) => stepSortValue(SHADOW_ORDER, a.step) - stepSortValue(SHADOW_ORDER, b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Shadow</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Elevation for surfaces. Shadows deliberately don't invert in dark mode — a shadow that's dark
        in light mode stays that same dark colour in dark mode. Dark mode shows elevation through
        surface colour instead.
      </p>
      {sorted.map((token) => (
        <SpecRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description={SHADOW_DESCRIPTIONS[token.step] ?? ''}
          preview={
            <div
              style={{
                width: 56,
                height: 56,
                margin: '0 12px',
                background: 'var(--pepper-color-bg-surface-primary)',
                borderRadius: 8,
                boxShadow: `var(${token.name})`,
              }}
            />
          }
        />
      ))}
    </div>
  );
}

function FocusRingShowcase() {
  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Focus Ring</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        A single, scalable focus pattern so any component that needs a focus state can use it,
        rather than each component defining its own.
      </p>
      {FOCUS_RINGS.map((ring) => (
        <SpecRow
          key={ring.tokenName}
          step={ring.step}
          value={resolvedValue(ring.tokenName)}
          tokenName={ring.tokenName}
          description={ring.description}
          preview={
            <div
              style={{
                width: 56,
                height: 56,
                margin: '0 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background:
                  ring.step === 'inverse' ? 'var(--pepper-color-bg-surface-inverse-primary)' : 'var(--pepper-color-bg-surface-primary)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--pepper-color-bg-surface-brand-primary)',
                  boxShadow: `var(${ring.tokenName})`,
                }}
              />
            </div>
          }
        />
      ))}
    </div>
  );
}

function BlurShowcase() {
  const tokens = useMemo(() => listTokens('--pepper-blur-'), []);
  const sorted = useMemo(
    () =>
      [...tokens]
        .map((t) => ({ ...t, step: stepFromName(t.name, '--pepper-blur-') }))
        .sort((a, b) => stepSortValue(BLUR_ORDER, a.step) - stepSortValue(BLUR_ORDER, b.step)),
    [tokens],
  );

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Blur</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Background blur (<code>backdrop-filter</code>) for glass and frosted-overlay effects — the
        preview shows a translucent panel over a busy background, not a blurred swatch.
      </p>
      {sorted.map((token) => (
        <SpecRow
          key={token.name}
          step={token.step}
          value={token.value}
          tokenName={token.name}
          description={BLUR_DESCRIPTIONS[token.step] ?? ''}
          preview={
            <div
              style={{
                width: 56,
                height: 56,
                margin: '0 12px',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                background:
                  'repeating-linear-gradient(45deg, var(--pepper-core-color-brand-primary-blue-400) 0 8px, var(--pepper-core-color-system-orange-400) 8px 16px, var(--pepper-core-color-system-green-500) 16px 24px)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 8,
                  borderRadius: 6,
                  background: 'var(--pepper-color-static-effect-glass-inverse-primary-medium, rgba(255,255,255,0.4))',
                  backdropFilter: `var(${token.name})`,
                }}
              />
            </div>
          }
        />
      ))}
    </div>
  );
}

export default {
  title: 'Foundations/Effects',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Shadow = {
  render: () => <ShadowShowcase />,
};

export const FocusRing = {
  render: () => <FocusRingShowcase />,
};

export const Blur = {
  render: () => <BlurShowcase />,
};

// Unrelated to the Bell "Effects" board — kept from the earlier pilot as-is.
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
