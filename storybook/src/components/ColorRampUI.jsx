import { useState } from 'react';

/**
 * Shared ramp presentation, styled after the Atlassian Design System's color
 * palette page (atlassian.design/foundations/color/color-palette) — a
 * continuous stack of full-width bars per group. Hover (or keyboard-focus) a
 * bar to reveal Hex/RGB/Token copy actions; hover any one of those for a
 * "Copy to clipboard" tooltip, click to copy. Used by both the Primitives
 * and Opacities stories.
 */

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";

export function hexToRgb(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// Opacity ramp bars render an 8-digit #RRGGBBAA straight over the story's
// page background — a low-alpha swatch reads as close to that background no
// matter how dark or light its base colour is, so contrast must be judged on
// the colour actually composited over the CURRENT page background (which
// flips between light and dark with the theme toggle), not a hardcoded one.
function resolvedPageBackground() {
  if (typeof document === 'undefined') return [255, 255, 255];
  const match = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g);
  if (!match || match.length < 3) return [255, 255, 255];
  return match.slice(0, 3).map(Number);
}

export function contrastTextColor(hex) {
  if (!hex?.startsWith('#') || hex.length < 7) return '#000';
  const c = hex.replace('#', '');
  const alpha = c.length >= 8 ? parseInt(c.substring(6, 8), 16) / 255 : 1;
  const bg = resolvedPageBackground();
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [0, 2, 4].map((i, idx) => {
    const channel = parseInt(c.substring(i, i + 2), 16);
    const composited = alpha * channel + (1 - alpha) * bg[idx];
    return lin(composited / 255);
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.4 ? '#000' : '#fff';
}

export function CopyIcon({ color }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

// Custom tooltip (not the native `title` attribute) so it can switch its own
// text to "Copied" right after the click, the way Atlassian's copy buttons do.
export function CopyLabel({ text, value }) {
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

/** One row of a ramp. `label` is the left-hand text (a step number, "white", or a percentage). */
export function RampBar({ token, label, isFirst, isLast }) {
  const [revealed, setRevealed] = useState(false);
  const textColor = contrastTextColor(token.value);
  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={() => setRevealed(false)}
      style={{
        background: `var(${token.name})`,
        color: textColor,
        padding: '10px 12px',
        fontSize: 13,
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
      <span>{label}</span>
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

/** A titled stack of RampBars. `tokens` must already be sorted; `labelFor` maps a token to its row label. */
export function ColorRamp({ title, tokens, labelFor }) {
  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{title}</p>
      <div>
        {tokens.map((t, i) => (
          <RampBar key={t.name} token={t} label={labelFor(t)} isFirst={i === 0} isLast={i === tokens.length - 1} />
        ))}
      </div>
    </div>
  );
}
