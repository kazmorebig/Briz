import{p as b}from"./LayoutContent-2d98f768.js";import{c as h,g as l,d as v,b as i,u as f,a6 as m,e as d,f as C,h as x}from"./index-e32aabf3.js";const y=h("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[l("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),l("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),g={position:b,inverted:Boolean,bordered:{type:Boolean,default:!1}},$=v({name:"LayoutHeader",props:Object.assign(Object.assign({},i.props),g),setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:n}=f(e),c=i("Layout","-layout-header",y,m,e,r),a=d(()=>{const{common:{cubicBezierEaseInOut:u},self:s}=c.value,o={"--n-bezier":u};return e.inverted?(o["--n-color"]=s.headerColorInverted,o["--n-text-color"]=s.textColorInverted,o["--n-border-color"]=s.headerBorderColorInverted):(o["--n-color"]=s.headerColor,o["--n-text-color"]=s.textColor,o["--n-border-color"]=s.headerBorderColor),o}),t=n?C("layout-header",d(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:r,cssVars:n?void 0:a,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;const{mergedClsPrefix:r}=this;return(e=this.onRender)===null||e===void 0||e.call(this),x("div",{class:[`${r}-layout-header`,this.themeClass,this.position&&`${r}-layout-header--${this.position}-positioned`,this.bordered&&`${r}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),p=h("layout-footer",`
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
`,[l("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 bottom: 0;
 `),l("bordered",`
 border-top: solid 1px var(--n-border-color);
 `)]),z=Object.assign(Object.assign({},i.props),{inverted:Boolean,position:b,bordered:Boolean}),P=v({name:"LayoutFooter",props:z,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:n}=f(e),c=i("Layout","-layout-footer",p,m,e,r),a=d(()=>{const{common:{cubicBezierEaseInOut:u},self:s}=c.value,o={"--n-bezier":u};return e.inverted?(o["--n-color"]=s.footerColorInverted,o["--n-text-color"]=s.textColorInverted,o["--n-border-color"]=s.footerBorderColorInverted):(o["--n-color"]=s.footerColor,o["--n-text-color"]=s.textColor,o["--n-border-color"]=s.footerBorderColor),o}),t=n?C("layout-footer",d(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:r,cssVars:n?void 0:a,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;const{mergedClsPrefix:r}=this;return(e=this.onRender)===null||e===void 0||e.call(this),x("div",{class:[`${r}-layout-footer`,this.themeClass,this.position&&`${r}-layout-footer--${this.position}-positioned`,this.bordered&&`${r}-layout-footer--bordered`],style:this.cssVars},this.$slots)}});export{$ as N,P as a};
