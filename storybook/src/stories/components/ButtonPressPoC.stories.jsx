import { useState } from 'react';
import { Button } from '../../components/Button';
import './ButtonPressPoC.css';

/**
 * PROOF OF CONCEPT: pressed state = existing hover colour + animation.
 * Not for production. Wraps the real Button via className / onPointerDown.
 */

function RippleButton({ children, ...props }) {
  const [ripples, setRipples] = useState([]);

  const onPointerDown = (e) => {
    if (e.currentTarget.disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, size, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2 },
    ]);
    setTimeout(() => setRipples((r) => r.filter((d) => d.id !== id)), 500);
  };

  return (
    <Button {...props} className="pepper-press-poc" onPointerDown={onPointerDown}>
      {children}
      {ripples.map((d) => (
        <span
          key={d.id}
          className="pepper-press-ripple-dot"
          style={{ width: d.size, height: d.size, left: d.x, top: d.y }}
        />
      ))}
    </Button>
  );
}

const VARIANTS = [
  {
    key: 'none',
    title: '0. Today (baseline)',
    note: 'Existing Button. Hover colour only, no pressed feedback.',
    render: (p) => <Button {...p} />,
  },
  {
    key: 'scale',
    title: 'A. Scale down',
    note: 'Hover colour fades in (150ms). Pressing scales to 97%.',
    render: (p) => <Button {...p} className="pepper-press-poc pepper-press-scale" />,
  },
  {
    key: 'ripple',
    title: 'B. Ripple',
    note: 'Hover colour fades in. Pressing sends a ripple out from the click point.',
    render: (p) => <RippleButton {...p} />,
  },
  {
    key: 'both',
    title: 'C. Scale + ripple',
    note: 'Both together.',
    render: (p) => <RippleButton {...p} className="pepper-press-scale" />,
  },
];

export default {
  title: 'Prototypes/Button press animation (PoC)',
  parameters: { layout: 'padded' },
  tags: ['ai-generated'],
};

export const SideBySide = {
  render: () => (
    <div style={{ display: 'grid', gap: 32, font: 'var(--pepper-typography-body-md)' }}>
      <p style={{ margin: 0, maxWidth: 640 }}>
        Hover, then press and hold each button. Pressed reuses the existing hover colour; the animation is what
        signals the press. Try the Brand, Outline and Ghost rows, and toggle your OS "Reduce motion" setting to see
        the fallback.
      </p>
      {VARIANTS.map((v) => (
        <section key={v.key}>
          <h3 style={{ margin: 0, font: 'var(--pepper-typography-heading-h3)' }}>{v.title}</h3>
          <p style={{ margin: '4px 0 12px' }}>{v.note}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {['brand', 'outline', 'ghost', 'negative'].map((s) => (
              <span key={s}>{v.render({ style: s, children: s === 'ghost' ? 'Ghost' : s[0].toUpperCase() + s.slice(1) })}</span>
            ))}
            <span>{v.render({ style: 'brand', size: 'sm', children: 'Small' })}</span>
            <span>{v.render({ style: 'brand', size: 'xl', children: 'Extra large' })}</span>
            <span>{v.render({ style: 'brand', shape: 'square', children: 'Square' })}</span>
            <span>{v.render({ style: 'brand', disabled: true, children: 'Disabled' })}</span>
          </div>
        </section>
      ))}
    </div>
  ),
};
