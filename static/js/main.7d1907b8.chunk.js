(this["webpackJsonpbaby-simulator"]=this["webpackJsonpbaby-simulator"]||[]).push([[0],[,,,,,,function(e,t,a){e.exports=a(13)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,r,c,i=a(0),o=a.n(i),l=a(5),u=a.n(l),m=(a(11),a(3)),y=a(2),p=a(1);a(12);!function(e){e.sleep="sleep",e.nappy="nappy",e.cry="cry",e.feed="feed"}(c||(c={}));var d=["Horace","Petunia","Gregory","Lilac","Pierre","Shanti"],s=(n={name:d[Math.floor(Math.random()*d.length)]},Object(p.a)(n,c.cry,0),Object(p.a)(n,c.feed,0),Object(p.a)(n,c.nappy,0),Object(p.a)(n,"currentActivity",c.sleep),n);function f(e,t,a){return e+Math.random()*a+5*t}function v(e,t,a){var n;if(t===c.sleep)return e;var r=function(e,t,a){var n=e-Math.random()*a-5*t;return n>0?n:0}(e[c[t]],a[c[t]].decay,a.global.decay),i=0===r?c.sleep:t;return Object(y.a)(Object(y.a)({},e),{},(n={},Object(p.a)(n,c[t],r),Object(p.a)(n,"currentActivity",i),n))}function b(e,t,a){var n=v(e,t,a);return Object(y.a)(Object(y.a)({},n),{},{currentActivity:t})}function g(e,t){var a=e.cry,n=e.feed,r=e.nappy;if(e.currentActivity===c.sleep){if(a<1&&n<1&&r<1)return function(e,t){var a,n=f(e[c.cry],t[c.cry].rate,t.global.rate),r=f(e[c.feed],t[c.feed].rate,t.global.rate),i=f(e[c.nappy],t[c.nappy].rate,t.global.rate);return Object(y.a)(Object(y.a)({},e),{},(a={},Object(p.a)(a,c.cry,n),Object(p.a)(a,c.feed,r),Object(p.a)(a,c.nappy,i),a))}(e,t);if(a>=1)return b(e,c.cry,t);if(n>=1)return b(e,c.feed,t);if(r>=1)return b(e,c.nappy,t)}return v(e,e.currentActivity,t)}function h(e){var t=e.name,a=e.value,n=e.callback;return o.a.createElement("div",{className:"config__item"},o.a.createElement("label",{htmlFor:t},t),o.a.createElement("input",{id:t,type:"range",min:"0",max:"1",step:"any",value:a,onChange:n,"data-config":t}),o.a.createElement("input",{type:"number",min:"0",max:"1",step:"0.001",value:a,onChange:n,"data-config":t}))}var j=(r={global:{rate:.005,decay:.005}},Object(p.a)(r,c.cry,{rate:.025,decay:.025}),Object(p.a)(r,c.feed,{rate:.025,decay:.167}),Object(p.a)(r,c.nappy,{rate:.025,decay:1}),r);function O(e,t){var a=t.type,n=t.value,r=t.action,c=t.activity,i={rate:e[c].rate,decay:e[c].decay};switch(i[a]=n,r){case"set":return Object(y.a)(Object(y.a)({},e),{},Object(p.a)({},c,i));default:return e}}function E(e){var t=Math.floor(e/60),a=e%60;return"".concat(t,":").concat(a.toString(10).padStart(2,"0"))}function k(e){var t=e.endTime,a=e.type,n=E(5*e.time),r=E(5*t);return o.a.createElement("p",null,"From ",n," to ",r," - ",a)}function w(e){var t=e.time,a=e.endTime,n=e.type;return o.a.createElement(k,{key:"".concat(t,"-").concat(a),time:t,endTime:a,type:n})}var A=function(){var e=Object(i.useReducer)(O,j),t=Object(m.a)(e,2),a=t[0],n=t[1];function r(e){var t=Number(e.target.value);if(!isNaN(t)){var a=e.target.dataset.config;if(a){var r=a.split("."),i=Object(m.a)(r,2),o=i[0],l=i[1];"global"!==o&&o!==c.feed&&o!==c.cry&&o!==c.nappy||"rate"!==l&&"decay"!==l||n({action:"set",activity:o,type:l,value:t})}}}function l(){return function(e,t){var a=[],n=0,r=e,i=c.sleep;for(a.push({time:n,type:i,endTime:0});n<288;)(r=g(r,t)).currentActivity!==i&&(a[a.length-1].endTime=n,i=r.currentActivity,a.push({time:n,type:r.currentActivity,endTime:n+1})),n+=1;return a[a.length-1].endTime=n,console.log(a),a}(s,a)}var u=Object(i.useState)(l),y=Object(m.a)(u,2),p=y[0],d=y[1];return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Baby Schedule"),o.a.createElement("div",{className:"config"},Object.entries(a).map((function(e){var t=Object(m.a)(e,2),a=t[0],n=t[1];return o.a.createElement("div",{key:"".concat(a),className:"config-row"},o.a.createElement(h,{name:"".concat(a,".rate"),value:n.rate,callback:r}),o.a.createElement(h,{name:"".concat(a,".decay"),value:n.decay,callback:r}))})),o.a.createElement("button",{onClick:function(){d(l)}},"Rebuild Events")),o.a.createElement("div",{className:"schedule"},p.map(w)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.7d1907b8.chunk.js.map