/* Production bootstrap: load only the release storage. No automatic Demo. */
load(); save(); KPI_LAST=kpiValues();
new MutationObserver(function(){animateKPIs();}).observe(document.body,{childList:true,subtree:true});
if('scrollRestoration' in history) history.scrollRestoration='manual';
render(); window.scrollTo(0,0); if(!DEMO)splashBoot();else document.documentElement.classList.remove('growth-starting');
scheduleCheckin36();
function hashCI(){ if(S.name && location.hash==='#checkin'){ try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){} setTimeout(function(){ openCI(dk()); },350); } }
hashCI(); window.addEventListener('hashchange',hashCI);
if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); }catch(e){} }
if(document.readyState==='complete')startSW32();else window.addEventListener('load',startSW32,{once:true});

