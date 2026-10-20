import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t}from"./iframe-DZ8LDsA2.js";import{i as n,n as r,r as i,t as a}from"./Button-CPSy7v1L.js";function o(){return(0,s.jsx)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 20 20`,fill:`none`,children:(0,s.jsx)(`path`,{d:`M10 4v12M4 10h12`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})})}var s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),s=t(),c={brand:`Brand`,"brand-secondary":`Brand: Secondary`,"brand-crypto":`Brand: Crypto`,tonal:`Tonal`,outline:`Outline`,"outline-brand":`Outline: Brand`,ghost:`Empty (Ghost)`,positive:`Positive`,negative:`Negative`},l={title:`Components/Button`,component:i,tags:[`ai-generated`,`autodocs`],parameters:{layout:`padded`},argTypes:{style:{control:`select`,options:r,description:`Visual style. Brand = primary action, one per screen. See the usage notes below each example for the rest.`},size:{control:`radio`,options:a,description:`xs = dense UI, sm = compact toolbar actions, md = default for web, lg = default for mobile / primary CTA, xl = marketing/hero only (never inside product UI).`},shape:{control:`radio`,options:[`pill`,`square`],description:`Default (pill) for marketing/consumer UI; Square for trading dashboards and data-dense, enterprise UI. Match the shape of everything else on the same surface — don't mix.`},children:{control:`text`,name:`Label`},disabled:{control:`boolean`},loading:{control:`boolean`},iconLeft:{table:{disable:!0}},iconRight:{table:{disable:!0}}},args:{style:`brand`,size:`md`,shape:`pill`,children:`Button`,disabled:!1,loading:!1}},u={render:e=>(0,s.jsx)(i,{...e})},d={args:{children:`Add to watchlist`},render:e=>(0,s.jsx)(i,{...e,iconLeft:(0,s.jsx)(o,{}),children:e.children})},f={parameters:{controls:{disable:!0}},render:()=>(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:[`All 9 styles at md (40px), pill shape. `,(0,s.jsx)(`strong`,{children:`Brand`}),` is the primary action — use once per screen. `,(0,s.jsx)(`strong`,{children:`Positive`}),` / `,(0,s.jsx)(`strong`,{children:`Negative`}),` are for trading contexts (buy/sell) and destructive actions — pair them together, don't use for low-stakes actions.`]}),(0,s.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:r.map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,s.jsx)(i,{style:e,children:c[e]}),(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-xs)`,color:`var(--pepper-color-fg-text-secondary)`},children:c[e]})]},e))})]})},p={parameters:{controls:{disable:!0}},render:()=>(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:[`All 5 sizes, Brand style, pill shape. Match size to platform: `,(0,s.jsx)(`strong`,{children:`md`}),` default for web,`,` `,(0,s.jsx)(`strong`,{children:`lg`}),` default for mobile / primary CTA, `,(0,s.jsx)(`strong`,{children:`xl`}),` marketing/hero only — never inside product UI, `,(0,s.jsx)(`strong`,{children:`xs`}),` for dense UI (data tables, sidebars, filter bars).`]}),(0,s.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:16},children:a.map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,s.jsx)(i,{size:e,children:`Button`}),(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-xs)`,color:`var(--pepper-color-fg-text-secondary)`},children:e})]},e))})]})},m={parameters:{controls:{disable:!0}},render:()=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:`Shape is set once per surface, not per button — pill for marketing/consumer/general UI, square for trading dashboards and data-dense, enterprise UI. Square's radius scales with size: 8px for md/lg/xl, 4px for xs/sm.`}),(0,s.jsx)(`div`,{style:{display:`flex`,gap:32},children:[`pill`,`square`].map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-sm)`,textTransform:`capitalize`},children:e}),(0,s.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12},children:a.map(t=>(0,s.jsx)(i,{shape:e,size:t,children:t},t))})]},e))})]})},h={parameters:{controls:{disable:!0}},render:()=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:`Hover and Focused aren't shown here since they're purely interaction-driven (try tabbing to or hovering the Playground button above) — per the component's own Figma spec, state is never set manually. Disabled and Loading are genuine props since they're app-driven, not pointer-driven.`}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,s.jsx)(i,{children:`Default`}),(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-xs)`,color:`var(--pepper-color-fg-text-secondary)`},children:`Default`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,s.jsx)(i,{disabled:!0,children:`Disabled`}),(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-xs)`,color:`var(--pepper-color-fg-text-secondary)`},children:`Disabled`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,s.jsx)(i,{loading:!0,children:`Loading`}),(0,s.jsx)(`span`,{style:{font:`var(--pepper-typography-label-xs)`,color:`var(--pepper-color-fg-text-secondary)`},children:`Loading`})]})]})]})},g=[`Playground`,`WithIcons`,`AllStyles`,`AllSizes`,`Shape`,`States`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <Button {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Add to watchlist'
  },
  render: args => <Button {...args} iconLeft={<PlusIcon />}>
      {args.children}
    </Button>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div>
      <p style={{
      font: 'var(--pepper-typography-body-md)',
      margin: '0 0 24px'
    }}>
        All 9 styles at md (40px), pill shape. <strong>Brand</strong> is the primary action — use once per
        screen. <strong>Positive</strong> / <strong>Negative</strong> are for trading contexts (buy/sell) and
        destructive actions — pair them together, don't use for low-stakes actions.
      </p>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16
    }}>
        {BUTTON_STYLES.map(style => <div key={style} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
            <Button style={style}>{STYLE_LABELS[style]}</Button>
            <span style={{
          font: 'var(--pepper-typography-label-xs)',
          color: 'var(--pepper-color-fg-text-secondary)'
        }}>
              {STYLE_LABELS[style]}
            </span>
          </div>)}
      </div>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div>
      <p style={{
      font: 'var(--pepper-typography-body-md)',
      margin: '0 0 24px'
    }}>
        All 5 sizes, Brand style, pill shape. Match size to platform: <strong>md</strong> default for web,{' '}
        <strong>lg</strong> default for mobile / primary CTA, <strong>xl</strong> marketing/hero only — never
        inside product UI, <strong>xs</strong> for dense UI (data tables, sidebars, filter bars).
      </p>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 16
    }}>
        {BUTTON_SIZES.map(size => <div key={size} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
            <Button size={size}>Button</Button>
            <span style={{
          font: 'var(--pepper-typography-label-xs)',
          color: 'var(--pepper-color-fg-text-secondary)'
        }}>
              {size}
            </span>
          </div>)}
      </div>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div>
      <p style={{
      font: 'var(--pepper-typography-body-md)',
      margin: '0 0 24px'
    }}>
        Shape is set once per surface, not per button — pill for marketing/consumer/general UI, square for
        trading dashboards and data-dense, enterprise UI. Square's radius scales with size: 8px for md/lg/xl,
        4px for xs/sm.
      </p>
      <div style={{
      display: 'flex',
      gap: 32
    }}>
        {['pill', 'square'].map(shape => <div key={shape} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
            <span style={{
          font: 'var(--pepper-typography-label-sm)',
          textTransform: 'capitalize'
        }}>{shape}</span>
            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
              {BUTTON_SIZES.map(size => <Button key={size} shape={shape} size={size}>
                  {size}
                </Button>)}
            </div>
          </div>)}
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div>
      <p style={{
      font: 'var(--pepper-typography-body-md)',
      margin: '0 0 24px'
    }}>
        Hover and Focused aren't shown here since they're purely interaction-driven (try tabbing to or
        hovering the Playground button above) — per the component's own Figma spec, state is never set
        manually. Disabled and Loading are genuine props since they're app-driven, not pointer-driven.
      </p>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16
    }}>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
          <Button>Default</Button>
          <span style={{
          font: 'var(--pepper-typography-label-xs)',
          color: 'var(--pepper-color-fg-text-secondary)'
        }}>
            Default
          </span>
        </div>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
          <Button disabled>Disabled</Button>
          <span style={{
          font: 'var(--pepper-typography-label-xs)',
          color: 'var(--pepper-color-fg-text-secondary)'
        }}>
            Disabled
          </span>
        </div>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
          <Button loading>Loading</Button>
          <span style={{
          font: 'var(--pepper-typography-label-xs)',
          color: 'var(--pepper-color-fg-text-secondary)'
        }}>
            Loading
          </span>
        </div>
      </div>
    </div>
}`,...h.parameters?.docs?.source}}}})))()}_();export{p as AllSizes,f as AllStyles,u as Playground,m as Shape,h as States,d as WithIcons,g as __namedExportsOrder,l as default};