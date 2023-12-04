var y=Object.defineProperty;var b=(n,e,t)=>e in n?y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var p=(n,e,t)=>(b(n,typeof e!="symbol"?e+"":e,t),t);import{d as v,r as T,aF as w,C as P,P as x,o as $,l as A,m as g}from"./index-8345d350.js";import{d as B}from"./index-31bc1811.js";const C={duration:{type:Number,default:0},active:{type:Boolean,default:!0},precision:{type:Number,default:0},render:Function,onFinish:Function},q=v({name:"Countdown",props:C,setup(n){let e=null,t=0,o=!1;const r=T(0);w(()=>{r.value=n.duration});let a=-1;function d(s){return n.duration-t+a-s}function S(s){const l=Math.floor(s/36e5),i=Math.floor(s%36e5/6e4),c=Math.floor(s%6e4/1e3),m=Math.floor(s%1e3);return{hours:l,minutes:i,seconds:c,milliseconds:m}}function _(s){const{hours:l,minutes:i,seconds:c,milliseconds:m}=s,{precision:u}=n;switch(u){case 0:return`${String(l).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(c).padStart(2,"0")}`;default:return`${String(l).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(c).padStart(2,"0")}.${String(Math.floor(m/(u===1?100:u===2?10:1))).padStart(u,"0")}`}}const f=()=>{var s;const{precision:l}=n,i=d(performance.now());if(i<=0){r.value=0,h(),o||(o=!0,(s=n.onFinish)===null||s===void 0||s.call(n));return}let c;switch(l){case 3:case 2:c=i%34;break;case 1:c=i%100;break;default:c=i%1e3}r.value=i,e=window.setTimeout(()=>{f()},c)},h=()=>{e!==null&&(window.clearTimeout(e),e=null)};P(()=>{w(()=>{if(n.active)a=performance.now(),f();else{const s=performance.now();a!==-1&&(t+=s-a),h()}})}),x(()=>{h()});function M(){r.value=n.duration,t=0,a=performance.now(),n.active&&o&&f(),o=!1}return Object.assign({reset:M},{distance:r,getTimeInfo:S,getDisplayValue:_})},render(){const{render:n,precision:e,distance:t,getTimeInfo:o,getDisplayValue:r}=this;let a;switch(e){case 0:a=o(t+999),a.milliseconds=0;break;case 1:a=o(t+99),a.milliseconds=Math.floor(a.milliseconds/100)*100;break;case 2:a=o(t+9),a.milliseconds=Math.floor(a.milliseconds/10)*10;break;case 3:a=o(t)}return n?n(a):r(a)}});function F(n,e){return e===void 0&&(e={}),function(t,o){var r=Reflect.getMetadata("design:type",t,o);B.addTypeMetadata({target:t.constructor,propertyName:o,reflectedType:r,typeFunction:n,options:e})}}class V{constructor(e,t,o){this.duration=e,this.type=t,this.value=o}}var D=Object.defineProperty,N=Object.getOwnPropertyDescriptor,O=(n,e,t,o)=>{for(var r=o>1?void 0:o?N(e,t):e,a=n.length-1,d;a>=0;a--)(d=n[a])&&(r=(o?d(e,t,r):d(r))||r);return o&&r&&D(e,t,r),r};class k{constructor(e,t,o,r){p(this,"actions");this.description=e,this.id=t,this.name=o,this.actions=r}addAction(e){this.actions.push(e)}deleteAction(e){e>-1&&this.actions.splice(e,1)}get fullPeriod(){return this.actions.map(e=>e.duration).reduce((e,t)=>e+t,0)}}O([F(()=>V)],k.prototype,"actions",2);const E={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 12 12"},I=g("g",{fill:"none"},[g("path",{d:"M6 1.5a.5.5 0 0 0-1 0V5H1.5a.5.5 0 0 0 0 1H5v3.5a.5.5 0 0 0 1 0V6h3.5a.5.5 0 0 0 0-1H6V1.5z",fill:"currentColor"})],-1),R=[I],G=v({name:"Add12Regular",render:function(e,t){return $(),A("svg",E,R)}});export{G as A,q as N,k as P,V as a};
