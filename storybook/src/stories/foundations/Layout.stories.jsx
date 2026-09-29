import { Fragment, useMemo } from 'react';
import { resolvedValue, resolvedValueForBreakpoint } from '../../utils/tokens';
import { CopyLabel, CopyIcon } from '../../components/ColorRampUI';

const CODE_FONT = "'SF Mono', 'Roboto Mono', ui-monospace, monospace";
const BREAKPOINTS = ['desktop', 'tablet', 'mobile'];

// All copy on this page (descriptions, table headings, guidance text) is
// taken verbatim from the Bell "Layout Grid & Responsive Spacing" board
// (node 40001649:2048) — checked against Figma's live bound variables first.
// Every Desktop/Tablet/Mobile value below was cross-checked one-by-one
// against the board's own "Variables · Responsive" table and matches
// tokens/css/base/space.css exactly (no drift found).
const GRID_STYLES = [
  { breakpoint: 'Desktop', columns: 12, gutter: '20px', margin: '80px', anchorWidth: '1440px', anchorHeight: '900px' },
  { breakpoint: 'Tablet', columns: 8, gutter: '20px', margin: '40px', anchorWidth: '768px', anchorHeight: '1024px' },
  { breakpoint: 'Mobile', columns: 4, gutter: '8px', margin: '20px', anchorWidth: '375px', anchorHeight: '812px' },
];

const LAYOUT_TOKENS = [
  {
    step: 'Gutter',
    tokenName: '--pepper-space-theme-spacing-layout-gutter',
    description: 'Space between columns in the grid, used when content sits side by side.',
  },
  {
    step: 'Gutter / Stack / SM',
    tokenName: '--pepper-space-theme-spacing-layout-gutter-stack-sm',
    description: 'Replaces the gutter with vertical spacing when small modules or cards stack instead of sitting side by side.',
  },
  {
    step: 'Gutter / Stack / MD',
    tokenName: '--pepper-space-theme-spacing-layout-gutter-stack-md',
    description: 'Replaces the gutter with vertical spacing when medium modules stack instead of sitting side by side.',
  },
  {
    step: 'Gutter / Stack / LG',
    tokenName: '--pepper-space-theme-spacing-layout-gutter-stack-lg',
    description: 'Replaces the gutter with vertical spacing when large modules stack instead of sitting side by side.',
  },
  {
    step: 'Margin',
    tokenName: '--pepper-space-theme-spacing-layout-margin',
    description: 'Space between page content and the left and right edge of the viewport.',
  },
  {
    step: 'Pad',
    tokenName: '--pepper-space-theme-spacing-layout-pad',
    description: 'Vertical padding above and below a full-width page section.',
  },
  {
    step: 'Gap / MD',
    tokenName: '--pepper-space-theme-spacing-layout-gap-md',
    description: "Space between related layout blocks that aren't full sections.",
  },
  {
    step: 'Gap / LG',
    tokenName: '--pepper-space-theme-spacing-layout-gap-lg',
    description: 'Space between major sections or modules on a page.',
  },
];

const CONTENT_TOKENS = [
  {
    step: 'Pad / SM',
    tokenName: '--pepper-space-theme-spacing-content-pad-sm',
    description: 'Internal padding for small or compact containers.',
  },
  {
    step: 'Pad / MD',
    tokenName: '--pepper-space-theme-spacing-content-pad-md',
    description: 'Internal padding for medium containers, such as a standard card.',
  },
  {
    step: 'Pad / LG',
    tokenName: '--pepper-space-theme-spacing-content-pad-lg',
    description: 'Internal padding for large containers, such as a hero card or full-width panel.',
  },
  {
    step: 'Gap / XS',
    tokenName: '--pepper-space-theme-spacing-content-gap-xs',
    description: 'The tightest spacing, for closely related elements like an icon next to a label.',
  },
  {
    step: 'Gap / SM',
    tokenName: '--pepper-space-theme-spacing-content-gap-sm',
    description: 'Space between internal elements in a small or compact container.',
  },
  {
    step: 'Gap / MD',
    tokenName: '--pepper-space-theme-spacing-content-gap-md',
    description: "Space between internal elements in a medium container, such as a card's title and body text.",
  },
  {
    step: 'Gap / LG',
    tokenName: '--pepper-space-theme-spacing-content-gap-lg',
    description: 'Space between internal elements in a large container, such as a heading and its supporting content.',
  },
];

const SITUATIONS = [
  {
    situation: "Padding inside a container (its own inset)",
    whatToDo: 'Start with the size that matches the container, but size it up or down if that reads better. The name is a suggestion, not a requirement.',
  },
  {
    situation: 'Spacing between two things inside a container (a label and a button, an icon and text)',
    whatToDo: 'Use a content-gap token (lg / md / sm) instead. These describe the relationship between elements, not the container, so the same one works at any container size.',
  },
  {
    situation: 'Something needs to look identical at every screen size',
    whatToDo: 'Skip responsive tokens for it and use a fixed value instead. Responsive tokens exist specifically to change per breakpoint.',
  },
  {
    situation: "A component's spacing looks like an exception to all of this",
    whatToDo: "Check that component's own spec first. Some, like a heavier callout banner, have deliberately different padding by design, not by mistake.",
  },
];

function TokenRow({ step, tokenName, description }) {
  const values = useMemo(
    () => BREAKPOINTS.map((bp) => resolvedValueForBreakpoint(tokenName, bp)),
    [tokenName],
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 70px 70px 70px 1fr auto',
        gap: 16,
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      <div style={{ font: 'var(--pepper-typography-label-sm)' }}>{step}</div>
      {values.map((v, i) => (
        <div key={BREAKPOINTS[i]} style={{ fontFamily: CODE_FONT, fontSize: 12 }}>
          {v}
        </div>
      ))}
      <div style={{ font: 'var(--pepper-typography-body-sm)', color: 'var(--pepper-color-fg-text-secondary)' }}>
        {description}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: CODE_FONT, fontSize: 12 }}>
        <CopyLabel text="Token" value={tokenName} />
        <CopyIcon color="#0a0a0a" />
      </div>
    </div>
  );
}

function TokenTable({ title, rows }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h4 style={{ font: 'var(--pepper-typography-heading-h4, var(--pepper-typography-label-lg))', margin: '0 0 12px' }}>{title}</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 70px 70px 70px 1fr auto',
          gap: 16,
          padding: '0 0 8px',
          borderBottom: '1px solid var(--pepper-color-fg-stroke-subtle)',
          font: 'var(--pepper-typography-label-sm)',
          color: 'var(--pepper-color-fg-text-secondary)',
          textTransform: 'uppercase',
          fontSize: 11,
        }}
      >
        <div>Token</div>
        <div>Desktop</div>
        <div>Tablet</div>
        <div>Mobile</div>
        <div>Description</div>
        <div />
      </div>
      {rows.map((row) => (
        <TokenRow key={row.tokenName} {...row} />
      ))}
    </div>
  );
}

function GridStyleTable() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '110px 90px 90px 90px 100px 110px 110px',
        gap: 16,
        marginBottom: 32,
      }}
    >
      {['Grid style', 'Columns', 'Gutter', 'Margin', 'Alignment', 'Anchor width', 'Anchor height'].map((h) => (
        <div
          key={h}
          style={{
            font: 'var(--pepper-typography-label-sm)',
            color: 'var(--pepper-color-fg-text-secondary)',
            textTransform: 'uppercase',
            fontSize: 11,
            borderBottom: '1px solid var(--pepper-color-fg-stroke-subtle)',
            paddingBottom: 8,
          }}
        >
          {h}
        </div>
      ))}
      {GRID_STYLES.map((g) => (
        <Fragment key={g.breakpoint}>
          <div style={{ font: 'var(--pepper-typography-body-sm)', padding: '8px 0' }}>{g.breakpoint}</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 12, padding: '8px 0' }}>{g.columns}</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 12, padding: '8px 0' }}>{g.gutter}</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 12, padding: '8px 0' }}>{g.margin}</div>
          <div style={{ font: 'var(--pepper-typography-body-sm)', padding: '8px 0' }}>Stretch</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 12, padding: '8px 0' }}>{g.anchorWidth}</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 12, padding: '8px 0' }}>{g.anchorHeight}</div>
        </Fragment>
      ))}
    </div>
  );
}

function GridDiagram({ breakpoint, label }) {
  const viewportWidth = parseFloat(resolvedValue(`--pepper-core-size-canvas-viewport-width-${breakpoint}`));
  const columns = parseInt(resolvedValue(`--pepper-core-size-canvas-columns-${breakpoint}`), 10);
  const margin = resolvedValueForBreakpoint('--pepper-space-theme-spacing-layout-margin', breakpoint);
  const gutter = resolvedValueForBreakpoint('--pepper-space-theme-spacing-layout-gutter', breakpoint);
  const scale = 1 / 5;

  return (
    <div style={{ flex: '0 0 auto' }}>
      <div style={{ font: 'var(--pepper-typography-label-sm)', marginBottom: 12 }}>{label}</div>
      <div
        style={{
          width: viewportWidth * scale,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `calc(${gutter} * ${scale})`,
          padding: `0 calc(${margin} * ${scale})`,
          height: 160,
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} style={{ height: 160, background: 'var(--pepper-color-bg-surface-brand-subtle)', borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: 'var(--pepper-color-fg-text-secondary)' }}>
          Margin · {margin}
        </div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: 'var(--pepper-color-fg-text-secondary)' }}>
          Gutter · {gutter}
        </div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: 'var(--pepper-color-fg-text-secondary)' }}>
          Column · {columns} stretch
        </div>
      </div>
    </div>
  );
}

function BreakpointsShowcase() {
  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>Layout: Breakpoints</h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 24px' }}>
        A spacing system simplifies the creation of page layouts and UI. Figma layout grid styles
        (Desktop / Tablet / Mobile) carry no bound variables of their own — column, gutter and
        margin values shown here are cross-referenced against the Responsive variable collection
        and match the live grid styles defined in Figma.
      </p>
      <GridStyleTable />
      <p style={{ font: 'var(--pepper-typography-body-sm)', color: 'var(--pepper-color-fg-text-secondary)', margin: '0 0 24px' }}>
        Visual breakdown of margin, gutter and column proportions at each breakpoint. Each diagram
        uses the same scale, preserving each breakpoint's own real-world ratio between margin,
        gutter and column.
      </p>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <GridDiagram breakpoint="desktop" label="Desktop · 1440px viewport · 12 columns" />
        <GridDiagram breakpoint="tablet" label="Tablet · 768px viewport · 8 columns" />
        <GridDiagram breakpoint="mobile" label="Mobile · 375px viewport · 4 columns" />
      </div>
    </div>
  );
}

function SituationTable() {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: 16,
          padding: '0 0 8px',
          borderBottom: '1px solid var(--pepper-color-fg-stroke-subtle)',
          font: 'var(--pepper-typography-label-sm)',
          color: 'var(--pepper-color-fg-text-secondary)',
          textTransform: 'uppercase',
          fontSize: 11,
        }}
      >
        <div>Situation</div>
        <div>What to do</div>
      </div>
      {SITUATIONS.map((s) => (
        <div
          key={s.situation}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
            gap: 16,
            padding: '16px 0',
            borderBottom: '1px solid #eee',
            font: 'var(--pepper-typography-body-sm)',
          }}
        >
          <div>{s.situation}</div>
          <div style={{ color: 'var(--pepper-color-fg-text-secondary)' }}>{s.whatToDo}</div>
        </div>
      ))}
    </div>
  );
}

function ResponsiveSpacingShowcase() {
  return (
    <div>
      <h3 style={{ font: 'var(--pepper-typography-heading-h3)', margin: '0 0 8px' }}>
        Responsive spacing tokens are guidelines, not hard rules
      </h3>
      <p style={{ font: 'var(--pepper-typography-body-md)', margin: '0 0 8px' }}>
        Theme Spacing — how padding and gap tokens actually get applied. When using theme padding
        and gap tokens, keep in mind you are applying this per breakpoint. Therefore the general
        rule is to use it for larger canvases and contexts (such as layouts) and not within
        components. The sizing options are just a starting point, not a strict rule: a large
        container can use md padding if that's what looks right, and a small one isn't locked out
        of using lg.
      </p>
      <SituationTable />
      <p style={{ font: 'var(--pepper-typography-body-sm)', color: 'var(--pepper-color-fg-text-secondary)', margin: '0 0 24px' }}>
        These tokens describe a feel across breakpoints, not an exact pixel match, so swapping a
        size when it looks better is expected behaviour, not a hack.
      </p>
      <div
        style={{
          marginBottom: 32,
          padding: 16,
          background: 'var(--pepper-color-bg-surface-accent-tonal-subtle)',
          borderRadius: 8,
        }}
      >
        <div style={{ font: 'var(--pepper-typography-label-md)', marginBottom: 8 }}>
          Need spacing that doesn't change by breakpoint?
        </div>
        <div style={{ font: 'var(--pepper-typography-body-sm)', color: 'var(--pepper-color-fg-text-secondary)' }}>
          Reach for a gap or inset token instead of theme spacing. Gap tokens describe the space
          between two elements; inset tokens describe the padding inside a single component.
          Neither belongs to the responsive system, so the value stays exactly the same on every
          breakpoint.
        </div>
      </div>

      <TokenTable title="Layout" rows={LAYOUT_TOKENS} />
      <TokenTable title="Content" rows={CONTENT_TOKENS} />
    </div>
  );
}

export default {
  title: 'Foundations/Layout',
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
};

export const Breakpoints = {
  render: () => <BreakpointsShowcase />,
};

export const ResponsiveSpacing = {
  render: () => <ResponsiveSpacingShowcase />,
};
