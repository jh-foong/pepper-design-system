import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,y as n}from"./iframe-DZ8LDsA2.js";import{i as r,r as i}from"./Button-CPSy7v1L.js";function a({children:e,...t}){let[n,r]=(0,o.useState)([]),a=e=>{if(e.currentTarget.disabled)return;let t=e.currentTarget.getBoundingClientRect(),n=Math.max(t.width,t.height)*2,i=Date.now()+Math.random();r(r=>[...r,{id:i,size:n,x:e.clientX-t.left-n/2,y:e.clientY-t.top-n/2}]),setTimeout(()=>r(e=>e.filter(e=>e.id!==i)),500)};return(0,s.jsxs)(i,{...t,className:`pepper-press-poc`,onPointerDown:a,children:[e,n.map(e=>(0,s.jsx)(`span`,{className:`pepper-press-ripple-dot`,style:{width:e.size,height:e.size,left:e.x,top:e.y}},e.id))]})}var o,s,c,l,u,d;function f(){return(f=e((()=>{o=n(),r(),s=t(),c=[{key:`none`,title:`0. Today (baseline)`,note:`Existing Button. Hover colour only, no pressed feedback.`,render:e=>(0,s.jsx)(i,{...e})},{key:`scale`,title:`A. Scale down`,note:`Hover colour fades in (150ms). Pressing scales to 97%.`,render:e=>(0,s.jsx)(i,{...e,className:`pepper-press-poc pepper-press-scale`})},{key:`ripple`,title:`B. Ripple`,note:`Hover colour fades in. Pressing sends a ripple out from the click point.`,render:e=>(0,s.jsx)(a,{...e})},{key:`both`,title:`C. Scale + ripple`,note:`Both together.`,render:e=>(0,s.jsx)(a,{...e,className:`pepper-press-scale`})}],l={title:`Prototypes/Button press animation (PoC)`,parameters:{layout:`padded`},tags:[`ai-generated`]},u={render:()=>(0,s.jsxs)(`div`,{style:{display:`grid`,gap:32,font:`var(--pepper-typography-body-md)`},children:[(0,s.jsx)(`p`,{style:{margin:0,maxWidth:640},children:`Hover, then press and hold each button. Pressed reuses the existing hover colour; the animation is what signals the press. Try the Brand, Outline and Ghost rows, and toggle your OS "Reduce motion" setting to see the fallback.`}),c.map(e=>(0,s.jsxs)(`section`,{children:[(0,s.jsx)(`h3`,{style:{margin:0,font:`var(--pepper-typography-heading-h3)`},children:e.title}),(0,s.jsx)(`p`,{style:{margin:`4px 0 12px`},children:e.note}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:12,flexWrap:`wrap`,alignItems:`center`},children:[[`brand`,`outline`,`ghost`,`negative`].map(t=>(0,s.jsx)(`span`,{children:e.render({style:t,children:t===`ghost`?`Ghost`:t[0].toUpperCase()+t.slice(1)})},t)),(0,s.jsx)(`span`,{children:e.render({style:`brand`,size:`sm`,children:`Small`})}),(0,s.jsx)(`span`,{children:e.render({style:`brand`,size:`xl`,children:`Extra large`})}),(0,s.jsx)(`span`,{children:e.render({style:`brand`,shape:`square`,children:`Square`})}),(0,s.jsx)(`span`,{children:e.render({style:`brand`,disabled:!0,children:`Disabled`})})]})]},e.key))]})},d=[`SideBySide`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 32,
    font: 'var(--pepper-typography-body-md)'
  }}>
      <p style={{
      margin: 0,
      maxWidth: 640
    }}>
        Hover, then press and hold each button. Pressed reuses the existing hover colour; the animation is what
        signals the press. Try the Brand, Outline and Ghost rows, and toggle your OS "Reduce motion" setting to see
        the fallback.
      </p>
      {VARIANTS.map(v => <section key={v.key}>
          <h3 style={{
        margin: 0,
        font: 'var(--pepper-typography-heading-h3)'
      }}>{v.title}</h3>
          <p style={{
        margin: '4px 0 12px'
      }}>{v.note}</p>
          <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
            {['brand', 'outline', 'ghost', 'negative'].map(s => <span key={s}>{v.render({
            style: s,
            children: s === 'ghost' ? 'Ghost' : s[0].toUpperCase() + s.slice(1)
          })}</span>)}
            <span>{v.render({
            style: 'brand',
            size: 'sm',
            children: 'Small'
          })}</span>
            <span>{v.render({
            style: 'brand',
            size: 'xl',
            children: 'Extra large'
          })}</span>
            <span>{v.render({
            style: 'brand',
            shape: 'square',
            children: 'Square'
          })}</span>
            <span>{v.render({
            style: 'brand',
            disabled: true,
            children: 'Disabled'
          })}</span>
          </div>
        </section>)}
    </div>
}`,...u.parameters?.docs?.source}}}})))()}f();export{u as SideBySide,d as __namedExportsOrder,l as default};