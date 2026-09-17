import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,y as n}from"./iframe-CC-2YB8m.js";import{r}from"./tokens-DEg4FDa5.js";function i({prefix:e,label:t}){let n=(0,a.useMemo)(()=>r(e),[e]);return(0,o.jsxs)(`section`,{style:{marginBottom:24},children:[(0,o.jsx)(`h4`,{children:t}),n.map(({name:e,value:t})=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,padding:`4px 0`},children:[(0,o.jsx)(`div`,{style:{width:t,height:16,background:`var(--pepper-core-color-brand-primary-blue-400, #0064fa)`}}),(0,o.jsxs)(`div`,{style:{fontFamily:`monospace`,fontSize:12},children:[e,` — `,t]})]},e))]})}var a,o,s,c,l,u;function d(){return(d=e((()=>{a=n(),o=t(),s={title:`Foundations/Spacing`,tags:[`ai-generated`],parameters:{layout:`padded`}},c={render:()=>(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`p`,{children:[(0,o.jsx)(`code`,{children:`--pepper-space-inset-*`}),` (internal padding) and `,(0,o.jsx)(`code`,{children:`--pepper-space-gap-*`}),`(space between elements). Bar width shows the actual token value.`]}),(0,o.jsx)(i,{prefix:`--pepper-space-inset-`,label:`Inset (padding)`}),(0,o.jsx)(i,{prefix:`--pepper-space-gap-`,label:`Gap (proximity/stacking)`})]})},l={render:()=>(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`p`,{children:[`Responsive layout tokens — desktop values shown here. Tablet/mobile overrides live under`,(0,o.jsx)(`code`,{children:` [data-theme="tablet"|"mobile"]`}),` in `,(0,o.jsx)(`code`,{children:`space.css`}),`.`]}),(0,o.jsx)(i,{prefix:`--pepper-space-theme-spacing-`,label:`Layout spacing (desktop)`})]})},u=[`InsetAndGap`,`LayoutSpacing`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <p>
        <code>--pepper-space-inset-*</code> (internal padding) and <code>--pepper-space-gap-*</code>
        (space between elements). Bar width shows the actual token value.
      </p>
      <SpaceGroup prefix="--pepper-space-inset-" label="Inset (padding)" />
      <SpaceGroup prefix="--pepper-space-gap-" label="Gap (proximity/stacking)" />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <p>
        Responsive layout tokens — desktop values shown here. Tablet/mobile overrides live under
        <code> [data-theme="tablet"|"mobile"]</code> in <code>space.css</code>.
      </p>
      <SpaceGroup prefix="--pepper-space-theme-spacing-" label="Layout spacing (desktop)" />
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as InsetAndGap,l as LayoutSpacing,u as __namedExportsOrder,s as default};