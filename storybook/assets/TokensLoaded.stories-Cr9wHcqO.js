import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t}from"./iframe-CC-2YB8m.js";function n(){return(0,r.jsx)(`div`,{"data-testid":`token-probe`,style:{background:`var(--pepper-core-color-brand-primary-blue-400)`,width:40,height:40}})}var r,i,a,o,s;function c(){return(c=e((()=>{r=t(),{expect:i}=__STORYBOOK_MODULE_TEST__,a={title:`Foundations/TokensLoaded`,component:n,tags:[`ai-generated`]},o={play:async({canvas:e})=>{let t=e.getByTestId(`token-probe`),n=getComputedStyle(t).backgroundColor;await i(n).toBe(`rgb(0, 100, 250)`)}},s=[`CssCheck`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas
  }) => {
    const probe = canvas.getByTestId('token-probe');
    const resolved = getComputedStyle(probe).backgroundColor;
    // --pepper-core-color-brand-primary-blue-400 is #0064fa in tokens/css/base/color.css
    await expect(resolved).toBe('rgb(0, 100, 250)');
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as CssCheck,s as __namedExportsOrder,a as default};