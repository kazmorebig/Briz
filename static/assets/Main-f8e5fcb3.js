import{c as X,a as U,d as h,u as Z,b as L,t as ee,e as k,f as te,h as R,g as O,i as de,r as x,j as ue,k as pe,B as ne,A as W,o as _,l as $,m as p,n as g,p as e,q as P,w as c,s as M,N as S,v as V,x as i,y as me,F as se,z as _e,C as oe,D as ae,E as ve,G as K,H as fe,U as re,I as he}from"./index-e32aabf3.js";import{u as ge,a as xe,N as ye}from"./base-data.service-19527dd6.js";import{P as we,N as be,A as Ce}from"./Add12Regular-f8bdc6e6.js";import{p as $e}from"./index-78c33e18.js";import{_ as D,N as T}from"./_plugin-vue_export-helper-e79d0aac.js";import{N,a as ze,b as ke}from"./LayoutContent-2d98f768.js";import{N as q,a as Re}from"./Grid-329a54ba.js";import"./next-frame-once-7035a838.js";const Pe=X("p",`
 box-sizing: border-box;
 transition: color .3s var(--n-bezier);
 margin: var(--n-margin);
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 color: var(--n-text-color);
`,[U("&:first-child","margin-top: 0;"),U("&:last-child","margin-bottom: 0;")]),Se=Object.assign(Object.assign({},L.props),{depth:[String,Number]}),Ae=h({name:"P",props:Se,setup(t){const{mergedClsPrefixRef:a,inlineThemeDisabled:n}=Z(t),l=L("Typography","-p",Pe,ee,t,a),r=k(()=>{const{depth:m}=t,v=m||"1",{common:{cubicBezierEaseInOut:o},self:{pFontSize:d,pLineHeight:u,pMargin:f,pTextColor:b,[`pTextColor${v}Depth`]:y}}=l.value;return{"--n-bezier":o,"--n-font-size":d,"--n-line-height":u,"--n-margin":f,"--n-text-color":m===void 0?b:y}}),s=n?te("p",k(()=>`${t.depth||""}`),r,t):void 0;return{mergedClsPrefix:a,cssVars:n?void 0:r,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var t;return(t=this.onRender)===null||t===void 0||t.call(this),R("p",{class:[`${this.mergedClsPrefix}-p`,this.themeClass],style:this.cssVars},this.$slots)}}),Be=X("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[O("strong",`
 font-weight: var(--n-font-weight-strong);
 `),O("italic",{fontStyle:"italic"}),O("underline",{textDecoration:"underline"}),O("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),Ne=Object.assign(Object.assign({},L.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),Me=h({name:"Text",props:Ne,setup(t){const{mergedClsPrefixRef:a,inlineThemeDisabled:n}=Z(t),l=L("Typography","-text",Be,ee,t,a),r=k(()=>{const{depth:m,type:v}=t,o=v==="default"?m===void 0?"textColor":`textColor${m}Depth`:de("textColor",v),{common:{fontWeightStrong:d,fontFamilyMono:u,cubicBezierEaseInOut:f},self:{codeTextColor:b,codeBorderRadius:y,codeColor:E,codeBorder:ie,[o]:ce}}=l.value;return{"--n-bezier":f,"--n-text-color":ce,"--n-font-weight-strong":d,"--n-font-famliy-mono":u,"--n-code-border-radius":y,"--n-code-text-color":b,"--n-code-color":E,"--n-code-border":ie}}),s=n?te("text",k(()=>`${t.type[0]}${t.depth||""}`),r,t):void 0;return{mergedClsPrefix:a,compitableTag:ge(t,["as","tag"]),cssVars:n?void 0:r,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var t,a,n;const{mergedClsPrefix:l}=this;(t=this.onRender)===null||t===void 0||t.call(this);const r=[`${l}-text`,this.themeClass,{[`${l}-text--code`]:this.code,[`${l}-text--delete`]:this.delete,[`${l}-text--strong`]:this.strong,[`${l}-text--italic`]:this.italic,[`${l}-text--underline`]:this.underline}],s=(n=(a=this.$slots).default)===null||n===void 0?void 0:n.call(a);return this.code?R("code",{class:r,style:this.cssVars},this.delete?R("del",null,s):s):this.delete?R("del",{class:r,style:this.cssVars},s):R(this.compitableTag||"span",{class:r,style:this.cssVars},s)}}),j=x(0),F=x([]),H=x(),w=x(),J=x(),A=x();function I(){const t=ue();async function a(){const{data:o}=await xe(W.PROGRAMS);F.value=$e(we,o.value)||[]}function n(o){return!w.value||o===null?!1:w.value.id===o}function l(o){var d,u,f;w.value=JSON.parse(JSON.stringify(o)),A.value=JSON.parse(JSON.stringify((d=w.value)==null?void 0:d.actions)),j.value=A.value?A.value.reduce((b,y)=>b+y.duration,0):0,J.value=((u=w.value)==null?void 0:u.id)??void 0,H.value=(f=w.value)==null?void 0:f.description}function r(o){var d,u;o!==null&&o!==""&&(J.value=o,w.value=F.value.find(f=>f.id===o),A.value=(d=w.value)==null?void 0:d.actions,j.value=A.value?A.value.reduce((f,b)=>f+b.duration,0):0,H.value=(u=w.value)==null?void 0:u.description)}function s(){t.push({name:"create-program"}).then()}function m(o){o!==null&&t.push({name:"edit-program",params:{id:o}}).then()}function v(o){o!==null&&ne.delete(W.PROGRAM(o)).then(()=>{a()})}return{programs:F,activeProgram:w,activeProgramId:J,programDescription:H,isActive:n,setActive:l,setActiveById:r,sessionPeriod:pe(j),openProgramCreation:s,openProgramEdit:m,deleteProgram:v,fetchPrograms:a}}const Te={class:"main-wrapper"},De=h({__name:"MainDescription",setup(t){const a=x(!1),{programDescription:n}=I();return(l,r)=>(_(),$(se,null,[p("div",Te,[p("h2",null,g(l.$t("main.title")),1),p("div",null,[p("p",null,g(e(n)),1),e(n)?(_(),P(e(S),{key:0,size:"small",class:"display: span",text:"",quaternary:"",onClick:r[0]||(r[0]=s=>a.value=!0)},{default:c(()=>[M(g(l.$t("main.buttonTitle")),1)]),_:1})):V("",!0)])]),i(e(me),{show:a.value,"onUpdate:show":r[1]||(r[1]=s=>a.value=s),"mask-closable":!0,style:{width:"600px"},title:l.$t("main.title"),"aria-modal":"true",preset:"card"},{default:c(()=>[p("p",null,g(e(n)),1)]),_:1},8,["show","title"])],64))}});const Ie=D(De,[["__scopeId","data-v-8a45608d"]]),Oe={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},Ve=p("g",{fill:"none"},[p("path",{d:"M8.628 14.982A1 1 0 0 1 7 14.204V5.797a1 1 0 0 1 1.628-.778l4.723 3.814a1.5 1.5 0 0 1 0 2.334l-4.723 3.815zM8 5.797v8.407l4.723-3.815a.5.5 0 0 0 0-.778L8 5.797z",fill:"currentColor"})],-1),Le=[Ve],Ee=h({name:"CaretRight20Regular",render:function(a,n){return _(),$("svg",Oe,Le)}}),je={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 16 16"},Fe=p("g",{fill:"none"},[p("path",{d:"M6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM4.559 5l.74 6.666A1.5 1.5 0 0 0 6.79 13h2.42a1.5 1.5 0 0 0 1.49-1.334L11.442 5H4.56z",fill:"currentColor"})],-1),He=[Fe],Je=h({name:"Delete16Regular",render:function(a,n){return _(),$("svg",je,He)}}),We={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 16 16"},Ge=p("g",{fill:"none"},[p("path",{d:"M13.416 2.584c.778.778.778 2.039 0 2.817L6.058 12.76c-.319.32-.719.546-1.156.655l-2.283.57a.498.498 0 0 1-.604-.603l.57-2.283a2.49 2.49 0 0 1 .656-1.156l7.358-7.358a1.992 1.992 0 0 1 2.817 0zM9.894 4.697l-5.949 5.949a1.495 1.495 0 0 0-.393.694l-.369 1.477l1.477-.37c.263-.065.503-.2.694-.392l5.949-5.95l-1.409-1.408zm1.41-1.41l-.705.705l1.408 1.409l.705-.704a.996.996 0 0 0-1.409-1.41z",fill:"currentColor"})],-1),Ue=[Ge],Ke=h({name:"Edit16Regular",render:function(a,n){return _(),$("svg",We,Ue)}}),qe={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 48 48"},Ye=p("g",{fill:"none"},[p("path",{d:"M17.75 7A3.25 3.25 0 0 1 21 10.25v27.5A3.25 3.25 0 0 1 17.75 41h-5.5A3.25 3.25 0 0 1 9 37.75v-27.5A3.25 3.25 0 0 1 12.25 7h5.5zm18 0A3.25 3.25 0 0 1 39 10.25v27.5A3.25 3.25 0 0 1 35.75 41h-5.5A3.25 3.25 0 0 1 27 37.75v-27.5A3.25 3.25 0 0 1 30.25 7h5.5zm-18 2.5h-5.5a.75.75 0 0 0-.75.75v27.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-27.5a.75.75 0 0 0-.75-.75zm18 0h-5.5a.75.75 0 0 0-.75.75v27.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-27.5a.75.75 0 0 0-.75-.75z",fill:"currentColor"})],-1),Qe=[Ye],Xe=h({name:"Pause48Regular",render:function(a,n){return _(),$("svg",qe,Qe)}}),Ze={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},et=p("g",{fill:"none"},[p("path",{d:"M15.5 4a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3h-11z",fill:"currentColor"})],-1),tt=[et],nt=h({name:"Stop20Regular",render:function(a,n){return _(),$("svg",Ze,tt)}});var C;(function(t){t.pause="pause",t.resume="resume",t.run="run",t.stop="stop"})(C||(C={}));const z=x(C.stop),Y=x();function le(){const t=({hours:o,minutes:d,seconds:u})=>[R("span",{style:"display: none;"},o),R("span",{style:"display: inline-block; font-weight: bold"},d),":",R("span",{style:"display: inline-block; font-weight: bold"},u)],a=k(()=>z.value===C.run),n=k(()=>z.value===C.pause),l=k(()=>z.value===C.resume),r=k(()=>z.value===C.stop);function s(o,d){d!==void 0&&ne.get(W.SET_STATE_BY_ID(o,d),{},void 0,"Ошибка при установке статуса").then(()=>{z.value=o,z.value===C.stop&&v()})}function m(o){z.value=o}function v(){var o;(o=Y.value)==null||o.reset()}return{state:z,setState:s,isActivated:a,isPaused:n,isResumed:l,isStopped:r,stateEnum:C,renderCountdown:t,handleReset:v,countdown:Y,setStateWebsocket:m}}var G;(function(t){t.paused="pause",t.stopped="stop",t.running="run"})(G||(G={}));const B=x(),Q=x(0),{setStateWebsocket:st}=le(),{setActiveById:ot,isActive:at}=I();function rt(){const t=new WebSocket(_e+"/status");return oe(()=>{t.onmessage=function(a){var n,l,r;B.value=JSON.parse(a.data),Q.value=JSON.parse(a.data).elapsed_time,st(G[(n=B.value)==null?void 0:n.program_status]),ot((l=B.value)==null?void 0:l.program_id),at((r=B.value)==null?void 0:r.program_id)}}),{websocketData:B,elapsedTime:Q}}const lt={class:"wrapper-control"},it={class:"title-control"},ct=h({__name:"ControlSystem",setup(t){const{setState:a,isActivated:n,isStopped:l,isPaused:r,isResumed:s,stateEnum:m,renderCountdown:v,countdown:o}=le(),{sessionPeriod:d,activeProgramId:u}=I(),{elapsedTime:f}=rt();return(b,y)=>(_(),$("div",lt,[i(e(S),{disabled:e(u)===void 0&&(!e(n)||e(l)),class:ae(["btn-control",e(r)?"active":""]),onClick:y[0]||(y[0]=E=>e(a)(e(r)?e(m).resume:e(m).pause,e(u)))},{default:c(()=>[i(e(T),{size:"44",color:"#ddd",component:e(Xe)},null,8,["component"])]),_:1},8,["disabled","class"]),p("div",it,[i(e(Ae),{type:"default"},{default:c(()=>[M(g(b.$t("control.title")),1)]),_:1}),i(e(Me),{type:e(n)?"error":"default",class:"timer",depth:"3"},{default:c(()=>[i(e(be),{ref_key:"countdown",ref:o,duration:(e(d)-e(f))*1e3,active:!1,render:e(v)},null,8,["duration","render"])]),_:1},8,["type"])]),i(e(S),{disabled:e(u)===void 0,class:"btn-control",onClick:y[1]||(y[1]=E=>e(a)(e(n)||e(r)||e(s)?e(m).stop:e(m).run,e(u)))},{default:c(()=>[i(e(T),{color:e(n)||e(r)||e(s)?"#FF4949":"",size:e(n)||e(r)||e(s)?"44":"60",component:e(n)||e(r)||e(s)?e(nt):e(Ee)},null,8,["color","size","component"])]),_:1},8,["disabled"])]))}});const dt=D(ct,[["__scopeId","data-v-b8650dcf"]]),ut=h({__name:"MenuButtons",setup(t){const{smallResolution:a}=ve();return(n,l)=>(_(),P(e(N),{justify:e(a)?"center":"space-between","wrap-item":!0,wrap:!0,size:20},{default:c(()=>[i(e(S),{class:"menu-button",tag:"a",text:"",href:"/settings",target:"_self",type:"primary"},{default:c(()=>[M(g(n.$t("history.title")),1)]),_:1}),i(e(S),{class:"menu-button",text:"",tag:"a",href:"/history",target:"_self",type:"primary"},{default:c(()=>[M(g(n.$t("session.title")),1)]),_:1})]),_:1},8,["justify"]))}});const pt=D(ut,[["__scopeId","data-v-9fe8a32b"]]),mt={class:"program-item__index"},_t=h({__name:"ProgramItem",props:{item:null,active:{type:Boolean},index:null},setup(t){const{openProgramEdit:a,deleteProgram:n}=I(),{isAdmin:l}=re();return(r,s)=>(_(),P(e(fe),{class:ae(t.active?"active-program":"")},{default:c(()=>[i(e(N),{class:"program-item",justify:"start",size:"small","wrap-item":!1},{default:c(()=>[p("span",mt,g(t.index),1),i(e(ye),{style:{"max-width":"150px"},"line-clamp":1},{default:c(()=>[M(g(t.item.name),1)]),_:1})]),_:1}),e(l)?(_(),P(e(S),{key:0,circle:"",size:"small",class:"edit-button",onClick:s[0]||(s[0]=K(m=>e(a)(t.item.id),["stop","prevent"]))},{default:c(()=>[i(e(T),{component:e(Ke)},null,8,["component"])]),_:1})):V("",!0),e(l)?(_(),P(e(S),{key:1,circle:"",size:"small",class:"delete-button",onClick:s[1]||(s[1]=K(m=>e(n)(t.item.id),["stop","prevent"]))},{default:c(()=>[i(e(T),{component:e(Je)},null,8,["component"])]),_:1})):V("",!0)]),_:1},8,["class"]))}});const vt=D(_t,[["__scopeId","data-v-828c6299"]]),ft=h({__name:"ProgramList",setup(t){const{isAdmin:a}=re(),{programs:n,isActive:l,setActiveById:r,openProgramCreation:s,fetchPrograms:m}=I();return oe(async()=>{await m()}),(v,o)=>(_(),$("div",null,[i(e(N),{size:"large",justify:"center"},{default:c(()=>[p("h3",null,g(v.$t("program.title")),1)]),_:1}),i(e(N),{vertical:"",size:"large"},{default:c(()=>[i(e(ze),{"has-sider":"","native-scrollbar":!1,style:{height:"400px"}},{default:c(()=>[i(e(ke),{"collapsed-width":0,"content-style":"padding-top: 24px; padding-right: 15px"},{default:c(()=>[(_(!0),$(se,null,he(e(n),(d,u)=>(_(),P(vt,{item:d,key:u,index:u,style:{"margin-bottom":"10px",cursor:"pointer"},active:e(l)(d.id),onClick:f=>e(r)(d.id)},null,8,["item","index","active","onClick"]))),128))]),_:1})]),_:1}),e(a)?(_(),P(e(S),{key:0,size:"small",class:"create-button",onClick:o[0]||(o[0]=d=>e(s)())},{default:c(()=>[i(e(N),{justify:"space-around",align:"center","wrap-item":!1},{default:c(()=>[i(e(T),{component:e(Ce)},null,8,["component"]),p("span",null,g(v.$t("program.create")),1)]),_:1})]),_:1})):V("",!0)]),_:1})]))}});const ht=D(ft,[["__scopeId","data-v-c3f79ba7"]]),kt=h({__name:"Main",setup(t){return(a,n)=>(_(),P(e(Re),{cols:"1 s:1 m:3 l:3 xl:3 2xl:3","x-gap":"20","y-gap":"40","item-responsive":"",responsive:"screen"},{default:c(()=>[i(e(q),{span:"2 m:2 l:2 xl:2 2xl:2"},{default:c(()=>[i(Ie),i(dt),i(pt)]),_:1}),i(e(q),{span:"1"},{default:c(()=>[i(ht)]),_:1})]),_:1}))}});export{kt as default};