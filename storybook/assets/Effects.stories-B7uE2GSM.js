import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,y as n}from"./iframe-aE7QMgyK.js";import{c as r,l as i}from"./ColorRampUI-DkFyF4p2.js";import{n as a,t as o}from"./SpecRow-C-kQI5Jy.js";function s(e,t){return e.replace(t,``)}function c(e,t){let n=e.indexOf(t);return n===-1?e.length:n}function l(){let e=(0,f.useMemo)(()=>r(`--pepper-shadow-`).filter(e=>!e.name.includes(`offset`)),[]),t=(0,f.useMemo)(()=>[...e].map(e=>({...e,step:s(e.name,`--pepper-shadow-`)})).filter(e=>m.includes(e.step)).sort((e,t)=>c(m,e.step)-c(m,t.step)),[e]);return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{style:{font:`var(--pepper-typography-heading-h3)`,margin:`0 0 8px`},children:`Shadow`}),(0,p.jsx)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:`Elevation for surfaces. Shadows deliberately don't invert in dark mode — a shadow that's dark in light mode stays that same dark colour in dark mode. Dark mode shows elevation through surface colour instead.`}),t.map(e=>(0,p.jsx)(o,{step:e.step,value:e.value,tokenName:e.name,description:h[e.step]??``,preview:(0,p.jsx)(`div`,{style:{width:56,height:56,margin:`0 12px`,background:`var(--pepper-color-bg-surface-primary)`,borderRadius:8,boxShadow:`var(${e.name})`}})},e.name))]})}function u(){return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{style:{font:`var(--pepper-typography-heading-h3)`,margin:`0 0 8px`},children:`Focus Ring`}),(0,p.jsx)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:`A single, scalable focus pattern so any component that needs a focus state can use it, rather than each component defining its own.`}),v.map(e=>(0,p.jsx)(o,{step:e.step,value:i(e.tokenName),tokenName:e.tokenName,description:e.description,preview:(0,p.jsx)(`div`,{style:{width:56,height:56,margin:`0 12px`,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:8,background:e.step===`inverse`?`var(--pepper-color-bg-surface-inverse-primary)`:`var(--pepper-color-bg-surface-primary)`},children:(0,p.jsx)(`div`,{style:{width:32,height:32,borderRadius:8,background:`var(--pepper-color-bg-surface-brand-primary)`,boxShadow:`var(${e.tokenName})`}})})},e.tokenName))]})}function d(){let e=(0,f.useMemo)(()=>r(`--pepper-blur-`),[]),t=(0,f.useMemo)(()=>[...e].map(e=>({...e,step:s(e.name,`--pepper-blur-`)})).sort((e,t)=>c(g,e.step)-c(g,t.step)),[e]);return(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`h3`,{style:{font:`var(--pepper-typography-heading-h3)`,margin:`0 0 8px`},children:`Blur`}),(0,p.jsxs)(`p`,{style:{font:`var(--pepper-typography-body-md)`,margin:`0 0 24px`},children:[`Background blur (`,(0,p.jsx)(`code`,{children:`backdrop-filter`}),`) for glass and frosted-overlay effects — the preview shows a translucent panel over a busy background, not a blurred swatch.`]}),t.map(e=>(0,p.jsx)(o,{step:e.step,value:e.value,tokenName:e.name,description:_[e.step]??``,preview:(0,p.jsx)(`div`,{style:{width:56,height:56,margin:`0 12px`,borderRadius:8,overflow:`hidden`,position:`relative`,background:`repeating-linear-gradient(45deg, var(--pepper-core-color-brand-primary-blue-400) 0 8px, var(--pepper-core-color-system-orange-400) 8px 16px, var(--pepper-core-color-system-green-500) 16px 24px)`},children:(0,p.jsx)(`div`,{style:{position:`absolute`,inset:8,borderRadius:6,background:`var(--pepper-color-static-effect-glass-inverse-primary-medium, rgba(255,255,255,0.4))`,backdropFilter:`var(${e.name})`}})})},e.name))]})}var f,p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{f=n(),a(),p=t(),m=[`xs`,`sm`,`md`,`lg`,`xl`,`2xl`],h={xs:`Hairline lift. Use on chips, badges, and input fields at rest — when an element needs the faintest sense of depth without drawing attention.`,sm:`Default surface shadow. Use on cards, buttons, and inline panels that sit slightly above the page background.`,md:`Floating UI. Use on dropdowns, tooltips, and contextual menus that pop above content.`,lg:`Elevated panel. Use on date pickers, popovers, and secondary overlays that need clear separation from the page.`,xl:`Large dialog. Use on wide overlays and multi-step modals (400–700px) that need more presence than a floating panel but aren't full drawers.`,"2xl":`Heavy lift. Use on primary modals, bottom sheets, and drawers — surfaces that demand maximum depth and focus.`},g=[`xs`,`sm`,`md`,`lg`,`xl`,`2xl`,`3xl`],_={sm:`Subtle glass — nav, chips, muted overlays.`,md:`Card backdrops, contextual panels.`,lg:`Modal/drawer backdrops.`,xl:`Heavy glass, spotlight effects.`,"2xl":`Full overlay, frosted screen.`},v=[{step:`default`,tokenName:`--pepper-shadow-focus-rings-default`,description:`The ring to use for almost every case, and the required variant unless a component specifically needs something else. Flips to its dark-mode colour automatically.`},{step:`subtle`,tokenName:`--pepper-shadow-focus-rings-subtle`,description:`Use only where a neutral ring is needed instead of blue. Also flips to its dark-mode colour automatically.`},{step:`error`,tokenName:`--pepper-shadow-focus-rings-error`,description:`Use for focus on a control that is currently in an error/invalid state.`},{step:`inverse`,tokenName:`--pepper-shadow-focus-rings-inverse`,description:`Use only in light mode, for focus on something placed on a dark surface. Not needed in dark mode, since default and subtle already switch colour there.`}],y={title:`Foundations/Effects`,tags:[`ai-generated`],parameters:{layout:`padded`}},b={render:()=>(0,p.jsx)(l,{})},x={render:()=>(0,p.jsx)(u,{})},S={render:()=>(0,p.jsx)(d,{})},C={render:()=>{let e=r(`--pepper-core-opacity-values-`);return(0,p.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(90px, 1fr))`,gap:12,padding:16},children:e.map(e=>(0,p.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,p.jsx)(`div`,{style:{width:56,height:56,borderRadius:8,margin:`0 auto 8px`,background:`var(--pepper-core-color-brand-primary-blue-400, #0064fa)`,opacity:`var(${e.name})`}}),(0,p.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11},children:e.value})]},e.name))})}},w={render:()=>{let e=r(`--pepper-gradient-`);return(0,p.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:24,padding:16},children:e.map(e=>(0,p.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,p.jsx)(`div`,{style:{width:`100%`,height:100,borderRadius:8,background:`var(${e.name})`,margin:`0 auto 12px`}}),(0,p.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:e.name})]},e.name))})}},T=[`Shadow`,`FocusRing`,`Blur`,`Opacity`,`Gradient`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <ShadowShowcase />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <FocusRingShowcase />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <BlurShowcase />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-core-opacity-values-');
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
      gap: 12,
      padding: 16
    }}>
        {tokens.map(t => <div key={t.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          margin: '0 auto 8px',
          background: 'var(--pepper-core-color-brand-primary-blue-400, #0064fa)',
          opacity: \`var(\${t.name})\`
        }} />
            <div style={{
          fontFamily: 'monospace',
          fontSize: 11
        }}>{t.value}</div>
          </div>)}
      </div>;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-gradient-');
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 24,
      padding: 16
    }}>
        {tokens.map(t => <div key={t.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          width: '100%',
          height: 100,
          borderRadius: 8,
          background: \`var(\${t.name})\`,
          margin: '0 auto 12px'
        }} />
            <div style={{
          fontFamily: 'monospace',
          fontSize: 12
        }}>{t.name}</div>
          </div>)}
      </div>;
  }
}`,...w.parameters?.docs?.source}}}})))()}E();export{S as Blur,x as FocusRing,w as Gradient,C as Opacity,b as Shadow,T as __namedExportsOrder,y as default};