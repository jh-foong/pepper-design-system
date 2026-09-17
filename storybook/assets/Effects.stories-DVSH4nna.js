import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,y as n}from"./iframe-CC-2YB8m.js";import{r}from"./tokens-DEg4FDa5.js";function i({name:e,value:t,style:n}){return(0,a.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16,padding:`8px 0`},children:[(0,a.jsx)(`div`,{style:{...o,...n}}),(0,a.jsxs)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:[(0,a.jsx)(`div`,{children:e}),(0,a.jsx)(`div`,{style:{opacity:.6},children:t})]})]})}var a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),a=t(),o={width:96,height:64,background:`var(--pepper-color-bg-surface-brand-primary, #0064fa)`},s={title:`Foundations/Effects`,tags:[`ai-generated`],parameters:{layout:`padded`}},c={render:()=>{let e=r(`--pepper-border-radius-`);return(0,a.jsx)(`div`,{children:e.map(e=>(0,a.jsx)(i,{...e,style:{borderRadius:e.value}},e.name))})}},l={render:()=>{let e=r(`--pepper-border-width-`);return(0,a.jsx)(`div`,{children:e.map(e=>(0,a.jsx)(i,{...e,style:{background:`transparent`,border:`${e.value} solid var(--pepper-color-fg-stroke, #333)`}},e.name))})}},u={render:()=>{let e=r(`--pepper-shadow-`).filter(e=>!e.name.includes(`offset`));return(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:32,padding:16},children:e.map(e=>(0,a.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,a.jsx)(`div`,{style:{...o,width:`100%`,borderRadius:8,boxShadow:`var(${e.name})`,margin:`0 auto 12px`}}),(0,a.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:e.name})]},e.name))})}},d={render:()=>{let e=r(`--pepper-blur-`);return(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(140px, 1fr))`,gap:24,padding:16},children:e.map(e=>(0,a.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,a.jsx)(`div`,{style:{...o,width:`100%`,borderRadius:8,filter:`var(${e.name})`,margin:`0 auto 12px`}}),(0,a.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:e.name})]},e.name))})}},f={render:()=>{let e=r(`--pepper-core-opacity-values-`);return(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(90px, 1fr))`,gap:12,padding:16},children:e.map(e=>(0,a.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,a.jsx)(`div`,{style:{width:56,height:56,borderRadius:8,margin:`0 auto 8px`,background:`var(--pepper-core-color-brand-primary-blue-400, #0064fa)`,opacity:`var(${e.name})`}}),(0,a.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11},children:e.value})]},e.name))})}},p={render:()=>{let e=r(`--pepper-gradient-`);return(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:24,padding:16},children:e.map(e=>(0,a.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,a.jsx)(`div`,{style:{...o,width:`100%`,height:100,borderRadius:8,background:`var(${e.name})`,margin:`0 auto 12px`}}),(0,a.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:e.name})]},e.name))})}},m=[`BorderRadius`,`BorderWidth`,`Shadow`,`Blur`,`Opacity`,`Gradient`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-border-radius-');
    return <div>
        {tokens.map(t => <EffectRow key={t.name} {...t} style={{
        borderRadius: t.value
      }} />)}
      </div>;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-border-width-');
    return <div>
        {tokens.map(t => <EffectRow key={t.name} {...t} style={{
        background: 'transparent',
        border: \`\${t.value} solid var(--pepper-color-fg-stroke, #333)\`
      }} />)}
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-shadow-').filter(t => !t.name.includes('offset'));
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: 32,
      padding: 16
    }}>
        {tokens.map(t => <div key={t.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          ...swatchBase,
          width: '100%',
          borderRadius: 8,
          boxShadow: \`var(\${t.name})\`,
          margin: '0 auto 12px'
        }} />
            <div style={{
          fontFamily: 'monospace',
          fontSize: 12
        }}>{t.name}</div>
          </div>)}
      </div>;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tokens = listTokens('--pepper-blur-');
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: 24,
      padding: 16
    }}>
        {tokens.map(t => <div key={t.name} style={{
        textAlign: 'center'
      }}>
            <div style={{
          ...swatchBase,
          width: '100%',
          borderRadius: 8,
          filter: \`var(\${t.name})\`,
          margin: '0 auto 12px'
        }} />
            <div style={{
          fontFamily: 'monospace',
          fontSize: 12
        }}>{t.name}</div>
          </div>)}
      </div>;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
          ...swatchBase,
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
}`,...p.parameters?.docs?.source}}}})))()}h();export{d as Blur,c as BorderRadius,l as BorderWidth,p as Gradient,f as Opacity,u as Shadow,m as __namedExportsOrder,s as default};