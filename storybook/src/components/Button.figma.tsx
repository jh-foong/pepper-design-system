import React from 'react';
import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Links the Habanero "Button / Standard Button" master component
 * (file ASQlBKQihYPIRGnZEgGQWg, node 6557:510743) to this repo's real
 * Button implementation, so Figma's Dev Mode inspect panel shows the
 * actual code instead of a guess.
 *
 * Not mapped:
 * - "State" (Default/Hover/Focused/Disabled/Loading) — Hover/Focused
 *   are pointer-driven CSS, not props, per the component's own Figma
 *   spec ("Do not set state manually"). Disabled/Loading are real props
 *   in code, but Code Connect can only map one Figma property to one
 *   code prop, and State would need to fan out to two — left unmapped
 *   rather than guessed.
 * - "Shape" (pill/square) — not exposed as a variant property on this
 *   node; Square appears to live on a different component. Revisit once
 *   that node is confirmed.
 */
figma.connect(
  Button,
  'https://www.figma.com/design/ASQlBKQihYPIRGnZEgGQWg/?node-id=6557-510743',
  {
    props: {
      style: figma.enum('Style', {
        Brand: 'brand',
        'Brand: Secondary': 'brand-secondary',
        'Brand: Crypto': 'brand-crypto',
        Tonal: 'tonal',
        Outline: 'outline',
        'Outline: Brand': 'outline-brand',
        'Empty (Ghost)': 'ghost',
        Positive: 'positive',
        Negative: 'negative',
      }),
      size: figma.enum('Size', {
        'xs (24px)': 'xs',
        'sm (32px)': 'sm',
        'md (40px)': 'md',
        'lg (48px)': 'lg',
        'xl (56px)': 'xl',
      }),
      // iconLeft/iconRight take any ReactNode — this repo has no shared
      // Icon component yet, so swap in your own icon element here.
      iconLeft: figma.boolean('Icon-L', {
        true: <YourIcon />,
        false: undefined,
      }),
      iconRight: figma.boolean('Icon-R', {
        true: <YourIcon />,
        false: undefined,
      }),
    },
    example: ({ style, size, iconLeft, iconRight }) => (
      <Button style={style} size={size} iconLeft={iconLeft} iconRight={iconRight}>
        Button
      </Button>
    ),
  },
);
