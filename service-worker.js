!function(){"use strict";try{self["workbox:core:6.1.5"]&&_()}catch(t){}const t=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class e extends Error{constructor(e,s){super(t(e,s)),this.name=e,this.details=s}}try{self["workbox:routing:6.1.5"]&&_()}catch(t){}const s=t=>t&&"object"==typeof t?t:{handle:t};class n{constructor(t,e,n="GET"){this.handler=s(e),this.match=t,this.method=n}setCatchHandler(t){this.catchHandler=s(t)}}class i extends n{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:a}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let r=a&&a.handler;const o=t.method;if(!r&&this.i.has(o)&&(r=this.i.get(o)),!r)return;let c;try{c=r.handle({url:s,request:t,event:e,params:i})}catch(t){c=Promise.reject(t)}const h=a&&a.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){n=t}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const a of i){let i;const r=a.match({url:t,sameOrigin:e,request:s,event:n});if(r)return i=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(i=void 0),{route:a,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,s(t))}setCatchHandler(t){this.o=s(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this.t.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this.t.get(t.method).splice(s,1)}}let r;const o=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);function c(t,s,a){let r;if("string"==typeof t){const e=new URL(t,location.href);r=new n((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)r=new i(t,s,a);else if("function"==typeof t)r=new n(t,s,a);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=t}return o().registerRoute(r),r}const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=t=>[h.prefix,t,h.suffix].filter((t=>t&&t.length>0)).join("-"),l=t=>t||u(h.runtime);function f(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class w{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const d=new Set;function p(t){return new Promise((e=>setTimeout(e,t)))}try{self["workbox:strategies:6.1.5"]&&_()}catch(t){}function y(t){return"string"==typeof t?new Request(t):t}class m{constructor(t,e){this.h={},Object.assign(this,e),this.event=e.event,this.u=t,this.l=new w,this.p=[],this.m=[...t.plugins],this.g=new Map;for(const t of this.m)this.g.set(t,{});this.event.waitUntil(this.l.promise)}async fetch(t){const{event:s}=this;let n=y(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const t=await s.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:s})}catch(t){throw new e("plugin-error-request-will-fetch",{thrownError:t})}const a=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.u.fetchOptions);for(const e of this.iterateCallbacks("fetchDidSucceed"))t=await e({event:s,request:a,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:s,originalRequest:i.clone(),request:a.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=y(t);let s;const{cacheName:n,matchOptions:i}=this.u,a=await this.getCacheKey(e,"read"),r={...i,cacheName:n};s=await caches.match(a,r);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(t,s){const n=y(t);await p(0);const i=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(a=i.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const r=await this.v(s);if(!r)return!1;const{cacheName:o,matchOptions:c}=this.u,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const i=f(e.url,s);if(e.url===i)return t.match(e,n);const a={...n,ignoreSearch:!0},r=await t.keys(e,a);for(const e of r)if(i===f(e.url,s))return t.match(e,n)}(h,i.clone(),["__WB_REVISION__"],c):null;try{await h.put(i,u?r.clone():r)}catch(t){throw"QuotaExceededError"===t.name&&await async function(){for(const t of d)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:r.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){if(!this.h[e]){let s=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))s=y(await t({mode:e,request:s,event:this.event,params:this.params}));this.h[e]=s}return this.h[e]}hasCallback(t){for(const e of this.u.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.u.plugins)if("function"==typeof e[t]){const s=this.g.get(e),n=n=>{const i={...n,state:s};return e[t](i)};yield n}}waitUntil(t){return this.p.push(t),t}async doneWaiting(){let t;for(;t=this.p.shift();)await t}destroy(){this.l.resolve()}async v(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class g{constructor(t={}){this.cacheName=l(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new m(this,{event:e,request:s,params:n}),a=this.q(i,s,e);return[a,this.R(a,i,s,e)]}async q(t,s,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this._(s,t),!i||"error"===i.type)throw new e("no-response",{url:s.url})}catch(e){for(const a of t.iterateCallbacks("handlerDidError"))if(i=await a({error:e,event:n,request:s}),i)break;if(!i)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))i=await e({event:n,request:s,response:i});return i}async R(t,e,s,n){let i,a;try{i=await t}catch(a){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){a=t}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:a}),e.destroy(),a)throw a}}const v={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};try{self["workbox:broadcast-update:6.1.5"]&&_()}catch(t){}const q=["content-length","etag","last-modified"],R=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);function x(t){return{cacheName:t.cacheName,updatedURL:t.request.url}}class E{constructor({headersToCheck:t,generatePayload:e}={}){this.D=t||q,this.N=e||x}async notifyIfUpdated(t){var e,s,n;if(t.oldResponse&&(e=t.oldResponse,s=t.newResponse,(n=this.D).some((t=>e.headers.has(t)&&s.headers.has(t)))&&!n.every((t=>{const n=e.headers.has(t)===s.headers.has(t),i=e.headers.get(t)===s.headers.get(t);return n&&i})))){const e={type:"CACHE_UPDATED",meta:"workbox-broadcast-update",payload:this.N(t)};if("navigate"===t.request.mode){let e;t.event instanceof FetchEvent&&(e=t.event.resultingClientId);await async function(t){if(!t)return;let e=await self.clients.matchAll({type:"window"});const s=new Set(e.map((t=>t.id)));let n;const i=performance.now();for(;performance.now()-i<2e3&&(e=await self.clients.matchAll({type:"window"}),n=e.find((e=>t?e.id===t:!s.has(e.id))),!n);)await p(100);return n}(e)&&!R||await p(3500)}const s=await self.clients.matchAll({type:"window"});for(const t of s)t.postMessage(e)}}}function D(t){t.then((()=>{}))}class b{constructor(t,e,{onupgradeneeded:s,onversionchange:n}={}){this.U=null,this.C=t,this.k=e,this.A=s,this.O=n||(()=>this.close())}get db(){return this.U}async open(){if(!this.U)return this.U=await new Promise(((t,e)=>{let s=!1;setTimeout((()=>{s=!0,e(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this.C,this.k);n.onerror=()=>e(n.error),n.onupgradeneeded=t=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.A&&this.A(t)},n.onsuccess=()=>{const e=n.result;s?e.close():(e.onversionchange=this.O.bind(this),t(e))}})),this}async getKey(t,e){return(await this.getAllKeys(t,e,1))[0]}async getAll(t,e,s){return await this.getAllMatching(t,{query:e,count:s})}async getAllKeys(t,e,s){return(await this.getAllMatching(t,{query:e,count:s,includeKeys:!0})).map((t=>t.key))}async getAllMatching(t,{index:e,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([t],"readonly",((r,o)=>{const c=r.objectStore(t),h=e?c.index(e):c,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const t=l.result;t?(u.push(a?t:t.value),i&&u.length>=i?o(u):t.continue()):o(u)}}))}async transaction(t,e,s){return await this.open(),await new Promise(((n,i)=>{const a=this.U.transaction(t,e);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,(t=>n(t)))}))}async P(t,e,s,...n){return await this.transaction([e],s,((s,i)=>{const a=s.objectStore(e),r=a[t].apply(a,n);r.onsuccess=()=>i(r.result)}))}close(){this.U&&(this.U.close(),this.U=null)}}b.prototype.OPEN_TIMEOUT=2e3;const N={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[t,e]of Object.entries(N))for(const s of e)s in IDBObjectStore.prototype&&(b.prototype[s]=async function(e,...n){return await this.P(s,e,t,...n)});try{self["workbox:expiration:6.1.5"]&&_()}catch(t){}const U="cache-entries",C=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class k{constructor(t){this.T=t,this.U=new b("workbox-expiration",1,{onupgradeneeded:t=>this.L(t)})}L(t){const e=t.target.result.createObjectStore(U,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1}),(async t=>{await new Promise(((e,s)=>{const n=indexedDB.deleteDatabase(t);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{e()}}))})(this.T)}async setTimestamp(t,e){const s={url:t=C(t),timestamp:e,cacheName:this.T,id:this.S(t)};await this.U.put(U,s)}async getTimestamp(t){return(await this.U.get(U,this.S(t))).timestamp}async expireEntries(t,e){const s=await this.U.transaction(U,"readwrite",((s,n)=>{const i=s.objectStore(U).index("timestamp").openCursor(null,"prev"),a=[];let r=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.T&&(t&&n.timestamp<t||e&&r>=e?a.push(s.value):r++),s.continue()}else n(a)}})),n=[];for(const t of s)await this.U.delete(U,t.id),n.push(t.url);return n}S(t){return this.T+"|"+C(t)}}class A{constructor(t,e={}){this.W=!1,this.j=!1,this.M=e.maxEntries,this.F=e.maxAgeSeconds,this.K=e.matchOptions,this.T=t,this.B=new k(t)}async expireEntries(){if(this.W)return void(this.j=!0);this.W=!0;const t=this.F?Date.now()-1e3*this.F:0,e=await this.B.expireEntries(t,this.M),s=await self.caches.open(this.T);for(const t of e)await s.delete(t,this.K);this.W=!1,this.j&&(this.j=!1,D(this.expireEntries()))}async updateTimestamp(t){await this.B.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.F){return await this.B.getTimestamp(t)<Date.now()-1e3*this.F}return!1}async delete(){this.j=!1,await this.B.expireEntries(1/0)}}addEventListener("install",(()=>{skipWaiting()}));const O=new class extends g{async _(t,s){let n,i=await s.cacheMatch(t);if(!i)try{i=await s.fetchAndCachePut(t)}catch(t){n=t}if(!i)throw new e("no-response",{url:t.url,error:n});return i}}({cacheName:"assets",plugins:[new class{constructor(t={}){var e;this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.H(n),a=this.I(s);D(a.expireEntries());const r=a.updateTimestamp(e.url);if(t)try{t.waitUntil(r)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.I(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.$=t,this.F=t.maxAgeSeconds,this.G=new Map,t.purgeOnQuotaError&&(e=()=>this.deleteCacheAndMetadata(),d.add(e))}I(t){if(t===l())throw new e("expire-custom-caches-only");let s=this.G.get(t);return s||(s=new A(t,this.$),this.G.set(t,s)),s}H(t){if(!this.F)return!0;const e=this.J(t);if(null===e)return!0;return e>=Date.now()-1e3*this.F}J(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.G)await self.caches.delete(t),await e.delete();this.G=new Map}}({maxEntries:100})]});c(/(\/|\.html)$/,new class extends g{constructor(t){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(v)}async _(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));let i,a=await s.cacheMatch(t);if(a);else try{a=await n}catch(t){i=t}if(!a)throw new e("no-response",{url:t.url,error:i});return a}}({cacheName:"pages",plugins:[new class{constructor(t){this.cacheDidUpdate=async t=>{D(this.V.notifyIfUpdated(t))},this.V=new E(t)}}]})),c(/\.(css|m?js|svg|woff2|png|jpg|gif|json|xml)$/,O)}();
