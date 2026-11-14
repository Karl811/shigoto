/* Canonical editable source. Section names record provenance, not imports. */

/* ===== SECTION: routine-pomodoro.js ===== */
/* A timestamp-based focus timer; no habit records, XP, or check-ins are written. */
var EVENING_TOMATO_SEQ=0;
function eveningTomato(){var id='tomato-'+(++EVENING_TOMATO_SEQ);return '<svg viewBox="0 0 280 260" aria-hidden="true"><defs><radialGradient id="'+id+'-red" cx="32%" cy="25%" r="80%"><stop stop-color="#FF7765"/><stop offset=".48" stop-color="#EB443B"/><stop offset="1" stop-color="#AD292C"/></radialGradient><linearGradient id="'+id+'-leaf" x2=".7" y2="1"><stop stop-color="#709B53"/><stop offset="1" stop-color="#315D40"/></linearGradient></defs><ellipse cx="140" cy="235" rx="79" ry="12" fill="#7D3025" opacity=".10"/><path d="M140 62C76 30 27 88 36 150c7 48 43 76 76 78 12 1 20-5 28-5s16 6 28 5c33-2 69-30 76-78 9-62-40-120-104-88Z" fill="url(#'+id+'-red)"/><path d="M140 68c-19-19-48-21-61-17l25 20-33 13c25 5 47-1 60-8l9 23 10-23c13 7 35 13 60 8l-33-13 25-20c-13-4-42-2-61 17Z" fill="url(#'+id+'-leaf)"/><path d="M140 69c-3-23 1-37 12-45" fill="none" stroke="#416C42" stroke-width="11" stroke-linecap="round"/><path d="M61 123c2-19 13-35 30-42" fill="none" stroke="#FFF5DF" stroke-width="10" stroke-linecap="round" opacity=".27"/><path d="M219 149c-2 31-21 56-42 64" fill="none" stroke="#8F222A" stroke-width="4" stroke-linecap="round" opacity=".22"/></svg>';}
function eveningTimer(){var prefs=S.evening||{},t=prefs.timer;if(t&&['idle','running','paused','done'].includes(t.phase)&&Number.isFinite(t.remaining)&&t.remaining>=0&&t.remaining<=10800000&&Number.isFinite(t.total)&&t.total>=60000&&t.total<=10800000&&(t.phase!=='running'||Number.isFinite(t.end)))return t;return {phase:'idle',remaining:(prefs.pomodoro||25)*60000,total:(prefs.pomodoro||25)*60000,end:0};}
function eveningTimerStore(t){S.evening=S.evening||{};S.evening.timer=t;save(true);}
function eveningTimeText(ms){var seconds=Math.max(0,Math.ceil(ms/1000));return Math.floor(seconds/60).toString().padStart(2,'0')+':'+(seconds%60).toString().padStart(2,'0');}
function eveningPomodoro(){openOv('');f2Mount('pomodoro',f2Head('Pomodoro','Tập trung một việc')+'<div class="f2-body evening-pomodoro" data-flow-type><p class="evening-pomo-eyebrow">MỘT VIỆC NHỎ · MỘT KHOẢNG TẬP TRUNG</p><div class="evening-tomato-stage">'+eveningTomato()+'<div class="evening-clock"><span id="eveningTimerText" role="timer">25:00</span><small id="eveningTimerLabel">Sẵn sàng bắt đầu</small></div></div><div class="evening-pomo-progress" aria-hidden="true"><i id="eveningTimerProgress"></i></div><label class="evening-duration" for="eveningPomoMinutes">Thời gian tập trung <span><input id="eveningPomoMinutes" type="number" min="1" max="180" step="1" inputmode="numeric" value="'+((S.evening||{}).pomodoro||25)+'"> phút</span></label><p class="evening-pomo-error" id="eveningPomoError" role="alert" hidden>Chọn thời gian từ 1 đến 180 phút, bằng số nguyên nhé.</p><div class="evening-pomo-actions"><button class="btn" id="eveningTimerMain" data-act="eveningTimerMain">'+mi('play_arrow')+'Bắt đầu</button><button class="flow-link" data-act="eveningTimerReset">'+mi('restart_alt')+'Đặt lại</button></div><div id="eveningPomoStatus" class="evening-pomo-status" role="status" aria-live="polite"></div><aside class="evening-pomo-shin">'+shin('focused')+'<p><b>Shin cùng bạn tập trung</b>Chọn một việc nhỏ, để những thứ dễ gây xao nhãng sang bên rồi bắt đầu. Bạn có thể tạm dừng khi cần.</p></aside><section class="evening-pomo-habits"><h2>Hỗ trợ những thói quen nào?</h2><p>Một khoảng tập trung có thể giúp bạn học tiếng Nhật, đọc một điều mới, quan sát hoặc ghi memo.</p><div>'+['5phut','quansat','memo','bot'].filter(function(id){return HMAP[id];}).map(function(id){return '<button class="flow-link" data-act="eveningPomoHabit" data-v="'+id+'">'+mi(m3HabitIcon(id))+esc(hname(id))+mi('chevron_right')+'</button>';}).join('')+'</div><p class="evening-pomo-note">Hết giờ, bạn tự nhìn lại việc đã làm. Phiên tập trung không tự cộng ngày rèn luyện.</p></section></div>');eveningTimerTick();}
function eveningTimerTick(){if(!S||!S.name)return;var t=eveningTimer(),remaining=t.phase==='running'?Math.max(0,t.end-Date.now()):t.remaining;if(t.phase==='running'&&remaining===0){t=Object.assign({},t,{phase:'done',remaining:0,end:0});eveningTimerStore(t);if(S.sound&&document.visibilityState==='visible')ting();var status=$('#eveningPomoStatus');if(status)status.textContent='Đã xong một khoảng tập trung. Nghỉ một chút rồi nhìn lại việc bạn vừa làm nhé.';}
 var clock=$('#eveningTimerText');if(!clock)return;if(clock.textContent!==eveningTimeText(remaining))clock.textContent=eveningTimeText(remaining);clock.setAttribute('aria-label','Còn '+eveningTimeText(remaining));if(clock.dataset.phase!==t.phase){clock.dataset.phase=t.phase;$('#eveningTimerLabel').textContent=({idle:'Sẵn sàng bắt đầu',running:'Đang tập trung',paused:'Đang tạm dừng',done:'Một khoảng tập trung đã xong'})[t.phase];var main=$('#eveningTimerMain');main.innerHTML=mi(t.phase==='running'?'pause':'play_arrow')+({idle:'Bắt đầu',running:'Tạm dừng',paused:'Tiếp tục',done:'Bắt đầu phiên mới'})[t.phase];}$('#eveningTimerProgress').style.width=Math.min(100,Math.max(0,(1-remaining/t.total)*100))+'%';$('#eveningPomoMinutes').disabled=t.phase==='running'||t.phase==='paused';}
function eveningTimerMain(){var t=Object.assign({},eveningTimer());if(t.phase==='running'){t.remaining=Math.max(0,t.end-Date.now());t.phase=t.remaining?'paused':'done';t.end=0;}else{if(t.phase==='idle'||t.phase==='done'){var field=$('#eveningPomoMinutes'),minutes=field?Number(field.value):(S.evening||{}).pomodoro||25;if(!Number.isInteger(minutes)||minutes<1||minutes>180){$('#eveningPomoError').hidden=false;field.focus();return;}S.evening=S.evening||{};S.evening.pomodoro=minutes;t.total=t.remaining=minutes*60000;}t.end=Date.now()+t.remaining;t.phase='running';}eveningTimerStore(t);var status=$('#eveningPomoStatus');if(status)status.textContent=t.phase==='running'?'Bắt đầu tập trung.':t.phase==='paused'?'Đã tạm dừng.':'';eveningTimerTick();}
document.addEventListener('change',function(e){if(e.target.id!=='eveningPomoMinutes')return;var n=Number(e.target.value),valid=Number.isInteger(n)&&n>=1&&n<=180;$('#eveningPomoError').hidden=valid;if(valid){var t=eveningTimer();if(t.phase==='running'||t.phase==='paused')return;S.evening=S.evening||{};S.evening.pomodoro=n;eveningTimerStore({phase:'idle',remaining:n*60000,total:n*60000,end:0});eveningTimerTick();}});
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b||!['eveningPomodoro','eveningTimerMain','eveningTimerReset','eveningPomoHabit'].includes(b.dataset.act))return;e.preventDefault();e.stopImmediatePropagation();if(b.dataset.act==='eveningPomodoro')eveningPomodoro();if(b.dataset.act==='eveningTimerMain')eveningTimerMain();if(b.dataset.act==='eveningTimerReset'){var n=(S.evening||{}).pomodoro||25;eveningTimerStore({phase:'idle',remaining:n*60000,total:n*60000,end:0});$('#eveningPomoStatus').textContent='Đã đặt lại.';eveningTimerTick();}if(b.dataset.act==='eveningPomoHabit'){EVENING_LIBRARY_ORIGIN=null;openHow(b.dataset.v);}},true);
setInterval(eveningTimerTick,500);document.addEventListener('visibilitychange',eveningTimerTick);window.addEventListener('pageshow',eveningTimerTick);

;
/* ===== SECTION: routine-play.js ===== */
/* M3.3.14: the game proposes existing cards. Only the existing setup flow enrolls a habit. */
var GAME14_IDS=[],GAME14_RETURN=false,GAME14_DEMO=null;
function shinGameResetScope14(){if(GAME14_DEMO!==DEMO){GAME14_IDS=[];GAME14_RETURN=false;GAME14_DEMO=DEMO;}}
function shinGameCatalog14(){return HABITS.filter(function(x){return !x.custom;}).map(function(x){return {id:x.id,title:x.t,shortTitle:x.s,description:x.act};});}
function shinGameSaved14(){shinGameResetScope14();return GAME14_IDS.slice();}
function shinGameResults14(ids){shinGameResetScope14();GAME14_IDS=Array.from(new Set(ids)).filter(function(id){return HMAP[id]&&!HMAP[id].custom;}).slice(0,HABITS.length);}
function shinGameSound14(){return !!S.sound;}
function shinGameHabitState14(id){var u=H(id);return {onHand:S.slots.includes(id),exists:!!u,label:libStatus(id)[0]};}
function shinGameIcon14(){return '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="12" y="5" width="40" height="28" rx="8" fill="#E4ECFA"/><rect x="24" y="15" width="16" height="12" rx="2" stroke="#E88640" stroke-width="3"/><path d="M13 31h38M18 32l5 19h18l5-19M22 41h20M27 32l2 19m8-19-2 19" stroke="#B56F45" stroke-width="2.5" stroke-linecap="round"/><rect x="2" y="45" width="14" height="14" rx="4" fill="#97B6E8" transform="rotate(-12 2 45)"/><circle cx="52" cy="51" r="9" fill="#EEC66E"/></svg>';}
var play14Library=eveningLibrary;
eveningLibrary=function(pick){var h=play14Library(pick);if(S.storeView!=='tools')return h;return h.replace('</div></section>','<button class="evening-tool play14-tool" data-act="gameOpen14"><span class="play14-tool-art">'+shinGameIcon14()+'</span><span><b>Tung thói quen</b><small>Chưa biết rèn gì? Tung thử để tìm một gợi ý.</small></span>'+mi('arrow_forward')+'</button></div></section>');};
function shinGameOpen14(){shinGameResetScope14();GAME14_RETURN=false;EVENING_LIBRARY_ORIGIN=null;FLOW_HOW_RETURN=null;FLOW_NOTE_RETURN=null;HABIT_RETURN33=null;NT=null;HW=null;CARD=null;openOv('');f2Mount('game14',f2Head('Tung thói quen','')+'<p class="play14-intro" data-flow-type>Tung thử cho vui nhé! Thói quen nào vào rổ, bạn xem rồi chọn điều phù hợp với mình.</p><iframe id="habitGame14" class="play14-frame" src="habit-game.html" title="Game tung thói quen vào rổ"></iframe>');}
function shinDispatch14(action,id){var b=document.createElement('button');b.hidden=true;b.dataset.act=action;if(id)b.dataset.v=id;(OV||document.body).appendChild(b);b.click();b.remove();}
function shinGameAction14(action,id){if(!OV||!$('#habitGame14',OV)||!GAME14_IDS.includes(id)||!HMAP[id])return;GAME14_RETURN=true;EVENING_LIBRARY_ORIGIN=null;PICK=null;FLOW_NOTE_RETURN=null;FLOW_HOW_RETURN=null;HABIT_RETURN33=null;NT=null;HW=null;
 if(action==='view'||S.slots.includes(id)){openCard(id,false);return;}
 if(action!=='choose')return;
 if(H(id)){shinDispatch14('slotit',id);return;}
 if(!S.slots.includes(null)){chooseSwap(id,'start');return;}
 openStart(id,false);
}
/* An explicit return also works without relying on a device's Back button. */
function shinGameReturnButton14(){if(!GAME14_RETURN||!OV||$('#habitGame14',OV))return;var head=$('.sh__h,.ci40-bar',OV);if(head&&!head.querySelector('[data-act=gameReturn14]')){var b=document.createElement('button');b.className='m3-icon-button';b.dataset.act='gameReturn14';b.setAttribute('aria-label','Về game Tung thói quen');b.innerHTML=mi('arrow_back');head.prepend(b);}}
var play14Mount=f2Mount;
f2Mount=function(kind,html,keepScroll){play14Mount(kind,html,keepScroll);shinGameReturnButton14();};
var play14SheetSet=sheetSet;
sheetSet=function(html){play14SheetSet(html);shinGameReturnButton14();};
var play14RenderPage=renderPage;
renderPage=function(){if(!OV)GAME14_RETURN=false;play14RenderPage();};
document.addEventListener('click',function(e){if(e.target===OV&&GAME14_RETURN){e.preventDefault();e.stopImmediatePropagation();if(FLOW_HOW_RETURN||FLOW_NOTE_RETURN)shinDispatch14('close');else shinGameOpen14();return;}var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(a==='gameOpen14'||a==='gameReturn14'){e.preventDefault();e.stopImmediatePropagation();shinGameOpen14();return;}if(a==='close'&&GAME14_RETURN&&OV&&!$('#habitGame14',OV)&&!FLOW_HOW_RETURN&&!FLOW_NOTE_RETURN){e.preventDefault();e.stopImmediatePropagation();shinGameOpen14();return;}},true);

;
/* ===== SECTION: routine-sheets.js ===== */
/* M3.3.14: same-document navigation stores view state only, never a copy of learner data. */
(function(){
'use strict';
var token='shin14-'+Date.now(),frames=[],index=0,busy=false,pending=0,drag=null;
var transient=['ST','CI','CARD','HW','LS','NT','PR','PICK','NBOPEN','NBTAB','SETOPEN','LETTER_FLOW37','TREE_DETAIL30','HABIT_RETURN33','FLOW_NOTE_RETURN','FLOW_HOW_RETURN','EVENING_LIBRARY_ORIGIN','GAME14_RETURN','VDAY','SBACK','SLOT','RETCI','FLOW_DAY','FLOW_HABIT','DW','JOURNAL_MODE31','JOURNAL_HABIT31','JOURNEY_TAB31','EVENING_REVIEW_OPEN'];
function copy(v){if(v===undefined)return null;try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
function kindOf(s){if(!s)return '';if(s.querySelector('#habitGame14'))return 'game14';if(s.querySelector('.lc')&&ST)return 'start';var kind=Array.from(s.classList).find(function(c){return /^f2-/.test(c)&&c!=='f2-sheet';});return kind?kind.slice(3):s.classList.contains('notebook34')?'notebook':'other';}
function stateOf(){var s=OV&&$('.sheet',OV),kind=kindOf(s),detail='';
 if(kind==='detail'&&CARD)detail=CARD.id+'|'+CARD.tab;
 else if(kind==='how'&&HW)detail=HW.id+'|'+HW.i;
 else if(kind==='start'&&ST)detail=(ST.id||'custom')+'|'+ST.i+'|'+!!ST.edit;
 else if(kind==='lesson'&&LS)detail=LS.id+'|'+LS.i;
 else if(kind==='record'&&NT)detail=NT.id+'|'+NT.day;
 else if(kind==='checkin'&&CI)detail=CI.date+'|'+(CI.done?'done':CI.wizard?CI.wizard.index:'');
 else if(kind==='notebook')detail=NBTAB;
 else if(kind==='letter'&&LETTER_FLOW37)detail=LETTER_FLOW37.milestone+'|'+LETTER_FLOW37.mode;
 else if(kind==='other'&&s){var title=s.querySelector('h2,.sh__h>b');detail=title?title.textContent.trim():'';}
 var state={page:PG,view:S.storeView,mode:JOURNAL_MODE31,key:PG+'|'+(PG===3?S.storeView:PG===1?JOURNAL_MODE31:'')+'|'+kind+'|'+detail,kind:kind,values:{},scroll:window.scrollY,sheetTop:s?s.scrollTop:0,innerTop:s&&$('.ci40-scroll,.f2-body,.lc,.letter-content37',s)?$('.ci40-scroll,.f2-body,.lc,.letter-content37',s).scrollTop:0,html:s?s.innerHTML:'',className:s?s.className:'',overlayClass:OV?OV.className:''};
 transient.forEach(function(n){state.values[n]=copy(window[n]);});return state;
}
function stash(){if(NT)flowStashNote();if(CI&&!CI.done)stashCI29();if(LETTER_FLOW37)stashLetterDraft37(true);}
function handle(s){if(!s||s.querySelector(':scope > .sheet14-grip'))return;var b=document.createElement('button');b.type='button';b.className='sheet14-grip';b.setAttribute('aria-label','Kéo xuống để đóng');b.setAttribute('data-flow-type','');b.innerHTML='<span aria-hidden="true"></span>';b.title='Kéo xuống để đóng';s.prepend(b);s.classList.add('sheet14-ready');}
function restore(f){document.documentElement.classList.add('back16');busy=true;stash();closeOv(true);PG=f.page;S.storeView=f.view;JOURNAL_MODE31=f.mode;render();
 if(f.kind){openOv('');Object.keys(f.values).forEach(function(n){window[n]=copy(f.values[n]);});var s=$('.sheet',OV);s.className=f.className;OV.className=f.overlayClass;
  if(f.kind==='game14')shinGameOpen14();
  else if(f.kind==='detail'&&CARD)drawCard();
  else if(f.kind==='how'&&HW)drawHow();
  else if(f.kind==='start'&&ST)drawStart();
  else if(f.kind==='record'&&NT&&H(NT.id))drawNote29();
  else if(f.kind==='checkin'&&CI)drawCI();
  else if(f.kind==='lesson'&&LS)drawLesson();
  else if(f.kind==='notebook'){NBOPEN=true;sheetSet(nbSheet());}
  else if(f.kind==='library')drawStore();
  else if(f.kind==='letter'&&LETTER_FLOW37)drawLetter37();
  else sheetSet(f.html);
  s=OV&&$('.sheet',OV);handle(s);if(s){s.scrollTop=f.sheetTop;var inner=$('.ci40-scroll,.f2-body,.lc,.letter-content37',s);if(inner)inner.scrollTop=f.innerTop;var title=$('.sh__h button,.ci40-bar button',s);if(title)title.focus({preventScroll:true});}
 }else{Object.keys(f.values).forEach(function(n){window[n]=copy(f.values[n]);});ST=null;CI=null;NT=null;CARD=null;HW=null;GAME14_RETURN=false;render();}
 window.scrollTo(0,f.scroll);document.querySelectorAll('#pv,.ov,.sheet,.m3-page').forEach(function(el){el.getAnimations().forEach(function(a){a.cancel();});});requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.remove('back16');});});setTimeout(function(){busy=false;frames[index]=stateOf();},0);
}
function sync(){pending=0;var s=OV&&$('.sheet',OV);handle(s);if(busy||!S.name)return;var f=stateOf();if(!frames.length){
 var old=history.state;frames=[f];index=0;
 /* Reload starts at Today; collapse internal entries from the prior document. */
 if(old&&old.shinNav14&&Number.isInteger(old.step)&&old.step>0){busy=true;history.go(-old.step);return;}
 if(f.kind){var root=copy(f);root.kind='';root.html='';root.key=PG+'|'+(PG===3?S.storeView:PG===1?JOURNAL_MODE31:'')+'||';frames=[root,f];history.replaceState({shinNav14:token,step:0},'');index=1;history.pushState({shinNav14:token,step:1},'');}
 else history.replaceState({shinNav14:token,step:0},'');
 return;
 }
 if(frames[index].key===f.key){frames[index]=f;return;}
 var found=-1;for(var i=index-1;i>=0;i--)if(frames[i].key===f.key){found=i;break;}
 if(found>=0){frames=frames.slice(0,found+1);frames[found]=f;busy=true;history.go(found-index);return;}
 frames=frames.slice(0,index+1);index++;frames.push(f);history.pushState({shinNav14:token,step:index},'');
}
function queue(){if(!pending)pending=setTimeout(sync,0);}
window.addEventListener('popstate',function(e){var h=e.state;if(h&&h.shinNav14===token&&frames[h.step]){index=h.step;restore(frames[index]);}else{busy=true;stash();closeOv();PG=0;GAME14_RETURN=false;render();setTimeout(function(){busy=false;frames=[stateOf()];index=0;history.replaceState({shinNav14:token,step:0},'');},0);}});
function dismiss(){if(!OV)return;stash();var close=$('.sh__h [data-act=close],.ci40-bar [data-act=close]',OV);if(close){close.click();return;}if(LETTER_FLOW37){letterBack37();return;}closeOv();render();}
/* A downward pull dismisses; upward motion or a short pull returns to place. */
document.addEventListener('pointerdown',function(e){var s=e.target.closest('.sheet');if(!s||e.button!==0||e.isPrimary===false)return;var grip=e.target.closest('.sheet14-grip'),head=e.target.closest('.sh__h,.ci40-bar');if(!grip&&(!head||e.target.closest('button,a,input,textarea,select')))return;drag={sheet:s,owner:grip||head,id:e.pointerId,x:e.clientX,y:e.clientY,start:performance.now(),dy:0,active:false};try{drag.owner.setPointerCapture(e.pointerId);}catch(ignore){}},true);
document.addEventListener('pointermove',function(e){var g=drag;if(!g||g.id!==e.pointerId)return;var dx=e.clientX-g.x,dy=e.clientY-g.y;if(!g.active){if(Math.abs(dx)>14&&Math.abs(dx)>Math.abs(dy)){drag=null;return;}if(dy<0){drag=null;return;}if(dy<8)return;g.active=true;g.sheet.classList.add('sheet14-dragging');}e.preventDefault();g.dy=Math.max(0,dy);g.sheet.style.transform='translate3d(0,'+g.dy+'px,0)';}, {capture:true,passive:false});
function resetDrag(cancel){var g=drag;if(!g)return;drag=null;g.sheet.classList.remove('sheet14-dragging');var elapsed=performance.now()-g.start,close=!cancel&&g.active&&(g.dy>84||g.dy>32&&g.dy/elapsed>.55);if(close){var end=function(){g.sheet.style.transform='';dismiss();};if(reduceMotion())end();else g.sheet.animate([{transform:g.sheet.style.transform,opacity:1},{transform:'translateY(100dvh)',opacity:.2}],{duration:200,easing:'cubic-bezier(.4,0,1,1)'}).finished.then(end,end);}else{if(g.active&&!reduceMotion())g.sheet.animate([{transform:g.sheet.style.transform},{transform:'translateY(0)'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});g.sheet.style.transform='';}}
document.addEventListener('pointerup',function(e){if(drag&&drag.id===e.pointerId)resetDrag(false);},true);
document.addEventListener('pointercancel',function(){resetDrag(true);},true);
document.addEventListener('lostpointercapture',function(e){if(drag&&drag.id===e.pointerId&&e.target===drag.owner)resetDrag(true);},true);
window.addEventListener('blur',function(){resetDrag(true);});
/* Escape follows the same view history as device Back. The close button still dismisses. */
window.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('.sheet14-grip')){e.preventDefault();dismiss();return;}if(e.key!=='Escape'||!OV)return;e.preventDefault();e.stopImmediatePropagation();if(window.breathEscape18&&window.breathEscape18())return;if(index>0)history.back();else dismiss();},true);
document.addEventListener('input',queue,true);document.addEventListener('change',queue,true);
document.addEventListener('click',function(){if(frames[index])frames[index].scroll=window.scrollY;queue();},true);
document.addEventListener('DOMContentLoaded',function(){new MutationObserver(queue).observe(document.body,{subtree:true,childList:true});queue();});
/* Keep the current position without writing browser history during scrolling. */
window.addEventListener('scroll',function(){if(!busy&&frames[index])frames[index].scroll=window.scrollY;},{passive:true});
document.addEventListener('scroll',function(e){if(busy||!frames[index]||!e.target.matches)return;if(e.target.matches('.sheet'))frames[index].sheetTop=e.target.scrollTop;if(e.target.matches('.ci40-scroll,.f2-body,.lc,.letter-content37'))frames[index].innerTop=e.target.scrollTop;},{capture:true,passive:true});
})();


;
/* ===== SECTION: curriculum14.js ===== */
/* Biên tập nội dung 14 thói quen · giữ mã thẻ và dữ liệu đã lưu. */
(function(){
var oldList=HABITS.slice(), removed=['camon','gopy','quansat','tiengnhat','loihua','bot'];
function set(id,patch){Object.assign(HMAP[id],patch);}
function recipe(id,k,a,w){return [k,a,w];}
set('chao',{s:'Chào hỏi và cảm ơn',t:'Chủ động chào hỏi và cảm ơn',
 act:'chào người đầu tiên gặp, nhìn mắt, mỉm cười',
 anchors:['bước qua cổng trường','vào lớp gặp thầy cô','được ai đó giúp','gặp lại người đã giúp mình hôm qua'],
 who:['người tươi tắn, dễ gần','người biết ơn','người ai cũng muốn làm cùng'],
 tiers:['Chủ động chào hoặc cảm ơn một người theo công thức mình chọn.','Nói rõ điều mình cảm ơn; chào rõ lời, nhìn người đối diện.','Giữ sự lễ phép với cả người quen, người mới và người phục vụ mình.'],
 ev:{q:'Bạn đã chào hỏi hoặc cảm ơn ai, về việc gì?',o:['Bác bảo vệ, cô lao công','Thầy cô','Bạn cùng lớp','Người hướng dẫn','Người đã giúp mình']},
 why:{now:'Một lời chào làm buổi gặp gỡ dễ chịu hơn. Một lời cảm ơn cụ thể cho người kia biết mình trân trọng sự giúp đỡ.',jp:'Chào hỏi khi đến, khi về và cảm ơn khi được giúp là những việc nhỏ để xây dựng quan hệ ở nơi làm việc.'},
 steps:[['Chủ động trước','Gặp người thì chào; được giúp thì cảm ơn, không chờ được nhắc.'],['Nhìn người đối diện, nói rõ lời','Khi cảm ơn, nói cụ thể người đó đã giúp gì.'],['Giữ lời chào và lòng biết ơn','Khi gặp lại, có thể nhắc một câu cảm ơn về chuyện hôm trước.']],
 dos:[['Chào rõ lời, nói trước rồi cúi','Vừa nhìn điện thoại vừa chào'],['Cảm ơn cả những việc nhỏ','Coi sự giúp đỡ là đương nhiên']],
 oops:['Chỉ chào hoặc cảm ơn người có chức vụ.','Nói cảm ơn cho xong mà không để ý người đã giúp.']});
SUG.chao=SUG.chao.concat(SUG.camon);
set('som',{s:'Đúng giờ, đúng hẹn',t:'Đúng giờ, đúng hẹn'});
SUG.som.push(['hẹn với bạn','ghi giờ hẹn và đến đúng giờ','người giữ chữ tín']);
set('5s',{s:'5S - Gọn gàng và ngăn nắp',t:'5S - Gọn gàng và ngăn nắp'});
set('anuong',{s:'Ăn uống dinh dưỡng, điều độ',t:'Ăn uống dinh dưỡng, điều độ'});
set('chitieu',{s:'Chi tiêu có kế hoạch',t:'Chi tiêu có kế hoạch'});
set('camxuc',{s:'Nhận biết và điều chỉnh cảm xúc',t:'Nhận biết và điều chỉnh cảm xúc'});
set('horenso',{s:'Báo cáo và xác nhận',t:'Báo cáo và xác nhận'});
set('giup',{s:'Giúp đỡ một việc',t:'Giúp đỡ một việc'});
set('memo',{g:3,s:'Quan sát, hỏi và ghi lại',t:'Quan sát, hỏi và ghi lại',
 anchors:['thầy cô hoặc Senpai hướng dẫn','thấy một cách làm hay','chưa hiểu một lời dặn','tan học, trước khi đứng dậy','đọc một tin mình muốn chia sẻ'],
 who:['người biết lắng nghe và học hỏi','người làm việc cẩn thận','người không cần nhắc hai lần'],
 tiers:['Ghi một lời dặn hoặc một điều quan sát được theo công thức đã chọn.','Chưa hiểu thì hỏi, nhắc lại điều đã hiểu rồi ghi cho rõ.','Đọc lại và thử áp dụng điều đã ghi; kiểm chứng nguồn trước khi chia sẻ thông tin.'],
 ev:{q:'Bạn quan sát, hỏi hoặc ghi lại điều gì?',o:['Lời dặn của thầy cô','Cách làm của Senpai','Điều chưa hiểu đã hỏi lại','Một lỗi và cách sửa','Nguồn tin đã kiểm tra']},
 why:{now:'Quan sát để thấy điều cần học, hỏi để hiểu đúng, ghi lại để nhớ và làm được.',jp:'Khi được chỉ việc, nghe kỹ, hỏi lại chỗ chưa rõ và ghi từ khóa giúp mình làm đúng hơn, tránh lặp lỗi.'},
 steps:[['Dừng lại để quan sát và nghe','Chú ý cách làm, điều được dặn và chỗ mình chưa hiểu.'],['Hỏi cho rõ, ghi từ khóa','Ai, việc gì, khi nào, lưu ý gì. Chưa rõ thì nhờ giải thích lại.'],['Đọc lại và thử áp dụng','Nhắc lại để xác nhận; lần sau mở sổ trước khi làm.']],
 dos:[['Ghi từ khóa rồi xác nhận','Chép cho nhiều nhưng chưa hiểu'],['Hỏi nguồn trước khi tin hoặc chia sẻ','Thấy nhiều người đăng thì tin ngay']],
 oops:['Ghi vào giấy rời rồi làm mất.','Quan sát thấy hay nhưng không thử áp dụng.','Ngại hỏi nên gật đầu dù chưa hiểu.'],
 safe:HMAP.quansat.safe});
SUG.memo=SUG.memo.concat(SUG.quansat);
set('xinloi',{g:4,s:'Lắng nghe và sửa sai',t:'Lắng nghe và sửa sai',
 act:'nghe hết lời góp ý, ghi một điều cần xem lại',
 anchors:['được thầy cô hoặc Senpai góp ý','nhận ra mình làm sai','được nhắc là quên việc','gặp lại người đã góp ý'],
 who:['người biết lắng nghe','người dám nhận trách nhiệm','người sửa sai bằng hành động'],
 mk:'Có thể hỏi thầy cô: “Có một việc nào em cần làm tốt hơn không ạ?”',
 tiers:['Nghe hết lời góp ý hoặc nhận lỗi khi biết mình sai, theo công thức đã chọn.','Làm rõ điều cần sửa và chọn một cách sửa cụ thể.','Thực hiện cách sửa, báo lại khi phù hợp và tránh lặp lỗi.'],
 ev:{q:'Bạn được góp ý hoặc đã sửa việc gì?',o:['Phát âm, bài học','Giờ giấc','Việc được giao','Cách làm việc','Cách cư xử với bạn']},
 why:{now:'Nghe rõ giúp mình biết cần sửa gì. Khi làm sai, nhận trách nhiệm và sửa việc giúp xây dựng lại niềm tin.',jp:'Trong công việc, hỏi lại chỗ chưa hiểu, tiếp nhận hướng dẫn và sửa lỗi cụ thể giúp cả nhóm làm việc thuận lợi hơn.'},
 steps:[['Nghe hết, làm rõ sự việc','Dừng việc khi an toàn để nghe. Chưa hiểu thì hỏi lại, không vội cãi hoặc kết luận người kia ghét mình.'],['Phân biệt góp ý và lỗi của mình','Góp ý chưa rõ thì trao đổi bình tĩnh. Nếu mình sai, xin lỗi và nhận đúng phần trách nhiệm.'],['Sửa bằng một hành động cụ thể','Ghi cách sửa, thực hiện và báo lại khi phù hợp.']],
 dos:[['Hỏi lại điều chưa rõ','Gật đầu nhưng chưa hiểu'],['Nhận đúng phần mình và nói cách sửa','Đổ lỗi hoặc xin lỗi cho xong']],
 oops:['Nghe góp ý thành “người ta không thích mình”.','Xin lỗi nhiều lần nhưng không thay đổi cách làm.'],
 safe:'Được góp ý không có nghĩa là bạn chắc chắn sai. Có thể trình bày điều mình biết một cách bình tĩnh. Nếu bị xúc phạm, đe dọa hoặc bạo lực, hãy tìm thầy cô hay người phụ trách để được hỗ trợ.',
 quiz:{sc:'Senpai góp ý một bước bạn làm chưa đúng, nhưng bạn chưa hiểu rõ. Bạn làm gì?',o:['Nghe hết, hỏi lại bước chưa rõ, ghi cách làm; nếu mình sai thì nhận lỗi và sửa.','Xin lỗi ngay cho xong dù chưa hiểu cần sửa gì.','Nghĩ Senpai không thích mình nên bỏ qua.'],ok:0,ex:'Lắng nghe để hiểu đúng trước. Nhận lỗi khi mình sai và sửa bằng việc cụ thể; không cần nhận mọi góp ý là lỗi của mình.'},
 dlg:[['shin','think','Được góp ý có phải lúc nào cũng cần xin lỗi không?'],['s','smile','Mình nghe hết rồi hỏi lại chỗ chưa hiểu. Nếu mình sai thì nhận lỗi và nói cách sửa.'],['shin','think','Còn khi mình có thông tin khác?'],['s','hi','Bình tĩnh nói điều mình biết, hỏi lại để cùng hiểu đúng. Điều quan trọng là sửa được việc, không phải nói cho thắng.']],
 poem:['Nghe cho hết lời','Hỏi điều chưa rõ','Sai thì nhận sửa','Tiến bộ mỗi ngày']});
SUG.xinloi=SUG.gopy.concat(SUG.xinloi);
PRAC.xinloi={type:'choose',q:'Thầy cô nhắc bạn ghi thiếu một việc. Bạn nên phản hồi thế nào?',o:['Em nghe lại để hiểu việc còn thiếu, ghi bổ sung và hẹn lúc làm xong.','Em nói tại bạn khác nên mình mới quên.','Em xin lỗi rồi thôi, không hỏi thêm.'],ok:0,ex:'Lắng nghe, làm rõ và sửa một việc cụ thể. Nếu mình quên thì nhận trách nhiệm.'};
set('ngu',{s:'Ngủ đủ giấc',t:'Ngủ đủ giấc',act:'cất điện thoại và chuẩn bị ngủ vào giờ đã chọn',
 anchors:['đến giờ chuẩn bị ngủ mình đã chọn','đánh răng buổi tối','soạn xong đồ cho ngày mai'],
 who:['người biết chăm sóc giấc ngủ','người tỉnh táo để học và làm việc'],
 tiers:['Chọn giờ thức dậy và giờ chuẩn bị ngủ phù hợp, bắt đầu bằng một việc nhỏ.','Giữ nhịp ngủ phù hợp với lịch học, hạn chế màn hình khi chuẩn bị ngủ.','Theo dõi sự tỉnh táo ban ngày và điều chỉnh lịch ngủ khi lịch học hoặc ca làm thay đổi.'],
 why:{now:'Có một nhịp ngủ phù hợp giúp mình chủ động chuẩn bị cho ngày mai, thay vì thức theo điện thoại.',jp:'Khi đi làm theo ca, cần sắp xếp giấc ngủ theo giờ bắt đầu công việc và thời gian đi lại, không áp một giờ ngủ cho tất cả.'},
 steps:[['Tính từ giờ cần thức dậy','Đặt mục tiêu khoảng 7–8 tiếng ngủ mỗi ngày theo nhu cầu của mình; chọn giờ chuẩn bị ngủ tương ứng.'],['Chuẩn bị trước giờ đã chọn','Soạn đồ cho mai, cất điện thoại xa tay và giảm những việc dễ kéo dài giờ ngủ.'],['Nhìn lại và điều chỉnh','Ghi giờ ngủ, giờ dậy hoặc cảm giác tỉnh táo. Lịch làm thêm hay ca làm đổi thì sắp lại, không bớt ngủ để cố làm hết việc.']],
 ev:{q:'Bạn đã làm gì để giữ giấc ngủ phù hợp?',o:['Chuẩn bị ngủ đúng giờ đã chọn','Để điện thoại xa giường','Soạn đồ cho ngày mai','Điều chỉnh giờ ngủ theo lịch học hoặc ca làm']},
 corner:'Giờ đi ngủ cần tính theo giờ phải dậy. Bạn học buổi sáng và bạn làm ca có thể cần lịch khác nhau; điều cần rèn là biết chuẩn bị, giữ nhịp và lắng nghe cơ thể.',
 dlg:[['shin','think','Có phải ai cũng phải ngủ trước 23 giờ không?'],['s','smile','Không cần cùng một giờ. Em xem mình cần dậy lúc nào, rồi dành thời gian ngủ phù hợp và chọn giờ chuẩn bị ngủ.'],['shin','think','Nếu đi làm thêm về muộn thì sao?'],['s','hi','Mình xem lại lịch làm và lịch học, trao đổi để sắp xếp phù hợp. Đừng để việc làm thêm lấy hết thời gian nghỉ ngơi.']],
 dos:[['Chọn giờ ngủ theo giờ cần dậy','Áp cùng một giờ cho mọi lịch học, ca làm'],['Chuẩn bị đồ và cất điện thoại trước','Nằm xuống rồi tiếp tục lướt mãi']],
 oops:['Chỉ đặt báo thức dậy mà không có giờ chuẩn bị ngủ.','Xem thêm một video rồi kéo dài giờ ngủ.'],
 quiz:{sc:'Mai bạn cần dậy sớm hơn thường lệ. Bạn nên làm gì tối nay?',o:['Chọn giờ chuẩn bị ngủ sớm hơn, soạn đồ và cất điện thoại để dành đủ thời gian nghỉ.','Vẫn lướt điện thoại như mọi hôm rồi uống cà phê bù.','Cố học bù tới khuya vì ngủ ít một chút cũng không sao.'],ok:0,ex:'Chủ động sắp xếp từ giờ cần dậy; công thức ngủ cần hợp với lịch sinh hoạt của bạn.'},
 poem:['Biết giờ cần dậy','Chọn lúc nghỉ ngơi','Cất màn hình thôi','Mai mình tỉnh táo']});
SUG.ngu=[['đến giờ chuẩn bị ngủ đã chọn','cất điện thoại xa giường và chuẩn bị ngủ','người biết chăm sóc bản thân'],['soạn cặp buổi tối','chuẩn bị đồ cho mai để không phải thức muộn','người sống có kế hoạch'],['biết lịch học hoặc ca làm ngày mai','chọn giờ ngủ dựa trên giờ cần thức dậy','người chủ động giữ sức khỏe']];
PRAC.ngu={type:'pick',q:'Chọn những việc giúp bạn chuẩn bị cho giấc ngủ phù hợp.',tokens:['Chọn giờ ngủ theo giờ cần dậy','Xem thêm một tập phim','Soạn đồ cho ngày mai','Cố thức bù bài mỗi tối','Cất điện thoại xa giường','Chơi thêm một ván game'],ok:[0,2,4],box:'CHUẨN BỊ NGỦ',win:'Chọn giờ phù hợp, chuẩn bị đồ và rời màn hình: bắt đầu từ một việc nhỏ.',bad:'Chọn việc giúp bạn giữ giờ chuẩn bị ngủ, thay vì kéo dài thời gian thức.'};
BEN.ngu='Biết sắp xếp giấc ngủ là một cách có trách nhiệm với sức khỏe và việc học, việc làm ngày mai.';
set('5phut',{g:3,s:'Tận dụng 05 phút',t:'Tận dụng 05 phút',act:'mở một việc học nhỏ đã chuẩn bị để làm',
 anchors:['đến lớp sớm, chờ vào học','chờ đến lượt làm hồ sơ','có 5–15 phút trống phù hợp','nghỉ trưa và đã nghỉ ngơi đủ'],
 who:['người biết tận dụng thời gian','người học hỏi từ việc nhỏ'],
 tiers:['Dùng một khoảng trống phù hợp để làm một việc học nhỏ đã chọn.','Chuẩn bị sẵn việc học vừa với khoảng 5–15 phút mình có.','Linh hoạt học ở trường và nơi làm việc, ghi lại điều có thể dùng cho lần sau.'],
 why:{now:'Một khoảng chờ có thể đủ để ôn vài chữ, tập vài câu hoặc ghi lại điều vừa được chỉ.',jp:'Đi làm vẫn có thể học từ công việc: nhớ tên dụng cụ, từ vựng máy móc và cách sửa lỗi. Chọn lúc nghỉ phù hợp, không ảnh hưởng an toàn hay thời gian hồi sức.'},
 steps:[['Nhận ra khoảng trống phù hợp','Có thể là 5, 10 hoặc 15 phút; không cần lấp kín mọi lúc nghỉ.'],['Chọn một việc vừa với thời gian','Mở Hack-kanji, ôn vài chữ Hán, kaiwa vài câu hoặc tập một đoạn tự giới thiệu.'],['Giữ lại một điều dùng được','Khi đi làm, có thể ghi từ máy móc hoặc ý Senpai vừa chỉ, vào lúc được phép.']],
 ev:{q:'Bạn đã tận dụng khoảng trống để làm việc gì?',o:['Học Hack-kanji','Kaiwa với bạn','Tập tự giới thiệu phỏng vấn','Ôn vài từ Hán tự','Ghi từ máy móc','Ghi ý Senpai chỉ lỗi sai']},
 dos:[['Chuẩn bị một việc nhỏ sẵn dùng','Có lúc trống rồi mới loay hoay chọn'],['Học lúc phù hợp và giữ thời gian nghỉ','Dùng điện thoại khi đang đi đường hoặc thao tác máy']],
 oops:['Gọi là 5 phút nên bỏ qua khoảng trống 10–15 phút.','Cố học hết một bài lớn trong khoảng chờ ngắn.'],
 corner:'Một khoảng chờ ở trường có thể dùng để tập tự giới thiệu. Khi đã đi làm, lúc nghỉ phù hợp có thể ghi tên máy, tên dụng cụ hay điều Senpai vừa nhắc. Chỉ cần một điều dùng lại được.',
 dlg:[['shin','think','Tận dụng 05 phút có nghĩa là đúng năm phút thôi ạ?'],['s','smile','Có thể là 5, 10 hay 15 phút. Mình chọn việc nhỏ vừa với lúc trống, không cần làm hết một bài.'],['shin','think','Sang Nhật rồi mình học gì trong những lúc đó?'],['s','hi','Một từ tên dụng cụ hoặc một ý sửa lỗi Senpai vừa chỉ cũng là điều đáng ghi. Chọn lúc được phép và vẫn dành thời gian nghỉ.']],
 quiz:{sc:'Bạn tới lớp sớm, còn khoảng 10 phút. Cách tận dụng nào phù hợp?',o:['Chọn một việc nhỏ: Hack-kanji, kaiwa vài câu hoặc tập đoạn tự giới thiệu.','Không phải đúng 5 phút nên không tính.','Bắt đầu một bài dài dù sắp tới giờ học.'],ok:0,ex:'Tên “05 phút” nhắc mình bắt đầu nhỏ. Khoảng 10–15 phút cũng có thể dùng, miễn việc vừa sức và đúng lúc.'},
 poem:['Vài phút đợi chờ','Một điều học nhỏ','Ghi lại cho rõ','Mai dùng được ngay']});
SUG['5phut']=[['đến lớp sớm, chờ vào học','mở Hack-kanji, ôn một nhóm chữ nhỏ','người tiến bộ mỗi ngày'],['ngồi cùng bạn trước giờ học','kaiwa vài câu tiếng Nhật với bạn','người tự tin giao tiếp'],['chờ đến lượt làm hồ sơ','tập một đoạn tự giới thiệu phỏng vấn','người có sự chuẩn bị'],['có khoảng 10 phút trống','ôn lại vài từ Hán tự đã học','người biết tận dụng thời gian'],['nghỉ trưa ở nơi làm việc và đã nghỉ đủ','ghi vài từ tên máy hoặc dụng cụ vừa gặp','người học từ công việc'],['đến lúc nghỉ sau khi được Senpai chỉ lỗi','ghi lại một ý sửa để lần sau làm đúng','người biết sửa sai']];
PRAC['5phut']={type:'pick',q:'Bạn có 5–15 phút trống phù hợp. Chọn những việc vừa sức để học thêm một chút.',tokens:['Ôn một nhóm chữ trên Hack-kanji','Lướt video liên tục','Kaiwa vài câu với bạn','Xem trọn một tập phim','Tập một đoạn tự giới thiệu','Ghi một ý Senpai vừa chỉ'],ok:[0,2,4,5],box:'MỘT VIỆC NHỎ',win:'Một việc vừa thời gian là đủ. Không cần lấy hết thời gian nghỉ để học.',bad:'Chọn việc nhỏ, có ích và có thể dừng đúng lúc.'};
BEN['5phut']='Một khoảng trống phù hợp, một việc nhỏ: học thêm từ trường lớp và từ chính công việc của mình.';
set('viecko',{s:'Dám thử việc khó',t:'Dám thử việc khó',
 anchors:['thầy cô mời phát biểu','có điều muốn nói bằng tiếng Nhật','gặp một việc mình chưa từng làm','tìm hiểu một việc làm thêm phù hợp'],
 who:['người dám thử và học từ trải nghiệm','người chủ động chuẩn bị cho công việc'],
 tiers:['Thử một việc hơi ngại nhưng vừa sức theo công thức mình chọn.','Chuẩn bị, hỏi người có kinh nghiệm và làm thử đến nơi đến chốn.','Nhìn lại điều học được, thử bước tiếp theo hoặc đề xuất một cải tiến nhỏ.'],
 steps:[['Chọn một việc hơi ngại, vừa sức','Phát biểu trên lớp, nói một câu tiếng Nhật hoặc tìm hiểu một việc làm thêm phù hợp.'],['Chuẩn bị một bước rồi thử','Viết ý cần nói, tập với bạn; tìm hiểu việc làm thêm và trao đổi với thầy cô khi cần.'],['Rút ra một điều sau khi thử','Mình đã học gì, cần nhờ ai hỗ trợ, lần sau làm tốt hơn ở đâu?']],
 ev:{q:'Bạn đã thử việc gì, học được điều gì?',o:['Phát biểu trước lớp','Mạnh dạn nói tiếng Nhật','Nhận một việc mới','Tìm hiểu việc làm thêm','Thử công việc phù hợp']},
 safe:'Đi làm thêm là một lựa chọn để học trải nghiệm, không phải yêu cầu cho mọi bạn. Chọn việc phù hợp, rõ điều kiện, không ảnh hưởng học tập và nghỉ ngơi; trao đổi với thầy cô hoặc người phụ trách khi cần. Chỉ nhận việc vừa khả năng và được phép.',
 quiz:{sc:'Bạn chưa từng đi làm thêm và muốn có thêm kinh nghiệm. Bước đầu nào phù hợp?',o:['Tìm hiểu một việc rõ điều kiện, trao đổi lịch học rồi chuẩn bị trước khi thử.','Nhận ngay bất cứ việc nào để chứng tỏ mình không ngại.','Thấy sợ thì kết luận mình không làm được.'],ok:0,ex:'Dám thử đi cùng chuẩn bị và hỏi người có kinh nghiệm. Không cần liều hoặc làm quá sức.'}});
SUG.viecko=SUG.viecko.concat([['thầy cô mời phát biểu','giơ tay nói một ý mình đã chuẩn bị','người dám thử'],['muốn nói một câu bằng tiếng Nhật','nói thử với bạn hoặc thầy cô, chưa rõ thì hỏi lại','người tự tin giao tiếp'],['bắt đầu giờ luyện phỏng vấn','mạnh dạn tự giới thiệu bằng tiếng Nhật','người có sự chuẩn bị'],['muốn có thêm trải nghiệm đi làm','tìm hiểu một việc làm thêm phù hợp và lịch làm','người chủ động học từ trải nghiệm'],['đã chọn được việc làm thêm phù hợp','hỏi rõ việc, giờ làm và điều cần chuẩn bị','người có trách nhiệm']]);
SUG.camxuc.push(['nhận ra mình nghĩ đi nghĩ lại một chuyện','viết điều đang lo và một bước mình có thể làm','người biết chọn bước tiếp theo']);
SUG.anuong.push(['muốn uống nước ngọt theo thói quen','uống một ly nước lọc trước rồi chọn lại','người biết chăm sóc bản thân']);
SUG['5phut'].push(['định để bài lại làm sau','mở đúng bài và làm câu đầu tiên trong 2 phút','người chủ động bắt đầu']);
GROWTH_TIPS.push(['b5','Công thức mình chọn là một lời hứa nhỏ với chính mình. Chọn vừa sức, làm và nhìn lại để giữ lời.']);
PRAC.viecko={type:'pick',q:'Chọn những bước hơi ngại nhưng vừa sức để thử.',tokens:['Phát biểu một ý trước lớp','Nhận việc mơ hồ, bỏ học để làm','Nói thử một câu tiếng Nhật','Hỏi rõ điều kiện việc làm thêm','Nhận mọi việc dù chưa biết an toàn','Chuẩn bị rồi nhận một nhiệm vụ mới'],ok:[0,2,3,5],box:'DÁM THỬ CÓ CHUẨN BỊ',win:'Dám thử một bước vừa sức, có chuẩn bị và biết hỏi khi cần.',bad:'Chọn bước có ích, vừa sức và phù hợp với việc học, sức khỏe.'};
// Giữ ý nghĩa các gợi ý cũ; thay thẻ đích theo nội dung thực tế.
var target={camon:'chao',gopy:'xinloi',quansat:'memo',tiengnhat:'viecko',loihua:'5phut',bot:'5phut'};
ROUTINE_TEMPLATES.forEach(function(t){if(target[t.base])t.base=target[t.base];if(t.id==='giam-thuoc'){delete t.base;t.icon='la';}if(t.id==='phat-bieu')t.base='viecko';});
ROUTINE_TEMPLATES.forEach(function(t){if(t.base){var list=SUG[t.base]||(SUG[t.base]=[]);if(!list.some(function(a){return a[0]===t.k&&a[1]===t.a;}))list.push([t.k,t.a,t.w]);}});
// Thẻ giảm dần không còn là đầu vào của bộ mới; vẫn đọc được dữ liệu cũ.
HABITS=oldList.filter(function(h){return removed.indexOf(h.id)<0;});
[['chao','camon'],['memo','quansat'],['xinloi','gopy']].forEach(function(pair){HMAP[pair[0]].combos=Array.from(new Set(HMAP[pair[0]].combos.concat(HMAP[pair[1]].combos)));});
GROUPS=[{g:1,t:'Tác phong và tự tổ chức',d:'Giữ nếp từ việc nhỏ'},{g:2,t:'Chăm sóc và làm chủ bản thân',d:'Biết chăm sóc mình'},{g:3,t:'Học hỏi và tiến bộ',d:'Học từ lớp và công việc'},{g:4,t:'Giao tiếp và làm việc cùng nhau',d:'Có trách nhiệm với người khác'}];
HMAP.chitieu.g=1;HMAP.chao.g=4;
BEN.chao=HMAP.chao.why.now;BEN.memo=HMAP.memo.why.now;BEN.xinloi=HMAP.xinloi.why.now;
// Dẫn nội dung cũ vào đúng thẻ mới; lịch sử thẻ cũ tiếp tục giữ liên kết cũ.
GROWTH_CHALLENGES.forEach(function(t){var old=t.id,newId=target[old];if(newId)Object.defineProperty(t,'id',{enumerable:true,get:function(){return typeof S!=='undefined'&&S&&S.habits&&S.habits[old]?old:newId;}});});
var todayBase=flowTodayName;flowTodayName=function(id){return HABITS.some(function(h){return h.id===id;})?hname(id):todayBase(id);};
// Người đã rèn thẻ thuộc bộ cũ vẫn tìm và đọc/sửa được; người mới chỉ thấy 14 thẻ.
cardNo=function(id){var i=HABITS.findIndex(function(h){return h.id===id;});return i<0?'—':pad(i+1);};
var offerBase=offerTier;offerTier=function(id){if(['chao','memo','xinloi','ngu','5phut','viecko'].indexOf(id)>=0){cuTierSheet(id);return;}offerBase(id);};
})();

;
/* ===== SECTION: refinement16.js ===== */
/* M3.3.16: scoped presentation, new curriculum storage and transparent reflection. */
(function(){
'use strict';
var allowed16=HABITS.map(function(h){return h.id;});
Object.keys(HMAP).forEach(function(id){if(!HMAP[id].custom&&allowed16.indexOf(id)<0)delete HMAP[id];});
var def16=defState;defState=function(){var s=def16();s.curriculumVersion=16;s.review16={};return s;};
var valid16=validateState32;validateState32=function(d){if(!d||d.curriculumVersion!==16)throw Error('Bản M3.3.16 bắt đầu với bộ thói quen mới. Chỉ khôi phục bản sao của bộ mới này.');valid16(d);if(!stateObject32(d.review16||{}))throw Error('Nhịp ghi nhận không hợp lệ.');Object.keys(d.review16||{}).forEach(function(day){if(!validDate32(day)||!stateObject32(d.review16[day]))throw Error('Ngày ghi nhận không hợp lệ.');Object.keys(d.review16[day]).forEach(function(id){var a=d.review16[day][id];if(!stateObject32(a)||!['typed','suggestion','mixed','unknown'].includes(a.source)||!Number.isFinite(a.createdAt)||!Number.isFinite(a.updatedAt))throw Error('Thông tin ghi nhận không hợp lệ.');});});return d;};
var source16={};function key16(day,id){return day+'|'+id;}
function markSource16(id,day,type){var k=key16(day,id),old=source16[k],text=NT&&NT.id===id?NT.text:CI?CI.notes[id]:'';source16[k]=(type==='typed'&&(old==='suggestion'||old==='mixed')||type==='suggestion'&&old&&old!=='suggestion'&&String(text||'').trim())?'mixed':type;}
var write16=writeRecord;writeRecord=function(id,day,m,note,why){var previous=S.review16&&S.review16[day]&&S.review16[day][id],out=write16(id,day,m,note,why);if(!out)return out;out.review16=previous?JSON.parse(JSON.stringify(previous)):null;S.review16=S.review16||{};S.review16[day]=S.review16[day]||{};if(m){var now=Date.now();S.review16[day][id]={createdAt:previous?previous.createdAt:now,updatedAt:now,source:source16[key16(day,id)]||(previous&&previous.source)||'unknown'};}else delete S.review16[day][id];save(true);return out;};
var undo16=undoRecord29;undoRecord29=function(token){var old=RECORD_UNDO,ok=old&&String(old.token)===String(token)&&RECORD_VERSIONS[old.day+'|'+old.id]===old.token;undo16(token);if(ok){S.review16[old.day]=S.review16[old.day]||{};if(old.review16)S.review16[old.day][old.id]=old.review16;else delete S.review16[old.day][old.id];save(true);}};
document.addEventListener('input',function(e){if(NT&&e.target.id==='ntIn')markSource16(NT.id,NT.day,'typed');if(CI&&e.target.matches('[data-in=ciNote29]'))markSource16(e.target.dataset.id,CI.date,'typed');},true);
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;if(b.dataset.act==='ntChip'&&NT)markSource16(NT.id,NT.day,'suggestion');if(b.dataset.act==='ciNoteChip34'&&CI)markSource16(b.dataset.v.split('|')[0],CI.date,'suggestion');},true);

// Rebuild the demonstration from the 14 current cards only.
buildDemo=function(){var s=defState(),t=dk(),start=addD(t,-42);s.name='Minh Anh';s.cls='DEMO-KZ';s.teacher=4;s.created=start;s.introSeen=1;s.onboarded32=true;s.guideOff=true;s.gFlip=1;s.gHome=1;s.growth={goals:{},challenges:{},tips:0,enabled:true};s.evening={morningTime:'07:00',pomodoro:25};
 var notes={chao:'Chủ động chào bác bảo vệ và cảm ơn cô nấu ăn.',som:'Soạn đồ từ tối, ra khỏi phòng đúng giờ đã chọn.',memo:'Ghi lại lời dặn và hỏi lại hạn nộp hồ sơ.','5s':'Cất sách đúng chỗ và xếp giày gọn trước khi ra ngoài.',xinloi:'Nghe hết góp ý, hỏi rõ và sửa lại phần bài còn thiếu.','5phut':'Mở Hack-kanji ôn vài chữ trong lúc chờ vào lớp.',camxuc:'Dừng lại, hít chậm và gọi tên cảm xúc trước khi trả lời.',vandong:'Đi bộ một đoạn sau giờ học, thấy người tỉnh hơn.',anuong:'Ăn đủ bữa, thêm rau và mang bình nước.',ngu:'Cất điện thoại vào giờ đã chọn để dành đủ thời gian ngủ.',chitieu:'Ghi khoản chi hôm nay, phân biệt cần và muốn.',viecko:'Mạnh dạn giơ tay phát biểu một câu tiếng Nhật.',horenso:'Nhắc lại việc và thời hạn trước khi bắt đầu.',giup:'Hỏi bạn cần giúp gì sau khi xong phần mình.'};
 HABITS.forEach(function(h,i){var complete=i<10;var sug=(SUG[h.id]||[])[0];s.habits[h.id]={status:complete?'keep':'active',since:start,lv:complete?3:1,lvSince:complete?addD(t,-10):addD(t,-3),anchor:sug?sug[0]:h.anchors[0],act:sug?sug[1]:h.act,who:h.who[0]||'',quiz:'first',cf:complete?{2:{by:'Thanh Tâm',d:addD(t,-32)},3:{by:'Thầy cô',d:addD(t,-20)}}:{}};if(complete)s.habits[h.id].master=addD(t,-7);s.order.push(h.id);s.seen[h.id]=1;s.learnedXP[h.id]=1;s.growth.goals[h.id]=[{from:wkStart(start),n:4}];
 for(var j=complete?35:3;j>=1;j--){var day=addD(t,-j),m=complete?'y':j===2?'p':'y';if(h.cond&&m==='p')m='n';s.log[day]=s.log[day]||{};s.notes[day]=s.notes[day]||{};s.review16[day]=s.review16[day]||{};s.log[day][h.id]=m;s.notes[day][h.id]=notes[h.id];var stamp=new Date(day+'T20:30:00').getTime(),back=j===5&&i%3===0;s.review16[day][h.id]={createdAt:stamp+(back?86400000:0),updatedAt:stamp+(back?86400000:0),source:i%3===0?'mixed':i%3===1?'typed':'suggestion'};if(back){s.bf[day]=s.bf[day]||{};s.bf[day][h.id]=1;}s.opens[day]=1;s.ci[day]={t:'21:00',note:j%7===0?'Một tuần rèn từng việc nhỏ, mình biết hỏi lại khi chưa rõ.':'',p:0};}
 });
 s.custom.u1={name:'Chuẩn bị đồ cho ngày mai',icon:'but',g:6,act:'soạn sách và đồng phục',why:'Để sáng mai bình tĩnh và đến lớp đúng giờ.',born:addD(t,-6),dip:false};s.habits.u1={status:'active',since:addD(t,-6),lv:1,lvSince:addD(t,-6),anchor:'ăn tối xong',act:'soạn sách và đồng phục',who:'người có sự chuẩn bị'};s.order.push('u1');s.cseq=1;s.slots=HABITS.slice(10).map(function(h){return h.id;}).concat('u1');
 var d=dk();s.log[d]={chitieu:'y',viecko:'p'};s.notes[d]={chitieu:notes.chitieu,viecko:'Đã tập một câu với bạn, mình sẽ thử phát biểu trước lớp lần tới.'};s.review16[d]={chitieu:{createdAt:Date.now(),updatedAt:Date.now(),source:'typed'},viecko:{createdAt:Date.now(),updatedAt:Date.now(),source:'mixed'}};s.opens[d]=1;s.mood[addD(d,-1)]='4';LESSONS.forEach(function(l){s.les[l.id]={done:1,w:'Mình chọn một việc nhỏ vừa sức và nhìn lại cách mình thực hiện.'};});s.xp=3850;s.ins=18;s.week[wkStart(t)]={rate:{},win:'Đã giữ được 10 thói quen thành nếp; tiếp tục rèn những việc mới.',buddy:'Thanh Tâm'};return s;};

function goalButtons16(n){return '<div class="goal16" data-flow-type><p>Chọn số ngày bạn muốn rèn mỗi tuần.</p><div class="goal16-buttons" role="radiogroup" aria-label="Mục tiêu mỗi tuần">'+[1,2,3,4,5,6,7].map(function(i){return '<button type="button" role="radio" data-act="goalPick16" data-v="'+i+'" aria-checked="'+(i===n)+'">'+i+'</button>';}).join('')+'</div><p class="goal16-label"><b>'+n+' ngày mỗi tuần</b></p><p class="note">Một ngày Đã làm tính một lần. Có thể rèn thêm nếu muốn.</p></div>';}
growthGoalPicker=goalButtons16;
openFirstForm32=function(id){openStart(id,false);};
var drawStart16=drawStart;drawStart=function(){if(!ST)return;var step=ST.steps[ST.i];if(step==='goal16'){ST.weekGoal=ST.weekGoal||growthGoal(ST.id)||4;sheetSet(shinWizardHeader(ST)+'<div class="lc">'+goalButtons16(ST.weekGoal)+'</div><footer class="sbar"><span class="st">Một mục tiêu vừa sức</span><button class="btn" data-act="stNext">'+(ST.edit?'Lưu thay đổi':'Bắt đầu rèn')+'</button></footer>');}
 else drawStart16();var sheet=OV&&$('.sheet',OV);if(!sheet)return;sheet.classList.add('wizard16');sheet.classList.toggle('custom16',!!ST.cust);sheet.classList.toggle('quiz16',step==='quiz');if(ST.cust)sheet.setAttribute('data-flow-type','');var skip=$('[data-act=stSkipQ]',sheet);if(skip){skip.innerHTML='Xem sau, rèn luôn '+mi('arrow_forward');skip.setAttribute('data-flow-type','');}if(step==='w'){var b=$('[data-act=flowWhoNone]',sheet);if(b)b.textContent='Bỏ qua bước này';}sheet.scrollTop=0;var lc=$('.lc',sheet);if(lc)lc.scrollTop=0;};
var runtime16=updateRuntime32;updateRuntime32=function(){runtime16();var el=$('#runtime32[data-kind=offline]');if(el){var text=$('span',el);if(text){text.textContent=SW_READY32?'Đang offline · Vẫn lưu trên máy':'Đang offline · Giữ trang này mở';}}};

// Chips are an explicit choice, not an automatic answer.
f2Hints=function(id,status,act,prefix,open){var E=noteHints34(id,status);return '<details class="f2-suggestions hints16" open><summary>Gợi ý ghi chú '+mi('expand_more')+'</summary><div>'+E.o.map(function(o,i){return '<button type="button" class="chp'+(i>2?' hint16-extra':'')+'" data-act="'+act+'" data-v="'+esc((prefix?id+'|':'')+o)+'">'+esc(o)+'</button>';}).join('')+(E.o.length>3?'<button class="hint16-more flow-link" type="button" data-act="hintMore16">Xem thêm '+mi('expand_more')+'</button>':'')+'</div></details>';};
var note16=drawNote29;drawNote29=function(){if(!NT)return;if(!NT.quick16){note16();var sheet=OV&&$('.sheet',OV);if(sheet)sheet.classList.add('record16');return;}var id=NT.id;ci40Mount('quick16','<header class="ci40-top"><div class="ci40-bar"><b id="f2DialogTitle">'+esc(sname(id))+'</b><button class="m3-icon-button" data-act="close" aria-label="Đóng">'+mi('close')+'</button></div></header><div class="ci40-scroll"><div class="quick16-status"><b>'+esc(RECORD_LABEL[NT.ans])+'</b><button class="flow-link" data-act="quickChange16">Đổi kết quả</button></div><div class="ci40-body">'+ci40Field(id,NT.ans,true)+'</div></div><footer class="ci40-footer"><button class="btn ci40-primary" id="ntGo" data-act="ntSave"'+(String(NT.text||'').trim()?'':' disabled')+'>Lưu ghi nhận '+mi('check')+'</button><button class="flow-link" data-act="flowMemoLater">Đóng và giữ bản nháp</button></footer>',false);$('.sheet',OV).classList.add('quick16','record16');};
window.openQuick16=function(id,ans){openNote(id,dk());if(NT){NT.ans=ans;NT.quick16=true;flowStashNote();drawNote29();var input=$('#ntIn');if(input)input.focus({preventScroll:true});}};
var ciMount16=ci40Mount;ci40Mount=function(kind,html,keep){ciMount16(kind,html,keep);var top=$('.ci40-top',OV);if(top)top.style.position='relative';};
var flowWeek16=flowWeek;flowWeek=function(){var box=document.createElement('div');box.innerHTML=flowWeek16();$$('.evening-day-review,.play14-saved-head,.play14-saved',box).forEach(function(el){el.remove();});return box.innerHTML;};
var renderHead16=renderHead;renderHead=function(){renderHead16();var title=$('#pageTitle35'),star=$('#saved16');if(PG!==1&&star)star.remove();if(title)title.parentElement.classList.toggle('week-title16',PG===1);if(PG===1&&title&&!$('#saved16')){var b=document.createElement('button');b.id='saved16';b.className='m3-icon-button';b.dataset.act='eveningSaved';b.innerHTML=mi('star');title.insertAdjacentElement('afterend',b);}star=$('#saved16');if(star){star.setAttribute('aria-label',JOURNAL_MODE31==='saved'?'Về tuần đang xem':'Đáng nhớ');star.setAttribute('aria-pressed',String(JOURNAL_MODE31==='saved'));}};
var mini16=eveningMini;eveningMini=function(id,how){var html=mini16(id,how);return !how&&H(id)&&H(id).status==='active'?html.replace('class="evening-mini','class="evening-mini training16'):html;};
var week16=drawWeek;drawWeek=function(){week16();var root=$('.wk',OV);if(!root)return;var ws=WK,lines=[],sourceNames={typed:'Tự nhập',suggestion:'Dùng gợi ý',mixed:'Gợi ý và chỉnh sửa',unknown:'Chưa phân loại'};for(var i=0;i<7;i++){var d=addD(ws,i),entries=Object.keys((S.review16||{})[d]||{}),parts=[];if(S.opens[d])parts.push('Có mở app');entries.forEach(function(id){var a=S.review16[d][id],when=new Date(a.createdAt),date=dk(when);parts.push(esc(sname(id))+': '+(date===d?'Ghi trong ngày':'Bổ sung ngày '+dm(date))+' · '+sourceNames[a.source]);});if(parts.length)lines.push('<li><b>'+dm(d)+'</b><span>'+parts.join('<br>')+'</span></li>');}
 root.insertAdjacentHTML('beforeend','<details class="review16" data-flow-type><summary>Nhịp ghi nhận trong tuần '+mi('expand_more')+'</summary><p>Giúp bạn và thầy cô nhìn lại nhịp rèn luyện và nhận ra lúc cần hỗ trợ. Ghi bù và dùng gợi ý đều được ghi nhận rõ ràng.</p><ul>'+lines.join('')+'</ul><p>Thông tin lưu trên máy. Bạn chủ động chọn chia sẻ khi lưu ảnh thẻ tuần.</p><label><input type="checkbox" id="shareReview16"> Kèm nhịp ghi nhận khi lưu ảnh</label></details>');};
window.reviewLines16=function(ws){var lines=[];for(var i=0;i<7;i++){var day=addD(ws,i),entries=Object.values((S.review16||{})[day]||{}),same=entries.filter(function(a){return dk(new Date(a.createdAt))===day;}).length,typed=entries.filter(function(a){return a.source==='typed';}).length,mixed=entries.filter(function(a){return a.source==='mixed';}).length,sug=entries.filter(function(a){return a.source==='suggestion';}).length;if(entries.length||S.opens[day])lines.push(dm(day)+' · '+(S.opens[day]?'Có mở app · ':'')+same+' ghi trong ngày, '+(entries.length-same)+' bổ sung · Tự nhập '+typed+', gợi ý '+sug+', chỉnh gợi ý '+mixed);}return lines;};

// Same fixed stage for both faces. Content alone may scroll.
flowFitCard=function(){var stage=$('.flow-card-stage'),body=stage&&stage.parentElement;if(!stage||!body)return;var cs=getComputedStyle(body),h=Math.max(120,body.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom));stage.style.height=h+'px';stage.style.setProperty('--card-scale','1');stage.style.setProperty('--ref12-s','1');$$('.flow-paper',stage).forEach(function(paper){paper.style.transform='';paper.style.height=h+'px';});};
var lastCard16=null,drawCard16=drawCard;drawCard=function(){if(CARD){CARD.scroll16=CARD.scroll16||{};var old=$('#habit-body33');if(old&&lastCard16&&lastCard16.id===CARD.id){var paper=shinActivePaper(old),faceBack=paper&&paper.classList.contains('flow-back');paper=paper&&(paper.querySelector('.shin-back-copy')||paper);CARD.scroll16[lastCard16.tab+':'+!!faceBack]=paper?paper.scrollTop:old.scrollTop;}}drawCard16();var sheet=OV&&$('.sheet',OV);if(sheet){sheet.classList.add('detail16');var now=CARD&&{id:CARD.id,tab:CARD.tab};lastCard16=now;requestAnimationFrame(function(){flowFitCard();if(CARD&&now&&CARD.id===now.id){var body=$('#habit-body33'),paper=body&&shinActivePaper(body);paper=paper&&(paper.querySelector('.shin-back-copy')||paper);if(paper)paper.scrollTop=CARD.scroll16&&CARD.scroll16[now.tab+':'+!!CARD.back]||0;else if(body)body.scrollTop=CARD.scroll16&&CARD.scroll16[now.tab+':'+!!CARD.back]||0;}});}};

// A real 390px iframe exercises phone media queries, rather than shrinking desktop CSS.
function addPreview16(){if(window.top!==window.self||innerWidth<900||$('#preview16'))return;var b=document.createElement('button');b.id='preview16';b.textContent='Xem điện thoại';b.setAttribute('data-flow-type','');b.addEventListener('click',function(){var shell=$('#phone16');if(shell){shell.remove();b.textContent='Xem điện thoại';load();render();return;}shell=document.createElement('div');shell.id='phone16';shell.innerHTML='<iframe title="Xem giao diện điện thoại" src="'+esc(location.pathname+location.search)+'"></iframe>';document.body.appendChild(shell);b.textContent='Về máy tính';});document.body.appendChild(b);}
document.addEventListener('DOMContentLoaded',addPreview16);window.addEventListener('resize',addPreview16);
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(a==='goalPick16'&&ST){e.preventDefault();ST.weekGoal=+b.dataset.v;drawStart();}if(a==='hintMore16'){e.preventDefault();b.closest('.hints16').classList.add('expanded16');b.hidden=true;}if(a==='quickChange16'&&NT){e.preventDefault();NT.quick16=false;drawNote29();}},true);
})();


;
/* ===== SECTION: breath18.js ===== */
/* Tập thở: original scene art, phase-linked Shin, local Vietnamese voice.
   Preferences only. A session never grants habit credit, streaks or XP. */
(function(){
'use strict';
var presets={
 easy:{title:'Nhịp 3–0–3',description:'Hít 3 giây · Không giữ · Thở 3 giây',phases:[{text:'Hít vào',seconds:3,kind:'in'},{text:'Thở ra',seconds:3,kind:'out'}]},
 box:{title:'Thở hộp',description:'Hít 4 · Giữ nhẹ 4 · Thở 4 · Giữ nhẹ 4 giây',phases:[{text:'Hít vào',seconds:4,kind:'in'},{text:'Giữ nhẹ',seconds:4,kind:'holdIn'},{text:'Thở ra',seconds:4,kind:'out'},{text:'Giữ nhẹ',seconds:4,kind:'holdOut'}]}
};
var scenes={river:'Ven sông',hills:'Núi đồi',night:'Phố đêm'};
var state=null,frame=0,lastStage=null,audio=null,source=null,voiceLoading=null,buffers={},voiceToken=0,voiceError='';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
// Local SVG icons keep this tool independent of the app's subset icon font.
function mi(name){var paths={arrow_back:'M19 12H5m7-7-7 7 7 7',arrow_forward:'M5 12h14m-7-7 7 7-7 7',north:'M12 19V5m-7 7 7-7 7 7',expand_more:'m6 9 6 6 6-6',check:'m5 12 4 4L19 6',fullscreen:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',fullscreen_exit:'M3 8h5V3m8 0v5h5M8 21v-5H3m13 5v-5h5',tune:'M4 7h4m4 0h8M4 17h8m4 0h4M8 4v6m4-6v6m0 4v6m4-6v6',restart_alt:'M5 8V3m0 5h5M5 8a8 8 0 1 1-1 8',replay:'M5 8V3m0 5h5M5 8a8 8 0 1 1-1 8',pause:'M9 5v14m6-14v14'};return '<svg class="breath18-glyph" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="'+(name==='play_arrow'?'currentColor':'none')+'" stroke="currentColor" stroke-width="'+(name==='pause'?'3':'1.9')+'" stroke-linecap="round" stroke-linejoin="round"><path d="'+(name==='play_arrow'?'m9 5 11 7-11 7Z':paths[name]||paths.check)+'"/></svg>';}
function fresh(){var p=(S.evening||{}).breath17||{};return {mode:p.mode==='box'?'box':'easy',unit:p.unit==='breaths'?'breaths':'minutes',value:p.unit==='breaths'?([5,7,10].includes(p.value)?p.value:5):([1,2,3].includes(p.value)?p.value:1),scene:scenes[p.scene]?p.scene:'river',hat:p.hat!==false,glasses:!!p.glasses,voice:!!p.voice,status:'idle',index:0,elapsed:0,phaseElapsed:0,completed:0};}
function savePrefs(){S.evening=S.evening||{};S.evening.breath17={mode:state.mode,unit:state.unit,value:state.value,scene:state.scene,hat:state.hat,glasses:state.glasses,voice:state.voice};save(true);}
function phase(){return presets[state.mode].phases[state.index];}
function fmt(ms){var n=Math.ceil(Math.max(0,ms)/1000);return Math.floor(n/60)+':'+(n%60).toString().padStart(2,'0');}
function remainingMs(){if(state.status==='done')return 0;var phases=presets[state.mode].phases,cycle=0,position=state.phaseElapsed;phases.forEach(function(p,i){cycle+=p.seconds*1000;if(i<state.index)position+=p.seconds*1000;});var end=cycle-position,need=Math.max(0,state.value*60000-state.elapsed);return end+Math.max(0,Math.ceil((need-end)/cycle))*cycle;}
function put(sel,text){var el=$(sel);if(el&&el.textContent!==text)el.textContent=text;}
function speaker(on){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4Z"/>'+(on?'<path d="M16 8q5 4 0 8M18 5q8 7 0 14"/>':'<path d="m16 9 5 6m0-6-5 6"/>')+'</svg>';}
function icon(){return '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="5" y="5" width="54" height="54" rx="20" fill="#DCEAFF"/><path d="M15 25h22c10 0 10-15 1-15-5 0-7 3-7 6M11 34h35c12 0 12 18 1 18-5 0-8-3-8-7M17 43h10" fill="none" stroke="#3569B5" stroke-width="3" stroke-linecap="round"/></svg>';}
function character(){
 var mouth='<g class="breath18-mouth"><path class="breath18-mouth-rest" d="M54 70q3 3.5 6 0q3 3.5 6 0" stroke="#3A2A1C" stroke-width="2.6" fill="none" stroke-linecap="round"/><g class="breath18-mouth-in"><ellipse cx="60" cy="72" rx="3.4" ry="4.6" fill="#654439"/><path d="M58.5 73.5h3" stroke="#EBA8A7" stroke-width="1.5" stroke-linecap="round"/></g><g class="breath18-mouth-out"><ellipse cx="60" cy="72" rx="5" ry="6" fill="#654439"/><ellipse cx="60" cy="75" rx="2.8" ry="1.4" fill="#EBA8A7"/></g><path class="breath18-mouth-hold" d="M55 71q5 2 10 0" stroke="#3A2A1C" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>';
 var hat='<g class="breath18-hat"><path d="m36 28 4-16q20-9 40 0l4 16 8 6q-32 12-64 0Z" fill="#619BE8" stroke="#294C80" stroke-width="2.3" stroke-linejoin="round"/><path d="M37 25q23 8 46 0l1 5q-24 9-48 0Z" fill="#2C68B5"/><path d="M47 14q7-3 14-3" stroke="#BDDCFF" stroke-width="2.5" stroke-linecap="round"/></g>';
 var glasses='<g class="breath18-glasses" stroke="#37699F" stroke-width="2.2" fill="#A8D7FF" fill-opacity=".4"><rect x="37" y="51" width="22" height="16" rx="7"/><rect x="63" y="51" width="22" height="16" rx="7"/><path d="M59 57q2-2 4 0m-26-1-8-3m56 3 7-3" fill="none"/><path d="m41 55 6-1m20 1 6-1" stroke="#F3FAFF" stroke-width="1.8" stroke-linecap="round"/></g>';
 var art=shin('still').replace(/<path d="M54 70q3 3\.5 6 0q3 3\.5 6 0"[^>]*\/>/,mouth);
 art=art.replace(/<g class="blink">[\s\S]*?<\/g>/,'<path d="M42 58q6-5 12 0M66 58q6-5 12 0" stroke="#3A2A1C" stroke-width="3" fill="none" stroke-linecap="round"/>');
 return art.replace('</g></svg>',hat+glasses+'<g class="breath18-air" stroke="#87B8F3" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M52 77q-5 5-11 3M68 77q5 5 11 3M60 82v6"/></g></g></svg>');
}
var library17=eveningLibrary;eveningLibrary=function(pick){var h=library17(pick);if(S.storeView!=='tools')return h;return h.replace('</div></section>','<button class="evening-tool breath18-tool" data-act="breathOpen17"><span class="play14-tool-art">'+icon()+'</span><span><b>Tập thở cùng Shin</b><small>Một khoảng dừng nhẹ nhàng</small></span>'+mi('arrow_forward')+'</button></div></section>');};
window.breathOpen17=function(){cancelAnimationFrame(frame);stopVoice();state=fresh();voiceError='';EVENING_LIBRARY_ORIGIN=null;FLOW_HOW_RETURN=null;FLOW_NOTE_RETURN=null;HABIT_RETURN33=null;NT=null;CARD=null;HW=null;openOv('');draw();};
function draw(){var s=state,busy=['running','paused'].includes(s.status),values=s.unit==='minutes'?[1,2,3]:[5,7,10];
 var html='<h1 class="breath18-sr" id="f2DialogTitle">Tập thở cùng Shin</h1><div class="breath18-body"><section class="breath18-stage" id="breathStage17" data-scene="'+s.scene+'" aria-label="Tập thở cùng Shin"><img class="breath18-scene" id="breathScene18" src="assets/breathing/'+s.scene+'.svg" alt="" draggable="false"><div class="breath18-top"><button class="breath18-icon" data-act="close" aria-label="Đóng công cụ thở">'+mi('arrow_back')+'</button><div class="breath18-top-actions"><button class="breath18-icon" data-act="breathVoice18" aria-label="Giọng hướng dẫn tiếng Việt" aria-pressed="'+s.voice+'">'+speaker(s.voice)+'</button><button class="breath18-icon" id="breathFull18" data-act="breathFull18" aria-label="Mở toàn màn hình" aria-pressed="false">'+mi('fullscreen')+'</button></div></div><div class="breath18-remaining" id="breathCount17" aria-label="Còn lại"></div><span id="breathPhase17" class="breath18-sr" role="status" aria-live="polite"></span><div class="breath18-shin" id="breathShin18" data-hat="'+s.hat+'" data-glasses="'+s.glasses+'" aria-hidden="true">'+character()+'</div><div class="breath18-stage-controls"><button class="breath18-icon breath18-reset" data-act="breathReset17" aria-label="Tập lại từ đầu">'+mi('restart_alt')+'</button><button class="breath18-play" id="breathMain17" data-act="breathMain17" aria-label="Bắt đầu tập thở">'+mi('play_arrow')+'</button><button class="breath18-icon breath18-settings" data-act="breathSettings18" aria-label="Cuộn xuống chọn cách tập">'+mi('tune')+'</button></div></section><div class="breath18-panel" id="breathSettings18"><header class="breath18-panel-head"><div><small>MỘT KHOẢNG DỪNG</small><h2>Tập thở cùng Shin</h2></div><button class="breath18-to-scene" data-act="breathToScene18" aria-label="Về màn hình thở">'+mi('north')+'</button></header><p class="breath18-safety">Ngồi thoải mái, thở vừa sức. Dừng và thở tự nhiên nếu chóng mặt hoặc khó chịu.</p><fieldset class="breath18-options"'+(busy?' disabled':'')+'><legend>Cách tập</legend><div class="breath18-modes">'+Object.keys(presets).map(function(k){return '<button data-act="breathMode17" data-v="'+k+'" aria-pressed="'+(s.mode===k)+'"><b>'+presets[k].title+'</b><small>'+(k==='easy'?'Không giữ hơi':'4–4–4–4')+'</small></button>';}).join('')+'</div><p class="breath18-pattern">'+presets[s.mode].description+'</p><div class="breath18-unit" role="group" aria-label="Cách tính phiên tập"><button data-act="breathUnit17" data-v="minutes" aria-pressed="'+(s.unit==='minutes')+'">Theo phút</button><button data-act="breathUnit17" data-v="breaths" aria-pressed="'+(s.unit==='breaths')+'">Theo số nhịp</button></div><div class="breath18-values">'+values.map(function(n){return '<button data-act="breathValue17" data-v="'+n+'" aria-pressed="'+(s.value===n)+'">'+n+(s.unit==='minutes'?' phút':' nhịp')+'</button>';}).join('')+'</div><p class="breath18-definition">'+(s.unit==='minutes'?'Kết thúc trọn nhịp đang thở, có thể hơn thời gian chọn vài giây.':'1 nhịp là trọn một vòng hít vào–thở ra, gồm đoạn giữ nếu chọn thở hộp.')+'</p></fieldset><section class="breath18-appearance"><h3>Đi cùng Shin</h3><div class="breath18-scenes" role="group" aria-label="Bối cảnh Nhật Bản">'+Object.keys(scenes).map(function(k){return '<button data-act="breathScene18" data-v="'+k+'" aria-pressed="'+(s.scene===k)+'"><img src="assets/breathing/'+k+'.svg" alt="" loading="lazy"><span>'+scenes[k]+'</span>'+mi('check')+'</button>';}).join('')+'</div><div class="breath18-accessories" role="group" aria-label="Phụ kiện của Shin"><button data-act="breathHat18" aria-pressed="'+s.hat+'">'+mi('check')+'Mũ xanh</button><button data-act="breathGlasses18" aria-pressed="'+s.glasses+'">'+mi('check')+'Mắt kính</button><button class="breath18-voice-label" data-act="breathVoice18" aria-pressed="'+s.voice+'">'+speaker(s.voice)+'Giọng Việt</button></div><p id="breathVoiceStatus18" class="breath18-definition" role="status">'+voiceError+'</p></section><section class="breath18-reflect" id="breathReflect17" hidden><h3>Đã xong một khoảng tập.</h3><p>Bây giờ bạn cảm thấy thế nào?</p><button class="flow-link" data-act="breathRecord17">Nhìn lại thói quen Cảm xúc '+mi('arrow_forward')+'</button><small>Không tự cộng ngày rèn hoặc XP.</small></section><details class="breath18-related"><summary>Gắn với thói quen Cảm xúc '+mi('expand_more')+'</summary><p>Khi thấy bực hoặc hồi hộp, mình dừng lại, thở nhẹ vài nhịp rồi chọn cách phản hồi.</p><button class="flow-link" data-act="breathHow17">Xem cách làm '+mi('arrow_forward')+'</button></details></div></div>';
 var old=$('.breath18-body'),top=old?old.scrollTop:0;f2Mount('breathe18',html);$('.breath18-body').scrollTop=top;lastStage=$('#breathStage17');paint();
}
function stopVoice(){voiceToken++;if(source){try{source.stop();}catch(ignore){}source=null;}}
function voiceFailed(){voiceError='Chưa phát được giọng. Bạn vẫn có thể theo chuyển động của Shin.';put('#breathVoiceStatus18',voiceError);}
function prepareVoice(){
 try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume().catch(voiceFailed);
  if(!voiceLoading)voiceLoading=Promise.all(['inhale','exhale','hold'].map(function(k){return fetch('assets/breathing/'+k+'.mp3').then(function(r){if(!r.ok)throw Error('voice');return r.arrayBuffer();}).then(function(data){return audio.decodeAudioData(data);}).then(function(buffer){buffers[k]=buffer;});})).catch(function(){voiceLoading=null;voiceFailed();});
  return voiceLoading;
 }catch(ignore){voiceFailed();return Promise.resolve();}
}
function chime(){stopVoice();if(!state||!state.voice||state.status!=='running')return;var token=voiceToken,kind=phase().kind,key=kind==='in'?'inhale':kind==='out'?'exhale':'hold';prepareVoice().then(function(){if(token!==voiceToken||!state||!state.voice||state.status!=='running'||!$('#breathStage17')||!buffers[key])return;try{source=audio.createBufferSource();source.buffer=buffers[key];source.connect(audio.destination);source.start();}catch(ignore){voiceFailed();}});}
function paint(){if(!state||!$('#breathStage17'))return;var s=state,p=phase(),running=s.status==='running',progress=Math.min(1,s.phaseElapsed/(p.seconds*1000));
 var label=running?p.text:s.status==='done'?'Đã xong. Thở tự nhiên nhé.':s.status==='paused'?'Tạm dừng. Thở tự nhiên nhé.':'Sẵn sàng tập thở';put('#breathPhase17',label);
 var remain=s.unit==='minutes'?fmt(remainingMs()):Math.max(0,s.value-s.completed)+' nhịp';put('#breathCount17',remain);$('#breathCount17').setAttribute('aria-label',remain+' còn lại');
 var amount=running?(p.kind==='in'?progress:p.kind==='out'?1-progress:p.kind==='holdIn'?1:0):.22;
 // One continuous, bottom-anchored movement. No independent floating or halo.
 var body=$('#breathShin18');body.style.transform=reduce.matches?'none':'translateX(-50%) translateY('+(-6*amount).toFixed(2)+'px) scale('+(.94+.08*amount).toFixed(4)+','+(.94+.10*amount).toFixed(4)+')';body.dataset.phase=running?p.kind:'rest';
 var main=$('#breathMain17'),mainLabel=running?'Tạm dừng':s.status==='paused'?'Tiếp tục':s.status==='done'?'Tập phiên mới':'Bắt đầu tập thở';if(main.getAttribute('aria-label')!==mainLabel){main.setAttribute('aria-label',mainLabel);main.innerHTML=mi(running?'pause':s.status==='done'?'replay':'play_arrow');}
 $('.breath18-options').disabled=running||s.status==='paused';$('#breathReflect17').hidden=s.status!=='done';$('#breathStage17').dataset.status=s.status;
}
function step(now){frame=0;if(!state||state.status!=='running')return;if(!$('#breathStage17')||document.hidden){pause();return;}var dt=Math.max(0,now-state.lastTick),changed=false;state.lastTick=now;var phases=presets[state.mode].phases;
 while(dt>0&&state.status==='running'){var need=phase().seconds*1000-state.phaseElapsed,chunk=Math.min(dt,need);state.elapsed+=chunk;state.phaseElapsed+=chunk;dt-=chunk;if(state.phaseElapsed>=phase().seconds*1000){state.phaseElapsed=0;state.index++;changed=true;if(state.index>=phases.length){state.index=0;state.completed++;if(state.unit==='breaths'?state.completed>=state.value:state.elapsed>=state.value*60000){state.status='done';break;}}}}
 if(state.status==='done')stopVoice();else if(changed)chime();paint();if(state.status==='running')frame=requestAnimationFrame(step);
}
function pause(){if(!state||state.status!=='running')return;state.status='paused';state.phaseElapsed=0;state.index=0;cancelAnimationFrame(frame);frame=0;stopVoice();paint();}
function start(){if(!state)return;if(state.status==='running'){pause();return;}if(state.status==='done'){state.completed=0;state.elapsed=0;}state.status='running';state.index=0;state.phaseElapsed=0;state.lastTick=performance.now();chime();paint();cancelAnimationFrame(frame);frame=requestAnimationFrame(step);}
function reset(){cancelAnimationFrame(frame);stopVoice();state.status='idle';state.completed=0;state.elapsed=0;state.phaseElapsed=0;state.index=0;paint();}
function scrollToPanel(panel){var body=$('.breath18-body'),el=$(panel?'#breathSettings18':'#breathStage17');if(body&&el)body.scrollTo({top:panel?el.offsetTop:0,behavior:'auto'});}
function fullPaint(){var stage=$('#breathStage17'),b=$('#breathFull18');if(!stage||!b)return;var full=document.fullscreenElement===stage||stage.classList.contains('breath18-immersive');b.setAttribute('aria-pressed',String(full));b.setAttribute('aria-label',full?'Thoát toàn màn hình':'Mở toàn màn hình');b.innerHTML=mi(full?'fullscreen_exit':'fullscreen');}
function exitFull(){var stage=$('#breathStage17');if(stage)stage.classList.remove('breath18-immersive');if(document.fullscreenElement&&document.fullscreenElement.id==='breathStage17'&&document.exitFullscreen)document.exitFullscreen().catch(function(){});}
function fullscreen(){var el=$('#breathStage17');if(!el)return;if(document.fullscreenElement===el||el.classList.contains('breath18-immersive')){exitFull();fullPaint();return;}if(el.requestFullscreen)el.requestFullscreen().then(fullPaint).catch(function(){el.classList.add('breath18-immersive');fullPaint();});else{el.classList.add('breath18-immersive');fullPaint();}}
window.breathEscape18=function(){var el=$('#breathStage17');if(!el||(!el.classList.contains('breath18-immersive')&&document.fullscreenElement!==el))return false;exitFull();fullPaint();return true;};
document.addEventListener('fullscreenchange',fullPaint);
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var el=$('#breathStage17');if(el&&el.classList.contains('breath18-immersive')){e.preventDefault();e.stopImmediatePropagation();exitFull();fullPaint();}}},true);
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(a==='close'&&$('#breathStage17')){pause();stopVoice();exitFull();return;}if(!a.startsWith('breath'))return;e.preventDefault();e.stopImmediatePropagation();if(a==='breathOpen17'){breathOpen17();return;}if(!state)return;
 if(a==='breathMain17')start();if(a==='breathReset17')reset();if(a==='breathFull18')fullscreen();if(a==='breathSettings18')scrollToPanel(true);if(a==='breathToScene18')scrollToPanel(false);
 if(a==='breathVoice18'){state.voice=!state.voice;stopVoice();voiceError='';put('#breathVoiceStatus18','');document.querySelectorAll('[data-act=breathVoice18]').forEach(function(el){el.setAttribute('aria-pressed',String(state.voice));el.innerHTML=speaker(state.voice)+(el.classList.contains('breath18-voice-label')?'Giọng Việt':'');});if(state.voice){prepareVoice();chime();}savePrefs();}
 if(a==='breathScene18'&&scenes[b.dataset.v]){state.scene=b.dataset.v;$('#breathScene18').src='assets/breathing/'+state.scene+'.svg';$('#breathStage17').dataset.scene=state.scene;document.querySelectorAll('[data-act=breathScene18]').forEach(function(el){el.setAttribute('aria-pressed',String(el.dataset.v===state.scene));});savePrefs();}
 if(a==='breathHat18'||a==='breathGlasses18'){var k=a==='breathHat18'?'hat':'glasses';state[k]=!state[k];b.setAttribute('aria-pressed',String(state[k]));$('#breathShin18').dataset[k]=String(state[k]);savePrefs();}
 if(!['running','paused'].includes(state.status)){
  var redraw=false;if(a==='breathMode17'&&presets[b.dataset.v]){state.mode=b.dataset.v;redraw=true;}if(a==='breathUnit17'&&['minutes','breaths'].includes(b.dataset.v)){state.unit=b.dataset.v;state.value=state.unit==='minutes'?1:5;redraw=true;}if(a==='breathValue17'){var n=+b.dataset.v;if((state.unit==='minutes'?[1,2,3]:[5,7,10]).includes(n)){state.value=n;redraw=true;}}
  if(redraw){reset();savePrefs();draw();}
 }
 if(a==='breathHow17'){pause();exitFull();openHow('camxuc');}if(a==='breathRecord17'){pause();exitFull();if(H('camxuc'))openNote('camxuc',dk());else openCard('camxuc');}
},true);
document.addEventListener('visibilitychange',function(){if(document.hidden)pause();});window.addEventListener('pagehide',function(){pause();stopVoice();});
document.addEventListener('DOMContentLoaded',function(){new MutationObserver(function(){var stage=$('#breathStage17');if(stage===lastStage)return;lastStage=stage;if(state){pause();stopVoice();if(!stage)exitFull();else paint();}}).observe(document.body,{subtree:true,childList:true});});
// Read-only timing diagnostics; never modifies learner data.
window.breathInspect17=function(){return state?JSON.parse(JSON.stringify(state)):null;};
var how17=drawHow;drawHow=function(){how17();if(HW&&HW.id==='camxuc'&&OV){var body=$('.f2-how-content',OV);if(body&&!$('.breath18-link',body))body.insertAdjacentHTML('beforeend','<button class="flow-link breath18-link" data-act="breathOpen17">Tập thở cùng Shin '+mi('arrow_forward')+'</button>');}};
})();

;