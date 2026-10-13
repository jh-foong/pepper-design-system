import { useMemo } from 'react';
import { listTokens, groupPrimitives, stepOf, stepSortValue } from '../../utils/tokens';
import { ColorRamp } from '../../components/ColorRampUI';

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
        {order.map((family) => {
          const sorted = [...families.get(family)].sort(
            (a, b) => stepSortValue(stepOf(a.name)) - stepSortValue(stepOf(b.name)),
          );
          return (
            <ColorRamp
              key={family}
              title={familyDisplayName(family)}
              tokens={sorted}
              labelFor={(t) => stepOf(t.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default {
  title: 'Foundations/Color',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

// Semantic story is paused until semantic colours are ironed out — only
// Primitives and Opacities are shown for now. See git history for the
// Swatch/TokenGrid/SemanticPalette implementation to bring this back.

export const Primitives = {
  render: () => <PrimitiveRamps />,
};
