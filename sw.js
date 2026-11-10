// Increment VERSION when publishing changes. Activates after old app windows close.
const VERSION='cd49-v1';
const PREFIX='career-design-'+self.registration.scope;
const CACHE=PREFIX+VERSION;
const ROOT=new URL('./',self.location.href);
const SHELL=['./','./index.html','./manifest.webmanifest','./pwa.css','./pwa.js','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==ROOT.origin||!url.href.startsWith(ROOT.href))return;
 if(request.mode==='navigate'){
  if(url.pathname!==ROOT.pathname&&url.pathname!==new URL('index.html',ROOT).pathname)return;
  event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',ROOT).href)));return;
 }
 if(SHELL.includes(url.href))event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(request))||fetch(request)));
});
