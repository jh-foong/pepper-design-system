import { forwardRef } from 'react';
import './Button.css';

/**
 * Pepper Button — built from the Habanero "Button / Standard Button" master
 * component (file ASQlBKQihYPIRGnZEgGQWg, node 6557:510743). Every size,
 * colour, and shape value below was read directly off that component's
 * bound Figma variables and generated code, not guessed:
 *   - 9 styles × 5 sizes × Default state (get_design_context on one Brand
 *     symbol per size gave the exact padding/gap/font per size; the
 *     per-style colours came from get_variable_defs on one Default symbol
 *     per style).
 *   - Disabled flattens every style to the same two tokens
 *     (bg-surface-disabled / fg-text-disabled) — confirmed by diffing a
 *     solid style (Brand) against an outlined one (Outline) at Disabled.
 *   - Shape: Default = pill (border-radius-full) at every size; Square =
 *     border-radius-md for md/lg/xl, border-radius-sm for sm/xs (from the
 *     component's own docs: "Square corner radius scales with size: 8px
 *     for xl, lg, and md; 4px for sm and xs").
 *   - Brand: Secondary's focus ring intentionally uses
 *     --pepper-shadow-focus-rings-inverse instead of -default — called out
 *     explicitly in the component's Figma documentation as a deliberate
 *     exception (the default ring doesn't have enough contrast against the
 *     brand-blue/onEmphasis backgrounds this style is normally used on).
 *
 * States (Hover, Focused, Disabled, Loading) are interaction-driven, not a
 * prop — per the component's own Figma spec: "Do not set state manually."
 * `disabled` and `loading` stay as props because they're genuinely
 * app-driven, not pointer-driven.
 */

const SIZES = {
  xs: { height: 24, paddingX: 'var(--pepper-space-inset-xs)', paddingY: 'var(--pepper-space-inset-3xs)', gap: 'var(--pepper-space-gap-3xs)', font: 'var(--pepper-typography-label-2xs)', icon: 16 },
  sm: { height: 32, paddingX: 'var(--pepper-space-inset-sm)', paddingY: 'var(--pepper-space-inset-xs)', gap: 'var(--pepper-space-gap-3xs)', font: 'var(--pepper-typography-label-xs)', icon: 16 },
  md: { height: 40, paddingX: 'var(--pepper-space-inset-md)', paddingY: 'var(--pepper-space-inset-sm)', gap: 'var(--pepper-space-gap-xs)', font: 'var(--pepper-typography-label-sm)', icon: 16 },
  lg: { height: 48, paddingX: 'var(--pepper-space-inset-xl)', paddingY: 'var(--pepper-space-inset-sm)', gap: 'var(--pepper-space-gap-xs)', font: 'var(--pepper-typography-label-sm)', icon: 20 },
  xl: { height: 56, paddingX: 'var(--pepper-space-inset-xl)', paddingY: 'var(--pepper-space-inset-md)', gap: 'var(--pepper-space-gap-xs)', font: 'var(--pepper-typography-label-md)', icon: 20 },
};

// Square-shape radius: md for md/lg/xl, sm for xs/sm (per the component's own docs).
const SQUARE_RADIUS = {
  xs: 'var(--pepper-border-radius-sm)',
  sm: 'var(--pepper-border-radius-sm)',
  md: 'var(--pepper-border-radius-md)',
  lg: 'var(--pepper-border-radius-md)',
  xl: 'var(--pepper-border-radius-md)',
};

const STYLES = {
  brand: {
    background: 'var(--pepper-color-bg-surface-brand-primary)',
    backgroundHover: 'var(--pepper-color-bg-surface-brand-primary-hover)',
    text: 'var(--pepper-color-static-text-inverse-primary)',
  },
  'brand-secondary': {
    background: 'var(--pepper-color-bg-surface-brand-secondary)',
    backgroundHover: 'var(--pepper-color-bg-surface-brand-secondary-hover)',
    text: 'var(--pepper-color-fg-text-primary)',
    focusRing: 'var(--pepper-shadow-focus-rings-inverse)',
  },
  'brand-crypto': {
    background: 'var(--pepper-color-bg-surface-brand-crypto)',
    backgroundHover: 'var(--pepper-color-bg-surface-brand-crypto-hover)',
    text: 'var(--pepper-color-static-text-inverse-primary)',
  },
  tonal: {
    background: 'var(--pepper-color-bg-surface-accent-tonal-subtle)',
    backgroundHover: 'var(--pepper-color-bg-surface-accent-tonal-subtle-hover)',
    text: 'var(--pepper-color-fg-text-primary)',
  },
  outline: {
    background: 'transparent',
    backgroundHover: 'var(--pepper-color-bg-overlay-state-hover-neutral-subtle)',
    text: 'var(--pepper-color-fg-text-primary)',
    border: 'var(--pepper-color-fg-stroke-strong)',
  },
  'outline-brand': {
    background: 'transparent',
    backgroundHover: 'var(--pepper-color-bg-surface-brand-subtle)',
    text: 'var(--pepper-color-fg-text-brand-default)',
    border: 'var(--pepper-color-fg-stroke-brand-default)',
  },
  ghost: {
    background: 'transparent',
    backgroundHover: 'var(--pepper-color-bg-overlay-state-hover-neutral-subtle)',
    text: 'var(--pepper-color-fg-text-primary)',
  },
  positive: {
    background: 'var(--pepper-color-bg-surface-positive)',
    backgroundHover: 'var(--pepper-color-bg-surface-positive-hover)',
    text: 'var(--pepper-color-static-text-inverse-primary)',
  },
  negative: {
    background: 'var(--pepper-color-bg-surface-negative)',
    backgroundHover: 'var(--pepper-color-bg-surface-negative-hover)',
    text: 'var(--pepper-color-static-text-inverse-primary)',
  },
};

function Spinner({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'pepper-button-spin 0.7s linear infinite', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const BUTTON_STYLES = Object.keys(STYLES);
export const BUTTON_SIZES = Object.keys(SIZES);

export const Button = forwardRef(function Button(
  {
    children,
    style = 'brand',
    size = 'md',
    shape = 'pill',
    iconLeft = null,
    iconRight = null,
    disabled = false,
    loading = false,
    type = 'button',
    className,
    ...rest
  },
  ref,
) {
  const styleSpec = STYLES[style] ?? STYLES.brand;
  const sizeSpec = SIZES[size] ?? SIZES.md;
  const isDisabled = disabled || loading;
  const radius = shape === 'square' ? SQUARE_RADIUS[size] : 'var(--pepper-border-radius-full)';

  return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-pepper-button
        className={className}
        style={{
          '--pepper-button-bg': styleSpec.background,
          '--pepper-button-bg-hover': styleSpec.backgroundHover,
          '--pepper-button-text': styleSpec.text,
          '--pepper-button-focus-ring': styleSpec.focusRing ?? 'var(--pepper-shadow-focus-rings-default)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sizeSpec.gap,
          height: sizeSpec.height,
          minWidth: sizeSpec.height * 2,
          padding: `${sizeSpec.paddingY} ${sizeSpec.paddingX}`,
          borderRadius: radius,
          border: `var(--pepper-border-width-stroke-xs) solid ${styleSpec.border ?? 'transparent'}`,
          font: sizeSpec.font,
          whiteSpace: 'nowrap',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          boxSizing: 'border-box',
          transition: 'background 0.1s ease',
        }}
        {...rest}
      >
        {loading ? (
          <Spinner size={sizeSpec.icon} />
        ) : (
          iconLeft && (
            <span style={{ width: sizeSpec.icon, height: sizeSpec.icon, display: 'inline-flex', flexShrink: 0 }}>{iconLeft}</span>
          )
        )}
        {children}
        {!loading && iconRight && (
          <span style={{ width: sizeSpec.icon, height: sizeSpec.icon, display: 'inline-flex', flexShrink: 0 }}>{iconRight}</span>
        )}
      </button>
  );
});
