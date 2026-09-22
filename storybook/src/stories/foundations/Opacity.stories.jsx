import { useMemo } from 'react';
import { listTokens, groupOpacityRamps, splitFamilyAnchor, stepSortValue } from '../../utils/tokens';
import { ColorRamp } from '../../components/ColorRampUI';

// Matches the family order on the "Colors: Primitives" page in Bell — only
// families that actually have a curated opacity anchor show up here.
const OPACITY_FAMILY_ORDER = [
  'brand-primary-blue',
  'brand-crypto-orange',
  'brand-secondary-cyan',
  'midnight',
  'neutral',
  'system-green',
  'system-orange',
  'system-red',
];

function anchorTitle(key) {
  return key.split('-').join(' / ');
}

function orderRampKeys(keys) {
  return [...keys].sort((a, b) => {
    const anchorA = splitFamilyAnchor(a);
    const anchorB = splitFamilyAnchor(b);
    const familyIndexA = OPACITY_FAMILY_ORDER.indexOf(anchorA.family);
    const familyIndexB = OPACITY_FAMILY_ORDER.indexOf(anchorB.family);
    if (familyIndexA !== familyIndexB) {
      if (familyIndexA === -1) return 1;
      if (familyIndexB === -1) return -1;
      return familyIndexA - familyIndexB;
    }
    return stepSortValue(anchorA.anchor) - stepSortValue(anchorB.anchor);
  });
}

function OpacityRamps() {
  const tokens = useMemo(() => listTokens('--pepper-core-opacity-color-'), []);
  const ramps = useMemo(() => groupOpacityRamps(tokens, '--pepper-core-opacity-color-'), [tokens]);
  const order = useMemo(() => orderRampKeys(ramps.keys()), [ramps]);

  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Opacities</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        Raw opacity scales for the colour anchors used most often as translucent surfaces, overlays,
        and states — the building blocks behind every semantic token. Don't reference these directly
        in product code; use the semantic tokens instead.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24 }}>
        {order.map((key) => {
          const sorted = [...ramps.get(key)].sort((a, b) => a.pct - b.pct);
          return (
            <ColorRamp key={key} title={anchorTitle(key)} tokens={sorted} labelFor={(t) => `${t.pct}%`} />
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

export const Opacities = {
  render: () => <OpacityRamps />,
};
