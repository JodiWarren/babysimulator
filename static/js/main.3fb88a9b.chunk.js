(this["webpackJsonpbaby-simulator"]=this["webpackJsonpbaby-simulator"]||[]).push([[0],[,,,,,,function(e,t,a){e.exports=a(13)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,c,r,i=a(0),o=a.n(i),l=a(5),u=a.n(l),s=(a(11),a(3)),m=a(2),p=a(1);a(12);!function(e){e.sleep="sleep",e.nappy="nappy",e.cry="cry",e.feed="feed"}(r||(r={}));var y=["Horace","Petunia","Gregory","Lilac","Pierre","Shanti"],d=(n={name:y[Math.floor(Math.random()*y.length)]},Object(p.a)(n,r.cry,0),Object(p.a)(n,r.feed,0),Object(p.a)(n,r.nappy,0),Object(p.a)(n,"currentActivity",r.sleep),n);function f(e,t,a){return e+Math.random()*a+5*t}function v(e,t,a){var n;if(t===r.sleep)return e;var c=function(e,t,a){var n=e-Math.random()*a-5*t;return n>0?n:0}(e[r[t]],a[r[t]].decay,a.global.decay),i=0===c?r.sleep:t;return Object(m.a)(Object(m.a)({},e),{},(n={},Object(p.a)(n,r[t],c),Object(p.a)(n,"currentActivity",i),n))}function b(e,t,a){var n=v(e,t,a);return Object(m.a)(Object(m.a)({},n),{},{currentActivity:t})}function g(e,t){var a=e.cry,n=e.feed,c=e.nappy;if(e.currentActivity===r.sleep){if(a<1&&n<1&&c<1)return function(e,t){var a,n=f(e[r.cry],t[r.cry].rate,t.global.rate),c=f(e[r.feed],t[r.feed].rate,t.global.rate),i=f(e[r.nappy],t[r.nappy].rate,t.global.rate);return Object(m.a)(Object(m.a)({},e),{},(a={},Object(p.a)(a,r.cry,n),Object(p.a)(a,r.feed,c),Object(p.a)(a,r.nappy,i),a))}(e,t);if(a>=1)return b(e,r.cry,t);if(n>=1)return b(e,r.feed,t);if(c>=1)return b(e,r.nappy,t)}return v(e,e.currentActivity,t)}function h(e){var t=e.name,a=e.value,n=e.callback;return o.a.createElement("div",{className:"config__item"},o.a.createElement("label",{htmlFor:t},t),o.a.createElement("input",{id:t,type:"range",min:"0",max:"1",step:"0.001",value:a,onChange:n,"data-config":t}),o.a.createElement("input",{type:"number",min:"0",max:"1",step:"0.001",value:a,onChange:n,"data-config":t}))}var j=(c={global:{rate:.005,decay:.005}},Object(p.a)(c,r.cry,{rate:.025,decay:.025}),Object(p.a)(c,r.feed,{rate:.025,decay:.167}),Object(p.a)(c,r.nappy,{rate:.025,decay:1}),c);function O(e,t){var a=t.type,n=t.value,c=t.action,r=t.activity,i={rate:e[r].rate,decay:e[r].decay};switch(i[a]=n,c){case"set":return Object(m.a)(Object(m.a)({},e),{},Object(p.a)({},r,i));default:return e}}function E(e){var t=Math.floor(e/60),a=e%60;return"".concat(t,":").concat(a.toString(10).padStart(2,"0"))}function N(e){var t=e.endTime,a=e.type,n=E(5*e.time),c=E(5*t);return o.a.createElement("p",{className:"schedule__item"},"From ",n," to ",c," - ",a)}function k(e){var t=e.time,a=e.endTime,n=e.type;return o.a.createElement(N,{key:"".concat(t,"-").concat(a),time:t,endTime:a,type:n})}function w(e,t){return e.filter((function(e){return e.type===t})).length}var _=function(){var e=Object(i.useReducer)(O,j),t=Object(s.a)(e,2),a=t[0],n=t[1],c=Object(i.useState)(p),l=Object(s.a)(c,2),u=l[0],m=l[1];function p(){return function(e,t){var a=[],n=0,c=e,i=r.sleep;for(a.push({time:n,type:i,endTime:0});n<288;)(c=g(c,t)).currentActivity!==i&&(a[a.length-1].endTime=n,i=c.currentActivity,a.push({time:n,type:c.currentActivity,endTime:n+1})),n+=1;return a[a.length-1].endTime=n,console.log(a),a}(d,a)}function y(){m(p)}function f(e){var t=Number(e.target.value);if(!isNaN(t)){var a=e.target.dataset.config;if(a){var c=a.split("."),i=Object(s.a)(c,2),o=i[0],l=i[1];"global"!==o&&o!==r.feed&&o!==r.cry&&o!==r.nappy||"rate"!==l&&"decay"!==l||(n({action:"set",activity:o,type:l,value:t}),y())}}}return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Baby Schedule"),o.a.createElement("div",{className:"config"},Object.entries(a).map((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1];return o.a.createElement("div",{key:"".concat(a),className:"config-row"},o.a.createElement(h,{name:"".concat(a,".rate"),value:n.rate,callback:f}),o.a.createElement(h,{name:"".concat(a,".decay"),value:n.decay,callback:f}))})),o.a.createElement("button",{onClick:function(){return y()}},"Rebuild Events")),o.a.createElement("div",{className:"event-count"},o.a.createElement("p",{className:"event-count__event"},"Nappy changes: ",w(u,r.nappy)),o.a.createElement("p",{className:"event-count__event"},"Feeds: ",w(u,r.feed)),o.a.createElement("p",{className:"event-count__event"},"Crying sessions: ",w(u,r.cry))),o.a.createElement("div",{className:"schedule"},u.map(k)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.3fb88a9b.chunk.js.map