/* Canonical editable source. Section names record provenance, not imports. */

/* ===== SECTION: routine-flow.js ===== */
/* Clear titles are local to Today; stored names and other screens stay unchanged. */
function flowTodayName(id){
  if(id==='horenso')return 'Báo cáo, xác nhận';
  if(id==='bot'&&H(id)&&H(id).bad==='mxh')return 'Giảm dần: lướt mạng xã hội';
  return hname(id);
}
/* M3.3.0 · approved Today / Week / Journey flow. Existing records and keys stay intact. */
var FLOW_DAY=null,FLOW_HABIT=null,FLOW_HOW_RETURN=null,FLOW_NOTE_RETURN=null,FLOW_CARD_OBSERVER=null;
function flowGroup(id){var x=HMAP[id];return x&&!x.custom&&x.g>=1&&x.g<=4?' flow-group-'+x.g:' flow-group-custom';}
function flowIcon(id){var x=HMAP[id];return x&&x.custom?glyph('cu_'+(x.icon||'la'),GCOL[x.g]||GCOL[5]):mi(m3HabitIcon(id));}
function flowDraft(d,id){return ((S.recordDrafts||{})[d]||{})[id]||null;}
function flowStashNote(){if(!NT||!H(NT.id))return;S.recordDrafts=S.recordDrafts||{};S.recordDrafts[NT.day]=S.recordDrafts[NT.day]||{};S.recordDrafts[NT.day][NT.id]={ans:NT.ans,text:String(NT.text||''),why:NT.why||''};save(true);}
function flowClearDraft(d,id){if(S.recordDrafts&&S.recordDrafts[d]){delete S.recordDrafts[d][id];if(!Object.keys(S.recordDrafts[d]).length)delete S.recordDrafts[d];}}
function flowComplete(d,id){return !!mark(d,id)&&!!String((S.notes[d]||{})[id]||'').trim();}
function flowPendingText(d,id){var draft=flowDraft(d,id),m=draft?draft.ans:mark(d,id);return m?(RECORD_LABEL[m]+' · '+(m==='n'||m==='x'?'chờ lý do':'chờ memo')):'';}

/* Drafts never award XP or advance a level. Only writeRecord commits a result. */
var flowWriteRecord=writeRecord;
writeRecord=function(id,d,m,note,why){var draft=flowDraft(d,id),out=flowWriteRecord(id,d,m,note,why);if(out){out.recordDraft=draft?JSON.parse(JSON.stringify(draft)):null;flowClearDraft(d,id);save(true);}return out;};
var flowUndoRecord=undoRecord29;
undoRecord29=function(token){var old=RECORD_UNDO,valid=old&&String(old.token)===String(token)&&RECORD_VERSIONS[old.day+'|'+old.id]===old.token;flowUndoRecord(token);if(valid&&old.recordDraft){S.recordDrafts[old.day]=S.recordDrafts[old.day]||{};S.recordDrafts[old.day][old.id]=old.recordDraft;save(true);refreshAll();}};

openNote=function(id,day){
  day=day||dk();if(!H(id)||(day!==dk()&&!canBf(day,id)))return;
  $('#toast').classList.remove('show');rememberHabit33();var draft=flowDraft(day,id),m=mark(day,id);
  NT={id:id,day:day,ans:draft?draft.ans:m||'y',text:draft?draft.text:(S.notes[day]||{})[id]||'',why:draft?draft.why:(S.why[day]||{})[id]||'',open:false};
  openMini('');drawNote29();
};
drawNote29=function(){
  if(!NT)return;var id=NT.id,E=noteHints34(id,NT.ans),has=!!mark(NT.day,id)||!!flowDraft(NT.day,id);
  var head=f2Head('Ghi nhận thói quen',NT.day===dk()?'Hôm nay':treeDate30(NT.day));
  var h=head+'<div class="f2-body">'+f2Identity(id)+'<button class="f2-text-button flow-view-card" data-act="flowNoteCard" data-v="'+id+'">'+mi('style')+'Xem thẻ</button>'+recordOptions29(id,NT.ans,'recordAnswer')+'<div class="f2-note-field"><label class="lbl" for="ntIn">'+esc(E.q)+' <small>· Bắt buộc</small></label><textarea class="inp" id="ntIn" data-in="note" rows="3" required aria-required="true" aria-describedby="ntRequired34" placeholder="'+(NT.ans==='n'||NT.ans==='x'?'Ghi một lý do cụ thể':'Ghi lại một điều cụ thể')+'">'+esc(NT.text)+'</textarea><p class="f2-error" id="ntRequired34" role="alert" hidden>Viết một ghi chú ngắn trước khi lưu nhé.</p></div>'+f2Hints(id,NT.ans,'ntChip',false,NT.ans==='n'||NT.ans==='x')+(has?'<button class="f2-text-button f2-remove" data-act="flowRemoveDraft">Bỏ ghi nhận</button>':'')+'</div><footer class="sbar f2-footer f2-record-footer"><button class="f2-text-button" data-act="flowMemoLater">Để sau</button><button class="btn" id="ntGo" data-act="ntSave"'+(String(NT.text||'').trim()?'':' disabled')+'>'+mi('check')+'Lưu ghi nhận</button></footer>';
  f2Mount('record',h,true);
};
var flowOpenCI=openCI;
openCI=function(date){flowOpenCI(date);if(!CI)return;CI.all.forEach(function(id){var draft=flowDraft(date,id);if(draft&&!CI.skip[id]){CI.ans[id]=draft.ans;CI.notes[id]=draft.text;CI.why[id]=draft.why;if(CI.base[id])CI.edit[id]=true;}});drawCI();};
var flowStashCI=stashCI29;
stashCI29=function(){flowStashCI();if(!CI||CI.done)return;CI.all.forEach(function(id){if(CI.ans[id]&&!CI.base[id]&&!CI.skip[id]){S.recordDrafts[CI.date]=S.recordDrafts[CI.date]||{};S.recordDrafts[CI.date][id]={ans:CI.ans[id],text:CI.notes[id]||'',why:CI.why[id]||''};}});save();};

/* Three top-level pages, with no nested page tabs. */
renderHead=function(){var d=new Date();if($('#pageTitle35'))$('#pageTitle35').textContent=PAGES[PG][1];if($('#hdate'))$('#hdate').textContent=WD[d.getDay()]+', '+pad(d.getDate())+'/'+pad(d.getMonth()+1);if($('#headerAction35'))$('#headerAction35').innerHTML=PG===1?journalStarToggle35():'';};
var flowRenderBar=renderBar;
renderBar=function(){flowRenderBar();var checkin=$('#m3Action .ckb');if(checkin)checkin.toggleAttribute('data-flow-type',innerWidth<768);var b=$('#abar');if(!b)return;b.querySelectorAll('[data-act=page]').forEach(function(el,i){var symbol=el.querySelector('.material-symbols-rounded');if(symbol)symbol.textContent=['home','calendar_month','forest'][i];});};
renderPage=function(){renderHead();document.body.classList.toggle('pg0',PG===0);document.body.classList.remove('cards-view34');var pv=$('#pv');if(!pv)return;pv.innerHTML='<div class="m3-page m3-page-'+['today','week','journey'][PG]+'">'+(PG===0?vToday():PG===1?flowWeek():treePanel())+'</div>';};
toPage=function(i){if(i<0||i>2)return;if(i===2&&i!==PG)TREE_REPLAY34=true;PG=i;renderBar();renderPage();window.scrollTo(0,0);m3Enter($('#pv'));$('#pageTitle35').focus({preventScroll:true});};
go=function(t){if(t==='nb'){openNb();return;}toPage(t==='prog'?2:t==='week'?1:0);};
openJourney31=function(tab){closeOv();TREE_REPLAY34=true;PG=tab==='week'?1:2;JOURNEY_TAB31=tab||'tree';render();window.scrollTo(0,0);};
journalOpen31=function(d){closeOv();PG=1;DW=Math.max(0,Math.floor(diffD(wkStart(d),wkStart(dk()))/7));FLOW_DAY=d;FLOW_HABIT=null;JOURNAL_MODE31='day';render();window.scrollTo(0,0);};

vToday=function(){
  var d=dk(),all=handList(),pending=all.filter(function(id){return !flowComplete(d,id);}),done=all.length-pending.length,yes=all.filter(function(id){return mark(d,id)==='y';}).length;
  var h='<div class="flow-today-toolbar" data-flow-type><span>'+done+'/'+all.length+' đã ghi nhận</span><button class="flow-link" data-act="collection">'+mi('menu_book')+'Thư viện</button></div>';
  if(!all.length)h+='<section class="flow-empty" data-flow-type>'+shin('hi')+'<h2>Một thẻ là đủ để bắt đầu</h2></section>';
  else if(!pending.length)h+='<section class="flow-empty" data-flow-type>'+shin('proud')+'<h2>Bạn đã thực hiện '+yes+'/'+all.length+' thói quen hôm nay</h2><p>'+(yes===all.length?'Bạn đã giữ nhịp hôm nay. Shin cùng bạn tiếp tục nhé.':'Mỗi lần nhìn lại là một bước hiểu mình hơn. Mai mình tiếp tục nhé.')+'</p><button class="flow-link" data-act="flowTodayReview">Xem lại hôm nay '+mi('arrow_forward')+'</button></section>';
  else h+='<section class="flow-today-list" aria-label="Thói quen còn cần ghi nhận" data-flow-type>'+pending.map(function(id){var status=flowPendingText(d,id),u=H(id);return '<article class="flow-today-row'+flowGroup(id)+(status?' is-pending':'')+'" data-flow-swipe="'+id+'"><button class="flow-card-entry" data-act="flowFront" data-v="'+id+'" aria-label="Xem mặt trước thẻ '+esc(flowTodayName(id))+'"><span class="flow-emblem">'+flowIcon(id)+'</span><small>Thẻ</small></button><button class="flow-row-main" data-act="note" data-v="'+id+'|'+d+'"><b>'+esc(flowTodayName(id))+'</b><small>'+(status?esc(status):'Khi '+esc(u.anchor||'đến lúc đã chọn'))+'</small></button><button class="flow-row-plus" data-act="note" data-v="'+id+'|'+d+'" aria-label="Ghi nhận '+esc(flowTodayName(id))+'">'+mi('add')+'</button></article>';}).join('')+'</section>';
  if(all.length<5)h+='<button class="flow-link flow-add" data-act="pick" data-flow-type>'+mi('add')+'Thêm thói quen</button>';
  return h;
};

function flowDayEntry(id,d){
  var m=mark(d,id),note=(S.notes[d]||{})[id]||'',draft=flowDraft(d,id),editable=H(id)&&(d===dk()||canBf(d,id)),reason=REASONS.find(function(r){return r[0]===((S.why[d]||{})[id]);});
  return '<section class="flow-day-entry" aria-label="Ghi nhận '+esc(sname(id))+' ngày '+treeDate30(d)+'"><div class="flow-entry-meta"><time datetime="'+d+'">'+treeDate30(d)+'</time><span class="m3-status '+(m||'empty')+'">'+esc(m?RECORD_LABEL[m]:draft?flowPendingText(d,id):'Chưa ghi')+'</span>'+journalStarButton31(d,id,!!m||!!note)+'</div><p>'+esc(note||(draft&&draft.text)||(reason&&reason[1])||(draft?'Chưa viết memo.':'Chưa có ghi nhận cho ngày này.'))+'</p>'+(editable?'<button class="flow-link" data-act="note" data-v="'+id+'|'+d+'">'+(m?'Chỉnh ghi nhận':'Ghi nhận ngày này')+'</button>':'')+'</section>';
}
function flowWeek(){
  if(JOURNAL_MODE31==='saved'){JOURNAL_HABIT31='all';return '<div class="flow-saved"><h2>Điều mình muốn giữ</h2>'+journalTimeline31()+'</div>';}
  var t=dk(),ws=addD(wkStart(t),-7*DW),we=addD(ws,6),list=weekIds31(ws),win=(S.week[ws]||{}).win||'',selected=FLOW_DAY&&FLOW_DAY>=ws&&FLOW_DAY<=we?FLOW_DAY:null;
  var h='<section class="flow-week-surface">'+m3WeekNav('flowWeekNav',1,-1,ws,we,DW===0,ws<=wkStart(S.created),DW===0)+'<div class="flow-week-list">';
  h+=list.map(function(id){var u=H(id);return '<article class="flow-week-row'+flowGroup(id)+'"><button class="flow-week-title" data-act="flowJournal" data-v="'+id+'" data-flow-type><span class="flow-emblem">'+flowIcon(id)+'</span><span><b>'+esc(sname(id))+'</b><small>'+esc(weekDescription31(id,ws))+'</small></span>'+mi('chevron_right')+'</button><div class="flow-week-dots" data-flow-type>'+WDS.map(function(w,i){var d=addD(ws,i),m=mark(d,id),disabled=d>t||d<S.created||(u&&d<u.since),on=selected===d&&FLOW_HABIT===id;return '<button class="flow-week-day '+(disabled?'future':m||'empty')+'" data-act="flowDay" data-v="'+id+'|'+d+'" aria-pressed="'+on+'" aria-label="'+w+', '+treeDate30(d)+': '+esc(RECORD_LABEL[m]||'Chưa ghi')+'"'+(disabled?' disabled':'')+'><small>'+w+'</small><i>'+(m==='y'?mi('check'):m==='p'?'−':m==='n'?'×':m==='x'?'·':'')+'</i></button>';}).join('')+'</div>'+(selected&&FLOW_HABIT===id?flowDayEntry(id,selected):'')+'</article>';}).join('');
  if(!list.length)h+='<p class="journey-empty31">Tuần này chưa có thói quen được rèn.</p>';
  h+='</div>';
  if(selected){h+='<section class="flow-day-journal"><h2>Nhật ký · '+dm(selected)+'</h2>';if(!FLOW_HABIT)h+=journalDay31(selected);else h+=journalMemo31(selected);if(S.mood[selected])h+='<p class="flow-day-mood">'+esc((MOODS.find(function(m){return m[0]===S.mood[selected];})||[])[1]||'')+'</p>';if(FLOW_HABIT&&(selected===t||canBf(selected,list[0])))h+='<button class="flow-link" data-act="ci" data-v="'+selected+'">'+mi('nightlight')+'Check-in ngày này</button>';h+='</section>';}
  h+='<div class="m3-week-reflect"><label for="journeyWin31">Điều bạn muốn nhớ tuần này</label><textarea class="inp" id="journeyWin31" data-in="journeyWin31" data-week="'+ws+'" rows="2" placeholder="Một điều bạn muốn ghi nhớ…">'+esc(win)+'</textarea></div><button class="week-link flow-week-link" data-act="week" data-v="'+ws+'">Xem thẻ tuần</button><details class="m3-week-legend"><summary>Cách đọc các chấm tuần</summary><p>✓ Đã làm · − Một phần · × Chưa làm<br>Chấm xám: không gặp dịp. Chấm rỗng: chưa ghi. Chấm nhạt: chưa tới ngày.</p><p>Thói quen khi gặp dịp chỉ tính những dịp đã ghi nhận.</p></details></section>';
  return h;
}

/* A compact card owns its own typography, independent of the app's approved type scale. */
function flowHowButton(id){return !HMAP[id].custom?'<button class="flow-card-how" data-act="flowHow" data-v="'+id+'">'+mi('menu_book')+'Cách làm</button>':'';}
function flowCardTop(id){var u=H(id);return '<div class="flow-paper-top"><span class="flow-card-level">'+(u?'CẤP '+u.lv+' · '+esc(LV_NAME[u.lv]):'KAIZEN · '+cardNo(id))+'</span>'+flowHowButton(id)+'</div>';}
function flowFront(id){
  var x=HMAP[id],u=H(id),n=u?daysAt(id):0,need=u?needOf(id):0;
  return '<article class="flow-paper flow-front'+flowGroup(id)+'">'+flowCardTop(id)+'<div class="flow-card-heading"><span class="flow-emblem">'+flowIcon(id)+'</span>'+(u?'<button class="flow-card-edit" data-act="edit" data-v="'+id+'" aria-label="Sửa công thức">'+mi('edit')+'</button>':'')+'</div><h2>'+esc(hname(id))+'</h2><div class="flow-formula"><small>KHI</small><p>'+esc(u?u.anchor:(x.anchors||[])[0]||'đến lúc mình đã chọn')+'</p><small>MÌNH SẼ</small><p class="flow-action">'+esc(u?u.act:x.act||x.tiers[0])+'</p>'+(u&&u.who?'<p class="flow-who">Trở thành '+esc(u.who)+'</p>':'')+'</div>'+(u?'<div class="flow-card-days">'+f2Days(id)+'</div><div class="flow-card-owner"><span><b>'+esc(S.name)+'</b><small>Rèn từ '+dm(u.since)+'</small></span><span>'+Math.min(n,need)+' / '+need+' '+unitOf(id)+'</span></div><div class="m3-progress-track"><i style="width:'+Math.round(lvPct(id)*100)+'%"></i></div>':'')+'</article>';
}
function flowBack(id){
  var x=HMAP[id],pv=x.prov||x.jp,v=spOf(id);
  return '<article class="flow-paper flow-back'+flowGroup(id)+'">'+flowCardTop(id)+'<small class="flow-back-label">'+(x.custom?'VÌ SAO MÌNH CHỌN':'Ý NGHĨA · 意味')+'</small>'+(x.custom?'<blockquote><p>'+esc(x.myWhy||'')+'</p></blockquote>':'<div class="flow-japanese"><p lang="ja">'+esc(pv.j)+'</p><small>'+esc(pv.r)+'</small><p class="flow-translation">'+esc(pv.v)+'</p><button class="flow-card-speak" data-act="speak" data-v="'+esc(pv.j)+'" aria-label="Nghe đọc">'+mi('volume_up')+'</button></div><p class="flow-benefit">'+esc(BEN[id]||(x.why?x.why.now:'Để trở thành '+x.who[0]+'.'))+'</p>'+((x.corner||x.kase)?'<button class="flow-senpai" data-act="senpai" data-v="'+id+'"><span>'+senpai('smile',v)+'</span><span><small>SENPAI KỂ</small><b>'+esc(x.kase?x.kase.t:teaser(x.corner))+'</b></span>'+mi('chevron_right')+'</button>':''))+'</article>';
}
drawCard=function(){
  if(!CARD||!HMAP[CARD.id])return;var id=CARD.id,tab=CARD.tab==='journal'?'journal':'card';CARD.tab=tab;
  var h=habitHeader33(id,tab)+'<div class="f2-body" id="habit-body33" role="tabpanel" aria-labelledby="habit-tab-'+tab+'">'+(tab==='journal'?habitJournal33(id):'<div class="flow-card-stage" data-flow-type>'+shinCardFaces(id,CARD.back)+'</div>')+'</div>';
  if(tab==='card')h+='<footer class="sbar f2-footer f2-detail-footer flow-card-footer" data-flow-type><button class="flow-flip" data-act="flowFlip" aria-pressed="'+!!CARD.back+'">'+mi('swap_horiz')+(CARD.back?'Mặt trước':'Mặt sau')+'</button>'+f2DetailAction(id)+'</footer>';
  f2Mount('detail',h);$('.sheet',OV).classList.toggle('flow-card-mode',tab==='card');if(FLOW_CARD_OBSERVER)FLOW_CARD_OBSERVER.disconnect();var stage=$('.flow-card-stage',OV);if(stage&&window.ResizeObserver){FLOW_CARD_OBSERVER=new ResizeObserver(flowFitCard);FLOW_CARD_OBSERVER.observe(stage);}requestAnimationFrame(flowFitCard);
};
function flowFitCard(){var stage=$('.flow-card-stage'),paper=stage&&$('.flow-paper',stage);if(!paper)return;stage.style.setProperty('--card-scale','1');for(var n=0;n<7;n++){var ps=getComputedStyle(paper),available=stage.clientHeight,used=parseFloat(ps.paddingTop)+parseFloat(ps.paddingBottom);Array.from(paper.children).forEach(function(el){var cs=getComputedStyle(el),autoTop=el.matches('.flow-senpai,.flow-card-days');used+=el.getBoundingClientRect().height+(autoTop?0:parseFloat(cs.marginTop)||0)+(parseFloat(cs.marginBottom)||0);});if(!available||used<=available-2)break;var scale=parseFloat(stage.style.getPropertyValue('--card-scale'))||1,next=Math.max(.82,scale*(available-6)/used);if(next>=scale-.001)break;stage.style.setProperty('--card-scale',next.toFixed(3));}}
function flowOpenJournal(id){if(!HMAP[id])return;closeOv(true);CARD={id:id,back:false,tab:'journal',timelineLimit:6};openOv('');drawCard();}

/* Small event adapter keeps the existing event dispatcher and teaching flows intact. */
document.addEventListener('click',function(e){
  if(Date.now()<FLOW_SWIPE_UNTIL){e.preventDefault();e.stopImmediatePropagation();return;}
  var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,v=b.getAttribute('data-v');
  if(a==='note')FLOW_NOTE_RETURN=null;
  if(a==='close'&&OV&&$('.f2-how',OV))FLOW_HOW_RETURN=null;
  if(['recordAnswer','ntChip'].includes(a)){setTimeout(function(){if(NT&&OV&&$('.f2-record',OV))flowStashNote();},0);return;}
  if(a==='close'&&FLOW_NOTE_RETURN){e.preventDefault();e.stopImmediatePropagation();var note=FLOW_NOTE_RETURN;FLOW_NOTE_RETURN=null;closeOv(true);NT=note;openOv('');drawNote29();return;}
  var acts=['flowFront','flowJournal','flowDay','flowWeekNav','flowTodayReview','flowMemoLater','flowRemoveDraft','flowFlip','flowHow','flowHowBack','flowNoteCard','flowWhoNone'];if(acts.indexOf(a)<0)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(a==='flowWhoNone'&&ST){ST.who='';ST.custom.w=false;stNext();}
  if(a==='flowFront'){FLOW_NOTE_RETURN=null;closeOv(true);openCard(v,false);}
  if(a==='flowJournal')flowOpenJournal(v);
  if(a==='flowDay'){var parts=v.split('|');if(FLOW_HABIT===parts[0]&&FLOW_DAY===parts[1]){FLOW_DAY=null;FLOW_HABIT=null;}else{FLOW_HABIT=parts[0];FLOW_DAY=parts[1];}var scroll=window.scrollY;renderPage();window.scrollTo(0,scroll);}
  if(a==='flowWeekNav'){DW=Math.max(0,Math.min(Math.floor(diffD(wkStart(S.created),wkStart(dk()))/7),DW+(+v)));FLOW_DAY=null;FLOW_HABIT=null;renderPage();window.scrollTo(0,0);}
  if(a==='flowTodayReview'){PG=1;DW=0;FLOW_DAY=dk();FLOW_HABIT=null;JOURNAL_MODE31='day';render();window.scrollTo(0,0);}
  if(a==='flowMemoLater'&&NT){flowStashNote();var id=NT.id;NT=null;HABIT_RETURN33=null;closeOv(true);render();toast('Đã giữ '+esc(sname(id))+' · chờ '+((flowDraft(dk(),id)||{}).ans==='n'?'lý do':'memo')+'.');}
  if(a==='flowRemoveDraft'&&NT){var id=NT.id,d=NT.day,has=!!mark(d,id);flowClearDraft(d,id);if(has)writeRecord(id,d,'',undefined,undefined);NT=null;closeOv(true);save(true);if(has)recordFeedback(id,d,true);else{render();toast('Đã bỏ ghi nhận đang viết.');}}
  if(a==='flowFlip'&&CARD)touchFlipCard(true);
  if(a==='flowHow'&&CARD){FLOW_HOW_RETURN={card:JSON.parse(JSON.stringify(CARD))};openHow(v);}
  if(a==='flowHowBack'&&FLOW_HOW_RETURN){var card=FLOW_HOW_RETURN.card;FLOW_HOW_RETURN=null;HW=null;closeOv(true);CARD=card;openOv('');drawCard();}
  if(a==='flowNoteCard'&&NT){flowStashNote();FLOW_NOTE_RETURN=JSON.parse(JSON.stringify(NT));NT=null;openCard(v,false);}
},true);
document.addEventListener('input',function(e){if(e.target.matches('#ntIn')&&NT){NT.text=e.target.value;flowStashNote();}},true);
var flowDrawHow=drawHow;
drawHow=function(){flowDrawHow();if(!FLOW_HOW_RETURN||!OV)return;var back=$('.f2-how .f2-head [data-act=card]',OV),done=$('.f2-how .f2-footer [data-act=card]',OV);[back,done].forEach(function(b){if(b)b.dataset.act='flowHowBack';});};

/* A deliberate horizontal swipe; vertical scrolling and icon buttons remain independent. */
var FLOW_SWIPE_UNTIL=0;
window.addEventListener('resize',function(){requestAnimationFrame(flowFitCard);});
if(document.fonts)document.fonts.ready.then(flowFitCard);

/* Portrait preference is also declared in the manifest. No fake CSS screen rotation. */
function flowPortrait(){if((window.matchMedia('(pointer:coarse)').matches||Math.min(screen.width,screen.height)<=767)&&screen.orientation&&screen.orientation.lock&&(isStandalone()||isFS())){try{screen.orientation.lock('portrait-primary').catch(function(){});}catch(e){}}}
document.addEventListener('fullscreenchange',flowPortrait);window.addEventListener('pageshow',flowPortrait);

;
/* ===== SECTION: routine-growth.js ===== */
/* M3.3.1 · goals, evidence-based diary and optional real-world practice. */
function growthState(){if(!S.growth)S.growth={goals:{},challenges:{},tips:0,enabled:true};return S.growth;}
var growthMigrate=migrate;
migrate=function(st){st=growthMigrate(st);if(!st.growth)st.growth={goals:{},challenges:{},tips:0,enabled:true};return st;};
var growthValidate=validateState32;
validateState32=function(d){growthValidate(d);var g=d.growth;if(g===undefined)return d;function bad(){throw Error('Mục tiêu hoặc thử thách trong bản sao không hợp lệ.');}if(!stateObject32(g)||!stateObject32(g.goals)||!stateObject32(g.challenges)||typeof g.enabled!=='boolean'||!Number.isInteger(g.tips)||g.tips<0)bad();Object.keys(g.goals).forEach(function(id){if(!d.habits[id]||!Array.isArray(g.goals[id]))bad();var prev='';g.goals[id].forEach(function(a){if(!stateObject32(a)||!validDate32(a.from)||a.from<=prev||!Number.isInteger(a.n)||a.n<1||a.n>7)bad();prev=a.from;});});Object.keys(g.challenges).forEach(function(key){var a=g.challenges[key];if(!/^\d{4}-\d{2}-\d{2}_[01]$/.test(key)||!validDate32(key.slice(0,10))||!stateObject32(a)||['accepted','later','skipped','done'].indexOf(a.status)<0||!Number.isInteger(a.template)||a.template<0||a.template>=GROWTH_CHALLENGES.length||typeof a.note!=='string'||typeof a.credited!=='boolean')bad();if(a.status==='done'&&(!validDate32(a.date)||!a.note.trim()))bad();if(a.date!==undefined&&!validDate32(a.date))bad();});Object.keys(d.ci||{}).forEach(function(day){if(d.ci[day].question!==undefined&&typeof d.ci[day].question!=='string')bad();});return d;};
function growthGoal(id,week){var list=growthState().goals[id]||[],n=7;list.forEach(function(a){if(a.from<=(week||wkStart(dk())))n=a.n;});return n;}
function growthSetGoal(id,n){if(!H(id)||!Number.isInteger(n)||n<1||n>7)return false;var g=growthState(),w=wkStart(dk()),list=g.goals[id]||[];list=list.filter(function(a){return a.from!==w;});list.push({from:w,n:n});list.sort(function(a,b){return a.from.localeCompare(b.from);});g.goals[id]=list;return true;}
function growthWeekCount(id,w){var n=0;for(var i=0;i<7;i++){var d=addD(w,i);if(d<=dk()&&mark(d,id)==='y')n++;}return n;}
function growthDates(id,memo){return Object.keys(memo?S.notes:S.log).filter(function(d){return validDate32(d)&&d<=dk()&&(!H(id)||d>=H(id).since)&&(memo?!!String((S.notes[d]||{})[id]||'').trim():mark(d,id)==='y');}).sort();}
function growthRuns(dates){var runs=[],run=null;dates.forEach(function(d){if(!run||addD(run.end,1)!==d){run={start:d,end:d,n:1};runs.push(run);}else{run.end=d;run.n++;}});return runs;}
function growthStreak(id,memo){var runs=growthRuns(growthDates(id,memo)),best={n:0,start:'',end:''},last=runs[runs.length-1];runs.forEach(function(r){if(r.n>best.n)best=r;});return {best:best,current:last&&(last.end===dk()||last.end===addD(dk(),-1))?last.n:0};}
function growthExperiences(id,d){return Object.keys(growthState().challenges).map(function(key){var a=growthState().challenges[key],t=GROWTH_CHALLENGES[a.template];return Object.assign({key:key,id:t.id,title:t.title},a);}).filter(function(a){return a.status==='done'&&a.id===id&&(!d||a.date===d);});}
function growthMonthCells(month){var first=month+'-01',next=addD(first,32).slice(0,7)+'-01',days=diffD(first,next),offset=(new Date(first+'T12:00:00').getDay()+6)%7;return {first:first,days:days,offset:offset};}
var growthMilestones=milestoneItems31;
milestoneItems31=function(){var items=growthMilestones();(S.order||[]).forEach(function(id){if(!H(id)||!HMAP[id])return;[false,true].forEach(function(memo){var runs=growthRuns(growthDates(id,memo));[3,5,7,14,30,60,100].forEach(function(n){var run=runs.find(function(r){return r.n>=n;});if(run)items.push({id:id,type:(memo?'memo':'streak')+n,date:addD(run.start,n-1),title:sname(id),body:(memo?'Viết memo':'Đã làm')+' '+n+' ngày liên tiếp'});});});var weeks={};growthDates(id,false).forEach(function(d){var w=wkStart(d);weeks[w]=(weeks[w]||0)+1;if(weeks[w]===growthGoal(id,w)+1&&!Object.keys(weeks).some(function(p){return p<w&&weeks[p]>growthGoal(id,p);}))items.push({id:id,type:'goal-first',date:d,title:sname(id),body:'Lần đầu vượt mục tiêu tuần · '+weeks[w]+'/'+growthGoal(id,w)+' ngày'});});});return items.sort(function(a,b){return b.date.localeCompare(a.date)||a.type.localeCompare(b.type);});};
var growthHead=renderHead;
renderHead=function(){growthHead();if(PG===0&&$('#pageTitle35'))$('#pageTitle35').textContent='Chào '+(S.name||'bạn');};
var growthToPage=toPage;
toPage=function(i){document.body.classList.remove('growth-nav-away');growthToPage(i);};
function growthGoalPicker(n){return '<div class="growth-goal" data-flow-type><label for="growthGoal">Mục tiêu mỗi tuần</label><select class="inp" id="growthGoal">'+[1,2,3,4,5,6,7].map(function(i){return '<option value="'+i+'"'+(i===n?' selected':'')+'>'+i+' ngày / tuần</option>';}).join('')+'</select><small>Một ngày đã làm tính một lần. Có thể rèn thêm nếu muốn.</small></div>';}
/* Four practical tips per existing lesson; no rotating text while typing. */
var GROWTH_TIPS=[
 ['b1','Ngày bận, hãy chọn việc nhỏ đến mức bạn vẫn làm được.'],['b1','Làm đều trước, làm nhiều sau; một phút cũng là một khởi đầu.'],['b1','Nếu công thức dễ bị bỏ, thử giảm hành động xuống một nửa.'],['b1','Chọn phiên bản cho ngày mệt nhất, rồi làm thêm khi có sức.'],
 ['b2','Gắn việc mới sau một việc quen có sẵn trong ngày.'],['b2','“Khi ngồi vào bàn học” dễ nhớ hơn “khi nào rảnh”.'],['b2','Chọn tín hiệu cụ thể: một việc, một nơi bạn nhận ra ngay.'],['b2','Thử đọc liền câu “Khi… mình sẽ…” để hình dung lúc bắt đầu.'],
 ['b3','Để đồ dùng cần cho việc tốt ở gần và dễ nhìn thấy.'],['b3','Thử đặt sổ và bút ngay nơi bạn hay cần ghi nhớ.'],['b3','Để điện thoại xa tay khi học giúp bớt phải tự nhắc mình.'],['b3','Chọn một người bạn chăm chỉ để cùng giữ nhịp.'],
 ['b4','Lỡ hôm qua, hôm nay chỉ cần làm phiên bản nhỏ nhất.'],['b4','Không cần làm gấp đôi để bù cho một ngày đã lỡ.'],['b4','Hãy nhìn một việc có thể làm ngay hôm nay để nối lại nhịp.'],['b4','Với việc khi gặp dịp, chưa gặp dịp không có nghĩa là thất bại.'],
 ['b5','Mỗi lần làm là một lá phiếu cho con người bạn muốn trở thành.'],['b5','Chọn phẩm chất gần gũi với bạn, không cần một lời hứa thật lớn.'],['b5','Một hành động cụ thể giúp bạn nhìn thấy mình đang thay đổi.'],['b5','Nếu chưa chọn được “trở thành ai”, cứ bắt đầu bằng việc nhỏ.']];
function growthTip(step){var group=step==='k'?1:step==='w'?4:step==='a'?0:null,g=growthState(),pool=GROWTH_TIPS.filter(function(t,i){return step==='a'?[0,2,3].indexOf(Math.floor(i/4))>=0:group===null||Math.floor(i/4)===group;}),tip=pool[g.tips%pool.length];return '<aside class="growth-shin-tip" data-flow-type>'+shin('think')+'<p><b>Shin nhắn '+esc(S.name||'bạn')+'</b>'+esc(tip[1])+'<small>Từ bài '+esc(LMAP[tip[0]].t)+'</small></p></aside>';}
var growthOpenStart=openStart;
openStart=function(id,edit){growthState().tips++;save();growthOpenStart(id,edit);};
var growthOpenCustom=openCustom;
openCustom=function(id){growthState().tips++;save();growthOpenCustom(id);};
var growthDrawStart=drawStart;
drawStart=function(){growthDrawStart();if(!ST)return;var body=$('.sheet .lc');if(!body)return;var k=ST.steps[ST.i];body.insertAdjacentHTML('beforeend',growthTip(k)+'');};
document.addEventListener('change',function(e){if(e.target.id==='growthGoal'&&ST)ST.weekGoal=+e.target.value;});
var growthStNext=stNext;
stNext=function(){var st=ST,last=st&&st.i===st.steps.length-1,n=st&&(st.weekGoal||growthGoal(st.id)),id=st&&st.id,cust=st&&st.cust;growthStNext();if(last&&!cust&&H(id)){growthSetGoal(id,n);save(true);render();}};
var growthCommitCustom=commitCustom;
commitCustom=function(){var st=ST,n=st&&(st.weekGoal||growthGoal(st.id)),before=S.cseq,id=st&&st.id;growthCommitCustom();if(S.cseq>before)id='u'+S.cseq;if(id&&H(id)){growthSetGoal(id,n);save(true);render();}};
var growthFirstForm=openFirstForm32;
openFirstForm32=function(id){growthState().tips++;growthFirstForm(id);var body=$('.first-form32');if(body)body.insertAdjacentHTML('beforeend',growthGoalPicker(7)+growthTip('a'));};
var growthFirstStart=firstStart32;
firstStart32=function(){var id=FIRST_HABIT32,select=$('#growthGoal'),n=select?+select.value:7;growthFirstStart();if(H(id)){growthSetGoal(id,n);save(true);render();}};
var growthGroup=flowGroup;
flowGroup=function(id){var x=HMAP[id];return growthGroup(id)+(x&&x.custom?' flow-custom-'+x.g:'');};
var growthFront=flowFront,growthBack=flowBack;
flowFront=function(id){var h=growthFront(id),x=HMAP[id];if(x.custom)h=h.replace('<h2>','<small class="growth-personal">'+mi('edit')+'Thẻ của '+esc(S.name||'bạn')+'</small><h2>');return h;};
flowBack=function(id){var h=growthBack(id),x=HMAP[id];if(x.custom)h=h.replace('<small class="flow-back-label">','<small class="growth-personal">'+mi('edit')+'Thẻ của '+esc(S.name||'bạn')+'</small><small class="flow-back-label">');return h;};
function growthQuestion(d){var ids=handList(),u=ids.map(H).find(function(u){return u&&u.who&&u.who.trim();}),name=S.name||'bạn',n=+d.replace(/-/g,'')%3;if(u&&n===0)return name+' có thấy mình đang tiến gần hơn với mục tiêu trở thành '+u.who+' không? Điều gì cho bạn thấy điều đó?';var done=ids.find(function(id){return mark(d,id)==='y';});if(done&&n===1)return 'Điều gì đã giúp '+name+' thực hiện “'+sname(done)+'” hôm nay?';var pending=ids.find(function(id){return mark(d,id)==='n';});return pending?'Ngày mai, '+name+' có thể làm nhỏ “'+sname(pending)+'” như thế nào?':'Một việc nhỏ nào hôm nay khiến '+name+' muốn tiếp tục vào ngày mai?';}
var growthDrawCI=drawCI;
drawCI=function(){growthDrawCI();if(!CI||CI.done)return;CI.growthQuestion=CI.growthQuestion||(S.ci[CI.date]||{}).question||((S.ciDrafts[CI.date]||{}).question)||growthQuestion(CI.date);var label=$('label[for=ciMemo29]'),input=$('#ciMemo29');if(label)label.textContent=CI.growthQuestion;if(input)input.placeholder='Một điều cụ thể bạn muốn giữ lại…';};
var growthStashCI=stashCI29;
stashCI29=function(){growthStashCI();if(CI&&!CI.done&&S.ciDrafts[CI.date]){S.ciDrafts[CI.date].question=CI.growthQuestion||growthQuestion(CI.date);save();}};
var growthFinishCI=ciFinish;
ciFinish=function(){var ci=CI,q=ci&&(ci.growthQuestion||growthQuestion(ci.date));growthFinishCI();if(ci&&ci.done&&S.ci[ci.date]){S.ci[ci.date].question=q;save(true);}};

/* Only committed evidence is included in totals and consecutive-day runs. */
habitJournal33=function(id){
  var month=CARD.growthMonth||dk().slice(0,7),all=CARD.growthRange==='all',cells=growthMonthCells(month),ex=growthExperiences(id),dates=Object.keys(S.log).concat(Object.keys(S.notes)).filter(function(d){return (S.log[d]||{})[id]||(S.notes[d]||{})[id];}).concat(ex.map(function(a){return a.date;}));dates=Array.from(new Set(dates)).filter(function(d){return d<=dk()&&(all||d.slice(0,7)===month);}).sort().reverse();
  var counts={y:0,p:0,n:0,x:0};dates.forEach(function(d){var m=mark(d,id);if(m)counts[m]++;});var streak=growthStreak(id,false),memo=growthStreak(id,true),best=streak.best,w=wkStart(dk()),target=growthGoal(id,w),actual=growthWeekCount(id,w);
  var h='<div class="growth-diary" data-flow-type><section class="growth-dashboard"><div class="growth-range"><button data-act="growthRange" data-v="month" aria-pressed="'+!all+'">Theo tháng</button><button data-act="growthRange" data-v="all" aria-pressed="'+all+'">Từ khi bắt đầu</button></div><div class="growth-month-head"><button data-act="growthMonth" data-v="-1" aria-label="Tháng trước">'+mi('chevron_left')+'</button><b>Tháng '+(+month.slice(5))+' / '+month.slice(0,4)+'</b><button data-act="growthMonth" data-v="1" aria-label="Tháng sau"'+(month>=dk().slice(0,7)?' disabled':'')+'>'+mi('chevron_right')+'</button></div><div class="growth-calendar">'+WDS.map(function(a){return '<small>'+a+'</small>';}).join('')+'<span style="grid-column:span '+cells.offset+'"'+(!cells.offset?' hidden':'')+'></span>';
  for(var i=1;i<=cells.days;i++){var d=month+'-'+pad(i),m=mark(d,id),future=d>dk(),before=H(id)&&d<H(id).since;h+='<button class="growth-cell '+(m||'empty')+(future||before?' future':'')+'" data-act="growthDiaryDay" data-v="'+d+'"'+(future||before?' disabled':'')+' aria-label="'+treeDate30(d)+': '+(RECORD_LABEL[m]||'Chưa ghi')+'" aria-pressed="'+(CARD.growthDay===d)+'">'+i+(growthExperiences(id,d).length?'<i></i>':'')+'</button>';}
  h+='</div><p class="growth-key"><span class="y">● Đã làm</span><span class="p">● Một phần</span><span class="n">● Chưa làm</span><span class="x">● Không gặp dịp</span><span>○ Chưa ghi</span></p><div class="growth-totals"><span><b>'+counts.y+'</b>Đã làm</span><span><b>'+counts.p+'</b>Một phần</span><span><b>'+counts.n+'</b>Chưa làm</span></div><p class="growth-week-goal">Tuần này: <b>'+actual+'/'+target+' ngày</b>'+(actual>target?' · Vượt mục tiêu!':actual===target?' · Đã đạt mục tiêu':'')+'</p></section>';
  h+='<aside class="growth-shin-tip">'+shin(best.n?'proud':'hi')+'<p><b>Shin nhắn '+esc(S.name||'bạn')+'</b>'+(best.n?'Chuỗi dài nhất của bạn là '+best.n+' ngày liên tiếp, từ '+dm(best.start)+' đến '+dm(best.end)+'. Mình tiếp tục từng việc nhỏ nhé.':'Một lần thực hiện hôm nay sẽ mở đầu chuỗi của bạn.')+'<small>Hiện tại: '+streak.current+' ngày · Memo liên tiếp dài nhất: '+memo.best.n+' ngày</small></p></aside>';
  if(CARD.growthDay)h+='<section class="growth-selected">'+growthDiaryEntry(id,CARD.growthDay)+'</section>';
  var weeks={};dates.forEach(function(d){var w=wkStart(d);(weeks[w]||(weeks[w]=[])).push(d);});var keys=Object.keys(weeks).sort().reverse(),limit=CARD.timelineLimit||6;
  h+='<div class="growth-timeline">'+keys.slice(0,limit).map(function(w,i){return '<details class="growth-week" data-week="'+w+'"'+(((CARD.timelineOpen||{})[w]===undefined?i===0:(CARD.timelineOpen||{})[w])?' open':'')+'><summary>'+(w===wkStart(dk())?'Tuần này':dm(w)+' – '+dm(addD(w,6)))+'<small>'+weeks[w].length+' ngày có ghi nhận</small></summary><ol>'+weeks[w].map(function(d){return '<li class="state-'+(mark(d,id)||'empty')+'">'+growthDiaryEntry(id,d)+'</li>';}).join('')+'</ol></details>';}).join('')+'</div>';
  if(!dates.length)h+='<p class="growth-muted">Chưa có ghi nhận trong khoảng này.</p>';if(keys.length>limit)h+='<button class="flow-link" data-act="habitMore33">Xem thêm</button>';return h+'</div>';
};
function growthDiaryEntry(id,d){var m=mark(d,id),note=(S.notes[d]||{})[id]||'',ex=growthExperiences(id,d),editable=H(id)&&(d===dk()||canBf(d,id));return '<article class="growth-entry"><header><time datetime="'+d+'">'+treeDate30(d)+'</time>'+journalStarButton31(d,id,!!m||!!note)+'</header><b class="growth-status '+(m||'empty')+'">'+(RECORD_LABEL[m]||'Chưa ghi nhận')+'</b>'+((S.bf[d]||{})[id]?'<small class="growth-muted"> · Ghi bù</small>':'')+(note?'<p>'+esc(note)+'</p>':'')+ex.map(function(a){return '<div class="growth-experience"><small>THỬ THÁCH · '+esc(a.title)+'</small><p>'+esc(a.note)+'</p><small>'+(a.credited?'Đã ghi nhận theo công thức':'Trải nghiệm liên quan · Không cộng ngày thực hiện')+'</small></div>';}).join('')+(editable?'<button class="flow-link" data-act="note" data-v="'+id+'|'+d+'">'+(m?'Chỉnh ghi nhận':'Ghi nhận ngày này')+'</button>':'')+'</article>';}
var growthDayEntry=flowDayEntry;
flowDayEntry=function(id,d){return growthDayEntry(id,d)+growthExperiences(id,d).map(function(a){return '<div class="growth-experience" data-flow-type><small>THỬ THÁCH · '+esc(a.title)+'</small><p>'+esc(a.note)+'</p></div>';}).join('');};
var growthWeekIds=weekIds31;
weekIds31=function(w){var ids=growthWeekIds(w);Object.keys(growthState().challenges).forEach(function(key){var a=growthState().challenges[key],id=GROWTH_CHALLENGES[a.template].id;if(a.status==='done'&&a.date>=w&&a.date<=addD(w,6)&&ids.indexOf(id)<0)ids.push(id);});return ids;};
var growthWeekDescription=weekDescription31;
weekDescription31=function(id,w){var p=0;for(var i=0;i<7;i++){if(mark(addD(w,i),id)==='p')p++;}return growthWeekCount(id,w)+'/'+growthGoal(id,w)+' ngày đã làm'+(p?' · '+p+' một phần':'');};

/* Two optional offers per week. Saving an experience alone never awards habit credit. */
var GROWTH_CHALLENGES=[
 {id:'chao',title:'Hỏi thăm một người bạn',text:'Nhắn một lời hỏi thăm cho người bạn lâu ngày chưa nói chuyện.'},
 {id:'camon',title:'Nói lời cảm ơn cụ thể',text:'Cảm ơn một người đã giúp bạn, nói rõ điều bạn biết ơn.'},
 {id:'5s',title:'Gọn một góc nhỏ',text:'Dành một phút xếp lại góc bàn hoặc đôi giày của bạn.'},
 {id:'giup',title:'Giúp một việc vừa sức',text:'Hỏi một người ở gần xem bạn có thể giúp một việc nhỏ nào.'},
 {id:'gopy',title:'Xin một lời góp ý',text:'Hỏi người bạn tin một điều bạn có thể làm tốt hơn.'},
 {id:'vandong',title:'Bước ra ngoài một chút',text:'Rời màn hình, đi bộ một đoạn ngắn và để ý cảm giác của mình.'},
 {id:'memo',title:'Mang một điều vào sổ',text:'Ghi vào sổ một lời dặn hôm nay rồi thử thực hiện lời dặn đó.'},
 {id:'quansat',title:'Để ý và hỏi',text:'Quan sát cách một người làm việc rồi hỏi một câu để hiểu thêm.'}];
var GROWTH_CHALLENGE_KEY=null;
function growthChallengeTemplate(key){var w=key.slice(0,10),slot=+key.slice(-1),seed=Math.floor(new Date(w+'T12:00:00').getTime()/604800000);return ((seed*2+slot)%GROWTH_CHALLENGES.length+GROWTH_CHALLENGES.length)%GROWTH_CHALLENGES.length;}
function growthOffer(){var g=growthState();if(!g.enabled)return null;var active=Object.keys(g.challenges).sort().find(function(k){return ['accepted','later'].includes(g.challenges[k].status);});if(active)return active;var w=wkStart(dk());for(var i=0;i<2;i++){var key=w+'_'+i;if(dk()>=addD(w,i?4:1)&&!g.challenges[key])return key;}return null;}
var GROWTH_CHALLENGE_EXPANDED=false;
function growthChallengePanel(){var g=growthState(),key=growthOffer(),a=key&&g.challenges[key],t=key&&GROWTH_CHALLENGES[a?a.template:growthChallengeTemplate(key)];return '<details class="growth-challenge-panel" data-flow-type'+(GROWTH_CHALLENGE_EXPANDED?' open':'')+'><summary>Thử thách</summary><div class="growth-challenge-content"><div class="growth-challenge-heading"><span>Hai gợi ý mỗi tuần</span><button class="flow-link" data-act="growthChallengeToggle">'+(g.enabled?'Tắt':'Bật')+'</button></div>'+(key?'<h3>'+esc(t.title)+'</h3><p>'+esc(t.text)+'</p><div class="growth-challenge-actions"><button class="flow-link" data-act="growthChallengeOpen" data-v="'+key+'">'+(a?'Viết cảm nhận':'Mình thử nhé')+'</button><button class="flow-link" data-act="growthChallengeSkip" data-v="'+key+'">Bỏ qua</button></div>':'<small>'+(g.enabled?'Thứ Ba và Thứ Sáu · Tùy chọn':'Đang tắt gợi ý thử thách')+'</small>')+'</div></details>';}
document.addEventListener('toggle',function(e){if(e.target.matches('.growth-challenge-panel'))GROWTH_CHALLENGE_EXPANDED=e.target.open;},true);
function growthChallengeOpen(key){if(!/^\d{4}-\d{2}-\d{2}_[01]$/.test(key))return;var g=growthState(),a=g.challenges[key];if(!a){a=g.challenges[key]={status:'accepted',template:growthChallengeTemplate(key),note:'',credited:false};save(true);}if(a.status==='done'||a.status==='skipped')return;GROWTH_CHALLENGE_KEY=key;var t=GROWTH_CHALLENGES[a.template],u=H(t.id);openMini('<div class="growth-challenge-editor" data-flow-type><h2>'+esc(t.title)+'</h2><p>'+esc(t.text)+'</p><label class="lbl" for="growthChallengeNote">Bạn đã làm gì và cảm thấy thế nào?</label><textarea class="inp" id="growthChallengeNote" rows="4" maxlength="2000" placeholder="Một hành động và một cảm nhận cụ thể…">'+esc(a.note)+'</textarea><p class="growth-mapping">Lưu vào nhật ký: '+esc(sname(t.id))+' · Thử thách</p>'+(u?'<p class="growth-formula-check">Công thức của bạn: Khi '+esc(u.anchor)+', mình sẽ '+esc(u.act)+'.</p><label class="growth-check"><input type="checkbox" id="growthChallengeCredit">Tôi đã thực hiện đúng hành động trong công thức này hôm nay</label>':'')+'<small class="growth-muted">Ghi cảm nhận sẽ được lưu như một trải nghiệm. Chỉ xác nhận khi bạn đã làm đúng công thức.</small><div class="growth-editor-actions"><button class="flow-link" data-act="growthChallengeLater">Để sau</button><button class="btn" data-act="growthChallengeSave">Lưu cảm nhận</button></div></div>');}
function growthChallengeSave(key,note,confirm){var g=growthState(),a=g.challenges[key];if(!a||a.status==='done'||a.status==='skipped'||!String(note).trim())return false;var t=GROWTH_CHALLENGES[a.template],d=dk(),credited=false;/* Explicit attestation refers to the shown formula, never inferred from topic. */if(confirm&&H(t.id)&&!mark(d,t.id)){var tx=writeRecord(t.id,d,'y',String(note).trim(),'');if(!tx)return false;credited=true;RECORD_UNDO=null;}a.note=String(note).trim();a.date=d;a.status='done';a.credited=credited;save(true);return true;}
/* Optional practice after reaching the weekly goal does not obscure a waiting memo. */
vToday=function(){var d=dk(),all=handList(),pending=all.filter(function(id){return !flowComplete(d,id);}),optional=pending.filter(function(id){return !flowDraft(d,id)&&!mark(d,id)&&growthWeekCount(id,wkStart(d))>=growthGoal(id);}),required=pending.filter(function(id){return optional.indexOf(id)<0;}),yes=all.filter(function(id){return mark(d,id)==='y';}).length;
  function rows(ids){return '<div class="flow-today-list">'+ids.map(function(id){var u=H(id),status=flowPendingText(d,id);return '<div class="growth-swipe-shell"><div class="growth-swipe-under" aria-hidden="true"><span>✓ Đã làm</span><span>Chưa làm ×</span></div><article class="flow-today-row'+flowGroup(id)+(status?' is-pending':'')+'" data-flow-swipe="'+id+'"><button class="flow-card-entry" data-act="flowFront" data-v="'+id+'" aria-label="Xem mặt trước thẻ '+esc(flowTodayName(id))+'"><span class="flow-emblem">'+flowIcon(id)+'</span></button><button class="flow-row-main" data-act="note" data-v="'+id+'|'+d+'"><b>'+esc(flowTodayName(id))+'</b><small>'+(status?esc(status):'Khi '+esc(u.anchor||'đến lúc đã chọn'))+'</small></button><button class="flow-row-plus" data-act="note" data-v="'+id+'|'+d+'" aria-label="Ghi nhận '+esc(flowTodayName(id))+'">'+mi('add')+'</button></article></div>';}).join('')+'</div>';}
  var h='<div class="flow-today-toolbar" data-flow-type><span>'+(all.length-pending.length)+'/'+all.length+' đã ghi nhận</span><button class="flow-link" data-act="collection">'+mi('menu_book')+'Thư viện</button></div><div data-flow-type>';
  if(required.length)h+=rows(required);else h+='<section class="flow-empty">'+shin('proud')+'<h2>'+(all.length?'Bạn đã thực hiện '+yes+'/'+all.length+' thói quen hôm nay':'Một thẻ là đủ để bắt đầu')+'</h2><p>'+(optional.length?'Bạn đã đạt mục tiêu tuần cho các thẻ còn lại. Rèn thêm khi muốn nhé.':'Mỗi lần nhìn lại là một bước hiểu mình hơn. Mình tiếp tục nhé.')+'</p>'+(all.length?'<button class="flow-link" data-act="flowTodayReview">Xem lại hôm nay '+mi('arrow_forward')+'</button>':'')+'</section>';
  if(optional.length)h+='<details class="growth-optional"><summary>Rèn thêm nếu muốn <small>'+optional.length+' thẻ</small></summary>'+rows(optional)+'</details>';
  var exceeded=all.filter(function(id){return growthWeekCount(id,wkStart(d))>growthGoal(id);});if(exceeded.length)h+='<aside class="growth-praise">'+mi('celebration')+'<p>'+esc(S.name||'Bạn')+' đã vượt mục tiêu tuần: '+exceeded.map(function(id){return esc(sname(id))+' '+growthWeekCount(id,wkStart(d))+'/'+growthGoal(id)+' ngày';}).join(' · ')+'. Shin vui cùng bạn!</p></aside>';
  if(all.length<5)h+='<button class="flow-link flow-add" data-act="pick">'+mi('add')+'Thêm thói quen</button>';return h+growthChallengePanel()+'</div>';};
document.addEventListener('input',function(e){if(e.target.id==='growthChallengeNote'&&GROWTH_CHALLENGE_KEY){var a=growthState().challenges[GROWTH_CHALLENGE_KEY];if(a&&a.status!=='done'){a.note=e.target.value;save();}}});
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b||!b.dataset.act.startsWith('growth'))return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act,v=b.getAttribute('data-v');if(a==='growthMonth'&&CARD){var month=CARD.growthMonth||dk().slice(0,7),dt=new Date(month+'-15T12:00:00');dt.setMonth(dt.getMonth()+(+v));CARD.growthMonth=dt.getFullYear()+'-'+pad(dt.getMonth()+1);CARD.growthDay=null;drawCard();}if(a==='growthRange'&&CARD){CARD.growthRange=v;CARD.growthDay=null;drawCard();}if(a==='growthDiaryDay'&&CARD){CARD.growthDay=CARD.growthDay===v?null:v;drawCard();var section=$('.growth-selected');if(section)section.scrollIntoView({block:'nearest',behavior:reduceMotion()?'instant':'smooth'});}if(a==='growthChallengeToggle'){growthState().enabled=!growthState().enabled;save(true);renderPage();}if(a==='growthChallengeOpen')growthChallengeOpen(v);if(a==='growthChallengeSkip'){var g=growthState(),old=g.challenges[v];g.challenges[v]={status:'skipped',template:old?old.template:growthChallengeTemplate(v),note:'',credited:false};save(true);renderPage();}if(a==='growthChallengeLater'){var entry=growthState().challenges[GROWTH_CHALLENGE_KEY];if(entry){entry.status='later';save(true);}closeOv();render();}if(a==='growthChallengeSave'){var note=$('#growthChallengeNote'),credit=$('#growthChallengeCredit');if(!note.value.trim()){note.focus();return;}if(growthChallengeSave(GROWTH_CHALLENGE_KEY,note.value,!!(credit&&credit.checked))){closeOv();render();toast('Đã lưu cảm nhận vào nhật ký thói quen.');}}},true);
var GROWTH_SCROLL_Y=0,GROWTH_SCROLL_ACC=0;
window.addEventListener('scroll',function(){var y=Math.max(0,window.scrollY),delta=y-GROWTH_SCROLL_Y;GROWTH_SCROLL_Y=y;if(y<35){document.body.classList.remove('growth-nav-away');GROWTH_SCROLL_ACC=0;return;}if(Math.sign(delta)!==Math.sign(GROWTH_SCROLL_ACC))GROWTH_SCROLL_ACC=0;GROWTH_SCROLL_ACC+=delta;if(Math.abs(GROWTH_SCROLL_ACC)>24){document.body.classList.toggle('growth-nav-away',GROWTH_SCROLL_ACC>0);GROWTH_SCROLL_ACC=0;}},{passive:true});

var growthTreePanel=treePanel;
treePanel=function(){var h=growthTreePanel(),ids=(S.order||[]).filter(function(id){return H(id)&&HMAP[id];}),best=ids.map(function(id){return {id:id,n:growthStreak(id,false).current};}).sort(function(a,b){return b.n-a.n;}),memo=ids.map(function(id){return {id:id,n:growthStreak(id,true).current};}).sort(function(a,b){return b.n-a.n;}),lines=[];if(best[0]&&best[0].n)lines.push('Nhịp thực hiện tốt nhất: '+esc(sname(best[0].id))+' · '+best[0].n+' ngày liên tiếp.');if(memo[0]&&memo[0].n)lines.push('Nhịp memo tốt nhất: '+esc(sname(memo[0].id))+' · '+memo[0].n+' ngày liên tiếp.');h=h.replace('class="shin-line34 shin-tree34"','class="shin-line34 shin-tree34" data-flow-type');if(lines.length)h=h.replace('<details class="m3-milestones"','<aside class="growth-rhythm" data-flow-type><b>Shin ghi nhận '+esc(S.name||'bạn')+'</b>'+lines.map(function(line){return '<p>'+line+'</p>';}).join('')+'</aside><details class="m3-milestones"');return h;};
document.addEventListener('toggle',function(e){if(e.target.matches('.growth-week')&&CARD){CARD.timelineOpen=CARD.timelineOpen||{};CARD.timelineOpen[e.target.dataset.week]=e.target.open;}},true);
var growthJournalMemo=journalMemo31;
journalMemo31=function(d){var h=growthJournalMemo(d),q=(S.ci[d]||{}).question;return h&&q?h.replace('</div><p>','</div><small class="growth-reflection-question">'+esc(q)+'</small><p>'):h;};
/* A reached weekly target may stay deferred in tonight's review; drafts still require attention. */
var growthOpenCI=openCI;
openCI=function(d){growthOpenCI(d);if(!CI||CI.date!==d||d!==dk()||CI.done)return;CI.all.forEach(function(id){if(!CI.ans[id]&&!mark(d,id)&&!flowDraft(d,id)&&growthWeekCount(id,wkStart(d))>=growthGoal(id,wkStart(d)))CI.skip[id]=true;});drawCI();};

;
/* ===== SECTION: routine-templates.js ===== */
/* M3.3.2: 30 optional recipes; existing cards and storage stay intact. */
var ROUTINE_TEMPLATES = [
 {id:'kiem-tin',base:'quansat',name:'Kiểm chứng trước khi chia sẻ',k:'định chia sẻ một tin',a:'xem nguồn gốc và ngày đăng trước',w:'người kiểm tra thông tin'},
 {id:'tap-trung',base:'bot',bad:'mxh',name:'Học tập trung 5 phút',k:'ngồi vào bàn học',a:'để điện thoại xa tay, học một việc 5 phút',w:'người làm chủ sự tập trung'},
 {id:'noi-nhip',base:'loihua',name:'Bắt đầu lại khi thấy nản',k:'bắt đầu giờ tự học dù đang nản',a:'ôn 3 từ đã học trước khi học bài mới',w:'người kiên trì từng chút'},
 {id:'ly-do',base:'loihua',name:'Nhớ lý do mình học',k:'mở vở tiếng Nhật',a:'đọc một câu mình viết về lý do muốn sang Nhật',w:'người nhớ điều mình đang hướng tới'},
 {id:'bat-dau',base:'loihua',name:'Làm ngay câu đầu tiên',k:'đến giờ tự học',a:'mở đúng bài cần làm và làm câu đầu tiên',w:'người chủ động bắt đầu'},
 {id:'tu-giac',base:'loihua',name:'Tự bắt đầu, không chờ nhắc',k:'ăn tối xong',a:'xem việc cần làm và bắt đầu một việc nhỏ',w:'người tự giác'},
 {id:'di-bo',base:'vandong',name:'Đi bộ sau giờ học',k:'học xong buổi chiều',a:'mang giày và đi bộ 3 phút',w:'người biết chăm sóc sức khỏe'},
 {id:'the-thao',base:'vandong',name:'Vận động cùng một người bạn',k:'đến chiều thứ Bảy',a:'rủ một bạn đi bộ 10 phút',w:'người cùng bạn giữ sức khỏe',goal:1},
 {id:'an-sang',base:'anuong',name:'Chuẩn bị bữa sáng',k:'soạn cặp buổi tối',a:'chuẩn bị phần ăn sáng cho ngày mai',w:'người biết chăm sóc bản thân'},
 {id:'cung-hoc',base:'giup',name:'Giúp bạn ôn tiếng Nhật',k:'học xong phần mình',a:'hỏi bạn có muốn cùng ôn 3 từ không',w:'người đồng đội tốt'},
 {id:'phat-bieu',base:'viecko',name:'Giơ tay thử một lần',k:'thầy cô hỏi câu mình có ý trả lời',a:'giơ tay thử trả lời một lần',w:'người dám thử'},
 {id:'di-som',base:'som',name:'Ra khỏi phòng đúng giờ',k:'đến giờ ra khỏi phòng đã đặt',a:'cất điện thoại và đi ngay',w:'người đúng giờ'},
 {id:'hoc-dieu-hay',base:'quansat',name:'Học một cách làm hay',k:'tan học',a:'ghi một cách làm hay mình thấy ở người khác',w:'người biết học từ xung quanh'},
 {id:'cach-hoc',base:'quansat',name:'Hỏi một cách học mới',k:'học xong chiều thứ Sáu',a:'hỏi một bạn cách bạn ấy nhớ từ khó',w:'người chủ động tìm cách học',goal:1},
 {id:'tim-loi-giai',base:'quansat',name:'Tìm lời giải cho điều quan tâm',k:'ghi một câu hỏi vào sổ',a:'chọn một người hoặc nguồn phù hợp để hỏi',w:'người chủ động tìm hiểu'},
 {id:'cai-tien',base:'quansat',name:'Tìm một chỗ làm gọn hơn',k:'làm xong một việc hay lặp lại',a:'ghi một chỗ có thể làm gọn hơn lần sau',w:'người biết cải tiến'},
 {id:'xac-nhan',base:'horenso',name:'Nhắc lại yêu cầu trước khi làm',k:'nhận một việc được giao',a:'nói lại việc, hạn làm và hỏi mình hiểu đúng chưa',w:'người làm việc rõ ràng'},
 {id:'xin-phep',base:'horenso',name:'Báo và xin phép trước',k:'biết mình cần nghỉ hoặc sẽ đến trễ',a:'báo và xin phép thầy cô trước giờ học',w:'người có trách nhiệm'},
 {id:'vao-phong',base:'chao',name:'Xin phép trước khi vào phòng',k:'đến cửa phòng giáo viên',a:'gõ cửa, chào và xin phép vào',w:'người lịch sự'},
 {id:'giam-game',base:'bot',bad:'game',name:'Dừng game đúng giờ đã chọn',k:'mở game',a:'hẹn giờ 20 phút; chuông reo thì thoát game',w:'người làm chủ thời gian'},
 {id:'doc-hoc',base:'5phut',name:'Đọc một điều mới trên Tikme',k:'ngồi chờ vào lớp',a:'đọc một đoạn trên tikme.com, ghi một điều mới',w:'người học hỏi mỗi ngày'},
 {id:'giam-thuoc',base:'bot',bad:'khac',badOther:'Hút thuốc',name:'Theo dõi giới hạn hút thuốc',k:'kết thúc ngày',a:'ghi số điếu thực tế, so với giới hạn mình chọn',w:'người chủ động thay đổi',note:'Sửa công thức để ghi rõ giới hạn số điếu/ngày của bạn. Lên cấp vẫn cần bạn xem lại và xác nhận; app không tự suy ra mức giảm.'},
 {id:'diem-sang',name:'Nhìn ra một điểm sáng',k:'viết nhật ký tối',a:'ghi một điều tốt có thật trong ngày',w:'người nhận ra điều đáng quý',icon:'nang',note:'Điều khó chịu vẫn đáng được lắng nghe. Không cần ép mình vui hay tìm mặt tốt trong mọi chuyện.'},
 {id:'noi-that',name:'Nói thật điều mình cần',k:'muốn người mình tin hiểu mình hơn',a:'nói: mình đang thấy gì và mong được giúp gì',w:'người chia sẻ chân thành',icon:'tim'},
 {id:'go-lo',name:'Gỡ một điều đang lo',k:'nhận ra mình nghĩ đi nghĩ lại một chuyện',a:'viết điều đã biết và một bước mình có thể làm',w:'người biết chọn bước tiếp theo',icon:'but',note:'Viết ngắn rồi chọn một việc hoặc người cần hỏi, không cần phân tích mãi. Chỉ chia sẻ với người bạn tin khi muốn.'},
 {id:'ngay-mai',name:'Chuẩn bị cho ngày mai',k:'cắm sạc điện thoại buổi tối',a:'viết tối đa 3 việc cho mai, đánh dấu việc đầu',w:'người có sự chuẩn bị',icon:'but'},
 {id:'senpai',name:'Học từ người đi trước',k:'đến tối Chủ nhật',a:'gửi một câu hỏi cụ thể cho anh chị trong nghề',w:'người chủ động học hỏi',icon:'sach',goal:1},
 {id:'so-thich',name:'Giữ một sở thích lành mạnh',k:'học xong tối thứ Tư',a:'dành 5 phút hát, vẽ hoặc chơi nhạc mình thích',w:'người biết nuôi dưỡng niềm vui',icon:'nhac',goal:1},
 {id:'ghi-nhan',name:'Nói một lời ghi nhận',k:'thấy ai làm một việc tốt',a:'nói rõ việc mình trân trọng ở người ấy',w:'người biết ghi nhận người khác',icon:'cuoi',dip:true},
 {id:'hoi-tham',name:'Chủ động hỏi thăm',k:'ăn tối xong ngày Chủ nhật',a:'nhắn hoặc gọi hỏi thăm một người thân',w:'người biết quan tâm',icon:'tim',goal:1}
];

/* Existing suggestion picker can still fill all three editable fields. */
ROUTINE_TEMPLATES.forEach(function(t){if(t.base)(SUG[t.base]||(SUG[t.base]=[])).push([t.k,t.a,t.w]);});
var recipeCuStepName=cuStepName;
cuStepName=function(){return recipeCuStepName()+(ST.edit?'':recipeLibrary());};
function recipeLibrary(){return '<details><summary class="sugt">Chưa biết bắt đầu? Chọn một gợi ý</summary><p class="note">30 mẫu · Chọn một việc phù hợp. Mẫu thuộc thẻ có sẵn sẽ mở thẻ đó để tránh tạo trùng.</p><label class="lbl" for="recipeSearch">Tìm gợi ý</label><input class="inp" id="recipeSearch" type="search" maxlength="60" placeholder="Ví dụ: học, lo, game, hỏi thăm" value="'+esc(ST.recipeQuery||'')+'"><div id="recipeResults">'+recipeResults()+'</div></details>';}
function recipeNormalize(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');}
function recipeResults(){var q=recipeNormalize(ST.recipeQuery||''),list=ROUTINE_TEMPLATES.filter(function(t){return recipeNormalize(t.name+' '+t.k+' '+t.a).indexOf(q)>=0;}),shown=list.slice(0,ST.recipeLimit||5);return '<div class="sugl">'+shown.map(function(t){return '<button type="button" class="sugc" data-act="recipePick" data-v="'+t.id+'"><b>'+esc(t.name)+'</b><br>Khi '+esc(t.k)+', mình sẽ '+esc(t.a)+'.<br><small>'+(t.base?(H(t.base)?'Xem để sửa công thức thẻ: ':'Dùng thẻ có sẵn: ')+esc(HMAP[t.base].s):'Điền vào thẻ tự tạo')+'</small></button>';}).join('')+'</div>'+(list.length?'':'<p class="note">Chưa có mẫu phù hợp. Bạn vẫn có thể tự viết công thức.</p>')+(shown.length<list.length?'<button type="button" class="sugt" data-act="recipeMore">Xem thêm gợi ý ('+(list.length-shown.length)+')</button>':'');}
function recipePick(id){var t=ROUTINE_TEMPLATES.find(function(r){return r.id===id;});if(!t||!ST||!ST.cust||ST.edit)return;
 if(t.base){openStart(t.base,!!H(t.base));if(!ST||ST.id!==t.base)return;}
 else {ST.name=t.name;ST.icon=t.icon||'sao';ST.rhy=t.dip?'p':'d';}
 ST.anchor=t.k;ST.act=t.a;ST.who=t.w;ST.custom={};ST.sugOpen=false;
 if(t.bad){ST.bad=t.bad;ST.badOther=t.badOther||'';}
 if(!t.base||!H(t.base))ST.weekGoal=t.goal||7;
 ST.recipeNote=t.note||'';
 /* Review each field, including existing quiz and reduction choices. */
 ST.i=0;drawStart();
}
var recipeDrawStart=drawStart;
drawStart=function(){recipeDrawStart();if(!ST||!ST.recipeNote)return;var body=$('.sheet .lc');if(body)body.insertAdjacentHTML('beforeend','<p class="note">'+esc(ST.recipeNote)+'</p>');};
document.addEventListener('input',function(e){if(e.target.id!=='recipeSearch'||!ST||!ST.cust)return;ST.recipeQuery=e.target.value;ST.recipeLimit=5;var results=$('#recipeResults');if(results)results.innerHTML=recipeResults();});
document.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b||!ST)return;var a=b.getAttribute('data-act');if(a==='recipePick')recipePick(b.getAttribute('data-v'));if(a==='recipeMore'&&ST.cust){ST.recipeLimit=(ST.recipeLimit||5)+5;var results=$('#recipeResults');if(results)results.innerHTML=recipeResults();}});
/* Keep reduction choices and guidance consistent when using the card's own picker. */
document.addEventListener('click',function(e){var b=e.target.closest('[data-act="sugPick"]');if(!b||!ST||ST.cust)return;var g=(SUG[ST.id]||[])[+b.getAttribute('data-v')];if(!g)return;var t=ROUTINE_TEMPLATES.find(function(r){return r.base===ST.id&&r.k===g[0]&&r.a===g[1];});if(!t)return;e.preventDefault();e.stopImmediatePropagation();ST.anchor=t.k;ST.act=t.a;ST.who=t.w;ST.custom={};ST.sugOpen=false;ST.recipeNote=t.note||'';if(t.bad){ST.bad=t.bad;ST.badOther=t.badOther||'';}if(!H(ST.id)&&t.goal)ST.weekGoal=t.goal;ST.i=ST.steps.indexOf('w');drawStart();ting();},true);

;
/* ===== SECTION: routine-garden.js ===== */
/* M3.3.5: local-time scenery, independent of learner data and achievement. */
var GARDEN_RENDER=false,GARDEN_SCENE=null,GARDEN_SEQ=0,GARDEN_TIMER=null;
function gardenSceneAt(date){
  var h=date.getHours(),time=h>=5&&h<8?'dawn':h>=8&&h<16?'day':h>=16&&h<18?'dusk':'night';
  var day=Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000),slot=day*6+Math.floor(h/4),cycle=['clear','cloudy','clear','rain','cloudy','clear','rain','clear','cloudy','rain','storm','cloudy','clear','clear','rain','clear'];
  var weather=cycle[((slot%cycle.length)+cycle.length)%cycle.length];
  return {time:time,weather:weather,key:time+'-'+weather};
}
function gardenLabel(scene){return ({dawn:'Bình minh',day:'Ban ngày',dusk:'Hoàng hôn',night:'Ban đêm'})[scene.time]+' · '+({clear:'trời quang',cloudy:'mây nhẹ',rain:'mưa nhỏ',storm:'giông bão'})[scene.weather];}
function gardenCloud(x,y,s,opacity){return '<g transform="translate('+x+' '+y+') scale('+s+')"><g class="garden-cloud" opacity="'+opacity+'"><path d="M-30 12C-42 12-42-3-30-5C-31-23-8-27 1-14C9-25 29-17 26-3C44-4 43 14 30 14H-30Z"/></g></g>';}
function gardenGrass(){var out='<g class="garden-grass" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">';[[47,359],[85,365],[117,359],[300,362],[349,356],[378,366]].forEach(function(p){var x=p[0],y=p[1];out+='<path d="M'+x+' '+y+'q-2-8-5-10m5 10q0-13 4-15m-4 15q5-7 8-8"/>';});out+='</g>';[[72,362],[99,370],[331,361]].forEach(function(p){var x=p[0],y=p[1];out+='<g class="garden-flower"><path d="M'+x+' '+y+'v-8" stroke="var(--garden-grass)"/><g fill="var(--garden-flower)"><circle cx="'+(x-2)+'" cy="'+(y-10)+'" r="2.2"/><circle cx="'+(x+2)+'" cy="'+(y-10)+'" r="2.2"/><circle cx="'+x+'" cy="'+(y-13)+'" r="2.2"/><circle cx="'+x+'" cy="'+(y-8)+'" r="2.2"/></g><circle cx="'+x+'" cy="'+(y-10)+'" r="1.2" fill="#CEB988"/></g>';});return out;}
function gardenBack(scene,uid){
  var night=scene.time==='night',rain=scene.weather==='rain'||scene.weather==='storm',cloudy=scene.weather!=='clear';
  var out='<defs><linearGradient id="'+uid+'-sky" x2="0" y2="1"><stop class="garden-sky-top"/><stop offset="1" class="garden-sky-bottom"/></linearGradient><radialGradient id="'+uid+'-glow"><stop stop-color="#FFF0CA" stop-opacity=".45"/><stop offset="1" stop-color="#FFF0CA" stop-opacity="0"/></radialGradient><linearGradient id="'+uid+'-edge"><stop stop-color="#000"/><stop offset=".17" stop-color="#FFF"/><stop offset=".83" stop-color="#FFF"/><stop offset="1" stop-color="#000"/></linearGradient><linearGradient id="'+uid+'-floor" x2="0" y2="1"><stop offset=".91" stop-color="#FFF"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="'+uid+'-edge-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="420" height="390"><rect width="420" height="390" fill="url(#'+uid+'-edge)"/></mask><mask id="'+uid+'-floor-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="420" height="390"><rect width="420" height="390" fill="url(#'+uid+'-floor)"/></mask></defs>';
  if(night){
    out+='<g class="garden-moon" opacity="'+(rain?.4:cloudy?.65:1)+'"><circle class="garden-celestial-glow" cx="349" cy="54" r="43" fill="url(#'+uid+'-glow)"/><circle class="garden-moon-halo" cx="349" cy="54" r="27" fill="#F6F2DF" opacity=".07"/><path d="M355 34A19 19 0 1 0 366 64A21 21 0 0 1 355 34Z" fill="#F8F2DB"/></g>';
    [[39,43],[89,80],[143,30],[186,63],[285,26],[391,109],[321,89],[51,159],[376,211],[110,119]].forEach(function(p,i){var x=p[0],y=p[1];out+='<g class="garden-star" style="--garden-delay:-'+(i*.47)+'s" opacity="'+(rain?.2:cloudy?.4:.7)+'"><circle cx="'+x+'" cy="'+y+'" r="'+(i%3===0?1.5:1)+'"/>'+(i%3===0?'<path d="M'+(x-3)+' '+y+'h6M'+x+' '+(y-3)+'v6" stroke="currentColor" stroke-width=".6"/>':'')+'</g>';});
  }else{
    var y=scene.time==='dusk'?275:scene.time==='dawn'?100:55;
    out+='<g class="garden-sun" opacity="'+(rain?.14:cloudy?.32:.8)+'"><circle class="garden-celestial-glow" cx="68" cy="'+y+'" r="65" fill="url(#'+uid+'-glow)"/><circle cx="68" cy="'+y+'" r="17" fill="var(--garden-sun)"/></g>';
    if(!rain)out+='<path class="garden-birds" d="M142 43q5-5 10 0q5-5 10 0m-17 9q3-3 6 0q3-3 6 0" fill="none" stroke="currentColor" stroke-width="1.2"/>';
  }
  out+='<g class="garden-clouds">'+(cloudy?gardenCloud(74,56,1.4,rain?.5:.32)+gardenCloud(208,39,1.7,rain?.34:.22)+gardenCloud(351,65,1.4,rain?.44:.28):gardenCloud(120,91,.9,night?.15:.58)+gardenCloud(344,65,.7,night?.12:.62))+'</g><g mask="url(#'+uid+'-edge-mask)"><g mask="url(#'+uid+'-floor-mask)"><path d="M0 346Q75 325 150 348T300 346T420 343V390H0Z" fill="var(--garden-ground)" opacity=".3"/><path d="M0 368Q100 348 215 363T420 358V390H0Z" fill="var(--garden-ground)" opacity=".4"/></g></g>';
  return out;
}
function gardenFront(scene){
  var out=gardenGrass();if(scene.weather==='storm')out+='<g class="garden-lightning"><ellipse cx="85" cy="78" rx="40" ry="43" fill="#F5F2D8" opacity=".04"/><path d="M89 50l-10 20 9-1-8 24 18-30-10 1 8-14" fill="#ECE9CF" opacity=".35"/></g>';
  if(scene.weather==='rain'||scene.weather==='storm'){
    out+='<g class="garden-rain" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1">';
    for(var i=0;i<(scene.weather==='storm'?44:28);i++){var x=18+(i*67)%392,y=90+(i*53)%236;out+='<path class="garden-rain-streak" style="--garden-delay:-'+(i*.17).toFixed(2)+'s" d="M'+x+' '+y+'l-2 9"/>';}
    [62,130,286,359].forEach(function(x,i){out+='<g class="garden-splash" style="--garden-delay:-'+(i*.68)+'s"><path d="M'+(x-5)+' 360q-5-7-6-5m13 6q5-7 6-5m-9 1q-1-7-2-7"/></g><ellipse class="garden-ripple" style="--garden-delay:-'+(i*.78)+'s" cx="'+x+'" cy="362" rx="9" ry="1.6"/>';});out+='</g>';
  }
  if(scene.time==='night')[[110,366,1],[313,363,-1],[369,374,1]].forEach(function(p,i){out+='<g class="garden-cricket" transform="translate('+p[0]+' '+p[1]+') scale('+p[2]+' 1)"><ellipse cx="0" cy="0" rx="3.8" ry="1.6"/><circle cx="3.5" cy="-1" r="1.5"/><path d="M-1 0l-3-5 6 6m-3 0-5 2m7-3 3 3m0-5 4-4m-3 4 5-1" fill="none" stroke="currentColor" stroke-width=".7" stroke-linecap="round"/></g>';});
  return out;
}
function gardenDecorate(svg,scene){var uid='garden-'+(++GARDEN_SEQ);return svg.replace(/(<svg\b[^>]*>)/,'$1<g class="garden-back" aria-hidden="true" pointer-events="none">'+gardenBack(scene,uid)+'</g>').replace(/<\/svg>$/,'<g class="garden-front" aria-hidden="true" pointer-events="none">'+gardenFront(scene)+'</g></svg>');}
var gardenTreeSVG=treeSVG;
treeSVG=function(fresh,interactive){var svg=gardenTreeSVG(fresh,interactive);return GARDEN_RENDER&&interactive?gardenDecorate(svg,GARDEN_SCENE):svg;};
var gardenTreePanel=treePanel;
treePanel=function(){GARDEN_SCENE=gardenSceneAt(new Date());GARDEN_RENDER=true;try{var h=gardenTreePanel();return h.replace('class="m3-tree-panel ','data-garden-time="'+GARDEN_SCENE.time+'" data-garden-weather="'+GARDEN_SCENE.weather+'" data-garden-key="'+GARDEN_SCENE.key+'" class="m3-tree-panel garden-panel ');}finally{GARDEN_RENDER=false;}};
/* Update only scenery at boundaries; do not rebuild the tree, tags, letters or focus. */
function gardenRefresh(){if(document.hidden||PG!==2)return;var panel=$('.garden-panel');if(!panel)return;var scene=gardenSceneAt(new Date());panel.classList.remove('garden-paused');if(panel.getAttribute('data-garden-key')===scene.key)return;var back=$('.garden-back',panel),front=$('.garden-front',panel);if(!back||!front)return;var uid='garden-'+(++GARDEN_SEQ);back.innerHTML=gardenBack(scene,uid);front.innerHTML=gardenFront(scene);panel.setAttribute('data-garden-time',scene.time);panel.setAttribute('data-garden-weather',scene.weather);panel.setAttribute('data-garden-key',scene.key);GARDEN_SCENE=scene;}
function gardenSchedule(){clearTimeout(GARDEN_TIMER);GARDEN_TIMER=null;var panel=$('.garden-panel');if(document.hidden||PG!==2){if(panel)panel.classList.add('garden-paused');return;}gardenRefresh();GARDEN_TIMER=setTimeout(gardenSchedule,60000);}
var gardenRenderPage=renderPage;
renderPage=function(){gardenRenderPage();gardenSchedule();gardenFitViewport();gardenStormSchedule();};
document.addEventListener('visibilitychange',gardenSchedule);
window.addEventListener('pageshow',gardenSchedule);

/* Fit the first phone view above its navigation; letters stay in normal page scroll. */
var GARDEN_SIZE_OBSERVER=null,GARDEN_SIZE_HEADER=null;
function gardenFitViewport(){var panel=$('.garden-panel');if(!panel||PG!==2)return;var nav=$('#abar'),header=$('#ahd'),vh=window.visualViewport?window.visualViewport.height:window.innerHeight,top=panel.getBoundingClientRect().top+(window.scrollY||0),clearance=96;if(nav){var r=nav.getBoundingClientRect();clearance=r.height+Math.max(0,window.innerHeight-r.bottom);}panel.style.setProperty('--garden-phone-height',Math.max(440,Math.floor(vh-top-clearance-16))+'px');var layout=panel.parentElement;if(layout)layout.style.setProperty('--garden-nav-space',(clearance+32)+'px');if(window.ResizeObserver&&header&&GARDEN_SIZE_HEADER!==header){if(GARDEN_SIZE_OBSERVER)GARDEN_SIZE_OBSERVER.disconnect();GARDEN_SIZE_HEADER=header;GARDEN_SIZE_OBSERVER=new ResizeObserver(gardenFitViewport);GARDEN_SIZE_OBSERVER.observe(header);if(nav)GARDEN_SIZE_OBSERVER.observe(nav);}}
window.addEventListener('resize',gardenFitViewport);
if(window.visualViewport)window.visualViewport.addEventListener('resize',gardenFitViewport);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(gardenFitViewport);

var GARDEN_STORM_TIMER=null,GARDEN_STORM_PANEL=null,GARDEN_RUMBLE=null;
function gardenStormActive(){var panel=$('.garden-panel');return !document.hidden&&PG===2&&!OV&&panel&&panel.getAttribute('data-garden-weather')==='storm'?panel:null;}
function gardenStopRumble(){if(GARDEN_RUMBLE){try{GARDEN_RUMBLE.stop();}catch(e){}GARDEN_RUMBLE=null;}}
function gardenThunder(){if(!gardenStormActive()||!S.sound||!AC||AC.state!=='running')return;try{gardenStopRumble();var duration=1.6,buffer=AC.createBuffer(1,Math.floor(AC.sampleRate*duration),AC.sampleRate),data=buffer.getChannelData(0);for(var i=0;i<data.length;i++)data[i]=(Math.random()*2-1);var source=AC.createBufferSource(),filter=AC.createBiquadFilter(),gain=AC.createGain(),t=AC.currentTime;source.buffer=buffer;filter.type='lowpass';filter.frequency.value=230;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.04,t+.22);gain.gain.exponentialRampToValueAtTime(.001,t+duration);source.connect(filter);filter.connect(gain);gain.connect(AC.destination);source.start(t);source.stop(t+duration);source.onended=function(){source.disconnect();filter.disconnect();gain.disconnect();if(GARDEN_RUMBLE===source)GARDEN_RUMBLE=null;};GARDEN_RUMBLE=source;}catch(e){gardenStopRumble();}}
function gardenStormPulse(){var panel=gardenStormActive();if(!panel||reduceMotion())return;panel.classList.add('garden-flashing');setTimeout(function(){if(gardenStormActive()===panel)gardenThunder();},1100);setTimeout(function(){panel.classList.remove('garden-flashing');},1900);}
function gardenStormTick(){GARDEN_STORM_TIMER=null;var panel=gardenStormActive();if(!panel){gardenStormSchedule();return;}gardenStormPulse();GARDEN_STORM_TIMER=setTimeout(gardenStormTick,45000);}
function gardenStormSchedule(){var panel=$('.garden-panel'),active=!document.hidden&&PG===2&&panel&&panel.getAttribute('data-garden-weather')==='storm'&&!reduceMotion();if(!active){clearTimeout(GARDEN_STORM_TIMER);GARDEN_STORM_TIMER=null;GARDEN_STORM_PANEL=null;gardenStopRumble();return;}if(GARDEN_STORM_PANEL!==panel||GARDEN_STORM_TIMER===null){clearTimeout(GARDEN_STORM_TIMER);GARDEN_STORM_PANEL=panel;GARDEN_STORM_TIMER=setTimeout(gardenStormTick,10000);}}
var gardenRefreshBeforeStorm=gardenRefresh;
gardenRefresh=function(){gardenRefreshBeforeStorm();gardenStormSchedule();};
document.addEventListener('visibilitychange',gardenStormSchedule);
document.addEventListener('click',function(){if(!S||!S.sound){gardenStopRumble();return;}if(PG!==2)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume().catch(function(){});}catch(e){} });

;
/* ===== SECTION: routine-card-design.js ===== */
/* Approved M3.3.7 fronts, including custom cards. No learner data is changed. */
var BAND_PATTERNS={1:'waves',2:'ruled',3:'grid',4:'petals'};
var BAND_CUSTOM_PATTERNS={5:'petals',6:'waves',7:'petals',8:'ruled',9:'grid',10:'waves'};
function bandCardIcon(id){var x=HMAP[id];return x&&x.custom?glyph('cu_'+(x.icon||'sao'),'var(--flow-paper)').replace(/#fff/gi,'currentColor'):flowIcon(id);}
var bandOriginalFront=flowFront;
flowFront=function(id){var x=HMAP[id],pattern=x&&(x.custom?BAND_CUSTOM_PATTERNS[x.g]:BAND_PATTERNS[x.g]);if(!pattern)return bandOriginalFront(id);var u=H(id),n=u?daysAt(id):0,need=u?needOf(id):0;
 return '<article class="flow-paper flow-front band-front band-'+pattern+flowGroup(id)+'"><div class="band-rail" aria-hidden="true"><span class="band-icon">'+bandCardIcon(id)+'</span><span class="band-label">KAIZEN CARD</span></div><div class="band-pattern" aria-hidden="true"><span></span><span></span><span></span><span></span></div>'+flowCardTop(id)+'<div class="band-title"><div class="band-title-copy">'+(x.custom?'<small class="growth-personal band-personal">'+mi('edit')+'Thẻ của '+esc(S.name||'bạn')+'</small>':'')+'<h2>'+esc(hname(id))+'</h2></div>'+(u?'<button class="flow-card-edit" data-act="edit" data-v="'+id+'" aria-label="Sửa công thức">'+mi('edit')+'</button>':'')+'</div><div class="flow-formula band-formula"><div class="band-block band-action"><small>MÌNH SẼ</small><p class="flow-action">'+esc(u?u.act:x.act||x.tiers[0])+'</p></div><div class="band-block band-anchor"><small>KHI</small><p>'+esc(u?u.anchor:(x.anchors||[])[0]||'đến lúc mình đã chọn')+'</p></div>'+(u&&u.who?'<p class="flow-who">Trở thành '+esc(u.who)+'</p>':'')+'</div>'+(u?'<div class="flow-card-days">'+f2Days(id)+'</div><div class="flow-card-owner"><span><b>'+esc(S.name)+'</b><small>Rèn từ '+dm(u.since)+'</small></span><span>'+Math.min(n,need)+' / '+need+' '+unitOf(id)+'</span></div><div class="m3-progress-track"><i style="width:'+Math.round(lvPct(id)*100)+'%"></i></div>':'')+'</article>';
};
/* Both faces retain a readable type scale; short viewports scroll their content
   rather than silently shrinking every line to squeeze the card into the frame. */
var bandOriginalFit=flowFitCard;
flowFitCard=function(){var stage=$('.flow-card-stage');if(stage&&stage.style.getPropertyValue('--card-scale')!=='1')stage.style.setProperty('--card-scale','1');};
var balanceOriginalBack=flowBack;
flowBack=function(id){var top=flowCardTop(id);return balanceOriginalBack(id).replace(top,top+'<h2 class="balance-back-title">'+esc(hname(id))+'</h2>');};

;