/* Canonical editable source. Section names record provenance, not imports. */

/* ===== SECTION: routine-navigation.js ===== */
/* M3.3.8: only the approved navigation icons, neutral tones and PWA theme. */
var SHIN_NAV_ICONS=["<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  aria-hidden=\"true\" class=\"shin-nav-icon\"><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M12 2v2\"></path><path d=\"M12 20v2\"></path><path d=\"m4.93 4.93 1.41 1.41\"></path><path d=\"m17.66 17.66 1.41 1.41\"></path><path d=\"M2 12h2\"></path><path d=\"M20 12h2\"></path><path d=\"m6.34 17.66-1.41 1.41\"></path><path d=\"m19.07 4.93-1.41 1.41\"></path></svg>","<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  aria-hidden=\"true\" class=\"shin-nav-icon\"><path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path><path d=\"m9 16 2 2 4-4\"></path></svg>","<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  aria-hidden=\"true\" class=\"shin-nav-icon\"><path d=\"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3\"></path><path d=\"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4\"></path><path d=\"M5 21h14\"></path></svg>"];
var navApprovedRenderBar=renderBar;
renderBar=function(){var before=$('#abar'),oldButtons=before?Array.from(before.children).filter(function(el){return el.tagName==='BUTTON';}):[];navApprovedRenderBar();var nav=$('#abar');if(!nav)return;Array.from(nav.children).filter(function(el){return el.tagName==='BUTTON';}).forEach(function(b,i){if(oldButtons.length===3&&oldButtons[i].querySelector('.shin-nav-icon')){var old=oldButtons[i];old.setAttribute('aria-current',b.getAttribute('aria-current'));b.replaceWith(old);return;}var icon=b.querySelector('.m3-nav-indicator');if(icon&&SHIN_NAV_ICONS[i])icon.innerHTML=SHIN_NAV_ICONS[i];});};
function navSyncSystemTheme(){if(document.documentElement.classList.contains('growth-starting'))return;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#F9F9FF';}
new MutationObserver(navSyncSystemTheme).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
window.addEventListener('pageshow',navSyncSystemTheme);
navSyncSystemTheme();

;
/* ===== SECTION: routine-touch.js ===== */
/* M3.3.9 · approved gestures and optional Shin invitations. No storage migration. */
function touchSwipeThreshold(width){return Math.max(72,Math.min(96,width*.25));}
function touchSwipeTravel(distance,threshold){var n=Math.abs(distance),travel=n<=threshold?n:threshold+(n-threshold)*.35;return Math.sign(distance)*Math.min(150,travel);}
function touchSwipeUnder(){return '<div class="growth-swipe-under" aria-hidden="true"><span><img src="assets/touch/circle-check.svg" alt="" width="32" height="32"><small>Đã làm</small></span><span><img src="assets/touch/circle-minus.svg" alt="" width="32" height="32"><small>Chưa làm</small></span></div>';}
var touchToday=vToday;
vToday=function(){return touchToday().replace(/<div class="growth-swipe-under" aria-hidden="true">[\s\S]*?<\/div>(?=<article class="flow-today-row)/g,touchSwipeUnder());};

/* Only the most recent scheduled offer is invited. Skipping never reveals a backlog. */
growthOffer=function(){var g=growthState();if(!g.enabled)return null;var active=Object.keys(g.challenges).sort().find(function(k){return ['accepted','later'].includes(g.challenges[k].status);});if(active)return active;var w=wkStart(dk());for(var i=1;i>=0;i--){var key=w+'_'+i;if(dk()>=addD(w,i?4:1))return g.challenges[key]?null:key;}return null;};
growthChallengePanel=function(){
  var key=growthOffer();if(!key)return '';var a=growthState().challenges[key],t=GROWTH_CHALLENGES[a?a.template:growthChallengeTemplate(key)];
  if(a)return '<section class="touch-challenge touch-challenge-active" data-flow-type aria-label="Thử thách đã nhận">'+shin('proud')+'<div class="touch-challenge-bubble"><small>THỬ THÁCH BẠN ĐÃ NHẬN</small><h3>'+esc(t.title)+'</h3><p>'+esc(t.text)+'</p><p class="touch-challenge-question">Khi đã thử, bạn trở lại kể Shin nghe nhé.</p></div><div class="touch-challenge-actions"><button class="flow-link" data-act="growthChallengeSkip" data-v="'+key+'">Lần này bỏ qua</button><button class="btn" data-act="growthChallengeOpen" data-v="'+key+'">'+mi('edit_note')+'Viết cảm nhận</button></div></section>';
  var action=t.text.charAt(0).toLocaleLowerCase('vi')+t.text.slice(1);
  return '<section class="touch-challenge" data-flow-type aria-label="Lời mời thử thách của Shin">'+shin('hi')+'<div class="touch-challenge-bubble"><h3>Shin có một lời mời dành cho bạn</h3><p>Hôm nay, '+esc(S.name||'bạn')+' hãy thử '+esc(action)+'</p><p class="touch-challenge-question">Bạn có sẵn sàng nhận thử thách này không?</p></div><div class="touch-challenge-actions"><button class="flow-link" data-act="growthChallengeSkip" data-v="'+key+'">Lần này bỏ qua</button><button class="btn" data-act="touchChallengeAccept" data-v="'+key+'">Mình thử nhé '+mi('arrow_forward')+'</button></div></section>';
};
function touchAcceptChallenge(key){if(!/^\d{4}-\d{2}-\d{2}_[01]$/.test(key)||growthOffer()!==key)return false;var g=growthState();if(g.challenges[key])return false;g.challenges[key]={status:'accepted',template:growthChallengeTemplate(key),note:'',credited:false};save(true);return true;}

/* Match the existing flip button, including its first-use guidance flag. */
/* Active flip implementation is in SECTION routine-evening.js below. */
function touchCardControl(target){return !!target.closest('button,a,input,textarea,select,label,summary,[role=button],[role=tab],[data-act],[contenteditable=true]');}
var TOUCH_GESTURE=null;
function touchResetGesture(g){
  if(!g)return;if(g.frame)cancelAnimationFrame(g.frame);
  if(g.kind==='row'){g.row.style.transform='';g.row.style.willChange='';g.shell.classList.remove('touch-swiping','touch-ready','touch-left');}
}
function touchCancelGesture(){var g=TOUCH_GESTURE;TOUCH_GESTURE=null;touchResetGesture(g);}
document.addEventListener('pointerdown',function(e){
  if(e.button!==0||e.isPrimary===false)return;touchCancelGesture();
  var row=e.target.closest('[data-flow-swipe]'),paper=e.target.closest('.flow-card-stage .flow-paper');
  if(row){if(e.target.closest('.flow-card-entry,.flow-row-plus'))return;var shell=row.closest('.growth-swipe-shell');if(!shell)return;TOUCH_GESTURE={kind:'row',id:row.dataset.flowSwipe,row:row,shell:shell,threshold:touchSwipeThreshold(row.getBoundingClientRect().width),capture:row};}
  else if(paper&&CARD&&CARD.tab!=='journal'&&!touchCardControl(e.target)){TOUCH_GESTURE={kind:'card',capture:paper,card:CARD.id};}
  else return;
  var g=TOUCH_GESTURE;g.x=e.clientX;g.y=e.clientY;g.pointer=e.pointerId;g.locked=false;g.dx=0;
});
document.addEventListener('pointermove',function(e){
  var g=TOUCH_GESTURE;if(!g||g.pointer!==e.pointerId||g.cancelled)return;var dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(!g.locked){if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){g.cancelled=true;touchResetGesture(g);return;}if(Math.abs(dx)<=12||Math.abs(dx)<Math.abs(dy)*1.5)return;g.locked=true;try{g.capture.setPointerCapture(e.pointerId);}catch(ignore){}if(g.kind==='row'){g.row.style.willChange='transform';g.shell.classList.add('touch-swiping');}}
  e.preventDefault();g.dx=dx;
  if(g.kind==='row'&&!g.frame)g.frame=requestAnimationFrame(function(){g.frame=0;if(TOUCH_GESTURE!==g)return;g.row.style.transform='translate3d('+touchSwipeTravel(g.dx,g.threshold)+'px,0,0)';g.shell.classList.toggle('touch-ready',Math.abs(g.dx)>=g.threshold);g.shell.classList.toggle('touch-left',g.dx<0);});
},{passive:false});
document.addEventListener('pointerup',function(e){
  var g=TOUCH_GESTURE;if(!g||g.pointer!==e.pointerId)return;TOUCH_GESTURE=null;
  var dx=e.clientX-g.x,dy=e.clientY-g.y,horizontal=g.locked&&Math.abs(dx)>Math.abs(dy)*1.5;
  touchResetGesture(g);
  if(g.locked||Math.abs(dx)>12||Math.abs(dy)>12)FLOW_SWIPE_UNTIL=Date.now()+350;
  if(!horizontal)return;
  if(g.kind==='card'){if(Math.abs(dx)>=64&&CARD&&CARD.id===g.card)touchFlipCard(false);return;}
  if(Math.abs(dx)<g.threshold||!g.row.isConnected)return;
  openNote(g.id,dk());if(!NT||NT.id!==g.id)return;NT.ans=dx>0?'y':'n';NT.quick16=true;flowStashNote();drawNote29();
  var input=$('#ntIn');if(input){input.focus({preventScroll:true});input.setSelectionRange(input.value.length,input.value.length);}
});
document.addEventListener('pointercancel',touchCancelGesture);
/* Touch starts with implicit capture on the tapped child button. Transferring it
   to the row emits lostpointercapture on that child; only loss from our current
   capture owner cancels the swipe. Mouse-only drags do not exercise this path. */
function touchLostCapture(e){if(TOUCH_GESTURE&&TOUCH_GESTURE.pointer===e.pointerId&&e.target===TOUCH_GESTURE.capture)touchCancelGesture();}
document.addEventListener('lostpointercapture',touchLostCapture);
window.addEventListener('blur',touchCancelGesture);
document.addEventListener('visibilitychange',function(){if(document.hidden)touchCancelGesture();});
document.addEventListener('click',function(e){
  if(Date.now()<FLOW_SWIPE_UNTIL)return;
  var accept=e.target.closest('[data-act=touchChallengeAccept]');if(accept){e.preventDefault();e.stopImmediatePropagation();if(touchAcceptChallenge(accept.dataset.v))renderPage();return;}
  var paper=e.target.closest('.flow-card-stage .flow-paper');if(paper&&!touchCardControl(e.target)){e.preventDefault();touchFlipCard(false);}
},true);

;
/* ===== SECTION: routine-checkin.js ===== */
/* M3.3.10 · focused check-in UI. Existing record writers, keys and rewards stay intact. */
MOODS=MOODS.map(function(m){return [m[0],({'5':'Tuyệt vời','4':'Vui vẻ','3':'Bình thường','2':'Buồn một chút','1':'Không vui'})[m[0]],m[2]];});
var CI40_OPENING=false;
function ci40Copy(value){return JSON.parse(JSON.stringify(value));}
function ci40Name(id){return flowTodayName(id);}
function ci40Pending(id){return !CI.base[id]||CI.edit[id]||!String(CI.notes[id]||'').trim();}
function ci40Optional(id){return CI.date===dk()&&!CI.base[id]&&!CI.ans[id]&&!flowDraft(CI.date,id)&&growthWeekCount(id,wkStart(CI.date))>=growthGoal(id,wkStart(CI.date));}
function ci40Init(savedWizard){
  if(CI.wizard)return;
  var old=savedWizard||((S.ciDrafts||{})[CI.date]||{}).wizard,valid=CI.all.concat(CI.keeps),ids=[];
  if(old&&Array.isArray(old.ids))old.ids.forEach(function(id){if(valid.indexOf(id)>=0&&ids.indexOf(id)<0&&(!CI.base[id]||CI.edit[id]||!String(CI.notes[id]||'').trim()||String(CI.notes[id]||'')!==String((S.notes[CI.date]||{})[id]||'')))ids.push(id);});
  CI.all.forEach(function(id){if(ci40Pending(id)&&!ci40Optional(id)&&ids.indexOf(id)<0)ids.push(id);});
  CI.keeps.forEach(function(id){if(CI.keep[id]&&!String(CI.notes[id]||'').trim()&&ids.indexOf(id)<0)ids.push(id);});
  var index=0;if(old&&Array.isArray(old.ids)&&Number.isInteger(old.index)&&old.index>=0){if(old.index>=old.ids.length)index=ids.length+Math.min(1,old.index-old.ids.length);else{index=ids.indexOf(old.ids[old.index]);if(index<0)index=old.ids.slice(0,old.index).filter(function(id){return ids.indexOf(id)>=0;}).length;}}
  CI.wizard={ids:ids,index:Math.min(ids.length+1,index),deferred:old&&old.deferred&&typeof old.deferred==='object'?ci40Copy(old.deferred):{},preserved:old&&old.preserved&&typeof old.preserved==='object'?ci40Copy(old.preserved):{}};
}
var ci40OpenBase=openCI;
openCI=function(date){var draft=((S.ciDrafts||{})[date]||{}),wizard=draft.wizard?ci40Copy(draft.wizard):null,question=draft.question;CI40_OPENING=true;try{ci40OpenBase(date);}finally{CI40_OPENING=false;}if(!CI||CI.date!==date||CI.done)return;if(question)CI.growthQuestion=question;ci40Init(wizard);stashCI29();drawCI();};
var ci40StashBase=stashCI29;
stashCI29=function(){ci40StashBase();if(CI&&!CI.done&&CI.wizard&&S.ciDrafts[CI.date]){S.ciDrafts[CI.date].wizard=ci40Copy(CI.wizard);save();}};
function ci40Current(){return CI&&CI.wizard&&CI.wizard.ids[CI.wizard.index];}
function ci40IsKeep(id){return CI.keeps.indexOf(id)>=0;}
function ci40Answer(id){return ci40IsKeep(id)?CI.keep[id]?'y':(CI.wizard.deferred[id]||{}).ans||'':CI.ans[id]||(CI.wizard.deferred[id]||{}).ans||'';}
function ci40Ready(){var id=ci40Current();return !id||!!ci40Answer(id)&&!!String(CI.notes[id]||'').trim();}
function ci40Mount(kind,html,keepScroll){
  var old=$('.ci40-scroll',OV),top=old?old.scrollTop:0;f2Mount(kind,html,false);
  var sheet=$('.sheet',OV);sheet.classList.add('ci40-sheet');sheet.setAttribute('data-flow-type','');
  if(keepScroll&&$('.ci40-scroll',OV))$('.ci40-scroll',OV).scrollTop=top;
}
function ci40Top(title,index,total,back){
  var label=index<total-2?'Thói quen':index===total-2?'Tâm trạng':'Một câu cho hôm nay';
  return '<header class="ci40-top"><div class="ci40-bar">'+(back?'<button class="m3-icon-button" data-act="ci40Back" aria-label="Bước trước">'+mi('arrow_back')+'</button>':'<span class="ci40-top-symbol">'+mi(total?'nightlight':'check_circle')+'</span>')+'<b id="f2DialogTitle">'+esc(title)+'</b><button class="m3-icon-button" data-act="close" aria-label="Đóng và giữ bản nháp">'+mi('close')+'</button></div>'+(total?shinFlowProgress(index,total,label,true):'')+'</header>';
}
function ci40Hero(title,subtitle,icon,kicker,link){return '<div class="ci40-hero"><span class="ci40-emblem">'+(icon==='mood'?moodFace(4,'#C7DBFA'):mi(icon))+'</span><p class="ci40-kicker">'+esc(kicker||'MỖI NGÀY, TỐT HƠN MỘT CHÚT')+'</p><h2 id="ci40StepTitle" tabindex="-1">'+esc(title)+'</h2><p>'+esc(subtitle)+'</p>'+(link||'')+'</div>';}
function ci40HabitHero(id,record){var u=H(id)||{};return ci40Hero(ci40Name(id),'Khi '+(u.anchor||'đến lúc đã chọn')+(u.act?' · Mình sẽ '+u.act:''),m3HabitIcon(id),ci40IsKeepSafe(id)?'GIỮ NẾP NHẸ NHÀNG':null,record?'<button class="ci40-hero-link" data-act="flowNoteCard" data-v="'+id+'">'+mi('style')+'Xem thẻ</button>':'');}
function ci40IsKeepSafe(id){return !!CI&&CI.keeps.indexOf(id)>=0;}
function ci40Field(id,status,record){
  var E=noteHints34(id,status),field=record?'ntIn':'ci-note-'+id,text=record?NT.text:CI.notes[id]||'',open=record?!!NT.open:!!CI.open['hint-'+id];
  return '<div class="f2-note-field"><label class="lbl" for="'+field+'">'+esc(E.q)+' <small>· Bắt buộc</small></label><textarea class="inp" id="'+field+'" '+(record?'data-in="note"':'data-in="ciNote29" data-id="'+id+'"')+' rows="3" required aria-required="true" placeholder="'+(status==='n'||status==='x'?'Viết một lý do cụ thể…':'Một việc nhỏ, một tình huống cụ thể…')+'">'+esc(text)+'</textarea>'+(record?'<p class="f2-error" id="ntRequired34" role="alert" hidden>Viết một ghi chú ngắn trước khi lưu nhé.</p>':'')+'</div>'+f2Hints(id,status,record?'ntChip':'ciNoteChip34',!record,open);
}
function ci40Extras(){
  var ids=CI.wizard.ids,recorded=CI.all.filter(function(id){return CI.base[id]&&!CI.edit[id]&&String((S.notes[CI.date]||{})[id]||'').trim();}).concat(CI.keeps.filter(function(id){return CI.base[id]==='y'&&String((S.notes[CI.date]||{})[id]||'').trim();}));
  var optional=CI.all.filter(function(id){return ids.indexOf(id)<0&&!CI.base[id];}).concat(CI.keeps.filter(function(id){return ids.indexOf(id)<0&&recorded.indexOf(id)<0;})),h='';
  if(recorded.length)h+='<details class="ci40-extra" data-ci-detail="saved"'+(CI.open.saved?' open':'')+'><summary>'+mi('check_circle')+recorded.length+' thẻ đã ghi nhận'+mi('expand_more')+'</summary><div>'+recorded.map(function(id){return '<div class="ci40-extra-row"><span>'+esc(ci40Name(id))+'<small>'+esc(RECORD_LABEL[mark(CI.date,id)])+'</small></span><button class="f2-text-button" data-act="ci40Edit" data-v="'+id+'" aria-label="Chỉnh '+esc(ci40Name(id))+'">Chỉnh</button></div>';}).join('')+'</div></details>';
  if(optional.length)h+='<details class="ci40-extra" data-ci-detail="optional"'+(CI.open.optional?' open':'')+'><summary>'+mi('add_circle')+'Rèn thêm nếu muốn'+mi('expand_more')+'</summary><div>'+optional.map(function(id){return '<div class="ci40-extra-row"><span>'+esc(ci40Name(id))+'<small>'+(ci40IsKeep(id)?'Thẻ đang duy trì':'Đã đạt mục tiêu tuần')+'</small></span><button class="f2-text-button" data-act="ci40Edit" data-v="'+id+'" aria-label="Ghi nhận thêm '+esc(ci40Name(id))+'">Ghi thêm</button></div>';}).join('')+'</div></details>';
  return h;
}
function ci40Footer(){var id=ci40Current(),last=CI.wizard.index===CI.wizard.ids.length+1;return '<footer class="ci40-footer"><button class="btn ci40-primary" id="ci40Go" data-act="'+(last?'ci40Save':'ci40Next')+'"'+(ci40Ready()?'':' disabled')+'>'+(last?(CI.again?'Lưu thay đổi':'Lưu check-in'):'Tiếp tục')+mi(last?'check':'arrow_forward')+'</button><button class="f2-text-button ci40-skip" data-act="ci40Skip">'+(last?'Bỏ qua câu hỏi và lưu':'Bỏ qua bước này')+'</button><p class="ci40-save-hint">'+(last?'Các bước đã chọn sẽ được lưu cùng nhau.':'Đang lưu nháp · Hoàn tất ở bước cuối')+'</p></footer>';}
var ci40DrawBase=drawCI;
drawCI=function(){
  if(!CI||CI40_OPENING)return;if(CI.done){ci40DrawBase();return;}ci40Init();
  CI.growthQuestion=CI.growthQuestion||(S.ci[CI.date]||{}).question||((S.ciDrafts[CI.date]||{}).question)||growthQuestion(CI.date);
  var w=CI.wizard,id=ci40Current(),i=w.index,n=w.ids.length,total=n+2,h=ci40Top(CI.date===dk()?'Check-in hôm nay':'Check-in · '+dm(CI.date),i,total,i>0),body='';
  if(id){var a=ci40Answer(id),keep=ci40IsKeep(id);h+='<div class="ci40-scroll">'+ci40HabitHero(id,false);body='<p class="ci40-question">'+(keep?'Hôm nay bạn đã duy trì thói quen này?':'Hôm nay bạn thực hiện thế nào?')+'</p>'+(keep?'<div class="record-options f2-options ci40-keep-option"><button class="record-option state-y" data-act="ci40Answer" data-v="'+id+'|y" aria-pressed="'+(a==='y')+'">'+mi('check_circle')+'<span>Đã làm</span></button></div>':recordOptions29(id,a,'ci40Answer'))+ci40Field(id,a,false);}
  else if(i===n){h+='<div class="ci40-scroll">'+ci40Hero(CI.date===dk()?'Hôm nay bạn thấy thế nào?':'Hôm đó bạn thấy thế nào?','Dừng một chút để lắng nghe mình.','mood','LẮNG NGHE BẢN THÂN');body='<p class="ci40-question">Chọn cảm xúc gần nhất với bạn.</p><div class="ci40-moods" role="group" aria-label="Tâm trạng hôm nay">'+MOODS.map(function(m){return '<button data-act="ciMood29" data-v="'+m[0]+'" aria-pressed="'+(CI.mood===m[0])+'">'+moodFace(+m[0],m[2])+'<span>'+esc(m[1])+'</span><span class="ci40-mood-check">'+(CI.mood===m[0]?mi('check'):'')+'</span></button>';}).join('')+'</div><p class="ci40-optional-text">Không bắt buộc · Chỉ bạn xem</p>';}
  else {h+='<div class="ci40-scroll">'+ci40Hero('Một câu cho hôm nay','Không cần viết hay. Một câu thật với mình là đủ.','edit_note','GIỮ LẠI MỘT ĐIỀU');body='<label class="lbl ci40-memo-question" for="ciMemo29">'+esc(CI.growthQuestion)+'</label><textarea class="inp" id="ciMemo29" data-in="ciMemo29" rows="4" placeholder="Một điều cụ thể bạn muốn giữ lại…">'+esc(CI.note)+'</textarea><p class="ci40-optional-text">Không bắt buộc</p>';}
  h+='<div class="ci40-body">'+body+'<p class="ci40-error" role="alert" hidden></p>'+ci40Extras()+'</div></div>'+ci40Footer();ci40Mount('checkin',h,true);
};
drawNote29=function(){
  if(!NT)return;var id=NT.id,today=NT.day===dk(),has=!!mark(NT.day,id)||!!flowDraft(NT.day,id),h=ci40Top(today?'Ghi nhận thói quen':'Ghi nhận · '+dm(NT.day),0,0,false)+'<div class="ci40-scroll">'+ci40HabitHero(id,true)+'<div class="ci40-body"><p class="ci40-question">'+(today?'Hôm nay':'Hôm đó')+' bạn thực hiện thế nào?</p>'+recordOptions29(id,NT.ans,'recordAnswer')+ci40Field(id,NT.ans,true)+(has?'<button class="f2-text-button ci40-remove" data-act="flowRemoveDraft">Bỏ ghi nhận</button>':'')+'</div></div><footer class="ci40-footer"><button class="btn ci40-primary" id="ntGo" data-act="ntSave"'+(String(NT.text||'').trim()?'':' disabled')+'>'+mi('check')+'Lưu ghi nhận</button><button class="f2-text-button ci40-skip" data-act="flowMemoLater">Đóng và giữ bản nháp</button></footer>';ci40Mount('record',h,true);
};
var ci40FooterBase=updateCIFooter34;
updateCIFooter34=function(){if(CI&&!CI.done&&CI.wizard&&$('.ci40-sheet',OV)){var b=$('#ci40Go');if(b)b.disabled=!ci40Ready();return;}ci40FooterBase();};
function ci40RememberOpen(){if(!CI||!OV)return;$$('[data-ci-detail]',OV).forEach(function(el){CI.open[el.dataset.ciDetail]=el.open;});}
function ci40Go(index){ci40RememberOpen();CI.wizard.index=Math.max(0,Math.min(CI.wizard.ids.length+1,index));stashCI29();drawCI();var scroll=$('.ci40-scroll',OV);if(scroll)scroll.scrollTop=0;var title=$('#ci40StepTitle');if(title)title.focus({preventScroll:true});}
function ci40Activate(id){var a=ci40Answer(id);if(ci40IsKeep(id))CI.keep[id]=true;else{CI.ans[id]=a;delete CI.skip[id];if(CI.base[id])CI.edit[id]=true;}delete CI.wizard.deferred[id];delete CI.wizard.preserved[id];}
function ci40Queue(id){var index=CI.wizard.ids.indexOf(id);if(index<0){index=Math.min(CI.wizard.index,CI.wizard.ids.length);CI.wizard.ids.splice(index,0,id);}return index;}
function ci40Defer(id){
  var a=ci40Answer(id);if(a){CI.wizard.deferred[id]={ans:a};if(!CI.base[id]){S.recordDrafts[CI.date]=S.recordDrafts[CI.date]||{};S.recordDrafts[CI.date][id]={ans:a,text:String(CI.notes[id]||''),why:CI.why[id]||''};}}
  if(CI.base[id])CI.wizard.preserved[id]=true;
  if(ci40IsKeep(id)){CI.keep[id]=CI.base[id]==='y';if(CI.base[id])CI.notes[id]=(S.notes[CI.date]||{})[id]||'';}
  else if(CI.base[id]){CI.ans[id]=CI.base[id];CI.notes[id]=(S.notes[CI.date]||{})[id]||'';CI.why[id]=(S.why[CI.date]||{})[id]||'';delete CI.edit[id];delete CI.skip[id];}
  else{delete CI.ans[id];CI.skip[id]=true;}
}
var ci40StateBase=ciState;
ciState=function(){if(!CI||!CI.wizard)return ci40StateBase();var remaining=CI.all.filter(function(id){return !CI.ans[id]&&!CI.skip[id];}).length,missing=CI.all.filter(function(id){return CI.ans[id]&&!CI.wizard.preserved[id]&&!String(CI.notes[id]||'').trim();}).length+CI.keeps.filter(function(id){return CI.keep[id]&&!CI.wizard.preserved[id]&&!String(CI.notes[id]||'').trim();}).length;return {ok:remaining===0&&missing===0,remaining:remaining,missingNotes:missing,msg:remaining?'Còn '+remaining+' thẻ chưa chọn':missing?'Còn '+missing+' thói quen thiếu ghi chú':'Sẵn sàng lưu'};};
function ci40Save(){
  if(!ciState().ok){var missing=CI.wizard.ids.findIndex(function(id){if(CI.wizard.preserved[id])return false;return ci40IsKeep(id)?CI.keep[id]&&!String(CI.notes[id]||'').trim():!CI.skip[id]&&(!CI.ans[id]||!String(CI.notes[id]||'').trim());});if(missing>=0)ci40Go(missing);var error=$('.ci40-error',OV);if(error){error.hidden=false;error.textContent='Chọn kết quả và thêm ghi chú, hoặc chọn Để sau để tiếp tục nhé.';}return;}
  stashCI29();ciFinish();
}
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-act]');if(!b)return;var act=b.dataset.act,v=b.dataset.v;
  if(!/^ci40/.test(act)||!CI||CI.done)return;e.preventDefault();e.stopImmediatePropagation();ci40RememberOpen();
  if(act==='ci40Back')ci40Go(CI.wizard.index-1);
  if(act==='ci40Answer'){var parts=v.split('|'),id=parts[0];if(ci40IsKeep(id))CI.keep[id]=true;else{CI.ans[id]=parts[1];delete CI.skip[id];if(CI.base[id])CI.edit[id]=true;}delete CI.wizard.deferred[id];delete CI.wizard.preserved[id];stashCI29();drawCI();var selected=Array.from(OV.querySelectorAll('[data-act=ci40Answer]')).find(function(x){return x.dataset.v===v;});if(selected)selected.focus({preventScroll:true});}
  if(act==='ci40Next'){if(!ci40Ready())return;var id=ci40Current();if(id)ci40Activate(id);ci40Go(CI.wizard.index+1);}
  if(act==='ci40Edit'){if(CI.all.concat(CI.keeps).indexOf(v)<0)return;var index=ci40Queue(v);if(CI.base[v])CI.edit[v]=true;ci40Go(index);}
  if(act==='ci40Skip'){var id=ci40Current();if(id)ci40Defer(id);else if(CI.wizard.index===CI.wizard.ids.length){CI.mood=S.mood[CI.date]||null;CI.moodTouched=false;}else CI.note=(S.ci[CI.date]||{}).note||'';if(CI.wizard.index===CI.wizard.ids.length+1)ci40Save();else ci40Go(CI.wizard.index+1);}
  if(act==='ci40Save')ci40Save();
},true);
document.addEventListener('toggle',function(e){if(e.target.matches('.ci40-sheet .f2-suggestions')){if(NT&&e.target.closest('.f2-record'))NT.open=e.target.open;ci40RememberOpen();}},true);

;
/* ===== SECTION: routine-refinements.js ===== */
/* M3.3.12 · local presentation and viewport fixes. Stored records stay intact. */
var ref12Week=flowWeek;
flowWeek=function(){return ref12Week().replace(/<div class="m3-week-reflect">[\s\S]*?<\/textarea><\/div>/,'').replace('class="week-link flow-week-link"','class="week-link flow-week-link ref12-week-open"').replace('>Xem thẻ tuần</button>','>'+mi('calendar_month')+'Mở thẻ tuần'+mi('arrow_forward')+'</button>');};
var ref12Hero=ci40HabitHero;
ci40HabitHero=function(id,record){return ref12Hero(id,record).replace('Xem thẻ</button>','Xem thẻ'+mi('arrow_forward')+'</button>');};
var ref12Letters=letterList37;
letterList37=function(){return ref12Letters().replace(/^<details class="letter-list37"><summary>[\s\S]*?<\/summary>/,'<section class="letter-list37 ref12-letters" aria-label="Những lá thư của bạn">').replace(/<\/details>$/,'</section>');};
var ref12Tree=treePanel;
treePanel=function(){return ref12Tree().replace('Gửi một điều trân quý','Gửi một lời nhắn').replace('Những lá thư giữ lại một phần hành trình của bạn.','Viết cho mình, hoặc một người bạn muốn nhắn gửi.');};
var ref12DrawWeek=drawWeek;
drawWeek=function(){ref12DrawWeek();var sheet=OV&&$('.sheet',OV);if(sheet){sheet.classList.add('ref12-week');sheet.setAttribute('data-flow-type','');}};
var ref12DrawLesson=drawLesson;
drawLesson=function(){ref12DrawLesson();var content=OV&&$('.f3-lesson-content',OV);if(content){content.setAttribute('data-flow-type','');content.closest('.sheet').classList.add('ref12-lesson');}};
var ref12DrawLetter=drawLetter37;
drawLetter37=function(){ref12DrawLetter();var sheet=OV&&$('.sheet',OV);if(sheet)sheet.classList.toggle('ref12-letter-read',!!LETTER_FLOW37&&LETTER_FLOW37.mode==='read');};
var ref12OpenAward=openTreeCard30;
openTreeCard30=function(id){ref12OpenAward(id);var sheet=OV&&$('.sheet',OV);if(sheet&&$('.tree-detail30',sheet)){sheet.classList.add('ref12-achievement');sheet.setAttribute('data-flow-type','');}};

/* Fit all original fields into the available phone card area. No truncation,
   hidden fields, storage writes, or changes to desktop typography. */
var ref12FitBase=flowFitCard;
flowFitCard=function(){
  var stage=$('.flow-card-stage'),paper=stage&&$('.flow-paper',stage),body=stage&&stage.parentElement;if(!paper||!body)return;
  if(innerWidth>=768){stage.style.height='';stage.style.removeProperty('--ref12-s');paper.style.transform='';paper.style.transformOrigin='';ref12FitBase();return;}
  var cs=getComputedStyle(body),height=Math.floor(body.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom));if(height<100)return;
  stage.style.height=height+'px';paper.style.transform='';paper.style.transformOrigin='';stage.style.setProperty('--ref12-s','1');
  if(paper.getBoundingClientRect().height>height){var lo=.5,hi=1;for(var n=0;n<9;n++){var s=(lo+hi)/2;stage.style.setProperty('--ref12-s',s.toFixed(4));if(paper.getBoundingClientRect().height<=height)lo=s;else hi=s;}stage.style.setProperty('--ref12-s',lo.toFixed(4));}
  var used=paper.getBoundingClientRect().height;
  if(used>height+1){paper.style.transformOrigin='top center';paper.style.transform='scale('+(height/used).toFixed(4)+')';}
};

/* Entries appear in reading order when their part of the timeline enters the
   viewport. The native More action loads the next batch near the end. */
var REF12_OBSERVERS=new Map(),REF12_FRAME=0,REF12_PAPER=null,REF12_CARDWATCH=null;
function ref12WatchCard(){
  var paper=$('.flow-card-stage .flow-paper');if(paper===REF12_PAPER)return;
  if(REF12_CARDWATCH)REF12_CARDWATCH.disconnect();REF12_PAPER=paper;
  if(!paper||!window.ResizeObserver)return;
  REF12_CARDWATCH=new ResizeObserver(function(){var stage=paper.parentElement;if(paper.isConnected&&innerWidth<768&&paper.getBoundingClientRect().height>stage.clientHeight+.5)flowFitCard();});
  REF12_CARDWATCH.observe(paper);
}
function ref12Observer(root){
  if(REF12_OBSERVERS.has(root))return REF12_OBSERVERS.get(root);
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;var el=entry.target;observer.unobserve(el);if(el.hasAttribute('data-ref12-more')){if(el.isConnected&&!el.disabled)el.click();}else{el.classList.add('ref12-shown');}});},{root:root,rootMargin:'0px 0px 80px 0px',threshold:.06});REF12_OBSERVERS.set(root,observer);return observer;
}
function ref12Scan(){
  REF12_FRAME=0;ref12WatchCard();if(!window.IntersectionObserver)return;
  REF12_OBSERVERS.forEach(function(obs,root){if(root&&!root.isConnected){obs.disconnect();REF12_OBSERVERS.delete(root);}});
  var entries=$$('.growth-week[open] ol>li,.m3-milestones[open] .journey-timeline31>li,.journey-past33[open] .journey-timeline31>li');
  entries.forEach(function(el,i){if(el.dataset.ref12Ready)return;el.dataset.ref12Ready='1';if(reduceMotion())return;el.classList.add('ref12-reveal');el.style.setProperty('--ref12-delay',(i%4)*55+'ms');ref12Observer(el.closest('.sheet')).observe(el);});
  $$('[data-act="milestoneMore31"],[data-act="habitMore33"]').forEach(function(button){if(button.dataset.ref12More)return;var details=button.closest('details');if(details&&!details.open)return;button.dataset.ref12More='1';ref12Observer(button.closest('.sheet')).observe(button);});
}
function ref12Schedule(){if(!REF12_FRAME)REF12_FRAME=requestAnimationFrame(ref12Scan);}
document.addEventListener('DOMContentLoaded',function(){new MutationObserver(ref12Schedule).observe(document.body,{childList:true,subtree:true});ref12Schedule();});
document.addEventListener('toggle',function(e){if(e.target.matches('.growth-week,.m3-milestones,.journey-past33'))ref12Schedule();},true);
if(document.fonts){document.fonts.ready.then(function(){flowFitCard();});document.fonts.addEventListener('loadingdone',function(){requestAnimationFrame(flowFitCard);});}

;
/* ===== SECTION: routine-evening.js ===== */
/* M3.3.13 · approved evening revision. Existing record writers and storage keys remain authoritative. */
var EVENING_DONE_OPEN=false,EVENING_REVIEW_OPEN=false,EVENING_LIBRARY_ORIGIN=null,EVENING_FLIPPING=false;
/* These symbols are not present in the bundled font subset; keep them native SVG. */
var eveningMi=mi;
mi=function(name){var paths={handyman:'<path d="m14 5 5 5M4 20l6-6M15 3a5 5 0 0 0-6 6L3 15a4 4 0 0 0 6 6l6-6a5 5 0 0 0 6-6l-4 4-6-6z"/>',arrow_outward:'<path d="M6 18 18 6M6 6h12v12"/>',play_arrow:'<path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',restart_alt:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',calendar_add_on:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18M12 13v5M9.5 15.5h5"/>',route:'<circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M6 15V8a4 4 0 0 1 4-4h1M18 9v7a4 4 0 0 1-4 4h-1"/>',add_circle:'<circle cx="12" cy="12" r="9"/><path d="M7 12h10M12 7v10"/>'};return paths[name]?'<svg class="material-symbols-rounded evening-symbol" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>':eveningMi(name);};
PAGES=[['deck','Hôm nay'],['week','Tuần'],['prog','Hành trình'],['library','Thư viện']];
var eveningShell=shellHTML;
shellHTML=function(){return eveningShell().replace(/<button class="m3-icon-button" data-act="collection"[\s\S]*?<\/button>/,'');};
var eveningHead=renderHead;
renderHead=function(){eveningHead();var action=$('#headerAction35');if(action)action.innerHTML='';};
var eveningBar=renderBar;
renderBar=function(){eveningBar();var buttons=$$('#abar>button'),icons=SHIN_NAV_ICONS.concat('<svg class="shin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-2-10 1Z"/><path d="M12 5v16"/></svg>');buttons.forEach(function(b,i){var icon=$('.m3-nav-indicator',b);if(icon)icon.innerHTML=icons[i];});};
renderPage=function(){renderHead();document.body.classList.toggle('pg0',PG===0);document.body.classList.remove('cards-view34');var pv=$('#pv');if(!pv)return;pv.innerHTML='<div class="m3-page m3-page-'+['today','week','journey','library'][PG]+'">'+(PG===0?vToday():PG===1?flowWeek():PG===2?treePanel():eveningLibrary(false))+'</div>';if($('.evening-nudge:not(.welcome)',pv)){S.evening=S.evening||{};S.evening.nudgeDay=dk();save(true);}};
toPage=function(i){if(i<0||i>3)return;if(i===2&&i!==PG)TREE_REPLAY34=true;PG=i;if(i!==3)EVENING_LIBRARY_ORIGIN=null;document.body.classList.remove('growth-nav-away');renderBar();renderPage();window.scrollTo(0,0);m3Enter($('#pv'));var title=$('#pageTitle35');if(title)title.focus({preventScroll:true});};
openCollection=function(){closeOv();PICK=null;toPage(3);};
var eveningOpenStore=openStore;
openStore=function(pick){if(pick){S.storeView='list';eveningOpenStore(true);}else openCollection();};

function eveningTonal(label,icon,content,open,extra){return '<details class="evening-disclosure '+(extra||'')+'"'+(open?' open':'')+'><summary>'+mi(icon)+'<span>'+label+'</span>'+mi('chevron_right')+'</summary><div class="evening-disclosure-body">'+content+'</div></details>';}
function eveningTodayRows(ids,done){var d=dk();return '<div class="flow-today-list">'+ids.map(function(id){var u=H(id),status=done?RECORD_LABEL[mark(d,id)]:flowPendingText(d,id),row='<article class="flow-today-row'+flowGroup(id)+(status&&!done?' is-pending':'')+'"'+(done?'':' data-flow-swipe="'+id+'"')+'><button class="flow-card-entry" data-act="flowFront" data-v="'+id+'" aria-label="Xem thẻ '+esc(flowTodayName(id))+'"><span class="flow-emblem">'+flowIcon(id)+'</span></button><button class="flow-row-main" data-act="note" data-v="'+id+'|'+d+'"><b>'+esc(flowTodayName(id))+'</b><small class="'+(done?'evening-result state-'+mark(d,id):'')+'">'+esc(status||'Khi '+(u.anchor||'đến lúc đã chọn'))+'</small></button><button class="flow-row-plus" data-act="note" data-v="'+id+'|'+d+'" aria-label="'+(done?'Chỉnh ghi nhận ':'Ghi nhận ')+esc(flowTodayName(id))+'">'+mi(done?'edit':'add')+'</button></article>';return done?row:'<div class="growth-swipe-shell">'+touchSwipeUnder()+row+'</div>';}).join('')+'</div>';}
/* A saved outcome is not necessarily a completed habit. Drafts always remain above. */
vToday=function(){var d=dk(),all=handList(),done=all.filter(function(id){return flowComplete(d,id)&&!flowDraft(d,id);}),pending=all.filter(function(id){return !flowComplete(d,id)||!!flowDraft(d,id);}),optional=pending.filter(function(id){return !flowDraft(d,id)&&!mark(d,id)&&growthWeekCount(id,wkStart(d))>=growthGoal(id);}),required=pending.filter(function(id){return optional.indexOf(id)<0;}),yes=all.filter(function(id){return mark(d,id)==='y';}).length;
 var h='<div data-flow-type><div class="flow-today-toolbar"><span>'+done.length+'/'+all.length+' đã ghi nhận</span></div>'+eveningNudge();
 if(required.length)h+=eveningTodayRows(required,false);else h+='<section class="flow-empty evening-today-empty">'+shin(all.length?'proud':'hi')+'<h2>'+(all.length?'Hôm nay đã có '+done.length+'/'+all.length+' ghi nhận':'Một thẻ là đủ để bắt đầu')+'</h2><p>'+(optional.length?'Các thẻ còn lại đã đạt mục tiêu tuần. Bạn có thể rèn thêm khi muốn.':all.length?'Đã làm '+yes+' thói quen. Mỗi lần nhìn lại là một bước hiểu mình hơn.':'Chọn một thói quen vừa sức, rồi bắt đầu cùng Shin nhé.')+'</p></section>';
 if(optional.length)h+=eveningTonal('Rèn thêm nếu muốn · '+optional.length,'add_circle',eveningTodayRows(optional,false),false,'evening-optional');
 if(done.length)h+=eveningTonal('Đã ghi nhận hôm nay · '+done.length,'check_circle',eveningTodayRows(done,true),EVENING_DONE_OPEN,'evening-done');
 var exceeded=all.filter(function(id){return growthWeekCount(id,wkStart(d))>growthGoal(id);});if(exceeded.length)h+='<aside class="growth-praise">'+mi('celebration')+'<p>'+esc(S.name||'Bạn')+' đã vượt mục tiêu tuần: '+exceeded.map(function(id){return esc(sname(id))+' '+growthWeekCount(id,wkStart(d))+'/'+growthGoal(id)+' ngày';}).join(' · ')+'. Shin vui cùng bạn!</p></aside>';
 if(all.length<5)h+='<button class="flow-link flow-add" data-act="pick">'+mi('add')+'Thêm thói quen</button>';return h+'</div>';};

/* Keep the old challenge map intact. New offers use the existing weekly slot 0. */
function eveningChallengeEligible(){var starts=(S.order||[]).map(H).filter(Boolean).map(function(u){return u.since;}).sort(),first=starts[0],evidence=Object.keys(S.log||{}).some(function(d){return d<=dk()&&Object.values(S.log[d]).some(Boolean);});return !!first&&evidence&&wkStart(first)<wkStart(dk())&&diffD(first,dk())>=7;}
growthOffer=function(){if(!growthState().enabled||!eveningChallengeEligible())return null;var w=wkStart(dk()),entries=Object.keys(growthState().challenges).filter(function(k){return k.slice(0,10)===w;}).sort();if(entries.some(function(k){return ['done','skipped'].includes(growthState().challenges[k].status);}))return null;return entries.find(function(k){return ['accepted','later'].includes(growthState().challenges[k].status);})||w+'_0';};
growthChallengePanel=function(){var key=growthOffer();if(!key)return '';var a=growthState().challenges[key],t=GROWTH_CHALLENGES[a?a.template:growthChallengeTemplate(key)];return '<section class="evening-week-challenge" data-flow-type>'+shin(a?'determined':'hi')+'<div><small>THỬ THÁCH TUẦN · TÙY CHỌN</small><h3>'+esc(t.title)+'</h3><p>'+esc(t.text)+'</p><p class="evening-challenge-note">Thử vào ngày nào trong tuần cũng được. Bỏ qua cũng không sao.</p><div><button class="flow-link" data-act="growthChallengeSkip" data-v="'+key+'">Tuần này bỏ qua</button><button class="flow-link" data-act="'+(a?'growthChallengeOpen':'touchChallengeAccept')+'" data-v="'+key+'">'+(a?'Viết cảm nhận':'Mình thử nhé')+mi('arrow_forward')+'</button></div></div></section>';};
var eveningChallengeOpen=growthChallengeOpen;
growthChallengeOpen=function(key){if(key.slice(0,10)!==wkStart(dk()))return;eveningChallengeOpen(key);};
var eveningChallengeSave=growthChallengeSave;
growthChallengeSave=function(key,note,confirm){if(key.slice(0,10)!==wkStart(dk()))return false;return eveningChallengeSave(key,note,confirm);};

var eveningWeek=flowWeek;
flowWeek=function(){var h=eveningWeek(),saved=JOURNAL_MODE31==='saved',tools='<div class="evening-week-tools" data-flow-type><button class="flow-link" data-act="eveningSaved" aria-pressed="'+saved+'">'+mi('star')+(saved?'Về tuần đang xem':'Đáng nhớ')+'</button></div>';if(saved)return '<div class="play14-saved-head" data-flow-type><button class="flow-link" data-act="eveningSaved">'+mi('arrow_back')+'Về tuần</button></div>'+h;
 /* The selected habit note stays beside its dots. The full daily review opens on demand. */
 var temp=document.createElement('div');temp.innerHTML=h;var journal=$('.flow-day-journal',temp);if(journal)journal.remove();
 h=temp.innerHTML;var shownStart=addD(wkStart(dk()),-7*DW),day=FLOW_DAY&&FLOW_DAY>=shownStart&&FLOW_DAY<=addD(shownStart,6)?FLOW_DAY:DW?addD(shownStart,6):dk(),review=eveningTonal('Nhật ký · Xem lại '+(day===dk()?'hôm nay':dm(day)),'auto_stories',journalDay31(day),EVENING_REVIEW_OPEN,'evening-day-review');
 h=h.replace('<button class="week-link flow-week-link ref12-week-open"',review+(DW===0?growthChallengePanel():'')+'<button class="week-link flow-week-link ref12-week-open"');var panel=document.createElement('div');panel.innerHTML=h;var nav=$('.m3-week-nav',panel);if(nav){var row=document.createElement('div');row.className='play14-week-toolbar';row.setAttribute('data-flow-type','');nav.before(row);row.appendChild(nav);var savedButton=document.createElement('button');savedButton.className='play14-saved';savedButton.dataset.act='eveningSaved';savedButton.setAttribute('aria-label','Xem ghi chú đáng nhớ');savedButton.setAttribute('aria-pressed','false');savedButton.innerHTML=mi('star')+'<span>Đáng nhớ</span>';row.appendChild(savedButton);}return panel.innerHTML;};
var eveningDayEntry=flowDayEntry;
flowDayEntry=function(id,d){var h=eveningDayEntry(id,d);if(!mark(d,id)&&!flowDraft(d,id))h=h.replace('<p>Chưa có ghi nhận','<p class="evening-unrecorded">Chưa có ghi nhận');return h;};
/* Move the selected entry directly below the calendar, before totals and Shin. */
var eveningJournal=habitJournal33;
habitJournal33=function(id){var root=document.createElement('div');root.innerHTML=eveningJournal(id);var key=$('.growth-key',root);if(key)key.innerHTML=[['y','Đã làm'],['p','Một phần'],['n','Chưa làm'],['x','Không gặp dịp'],['empty','Chưa ghi']].map(function(a){return '<span class="'+a[0]+'"><i aria-hidden="true"></i>'+a[1]+'</span>';}).join('');var selected=$('.growth-selected',root),cal=$('.growth-calendar',root);if(selected&&cal)cal.insertAdjacentElement('afterend',selected);return root.innerHTML;};
var eveningTree=treePanel;
treePanel=function(){return eveningTree().replace('<summary>Những chặng đã đi qua</summary>','<summary>'+mi('route')+'<span>Những chặng đã qua</span>'+mi('chevron_right')+'</summary>');};

/* Library is a real primary destination; the pick-a-card dialog remains separate. */
function eveningMini(id,how){var st=libStatus(id);return '<button class="evening-mini'+flowGroup(id)+'" data-act="'+(how?'eveningHow':'eveningCard')+'" data-v="'+id+'" aria-label="'+(how?'Cách làm: ':'Xem thẻ: ')+esc(hname(id))+'"><span class="flow-emblem">'+flowIcon(id)+'</span><span class="evening-mini-open">'+mi('arrow_outward')+'</span><b>'+esc(hname(id))+'</b><small>'+esc(how?'Xem cách làm':st[0])+'</small></button>';}
function eveningLibrary(pick){var v=['list','lessons','tools'].includes(S.storeView)?S.storeView:'list',done=LESSONS.filter(function(l){return S.les[l.id];}).length;
 var h='<section class="evening-library" data-flow-type>'+f3Tabs([['list','Thói quen','style'],['lessons','Bài học','menu_book'],['tools','Công cụ','handyman']],v,'sview','evening-library-','evening-library-content','Nội dung thư viện')+'<div id="evening-library-content" role="tabpanel" aria-labelledby="evening-library-'+v+'">';
 if(v==='tools')return h+'<p class="evening-library-intro">Chọn một công cụ để bắt đầu dễ hơn.</p><button class="evening-tool" data-act="eveningPomodoro"><span class="evening-tomato-mini" aria-hidden="true">'+eveningTomato()+'</span><span><b>Pomodoro</b><small>Tập trung một việc · Mặc định 25 phút</small></span>'+mi('arrow_forward')+'</button></div></section>';
 if(v==='lessons'){h+='<h2 class="evening-library-heading">Nền tảng rèn luyện <small>'+done+'/5 bài đã học</small></h2>'+lessonList()+'<h2 class="evening-library-heading">Cách làm từng thói quen</h2><p class="evening-library-intro">Tra cứu hướng dẫn của mọi thói quen, kể cả khi bạn chưa rút thẻ.</p>';GROUPS.forEach(function(g){h+='<h3 class="evening-group-label">'+esc(g.t)+'</h3><div class="evening-mini-grid">'+HABITS.filter(function(x){return x.g===g.g;}).map(function(x){return eveningMini(x.id,true);}).join('')+'</div>';});return h+'</div></section>';}
 if(pick)h+='<p class="evening-library-intro">Chọn một thẻ vừa sức để rèn.</p>';
 h+=f3CustomBlock();var filters=[['all','Tất cả'],['on','Đang rèn'],['keep','Đang duy trì'],['todo','Chưa rèn']];h+='<div class="f3-filters" role="group" aria-label="Lọc thói quen">'+filters.map(function(f){return '<button data-act="sflt" data-v="'+f[0]+'" aria-pressed="'+(STF===f[0])+'">'+esc(f[1])+'</button>';}).join('')+'</div>';
 var count=0;GROUPS.forEach(function(g){var list=HABITS.filter(function(x){return x.g===g.g&&(STF==='all'||libKind(x.id)===STF);});if(!list.length)return;count+=list.length;h+='<h2 class="evening-group-label">'+esc(g.t)+'</h2><div class="evening-mini-grid">'+list.map(function(x){return eveningMini(x.id,false);}).join('')+'</div>';});if(!count)h+='<p class="evening-library-intro">Chưa có thẻ trong nhóm này.</p>';return h+'</div></section>';}
drawStore=function(){if(PICK!=null){if(!OV)return;f2Mount('library',f2Head('Chọn thẻ để rèn','')+'<div class="f2-body">'+eveningLibrary(true)+'</div>');}else if(PG===3)renderPage();};
/* Custom cards share the same compact color treatment. */
f3LibraryRow=function(id){return eveningMini(id,false);};
var eveningDrawHow=drawHow;
drawHow=function(){eveningDrawHow();if(EVENING_LIBRARY_ORIGIN&&EVENING_LIBRARY_ORIGIN.how&&OV){$$('.f2-head [data-act="card"],.f2-footer [data-act="card"]',OV).forEach(function(b){b.dataset.act='eveningLibraryBack';b.setAttribute('aria-label','Về Thư viện');if(b.closest('.f2-footer'))b.innerHTML=mi('arrow_back')+'Về Thư viện';});}};
function eveningZoomOpen(button,how){var id=button.dataset.v,rect=button.getBoundingClientRect();EVENING_LIBRARY_ORIGIN={id:id,how:how,pick:PICK,rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height}};HABIT_RETURN33=null;FLOW_HOW_RETURN=null;FLOW_NOTE_RETURN=null;if(how)openHow(id);else{closeOv(true);openCard(id,false);}var sheet=OV&&$('.sheet',OV);if(sheet&&!reduceMotion()){var to=sheet.getBoundingClientRect(),from=EVENING_LIBRARY_ORIGIN.rect;sheet.animate([{opacity:.25,transform:'translate('+(from.left+from.width/2-to.left-to.width/2)+'px,'+(from.top+from.height/2-to.top-to.height/2)+'px) scale(.32)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)'});}}
function eveningLibraryBack(){var origin=EVENING_LIBRARY_ORIGIN;if(!origin)return;EVENING_LIBRARY_ORIGIN=null;HW=null;HABIT_RETURN33=null;FLOW_HOW_RETURN=null;closeOv(true);if(origin.pick!=null){PICK=origin.pick;openOv('');drawStore();}else{var button=$('.evening-mini[data-v="'+origin.id+'"]');if(button)button.focus({preventScroll:true});}}

/* Five extra facial expressions built from the established SVG character. */
var eveningShin=shin;
shin=function(mood){var config={determined:['proud','M42 49l12 3M66 52l12-3'],focused:['think','M41 51h13M66 51h13'],waiting:['worry','M41 48q6-3 12 1M66 49q6-4 12-1'],pout:['worry','M41 50l12 2M67 52l12-2'],welcome:['cheer','']},c=config[mood],svg=eveningShin(c?c[0]:mood);svg=svg.replace('<svg ','<svg class="evening-shin expression-'+(mood||'hi')+'" ');if(c&&c[1])svg=svg.replace('</g></svg>','<path d="'+c[1]+'" stroke="#3A2A1C" stroke-width="3" fill="none" stroke-linecap="round"/></g></svg>');if(mood==='focused')svg=svg.replace('</g></svg>','<path d="M35 85h50v25H35zM60 85v25" fill="#D9E5F7" stroke="#3A2A1C" stroke-width="2.4"/></g></svg>');if(mood==='pout')svg=svg.replace('</g></svg>','<path d="M54 74q6 4 12 0" fill="none" stroke="#3A2A1C" stroke-width="3" stroke-linecap="round"/><path d="M91 37h8m-4-4v8" stroke="#C37343" stroke-width="2.5"/></g></svg>');return svg;};
function eveningNudgeState(){var ids=handList().filter(function(id){return !isDip(id)&&H(id)&&H(id).status==='active';});if(!ids.length)return null;var dates=Object.keys(S.log||{}).filter(function(d){return d<=dk()&&ids.some(function(id){return !!mark(d,id);});}).sort(),last=dates[dates.length-1]||ids.map(function(id){return H(id).since;}).sort()[0];var gap=diffD(last,dk()),needs=ids.some(function(id){return growthWeekCount(id,wkStart(dk()))<growthGoal(id);});return needs&&gap>3?{days:gap,level:gap>=14?'red':gap>=7?'orange':'yellow',mood:gap>=14?'determined':gap>=7?'pout':'waiting'}:null;}
function eveningNudge(){var n=eveningNudgeState(),prefs=S.evening||{};if(n){if(prefs.nudgeDay===dk())return '';return '<aside class="evening-nudge '+n.level+'">'+shin(n.mood)+'<div><b>Shin đang đợi '+esc(S.name||'bạn')+'</b><p>Đã '+n.days+' ngày chưa có ghi nhận mới. '+(n.level==='yellow'?'Hôm nay mình thử lại một việc nhỏ nhé?':n.level==='orange'?'Shin hơi buồn rồi. Mình cùng nối lại nhịp bằng việc nhỏ nhất nhé.':'Shin muốn cùng bạn bắt đầu lại. Một việc vừa sức hôm nay là đủ.')+'</p></div><button class="m3-icon-button" data-act="eveningDismissNudge" aria-label="Đóng lời nhắc hôm nay">'+mi('close')+'</button></aside>';}
 if(prefs.returnDay===dk()&&Object.values(S.log[dk()]||{}).some(Boolean))return '<aside class="evening-nudge welcome">'+shin('welcome')+'<div><b>Shin vui vì bạn đã trở lại!</b><p>Một ghi nhận mới, một bước nối lại nhịp.</p></div></aside>';return '';}
var eveningWriteRecord=writeRecord;
writeRecord=function(id,d,m,note,why){var away=eveningNudgeState(),out=eveningWriteRecord(id,d,m,note,why);if(out&&m&&d===dk()&&away){S.evening=S.evening||{};S.evening.returnDay=dk();save(true);}return out;};
var eveningRecordFeedback=recordFeedback;
recordFeedback=function(id,d,removed){var row=PG===0&&d===dk()&&!removed?$('[data-flow-swipe="'+id+'"]'):null,rect=row&&row.getBoundingClientRect(),ghost=row&&row.cloneNode(true);eveningRecordFeedback(id,d,removed);if(!ghost||OV||PG!==0||reduceMotion()||rect.top<0||rect.top>innerHeight)return;ghost.setAttribute('data-flow-type','');ghost.setAttribute('aria-hidden','true');ghost.removeAttribute('data-flow-swipe');ghost.querySelectorAll('button').forEach(function(b){b.tabIndex=-1;});Object.assign(ghost.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:'0',zIndex:'90',pointerEvents:'none'});document.body.appendChild(ghost);ghost.animate([{opacity:1,transform:'translateY(0) scaleY(1)'},{opacity:0,transform:'translateY(30px) scaleY(.4)'}],{duration:300,easing:'cubic-bezier(.4,0,.2,1)'}).finished.then(function(){ghost.remove();},function(){ghost.remove();});};

/* Fit the frame, never shrink the approved reading sizes. Long content scrolls. */
flowFitCard=function(){var stage=$('.flow-card-stage'),body=stage&&stage.parentElement;if(!stage||!body)return;var cs=getComputedStyle(body),height=Math.max(120,Math.floor(body.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)));stage.style.height=height+'px';stage.style.setProperty('--ref12-s','1');stage.style.setProperty('--card-scale','1');var paper=$('.flow-paper',stage);if(paper){paper.style.transform='';paper.style.transformOrigin='';}};
/* Animate the persistent turner, never rebuild the dialog at flip completion. */
touchFlipCard=function(focusButton){
 var stage=OV&&$('.flow-card-stage',OV),turner=stage&&$('.shin-card-turner',stage);if(EVENING_FLIPPING||!CARD||CARD.tab==='journal'||!turner)return;
 if(!S.gFlip){S.gFlip=1;save();}var before=!!CARD.back,next=!before,card=CARD;CARD.back=next;
 var finish=function(){if(CARD!==card||!stage.isConnected)return;$$('.shin-card-face',turner).forEach(function(face){var active=face.classList.contains('shin-card-back')===next;face.inert=!active;if(active)face.removeAttribute('aria-hidden');else face.setAttribute('aria-hidden','true');});var b=$('[data-act=flowFlip]',OV);if(b){b.setAttribute('aria-pressed',String(next));b.innerHTML=mi('swap_horiz')+(next?'Mặt trước':'Mặt sau');if(focusButton)b.focus({preventScroll:true});}};
 turner.style.transform='rotateY('+(next?180:0)+'deg)';if(reduceMotion()){finish();return;}
 EVENING_FLIPPING=true;var anim=turner.animate([{transform:'rotateY('+(before?180:0)+'deg)'},{transform:'rotateY('+(next?180:0)+'deg)'}],{duration:360,easing:'cubic-bezier(.4,0,.2,1)'});window.SHIN_FLIP_ANIMATION=anim;
 anim.finished.then(finish,function(){}).finally(function(){if(window.SHIN_FLIP_ANIMATION===anim){window.SHIN_FLIP_ANIMATION=null;EVENING_FLIPPING=false;}});
};
/* Old per-face press tilt removed: the persistent turner owns all transforms. */

/* Local-only settings extend backups without changing the old data schema. */
var eveningValidate=validateState32;
validateState32=function(d){eveningValidate(d);if(d.evening!==undefined){var e=d.evening;if(!stateObject32(e)||e.morningTime!==undefined&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.morningTime)||e.pomodoro!==undefined&&(!Number.isInteger(e.pomodoro)||e.pomodoro<1||e.pomodoro>180))throw Error('Cài đặt nhắc sáng hoặc Pomodoro không hợp lệ.');}return d;};
var eveningNbSet=nbSet;
nbSet=function(){var root=document.createElement('div');root.innerHTML=eveningNbSet();var row=document.createElement('div');row.innerHTML=setRow('morning','bell',3,'Nhắc rèn luyện đầu ngày',(S.evening||{}).morningTime||'07:00','<p>Lời nhắc đầu ngày, không yêu cầu check-in.</p><label class="lbl" for="eveningMorningTime">Giờ nhắc trên điện thoại</label><input class="inp" id="eveningMorningTime" type="time" value="'+esc((S.evening||{}).morningTime||'07:00')+'"><button class="btn btn--soft" data-act="eveningMorningCalendar">'+mi('calendar_add_on')+'Thêm vào lịch điện thoại</button><p class="note">Xác nhận lưu và bật cảnh báo trong lịch điện thoại. Nếu đổi giờ sau khi đã thêm, sửa hoặc xóa lịch nhắc cũ trên điện thoại để tránh trùng.</p>');var rem=$('#f3-setting-rem',root),list=rem&&rem.closest('.setl');if(list)list.insertAdjacentElement('beforeend',row.firstElementChild);else root.insertAdjacentHTML('beforeend',row.innerHTML);return root.innerHTML;};
function eveningMorningCalendar(){var time=(S.evening||{}).morningTime||'07:00',parts=time.split(':'),start=new Date();start.setHours(+parts[0],+parts[1],0,0);if(start<new Date())start.setDate(start.getDate()+1);var end=new Date(start.getTime()+5*60000),title='Rèn một việc nhỏ cùng Shin',url=location.href.split('#')[0],description='Một việc nhỏ vừa sức để bắt đầu ngày mới. Không cần check-in. Mở app: '+url;
 var lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Shin routine//Morning//VI','BEGIN:VEVENT','UID:shin-morning-'+Date.now()+'@shin-routine','DTSTAMP:'+icsDate(new Date()),'DTSTART:'+icsDate(start),'DTEND:'+icsDate(end),'RRULE:FREQ=DAILY','SUMMARY:'+title,'DESCRIPTION:'+description,'URL:'+url,'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:'+title,'END:VALARM','END:VEVENT','END:VCALENDAR'];
 if(isIOS()){downloadData32(lines.join('\r\n'),'Shin-nhac-ren-luyen-sang.ics','text/calendar');toast('Mở tệp lịch vừa tải và xác nhận thêm lời nhắc.');}else if(/Android/i.test(navigator.userAgent||'')){var fallback='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates='+icsDate(start)+'/'+icsDate(end)+'&recur=RRULE%3AFREQ%3DDAILY&details='+encodeURIComponent(description);location.href='intent://#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;S.title='+encodeURIComponent(title)+';S.description='+encodeURIComponent(description)+';l.beginTime='+start.getTime()+';l.endTime='+end.getTime()+';S.rrule='+encodeURIComponent('FREQ=DAILY')+';S.browser_fallback_url='+encodeURIComponent(fallback)+';end';}else{downloadData32(lines.join('\r\n'),'Shin-nhac-ren-luyen-sang.ics','text/calendar');toast('Mở tệp vừa tải để thêm vào lịch điện thoại.');}}

document.addEventListener('toggle',function(e){if(e.target.matches('.evening-done'))EVENING_DONE_OPEN=e.target.open;if(e.target.matches('.evening-day-review'))EVENING_REVIEW_OPEN=e.target.open;},true);
document.addEventListener('change',function(e){if(e.target.id==='eveningMorningTime'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(e.target.value)){S.evening=S.evening||{};S.evening.morningTime=e.target.value;save(true);}});
document.addEventListener('click',function(e){if(e.target===OV&&EVENING_LIBRARY_ORIGIN&&!FLOW_HOW_RETURN&&!FLOW_NOTE_RETURN){e.preventDefault();e.stopImmediatePropagation();eveningLibraryBack();return;}var summary=e.target.closest('.evening-disclosure>summary');if(summary&&!reduceMotion()){e.preventDefault();var details=summary.parentElement;if(details.dataset.animating)return;details.dataset.animating='1';var closing=details.open,from=details.getBoundingClientRect().height;details.open=true;var to=closing?summary.getBoundingClientRect().height:details.getBoundingClientRect().height;details.style.overflow='hidden';details.animate([{height:from+'px'},{height:to+'px'}],{duration:310,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(function(){details.open=!closing;details.style.overflow='';delete details.dataset.animating;});return;}var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='flowTodayReview'){e.preventDefault();e.stopImmediatePropagation();PG=1;DW=0;FLOW_DAY=dk();FLOW_HABIT=null;EVENING_REVIEW_OPEN=true;JOURNAL_MODE31='day';render();return;}
 if(a==='flowDay'||a==='flowWeekNav')EVENING_REVIEW_OPEN=false;
 if(a==='eveningSaved'){e.preventDefault();e.stopImmediatePropagation();JOURNAL_MODE31=JOURNAL_MODE31==='saved'?'day':'saved';renderPage();return;}
 if(a==='eveningCard'||a==='eveningHow'){e.preventDefault();e.stopImmediatePropagation();eveningZoomOpen(b,a==='eveningHow');return;}
 if(a==='eveningLibraryBack'||a==='close'&&EVENING_LIBRARY_ORIGIN&&OV&&!FLOW_NOTE_RETURN&&!FLOW_HOW_RETURN&&($('.habit-sheet33',OV)||$('.f2-how',OV))){e.preventDefault();e.stopImmediatePropagation();eveningLibraryBack();return;}
 if(a==='eveningDismissNudge'){e.preventDefault();e.stopImmediatePropagation();S.evening=S.evening||{};S.evening.nudgeDay=dk();save(true);renderPage();return;}
 if(a==='eveningMorningCalendar'){e.preventDefault();e.stopImmediatePropagation();eveningMorningCalendar();return;}
},true);

document.addEventListener('keydown',function(e){if(e.key==='Escape'&&EVENING_LIBRARY_ORIGIN&&OV&&!FLOW_HOW_RETURN&&!FLOW_NOTE_RETURN){e.preventDefault();e.stopImmediatePropagation();eveningLibraryBack();}},true);

;