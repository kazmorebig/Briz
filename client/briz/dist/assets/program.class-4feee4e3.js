var O=Object.defineProperty;var E=(t,e,o)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var m=(t,e,o)=>(E(t,typeof e!="symbol"?e+"":e,o),o);import{a_ as M,k as _,d as z,u as j,x as C,a$ as G,c as T,B as N,b0 as F,b1 as R,l as A,h as v,b2 as D,b3 as H,b4 as V,b5 as $,q as w,A as W,r as I,j as K,b6 as U,z as q,b7 as J,b as X}from"./index-38f06219.js";import{g as Y,d as Q}from"./storage-2ffd7f7f.js";const Z=()=>M,k={name:"Space",self:Z},ee=k;let B;const te=()=>{if(!_)return!0;if(B===void 0){const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.rowGap="1px",t.appendChild(document.createElement("div")),t.appendChild(document.createElement("div")),document.body.appendChild(t);const e=t.scrollHeight===1;return document.body.removeChild(t),B=e}return B},oe=Object.assign(Object.assign({},C.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),be=z({name:"Space",props:oe,setup(t){const{mergedClsPrefixRef:e,mergedRtlRef:o}=j(t),l=C("Space","-space",void 0,ee,t,e),n=G("Space",o,e);return{useGap:te(),rtlEnabled:n,mergedClsPrefix:e,margin:T(()=>{const{size:r}=t;if(Array.isArray(r))return{horizontal:r[0],vertical:r[1]};if(typeof r=="number")return{horizontal:r,vertical:r};const{self:{[N("gap",r)]:c}}=l.value,{row:u,col:f}=F(c);return{horizontal:R(f),vertical:R(u)}})}},render(){const{vertical:t,align:e,inline:o,justify:l,itemStyle:n,margin:r,wrap:c,mergedClsPrefix:u,rtlEnabled:f,useGap:s,wrapItem:S,internalUseGap:x}=this,g=A(Y(this));if(!g.length)return null;const b=`${r.horizontal}px`,p=`${r.horizontal/2}px`,d=`${r.vertical}px`,a=`${r.vertical/2}px`,i=g.length-1,y=l.startsWith("space-");return v("div",{role:"none",class:[`${u}-space`,f&&`${u}-space--rtl`],style:{display:o?"inline-flex":"flex",flexDirection:t?"column":"row",justifyContent:["start","end"].includes(l)?"flex-"+l:l,flexWrap:!c||t?"nowrap":"wrap",marginTop:s||t?"":`-${a}`,marginBottom:s||t?"":`-${a}`,alignItems:e,gap:s?`${r.vertical}px ${r.horizontal}px`:""}},!S&&(s||x)?g:g.map((P,h)=>v("div",{role:"none",style:[n,{maxWidth:"100%"},s?"":t?{marginBottom:h!==i?d:""}:f?{marginLeft:y?l==="space-between"&&h===i?"":p:h!==i?b:"",marginRight:y?l==="space-between"&&h===0?"":p:"",paddingTop:a,paddingBottom:a}:{marginRight:y?l==="space-between"&&h===i?"":p:h!==i?b:"",marginLeft:y?l==="space-between"&&h===0?"":p:"",paddingTop:a,paddingBottom:a}]},P)))}}),re=t=>{const{baseColor:e,textColor2:o,bodyColor:l,cardColor:n,dividerColor:r,actionColor:c,scrollbarColor:u,scrollbarColorHover:f,invertedColor:s}=t;return{textColor:o,textColorInverted:"#FFF",color:l,colorEmbedded:c,headerColor:n,headerColorInverted:s,footerColor:c,footerColorInverted:s,headerBorderColor:r,headerBorderColorInverted:s,footerBorderColor:r,footerBorderColorInverted:s,siderBorderColor:r,siderBorderColorInverted:s,siderColor:n,siderColorInverted:s,siderToggleButtonBorder:`1px solid ${r}`,siderToggleButtonColor:e,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:$(l,u),siderToggleBarColorHover:$(l,f),__invertScrollbar:"true"}},le=D({name:"Layout",common:H,peers:{Scrollbar:V},self:re}),ne=le,ae={type:String,default:"static"},se=w("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[w("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),W("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ie={embedded:Boolean,position:ae,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},ce=X("n-layout");function L(t){return z({name:t?"LayoutContent":"Layout",props:Object.assign(Object.assign({},C.props),ie),setup(e){const o=I(null),l=I(null),{mergedClsPrefixRef:n,inlineThemeDisabled:r}=j(e),c=C("Layout","-layout",se,ne,e,n);function u(d,a){if(e.nativeScrollbar){const{value:i}=o;i&&(a===void 0?i.scrollTo(d):i.scrollTo(d,a))}else{const{value:i}=l;i&&i.scrollTo(d,a)}}K(ce,e);let f=0,s=0;const S=d=>{var a;const i=d.target;f=i.scrollLeft,s=i.scrollTop,(a=e.onScroll)===null||a===void 0||a.call(e,d)};U(()=>{if(e.nativeScrollbar){const d=o.value;d&&(d.scrollTop=s,d.scrollLeft=f)}});const x={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},g={scrollTo:u},b=T(()=>{const{common:{cubicBezierEaseInOut:d},self:a}=c.value;return{"--n-bezier":d,"--n-color":e.embedded?a.colorEmbedded:a.color,"--n-text-color":a.textColor}}),p=r?q("layout",T(()=>e.embedded?"e":""),b,e):void 0;return Object.assign({mergedClsPrefix:n,scrollableElRef:o,scrollbarInstRef:l,hasSiderStyle:x,mergedTheme:c,handleNativeElScroll:S,cssVars:r?void 0:b,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender},g)},render(){var e;const{mergedClsPrefix:o,hasSider:l}=this;(e=this.onRender)===null||e===void 0||e.call(this);const n=l?this.hasSiderStyle:void 0,r=[this.themeClass,t&&`${o}-layout-content`,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return v("div",{class:r,style:this.cssVars},this.nativeScrollbar?v("div",{ref:"scrollableElRef",class:`${o}-layout-scroll-container`,style:[this.contentStyle,n],onScroll:this.handleNativeElScroll},this.$slots):v(J,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentStyle:[this.contentStyle,n]}),this.$slots))}})}const ve=L(!1),ye=L(!0);function de(t,e){return e===void 0&&(e={}),function(o,l){var n=Reflect.getMetadata("design:type",o,l);Q.addTypeMetadata({target:o.constructor,propertyName:l,reflectedType:n,typeFunction:t,options:e})}}class ue{constructor(e,o,l){m(this,"duration");m(this,"type");m(this,"value");this.duration=e,this.type=o,this.value=l}}var pe=globalThis&&globalThis.__decorate||function(t,e,o,l){var n=arguments.length,r=n<3?e:l===null?l=Object.getOwnPropertyDescriptor(e,o):l,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,o,l);else for(var u=t.length-1;u>=0;u--)(c=t[u])&&(r=(n<3?c(r):n>3?c(e,o,r):c(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r};class fe{constructor(e,o,l,n){m(this,"description");m(this,"id");m(this,"name");m(this,"actions");this.description=e,this.id=o,this.name=l,this.actions=n}}pe([de(()=>ue)],fe.prototype,"actions",void 0);export{ue as A,be as N,fe as P,ve as a,ye as b,ne as l,ae as p};