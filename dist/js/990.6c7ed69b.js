"use strict";(self["webpackChunkProjet1_Meteo"]=self["webpackChunkProjet1_Meteo"]||[]).push([[990],{990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return c}});var r=n(587),o=n(545),i=n(515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=(t,e,n,c,s)=>{const a=t.ownerDocument.defaultView,u=(0,o.i)(t),h=t=>{const e=50,{startX:n}=t;return u?n>=a.innerWidth-e:n<=e},l=t=>u?-t.deltaX:t.deltaX,d=t=>u?-t.velocityX:t.velocityX,f=t=>h(t)&&e(),k=t=>{const e=l(t),n=e/a.innerWidth;c(n)},w=t=>{const e=l(t),n=a.innerWidth,o=e/n,i=d(t),c=n/2,u=i>=0&&(i>.2||e>c),h=u?1-o:o,f=h*n;let k=0;if(f>5){const t=f/Math.abs(i);k=Math.min(t,540)}s(u,o<=0?.01:(0,r.j)(0,o,.9999),k)};return(0,i.A)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:f,onStart:n,onMove:k,onEnd:w})}}}]);
//# sourceMappingURL=990.6c7ed69b.js.map