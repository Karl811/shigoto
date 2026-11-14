/* Canonical editable source. Section names record provenance, not imports. */

/* ===== SECTION: letters.js ===== */
/* TQ37 · personal letters; versioned designs preserve each stamp's meaning. */
var STAMP_MILESTONES37=[1,3,6,11];
var STAMP_CATALOG37={
  1:{id:'m1-v1',name:'Mầm đầu tiên',caption:'Mình đã bắt đầu.',meaning:'Một mầm cây nhỏ nhắc rằng bạn đã bắt đầu và chăm được một việc đến ngày hôm nay.'},
  3:{id:'m3-v1',name:'Rễ bền',caption:'Mình đang bén rễ.',meaning:'Những chiếc rễ âm thầm giữ cây vững. Từng việc nhỏ bạn lặp lại đang tạo nên nền tảng của mình.'},
  6:{id:'m6-v1',name:'Vươn nắng',caption:'Từng ngày, mình vững hơn.',meaning:'Cành tre hướng về nắng, lớn lên từng đốt. Bạn cũng đang tiến lên từ những lần kiên trì.'},
  11:{id:'m11-v1',name:'Khóm tre',caption:'Điều nhỏ đã thành một phần của mình.',meaning:'Từ một mầm nhỏ thành một khóm tre. Những thói quen đã cùng bạn đi qua một chặng đường đáng nhớ.'}
};
var LETTER_FLOW37=null,LETTER_TIMER37=null,LETTER_FRESH37=null;
function validateStampLetters37(map){
  Object.keys(map).forEach(function(key){
    var m=+key,r=map[key],design=STAMP_CATALOG37[m];
    if(STAMP_MILESTONES37.indexOf(m)<0||String(m)!==key||!stateObject32(r)||r.milestone!==m||!validDate32(r.earnedAt)||r.stampId!==design.id)throw Error('Con tem trong bản sao không hợp lệ.');
    if(r.draft!==undefined&&(typeof r.draft!=='string'||r.draft.length>1000))throw Error('Bản nháp thư trong bản sao không hợp lệ.');
    if(r.letter!==undefined&&r.letter!==null){var l=r.letter;if(!stateObject32(l)||typeof l.body!=='string'||!l.body.trim()||l.body.length>1000||typeof l.writtenAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(l.writtenAt)||isNaN(Date.parse(l.writtenAt))||new Date(l.writtenAt).toISOString()!==l.writtenAt||(l.writtenDate!==undefined&&!validDate32(l.writtenDate)))throw Error('Lá thư trong bản sao không hợp lệ.');}
  });
}
function syncLetterStamps37(){
  S.stampLetters=S.stampLetters||{};var items=treeItems30();
  STAMP_MILESTONES37.forEach(function(m){if(items.length>=m&&!S.stampLetters[m])S.stampLetters[m]={milestone:m,stampId:STAMP_CATALOG37[m].id,earnedAt:items[m-1].date,draft:'',letter:null};});
}
function stampRecords37(){return STAMP_MILESTONES37.map(function(m){return (S.stampLetters||{})[m];}).filter(Boolean);}
function writtenLetters37(){return stampRecords37().filter(function(r){return !!r.letter;});}
function letterDay37(r){return r.letter.writtenDate||dk(new Date(r.letter.writtenAt));}
function stampArt37(m){
  var leaf=function(x,y,side,size){return '<path d="M'+x+' '+y+'q'+(side*size*.6)+' '+(-size)+' '+(side*size)+' '+(-size*.6)+'q'+(-side*size*.15)+' '+(size*.7)+' '+(-side*size)+' '+(size*.6)+'" fill="#7C9F75"/>';};
  var art='<ellipse cx="60" cy="87" rx="39" ry="5" fill="#D2DAC0"/>';
  if(m===1||m===3){art+='<path d="M59 82Q61 60 57 42" fill="none" stroke="#587F61" stroke-width="3.5" stroke-linecap="round"/>'+leaf(59,61,1,30)+leaf(58,48,-1,25);if(m===1)art+='<circle cx="91" cy="25" r="9" fill="#E0C571" opacity=".8"/>';else art+='<path d="M60 76v14m0-7-15 9m15-5 13 9m-20-9-3 9m16-6 1 7" fill="none" stroke="#B39462" stroke-width="1.8" stroke-linecap="round"/><path d="M25 76Q60 69 95 76" fill="none" stroke="#CDBA91" stroke-width="1.4"/>';}
  else{var stems=m===6?[[57,21,5]]:[[36,34,4],[60,14,5],[83,29,4]];stems.forEach(function(s,i){art+='<path d="M'+s[0]+' 85Q'+(s[0]-5)+' 53 '+(s[0]+2)+' '+s[1]+'" fill="none" stroke="#587F66" stroke-width="'+s[2]+'" stroke-linecap="round"/>';for(var j=0;j<3;j++){var y=s[1]+14+j*17;art+='<path d="M'+(s[0]-3)+' '+y+'h6" stroke="#C4D4AD" stroke-width="1.8"/>';art+=leaf(s[0],y+5,(j+i)%2?-1:1,m===6?24:19);}});if(m===6)art+='<circle cx="89" cy="22" r="11" fill="#E0C571"/>';}
  return '<svg viewBox="0 0 120 100" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'+art+'</svg>';
}
function stampHTML37(m,small){var d=STAMP_CATALOG37[m];return '<div class="postage37 stamp-'+m+(small?' postage-small37':'')+'" aria-label="Tem '+esc(d.name)+'"><small>SHIN ROUTINE</small>'+stampArt37(m)+'<b>'+esc(d.name)+'</b><em>'+esc(d.caption)+'</em></div>';}
function envelopeSVG37(m){return '<svg viewBox="0 0 66 44" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x=".8" y=".8" width="64.4" height="42.4" rx="3" fill="#FFF9E9" stroke="#BEAA7B" stroke-width="1.6"/><path d="M2 2 33 25 64 2" fill="#F0EAD7" stroke="#C6B993" stroke-width="1"/><path d="m2 42 22-17m40 17L43 25" stroke="#D0C4A3" stroke-width="1"/><rect x="49" y="4" width="12" height="15" rx="1" fill="#E5EBCF" stroke="#A9A16B" stroke-dasharray="1.5 1"/>'+stampArt37(m).replace('<svg ','<svg x="49" y="6" width="12" height="11" ')+'<circle cx="33" cy="26" r="2.6" fill="#B39462" opacity=".55"/></svg>';}
function pendingStampRow37(){
  var pending=stampRecords37().filter(function(r){return !r.letter;});if(!pending.length)return '';var draft=pending.some(function(r){return !!String(r.draft||'').trim();}),first=pending[0];
  return '<button class="stamp-pending37" data-act="stampPending37">'+stampHTML37(first.milestone,true)+'<span><b>'+pending.length+' tem chờ lời nhắn</b><small>'+(draft?'Có lời nhắn đang viết dở.':'Dành vài dòng cho điều bạn trân quý.')+'</small></span>'+ic('arrow')+'</button>';
}
function letterList37(){var list=writtenLetters37().slice().sort(function(a,b){return b.letter.writtenAt.localeCompare(a.letter.writtenAt);});if(!list.length)return '';return '<details class="letter-list37"><summary>'+list.length+' lá thư trên cây</summary>'+list.map(function(r){return '<button data-act="letterRead37" data-v="'+r.milestone+'">'+envelopeSVG37(r.milestone)+'<span>'+esc(STAMP_CATALOG37[r.milestone].name)+'<time datetime="'+esc(r.letter.writtenAt)+'">'+treeDate30(letterDay37(r))+'</time></span>'+ic('arrow')+'</button>';}).join('')+'</details>';}
function openPendingStamps37(){
  syncTree();var pending=stampRecords37().filter(function(r){return !r.letter;});if(!pending.length)return;if(pending.length===1){openStamp37(pending[0].milestone,String(pending[0].draft||'').trim()?'compose':'gift');return;}
  openOv('<div class="sh__h"><b>Tem của bạn</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><div class="letter-content37 stamp-choices37">'+pending.map(function(r){return '<button class="stamp-pending37" data-act="stampOpen37" data-v="'+r.milestone+'">'+stampHTML37(r.milestone,true)+'<span><b>'+esc(STAMP_CATALOG37[r.milestone].name)+'</b><small>'+(String(r.draft||'').trim()?'Viết tiếp lời nhắn':'Mốc '+r.milestone+' thói quen đạt cấp 2')+'</small></span>'+ic('arrow')+'</button>';}).join('')+'</div>',true);$('.sheet',OV).classList.add('letter-sheet37');
}
function openStamp37(m,mode,habit){
  m=+m;var r=(S.stampLetters||{})[m];if(!r)return;var origin=NBOPEN?'notebook':'journey',scroll=window.scrollY;
  var oldToast=$('#toast');if(oldToast)oldToast.classList.remove('show');
  openOv('',true);LETTER_FLOW37={milestone:m,mode:r.letter?'read':mode==='compose'?'compose':'gift',habit:habit||null,origin:origin,scroll:scroll};$('.sheet',OV).classList.add('letter-sheet37');OV.setAttribute('aria-labelledby','letterTitle37');drawLetter37();
}
function drawLetter37(){
  var f=LETTER_FLOW37;if(!f||!OV)return;var m=f.milestone,r=S.stampLetters[m],d=STAMP_CATALOG37[m],mode=f.mode,body='';
  var title=mode==='read'?'Lá thư của bạn':mode==='compose'?'Một lời nhắn của bạn':mode==='sealing'?'Gấp lại một điều quý':'Một con tem dành cho bạn';
  if(mode==='gift')body='<div class="letter-gift37">'+stampHTML37(m)+'<h2>'+esc(d.name)+'</h2><p>'+esc(d.meaning)+'</p><p class="letter-invite37">Con tem đánh dấu mốc '+m+' thói quen đạt cấp 2.<br>Bạn muốn viết một lời nhắn để giữ lại không?</p><div class="letter-footer37"><button class="btn" data-act="letterCompose37">Viết một lời nhắn</button><button class="week-link" data-act="letterBack37">Để sau, giữ tem giúp mình</button></div></div>';
  else if(mode==='compose')body='<div class="letter-compose37"><div class="letter-stamp-heading37">'+stampHTML37(m,true)+'<div><b>'+esc(d.name)+'</b><small>'+esc(d.caption)+'</small></div></div><label class="lbl" for="letterText37">Lời nhắn của bạn</label><p class="letter-hint37" id="letterHint37">Gửi tôi ở tương lai, hoặc người quan trọng với mình…</p><textarea class="inp" id="letterText37" data-in="letterDraft37" rows="6" maxlength="1000" aria-describedby="letterHint37 letterError37" placeholder="Điều bạn muốn nhắn gửi hôm nay…">'+esc(r.draft||'')+'</textarea><p class="letter-error37" id="letterError37" role="alert" hidden></p><div class="letter-footer37"><button class="btn" data-act="letterSeal37"'+(String(r.draft||'').trim()?'':' disabled')+'>Gấp thư và treo lên cây</button><button class="week-link" data-act="letterBack37">Để mình viết sau</button></div></div>';
  else if(mode==='read'){body='<article class="letter-paper37"><div class="letter-read-head37">'+stampHTML37(m)+'<div><small>MỘT MỐC ĐÁNG NHỚ</small><p>'+m+' thói quen đạt cấp 2</p></div></div><p class="letter-meaning37">'+esc(d.meaning)+'</p><p class="letter-body37">'+esc(r.letter.body)+'</p><time class="letter-date37" datetime="'+esc(r.letter.writtenAt)+'">Viết ngày '+treeDate30(letterDay37(r))+'</time></article><div class="letter-footer37"><button class="week-link" data-act="letterBack37">Về cây thành tựu</button></div>';}
  else body='<div class="letter-fold37" role="status" aria-live="polite"><div class="letter-fold-paper37">'+stampArt37(m)+'<i></i><i></i><i></i></div><div class="letter-fold-envelope37">'+envelopeSVG37(m)+'</div><p>Giữ lại một điều có ý nghĩa.</p></div>';
  sheetSet('<div class="sh__h"><b id="letterTitle37">'+title+'</b><button class="x" data-act="letterBack37" aria-label="Đóng">'+ic('x')+'</button></div><div class="letter-content37">'+body+'</div>');
}
function stashLetterDraft37(now){
  var f=LETTER_FLOW37,input=$('#letterText37');if(!f||f.mode!=='compose'||!input)return;var r=(S.stampLetters||{})[f.milestone];if(!r||r.letter)return;r.draft=input.value.slice(0,1000);save(!!now);
}
function letterDraftInput37(){
  if(!LETTER_FLOW37||LETTER_FLOW37.mode!=='compose')return;stashLetterDraft37(false);var input=$('#letterText37'),button=$('[data-act="letterSeal37"]',OV),error=$('#letterError37');if(button)button.disabled=!input.value.trim();if(error)error.hidden=true;
}
function sealLetter37(){
  var f=LETTER_FLOW37;if(!f||f.mode!=='compose')return;var r=S.stampLetters[f.milestone],input=$('#letterText37'),text=input?input.value.trim():'',error=$('#letterError37');if(!r||r.letter)return;
  if(!text||text.length>1000){error.textContent='Viết một lời nhắn ngắn trước khi gấp thư nhé.';error.hidden=false;if(input)input.focus();return;}
  var written=new Date();r.letter={body:text,writtenAt:written.toISOString(),writtenDate:dk(written)};r.draft='';
  if(!save(true)){r.letter=null;r.draft=input.value.slice(0,1000);error.textContent='Chưa lưu được thư. Lời nhắn vẫn ở đây, bạn thử lại nhé.';error.hidden=false;return;}
  f.mode='sealing';drawLetter37();if(reduceMotion()){finishLetter37();return;}var overlay=OV;LETTER_TIMER37=setTimeout(function(){if(LETTER_FLOW37===f&&OV===overlay)finishLetter37();},1250);
}
function finishLetter37(){
  if(!LETTER_FLOW37)return;var m=LETTER_FLOW37.milestone;closeOv(true);LETTER_FRESH37=m;TREE_REPLAY34=false;PG=2;JOURNEY_TAB31='tree';render();window.scrollTo(0,0);toast('Lá thư đã có một chỗ trên cây.');setTimeout(function(){if(LETTER_FRESH37===m)LETTER_FRESH37=null;},1800);
}
function letterBack37(){
  var f=LETTER_FLOW37;if(!f)return;var habit=f.habit,origin=f.origin,scroll=f.scroll,sealed=f.mode==='sealing';closeOv(true);
  if(habit&&!sealed&&H(habit)){offerTier(habit);return;}if(origin==='notebook'&&!sealed){NBTAB='sum';openNb();return;}
  TREE_REPLAY34=false;PG=2;JOURNEY_TAB31='tree';render();window.scrollTo(0,scroll);
}
function treeLettersSVG37(stage,stems,sx,order,interactive){
  var slots=stage>=4?[[52,42],[192,23],[299,21],[364,76]]:stage===3?[[210,46],[63,225],[350,87]]:stage===2?[[138,80],[270,309]]:[[282,185]],branches='',tags='';
  writtenLetters37().forEach(function(r,i){var pos=slots[STAMP_MILESTONES37.indexOf(r.milestone)]||[85+i*80,310],x=pos[0],y=pos[1],st=stems.reduce(function(best,s){return Math.abs(s.x-x)<Math.abs(best.x-x)?s:best;},stems[0]),rootY=Math.min(324,Math.max(st.top+22,y+25)),rootX=sx(st,rootY),label='Đọc thư · '+STAMP_CATALOG37[r.milestone].name;
    branches+='<path d="M'+rootX.toFixed(1)+' '+rootY+'Q'+((rootX+x)/2).toFixed(1)+' '+(y-25)+' '+x+' '+(y-12)+'" fill="none" stroke="#91AA87" stroke-width="1.4" stroke-linecap="round"/>';
    tags+='<g class="tree-letter37'+(LETTER_FRESH37===r.milestone?' letter-fresh37':'')+'" style="transform-origin:'+x+'px '+(y-12)+'px;--tag-order34:'+(order+i)+'"'+(interactive?' role="button" tabindex="0" data-act="letterRead37" data-v="'+r.milestone+'" aria-label="'+esc(label)+'"':'')+'><title>'+esc(label)+'</title><rect class="letter-hit37" x="'+(x-34)+'" y="'+(y-18)+'" width="68" height="64" rx="8" fill="transparent"/><path d="M'+x+' '+(y-12)+'v12" stroke="#9B9273" stroke-width="1.2"/><g transform="translate('+(x-22)+' '+y+') rotate('+[-4,3,-3,4][i%4]+' 22 0)">'+envelopeSVG37(r.milestone).replace('<svg ','<svg width="44" height="29.33" ')+'</g></g>';
  });return {branches:branches,tags:tags};
}

;
/* ===== SECTION: app.js ===== */

/* =========================================================
   KAIZEN MỖI NGÀY · TQ02
   Một file HTML, dữ liệu lưu trong trình duyệt của từng máy.
   ========================================================= */
var APP_VER = 'M3.3.20';
var APP_NAME = 'Shin routine';
var KEY = 'shin-curriculum16-v1-data', KEY_DEMO = 'shin-curriculum16-v1-demo', KEY_MODE = 'shin-curriculum16-v1-mode';
var DEMO_CLASS = 'DEMO-KZ';
var MAX_ACTIVE = 5;
/* Ba cấp thẻ: số ngày cần làm ở mỗi cấp, người xác nhận để lên cấp tiếp theo */
var LV_NAME = ['', 'Tập sự', 'Làm quen', 'Vững tay'];
var LV_NEED = [0, 7, 14, 30];
var LV_NEED_D = [0, 3, 6, 12]; /* TQ20: nhịp “khi gặp dịp” đếm theo lần */
var LV_COL = ['', '#D39A6A', '#A7B3C6', '#F4B63B'];

/* Combo của chương trình: chỉ in trong nhật ký PDF cho thầy cô, không hiện cho học viên */
var COMBOS = {
 C01:'Chủ động chào hỏi', C02:'Tuân thủ kỷ luật', C03:'Xin lỗi và cảm ơn', C04:'Memo, ghi chép', C05:'Không để mình lo lắng, buồn rầu',
 C06:'Quan sát, thu thập thông tin', C07:'Không sợ việc khó', C08:'Suy nghĩ dài hạn', C09:'Tận dụng thời gian', C10:'Rèn luyện sức khỏe',
 C11:'Liên lạc, báo cáo, xác nhận', C12:'Tạo và giữ mối quan hệ', C13:'Giữ lời hứa', C14:'Sử dụng tiền', C15:'Tiết kiệm', C16:'Dám đặt câu hỏi',
 C17:'Dám đề xuất cải tiến', C18:'Quan tâm, giúp đỡ', C19:'Sở thích lành mạnh', C20:'Mạng xã hội có ích', C21:'Phân biệt tốt xấu', C22:'Phân biệt thật giả',
 C23:'Phối hợp trong công việc', C24:'Học hỏi, nâng cấp bản thân', C25:'Không vi phạm pháp luật, đạo đức'
};

var GROUPS = [
 {g:1, t:'Tác phong và kỷ luật', d:'Gợi ý Học phần 1'},
 {g:2, t:'Sức khỏe và làm chủ bản thân', d:'Gợi ý Học phần 2'},
 {g:3, t:'Học hỏi và tiến bộ', d:'Gợi ý Học phần 3'},
 {g:4, t:'Làm việc cùng người khác', d:'Gợi ý Học phần 4'}
];

var WHO_GEN = ['phiên bản tốt hơn của mình'];
var EV_GENERIC = {q:'Bạn làm ở đâu?', o:['Ở lớp','Ở ký túc xá','Ở nhà','Nơi khác']};

/* ---------- 20 hành động gốc ----------
   full:true  = có hướng dẫn đầy đủ (Phiên 2: cả nhóm 1)
   cond:true  = nhịp “khi gặp dịp”: tính theo số lần, có nút “Không gặp dịp” (TQ20)
   mk         = gợi ý cách tạo dịp (chữ mới, chờ duyệt) */
var HABITS = [
 /* ===== Nhóm 1 · Tác phong và kỷ luật ===== */
 {id:'chao', poem:['Chào trước một câu','Cười trước một lần','Người lạ thành thân','Việc gì cũng thuận'], kase:{t:'Được tiễn ra sân bay', s:'Một nhóm thực tập sinh lần nào đi siêu thị cũng lễ phép chào bác nhân viên và xếp lại hàng đúng chỗ. Ngày các bạn về nước, bác đóng cửa hàng sớm một tiếng để ra sân bay tiễn.', l:'Lời chào mỗi ngày là cách người Nhật nhớ đến bạn.'}, who:['người ai cũng muốn làm cùng', 'người tươi tắn, dễ gần'], g:1, s:'Chào hỏi', t:'Chào trước, cười trước', full:true, combos:['C01','C12','C18'],
  tiers:['Chào 1 người đầu tiên gặp ở trường: nhìn mắt, mỉm cười.','Chào trước ít nhất 3 người mỗi ngày, kèm cúi nhẹ.','Chào mọi người khi đến và khi về, nói trước rồi mới cúi.'],
  act:'chào 1 người, nhìn mắt, mỉm cười',
  anchors:['bước qua cổng trường','vào lớp','gặp người đầu tiên buổi sáng','về đến ký túc xá'],
  ev:{q:'Bạn chào ai?', o:['Thầy cô','Bạn bè','Bác bảo vệ, cô lao công','Người Nhật','Người mới gặp']},
  jp:{j:'おはようございます', r:'Ohayō gozaimasu', v:'Chào buổi sáng (lịch sự)'},
  why:{now:'Người được chào thường cười lại. Buổi sáng của cả hai nhẹ hơn ngay.', jp:'Lời chào là điều đầu tiên đồng nghiệp người Nhật nhìn thấy ở bạn.'},
  corner:'Ở xưởng mình, sáng nào tổ trưởng cũng nghe cách mọi người chào để biết ai khỏe, ai mệt. Người Nhật nói lời chào trước, rồi mới cúi (<span class="jp">語先後礼</span>).',
  steps:[['Dừng chân, nhìn mắt','Không vừa đi vừa chào.'],['Mỉm cười, nói lời chào','“Em chào thầy ạ!” hoặc おはようございます.'],['Nói xong mới cúi','Cúi từ hông khoảng 15°, lưng thẳng.']],
  ill:['gosen','bow'],
  dos:[['Chào trước','Đợi người kia chào'],['Giọng rõ, mặt tươi','Lí nhí, mắt nhìn điện thoại']],
  oops:['Vừa nói vừa cúi nên lời chào bị nuốt mất.','Gật đầu bằng cổ thay vì cúi từ hông.'],
  quiz:{sc:'Sáng sớm, bạn đang bưng thùng hàng thì gặp tổ trưởng người Nhật ở hành lang. Cách chào nào hợp nhất?',
        o:['Dừng lại, nhìn anh ấy, nói おはようございます rồi cúi nhẹ.','Đặt thùng xuống, cúi thật sâu 45° thật lâu rồi mới nói, vì cấp trên cần được chào kỹ nhất.','Gật đầu thật nhanh rồi đi tiếp, vì đang bận tay nên tổ trưởng sẽ hiểu.'], ok:0,
        ex:'Chào hằng ngày chỉ cần cúi khoảng 15°, nói trước rồi cúi. Cúi 45° dành cho lúc xin lỗi hay cảm ơn rất sâu sắc.'},
  prov:{j:'実るほど頭を垂れる稲穂かな', r:'Minoru hodo kōbe o tareru inaho kana', v:'Lúa càng chín, bông càng cúi đầu.'},
  quote:{q:'Lúc nào cũng phải cười.', by:'Thầy Lê Long Sơn'}},

 {id:'som', poem:['Sớm hơn năm phút','Không phải vội vàng','Ca làm sẵn sàng','Mọi việc nhẹ nhàng'], who:['người đúng giờ như người Nhật', 'người luôn sẵn sàng'], g:1, s:'Đúng giờ', t:'Có mặt trước 5 phút', full:true, combos:['C02','C13','C09'],
  tiers:['Có mặt ở lớp trước giờ học 5 phút.','Có mặt trước 15 phút, sách vở bày sẵn.','Có mặt trước 15–30 phút, sẵn sàng như vào ca ở Nhật.'],
  act:'ra khỏi phòng sớm hơn 5 phút', anchors:['chuông báo thức reo','ăn sáng xong','thay đồng phục xong'],
  ev:{q:'Bạn đến sớm ở đâu?', o:['Lớp học','Tập thể dục','Hẹn với bạn','Việc khác']},
  jp:{j:'五分前行動', r:'Gofun mae kōdō', v:'Hành động trước 5 phút'},
  why:{now:'Không phải chạy vội. Vào lớp bình tĩnh, nghe trọn bài.', jp:'Ở Nhật, đúng giờ là lúc đã sẵn sàng làm việc, không phải lúc bước qua cổng.'},
  corner:'Ở xưởng mình, 8 giờ vào ca nghĩa là 8 giờ đã đứng ở vị trí, đồng phục chỉnh tề. Ai 8 giờ mới thay đồ là đã trễ.',
  steps:[['Tối chuẩn bị sẵn','Đồng phục, sách vở, giày để một chỗ.'],['Dậy ngay khi báo thức','Không nằm nán thêm.'],['Ra khỏi phòng sớm 5 phút','So với giờ bạn hay đi.']],
  ill:['time'],
  dos:[['Chuẩn bị đồ từ tối','Sáng mới lục tìm đồ'],['Lỡ trễ thì báo trước','Trễ rồi im lặng đi vào']],
  oops:['Đến đúng giờ nhưng chưa sẵn sàng: còn tìm bút, đi vệ sinh.','Nghĩ “trễ 2 phút có sao đâu”.'],
  quiz:{sc:'Ca làm bắt đầu lúc 8:00. Ở xưởng Nhật, lúc nào mới được xem là đúng giờ?',
        o:['Đúng 8:00 bước qua cổng công ty, vì hợp đồng ghi 8:00 nên không ai trách được mình.','Khoảng 7:50 đã thay đồ xong, đứng ở vị trí làm việc.','8:05 đến nơi, rồi làm bù thêm 5 phút cuối ca là được.'], ok:1,
        ex:'Giờ bắt đầu là lúc bắt tay vào việc. Đến sớm để thay đồ, chuẩn bị: đó mới là đúng giờ kiểu Nhật.'},
  prov:{j:'早起きは三文の徳', r:'Hayaoki wa sanmon no toku', v:'Dậy sớm luôn có lợi.'}},

 {id:'memo', poem:['Một cuốn sổ nhỏ','Một dòng mỗi ngày','Lời dặn nằm đây','Chẳng phải hỏi lại'], who:['người không cần nhắc hai lần', 'người ham học hỏi'], g:1, s:'Memo', t:'Sổ memo luôn trong túi', full:true, combos:['C04','C06','C24'],
  tiers:['Ghi 1 dòng mỗi ngày: một lời dặn hoặc một từ mới.','Ghi lại mọi lời dặn của thầy cô, có ngày giờ.','Nhận việc là ghi: ai, việc gì, khi nào, lưu ý. Rồi đọc lại để xác nhận.'],
  act:'ghi 1 dòng vào sổ memo', anchors:['thầy cô dặn dò','học được một từ mới','tan học, trước khi đứng dậy'],
  ev:{q:'Bạn ghi gì?', o:['Lời dặn','Từ mới','Lịch hẹn','Ý tưởng']},
  jp:{j:'メモしてもよろしいですか', r:'Memo shitemo yoroshii desu ka', v:'Em ghi lại được không ạ?'},
  why:{now:'Không quên lời dặn, không phải hỏi lại lần hai.', jp:'Người mang sổ memo được tin là đang nghiêm túc lắng nghe.'},
  corner:'Ngày đầu, tổ trưởng chỉ việc mà mình không ghi, hôm sau phải hỏi lại. Tổ trưởng đưa mình một cuốn sổ nhỏ. Từ đó túi áo mình lúc nào cũng có sổ và bút.',
  steps:[['Sổ nhỏ vừa túi áo','Luôn kèm một cây bút.'],['Ghi từ khóa','Ai, việc gì, khi nào, lưu ý gì.'],['Đọc lại để xác nhận','“Em nhắc lại: …, đúng không ạ?”']],
  ill:['memo'],
  dos:[['Ghi từ khóa, viết tắt','Cố chép từng chữ'],['Đọc lại để xác nhận','Gật đầu nhưng chưa chắc']],
  oops:['Ghi vào giấy rời rồi làm mất.','Ghi xong không bao giờ mở ra đọc lại.'],
  quiz:{sc:'Tổ trưởng dặn nhanh 3 việc trong lúc đang bận. Bạn làm gì?',
        o:['Gật đầu và cố nhớ trong đầu, vì rút sổ ra lúc anh ấy bận sẽ làm mất thời gian của anh ấy.','Chờ lúc anh ấy rảnh, nhờ nhắn lại cả 3 việc qua tin nhắn cho chắc.','Rút sổ ghi từ khóa từng việc, rồi đọc lại để anh ấy xác nhận.'], ok:2,
        ex:'Ghi ngay và đọc lại chỉ mất vài giây, nhưng giúp cả hai chắc chắn hiểu đúng. Người Nhật rất quý việc xác nhận lại.'},
  prov:{j:'記憶より記録', r:'Kioku yori kiroku', v:'Ghi lại chắc hơn cố nhớ.'},
  quote:{q:'Mình phải viết nó ra thì lúc đó mình bắt đầu mới hình thành.', by:'Thầy Lê Long Sơn'}},

 {id:'5s', poem:['Dùng xong trả chỗ','Một phút mỗi ngày','Phòng gọn, bàn ngay','Lòng cũng nhẹ thay'], who:['người gọn gàng, chuyên nghiệp', 'người được tin giao việc'], g:1, s:'5S', t:'5S một phút', full:true, combos:['C02','C23','C13'],
  tiers:['Trước khi rời chỗ, cất 1 món về đúng chỗ của nó.','Dành 1 phút dọn bàn học hoặc giường, xếp giày mũi hướng ra.','5S góc của mình và cả chỗ dùng chung mỗi ngày.'],
  act:'dành 1 phút cất đồ về đúng chỗ',
  anchors:['đứng dậy rời bàn học','vừa thức dậy','về phòng và cởi giày','ăn xong'],
  ev:{q:'Bạn 5S ở đâu?', o:['Bàn học','Giường','Giày dép','Tủ đồ','Chỗ dùng chung']},
  jp:{j:'使ったら元の場所へ', r:'Tsukattara moto no basho e', v:'Dùng xong, trả về chỗ cũ'},
  why:{now:'Không mất công tìm đồ. Mở cửa phòng thấy dễ chịu ngay.', jp:'Ở xưởng Nhật, 5S là việc mỗi ngày. Chỗ gọn thì an toàn, ít lỗi.'},
  corner:'Ở ký túc xá bên này, giày để ở lối vào, mũi quay ra cửa. Ở xưởng mình, dụng cụ treo trên bảng có vẽ sẵn hình: thiếu món nào nhìn là biết.',
  steps:[['Sàng lọc','Bỏ rác, cất đồ không dùng.'],['Sắp xếp','Mỗi món về đúng chỗ của nó.'],['Sạch sẽ','Lau một lượt chỗ vừa dùng.']],
  ill:['desk','shoes'],
  dos:[['Dọn ngay khi xong việc','Để dồn cuối tuần'],['Mỗi món một chỗ cố định','Nhét hết vào túi cho khuất']],
  oops:['Chỉ dọn chỗ mình, bỏ qua chỗ dùng chung.','Dọn cho kịp chụp ảnh rồi lại bừa.'],
  quiz:{sc:'Bạn vừa học xong ở bàn chung của phòng. Cách 5S một phút nào đúng nhất?',
        o:['Để nguyên trên bàn, vì ca sau cũng học ở đây, dọn hai lần sẽ mất thời gian của cả hai người.','Gom hết đồ vào một túi lớn mang về giường, hôm nào rảnh thì phân loại sau.','Cất bút, sách về đúng chỗ, lau vết nước, đẩy ghế vào.'], ok:2,
        ex:'5S là trả mọi thứ về đúng chỗ ngay sau khi dùng. Gom vào túi chỉ là dời sự bừa bộn sang chỗ khác.'},
  prov:{j:'立つ鳥跡を濁さず', r:'Tatsu tori ato o nigosazu', v:'Chim bay đi, không làm đục nơi mình vừa ở.'}},

 {id:'camon', poem:['Cảm ơn việc nhỏ','Nói rõ điều gì','Hôm sau nhắc lại','Tình thân khắc ghi'], kase:{t:'Túi rau và đĩa cà tím', s:'Bác hàng xóm làm nông cho một bạn thực tập sinh túi rau thật lớn. Tuần sau, bạn nấu món cà tím nướng mang sang biếu. Bác rất vui.', l:'Được giúp thì đáp lại sớm. Một lon nước hay một mẩu giấy cảm ơn là đủ.'}, who:['người biết ơn', 'người ai cũng quý'], g:1, s:'Cảm ơn', t:'Cảm ơn chân thành', full:true, combos:['C03','C12','C18'],
  tiers:['Cảm ơn kèm một việc cụ thể với 1 người mỗi ngày.','Cảm ơn cả việc nhỏ: bác bảo vệ, cô nấu ăn, bạn cho mượn bút.','Hôm sau cảm ơn thêm lần nữa: “Hôm qua cảm ơn anh đã…”.'],
  act:'nói cảm ơn kèm một việc cụ thể', anchors:['ai đó giúp mình','nhận cơm ở căng tin','gặp lại người đã giúp mình hôm qua'],
  ev:{q:'Bạn cảm ơn ai?', o:['Thầy cô','Bạn bè','Cô nấu ăn, bác bảo vệ','Người nhà']},
  jp:{j:'昨日はありがとうございました', r:'Kinō wa arigatō gozaimashita', v:'Cảm ơn anh chị về chuyện hôm qua'},
  why:{now:'Người được cảm ơn thấy vui, lần sau sẵn lòng giúp bạn hơn.', jp:'Ở Nhật, hôm sau gặp lại người đã giúp mình, người ta cảm ơn thêm một lần.'},
  corner:'Lần đầu mình nói <span class="jp">昨日はありがとうございました</span> với chị tổ phó, chị cười rất tươi. Từ hôm đó chị hay chỉ thêm việc cho mình.',
  steps:[['Nhìn người đó, mỉm cười','Đừng nói khi mắt đang nhìn chỗ khác.'],['Cảm ơn kèm việc cụ thể','“Cảm ơn bạn cho mình mượn bút.”'],['Hôm sau cảm ơn thêm','Một câu ngắn là đủ.']],
  ill:['thanks'],
  dos:[['Cảm ơn kèm việc cụ thể','“Cảm ơn” cho có'],['Cảm ơn cả việc nhỏ','Coi việc người khác giúp là đương nhiên']],
  oops:['Chỉ cảm ơn người lớn hơn, quên bạn bè, cô nấu ăn.','Nhắn “tks” thay cho lời nói trực tiếp.'],
  quiz:{sc:'Hôm qua chị senpai ở lại 15 phút chỉ bạn dùng máy. Sáng nay gặp chị, bạn nói gì?',
        o:['Chào chị, rồi nói: “Hôm qua cảm ơn chị đã chỉ em ạ.”','Chỉ chào bình thường, vì hôm qua cảm ơn rồi, nhắc lại sợ chị nghĩ mình khách sáo.','Mua tặng chị hộp bánh để trả ơn, khỏi cần nói thêm gì.'], ok:0,
        ex:'Cảm ơn lại vào hôm sau cho thấy bạn còn nhớ lòng tốt của người ta. Quà không thay được một lời cảm ơn trực tiếp.'},
  prov:{j:'情けは人の為ならず', r:'Nasake wa hito no tame narazu', v:'Tử tế với người, điều tốt sẽ quay về mình.'}},

 {id:'xinloi', poem:['Sai thì nhận ngay','Bỏ câu “tại vì”','Nói rõ sửa gì','Niềm tin quay về'], who:['người dám nhận trách nhiệm', 'người được tin lại'], g:1, s:'Nhận lỗi', t:'Nhận lỗi, không viện cớ', full:true, cond:true, mk:'Tối nay nhìn lại một việc hôm nay mình có thể làm tốt hơn. Nếu có, nói với người liên quan một câu ngắn.', combos:['C03','C13','C21','C25'],
  tiers:['Khi sai, nói “Em xin lỗi” trước, không mở đầu bằng “tại vì”.','Xin lỗi xong nói luôn một việc mình sẽ làm để sửa.','Ghi lỗi vào memo và không để lặp lại lần thứ hai.'],
  act:'xin lỗi trước, rồi nói cách sửa', anchors:['mình làm sai hoặc đến trễ','được nhắc là quên việc','làm phiền người khác'],
  ev:{q:'Bạn nhận lỗi về việc gì?', o:['Đến trễ','Quên việc','Làm sai','Làm phiền người khác']},
  jp:{j:'申し訳ありません', r:'Mōshiwake arimasen', v:'Tôi thành thật xin lỗi'},
  why:{now:'Xin lỗi gọn thì chuyện khép lại nhanh, người kia bớt bực ngay.', jp:'Ở Nhật, viện cớ (言い訳) làm mất điểm hơn cả lỗi. Nhận lỗi và sửa thì được tin lại.'},
  corner:'Có lần mình làm sai, câu đầu tiên mình nói là “tại máy…”. Tổ trưởng im lặng. Hôm sau mình nói “Em xin lỗi, em sẽ kiểm lại hai lần”, tổ trưởng gật đầu ngay.',
  steps:[['Xin lỗi trước tiên','“Em xin lỗi”, nhìn người đó, cúi nhẹ.'],['Nói mình sai ở đâu','Ngắn, không vòng vo.'],['Nói sẽ sửa thế nào','Rồi ghi vào memo để không lặp lại.']],
  ill:['sorry'],
  dos:[['Xin lỗi trước, lý do để sau','Mở đầu bằng “Tại vì…”'],['Nói rõ sẽ sửa thế nào','Xin lỗi xong rồi để đó']],
  oops:['Xin lỗi nhưng giọng miễn cưỡng.','Đổ lỗi cho người khác hoặc cho máy móc.'],
  quiz:{sc:'Bạn vào lớp trễ 10 phút vì xe buýt kẹt. Câu nào hợp nhất?',
        o:['Tại xe buýt kẹt quá thầy ạ, em đã cố hết sức rồi, thật sự không phải lỗi của em.','Em xin lỗi vì đến trễ. Lần sau em sẽ đi sớm hơn 15 phút.','Lặng lẽ vào chỗ cho khỏi làm phiền lớp, cuối giờ giải thích sau.'], ok:1,
        ex:'Xin lỗi trước, nói cách sửa. Lý do chỉ nói ngắn nếu thầy cô hỏi. Lặng lẽ vào chỗ dễ bị hiểu là bạn không để ý mình đã trễ.'},
  prov:{j:'失敗は成功のもと', r:'Shippai wa seikō no moto', v:'Thất bại là mẹ thành công.'}},

 {id:'loihua', poem:['Hứa nhỏ mỗi sáng','Tối giữ cho xong','Chữ tín trong lòng','Lớn lên từng ngày'], who:['người giữ chữ tín', 'người tin được chính mình'], g:1, s:'Lời hứa', t:'Giữ lời hứa với chính mình', full:true, combos:['C02','C13','C08'],
  tiers:['Sáng hứa với mình 1 việc nhỏ, tối làm xong.','Đặt 1 quy tắc nhỏ cho bản thân và giữ đủ 7 ngày.','Việc đã nhận thì làm đúng hạn, không cần ai nhắc.'],
  act:'viết 1 lời hứa nhỏ cho hôm nay', anchors:['đánh răng buổi sáng','mở điện thoại lần đầu trong ngày','ngồi vào bàn học'],
  ev:{q:'Bạn đã giữ lời về việc gì?', o:['Học bài','Vận động','Dọn dẹp','Việc khác']},
  jp:{j:'有言実行', r:'Yūgen jikkō', v:'Đã nói là làm'},
  why:{now:'Mỗi lời hứa nhỏ giữ được, bạn tin mình hơn một chút.', jp:'Ở Nhật, việc đã nhận thì làm đúng hạn, không cần ai nhắc. Đó là chữ tín.'},
  corner:'Mình tập từ việc nhỏ: hứa mỗi tối học 10 từ. Giữ được một tháng, mình mới dám nhận lời “thứ Sáu em nộp báo cáo”, và nộp đúng hạn.',
  steps:[['Sáng: hứa 1 việc nhỏ','Cụ thể, đo được: “đọc 2 trang”.'],['Gắn vào một lúc có sẵn','Ví dụ: ngay sau bữa tối.'],['Chưa giữ được thì hứa nhỏ hơn','Đừng hứa to hơn để bù.']],
  ill:['promise'],
  dos:[['Hứa nhỏ, cụ thể','Hứa mơ hồ: “học chăm”'],['Viết lời hứa ra','Hứa trong đầu rồi quên']],
  oops:['Hứa quá sức nên ngày nào cũng thất hứa.','Lỡ một ngày rồi bỏ luôn.'],
  quiz:{sc:'Tối qua bạn hứa học 50 từ nhưng chỉ học được 10. Hôm nay hứa thế nào?',
        o:['Hứa học 90 từ để bù cho 40 từ còn thiếu hôm qua, vậy mới đúng là giữ lời.','Thôi không hứa nữa, học được bao nhiêu thì học cho đỡ áp lực.','Hứa học 15 từ, vừa sức để chắc chắn giữ được.'], ok:2,
        ex:'Giữ được lời mới là điều quan trọng. Hứa vừa sức rồi tăng dần, bạn sẽ tin vào lời mình hơn.'},
  prov:{j:'千里の道も一歩から', r:'Senri no michi mo ippo kara', v:'Đường nghìn dặm bắt đầu từ một bước.'},
  quote:{q:'Chữ tín là đơn vị có giá trị hoán đổi cao nhất trong cuộc sống mỗi người.', by:'Thầy Lê Long Sơn'}},

 /* ===== Nhóm 2 · Sức khỏe và làm chủ bản thân (bản nháp) ===== */
 {id:'5phut', who:['người không phí thời gian', 'người tiến bộ mỗi ngày'], g:2, s:'5 phút chờ', t:'Tận dụng 5 phút chờ', combos:['C09','C20','C24'],
  tiers:['Khi phải chờ, ôn 5 từ vựng.','Ba lần “5 phút học” mỗi ngày.','Luôn có sẵn một việc học nhỏ trong túi.'],
  act:'mở 5 từ vựng ra ôn', anchors:['đứng chờ xe','xếp hàng lấy cơm','đến lớp sớm, chờ vào học'],
  jp:{j:'塵も積もれば山となる', r:'Chiri mo tsumoreba yama to naru', v:'Bụi gom lại cũng thành núi'}},
 {id:'gopy', who:['người tiến bộ nhanh', 'người biết lắng nghe'], g:2, s:'Nghe góp ý', t:'Nhận góp ý không nóng', cond:true, mk:'Chủ động xin một góp ý: “Hôm nay em làm gì chưa tốt ạ?”', combos:['C05','C04','C21'],
  tiers:['Khi được góp ý, nói “Dạ, em hiểu rồi” trước tiên.','Ghi 1 ý cần sửa vào memo trước khi giải thích.','Hôm sau báo lại với người góp ý: mình đã sửa thế nào.'],
  act:'nói “Dạ, em hiểu rồi”, ghi 1 ý cần sửa', anchors:['thầy cô hoặc bạn góp ý cho mình','thấy mặt mình nóng lên'],
  jp:{j:'はい、わかりました。気をつけます', r:'Hai, wakarimashita. Ki o tsukemasu', v:'Dạ, em hiểu rồi. Em sẽ chú ý.'}},
 {id:'camxuc', who:['người bình tĩnh', 'người làm chủ cảm xúc'], g:2, s:'Cảm xúc', t:'Gọi tên cảm xúc', combos:['C05','C19','C21'],
  tiers:['Khi thấy bực hay buồn, hít 3 hơi, nói thầm “Mình đang thấy…”.','Ghi 1 dòng: cảm xúc gì, vì sao, mình chọn làm gì.','Chọn cách phản ứng bình tĩnh ngay tại chỗ.'],
  act:'hít 3 hơi và gọi tên cảm xúc của mình', anchors:['thấy mình bắt đầu bực','nhận tin không vui','sắp trả lời tin nhắn lúc đang giận'],
  jp:{j:'落ち着いて', r:'Ochitsuite', v:'Bình tĩnh nào'}},
 {id:'vandong', who:['người khỏe, đủ sức làm việc ở Nhật', 'người năng động'], g:2, s:'Vận động', t:'Vận động mỗi ngày', combos:['C10','C19','C02'],
  tiers:['10 cái squat ngay sau khi thức dậy.','15 phút đi bộ, chạy hoặc chơi thể thao.','30 phút mỗi ngày, có một môn chơi cùng bạn.'],
  act:'làm 10 cái squat', anchors:['vừa thức dậy','thay đồ sau giờ học','trước khi tắm tối'],
  jp:{j:'体が資本', r:'Karada ga shihon', v:'Sức khỏe là vốn liếng'}},
 {id:'anuong', who:['người biết chăm sóc bản thân'], g:2, s:'Ăn uống', t:'Ăn đủ, uống đủ', combos:['C10','C15','C19'],
  tiers:['Uống 1 ly nước ngay khi thức dậy.','Ăn sáng mỗi ngày, bữa chính có rau.','Tự nấu cơm hộp vài bữa mỗi tuần.'],
  act:'uống 1 ly nước', anchors:['vừa thức dậy','ngồi vào bàn ăn','đổ đầy bình nước buổi sáng'],
  jp:{j:'いただきます', r:'Itadakimasu', v:'Lời nói trước bữa ăn'}},
 {id:'ngu', who:['người tỉnh táo mỗi sáng'], g:2, s:'Ngủ sớm', t:'Ngủ trước 23 giờ', combos:['C10','C20','C09'],
  tiers:['Đánh răng tối xong, để điện thoại xa giường.','Tắt màn hình trước 22 giờ 30.','Ngủ và dậy cùng một giờ, kể cả cuối tuần.'],
  act:'cắm sạc điện thoại xa giường', anchors:['đánh răng buổi tối','đồng hồ chỉ 22 giờ 30'],
  jp:{j:'早寝早起き', r:'Hayane hayaoki', v:'Ngủ sớm, dậy sớm'}},
 {id:'bot', who:['người làm chủ thời gian'], g:2, s:'Giảm dần', t:'Giảm dần một thói quen chưa tốt', pickBad:true, combos:['C20','C09','C05','C22'],
  tiers:['Khi muốn bắt đầu thói quen đó, đổi bằng 1 việc thay thế 5 phút.','Mỗi tuần bớt thời gian cho thói quen đó thêm một chút.','Tự đặt giới hạn và giữ được giới hạn ấy.'],
  act:'đổi bằng 1 việc thay thế trong 5 phút', anchors:['muốn mở game hoặc mạng xã hội','đã 22 giờ 30 tối','định để việc lại sau'],
  jp:{j:'少しずつ', r:'Sukoshi zutsu', v:'Từng chút một'}},
 {id:'chitieu', who:['người dùng tiền có kế hoạch'], g:2, s:'Chi tiêu', t:'Ghi 1 dòng chi tiêu', combos:['C14','C15','C08'],
  tiers:['Tối ghi 1 dòng: hôm nay mình chi gì.','Muốn mua món không cần thiết thì chờ 1 ngày.','Lập ngân sách tuần, để dành trước rồi mới tiêu.'],
  act:'ghi 1 dòng chi tiêu trong ngày', anchors:['check-in tối','vừa trả tiền xong'],
  jp:{j:'節約', r:'Setsuyaku', v:'Tiết kiệm'}},

 /* ===== Nhóm 3 · Học hỏi và tiến bộ (bản nháp) ===== */
 {id:'tiengnhat', who:['người tự tin nói tiếng Nhật'], g:3, s:'Tiếng Nhật', t:'Mạnh dạn nói tiếng Nhật', combos:['C07','C24','C12'],
  tiers:['Nói 1 câu tiếng Nhật với thầy cô hoặc bạn mỗi ngày.','Hỏi 1 câu bằng tiếng Nhật mỗi ngày.','Báo cáo ngắn một việc bằng tiếng Nhật.'],
  act:'nói 1 câu tiếng Nhật', anchors:['gặp thầy cô tiếng Nhật','chào bạn cùng phòng buổi sáng','xin phép vào lớp'],
  jp:{j:'日本語で話してもいいですか', r:'Nihongo de hanashitemo ii desu ka', v:'Mình nói bằng tiếng Nhật được không?'},
  quote:{q:'Một câu nói lên 2, 30 lần. Nó mới vô được tiềm thức.', by:'Thầy Lê Long Sơn'}},
 {id:'quansat', who:['người tinh ý, hiểu chuyện'], g:3, s:'Quan sát', t:'Quan sát và hỏi 1 câu', combos:['C06','C16','C22','C24'],
  tiers:['Ghi 1 điều mình để ý thấy hôm nay.','Hỏi thêm 1 câu “tại sao” về điều đó.','Kiểm chứng một tin trước khi tin hoặc chia sẻ.'],
  act:'ghi 1 điều mình để ý thấy', anchors:['đi từ lớp về ký túc xá','đọc một tin trên mạng','check-in tối'],
  jp:{j:'質問してもよろしいですか', r:'Shitsumon shitemo yoroshii desu ka', v:'Em hỏi một câu được không ạ?'}},
 {id:'viecko', wk:1, cond:true, mk:'Chọn một việc mình hơi ngại và nói: “Em xin làm việc này ạ.”', who:['người không ngại khó'], g:3, s:'Việc khó', t:'Xung phong việc khó', combos:['C07','C17','C08'],
  tiers:['Mỗi tuần nhận 1 việc mình hơi ngại.','Làm việc đó tới cùng, không bỏ dở.','Đề xuất 1 cải tiến nhỏ cho lớp hoặc phòng.'],
  act:'giơ tay nhận 1 việc mình hơi ngại', anchors:['thầy cô hỏi “ai làm?”','lớp phân công trực nhật'],
  jp:{j:'やってみます', r:'Yatte mimasu', v:'Em sẽ thử làm'},
  quote:{q:'Thử thách chính là người thầy vĩ đại của cuộc đời mỗi người.', by:'Thầy Lê Long Sơn'}},

 /* ===== Nhóm 4 · Làm việc cùng người khác (bản nháp) ===== */
 {id:'horenso', cond:true, mk:'Báo một việc nhỏ cho thầy cô hoặc tổ trưởng: “Em xin báo, việc … đã xong ạ.”', who:['người làm việc chuyên nghiệp'], g:4, s:'Hō-Ren-Sō', t:'Hō-Ren-Sō: báo, liên, bàn', combos:['C11','C23','C13'],
  tiers:['Xong việc được giao, báo lại 1 câu.','Có thay đổi thì liên lạc ngay; chưa chắc thì hỏi.','Báo cáo kết luận trước, lý do sau.'],
  act:'báo lại 1 câu với người giao việc', anchors:['làm xong việc được giao','thấy kế hoạch bị thay đổi','chưa chắc mình hiểu đúng'],
  jp:{j:'報告します', r:'Hōkoku shimasu', v:'Em xin báo cáo'}},
 {id:'giup', wk:2, cond:true, mk:'Hỏi một câu: “Bạn cần mình giúp gì không?”', who:['người đồng đội tốt'], g:4, s:'Giúp 1 việc', t:'Xong việc mình, giúp 1 việc', combos:['C18','C12','C23','C21'],
  tiers:['Làm xong phần mình rồi hỏi “Có cần mình giúp không?”.','Để ý ai đang cần giúp trước khi họ nhờ.','Làm phần việc chung không cần ai nhắc.'],
  act:'hỏi “Có cần mình giúp không?”', anchors:['làm xong phần việc của mình','thấy bạn đang bưng vác','trực nhật xong'],
  jp:{j:'何か手伝いましょうか', r:'Nanika tetsudaimashō ka', v:'Mình giúp gì được không?'}}
];

/* =========================================================
   N2 · NỘI DUNG THẺ NHÓM 2–4 (đợt 1: 5 thẻ nhóm 2)
   Cách làm 4 thẻ: Vì sao (Shin hỏi, Senpai kể) · Các bước · Thực tập · Ghi nhớ
   Senpai là nhân vật hư cấu; chuyện dựa trên tài liệu Myway, biên bản case study (đã ẩn danh).
   kase = chuyện thật tích cực, nhãn “CHUYỆN TRƯỚC ĐÂY”.
   ========================================================= */
var N2 = {
 '5phut':{full:true,
  poem:['Năm phút chờ xe','Năm từ ôn lại','Ngày ngày chẳng ngại','Bụi thành núi cao'],
  why:{now:'Không cần ngồi học thật lâu mới tiến bộ. Ba lần chờ trong ngày, mỗi lần 5 từ, là 15 từ.', jp:'Ở Nhật, nhiều người tranh thủ lúc đi tàu, lúc chờ để đọc, để học.'},
  corner:'Hồi ở trường, chiều nào mình cũng đi làm thêm, tối về chỉ còn sức học một chút. Mình gom mấy lúc chờ trong ngày, mỗi lúc 5 từ. Cuối tuần đếm lại, nhiều hơn mình tưởng.',
  dlg:[['shin','think','Lịch học dày, chiều còn đi làm thêm. Lấy đâu ra thời gian học hả chị?'],
       ['s','smile','Hồi đó chị cũng nghĩ vậy. Rồi chị để ý: chờ xe, chờ đến lượt làm hồ sơ, chờ vào lớp… ngày nào cũng có mấy lần 5 phút.'],
       ['shin','wow','Năm phút thì học được gì chị?'],
       ['s','hi','Năm từ. Ba lần là 15 từ một ngày. Sang Nhật chị vẫn giữ: giờ nghỉ là nói vài câu với cô chú người Nhật. Tiếng Nhật lên lúc nào không hay.']],
  steps:[['Chuẩn bị sẵn từ tối','Chọn 5 từ vựng trong sổ hoặc ứng dụng.'],['Nhận ra lúc chờ','Chờ xe, chờ đến lượt, chờ vào lớp.'],['Mở ra học ngay','Học xong 5 từ rồi mới lướt điện thoại.']],
  dos:[['Chuẩn bị 5 từ từ tối','Lúc chờ mới đi tìm bài'],['Học xong rồi mới lướt','Lướt trước, “học sau”']],
  oops:['Mở điện thoại định học nhưng lại vào mạng xã hội.','Đặt việc quá to cho 5 phút, làm không xong nên chán.'],
  ev:{q:'Bạn tận dụng lúc nào?', o:['Chờ xe','Chờ vào lớp','Chờ làm hồ sơ','Giờ nghỉ làm thêm','Lúc khác']},
  quiz:{sc:'Còn 5 phút mới vào lớp. Bạn làm gì?', o:['Lướt mạng xã hội cho đỡ chán.','Ôn 5 từ đã chuẩn bị sẵn.','Ngồi nghỉ, để dành sức.'], ok:1, ex:'Năm phút đủ cho 5 từ. Gom nhiều lần 5 phút, vốn từ tăng rõ rệt.'},
  prov:{j:'塵も積もれば山となる', r:'Chiri mo tsumoreba yama to naru', v:'Bụi gom lại cũng thành núi.'},
  jp:{j:'すきま時間', r:'Sukima jikan', v:'Khoảng thời gian trống xen giữa các việc'}},
 gopy:{full:true,
  poem:['Lời góp hơi đau','Nghe xong chưa cãi','Ghi lại chỗ sai','Mai mình giỏi hơn'],
  why:{now:'Được góp ý là được chỉ đường tắt. Người góp ý đã bỏ công nhìn kỹ việc của mình.', jp:'Ở chỗ làm Nhật, góp ý là một phần công việc của tổ trưởng. Người nghe rồi sửa được giao việc nhiều hơn.'},
  corner:'Lúc mới sang Nhật, mình còn trẻ con lắm, ai góp ý là thấy khó chịu. Làm lâu mới hiểu: họ muốn tốt cho mình, và đó cũng là trách nhiệm của họ.',
  dlg:[['shin','worry','Bị nhắc trước cả lớp, mặt em nóng bừng. Em muốn giải thích ngay…'],
       ['s','smile','Chị hiểu mà. Lúc mới sang Nhật, ai góp ý là chị thấy khó chịu, có lúc còn cãi lại.'],
       ['shin','think','Rồi sao chị đổi được?'],
       ['s','hi','Chị tập nói “Dạ, em hiểu rồi” trước, ghi lại một ý, giải thích để sau. Dần dần chị thấy người góp ý muốn tốt cho mình. Đó cũng là trách nhiệm của họ.']],
  steps:[['Dừng tay, nhìn người nói','Không vừa làm vừa nghe.'],['Nghe hết, nói “Dạ, em hiểu rồi”','Chưa vội giải thích.'],['Ghi 1 ý cần sửa','Hôm sau báo lại mình đã sửa thế nào.']],
  dos:[['Nghe hết rồi mới hỏi lại','Ngắt lời để giải thích'],['Cảm ơn người góp ý','Mặt nặng, im lặng bỏ đi']],
  oops:['Vội giải thích nên người nghe tưởng mình viện cớ.','Nói “Dạ” nhưng không ghi, hôm sau lặp lại lỗi cũ.'],
  safe:'Góp ý là nói về việc làm. Nếu bị xúc phạm, bị đánh hay bị đe dọa thì đó không phải góp ý. Hãy báo ngay cho thầy cô hoặc người phụ trách. Ở Nhật, báo nghiệp đoàn, công ty phái cử; OTIT có tư vấn bằng tiếng Việt.',
  ev:{q:'Ai góp ý cho bạn?', o:['Thầy cô người Việt','Thầy cô người Nhật','Bạn bè','Người ở chỗ làm thêm']},
  quiz:{sc:'Thầy nhắc bạn trước lớp: “Em nói nhỏ quá.” Bạn làm gì?', o:['Giải thích ngay: “Tại em đau họng ạ.”','Nói “Dạ, em hiểu rồi”, rồi nói to hơn.','Im lặng, buổi sau ngồi cuối lớp.'], ok:1, ex:'Nhận trước, sửa ngay. Nếu có lý do thật, nói riêng sau giờ học.'},
  prov:{j:'良薬は口に苦し', r:'Ryōyaku wa kuchi ni nigashi', v:'Thuốc đắng dã tật.'}},
 camxuc:{full:true,
  poem:['Lòng đang dậy sóng','Thở chậm ba hơi','Gọi tên được rồi','Sóng lặng dần thôi'],
  why:{now:'Gọi được tên, cảm xúc thường dịu xuống. Bạn có thêm vài giây để chọn cách phản ứng, không lỡ lời rồi hối hận.', jp:'Ở chỗ làm Nhật, người giữ được bình tĩnh lúc bận rộn hay bị nhắc nhở được tin giao việc khó.'},
  corner:'Có hôm mình nhận tin nhà có chuyện buồn đúng giờ làm. Mình ra chỗ rửa tay, thở chậm, nói thầm “mình đang lo”. Vài phút sau quay lại, tay chân vững hơn.',
  kase:{t:'Người cả xưởng gọi là “bố”', s:'Một anh thực tập sinh tự nhận mình nóng tính. Ở xưởng có một bác người Nhật cũng nóng tính, nhưng khi người khác làm sai, bác không quát mà luôn kìm lại được. Anh học theo bác sự bình tĩnh và khiêm tốn. Cả xưởng gọi bác là “bố”.', l:'Nóng tính không sao. Quan trọng là kìm lại được trước khi nói.'},
  dlg:[['shin','worry','Bạn cùng phòng bật nhạc to lúc em đang học. Em bực lắm, muốn nói cho ra lẽ!'],
       ['s','smile','Anh cũng nóng tính lắm. Ở xưởng có một bác người Nhật cũng vậy, mà chưa bao giờ quát ai.'],
       ['shin','think','Sao bác làm được hay vậy anh?'],
       ['s','hi','Bác dừng lại vài giây rồi mới nói. Anh tập theo: thở 3 hơi, nói thầm “mình đang bực”. Dịu xuống rồi mới nhờ bạn vặn nhỏ nhạc.']],
  steps:[['Nhận ra dấu hiệu','Mặt nóng, tim đập nhanh, muốn nói ngay.'],['Thở chậm 3 hơi','Hít bằng mũi, thở ra dài.'],['Gọi tên, rồi mới chọn','“Mình đang bực.” Sau đó mới nói hoặc làm.']],
  dos:[['Nói thầm “mình đang bực”','Nói ngay lúc đang nóng'],['Nguôi rồi mới nhắn tin','Nhắn tin lúc đang giận']],
  oops:['Gõ tin nhắn lúc giận rồi gửi luôn.','Nghĩ bình tĩnh là phải nén, không được buồn.'],
  safe:'Nếu buồn hay lo kéo dài nhiều ngày, hãy nói với thầy cô hoặc người bạn tin. Nhờ giúp đỡ cũng là một kỹ năng.',
  ev:{q:'Bạn gọi tên cảm xúc nào?', o:['Bực','Buồn','Lo','Mệt','Vui']},
  quiz:{sc:'Bạn vừa đọc một tin nhắn làm bạn rất bực. Bạn làm gì trước?', o:['Trả lời ngay cho ra lẽ.','Thở 3 hơi, nói thầm “mình đang bực”.','Đăng lên mạng kể với bạn bè.'], ok:1, ex:'Vài giây gọi tên cảm xúc giúp bạn tránh nói điều làm mình hối hận.'},
  prov:{j:'短気は損気', r:'Tanki wa sonki', v:'Nóng nảy thì chịu thiệt.'}},
 vandong:{full:true,
  poem:['Sáng ra vươn vai','Đứng ngồi mười lượt','Ngày ngày đều được','Sức khỏe vững vàng'],
  why:{now:'Vận động một chút mỗi ngày giúp ngồi học 4 tiết đỡ mỏi, tối ngủ ngon hơn.', jp:'Nhiều công việc ở Nhật phải đứng cả ca, mang vác nặng. Có sức khỏe là đã chuẩn bị được một nửa.'},
  corner:'Từ hồi ở Việt Nam, mình đã tập thể dục đều. Sang Nhật làm ngành thực phẩm, đứng cả ca mà thấy không mấy vất vả. Sức khỏe là thứ mình chuẩn bị trước được.',
  dlg:[['shin','think','Học 4 tiết, chiều đi làm thêm, tối học bài. Em không có thời gian tập thể dục…'],
       ['s','smile','Nhiều bạn cũng nói vậy. Nhưng 10 cái squat chỉ mất một phút thôi em.'],
       ['shin','wow','Một phút thì có ích gì hả chị?'],
       ['s','hi','Ở Nhật chị đứng cả ca. Bạn nào ở Việt Nam tập đều thì sang thấy nhẹ hơn nhiều. Bắt đầu từ một phút, rồi tăng dần.']],
  steps:[['Đứng rộng bằng vai','Hai tay đưa ra trước để giữ thăng bằng.'],['Ngồi xuống như ngồi ghế','Lưng thẳng, gối không vượt quá mũi chân.'],['Đứng lên, đếm 1','Làm đủ 10 lần, thở đều.']],
  dos:[['Tập ít mà đều mỗi ngày','Dồn tập thật nhiều một hôm'],['Uống nước sau khi tập','Tập ngay sau khi ăn no']],
  oops:['Gập lưng, cúi người về trước khi ngồi xuống.','Đang đau gối mà vẫn cố tập cho đủ số.'],
  safe:'Nếu đau khớp hoặc chóng mặt, dừng lại và hỏi thầy cô Giáo dục thể chất.',
  ev:{q:'Bạn vận động thế nào?', o:['Squat','Đi bộ','Chạy','Đá bóng, cầu lông','Giãn cơ']},
  quiz:{sc:'Sáng nay bạn chỉ có 1 phút. Làm gì để giữ thói quen?', o:['Bỏ hôm nay, mai tập gấp đôi.','Làm 10 cái squat rồi đi học.','Đợi cuối tuần tập một lần thật lâu.'], ok:1, ex:'Một phút mỗi ngày giữ được nhịp. Có thời gian thì tăng dần.'},
  prov:{j:'継続は力なり', r:'Keizoku wa chikara nari', v:'Bền bỉ chính là sức mạnh.'}},
 anuong:{full:true,
  poem:['Sáng một ly nước','Bữa có thêm rau','Thân khỏe dài lâu','Học làm vững chãi'],
  why:{now:'Uống đủ nước, ăn đủ bữa giúp bạn tỉnh táo trong giờ học, không đuối sức khi làm thêm.', jp:'Sang Nhật, nhiều bạn phải tự nấu ăn. Quen ăn uống điều độ từ bây giờ thì khỏe hơn và đỡ tốn tiền ăn ngoài.'},
  corner:'Ở Nhật có thời gian mình tăng ca đến 8, 9 giờ tối. Về đến nhà mình nấu bữa tối, nấu luôn phần cơm cho ngày mai. Vừa đủ chất, vừa tiết kiệm.',
  dlg:[['shin','think','Sáng em hay bỏ bữa cho kịp giờ, trưa ăn mì gói cho nhanh…'],
       ['s','smile','Hồi đi học anh cũng vậy. Sang Nhật, có hôm tăng ca đến 9 giờ tối, anh mới thấm: không ăn đủ thì không làm nổi.'],
       ['shin','worry','Về muộn vậy thì nấu ăn kiểu gì anh?'],
       ['s','hi','Anh nấu bữa tối, nấu luôn cơm hộp cho ngày mai. Bắt đầu từ việc nhỏ thôi: sáng dậy uống một ly nước, bữa nào cũng có rau.']],
  steps:[['Để sẵn ly nước','Đặt cạnh giường hoặc bàn học từ tối.'],['Uống ngay khi thức dậy','Trước khi mở điện thoại.'],['Bữa chính có rau','Thêm một phần rau hoặc trái cây.']],
  dos:[['Mang bình nước đi học','Khát mới mua nước ngọt'],['Ăn sáng nhẹ trước khi đi','Bỏ bữa sáng cho kịp giờ']],
  oops:['Thay nước lọc bằng nước ngọt.','Ăn mì gói nhiều bữa liền cho nhanh.'],
  ev:{q:'Hôm nay bạn đã làm gì?', o:['Uống nước khi thức dậy','Ăn sáng','Bữa có rau','Mang bình nước']},
  quiz:{sc:'Sáng nay bạn dậy trễ. Cách nào tốt nhất?', o:['Bỏ ăn sáng, trưa ăn bù thật nhiều.','Uống ly nước, mang theo bánh mì.','Mua nước ngọt uống cho tỉnh.'], ok:1, ex:'Có chút gì trong bụng thì học 4 tiết không đuối. Nước lọc tốt hơn nước ngọt.'},
  prov:{j:'腹八分目に医者いらず', r:'Hara hachibunme ni isha irazu', v:'Ăn no tám phần thì khỏi cần bác sĩ.'}},
 ngu:{full:true,
  poem:['Mười một giờ rồi','Màn hình tắt thôi','Giấc ngủ đủ rồi','Sáng ra tươi tỉnh'],
  why:{now:'Ngủ đủ thì sáng dậy được, học 4 tiết không gà gật, bài học cũng nhớ lâu hơn.', jp:'Ca làm ở Nhật thường bắt đầu sớm. Thiếu ngủ dễ mất tập trung, dễ làm sai, dễ gặp tai nạn.'},
  corner:'Ở công ty anh từng có bạn chơi game đến gần sáng, tuần nào cũng xin nghỉ một hai buổi, mọi người phải làm thay. Anh nhìn mà tự đặt luật: 22 giờ 30 là cắm sạc xa giường.',
  dlg:[['shin','wow','Nghe nói có người ngủ 4 tiếng mà vẫn học giỏi. Em thử được không anh?'],
       ['s','smile','Mỗi người một sức. Với tụi mình, học 4 tiết, chiều làm thêm, ngủ ít là hôm sau đuối liền.'],
       ['shin','think','Mà tối nào em cũng lỡ lướt điện thoại tới khuya…'],
       ['s','hi','Anh cũng vậy, đến khi anh cắm sạc ở góc phòng, xa giường. Muốn lướt thì phải đứng dậy, thế là lười, ngủ luôn.']],
  steps:[['Hẹn giờ tắt màn hình','Đặt báo thức 22 giờ 30 để nhắc mình.'],['Cắm sạc xa giường','Điện thoại để ở bàn học hoặc góc phòng.'],['Chuẩn bị đồ cho mai','Rồi tắt đèn, nằm xuống.']],
  dos:[['Ngủ, dậy cùng giờ mỗi ngày','Cuối tuần thức khuya, ngủ bù'],['Đọc vài trang sách giấy','Nằm lướt video trên giường']],
  oops:['Nằm lướt “một chút” thành một tiếng.','Uống cà phê, trà sữa vào buổi tối.'],
  ev:{q:'Tối qua bạn ngủ lúc nào?', o:['Trước 22 giờ 30','22 giờ 30 đến 23 giờ','Sau 23 giờ']},
  quiz:{sc:'22 giờ 30, bạn đang xem dở một tập phim. Bạn làm gì?', o:['Xem nốt rồi ngủ, một tập thôi.','Cắm sạc xa giường, mai xem tiếp.','Xem trên giường đến khi buồn ngủ.'], ok:1, ex:'Phim còn đó, giấc ngủ thì không chờ. Để điện thoại xa giường là cách dễ giữ nhất.'},
  prov:{j:'寝る子は育つ', r:'Neru ko wa sodatsu', v:'Ngủ ngon thì lớn khỏe.'}},
 bot:{full:true,
  poem:['Tay muốn mở game','Đổi việc khác thôi','Năm phút qua rồi','Cơn thèm cũng tan'],
  why:{now:'Bỏ hẳn một thói quen rất khó. Đổi nó bằng một việc khác trong 5 phút thì dễ hơn nhiều.', jp:'Ở Nhật, người làm chủ được điện thoại, game và giờ giấc thì giữ được sức khỏe, công việc và tiền để dành.'},
  corner:'Hồi ở trường anh mê game. Anh không cố bỏ hẳn, chỉ tập: muốn chơi thì đứng dậy uống nước, ôn 5 từ trước. Nhiều hôm 5 phút xong là hết muốn chơi.',
  dlg:[['shin','worry','Em biết lướt điện thoại nhiều là không tốt, mà cầm lên là không dừng được…'],
       ['s','smile','Đừng cố bỏ ngay. Anh từng thử rồi, được hai hôm là chơi lại, còn nhiều hơn trước.'],
       ['shin','think','Vậy anh làm cách nào?'],
       ['s','hi','Lúc muốn mở game, anh làm một việc khác 5 phút trước: uống nước, ôn vài từ. Cơn thèm qua khá nhanh. Mỗi tuần anh bớt thêm một chút.']],
  steps:[['Nhận ra lúc “muốn”','Tay cầm điện thoại, định mở game hay mạng xã hội.'],['Làm việc thay thế 5 phút','Uống nước, giãn cơ, ôn 5 từ.'],['Rồi mới quyết','Còn muốn thì hẹn giờ, hết giờ là dừng.']],
  dos:[['Bớt dần từng tuần','Thề bỏ hẳn từ ngày mai'],['Để điện thoại xa lúc học','Để ngay cạnh sách vở']],
  oops:['Lỡ một hôm thì tự trách, rồi bỏ luôn.','Thay thói quen này bằng một thói quen chưa tốt khác.'],
  ev:{q:'Bạn đã thay bằng việc gì?', o:['Uống nước','Giãn cơ','Ôn từ vựng','Đi dạo','Việc khác']},
  quiz:{sc:'Đang học, bạn muốn mở mạng xã hội. Cách nào dễ giữ nhất?', o:['Cố nhịn, không làm gì cả.','Úp điện thoại, học tiếp 5 phút.','Lướt 1 phút rồi học tiếp.'], ok:1, ex:'Có việc thay thế thì dễ hơn cố nhịn. “Một phút” thường thành nửa tiếng.'},
  prov:{j:'急がば回れ', r:'Isogaba maware', v:'Vội thì đi đường vòng: chậm mà chắc.'}},
 chitieu:{full:true,
  poem:['Một dòng chi tiêu','Tối nay ghi lại','Món thích chờ mai','Tiền về đúng chỗ'],
  why:{now:'Ghi lại mới biết tiền đi đâu. Biết rồi thì dễ để dành cho việc lớn của mình.', jp:'Sang Nhật, mỗi tháng có lương nhưng cũng nhiều khoản: nhà, ăn, đi lại. Người ghi chép đều giữ được kế hoạch gửi về nhà và để dành.'},
  corner:'Ở Nhật mình có một cuốn sổ chi tiêu. Mình hay tự nhắc: lương một tháng bao nhiêu chưa quan trọng, quan trọng là cuối tháng để dành được bao nhiêu.',
  dlg:[['shin','worry','Tiền làm thêm em vừa nhận, chưa hết tuần mà đã gần hết…'],
       ['s','smile','Chị cũng từng vậy. Tiền đi đâu không biết, toàn món nhỏ: trà sữa, đồ ăn vặt, đồ giảm giá.'],
       ['shin','think','Rồi chị làm sao?'],
       ['s','hi','Tối nào chị cũng ghi một dòng. Muốn mua gì thì hỏi: mình CẦN hay chỉ THÍCH? Món thích thì chờ một ngày. Phần lớn hôm sau là hết muốn.']],
  steps:[['Nhớ số tiền mỗi lần trả','Giữ hóa đơn hoặc ghi nhanh vào điện thoại.'],['Tối ghi 1 dòng','Món gì, bao nhiêu, CẦN hay THÍCH.'],['Món THÍCH thì chờ 1 ngày','Hôm sau vẫn cần mới mua.']],
  dos:[['Để riêng tiền thứ CẦN trước','Tiêu trước, còn bao nhiêu mới để dành'],['Tự giữ thẻ, tiền của mình','Cho mượn thẻ, nhờ người khác giữ hộ']],
  oops:['Chỉ ghi món lớn, quên những món nhỏ mỗi ngày.','Mua đồ giảm giá dù không cần, vì thấy rẻ.'],
  safe:'Không đưa thẻ ngân hàng, mật khẩu hay giấy tờ của mình cho người khác giữ. Lời mời vay tiền dễ, việc nhẹ lương cao trên mạng thường là bẫy lừa: hỏi thầy cô trước.',
  ev:{q:'Hôm nay bạn chi cho gì?', o:['Ăn uống','Đi lại','Học tập','Món mình thích','Không chi gì']},
  quiz:{sc:'Bạn thấy chiếc áo đẹp đang giảm giá. Bạn làm gì?', o:['Mua ngay kẻo hết.','Hỏi: CẦN hay chỉ THÍCH? Chờ 1 ngày.','Mượn tiền bạn để mua.'], ok:1, ex:'Món thích thì chờ một ngày. Hôm sau vẫn cần mới mua.'},
  prov:{j:'安物買いの銭失い', r:'Yasumono-gai no zeni-ushinai', v:'Ham đồ rẻ lại mất tiền.'}},
 tiengnhat:{full:true,
  poem:['Một câu tiếng Nhật','Nói sai cũng được','Mỗi ngày một bước','Miệng quen tự nhiên'],
  why:{now:'Biết mà không nói thì lúc cần sẽ không nói ra được. Mỗi ngày một câu, miệng sẽ quen.', jp:'Ở chỗ làm, người Nhật quý người chịu nói, dù còn sai. Nói được thì hỏi được, học được nhanh hơn.'},
  corner:'Mới sang, công ty toàn cô chú lớn tuổi, mình ngại lắm. Mình cứ chào, hỏi một câu mỗi ngày. Họ cởi mở hỏi han lại. Trò chuyện dần, tiếng Nhật lên lúc nào không hay.',
  dlg:[['shin','worry','Em sợ nói sai lắm, gặp thầy cô người Nhật là em chỉ cười thôi…'],
       ['s','smile','Anh hiểu. Mới sang Nhật, công ty toàn cô chú lớn tuổi, anh cũng ngại.'],
       ['shin','think','Rồi anh làm sao để dám nói?'],
       ['s','hi','Anh tự giao: mỗi ngày một câu. Nói sai thì họ sửa, anh cảm ơn rồi nói lại. Họ thấy mình chịu nói nên càng hay trò chuyện với mình.']],
  steps:[['Chọn một câu cho hôm nay','Câu chào, câu hỏi hoặc câu xin phép.'],['Nói với một người','Thầy cô, bạn cùng phòng, anh chị làm hồ sơ.'],['Sai thì nói lại','Cảm ơn người sửa, rồi nói lại câu đúng.']],
  dos:[['Nói chậm, rõ từng chữ','Nói lí nhí cho qua'],['Chưa hiểu thì hỏi lại','Gật đầu dù chưa hiểu']],
  oops:['Đợi giỏi rồi mới nói.','Chào bằng tiếng Nhật xong thì chuyển ngay sang tiếng Việt.'],
  ev:{q:'Bạn nói tiếng Nhật với ai?', o:['Thầy cô người Nhật','Thầy cô người Việt','Bạn cùng lớp','Bạn cùng phòng','Người khác']},
  quiz:{sc:'Thầy người Nhật hỏi một câu bạn chưa hiểu. Bạn nói gì?', o:['Cười và gật đầu cho qua.','もう一度お願いします (Xin nói lại ạ).','Quay sang hỏi bạn bằng tiếng Việt.'], ok:1, ex:'Hỏi lại là lịch sự và giúp bạn học thêm. Gật đầu khi chưa hiểu dễ làm sai.'},
  prov:{j:'習うより慣れよ', r:'Narau yori nare yo', v:'Học không bằng làm cho quen.'}},
 quansat:{full:true,
  poem:['Mắt nhìn tai nghe','Thấy điều hay hay','Ghi lại mỗi ngày','Hỏi thêm vì sao'],
  why:{now:'Người tinh ý học được cả khi không ai dạy: nhìn người khác làm rồi tự rút ra bài học.', jp:'Ở Nhật, người mới hay được dặn 見て覚える: nhìn mà học. Ai biết quan sát thì quen việc nhanh hơn.'},
  corner:'Mới sang Nhật, tay chân mình lóng ngóng lắm. Mình tập quan sát anh chị đồng nghiệp: họ cầm dụng cụ thế nào, sắp xếp ra sao. Chưa ai dạy mà mình đã quen việc.',
  kase:{t:'Từ xưởng Nhật về cửa hàng ở quê', s:'Một anh thực tập sinh có thói quen quan sát mọi thứ quanh mình, từ hệ thống thông gió, điện, đèn trong xưởng đến cách bày hàng ở siêu thị Nhật. Về nước, anh áp dụng vào việc kinh doanh và đặt quy tắc chỉ bán đồ chất lượng để khách nhớ đến mình lâu dài.', l:'Quan sát mỗi ngày là cách học không tốn tiền, mang theo được cả đời.'},
  dlg:[['shin','think','Chưa ai dạy thì em học bằng cách nào hả chị?'],
       ['s','smile','Bằng mắt. Mới sang Nhật, tay chân chị lóng ngóng lắm. Chị nhìn anh chị đồng nghiệp làm rồi làm theo.'],
       ['shin','wow','Nhìn thôi mà học được hả chị?'],
       ['s','hi','Nhìn rồi ghi một dòng, chưa hiểu thì hỏi một câu “vì sao”. Người Nhật hay nói 見て覚える: nhìn mà học. Ai tinh ý thì quen việc nhanh hơn.']],
  steps:[['Chọn một người làm tốt','Thầy cô, bạn giỏi, anh chị làm hồ sơ.'],['Nhìn kỹ một việc nhỏ','Họ làm thế nào, theo thứ tự nào.'],['Ghi 1 dòng, hỏi 1 câu','“Vì sao làm vậy?” Hỏi lúc người đó rảnh.']],
  dos:[['Ghi điều mình làm theo được','Ghi kiểu “hôm nay đông người”'],['Hỏi lúc người kia rảnh','Hỏi chen khi họ đang bận']],
  oops:['Nhìn nhưng không ghi, hôm sau quên mất.','Tin ngay một tin trên mạng mà chưa xem ai đăng.'],
  safe:'Đọc tin trên mạng, hỏi thêm: ai đăng, nguồn có rõ không? Tin hứa “đi nhanh, việc nhẹ lương cao” thường là dấu hiệu lừa đảo. Hỏi thầy cô trước khi tin hay chia sẻ.',
  ev:{q:'Bạn quan sát ở đâu?', o:['Trên lớp','Ở chỗ làm thêm','Phòng làm hồ sơ','Ở chỗ ở','Trên mạng']},
  quiz:{sc:'Bạn đọc tin “Đi Nhật nhanh, không cần học tiếng”. Bạn làm gì?', o:['Chia sẻ ngay cho bạn bè.','Xem ai đăng, hỏi thầy cô trước.','Nhắn tin hỏi cách đăng ký.'], ok:1, ex:'Kiểm chứng trước khi tin. Lời hứa “nhanh, dễ” thường là bẫy.'},
  prov:{j:'百聞は一見に如かず', r:'Hyakubun wa ikken ni shikazu', v:'Trăm nghe không bằng một thấy.'}},
 viecko:{full:true,
  poem:['Việc khó ai làm','Em xin thử ạ','Khó rồi cũng qua','Mình lớn thêm lên'],
  why:{now:'Việc dễ ai cũng làm được. Nhận việc hơi khó là cách nhanh nhất để giỏi lên và được tin tưởng.', jp:'Ở Nhật, người hay nói やってみます (để em thử) thường được giao việc mới, học được nhiều kỹ năng hơn.'},
  corner:'Hồi ở trường, thầy hỏi ai làm trưởng nhóm thuyết trình, mình run nhưng vẫn giơ tay. Làm xong mới thấy mình làm được nhiều hơn mình nghĩ.',
  dlg:[['shin','worry','Thầy hỏi “ai làm?” mà em sợ làm không tốt, nên em ngồi im…'],
       ['s','smile','Hồi trước chị cũng vậy. Rồi có lần thầy hỏi ai làm trưởng nhóm thuyết trình, chị run nhưng vẫn giơ tay.'],
       ['shin','think','Rồi chị có làm tốt không?'],
       ['s','hi','Chưa hoàn hảo, nhưng chị học được rất nhiều. Sang Nhật, chị hay nói やってみます. Nhờ vậy chị được giao việc mới, vị trí mới, tay nghề lên nhanh.']],
  steps:[['Nhận ra việc mình hơi ngại','Không cần việc quá sức, chỉ hơi ngại thôi.'],['Giơ tay trước khi kịp ngại','Nói “Em xin thử ạ”.'],['Làm tới cùng, vướng thì hỏi','Xong thì báo lại kết quả.']],
  dos:[['Nhận việc hơi khó, vừa sức','Ôm việc quá sức rồi bỏ dở'],['Vướng là hỏi ngay','Im lặng làm sai rồi giấu']],
  oops:['Nhận việc rồi để sát hạn mới làm.','Sợ sai nên không dám hỏi.'],
  ev:{q:'Bạn đã nhận việc gì?', o:['Trực nhật khu khó','Phát biểu trên lớp','Làm trưởng nhóm','Việc chung của lớp','Việc khác']},
  quiz:{sc:'Thầy hỏi: “Ai lên làm mẫu bài chào?” Bạn hơi ngại. Bạn làm gì?', o:['Ngồi im, để bạn khác làm.','Giơ tay: “Em xin thử ạ.”','Đợi xem có ai giơ tay trước.'], ok:1, ex:'Thử là cách học nhanh nhất. Sai trên lớp thì được sửa, sang Nhật đỡ sai hơn.'},
  prov:{j:'案ずるより産むが易し', r:'Anzuru yori umu ga yasushi', v:'Lo thì thấy khó, bắt tay làm lại dễ.'}},
 horenso:{full:true,
  poem:['Xong việc báo ngay','Đổi gì liên lạc','Chưa chắc bàn bạc','Việc chạy trơn tru'],
  why:{now:'Báo lại một câu, người giao việc yên tâm, không phải đi hỏi. Mình cũng tránh được hiểu lầm.', jp:'Hō-Ren-Sō (báo cáo, liên lạc, bàn bạc) là nếp làm việc ở công ty Nhật. Làm xong mà không báo thường bị xem là chưa xong việc.'},
  corner:'Ở xưởng, có hôm máy chạy chậm, mình định tự xử lý rồi mới nói. Chị tổ trưởng dặn: có thay đổi là báo ngay, dù chưa biết cách sửa. Từ đó mình báo trước, sửa sau.',
  dlg:[['shin','think','Làm xong việc rồi, cần gì phải báo nữa chị?'],
       ['s','smile','Người giao việc đâu biết mình xong chưa. Không báo thì họ phải đi hỏi, hoặc lo là mình chưa làm.'],
       ['shin','worry','Còn nếu em làm sai hay bị trễ, báo ra ngại lắm…'],
       ['s','hi','Càng phải báo sớm. Có hôm khách đông hơn dự kiến, chị định tự xoay xở rồi mới nói. Chị quản lý dặn: có thay đổi là báo ngay, dù chưa biết cách xử lý. Báo sớm thì cả ca cùng tìm cách.']],
  steps:[['Xong việc: báo một câu','“Em đã làm xong … rồi ạ.”'],['Có thay đổi: liên lạc ngay','Trễ, nghỉ, máy hỏng: báo trước, sửa sau.'],['Chưa chắc: hỏi, bàn','Nhắc lại để xác nhận rồi mới làm.']],
  dos:[['Nói kết luận trước, lý do sau','Kể dài rồi mới nói kết quả'],['Báo sớm khi có vấn đề','Giấu lỗi, đợi tự sửa xong']],
  oops:['Nhắn báo nghỉ khi giờ học đã bắt đầu.','Gật đầu “Dạ hiểu” dù chưa chắc hiểu đúng.'],
  ev:{q:'Bạn đã báo gì?', o:['Báo xong việc','Báo trễ hoặc nghỉ','Hỏi lại cho chắc','Bàn cách làm']},
  quiz:{sc:'Sáng nay bạn bị sốt, không đi học được. Bạn làm gì?', o:['Nghỉ luôn, mai đi học giải thích.','Nhắn báo thầy cô trước giờ học.','Nhờ bạn nói giúp khi thầy hỏi.'], ok:1, ex:'Tự báo, báo trước giờ học. Đó là Ren (liên lạc), nếp làm việc ở Nhật.'},
  prov:{j:'石橋を叩いて渡る', r:'Ishibashi o tataite wataru', v:'Gõ thử cầu đá rồi mới qua: cẩn thận trước khi làm.'}},
 giup:{full:true,
  poem:['Việc mình xong rồi','Nhìn quanh xem sao','Bạn cần việc nào','Mình giúp một tay'],
  why:{now:'Giúp một việc nhỏ, cả nhóm xong sớm hơn, và bạn bè nhớ đến mình.', jp:'Ở Nhật làm việc theo nhóm. Xong phần mình rồi hỏi 何か手伝いましょうか là cách nhanh nhất để được quý mến.'},
  corner:'Mới sang, ai trong xưởng cũng chỉ việc cho mình, có người còn cho đồ ăn, áo ấm. Mình nhớ mãi. Giờ thấy em mới sang lóng ngóng là mình lại gần hỏi: “Có cần chị giúp không?”',
  dlg:[['shin','think','Em làm xong phần mình rồi. Ngồi nghỉ chút có sao không chị?'],
       ['s','smile','Nghỉ cũng được, nhưng nhìn quanh trước đã. Mới sang Nhật, ai trong xưởng cũng chỉ việc cho chị, có người còn cho áo ấm, đồ ăn.'],
       ['shin','wow','Họ tốt quá chị nhỉ!'],
       ['s','hi','Nên giờ thấy em mới sang lóng ngóng, chị lại gần hỏi “Có cần chị giúp không?”. Giúp một việc nhỏ thôi mà cả tổ gần nhau hơn.']],
  steps:[['Xong phần mình trước','Giúp khi việc mình đã xong, đã báo.'],['Nhìn quanh','Ai đang bưng vác, ai đang làm chậm.'],['Hỏi trước khi làm','“Có cần mình giúp không?” Họ đồng ý mới làm.']],
  dos:[['Hỏi trước rồi mới giúp','Tự ý làm thay việc người khác'],['Giúp xong thì thôi','Giúp rồi nhắc đi nhắc lại']],
  oops:['Bỏ dở việc mình để đi giúp người khác.','Làm hộ bài tập của bạn.'],
  ev:{q:'Bạn đã giúp ai?', o:['Bạn cùng lớp','Bạn cùng phòng','Thầy cô','Người ở chỗ làm thêm']},
  quiz:{sc:'Trực nhật xong khu của mình, bạn thấy khu bên cạnh còn nhiều rác. Bạn làm gì?', o:['Về trước, việc mình xong rồi.','Hỏi: “Có cần mình giúp không?”','Nhắc bạn làm nhanh lên.'], ok:1, ex:'Xong phần mình rồi giúp một tay: cả lớp xong sớm, ai cũng vui.'},
  prov:{j:'情けは人の為ならず', r:'Nasake wa hito no tame narazu', v:'Lòng tốt cho người rồi cũng quay về mình.'}},
 /* ----- Nhóm 1: thêm đối thoại Shin–Senpai, rút ngắn câu thử nhanh ----- */
 chao:{dlg:[['shin','think','Chào hỏi thì ai chẳng biết. Sao phải rèn thành thói quen hả chị?'],
            ['s','smile','Ở xưởng chị, sáng nào tổ trưởng cũng nghe cách mọi người chào để biết ai khỏe, ai mệt. Lời chào là thứ người ta thấy đầu tiên ở mình.'],
            ['shin','wow','Chỉ một câu chào mà người ta đọc được nhiều vậy!'],
            ['s','hi','Ừ. Chị tập dừng lại, nhìn mắt, nói trước rồi mới cúi. Ngày nào cũng chào trước, dần dần người lạ thành người quen.']],
       quiz:{sc:'Đang bưng thùng hàng, bạn gặp tổ trưởng ở hành lang. Chào thế nào?', o:['Dừng lại, nói おはようございます rồi cúi nhẹ.','Gật đầu thật nhanh rồi đi tiếp.','Đặt thùng xuống, cúi sâu 45°.'], ok:0, ex:'Chào hằng ngày: nói trước, cúi khoảng 15°. Cúi 45° dành cho lúc xin lỗi, cảm ơn sâu sắc.'}},
 som:{dlg:[['shin','think','Đúng 8 giờ em có mặt là đúng giờ rồi phải không chị?'],
           ['s','smile','Ở xưởng chị, 8 giờ vào ca nghĩa là 8 giờ đã đứng ở vị trí, đồng phục chỉnh tề. Ai 8 giờ mới thay đồ là đã trễ.'],
           ['shin','wow','Vậy phải đến sớm bao lâu ạ?'],
           ['s','hi','Chị đến sớm 10 đến 15 phút. Tối soạn sẵn đồ, sáng dậy ngay khi chuông reo. Không phải vội là cả ngày nhẹ nhàng.']],
      quiz:{sc:'Ca làm bắt đầu 8:00. Lúc nào là đúng giờ?', o:['Đúng 8:00 bước qua cổng.','7:50 đã thay đồ, đứng ở vị trí.','8:05 đến, cuối ca làm bù.'], ok:1, ex:'Giờ bắt đầu là lúc bắt tay vào việc. Đến sớm để thay đồ, chuẩn bị.'}},
 memo:{dlg:[['shin','worry','Thầy dặn nhiều quá, em nhớ trước quên sau…'],
            ['s','smile','Ngày đầu đi làm, tổ trưởng chỉ việc mà anh không ghi, hôm sau phải hỏi lại. Tổ trưởng đưa anh một cuốn sổ nhỏ.'],
            ['shin','think','Rồi anh ghi những gì?'],
            ['s','hi','Ghi từ khóa thôi: ai, việc gì, khi nào, lưu ý gì. Ghi xong đọc lại để xác nhận. Từ đó túi áo anh lúc nào cũng có sổ và bút.']],
       quiz:{sc:'Tổ trưởng dặn nhanh 3 việc lúc đang bận. Bạn làm gì?', o:['Gật đầu, cố nhớ trong đầu.','Nhờ anh ấy nhắn lại sau.','Ghi từ khóa, đọc lại để xác nhận.'], ok:2, ex:'Ghi ngay và đọc lại chỉ mất vài giây, mà cả hai chắc chắn hiểu đúng.'}},
 '5s':{dlg:[['shin','think','5S nghe như dọn dẹp. Sao người Nhật coi trọng vậy anh?'],
            ['s','smile','Ở xưởng anh, dụng cụ treo trên bảng có vẽ sẵn hình. Thiếu món nào nhìn là biết, cần là lấy được ngay.'],
            ['shin','wow','Gọn vậy thì đỡ mất thời gian tìm đồ!'],
            ['s','hi','Đúng rồi. Anh tập từ bàn học: đứng dậy là cất đồ về chỗ, mất một phút thôi. Về đến chỗ ở thì xếp giày, mũi quay ra cửa.']],
       quiz:{sc:'Học xong ở bàn chung. 5S một phút là gì?', o:['Để nguyên, ca sau còn dùng.','Gom hết vào túi, rảnh phân loại.','Cất đồ về chỗ, lau bàn, đẩy ghế.'], ok:2, ex:'5S là trả mọi thứ về đúng chỗ ngay sau khi dùng.'}},
 camon:{dlg:[['shin','think','Cảm ơn rồi thì thôi, hôm sau có cần nói lại không chị?'],
             ['s','smile','Có đó em. Lần đầu chị nói 昨日はありがとうございました với chị tổ phó, chị ấy cười rất tươi.'],
             ['shin','wow','Một câu thôi mà có tác dụng vậy hả chị?'],
             ['s','hi','Từ hôm đó chị ấy hay chỉ thêm việc cho chị. Cảm ơn kèm việc cụ thể, người nghe biết mình nhớ lòng tốt của họ.']],
        quiz:{sc:'Hôm qua chị senpai ở lại chỉ bạn dùng máy. Sáng nay gặp chị, bạn nói gì?', o:['“Hôm qua cảm ơn chị đã chỉ em ạ.”','Chào bình thường, cảm ơn rồi mà.','Tặng hộp bánh, khỏi nói gì thêm.'], ok:0, ex:'Cảm ơn lại hôm sau cho thấy bạn nhớ lòng tốt của người ta.'}},
 xinloi:{dlg:[['shin','worry','Lỗi đâu phải tại em, tại máy hỏng mà. Em giải thích thì sai ở đâu anh?'],
              ['s','smile','Anh từng y vậy. Có lần làm sai, câu đầu tiên anh nói là “tại máy…”. Tổ trưởng im lặng.'],
              ['shin','think','Rồi sao nữa anh?'],
              ['s','hi','Hôm sau anh nói: “Em xin lỗi, em sẽ kiểm lại hai lần.” Tổ trưởng gật đầu ngay. Xin lỗi trước, nói cách sửa, lý do để sau.']],
         quiz:{sc:'Bạn vào lớp trễ 10 phút vì kẹt xe. Bạn nói gì?', o:['Tại kẹt xe quá, không phải lỗi em.','Em xin lỗi, lần sau em đi sớm hơn.','Lặng lẽ vào chỗ, cuối giờ giải thích.'], ok:1, ex:'Xin lỗi trước, nói cách sửa. Lý do chỉ nói ngắn nếu thầy cô hỏi.'}},
 loihua:{dlg:[['shin','worry','Em hay hứa với mình mai học thật nhiều, rồi lại không làm…'],
              ['s','smile','Chị cũng từng vậy. Sau chị tập từ việc nhỏ: hứa mỗi tối học 10 từ.'],
              ['shin','think','Mười từ thì ít quá chị?'],
              ['s','hi','Ít nhưng giữ được. Giữ được một tháng, chị mới dám nhận lời “thứ Sáu em nộp báo cáo”, và nộp đúng hạn. Tin được mình rồi người khác mới tin mình.']],
         quiz:{sc:'Hứa học 50 từ mà chỉ học được 10. Hôm nay hứa sao?', o:['Hứa 90 từ để bù hôm qua.','Thôi không hứa nữa cho đỡ áp lực.','Hứa 15 từ, vừa sức để giữ được.'], ok:2, ex:'Hứa vừa sức rồi tăng dần, bạn sẽ tin vào lời mình hơn.'}}
};
HABITS.forEach(function(h){ var c=N2[h.id]; if(c){ for(var k in c) h[k]=c[k]; } });
/* Xáo vị trí đáp án đúng, cố định theo từng thẻ (không để đáp án đúng luôn ở một chỗ) */
function rotQ(q,target){ if(!q||!q.o) return; var n=q.o.length; target=target%n; var r=(q.ok-target+n)%n; if(!r) return; var o=q.o.slice(); q.o=o.map(function(_,i){ return o[(i+r)%n]; }); q.ok=target; }
HABITS.forEach(function(h,i){ rotQ(h.quiz, (i*2+1)%3); });

var BAD_OPTS = [
 ['game','Chơi game quá giờ','hẹn giờ 20 phút trước khi chơi'],
 ['mxh','Lướt mạng xã hội lâu','úp điện thoại, làm 1 việc nhỏ trước'],
 ['khuya','Thức khuya','tắt màn hình, cắm sạc xa giường'],
 ['nghi','Nghĩ ngợi quá nhiều','viết điều đang lo ra 1 dòng'],
 ['tri','Hay trì hoãn','bắt đầu ngay 2 phút đầu tiên của việc đó'],
 ['vat','Ăn vặt, nước ngọt nhiều','uống 1 ly nước lọc trước'],
 ['khac','Thói quen khác','']
];
var HMAP = {}; HABITS.forEach(function(h){ HMAP[h.id]=h; });

/* ---------- Tục ngữ Nhật ---------- */
var PROVS = [
 {j:'継続は力なり', r:'Keizoku wa chikara nari', v:'Kiên trì là sức mạnh.'},
 {j:'千里の道も一歩から', r:'Senri no michi mo ippo kara', v:'Đường nghìn dặm bắt đầu từ một bước.'},
 {j:'塵も積もれば山となる', r:'Chiri mo tsumoreba yama to naru', v:'Bụi gom lại cũng thành núi.'},
 {j:'石の上にも三年', r:'Ishi no ue ni mo sannen', v:'Ngồi trên đá ba năm, đá cũng ấm.'},
 {j:'急がば回れ', r:'Isogaba maware', v:'Vội thì cứ đi đường vòng cho chắc.'}
];
var PROV_COMEBACK = {j:'七転び八起き', r:'Nana korobi ya oki', v:'Ngã bảy lần, đứng dậy tám lần.'};

/* ---------- Hội Virus: mỗi “cái cớ” là một virus ---------- */
var VIRUS = {
 luoi:{n:'Virus Lười', c:'#A79BD6', say:'Mệt thì nghỉ, mai tính!'},
 ngai:{n:'Virus Ngại', c:'#F2A5C0', say:'Ngại quá, thôi khỏi làm…'},
 quen:{n:'Virus Hay Quên', c:'#8FC4F0', say:'Ủa, hôm nay có hứa gì hả?'},
 demai:{n:'Virus Để Mai', c:'#F6B977', say:'Để mai đi, mai còn dài mà!'}
};
var REASONS = [
 ['quen','Quên mất','quen','Gắn vào một việc chắc chắn xảy ra mỗi ngày, như đánh răng hay bước vào lớp.'],
 ['ngai','Ngại','ngai','Làm nhỏ hơn nữa: chỉ cần mỉm cười, hoặc chỉ cất 1 món. Nhỏ vẫn được tính.'],
 ['dip','Chưa có lúc','demai','Đừng chờ có lúc rảnh. Chọn một việc chắc chắn có mỗi ngày làm vế “Khi…”.'],
 ['met','Mệt','luoi','Ngày mệt, làm bản 30 giây cũng được tính. Ngủ sớm để mai khỏe hơn.'],
 ['chua','Chưa biết làm sao','','Xem lại phần Cách làm, hoặc hỏi thầy cô ở tiết kỹ năng tới.']
];
var PROMPTS = ['Hôm nay bạn học được điều gì mới?','Một từ vựng mới hôm nay là gì?','Hôm nay bạn quan sát thấy điều gì?','Mai bạn muốn nhắc mình điều gì?'];
var PROMPT_PH = ['Ví dụ: Cách cúi chào 15° cho đúng.','Ví dụ: 確認 (kakunin) là xác nhận.','Ví dụ: Cô nấu ăn luôn xếp dép ngay ngắn.','Ví dụ: Mang sổ memo khi lên lớp.'];
var MOODS = [['5','Tuyệt vời','#3B82F6'],['4','Tốt','#22A05E'],['3','Ổn','#E3A916'],['2','Kém','#F07F1E'],['1','Tồi tệ','#DE5A4F']];
var RATE = ['Bị','Phải','Muốn','Thích','Đam mê'];

var TEACHERS=[
 ['Cô Long Ngân','longngan@proskills.ac.vn'],
 ['Cô Kim Dung','dungndlk@jpc.edu.vn'],
 ['Cô Lê Uyên','uyenlt@proskills.ac.vn'],
 ['Cô Trần Thi','tranthi@proskills.ac.vn'],
 ['Thầy Đăng Khoa','Dangkhoa@proskills.ac.vn'],
 ['Cô Quỳnh Anh','quynhanh@proskills.ac.vn'],
 ['Cô Nguyệt Quỳnh','quynhntn@proskills.ac.vn']
];
/* Mã con dấu thầy cô (bản thử). Kho GitHub công khai thì ai cũng đọc được các mã này. */
var TCODES = ['KAIZEN','GANBARE','ARIGATOU','HORENSO','OHAYOU'];
/* Chế độ thầy cô (bản thử): mã PIN mở chế độ và “muối” để tạo mã xác nhận theo tên học viên + ngày.
   Kho GitHub công khai thì ai cũng đọc được; đây là nghi thức gặp thầy cô, chưa phải chống gian lận. */
var T_PIN = '2468', T_SALT = 'kaizen-jpc';
/* =========================================================
   HÌNH VẼ · nhân vật hư cấu, vẽ gốc bằng SVG
   ========================================================= */
var FONT_SVG = "font-family:'Roboto Flex',system-ui,sans-serif";
var FONT_JP = "font-family:'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif";

/* ---- Biểu tượng giao diện (nét đậm) và điều hướng (khối phẳng) ---- */
function ic(n){
  var F={
    today:'<circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></g>',
    deck:'<rect x="7.5" y="3" width="13" height="17" rx="3" fill="currentColor" opacity=".45" transform="rotate(12 14 11.5)"/><rect x="3.5" y="4" width="13" height="17" rx="3" fill="currentColor"/><circle cx="10" cy="12.5" r="3.2" fill="#fff"/>',
    prog:'<rect x="3" y="12" width="4.5" height="9" rx="1.6" fill="currentColor" opacity=".55"/><rect x="9.75" y="7" width="4.5" height="14" rx="1.6" fill="currentColor"/><rect x="16.5" y="3" width="4.5" height="18" rx="1.6" fill="currentColor"/>',
    lib:'<rect x="3" y="3" width="8" height="8" rx="2.6" fill="currentColor"/><rect x="13" y="3" width="8" height="8" rx="2.6" fill="currentColor" opacity=".55"/><rect x="3" y="13" width="8" height="8" rx="2.6" fill="currentColor" opacity=".55"/><rect x="13" y="13" width="8" height="8" rx="2.6" fill="currentColor"/>',
    nb:'<rect x="4.5" y="2.5" width="15" height="19" rx="3.2" fill="currentColor"/><path d="M9 8h7M9 12h7M9 16h4" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M4.5 6h-1.5M4.5 12h-1.5M4.5 18h-1.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    fire:'<path d="M12 21.5c-4.2 0-7-2.8-7-6.7 0-3.9 3-6 4.2-9.5.5 2 1.7 3.2 2.8 3.4C12 6.6 13.7 4 15.9 3c-.6 3.2 3.1 5.6 3.1 10.8 0 4.9-2.9 7.7-7 7.7z" fill="currentColor"/>',
    star:'<path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3L2.9 9.4l6.3-.8z" fill="currentColor"/>',
    bulb:'<path d="M12 2.5a6.5 6.5 0 0 0-3.9 11.7c.8.6 1.2 1.5 1.2 2.4h5.4c0-.9.4-1.8 1.2-2.4A6.5 6.5 0 0 0 12 2.5z" fill="currentColor"/><rect x="9.3" y="18" width="5.4" height="3.6" rx="1.4" fill="currentColor"/>',
    spk:'<path d="M3.5 9.5h3.8L12 5.3v13.4l-4.7-4.2H3.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/>',
    moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="currentColor"/>'
  };
  var S={
    x:'<path d="M6 6l12 12M18 6L6 18"/>', back:'<path d="M15 5l-7 7 7 7"/>', check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    chev:'<path d="M6 9l6 6 6-6"/>', plus:'<path d="M12 5v14M5 12h14"/>',
    cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    send:'<path d="M21 3L10 14"/><path d="M21 3l-6.5 18-4.5-7-7-4.5z"/>', down:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>', up:'<path d="M12 20V9M7 13.5l5-5 5 5M5 4h14"/>',
    print:'<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    img:'<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8 8.5"/>',
    redo:'<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>', user:'<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>', sound:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
    phone:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18h2"/>', shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>', play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>', pause:'<path d="M8.5 5.5v13M15.5 5.5v13"/>', book:'<path d="M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 18.5v-13M8.5 8h6"/>', arrow:'<path d="M4 12h15M14 7l5 5-5 5"/>',
    dots:'<circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/>',
    gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3L5.5 5.5"/><circle cx="12" cy="12" r="6.4"/>',
    smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14q3.5 3 7 0M9 9.5h.01M15 9.5h.01"/>', trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', teacher:'<circle cx="9" cy="7.5" r="3.5"/><path d="M3 20c1-3.5 3.3-5.5 6-5.5s5 2 6 5.5"/><path d="M15 4h6v6h-6"/>'
  };
  if(F[n]) return '<svg viewBox="0 0 24 24" aria-hidden="true">'+F[n]+'</svg>';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(S[n]||'')+'</svg>';
}

/* ---- Biểu tượng thói quen: khối trắng trên nền màu nhóm, phẳng, hơi nổi ---- */
function glyph(k,C){
  if(HMAP[k] && HMAP[k].custom) k='cu_'+HMAP[k].icon;
  if(k.indexOf('cu_')===0) return '<svg viewBox="0 0 24 24" aria-hidden="true">'+cuPaths(k.slice(3),C)+'</svg>';
  var W='#fff';
  var G={
   chao:'<circle cx="12" cy="12" r="9.2" fill="'+W+'"/><circle cx="8.8" cy="10" r="1.5" fill="'+C+'"/><circle cx="15.2" cy="10" r="1.5" fill="'+C+'"/><path d="M8 13.8q4 4.4 8 0" stroke="'+C+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
   som:'<circle cx="12" cy="13" r="8.6" fill="'+W+'"/><path d="M12 8.5V13l3.2 2" stroke="'+C+'" stroke-width="2.3" fill="none" stroke-linecap="round"/><rect x="9.5" y="1.8" width="5" height="2.6" rx="1.2" fill="'+W+'"/>',
   memo:'<rect x="4.5" y="2.8" width="13" height="18.4" rx="2.6" fill="'+W+'"/><path d="M7.5 8h7M7.5 11.5h7M7.5 15h4" stroke="'+C+'" stroke-width="1.9" stroke-linecap="round"/><path d="M15 19.5l5.2-5.2 1.8 1.8-5.2 5.2H15z" fill="#F4B63B"/>',
   '5s':'<path d="M11 2.5l2.2 6.3 6.3 2.2-6.3 2.2L11 19.5l-2.2-6.3L2.5 11l6.3-2.2z" fill="'+W+'"/><path d="M18.5 14.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#F4B63B"/>',
   camon:'<path d="M12 20.5s-8-4.8-8-10.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 2.7c0 5.8-8 10.6-8 10.6z" fill="'+W+'"/><path d="M17.5 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="#F4B63B"/>',
   xinloi:'<path d="M5 3.5h14a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-8.5L6 20.5v-4H5A2.5 2.5 0 0 1 2.5 14V6A2.5 2.5 0 0 1 5 3.5z" fill="'+W+'"/><path d="M8 10.2l2.7 2.6 5-5" stroke="'+C+'" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
   loihua:'<circle cx="12" cy="12" r="9.2" fill="'+W+'"/><circle cx="12" cy="12" r="6" fill="'+C+'"/><circle cx="12" cy="12" r="3" fill="'+W+'"/><circle cx="12" cy="12" r="1.2" fill="'+C+'"/>',
   '5phut':'<path d="M6 2.8h12v2.4c0 3-3 5-4.4 6.8C15 13.8 18 15.8 18 18.8v2.4H6v-2.4c0-3 3-5 4.4-6.8C9 10.2 6 8.2 6 5.2z" fill="'+W+'"/><path d="M8.6 19.2h6.8L12 15.8z" fill="#F4B63B"/>',
   gopy:'<path d="M4 3h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="'+W+'"/><path d="M20 9h-1v4a3 3 0 0 1-3 3h-5v.5A1.5 1.5 0 0 0 12.5 18H17l3 2.5V18a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2z" fill="'+W+'" opacity=".7"/>',
   camxuc:'<circle cx="9" cy="9" r="5" fill="#F4B63B"/><path d="M8 20h10a3.5 3.5 0 0 0 .5-7 5 5 0 0 0-9.6.6A3.3 3.3 0 0 0 8 20z" fill="'+W+'"/>',
   vandong:'<rect x="1.8" y="8.5" width="3" height="7" rx="1.2" fill="'+W+'"/><rect x="4.8" y="6" width="3.4" height="12" rx="1.4" fill="'+W+'"/><rect x="8" y="10.8" width="8" height="2.4" fill="'+W+'"/><rect x="15.8" y="6" width="3.4" height="12" rx="1.4" fill="'+W+'"/><rect x="19.2" y="8.5" width="3" height="7" rx="1.2" fill="'+W+'"/>',
   anuong:'<path d="M5.5 3.5h13l-1.6 17h-9.8z" fill="'+W+'"/><path d="M7 10.5h10l-.9 8.5H7.9z" fill="'+C+'" opacity=".35"/>',
   ngu:'<path d="M15.5 2.8A9 9 0 1 0 21.3 16 7.5 7.5 0 0 1 15.5 2.8z" fill="'+W+'"/><path d="M6.5 4.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" fill="#F4B63B"/>',
   bot:'<rect x="6.5" y="2" width="11" height="20" rx="2.6" fill="'+W+'"/><path d="M12 7v7.5M8.8 11.5l3.2 3.2 3.2-3.2" stroke="'+C+'" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
   chitieu:'<ellipse cx="12" cy="17" rx="8" ry="3.2" fill="'+W+'"/><rect x="4" y="12" width="16" height="5" fill="'+W+'"/><ellipse cx="12" cy="12" rx="8" ry="3.2" fill="'+W+'" stroke="'+C+'" stroke-width="1.2"/><rect x="4" y="7" width="16" height="5" fill="'+W+'"/><ellipse cx="12" cy="7" rx="8" ry="3.2" fill="#F4B63B" stroke="'+W+'" stroke-width="1.2"/>',
   tiengnhat:'<path d="M5 3h14a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 19 17h-8l-5 4v-4H5a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 5 3z" fill="'+W+'"/><text x="12" y="14.2" text-anchor="middle" style="font-family:\'Noto Sans JP\',sans-serif;font-weight:800" font-size="10" fill="'+C+'">あ</text>',
   quansat:'<circle cx="10" cy="10" r="6.4" fill="none" stroke="'+W+'" stroke-width="3.4"/><circle cx="10" cy="10" r="4.7" fill="'+W+'" opacity=".3"/><path d="M15 15l5.5 5.5" stroke="'+W+'" stroke-width="3.8" stroke-linecap="round"/>',
   viecko:'<path d="M1.8 21l7.4-12 4.2 6.6 2.6-3.6 6.2 9z" fill="'+W+'"/><path d="M9.2 9V2.5" stroke="'+W+'" stroke-width="1.8"/><path d="M9.2 2.5h6l-1.6 1.8 1.6 1.8h-6z" fill="#F4B63B"/>',
   horenso:'<path d="M3 9.5h4.2L16 4v16l-8.8-5.5H3z" fill="'+W+'"/><path d="M6 14.5l1.6 5.5h2.6l-1.4-5.5z" fill="'+W+'"/><path d="M19 8.5q2.4 3.5 0 7" stroke="'+W+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
   giup:'<path d="M12 20.5s-8-4.8-8-10.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 2.7c0 5.8-8 10.6-8 10.6z" fill="'+W+'"/><path d="M12 9.8v6M9 12.8h6" stroke="'+C+'" stroke-width="2.4" stroke-linecap="round"/>',
   g1:'<path d="M12 2.5l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 16.4l-5.4 2.9 1-6.1-4.4-4.3 6.1-.8z" fill="'+W+'"/>',
   g2:'<path d="M12 20.5s-8-4.8-8-10.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 2.7c0 5.8-8 10.6-8 10.6z" fill="'+W+'"/><path d="M6.5 12.5h3l1.3-2.5 2 4.5 1.4-2h3.3" stroke="'+C+'" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
   g3:'<path d="M2.5 5.5c3.5-1.2 6.5-.8 9.5 1.5v13c-3-2.3-6-2.7-9.5-1.5z" fill="'+W+'"/><path d="M21.5 5.5c-3.5-1.2-6.5-.8-9.5 1.5v13c3-2.3 6-2.7 9.5-1.5z" fill="'+W+'" opacity=".75"/>',
   g4:'<circle cx="8.5" cy="7.5" r="3.4" fill="'+W+'"/><circle cx="16.5" cy="8.5" r="2.8" fill="'+W+'" opacity=".75"/><path d="M2.5 20c.8-4 3.2-6 6-6s5.2 2 6 6z" fill="'+W+'"/><path d="M14 20c.4-1.8 1-3.2 2-4.3 2.6-.3 4.6 1.4 5.4 4.3z" fill="'+W+'" opacity=".75"/>'
  };
  return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(G[k]||'')+'</svg>';
}
var GCOL={1:'#2A74DB',2:'#22A05E',3:'#0F9F98',4:'#E0567F',5:'#7B5BD0',6:'#D9731A',7:'#D6453D',8:'#8D6E4B',9:'#5B7083',10:'#B7860B'};
function hico(id,size){ var g=HMAP[id].g; return '<span class="hi g'+g+(size?' hi--'+size:'')+'">'+glyph(id,GCOL[g])+'</span>'; }
function gico(g,size){ return '<span class="hi g'+g+(size?' hi--'+size:'')+'">'+glyph('g'+g,GCOL[g])+'</span>'; }
function uico(n,g){ return '<span class="hi g'+(g||1)+'" style="color:#fff">'+ic(n)+'</span>'; }
/* ---- Shin: mèo huấn luyện viên · hi · cheer · think · wow · worry · sleep ---- */
function shin(mood){
  mood = mood || 'hi';
  var K='#3A2A1C', O='#F29A3C', W='#FFF9F0', S='#2A74DB';
  var eyes, mouth='<path d="M54 70q3 3.5 6 0q3 3.5 6 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  var extra='', armL='<ellipse cx="44" cy="100" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>', armR='<ellipse cx="76" cy="100" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
  if(mood==='cheer'){
    eyes='<path d="M42 58q6-7 12 0M66 58q6-7 12 0" stroke="'+K+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M53 68q7 9 14 0z" fill="#E86A5C" stroke="'+K+'" stroke-width="2.4" stroke-linejoin="round"/>';
    armL='<ellipse cx="30" cy="70" rx="7.5" ry="9" fill="'+W+'" stroke="'+K+'" stroke-width="2.4" transform="rotate(-25 30 70)"/>';
    armR='<ellipse cx="90" cy="70" rx="7.5" ry="9" fill="'+W+'" stroke="'+K+'" stroke-width="2.4" transform="rotate(25 90 70)"/>';
    extra='<g fill="#F4B63B"><path d="M18 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M100 34l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>';
  } else if(mood==='think'){
    eyes='<g class="blink"><circle cx="49" cy="56" r="4.6" fill="'+K+'"/><circle cx="71" cy="56" r="4.6" fill="'+K+'"/><circle cx="50.5" cy="54" r="1.5" fill="#fff"/><circle cx="72.5" cy="54" r="1.5" fill="#fff"/></g>';
    mouth='<path d="M55 71h10" stroke="'+K+'" stroke-width="2.6" stroke-linecap="round"/>';
    armR='<ellipse cx="74" cy="80" rx="7.5" ry="6.5" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    extra='<text x="94" y="36" style="'+FONT_SVG+';font-weight:800" font-size="22" fill="'+S+'">?</text>';
  } else if(mood==='wow'){
    eyes='<g class="blink"><circle cx="48" cy="58" r="7" fill="'+K+'"/><circle cx="72" cy="58" r="7" fill="'+K+'"/><circle cx="50.5" cy="55" r="2.6" fill="#fff"/><circle cx="74.5" cy="55" r="2.6" fill="#fff"/></g>';
    mouth='<ellipse cx="60" cy="72" rx="4.5" ry="5.5" fill="#E86A5C" stroke="'+K+'" stroke-width="2.2"/>';
    extra='<g stroke="#F4B63B" stroke-width="3" stroke-linecap="round"><path d="M18 46l-7-3M20 56h-8M100 46l7-3M100 56h8"/></g>';
  } else if(mood==='worry'){
    eyes='<g class="blink"><circle cx="48" cy="59" r="3.8" fill="'+K+'"/><circle cx="72" cy="59" r="3.8" fill="'+K+'"/></g><path d="M41 49l12 3M79 49l-12 3" stroke="'+K+'" stroke-width="2.4" stroke-linecap="round"/>';
    mouth='<path d="M54 73q6-5 12 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    extra='<path d="M88 40q4 7 0 10q-4-3 0-10z" fill="#8FD0E8" stroke="#4A9BBE" stroke-width="1.4"/>';
  } else if(mood==='sleep'){
    eyes='<path d="M42 58q6 5 12 0M66 58q6 5 12 0" stroke="'+K+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M56 71q4 2 8 0" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    extra='<text x="88" y="34" style="'+FONT_SVG+';font-weight:800" font-size="15" fill="'+S+'">z</text><text x="98" y="24" style="'+FONT_SVG+';font-weight:800" font-size="11" fill="'+S+'">z</text>';
  } else if(mood==='moved'){
    eyes='<g class="blink"><ellipse cx="48" cy="58" rx="6" ry="6.6" fill="'+K+'"/><ellipse cx="72" cy="58" rx="6" ry="6.6" fill="'+K+'"/><circle cx="50.4" cy="55.6" r="2.4" fill="#fff"/><circle cx="74.4" cy="55.6" r="2.4" fill="#fff"/><circle cx="46" cy="60.6" r="1.2" fill="#fff"/><circle cx="70" cy="60.6" r="1.2" fill="#fff"/></g><path d="M43 66q-2 3.4 0 5.4q2-2 0-5.4z" fill="#8FD0E8"/>';
    mouth='<path d="M54 70q6 6 12 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    armL='<ellipse cx="50" cy="97" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    armR='<ellipse cx="70" cy="97" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    extra='<path d="M100 40l-7-7c-4-5 3-10 7-4 4-6 11-1 7 4z" fill="#E0567F"/>';
  } else if(mood==='comfort'){
    eyes='<g class="blink"><circle cx="48" cy="58" r="4.4" fill="'+K+'"/><circle cx="72" cy="58" r="4.4" fill="'+K+'"/><circle cx="49.6" cy="56.4" r="1.5" fill="#fff"/><circle cx="73.6" cy="56.4" r="1.5" fill="#fff"/></g><path d="M41 52l12-4M79 52l-12-4" stroke="'+K+'" stroke-width="2.4" stroke-linecap="round"/>';
    mouth='<path d="M55 71q5 3 10 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    armR='<ellipse cx="90" cy="86" rx="8" ry="6.4" fill="'+W+'" stroke="'+K+'" stroke-width="2.4" transform="rotate(-20 90 86)"/>';
    extra='<path d="M100 78l-6-6c-3-4 2-8 6-3 4-5 9-1 6 3z" fill="#F29A9A" stroke="#D96C6C" stroke-width="1"/>';
  } else if(mood==='proud'){
    eyes='<g class="blink"><circle cx="48" cy="57" r="5" fill="'+K+'"/><circle cx="72" cy="57" r="5" fill="'+K+'"/><path d="M50 53.6l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#fff"/><path d="M74 53.6l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="#fff"/></g><path d="M42 49q6-4 12-1M66 48q6-3 12 1" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M52 69q9 8 17-2" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    armL='<ellipse cx="34" cy="98" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    armR='<ellipse cx="86" cy="98" rx="8" ry="6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    extra='<path d="M54 92l6 8 6-8" stroke="#C8372D" stroke-width="3" fill="none"/><circle cx="60" cy="105" r="5.2" fill="#F4B63B" stroke="'+K+'" stroke-width="1.8"/><g fill="#F4B63B"><path d="M18 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M101 36l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>';
  } else if(mood==='yawn'){
    eyes='<path d="M42 55l10 4-10 4M78 55l-10 4 10 4" stroke="'+K+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    mouth='<ellipse cx="60" cy="73" rx="6.5" ry="8.4" fill="#E86A5C" stroke="'+K+'" stroke-width="2.4"/>';
    armR='<ellipse cx="80" cy="78" rx="7.5" ry="6.6" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    extra='<path d="M40 66q-2 3.4 0 5.4q2-2 0-5.4z" fill="#8FD0E8"/><text x="92" y="34" style="'+FONT_SVG+';font-weight:800" font-size="16" fill="'+S+'">z</text>';
  } else if(mood==='curious'){
    eyes='<g class="blink"><circle cx="48" cy="57" r="5.6" fill="'+K+'"/><circle cx="72" cy="57" r="5.6" fill="'+K+'"/><circle cx="50.4" cy="54.8" r="1.9" fill="#fff"/><circle cx="74.4" cy="54.8" r="1.9" fill="#fff"/></g><path d="M41 47q6-5 12-1M66 50h12" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M57 71q3-3.4 6 0q-3 3.4-6 0z" fill="#E86A5C" stroke="'+K+'" stroke-width="1.6" stroke-linejoin="round"/>';
    armR='<ellipse cx="86" cy="84" rx="7.5" ry="6.4" fill="'+W+'" stroke="'+K+'" stroke-width="2.4"/>';
    extra='<circle cx="101" cy="70" r="9" fill="#DDF1FA" fill-opacity=".75" stroke="#5A4A3A" stroke-width="3"/><path d="M94.4 77l-8 8.4" stroke="#5A4A3A" stroke-width="4" stroke-linecap="round"/>';
  } else {
    eyes='<g class="blink"><circle cx="48" cy="58" r="5" fill="'+K+'"/><circle cx="72" cy="58" r="5" fill="'+K+'"/><circle cx="49.8" cy="56" r="1.7" fill="#fff"/><circle cx="73.8" cy="56" r="1.7" fill="#fff"/></g>';
    if(mood!=='still') armR='<g class="wave"><ellipse cx="92" cy="66" rx="7.5" ry="9" fill="'+W+'" stroke="'+K+'" stroke-width="2.4" transform="rotate(20 92 66)"/><path d="M89 61v6M93 60v6" stroke="'+K+'" stroke-width="1.4" stroke-linecap="round"/></g>';
  }
  return '<svg viewBox="0 0 120 124" aria-hidden="true"><g'+(mood==='still'?'':' class="bob"')+'>'+
    '<path class="tail" d="M86 108q22 2 20-20q-1-8-7-6" stroke="'+K+'" stroke-width="2.6" fill="'+O+'" stroke-linejoin="round"/>'+
    '<ellipse cx="60" cy="102" rx="27" ry="18" fill="'+W+'" stroke="'+K+'" stroke-width="2.6"/>'+
    '<path d="M44 92q16 8 32 0" stroke="none" fill="'+O+'" opacity=".55"/>'+
    '<path d="M28 36L26 10l20 14z" fill="'+O+'" stroke="'+K+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path d="M92 36L94 10 74 24z" fill="'+W+'" stroke="'+K+'" stroke-width="2.6" stroke-linejoin="round"/>'+
    '<path d="M31 30l-1-13 9 7z" fill="#F7B9B0"/><path d="M89 30l1-13-9 7z" fill="#F7B9B0"/>'+
    '<ellipse cx="60" cy="58" rx="34" ry="30" fill="'+W+'" stroke="'+K+'" stroke-width="2.6"/>'+
    '<path d="M32 46q6-18 24-18q-6 8-8 20q-10-4-16-2z" fill="'+O+'"/>'+
    '<path d="M70 30q10 2 16 10q-6 0-10 4z" fill="'+O+'" opacity=".8"/>'+
    '<ellipse cx="40" cy="68" rx="5.5" ry="3.4" fill="#F7B9B0" opacity=".85"/><ellipse cx="80" cy="68" rx="5.5" ry="3.4" fill="#F7B9B0" opacity=".85"/>'+
    eyes+'<path d="M57.5 64.5h5l-2.5 3z" fill="#E86A5C" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/>'+mouth+
    '<path d="M34 84q26 10 52 0l-2 7q-24 8-48 0z" fill="'+S+'" stroke="'+K+'" stroke-width="2.2" stroke-linejoin="round"/>'+
    '<path d="M70 90l8 12-9-2z" fill="'+S+'" stroke="'+K+'" stroke-width="2" stroke-linejoin="round"/>'+
    '<circle cx="60" cy="92" r="4" fill="#F4B63B" stroke="'+K+'" stroke-width="1.6"/>'+
    armL+armR+extra+'</g></svg>';
}

/* ---- Senpai: 6 anh chị khóa trước (hư cấu), mỗi người một ngành · 0 Minh nhà máy · 1 Hạnh chế biến thực phẩm · 2 Vy điều dưỡng · 3 Tuấn xây dựng · 4 Linh nhà hàng khách sạn · 5 Phong gara ô tô ---- */
function senpai(mood,v){
  v=(+v||0)%6; mood=mood||'smile';
  var K='#2B2420', SK=['#F3CDA8','#F6D3B5','#EFC39E','#E9BC94','#F5CFAE','#E3B08A'][v], H=['#2A2321','#3B2A22','#1F1A18','#2A2321','#4A3428','#1F1A18'][v];
  var back='', hair='', top='', torso='', arms='', neck='<rect x="52" y="76" width="16" height="14" fill="'+SK+'"/>';
  var base='<path d="M34 96q-8 8-6 22M86 96q8 8 6 22" stroke="@U@" stroke-width="11" stroke-linecap="round" fill="none"/>';
  var U;
  if(v===0){ /* nhà máy: áo khoác xanh, mũ lưỡi trai */
    U='#3566A8';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M50 90l10 10 10-10" fill="#2A5088" stroke="'+K+'" stroke-width="1.8"/><path d="M60 100v24" stroke="#CFE0F8" stroke-width="2"/><rect x="70" y="104" width="13" height="9" rx="2" fill="#fff" stroke="'+K+'" stroke-width="1.5"/><path d="M73 108h7" stroke="#2A74DB" stroke-width="2"/>';
    hair='<path d="M36 50q-1-8 3-12l4 12zM84 50q1-8-3-12l-4 12z" fill="'+H+'"/>';
    top='<path d="M36 42q-1-22 24-22t24 22z" fill="#2B3A55" stroke="'+K+'" stroke-width="2"/><path d="M31 42h58q-4 6-29 6t-29-6z" fill="#1F2A40" stroke="'+K+'" stroke-width="2"/><rect x="54" y="28" width="12" height="7" rx="2" fill="#F4F4F0"/>';
  } else if(v===1){ /* chế biến thực phẩm: áo blouse trắng, mũ lưới, khẩu trang kéo xuống cổ */
    U='#F2F5F8';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M48 90l12 14 12-14" fill="#CFE0F2" stroke="'+K+'" stroke-width="1.8"/><circle cx="60" cy="110" r="1.8" fill="#8FB4D0"/><circle cx="60" cy="118" r="1.8" fill="#8FB4D0"/>';
    neck+='<path d="M48 80h24l-2 9q-10 4-20 0z" fill="#CFE6F5" stroke="#8FB4D0" stroke-width="1.4"/>';
    hair='<path d="M36 52q-1-6 2-10l4 10z" fill="'+H+'"/><path d="M84 52q1-6-2-10l-4 10z" fill="'+H+'"/>';
    top='<path d="M34 47q-2-27 26-27t26 27q-12-9-26-9t-26 9z" fill="#EAF1F8" stroke="#9FB6CC" stroke-width="1.8"/><g fill="#B9CBDD"><circle cx="46" cy="32" r="1.4"/><circle cx="56" cy="27" r="1.4"/><circle cx="66" cy="27" r="1.4"/><circle cx="75" cy="32" r="1.4"/><circle cx="60" cy="34" r="1.4"/></g>';
  } else if(v===2){ /* điều dưỡng: áo scrubs xanh ngọc, thẻ tên, tóc buộc đuôi */
    U='#3FA79E';
    back='<path d="M82 40q22 8 14 42-7-12-14-22z" fill="'+H+'"/>';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M48 90l12 18 12-18" fill="#F3FBF9" stroke="'+K+'" stroke-width="1.8"/><path d="M52 92l5 22M68 92l-5 22" stroke="#2A74DB" stroke-width="2.2"/><rect x="53" y="112" width="14" height="10" rx="2" fill="#fff" stroke="'+K+'" stroke-width="1.5"/><path d="M56 117h8" stroke="#7A8697" stroke-width="1.6"/>';
    hair='<path d="M35 54q-2-30 25-30t25 30q-8-14-25-16q-14 2-25 16z" fill="'+H+'"/><circle cx="85" cy="42" r="4.5" fill="#F29A9A"/>';
  } else if(v===3){ /* xây dựng: mũ bảo hộ vàng, áo phản quang */
    U='#8A93A0';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M50 90l10 12 10-12" fill="#fff" stroke="'+K+'" stroke-width="1.8"/><path d="M26 124q0-26 22-34l6 4-4 30zM94 124q0-26-22-34l-6 4 4 30z" fill="#F0731E" stroke="'+K+'" stroke-width="2"/><path d="M31 112h20M69 112h20" stroke="#FFE9A8" stroke-width="3.6"/>';
    hair='<path d="M36 52q-1-6 2-10l4 10zM84 52q1-6-2-10l-4 10z" fill="'+H+'"/>';
    top='<path d="M34 44q0-26 26-26t26 26z" fill="#F2B21B" stroke="'+K+'" stroke-width="2"/><path d="M56 19v24M64 19v24" stroke="#D99A0B" stroke-width="2"/><rect x="28" y="42" width="64" height="7" rx="3.5" fill="#E5A511" stroke="'+K+'" stroke-width="2"/>';
  } else if(v===4){ /* nhà hàng, khách sạn: sơ mi trắng, gile đen, nơ đỏ, tóc búi */
    U='#F7F7F4';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M26 124q0-26 22-34l8 8-6 26zM94 124q0-26-22-34l-8 8 6 26z" fill="#2E2E38" stroke="'+K+'" stroke-width="2"/><path d="M52 93l8 5-8 5zM68 93l-8 5 8 5z" fill="#C8372D" stroke="'+K+'" stroke-width="1.4"/><circle cx="60" cy="98" r="2.6" fill="#C8372D"/><rect x="72" y="108" width="11" height="6" rx="1.5" fill="#F4B63B" stroke="'+K+'" stroke-width="1.2"/>';
    hair='<path d="M35 54q-3-30 25-30t25 30q-8-14-25-15q-14 1-25 15z" fill="'+H+'"/><circle cx="60" cy="21" r="8.5" fill="'+H+'"/>';
  } else { /* gara ô tô: áo liền quần xám xanh, khăn bandana đỏ, vệt dầu */
    U='#46607E';
    torso='<path d="M24 124q0-36 36-36t36 36z" fill="'+U+'" stroke="'+K+'" stroke-width="2.4"/><path d="M50 90l10 12 10-12" fill="#35495F" stroke="'+K+'" stroke-width="1.8"/><path d="M60 102v22" stroke="#F0731E" stroke-width="3"/><rect x="30" y="106" width="15" height="11" rx="2" fill="#3B536F" stroke="'+K+'" stroke-width="1.5"/><path d="M36 106q1-6 5-4" stroke="#E8E2D6" stroke-width="3" stroke-linecap="round" fill="none"/>';
    hair='<path d="M36 52q-1-6 2-10l4 10zM84 52q1-6-2-10l-4 10z" fill="'+H+'"/>';
    top='<path d="M35 42q25-14 50 0v7q-25-9-50 0z" fill="#C8372D" stroke="'+K+'" stroke-width="1.6"/><path d="M84 42l10-5-2 11z" fill="#C8372D" stroke="'+K+'" stroke-width="1.4"/>';
  }
  /* nét mặt: chỉ đổi biểu cảm, hai tay luôn buông */
  var eyes, brows, mouth, extra='';
  var dots='<g class="blink"><circle cx="51" cy="58" r="3.2" fill="'+K+'"/><circle cx="69" cy="58" r="3.2" fill="'+K+'"/></g>';
  brows='<path d="M46 50q5-3 10 0M64 50q5-3 10 0" stroke="'+K+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
  eyes=dots; mouth='<path d="M52 68q8 7 16 0" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  if(mood==='hi'){
    eyes='<path d="M46 59q5-6 10 0M64 59q5-6 10 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    brows='<path d="M46 49q5-4 10 0M64 49q5-4 10 0" stroke="'+K+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M50 66q10 14 20 0z" fill="#B8453A" stroke="'+K+'" stroke-width="2" stroke-linejoin="round"/>';
  } else if(mood==='think'){
    eyes='<g class="blink"><circle cx="53" cy="57" r="3.2" fill="'+K+'"/><circle cx="71" cy="57" r="3.2" fill="'+K+'"/></g>';
    brows='<path d="M46 47q5-5 10-1M64 51h10" stroke="'+K+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M55 70q5-2 10 1" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  } else if(mood==='wow'){
    eyes='<g class="blink"><circle cx="51" cy="58" r="4.4" fill="'+K+'"/><circle cx="69" cy="58" r="4.4" fill="'+K+'"/><circle cx="52.4" cy="56.4" r="1.4" fill="#fff"/><circle cx="70.4" cy="56.4" r="1.4" fill="#fff"/></g>';
    brows='<path d="M45 47q6-5 12 0M63 47q6-5 12 0" stroke="'+K+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    mouth='<ellipse cx="60" cy="71" rx="4" ry="5" fill="#8A3A30" stroke="'+K+'" stroke-width="1.8"/>';
  } else if(mood==='worry'){
    brows='<path d="M45 52l10-3M75 52l-10-3" stroke="'+K+'" stroke-width="2.2" stroke-linecap="round"/>';
    mouth='<path d="M52 72q8-6 16 0" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    extra='<path d="M84 44q3 5 0 8q-3-3 0-8z" fill="#8FD0E8" stroke="#4A9BBE" stroke-width="1.2"/>';
  } else if(mood==='laugh'){
    eyes='<path d="M46 60q5-7 10 0M64 60q5-7 10 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    mouth='<path d="M48 65h24q-2 13-12 13t-12-13z" fill="#B8453A" stroke="'+K+'" stroke-width="2" stroke-linejoin="round"/>';
  }
  return '<svg viewBox="0 0 120 124" aria-hidden="true"><g class="bob">'+back+
    torso+base.replace('@U@',U)+neck+
    '<ellipse cx="60" cy="56" rx="24" ry="27" fill="'+SK+'" stroke="'+K+'" stroke-width="2.4"/>'+hair+top+
    eyes+brows+mouth+
    '<ellipse cx="44" cy="64" rx="4" ry="2.4" fill="#F0A493" opacity=".6"/><ellipse cx="76" cy="64" rx="4" ry="2.4" fill="#F0A493" opacity=".6"/>'+
    (v===5?'<path d="M72 63q3-2 6 0" stroke="#5A4636" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>':'')+extra+
    '</g></svg>';
}


/* ---- Hội Virus: Lười · Ngại · Hay Quên · Để Mai (cùng dáng, khác màu và đồ vật) · mood: smug · poof ---- */
function virus(kind, mood){
  kind = VIRUS[kind] ? kind : 'luoi';
  var K='#3B3354', B=VIRUS[kind].c;
  if(mood==='poof'){
    return '<svg viewBox="0 0 120 124" aria-hidden="true"><g>'+
      '<circle cx="46" cy="76" r="18" fill="#EEF0F7"/><circle cx="70" cy="70" r="22" fill="#F4F6FE"/><circle cx="60" cy="88" r="16" fill="#EEF0F7"/>'+
      '<ellipse cx="62" cy="80" rx="14" ry="11" fill="'+B+'" stroke="'+K+'" stroke-width="2"/>'+
      '<path d="M55 78l4 4M59 78l-4 4M65 78l4 4M69 78l-4 4" stroke="'+K+'" stroke-width="1.8" stroke-linecap="round"/>'+
      '<g fill="#F7B9C8"><circle cx="24" cy="44" r="4"/><circle cx="96" cy="40" r="3.5"/><circle cx="88" cy="22" r="3"/><circle cx="32" cy="24" r="3"/></g></g></svg>';
  }
  var bumps=''; for(var i=0;i<10;i++){ var a=i*36*Math.PI/180; bumps+='<circle cx="'+(60+Math.cos(a)*33).toFixed(1)+'" cy="'+(62+Math.sin(a)*30).toFixed(1)+'" r="7" fill="'+B+'" stroke="'+K+'" stroke-width="2.2"/>'; }
  var face='', prop='';
  if(kind==='luoi'){
    face='<path d="M42 56q6 4 12 0M66 56q6 4 12 0" stroke="'+K+'" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40 50h15M65 50h15" stroke="'+K+'" stroke-width="2.4" stroke-linecap="round"/><path d="M50 72q10 6 20 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    prop='<ellipse cx="60" cy="102" rx="28" ry="8" fill="#fff" stroke="'+K+'" stroke-width="2"/>';
  } else if(kind==='ngai'){
    face='<g class="blink"><circle cx="48" cy="56" r="3.6" fill="'+K+'"/><circle cx="72" cy="56" r="3.6" fill="'+K+'"/></g><ellipse cx="42" cy="66" rx="6" ry="3.5" fill="#F06A8E" opacity=".6"/><ellipse cx="78" cy="66" rx="6" ry="3.5" fill="#F06A8E" opacity=".6"/><path d="M54 72q6-3 12 0" stroke="'+K+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    prop='<ellipse cx="38" cy="78" rx="9" ry="7" fill="'+B+'" stroke="'+K+'" stroke-width="2.2"/><ellipse cx="82" cy="78" rx="9" ry="7" fill="'+B+'" stroke="'+K+'" stroke-width="2.2"/>';
  } else if(kind==='quen'){
    face='<path d="M43 56a5 5 0 1 1 6 4M67 56a5 5 0 1 1 6 4" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="60" cy="72" rx="4" ry="3.5" fill="'+K+'"/>';
    prop='<g transform="translate(86 6)"><circle r="13" cx="13" cy="13" fill="#fff" stroke="'+K+'" stroke-width="2"/><text x="13" y="19" text-anchor="middle" style="font-family:\'Roboto Flex\',sans-serif;font-weight:800" font-size="17" fill="#3A7FC4">?</text></g>';
  } else {
    face='<g class="blink"><circle cx="48" cy="56" r="4.4" fill="'+K+'"/><circle cx="72" cy="56" r="4.4" fill="'+K+'"/></g><path d="M50 70q10 8 20 0" stroke="'+K+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    prop='<g transform="translate(78 70) rotate(12)"><rect width="30" height="32" rx="4" fill="#fff" stroke="'+K+'" stroke-width="2"/><rect width="30" height="9" rx="3" fill="#E8604F"/><text x="15" y="26" text-anchor="middle" style="font-family:\'Roboto Flex\',sans-serif;font-weight:800" font-size="10" fill="'+K+'">mai</text></g>';
  }
  return '<svg viewBox="0 0 120 124" aria-hidden="true"><g class="bob">'+bumps+
    '<ellipse cx="60" cy="62" rx="33" ry="30" fill="'+B+'" stroke="'+K+'" stroke-width="2.4"/>'+face+prop+'</g></svg>';
}
function av(who, mood){ if(who==='senpai') return senpai(mood,0); if(/^senpai\d$/.test(who)) return senpai(mood,+who.slice(6)); if(VIRUS[who]) return virus(who,mood); return shin(mood); }


/* ---- Con dấu ---- */
function hanko(kind, big){
  var c = kind==='p' ? '#E58A1F' : kind==='t' ? '#C8372D' : kind==='f' ? '#16A874' : '#C8372D';
  var txt = kind==='p' ? '少し' : kind==='t' ? '先生' : kind==='f' ? '友' : 'よし';
  var fs = txt.length>1 ? 15 : 22;
  return '<svg viewBox="0 0 60 60" aria-hidden="true"'+(big?' class="pop"':'')+' style="transform:rotate(-8deg)">'+
    '<circle cx="30" cy="30" r="25" fill="none" stroke="'+c+'" stroke-width="3.4"/>'+
    '<circle cx="30" cy="30" r="20.5" fill="'+c+'" opacity="'+(kind==='p'?'.12':'.08')+'" stroke="'+c+'" stroke-width="1.2"/>'+
    '<text x="30" y="'+(30+fs*0.36)+'" text-anchor="middle" style="'+FONT_JP+';font-weight:700" font-size="'+fs+'" fill="'+c+'">'+txt+'</text></svg>';
}
function missDot(){ return '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M22 30h16" stroke="#C9B98F" stroke-width="3" stroke-linecap="round"/></svg>'; }

/* ---- Hình hướng dẫn ---- */
function person(x, y, ang, opts){
  opts = opts||{};
  var K='#2B2420';
  var legs='<rect x="'+(x-8)+'" y="'+y+'" width="16" height="52" rx="6" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.8"/><path d="M'+(x-10)+' '+(y+52)+'h24" stroke="'+K+'" stroke-width="5" stroke-linecap="round"/>';
  var body='<g transform="rotate('+ang+' '+x+' '+y+')">'+
    '<rect x="'+(x-13)+'" y="'+(y-50)+'" width="26" height="54" rx="11" fill="#EAF4F5" stroke="'+K+'" stroke-width="1.8"/>'+
    '<path d="M'+(x+2)+' '+(y-44)+'v34" stroke="'+K+'" stroke-width="7" stroke-linecap="round"/><path d="M'+(x+2)+' '+(y-44)+'v34" stroke="#EAF4F5" stroke-width="4" stroke-linecap="round"/>'+
    '<circle cx="'+x+'" cy="'+(y-64)+'" r="13" fill="#F3CDA8" stroke="'+K+'" stroke-width="1.8"/>'+
    '<path d="M'+(x-13)+' '+(y-66)+'q2-14 15-13q10 1 11 10q-8-4-13 0z" fill="#2A2321"/>'+
    '<circle cx="'+(x+6)+'" cy="'+(y-64)+'" r="1.6" fill="'+K+'"/>'+
    (opts.smile?'<path d="M'+(x+3)+' '+(y-58)+'q4 3 8 0" stroke="'+K+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>':'')+
    '</g>';
  return legs+body;
}
function illSVG(n){
  var T=function(x,y,t,o){ o=o||{}; return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" style="'+(o.jp?FONT_JP:FONT_SVG)+';font-weight:'+(o.w||600)+'" font-size="'+(o.s||12)+'" fill="'+(o.c||'#16302F')+'">'+t+'</text>'; };
  if(n==='gosen'){
    return '<svg viewBox="0 0 340 190" role="img" aria-label="Nói lời chào trước, cúi sau">'+
      '<rect x="6" y="6" width="158" height="178" rx="16" fill="#F4F6FE"/><rect x="176" y="6" width="158" height="178" rx="16" fill="#F4F6FE"/>'+
      person(70,104,0,{smile:1})+
      '<path d="M92 40h62a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-52l-10 8 2-8a8 8 0 0 1-8-8V48a8 8 0 0 1 6-8z" fill="#fff" stroke="#2A74DB" stroke-width="1.6"/>'+
      T(126,61,'おはよう',{jp:1,s:12,c:'#1D5FD1'})+
      person(250,104,16,{smile:1})+
      '<path d="M288 54a40 40 0 0 1 10 18" stroke="#F4B63B" stroke-width="2.4" fill="none" stroke-dasharray="3 3"/>'+T(306,62,'15°',{s:12,w:700,c:'#C98A12'})+
      T(85,178,'1. Nói lời chào trước',{s:12.5,w:700,c:'#1D5FD1'})+T(255,178,'2. Rồi mới cúi',{s:12.5,w:700,c:'#1D5FD1'})+'</svg>';
  }
  if(n==='bow'){
    var a=[[15,'会釈','Chào hằng ngày'],[30,'敬礼','Khách, cấp trên'],[45,'最敬礼','Xin lỗi, cảm ơn sâu']], s='';
    a.forEach(function(r,i){ var x=60+i*110;
      s+='<path d="M'+x+' 102V28" stroke="#C9CEE0" stroke-width="1.6" stroke-dasharray="4 4"/>'+person(x,102,r[0],{smile:1});
      s+=T(x,176,r[0]+'°',{s:15,w:800,c:'#2A74DB'})+T(x,194,r[1],{jp:1,s:12,c:'#45605F'})+T(x,211,r[2],{s:11.5,c:'#45605F'});
    });
    return '<svg viewBox="0 0 340 218" role="img" aria-label="Ba mức cúi chào: 15, 30 và 45 độ">'+s+'</svg>';
  }
  if(n==='desk'){
    var desk=function(x){ return '<rect x="'+x+'" y="96" width="140" height="10" rx="3" fill="#C99A6B" stroke="#8A5A3B" stroke-width="1.5"/><path d="M'+(x+12)+' 106v40M'+(x+128)+' 106v40" stroke="#8A5A3B" stroke-width="5" stroke-linecap="round"/>'; };
    var messy='<g transform="rotate(-14 40 80)"><rect x="24" y="74" width="40" height="11" rx="2" fill="#7FB3D5" stroke="#2B2420" stroke-width="1.2"/></g>'+
      '<g transform="rotate(10 78 82)"><rect x="62" y="78" width="36" height="10" rx="2" fill="#F4B63B" stroke="#2B2420" stroke-width="1.2"/></g>'+
      '<circle cx="118" cy="88" r="6" fill="#fff" stroke="#2B2420" stroke-width="1.2"/><path d="M114 86l8 4M116 92l5-7" stroke="#999" stroke-width="1"/>'+
      '<path d="M100 92l22-6" stroke="#E8604F" stroke-width="3" stroke-linecap="round"/><path d="M34 94l18 2" stroke="#2A74DB" stroke-width="3" stroke-linecap="round"/>'+
      '<rect x="128" y="74" width="12" height="20" rx="3" fill="#BFE3F0" stroke="#2B2420" stroke-width="1.2" transform="rotate(20 134 84)"/>'+
      '<path d="M40 124q6-4 10 0q4 4 8 0" stroke="#bbb" stroke-width="2" fill="none"/><circle cx="96" cy="140" r="5" fill="#fff" stroke="#bbb"/>';
    var tidy='<rect x="196" y="82" width="44" height="7" rx="2" fill="#7FB3D5" stroke="#2B2420" stroke-width="1.2"/><rect x="198" y="75" width="40" height="7" rx="2" fill="#F4B63B" stroke="#2B2420" stroke-width="1.2"/><rect x="200" y="89" width="38" height="7" rx="2" fill="#9BD3AE" stroke="#2B2420" stroke-width="1.2"/>'+
      '<rect x="292" y="74" width="16" height="22" rx="3" fill="#BFE3F0" stroke="#2B2420" stroke-width="1.2"/><path d="M296 74l-2-12M300 74v-13M304 74l2-12" stroke="#E8604F" stroke-width="2.4" stroke-linecap="round"/>'+
      '<g fill="#F4B63B"><path d="M262 60l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/><path d="M318 52l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/></g>';
    return '<svg viewBox="0 0 340 184" role="img" aria-label="Bàn học trước và sau 1 phút 5S">'+
      desk(16)+messy+desk(184)+tidy+
      '<path d="M160 100h18" stroke="#2A74DB" stroke-width="2.6" stroke-linecap="round"/><path d="M172 94l7 6-7 6" stroke="#2A74DB" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      T(86,172,'Trước',{s:13,w:700,c:'#8E2F22'})+T(254,172,'Sau 1 phút',{s:13,w:700,c:'#0B6E4B'})+'</svg>';
  }
  if(n==='shoes'){
    var shoe=function(x,y,r,c){ return '<g transform="translate('+x+' '+y+') rotate('+r+')"><path d="M-7 14v-16q0-12 7-12t7 12v16q0 4-7 4t-7-4z" fill="'+c+'" stroke="#2B2420" stroke-width="1.4"/><path d="M-4 -6h8" stroke="#fff" stroke-width="1.6"/></g>'; };
    var s='<rect x="6" y="6" width="328" height="34" rx="10" fill="#E5EFFC"/>'+T(170,28,'Cửa ra vào',{s:12.5,w:700,c:'#1D5FD1'})+
      '<path d="M170 64V46M164 52l6-6 6 6" stroke="#2A74DB" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<rect x="6" y="70" width="328" height="80" rx="12" fill="#F6EFE1"/><path d="M170 74v72" stroke="#E2D3B2" stroke-width="2" stroke-dasharray="4 4"/>';
    s+=shoe(40,104,140,'#7FB3D5')+shoe(70,118,-60,'#7FB3D5')+shoe(110,96,200,'#F29A3C')+shoe(132,124,30,'#F29A3C');
    s+=shoe(210,108,0,'#7FB3D5')+shoe(228,108,0,'#7FB3D5')+shoe(276,108,0,'#F29A3C')+shoe(294,108,0,'#F29A3C');
    s+=T(88,170,'Chưa gọn',{s:12.5,w:700,c:'#8E2F22'})+T(252,170,'Xếp đôi, mũi hướng ra cửa',{s:12.5,w:700,c:'#0B6E4B'});
    return '<svg viewBox="0 0 340 180" role="img" aria-label="Xếp giày ở lối vào, mũi hướng ra cửa">'+s+'</svg>';
  }
  if(n==='time'){
    var z='<rect x="20" y="70" width="110" height="16" rx="8" fill="#14A874"/><rect x="130" y="70" width="90" height="16" fill="#F4B63B"/><rect x="220" y="70" width="100" height="16" rx="8" fill="#E8604F"/><rect x="220" y="70" width="16" height="16" fill="#E8604F"/><rect x="120" y="70" width="16" height="16" fill="#14A874"/>';
    var tk=[[20,'7:45'],[130,'7:55'],[220,'8:00']];
    tk.forEach(function(k){ z+='<path d="M'+k[0]+' 62v32" stroke="#18203F" stroke-width="1.6"/>'+T(k[0],56,k[1],{s:12,w:800}); });
    z+=T(75,112,'Chuẩn Nhật',{s:12.5,w:800,c:'#0B7A53'})+T(75,128,'kịp chào, bày sách',{s:11,c:'#4A5275'});
    z+=T(175,112,'Sát giờ',{s:12.5,w:800,c:'#946400'})+T(175,128,'còn lúng túng',{s:11,c:'#4A5275'});
    z+=T(270,112,'Trễ',{s:12.5,w:800,c:'#B5402F'})+T(270,128,'cả lớp chờ mình',{s:11,c:'#4A5275'});
    z+='<g transform="translate(66 20)"><circle r="11" fill="#2A74DB"/><path d="M-4 0l3 3 6-6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'+T(150,26,'Giờ học: 8:00',{s:13,w:800,c:'#1D5FD1'});
    return '<svg viewBox="0 0 340 140" role="img" aria-label="Đến sớm 5 đến 15 phút là đúng giờ kiểu Nhật">'+z+'</svg>';
  }
  if(n==='memo'){
    var m='<rect x="70" y="10" width="200" height="200" rx="14" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.6"/>';
    for(var r=0;r<6;r++){ m+='<circle cx="'+(96+r*30)+'" cy="10" r="4.5" fill="#fff" stroke="#686E76" stroke-width="1.6"/>'; }
    m+=T(86,38,'Thứ Sáu, 14/11',{a:'start',s:12,w:700,c:'#686E76'})+'<path d="M86 46h168" stroke="#EADCB8" stroke-width="1.4"/>';
    var rows=[['Ai','Cô Dung'],['Việc','Nộp ảnh 5S phòng'],['Khi nào','Thứ Hai, 17:00'],['Lưu ý','Ảnh trước và sau']];
    rows.forEach(function(r,i){ var y=72+i*30; m+=T(86,y,r[0]+':',{a:'start',s:12.5,w:800,c:'#2A74DB'})+T(150,y,r[1],{a:'start',s:12.5,w:600})+'<path d="M86 '+(y+9)+'h168" stroke="#F1E8D2" stroke-width="1"/>'; });
    m+='<g transform="translate(86 186)"><rect width="16" height="16" rx="4" fill="#14A874"/><path d="M4 8l3 3 5-6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>'+T(110,198,'Đã đọc lại cho cô',{a:'start',s:12,w:700,c:'#0B7A53'});
    return '<svg viewBox="0 0 340 220" role="img" aria-label="Một trang memo mẫu">'+m+'</svg>';
  }
  if(n==='sorry'){
    var b=function(x,t,c){ return '<rect x="'+x+'" y="20" width="96" height="52" rx="14" fill="'+c+'"/>'+T(x+48,51,t,{s:12.5,w:800,c:'#fff'}); };
    var ar=function(x){ return '<path d="M'+x+' 46h10M'+(x+6)+' 41l5 5-5 5" stroke="#4A5275" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };
    var z=b(6,'Xin lỗi','#2A74DB')+ar(105)+b(122,'Sai ở đâu','#2A74DB')+ar(221)+b(238,'Cách sửa','#14A874');
    z+='<rect x="110" y="96" width="120" height="36" rx="18" fill="#FDECE8" stroke="#F3B2A7"/>'+T(170,119,'“Tại vì…”',{s:13,w:700,c:'#8E2F22'})+'<path d="M112 98l116 32" stroke="#E8604F" stroke-width="3" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 340 145" role="img" aria-label="Xin lỗi, nói sai ở đâu, nói sẽ sửa thế nào. Không mở đầu bằng tại vì">'+z+'</svg>';
  }
  if(n==='thanks'){
    var z2='<rect x="10" y="20" width="130" height="44" rx="16" fill="#EEF0F7"/>'+T(75,47,'“Cảm ơn.”',{s:13,w:700,c:'#7A82A3'});
    z2+='<rect x="160" y="14" width="170" height="56" rx="16" fill="#E5EFFC" stroke="#2A74DB" stroke-width="1.6"/>'+T(245,38,'“Cảm ơn bạn đã cho',{s:12.5,w:700,c:'#1D5FD1'})+T(245,56,'mình mượn bút!”',{s:12.5,w:700,c:'#1D5FD1'});
    z2+=T(75,90,'Nghe cho có',{s:12,w:700,c:'#7A82A3'})+T(245,90,'Người nghe thấy được trân trọng',{s:12,w:700,c:'#0B7A53'});
    return '<svg viewBox="0 0 340 100" role="img" aria-label="Cảm ơn kèm việc cụ thể">'+z2+'</svg>';
  }
  if(n==='promise'){
    var p='<rect x="10" y="14" width="150" height="80" rx="16" fill="#FDECE8"/>'+T(85,40,'Hứa to',{s:12.5,w:800,c:'#8E2F22'})+T(85,62,'“Học 100 từ”',{s:13,w:700,c:'#8E2F22'})+T(85,82,'dễ bỏ giữa chừng',{s:11,c:'#8E2F22'});
    p+='<rect x="180" y="14" width="150" height="80" rx="16" fill="#E2F7EE"/>'+T(255,40,'Hứa nhỏ',{s:12.5,w:800,c:'#0B6E4B'})+T(255,62,'“Học 10 từ”',{s:13,w:700,c:'#0B6E4B'})+T(255,82,'giữ được mỗi ngày',{s:11,c:'#0B6E4B'});
    return '<svg viewBox="0 0 340 104" role="img" aria-label="Hứa nhỏ dễ giữ hơn hứa to">'+p+'</svg>';
  }
  return '';
}
var ILL_CAP = {gosen:'Nói trước, cúi sau (語先後礼).', bow:'Hằng ngày chỉ cần cúi 15°.', desk:'Một phút là đủ.', shoes:'Giày để ở lối vào, mũi hướng ra cửa.', time:'Đến sớm 5–15 phút để kịp chuẩn bị.', memo:'Một trang memo: ai, việc gì, khi nào, lưu ý.', sorry:'Ba bước nhận lỗi.', thanks:'Cảm ơn kèm việc cụ thể.', promise:'Hứa vừa sức để giữ được.'};
function xDot(){ return '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="5" fill="#C9CEE0"/></svg>'; }
function ring(pct,col,sz){ var r=sz/2-3, c=2*Math.PI*r; col=col||'#2A74DB';
  return '<svg class="ring" viewBox="0 0 '+sz+' '+sz+'" aria-hidden="true"><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="#E6ECF5" stroke-width="4"/>'+
    '<circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+(c*pct).toFixed(1)+' '+c.toFixed(1)+'"/></svg>'; }

/* ---- Sao cấp thẻ ---- */
function stars(lv,sz,light){ var h='', col=['#C9C1AF','#C98B5B','#9DA9BC','#E3A916'][lv]||'#C9C1AF', off=light?'rgba(255,255,255,.35)':'#E2DCCD'; sz=sz||12; for(var i=1;i<=3;i++){ h+='<svg class="'+(i<=lv?'on':'off')+'" viewBox="0 0 12 12" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path d="M6 .8L11.2 6 6 11.2.8 6z" fill="'+(i<=lv?col:off)+'"/></svg>'; } return '<span class="stars" aria-label="Cấp '+lv+' trên 3">'+h+'</span>'; }

/* ---- Hình ẩn dụ mặt sau thẻ (vẽ gốc, nét trắng–vàng trên nền xanh) ---- */
function metaSVG(id){
  if(HMAP[id] && HMAP[id].custom) return customArt(id);
  var W='#fff', G='#FFD772', L='#9EC2FF', T='rgba(255,255,255,.35)', s='';
  var A=L, DK='#1D4FB8';
  if(id==='chao'){
    s='<path d="M20 150h200" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>'+
      '<path d="M86 150C86 108 96 76 122 58" stroke="'+L+'" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M122 150C122 102 136 62 170 40C184 32 194 40 196 52" stroke="'+W+'" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    var pts=[[192,58],[194,68],[195,78],[194,88],[192,98],[188,107]]; pts.forEach(function(q,i){ s+='<ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="5.5" ry="9" fill="'+G+'" transform="rotate('+(10-i*7)+' '+q[0]+' '+q[1]+')"/>'; });
    var p2=[[124,64],[127,73],[128,82],[127,91]]; p2.forEach(function(q){ s+='<ellipse cx="'+q[0]+'" cy="'+q[1]+'" rx="4.5" ry="7.5" fill="'+L+'" opacity=".8"/>'; });
    s+='<path d="M122 118c-14-6-26-4-36 4 12 2 24 0 36-4zM124 96c12-8 26-10 40-6-10 6-24 8-40 6z" fill="'+W+'" opacity=".85"/>'+
      '<circle cx="52" cy="46" r="16" fill="'+G+'" opacity=".9"/>';
  } else if(id==='som'){
    s='<path d="M20 120h200" stroke="'+T+'" stroke-width="2"/><path d="M20 120l40-26 30 18 36-30 44 38" stroke="'+L+'" stroke-width="3" fill="none" stroke-linejoin="round"/>'+
      '<path d="M78 120a42 42 0 0 1 84 0z" fill="'+G+'"/>';
    for(var a=0;a<7;a++){ var an=Math.PI*(a/6), x1=120-Math.cos(an)*52, y1=120-Math.sin(an)*52, x2=120-Math.cos(an)*64, y2=120-Math.sin(an)*64; s+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="'+G+'" stroke-width="3.4" stroke-linecap="round"/>'; }
    s+='<circle cx="120" cy="104" r="14" fill="'+W+'"/><path d="M120 96v8l6 3" stroke="#1D4FB8" stroke-width="2.6" fill="none" stroke-linecap="round"/>'+
      '<path d="M40 140h160M60 152h120" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>';
  } else if(id==='memo'){
    s='<path d="M120 46c-22-10-48-10-70-2v94c22-8 48-8 70 2z" fill="'+W+'"/><path d="M120 46c22-10 48-10 70-2v94c-22-8-48-8-70 2z" fill="'+W+'" opacity=".9"/>'+
      '<path d="M120 46v94" stroke="#1D4FB8" stroke-width="2"/>';
    for(var r=0;r<5;r++){ s+='<path d="M62 '+(66+r*14)+'h46M132 '+(66+r*14)+'h46" stroke="'+L+'" stroke-width="2.4" stroke-linecap="round"/>'; }
    s+='<path d="M186 30l18 18-56 56-22 6 6-22z" fill="'+G+'"/><path d="M182 34l18 18" stroke="#1D4FB8" stroke-width="2"/>'+
      '<path d="M40 30l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="'+G+'"/>';
  } else if(id==='5s'){
    s='<path d="M30 118q22-8 44 0t44 0 44 0 44 0" stroke="'+L+'" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M44 136q22-6 44 0t44 0 44 0" stroke="'+T+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '<path d="M88 74c16-26 34-34 50-30-10 6-16 14-18 24 14-12 34-16 52-12-18 6-32 16-42 30-14 2-28-2-42-12z" fill="'+W+'"/>'+
      '<path d="M138 66l14-6-6 12z" fill="'+G+'"/><circle cx="132" cy="60" r="2.4" fill="#1D4FB8"/>'+
      '<path d="M96 100c10 4 22 4 32 0" stroke="'+T+'" stroke-width="2" fill="none" stroke-linecap="round"/>'+
      '<circle cx="196" cy="38" r="14" fill="'+G+'" opacity=".9"/>';
  } else if(id==='camon'){
    s='<path d="M120 128s-34-20-34-44a19 19 0 0 1 34-11 19 19 0 0 1 34 11c0 24-34 44-34 44z" fill="'+G+'"/>'+
      '<path d="M64 92a56 56 0 0 1 100-36" stroke="'+W+'" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M160 44l6 14-15 2" stroke="'+W+'" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M176 92a56 56 0 0 1-100 36" stroke="'+L+'" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M80 140l-6-14 15-2" stroke="'+L+'" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  } else if(id==='xinloi'){
    s='<path d="M50 150l26-46h88l26 46z" fill="'+W+'" opacity=".9"/><path d="M120 104l-8 16 10 10-6 20" stroke="#1D4FB8" stroke-width="3" fill="none" stroke-linejoin="round"/>'+
      '<path d="M120 104V62" stroke="#7FE0B0" stroke-width="3.6" stroke-linecap="round"/>'+
      '<path d="M120 80c-18-2-28-14-28-28 16 0 28 12 28 28z" fill="#7FE0B0"/><path d="M120 70c14-2 24-12 24-26-14 0-24 10-24 26z" fill="#B6F0D2"/>'+
      '<circle cx="186" cy="40" r="14" fill="'+G+'" opacity=".9"/>';
  } else if(id==='loihua'){
    s='<path d="M150 46l26-30 26 30z" fill="'+W+'"/><path d="M168 26l8-10 8 10-4-2-4 4-4-4z" fill="#1D4FB8" opacity=".25"/>'+
      '<path d="M176 16V2" stroke="'+W+'" stroke-width="2"/><path d="M176 2h16l-4 4 4 4h-16z" fill="'+G+'"/>'+
      '<path d="M46 150c40-6 20-30 60-36s20-30 52-38 22-20 18-30" stroke="'+W+'" stroke-width="3" fill="none" stroke-dasharray="7 7" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><ellipse cx="40" cy="152" rx="5" ry="8" transform="rotate(-20 40 152)"/><ellipse cx="54" cy="140" rx="5" ry="8" transform="rotate(-20 54 140)"/></g>';
  } else if(id==='5phut'){ /* 塵も積もれば山となる: hạt bụi nhỏ gom lại thành núi */
    s='<path d="M20 140h200" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>'+
      '<path d="M52 140L120 54l68 86z" fill="'+W+'" opacity=".92"/>'+
      '<path d="M84 104h72M72 120h96" stroke="'+A+'" stroke-width="2.6" stroke-linecap="round"/>'+
      '<path d="M104 78q16 8 32 0" stroke="'+A+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><circle cx="120" cy="30" r="3.4"/><circle cx="108" cy="40" r="2.6"/><circle cx="133" cy="42" r="2.6"/><circle cx="120" cy="46" r="2.2"/></g>'+
      '<g fill="'+T+'"><circle cx="92" cy="30" r="2.4"/><circle cx="150" cy="34" r="2.4"/><circle cx="170" cy="56" r="2"/><circle cx="72" cy="52" r="2"/></g>'+
      '<circle cx="196" cy="34" r="12" fill="'+G+'" opacity=".9"/>';
  } else if(id==='gopy'){ /* 良薬は口に苦し: bát thuốc đắng, mầm khỏe lên */
    s='<path d="M100 82q-9-12 0-22t0-20M120 78q-9-12 0-22t0-20M140 82q-9-12 0-22t0-20" stroke="rgba(255,255,255,.6)" stroke-width="3.4" fill="none" stroke-linecap="round"/>'+
      '<path d="M58 94h124q-4 36-62 36t-62-36z" fill="'+W+'"/><ellipse cx="120" cy="94" rx="62" ry="9" fill="#2E8B57"/><ellipse cx="120" cy="94" rx="62" ry="9" fill="none" stroke="'+W+'" stroke-width="2.6"/>'+
      '<path d="M94 132h52" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/>'+
      '<path d="M190 112V84" stroke="'+A+'" stroke-width="3.6" stroke-linecap="round"/><path d="M190 96c-16-2-24-12-24-24 14 0 24 10 24 24z" fill="'+G+'"/><path d="M190 88c12-2 20-10 20-22-12 0-20 8-20 22z" fill="'+W+'"/>'+
      '<path d="M40 52l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="'+G+'"/>';
  } else if(id==='camxuc'){ /* 短気は損気: nồi sôi trào, hạ lửa cho dịu */
    s='<path d="M72 74h96v48q0 10-10 10H82q-10 0-10-10z" fill="'+W+'"/>'+
      '<g transform="rotate(-9 120 68)"><path d="M76 68q44-34 88 0z" fill="'+W+'" opacity=".92"/><circle cx="120" cy="40" r="5.5" fill="'+G+'"/></g>'+
      '<path d="M72 92h-22M168 92h22" stroke="'+W+'" stroke-width="5" stroke-linecap="round"/>'+
      '<g fill="'+A+'"><circle cx="96" cy="72" r="7"/><circle cx="116" cy="68" r="6"/><circle cx="138" cy="70" r="7"/><circle cx="156" cy="74" r="5"/></g>'+
      '<path d="M72 80q-7 14 0 30" stroke="'+A+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
      '<path d="M120 152q-9-7 0-18q9 11 0 18zM100 152q-6-5 0-12q6 7 0 12zM140 152q-6-5 0-12q6 7 0 12z" fill="'+G+'"/>'+
      '<path d="M196 28q8 12 0 20q-8-8 0-20z" fill="'+A+'"/><path d="M214 56q6 9 0 15q-6-6 0-15z" fill="'+A+'" opacity=".7"/>';
  } else if(id==='vandong'){ /* 継続は力なり: từng bậc, đều chân sẽ lên cao */
    s='<circle cx="40" cy="38" r="13" fill="'+G+'" opacity=".9"/>'+
      '<path d="M40 142v-14h36v14zM76 142v-30h36v30zM112 142v-46h36v46zM148 142v-62h36v62z" fill="'+W+'" opacity=".92"/>'+
      '<path d="M40 128h36M76 112h36M112 96h36M148 80h36" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><ellipse cx="54" cy="122" rx="3.4" ry="5.4" transform="rotate(10 54 122)"/><ellipse cx="64" cy="120" rx="3.4" ry="5.4" transform="rotate(10 64 120)"/><ellipse cx="90" cy="106" rx="3.4" ry="5.4" transform="rotate(10 90 106)"/><ellipse cx="100" cy="104" rx="3.4" ry="5.4" transform="rotate(10 100 104)"/><ellipse cx="126" cy="90" rx="3.4" ry="5.4" transform="rotate(10 126 90)"/><ellipse cx="136" cy="88" rx="3.4" ry="5.4" transform="rotate(10 136 88)"/></g>'+
      '<path d="M176 80V40" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"/><path d="M176 40h22l-6 7 6 7h-22z" fill="'+G+'"/>';
  } else if(id==='anuong'){ /* 腹八分目: bát cơm vừa tám phần */
    for(var k=0;k<10;k++){ var an=-Math.PI/2+k*Math.PI*2/10, cx=120+Math.cos(an)*56, cy=82+Math.sin(an)*56; s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="5.2" fill="'+(k<8?G:T)+'"/>'; }
    s+='<path d="M82 86h76q-2 30-38 30t-38-30z" fill="'+W+'"/><path d="M88 86q32-36 64 0z" fill="'+W+'" opacity=".95"/>'+
      '<path d="M104 76q4-4 8 0M122 70q4-4 8 0M134 78q3-3 6 0" stroke="'+A+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
      '<path d="M146 66l38-24M154 74l38-24" stroke="'+G+'" stroke-width="3.6" stroke-linecap="round"/>'+
      '<path d="M100 124h40" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/>';
  } else if(id==='ngu'){ /* 寝る子は育つ: đêm ngủ ngon, mầm lớn lên */
    s='<path d="M178 22a26 26 0 1 0 24 40a22 22 0 0 1-24-40z" fill="'+G+'"/>'+
      '<g fill="'+W+'"><path d="M58 32l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M96 20l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/><path d="M148 42l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z"/></g>'+
      '<path d="M96 150l6-30h36l6 30z" fill="'+W+'" opacity=".95"/><path d="M100 128h40" stroke="'+A+'" stroke-width="2.4" stroke-linecap="round"/>'+
      '<path d="M120 120V82" stroke="'+A+'" stroke-width="4" stroke-linecap="round"/><path d="M120 96c-18-2-28-14-28-28 16 0 28 12 28 28z" fill="'+A+'"/><path d="M120 86c14-2 24-12 24-26-14 0-24 10-24 26z" fill="'+W+'"/>'+
      '<path d="M56 78h13l-13 15h13M76 58h9l-9 11h9" stroke="'+W+'" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  } else if(id==='bot'){ /* 急がば回れ: đường vòng mà chắc */
    s='<ellipse cx="120" cy="92" rx="64" ry="32" fill="rgba(255,255,255,.24)"/>'+
      '<path d="M50 92h140" stroke="'+T+'" stroke-width="3" stroke-dasharray="6 7" stroke-linecap="round"/>'+
      '<path d="M114 85l12 14M126 85l-12 14" stroke="'+W+'" stroke-width="3.4" stroke-linecap="round"/>'+
      '<path d="M50 92q18 46 70 46t70-46" stroke="'+W+'" stroke-width="4.4" fill="none" stroke-linecap="round"/>'+
      '<circle cx="50" cy="92" r="6" fill="'+G+'"/><path d="M192 92V60" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"/><path d="M192 60h20l-6 7 6 7h-20z" fill="'+G+'"/>'+
      '';
  } else if(id==='chitieu'){ /* 安物買いの銭失い: mua rẻ rồi tiền cũng mất */
    s='<rect x="64" y="46" width="112" height="56" rx="12" fill="'+W+'"/><circle cx="82" cy="74" r="6" fill="'+DK+'" opacity=".55"/>'+
      '<path d="M106 62h44M106 78h30" stroke="'+A+'" stroke-width="3.4" stroke-linecap="round"/>'+
      '<path d="M130 46l-8 14 11 11-11 12 8 19" stroke="'+DK+'" stroke-width="3.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><circle cx="84" cy="128" r="11"/><circle cx="114" cy="138" r="11"/><circle cx="146" cy="130" r="11"/><circle cx="174" cy="140" r="9"/></g>'+
      '<g stroke="'+DK+'" stroke-width="2.2" fill="none" opacity=".4"><circle cx="84" cy="128" r="6.5"/><circle cx="114" cy="138" r="6.5"/><circle cx="146" cy="130" r="6.5"/></g>'+
      '<path d="M200 38l2.6 6 6 2.6-6 2.6-2.6 6-2.6-6-6-2.6 6-2.6z" fill="'+G+'"/>';
  } else if(id==='tiengnhat'){ /* 習うより慣れよ: nói nhiều, quen dần */
    s='<path d="M44 128h152" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>'+
      '<path d="M54 108q6-8 14-4" stroke="'+T+'" stroke-width="2.4" fill="none" stroke-dasharray="4 5" stroke-linecap="round"/>'+
      '<rect x="46" y="84" width="34" height="24" rx="12" fill="'+A+'" opacity=".85"/><path d="M58 108l-4 10 12-8z" fill="'+A+'" opacity=".85"/>'+
      '<rect x="88" y="66" width="46" height="32" rx="16" fill="'+A+'"/><path d="M104 98l-5 12 15-9z" fill="'+A+'"/>'+
      '<rect x="144" y="34" width="58" height="42" rx="21" fill="'+W+'"/><path d="M164 76l-6 14 18-11z" fill="'+W+'"/>'+
      '<g fill="'+DK+'"><circle cx="160" cy="55" r="4"/><circle cx="173" cy="55" r="4"/><circle cx="186" cy="55" r="4"/></g>'+
      '<path d="M56 96h14M100 82h22" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><path d="M206 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></g>'+
      '<path d="M82 40q22-14 44-6" stroke="'+G+'" stroke-width="2.6" fill="none" stroke-dasharray="4 5" stroke-linecap="round"/>';
  } else if(id==='quansat'){ /* 百聞は一見に如かず: thấy một lần hơn nghe trăm lần */
    s='<g stroke="'+T+'" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M120 26v12M82 34l6 11M158 34l-6 11M52 52l9 8M188 52l-9 8"/></g>'+
      '<path d="M44 86q76-70 152 0q-76 70-152 0z" fill="'+W+'"/>'+
      '<circle cx="120" cy="86" r="26" fill="'+G+'"/><circle cx="120" cy="86" r="12" fill="'+DK+'"/><circle cx="127" cy="79" r="5" fill="'+W+'"/>'+
      '<path d="M60 128q6 4 12 0M84 134q6 4 12 0M144 134q6 4 12 0M168 128q6 4 12 0" stroke="'+T+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
      '<path d="M196 118l8 3 3 8-8-3z" fill="'+G+'" opacity=".0"/>';
  } else if(id==='viecko'){ /* 案ずるより産むが易し: lo thì thấy to, bắt tay vào thì nhỏ */
    s='<path d="M20 140h200" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>'+
      '<path d="M58 140V44q0-8 8-8h50q8 0 8 8v96z" fill="'+T+'"/>'+
      '<path d="M82 62q-14 0-14-12t14-12q4-10 18-6 12-6 20 4 14-2 16 12t-14 14z" fill="rgba(255,255,255,.28)"/>'+
      '<path d="M100 56l6 10M114 52l-2 12" stroke="'+T+'" stroke-width="2.4" stroke-linecap="round"/>'+
      '<path d="M130 140v-18q0-6 6-6h44q6 0 6 6v18z" fill="'+W+'"/>'+
      '<path d="M138 116h40" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>'+
      '<g fill="'+G+'"><ellipse cx="150" cy="106" rx="3.6" ry="6" transform="rotate(12 150 106)"/><ellipse cx="162" cy="102" rx="3.6" ry="6" transform="rotate(12 162 102)"/></g>'+
      '<path d="M104 128q16-30 44-30" stroke="'+W+'" stroke-width="2.6" fill="none" stroke-dasharray="5 6" stroke-linecap="round"/>'+
      '<circle cx="204" cy="36" r="12" fill="'+G+'" opacity=".9"/>';
  } else if(id==='horenso'){ /* 石橋を叩いて渡る: gõ thử cầu đá rồi mới qua */
    s='<path d="M20 150q22-8 44 0t44 0 44 0 44 0" stroke="'+A+'" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M44 96h152v48H44z" fill="'+W+'" opacity=".95"/>'+
      '<path d="M84 144a36 34 0 0 1 72 0z" fill="rgba(18,52,128,.6)"/>'+
      '<path d="M44 96h152" stroke="'+A+'" stroke-width="3"/><path d="M60 96v-10M84 96v-10M108 96v-10M132 96v-10M156 96v-10M180 96v-10" stroke="'+W+'" stroke-width="5" stroke-linecap="round"/>'+
      '<path d="M44 118h40M156 118h40" stroke="'+A+'" stroke-width="2.4" stroke-linecap="round"/>'+
      '<path d="M58 52l28 30" stroke="'+G+'" stroke-width="5" stroke-linecap="round"/><circle cx="56" cy="50" r="6" fill="'+G+'"/>'+
      '<path d="M96 76l9-3M100 86l11 2M92 68l5-8" stroke="'+G+'" stroke-width="2.8" stroke-linecap="round"/>'+
      '<g fill="'+T+'"><ellipse cx="146" cy="72" rx="3.2" ry="5.4"/><ellipse cx="160" cy="68" rx="3.2" ry="5.4"/></g>';
  } else if(id==='giup'){ /* 情けは人の為ならず: thắp sáng cho người, ánh sáng quay về */
    s='<path d="M50 140h140" stroke="'+T+'" stroke-width="2" stroke-linecap="round"/>'+
      '<rect x="62" y="88" width="28" height="52" rx="4" fill="'+W+'"/><rect x="150" y="104" width="28" height="36" rx="4" fill="'+W+'"/>'+
      '<path d="M76 88v-8M164 104v-8" stroke="'+DK+'" stroke-width="2.4" stroke-linecap="round"/>'+
      '<path d="M76 54q-12 14 0 28q12-14 0-28z" fill="'+G+'"/><path d="M164 72q-9 11 0 23q9-12 0-23z" fill="'+G+'"/>'+
      '<path d="M90 62q36-30 62 6" stroke="'+G+'" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M146 58l8 11-13 2" stroke="'+G+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M156 118q-38 26-76 0" stroke="'+W+'" stroke-width="3" fill="none" stroke-dasharray="6 6" stroke-linecap="round"/><path d="M86 120l-9-9 12-3" stroke="'+W+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M120 94c-8-8-14-3-10 4l10 9 10-9c4-7-2-12-10-4z" fill="'+G+'" opacity=".95"/>';
  } else {
    var g=HMAP[id].g;
    s='<circle cx="120" cy="80" r="62" fill="rgba(255,255,255,.1)"/><circle cx="120" cy="80" r="46" fill="'+GCOL[g]+'" stroke="#fff" stroke-width="4"/><g transform="translate(96 56) scale(2)">'+glyph(id,GCOL[g]).replace(/^<svg[^>]*>|<\/svg>$/g,'')+'</g>';
  }
  return '<svg viewBox="0 0 240 160" aria-hidden="true">'+s+'</svg>';
}
/* =========================================================
   TIỆN ÍCH
   ========================================================= */
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function short(s,n){ s=String(s); return s.length>n ? s.slice(0,n-1)+'…' : s; }
function pad(n){ return (n<10?'0':'')+n; }
function dk(d){ d=d||new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function pd(k){ var a=k.split('-'); return new Date(+a[0],+a[1]-1,+a[2]); }
function addD(k,n){ var d=pd(k); d.setDate(d.getDate()+n); return dk(d); }
function diffD(a,b){ return Math.round((pd(b)-pd(a))/86400000); }
function wkStart(k){ var d=pd(k||dk()); var w=(d.getDay()+6)%7; d.setDate(d.getDate()-w); return dk(d); }
function dm(k){ var d=pd(k); return d.getDate()+'/'+(d.getMonth()+1); }
var WD=['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
var WDS=['T2','T3','T4','T5','T6','T7','CN'];
function words(s){ s=String(s||'').trim(); return s ? s.split(/\s+/).length : 0; }
function nowHM(){ var d=new Date(); return pad(d.getHours())+':'+pad(d.getMinutes()); }
function noMark(s){ return String(s||'').normalize ? String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D') : String(s||''); }

/* =========================================================
   DỮ LIỆU · lưu trong trình duyệt của từng máy
   ========================================================= */
var DEMO=false,SAVE_BLOCK=false,S;
var SAVE_STATE32='idle',SAVE_WARNING32=false,LOAD_ISSUE32=null,RAW_RECOVERY32='',RESTORE_PENDING32=null;
var SW_REG32=null,SW_READY32=false,SW_ERROR32='',SW_WAITING32=null,SW_DISMISSED32=false,UPDATE_APPLY32=false,SW_STARTED32=false;
function defState(){
  return {v:3, ver:APP_VER, name:'', cls:'', teacher:null, created:dk(), sound:true, ciTime:'21:00', ciCal:false, calAsked:0,
    habits:{}, order:[], custom:{}, cseq:0, les:{}, howSeen:{}, slots:[null,null,null,null,null], notes:{}, bf:{}, mood:{}, prDone:{}, seen:{}, storeView:'list', homeView:'cards', compactUI33:true, recordDrafts:{}, ciDrafts:{}, journalStars:{}, stampLetters:{}, log:{}, ev:{}, why:{}, ci:{}, xp:0, ins:0, tstamps:[], week:{}, opens:{}, saved:0, learnedXP:{}, bu:{}};
}
function migrate(st){
  /* Dữ liệu từ TQ01–TQ02: thêm cấp thẻ, giữ nguyên nhật ký */
  for(var id in st.habits){ var u=st.habits[id]; if(!u.lv){ u.lv=1; u.lvSince=u.since; } if(u.who==null) u.who=''; delete u.tier; delete u.reward; }
  /* TQ05: 5 khung thẻ; thẻ “giữ nếp” cũ trở lại khung như thẻ thường */
  if(!st.slots || st.slots.length!==5){ var sl=[]; (st.order||[]).forEach(function(id){ var u=st.habits[id]; if(u && (u.status==='active'||u.status==='keep') && sl.length<5) sl.push(id); }); while(sl.length<5) sl.push(null); st.slots=sl; }
  if(st.v<5){ for(var k in st.habits){ if(st.habits[k].status==='keep') st.habits[k].status='active'; } }
  st.notes=st.notes||{}; st.bf=st.bf||{}; st.mood=st.mood||{}; st.prDone=st.prDone||{}; st.seen=st.seen||{};
  /* TQ12: thẻ tự tạo; người đã check-in từ trước không cần hướng dẫn lần đầu */
  st.custom=st.custom||{}; st.cseq=st.cseq||0; st.les=st.les||{};
  if(!st.howSeen){ st.howSeen={}; for(var hk in st.habits) st.howSeen[hk]=1; }
  if(st.guideOff===undefined) st.guideOff = Object.keys(st.ci||{}).length>0;
  if(!st.compactUI33){st.homeView='cards';st.compactUI33=true;}else st.homeView=st.homeView==='list'?'list':'cards'; st.ciDrafts=st.ciDrafts||{};st.journalStars=st.journalStars||{};
  st.stampLetters=st.stampLetters||{};st.recordDrafts=st.recordDrafts||{};
  st.v=5; return st;
}
function stateObject32(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
function validDate32(d){if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;var a=d.split('-').map(Number),t=new Date(a[0],a[1]-1,a[2]);return t.getFullYear()===a[0]&&t.getMonth()===a[1]-1&&t.getDate()===a[2];}
function validateState32(d){
  if(!stateObject32(d)||typeof d.name!=='string'||!stateObject32(d.habits)||!stateObject32(d.log)||!Array.isArray(d.order))throw Error('Tập tin không có dữ liệu Shin routine hợp lệ.');
  function walk(o,depth){if(depth>30)throw Error('Cấu trúc tập tin quá phức tạp.');if(o&&typeof o==='object')Object.keys(o).forEach(function(k){if(k==='__proto__'||k==='prototype'||k==='constructor')throw Error('Cấu trúc tập tin không hợp lệ.');walk(o[k],depth+1);});}walk(d,0);
  var maps=['custom','notes','why','bf','ci','week','treeCards','journalStars','ciDrafts','recordDrafts','stampLetters','mood','ev','les','opens','seen','learnedXP','bu'];maps.forEach(function(k){if(d[k]!==undefined&&!stateObject32(d[k]))throw Error('Mục '+k+' trong tập tin không hợp lệ.');});
  if(!validDate32(d.created))throw Error('Ngày bắt đầu trong bản sao không hợp lệ.');
  if(d.order.some(function(id){return typeof id!=='string';}))throw Error('Danh sách thẻ không hợp lệ.');
  Object.keys(d.habits).forEach(function(id){var u=d.habits[id];if(!stateObject32(u)||!validDate32(u.since))throw Error('Dữ liệu thói quen không hợp lệ.');if(u.lv!==undefined&&(!Number.isInteger(u.lv)||u.lv<1||u.lv>3))throw Error('Cấp thẻ không hợp lệ.');['anchor','act','who'].forEach(function(k){if(u[k]!==undefined&&typeof u[k]!=='string')throw Error('Nội dung thẻ không hợp lệ.');});});
  if(d.slots!==undefined&&(!Array.isArray(d.slots)||d.slots.some(function(id){return id!==null&&typeof id!=='string';})))throw Error('Các thẻ trên tay không hợp lệ.');
  Object.keys(d.log).forEach(function(day){if(!validDate32(day)||!stateObject32(d.log[day]))throw Error('Nhật ký ngày không hợp lệ.');Object.keys(d.log[day]).forEach(function(id){if(['y','p','n','x',''].indexOf(d.log[day][id])<0)throw Error('Trạng thái ghi nhận không hợp lệ.');});});
  ['notes','why'].forEach(function(k){Object.keys(d[k]||{}).forEach(function(day){if(!stateObject32(d[k][day]))throw Error('Ghi chú không hợp lệ.');Object.keys(d[k][day]).forEach(function(id){if(typeof d[k][day][id]!=='string')throw Error('Nội dung ghi chú không hợp lệ.');});});});
  Object.keys(d.custom||{}).forEach(function(id){var c=d.custom[id];if(!stateObject32(c)||typeof c.name!=='string')throw Error('Thẻ tự tạo không hợp lệ.');['act','why','who','icon'].forEach(function(k){if(c[k]!==undefined&&typeof c[k]!=='string')throw Error('Nội dung thẻ tự tạo không hợp lệ.');});if(c.g!==undefined&&(!Number.isInteger(c.g)||c.g<1||c.g>10))throw Error('Màu thẻ tự tạo không hợp lệ.');});
  var known={};HABITS.forEach(function(h){known[h.id]=true;});Object.keys(d.custom||{}).forEach(function(id){known[id]=true;});
  function safeId(id){return typeof id==='string'&&/^[a-zA-Z0-9_-]+$/.test(id);}
  Object.keys(d.habits).forEach(function(id){if(!safeId(id)||!known[id])throw Error('Có thẻ chưa được phiên bản này hỗ trợ.');});
  if(d.slots&&d.slots.some(function(id){return id!==null&&(!safeId(id)||!d.habits[id]||!known[id]);}))throw Error('Bản sao thiếu dữ liệu của thẻ trên tay.');
  if(d.teacher!==undefined&&d.teacher!==null&&(!Number.isInteger(d.teacher)||d.teacher<0||d.teacher>=TEACHERS.length))throw Error('Thông tin thầy cô không hợp lệ.');
  Object.keys(d.ci||{}).forEach(function(day){var c=d.ci[day];if(!validDate32(day)||!stateObject32(c)||(c.note!==undefined&&typeof c.note!=='string'))throw Error('Check-in trong bản sao không hợp lệ.');});
  Object.keys(d.week||{}).forEach(function(day){var c=d.week[day];if(!validDate32(day)||!stateObject32(c)||(c.win!==undefined&&typeof c.win!=='string')||(c.buddy!==undefined&&typeof c.buddy!=='string'))throw Error('Thẻ tuần trong bản sao không hợp lệ.');});
  Object.keys(d.treeCards||{}).forEach(function(id){var a=d.treeCards[id];if(!safeId(id)||!stateObject32(a)||typeof a.name!=='string'||[2,3].indexOf(a.lv)<0||!validDate32(a.date)||typeof a.color!=='string'||!/^#[0-9a-fA-F]{6}$/.test(a.color))throw Error('Thẻ thành tựu trong bản sao không hợp lệ.');['reflection','note','anchor','act','fullName'].forEach(function(k){if(a[k]!==undefined&&typeof a[k]!=='string')throw Error('Nội dung thành tựu không hợp lệ.');});});
  Object.keys(d.ciDrafts||{}).forEach(function(day){var a=d.ciDrafts[day];if(!validDate32(day)||!stateObject32(a)||(a.note!==undefined&&typeof a.note!=='string'))throw Error('Bản nháp check-in không hợp lệ.');if(a.notes!==undefined&&!stateObject32(a.notes))throw Error('Ghi chú bản nháp không hợp lệ.');Object.keys(a.notes||{}).forEach(function(id){if(typeof a.notes[id]!=='string')throw Error('Nội dung bản nháp không hợp lệ.');});});
  Object.keys(d.recordDrafts||{}).forEach(function(day){var drafts=d.recordDrafts[day];if(!validDate32(day)||!stateObject32(drafts))throw Error('Ngày của ghi nhận đang viết không hợp lệ.');Object.keys(drafts).forEach(function(id){var a=drafts[id];if(!safeId(id)||!d.habits[id]||!stateObject32(a)||['y','p','n','x'].indexOf(a.ans)<0||typeof a.text!=='string'||typeof a.why!=='string')throw Error('Ghi nhận đang viết không hợp lệ.');});});
  validateStampLetters37(d.stampLetters||{});
  return d;
}
function load(){
  try{DEMO=localStorage.getItem(KEY_MODE)==='demo';}catch(e){DEMO=false;}
  var raw=null;try{raw=localStorage.getItem(DEMO?KEY_DEMO:KEY);}catch(e){SAVE_STATE32='error';}
  var st=null;if(raw){try{st=validateState32(JSON.parse(raw));}catch(e){LOAD_ISSUE32=e.message||'Chưa đọc được bài làm đã lưu.';RAW_RECOVERY32=raw;SAVE_BLOCK=true;}}
  S=migrate(Object.assign(defState(),st||{},{compactUI33:!!(st&&st.compactUI33)}));if(DEMO&&!st&&!LOAD_ISSUE32)S=buildDemo();regCustom();if(!LOAD_ISSUE32)S.opens[dk()]=(S.opens[dk()]||0)+1;
}
var saveT=null;
function setSaveState32(state){SAVE_STATE32=state;var el=$('#saveStatus32');if(el){var label=state==='saved'?'Đã lưu':state==='saving'?'Đang lưu':state==='error'?'Chưa lưu':'Trên máy';el.setAttribute('data-state',state);el.setAttribute('aria-label',state==='saved'?'Đã lưu bài làm trên máy này':label);el.title=state==='saved'?'Đã lưu trên máy lúc '+new Date(S.saved||Date.now()).toLocaleTimeString('vi-VN'):label;el.innerHTML='<i></i><span>'+label+'</span>';}updateRuntime32();}
function save(now){
  if(SAVE_BLOCK||!S)return false;syncTree();S.ver=APP_VER;clearTimeout(saveT);setSaveState32('saving');
  var persist=function(){if(SAVE_BLOCK)return false;var previous=S.saved;try{S.saved=Date.now();localStorage.setItem(DEMO?KEY_DEMO:KEY,JSON.stringify(S));SAVE_WARNING32=false;setSaveState32('saved');return true;}catch(e){S.saved=previous;setSaveState32('error');if(!SAVE_WARNING32){SAVE_WARNING32=true;toast('Máy chưa lưu được bài. Bạn có thể lưu bản sao để giữ phần đang làm.',6500);}return false;}};
  if(now)return persist();saveT=setTimeout(persist,250);return true;
}
function recoveryView32(){return '<div class="onboard32 recovery32"><div class="onboard-brand32"><span>'+shin('think')+'</span><small>GIỮ LẠI BÀI LÀM CỦA BẠN</small></div><h1>Chưa đọc được dữ liệu đã lưu.</h1><p>Bản đang có vẫn được giữ nguyên. Bạn có thể xuất dữ liệu để kiểm tra hoặc chọn một bản sao khác để khôi phục.</p><div class="recovery-actions32"><button class="btn btn--soft btn--wide" data-act="recoveryDownload32">Xuất dữ liệu đang có</button><label class="btn btn--wide">Khôi phục từ bản sao<input type="file" id="restoreF" class="sr" accept=".json,application/json"></label><button class="week-link" data-act="recoveryNew32">Bắt đầu lại với dữ liệu mới</button></div></div>';}
function downloadData32(text,name,type){var blob=new Blob([text],{type:type||'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1500);}
function storageHelp32(){openMini('<h2 style="font-size:21px;line-height:1.4">Bài làm trên thiết bị này</h2><p style="font-size:13px;line-height:1.7;margin-top:10px">'+(SAVE_STATE32==='error'?'Trình duyệt chưa lưu được thay đổi. Phần đang làm vẫn còn trong trang này; hãy xuất một bản sao trước khi đóng.':'App lưu bài làm trong trình duyệt đang dùng. Lưu bản sao để chuyển sang máy khác hoặc địa chỉ web khác.')+'</p><button class="btn btn--wide" data-act="backup">Lưu bản sao</button><button class="week-link" data-act="retrySave32">Thử lưu lại trên máy</button>');}

document.addEventListener('visibilitychange',function(){ if(document.hidden) save(true); });
window.addEventListener('pagehide',function(){ save(true); });

/* ---------- thẻ ---------- */
function H(id){ return S.habits[id]; }
function ids(st){ return S.order.filter(function(id){ return S.habits[id] && S.habits[id].status===st; }); }
function slotIds(){ return S.slots.filter(function(x){ return !!x && S.habits[x]; }); }
function activeIds(){ return slotIds().filter(function(id){ return H(id).status!=='pause'; }); }
function trackIds(){ return activeIds(); }
function keepIds(){ return S.order.filter(function(id){ return S.habits[id] && S.habits[id].status==='keep'; }); }
function canBf(d,id){ var t=dk(), u=H(id); return !!u && d<t && d>=addD(t,-3) && d>=u.since && d>=S.created; }
function mark(d,id){ return (S.log[d]||{})[id]||''; }
function dayCount(id){ var n=0; for(var d in S.log){ var m=S.log[d][id]; if(m==='y'||m==='p') n++; } return n; }
function daysAt(id){ var u=H(id), n=0; if(!u) return 0; for(var d in S.log){ var m=S.log[d][id]; if(m==='y'||m==='p') n++; } return n; }
function isDip(id){ var h=HMAP[id]; return !!(h && h.cond); }
function needFor(id,lv){ return (isDip(id)?LV_NEED_D:LV_NEED)[lv]; }
function unitOf(id){ return isDip(id)?'lần':'ngày'; }
function needOf(id){ return needFor(id,H(id).lv); }
function weekCount(id,ws){ var n=0; for(var i=0;i<7;i++){ var m=mark(addD(ws,i),id); if(m==='y'||m==='p') n++; } return n; }
function xRun(id,upTo){ var n=0, d=upTo; while(n<30 && mark(d,id)==='x'){ n++; d=addD(d,-1); } return n; }
function ready(id){ var u=H(id); return !!u && u.lv<3 && daysAt(id)>=needFor(id,u.lv); }
function mastered(id){ var u=H(id); return !!u && !!u.master; }
function lvPct(id){ var u=H(id); if(!u) return 0; return Math.min(1, daysAt(id)/needFor(id,u.lv)); }
function hname(id){ var h=HMAP[id]; if(id==='bot' && H(id) && H(id).bad){ var b=badLabel(H(id)); if(b) return 'Giảm dần: '+b.toLowerCase(); } return h.t; }
function sname(id){ return HMAP[id].custom?HMAP[id].t:HMAP[id].s; }
function badLabel(u){ if(!u||!u.bad) return ''; if(u.bad==='khac') return u.badOther||'Thói quen khác'; for(var i=0;i<BAD_OPTS.length;i++){ if(BAD_OPTS[i][0]===u.bad) return BAD_OPTS[i][1]; } return ''; }
function formula(id){ var u=H(id); if(!u) return ''; return 'Khi '+esc(u.anchor)+', tôi sẽ '+esc(u.act)+(u.who?' để trở thành '+esc(u.who):'')+'.'; }
function cellMark(d,id,t){ var m=mark(d,id), u=H(id); return m==='y'?hanko('y'):m==='p'?hanko('p'):m==='x'?xDot():(m==='n'||(u&&!isDip(id)&&d<t&&d>=u.since))?missDot():''; }
function totalStamps(){ var n=0; for(var d in S.log){ for(var k in S.log[d]){ if(S.log[d][k]==='y') n++; } } return n; }
function ciDays(){ return Object.keys(S.ci).length; }
function streak(){
  var d=dk(); if(!S.ci[d]) d=addD(d,-1);
  var c=0, miss=0, guard=0, start=addD(S.created,-1);
  while(guard++<500 && d>=start){ if(S.ci[d]){ c++; miss=0; } else { miss++; if(miss>=2) break; } d=addD(d,-1); }
  return c;
}
function missedYesterday(){ var y=addD(dk(),-1); return y>=S.created && !S.ci[y] && trackIds().length>0; }
function hashCode(str){ var h=5381; for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))|0; } return Math.abs(h); }
function tcodeFor(name,d){ return pad4(hashCode(noMark(name).toLowerCase().replace(/\s+/g,' ').trim()+'|'+d+'|'+T_SALT)%10000); }
function pad4(n){ n=String(n); while(n.length<4) n='0'+n; return n; }
/* =========================================================
   ĐIỂM, THÔNG BÁO, ÂM THANH, GIỌNG ĐỌC
   ========================================================= */
var toastT=null;
function toast(html,ms){ var t=$('#toast'); t.innerHTML='<span>'+html+'</span>'; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); }, ms||4000); }
function addPts(xp,ins,msg){
  S.xp+=xp||0; S.ins+=ins||0; S.nbDot=1; save();
  var h=msg?esc(msg):'Đã lưu.';
  toast(h); renderTop(true); renderNav();
}
var AC=null;
function tone(fs,dur,gap){
  if(!S.sound) return;
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return; }
  var t0=AC.currentTime+.02;
  fs.forEach(function(f,i){ var o=AC.createOscillator(), g=AC.createGain(); o.type='triangle'; o.frequency.value=f;
    var s=t0+i*(gap||.11); g.gain.setValueAtTime(0,s); g.gain.linearRampToValueAtTime(.12,s+.02); g.gain.exponentialRampToValueAtTime(.001,s+(dur||.5));
    o.connect(g); g.connect(AC.destination); o.start(s); o.stop(s+(dur||.5)+.05); });
}
function ting(){ tone([659.3,880],.45,.09); }
function fanfare(){ tone([523.3,587.3,659.3,784,880],.55,.1); }
function speak(t){
  if(!('speechSynthesis' in window)){ toast('Trình duyệt này chưa đọc được tiếng Nhật.'); return; }
  try{ speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(t); u.lang='ja-JP'; u.rate=.85;
    var vs=speechSynthesis.getVoices()||[], v=null; for(var i=0;i<vs.length;i++){ if(/ja/i.test(vs[i].lang)){ v=vs[i]; break; } }
    if(v) u.voice=v; else if(vs.length) toast('Máy chưa có giọng đọc tiếng Nhật, có thể đọc chưa chuẩn.');
    speechSynthesis.speak(u); }catch(e){}
}
function jpBox(o){ return '<div class="jpbox"><div><div class="jp">'+esc(o.j)+'</div><small>'+esc(o.r)+'</small><div class="vi">'+esc(o.v)+'</div></div><button class="spk" data-act="speak" data-v="'+esc(o.j)+'" aria-label="Nghe đọc">'+ic('spk')+'</button></div>'; }
function say(who,mood,html,cls){ return '<div class="say '+(cls||'')+'"><div class="say__av">'+av(who,mood)+'</div><div class="say__b">'+html+'</div></div>'; }
function bigStamp(kind){ var o=document.createElement('div'); o.className='stampov'; o.innerHTML='<div>'+hanko(kind||'y')+'</div>'; document.body.appendChild(o); setTimeout(function(){ o.remove(); },1300); }

/* =========================================================
   KHUNG ỨNG DỤNG · thanh trên 1 dòng · 3 trang chuyển bằng nút · thanh dưới kính mờ
   Cả trang cuộn theo tài liệu để thanh trình duyệt tự ẩn khi lướt.
   ========================================================= */
var TAB='today', NBTAB='sum', PG=0, NBOPEN=false, JDAY=null;
var PAGES=[['deck','Hôm nay'],['week','Tuần'],['prog','Hành trình']];
function shellHTML(){
  return '<header class="ahd" id="ahd"><div class="ahd__in"><div class="header-heading35"><div class="header-title-line35"><h1 id="pageTitle35">Hôm nay</h1><span id="headerAction35"></span></div><span class="hdate" id="hdate"></span></div><button class="save-status32" id="saveStatus32" data-act="storageHelp32" aria-label="Bài làm trên máy"></button><button class="hstreak" id="hpts" data-act="streak"></button>'+
    '<button class="gear" id="gear" aria-label="Sổ tay">'+ic('dots')+'<i class="dot" id="gdot" hidden></i></button></div></header>'+
    '<div class="runtime32" id="runtime32" role="status" hidden></div><div class="pview" id="pv"></div><nav class="abar" id="abar" aria-label="Điều hướng"></nav>';
}
function renderTop(bump){
  var p=$('#hpts'); if(!p) return; var n=streak();
  p.innerHTML='<span class="'+(bump?'bump':'')+'">'+ic('fire')+'<b>'+n+'</b> ngày</span>'; p.setAttribute('aria-label','Chuỗi giữ nhịp: '+n+' ngày check-in');
  var g=$('#gdot'); if(g){ g.hidden=!(S.nbDot||bkDue()); g.className='dot'+(bkDue()?' red':''); }
}
function renderNav(){ renderBar(); }
function renderBar(){
  var b=$('#abar'); if(!b) return; var d=dk(), state=ciPhase36(), done=state==='done';
  b.innerHTML='<div class="tabs3">'+PAGES.map(function(p,i){ return '<button class="'+(PG===i?'on':'')+'" data-act="page" data-v="'+i+'" aria-current="'+(PG===i?'page':'false')+'">'+(p[0]==='prog'?journeyIcon34():ic(p[0]))+'<span>'+p[1]+'</span></button>'; }).join('')+'</div>'+
    (handList().length||keepIds().length||done ? '<button class="ckb '+(state==='idle'?'':state)+'" data-ci-state="'+state+'" data-ci-time="'+esc(S.ciTime)+'" data-act="ci" data-v="'+d+'" aria-label="'+(done?'Đã check-in tối nay':state==='due'?'Đến giờ check-in, lúc '+esc(S.ciTime)+', chưa check-in':'Check-in tối, lúc '+esc(S.ciTime))+'">'+
      (done?sealDone()+'<span><b>Xong</b><small>Check-in</small></span>':ic('moon')+'<span><b>Check-in</b><small>'+esc(S.ciTime)+'</small></span>')+'</button>' : '');
}
function sealDone(){ return '<svg viewBox="0 0 60 60" aria-hidden="true" style="transform:rotate(-8deg)"><circle cx="30" cy="30" r="24" fill="none" stroke="#C8372D" stroke-width="3.2"/><circle cx="30" cy="30" r="19.5" fill="#C8372D" opacity=".08"/><text x="30" y="38" text-anchor="middle" style="'+FONT_JP+';font-weight:700" font-size="22" fill="#C8372D">済</text></svg>'; }
function renderHead(){
  var d=new Date(),date=$('#hdate'),title=$('#pageTitle35'),action=$('#headerAction35');
  if(title)title.textContent=PAGES[PG][1];
  if(date)date.textContent=WD[d.getDay()]+', '+pad(d.getDate())+'/'+pad(d.getMonth()+1);
  if(action)action.innerHTML=PG===2?journalStarToggle35():'';
}
function go(t){ if(t==='nb'){ openNb(); return; } toPage(t==='prog'?1:0); }
function toPage(i){
  if(i===PG && $('#pv').innerHTML){if(i===1){TREE_REPLAY34=true;JOURNEY_TAB31='tree';renderPage();}window.scrollTo(0,0);return;}
  if(i===1){TREE_REPLAY34=true;JOURNEY_TAB31='tree';}
  if(i===2){JOURNAL_MODE31='day';JOURNAL_HABIT31='all';}
  PG=i; renderBar(); var pv=$('#pv'); var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){ renderPage(); window.scrollTo(0,0); return; }
  pv.classList.add('out'); setTimeout(function(){ renderPage(); window.scrollTo(0,0); pv.classList.remove('out'); pv.classList.add('in'); setTimeout(function(){ pv.classList.remove('in'); },260); },140);
}
function renderPage(){
  renderHead();
  var oldDock=$('#app > #sdots');if(oldDock)oldDock.remove();
  var pv=$('#pv'); document.body.classList.toggle('pg0',PG===0);
  document.body.classList.toggle('cards-view34',PG===0&&S.homeView==='cards'&&handList().length>0);
  pv.innerHTML = PG===1 ? vDash() : PG===2 ? vJournal() : vToday();
  if(PG===0){var dock=$('#sdots');if(dock){dock.classList.add('card-dock34');$('#app').appendChild(dock);}stageInit();fitText(pv);}
}
function render(){
  if(LOAD_ISSUE32){document.body.classList.remove('shell','pg0');$('#app').innerHTML=recoveryView32();return;}
  demoBar(); var a=$('#app');
  if(!S.name){ document.body.classList.remove('shell','pg0'); a.innerHTML=vOnboard(); return; }
  document.body.classList.add('shell');
  if(!$('#pv')){ a.innerHTML=shellHTML(); bindShell(); }
  renderHead();renderTop();renderBar();renderPage();setSaveState32(SAVE_STATE32);
}
function bindShell(){
  var g=$('#gear'), t=null, long=false;
  g.addEventListener('pointerdown',function(){ long=false; clearTimeout(t);  });
  ['pointerup','pointerleave','pointercancel'].forEach(function(ev){ g.addEventListener(ev,function(){ clearTimeout(t); }); });
  g.addEventListener('click',function(e){ e.stopPropagation(); if(long){ long=false; return; } openNb(); });
  g.addEventListener('contextmenu',function(e){ e.preventDefault(); });
  window.addEventListener('resize',function(){ if($('#stage')) layoutCards(0,false); });
}
/* ---------- Toàn màn hình ---------- */
function fsOK(){ var d=document.documentElement; return !!(d.requestFullscreen||d.webkitRequestFullscreen) && !!(document.fullscreenEnabled||document.webkitFullscreenEnabled); }
function isFS(){ return !!(document.fullscreenElement||document.webkitFullscreenElement); }
function isStandalone(){ return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone===true; }
function isIOS(){ var u=navigator.userAgent||''; return /iPhone|iPad|iPod/.test(u) || (/Macintosh/.test(u) && 'ontouchend' in document); }
function toggleFS(){
  if(!fsOK()){ iosGuide(); return; }
  try{
    if(isFS()){ (document.exitFullscreen||document.webkitExitFullscreen).call(document); }
    else { var d=document.documentElement; var r=(d.requestFullscreen||d.webkitRequestFullscreen).call(d); if(r&&r.catch) r.catch(function(){ toast('Trình duyệt này chưa cho bật toàn màn hình.'); }); }
  }catch(e){ toast('Trình duyệt này chưa cho bật toàn màn hình.'); }
}
function iosGuide(){
  openMini('<div class="center"><div style="width:96px;margin:0 auto">'+shin('think')+'</div><h2 style="margin:6px 0 4px">Mở app toàn màn hình</h2><p class="muted small" style="margin:0 0 12px">iPhone không cho trang web tự bật toàn màn hình. Thêm app vào màn hình chính là mở như ứng dụng thật, không còn thanh Safari.</p></div>'+
    '<ol class="steps"><li><b>Chạm nút Chia sẻ</b>Ô vuông có mũi tên lên, ở thanh dưới của Safari.</li><li><b>Chọn “Thêm vào MH chính”</b>Kéo xuống một chút sẽ thấy.</li><li><b>Mở app từ biểu tượng mới</b>Từ nay mở bằng biểu tượng này nhé.</li></ol>'+
    '<p class="note center">Bài làm vẫn giữ nguyên nếu bạn mở bằng Safari trên cùng máy.</p>');
  S.iosTip=1; save();
}
function openNb(){ S.nbDot=0; openOv(nbSheet());OV.querySelector('.sheet').classList.add('notebook34');NBOPEN=true; renderTop(); }
function nbSheet(){ return '<div class="sh__h"><b style="font-size:18px">Sổ tay</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>'+vNb().replace(/<h1[^>]*>Sổ tay<\/h1>/,''); }
function refreshAll(){ render(); if(OV && CARD && $('#flip')) drawCard(); else if(OV && NBOPEN) sheetSet(nbSheet()); }

/* ---------- Tự thu nhỏ chữ cho vừa thẻ ---------- */
function fitText(root){
  /* Keep readable text at the designed size; make room through layout. */
  $$('.ct__f span',root||document).forEach(function(el){el.style.fontSize='';});
}

/* ---- Trang 2 · Tổng quan tuần (mỗi thẻ 2 dòng) ---- */
/* ---- Trang 3 · Nhật ký: chọn ngày ngay trong trang ---- */
var JOURNAL_MODE31='day', JOURNAL_HABIT31='all', JOURNAL_LIMIT31=20;
function journalMeta31(id){var x=HMAP[id],a=(S.treeCards||{})[id];return {name:x?sname(id):a?a.name:'Thói quen đã lưu',g:x?x.g:a?a.g:1,icon:x?(x.custom?'cu_'+x.icon:id):a?a.icon:id};}
function journalIds31(){var set={};(S.order||[]).forEach(function(id){set[id]=1;});Object.keys(S.log||{}).forEach(function(d){Object.keys(S.log[d]||{}).forEach(function(id){set[id]=1;});});Object.keys(S.notes||{}).forEach(function(d){Object.keys(S.notes[d]||{}).forEach(function(id){set[id]=1;});});return Object.keys(set).sort(function(a,b){return journalMeta31(a).name.localeCompare(journalMeta31(b).name,'vi');});}
function journalStar31(d,id){var key=d+'|'+id;return !!(S.journalStars||{})[key];}
function journalStarButton31(d,id,enabled){return '<button class="journal-star31'+(journalStar31(d,id)?' selected':'')+'" data-act="journalStar31" data-v="'+d+'|'+id+'" aria-pressed="'+journalStar31(d,id)+'" aria-label="'+(journalStar31(d,id)?'Bỏ đánh dấu đáng nhớ':'Đánh dấu đáng nhớ')+'"'+(enabled?'':' disabled')+'><svg viewBox="0 0 24 24" width="18" height="18" fill="'+(journalStar31(d,id)?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.5l-5.7 3 1.1-6.3L2.8 9.7l6.4-.9z"/></svg></button>';}
function journalRow31(id,d){var m=mark(d,id),note=(S.notes[d]||{})[id]||'',why=(S.why[d]||{})[id]||'',bf=(S.bf[d]||{})[id],meta=journalMeta31(id),reason=REASONS.filter(function(r){return r[0]===why;})[0];
  var chip='<i class="jc '+(m==='x'?'state-x31':m||'e')+'">'+(RECORD_LABEL[m]||'Chưa ghi')+'</i>',text=note||(m==='n'&&reason?'Lý do: '+reason[1]:'');
  return '<article class="jrow journal-row31" data-v="'+id+'|'+d+'"><button class="journal-entry31" data-act="jrow" data-v="'+id+'|'+d+'"><span class="journal-icon31" style="background:'+(GCOL[meta.g]||GCOL[1])+'">'+glyph(meta.icon,GCOL[meta.g]||GCOL[1])+'</span><span class="jr__b"><span class="jr__h"><b>'+esc(meta.name)+'</b>'+chip+(bf?'<i class="jc e">Ghi bù</i>':'')+'</span>'+(text?'<span class="journal-entry-note31">'+esc(text)+'</span>':'')+'</span></button>'+journalStarButton31(d,id,!!m||!!note)+'</article>';
}
function journalMemo31(d){
  var c=S.ci[d];if(!c||!c.note)return '';
  return '<article class="journal-memo31"><div><b>Memo cuối ngày</b>'+journalStarButton31(d,'@memo',true)+'</div><p>'+esc(c.note)+'</p></article>';
}
function journalDay31(d){
  var t=dk(),ids=[];
  [S.log[d]||{},S.notes[d]||{}].forEach(function(o){Object.keys(o).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id);});});
  handList().forEach(function(id){var u=H(id);if(u&&d>=u.since&&ids.indexOf(id)<0)ids.push(id);});
  var h='<div class="journal-date-heading31">'+(d===t?'Hôm nay':WD[pd(d).getDay()])+', '+treeDate30(d)+'</div>';
  h+=ids.length?ids.map(function(id){return journalRow31(id,d);}).join(''):'<div class="journey-empty31">Chưa có ghi nhận trong ngày này.</div>';
  h+=journalMemo31(d);
  if(!(S.ci[d]||{}).note&&d>=addD(t,-3)&&d<=t)h+='<button class="week-link" data-act="ci" data-v="'+d+'">'+(S.ci[d]?'Thêm memo':d===t?'Check-in tối nay':'Check-in ngày này')+'</button>';
  return h;
}
function journalTimeline31(){var entries=[];Object.keys(S.notes||{}).forEach(function(d){Object.keys(S.notes[d]||{}).forEach(function(id){if(!S.notes[d][id]||(JOURNAL_HABIT31!=='all'&&JOURNAL_HABIT31!==id))return;if(JOURNAL_MODE31==='saved'&&!journalStar31(d,id))return;entries.push({d:d,id:id});});});
  if(JOURNAL_MODE31==='saved')Object.keys(S.journalStars||{}).forEach(function(key){if(!S.journalStars[key])return;var p=key.split('|'),d=p[0],id=p[1];if(id==='@memo'||(JOURNAL_HABIT31!=='all'&&JOURNAL_HABIT31!==id))return;if(entries.some(function(e){return e.d===d&&e.id===id;}))return;if(mark(d,id))entries.push({d:d,id:id});});
  if(JOURNAL_HABIT31==='all')Object.keys(S.ci||{}).forEach(function(d){if(S.ci[d].note&&(JOURNAL_MODE31!=='saved'||journalStar31(d,'@memo')))entries.push({d:d,id:'@memo',isMemo:true});});
  entries.sort(function(a,b){return b.d.localeCompare(a.d)||a.id.localeCompare(b.id);});var visible=entries.slice(0,JOURNAL_LIMIT31),last='',h='<p class="journal-results31">'+entries.length+(JOURNAL_MODE31==='saved'?' khoảnh khắc đáng nhớ':' ghi chú và memo')+'</p>';
  if(!visible.length)return h+'<div class="journey-empty31">'+(JOURNAL_MODE31==='saved'?'Chạm ngôi sao ở một ghi nhận hoặc memo để giữ lại khoảnh khắc đó.':'Những điều bạn viết sẽ xuất hiện ở đây, kể cả từ các tuần trước.')+'</div>';
  visible.forEach(function(e){if(e.d!==last){last=e.d;h+='<div class="journal-date-heading31">'+treeDate30(e.d)+'</div>';}h+=e.isMemo?journalMemo31(e.d):journalRow31(e.id,e.d);});
  return h+(entries.length>visible.length?'<button class="journey-more31" data-act="journalMore31">Xem thêm</button>':'');
}
function vJournal(){
  var t=dk(),d=JDAY||t,ws=wkStart(d),we=addD(ws,6),starred=JOURNAL_MODE31==='saved';
  JOURNAL_HABIT31='all';
  var h='';
  if(starred)return h+journalTimeline31();
  h+='<div class="wnav journal-week-nav33"><button class="arr2" data-act="journalWeek33" data-v="-1"'+(ws<=wkStart(S.created)?' disabled':'')+' aria-label="Tuần trước">'+ic('back')+'</button><div><b>'+(ws===wkStart(t)?'Tuần này':dm(ws)+' – '+dm(we))+'</b>'+(ws===wkStart(t)?'<small>'+dm(ws)+' – '+dm(we)+'</small>':'')+'</div><button class="arr2 r" data-act="journalWeek33" data-v="1"'+(we>=t?' disabled':'')+' aria-label="Tuần sau">'+ic('back')+'</button></div><div class="jdays">';
  for(var i=0;i<7;i++){var x=addD(ws,i),disabled=x>t||x<S.created;h+='<button class="jd'+(x===d?' on':'')+(S.ci[x]?' ok':'')+(disabled?' fu':'')+'" data-act="jday" data-v="'+x+'" aria-pressed="'+(x===d)+'" aria-label="'+WDS[i]+', '+treeDate30(x)+'"'+(disabled?' disabled':'')+'><small>'+WDS[i]+'</small>'+pd(x).getDate()+'</button>';}
  return h+'</div>'+journalDay31(d);
}
function journalOpen31(d){closeOv();PG=2;JDAY=d===dk()?null:d;JOURNAL_MODE31='day';JOURNAL_HABIT31='all';render();window.scrollTo(0,0);}
function journalReadonly31(id,d){rememberHabit33();var meta=journalMeta31(id);openOv('<div class="sh__h"><b>Ghi nhận đã lưu</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><h2 style="font-size:21px;line-height:1.4">'+esc(meta.name)+'</h2><p class="muted small">'+treeDate30(d)+' · '+esc(RECORD_LABEL[mark(d,id)]||'Ghi chú')+'</p><p style="white-space:pre-wrap;overflow-wrap:anywhere">'+esc((S.notes[d]||{})[id]||'Không có ghi chú.')+'</p>',true);}

/* =========================================================
   LÀM QUEN
   ========================================================= */
function teacherSelect(id){ var t=S.teacher; return '<select class="inp" id="'+id+'" data-in="teacher"><option value="">Chọn thầy cô</option>'+TEACHERS.map(function(x,i){ return '<option value="'+i+'"'+(t===i?' selected':'')+'>'+esc(x[0])+'</option>'; }).join('')+'</select>'; }
var FIRST_HABIT32=null;
function vOnboard(){
  return '<div class="onboard32"><div class="onboard-brand32"><span>'+shin('hi')+'</span><small>SHIN ROUTINE · KAIZEN 改善</small></div><div class="onboard-heading32"><h1>Mỗi ngày, một chút.</h1><p>Bắt đầu bằng một việc nhỏ, vừa sức với bạn.</p></div><div class="onboard-card32"><label class="lbl" for="obName">Mình gọi bạn là gì?</label><input class="inp" id="obName" maxlength="40" autocomplete="given-name" placeholder="Tên bạn muốn được gọi"><details class="onboard-extra32"><summary>Lớp và thầy cô <span>· có thể bổ sung sau</span></summary><label class="lbl" for="obCls">Lớp</label><input class="inp" id="obCls" maxlength="30" placeholder="Ví dụ: E696"><label class="lbl" for="obT">Thầy cô kỹ năng</label>'+teacherSelect('obT')+'</details><button class="btn btn--wide" data-act="obGo">Chọn việc nhỏ đầu tiên'+ic('arrow')+'</button></div><p class="onboard-local32">Bài làm được lưu trên thiết bị này.</p><label class="onboard-restore32">Mình đã có bản sao · Khôi phục<input type="file" accept=".json,application/json" id="restoreF" class="sr"></label></div>';
}
function obGo(){
  var n=$('#obName').value.trim(),c=$('#obCls').value.trim(),t=$('#obT').value;if(!n){$('#obName').focus();$('#obName').classList.add('hl');return;}
  if(noMark(c).toUpperCase()===DEMO_CLASS){enterDemo();return;}
  S.name=n;S.cls=c;S.teacher=t===''?null:+t;if(!S.order.length&&!Object.keys(S.ci).length)S.created=dk();S.introSeen=1;S.guideOff=false;save(true);render();openFirstChoice32();
}
function openFirstChoice32(){
  FIRST_HABIT32=null;var picks=['chao','memo','vandong'];
  openOv('<div class="sh__h"><b>Việc nhỏ đầu tiên</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><div class="first-choice32"><small>BẮT ĐẦU VỪA SỨC</small><h2>Một thẻ là đủ để bắt đầu.</h2><p>Chọn một việc bạn muốn thử. Bạn luôn có thể chỉnh lại.</p><div>'+picks.map(function(id){var x=HMAP[id];return '<button class="first-pick32" data-act="firstPick32" data-v="'+id+'">'+hico(id,'sm')+'<span><b>'+esc(sname(id))+'</b><small>'+esc(x.act)+'</small></span>'+ic('arrow')+'</button>';}).join('')+'</div><button class="week-link" data-act="firstLibrary32">Xem tất cả thẻ trong Thư viện</button><button class="first-custom32" data-act="cuNew">Tự tạo một thẻ riêng</button></div>');
}
function openFirstForm32(id){
  var x=HMAP[id];if(!x)return;FIRST_HABIT32=id;
  openOv('<div class="sh__h"><button class="back" data-act="firstChoice32" aria-label="Chọn thẻ khác">'+ic('back')+'</button><b>Việc nhỏ của bạn</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><div class="first-form32"><div class="record-editor-title">'+hico(id,'sm')+'<div><h2>'+esc(hname(id))+'</h2></div></div><p>Gắn việc nhỏ vào một thời điểm quen thuộc.</p><label class="lbl" for="firstAnchor32">Khi…</label><input class="inp" id="firstAnchor32" maxlength="80" value="'+esc(x.anchors[0]||'về đến chỗ ở')+'"><label class="lbl" for="firstAct32">Tôi sẽ…</label><textarea class="inp" id="firstAct32" maxlength="100" rows="2">'+esc(x.act)+'</textarea><p class="first-note32">Chọn việc nhỏ đến mức ngày bận bạn vẫn có thể thử.</p></div><div class="sbar"><button class="btn btn--wide" data-act="firstStart32">Bắt đầu rèn thẻ này</button></div>');
}
function firstStart32(){
  var id=FIRST_HABIT32,x=HMAP[id];if(!x)return;var anchor=$('#firstAnchor32').value.trim(),act=$('#firstAct32').value.trim();if(anchor.length<2){$('#firstAnchor32').focus();return;}if(act.length<2){$('#firstAct32').focus();return;}
  if(H(id)){closeOv();openCard(id);return;}if(S.slots.indexOf(null)<0){toast('Bạn đã đủ 5 thẻ trên tay.');return;}
  S.habits[id]={status:'active',since:dk(),lv:1,lvSince:dk(),anchor:anchor,act:act,who:'',bad:'',badOther:'',quiz:'later'};if(S.order.indexOf(id)<0)S.order.push(id);placeInSlot(id);if(!S.learnedXP[id]){S.xp+=15;S.learnedXP[id]=1;}S.guideOff=false;S.guideDone=0;S.onboarded32=true;save(true);FIRST_HABIT32=null;closeOv();PG=0;render();window.scrollTo(0,0);toast('Thẻ đã sẵn sàng để rèn.');
}

/* =========================================================
   THẺ CỦA TÔI · 5 khung thẻ, lướt vòng, chạm để lật
   ========================================================= */

/* =========================================================
   TQ12 · THẺ TỰ TẠO (tối đa 2 thẻ trên tay)
   ========================================================= */
var MAX_CUSTOM = 2;
var CU_ICONS = [['nuoc','Giọt nước'],['sach','Sách'],['tim','Trái tim'],['tia','Năng lượng'],['nhac','Âm nhạc'],['la','Chiếc lá'],['but','Cây bút'],['lua','Ngọn lửa'],['nang','Mặt trời'],['cuoi','Nụ cười'],['sao','Ngôi sao'],['trang','Mặt trăng']];
var CU_COLORS = [['Tím',5],['Cam',6],['Đỏ',7],['Nâu',8],['Xám xanh',9],['Vàng đất',10]];
var CU_ANCH = ['vừa thức dậy','ăn xong','về đến ký túc xá','trước khi đi ngủ'];
var CU_WHO = ['người biết chăm sóc bản thân','người kiên trì','người sống có kế hoạch'];
function cuPaths(n,C){
  var W='#fff', P={
   nuoc:'<path d="M12 2.8c3.4 4.2 6 7.2 6 10.4a6 6 0 0 1-12 0c0-3.2 2.6-6.2 6-10.4z" fill="'+W+'"/><path d="M9 14.2a3 3 0 0 0 2.4 2.9" stroke="'+C+'" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
   sach:'<path d="M2.5 5.5c3.5-1.2 6.5-.8 9.5 1.5v13c-3-2.3-6-2.7-9.5-1.5z" fill="'+W+'"/><path d="M21.5 5.5c-3.5-1.2-6.5-.8-9.5 1.5v13c3-2.3 6-2.7 9.5-1.5z" fill="'+W+'" opacity=".75"/>',
   tim:'<path d="M12 20.5s-8-4.8-8-10.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 2.7c0 5.8-8 10.6-8 10.6z" fill="'+W+'"/>',
   tia:'<path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z" fill="'+W+'"/>',
   nhac:'<path d="M9 4.5l10-2v13.3a3 3 0 1 1-2-2.8V6.6l-6 1.2v10.3a3 3 0 1 1-2-2.8z" fill="'+W+'"/>',
   la:'<path d="M5 19c0-8 4-14 15-15 0 9-5 15-13 15z" fill="'+W+'"/><path d="M5 19c3-5 6-8 10-10" stroke="'+C+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
   but:'<path d="M4 20l1.2-5L16.5 3.7a2 2 0 0 1 2.8 0l1 1a2 2 0 0 1 0 2.8L9 18.8z" fill="'+W+'"/><path d="M14.5 5.7l3.8 3.8" stroke="'+C+'" stroke-width="1.8" stroke-linecap="round"/>',
   lua:'<path d="M12 21.5c-4.2 0-7-2.8-7-6.7 0-3.9 3-6 4.2-9.5.5 2 1.7 3.2 2.8 3.4C12 6.6 13.7 4 15.9 3c-.6 3.2 3.1 5.6 3.1 10.8 0 4.9-2.9 7.7-7 7.7z" fill="'+W+'"/>',
   nang:'<circle cx="12" cy="12" r="4.6" fill="'+W+'"/><g stroke="'+W+'" stroke-width="2.2" stroke-linecap="round"><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></g>',
   cuoi:'<circle cx="12" cy="12" r="9.2" fill="'+W+'"/><circle cx="8.8" cy="10" r="1.5" fill="'+C+'"/><circle cx="15.2" cy="10" r="1.5" fill="'+C+'"/><path d="M8 13.8q4 4.4 8 0" stroke="'+C+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
   sao:'<path d="M12 2.5l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 16.4l-5.4 2.9 1-6.1-4.4-4.3 6.1-.8z" fill="'+W+'"/>',
   trang:'<path d="M15.5 2.8A9 9 0 1 0 21.3 16 7.5 7.5 0 0 1 15.5 2.8z" fill="'+W+'"/>'
  };
  return P[n]||P.sao;
}
function cuDef(id,u){ 
  var who=(u.who||'').trim();
  return {id:id, custom:true, g:u.g||5, icon:u.icon||'sao', s:u.name||'Thẻ của tôi', t:u.name||'Thẻ của tôi',
          who:(who?[who]:[]).concat(CU_WHO), tiers:[u.act||''], act:u.act||'', anchors:CU_ANCH, combos:[], myWhy:u.why||'', cond:!!u.dip};
}
function regCustom(st){
  st=st||S; var id;
  for(id in HMAP){ if(HMAP[id].custom) delete HMAP[id]; }
  var c=(st&&st.custom)||{};
  for(id in c){ var h=st.habits&&st.habits[id]; HMAP[id]=cuDef(id,{name:c[id].name,icon:c[id].icon,g:c[id].g,act:c[id].act,why:c[id].why,dip:c[id].dip,who:h?h.who:''}); }
}
function customOnHand(){ return S.slots.filter(function(id){ return id && HMAP[id] && HMAP[id].custom; }).length; }
function customIds(){ return Object.keys(S.custom||{}).filter(function(id){ return S.habits[id] && HMAP[id]; }); }
function grpName(x){ return x.custom ? 'Thẻ tự tạo' : GROUPS[x.g-1].t; }
function cardBackMine(id){
  var x=HMAP[id], u=H(id), lv=u?u.lv:0;
  return '<div class="tkb2 tkb2--mine g'+x.g+(lv===3?' lv3':'')+'"><div class="tb__art"><div class="tb__top"><span>VÌ SAO MÌNH CHỌN</span>'+stars(lv,11,true)+'</div>'+metaSVG(id)+'</div>'+
    '<div class="tb__body"><div class="mine"><small>LỜI CỦA '+esc(String(S.name||'').toUpperCase())+'</small><p>“'+esc(x.myWhy||'')+'”</p></div></div></div>';
}
function customBlock(v){
  var n=customOnHand(), full=n>=MAX_CUSTOM, list=customIds(), h='';
  h+='<button class="mkrow'+(full?' off':'')+'" data-act="cuNew" aria-label="Tự tạo thẻ riêng"><span class="mk__i">'+ic('plus')+'</span><span class="mk__b"><b>Tự tạo thẻ riêng</b><small>'+
    (full?'Đã đủ '+MAX_CUSTOM+' thẻ tự tạo trên tay. Cất bớt một thẻ để tạo thẻ mới.':''+n+'/'+MAX_CUSTOM+' trên tay')+'</small></span>'+ic('arrow')+'</button>';
  if(list.length){
    h+='<div class="sgrp"><div class="deck__h"><h2>Thẻ tự tạo</h2><span class="sg__n">'+list.length+'</span></div>';
    h+='<div class="slist">'+list.map(function(id){ var st=libStatus(id);
      return '<button class="srow" data-act="mcard" data-v="'+id+'">'+emblem(id,40)+'<span class="sr__b"><b>'+esc(hname(id))+'</b></span><span class="lchip '+st[1]+'">'+st[0]+'</span>'+ic('arrow')+'</button>'; }).join('')+'</div>';
    h+='</div>';
  }
  return h;
}
/* ---- tạo và sửa: dùng lại khung “Công thức” của thẻ thường ---- */
function openCustom(editId){
  var u=editId?H(editId):null, c=editId?S.custom[editId]:null;
  if(!editId){
    if(customOnHand()>=MAX_CUSTOM){ toast('Bạn đã có '+MAX_CUSTOM+' thẻ tự tạo trên tay. Cất bớt một thẻ tự tạo để tạo thẻ mới nhé.',4500); return; }
    if(S.slots.indexOf(null)<0){ toast('5 khung đã đầy. Cất bớt một thẻ trước nhé.'); return; }
  }
  HMAP['__new']=cuDef('__new',{name:'',icon:'sao',g:5,act:'',why:'',who:''});
  ST={id:editId||'__new', cust:true, edit:!!editId, steps:['cn','k','a','w','y','goal16'], i:0, pick:null, first:null, custom:{},
      anchor:u?u.anchor:'', act:u?u.act:'', who:u?u.who:'', bad:'', badOther:'',
      name:c?c.name:'', icon:c?c.icon:'sao', col:c?c.g:5, why:c?c.why:'', rhy:(c&&c.dip)?'p':'d'};
  openOv(''); drawStart();
}
function cuStepName(){
  var h=(ST.edit?'<div class="ey">Sửa thẻ của bạn</div>':'<div class="ey">Thẻ của riêng bạn</div>')+
    '<div class="cuprev"><span class="emb g'+ST.col+'">'+glyph('cu_'+ST.icon,GCOL[ST.col])+'</span><b id="cuName">'+esc(ST.name.trim()||'Tên thói quen')+'</b></div>'+
    '<label class="lbl" for="cuN">Tên thói quen</label><input class="inp" id="cuN" data-in="cuName" maxlength="30" placeholder="Ví dụ: Uống nước sau khi dậy" value="'+esc(ST.name)+'">'+
    '<div class="tiny muted" id="cuCnt" style="text-align:right;margin-bottom:10px">'+ST.name.length+'/30</div>'+
    '<div class="qlab">Biểu tượng</div><div class="igrid">'+CU_ICONS.map(function(o){ return '<button class="g'+ST.col+(ST.icon===o[0]?' on':'')+'" data-act="cuIcon" data-v="'+o[0]+'" aria-label="'+esc(o[1])+'" aria-pressed="'+(ST.icon===o[0])+'">'+glyph('cu_'+o[0],GCOL[ST.col])+'</button>'; }).join('')+'</div>'+
    '<div class="qlab">Màu</div><div class="swrow">'+CU_COLORS.map(function(o){ return '<button class="g'+o[1]+(ST.col===o[1]?' on':'')+'" data-act="cuCol" data-v="'+o[1]+'" aria-label="'+esc(o[0])+'" aria-pressed="'+(ST.col===o[1])+'">'+(ST.col===o[1]?'✓':'')+'</button>'; }).join('')+'</div>';
  h+='<div class="qlab">Nhịp của thẻ</div>'+(ST.edit?'<p class="muted small" style="margin:0">'+(ST.rhy==='p'?'Khi gặp dịp · tính theo số lần.':'Hằng ngày · tính theo số ngày.')+'</p>':'<div class="rhyrow" role="radiogroup"><button class="'+(ST.rhy==='d'?'on':'')+'" role="radio" aria-checked="'+(ST.rhy==='d')+'" data-act="cuRhy" data-v="d"><b>Hằng ngày</b><small>Việc ngày nào cũng làm được</small></button><button class="'+(ST.rhy==='p'?'on':'')+'" role="radio" aria-checked="'+(ST.rhy==='p')+'" data-act="cuRhy" data-v="p"><b>Khi gặp dịp</b><small>Chỉ làm khi có tình huống</small></button></div>');
  if(ST.edit) h+='<div style="margin-top:18px"><button class="btn btn--ghost btn--sm" style="color:#B23A2E" data-act="cuDel" data-v="'+ST.id+'">Xóa thẻ này</button></div>';
  return h;
}
function cuStepWhy(){
  return '<div class="ey">Mặt sau của thẻ</div><h2 style="margin:0 0 6px">Vì sao mình chọn thói quen này?</h2>'+
    '<p class="muted small" style="margin:0 0 10px">Một câu thôi, bằng lời của bạn. Câu này nằm ở mặt sau thẻ, nhắc bạn mỗi lần lật thẻ.</p>'+
    '<textarea class="inp" id="cuW" data-in="cuWhy" maxlength="90" rows="3" placeholder="Ví dụ: Để sáng nào mình cũng đủ tỉnh táo vào lớp.">'+esc(ST.why)+'</textarea>'+
    '<div class="tiny muted" id="cuWc" style="text-align:right;margin-top:4px">'+(words(ST.why)>=3?'✓ '+words(ST.why)+' chữ':'Từ 3 chữ')+'</div>';
}
function cuRefresh(){
  var e=$('.cuprev .emb'); if(e){ e.className='emb g'+ST.col; e.innerHTML=glyph('cu_'+ST.icon,GCOL[ST.col]); }
  $$('.igrid button').forEach(function(b){ var v=b.getAttribute('data-v'), on=v===ST.icon; b.className='g'+ST.col+(on?' on':''); b.setAttribute('aria-pressed',String(on)); b.innerHTML=glyph('cu_'+v,GCOL[ST.col]); });
  $$('.swrow button').forEach(function(b){ var v=+b.getAttribute('data-v'), on=v===ST.col; b.className='g'+v+(on?' on':''); b.setAttribute('aria-pressed',String(on)); b.textContent=on?'✓':''; });
}
function commitCustom(){
  var t=dk(), id=ST.id, nm=ST.name.trim(), act=String(ST.act).trim(), an=ST.anchor.trim(), who=ST.who.trim(), why=ST.why.trim();
  if(!ST.edit){
    if(customOnHand()>=MAX_CUSTOM || S.slots.indexOf(null)<0){ closeOv(); render(); toast('Chưa còn chỗ cho thẻ mới. Cất bớt một thẻ trước nhé.',4500); return; }
    S.cseq=(S.cseq||0)+1; id='u'+S.cseq; while(S.custom[id]||S.habits[id]){ S.cseq++; id='u'+S.cseq; }
    S.custom[id]={name:nm, icon:ST.icon, g:ST.col, act:act, why:why, born:t, dip:ST.rhy==='p'};
    S.habits[id]={status:'active', since:t, lv:1, lvSince:t, anchor:an, act:act, who:who, bad:'', badOther:'', quiz:''};
    S.order.push(id); S.learnedXP[id]=1; S.seen[id]=1;
    regCustom(); PICK=null; placeInSlot(id);
    save(true); closeOv(); VDAY=null; SBACK=false; PG=0; render(); window.scrollTo(0,0); fanfare(); toast('Thẻ tự tạo đã lên tay!');
    var c=$('.cs.cur .flip'); if(c) c.classList.add('deal');

  } else {
    var cc=S.custom[id], uu=H(id); if(!cc||!uu){ closeOv(); render(); return; }
    cc.name=nm; cc.icon=ST.icon; cc.g=ST.col; cc.why=why; uu.anchor=an; uu.act=act; uu.who=who;
    regCustom(); save(true); closeOv(true); ST=null; toast('Đã lưu thẻ.'); refreshAll();
  }
}
function cuDelete(id){
  var nm=HMAP[id]?HMAP[id].t:'';
  if(!confirm('Xóa thẻ “'+nm+'” cùng toàn bộ con dấu của thẻ này? Việc này không hoàn tác được.')) return;
  var i=S.slots.indexOf(id); if(i>=0) S.slots[i]=null;
  delete S.habits[id]; delete S.custom[id]; S.order=S.order.filter(function(x){ return x!==id; });
  ['log','notes','why','bf','ev','recordDrafts'].forEach(function(m){ for(var d in S[m]){ if(S[m][d] && S[m][d][id]!==undefined) delete S[m][d][id]; } });
  for(var w in S.week){ if(S.week[w] && S.week[w].rate) delete S.week[w].rate[id]; }
  delete S.seen[id]; delete S.learnedXP[id]; delete HMAP[id];
  save(true); closeOv(true); ST=null; SLOT=0; SBACK=false; render(); toast('Đã xóa thẻ.');
}
function cuTierSheet(id){
  var u=H(id);
  openMini('<div class="center"><span style="display:inline-block">'+emblem(id,72)+'</span><h2 style="margin:10px 0 2px">Thử thách cấp '+LV_NAME[u.lv]+'</h2><p class="muted small" style="margin:0 0 10px">Lên cấp thì việc có thể nâng lên một chút. Bạn tự viết nhé, hoặc giữ nguyên.</p></div>'+
    '<div class="fx"><span>Việc hiện tại</span>'+esc(u.act)+'</div><label class="lbl" for="cuT" style="margin-top:10px">Việc mới (không bắt buộc)</label><input class="inp" id="cuT" maxlength="50" placeholder="Ví dụ: uống hai ly nước" value="'+esc(u.act)+'">'+
    '<div class="stack" style="margin-top:12px"><button class="btn btn--wide" data-act="cuTier" data-v="'+id+'">Lưu việc mới</button><button class="btn btn--ghost btn--wide" data-act="tierNo" data-v="'+id+'">Giữ việc cũ</button></div>');
}

/* =========================================================
   TQ12 · HƯỚNG DẪN LẦN ĐẦU (ngay trên màn hình Thẻ, gồm cả “Thêm vào màn hình chính”)
   ========================================================= */
function nepLine(id){ var u=H(id); if(!u || u.master || u.status==='keep') return ''; var nd=needFor(id,3), left=Math.max(0,nd-daysAt(id));
  return '<p class="nep">Thành nếp khi đủ '+nd+' '+unitOf(id)+' rèn'+(left?' · còn <b>'+left+'</b> '+unitOf(id):'')+'</p>'; }

/* =========================================================
   TQ14 · GỢI Ý CÔNG THỨC: [Khi…, tôi sẽ…, để trở thành…]
   Dựa trên nếp học ở JPC: 4 tiết ở trường, chào bác bảo vệ và thầy cô,
   5S lớp và khu vực phân công, chiều có bạn đi làm thêm, lên trường làm hồ sơ.
   ========================================================= */
var SUG = {
 chao:[['bước qua cổng trường','chào bác bảo vệ trước, nhìn mắt, mỉm cười','người ai cũng muốn làm cùng'],
       ['vào lớp gặp thầy cô người Nhật','nói おはようございます rồi cúi nhẹ','người tươi tắn, dễ gần'],
       ['lên phòng gặp anh chị làm hồ sơ','chào trước, ra về nói cảm ơn','người lễ phép, chuyên nghiệp']],
 som:[['chuông báo thức reo','dậy ngay, không nằm nán thêm','người luôn sẵn sàng'],
      ['tối soạn xong cặp sách','để đồng phục và giày sẵn một chỗ','người đúng giờ như người Nhật'],
      ['có lịch hẹn nộp hồ sơ','ghi giờ hẹn và đặt báo thức sớm 15 phút','người đáng tin cậy']],
 memo:[['thầy cô dặn dò trong giờ học','ghi lời dặn vào sổ memo, có ngày giờ','người không cần nhắc hai lần'],
       ['anh chị làm hồ sơ dặn giấy tờ cần nộp','ghi: giấy gì, nộp khi nào, cho ai','người làm việc cẩn thận'],
       ['học xong tiết tiếng Nhật','ghi 1 từ mới vào sổ','người ham học hỏi']],
 '5s':[['hết giờ trực nhật 5S của lớp','xem lại khu vực được phân công 1 phút','người được tin giao việc'],
       ['đứng dậy rời bàn học','đẩy ghế vào, cất đồ về đúng chỗ','người gọn gàng, chuyên nghiệp'],
       ['về đến chỗ ở và cởi giày','xếp giày mũi hướng ra cửa','người gọn gàng như người Nhật']],
 camon:[['nhận cơm ở căng tin','nói cảm ơn, nhìn người phục vụ','người biết ơn'],
        ['bạn giảng lại bài cho mình','cảm ơn kèm việc cụ thể bạn đã giúp','người ai cũng quý'],
        ['tan học ra về','chào và cảm ơn thầy cô sau buổi học','người biết ơn']],
 xinloi:[['đến lớp trễ','xin lỗi trước, nói lý do ngắn và cách sửa','người dám nhận trách nhiệm'],
         ['quên việc được giao','nhận lỗi và hẹn giờ làm xong','người được tin lại']],
 loihua:[['đánh răng buổi sáng','tự hứa 1 việc nhỏ cho hôm nay','người giữ chữ tín'],
         ['hẹn với bạn','ghi giờ hẹn và đến đúng giờ','người giữ chữ tín'],
         ['ngồi vào bàn học buổi tối','hứa học 10 từ, học xong mới đứng dậy','người tin được chính mình']],
 '5phut':[['đến lớp sớm, chờ vào học','mở 5 từ vựng ra ôn','người tiến bộ mỗi ngày'],
          ['ngồi chờ đến lượt làm hồ sơ','đọc lại 1 mẫu câu tiếng Nhật','người không phí thời gian'],
          ['nghỉ giải lao ở chỗ làm thêm','ôn 5 từ vựng trên điện thoại','người tận dụng thời gian']],
 gopy:[['thầy cô người Nhật sửa phát âm','nói はい、わかりました rồi đọc lại','người tiến bộ nhanh'],
       ['bạn góp ý cho mình','nói “Cảm ơn bạn”, ghi 1 ý cần sửa','người biết lắng nghe']],
 camxuc:[['thấy mình bắt đầu bực','hít 3 hơi và gọi tên cảm xúc','người bình tĩnh'],
         ['nhận tin không vui','viết 1 câu: mình đang cảm thấy gì','người làm chủ cảm xúc']],
 vandong:[['vừa thức dậy','làm 10 cái squat','người khỏe, đủ sức làm việc ở Nhật'],
          ['đi làm thêm về, trước khi tắm','giãn cơ 3 phút','người năng động'],
          ['ngồi xem điện thoại quá 30 phút','đứng dậy đi bộ 2 phút','người biết giữ sức khỏe']],
 anuong:[['vừa thức dậy','uống 1 ly nước','người biết chăm sóc bản thân'],
         ['chuẩn bị đi học','đổ đầy bình nước mang theo','người biết chăm sóc bản thân'],
         ['ngồi vào bàn ăn trưa','ăn thêm một phần rau','người khỏe để học và làm việc']],
 ngu:[['đánh răng buổi tối','cắm sạc điện thoại xa giường','người tỉnh táo mỗi sáng'],
      ['đi làm thêm về đến chỗ ở','chuẩn bị đồ cho mai, không mở game','người tỉnh táo mỗi sáng'],
      ['đồng hồ chỉ 22 giờ 30','tắt màn hình và nằm xuống','người đủ sức học trọn 4 tiết']],
 bot:[['muốn mở mạng xã hội lúc đang học','úp điện thoại xuống, học tiếp 5 phút','người làm chủ thời gian'],
      ['đã 22 giờ 30 tối','để điện thoại ngoài tầm tay','người làm chủ thời gian']],
 chitieu:[['muốn mua một món đồ','tự hỏi: mình CẦN hay chỉ THÍCH, rồi mới mua','người dùng tiền có kế hoạch'],
          ['nhận lương làm thêm','để riêng tiền thứ CẦN trước, thứ MUỐN sau','người dùng tiền có kế hoạch'],
          ['vừa trả tiền xong','ghi 1 dòng chi tiêu','người dùng tiền có kế hoạch']],
 tiengnhat:[['gặp thầy cô người Nhật ở hành lang','nói 1 câu chào bằng tiếng Nhật','người tự tin nói tiếng Nhật'],
            ['xin phép vào lớp','nói 失礼します','người lịch sự như ở công ty Nhật'],
            ['chào bạn bè buổi sáng','nói おはよう thay cho “chào”','người tự tin nói tiếng Nhật']],
 quansat:[['đi từ lớp về','ghi 1 điều mình để ý thấy','người tinh ý, hiểu chuyện'],
          ['ngồi chờ ở phòng làm hồ sơ','quan sát anh chị làm việc, ghi 1 điều học được','người tinh ý, hiểu chuyện'],
          ['check-in tối','ghi 1 câu muốn hỏi thầy cô ngày mai','người ham học hỏi']],
 viecko:[['lớp phân công trực nhật 5S','nhận khu vực khó dọn nhất','người không ngại khó'],
         ['thầy cô hỏi “ai làm?”','giơ tay trước khi kịp ngại','người không ngại khó']],
 horenso:[['làm xong việc thầy cô giao','báo lại 1 câu: “Em làm xong rồi ạ”','người làm việc chuyên nghiệp'],
          ['biết mình sẽ đến trễ hoặc phải nghỉ','nhắn báo thầy cô trước giờ học','người làm việc chuyên nghiệp'],
          ['chưa chắc mình hiểu đúng lời dặn','nhắc lại để xác nhận','người làm việc chuyên nghiệp']],
 giup:[['trực nhật xong khu vực của mình','hỏi bạn bên cạnh “Có cần mình giúp không?”','người đồng đội tốt'],
       ['thấy bạn đang bưng vác','đỡ một tay','người đồng đội tốt']]
};
function sugBox(){
  var list=SUG[ST.id]; if(!list || ST.cust) return '';
  var h='<button class="sugt'+(ST.sugOpen?' on':'')+'" data-act="sugT" aria-expanded="'+!!ST.sugOpen+'">'+(ST.sugOpen?'Ẩn gợi ý':'+ Gợi ý')+'</button>';
  if(ST.sugOpen) h+='<div class="sugl">'+list.map(function(g,i){ return '<button class="sugc" data-act="sugPick" data-v="'+i+'">Khi <b>'+esc(g[0])+'</b>, tôi sẽ <b>'+esc(g[1])+'</b> để trở thành <b>'+esc(g[2])+'</b>.</button>'; }).join('')+'<p class="note">Chạm một câu là điền cả công thức. Bạn vẫn sửa được từng phần.</p></div>';
  return h;
}

var GOPEN=null, GDSHOW=false;
function anyStamp(){ for(var d in S.log){ for(var k in S.log[d]){ var m=S.log[d][k]; if(m==='y'||m==='p') return true; } } return false; }
function gOpen(){ return GOPEN===null ? handList().length===0 : GOPEN; }
function guideSteps(){var first=handList()[0];return [
 {t:'Chọn một việc nhỏ',d:'Chọn thẻ có sẵn hoặc tự tạo một thẻ riêng.',done:Object.keys(S.habits).length>0,btn:['firstChoice32','Chọn thẻ đầu tiên']},
 {t:'Làm xong, chạm Đóng dấu',d:'Chọn kết quả và ghi chú ngắn để lưu dấu. Bạn có thể hoàn tác.',done:anyStamp(),btn:first?['card','Xem thẻ của bạn',first]:null},
 {t:'Nhìn lại ngày bằng check-in',d:'Ghi chú từng thói quen được dùng lại; memo cuối ngày và cảm xúc tùy chọn.',done:ciDays()>0,btn:['ci','Mở check-in',dk()]}
];}
function guideBox(){
  if(S.guideOff || (S.guideDone && !GDSHOW)) return '';
  var st=guideSteps(), done=0, cur=-1, i, op=gOpen();
  for(i=0;i<st.length;i++){ if(st[i].done) done++; else if(cur<0) cur=i; }
  if(cur<0 && !S.guideDone){ S.guideDone=1; GDSHOW=true; save(); }
  if(cur<0) return '<div class="gd gd--done"><div class="gd__bar"><span class="gd__ring">✓</span><span class="gd__t"><small>LÀM QUEN · '+st.length+'/'+st.length+'</small><b>Bạn đã làm quen xong!</b></span><button class="btn btn--ghost btn--sm" data-act="guideOff">Ẩn</button></div></div>';
  var h='<div class="gd'+(op?' open':'')+'"><button class="gd__bar" data-act="gtoggle" aria-expanded="'+op+'"><span class="gd__ring">'+done+'/'+st.length+'</span><span class="gd__t"><small>LÀM QUEN</small><b>'+(op?st.length+' việc đầu tiên cùng Shin':'Tiếp theo: '+esc(st[cur].t))+'</b></span>'+ic('arrow')+'</button>';
  if(op) h+='<div class="gd__l">'+st.map(function(s2,k){
      return '<div class="gd__s'+(s2.done?' done':k===cur?' cur':'')+'"><i>'+(s2.done?'✓':(k+1))+'</i><div><b>'+esc(s2.t)+'</b><span>'+esc(s2.d)+'</span>'+(k===cur&&s2.btn?'<button class="btn btn--sm btn--soft" data-act="'+s2.btn[0]+'"'+(s2.btn[2]?' data-v="'+s2.btn[2]+'"':'')+'>'+esc(s2.btn[1])+'</button>':'')+'</div></div>'; }).join('')+
    '</div><div class="gd__f"><button class="btn btn--ghost btn--sm" data-act="guideOff">Ẩn hướng dẫn</button></div>';
  return h+'</div>';
}
function gdRefresh(){ var w=$('#gdw'); if(w) w.innerHTML=guideBox(); }
function homeGuide(){
  var ios=isIOS(), h='<div class="center"><div style="width:96px;margin:0 auto">'+shin('think')+'</div><h2 style="margin:6px 0 4px">Thêm app vào màn hình chính</h2><p class="muted small" style="margin:0 0 12px">Mở nhanh từ màn hình chính, như một ứng dụng riêng.</p></div>';
  if(ios) h+='<ol class="steps"><li><b>Mở app bằng Safari</b>Không mở trong Zalo hay Messenger.</li><li><b>Chạm nút Chia sẻ</b>Ô vuông có mũi tên lên, ở thanh dưới.</li><li><b>Chọn “Thêm vào MH chính”</b>Kéo xuống một chút sẽ thấy.</li></ol>';
  else h+='<ol class="steps"><li><b>Mở app bằng Chrome</b>Không mở trong Zalo hay Messenger.</li><li><b>Chạm nút ⋮</b>Ở góc trên bên phải.</li><li><b>Chọn “Thêm vào màn hình chính”</b>Hoặc “Cài đặt ứng dụng”.</li></ol>';
  h+='<div class="stack" style="margin-top:12px"><button class="btn btn--wide" data-act="gHome">Mình đã thêm xong</button><button class="btn btn--ghost btn--wide" data-act="close">Để sau</button></div><p class="note center">Từ nay mở bằng biểu tượng mèo Shin trên màn hình chính.</p>';
  openMini(h);
}

var SLOT=0, VDAY=null, SBACK=false;
function inApp(){ var u=navigator.userAgent||''; return /Zalo|FBAN|FBAV|Messenger|Instagram|Line\//i.test(u); }
function curDay(){ return VDAY||dk(); }
function handList(){ return S.slots.filter(function(id){ return !!id && S.habits[id] && S.habits[id].status!=='pause'; }); }
function ciPhase36(now){
  var n=now||new Date(),d=dk(n);if(S.ci[d])return 'done';
  var p=(S.ciTime||'21:00').split(':'),target=new Date(n);target.setHours(+p[0],+p[1],0,0);
  var remaining=target.getTime()-n.getTime();return remaining<=0?'due':remaining<=60*60000?'soon':'idle';
}
var CI_CLOCK36=null;
function refreshCheckin36(){
  if(!S||document.hidden)return;var button=$('.ckb');if(!button)return;
  if(button.getAttribute('data-ci-state')!==ciPhase36()||button.getAttribute('data-v')!==dk()||button.getAttribute('data-ci-time')!==S.ciTime)renderBar();
}
function scheduleCheckin36(){
  clearTimeout(CI_CLOCK36);if(document.hidden)return;refreshCheckin36();
  CI_CLOCK36=setTimeout(scheduleCheckin36,60000-Date.now()%60000+20);
}
document.addEventListener('visibilitychange',scheduleCheckin36);
window.addEventListener('pageshow',scheduleCheckin36);
window.addEventListener('focus',scheduleCheckin36);
function vToday(){
  var day=dk(),list=handList(),n=list.length,recorded=list.filter(function(id){return !!mark(day,id);}).length,h='';
  if(inApp())h+='<div class="banner"><b>Mở bằng Safari hoặc Chrome để giữ bài làm.</b></div>';


  h+='<div class="today-toolbar33"><span class="today-count33">'+(n?'<b>'+recorded+'/'+n+'</b> đã ghi nhận':'Chọn một việc nhỏ')+'</span><div class="home-view-switch" role="group" aria-label="Chế độ xem thói quen"><button data-act="homeView" data-v="cards" aria-label="Xem thẻ" aria-pressed="'+(S.homeView==='cards')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="6" y="4" width="12" height="16" rx="2"/><path d="M3 7v10M21 7v10"/></svg></button><button data-act="homeView" data-v="list" aria-label="Xem danh sách" aria-pressed="'+(S.homeView==='list')+'">'+'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M3 6h.1M3 12h.1M3 18h.1"/></svg>'+'</button></div><button class="today-library" data-act="collection" aria-label="Thư viện">'+ic('book')+'</button>'+(n&&n<5?'<button class="today-add" data-act="pick" aria-label="Thêm thẻ">'+ic('plus')+'</button>':'')+'</div>';
  h+='<section class="today-practice" aria-label="Thói quen của bạn">';
  if(!n)h+='<div class="today-empty"><div class="today-empty-shin33">'+shin('hi')+'</div><h3>Một thẻ là đủ để bắt đầu</h3><button class="btn" data-act="pick">Chọn thẻ đầu tiên'+ic('arrow')+'</button></div>';
  else if(S.homeView==='cards')h+=homeCards29(list,day);
  else h+='<div class="today-list">'+list.map(function(id){return todayHabit(id,day);}).join('')+'</div>';
  return h+'</section>';
}
function homeCards29(list,day){
  if(SLOT>=list.length) SLOT=Math.max(0,list.length-1);
  return '<div class="home-cards"><div class="stagewrap"><div class="stage'+(list.length>1?' multi':'')+'" id="stage" tabindex="0" aria-roledescription="dải thẻ" aria-label="Thẻ '+(SLOT+1)+' trên '+list.length+'. Dùng mũi tên để đổi thẻ, chạm để xem chi tiết."><div class="track" id="track">'+list.map(function(id,i){return '<div class="cs" data-i="'+i+'">'+cardFaces(id,{home:true,day:day,back:i===SLOT&&SBACK})+'</div>';}).join('')+'</div></div></div><div class="sdots" id="sdots">'+(list.length>1?'<button class="arr2" data-act="slprev" aria-label="Thẻ trước">'+ic('back')+'</button>':'')+'<span class="dd2">'+list.map(function(_,i){return '<button class="'+(i===SLOT?'on':'')+'" data-act="slgo" data-v="'+i+'" aria-label="Thẻ '+(i+1)+'"></button>';}).join('')+'</span><button class="flipb" data-act="flipHome" aria-label="Lật thẻ">'+ic('redo')+'</button>'+(list.length>1?'<button class="arr2 r" data-act="slnext" aria-label="Thẻ sau">'+ic('back')+'</button>':'')+'</div></div>';
}
function todayHabit(id,day){
  var x=HMAP[id],u=H(id),hint=u.anchor?'Khi '+u.anchor:'',m=mark(day,id);
  var record=stampBtn(id,day).replace('class="hold ', 'class="hold today-record ');
  return '<article class="today-habit compact-habit33 g'+x.g+'"><button class="today-open" data-act="card" data-v="'+id+'" data-hint33="'+esc(hint)+'" aria-label="Xem thẻ '+esc(sname(id))+'" aria-description="'+esc(hint)+'"><span class="today-habit-icon">'+glyph(id,GCOL[x.g])+'</span><span class="today-habit-content"><b>'+esc(sname(id))+'</b><span class="today-action34">'+esc(u.act||x.act||'')+'</span></span></button>'+record+'</article>';
}
/* ---- dải thẻ: vẽ một lần, chỉ trượt bằng transform ---- */
var SW=null, CS=[];
function relPos(i,n){ var r=((i-SLOT)%n+n)%n; if(r>n/2) r-=n; if(n===2 && r===-1) r=1; return r; }
function layoutCards(drag,anim){
  var st=$('#stage'); if(!st) return; var n=CS.length, w=st.clientWidth, step=w*0.88, mh=0;
  for(var i=0;i<n;i++){ var el=CS[i], r=relPos(i,n), x=r*step, k=Math.min(Math.abs(x)/step,1);
    el.style.transition = anim ? 'transform .45s cubic-bezier(.22,.9,.24,1), opacity .45s cubic-bezier(.22,.9,.24,1)' : 'none';
    el.style.transform='translate3d('+x.toFixed(1)+'px,0,0) scale('+(1-k*0.07).toFixed(3)+')';
    el.style.opacity = Math.abs(r)>1 ? 0 : (1-k*0.5).toFixed(2);
    el.style.zIndex = r===0?3:1; el.classList.toggle('cur',r===0); el.setAttribute('aria-hidden',r===0?'false':'true');
    el.style.pointerEvents = Math.abs(r)>1 ? 'none' : '';
    if(i===SLOT)mh=el.offsetHeight;
  }
  st.style.height=(mh+10)+'px';
  fitDeck34(st);
}
function stageInit(){
  var st=$('#stage'); if(!st) return; CS=$$('#track .cs'); fitText(st); layoutCards(0,false);
  /* Chạm thẻ giữa để mở chi tiết; nút lật giữ riêng bên dưới. */
  st.addEventListener('click',function(e){
    if(e.target.closest('button,a,.hold,summary,input,textarea')) return;
    var cs=e.target.closest('.cs'); if(!cs) return; var r=relPos(+cs.getAttribute('data-i'),CS.length);
    if(r===0)openCard(handList()[SLOT]);else slideTo(r>0?1:-1);
  });
  st.addEventListener('keydown',function(e){ if(e.key==='ArrowRight') slideTo(1); else if(e.key==='ArrowLeft') slideTo(-1); else if((e.key==='Enter'||e.key===' ') && e.target===st){ e.preventDefault();openCard(handList()[SLOT]);} });
}
function slideTo(dir){
  var n=CS.length; if(n<2) return;
  var f=$('.cs.cur .flip'); if(f) f.classList.remove('flipped'); SBACK=false;
  SLOT=(SLOT+dir+n)%n;
  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  layoutCards(0,!reduce);
  $$('#sdots .dd2 button').forEach(function(d,i){ d.classList.toggle('on',i===SLOT); });
  var st=$('#stage'); if(st) st.setAttribute('aria-label','Thẻ '+(SLOT+1)+' trên '+n+'. Dùng mũi tên để đổi thẻ, chạm để xem chi tiết.');
}
function flipHome(){ var f=$('.cs.cur .flip'); if(!f) return; if(!S.gFlip){ S.gFlip=1; save(); gdRefresh(); } SBACK=!SBACK; f.classList.toggle('flipped',SBACK); setTimeout(function(){ layoutCards(0,false); },20); }
/* ---- con dấu + ghi nhanh ---- */
function holdBtn(id,day){
  day=day||dk();return '<button class="hold stamp-simple34" data-act="note" data-v="'+id+'|'+day+'" aria-label="Đóng dấu"><span>Đóng dấu</span></button>';
}
function stampBtn(id,day){
  day=day||dk();var m=mark(day,id),label=m?RECORD_LABEL[m]:'Đóng dấu';
  return '<button class="hold stamp-simple34'+(m==='y'||m==='p'?' is':'')+'" data-act="note" data-v="'+id+'|'+day+'" aria-label="'+esc(label)+'"><span>'+esc(label)+'</span></button>';
}
var NT=null, RECORD_UNDO=null, RECORD_SERIAL=0, RECORD_VERSIONS={};
var RECORD_LABEL={y:'Đã làm',p:'Một phần',n:'Chưa làm',x:'Không gặp dịp'};
function recordScore(m){return m==='y'?10:m==='p'?5:0;}
function recordIcon(m){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(m==='y'?'<path d="M5 12l4 4L19 6"/>':m==='p'?'<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/>':m==='x'?'<path d="M8 12h8"/><circle cx="12" cy="12" r="8"/>':'<path d="M6 12h12"/>')+'</svg>'; }
function captureRecord(id,d){return {id:id,day:d,m:mark(d,id),note:((S.notes[d]||{})[id]),why:((S.why[d]||{})[id]),bf:((S.bf[d]||{})[id]),master:H(id).master,xp:S.xp};}
function setRecordField(obj,d,id,value){obj[d]=obj[d]||{}; if(value===undefined)delete obj[d][id];else obj[d][id]=value;}
function writeRecord(id,d,m,note,why){
  if(m&&!String(note===undefined?((S.notes[d]||{})[id]||''):note).trim())return false;
  var old=captureRecord(id,d); S.log[d]=S.log[d]||{};
  if(m)S.log[d][id]=m;else delete S.log[d][id];
  if(note!==undefined)setRecordField(S.notes,d,id,note.trim()||undefined);
  if(!m)setRecordField(S.notes,d,id,undefined);
  setRecordField(S.why,d,id,m==='n'?(why||undefined):undefined);
  if(d!==dk()&&m)setRecordField(S.bf,d,id,1);else if(!m)setRecordField(S.bf,d,id,undefined);
  S.xp=Math.max(0,S.xp+recordScore(m)-recordScore(old.m));
  var u=H(id); if(m&&u.lv===3&&!u.master&&daysAt(id)>=needFor(id,3)){u.master=dk();S.xp+=80;}
  var token=++RECORD_SERIAL;RECORD_VERSIONS[d+'|'+id]=token;
  old.token=token;old.xpChange=S.xp-old.xp;old.masterAfter=u.master;RECORD_UNDO=old;
  save(true);return old;
}
function recordFeedback(id,d,removed){
  var tx=RECORD_UNDO;refreshAll();restoreHabit33();
  toast('<span class="record-feedback"><span>'+(removed?'Đã bỏ ghi nhận':RECORD_LABEL[mark(d,id)]||'Đã lưu')+' · '+esc(sname(id))+'</span><span class="record-feedback-actions"><button data-act="undoRecord" data-v="'+tx.token+'">Hoàn tác</button>'+(removed?'':'<button data-act="recordNote" data-v="'+id+'|'+d+'">Ghi chú</button>')+'</span></span>',8000);
}
function quickStamp29(id,d){openNote(id,d||dk());}
function undoRecord29(token){
  var t=RECORD_UNDO;if(!t||String(t.token)!==String(token)||RECORD_VERSIONS[t.day+'|'+t.id]!==t.token){toast('Ghi nhận này đã được chỉnh tiếp. Bạn có thể mở thẻ để sửa.');return;}
  S.log[t.day]=S.log[t.day]||{};if(t.m)S.log[t.day][t.id]=t.m;else delete S.log[t.day][t.id];
  setRecordField(S.notes,t.day,t.id,t.note);setRecordField(S.why,t.day,t.id,t.why);setRecordField(S.bf,t.day,t.id,t.bf);
  if(H(t.id).master===t.masterAfter){if(t.master===undefined)delete H(t.id).master;else H(t.id).master=t.master;}
  S.xp=Math.max(0,S.xp-t.xpChange);RECORD_VERSIONS[t.day+'|'+t.id]=++RECORD_SERIAL;RECORD_UNDO=null;save(true);refreshAll();toast('Đã hoàn tác.');
}
function recordOptions29(id,value,act){
  var choices=isDip(id)?['y','n','x']:['y','p','n'];return '<div class="record-options" role="group" aria-label="Kết quả của '+esc(sname(id))+'">'+choices.map(function(m){return '<button class="record-option state-'+m+'" data-act="'+act+'" data-v="'+id+'|'+m+'" aria-pressed="'+(value===m)+'">'+recordIcon(m)+'<span>'+RECORD_LABEL[m]+'</span></button>';}).join('')+'</div>';
}
function openNote(id,day){
  $('#toast').classList.remove('show');
  day=day||dk();if(!H(id)||(day!==dk()&&!canBf(day,id)))return;
  rememberHabit33();NT={id:id,day:day,ans:mark(day,id)||'y',text:(S.notes[day]||{})[id]||'',why:(S.why[day]||{})[id]||'',open:false};
  NT.open=!!NT.text;openMini('');drawNote29();
}
/* Superseded renderer removed: drawNote29; active implementation is in scripts/interface.js. */
function commitStamp(){
  if(!NT)return;if(!String(NT.text||'').trim()){var err=$('#ntRequired34');if(err)err.hidden=false;var input=$('#ntIn');if(input)input.focus();return;}
  var id=NT.id,d=NT.day;if(!writeRecord(id,d,NT.ans,NT.text,NT.why))return;
  closeOv(true);NT=null;recordFeedback(id,d,false);
}
/* =========================================================
   GIỮ ĐỂ ĐÓNG DẤU → mở ghi nhanh
   ========================================================= */
var HT=null, HEL=null, HSTART=0;
function holdStart(el){ HEL=el; HSTART=Date.now(); el.classList.add('holding'); clearTimeout(HT); HT=setTimeout(function(){ var id=el.getAttribute('data-hold'), d=el.getAttribute('data-day')||dk(); HEL=null; el.classList.remove('holding'); if(navigator.vibrate){ try{ navigator.vibrate(15); }catch(e){} } openNote(id,d); },700); }
function holdEnd(){ if(!HEL) return; clearTimeout(HT); HEL.classList.remove('holding'); if(Date.now()-HSTART<650) toast('Giữ ngón tay thêm một chút để đóng dấu nhé.'); HEL=null; }
if(window.PointerEvent){
  document.addEventListener('pointerdown',function(e){ var el=e.target.closest('.hold[data-hold]'); if(!el) return; e.preventDefault(); holdStart(el); });
  ['pointerup','pointercancel','pointerleave'].forEach(function(t){ document.addEventListener(t,function(e){ if(HEL && (t!=='pointerleave' || e.target===HEL)) holdEnd(); },true); });
} else {
  document.addEventListener('touchstart',function(e){ var el=e.target.closest('.hold[data-hold]'); if(!el) return; e.preventDefault(); holdStart(el); },{passive:false});
  document.addEventListener('touchend',holdEnd); document.addEventListener('mousedown',function(e){ var el=e.target.closest('.hold[data-hold]'); if(el) holdStart(el); }); document.addEventListener('mouseup',holdEnd);
}
document.addEventListener('contextmenu',function(e){ if(e.target.closest('.hold')) e.preventDefault(); });

/* =========================================================
   BỘ SƯU TẬP · dùng trong Tiến bộ và khi chọn thẻ cho khung
   ========================================================= */
function deckStrips(){
  return GROUPS.map(function(g){
    var list=HABITS.filter(function(x){ return x.g===g.g; });
    return '<div class="deck"><div class="deck__h">'+gico(g.g,'sm')+'<h2>'+esc(g.t)+'</h2></div><div class="strip">'+
      list.map(function(x){ var u=H(x.id), on=S.slots.indexOf(x.id)>=0;
        return '<button class="mc g'+x.g+(u?' lv'+u.lv:' off')+'" data-act="mcard" data-v="'+x.id+'" aria-label="'+esc(x.t)+'">'+(on?'<i class="tag" aria-hidden="true"></i>':'')+hico(x.id)+'<b>'+esc(x.s)+'</b>'+stars(u?u.lv:0,12)+'</button>'; }).join('')+
      '</div></div>';
  }).join('');
}
var PICK=null;
function openPicker(slot){ openStore(true); }
function openCollection(){ openStore(false); }
function placeInSlot(id){
  if(PICK==null||PICK<0||S.slots[PICK]) PICK=S.slots.indexOf(null);
  var cur=S.slots.indexOf(id); if(cur>=0){ SLOT=Math.max(0,handList().indexOf(id)); return; }
  var s=(PICK!=null && !S.slots[PICK]) ? PICK : S.slots.indexOf(null);
  if(s<0){ toast('5 khung đã đầy. Cất bớt một thẻ trước nhé.'); return false; }
  S.slots[s]=id; PICK=null; SLOT=Math.max(0,handList().indexOf(id)); return true;
}
/* =========================================================
   LỚP PHỦ
   ========================================================= */
var OV=null;
function openOv(html,mini){
  closeOv(true);
  var o=document.createElement('div'); o.className='ov'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true');
  o.innerHTML='<div class="sheet'+(mini?' sheet--mini':'')+'">'+html+'</div>';
  o.addEventListener('click',function(e){ if(e.target===o){if(LETTER_FLOW37){letterBack37();return;}if(!restoreHabit33()){closeOv();render();}} });
  document.body.appendChild(o); OV=o; document.body.style.overflow='hidden';
  return o;
}
function openMini(inner){ return openOv('<div class="sh__h"><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>'+inner, true); }
function closeOv(silent){if(LETTER_FLOW37){stashLetterDraft37(true);clearTimeout(LETTER_TIMER37);LETTER_FLOW37=null;}TREE_DETAIL30=null; if(CI&&CI.mode==='review'&&!CI.done)stashCI29(); NBOPEN=false; if(OV){ OV.remove(); OV=null; } document.body.style.overflow=''; if(!silent){ ST=null; CI=null; } }
function sheetSet(html){ if(OV){ var s=OV.querySelector('.sheet'); s.innerHTML=html; s.scrollTop=0; } }

/* =========================================================
   THẺ · mặt trước “thẻ chứng nhận”, mặt sau “bưu thiếp”
   ========================================================= */
var CARD=null;
function cardNo(id){ for(var i=0;i<HABITS.length;i++){ if(HABITS[i].id===id) return pad(i+1); } return '00'; }
function emblem(id,sz){ var g=HMAP[id].g; return '<span class="emb g'+g+'" style="'+(sz?'width:'+sz+'px;height:'+sz+'px':'')+'">'+glyph(id,GCOL[g])+'</span>'; }
function days7(id,day){
  var t=dk(), ws=wkStart(t), u=H(id), h='<div class="d7" aria-label="Tuần này">';
  for(var i=0;i<7;i++){ var d=addD(ws,i), m=mark(d,id), cls=m+(d===t?' td':'')+(d>t?' fu':'');
    if(u && !m && u.status!=='keep' && canBf(d,id)) h+='<button class="'+cls+' bfd" data-act="note" data-v="'+id+'|'+d+'" aria-label="Ghi bù '+WD[pd(d).getDay()]+'"><span>'+WDS[i]+'</span></button>';
    else h+='<span class="'+cls+'"><span>'+WDS[i]+'</span></span>'; }
  return h+'</div>';
}
function cardFront(id,o){
  o=o||{}; var x=HMAP[id], u=H(id), lv=u?u.lv:0, day=o.day||dk(), slotted=S.slots.indexOf(id)>=0;
  var icons=x.custom?'':'<button data-act="how" data-v="'+id+'" class="'+(u&&!S.howSeen[id]?'unseen':'')+'" aria-label="Cách làm'+(u&&!S.howSeen[id]?' (chưa xem)':'')+'">'+ic('book')+'</button>';
  if(u && slotted){ var run=u.status!=='pause';
    icons+='<button data-act="edit" data-v="'+id+'" aria-label="Sửa thẻ">'+ic('edit')+'</button>'; }
  var f='<div class="ct g'+x.g+' lv'+lv+(u&&u.status==='pause'?' paused':'')+'"><div class="ct__top">'+(x.custom?'<span class="ct__k ct__k--mine">Thẻ tự tạo</span>':'<span class="ct__k">KAIZEN <span class="jp">改善</span> · '+cardNo(id)+'</span>')+'<span class="ct__ic">'+icons+'</span></div>'+
    '<div class="ct__mid">'+emblem(id)+'<div class="ct__t">'+esc(hname(id))+'</div><div class="foil lv'+lv+'">'+(lv?LV_NAME[lv]:'Chưa có chủ')+' '+stars(lv,11)+'</div></div>';
  if(u) f+='<div class="ct__f"><div><small>KHI</small><span>'+esc(u.anchor)+'</span></div><div><small>TÔI SẼ</small><span>'+esc(u.act)+'</span></div></div>'+days7(id,day);
  else f+='<div class="ct__f"><div><small>BẮT ĐẦU</small><span>'+esc(x.tiers[0])+'</span></div><div><small>TRỞ THÀNH</small><span>'+esc(x.who[0])+'</span></div></div>'+days7('__',day);
  f+='<div class="ct__stub">';
  if(u){ var n=daysAt(id), need=needFor(id,lv);
    f+='<div class="ct__own"><small>CHỦ THẺ</small><b>'+esc(S.name)+'</b><small>Rèn từ '+dm(u.since)+' · '+Math.min(n,need)+'/'+need+' '+unitOf(id)+(isDip(id)?' · khi gặp dịp':'')+'</small><div class="meter"><i style="width:'+Math.round(lvPct(id)*100)+'%"></i></div></div>';
    if(!slotted) f+='<button class="btn btn--sm" data-act="slotit" data-v="'+id+'">Đưa lên tay</button>';
    else if(u.status==='pause') f+='<button class="btn btn--ghost btn--sm" data-act="unslot" data-v="'+id+'">Cất thẻ</button>';
    else if(ready(id)) f+='<button class="btn btn--gold btn--sm invite" data-act="lvup" data-v="'+id+'">Lên cấp</button>';
    else if(u.master) f+='<button class="btn btn--sm" data-act="tokeep" data-v="'+id+'">Sang duy trì</button>';
    else f+=stampBtn(id,day);
  } else f+='<div class="ct__own"><small>CHỦ THẺ</small><b class="muted" style="font-weight:500">Chưa có</b><small>Thẻ số '+cardNo(id)+' / '+HABITS.length+'</small></div><button class="btn btn--sm invite" data-act="start" data-v="'+id+'">Rèn thẻ này</button>';
  f+='</div></div>';
  return f;
}
var SENPAI_FACES=['Senpai Minh','Senpai Hạnh','Senpai Vy','Senpai Tuấn','Senpai Linh','Senpai Phong'];
var SP_INFO=[{g:'Anh',ind:'nhà máy'},{g:'Chị',ind:'chế biến thực phẩm'},{g:'Chị',ind:'điều dưỡng'},{g:'Anh',ind:'xây dựng'},{g:'Chị',ind:'nhà hàng, khách sạn'},{g:'Anh',ind:'gara ô tô'}];
var SPV={chao:1,som:1,camon:1,giup:1,vandong:2,quansat:2,gopy:2,'5phut':2,chitieu:4,loihua:4,viecko:4,horenso:4,memo:0,'5s':0,xinloi:0,camxuc:0,anuong:3,ngu:3,bot:5,tiengnhat:5};
function spOf(id){ return SPV[id]!==undefined?SPV[id]:hashCode(id)%6; }
var BEN={
 chao:'Một lời chào chỉ mất vài giây, mà người nghe nhớ bạn lâu hơn bạn nghĩ.',
 som:'Đến sớm năm phút, bạn bước vào việc bằng sự bình tĩnh, không phải chạy vội.',
 memo:'Ghi ra giấy thì đầu óc nhẹ hơn, và bạn khỏi phải hỏi lại cùng một điều hai lần.',
 '5s':'Mỗi thứ có chỗ của nó thì tìm nhanh hơn, làm cũng đỡ rối hơn.',
 camon:'Một lời cảm ơn cụ thể làm người giúp bạn vui, và lần sau họ sẵn lòng giúp tiếp.',
 xinloi:'Nhận lỗi sớm thì chuyện nhỏ còn nhỏ, và lần sau người ta dễ tin bạn hơn.',
 loihua:'Giữ được lời hứa nhỏ với chính mình, bạn dần tin mình giữ được cả lời hứa lớn.',
 '5phut':'Những quãng chờ cộng lại thành giờ học mà bạn không phải lấy từ giấc ngủ.',
 gopy:'Góp ý nghe thì khó chịu, nhưng thường là cách nhanh nhất để biết mình nên sửa gì.',
 camxuc:'Gọi được tên cảm xúc thì nó bớt lớn, và bạn có thêm vài giây để chọn cách phản ứng.',
 vandong:'Vài phút cử động mỗi ngày giúp người tỉnh hơn, tối ngủ cũng dễ hơn.',
 anuong:'Ăn đủ bữa thì có sức học, sức làm, và đỡ cáu những lúc mệt.',
 ngu:'Ngủ đủ thì sáng mai đầu óc nhẹ hơn, học vào cũng nhanh hơn.',
 bot:'Bớt từng chút thì dễ hơn bỏ phắt, và bạn thấy rõ mình làm được.',
 chitieu:'Biết tiền đi đâu thì bạn chủ động hơn, và dành được cho điều mình thật sự cần.',
 tiengnhat:'Mỗi câu nói thử là một lần quen tai, quen miệng. Nói sai cũng là đang học.',
 quansat:'Nhìn kỹ rồi hỏi đúng một câu giúp bạn vào việc nhanh hơn là cứ loay hoay một mình.',
 viecko:'Việc hơi ngại, làm được rồi là tự tin lên một bậc, và người ta để ý đến bạn.',
 horenso:'Báo sớm, báo rõ thì người khác đỡ lo, và bạn đỡ phải gánh một mình.',
 giup:'Giúp một việc nhỏ thôi mà cả nhóm gần nhau hơn, và lần sau bạn cũng có người giúp.'
};
function plain(h){ return String(h).replace(/<[^>]+>/g,''); }
function teaser(t){ t=plain(t); var k=t.indexOf('. '); return k>0 && k<120 ? t.slice(0,k+1) : (t.length>90?t.slice(0,88)+'…':t); }
function cardBack(id){
  var x=HMAP[id], u=H(id), lv=u?u.lv:0, pv=x.prov||x.jp, v=spOf(id);
  if(x.custom) return cardBackMine(id);
  var b='<div class="tkb2'+(lv===3?' lv3':'')+'"><div class="tb__art"><div class="tb__top"><span>Ý NGHĨA · 意味</span>'+stars(lv,11,true)+'</div>'+metaSVG(id)+'</div>'+
    '<div class="tb__body"><div class="pv"><div style="flex:1;min-width:0"><div class="jp">'+esc(pv.j)+'</div><small class="rmj">'+esc(pv.r)+'</small><div class="vi">'+esc(pv.v)+'</div></div><button class="spk" data-act="speak" data-v="'+esc(pv.j)+'" aria-label="Nghe đọc">'+ic('spk')+'</button></div>'+
    '<div class="poem ben"><span>'+esc(BEN[id]||(x.why?x.why.now:'Để trở thành '+x.who[0]+'.'))+'</span></div>';
  if(x.corner||x.kase) b+='<button class="spk2" data-act="senpai" data-v="'+id+'"><span class="av">'+senpai('smile',v)+'</span><span class="sp__t"><small>SENPAI KỂ</small><span>'+esc(x.kase?x.kase.t:teaser(x.corner))+'</span></span><span class="more">Đọc ›</span></button>';
  return b+'</div></div>';
}
function openSenpai(id){
  var x=HMAP[id], v=spOf(id), h='<div class="center"><div style="width:96px;margin:0 auto">'+senpai('smile',v)+'</div><h2 style="margin:6px 0 2px">'+SENPAI_FACES[v]+'</h2></div>';
  if(x.corner) h+='<div class="say__b" style="font-size:15.5px;line-height:1.6;border-radius:20px">'+x.corner+'</div>';
  if(x.kase) h+='<div class="kase"><small>CHUYỆN TRƯỚC ĐÂY</small><h3>'+esc(x.kase.t)+'</h3><p>'+esc(x.kase.s)+'</p><div class="kase__l"><b>Bài học</b>'+esc(x.kase.l)+'</div></div>';
  openMini(h);
}
function cardFaces(id,o){
  o=o||{}; var u=H(id);
  return '<div class="flip'+(u&&u.master?' master':'')+(o.back?' flipped':'')+'"'+(o.home?'':' id="flip" data-act="flipc"')+' role="button" aria-label="'+(o.home?'Xem chi tiết '+esc(sname(id)):'Chạm để lật thẻ')+'"><div class="flip__in">'+cardFront(id,o)+cardBack(id)+'</div></div>';
}
function openCard(id,back){
  if(!HMAP[id])return;if(!S.seen[id]){S.seen[id]=1;save();}
  CARD={id:id,back:!!back,tab:'card',timelineLimit:6};openOv('');drawCard();
}
function drawCard(){
  if(!CARD||!HMAP[CARD.id])return;
  var id=CARD.id,x=HMAP[id],tab=CARD.tab==='journal'?'journal':'card';CARD.tab=tab;
  var h=habitHeader33(id,tab)+'<div id="habit-body33" role="tabpanel" aria-labelledby="habit-tab-'+tab+'">';
  if(tab==='journal')h+=habitJournal33(id);
  else{
    h+='<div class="cardview">'+cardFaces(id,{back:CARD.back})+'</div><div class="fliprow"><button class="flipb" data-act="flipCard" aria-label="Lật thẻ">'+ic('redo')+'</button></div>';
    if(!x.custom)h+='<button class="howbtn" data-act="how" data-v="'+id+'"><span class="hb__i">'+ic('book')+'</span><span><b>Cách làm'+(PRAC[id]?' · Thực tập 30 giây':'')+'</b><small>'+(x.steps?'Thẻ ngắn, học từng phần':'Các cấp và câu tiếng Nhật')+'</small></span>'+ic('arrow')+'</button>';
  }
  sheetSet(h+'</div>');if(OV)OV.querySelector('.sheet').classList.add('habit-sheet33');fitText(OV);
}
/* =========================================================
   CÁCH LÀM · 3–4 thẻ ngắn, có “Thực tập 30 giây”
   ========================================================= */
var PRAC={
  chao:{type:'order', q:'Sáng nay gặp tổ trưởng ở cổng xưởng. Chạm theo đúng thứ tự bạn sẽ làm.', items:['Dừng chân','Nhìn mắt','Nói “Ohayō gozaimasu”','Cúi 15°'], mix:[2,0,3,1], ok:'Nói trước, cúi sau: 語先後礼 (gosen gorei).'},
  som:{type:'slider', q:'Ca bắt đầu lúc 8:00. Đi bộ đến xưởng mất 10 phút, thay đồng phục mất 5 phút. Mấy giờ bạn rời phòng?', min:440, max:475},
  memo:{type:'pick', q:'Tổ trưởng dặn bạn. Chạm vào 4 thông tin cần ghi vào sổ memo.', tokens:['Thứ Sáu này','nhé,','lúc 9 giờ','em mang','găng tay mới','xuống','kho B','giúp anh.'], ok:[0,2,4,6]},
  '5s':{type:'tidy', q:'Bàn học bừa quá! Chạm từng món để cất về đúng chỗ trên kệ. Thử trong 30 giây nhé.', items:['Bút','Sách','Kéo','Cốc nước','Sổ memo','Sạc điện thoại']},
  camon:{type:'choose', q:'Chị tổ trưởng vừa chỉ bạn cách gấp hộp nhanh hơn. Câu cảm ơn nào chạm tới người nghe nhất?', o:['Cảm ơn ạ.','Em cảm ơn chị đã chỉ em cách gấp hộp, giờ em làm nhanh hơn nhiều ạ.','Dạ, em biết cách đó rồi nhưng vẫn cảm ơn chị đã chỉ lại cho em ạ.'], ok:1, ex:'Nói rõ việc cụ thể và kết quả. Người nghe biết sự giúp đỡ của họ có ý nghĩa.'},
  xinloi:{type:'choose', q:'Bạn xếp nhầm hàng vào thùng khác. Tổ trưởng hỏi chuyện. Bạn nói gì?', o:['Tại vì nhãn in mờ quá nên em nhìn nhầm ạ, không phải do em đâu.','Em xin lỗi, em đã xếp nhầm thùng. Em sẽ đổi lại ngay và kiểm nhãn hai lần.','(Cười) Dạ… em xin lỗi ạ.'], ok:1, ex:'Xin lỗi trước, nói rõ sai ở đâu và sẽ sửa thế nào. Không viện cớ, không cười cho qua.'},
  loihua:{type:'choose', q:'Tối nay bạn hứa với chính mình điều gì?', o:['Học 100 từ mới trước khi ngủ.','Học 5 từ mới trước khi ngủ.','Học tiếng Nhật thật chăm chỉ hơn.'], ok:1, ex:'Lời hứa nhỏ và cụ thể thì giữ được. Giữ được nhiều lần, chữ tín với chính mình lớn dần.'},
  camxuc:{type:'breathe', q:'Đặt ngón tay lên vòng tròn và giữ. Hít vào chậm, thở ra chậm trong 30 giây, nghĩ về một cảm xúc của bạn hôm nay.'}
};
var HW=null, PR=null;
function openHow(id){
  if(HMAP[id] && HMAP[id].custom){ openCard(id); return; }
  if(!S.howSeen[id]){ S.howSeen[id]=1; save(); }
  var x=HMAP[id], cards=[];
  if(x.steps){
    if(x.dlg) cards.push(['Phỏng vấn','<div class="hw__k">SHIN PHỎNG VẤN SENPAI</div>'+talk(x.dlg, spOf(id))]);
    var c1='<div class="hw__k">Vì sao nên làm?</div>';
    if(x.ill&&x.ill[0]) c1+='<figure class="ill">'+illSVG(x.ill[0])+'<figcaption>'+esc(ILL_CAP[x.ill[0]]||'')+'</figcaption></figure>';
    if(x.why) c1+='<div class="hw__why"><small>Ở NHẬT</small>'+esc(x.why.jp)+'</div><div class="hw__why"><small>VỚI BẠN</small>'+esc(x.why.now)+'</div>';
    if(x.quote) c1+='<div class="quote">“'+esc(x.quote.q)+'”<small>'+esc(x.quote.by)+'</small></div>';
    cards.push(['Vì sao',c1]);
    var c2='<div class="hw__k">Ba bước</div><div class="hwsteps">'+x.steps.map(function(s,i){ return '<div class="hws"><i>'+(i+1)+'</i><div><b>'+esc(s[0])+'</b><span>'+esc(s[1])+'</span></div></div>'; }).join('')+'</div>';
    if(x.ill&&x.ill[1]) c2+='<figure class="ill" style="margin-top:10px">'+illSVG(x.ill[1])+'<figcaption>'+esc(ILL_CAP[x.ill[1]]||'')+'</figcaption></figure>';
    cards.push(['Các bước',c2]);
    if(PRAC[id]) cards.push(['Thực tập','<div class="hw__k">Thực tập 30 giây</div><div id="prBox"></div>']);
    var c4='<div class="hw__k">Nên và tránh</div><div class="dd" style="margin:0 0 10px"><p class="hd" style="color:#17804A">Nên</p><p class="hd" style="color:#B5402F">Tránh</p>'+x.dos.map(function(r){ return '<p class="yes">'+esc(r[0])+'</p><p class="no">'+esc(r[1])+'</p>'; }).join('')+'</div>'+
      '<div class="hw__k" style="margin-top:6px">Câu tiếng Nhật dùng ngay</div>'+jpBox(x.jp)+
      '<details class="oops"><summary>Lỗi hay gặp</summary><ul>'+x.oops.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ul></details>'+
      (x.safe?'<div class="safe"><small>LƯU Ý</small>'+esc(x.safe)+'</div>':'');
    cards.push(['Ghi nhớ',c4]);
  } else {
    cards.push(['Ba cấp','<div class="hw__k">Rèn theo ba cấp</div><div class="hwsteps">'+['Tập sự','Làm quen','Vững tay'].map(function(n,i){ return '<div class="hws"><i>'+(i+1)+'</i><div><b>'+n+'</b><span>'+esc(x.tiers[i])+'</span></div></div>'; }).join('')+'</div>']);
    if(PRAC[id]) cards.push(['Thực tập','<div class="hw__k">Thực tập 30 giây</div><div id="prBox"></div>']);
    cards.push(['Tiếng Nhật','<div class="hw__k">Câu tiếng Nhật dùng ngay</div>'+jpBox(x.jp)+'<p class="note">Hướng dẫn có hình sẽ có ở bản sau.</p>']);
  }
  HW={id:id,i:0,cards:cards}; openOv(''); OV.querySelector('.sheet').classList.add('howpg'); drawHow();
}
/* Superseded renderer removed: drawHow; active implementation is in scripts/interface.js. */
/* ---------- Thực tập ---------- */
function prStart(id){ var P=PRAC[id]; PR={id:id,P:P,seq:[],sel:{},done:false,t0:0,val:465,left:(P.items||[]).map(function(_,i){ return i; }),pick:null}; prDraw(); }
PRAC['5phut']={type:'pick', q:'Bạn có 5 phút chờ đến lượt làm hồ sơ. Chạm vào những việc vừa sức 5 phút và giúp bạn tiến bộ.', tokens:['Ôn 5 từ vựng','Lướt mạng xã hội','Đọc lại 1 mẫu câu','Xem một tập phim','Nghe 1 đoạn hội thoại ngắn','Nhắn tin tán gẫu'], ok:[0,2,4], box:'VIỆC 5 PHÚT', win:'Ba việc nhỏ, làm xong trong 5 phút. Chuẩn bị sẵn từ tối, lúc chờ chỉ việc mở ra.', bad:'Chọn việc làm xong trong 5 phút và giúp bạn học thêm được chút gì.'};
PRAC.gopy={type:'order', q:'Tổ trưởng góp ý bạn dán thùng chưa chặt. Chạm theo đúng thứ tự bạn sẽ làm.', items:['Dừng tay, nhìn người nói','Nghe hết, không ngắt lời','Nói “Dạ, em hiểu rồi”','Ghi 1 ý cần sửa'], mix:[2,0,3,1], ok:'Nghe trọn rồi mới nói, ghi lại để không lặp lỗi.'};
PRAC.vandong={type:'count', q:'Đứng dậy làm thật nhé! Mỗi lần đứng lên, chạm vào nút một lần.', n:10, label:'Đứng lên', win:'Xong 10 cái! Một phút thôi mà người đã ấm lên rồi.'};
PRAC.ngu={type:'pick', q:'22 giờ 30. Chạm vào những việc giúp bạn ngủ trước 23 giờ.', tokens:['Cắm sạc xa giường','Xem thêm một tập phim','Chuẩn bị đồ cho mai','Uống trà sữa cho đỡ đói','Tắt đèn, nằm xuống','Chơi thêm một ván game'], ok:[0,2,4], box:'TỐI NAY', win:'Ba việc nhỏ, 15 phút là xong. Ngủ trước 23 giờ không khó như bạn nghĩ.', bad:'Chọn việc giúp bạn rời màn hình và sẵn sàng đi ngủ.'};
PRAC.bot={type:'pick', q:'Đang học, bạn muốn mở game. Chạm vào những việc thay thế trong 5 phút.', tokens:['Đứng dậy uống nước','Mở game “một ván thôi”','Ôn 5 từ vựng','Lướt video ngắn','Giãn cơ 2 phút','Nhắn tin rủ bạn chơi'], ok:[0,2,4], box:'VIỆC THAY THẾ', win:'Có sẵn việc thay thế thì cơn “muốn” qua nhanh hơn bạn nghĩ.', bad:'Việc thay thế phải giúp bạn rời màn hình, không phải mở một màn hình khác.'};
PRAC.chitieu={type:'pick', q:'Tiền tuần này có hạn. Chạm vào những thứ CẦN chi trước.', tokens:['Tiền xe đi học','Trà sữa','Sổ, bút học tiếng Nhật','Áo mới đang giảm giá','Cơm trưa','Ốp điện thoại mới'], ok:[0,2,4], box:'CẦN TRƯỚC', win:'Lo thứ CẦN trước. Còn dư mới đến thứ THÍCH, và nhớ chờ một ngày.', bad:'Thứ CẦN là thứ thiếu nó thì việc học, việc ăn bị ảnh hưởng.'};
PRAC.tiengnhat={type:'order', q:'Bạn vào phòng giáo viên gặp thầy người Nhật. Chạm theo đúng thứ tự.', items:['Gõ cửa','Nói “Shitsurei shimasu”','Nói việc của mình','Ra về nói “Shitsurei shimashita”'], mix:[2,0,3,1], ok:'Vào nói 失礼します, ra nói 失礼しました: lịch sự như ở công ty Nhật.'};
PRAC.quansat={type:'choose', q:'Bạn ngồi chờ 10 phút ở phòng làm hồ sơ. Dòng nào là một quan sát tốt để ghi?', o:['Hôm nay phòng đông người.','Chị nhân viên xếp hồ sơ theo màu, tìm rất nhanh.','Chờ lâu quá, chán thật.'], ok:1, ex:'Quan sát tốt là thấy điều mình học được và làm theo được.'};
PRAC.viecko={type:'pick', q:'Chạm vào những việc “hơi khó nhưng vừa sức” bạn có thể nhận tuần này.', tokens:['Phát biểu 1 câu trên lớp','Hứa học 200 từ mỗi ngày','Nhận dọn khu vực khó','Hỏi thầy cô 1 câu','Làm hết việc của cả lớp','Làm trưởng nhóm thuyết trình'], ok:[0,2,3,5], box:'VIỆC HƠI KHÓ', win:'Hơi khó nhưng vừa sức: làm được thì tự tin lên một bậc.', bad:'Chọn việc hơi ngại nhưng làm được, không phải việc quá sức.'};
PRAC.horenso={type:'choose', q:'Thầy hỏi bài tập nhóm đến đâu rồi. Câu báo cáo nào rõ nhất?', o:['Dạ, tụi em làm cũng được nhiều rồi ạ.','Dạ, xong 2/3 phần. Phần cuối xong trước thứ Sáu ạ.','Dạ, bạn kia đang làm, em không rõ ạ.'], ok:1, ex:'Kết luận trước, có con số và hạn cụ thể. Người nghe hiểu ngay.'};
PRAC.giup={type:'order', q:'Bạn xong việc ở chỗ làm thêm, thấy đồng nghiệp còn nhiều hàng. Chạm theo thứ tự.', items:['Báo lại việc mình đã xong','Nhìn xem ai đang cần','Hỏi “Có cần mình giúp không?”','Làm theo cách người đó muốn'], mix:[2,0,3,1], ok:'Xong phần mình, hỏi trước rồi mới giúp: vừa lịch sự vừa đúng việc.'};
PRAC.camon.o=['Cảm ơn ạ.','Em cảm ơn chị đã chỉ em gấp hộp, giờ em làm nhanh hơn nhiều ạ.','Em biết rồi, nhưng vẫn cảm ơn chị ạ.'];
PRAC.xinloi.o=['Tại nhãn in mờ nên em nhìn nhầm ạ.','Em xin lỗi, em xếp nhầm thùng. Em đổi lại ngay ạ.','(Cười) Dạ… em xin lỗi ạ.'];
PRAC.anuong={type:'pick', q:'Xếp bữa trưa đủ chất. Chạm vào các món nên có.', tokens:['Cơm','Nước ngọt','Rau xanh','Mì gói','Trứng, thịt hoặc cá','Trái cây'], ok:[0,2,4,5], box:'ĐĨA CƠM', win:'Có cơm, rau, đạm và trái cây: đủ sức cho cả buổi chiều.', bad:'Một bữa đủ chất có cơm, rau, đạm và trái cây.'};

(function(){ var i=0; for(var k in PRAC){ if(PRAC[k].type==='choose'){ rotQ(PRAC[k], i%3); i++; } } })();
function prWin(msg){
  PR.done=true; ting();
  var first=!S.prDone[PR.id]; S.prDone[PR.id]=1; save();
  if(first) addPts(5,0,'Thực tập xong!');
  return '<div class="out out--good"><b>Đúng rồi!</b>'+msg+'</div>';
}
function prDraw(){
  var P=PR.P, b=$('#prBox'); if(!b) return; var h='<p class="pr__q">'+esc(P.q)+'</p>';
  if(P.type==='order'){
    h+='<div class="pr__seq">'+P.items.map(function(_,i){ var k=PR.seq[i]; return '<span class="'+(k!=null?'on':'')+'"><i>'+(i+1)+'</i>'+(k!=null?esc(P.items[k]):'')+'</span>'; }).join('')+'</div>';
    h+='<div class="pr__pool">'+P.mix.map(function(k){ return PR.seq.indexOf(k)>=0?'':'<button class="chp" data-act="prTap" data-v="'+k+'">'+esc(P.items[k])+'</button>'; }).join('')+'</div>';
    if(PR.err) h+='<div class="out out--bad"><b>Thử lại nhé.</b>Bước này chưa tới lượt.</div>';
    if(PR.seq.length===P.items.length) h+=PR.msg||(PR.msg=prWin(esc(P.ok)));
  }
  if(P.type==='slider'){
    var v=PR.val, hh=Math.floor(v/60), mm=v%60;
    h+='<div class="pr__time">'+hh+':'+pad(mm)+'</div><input type="range" class="pr__rng" min="'+P.min+'" max="'+P.max+'" step="5" value="'+v+'" data-in="prRng" aria-label="Giờ rời phòng">'+
      '<div class="pr__tl"><span>Rời phòng</span><span>+10 phút đi bộ</span><span>+5 phút thay đồ</span><span>8:00</span></div>'+
      '<button class="btn btn--sm" data-act="prCheck" style="margin-top:8px">Kiểm tra</button>';
    if(PR.res) h+=PR.res;
  }
  if(P.type==='pick'){
    h+='<div class="pr__sent">'+P.tokens.map(function(t,i){ return '<button class="tok'+(PR.sel[i]?' on':'')+'" data-act="prTap" data-v="'+i+'">'+esc(t)+'</button>'; }).join(' ')+'</div>';
    var got=P.ok.filter(function(i){ return PR.sel[i]; }).map(function(i){ return P.tokens[i]; });
    h+='<div class="pr__memo"><small>'+esc(P.box||'SỔ MEMO')+'</small>'+(got.length?got.map(function(g){ return '<div>· '+esc(g)+'</div>'; }).join(''):'<div class="muted">Chưa ghi gì</div>')+'</div>';
    var n=Object.keys(PR.sel).filter(function(k){ return PR.sel[k]; }).length;
    h+='<button class="btn btn--sm" data-act="prCheck"'+(n?'':' disabled')+'>Kiểm tra</button>';
    if(PR.res) h+=PR.res;
  }
  if(P.type==='tidy'){
    var sec=PR.t0?Math.max(0,30-Math.floor((Date.now()-PR.t0)/1000)):30;
    h+='<div class="pr__desk">'+P.items.map(function(t,i){ return PR.left.indexOf(i)>=0?'<button class="tdi" style="transform:rotate('+((i*37)%24-12)+'deg)" data-act="prTap" data-v="'+i+'">'+esc(t)+'</button>':''; }).join('')+(PR.left.length?'':'<span class="muted">Bàn trống trơn!</span>')+'</div>'+
      '<div class="pr__shelf"><small>KỆ</small>'+P.items.map(function(t,i){ return PR.left.indexOf(i)<0?'<span>'+esc(t)+'</span>':'<span class="ph"></span>'; }).join('')+'</div>'+
      (PR.left.length&&PR.t0?'<div class="pr__clock">'+sec+' giây</div>':'');
    if(!PR.left.length) h+=PR.msg||(PR.msg=prWin('Cất xong trong '+Math.max(1,Math.round((Date.now()-PR.t0)/1000))+' giây. Mỗi ngày một phút là bàn luôn gọn.'));
  }
  if(P.type==='choose'){
    h+=P.o.map(function(o,i){ var cls=''; if(PR.pick!=null && i===PR.pick) cls=i===P.ok?' good':' bad'; return '<button class="opt'+cls+'" data-act="prChoose" data-v="'+i+'"'+(PR.done?' disabled':'')+'><i>'+String.fromCharCode(65+i)+'</i><span>'+esc(o)+'</span></button>'; }).join('');
    if(PR.pick!=null) h+= PR.pick===P.ok ? (PR.msg||(PR.msg=prWin(esc(P.ex)))) : '<div class="out out--bad"><b>Thử lại nhé.</b>Chọn câu khác xem.</div>';
  }
  if(P.type==='count'){
    var cn=PR.cnt||0;
    h+='<div class="pr__cnt"><b>'+cn+'</b><span>/ '+P.n+'</span></div><div class="pr__dots">'+Array.apply(null,{length:P.n}).map(function(_,i){ return '<i class="'+(i<cn?'on':'')+'"></i>'; }).join('')+'</div>';
    if(cn<P.n) h+='<button class="btn btn--wide" data-act="prTap" data-v="1">'+esc(P.label)+'</button>'; else h+=PR.msg||(PR.msg=prWin(esc(P.win)));
  }
  if(P.type==='breathe'){
    h+='<div class="brc"><button id="brc" aria-label="Giữ để thở"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" id="brfg"/></svg><span id="brt">Giữ</span></button></div>';
    if(PR.done) h+=PR.msg;
  }
  b.innerHTML=h;
  if(P.type==='breathe') brBind();
}
function brBind(){
  var bt=$('#brc'); if(!bt||PR.done) return; var fg=$('#brfg'), C=2*Math.PI*52, acc=PR.acc||0, tm=null, last=0;
  fg.style.strokeDasharray=C; fg.style.strokeDashoffset=C*(1-acc/30000);
  function tick(){ var now=Date.now(); acc+=now-last; last=now; PR.acc=acc; var f=Math.min(1,acc/30000); fg.style.strokeDashoffset=C*(1-f);
    var ph=Math.floor(acc/4000)%2; $('#brt').textContent=ph?'Thở ra…':'Hít vào…'; bt.classList.toggle('ex',!!ph);
    if(f>=1){ clearInterval(tm); PR.msg=prWin('Bạn vừa cho cảm xúc một khoảng lặng 30 giây. Giờ thử gọi tên nó: vui, buồn, lo, mệt hay bực?'); prDraw(); } }
  bt.addEventListener('pointerdown',function(e){ e.preventDefault(); last=Date.now(); clearInterval(tm); tm=setInterval(tick,100); });
  ['pointerup','pointerleave','pointercancel'].forEach(function(t){ bt.addEventListener(t,function(){ clearInterval(tm); var s=$('#brt'); if(s&&!PR.done) s.textContent='Giữ tiếp'; }); });
  bt.addEventListener('contextmenu',function(e){ e.preventDefault(); });
}
function prAct(a,v){
  var P=PR.P;
  if(a==='prTap'){
    if(P.type==='order'){ v=+v; if(v===PR.seq.length){ PR.seq.push(v); PR.err=false; tone([660],.08); } else { PR.err=true; } }
    if(P.type==='pick'){ PR.sel[v]=!PR.sel[v]; PR.res=''; }
    if(P.type==='count'){ PR.cnt=Math.min(P.n,(PR.cnt||0)+1); tone([440+PR.cnt*30],.06); }
    if(P.type==='tidy'){ if(!PR.t0) PR.t0=Date.now(); PR.left=PR.left.filter(function(k){ return k!==+v; }); tone([520+PR.left.length*40],.06); }
  }
  if(a==='prCheck'){
    if(P.type==='slider'){ var v2=PR.val; PR.res = v2<=460 ? prWin('Rời phòng lúc '+Math.floor(v2/60)+':'+pad(v2%60)+' là có 5 phút dự phòng. Đến xưởng thong thả, 8:00 đã đứng ở vị trí.') :
      v2===465 ? '<div class="out out--bad"><b>Thử lại nhé.</b>7:45 là vừa sát giờ. Chỉ cần kẹt thang máy một chút là trễ. Thêm 5 phút dự phòng xem.</div>' :
      '<div class="out out--bad"><b>Thử lại nhé.</b>Đi lúc này thì 8:00 bạn vẫn đang thay đồ, tức là đã trễ.</div>'; }
    if(P.type==='pick'){ var okAll=P.ok.every(function(i){ return PR.sel[i]; }) && Object.keys(PR.sel).every(function(k){ return !PR.sel[k] || P.ok.indexOf(+k)>=0; });
      PR.res = okAll ? prWin(esc(P.win||'Khi nào, Việc gì, Ở đâu: đủ để mai không phải hỏi lại.')) : '<div class="out out--bad"><b>Thử lại nhé.</b>'+esc(P.bad||'Chỉ ghi thông tin cần nhớ: khi nào, mang gì, mang đến đâu.')+'</div>'; }
  }
  if(a==='prChoose'){ PR.pick=+v; }
  prDraw();
  if(P.type==='tidy' && PR.t0 && PR.left.length && !PR.iv){ PR.iv=setInterval(function(){ if(!$('#prBox')||PR.done||!PR.left.length){ clearInterval(PR.iv); PR.iv=null; return; } var c=$('.pr__clock'); if(c) c.textContent=Math.max(0,30-Math.floor((Date.now()-PR.t0)/1000))+' giây'; },500); }
}

/* =========================================================
   RÈN THẺ MỚI · (chọn thói quen muốn giảm) → thử nhanh → công thức 3 ô
   ========================================================= */
var ST=null;
function openStart(id,edit){
  var x=HMAP[id], u=H(id);
  if(!edit && !u && S.slots.indexOf(null)<0){ toast('5 khung đã đầy. Cất bớt một thẻ trước nhé.'); return; }
  var steps=[]; if(!edit){ if(x.pickBad) steps.push('bad'); if(x.quiz) steps.push('quiz'); }
  steps.push('k','a','w','goal16');
  ST={id:id, edit:!!edit, steps:steps, i:0, pick:null, first:null, custom:{},
      anchor:u?u.anchor:'', act:u?u.act:'', who:u?u.who:'', bad:u?u.bad:'', badOther:u?u.badOther:''};
  openOv(''); drawStart();
}
function stState(){
  var x=HMAP[ST.id], k=ST.steps[ST.i];
  if(k==='cn' && ST.name.trim().length<3) return {ok:false,msg:'Đặt tên cho thẻ (từ 3 chữ cái)'};
  if(k==='y' && words(ST.why)<3) return {ok:false,msg:'Viết ít nhất 3 chữ'};
  if(k==='bad' && (!ST.bad || (ST.bad==='khac' && !ST.badOther.trim()))) return {ok:false,msg:'Chọn thói quen muốn giảm'};
  if(k==='quiz' && ST.pick!==x.quiz.ok) return {ok:false,msg:'Chọn đáp án đúng để tiếp tục'};
  if(k==='k' && !ST.anchor.trim()) return {ok:false,msg:'Chọn lúc làm'};
  if(k==='a' && !String(ST.act).trim()) return {ok:false,msg:'Chọn việc sẽ làm'};
  return {ok:true};
}
function sentence(cur){
  function u(v,key,ph){ return '<u class="'+(cur===key?'cur':v?'fill':'')+'">'+esc(v||ph)+'</u>'; }
  return '<div class="sentence">Khi '+u(ST.anchor,'k','lúc nào')+', tôi sẽ '+u(ST.act,'a','làm gì')+(ST.who?' để trở thành '+u(ST.who,'w','người như thế nào'):'')+'.</div>';
}
function chipsFor(list,val,key,ph){
  var custom=ST.custom[key] || (val && list.indexOf(val)<0);
  return '<div>'+list.map(function(v){ return '<button class="chp'+(!custom&&val===v?' on':'')+'" data-act="stPick" data-v="'+key+'|'+esc(v)+'">'+esc(v)+'</button>'; }).join('')+
    '<button class="chp chp--add'+(custom?' on':'')+'" data-act="stCustom" data-v="'+key+'">Tự viết</button></div>'+
    (custom?'<input class="inp" id="stIn" data-in="st-'+key+'" maxlength="50" placeholder="'+esc(ph)+'" value="'+esc(val)+'"><div class="tiny muted" id="stCnt" style="text-align:right">'+String(val||'').length+'/50</div>':'');
}
function drawStart(){
  var x=HMAP[ST.id], k=ST.steps[ST.i], body='';
  var head=shinWizardHeader(ST);
  if(k==='bad'){
    body='<div class="row" style="margin-bottom:10px">'+hico(ST.id,'sm')+'<h2 style="margin:0">Bạn muốn giảm thói quen nào?</h2></div><div>'+
      BAD_OPTS.map(function(b){ return '<button class="chp'+(ST.bad===b[0]?' on':'')+'" data-act="stBad" data-v="'+b[0]+'">'+esc(b[1])+'</button>'; }).join('')+'</div>'+
      (ST.bad==='khac'?'<input class="inp" id="stBadO" data-in="stBadO" placeholder="Ví dụ: Xem phim đến khuya" value="'+esc(ST.badOther)+'">':'');
  }
  if(k==='quiz'){
    var q=x.quiz;
    body='<div class="row" style="margin-bottom:6px">'+hico(ST.id,'sm')+'<div class="ey" style="margin:0">Thử nhanh trước khi rèn</div></div><div class="q"><p class="sc">'+esc(q.sc)+'</p>'+
      q.o.map(function(o,i){ var cls='', dis=''; if(ST.pick!=null){ dis=' disabled'; if(i===ST.pick) cls= i===q.ok?' good':' bad'; }
        return '<button class="opt'+cls+'" data-act="stQ" data-v="'+i+'"'+dis+'><i>'+String.fromCharCode(65+i)+'</i><span>'+esc(o)+'</span></button>'; }).join('');
    if(ST.pick!=null){
      if(ST.pick===q.ok) body+='<div class="out out--good"><b>Đúng rồi!</b>'+esc(q.ex)+'</div>';
      else body+='<div class="out out--bad"><b>Thử lại nhé.</b>Xem lại Cách làm rồi chọn lại.</div><div class="row"><button class="btn btn--gold btn--sm invite" data-act="stRetry">'+ic('redo')+'Thử chọn lại</button><button class="btn btn--ghost btn--sm" data-act="how" data-v="'+ST.id+'">Cách làm</button></div>';
    }
    if(ST.pick==null || ST.pick!==q.ok) body+='<button class="linkb" data-act="stSkipQ">Xem sau, rèn luôn ›</button>';
    body+='</div>';
  }
  if(k==='cn') body=cuStepName();
  if(k==='y') body=cuStepWhy();
  if(k==='k'||k==='a'||k==='w'){
    body=(ST.edit?'<div class="ey">Đổi công thức</div>':'<div class="ey">Công thức của bạn</div>')+sentence(k)+(k==='k'?sugBox():'');
    if(k==='k') body+='<div class="qlab">Bạn sẽ làm vào lúc nào?</div>'+chipsFor(x.anchors||[],ST.anchor,'k','khi bước vào phòng');
    if(k==='a'){ var acts=[x.act]; if(x.pickBad){ BAD_OPTS.forEach(function(b){ if(b[0]===ST.bad&&b[2]) acts=[b[2]]; }); } body+='<div class="qlab">Việc nhỏ bạn sẽ làm?</div>'+(x.custom?'<input class="inp" id="stIn" data-in="st-a" maxlength="50" placeholder="Ví dụ: uống một ly nước" value="'+esc(ST.act)+'"><div class="tiny muted" id="stCnt" style="text-align:right">'+String(ST.act||'').length+'/50</div><p class="note">Chọn một việc thật nhỏ, làm trong 1–2 phút.</p>':chipsFor(acts,ST.act,'a','một việc thật nhỏ')); }
    if(k==='w') body+='<div class="qlab">Bạn muốn trở thành người như thế nào? <small>· Không bắt buộc</small></div>'+chipsFor(x.who.concat(WHO_GEN),ST.who,'w','người đáng tin cậy')+'<div><button class="evening-skip-choice" data-act="flowWhoNone">Bỏ qua bước này</button></div>';
  }
  if(ST.edit && ST.i===0 && H(ST.id) && S.slots.indexOf(ST.id)>=0) body+='<div class="pzrow"><button class="btn btn--ghost btn--sm" data-act="stPause" data-v="'+ST.id+'">'+ic('pause')+'Tạm dừng thẻ này</button><span class="note">Thẻ cất vào Thư viện, tiến độ vẫn giữ.</span></div>';
  var s=stState(), last=ST.i===ST.steps.length-1;
  var label=last?(ST.edit?'Lưu':k==='w'&&!ST.who.trim()?'Bỏ qua · Rút thẻ':'Rút thẻ'):'Tiếp tục';
  sheetSet(head+'<div class="lc">'+body+'</div><div class="sbar"><span class="st '+(s.ok?'okk':'miss')+'">'+(s.ok?'✓ Sẵn sàng':esc(s.msg))+'</span><button class="btn'+(s.ok?' invite':'')+'" data-act="stNext"'+(s.ok?'':' disabled')+'>'+label+'</button></div>');
}
function stRefresh(){ var s=stState(), st=$('.sheet .sbar .st'), b=$('.sheet .sbar .btn'); if(!st||!b) return; st.textContent=s.ok?'✓ Sẵn sàng':s.msg; st.className='st '+(s.ok?'okk':'miss'); b.disabled=!s.ok; var se=$('.sheet .sentence'); if(se) se.outerHTML=sentence(ST.steps[ST.i]); }
function stNext(){
  if(ST.i<ST.steps.length-1){ ST.i++; drawStart(); return; }
  if(ST.cust){ commitCustom(); return; }
  var id=ST.id, u=H(id);
  if(ST.edit && u){ u.anchor=ST.anchor.trim(); u.act=String(ST.act).trim(); u.who=ST.who.trim(); save(); closeOv(true); ST=null; toast('Đã lưu công thức mới.'); refreshAll(); return; }
  S.habits[id]={status:'active', since:dk(), lv:1, lvSince:dk(), anchor:ST.anchor.trim(), act:String(ST.act).trim(), who:ST.who.trim(), bad:ST.bad||'', badOther:ST.badOther||'', quiz:ST.first||''};
  if(S.order.indexOf(id)<0) S.order.push(id);
  placeInSlot(id);
  var xp = S.learnedXP[id] ? 0 : (HMAP[id].quiz ? (ST.first==='first'?30:25) : 15); S.learnedXP[id]=1;
  save(true); closeOv(); VDAY=null; SBACK=false; PG=0; render(); window.scrollTo(0,0); fanfare();
  if(xp) addPts(xp,0,'Rút được thẻ mới!'); else toast('Rút được thẻ mới!');
  var c=$('.cs.cur .flip'); if(c) c.classList.add('deal');

}
/* =========================================================
   LÊN CẤP · bạn cùng tiến (cấp 2) · thầy cô (cấp 3)
   ========================================================= */
function openLvup(id){
  var u=H(id), nx=u.lv+1, h='<div class="center"><span style="display:inline-block">'+hico(id,'lg')+'</span><h2 style="margin:10px 0 4px">Lên cấp '+LV_NAME[nx]+'</h2><div>'+stars(nx,22)+'</div></div>';
  if(nx===2) h+='<p class="muted center" style="margin:10px 0">Nhờ bạn cùng tiến xem thẻ và xác nhận bạn đã làm đủ '+needFor(id,1)+' '+unitOf(id)+'.</p><label class="lbl" for="luIn">Tên bạn xác nhận</label><input class="inp" id="luIn" placeholder="Ví dụ: Thanh Tâm">';
  else h+='<p class="muted center" style="margin:10px 0">Đưa thẻ cho thầy cô xem. Thầy cô sẽ đọc cho bạn một mã 4 số.</p><label class="lbl" for="luIn">Mã thầy cô</label><input class="inp" id="luIn" inputmode="numeric" maxlength="4" placeholder="0000" style="font-size:22px;letter-spacing:.3em;text-align:center">';
  h+='<div class="out out--bad" id="luErr" style="display:none"></div><button class="btn btn--gold btn--wide invite" style="margin-top:12px" data-act="lvGo" data-v="'+id+'">Xác nhận lên cấp</button>';
  openMini(h);
}
function lvGo(id){
  var u=H(id), v=$('#luIn').value.trim(), err=$('#luErr'), t=dk();
  if(u.lv===1){ if(v.length<2){ err.style.display='block'; err.textContent='Nhập tên bạn xác nhận.'; return; } }
  else { var okc = v===tcodeFor(S.name,t) || v===tcodeFor(S.name,addD(t,-1)); if(!okc){ err.style.display='block'; err.textContent='Mã chưa đúng. Nhờ thầy cô kiểm tra lại tên của bạn.'; return; } }
  u.cf=u.cf||{}; u.cf[u.lv+1]={by:u.lv===1?v:'Thầy cô',d:t};
  var oldStamps37=Object.keys(S.stampLetters||{});
  u.lv++; u.lvSince=t; save(true); fanfare(); bigStamp(u.lv===3?'t':'f');
  addPts(u.lv===3?50:30,0,'Thẻ lên cấp '+LV_NAME[u.lv]+'!');
  if(u.lv===2){var newStamp37=STAMP_MILESTONES37.filter(function(m){return S.stampLetters[m]&&oldStamps37.indexOf(String(m))<0;})[0];showTreeAward(id,newStamp37);return;}
  offerTier(id);
}
function offerTier(id){
  var u=H(id), x=HMAP[id], tier=x.tiers[u.lv-1];
  if(x.custom){ cuTierSheet(id); return; }
  openMini('<div class="center"><span style="display:inline-block">'+emblem(id,72)+'</span><h2 style="margin:10px 0 2px">Thử thách cấp '+LV_NAME[u.lv]+'</h2><p class="muted small" style="margin:0 0 10px">Lên cấp thì việc cũng nâng lên một chút. Bạn chọn nhé.</p></div>'+
    '<div class="fx"><span>Hành động hiện tại</span>'+esc(u.act)+'</div><div class="fx" style="border:1.5px solid var(--c-t2);background:var(--c-t)"><span>Gợi ý cho cấp '+LV_NAME[u.lv]+'</span>'+esc(tier)+'</div>'+
    '<div class="stack" style="margin-top:12px"><button class="btn btn--wide" data-act="tierYes" data-v="'+id+'">Nhận thử thách mới</button><button class="btn btn--ghost btn--wide" data-act="tierNo" data-v="'+id+'">Giữ hành động cũ</button></div>');
}
function masterShow(id){
  openMini('<div class="center"><span style="display:inline-block">'+hico(id,'lg')+'</span><h2 style="margin:10px 0 4px">Thẻ đã Thành nếp!</h2><p class="muted">'+esc(hname(id))+' giờ là một phần con người bạn. Bấm “Sang duy trì” trên thẻ để giữ nhẹ nhàng và có chỗ cho thẻ mới.</p>'+
    say('shin','proud','Từng con dấu nhỏ đã làm nên điều này!')+'<button class="btn btn--wide" data-act="card" data-v="'+id+'">Xem thẻ</button></div>');
  fanfare(); addPts(80,0,'Thành nếp!');
}

/* =========================================================
   SỔ TAY
   ========================================================= */
function vNb(){
  var h='<div class="wrap"><h1 style="margin:2px 0 4px">Sổ tay</h1><div class="tabs" role="tablist">'+
    [['sum','Tiến bộ'],['rep','Báo cáo'],['set','Cài đặt']].map(function(t){ return '<button role="tab" aria-selected="'+(NBTAB===t[0])+'" class="'+(NBTAB===t[0]?'on':'')+'" data-act="nbTab" data-v="'+t[0]+'">'+t[1]+'</button>'; }).join('')+'</div>';
  h+= NBTAB==='rep'?nbRep() : NBTAB==='set'?nbSet() : nbSum();
  return h+'</div>';
}
function nbSum(){
  var h='<div class="kpi"><div class="k-f"><b data-kpi="0">'+streak()+'</b><span>Chuỗi giữ nhịp</span></div><div class="k-x"><b data-kpi="1">'+masteredCount()+'</b><span>Thói quen thành nếp</span></div><div class="k-c"><b data-kpi="2">'+avgConsistency()+'%</b><span>Độ đều 4 tuần</span></div>'+
    '<div class="k-o"><b data-kpi="3">'+keepIds().length+'</b><span>Đang duy trì</span></div><div class="k-i"><b data-kpi="4">'+notesCount()+'</b><span>Ghi chú đã viết</span></div><div class="k-s"><b data-kpi="5">'+ciDays()+'</b><span>Ngày check-in</span></div></div>';
  var lw=LESSONS.filter(function(l){ return S.les[l.id] && S.les[l.id].w; });
  if(lw.length){ h+='<div class="sec"><h2>Bạn đã viết trong bài học</h2></div>'; lw.forEach(function(l){ h+='<div class="refl"><small>Bài '+l.n+' · '+esc(l.t)+'</small>'+esc(S.les[l.id].w)+'</div>'; }); }
  var notes=Object.keys(S.ci).sort().reverse().filter(function(d){ return S.ci[d].note; }).slice(0,5);
  h+='<div class="sec"><h2>Memo cuối ngày</h2></div>';
  if(!notes.length) h+='<p class="muted small">Memo bạn viết khi check-in tối sẽ hiện ở đây.</p>';
  notes.forEach(function(d){ h+='<div class="refl"><small>'+dm(d)+' · '+esc(PROMPTS[S.ci[d].p||0])+'</small>'+esc(S.ci[d].note)+'</div>'; });
  h+='<p class="ver">'+esc(APP_NAME)+' · '+APP_VER+(S.saved?' · Đã lưu '+new Date(S.saved).toTimeString().slice(0,5):'')+'</p>';
  return h;
}
var SETOPEN='', TMODE=false;
function setRow(k,icon,g,title,status,body,right){
  var open=SETOPEN===k;
  if(right) return '<div class="setr"><div class="setr__h">'+uico(icon,g)+'<b>'+title+'</b>'+right+'</div></div>';
  return '<div class="setr"><button class="setr__h" data-act="setr" data-v="'+k+'" aria-expanded="'+open+'">'+uico(icon,g)+'<b>'+title+'</b><span>'+status+'</span></button>'+(open&&body?'<div class="setr__b">'+body+'</div>':'')+'</div>';
}
function setGroup(title,list){ return '<div class="setg">'+title+'</div><div class="setl">'+list.join('')+'</div>'; }
function nbSet(){
  var R={};
  R['info']=setRow('info','user',1,'Thông tin',esc(S.name)+(S.cls?' · '+esc(S.cls):''),'<div class="stack"><div><label class="lbl" for="sN">Tên</label><input class="inp" id="sN" data-in="name" value="'+esc(S.name)+'"></div><div><label class="lbl" for="sC">Lớp</label><input class="inp" id="sC" data-in="cls" value="'+esc(S.cls)+'"></div></div>');
  R['tea']=setRow('tea','teacher',1,'Thầy cô',esc(tName()||'Chưa chọn'),teacherSelect('sT'));
  R['rem']=setRow('rem','bell',3,'Nhắc check-in tối',esc(S.ciTime),'<p>Chạm vào lời nhắc là mở thẳng check-in.</p><input class="inp" type="time" id="sTime" data-in="ciTime" value="'+esc(S.ciTime)+'" style="width:130px"><div style="margin-top:10px"><button class="btn btn--soft btn--sm" data-act="calSmart">'+ic('cal')+'Lưu vào lịch điện thoại</button></div>');
  R['snd']=setRow('snd','sound',3,'Âm thanh','','', '<span class="sndt">'+(S.sound?'Đang bật':'Đang tắt')+'</span><button class="sndb'+(S.sound?' on':' off')+'" data-act="sound" role="switch" aria-checked="'+S.sound+'" aria-label="Âm thanh">'+ic('sound')+'</button>');
  R['install']=INSTALL_EVENT && !isStandalone()?'<div class="install-box"><b>Shin luôn ở bên bạn</b><p>Mở nhanh từ màn hình chính.</p><button class="btn btn--sm" data-act="installApp">Cài app</button></div>':'';
  R['home']=setRow('home','phone',2,'Thêm vào màn hình chính','','','<button class="btn btn--soft btn--sm" data-act="homeg">Xem cách</button>');
  R['safe']=setRow('safe','shield',2,'Giữ bài an toàn',bkDue()?'Nên xuất bản sao':(S.lastBackup?'Đã xuất '+dm(S.lastBackup):'Lưu bản sao'),'<p>Bài làm lưu trong trình duyệt này. Nếu đổi thiết bị hoặc địa chỉ web, hãy xuất bản sao rồi khôi phục ở nơi mới.</p><div class="row row--wrap"><button class="btn btn--soft btn--sm" data-act="backup">'+ic('down')+'Lưu bản sao</button><label class="btn btn--soft btn--sm">'+ic('up')+'Khôi phục<input type="file" accept=".json,application/json" id="restoreF" class="sr"></label></div>'+(hasPrevious32()?'<button class="week-link" data-act="restorePrevious32">Xem bản trước lần khôi phục</button>':''));
  R['app32']=setRow('app32','phone',2,'Phiên bản và offline',APP_VER,'<p>'+offlineDescription32()+'</p><div class="row row--wrap"><button class="btn btn--soft btn--sm" data-act="checkUpdate32">Kiểm tra bản mới</button></div>');
  R['gd']=setRow('gd','book',3,'Hướng dẫn lần đầu','','','<button class="btn btn--soft btn--sm" data-act="guideOpen">Mở lại</button>');
  R['cast']=setRow('cast','smile',4,'Bạn đồng hành','Shin, Senpai, Hội Virus','<div class="cast">'+
    '<button data-act="cast" data-v="shin|0">'+shin('hi')+'<b>Shin</b>Huấn luyện viên</button>'+
    '<button data-act="cast" data-v="senpai|0">'+senpai('hi',0)+'<b>Senpai</b>6 anh chị khóa trước</button>'+
    '<button data-act="cast" data-v="virus|0">'+virus('luoi','smug')+'<b>Virus Lười</b>Những cái cớ</button></div><p class="note" style="margin-top:8px">Nhân vật hư cấu. Chạm để đổi.</p>');
  R['tch']=setRow('tch','teacher',4,'Dành cho thầy cô',TMODE?'Đang mở':'',tmodeBody());
  R['wipe']=setRow('wipe','trash',4,'Xóa bài làm','','<p>Xóa toàn bộ bài trên máy này.</p><button class="btn btn--ghost btn--sm" style="color:#B23A2E" data-act="wipe">Xóa bài làm</button>');
  var bkc=bkDue()?'<div class="bkcard"><b>Đã '+bkDays()+' ngày chưa lưu bản sao</b><p>Lưu một file nhỏ về máy để bài làm không mất khi đổi điện thoại hoặc xóa trình duyệt.</p><div class="row row--wrap"><button class="btn btn--sm" data-act="backup">'+ic('down')+'Lưu bản sao</button><button class="btn btn--ghost btn--sm" data-act="bkLater">Nhắc sau 2 ngày</button></div></div>':'';
  return bkc+R.install+setGroup('Của bạn',[R.info,R.tea])+setGroup('Nhắc nhở và âm thanh',[R.rem,R.snd])+setGroup('Dùng trên điện thoại',[R.home,R.app32,R.safe])+setGroup('Làm quen',[R.gd,R.cast])+setGroup('Thầy cô và dữ liệu',[R.tch,R.wipe])+'<p class="ver">'+esc(APP_NAME)+' · '+APP_VER+'</p>';
}
function tmodeBody(){
  if(!TMODE) return '<p>Nhập mã PIN thầy cô để tạo mã xác nhận lên cấp 3.</p><div class="row"><input class="inp" id="tPin" inputmode="numeric" placeholder="PIN" style="width:120px"><button class="btn btn--soft btn--sm" data-act="tPin">Mở</button></div>';
  return '<p>Nhập tên học viên đúng như trên app của học viên. Mã đổi mỗi ngày.</p><input class="inp" id="tName" data-in="tName" placeholder="Tên học viên"><div class="tcode" id="tCode">····</div>';
}
var CAST={shin:['hi','cheer','think','wow','worry','sleep','moved','comfort','proud','yawn','curious'],senpai:['0','1','2','3','4','5'],virus:['luoi','ngai','quen','demai']};

/* ---------- In nhật ký A4 ---------- */
function buildPrint(){
  var t=dk(), all=S.order.filter(function(id){ return S.habits[id]; }), totalW=0, notes=[];
  Object.keys(S.ci).sort().forEach(function(d){ if(S.ci[d].note){ notes.push(d); totalW+=words(S.ci[d].note); } });
  var h='<div class="pr-h"><div><h1>Nhật ký rèn luyện thói quen</h1><div>'+esc(APP_NAME)+' · '+esc(S.name)+(S.cls?' · Lớp '+esc(S.cls):'')+(tName()?' · '+esc(tName()):'')+'</div></div><div style="text-align:right">In ngày '+dm(t)+'/'+pd(t).getFullYear()+'<br>Phiên bản '+APP_VER+'</div></div><h2>Các thẻ đã rèn</h2>';
  all.forEach(function(id){ var u=H(id), x=HMAP[id], rs={};
    for(var d in S.why){ var w=S.why[d][id]; if(w) rs[w]=(rs[w]||0)+1; }
    var rtxt=REASONS.filter(function(r){ return rs[r[0]]; }).map(function(r){ return r[1]+' ('+rs[r[0]]+')'; }).join(', ');
    var cf=u.cf||{};
    h+='<div class="habit"><p><b>'+esc(hname(id))+'</b> · Cấp '+u.lv+' '+LV_NAME[u.lv]+(u.master?' · Thành nếp':'')+' · '+(S.slots.indexOf(id)<0?'Đã cất':u.status==='pause'?'Tạm dừng':'Đang rèn')+' · bắt đầu '+dm(u.since)+' · tổng '+dayCount(id)+(isDip(id)?' lần · khi gặp dịp':' ngày')+(x.custom?' · thẻ tự tạo':' · combo '+x.combos.join(', '))+
      '<br>Công thức: '+formula(id)+(x.custom?'<br>Lý do chọn: '+esc(x.myWhy||''):'')+(cf[2]?'<br>Lên cấp 2 ngày '+dm(cf[2].d)+', bạn xác nhận: '+esc(cf[2].by):'')+(cf[3]?' · Lên cấp 3 ngày '+dm(cf[3].d)+', thầy cô xác nhận':'')+(rtxt?'<br>Lý do chưa làm: '+esc(rtxt):'')+'</p>';
    h+='<table><tr><th>Tuần</th>'+WDS.map(function(w){ return '<th>'+w+'</th>'; }).join('')+'</tr>';
    var ws=wkStart(t); for(var r=3;r>=0;r--){ var s=addD(ws,-7*r); h+='<tr><td>'+dm(s)+'</td>'; for(var c=0;c<7;c++){ var m=mark(addD(s,c),id); h+='<td style="text-align:center">'+(m==='y'?'●':m==='p'?'◐':m==='n'?'○':m==='x'?'·':'')+'</td>'; } h+='</tr>'; }
    h+='</table>';
    var nl=Object.keys(S.notes).sort().filter(function(d){ return S.notes[d][id]; }).slice(-10);
    if(nl.length) h+='<p style="font-size:9.5pt;margin:4pt 0 0"><b>Ghi chú khi đóng dấu</b> (10 lần gần nhất): '+nl.map(function(d){ return dm(d)+((S.bf[d]||{})[id]?' (ghi bù)':'')+': '+esc(S.notes[d][id]); }).join(' · ')+'</p>';
    h+='</div>'; });
  h+='<p style="font-size:9pt;color:#555">● làm rồi · ◐ một phần · ○ chưa làm · · không gặp dịp</p>';
  if(notes.length){ h+='<h2>Memo cuối ngày</h2><table>'+notes.map(function(d){ return '<tr><td style="width:16%">'+dm(d)+'</td><td>'+esc(S.ci[d].note)+'</td></tr>'; }).join('')+'</table>'; }
  var lsd=LESSONS.filter(function(l){ return S.les[l.id]; });
  if(lsd.length){ h+='<h2>Bài học rèn thói quen</h2><table>'+lsd.map(function(l){ return '<tr><td style="width:34%">Bài '+l.n+'. '+esc(l.t)+'</td><td>'+dm(S.les[l.id].d)+(S.les[l.id].w?' · '+esc(S.les[l.id].w):'')+'</td></tr>'; }).join('')+'</table>'; }
  var wins=Object.keys(S.week).sort().filter(function(k){ return S.week[k].win; });
  if(wins.length){ h+='<h2>Thắng nhỏ mỗi tuần</h2><table>'+wins.map(function(k){ return '<tr><td style="width:16%">Tuần '+dm(k)+'</td><td>'+esc(S.week[k].win)+(S.week[k].buddy?' · Bạn cùng tiến: '+esc(S.week[k].buddy):'')+'</td></tr>'; }).join('')+'</table>'; }
  var stp=0, ntd=0; for(var dd0 in S.log){ for(var kk0 in S.log[dd0]){ var mm0=S.log[dd0][kk0]; if(mm0==='y'||mm0==='p'){ stp++; if((S.notes[dd0]||{})[kk0]) ntd++; } } }
  h+='<div class="stats">Ghi chú khi đóng dấu: '+ntd+'/'+stp+' lần. Thống kê: mở app '+Object.keys(S.opens).length+' ngày · check-in '+ciDays()+' ngày · chuỗi '+streak()+' ngày · '+totalStamps()+' con dấu · '+notes.length+' memo, tổng '+totalW+' chữ tự viết · bắt đầu '+dm(S.created)+'.</div>';
  $('#printArea').innerHTML=h;
}

/* =========================================================
   DEMO GIÁO VIÊN
   ========================================================= */
/* Demo M3.3.18 được tạo mới trong refinement16.js, trước boot. */
function buildDemo(){return defState();}
function ntRefresh(){
  var b=$('#ntGo');if(b)b.disabled=!NT||!String(NT.text||'').trim();
  var e=$('#ntRequired34');if(e&&NT&&String(NT.text||'').trim())e.hidden=true;
}

/* ---- Bàn phím và thanh dưới: bám theo phần màn hình đang thấy (kể cả khi toàn màn hình) ---- */
var VIEWPORT_BASE32=window.innerHeight,VIEWPORT_TIMER32=null;
function viewportAdjust32(){
  var vv=window.visualViewport,a=document.activeElement,typing=!!(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)),gap=vv?Math.max(0,window.innerHeight-vv.height-vv.offsetTop):0;if(!typing)VIEWPORT_BASE32=window.innerHeight;
  var keyboard=typing&&(gap>120||VIEWPORT_BASE32-window.innerHeight>160);document.documentElement.style.setProperty('--kb',keyboard?gap+'px':'0px');document.body.classList.toggle('keyboard-open32',keyboard);
  var bar=$('#abar');if(bar)bar.style.transform='';clearTimeout(VIEWPORT_TIMER32);
  if(keyboard)VIEWPORT_TIMER32=setTimeout(function(){if(!a.isConnected)return;var r=a.getBoundingClientRect(),top=vv?vv.offsetTop:0,bottom=vv?vv.offsetTop+vv.height:window.innerHeight;if(r.bottom>bottom-80||r.top<top+20)a.scrollIntoView({block:'center',behavior:'auto'});},100);
}
if(window.visualViewport){window.visualViewport.addEventListener('resize',viewportAdjust32);window.visualViewport.addEventListener('scroll',viewportAdjust32);}window.addEventListener('resize',viewportAdjust32);document.addEventListener('focusin',viewportAdjust32);document.addEventListener('focusout',function(){setTimeout(viewportAdjust32,50);});

/* =========================================================
   TQ11 · ĐO TIẾN BỘ THẬT: độ đều, thành nếp, sức sống thói quen duy trì
   ========================================================= */
function consistency(id,n){ n=n||28; var t=dk(), u=H(id); if(!u) return 0;
  if(isDip(id)){ var ok2=0, no2=0, d2=addD(t,-(n-1)); while(d2<=t){ var m2=mark(d2,id); if(m2==='y'||m2==='p') ok2++; else if(m2==='n') no2++; d2=addD(d2,1); } return (ok2+no2)?Math.round(ok2/(ok2+no2)*100):0; } var st=u.since>addD(t,-(n-1))?u.since:addD(t,-(n-1)), days=0, ok=0, d=st;
  while(d<=t){ days++; var m=mark(d,id); if(m==='y'||m==='p') ok++; d=addD(d,1); } return days?Math.round(ok/days*100):0; }
function last7(id){ var t=dk(), c=0; for(var i=0;i<7;i++){ var m=mark(addD(t,-i),id); if(m==='y'||m==='p') c++; } return c; }
function last14(id){ var t=dk(), c=0; for(var i=0;i<14;i++){ var m=mark(addD(t,-i),id); if(m==='y'||m==='p') c++; } return c; }
function vitality(id){ if(isDip(id)){ var t0=dk(), ok=0, no=0; for(var i=0;i<14;i++){ var m=mark(addD(t0,-i),id); if(m==='y'||m==='p') ok++; else if(m==='n') no++; } return ok>=1?'live':no>=1?'fade':'live'; }
  var c=last7(id); return c>=3?'live':c>=1?'fade':'web'; }
var VIT={live:['Đang sống','#17804A','#E3F5EA'],fade:['Đang phai','#B07A0A','#FFF4D6'],web:['Mạng nhện','#6B7280','#EEF0F4']};
function webIcon(){ return '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/><path d="M12 7.5l3.2 1.3 1.3 3.2-1.3 3.2-3.2 1.3-3.2-1.3-1.3-3.2 1.3-3.2z"/></svg>'; }
function vitTag(id){ var v=VIT[vitality(id)]; return '<span class="vit" style="color:'+v[1]+';background:'+v[2]+'">'+(vitality(id)==='web'?webIcon():'')+v[0]+'</span>'; }
function masteredCount(){ var n=0; for(var k in S.habits){ if(S.habits[k].master) n++; } return n; }
function notesCount(){ var n=0; for(var d in S.notes){ for(var k in S.notes[d]){ if(S.notes[d][k]) n++; } } for(var c in S.ci){ if(S.ci[c].note) n++; } return n; }
function avgConsistency(){ var l=handList().filter(function(id){ if(!isDip(id)) return true; for(var i=0;i<28;i++){ var m=mark(addD(dk(),-i),id); if(m==='y'||m==='p'||m==='n') return true; } return false; }); if(!l.length) return 0; var s=0; l.forEach(function(id){ s+=consistency(id); }); return Math.round(s/l.length); }
function longestStreak(){ var d=S.created, t=dk(), best=0, cur=0, miss=0, g=0; while(d<=t && g++<2000){ if(S.ci[d]){ cur++; miss=0; if(cur>best) best=cur; } else { miss++; if(miss>=2) cur=0; } d=addD(d,1); } return Math.max(best,streak()); }

/* ---------- Tổng quan tuần: xem các tuần trước + Shin nhận xét ---------- */
var DW=0;
var JOURNEY_TAB31='tree', MILESTONE_LIMIT31=20, TREE_ORIGIN31='notebook', TREE_SCROLL31=0, TREE_COLLECTION31=false;
function weekIds31(ws){
  var list=ws===wkStart(dk())?handList().slice():[];
  (S.order||[]).forEach(function(id){if(!HMAP[id]||!H(id)||list.indexOf(id)>=0)return;for(var i=0;i<7;i++){if(mark(addD(ws,i),id)){list.push(id);break;}}});return list;
}
function weekStats31(id,ws){
  var c={y:0,p:0,n:0,x:0,unlogged:0,eligible:0,opportunities:0,practiced:0},u=H(id),t=dk();
  for(var i=0;i<7;i++){var d=addD(ws,i);if(d>t)continue;var m=mark(d,id);if(!m&&((u&&d<u.since)||d<S.created))continue;c.eligible++;if(m&&c[m]!==undefined)c[m]++;else c.unlogged++;}
  c.opportunities=c.y+c.p+c.n;c.practiced=c.y+c.p;return c;
}
function weekDescription31(id,ws){
  var c=weekStats31(id,ws);
  if(isDip(id))return c.opportunities?c.practiced+'/'+c.opportunities+' dịp có thực hiện'+(c.p?' · '+c.p+' một phần':''):'Chưa ghi nhận dịp thực hiện';
  return c.y+' ngày đã làm'+(c.p?' · '+c.p+' một phần':'');
}
function weekSecondary31(id,ws){var c=weekStats31(id,ws),s=[];if(isDip(id)&&c.x)s.push(c.x+' ngày không gặp dịp');if(c.unlogged)s.push(c.unlogged+' ngày chưa ghi');if(c.n)s.push(c.n+(isDip(id)?' dịp chưa làm':' ngày chưa làm'));return s.join(' · ');}
function checkinWeek31(ws){var n=0,eligible=0,t=dk();for(var i=0;i<7;i++){var d=addD(ws,i);if(d>t||d<S.created)continue;eligible++;if(S.ci[d])n++;}return {count:n,eligible:eligible};}
function journeyWeek31(){
  var t=dk(),ws=addD(wkStart(t),-7*DW),we=addD(ws,6),isNow=DW===0,list=weekIds31(ws),win=(S.week[ws]||{}).win||'';
  var h='<div class="wnav"><button class="arr2" data-act="dw" data-v="1"'+(ws>wkStart(S.created)?'':' disabled')+' aria-label="Tuần trước">'+ic('back')+'</button><div><b>'+(isNow?'Tuần này':DW===1?'Tuần trước':'Tuần '+dm(ws))+'</b><small>'+dm(ws)+' – '+dm(we)+'</small></div><button class="arr2 r" data-act="dw" data-v="-1"'+(isNow?' disabled':'')+' aria-label="Tuần sau">'+ic('back')+'</button></div>';

  h+='<div class="journey-section31"><h2>Nhịp rèn luyện</h2></div><div class="week-days-label33" aria-hidden="true">'+WDS.map(function(d){return '<span>'+d+'</span>';}).join('')+'</div>';
  h+='<div class="journey-week-list31">'+(list.length?list.map(function(id){var hint=weekDescription31(id,ws),secondary=weekSecondary31(id,ws);if(secondary)hint+=' · '+secondary;return '<button class="drow" data-act="card" data-v="'+id+'" data-hint33="'+esc(hint)+'" aria-description="'+esc(hint)+'">'+emblem(id,36)+'<span class="dr__b"><span class="dr__1"><b>'+esc(sname(id))+'</b>'+(isNow&&ready(id)?'<span class="ready">Lên cấp</span>':'')+'</span><span class="dr__2">'+weekDots(id,ws)+'</span></span></button>';}).join(''):'<div class="journey-empty31">Chưa có ghi nhận trong tuần này.</div>')+'</div>';
  h+='<div class="journey-reflect31"><label for="journeyWin31">Điều bạn muốn nhớ tuần này</label><textarea class="inp" id="journeyWin31" data-in="journeyWin31" data-week="'+ws+'" rows="2" placeholder="Một việc nhỏ bạn muốn ghi nhớ…">'+esc(win)+'</textarea></div><button class="week-link" data-act="week" data-v="'+ws+'">Xem thẻ tuần</button>';
  h+='<details class="journey-legend31"><summary>Cách đọc các chấm tuần</summary><p><i class="legend-dot31 y"></i>Đã làm <i class="legend-dot31 p"></i>Một phần <i class="legend-dot31 n"></i>Chưa làm <i class="legend-dot31 x"></i>Không gặp dịp</p><p>Chấm rỗng: chưa ghi. Chấm nhạt: chưa tới ngày hoặc chưa bắt đầu rèn.</p><p>Thói quen khi gặp dịp chỉ tính những dịp đã ghi nhận.</p></details>';
  return h;
}
function milestoneItems31(){
  syncTree();var items=[],seen={};function add(id,type,date,title,body){if(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date))return;var key=id+'|'+type;if(seen[key])return;seen[key]=1;items.push({id:id,type:type,date:date,title:title,body:body});}
  treeItems30().forEach(function(a){add(a.id,'level2',a.date,a.name,'Đạt cấp 2 · Thẻ đã được treo lên cây');if(a.level3date)add(a.id,'level3',a.level3date,a.name,'Đạt cấp 3 · Vững tay');});
  (S.order||[]).forEach(function(id){var u=H(id);if(!u||!HMAP[id])return;var cf=u.cf||{};if(cf[2])add(id,'level2',cf[2].d,sname(id),'Đạt cấp 2');if(cf[3])add(id,'level3',cf[3].d,sname(id),'Đạt cấp 3 · Vững tay');if(u.master)add(id,'master',u.master,sname(id),'Thói quen đã thành nếp');});
  var logs=Object.keys(S.log||{}).filter(function(d){return Object.keys(S.log[d]||{}).some(function(id){return !!S.log[d][id];});}).sort();if(logs.length)add('','first-record',logs[0],'Ghi nhận đầu tiên','Bạn đã bắt đầu lưu lại việc rèn luyện.');var ci=Object.keys(S.ci||{}).sort();if(ci.length)add('','first-checkin',ci[0],'Lần check-in đầu tiên','Một lần dừng lại để nhìn lại ngày của mình.');
  return items.sort(function(a,b){return b.date.localeCompare(a.date)||a.type.localeCompare(b.type);});
}
function journeyMilestones31(){
  var all=milestoneItems31(),items=all.slice(0,MILESTONE_LIMIT31);
  return (items.length?'<ol class="journey-timeline31">'+items.map(function(a){var hasTree=a.id&&S.treeCards[a.id];return '<li><i></i><button data-act="'+(hasTree?'treeCard30':'journalGo31')+'" data-v="'+esc(hasTree?a.id:a.date)+'"><small>'+treeDate30(a.date)+'</small><b>'+esc(a.title)+'</b><span>'+esc(a.body)+'</span></button></li>';}).join('')+'</ol>':'<p class="small">Chặng đầu tiên bắt đầu từ một việc nhỏ.</p>')+(all.length>items.length?'<button class="journey-more31" data-act="milestoneMore31">Xem thêm</button>':'');
}
function vDash(){
  syncTree();var tabs=[['tree','Cây thành tựu'],['week','Theo tuần']];
  return '<div class="journey-tabs31" role="tablist" aria-label="Nội dung hành trình">'+tabs.map(function(t){return '<button id="journey-'+t[0]+'" role="tab" aria-controls="journey-content33" aria-selected="'+(JOURNEY_TAB31===t[0])+'" data-act="journeyTab31" data-v="'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div><div id="journey-content33" role="tabpanel" aria-labelledby="journey-'+JOURNEY_TAB31+'" class="journey-content31">'+(JOURNEY_TAB31==='tree'?treePanel()+'<details class="journey-past33"'+(MILESTONES_OPEN33?' open':'')+'><summary>Những chặng đã đi qua</summary>'+journeyMilestones31()+'</details>':journeyWeek31())+'</div>';
}
function openJourney31(tab){closeOv();TREE_REPLAY34=true;PG=1;JOURNEY_TAB31=tab||'tree';render();window.scrollTo(0,0);}
function shinReview(){
  var t=dk(), ws=wkStart(t), pws=addD(ws,-7), soFar=diffD(ws,t)+1, cur=0, prev=0, l=handList();
  for(var i=0;i<7;i++){ if(S.ci[addD(ws,i)]) cur++; if(S.ci[addD(pws,i)]) prev++; }
  if(!l.length && !cur && !prev) return '';
  var lines=[];
  if(prev===0 && cur>0) lines.push('Tuần này bạn đã check-in <b>'+cur+'</b> ngày. Khởi đầu đẹp!');
  else if(cur>prev) lines.push('Tuần này <b>'+cur+'</b> ngày check-in, nhiều hơn tuần trước (<b>'+prev+'</b>). Giỏi lắm!');
  else if(cur===prev) lines.push('Tuần này <b>'+cur+'</b> ngày check-in, bằng tuần trước. Giữ nhịp này nhé.');
  else lines.push(soFar<7 ? 'Tuần này mới <b>'+cur+'/'+soFar+'</b> ngày, tuần trước <b>'+prev+'/7</b>. Còn '+(7-soFar)+' ngày để gỡ lại.' : 'Tuần này <b>'+cur+'/7</b> ngày check-in, tuần trước <b>'+prev+'/7</b>. Tuần sau mình gỡ lại nhé.');
  if(l.length>1){ var cnt=l.map(function(id){ var c=0; for(var i=0;i<soFar;i++){ var m=mark(addD(ws,i),id); if(m==='y'||m==='p') c++; } return [id,c]; }).sort(function(a,b){ return b[1]-a[1]; });
    var best=cnt[0], weak=cnt[cnt.length-1];
    if(best[1]>0) lines.push('<b>'+esc(sname(best[0]))+'</b> đều nhất ('+best[1]+' ngày).');
    if(best[1]-weak[1]>=2) lines.push('<b>'+esc(sname(weak[0]))+'</b> hơi thưa, thử làm ngay khi '+esc(H(weak[0]).anchor)+' nhé.'); }
  var mood=cur>prev?'cheer':cur<prev?'think':'hi';
  return '<div class="shinrv"><div class="av">'+shin(mood)+'</div><p>'+lines.join(' ')+'</p></div>';
}
/* ---------- Chuỗi ngày: lịch tháng ---------- */
var SM=0;
function openStreak(){ SM=0; openOv(''); drawStreak(); }
function drawStreak(){
  var n=new Date(); n.setDate(1); n.setMonth(n.getMonth()-SM); var y=n.getFullYear(), m=n.getMonth(), first=(n.getDay()+6)%7, days=new Date(y,m+1,0).getDate(), t=dk(), cnt=0;
  var h='<div class="sh__h"><b style="font-size:16px">Chuỗi giữ nhịp</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>'+
    '<div class="kp3"><div><b>'+streak()+'</b><span>Chuỗi hiện tại</span></div><div><b>'+longestStreak()+'</b><span>Dài nhất</span></div><div><b>'+ciDays()+'</b><span>Tổng ngày</span></div></div>'+
    '<p class="note" style="margin:8px 0 14px">Chuỗi tính số ngày đã check-in. Một ngày gián đoạn chưa làm mất chuỗi; hai ngày liên tiếp không check-in sẽ bắt đầu chuỗi mới.</p><div class="wnav"><button class="arr2" data-act="sm" data-v="1" aria-label="Tháng trước">'+ic('back')+'</button><div><b>Tháng '+(m+1)+'/'+y+'</b></div><button class="arr2 r" data-act="sm" data-v="-1"'+(SM?'':' disabled')+' aria-label="Tháng sau">'+ic('back')+'</button></div><div class="mcal">'+WDS.map(function(w){ return '<span class="h">'+w+'</span>'; }).join('');
  for(var i=0;i<first;i++) h+='<span></span>';
  for(var d=1;d<=days;d++){ var k=y+'-'+pad(m+1)+'-'+pad(d), on=!!S.ci[k]; if(on) cnt++; h+='<span class="'+(on?'on':'')+(k===t?' td':'')+(k>t?' fu':'')+'">'+d+'</span>'; }
  h+='</div><p class="note center">'+cnt+' ngày check-in trong tháng. Ô có nền xanh là ngày đã check-in.</p>';
  sheetSet(h);
}
/* ---------- Đang duy trì: kèm sức sống ---------- */
function openKeeps(){
  var kp=keepIds(), t=dk(), h='<div class="sh__h"><b style="font-size:16px">Đang duy trì</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>';
  if(!kp.length) h+='<p class="muted">Chưa có thói quen nào. Thẻ đạt “Thành nếp” sẽ chuyển sang đây để bạn giữ đều, nhẹ nhàng hơn.</p>';
  else h+='<p class="note" style="margin:0 0 10px">Đang sống: làm từ 3/7 ngày gần đây · Đang phai: 1–2 ngày · Mạng nhện: 7 ngày chưa làm.</p>';
  var webs=kp.filter(function(id){ return vitality(id)==='web'; });
  if(webs.length) h+=say('shin','worry','<b>'+esc(sname(webs[0]))+'</b> đã 7 ngày chưa làm, sắp đóng mạng nhện rồi. Rèn lại vài ngày cho nó sống lại nhé?');
  h+=kp.map(function(id){ var dots=weekDots(id,addD(t,-6));
    return '<div class="krow'+(vitality(id)==='web'?' web':'')+'">'+emblem(id,40)+'<div class="kr__b"><b>'+esc(sname(id))+'</b> '+vitTag(id)+''+dots+'<small>'+(isDip(id)?last14(id)+' lần trong 14 ngày gần đây':last7(id)+'/7 ngày gần đây')+'</small></div><button class="btn btn--ghost btn--sm" data-act="slotit" data-v="'+id+'">Rèn lại</button></div>'; }).join('');
  h+='<p class="note" style="margin-top:10px">Mỗi tối, check-in sẽ hỏi nhanh bạn giữ được thói quen duy trì nào.</p>';
  openOv(h);
}
/* ---------- Thư viện thẻ ---------- */
function cardStatus(id){ var u=H(id); if(!u) return S.seen[id]?['','']:['Mới','new']; if(u.status==='keep') return ['Duy trì','keep']; if(S.slots.indexOf(id)>=0) return u.master?['Thành nếp','gold']:['Đang rèn','on']; return ['Đã cất','off']; }
function openStore(pick){
  STF='all'; STOPEN=null;
  PICK = pick ? (S.slots.indexOf(null)) : null;
  if(pick && PICK<0){ toast('Đã đủ 5 thẻ trên tay.'); return; }
  openOv(''); drawStore();
}
var STF='all', STOPEN=null;
function libStatus(id){ var u=H(id); if(!u) return ['Chưa rèn','todo']; if(u.status==='keep') return ['Đang duy trì','keep']; if(S.slots.indexOf(id)>=0) return u.status==='pause'?['Tạm dừng','off']:['Đang rèn','on']; return ['Chưa rèn','todo']; }
function libKind(id){ var st=libStatus(id)[1]; return st==='keep'?'keep':st==='todo'?'todo':'on'; }
function lessonList(){
  return '<div class="slist">'+LESSONS.map(function(l){ var ok=!!S.les[l.id];
    return '<button class="srow" data-act="lsOpen" data-v="'+l.id+'"><span class="emb g'+l.g+'" style="width:40px;height:40px">'+glyph('cu_'+l.icon,GCOL[l.g])+'</span><span class="sr__b"><b>'+esc(l.t)+'</b><small>Bài '+l.n+' · 4 thẻ ngắn</small></span>'+(ok?'<span class="lchip on">Đã học</span>':'')+ic('arrow')+'</button>'; }).join('')+'</div>';
}
function drawStore(){
  var sh=OV&&OV.querySelector('.sheet'), keepTop=sh?sh.scrollTop:0;
  var v=S.storeView==='lessons'?'lessons':'list', n=S.slots.filter(Boolean).length, done=LESSONS.filter(function(l){ return S.les[l.id]; }).length;
  var h='<div class="sh__h"><b style="font-size:17px">'+(PICK!=null?'Chọn thẻ để rèn':'Thư viện thẻ')+'</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>'+
    '<div class="tabs" role="tablist"><button class="'+(v==='list'?'on':'')+'" data-act="sview" data-v="list">Danh sách</button><button class="'+(v==='lessons'?'on':'')+'" data-act="sview" data-v="lessons">Bài học · '+done+'/5</button></div>';
  if(v==='lessons'){ h+='<p class="muted small" style="margin:10px 2px 6px">5 bài ngắn giúp bạn chọn việc vừa sức và giữ đều.</p>'+lessonList(); sheetSet(h); return; }
  if(PICK!=null && n>=3) h+=say('shin','think','Bạn đang có <b>'+n+'</b> thẻ. Ít thẻ mà đều tay thì thành nếp nhanh hơn đó.');
  h+=customBlock('list');
  /* gợi ý: tối đa 3, mỗi nhóm 1 thẻ, ưu tiên 3 nhóm bạn có ít thẻ nhất */
  var owned={1:0,2:0,3:0,4:0}; S.order.forEach(function(id){ if(S.habits[id] && owned[HMAP[id].g]!==undefined) owned[HMAP[id].g]++; });
  var gs=GROUPS.map(function(g){ return g.g; }).sort(function(a,b){ return (owned[a]-owned[b])||(a-b); }), sug=[];
  gs.forEach(function(g){ if(sug.length>=3) return; var x=HABITS.filter(function(k){ return k.g===g && !H(k.id) && k.steps; })[0]; if(x) sug.push(x); });
  sug.sort(function(a,b){ return a.g-b.g; });
  if(sug.length) h+='<div class="sec" style="margin-top:14px"><h2>Gợi ý cho bạn</h2></div><div class="suggest-grid">'+sug.map(function(x){ return miniCard(x.id,true); }).join('')+'</div>';
  var FL=[['all','Tất cả'],['on','Đang rèn'],['keep','Đang duy trì'],['todo','Chưa rèn']];
  h+='<div class="fchips" role="tablist" aria-label="Lọc thẻ">'+FL.map(function(f){ return '<button class="'+(STF===f[0]?'on':'')+'" role="tab" aria-selected="'+(STF===f[0])+'" data-act="sflt" data-v="'+f[0]+'">'+f[1]+'</button>'; }).join('')+'</div>';
  var shown=0;
  GROUPS.forEach(function(g){
    var all=HABITS.filter(function(x){ return x.g===g.g; }), got=all.filter(function(x){ return H(x.id); }).length;
    var list=STF==='all'?all:all.filter(function(x){ return libKind(x.id)===STF; });
    if(!list.length) return; shown++;
    var open=STF==='all'?(STOPEN===g.g):true, col=GCOL[g.g];
    h+='<div class="agrp'+(open?' open':'')+'"><button class="agh'+(open?' open':'')+'" data-act="sgrp" data-v="'+g.g+'" aria-expanded="'+open+'">'+gico(g.g,'sm')+'<span class="ag__t"><b>'+esc(g.t)+'</b><small>'+(STF==='all'?got+'/'+all.length+' thẻ đã rèn':list.length+' thẻ')+'</small></span>'+(STF==='all'?ic('chev'):'')+'</button><div class="sg__bar"><i style="width:'+Math.round(got/all.length*100)+'%;background:'+col+'"></i></div>';
    if(open) h+='<div class="slist">'+list.map(function(x){ var st=libStatus(x.id);
      return '<button class="srow" data-act="mcard" data-v="'+x.id+'">'+emblem(x.id,40)+'<span class="sr__b"><b>'+esc(x.t)+'</b></span><span class="lchip '+st[1]+'">'+st[0]+'</span>'+ic('arrow')+'</button>'; }).join('')+'</div>';
    h+='</div>';
  });
  if(!shown) h+='<p class="muted small center" style="margin:18px 0">Chưa có thẻ nào ở nhóm này.</p>';
  sheetSet(h);
  if(sh){ var op=sh.querySelector('.agrp.open'); if(STSCROLL && op){ STSCROLL=false; sh.scrollTop=Math.max(0,op.offsetTop-52); } else sh.scrollTop=keepTop; }
}
var STSCROLL=false;
function miniCard(id,big){ var x=HMAP[id], u=H(id), st=cardStatus(id);
  return '<button class="mc g'+x.g+(u?' lv'+u.lv:'')+(big?' mc--big':'')+'" data-act="mcard" data-v="'+id+'" aria-label="'+esc(x.t)+'">'+(st[0]&&st[1]!=='new'?'<i class="stag '+st[1]+'">'+st[0]+'</i>':'')+hico(id)+'<b>'+esc(x.s)+'</b>'+stars(u?u.lv:0,12)+'</button>'; }
var CI=null, RETCI=null;
function openCI(date){
  $('#toast').classList.remove('show');
  var all=trackIds(),kp=keepIds().filter(function(id){return all.indexOf(id)<0;});
  if(!all.length&&!kp.length){toast('Thêm ít nhất một thẻ để bắt đầu nhé.');go('today');return;}
  var c=S.ci[date]||{},draft=(S.ciDrafts||{})[date],ans={},why={},notes={},base={},keep={};
  all.forEach(function(id){var m=mark(date,id);base[id]=m;if(m)ans[id]=m;why[id]=(S.why[date]||{})[id]||'';notes[id]=(S.notes[date]||{})[id]||'';});
  kp.forEach(function(id){keep[id]=mark(date,id)==='y';base[id]=mark(date,id);notes[id]=(S.notes[date]||{})[id]||'';});
  CI={mode:'review',date:date,all:all,list:all,base:base,ans:ans,why:why,notes:notes,skip:{},edit:{},keeps:kp,keep:keep,note:c.note||'',mood:S.mood[date]||null,moodTouched:false,again:!!S.ci[date],pi:c.p===undefined?pd(date).getDate()%PROMPTS.length:c.p,done:false,open:{}};
  if(draft){all.forEach(function(id){if((draft.base||{})[id]!==base[id])return;if(draft.ans&&draft.ans[id])CI.ans[id]=draft.ans[id];if(draft.notes&&draft.notes[id]!==undefined)CI.notes[id]=draft.notes[id];if(draft.why)CI.why[id]=draft.why[id]||'';if(draft.skip)CI.skip[id]=draft.skip[id];if(draft.edit)CI.edit[id]=draft.edit[id];});CI.note=draft.note||'';CI.mood=draft.mood||null;CI.moodTouched=!!draft.moodTouched;kp.forEach(function(id){if((draft.base||{})[id]!==base[id])return;if(draft.keep&&draft.keep[id]!==undefined)CI.keep[id]=draft.keep[id];if(draft.notes&&draft.notes[id]!==undefined)CI.notes[id]=draft.notes[id];});CI.open=draft.open||{};}
  openOv('');drawCI();
}
function ciState(){
  if(!CI)return {ok:false,remaining:0,missingNotes:0};
  var remaining=CI.all.filter(function(id){return !CI.ans[id]&&!CI.skip[id];}).length;
  var missing=CI.all.filter(function(id){return !!CI.ans[id]&&!String(CI.notes[id]||'').trim();}).length+CI.keeps.filter(function(id){return CI.keep[id]&&!String(CI.notes[id]||'').trim();}).length;
  return {ok:remaining===0&&missing===0,remaining:remaining,missingNotes:missing,msg:remaining?'Còn '+remaining+' thẻ chưa chọn':missing?'Còn '+missing+' thói quen thiếu ghi chú':'Sẵn sàng lưu'};
}
function stashCI29(){if(!CI||CI.done)return;S.ciDrafts=S.ciDrafts||{};S.ciDrafts[CI.date]={base:CI.base,ans:CI.ans,why:CI.why,notes:CI.notes,skip:CI.skip,edit:CI.edit,keep:CI.keep,note:CI.note,mood:CI.mood,moodTouched:CI.moodTouched,open:CI.open};save();}
function ciRefresh29(){
  if(!CI)return;var sheet=$('.sheet'),top=sheet?sheet.scrollTop:0;
  if(sheet)$$('[data-ci-detail]',sheet).forEach(function(el){CI.open[el.getAttribute('data-ci-detail')]=el.open;});
  drawCI();if($('.sheet'))$('.sheet').scrollTop=top;stashCI29();
}
function ciRow29(id){
  var a=CI.ans[id]||'',skip=!!CI.skip[id],x=HMAP[id];
  return '<article class="ci29-row" data-ci-row="'+id+'"><div class="ci29-row-head">'+hico(id,'sm')+'<div><b>'+esc(x.custom?x.t:sname(id))+'</b><small>'+esc(H(id).act)+'</small></div><button class="ci29-skip'+(skip?' selected':'')+'" data-act="'+(CI.base[id]?'ciKeepExisting29':'ciSkip29')+'" data-v="'+id+'" aria-pressed="'+skip+'">'+(CI.base[id]?'Giữ như cũ':skip?'Đã để sau':'Để sau')+'</button></div>'+recordOptions29(id,a,'ciAnswer29')+(a?ciNoteInputs34(id,a):'')+'</article>';
}
function drawCI(){
  if(!CI)return;if(CI.done){sheetSet('<div class="sh__h"><b>Check-in đã lưu</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>'+ciSummary()+'<div class="sbar"><button class="btn btn--wide" data-act="ciHome29">Về Hôm nay</button></div>');return;}
  var s=ciState(),pending=CI.all.filter(function(id){return !CI.base[id]||CI.edit[id]||!String(CI.notes[id]||'').trim();}),recorded=CI.all.filter(function(id){return CI.base[id]&&!CI.edit[id]&&String(CI.notes[id]||'').trim();});
  var h='<div class="sh__h"><b>'+(CI.date===dk()?'Check-in tối nay':'Check-in ngày '+dm(CI.date))+'</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><div class="ci29"><div class="ci29-intro"><h2>'+(CI.date===dk()?'Rà lại hôm nay, nhẹ thôi.':'Nhìn lại ngày '+dm(CI.date)+'.')+'</h2><p>'+(CI.again?'Bạn có thể chỉnh lại kết quả đã lưu.':'Những thẻ đã ghi được giữ nguyên. Chỉ cần chọn cho các thẻ còn lại.')+'</p></div>';
  if(recorded.length){h+='<details class="ci29-recorded" data-ci-detail="saved"'+(CI.open.saved?' open':'')+'><summary>'+recordIcon('y')+'<span>'+recorded.length+' thẻ đã ghi nhận</span><small>Xem / chỉnh</small></summary><div>'+recorded.map(function(id){return '<div class="ci29-saved-row"><span>'+esc(HMAP[id].custom?HMAP[id].t:sname(id))+'</span><small class="saved-state-'+CI.ans[id]+'">'+RECORD_LABEL[CI.ans[id]]+'</small><button data-act="ciEdit29" data-v="'+id+'" aria-label="Chỉnh '+esc(sname(id))+'">Chỉnh</button></div>';}).join('')+'</div></details>';}
  if(pending.length)h+='<div class="ci29-section-label">'+(recorded.length?'CÁC THẺ CÒN LẠI':'THÓI QUEN HÔM NAY')+'</div><div class="ci29-list">'+pending.map(ciRow29).join('')+'</div>';
  if(CI.keeps.length)h+=ciKeeps34();
  h+='<section class="ci29-mood"><div class="ci29-caption"><h3>'+(CI.date===dk()?'Hôm nay':'Hôm đó')+' bạn thấy thế nào?</h3><small>Không bắt buộc · Chỉ bạn xem</small></div><div class="ci29-mood-options">'+MOODS.map(function(m){return '<button data-act="ciMood29" data-v="'+m[0]+'" aria-pressed="'+(CI.mood===m[0])+'">'+moodFace(+m[0],m[2])+'<span>'+m[1]+'</span></button>';}).join('')+'</div></section>';
  h+='<details class="ci29-memo" data-ci-detail="memo"'+(CI.open.memo?' open':'')+'><summary>Viết một câu cho hôm nay <span>· không bắt buộc</span></summary><label class="lbl" for="ciMemo29">'+esc(PROMPTS[CI.pi])+'</label><textarea class="inp" id="ciMemo29" data-in="ciMemo29" placeholder="'+esc(PROMPT_PH[CI.pi])+'">'+esc(CI.note)+'</textarea></details></div>';
  h+='<div class="sbar ci29-footer"><div><b>'+s.msg+'</b>'+(s.remaining?'<button data-act="ciRest29">Để các thẻ còn lại sang sau</button>':'<small>Memo cuối ngày và cảm xúc tùy chọn.</small>')+'</div><button class="btn" data-act="ciSave29"'+(s.ok?'':' disabled')+'>'+(CI.again?'Lưu thay đổi':'Lưu check-in')+'</button></div>';
  sheetSet(h);if($('.sheet'))$('.sheet').classList.add('checkin-sheet');
}
function ciFinish(){
  if(!CI||CI.done||!ciState().ok)return;var d=CI.date,first=!S.ci[d],oldNote=(S.ci[d]||{}).note||'',hadMemoReward=!!(S.ci[d]||{}).memoReward||words(oldNote)>=8,extra=first?10:0,ins=0;
  CI.all.forEach(function(id){if(!CI.ans[id])return;var current=mark(d,id);if(CI.base[id]&&!CI.edit[id]&&String(CI.notes[id]||'').trim()===String((S.notes[d]||{})[id]||'').trim())return;writeRecord(id,d,CI.ans[id],CI.notes[id]||'',CI.why[id]);});
  CI.keeps.forEach(function(id){var m=mark(d,id);if(CI.keep[id]&&(m!=='y'||String(CI.notes[id]||'').trim()!==String((S.notes[d]||{})[id]||'').trim()))writeRecord(id,d,'y',CI.notes[id]||'',undefined);else if(!CI.keep[id]&&m==='y')writeRecord(id,d,'',undefined,undefined);});
  if(words(CI.note)>=8&&!hadMemoReward){extra+=5;ins=1;}S.xp+=extra;S.ins+=ins;
  S.ci[d]={t:nowHM(),note:CI.note.trim(),p:CI.pi,memoReward:hadMemoReward||words(CI.note)>=8};if(CI.mood)S.mood[d]=CI.mood;else if(CI.moodTouched)delete S.mood[d];
  if(d!==dk())S.bu[d]=1;delete S.ciDrafts[d];RECORD_UNDO=null;CI.done=true;save(true);render();drawCI();ting();
}
function ciSummary(){
  var ids=CI.all.concat(CI.keeps.filter(function(id){return !!mark(CI.date,id);})),counts={y:0,p:0,n:0,x:0,unlogged:0};ids.forEach(function(id){var m=mark(CI.date,id);counts[m||'unlogged']++;});
  return '<div class="ci29-summary"><div class="ci29-summary-shin">'+shin('proud')+'</div><h2>'+esc(CI.date===dk()?'Đã lưu hôm nay.':'Đã lưu ngày '+dm(CI.date)+'.')+'</h2><p>Một lần nhìn lại, một bước hiểu mình hơn.</p><div class="ci29-summary-stats"><div><b>'+counts.y+'</b><span>Đã làm</span></div><div><b>'+counts.p+'</b><span>Một phần</span></div><div><b>'+counts.unlogged+'</b><span>Để sau</span></div></div>'+(counts.n||counts.x?'<p class="ci29-summary-other">'+(counts.n?counts.n+' chưa làm':'')+(counts.n&&counts.x?' · ':'')+(counts.x?counts.x+' không gặp dịp':'')+'</p>':'')+'<p class="ci29-summary-message">'+(counts.unlogged?'Các thẻ để sau vẫn chưa có dấu. Bạn có thể ghi nhận khi sẵn sàng.':counts.n?'Ngày nào cũng có lúc chưa trọn vẹn. Mai mình thử một việc nhỏ vừa sức.':'Bạn có thể xem lại các ghi nhận trong tab Tuần.')+'</p></div>';
}
function drawMood(){drawCI();}
function moodFace(v,col){
  var F={
   5:'<path d="M15 27q4.5-7 9 0M36 27q4.5-7 9 0" stroke="'+col+'" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M17 34h26a13 13 0 0 1-26 0z" fill="'+col+'"/><path d="M50 6l1.7 4.3 4.3 1.7-4.3 1.7L50 18l-1.7-4.3L44 12l4.3-1.7z" fill="'+col+'"/>',
   4:'<circle cx="22" cy="26" r="3" fill="'+col+'"/><circle cx="38" cy="26" r="3" fill="'+col+'"/><path d="M20 35q10 8 20 0" stroke="'+col+'" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
   3:'<circle cx="22" cy="26" r="3" fill="'+col+'"/><circle cx="38" cy="26" r="3" fill="'+col+'"/><path d="M21 38h18" stroke="'+col+'" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
   2:'<path d="M15 23l9-3.4M45 23l-9-3.4" stroke="'+col+'" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="22" cy="28" r="3" fill="'+col+'"/><circle cx="38" cy="28" r="3" fill="'+col+'"/><path d="M21 42q9-7 18 0" stroke="'+col+'" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
   1:'<path d="M16 27q4 4 8 0M36 27q4 4 8 0" stroke="'+col+'" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M43 31c-3.4 4.4-3.4 7.6 0 8.6 3.4-1 3.4-4.2 0-8.6z" fill="'+col+'" opacity=".55"/><path d="M20 45q3.6-5 7.5 0t7.5 0t7.5 0" stroke="'+col+'" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  }[v];
  return '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="'+col+'" opacity=".16"/>'+F+'</svg>'; }
var WK=null;


/* =========================================================
   TQ14 · 5 BÀI HỌC RÈN THÓI QUEN (mỗi bài 4 thẻ: Hiểu · Thử · Senpai kể · Trong app này)
   Nguyên tắc THT: B1 N8+N5 · B2 N8 · B3 N8, mô hình 5S · B4 N5 · B5 N1+N2, thang 5 trạng thái
   Lời Thầy (mã nguồn để duyệt): B3 [T26 – V13] · B5 [T26 – V17]
   Chuyện Senpai dựa trên chia sẻ trong tài liệu Myway và biên bản case study (đã ẩn danh)
   ========================================================= */
var LESSONS = [
 {id:'b1', n:1, t:'Bắt đầu thật nhỏ', icon:'la', g:2, kind:'shrink',
  c1:'<div class="hw__k">Ý chính</div><p class="lsbig">Thói quen hiếm khi thua vì việc khó. Nó thua vào ngày mệt.</p>'+
     '<p>Ngày nào cũng có lúc mệt: học 4 tiết, chiều đi làm thêm, tối còn bài tiếng Nhật. Việc càng to thì càng dễ có cớ để bỏ.</p>'+
     '<div class="pair"><div><small>KIỂU 1</small>Học 1 tiếng mỗi tối. Được 3 hôm, rồi nghỉ cả tuần.</div><div class="ok"><small>KIỂU 2</small>Học 10 phút mỗi tối. Đều cả tháng, có hôm thành 30 phút.</div></div>'+
     '<p>Cách rèn: thu việc nhỏ đến mức ngày mệt nhất vẫn làm được. <b>Làm đều trước, làm nhiều sau.</b></p>'+
     '<div class="lsq">Việc nào của bạn đang to quá nên hay bị bỏ giữa chừng?</div>',
  dlg:[['s',3,'smile','Hồi ở trường, chiều nào anh cũng đi làm thêm. Anh đặt mục tiêu học tiếng Nhật 1 tiếng mỗi tối. Được ba hôm là bỏ.'],
       ['shin','think','Rồi anh lấy lại nhịp bằng cách nào?'],
       ['s',3,'hi','Anh hạ xuống 10 phút: về đến nơi là mở sách, đọc vài từ. Có hôm 10 phút thành nửa tiếng. Không cần học nhiều, chỉ cần học đều.'],
       ['shin','cheer','Vậy việc nhỏ không phải để làm ít, mà để không bỏ!']],
  app:['Ô “Tôi sẽ…” trên mỗi thẻ là việc nhỏ của bạn. Cấp Tập sự 7 ngày đầu chỉ cần việc nhỏ đó.','Lên cấp, app gợi ý nâng việc lên một chút. Bạn chọn nhận hoặc giữ.'],
  todo:'Hôm nay: xem lại ô “Tôi sẽ…” trên thẻ của bạn. Việc nào ngày mệt khó làm thì sửa nhỏ lại.', go:['deck','Xem thẻ của tôi']},
 {id:'b2', n:2, t:'Gắn vào việc sẵn có', icon:'tia', g:1, kind:'cue',
  c1:'<div class="hw__k">Ý chính</div><p class="lsbig">Đừng chờ lúc rảnh. Lúc rảnh hiếm khi tự đến.</p>'+
     '<p>Mỗi ngày bạn đã có sẵn nhiều việc lặp lại: bước qua cổng trường, vào lớp, ăn trưa, đi làm thêm về, đánh răng buổi tối.</p>'+
     '<p>Gắn việc mới ngay sau một việc quen. Việc quen sẽ thành <b>tín hiệu</b> nhắc bạn, không cần nhớ, không cần hứng.</p>'+
     '<div class="pair"><div><small>TÍN HIỆU MƠ HỒ</small>“Khi nào rảnh”, “buổi tối”</div><div class="ok"><small>TÍN HIỆU RÕ</small>“Khi đánh răng xong”, “khi vừa ngồi vào bàn học”</div></div>'+
     '<div class="lsq">Ngày mai, việc quen nào bạn chắc chắn sẽ làm?</div>',
  dlg:[['s',1,'smile','Sang Nhật, có hôm tăng ca về mệt lắm. Chị gắn việc ôn bài vào lúc đánh răng xong: lên giường là mở sổ, đọc 5 từ.'],
       ['shin','think','Sao lại chọn đúng lúc đó hả chị?'],
       ['s',1,'hi','Vì đêm nào cũng có lúc đánh răng. Lâu dần, đánh răng xong mà chưa mở sổ là thấy thiếu thiếu, khó ngủ.'],
       ['shin','cheer','Việc quen kéo việc mới theo. Không cần nhớ, chỉ cần làm theo nếp!']],
  app:['Vế “Khi…” trong công thức chính là tín hiệu. Hãy chọn việc ngày nào cũng có.','Nút “+ Gợi ý” khi lập công thức có sẵn những lúc quen thuộc ở JPC.'],
  todo:'Hôm nay: xem lại vế “Khi…” trên thẻ của bạn. Đó có phải việc ngày nào cũng có không?', go:['deck','Xem thẻ của tôi']},
 {id:'b3', n:3, t:'Sắp xếp quanh mình', icon:'nang', g:3, kind:'sort',
  c1:'<div class="hw__k">Ý chính</div><p class="lsbig">Việc tốt: để gần, dễ thấy. Việc chưa tốt: để xa, mất công.</p>'+
     '<p>Đừng chỉ dựa vào cố gắng. Sắp xếp chỗ ở, chỗ học để việc tốt dễ làm hơn. Sổ memo trong túi áo thì dễ ghi. Điện thoại nằm cạnh sách thì dễ lướt.</p>'+
     '<p>Người xung quanh cũng là môi trường.</p><div class="quote">“Bệnh lười nó có lây nha.”<small>Thầy Lê Long Sơn</small></div>'+
     '<p>Siêng năng cũng lây. Ngồi gần bạn chăm, mình cũng chăm hơn.</p>'+
     '<div class="lsq">Ở chỗ bạn đang sống, thứ gì đang làm việc tốt khó hơn?</div>',
  dlg:[['s',0,'smile','Phòng anh ở Nhật có 4 người. Tụi anh thống nhất: ngoài giờ gọi về nhà thì nói tiếng Nhật với nhau. Ai quên thì bỏ 100 yên vào hộp chung.'],
       ['shin','think','Vậy có căng quá không anh?'],
       ['s',0,'hi','Không căng đâu, vì cả phòng cùng làm. Ngày nào cũng nghe tiếng Nhật. Ba người trong phòng đỗ N2 ngay khi còn đang thực tập.'],
       ['shin','cheer','Môi trường không chỉ là đồ đạc. Còn là những người ở cạnh mình!']],
  app:['Thẻ 5S một phút: mỗi đồ có chỗ của nó, cần là thấy.','Thẻ Ngủ sớm: cắm sạc điện thoại xa giường. Thẻ Giảm dần: đổi việc chưa tốt bằng việc thay thế.'],
  todo:'Tối nay: đổi chỗ một món đồ để việc tốt dễ làm hơn.', go:['card:5s','Xem thẻ 5S']},
 {id:'b4', n:4, t:'Đừng để hai ngày liền trống', icon:'lua', g:6, kind:'chain',
  c1:'<div class="hw__k">Ý chính</div><p class="lsbig">Lỡ một ngày là chuyện bình thường. Lỡ hai ngày liền là bắt đầu một thói quen mới: thói quen bỏ.</p>'+
     '<p>Sau ngày lỡ, đừng làm bù gấp đôi. Làm phiên bản nhỏ nhất, <b>ngay hôm nay</b>.</p>'+
     '<p>Nhìn thấy tiến bộ cũng giúp giữ nhịp. Mỗi con dấu là một bằng chứng bạn đang thay đổi.</p>'+
     '<div class="lsq">Lần gần nhất bạn bỏ một việc, bạn đã lỡ mấy ngày liền?</div>',
  dlg:[['s',2,'smile','Chị thi N2 trượt mấy lần liền. Có lúc chị muốn bỏ luôn.'],
       ['shin','worry','Điều gì giúp chị không bỏ?'],
       ['s',2,'hi','Chị không cố học bù gấp đôi nữa. Hôm nào mệt thì chỉ làm 1 trang đề. Miễn là không để hai ngày liền trống. Rồi cũng đến ngày chị đỗ.'],
       ['shin','cheer','Ngã bảy lần, đứng dậy tám lần. Quan trọng là lần đứng dậy!']],
  app:['Chuỗi ngày: lỡ 1 ngày chưa mất chuỗi, lỡ 2 ngày liền mới về 0.','Quên đóng dấu thì ghi bù được trong 3 ngày. Thói quen duy trì 7 ngày không làm sẽ thành “mạng nhện”.','Thẻ “khi gặp dịp” (như Nhận góp ý) tính theo số lần: 3, 6, 12 lần. Chọn “Không gặp dịp” thì không bị tính là bỏ lỡ.'],
  todo:'Nếu hôm qua bạn lỡ, hôm nay làm phiên bản nhỏ nhất của thẻ đó.', go:['streak','Xem chuỗi ngày']},
 {id:'b5', n:5, t:'Mỗi con dấu là một lá phiếu', icon:'tim', g:5, kind:'vote',
  c1:'<div class="hw__k">Ý chính</div><p class="lsbig">Đừng chỉ đặt mục tiêu “làm gì”. Hãy chọn “mình muốn trở thành người như thế nào”.</p>'+
     '<p>“Mình muốn dậy sớm” thì dễ bỏ. “Mình là người đúng giờ” thì khó bỏ hơn, vì bỏ là đi ngược với chính mình.</p>'+
     '<p>Mỗi lần làm là một lá phiếu cho con người đó. Không cần hoàn hảo, chỉ cần tuần sau nhiều phiếu hơn tuần trước.</p>'+
     '<div class="quote">“Người ta muốn học, người ta học chứ không ai dạy hết.”<small>Thầy Lê Long Sơn</small></div>'+
     '<div class="ladder"><span>Bị</span><span>Phải</span><span>Muốn</span><span>Thích</span><span>Đam mê</span></div>'+
     '<div class="lsq">Với thói quen bạn đang rèn, bạn đang ở bậc nào? 5–10 năm nữa, bạn muốn người khác nhắc đến mình bằng câu nào?</div>',
  dlg:[['s',4,'smile','Ở Nhật, công ty có giờ tự học buổi tối, không ai đứng giám sát. Có bạn hay vào trễ 5–10 phút vì nghĩ không ai thấy.'],
       ['shin','wow','Vậy có ai biết không chị?'],
       ['s',4,'hi','Người quản lý thấy hết. Người Nhật tin mình từ chính những lúc không ai nhìn.'],
       ['shin','think','Lúc đầu mình làm vì có người nhìn. Làm đủ lâu, mình làm vì mình là người như vậy.']],
  app:['Vế “để trở thành…” trong công thức là con người bạn chọn.','Mỗi con dấu là một lá phiếu. Lên cấp có bạn và thầy cô xác nhận: có người cùng thấy bạn thay đổi.'],
  todo:'Tuần này: mỗi lần đóng dấu, đọc thầm vế “để trở thành…” trên thẻ.', go:['deck','Xem thẻ của tôi']}
];
var LMAP={}; LESSONS.forEach(function(l){ LMAP[l.id]=l; });
var LS_DATA = {
 shrink:{big:'Học tiếng Nhật 2 tiếng mỗi tối', steps:['Học tiếng Nhật 1 tiếng mỗi tối','Học 20 phút sau bữa tối','Ôn 10 từ vựng trước khi ngủ','Mở sổ, đọc 3 từ vựng'],
         lv:['Rất khó giữ','Khó giữ','Tạm được','Dễ giữ','Ngày mệt vẫn làm được'],
         done:'Việc nhỏ đến mức khó từ chối. Làm xong, thường bạn sẽ muốn làm thêm, nhưng không bắt buộc.'},
 cue:{habits:['ôn 3 từ vựng','uống 1 ly nước','xếp giày ngay ngắn'], moments:['vừa thức dậy','bước qua cổng trường','vào lớp, ngồi xuống','tan học','đi làm thêm về','đánh răng buổi tối','về đến cửa chỗ ở']},
 sort:{items:[['Sổ memo và bút','g','Để trong túi áo: cần là ghi ngay.'],['Bình nước','g','Để trên bàn học: nhìn thấy là uống.'],['Giày thể dục','g','Để sát cửa: sáng ra là mang.'],['Điện thoại lúc học','x','Để ngoài tầm tay: bớt lướt giữa chừng.'],['Bánh kẹo, nước ngọt','x','Cất vào tủ: muốn ăn phải mất công.'],['Sạc điện thoại','x','Cắm xa giường: tối khỏi lướt khuya.']]},
 chain:{q:'Hôm qua bạn lỡ. Hôm nay bạn làm gì?', o:['Đợi sang đầu tuần rồi bắt đầu lại.','Làm phiên bản nhỏ nhất, ngay hôm nay.','Hôm nay làm gấp đôi để bù.'], ok:1,
        ex:'Làm nhỏ thôi, nhưng làm ngay. Chuỗi được nối lại, và bạn không bị ngợp vì việc gấp đôi.'},
 vote:{who:['người đúng giờ','người giữ lời hứa','người chăm học tiếng Nhật','người biết lo cho sức khỏe'],
       acts:[['Dậy ngay khi báo thức reo',1],['Ôn 5 từ vựng lúc chờ xe',1],['Hứa với bạn rồi quên',0],['Uống 1 ly nước khi vừa thức dậy',1],['Lướt điện thoại đến 1 giờ sáng',0],['Nhắn báo thầy cô khi sắp đến trễ',1]]}
};
var LS=null;
function lessonStrip(){
  var done=LESSONS.filter(function(l){ return S.les[l.id]; }).length;
  return '<div class="sgrp"><div class="deck__h"><h2>5 bài học rèn thói quen</h2><span class="sg__n">'+done+'/5</span></div><div class="strip lstrip">'+
    LESSONS.map(function(l){ var ok=!!S.les[l.id];
      return '<button class="lsn'+(ok?' done':'')+'" data-act="lsOpen" data-v="'+l.id+'"><span class="emb g'+l.g+'">'+glyph('cu_'+l.icon,GCOL[l.g])+'</span><small>BÀI '+l.n+(ok?' · ✓':'')+'</small><b>'+esc(l.t)+'</b></button>'; }).join('')+'</div></div>';
}
function openLesson(id){ LS={id:id, i:0, st:{}, w:(S.les[id]&&S.les[id].w)||''}; openOv(''); drawLesson(); }
function shinMd(m,t){ return (m==='think' && /\?\s*$/.test(t))?'curious':m; }
function talk(lines,v){
  return lines.map(function(d){ if(d[0]==='shin') return say('shin',shinMd(d[1],d[2]),'<b>Shin</b>: '+esc(d[2]));
    return say('senpai'+v,d[1],'<b>'+esc(SENPAI_FACES[v])+'</b>: '+esc(d[2]),'say--sp say--r'); }).join('');
}
function lsDialog(L){
  return '<div class="hw__k">SHIN PHỎNG VẤN SENPAI</div>'+L.dlg.map(function(d){
    if(d[0]==='shin') return say('shin',shinMd(d[1],d[2]),'<b>Shin</b>: '+esc(d[2]));
    return say('senpai'+d[1],d[2],'<b>'+esc(SENPAI_FACES[d[1]])+'</b>: '+esc(d[3]),'say--sp say--r');
  }).join('');
}
function lsApp(L){
  return '<div class="hw__k">Trong app này</div><div class="hwsteps">'+L.app.map(function(a,i){ return '<div class="hws"><i>'+(i+1)+'</i><div><span>'+esc(a)+'</span></div></div>'; }).join('')+'</div>'+
    '<div class="lstodo"><small>LUYỆN NGAY</small>'+esc(L.todo)+'</div>'+
    '<div style="text-align:center;margin-top:10px"><button class="btn btn--soft btn--sm" data-act="lsGo" data-v="'+L.go[0]+'">'+esc(L.go[1])+' ›</button></div>';
}
/* Superseded renderer removed: drawLesson; active implementation is in scripts/interface.js. */
function lsRe(){ var b=$('#lsBox'); if(b) b.innerHTML=lsInter(); }
function lsWrite(lbl,ph){ return '<label class="lbl" for="lsW" style="margin-top:12px">'+lbl+'</label><input class="inp" id="lsW" data-in="lsW" maxlength="80" placeholder="'+esc(ph)+'" value="'+esc(LS.w)+'"><p class="note">Không bắt buộc. Câu này lưu trong Sổ tay của bạn.</p>'; }
function lsInter(){
  var L=LMAP[LS.id], D=LS_DATA[L.kind], st=LS.st, h='';
  if(L.kind==='shrink'){
    var k=st.k||0, cur=k===0?D.big:D.steps[k-1];
    h='<div class="shr"><small>VIỆC CỦA BẠN</small><b>'+esc(cur)+'</b><div class="shr__m"><i style="width:'+((k+1)*20)+'%"></i></div><span>'+esc(D.lv[k])+'</span></div>';
    if(k<D.steps.length) h+='<button class="btn btn--soft btn--wide" data-act="ls" data-v="shrink">Thu nhỏ thêm</button>';
    else h+='<div class="out out--good"><b>Đúng rồi!</b>'+esc(D.done)+'</div>'+lsWrite('Thử thu nhỏ một việc của bạn','Ví dụ: chạy bộ 30 phút → mang giày ra cửa');
  }
  if(L.kind==='cue'){
    st.p=st.p||{}; var all=true;
    h='<p class="small muted" style="margin:0 0 8px">Gắn mỗi việc mới vào một lúc quen trong ngày của bạn.</p>';
    D.habits.forEach(function(hb,i){ if(st.p[i]==null) all=false;
      h+='<div class="cuer"><b>'+esc(hb.charAt(0).toUpperCase()+hb.slice(1))+'</b><div>'+D.moments.map(function(m,j){ return '<button class="chp'+(st.p[i]===j?' on':'')+'" data-act="ls" data-v="cue|'+i+'|'+j+'">'+esc(m)+'</button>'; }).join('')+'</div></div>'; });
    if(all) h+='<div class="out out--good"><b>Đúng rồi!</b>'+D.habits.map(function(hb,i){ return 'Khi '+esc(D.moments[st.p[i]])+', tôi sẽ '+esc(hb)+'.'; }).join('<br>')+'<br><span class="small">Mẹo: việc mới hợp nhất khi diễn ra cùng chỗ với việc quen, như xếp giày ngay lúc về đến cửa.</span></div>';
  }
  if(L.kind==='sort'){
    st.pl=st.pl||{}; var done=Object.keys(st.pl).length===D.items.length;
    h='<p class="small muted" style="margin:0 0 8px">Mỗi món nên để gần hay để xa?</p><div class="sortl">'+D.items.map(function(it,i){ var v=st.pl[i], chk=st.chk, good=v===it[1];
      return '<div class="sortr'+(chk?(good?' good':' bad'):'')+'"><b>'+esc(it[0])+'</b><span><button class="'+(v==='g'?'on':'')+'" data-act="ls" data-v="sort|'+i+'|g">Để gần</button><button class="'+(v==='x'?'on':'')+'" data-act="ls" data-v="sort|'+i+'|x">Để xa</button></span>'+(chk&&good?'<small>'+esc(it[2])+'</small>':'')+'</div>'; }).join('')+'</div>';
    if(!st.chk) h+='<button class="btn btn--soft btn--wide" data-act="ls" data-v="sortchk"'+(done?'':' disabled')+'>Kiểm tra</button>';
    else { var allg=D.items.every(function(it,i){ return st.pl[i]===it[1]; });
      h+= allg ? '<div class="out out--good"><b>Đúng rồi!</b>Việc tốt dễ thấy, dễ lấy. Việc chưa tốt thì phải mất công mới làm được.</div>'
               : '<div class="out out--bad"><b>Thử lại nhé.</b>Xem lại những món chưa đúng.</div><button class="btn btn--gold btn--sm invite" data-act="ls" data-v="sortR">'+ic('redo')+'Thử chọn lại</button>'; }
  }
  if(L.kind==='chain'){
    var days=['y','y','y','y','y','n',''];
    h='<div class="chain">'+days.map(function(m,i){ var lab=WDS[i]; if(i===6 && st.pick===D.ok) m='y'; return '<span class="'+(m||'td')+(i===6&&m==='y'?' pop':'')+'"><i></i>'+lab+'</span>'; }).join('')+'</div>'+
      '<p class="sc" style="margin:10px 0">'+esc(D.q)+'</p>'+
      D.o.map(function(o,i){ var cls='', dis=''; if(st.pick!=null){ dis=' disabled'; if(i===st.pick) cls= i===D.ok?' good':' bad'; } return '<button class="opt'+cls+'" data-act="ls" data-v="chain|'+i+'"'+dis+'><i>'+String.fromCharCode(65+i)+'</i><span>'+esc(o)+'</span></button>'; }).join('');
    if(st.pick!=null) h+= st.pick===D.ok ? '<div class="out out--good"><b>Đúng rồi!</b>'+esc(D.ex)+'</div>'
       : '<div class="out out--bad"><b>Thử lại nhé.</b>Chọn cách giúp bạn nối lại chuỗi ngay hôm nay.</div><button class="btn btn--gold btn--sm invite" data-act="ls" data-v="chainR">'+ic('redo')+'Thử chọn lại</button>';
  }
  if(L.kind==='vote'){
    st.v=st.v||{};
    h='<p class="small muted" style="margin:0 0 6px">Bạn muốn trở thành người như thế nào?</p><div>'+D.who.map(function(w,i){ return '<button class="chp'+(st.who===i?' on':'')+'" data-act="ls" data-v="who|'+i+'">'+esc(w)+'</button>'; }).join('')+'</div>';
    if(st.who!=null){
      var pro=0, con=0;
      h+='<p class="small muted" style="margin:8px 0 6px">Chạm vào việc bạn từng làm. Việc nào là lá phiếu thuận, việc nào là phiếu chống?</p><div class="votel">'+D.acts.map(function(a,i){ var on=!!st.v[i]; if(on){ if(a[1]) pro++; else con++; }
        return '<button class="'+(on?(a[1]?'pro':'con'):'')+'" data-act="ls" data-v="vote|'+i+'"><span>'+esc(a[0])+'</span>'+(on?'<em>'+(a[1]?'Phiếu thuận':'Phiếu chống')+'</em>':'')+'</button>'; }).join('')+'</div>';
      if(pro+con) h+='<div class="vcount"><span class="p">'+pro+' phiếu thuận</span><span class="c">'+con+' phiếu chống</span></div>';
      if(pro+con>=3) h+='<div class="out out--good"><b>Đúng rồi!</b>Không cần hoàn hảo. Chỉ cần phiếu thuận nhiều dần lên mỗi tuần.</div>'+lsWrite('Viết một câu về con người bạn chọn','Mình là '+D.who[st.who]);
    }
  }
  return h;
}
function lsAct(v){
  var p=String(v).split('|'), st=LS.st, L=LMAP[LS.id], D=LS_DATA[L.kind];
  if(p[0]==='shrink'){ st.k=(st.k||0)+1; if(st.k>=D.steps.length) ting(); }
  else if(p[0]==='cue'){ st.p[+p[1]]=+p[2]; var all=true; D.habits.forEach(function(_,i){ if(st.p[i]==null) all=false; }); if(all) ting(); }
  else if(p[0]==='sort'){ st.pl[+p[1]]=p[2]; st.chk=false; }
  else if(p[0]==='sortchk'){ st.chk=true; if(D.items.every(function(it,i){ return st.pl[i]===it[1]; })) ting(); }
  else if(p[0]==='sortR'){ st.chk=false; D.items.forEach(function(it,i){ if(st.pl[i]!==it[1]) delete st.pl[i]; }); }
  else if(p[0]==='chain'){ if(st.pick==null){ st.pick=+p[1]; if(st.pick===D.ok) ting(); } }
  else if(p[0]==='chainR'){ st.pick=null; }
  else if(p[0]==='who'){ st.who=+p[1]; if(!LS.w) LS.w=''; }
  else if(p[0]==='vote'){ st.v[+p[1]]=!st.v[+p[1]]; }
  lsRe();
}
function lsFinish(){
  var L=LMAP[LS.id], first=!S.les[L.id];
  S.les[L.id]={d:dk(), w:(LS.w||'').trim()}; save(true);
  closeOv(); fanfare(); toast(first?'Xong Bài '+L.n+'! Nhớ thử phần “Luyện ngay” nhé.':'Đã lưu Bài '+L.n+'.');
  var nx=LESSONS[L.n]; LS=null;
  if(nx && !S.les[nx.id]) setTimeout(function(){ openStore(false); },700); else render();
}
function lsGo(v){
  var L=LMAP[LS.id]; if(!S.les[L.id]){ S.les[L.id]={d:dk(), w:(LS.w||'').trim()}; save(true); }
  closeOv(true); LS=null;
  if(v==='deck'){ PG=0; render(); window.scrollTo(0,0); if(!handList().length) openStore(false); }
  else if(v==='streak'){ render(); openStreak(); }
  else if(v.indexOf('card:')===0){ render(); openCard(v.slice(5)); }
}

/* ---------- TQ14 · Shin nhận xét Thẻ tuần ---------- */
function shinWeek(ws){
  var ci=checkinWeek31(ws),list=weekIds31(ws),lines=[],t=dk(),isNow=ws===wkStart(t),daily=list.filter(function(id){return !isDip(id);}),occasional=list.filter(isDip);
  lines.push(ci.count?'Bạn đã check-in '+ci.count+'/'+ci.eligible+' ngày trong tuần này.':isNow?'Tuần này chưa có ngày check-in được lưu. Bạn có thể bắt đầu từ hôm nay.':'Tuần này chưa có ngày check-in được lưu.');
  var ranked=daily.map(function(id){return {id:id,n:weekStats31(id,ws).practiced};}).sort(function(a,b){return b.n-a.n;});if(ranked.length&&ranked[0].n)lines.push(sname(ranked[0].id)+' có thực hiện '+ranked[0].n+' ngày.');
  if(occasional.length)lines.push('Thẻ khi gặp dịp được nhìn theo các dịp đã ghi nhận, không so với đủ 7 ngày.');
  var we=addD(ws,6),milestones=milestoneItems31().filter(function(a){return a.date>=ws&&a.date<=we&&a.id;});if(milestones.length)lines.push('Có '+milestones.length+' mốc tiến bộ được lưu trong tuần.');
  return {text:lines.join(' '),mood:ci.count?'proud':'hi'};
}
function openWeek(ws){ WK=ws; S.week[ws]=S.week[ws]||{rate:{},win:'',buddy:''}; openOv(''); drawWeek(); }
function drawWeek(){
  var ws=WK, w=S.week[ws], t=dk(), list=weekIds31(ws);
  var tst=null; S.tstamps.forEach(function(x){ if(x.w===ws) tst=x; });
  var h='<div class="sh__h"><button class="back" data-act="wkNav" data-v="-7" aria-label="Tuần trước">'+ic('back')+'</button><b style="flex:1;text-align:center">Tuần '+dm(ws)+' – '+dm(addD(ws,6))+'</b>'+
    (ws<wkStart(t)?'<button class="back" data-act="wkNav" data-v="7" aria-label="Tuần sau" style="transform:scaleX(-1)">'+ic('back')+'</button>':'')+'<button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div>';
  var SW8=shinWeek(ws);
  h+='<div class="wk"><div class="wk__h"><div style="width:52px;flex:none">'+shin(SW8.mood)+'</div><div><h2>Thẻ tuần</h2><small>'+esc(S.name)+(S.cls?' · Lớp '+esc(S.cls):'')+'</small></div></div>';
  h+='<div class="wkshin"><small>SHIN NHẬN XÉT</small><p>'+esc(SW8.text)+'</p></div>';
  h+='<div class="wlegend"><span><i class="wcell y"></i>Làm rồi</span><span><i class="wcell p"></i>Một phần</span><span><i class="wcell n"></i>Chưa làm</span><span><i class="wcell x"></i>Không gặp dịp</span><span><i class="wcell"><i class="bfdot"></i></i>Ghi bù</span></div>';
  if(!list.length) h+='<p>Chưa có thói quen nào.</p>';
  list.forEach(function(id){
    var cnt=weekStats31(id,ws).practiced;
    h+='<div class="wk__hb"><h3>'+hico(id,'sm')+esc(sname(id))+' <span class="small" style="color:#686E76;font-weight:600;margin-left:auto">'+(isDip(id)?(weekStats31(id,ws).opportunities?cnt+'/'+weekStats31(id,ws).opportunities+' dịp':'Chưa ghi nhận dịp'):cnt+' ngày có thực hiện')+'</span></h3><p class="week-count-description31">'+esc(weekDescription31(id,ws))+(weekSecondary31(id,ws)?' · '+esc(weekSecondary31(id,ws)):'')+'</p><div class="days">';
    for(var c2=0;c2<7;c2++){ var d=addD(ws,c2), m=mark(d,id), bf=(S.bf[d]||{})[id]; h+='<div><div class="wcell '+dayStatus(d,id)+(d===t?' today':'')+'">'+(bf?'<i class="bfdot" title="Ghi bù"></i>':'')+'</div>'+WDS[c2]+'</div>'; }
    h+='</div>';
    var nl=[]; for(var c3=0;c3<7;c3++){ var d3=addD(ws,c3), nt=(S.notes[d3]||{})[id]; if(nt) nl.push('<li><b>'+WDS[c3]+'</b>'+esc(nt)+'</li>'); }
    h+=(nl.length?'<ul class="wnotes">'+nl.join('')+'</ul>':'<p class="wnotes muted">Chưa có ghi chú.</p>')+'</div>';
  });
  h+='<label class="lbl" for="wkWin" style="color:#52565C;margin-top:10px">Thắng nhỏ đáng nhớ nhất tuần</label><input class="inp" id="wkWin" data-in="wkWin" placeholder="Ví dụ: Lần đầu chào cô bằng tiếng Nhật" value="'+esc(w.win)+'">';
  h+='<div class="verif"><div>'+(w.buddy?hanko('f')+'<b>'+esc(w.buddy)+'</b>đã xem':'<b>Bạn cùng tiến</b><input class="inp" id="wkBud" placeholder="Tên bạn" style="font-size:14px;padding:8px 10px"><button class="btn btn--soft btn--sm" data-act="buddy">Xác nhận</button>')+'</div>'+
    '<div>'+(tst?hanko('t')+'<b>Con dấu thầy cô</b>'+dm(tst.d):'<b>Con dấu thầy cô</b><input class="inp" id="wkCode" placeholder="Mã thầy cô đọc" style="font-size:14px;padding:8px 10px;text-transform:uppercase"><button class="btn btn--soft btn--sm" data-act="tcode">Nhận dấu</button>')+'</div></div></div>';
  h+='<button class="btn btn--wide" style="margin-top:14px" data-act="wkImg">'+ic('down')+'Lưu ảnh thẻ tuần</button>';
  h+='<p class="note center" style="margin-top:8px">Trình thẻ này trên lớp mỗi tuần.</p>';
  sheetSet(h); OV.querySelector('.sheet').classList.add('shin-week-sheet');
}
function wkImage(){
  var ws=WK, w=S.week[ws], list=weekIds31(ws), W=1080, Hh=Math.max(1550,1100+list.reduce(function(sum,id){var n=0;for(var z=0;z<7;z++)if((S.notes[addD(ws,z)]||{})[id])n++;return sum+280+Math.min(n,3)*42;},0)+Math.max(0,Math.ceil((w.win||'').length/46)-2)*44);
  var shareLines16=(document.querySelector('#shareReview16:checked') ? reviewLines16(ws) : []), extra16=shareLines16.length?110+shareLines16.length*80:0; Hh+=extra16; var cv=document.createElement('canvas'); cv.width=W; cv.height=Hh; var x=cv.getContext('2d');
  var F='"Roboto Flex",system-ui,sans-serif', J='"Noto Sans JP","Hiragino Sans",sans-serif';
  x.fillStyle='#FBF7EC'; x.fillRect(0,0,W,Hh);
  x.fillStyle='rgba(150,120,60,.07)'; for(var i=0;i<W;i+=18){ for(var j=0;j<Hh;j+=18){ x.fillRect(i,j,3,3); } }
  x.fillStyle='#136F7E'; x.fillRect(0,0,W,16);
  x.fillStyle='#1A1A1A'; x.font='800 54px '+F; x.fillText('Thẻ tuần · '+APP_NAME,70,120);
  x.font='500 34px '+F; x.fillStyle='#686E76'; x.fillText(S.name+(S.cls?' · Lớp '+S.cls:'')+' · Tuần '+dm(ws)+' – '+dm(addD(ws,6)),70,176);
  x.font='500 30px '+F;var reviewText31=shinWeek(ws).text,summaryLines31=canvasLines31(x,reviewText31,W-160),summaryHeight31=Math.max(210,98+summaryLines31.length*42);
  var y=250;
  x.fillStyle='rgba(255,255,255,.7)'; rr(x,50,y-10,W-100,summaryHeight31,28); x.fill();
  x.fillStyle='#136F7E'; x.font='700 26px '+F; x.fillText('SHIN NHẬN XÉT',80,y+34);
  x.fillStyle='#1A1A1A'; x.font='500 30px '+F; var yb=wrapT(x,reviewText31,80,y+80,W-160,42);y+=summaryHeight31+20;
  function stamp(cx,cy,r,kind){ var c=kind==='p'?'#E58A1F':kind==='f'?'#16A874':'#C8372D', t=kind==='p'?'少し':kind==='t'?'先生':kind==='f'?'友':'よし';
    x.save(); x.translate(cx,cy); x.rotate(-0.14); x.strokeStyle=c; x.lineWidth=r*.11; x.beginPath(); x.arc(0,0,r,0,Math.PI*2); x.stroke();
    x.globalAlpha=.1; x.fillStyle=c; x.beginPath(); x.arc(0,0,r*.82,0,Math.PI*2); x.fill(); x.globalAlpha=1;
    x.fillStyle=c; x.font='700 '+Math.round(r*(t.length>1?0.6:0.85))+'px '+J; x.textAlign='center'; x.textBaseline='middle'; x.fillText(t,0,2); x.restore(); x.textAlign='left'; x.textBaseline='alphabetic'; }
  list.forEach(function(id){
    var nts=[]; for(var q=0;q<7;q++){ var nq=(S.notes[addD(ws,q)]||{})[id]; if(nq) nts.push(WDS[q]+': '+nq); } nts=nts.slice(-3);
    x.fillStyle='rgba(255,255,255,.7)'; rr(x,50,y,W-100,250+nts.length*42,28); x.fill();
    x.fillStyle='#1A1A1A'; x.font='700 38px '+F; x.fillText(hname(id),80,y+58);
    x.fillStyle='#52565C';x.font='500 24px '+F;x.fillText(weekDescription31(id,ws),80,y+94);
    for(var c=0;c<7;c++){ var cx=120+c*130, cy=y+166, m=addD(ws,c)>dk()?'':mark(addD(ws,c),id);
      if(m){ x.fillStyle=STATUS_COLORS[m]||'#E1E5E9'; x.beginPath(); x.arc(cx,cy,40,0,Math.PI*2); x.fill(); }
      else { x.strokeStyle='#D9CBA7'; x.lineWidth=3; x.beginPath(); x.arc(cx,cy,40,0,Math.PI*2); x.stroke(); }
      if((S.bf[addD(ws,c)]||{})[id]){ x.fillStyle='#4A4F5E'; x.beginPath(); x.arc(cx+30,cy-30,8,0,Math.PI*2); x.fill(); }
      x.fillStyle='#686E76'; x.font='600 22px '+F; x.textAlign='center'; x.fillText(WDS[c],cx,cy+76); x.textAlign='left'; }
    x.fillStyle='#4A4F5E'; x.font='500 26px '+F; nts.forEach(function(s,qi){ x.fillText(short(s,62),80,y+277+qi*42); });
    y+=280+nts.length*42;
  });
  x.fillStyle='#52565C'; x.font='600 30px '+F; x.fillText('Thắng nhỏ tuần này:',70,y+30);
  x.fillStyle='#1A1A1A'; x.font='500 32px '+F; wrapT(x, w.win||'…', 70, y+80, W-140, 44);
  var tst=null; S.tstamps.forEach(function(s){ if(s.w===ws) tst=s; });
  if(shareLines16.length){var sy16=Hh-230-extra16;x.fillStyle='#173F79';x.font='600 28px '+F;x.fillText('Nhịp ghi nhận trong tuần · Chủ động chia sẻ',70,sy16);x.fillStyle='#52565C';x.font='400 22px '+F;shareLines16.forEach(function(line,i){wrapT(x,line,70,sy16+50+i*80,W-140,30);});} var by=Hh-190;
  if(w.buddy){ stamp(140,by,60,'f'); x.fillStyle='#1A1A1A'; x.font='600 28px '+F; x.fillText('Bạn cùng tiến: '+short(w.buddy,22),220,by+10); }
  if(tst){ stamp(W-160,by,60,'t'); x.fillStyle='#1A1A1A'; x.font='600 28px '+F; x.textAlign='right'; x.fillText('Con dấu thầy cô',W-240,by+10); x.textAlign='left'; }
  x.fillStyle='#686E76';x.font='500 19px '+F;x.fillText('Xanh: đã làm · Vàng: một phần · Cam: chưa làm · Xám: không gặp dịp',70,Hh-90);
  x.fillStyle='#686E76'; x.font='500 22px '+F; x.fillText(APP_NAME+' · '+APP_VER,70,Hh-40);
  try{ cv.toBlob(function(b){ if(!b){ toast('Chưa lưu được ảnh. Bạn chụp màn hình thẻ này nhé.'); return; }
    var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='The-tuan-'+ws+'.png'; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },800); toast('Đã lưu ảnh thẻ tuần vào máy.'); },'image/png'); }
  catch(e){ toast('Chưa lưu được ảnh. Bạn chụp màn hình thẻ này nhé.'); }
}
function rr(x,a,b,w,h,r){ x.beginPath(); x.moveTo(a+r,b); x.arcTo(a+w,b,a+w,b+h,r); x.arcTo(a+w,b+h,a,b+h,r); x.arcTo(a,b+h,a,b,r); x.arcTo(a,b,a+w,b,r); x.closePath(); }
function canvasLines31(ctx,text,width){var lines=[],line='';String(text).split(/\s+/).forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);return lines;}
function wrapT(x,t,a,b,maxW,lh){ var ws=t.split(' '), line=''; for(var i=0;i<ws.length;i++){ var tt=line+ws[i]+' '; if(x.measureText(tt).width>maxW && line){ x.fillText(line,a,b); line=ws[i]+' '; b+=lh; } else line=tt; } x.fillText(line,a,b); return b; }

function tName(){ return S.teacher!=null&&TEACHERS[S.teacher] ? TEACHERS[S.teacher][0] : ''; }
function tPron(){ var n=tName(); return n ? (n.indexOf('Thầy')===0?'thầy':'cô') : 'thầy cô'; }
function reportMsg(){
  var a=activeIds().map(hname).join(', ');
  return 'Em chào '+(tName()||'thầy cô')+'. Em là '+S.name+(S.cls?', lớp '+S.cls:'')+'.\n'+
    'Em gửi nhật ký rèn luyện thói quen trên app '+APP_NAME+': em đang rèn '+(a||'…')+'; đã check-in '+ciDays()+' ngày, chuỗi hiện tại '+streak()+' ngày.\n'+
    'Em gửi kèm file PDF nhật ký để '+tPron()+' theo dõi ạ. Em cảm ơn '+tPron()+' ạ!';
}
function nbRep(){
  var t=tName();
  var h='<div class="card" style="margin:10px 0"><h3>Thẻ tuần</h3><p class="muted small" style="margin:4px 0 10px">Trình trên lớp mỗi tuần.</p><button class="btn btn--soft btn--sm" data-act="week" data-v="'+wkStart()+'">'+ic('img')+'Mở Thẻ tuần</button></div>';
  h+='<div class="card" style="margin:10px 0"><h3>Báo cáo cuối học phần</h3><p class="muted small" style="margin:4px 0 0">Tự báo cáo, không đợi ai nhắc (Hō-Ren-Sō).</p>'+
    '<ol class="steps" style="margin-top:10px"><li><b>Lưu nhật ký thành PDF</b>Trong hộp in, chọn “Lưu thành PDF”.<div style="margin-top:8px"><button class="btn btn--soft btn--sm" data-act="print">'+ic('print')+'Mở bản in</button></div></li>'+
    '<li><b>Gửi '+(t?esc(t):'thầy cô')+' qua Teams</b>Tin nhắn soạn sẵn. Bạn chạm ghim để đính kèm file PDF.'+
    (t?'<div class="row row--wrap" style="margin-top:8px"><a class="btn btn--sm" href="'+teamsURL(TEACHERS[S.teacher][1],reportMsg())+'" target="_blank" rel="noopener" data-act="teamsGo">'+ic('send')+'Mở Teams</a><button class="btn btn--soft btn--sm" data-act="copyMsg">'+ic('copy')+'Chép tin nhắn</button></div>':'<div style="margin-top:8px">'+teacherSelect('repT')+'</div>')+'</li></ol></div>';
  return h;
}
function teamsURL(email,msg){ return 'https://teams.microsoft.com/l/chat/0/0?users='+encodeURIComponent(email)+'&message='+encodeURIComponent(msg); }
/* ---------- Lịch ---------- */
function appUrl(){ return location.href.split('#')[0]+'#checkin'; }
function ciStart(){ var p=(S.ciTime||'21:00').split(':'), d=new Date(); d.setHours(+p[0],+p[1],0,0); if(d<new Date()) d.setDate(d.getDate()+1); return d; }
function icsDate(d){ return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+pad(d.getUTCMinutes())+'00Z'; }
function gcalUrl(){ var s=ciStart(), e=new Date(s.getTime()+5*60000);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Check-in tối · '+APP_NAME)+'&dates='+icsDate(s)+'/'+icsDate(e)+'&recur='+encodeURIComponent('RRULE:FREQ=DAILY')+'&details='+encodeURIComponent('30 giây nhìn lại hôm nay. Mở app: '+appUrl()); }
function icsFile(){
  var s=ciStart(), e=new Date(s.getTime()+5*60000);
  var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Proskills//KaizenMoiNgay//VI','BEGIN:VEVENT','UID:kzmn-ci-'+Date.now()+'@proskills','DTSTAMP:'+icsDate(new Date()),'DTSTART:'+icsDate(s),'DTEND:'+icsDate(e),'RRULE:FREQ=DAILY',
    'SUMMARY:Check-in tối · '+APP_NAME,'URL:'+appUrl(),'DESCRIPTION:30 giây nhìn lại hôm nay. Mở app: '+appUrl(),'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:Đến giờ check-in rồi!','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); a.download='Nhac-check-in.ics'; document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },800);
  S.ciCal=true; save(); toast('Mở tập tin vừa tải, chọn “Thêm tất cả” để lưu vào Lịch.',5500);
}
function calSmart(){
  var s=ciStart(), e=new Date(s.getTime()+5*60000), title='Check-in tối · '+APP_NAME, desc='30 giây nhìn lại hôm nay. Mở app: '+appUrl();
  S.ciCal=true; save();
  if(isIOS()){ icsFile(); return; }
  if(/Android/i.test(navigator.userAgent||'')){
    location.href='intent://#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;S.title='+encodeURIComponent(title)+';S.description='+encodeURIComponent(desc)+';l.beginTime='+s.getTime()+';l.endTime='+e.getTime()+';S.rrule='+encodeURIComponent('FREQ=DAILY')+';S.browser_fallback_url='+encodeURIComponent(gcalUrl())+';end';
    return;
  }
  window.open(gcalUrl(),'_blank','noopener');
}
function calPrompt(fromStart){
  openMini('<div class="center"><div style="width:110px;margin:0 auto">'+shin('wow')+'</div><h2 style="margin:6px 0">Đặt lời nhắc check-in tối?</h2><p class="muted">Mỗi tối lịch điện thoại nhắc bạn lúc <b>'+esc(S.ciTime)+'</b>. Chạm vào lời nhắc là vào thẳng màn hình check-in.</p></div>'+
    '<div class="stack"><button class="btn btn--wide" data-act="calSmart">'+ic('cal')+'Lưu vào lịch điện thoại</button><button class="btn btn--ghost btn--wide" data-act="close">Để sau</button></div><p class="note center">Android mở thẳng ứng dụng Lịch; iPhone mở bảng “Thêm vào Lịch”.</p>'+
    '<p class="note center" style="margin-top:8px">Đổi giờ nhắc trong Sổ tay › Cài đặt.</p>');
}

/* ---------- Sao lưu ---------- */
function bkDays(){ return diffD(S.lastBackup||S.created||dk(),dk()); }
function bkDue(){ if(DEMO) return false; if(S.bkSnooze && dk()<S.bkSnooze) return false; return bkDays()>=7; }
function backup(){
  syncTree();
  try{var old=S.lastBackup;S.lastBackup=dk();S.bkSnooze='';var data=JSON.parse(JSON.stringify(S));var envelope={format:'shin-routine-backup',schema:1,appVersion:APP_VER,exportedAt:new Date().toISOString(),data:data};downloadData32(JSON.stringify(envelope,null,2),'Shin-ban-sao-'+(noMark(S.name).replace(/[^a-zA-Z0-9-]+/g,'-')||'hoc-vien')+'-'+dk()+'.json');save(true);renderTop();refreshAll();toast('Đã tạo file bản sao. Hãy giữ file vừa tải.');}catch(e){S.lastBackup=old;toast('Chưa tạo được bản sao. Bạn thử lại nhé.');}
}
function previewRestore32(parsed){
  var d=parsed&&parsed.format==='shin-routine-backup'?parsed.data:parsed;validateState32(d);var candidate=migrate(Object.assign(defState(),JSON.parse(JSON.stringify(d)),{compactUI33:!!d.compactUI33}));RESTORE_PENDING32=candidate;
  var tree={};Object.keys(candidate.treeCards||{}).forEach(function(k){tree[k]=true;});Object.keys(candidate.habits).forEach(function(k){if(candidate.habits[k].lv>=2)tree[k]=true;});
  openOv('<div class="sh__h"><b>Khôi phục bản sao</b><button class="x" data-act="restoreCancel32" aria-label="Hủy khôi phục">'+ic('x')+'</button></div><div class="restore-review32"><small>BẠN SẮP MỞ LẠI BÀI LÀM CỦA</small><h2>'+esc(candidate.name||'Học viên')+'</h2><p>'+esc(candidate.cls||'Chưa có thông tin lớp')+' · '+esc(candidate.ver||'Bản trước')+'</p><div class="restore-counts32"><div><b>'+Object.keys(candidate.habits).length+'</b><span>Thẻ đã rèn</span></div><div><b>'+Object.keys(candidate.ci).length+'</b><span>Ngày check-in</span></div><div><b>'+Object.keys(tree).length+'</b><span>Thẻ trên cây</span></div></div><p>Bài làm hiện tại sẽ được thay bằng bản sao này. Trước khi thay, app giữ một bản dự phòng trên máy.</p>'+(DEMO?'<p>Bạn đang ở chế độ Demo. Thao tác này chỉ thay dữ liệu Demo.</p>':'')+'</div><div class="sbar"><button class="btn btn--ghost" data-act="restoreCancel32">Hủy</button><button class="btn" data-act="restoreApply32">Khôi phục</button></div>',true);
}
function restore(f){if(!f)return;if(f.size>20*1024*1024){toast('Tập tin quá lớn để mở. Hãy chọn đúng bản sao của Shin.');return;}var r=new FileReader();r.onload=function(){try{previewRestore32(JSON.parse(r.result));}catch(e){RESTORE_PENDING32=null;toast(e.message||'Tập tin này không phải bản sao hợp lệ.');}};r.onerror=function(){toast('Chưa đọc được tập tin. Bạn thử chọn lại nhé.');};r.readAsText(f);}
function applyRestore32(){
  if(!RESTORE_PENDING32)return;var candidate=RESTORE_PENDING32,key=DEMO?KEY_DEMO:KEY;
  try{var old=localStorage.getItem(key);if(old)localStorage.setItem(key+'-before-restore',old);candidate.saved=Date.now();candidate.ver=APP_VER;localStorage.setItem(key,JSON.stringify(candidate));}catch(e){toast('Chưa lưu được bản khôi phục. Bài làm hiện tại vẫn được giữ nguyên.');return;}
  CI=null;NT=null;ST=null;RETCI=null;CARD=null;RESTORE_PENDING32=null;LOAD_ISSUE32=null;RAW_RECOVERY32='';SAVE_BLOCK=false;closeOv(true);S=candidate;regCustom();syncTree();save(true);PG=0;JOURNAL_HABIT31='all';JOURNAL_MODE31='day';JOURNEY_TAB31='week';KPI_LAST=kpiValues();render();window.scrollTo(0,0);toast('Đã khôi phục bài làm.');
}
function previousRestore32(){try{var raw=localStorage.getItem((DEMO?KEY_DEMO:KEY)+'-before-restore');if(!raw){toast('Chưa có bản trước lần khôi phục.');return;}previewRestore32(JSON.parse(raw));}catch(e){toast('Chưa đọc được bản dự phòng này.');}}
function hasPrevious32(){try{return !!localStorage.getItem((DEMO?KEY_DEMO:KEY)+'-before-restore');}catch(e){return false;}}

function enterDemo(){ try{ localStorage.setItem(KEY_MODE,'demo'); localStorage.removeItem(KEY_DEMO); }catch(e){} location.hash=''; location.reload(); }
function exitDemo(){ SAVE_BLOCK=true; try{ localStorage.removeItem(KEY_DEMO); localStorage.removeItem(KEY_MODE); }catch(e){} location.hash=''; location.reload(); }
function demoBar(){ var b=$('#demoBar'); document.body.classList.toggle('demo',DEMO); if(DEMO){ if(!b){ b=document.createElement('div'); b.id='demoBar'; b.className='demobar'; b.innerHTML='<span>Demo giáo viên</span><button data-act="demoExit">Thoát demo</button>'; document.body.appendChild(b); } } else if(b) b.remove(); }

function copyText(t,ok){
  var done=function(){ toast(ok||'Đã chép.',5000); };
  if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(t).then(done,function(){ fbCopy(t); done(); }); } else { fbCopy(t); done(); }
}
function fbCopy(t){ var a=document.createElement('textarea'); a.value=t; a.style.position='fixed'; a.style.opacity='0'; document.body.appendChild(a); a.select(); try{ document.execCommand('copy'); }catch(e){} a.remove(); }
document.addEventListener('keydown',function(e){
  if(e.key==='Escape' && OV){if(LETTER_FLOW37){e.preventDefault();e.stopImmediatePropagation();letterBack37();return;}if(HABIT_RETURN33){e.preventDefault();e.stopImmediatePropagation();restoreHabit33();return;}if(TREE_DETAIL30){e.preventDefault();e.stopImmediatePropagation();treeBack30();return;}closeOv();render();}
  if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-act="treeCard30"][role="button"],[data-act="letterRead37"][role="button"]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
  if((e.key==='Enter'||e.key===' ') && e.target.classList && e.target.classList.contains('plot')){ e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click',{bubbles:true})); }
});

/* =========================================================
   SỰ KIỆN
   ========================================================= */
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-act]'); if(!el) return;
  var a=el.getAttribute('data-act'), v=el.getAttribute('data-v');
  switch(a){
    case 'stampPending37': openPendingStamps37();break;
    case 'stampOpen37': var sr37=(S.stampLetters||{})[v];if(sr37)openStamp37(+v,String(sr37.draft||'').trim()?'compose':'gift');break;
    case 'stampWrite37': openStamp37(+v,'compose',el.getAttribute('data-habit'));break;
    case 'letterCompose37': if(LETTER_FLOW37){LETTER_FLOW37.mode='compose';drawLetter37();}break;
    case 'letterSeal37': sealLetter37();break;
    case 'letterBack37': letterBack37();break;
    case 'letterRead37': if((S.stampLetters||{})[v]&&S.stampLetters[v].letter)openStamp37(+v,'read');break;
    case 'habitTab33': if(CARD&&(v==='card'||v==='journal')){CARD.tab=v;drawCard();}break;
    case 'habitMore33': if(CARD){CARD.timelineLimit=(CARD.timelineLimit||6)+6;var hs=$('.sheet').scrollTop;drawCard();$('.sheet').scrollTop=hs;}break;
    case 'journalSaved33': JOURNAL_MODE31=JOURNAL_MODE31==='saved'?'day':'saved';JOURNAL_HABIT31='all';JOURNAL_LIMIT31=20;renderPage();window.scrollTo(0,0);break;
    case 'journalWeek33': var jd33=addD(JDAY||dk(),7*(+v));jd33=jd33>dk()?dk():jd33<S.created?S.created:jd33;JDAY=jd33===dk()?null:jd33;renderPage();window.scrollTo(0,0);break;
    case 'homeView': if(v==='cards'||v==='list'){S.homeView=v;save(true);var homeTop=window.scrollY;renderPage();window.scrollTo(0,homeTop);var hv=$('[data-act="homeView"][data-v="'+v+'"]');if(hv)hv.focus({preventScroll:true});} break;
    case 'quickStamp': var qp=v.split('|');quickStamp29(qp[0],qp[1]);break;
    case 'undoRecord': undoRecord29(v);break;
    case 'recordNote': var rn=v.split('|');$('#toast').classList.remove('show');openNote(rn[0],rn[1]);if(NT){NT.open=true;drawNote29();var nd=$('.record-note-extra');if(nd)nd.open=true;}break;
    case 'recordAnswer': if(NT){NT.ans=v.split('|')[1];drawNote29();}break;
    case 'recordWhy': if(NT){NT.why=NT.why===v?'':v;$$('[data-act="recordWhy"]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-v')===NT.why);});}break;
    case 'recordRemove': if(NT&&mark(NT.day,NT.id)){var ri=NT.id,rd=NT.day;writeRecord(ri,rd,'',undefined,undefined);closeOv(true);NT=null;recordFeedback(ri,rd,true);}break;
    case 'ciNoteChip34': if(CI&&!CI.done){var cp34=v.split('|'),cid34=cp34[0],ct34=cp34.slice(1).join('|'),old34=String(CI.notes[cid34]||'').trim();CI.notes[cid34]=old34?old34+', '+ct34.toLowerCase():ct34;var ci34=$('#ci-note-'+cid34);if(ci34)ci34.value=CI.notes[cid34];updateCIFooter34();stashCI29();}break;
    case 'ciAnswer29': if(CI&&!CI.done){var ca=v.split('|');CI.ans[ca[0]]=ca[1];delete CI.skip[ca[0]];ciRefresh29();}break;
    case 'ciKeepExisting29': if(CI&&!CI.done){CI.ans[v]=CI.base[v];CI.notes[v]=(S.notes[CI.date]||{})[v]||'';CI.why[v]=(S.why[CI.date]||{})[v]||'';delete CI.edit[v];delete CI.skip[v];ciRefresh29();}break;
    case 'ciSkip29': if(CI&&!CI.done){var was=CI.skip[v];delete CI.ans[v];CI.skip[v]=!was;ciRefresh29();}break;
    case 'ciRest29': if(CI&&!CI.done){CI.all.forEach(function(id){if(!CI.ans[id])CI.skip[id]=true;});ciRefresh29();}break;
    case 'ciEdit29': if(CI&&!CI.done){CI.edit[v]=true;ciRefresh29();}break;
    case 'ciWhy29': if(CI&&!CI.done){var cw=v.split('|');CI.why[cw[0]]=CI.why[cw[0]]===cw[1]?'':cw[1];ciRefresh29();}break;
    case 'ciMood29': if(CI&&!CI.done){CI.mood=CI.mood===v?null:v;CI.moodTouched=true;ciRefresh29();}break;
    case 'ciKeep29': if(CI&&!CI.done){CI.keep[v]=!CI.keep[v];ciRefresh29();}break;
    case 'ciSave29': ciFinish();break;
    case 'ciHome29': closeOv();PG=0;render();window.scrollTo(0,0);break;

    case 'tab': closeOv(true); go(v); break;
    case 'page': toPage(+v); break;
    case 'slgo': (function(){ var n=CS.length, k=+v; if(k===SLOT) return; var f=$('.cs.cur .flip'); if(f) f.classList.remove('flipped'); SBACK=false; SLOT=k; layoutCards(0,true); $$('#sdots .dd2 button').forEach(function(d,i){ d.classList.toggle('on',i===SLOT); }); })(); break;
    case 'dw': DW=Math.max(0,Math.min(Math.floor(diffD(wkStart(S.created),wkStart(dk()))/7),DW+(+v)));renderPage();window.scrollTo(0,0);break;
    case 'streak': openStreak(); break;
    case 'sm': SM=Math.max(0,SM+(+v)); drawStreak(); break;
    case 'sview': S.storeView=v; save(); drawStore(); break;
    case 'sflt': STF=v; drawStore(); break;
    case 'sgrp': if(STF==='all'){ STOPEN=(STOPEN===+v)?null:+v; STSCROLL=!!STOPEN; drawStore(); } break;
    case 'bkLater': S.bkSnooze=addD(dk(),2); save(true); renderTop(); refreshAll(); toast('Mình nhắc lại sau 2 ngày nhé.'); break;
    case 'jrow': (function(){ var p=v.split('|'), id=p[0], d=p[1], m=mark(d,id);if(!HMAP[id]){journalReadonly31(id,d);return;} if((d===dk()||canBf(d,id)) && H(id) && H(id).status!=='keep'){ openNote(id,d); } else { journalReadonly31(id,d); } })(); break;
    case 'hwNext': HW.i=Math.min(HW.cards.length-1,HW.i+1); drawHow(); break;
    case 'hwPrev': HW.i=Math.max(0,HW.i-1); drawHow(); break;
    case 'prTap': case 'prCheck': case 'prChoose': prAct(a,v); break;
    case 'calSmart': calSmart(); break;
    case 'tokeep': (function(){ var i=S.slots.indexOf(v); if(i>=0) S.slots[i]=null; H(v).status='keep'; save(true); closeOv(true); render(); toast('Thẻ đã sang mục Đang duy trì. Khung này trống cho thẻ mới.',4500); })(); break;
    case 'keeps': openKeeps(); break;
    case 'tierYes': (function(){ var u=H(v), t=HMAP[v].tiers[u.lv-1].replace(/\.$/,''); u.act=t.charAt(0).toLowerCase()+t.slice(1); save(true); closeOv(true); openCard(v); toast('Đã nhận thử thách mới!'); })(); break;
    case 'swapCard': (function(){var p=v.split('|'), i=S.slots.indexOf(p[0]); if(i<0 || !HMAP[p[1]]) return; S.slots[i]=null; H(p[0]).status='pause'; PICK=i; save(true); if(p[2]==='start'){openStart(p[1]);} else {placeInSlot(p[1]);H(p[1]).status='active';save(true);closeOv(true);PG=0;render();toast('Thẻ đã lên tay. Tiến độ thẻ đã cất vẫn được giữ.');}})(); break;
    case 'treeContinue': offerTier(v); break;
    case 'treeView': openJourney31('tree');break;
    case 'journeyTab31': TREE_REPLAY34=v!=='week';JOURNEY_TAB31=v==='week'?'week':'tree';renderPage();window.scrollTo(0,0);break;
    case 'milestoneMore31': MILESTONES_OPEN33=true;MILESTONE_LIMIT31+=20;var mt=window.scrollY;renderPage();window.scrollTo(0,mt);break;
    case 'treeCard30': openTreeCard30(v);break;
    case 'treeBack30': treeBack30();break;
    case 'treeImage30': treeImage30();break;
    case 'treeReflection30': if(S.treeCards[v]){S.treeCards[v].reflection=($('#treeReflection30').value||'').trim();save(true);toast('Đã lưu kỷ niệm.');}break;
    case 'installApp': installApp(); break;
    case 'collection': openCollection(); break;
    case 'tierNo': closeOv(true); openCard(v); break;
    case 'journalMode31': JOURNAL_MODE31=v;JOURNAL_LIMIT31=20;renderPage();window.scrollTo(0,0);break;
    case 'journalStar31': S.journalStars=S.journalStars||{};if(S.journalStars[v])delete S.journalStars[v];else S.journalStars[v]=true;save(true);if(OV&&CARD&&CARD.tab==='journal'){var hsy=$('.sheet').scrollTop;drawCard();$('.sheet').scrollTop=hsy;}else{var jy=window.scrollY;renderPage();window.scrollTo(0,jy);}break;
    case 'journalMore31': JOURNAL_LIMIT31+=20;var jmore=window.scrollY;renderPage();window.scrollTo(0,jmore);break;
    case 'journalGo31': journalOpen31(v);break;
    case 'jday': if(v>=S.created&&v<=dk()){JDAY=v===dk()?null:v;renderPage();}break;
    case 'iosg': iosGuide(); break;
    case 'fs': toggleFS(); break;
    case 'nbopen': openNb(); break;
    case 'coll': openStore(false); break;
    case 'senpai': e.stopPropagation(); openSenpai(v); break;
    case 'obGo': obGo(); break;
    case 'card': closeOv(true); openCard(v); break;
    case 'mcard': closeOv(true); openCard(v); break;
    case 'pick': if(!S.order.length)openFirstChoice32();else openPicker(v==null?null:+v);break;
    case 'firstChoice32': openFirstChoice32();break;
    case 'firstPick32': openFirstForm32(v);break;
    case 'firstStart32': firstStart32();break;
    case 'firstLibrary32': closeOv();openStore(true);break;
    case 'slprev': slideTo(-1); break;
    case 'slnext': slideTo(1); break;
    case 'slotit': if(S.slots.indexOf(null)<0 && S.slots.indexOf(v)<0){ chooseSwap(v,'slotit'); break; } (function(){ if(HMAP[v].custom && S.slots.indexOf(v)<0 && customOnHand()>=MAX_CUSTOM){ toast('Bạn đã có '+MAX_CUSTOM+' thẻ tự tạo trên tay. Cất bớt một thẻ tự tạo trước nhé.',4500); return; } if(placeInSlot(v)===false) return; H(v).status='active'; save(true); closeOv(true); PICK=null; VDAY=null; SBACK=false; PG=0; render(); window.scrollTo(0,0); toast('Thẻ đã lên tay.'); })(); break;
    case 'unslot': (function(){ var i=S.slots.indexOf(v); if(i>=0) S.slots[i]=null; H(v).status='pause'; save(true); closeOv(true); render(); toast('Đã cất thẻ vào Thư viện. Tiến độ vẫn giữ.'); })(); break;
    case 'vday': VDAY = v===dk()?null:v; SBACK=false; render(); break;
    case 'note': var np=v.split('|'); openNote(np[0],np[1]); break;
    case 'ntChip': (function(){ var i=$('#ntIn'); var cur=i.value.trim(); i.value = cur ? cur+', '+v.toLowerCase() : v; NT.text=i.value; ntRefresh(); })(); break;
    case 'ntSave': if(NT) commitStamp(); break;
    case 'flipc': if(e.target.closest('.hold,summary,details,.spk,.spk2,button')) return; if(!S.gFlip){ S.gFlip=1; save(); } CARD.back=!CARD.back; el.classList.toggle('flipped',CARD.back); break;
    case 'how': openHow(v); break;
    case 'review': e.preventDefault(); RETCI=CI; openHow(v); break;
    case 'start': if(S.slots.indexOf(null)<0 && S.slots.indexOf(v)<0){ chooseSwap(v,'start'); break; } closeOv(true); openStart(v); break;
    case 'edit': closeOv(true); if(HMAP[v] && HMAP[v].custom) openCustom(v); else openStart(v,true); break;
    case 'stPrev': ST.i=Math.max(0,ST.i-1); drawStart(); break;
    case 'stNext': stNext(); break;
    case 'stPick': (function(){ var p=v.split('|'); ST.custom[p[0]]=false; ST[{k:'anchor',a:'act',w:'who'}[p[0]]]=p.slice(1).join('|'); drawStart(); if(ST.i<ST.steps.length-1) setTimeout(function(){ if(ST && stState().ok) stNext(); },260); })(); break;
    case 'stCustom': ST.custom[v]=true; drawStart(); setTimeout(function(){ var i=$('#stIn'); if(i) i.focus(); },60); break;
    case 'stBad': ST.bad=v; if(v!=='khac'){ BAD_OPTS.forEach(function(b){ if(b[0]===v) ST.act=b[2]; }); } drawStart(); break;
    case 'stQ': if(ST.pick==null){ ST.pick=+v; var ok=ST.pick===HMAP[ST.id].quiz.ok; if(!ST.first) ST.first=ok?'first':'retry'; if(ok) ting(); drawStart(); } break;
    case 'stRetry': ST.pick=null; drawStart(); break;
    case 'lvup': openLvup(v); break;
    case 'lvGo': lvGo(v); break;
    case 'close': if(HABIT_RETURN33){NT=null;restoreHabit33();break;}PICK=null;NT=null; if(RETCI){ var c=RETCI; RETCI=null; closeOv(true); CI=c; openOv(''); drawCI(); break; } closeOv(); render(); break;
    case 'undone': var up=v.split('|');openNote(up[0],up[1]||dk());break;
    case 'run': (function(){ var u=H(v); if(u.status==='pause'){ u.status='active'; toast('Thẻ chạy lại rồi!'); } else { u.status='pause'; var si=S.slots.indexOf(v); if(si>=0) S.slots[si]=null; toast('Thẻ tạm dừng, đã cất vào Thư viện. Tiến độ vẫn giữ.'); } save(true); refreshAll(); })(); break;
    case 'ev': (function(){ var p=v.split('|'), t=dk(); S.ev[t]=S.ev[t]||{}; var arr=S.ev[t][p[0]]=S.ev[t][p[0]]||[]; var i=arr.indexOf(p[1]); if(i>=0) arr.splice(i,1); else arr.push(p[1]); save(); el.classList.toggle('on'); })(); break;
    case 'speak': speak(v); var pvb=el.closest('.pv'); if(pvb) pvb.classList.add('r'); break;
    case 'ci': closeOv();openCI(v||dk());break;
    case 'week': closeOv(true); openWeek(v); break;
    case 'wkNav': WK=addD(WK,+v); S.week[WK]=S.week[WK]||{rate:{},win:'',buddy:''}; drawWeek(); break;
    case 'rate': var pr=v.split('|'); S.week[WK].rate[pr[0]]=+pr[1]; save(); drawWeek(); break;
    case 'buddy': var bn=$('#wkBud').value.trim(); if(!bn){ $('#wkBud').focus(); return; } S.week[WK].buddy=bn; save(); tone([523.3,784],.4); drawWeek(); break;
    case 'tcode': (function(){ var c=noMark($('#wkCode').value).toUpperCase().replace(/\s+/g,''); if(!c){ $('#wkCode').focus(); return; }
      if(TCODES.indexOf(c)<0){ toast('Mã chưa đúng. Hỏi lại thầy cô nhé.'); return; }
      if(S.tstamps.some(function(s){ return s.c===c; })){ toast('Mã này bạn đã dùng rồi.'); return; }
      S.tstamps.push({c:c,d:dk(),w:WK}); save(); bigStamp('t'); addPts(20,0,'Con dấu thầy cô!'); drawWeek(); })(); break;
    case 'wkImg': wkImage(); break;
    case 'nbTab': NBTAB=v; refreshAll(); break;
    case 'setr': SETOPEN = SETOPEN===v ? '' : v; refreshAll(); break;
    case 'tPin': if($('#tPin').value.trim()===T_PIN){ TMODE=true; refreshAll(); setTimeout(function(){ var i=$('#tName'); if(i) i.focus(); },60); } else toast('PIN chưa đúng.'); break;
    case 'cuNew': PICK=null; closeOv(true); openCustom(); break;
    case 'cuIcon': ST.icon=v; cuRefresh(); break;
    case 'cuRhy': ST.rhy=v; drawStart(); break;
    case 'cuCol': ST.col=+v; cuRefresh(); break;
    case 'cuDel': cuDelete(v); break;
    case 'cuTier': (function(){ var val=($('#cuT').value||'').trim(); if(val.length<2){ toast('Viết việc mới từ 2 chữ, hoặc chọn Giữ việc cũ.'); return; } H(v).act=val; save(true); closeOv(true); openCard(v); toast('Đã lưu việc mới.'); })(); break;
    case 'gtoggle': GOPEN=!gOpen(); gdRefresh(); break;
    case 'guideOff': S.guideOff=true; save(); gdRefresh(); toast('Đã ẩn. Mở lại trong Sổ tay › Làm quen.',4500); break;
    case 'guideOpen': S.guideOff=false;S.guideDone=0;GDSHOW=true;GOPEN=true;save(true);closeOv();openMini('<div id="gdw">'+guideBox()+'</div>');break;
    case 'homeg': homeGuide(); break;
    case 'gHome': S.gHome=1; save(true); closeOv(); render(); toast('Tuyệt! Từ nay mở bằng biểu tượng Shin nhé.'); break;
    case 'flipHome': flipHome(); break;
    case 'flipCard': CARD.back=!CARD.back; var fc=$('#flip'); if(fc) fc.classList.toggle('flipped',CARD.back); if(!S.gFlip){ S.gFlip=1; save(); } break;
    case 'stPause': (function(){ closeOv(true); ST=null; var u=H(v); if(!u) return; u.status='pause'; var si=S.slots.indexOf(v); if(si>=0) S.slots[si]=null; SLOT=0; SBACK=false; save(true); render(); toast('Thẻ tạm dừng, đã cất vào Thư viện. Tiến độ vẫn giữ.'); })(); break;
    case 'sugT': ST.sugOpen=!ST.sugOpen; drawStart(); break;
    case 'sugPick': (function(){ var g=SUG[ST.id][+v]; ST.anchor=g[0]; ST.act=g[1]; ST.who=g[2]; ST.custom={}; ST.sugOpen=false; ST.i=ST.steps.indexOf('w'); drawStart(); ting(); })(); break;
    case 'stSkipQ': (function(){ var qi=ST.steps.indexOf('quiz'); if(qi>=0){ ST.steps.splice(qi,1); if(ST.i>qi) ST.i--; } ST.pick=null; ST.first=ST.first||'later'; if(ST.i>ST.steps.length-1) ST.i=ST.steps.length-1; drawStart(); })(); break;
    case 'lsOpen': closeOv(true); openLesson(v); break;
    case 'lsNext': LS.i=Math.min(3,LS.i+1); drawLesson(); break;
    case 'lsPrev': LS.i=Math.max(0,LS.i-1); drawLesson(); break;
    case 'ls': lsAct(v); break;
    case 'lsDone': lsFinish(); break;
    case 'lsGo': lsGo(v); break;
    case 'spGo': S.introSeen=1; save(true); splashOff(); setTimeout(function(){ var i=$('#obName'); if(i) i.focus(); },500); break;
    case 'noop': break;
    case 'print': buildPrint(); setTimeout(function(){ window.print(); },60); break;
    case 'copyMsg': copyText(reportMsg(),'Đã chép tin nhắn.'); break;
    case 'teamsGo': copyText(reportMsg(),'Đã chép sẵn tin nhắn phòng khi Teams không tự điền.'); break;
    case 'ics': icsFile(); break;
    case 'calDone': S.ciCal=true; save(); break;
    case 'sound': S.sound=!S.sound; save(); refreshAll(); break;
    case 'applyUpdate32': applyUpdate32();break;
    case 'dismissUpdate32': SW_DISMISSED32=true;updateRuntime32();break;
    case 'checkUpdate32': checkUpdate32();break;
    case 'backup': backup();break;
    case 'storageHelp32': storageHelp32();break;
    case 'retrySave32': if(save(true))toast('Đã lưu lại bài làm trên máy.');break;
    case 'restoreApply32': applyRestore32();break;
    case 'restoreCancel32': RESTORE_PENDING32=null;closeOv();render();break;
    case 'restorePrevious32': previousRestore32();break;
    case 'recoveryDownload32': downloadData32(RAW_RECOVERY32,'Shin-du-lieu-can-kiem-tra-'+dk()+'.json');break;
    case 'recoveryNew32': if(confirm('Bắt đầu lại và thay dữ liệu hiện có? Bạn nên xuất dữ liệu trước nếu muốn giữ lại.')){try{localStorage.setItem((DEMO?KEY_DEMO:KEY)+'-before-restore',RAW_RECOVERY32);}catch(e){toast('Chưa tạo được bản dự phòng. Hãy xuất dữ liệu trước.');break;}LOAD_ISSUE32=null;RAW_RECOVERY32='';SAVE_BLOCK=false;S=defState();regCustom();save(true);render();}break;
    case 'wipe': if(confirm('Xóa toàn bộ bài làm trên máy này? Việc này không hoàn tác được.')){ SAVE_BLOCK=true; try{ localStorage.removeItem(KEY); }catch(er){} location.hash=''; location.reload(); } break;
    case 'demoExit': exitDemo(); break;
    case 'cast': (function(){ var p=v.split('|'), arr=CAST[p[0]], i=(+p[1]+1)%arr.length; el.setAttribute('data-v',p[0]+'|'+i); el.querySelector('svg').outerHTML= p[0]==='virus' ? virus(arr[i],'smug') : p[0]==='senpai' ? senpai('smile',+arr[i]) : av(p[0],arr[i]); if(p[0]==='virus') el.querySelector('b').textContent=VIRUS[arr[i]].n; })(); break;
  }
});
document.addEventListener('input',function(e){
  var k=e.target.getAttribute('data-in'); if(!k) return; var v=e.target.value;
  if(k.indexOf('st-')===0){ ST[{k:'anchor',a:'act',w:'who'}[k.slice(3)]]=v; var sc=$('#stCnt'); if(sc) sc.textContent=v.length+'/50'; stRefresh(); }
  else if(k==='stBadO'){ ST.badOther=v; stRefresh(); }
  else if(k==='cuName'){ ST.name=v; var cn=$('#cuName'); if(cn) cn.textContent=v.trim()||'Tên thói quen'; var cc=$('#cuCnt'); if(cc) cc.textContent=v.length+'/30'; stRefresh(); }
  else if(k==='cuWhy'){ ST.why=v; var wc2=$('#cuWc'); if(wc2){ var n2=words(v); wc2.textContent= n2>=3?'✓ '+n2+' chữ':'Từ 3 chữ'; } stRefresh(); }
  else if(k==='lsW'){ if(LS) LS.w=v; }
  else if(k==='note'){ NT.text=v; ntRefresh(); }
  else if(k==='letterDraft37'){letterDraftInput37();}
  else if(k==='ciNote29'){if(CI&&!CI.done){CI.notes[e.target.getAttribute('data-id')]=v;updateCIFooter34();stashCI29();}}
  else if(k==='ciMemo29'){if(CI&&!CI.done){CI.note=v;stashCI29();}}
  else if(k==='ciN'){ CI.notes[CI.list[CI.i]]=v; var s=ciState(), st=$('.sheet .sbar .st'), b=$('.sheet .sbar .btn'); if(st&&b){ st.textContent=s.ok?'✓ Sẵn sàng':s.msg; st.className='st '+(s.ok?'okk':'miss'); b.disabled=!s.ok; } }
  else if(k==='ciNote'){ CI.note=v; var wc=words(v); $('#ciWc').textContent= wc?wc+' chữ':'Không bắt buộc'; var b=$('.sheet [data-act="ciNext"]'); if(b) b.textContent= v.trim()?'Xong':'Bỏ qua'; }
  else if(k==='journeyWin31'){var ws=e.target.getAttribute('data-week');S.week[ws]=S.week[ws]||{rate:{},win:'',buddy:''};S.week[ws].win=v;save();}
  else if(k==='wkWin'){ S.week[WK].win=v; save(); }
  else if(k==='name'){ if(v.trim()){ S.name=v.trim(); save(); } }
  else if(k==='cls'){ S.cls=v.trim(); save(); }
  else if(k==='ciTime'){ if(v){ S.ciTime=v; save(); refreshCheckin36(); $$('a[data-act="calDone"]').forEach(function(x){ x.href=gcalUrl(); }); } }
  else if(k==='prRng'){ PR.val=+v; PR.res=''; var tt=$('.pr__time'); if(tt) tt.textContent=Math.floor(PR.val/60)+':'+pad(PR.val%60); }
  else if(k==='tName'){ $('#tCode').textContent = v.trim().length>1 ? tcodeFor(v,dk()) : '····'; }
});
document.addEventListener('change',function(e){
  if(e.target.id==='journalHabit31'){JOURNAL_HABIT31=e.target.value;JOURNAL_LIMIT31=20;renderPage();return;}
  if(e.target.id==='journalDate31'){var jd=e.target.value;if(jd&&jd>=S.created&&jd<=dk()){JDAY=jd===dk()?null:jd;renderPage();window.scrollTo(0,0);}else{e.target.value=JDAY||dk();}return;}
  if(e.target.getAttribute('data-in')==='teacher'){ var v=e.target.value; S.teacher= v===''?null:+v; save(); if(e.target.id==='repT') render(); }
  if(e.target.id==='restoreF' && e.target.files[0]) restore(e.target.files[0]);
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape' && OV){ closeOv(); render(); }
  if((e.key==='Enter'||e.key===' ') && e.target.classList && e.target.classList.contains('hold') && e.target.getAttribute('data-hold')){ e.preventDefault(); openNote(e.target.getAttribute('data-hold'), e.target.getAttribute('data-day')||dk()); }
});


/* =========================================================
   TQ15 · MÀN HÌNH MỞ ĐẦU
   Lần đầu: intro đầy đủ, có nút vào app. Các lần sau: 1 giây, chỉ lần mở đầu tiên trong ngày.
   Chạm bất kỳ đâu để bỏ qua. Giảm chuyển động: hình tĩnh.
   ========================================================= */
function reduceMotion(){ return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
function orbitSVG(){
  var dots='', i; for(i=0;i<7;i++){ var a=i/7*Math.PI*2-Math.PI/2; dots+='<circle cx="'+(120+Math.cos(a)*112).toFixed(1)+'" cy="'+(120+Math.sin(a)*112).toFixed(1)+'" r="'+(i===0?6:4)+'" fill="'+(i===0?'#F2B21B':'#9EBDEB')+'"/>'; }
  return '<svg class="rings" viewBox="0 0 240 240" aria-hidden="true">'+
    '<g class="r3"><circle cx="120" cy="120" r="112" fill="none" stroke="#D6E3F6" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>'+dots+'</g>'+
    '<g class="r2"><circle cx="120" cy="120" r="90" fill="none" stroke="#C3D6F3" stroke-width="2.2"/><circle cx="120" cy="30" r="5" fill="#2A74DB"/></g>'+
    '<g class="r1"><circle cx="120" cy="120" r="70" fill="none" stroke="#E7D7B0" stroke-width="2" stroke-dasharray="14 10" stroke-linecap="round"/><circle cx="190" cy="120" r="4" fill="#C8372D"/></g></svg>';
}
function hello(){ var h=new Date().getHours(); return h<11?'Chào buổi sáng':h<13?'Chào buổi trưa':h<18?'Chào buổi chiều':'Chào buổi tối'; }
var SPT=null;
function splashOff(){ document.documentElement.classList.remove('growth-starting');var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content='#F9F9FF';var o=$('#splash'); if(!o) return; clearTimeout(SPT); o.classList.add('out'); setTimeout(function(){ if(o.parentNode) o.parentNode.removeChild(o); },460); }
function splashBoot(){
  if(LOAD_ISSUE32||location.hash==='#checkin'){document.documentElement.classList.remove('growth-starting');return;}
  var full=!S.name&&!S.introSeen,o=document.createElement('div');o.id='splash';o.className='splash splash33'+(full?' full':'')+(reduceMotion()?' still':'');o.setAttribute('role','dialog');o.setAttribute('aria-label','Chào mừng đến Shin routine');
  o.innerHTML='<div class="sp__orb">'+orbitSVG()+'<div class="sp__shin">'+shin('hi')+'</div></div><h1 class="sp__t">Shin routine</h1><p class="sp__d">Mỗi ngày, một chút.</p>'+(full?'<button class="btn sp__go" data-act="spGo">Bắt đầu'+ic('arrow')+'</button>':'');
  document.body.appendChild(o);if(!full){o.addEventListener('click',splashOff);SPT=setTimeout(splashOff,2100);}
}

/* =========================================================
   TQ15 · THẺ NGHIÊNG THEO NGÓN TAY (không vệt sáng, tối đa ~4°)
   ========================================================= */
var TILT=null;
function tiltSet(e){ if(!TILT) return; var r=TILT.r, x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
  x=Math.max(-0.5,Math.min(0.5,x)); y=Math.max(-0.5,Math.min(0.5,y));
  TILT.el.style.transform='perspective(900px) rotateX('+(-y*7).toFixed(2)+'deg) rotateY('+(x*8).toFixed(2)+'deg)'; }
function tiltEnd(){ if(!TILT) return; var el=TILT.el; el.style.transition='transform .35s cubic-bezier(.22,.9,.24,1)'; el.style.transform=''; TILT=null; }
if(window.PointerEvent){
  document.addEventListener('pointerdown',function(e){
    if(reduceMotion()) return; var el=e.target.closest && e.target.closest('.cs.cur .flip, .cardview .flip'); if(!el) return;
    if(e.target.closest('button,a,input,textarea,select')) return;
    TILT={el:el, r:el.getBoundingClientRect()}; el.style.transition='transform .12s ease-out'; tiltSet(e);
  });
  document.addEventListener('pointermove',function(e){ if(TILT){ TILT.el.style.transition='transform .06s linear'; tiltSet(e); } },{passive:true});
  ['pointerup','pointercancel'].forEach(function(t){ document.addEventListener(t,tiltEnd,true); });
  window.addEventListener('blur',tiltEnd);
}

/* =========================================================
   KHỞI ĐỘNG
   ========================================================= */

/* TQ25 · nền dịu, nhịp tuần và cây thành tựu */
var STATUS_COLORS={y:'#22A05E',p:'#F2B21B',n:'#E7AE84',x:'#B4BDC8'};
function chooseSwap(id,kind){openMini('<h2 style="font-size:21px;margin:4px 0 8px">Cất thẻ nào để nhường chỗ?</h2><p class="muted small">Bạn đang có đủ 5 thẻ. Thẻ được cất vẫn giữ tiến độ và thành tựu trên cây.</p><div class="slist">'+S.slots.filter(Boolean).map(function(old){return '<button class="srow" data-act="swapCard" data-v="'+old+'|'+id+'|'+kind+'">'+emblem(old,36)+'<span class="sr__b"><b>'+esc(sname(old))+'</b></span><span class="lchip off">Cất thẻ này</span></button>';}).join('')+'</div>');}
function dayStatus(d,id){if(d>dk())return 'future';var m=mark(d,id),u=H(id);return m||((u&&d<u.since)||d<S.created?'notstarted':'unlogged');}
function weekDots(id,ws){ var out='<span class="kdots week-dots" role="img" aria-label="'; var cells='', labels=[]; var names={y:'Hoàn thành',p:'Một phần',n:'Chưa làm',x:'Không gặp dịp',unlogged:'Chưa ghi',notstarted:'Chưa bắt đầu rèn',future:'Chưa tới'}; for(var i=0;i<7;i++){ var d=addD(ws,i), c=dayStatus(d,id), label=dm(d)+': '+names[c]; labels.push(label); cells+='<i class="'+c+'" title="'+label+'"></i>'; } return out+esc(labels.join('; '))+'">'+cells+'</span>'; }
function customArt(id){ var x=HMAP[id], color=GCOL[x.g]||GCOL[5]; return '<svg viewBox="0 0 240 180" aria-hidden="true"><defs><pattern id="mine-'+id+'" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1" fill="white" opacity=".24"/></pattern></defs><rect width="240" height="180" fill="'+color+'"/><rect width="240" height="180" fill="url(#mine-'+id+')"/><circle cx="120" cy="94" r="48" fill="none" stroke="white" opacity=".18"/><circle cx="120" cy="94" r="37" fill="white" opacity=".1"/><svg x="96" y="70" width="48" height="48" viewBox="0 0 24 24">'+cuPaths(x.icon,color)+'</svg></svg>'; }
var TREE_SEQ30=0, TREE_DETAIL30=null;
var TREE_STAGES30=[{name:'Mầm đầu tiên',short:'Mầm',min:0,next:1},{name:'Tre non',short:'Tre non',min:1,next:3},{name:'Vươn lên',short:'Vươn lên',min:3,next:6},{name:'Vững vàng',short:'Vững vàng',min:6,next:11},{name:'Khóm tre',short:'Khóm tre',min:11,next:0}];
function treeStage30(n){return n>=11?4:n>=6?3:n>=3?2:n>=1?1:0;}
function treeDate30(d){if(!d||!/^\d{4}-\d{2}-\d{2}$/.test(d))return 'Ngày đã lưu';var a=d.split('-');return +a[2]+'/'+(+a[1])+'/'+a[0];}
function treeItems30(){return Object.keys(S.treeCards||{}).map(function(k){return S.treeCards[k];}).sort(function(a,b){return String(a.date).localeCompare(String(b.date))||String(a.id).localeCompare(String(b.id));});}
function syncTree(){
  if(!S)return;S.treeCards=S.treeCards||{};
  Object.keys(S.habits||{}).forEach(function(id){var u=H(id),x=HMAP[id];if(!x||u.lv<2)return;var old=S.treeCards[id]||{},date=old.date||((u.cf||{})[2]||{}).d||u.lvSince||dk(),note=old.note;
    if(note===undefined){var dates=Object.keys(S.notes||{}).filter(function(d){return d<=date&&(S.notes[d]||{})[id];}).sort();note=dates.length?S.notes[dates[dates.length-1]][id]:'';}
    S.treeCards[id]=Object.assign({},old,{id:id,name:sname(id),fullName:hname(id),color:GCOL[x.g]||GCOL[5],g:x.g,icon:x.custom?'cu_'+x.icon:id,custom:!!x.custom,lv:Math.max(old.lv||0,u.lv),date:date,note:note,anchor:old.anchor===undefined?u.anchor:old.anchor,act:old.act===undefined?u.act:old.act,level3date:old.level3date||((u.cf||{})[3]||{}).d||'',mastered:!!old.mastered||!!u.master});
  });
  syncLetterStamps37();
}
function treeSVG(fresh,interactive){
  var all=treeItems30(),n=all.length,stage=treeStage30(n),items=all.length>20?all.slice(-20):all,uid='tree30-'+(++TREE_SEQ30),ground=352;
  if(fresh&&S.treeCards[fresh]&&!items.some(function(a){return a.id===fresh;}))items=items.slice(1).concat([S.treeCards[fresh]]);
  var stems=stage===0?[{x:211,top:280,w:5}]:stage===1?[{x:214,top:184,w:7}]:stage===2?[{x:215,top:101,w:8}]:stage===3?[{x:168,top:131,w:6},{x:230,top:49,w:9}]:[{x:185,tip:100,top:118,w:6},{x:202,tip:164,top:44,w:8},{x:217,tip:255,top:30,w:9},{x:233,tip:326,top:99,w:6}];
  var trunks='',branches='',leaves='',tags='';
  var letterLayer37=treeLettersSVG37(stage,stems,sx,items.length,interactive);branches+=letterLayer37.branches;tags+=letterLayer37.tags;
  function sx(st,y){var t=(ground-y)/(ground-st.top);return (1-t)*(1-t)*st.x+2*(1-t)*t*(st.x-13)+t*t*(st.tip===undefined?st.x+4:st.tip);}
  function leaf(x,y,side,scale,angle){return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+angle+') scale('+(side*scale)+' '+scale+')"><path d="M0 0C9-17 24-24 38-22C30-8 16 0 0 0Z" fill="#87A880"/><path d="M0 0C12-4 26 1 35 12C18 13 7 9 0 0Z" fill="#A4BC92"/><path d="M0 0C10-8 20-14 30-17" fill="none" stroke="#74976E" stroke-width=".8" opacity=".55"/></g>';}
  stems.forEach(function(st,i){var tip=st.tip===undefined?st.x+4:st.tip,control=st.x-13,mid=(ground+st.top)/2;trunks+='<path d="M'+st.x+' '+ground+'Q'+control+' '+mid+' '+tip+' '+st.top+'" fill="none" stroke="'+(i===stems.length-1?'#547D66':'#76987B')+'" stroke-width="'+st.w+'" stroke-linecap="round"/><path d="M'+(st.x-2)+' '+(ground-4)+'Q'+(control-2)+' '+mid+' '+(tip-2)+' '+(st.top+3)+'" fill="none" stroke="#BDD0AA" stroke-width="1.2" opacity=".7"/>';
    var joints=Math.max(1,Math.floor((ground-st.top)/39));for(var j=1;j<=joints;j++){var y=ground-j*(ground-st.top)/(joints+1),x=sx(st,y);trunks+='<path d="M'+(x-st.w/2)+' '+y+'l'+st.w+' -1" stroke="#D0DDBB" stroke-width="2.1" stroke-linecap="round"/>';}
    var branchesN=stage===0?1:stage===1?3:stage===2?4:4;
    for(var b=0;b<branchesN;b++){var yy=st.top+25+b*(ground-st.top-70)/Math.max(1,branchesN-1),side=(b+i)%2?-1:1,bx=sx(st,yy+20),ex=bx+side*(stage===0?26:45+(b%2)*17),ey=yy-7;branches+='<path d="M'+bx+' '+(yy+20)+'Q'+(bx+side*24)+' '+(yy+5)+' '+ex+' '+ey+'" fill="none" stroke="#7D9F7C" stroke-width="'+(stage===0?1.4:1.9)+'" stroke-linecap="round"/>';leaves+='<g class="tree-leaf33" style="transform-origin:'+ex+'px '+ey+'px;animation-delay:-'+(i+b)*.7+'s">'+leaf(ex,ey,side,stage===0?.62:stage===1?.8:1,-side*8)+'</g>';}
  });
  var slots=stage===1?[[148,233],[282,251]]:stage===2?[[121,154],[289,178],[75,232],[340,250],[170,277]]:stage===3?[[137,92],[277,110],[83,157],[334,175],[145,213],[278,230],[74,279],[342,286],[194,153],[221,289]]:[];
  items.forEach(function(a,i){var pos=stage>=4?[[63,98],[137,65],[219,83],[304,59],[362,128],[98,158],[178,126],[270,148],[333,197],[48,223],[137,212],[222,195],[285,246],[373,278],[91,283],[173,268],[232,310],[307,312],[135,330],[202,341]][i]:slots[i]||[210,240],x=pos[0],y=pos[1],side=x<210?-1:1,st=stems.reduce(function(best,s){return Math.abs(s.x-x)<Math.abs(best.x-x)?s:best;},stems[0]),rootY=Math.min(ground-28,Math.max(st.top+22,y+32)),rootX=sx(st,rootY),endY=y-14;
    branches+='<path d="M'+rootX.toFixed(1)+' '+rootY+'Q'+((rootX+x)/2).toFixed(1)+' '+(endY-12)+' '+x+' '+endY+'" fill="none" stroke="#91AA87" stroke-width="1.5" stroke-linecap="round"/>';
    if(stage<4||i%2===0)leaves+='<g class="tree-leaf33" style="transform-origin:'+(x+side*8)+'px '+(endY-3)+'px;animation-delay:-'+i*.6+'s">'+leaf(x+side*8,endY-3,side,.65,-side*8)+'</g>';
    var angle=[-5,4,-3,5,-4,2][i%6],label=a.name+' · Cấp '+a.lv;
    tags+='<g class="tree-tag'+(fresh===a.id?' new-tag':'')+'" style="transform-origin:'+x+'px '+(y-14)+'px;--tag-order34:'+i+'"'+(interactive?' role="button" tabindex="0" data-act="treeCard30" data-v="'+esc(a.id)+'" aria-label="Xem thành tựu '+esc(label)+'"':'')+'><title>'+esc(label)+'</title><rect class="tag-hit30" x="'+(x-22)+'" y="'+(y-5)+'" width="44" height="48" rx="8" fill="transparent"/>'+
      '<path d="M'+x+' '+(y-14)+'v14" stroke="#9B9273" stroke-width="1.2"/><g transform="rotate('+angle+' '+x+' '+y+')"><rect x="'+(x-10)+'" y="'+(y+1)+'" width="22" height="39" rx="3" fill="#2D493C" opacity=".08"/><rect x="'+(x-11)+'" y="'+y+'" width="22" height="38" rx="2.5" fill="'+a.color+'" stroke="'+(a.lv>=3?'#D9AF43':'rgba(255,255,255,.75)')+'" stroke-width="'+(a.lv>=3?2.3:1)+'"/><path d="M'+(x-7)+' '+(y+5)+'v28" stroke="#fff" opacity=".18" stroke-width="1.2"/><circle cx="'+x+'" cy="'+(y+5)+'" r="1.4" fill="#fff" opacity=".9"/><path d="M'+x+' '+(y+13)+'v15" stroke="#fff" opacity=".7" stroke-width="1.2" stroke-linecap="round"/>'+(a.lv>=3?'<path d="M'+(x-3)+' '+(y+31)+'l3-3 3 3-3 3Z" fill="#FFE6A1"/>':'')+'</g></g>';
  });
  return '<svg class="achievement-tree tree-scene30 stage-'+stage+'" viewBox="0 0 420 390" '+(interactive?'role="group" aria-label="Cây thành tựu: '+n+' thẻ đã treo. Chạm một thẻ để xem."':'aria-hidden="true"')+' xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="'+uid+'"><stop offset="0" stop-color="#E5EFDA" stop-opacity=".8"/><stop offset="1" stop-color="#EFF4E8" stop-opacity="0"/></radialGradient></defs><ellipse cx="212" cy="210" rx="181" ry="167" fill="url(#'+uid+')"/><ellipse cx="211" cy="356" rx="'+(stage>=4?128:stage===3?98:70)+'" ry="9" fill="#C8D6C0" opacity=".45"/><path d="M'+(stage>=4?67:153)+' 361Q211 368 '+(stage>=4?353:271)+' 359" fill="none" stroke="#B3C5AA" stroke-width="1.1" opacity=".6"/>'+'<g class="tree-wind33"><g class="tree-growth-art34">'+'<g class="tree-trunks-growth">'+trunks+'</g><g class="tree-branches-growth">'+branches+'</g><g class="tree-leaves-growth">'+leaves+'</g>'+'</g><g class="tree-tags34">'+tags+'</g></g>'+  '</svg>';
}
function treePanel(){
  syncTree();var items=treeItems30(),n=items.length,stage=treeStage30(n),st=TREE_STAGES30[stage];
  var reveal=TREE_REPLAY34,letterCount37=writtenLetters37().length;TREE_REPLAY34=false;
  var h='<section class="tree-panel tree-panel30 tree-panel34'+(reveal?' revealing34':'')+'"><div class="tree-count33">'+n+' thẻ đã treo'+(letterCount37?' · '+letterCount37+' lá thư':'')+'</div>'+treeSVG(null,true)+'<div class="tree-growth30"><b>'+st.name+'</b></div>'+shinTree34(stage);
  if(!n)h+='<p>Mỗi thẻ đạt cấp 2 sẽ được treo lên cây.</p>';
  h+=pendingStampRow37()+letterList37();
  if(n>20)h+='<details class="tree-collection30"><summary>Tất cả '+n+' thẻ thành tựu</summary><div class="tree-collection-grid30">'+items.slice().reverse().map(function(a){return '<button data-act="treeCard30" data-v="'+esc(a.id)+'"><i style="background:'+a.color+'"></i><span><b>'+esc(a.name)+'</b><small>'+treeDate30(a.date)+'</small></span><em>Cấp '+a.lv+'</em></button>';}).join('')+'</div></details>';
  if(n)h+='<button class="tree-save30" data-act="treeImage30">'+ic('down')+'Lưu ảnh thành tựu</button>';
  return h+'</section>';
}
function openTreeCard30(id){
  syncTree();var a=S.treeCards[id];if(!a)return;TREE_ORIGIN31=NBOPEN?'notebook':'journey';TREE_SCROLL31=window.scrollY;TREE_COLLECTION31=!!($('.tree-collection30')&&$('.tree-collection30').open);
  openOv('<div class="sh__h"><b>Thẻ thành tựu</b><button class="x" data-act="treeBack30" aria-label="Về cây thành tựu">'+ic('x')+'</button></div><div class="tree-detail30"><div class="tree-detail-icon30" style="background:'+a.color+'">'+glyph(a.icon||id,a.color)+'</div><p class="tree-detail-eyebrow30">MỘT CHẶNG KIÊN TRÌ</p><h2>'+esc(a.fullName||a.name)+'</h2><span class="tree-detail-level30">Cấp '+a.lv+(a.mastered?' · Thành nếp':a.lv>=3?' · Vững tay':' · Làm quen')+'</span><dl><div><dt>Được treo lên cây</dt><dd>'+treeDate30(a.date)+'</dd></div>'+(a.level3date?'<div><dt>Đạt cấp 3</dt><dd>'+treeDate30(a.level3date)+'</dd></div>':'')+'</dl>'+(a.act?'<div class="tree-memory-action30"><small>VIỆC NHỎ ĐÃ BẮT ĐẦU</small>'+(a.anchor?'<p>Khi '+esc(a.anchor)+'</p>':'')+'<b>'+esc(a.act)+'</b></div>':'')+(a.note?'<blockquote><small>MỘT GHI CHÚ CỦA BẠN</small><p>“'+esc(a.note)+'”</p></blockquote>':'')+'<details class="tree-reflection30"'+(a.reflection?' open':'')+'><summary>Một điều bạn muốn ghi nhớ</summary><label class="sr" for="treeReflection30">Kỷ niệm về thành tựu này</label><textarea class="inp" id="treeReflection30" maxlength="240" rows="3" placeholder="Ví dụ: Lúc đầu mình rất ngại, giờ đã tự tin hơn.">'+esc(a.reflection||'')+'</textarea><button class="btn btn--soft btn--sm" data-act="treeReflection30" data-v="'+esc(id)+'">Lưu kỷ niệm</button></details><p class="tree-detail-note30">Thẻ vẫn ở trên cây khi bạn cất khỏi tay.</p></div><div class="sbar"><button class="btn btn--wide" data-act="treeBack30">Về cây thành tựu</button></div>',true);TREE_DETAIL30=id;
}
function treeBack30(){TREE_DETAIL30=null;if(TREE_ORIGIN31==='journey'){closeOv();PG=2;render();var collection=$('.tree-collection30');if(collection)collection.open=TREE_COLLECTION31;window.scrollTo(0,TREE_SCROLL31);}else{NBTAB='sum';openNb();}}
function showTreeAward(id,stamp){
  syncTree();var a=S.treeCards[id],n=treeItems30().length,stage=treeStage30(n);
  var gift=stamp&&S.stampLetters[stamp]&&!S.stampLetters[stamp].letter;
  if(gift){var oldToast37=$('#toast');if(oldToast37)oldToast37.classList.remove('show');}
  openMini('<div class="tree-award tree-award30 center"><small>MỘT CHẶNG KIÊN TRÌ</small><h2>Một thẻ mới, cây lớn thêm.</h2>'+treeSVG(id,false)+'<p><b>'+esc(a?a.name:hname(id))+'</b> đã đạt cấp 2 và được treo lên cây.</p><div class="tree-award-stage30">'+TREE_STAGES30[stage].name+' · '+n+' thẻ đã treo</div>'+(gift?'<div class="stamp-award37">'+stampHTML37(stamp,true)+'<span><b>Bạn được tặng một con tem</b><small>'+esc(STAMP_CATALOG37[stamp].caption)+'</small></span></div><button class="btn btn--wide" data-act="stampWrite37" data-v="'+stamp+'" data-habit="'+esc(id)+'">Viết một lời nhắn</button>':'')+'<button class="btn '+(gift?'btn--ghost ':'')+'btn--wide" data-act="treeContinue" data-v="'+id+'">'+(gift?'Để sau':'Tiếp tục')+'</button><button class="week-link" data-act="treeView">Xem cây thành tựu</button></div>');
}
var TREE_EXPORTING30=false;
async function treeImage30(){
  if(TREE_EXPORTING30)return;TREE_EXPORTING30=true;
  try{
    syncTree();var list=treeItems30(),n=list.length,cv=document.createElement('canvas');cv.width=1080;cv.height=1440;var ctx=cv.getContext('2d'),bg=ctx.createLinearGradient(0,0,0,1440);bg.addColorStop(0,'#E3E7ED');bg.addColorStop(1,'#F2F1EE');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1440);
    ctx.fillStyle='#F7FAF2';rr(ctx,56,56,968,1328,44);ctx.fill();var font='"Roboto Flex",system-ui,sans-serif';ctx.textAlign='left';ctx.fillStyle='#52565C';ctx.font='600 22px '+font;ctx.fillText('SHIN ROUTINE · TỪNG NGÀY MỘT CHÚT',105,122);
    ctx.fillStyle='#1A1A1A';ctx.font='600 50px '+font;ctx.fillText('Cây thành tựu',105,197);ctx.font='400 28px '+font;ctx.fillText(short(S.name||'Hành trình của tôi',40),105,245);
    var source=treeSVG(null,false),img=new Image();await new Promise(function(resolve,reject){img.onload=resolve;img.onerror=reject;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source);});ctx.drawImage(img,100,280,880,817);
    ctx.textAlign='center';ctx.fillStyle='#1A1A1A';ctx.font='600 38px '+font;ctx.fillText(n+' thẻ đã treo · '+TREE_STAGES30[treeStage30(n)].name,540,1128);ctx.font='400 26px '+font;ctx.fillStyle='#52565C';ctx.fillText('Từng việc nhỏ, một chặng kiên trì.',540,1180);
    var recent=list.slice(-3).reverse().map(function(a){return a.name;}).join(' · ');ctx.font='400 23px '+font;wrapT(ctx,recent||'Mỗi thẻ đạt cấp 2 sẽ được treo lên cây.',540,1245,850,35);ctx.fillStyle='#686E76';ctx.font='400 19px '+font;ctx.fillText(treeDate30(dk())+' · Shin routine',540,1340);
    var blob=await new Promise(function(resolve){cv.toBlob(resolve,'image/png');});if(!blob)throw Error('No image');var link=document.createElement('a'),url=URL.createObjectURL(blob);link.href=url;link.download='Shin-Cay-thanh-tuu-'+dk()+'.png';document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url);},1500);toast('Đã tạo ảnh thành tựu để bạn lưu về máy.');
  }catch(e){toast('Chưa lưu được ảnh. Bạn có thể chụp màn hình cây nhé.');}finally{TREE_EXPORTING30=false;}
}
var INSTALL_EVENT=null;
function installHint(){ return INSTALL_EVENT && !isStandalone() && (anyStamp()||ciDays()>0)?'<div class="install-box"><span><b>Shin luôn ở bên bạn</b><small>Cài app để mở nhanh từ màn hình chính.</small></span><button class="btn btn--sm" data-act="installApp">Cài app</button></div>':''; }
async function installApp(){if(!INSTALL_EVENT){homeGuide();return;}var ev=INSTALL_EVENT;INSTALL_EVENT=null;try{await ev.prompt();var result=await ev.userChoice;if(result.outcome==='accepted')toast('Đã gửi yêu cầu cài Shin.');}catch(e){homeGuide();}render();}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault(); INSTALL_EVENT=e; if(S && S.name) render();});
window.addEventListener('appinstalled',function(){INSTALL_EVENT=null;if(S){S.gHome=1;save(true);}if(S&&S.name)render();});

function offlineDescription32(){if(location.protocol==='file:')return 'Bạn đang xem bản trên máy. Cài app và offline sẽ được kiểm tra trên địa chỉ web.';if(SW_READY32)return 'Đã lưu phần ứng dụng để mở lại khi không có mạng. Bài làm lưu riêng trên máy này.';if(SW_ERROR32)return 'Chưa chuẩn bị xong bản offline. Khi có mạng, bạn có thể thử lại.';return 'Đang chuẩn bị bản offline cho thiết bị này.';}
function updateRuntime32(){
  var el=$('#runtime32');if(!el){document.body.classList.remove('runtime-visible32');return;}var text='',actions='',kind='';
  if(SAVE_STATE32==='error'){kind='error';text='Chưa lưu được trên máy. Hãy giữ lại bằng một bản sao.';actions='<button data-act="backup">Lưu bản sao</button>';}
  else if(SW_WAITING32&&!SW_DISMISSED32){kind='update';text='Đã có bản mới của Shin.';actions='<button data-act="applyUpdate32">Cập nhật</button><button class="runtime-later32" data-act="dismissUpdate32">Để sau</button>';}
  else if(navigator.onLine===false){kind='offline';text=SW_READY32?'Đang offline · Ghi nhận vẫn lưu trên máy.':'Đang offline · Hãy giữ trang này mở.';}
  el.hidden=!text;el.setAttribute('data-kind',kind);el.innerHTML=text?'<span>'+text+'</span>'+actions:'';document.body.classList.toggle('runtime-visible32',!!text);
}
function querySW32(worker){return new Promise(function(resolve){if(!worker||!window.MessageChannel){resolve(null);return;}var channel=new MessageChannel(),timer=setTimeout(function(){channel.port1.close();resolve(null);},4000);channel.port1.onmessage=function(e){clearTimeout(timer);channel.port1.close();resolve(e.data);};worker.postMessage({type:'GET_STATUS'},[channel.port2]);});}
async function refreshSW32(){var worker=navigator.serviceWorker.controller||(SW_REG32&&SW_REG32.active);var status=await querySW32(worker);SW_READY32=!!(status&&status.coreReady);updateRuntime32();}
async function startSW32(){
  if(SW_STARTED32&&SW_REG32)return;SW_STARTED32=true;
  if(!('serviceWorker' in navigator)||!window.isSecureContext||location.protocol==='file:'){SW_ERROR32='unavailable';return;}
  try{
    var existing=await navigator.serviceWorker.getRegistration('./');try{SW_REG32=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});}catch(regError){if(existing&&existing.active)SW_REG32=existing;else throw regError;}SW_ERROR32='';
    function waiting(){if(SW_REG32.waiting&&navigator.serviceWorker.controller){SW_WAITING32=SW_REG32.waiting;SW_DISMISSED32=false;updateRuntime32();}}
    function observeInstalling(worker){if(!worker)return;function changed(){if(worker.state==='installed'){waiting();if(!navigator.serviceWorker.controller)refreshSW32();}}worker.addEventListener('statechange',changed);changed();}
    waiting();observeInstalling(SW_REG32.installing);SW_REG32.addEventListener('updatefound',function(){observeInstalling(SW_REG32.installing);});
    navigator.serviceWorker.addEventListener('controllerchange',function(){if(UPDATE_APPLY32){UPDATE_APPLY32=false;location.reload();return;}refreshSW32();});
    navigator.serviceWorker.ready.then(function(){refreshSW32();});if(navigator.serviceWorker.controller)refreshSW32();
  }catch(e){SW_STARTED32=false;SW_ERROR32='registration';SW_READY32=false;updateRuntime32();}
}
async function checkUpdate32(){SW_DISMISSED32=false;await startSW32();if(!SW_REG32){toast(location.protocol==='file:'?'Hãy kiểm tra cập nhật trên địa chỉ web của app.':'Chưa kiểm tra được. Bạn thử lại khi có mạng nhé.');return;}try{await SW_REG32.update();if(SW_REG32.waiting){SW_WAITING32=SW_REG32.waiting;toast('Có bản mới. Đóng Sổ tay rồi chọn Cập nhật.');}else toast('Đã gửi yêu cầu kiểm tra. Nếu có bản mới, Shin sẽ hiện nút cập nhật.');updateRuntime32();}catch(e){toast('Chưa kết nối được để kiểm tra bản mới.');}}
function applyUpdate32(){if(!SW_WAITING32)return;if(OV){toast('Hãy đóng màn đang làm trước khi cập nhật.');return;}if(!save(true)){toast('Hãy lưu bản sao trước khi cập nhật.');return;}UPDATE_APPLY32=true;SW_WAITING32.postMessage({type:'SKIP_WAITING'});}
window.addEventListener('online',function(){updateRuntime32();if(SW_REG32)SW_REG32.update().catch(function(){});});window.addEventListener('offline',updateRuntime32);

var KPI_LAST=null;
function kpiValues(){ return [streak(),masteredCount(),avgConsistency(),keepIds().length,notesCount(),ciDays()]; }
function animateKPIs(){ if(!KPI_LAST) return; var vals=kpiValues(); document.querySelectorAll('[data-kpi]').forEach(function(el){ if(el.dataset.animated) return; el.dataset.animated='1'; var k=+el.dataset.kpi, from=KPI_LAST[k], to=vals[k], suffix=k===2?'%':''; if(to<=from||reduceMotion()) return; var start=performance.now(), badge=document.createElement('em'); badge.className='kpi-delta'; badge.textContent='+'+(to-from); el.parentNode.appendChild(badge); setTimeout(function(){badge.remove();},1200); function tick(now){ if(!el.isConnected) return; var p=Math.min(1,(now-start)/600); el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3)))+suffix; if(p<1) requestAnimationFrame(tick); } requestAnimationFrame(tick); }); if(document.querySelector('[data-kpi]')) KPI_LAST=vals; }

/* TQ33 · compact navigation and one detail view per habit. */
var MILESTONES_OPEN33=false,HABIT_RETURN33=null;
function habitHeader33(id,tab){
  return '<div class="sh__h habit-heading33"><b>'+esc(sname(id))+'</b><button class="x" data-act="close" aria-label="Đóng">'+ic('x')+'</button></div><div class="habit-tabs33" role="tablist" aria-label="Nội dung thói quen">'+[['card','Thẻ thói quen'],['journal','Nhật ký']].map(function(t){return '<button id="habit-tab-'+t[0]+'" role="tab" aria-controls="habit-body33" aria-selected="'+(tab===t[0])+'" data-act="habitTab33" data-v="'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div>';
}
function habitJournal33(id){
  var u=H(id),first=u?u.since:null,t=dk(),limit=CARD.timelineLimit||6;
  [S.log,S.notes].forEach(function(map){Object.keys(map||{}).forEach(function(d){if((map[d]||{})[id]&&(!first||d<first))first=d;});});
  if(!first)return '<div class="journey-empty31">Những ghi nhận của thói quen này sẽ xuất hiện ở đây.</div>';
  var weeks=[],ws=wkStart(t),start=wkStart(first);
  while(ws>=start&&weeks.length<2000){weeks.push(ws);ws=addD(ws,-7);}
  var visible=weeks.slice(0,limit),open=CARD.timelineOpen||{},h='<div class="habit-timeline33">';
  visible.forEach(function(w,i){
    var end=addD(w,6),days=[],count=0;
    for(var n=6;n>=0;n--){var d=addD(w,n);if(d>t||d<first)continue;days.push(d);if(mark(d,id))count++;}
    h+='<details class="habit-week33" data-week="'+w+'"'+((open[w]===undefined?i===0:open[w])?' open':'')+'><summary><span>'+(w===wkStart(t)?'Tuần này':dm(w)+' – '+dm(end))+'</span><small>'+count+'/'+days.length+' ngày đã ghi</small></summary><div class="habit-week-days33">';
    days.forEach(function(d){
      var m=mark(d,id),note=(S.notes[d]||{})[id]||'',why=(S.why[d]||{})[id],reason=REASONS.filter(function(r){return r[0]===why;})[0];
      h+='<article class="habit-day33 state-'+(m||'unlogged')+'"><div class="habit-day-head33"><button data-act="jrow" data-v="'+id+'|'+d+'"><time datetime="'+d+'">'+(d===t?'Hôm nay · ':'')+treeDate30(d)+'</time><b>'+esc(RECORD_LABEL[m]||'Chưa ghi nhận')+'</b></button>'+((m||note)?journalStarButton31(d,id,true):'')+'</div>';
      if((S.bf[d]||{})[id])h+='<span class="habit-backfill33">Ghi bù</span>';
      if(note)h+='<p>'+esc(note)+'</p>';
      else if(m)h+='<p class="habit-no-memo33">Chưa viết memo</p>';
      if(m==='n'&&reason)h+='<p class="habit-reason33">'+esc(reason[1])+'</p>';
      h+='</article>';
    });
    h+='</div></details>';
  });
  return h+'</div>'+(weeks.length>visible.length?'<button class="journey-more31" data-act="habitMore33">Xem các tuần trước</button>':'');
}


function rememberHabit33(){
  if(!OV||!CARD||!$('.habit-sheet33',OV))return;
  HABIT_RETURN33={card:JSON.parse(JSON.stringify(CARD)),scroll:$('.sheet',OV).scrollTop};
}
function restoreHabit33(){
  if(!HABIT_RETURN33)return false;var back=HABIT_RETURN33;HABIT_RETURN33=null;closeOv(true);CARD=back.card;openOv('');drawCard();$('.sheet').scrollTop=back.scroll;return true;
}
document.addEventListener('toggle',function(e){
  if(e.target.matches('.habit-week33')&&CARD){CARD.timelineOpen=CARD.timelineOpen||{};CARD.timelineOpen[e.target.getAttribute('data-week')]=e.target.open;}
  if(e.target.matches('.journey-past33'))MILESTONES_OPEN33=e.target.open;
},true);

/* Press-and-hold previews never move the surrounding habit rows. */
var HINT33={timer:null,release:null,target:null,x:0,y:0,held:false,pointerDown:false,suppressUntil:0};
function hideHint33(){
  clearTimeout(HINT33.timer);clearTimeout(HINT33.release);
  if(HINT33.target)HINT33.target.removeAttribute('aria-describedby');
  var tip=$('#habit-hint33');if(tip)tip.remove();HINT33.target=null;
}
function showHint33(el){
  var text=el.getAttribute('data-hint33');if(!text)return;var old=$('#habit-hint33');if(old)old.remove();
  var tip=document.createElement('div');tip.id='habit-hint33';tip.className='habit-hint33';tip.setAttribute('role','tooltip');tip.textContent=text;document.body.appendChild(tip);el.setAttribute('aria-describedby',tip.id);
  var r=el.getBoundingClientRect(),tr=tip.getBoundingClientRect(),left=Math.max(12,Math.min(innerWidth-tr.width-12,r.left+(r.width-tr.width)/2)),top=r.top-tr.height-9;
  if(top<12)top=Math.min(innerHeight-tr.height-12,r.bottom+9);
  tip.style.left=left+'px';tip.style.top=Math.max(12,top)+'px';
}
document.addEventListener('pointerdown',function(e){
  hideHint33();HINT33.pointerDown=true;HINT33.held=false;var el=e.target.closest('[data-hint33]');
  if(el){HINT33.target=el;HINT33.x=e.clientX;HINT33.y=e.clientY;HINT33.timer=setTimeout(function(){if(HINT33.target===el&&el.isConnected){HINT33.held=true;HINT33.suppressUntil=Date.now()+1000;showHint33(el);}},450);}
  var panel=e.target.closest('.tree-panel30');if(panel&&!reduceMotion()){
    var group=panel.querySelector('.tree-wind33');if(!group)return;var r=panel.getBoundingClientRect(),dir=e.clientX<r.left+r.width/2?-1:1;
    if(group.getAnimations)group.getAnimations().filter(function(a){return a.id==='touch-wind33';}).forEach(function(a){a.cancel();});
    if(group.animate){var anim=group.animate([{transform:'rotate(0deg)'},{transform:'rotate('+dir*2.8+'deg)'},{transform:'rotate('+dir*-1.8+'deg)'},{transform:'rotate('+dir*.9+'deg)'},{transform:'rotate(0deg)'}],{duration:1400,easing:'ease-in-out'});anim.id='touch-wind33';}
  }
},{passive:true});
document.addEventListener('pointermove',function(e){if(HINT33.target&&(Math.abs(e.clientX-HINT33.x)>9||Math.abs(e.clientY-HINT33.y)>9))hideHint33();},{passive:true});
document.addEventListener('pointerup',function(){HINT33.pointerDown=false;clearTimeout(HINT33.timer);if(HINT33.held){HINT33.suppressUntil=Date.now()+700;HINT33.release=setTimeout(hideHint33,1800);}},true);
document.addEventListener('pointercancel',function(){HINT33.pointerDown=false;hideHint33();},{passive:true});
document.addEventListener('contextmenu',function(e){if(e.target.closest('[data-hint33]'))e.preventDefault();});
document.addEventListener('click',function(e){if(HINT33.suppressUntil>Date.now()&&e.target.closest('[data-hint33]')){e.preventDefault();e.stopImmediatePropagation();}else hideHint33();},true);
document.addEventListener('scroll',hideHint33,{capture:true,passive:true});
document.addEventListener('focusin',function(e){var el=e.target.closest('[data-hint33]');if(el&&el.matches(':focus-visible')){hideHint33();HINT33.target=el;HINT33.timer=setTimeout(function(){if(HINT33.target===el)showHint33(el);},450);}});
document.addEventListener('focusout',function(){if(!HINT33.pointerDown)hideHint33();});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape')hideHint33();
  var tab=e.target.closest('[role="tab"][data-act]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  var group=tab.closest('[role="tablist"]'),buttons=$$('[role="tab"]',group),i=buttons.indexOf(tab),next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:buttons.length-1))%buttons.length;
  e.preventDefault();var action=buttons[next].getAttribute('data-act'),value=buttons[next].getAttribute('data-v');buttons[next].click();var active=$('[data-act="'+action+'"][data-v="'+value+'"]');if(active)active.focus({preventScroll:true});
});

/* TQ34 · approved note requirements, Shin messages and tree presentation. */
var TREE_REPLAY34=true;
function journeyIcon34(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-8M8.5 21h7M12 3c-2 0-3.6 1.4-3.8 3.3A4.1 4.1 0 0 0 5 10.2C5 12.8 7 14 9.5 14H15c2.3 0 4-1.6 4-3.8 0-2-1.3-3.5-3.2-3.9C15.6 4.4 14 3 12 3Z"/><path d="m9 11 3 2 3-3"/></svg>';
}
function noteHints34(id,status){
  var E=(HMAP[id]||{}).ev||EV_GENERIC;
  if(status==='n')return {q:'Điều gì khiến bạn chưa làm?',o:REASONS.map(function(r){return r[1];})};
  if(status==='x')return {q:'Bạn chưa gặp dịp thực hiện vì sao?',o:['Chưa gặp tình huống phù hợp','Chưa có dịp thực hiện']};
  return E;
}
function ciNoteInputs34(id,status){
  var E=noteHints34(id,status);
  return '<div class="ci34-note"><label class="lbl" for="ci-note-'+id+'">'+esc(E.q)+' <span>(bắt buộc)</span></label><textarea class="inp" id="ci-note-'+id+'" data-in="ciNote29" data-id="'+id+'" required aria-required="true" rows="2" placeholder="Ghi lại một điều cụ thể">'+esc(CI.notes[id]||'')+'</textarea><div class="ci34-note-chips">'+E.o.map(function(o){return '<button class="chp" data-act="ciNoteChip34" data-v="'+id+'|'+esc(o)+'">'+esc(o)+'</button>';}).join('')+'</div></div>';
}
function ciKeeps34(){
  return '<section class="ci29-keep"><h3>Giữ nếp nhẹ nhàng</h3><p>Hôm nay bạn duy trì được thói quen nào?</p><div>'+CI.keeps.map(function(id){return '<button class="chp'+(CI.keep[id]?' on':'')+'" data-act="ciKeep29" data-v="'+id+'" aria-pressed="'+!!CI.keep[id]+'">'+(CI.keep[id]?'✓ ':'')+esc(sname(id))+'</button>';}).join('')+'</div>'+CI.keeps.filter(function(id){return CI.keep[id];}).map(function(id){return '<div class="ci29-keep-note34"><b>'+esc(sname(id))+'</b>'+ciNoteInputs34(id,'y')+'</div>';}).join('')+'</section>';
}
function updateCIFooter34(){
  if(!CI||CI.done)return;var state=ciState(),footer=$('.ci29-footer');if(!footer)return;
  var message=$('b',footer),button=$('[data-act="ciSave29"]',footer);if(message)message.textContent=state.msg;if(button)button.disabled=!state.ok;
}
function shinLine34(text,mood,kind){
  return '<div class="shin-line34 '+(kind||'')+'"><span class="shin-avatar34">'+shin(mood||'hi')+'</span><p>'+esc(text)+'</p></div>';
}
function shinToday34(list,day){
  if(!list.length)return '';
  var recorded=list.filter(function(id){return !!mark(day,id);}).length,practiced=list.filter(function(id){var m=mark(day,id);return m==='y'||m==='p';}).length;
  if(recorded===list.length)return shinLine34('Bạn đã nhìn lại đủ các thói quen hôm nay. Shin ghi nhận sự chân thành của bạn.','proud','shin-today34');
  if(practiced)return shinLine34('Shin thấy bạn đã bắt tay vào làm rồi. Mình tiếp tục từng việc nhỏ nhé.','proud','shin-today34');
  if(recorded)return shinLine34('Cảm ơn bạn đã ghi lại đúng điều hôm nay. Mình thử tiếp một việc vừa sức nhé.','hi','shin-today34');
  return shinLine34('Một việc nhỏ cũng đáng ghi nhận. Hôm nay mình bắt đầu từ thẻ nào nhé?','hi','shin-today34');
}
function shinWeekly34(ws){
  var ci=checkinWeek31(ws),list=weekIds31(ws),practiced=list.some(function(id){return weekStats31(id,ws).practiced>0;}),current=ws===wkStart(dk());
  if(ci.count)return shinLine34((current?'Tuần này':'Tuần đã chọn')+' bạn đã check-in '+ci.count+' ngày. Mình tiếp tục chăm từng việc nhỏ nhé.','proud','shin-weekly34');
  if(practiced)return shinLine34('Những việc bạn đã làm đều được ghi lại ở đây. Shin cùng bạn nhìn lại nhé.','hi','shin-weekly34');
  return shinLine34(current?'Một việc nhỏ hôm nay cũng là một bước bắt đầu. Mình chọn điều vừa sức nhé.':'Tuần này chưa có ghi nhận. Mình tiếp tục từ một việc nhỏ hôm nay nhé.','hi','shin-weekly34');
}
function shinTree34(stage){
  var messages=[
    'Một việc nhỏ hôm nay là đủ để bắt đầu. Shin cùng bạn chăm mầm này nhé.',
    'Thẻ đầu tiên đã ở trên cây rồi. Mình cứ chăm từng chút nhé.',
    'Cây đang vươn lên từ những lần bạn kiên trì. Mình cứ từng chút nhé.',
    'Những lần bạn kiên trì đã thành một chặng đường. Hôm nay mình tiếp tục vừa sức nhé.',
    'Từ nhiều việc nhỏ, bạn đã vun thành một khóm tre. Shin mừng vì chặng đường bạn đã đi.'
  ];
  return shinLine34(messages[stage]||messages[0],stage?'proud':'hi','shin-tree34');
}
function replayTree34(panel){
  if(!panel||reduceMotion())return;
  panel.classList.remove('revealing34');void panel.getBoundingClientRect();panel.classList.add('revealing34');
}
document.addEventListener('click',function(e){
  var panel=e.target.closest('.tree-panel34');if(!panel||e.target.closest('button,[data-act],summary,details'))return;replayTree34(panel);
});
function fitDeck34(stage){
  var home=stage.closest('.home-cards'),dock=$('#sdots');if(!home||!dock||!CS[SLOT])return;
  home.style.setProperty('--today-card-drop','5px');
  home.classList.remove('deck-tight34','deck-tighter34');
  var available=dock.getBoundingClientRect().top-stage.getBoundingClientRect().top-14;
  if(available<=0){home.style.setProperty('--today-card-drop','0px');return;}
  if(CS[SLOT].offsetHeight>available)home.classList.add('deck-tight34');
  if(CS[SLOT].offsetHeight>available)home.classList.add('deck-tighter34');
  if(CS[SLOT].offsetHeight>available)home.style.setProperty('--today-card-drop','0px');
  stage.style.height=(CS[SLOT].offsetHeight+10)+'px';
}

function journalStarToggle35(){
  var starred=JOURNAL_MODE31==='saved';
  return '<button class="journal-star31 journal-toggle33'+(starred?' selected':'')+'" data-act="journalSaved33" aria-pressed="'+starred+'" aria-label="'+(starred?'Về nhật ký theo ngày':'Xem ghi chú đáng nhớ')+'"><svg viewBox="0 0 24 24" width="22" height="22" fill="'+(starred?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.5l-5.7 3 1.1-6.3L2.8 9.7l6.4-.9z"/></svg></button>';
}





;