import { useMemo, useState } from 'react';
import { listTokens, groupPrimitives } from '../../utils/tokens';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";

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

// Matches the curated family order on the "Colors: Primitives" page in Bell
// (Figma node 40001040:1549) — anything not listed falls back to the end,
// alphabetically, so a new family never disappears, just lands out of order.
const PRIMITIVE_FAMILY_ORDER = [
  'brand-primary-blue',
  'brand-crypto-orange',
  'brand-secondary-cyan',
  'midnight',
  'neutral',
  'system-green',
  'system-orange',
  'system-red',
  'decorative-lime',
  'decorative-magenta',
  'decorative-turquoise',
  'decorative-violet',
  'decorative-yellow',
];

function orderFamilies(families) {
  const known = PRIMITIVE_FAMILY_ORDER.filter((f) => families.has(f));
  const rest = [...families.keys()].filter((f) => !PRIMITIVE_FAMILY_ORDER.includes(f)).sort();
  return [...known, ...rest];
}

function familyDisplayName(family) {
  return family.split('-').join(' / ');
}

function stepOf(name) {
  const match = name.match(/-(\d+|white|black)(?:-opacity)?$/);
  return match ? match[1] : name;
}

// white sorts lighter than every numbered step, black sorts darker than all of them.
function stepSortValue(step) {
  if (step === 'white') return -1;
  if (step === 'black') return Infinity;
  return Number(step);
}

// Ramp presentation, styled after the Atlassian Design System's color
// palette page (atlassian.design/foundations/color/color-palette) — a
// continuous stack of full-width ramp bars per family, step name on top in
// auto-contrast text. Click a bar to reveal Hex/RGB/Token copy actions;
// hover any one for a "Copy to clipboard" tooltip, click to copy.
function hexToRgb(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function contrastTextColor(hex) {
  if (!hex?.startsWith('#') || hex.length < 7) return '#000';
  const c = hex.replace('#', '');
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [0, 2, 4].map((i) => lin(parseInt(c.substring(i, i + 2), 16) / 255));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? '#000' : '#fff';
}

function CopyIcon({ color }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

// Custom tooltip (not the native `title` attribute) so it can switch its own
// text to "Copied" right after the click, the way Atlassian's copy buttons do.
function CopyLabel({ text, value, color }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard unavailable (e.g. insecure context) — tooltip still told them what it does
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <span
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      {text}
      {(hovered || copied) && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 6,
            background: '#1a1a1a',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 11,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {copied ? 'Copied' : `Copy '${value}' to clipboard`}
        </span>
      )}
    </span>
  );
}

function RampBar({ token, isFirst, isLast }) {
  const [revealed, setRevealed] = useState(false);
  const textColor = contrastTextColor(token.value);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setRevealed((r) => !r)}
      onKeyDown={(e) => e.key === 'Enter' && setRevealed((r) => !r)}
      style={{
        background: `var(${token.name})`,
        color: textColor,
        padding: '10px 12px',
        fontSize: 13,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        // corners rounded per-bar, not via a clipped wrapper — a wrapper with
        // overflow:hidden would cut off the copy tooltips popping out of it
        borderTopLeftRadius: isFirst ? 8 : 0,
        borderTopRightRadius: isFirst ? 8 : 0,
        borderBottomLeftRadius: isLast ? 8 : 0,
        borderBottomRightRadius: isLast ? 8 : 0,
      }}
    >
      <span>{stepOf(token.name)}</span>
      {revealed && (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: CODE_FONT }}>
          <CopyLabel text="Hex" value={token.value} />
          <CopyIcon color={textColor} />
          <CopyLabel text="RGB" value={hexToRgb(token.value)} />
          <CopyIcon color={textColor} />
          <CopyLabel text="Token" value={token.name} />
        </span>
      )}
    </div>
  );
}

function ColorRamp({ family, tokens }) {
  const sorted = useMemo(
    () => [...tokens].sort((a, b) => stepSortValue(stepOf(a.name)) - stepSortValue(stepOf(b.name))),
    [tokens],
  );
  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{familyDisplayName(family)}</p>
      <div>
        {sorted.map((t, i) => (
          <RampBar key={t.name} token={t} isFirst={i === 0} isLast={i === sorted.length - 1} />
        ))}
      </div>
    </div>
  );
}

function PrimitiveRamps() {
  const tokens = useMemo(
    () => listTokens('--pepper-core-color-').filter((t) => !t.name.includes('opacity')),
    [],
  );
  const families = useMemo(() => groupPrimitives(tokens, '--pepper-core-color-'), [tokens]);
  const order = useMemo(() => orderFamilies(families), [families]);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Primitives</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Raw palette scales — the building blocks behind every semantic token. Don't reference these
        directly in product code; use the semantic tokens instead.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
        {order.map((family) => (
          <ColorRamp key={family} family={family} tokens={families.get(family)} />
        ))}
      </div>
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
  render: () => <PrimitiveRamps />,
};
