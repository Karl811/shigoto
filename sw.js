/* Shin routine · M3.3.20 · cache riêng theo địa chỉ cài app */
const VERSION='M3.3.20-5S.2';
const SCOPE=self.registration.scope;
const PREFIX='shin-m3-release:'+encodeURIComponent(SCOPE)+':';
const CACHE=PREFIX+VERSION;
const CORE=["assets/breathing/river.svg","assets/breathing/hills.svg","assets/breathing/night.svg","assets/breathing/inhale.mp3","assets/breathing/exhale.mp3","assets/breathing/hold.mp3","scripts/extensions.js","styles/extensions.css","styles/habits.css","habit-game.html","assets/game/habit-game.js","assets/game/habit-game.css","assets/game/matter-0.19.0.min.js","scripts/interaction.js","index.html","scripts/habits.js","assets/fonts/dancing-script-regular.ttf","assets/touch/circle-check.svg","assets/touch/circle-minus.svg","scripts/core.js","scripts/interface.js","styles/components.css","boot.js","design-system.js","design-system.css","design-game.css","styles/base.css","manifest.webmanifest","icon-192.png","icon-512.png","assets/fonts/roboto-flex-vietnamese.woff2","assets/fonts/roboto-flex-latin-ext.woff2","assets/fonts/roboto-flex-latin.woff2","assets/fonts/material-symbols-0.woff2","assets/fonts/noto-sans-jp-0.woff2"].map(p=>new URL(p+(/\.(?:js|css)$/.test(p)?'?v='+VERSION:''),SCOPE).href);
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(CORE);if(!self.registration.active)await self.skipWaiting();})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING'){event.waitUntil(self.skipWaiting());return;}if(event.data?.type==='GET_STATUS'&&event.ports?.[0])event.waitUntil((async()=>{const cache=await caches.open(CACHE);const entries=await Promise.all(CORE.map(u=>cache.match(u)));event.ports[0].postMessage({version:VERSION,scope:SCOPE,coreReady:entries.every(Boolean)});})());});
async function networkPage(request){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),4000);try{return await fetch(request,{signal:controller.signal});}finally{clearTimeout(timeout);}}
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url),local=url.origin===self.location.origin&&url.href.startsWith(SCOPE),font=['https://fonts.googleapis.com','https://fonts.gstatic.com'].includes(url.origin);
  if((!local&&!font)||url.pathname.endsWith('/sw.js'))return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await networkPage(request);if(!response.ok)throw Error('Navigation failed');const pageKey=url.pathname.endsWith('/')?new URL('index.html',url).href:request;await cache.put(pageKey,response.clone()).catch(()=>{});return response;}catch(e){return await cache.match(request,{ignoreSearch:true})||(request.destination!=='iframe'&&await cache.match(new URL('index.html',SCOPE).href))||new Response('Shin chưa chuẩn bị xong bản offline. Hãy mở lại khi có mạng.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}})());return;
  }
  const refresh=(async()=>{const response=await fetch(request);if(response.ok||response.type==='opaque'){const cache=await caches.open(CACHE);await cache.put(request,response.clone()).catch(()=>{});}return response;})();
  event.waitUntil(refresh.then(()=>{}).catch(()=>{}));
  event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(request);if(cached)return cached;try{return await refresh;}catch(e){return Response.error();}})());
});
