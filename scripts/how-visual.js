/* ===== SECTION: how-visual.js ===== */
/* M.Claude.3.3.22 · "Cách làm" bằng hình (PA2), đợt 1: Vận động, Ngủ, Chi tiêu, Báo cáo.
   - Vì sao: tranh đôi "Bây giờ ↔ Sang Nhật" (ý A).
   - Các bước: mỗi bước một khung tranh; hình trọng tâm/hình động (ý C); Shin mách nhỏ (ý D).
   - Ghi nhớ: cặp hình Nên ✓ / Tránh ✗.
   - Thực tập dạng "Tìm điểm chưa ổn" (type:'spot', ý B).
   Nét vẽ theo bộ hình gốc illSVG/person trong core.js: viền #2B2420, áo #EAF4F5, quần #2F3D5A, da #F3CDA8.
   Chỉ bổ sung lớp hiển thị; không đổi dữ liệu, khóa lưu hay cách tính tiến độ. */
(function(){
var K='#2B2420',SKIN='#F3CDA8',HAIR='#2A2321',SHIRT='#EAF4F5',PANTS='#2F3D5A',
    BLUE='#2A74DB',BLUE_T='#1D5FD1',GREEN='#14A874',GREEN_T='#0B6E4B',RED='#E8604F',RED_T='#8E2F22',
    YEL='#F4B63B',INK='#16302F',MUTE='#45605F',PANEL='#F4F6FE',LINE='#C9CEE0',WOOD='#C99A6B',WOOD_D='#8A5A3B';

/* ---------- Nét vẽ dùng chung ---------- */
function T(x,y,t,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" style="'+(o.jp?FONT_JP:FONT_SVG)+';font-weight:'+(o.w||600)+'" font-size="'+(o.s||12)+'" fill="'+(o.c||INK)+'">'+t+'</text>';}
function pts(p){return 'M'+p.map(function(q){return q[0]+' '+q[1];}).join('L');}
function limb(p,w,c){var d=pts(p);return '<path d="'+d+'" stroke="'+K+'" stroke-width="'+(w+3.4)+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" stroke="'+c+'" stroke-width="'+w+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';}
function g(x,y,s,inner,extra){return '<g transform="translate('+x+' '+y+')'+(s&&s!==1?' scale('+s+')':'')+'"'+(extra||'')+'>'+inner+'</g>';}
function check(x,y,r){r=r||10;return '<g transform="translate('+x+' '+y+')"><circle r="'+r+'" fill="'+GREEN+'"/><path d="M'+(-r*.42)+' 0l'+(r*.3)+' '+(r*.3)+' '+(r*.55)+'-'+(r*.6)+'" stroke="#fff" stroke-width="'+(r*.24)+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';}
function cross(x,y,r){r=r||10;var a=r*.38;return '<g transform="translate('+x+' '+y+')"><circle r="'+r+'" fill="'+RED+'"/><path d="M'+(-a)+' '+(-a)+'l'+(2*a)+' '+(2*a)+'M'+a+' '+(-a)+'l'+(-2*a)+' '+(2*a)+'" stroke="#fff" stroke-width="'+(r*.24)+'" stroke-linecap="round"/></g>';}
function arrow(x1,y1,x2,y2,c,w){c=c||BLUE;w=w||2.4;var a=Math.atan2(y2-y1,x2-x1),h=6.5;return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"/><path d="M'+(x2-h*Math.cos(a-.6)).toFixed(1)+' '+(y2-h*Math.sin(a-.6)).toFixed(1)+'L'+x2+' '+y2+'L'+(x2-h*Math.cos(a+.6)).toFixed(1)+' '+(y2-h*Math.sin(a+.6)).toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';}
function dash(x1,y1,x2,y2,c,w){return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="'+(c||LINE)+'" stroke-width="'+(w||1.6)+'" stroke-dasharray="4 4"/>';}
function pill(x,y,w,t,bg,c){return '<rect x="'+(x-w/2)+'" y="'+(y-10)+'" width="'+w+'" height="20" rx="10" fill="'+bg+'"/>'+T(x,y+4,t,{s:11,w:800,c:c});}
function bubble(x,y,w,h,lines,o){o=o||{};var tail=o.tail||'bl',s='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="'+(o.bg||'#fff')+'" stroke="'+(o.st||BLUE)+'" stroke-width="1.6"/>';
 if(tail==='bl')s+='<path d="M'+(x+14)+' '+(y+h-.8)+'l-6 9 14-9" fill="'+(o.bg||'#fff')+'" stroke="'+(o.st||BLUE)+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M'+(x+13)+' '+(y+h-1.6)+'h12" stroke="'+(o.bg||'#fff')+'" stroke-width="2.4"/>';
 if(tail==='br')s+='<path d="M'+(x+w-14)+' '+(y+h-.8)+'l6 9-14-9" fill="'+(o.bg||'#fff')+'" stroke="'+(o.st||BLUE)+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M'+(x+w-25)+' '+(y+h-1.6)+'h12" stroke="'+(o.bg||'#fff')+'" stroke-width="2.4"/>';
 lines.forEach(function(t,i){s+=T(x+(o.left?10:w/2),y+17+i*15,t,{a:o.left?'start':'middle',s:o.s||11.5,w:o.w||700,c:o.c||BLUE_T,jp:o.jp});});return s;}

/* Người: tọa độ tương đối, mặt đất y=0. f=1 nhìn phải, -1 nhìn trái, 0 nhìn thẳng. */
function head(x,y,f,o){o=o||{};var s='<circle cx="'+x+'" cy="'+y+'" r="12.5" fill="'+SKIN+'" stroke="'+K+'" stroke-width="1.8"/>',hc=o.hair||HAIR;
 if(f){var m='translate('+x+' '+y+') scale('+f+' 1)';
  if(o.girl)s+='<g transform="'+m+'"><path d="M-12 -3q-9 4-6 15q3-4 6-6z" fill="'+hc+'"/></g>';
  s+='<g transform="'+m+'"><path d="M-12.6 1q-1-15 13.5-14.5q11.5 .6 11.8 10.5q-8-4.2-13.4 .3q-5 .4-6 4z" fill="'+hc+'"/>'+
   (o.closed?'<path d="M3.5 -.5q2.5 2 5 0" stroke="'+K+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>':'<circle cx="6" cy="-1" r="1.6" fill="'+K+'"/>')+
   (o.sad?'<path d="M4 7q3.5-2.6 7 0" stroke="'+K+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>':o.smile===false?'<path d="M5 6.5h5" stroke="'+K+'" stroke-width="1.5" stroke-linecap="round"/>':'<path d="M3.5 5q4 3 8 0" stroke="'+K+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>')+
   (o.blush?'<circle cx="5" cy="4" r="3.2" fill="#F08A7A" opacity=".55"/>':'')+(o.mad?'<path d="M2.5 -7.5l8 2.5" stroke="'+K+'" stroke-width="1.6" stroke-linecap="round"/>':'')+
   (o.cap?'<path d="M-13.4 -3q0-11.5 13.4-11.6q12.6 0 13.4 9.4z" fill="'+(o.cap===true?'#3E7BD0':o.cap)+'" stroke="'+K+'" stroke-width="1.6"/><path d="M11 -5.5h10" stroke="'+K+'" stroke-width="3.4" stroke-linecap="round"/>':'')+'</g>';}
 else{s+='<g transform="translate('+x+' '+y+')">'+(o.girl?'<path d="M-12.8 0q-1 9 1 14h4l1-12zM12.8 0q1 9-1 14h-4l-1-12z" fill="'+hc+'"/>':'')+
   '<path d="M-12.8 1q-1-15 12.8-15q13.8 0 12.8 15q-4.6-7.6-12.8-6.6q-8.2-1-12.8 6.6z" fill="'+hc+'"/>'+
   (o.closed?'<path d="M-7 0q2.5 2 5 0M2 0q2.5 2 5 0" stroke="'+K+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>':'<circle cx="-4.6" cy="-.5" r="1.6" fill="'+K+'"/><circle cx="4.6" cy="-.5" r="1.6" fill="'+K+'"/>')+
   (o.sad?'<path d="M-3.6 7q3.6-2.6 7.2 0" stroke="'+K+'" stroke-width="1.5" fill="none" stroke-linecap="round"/>':'<path d="M-4 5q4 3.4 8 0" stroke="'+K+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>')+
   (o.blush?'<circle cx="-7" cy="4" r="3.2" fill="#F08A7A" opacity=".55"/><circle cx="7" cy="4" r="3.2" fill="#F08A7A" opacity=".55"/>':'')+(o.mad?'<path d="M-9 -7l6 2.4M9 -7l-6 2.4" stroke="'+K+'" stroke-width="1.6" stroke-linecap="round"/>':'')+
   (o.cap?'<path d="M-13.4 -2q0-12 13.4-12t13.4 12z" fill="'+(o.cap===true?'#3E7BD0':o.cap)+'" stroke="'+K+'" stroke-width="1.6"/><path d="M-14 -2h28" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/>':'')+'</g>';}
 return s;}
/* Bàn tay: lòng bàn tay bo tròn xoay theo cẳng tay, có ngón cái; viền mảnh hơn tay áo. */
function hand(ex,ey,hx,hy,f){var dx=hx-ex,dy=hy-ey,L=Math.sqrt(dx*dx+dy*dy)||1;dx/=L;dy/=L;
 var p1=[dy,-dx],p2=[-dy,dx],p=(Math.abs(p1[1]-p2[1])<.3)?(p1[0]*(f||1)>0?p1:p2):(p1[1]<p2[1]?p1:p2);
 var cx=hx+dx*2.6,cy=hy+dy*2.6,ang=Math.atan2(dy,dx)*180/Math.PI,tx=cx+p[0]*3-dx*1.2,ty=cy+p[1]*3-dy*1.2;
 return '<ellipse cx="'+tx.toFixed(1)+'" cy="'+ty.toFixed(1)+'" rx="2.6" ry="1.7" transform="rotate('+(ang-35*(p===p1?1:-1)).toFixed(0)+' '+tx.toFixed(1)+' '+ty.toFixed(1)+')" fill="'+SKIN+'" stroke="'+K+'" stroke-width="1.1"/>'+
  '<ellipse cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" rx="4.4" ry="3.3" transform="rotate('+ang.toFixed(0)+' '+cx.toFixed(1)+' '+cy.toFixed(1)+')" fill="'+SKIN+'" stroke="'+K+'" stroke-width="1.2"/>';}
function arm(st,el,hd,sh,f){return limb([st,el,hd],7.4,sh)+hand(el[0],el[1],hd[0],hd[1],f);}
function fig(o){var f=o.f==null?1:o.f,s='',sh=o.shirt||SHIRT,pa=o.pants||PANTS;
 (o.legs||[]).forEach(function(L){s+=limb([[L[0],L[1]],[L[2],L[3]],[L[4],L[5]]],12,pa);
  s+=f?'<path d="M'+(L[4]-2*f)+' '+(L[5]+5.4)+'h'+(12*f)+'" stroke="'+K+'" stroke-width="5.6" stroke-linecap="round"/>':'<path d="M'+(L[4]-5)+' '+(L[5]+5.4)+'h10" stroke="'+K+'" stroke-width="5.6" stroke-linecap="round"/>';});
 var SH=[o.sh[0],o.sh[1]+4];
 (o.backArms||[]).forEach(function(A){var st=A.length>4?[A[0],A[1]]:SH,q=A.length>4?A.slice(2):A;s+=arm(st,[q[0],q[1]],[q[2],q[3]],sh,f);});
 s+=limb(o.torso||[o.hip,o.sh],22,sh);
 if(o.tie)s+='<path d="M'+o.sh[0]+' '+(o.sh[1]+2)+'v14" stroke="'+o.tie+'" stroke-width="3" stroke-linecap="round"/>';
 s+=head(o.head[0],o.head[1],f,o);
 (o.arms||[]).forEach(function(A){var st=A.length>4?[A[0],A[1]]:SH,q=A.length>4?A.slice(2):A;s+=o.hold?limb([st,[q[0],q[1]],[q[2],q[3]]],7.4,sh):arm(st,[q[0],q[1]],[q[2],q[3]],sh,f);});
 return s;}
/* Một số dáng đứng/ngồi hay dùng (nhìn phải). */
function standSide(o){o=o||{};var f=o.f==null?1:o.f;return fig(Object.assign({f:f,legs:[[-2*f,-58,0,-31,0,-6]],hip:[0,-58],sh:[f,-95],head:[3*f,-117],arms:o.armsFwd?[[18*f,-90,36*f,-90]]:[[2*f,-73,5*f,-54]]},o));}
function standFront(o){o=o||{};return fig(Object.assign({f:0,legs:[[-6,-58,-7,-31,-7,-6],[6,-58,7,-31,7,-6]],hip:[0,-58],sh:[0,-95],head:[0,-117],arms:[[-11,-91,-15,-73,-17,-55],[11,-91,15,-73,17,-55]]},o));}
function squatGood(o){return fig(Object.assign({f:1,legs:[[-20,-40,9,-40,0,-6]],hip:[-20,-40],sh:[-1,-73],head:[8,-93],arms:[[17,-72,35,-73]]},o||{}));}
function squatHalf(o){return fig(Object.assign({f:1,legs:[[-12,-50,8,-33,0,-6]],hip:[-12,-50],sh:[-3,-86],head:[3,-107],arms:[[15,-84,33,-85]]},o||{}));}
function squatBad(o){return fig(Object.assign({f:1,legs:[[-6,-40,24,-34,0,-6]],hip:[-6,-40],torso:[[-6,-40],[10,-60],[26,-64]],sh:[26,-64],head:[41,-70],arms:[[29,-48,32,-33]]},o||{}));}
function sitChair(o){o=o||{};var f=o.f==null?1:o.f;return fig(Object.assign({f:f,legs:[[-6*f,-40,20*f,-40,20*f,-6]],hip:[-6*f,-40],sh:[-4*f,-78],head:[-1*f,-100],arms:[[8*f,-62,24*f,-58]]},o));}
function chairGhost(x){return '<g fill="none" stroke="'+LINE+'" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"><path d="M'+(x-34)+' -84V-2M'+(x-34)+' -36H'+x+'V-2"/></g>';}
function floor(x1,x2,y){return '<path d="M'+x1+' '+y+'H'+x2+'" stroke="#D9DEEC" stroke-width="2" stroke-linecap="round"/>';}

/* Đồ vật nhỏ */
function phone(x,y,o){o=o||{};var r=o.r||0;return '<g transform="translate('+x+' '+y+') rotate('+r+')">'+(o.glow?'<circle r="16" fill="#9FD3FF" opacity=".35"/>':'')+'<rect x="-6.5" y="-11" width="13" height="22" rx="3" fill="'+(o.glow?'#CFE8FF':'#2F3D5A')+'" stroke="'+K+'" stroke-width="1.5"/>'+(o.glow?'<path d="M-3 -5h6M-3 -1h6M-3 3h4" stroke="'+BLUE+'" stroke-width="1.2" stroke-linecap="round"/>':'')+'</g>';}
function clock(x,y,r,t,o){o=o||{};return '<g transform="translate('+x+' '+y+')"><circle r="'+r+'" fill="#fff" stroke="'+(o.c||K)+'" stroke-width="1.8"/>'+(o.hands!==false?'<path d="M0 0V'+(-r*.6)+'M0 0L'+(r*.42)+' '+(r*.18)+'" stroke="'+K+'" stroke-width="1.8" stroke-linecap="round"/>':'')+(o.bells?'<path d="M'+(-r*.8)+' '+(-r*.75)+'l'+(-r*.3)+' '+(-r*.3)+'M'+(r*.8)+' '+(-r*.75)+'l'+(r*.3)+' '+(-r*.3)+'" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/><path d="M'+(-r*.6)+' '+(r*.9)+'l-3 4M'+(r*.6)+' '+(r*.9)+'l3 4" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/>':'')+'</g>'+(t?T(x,y+r+15,t,{s:11.5,w:800,c:o.tc||INK}):'');}
function moon(x,y,r){r=r||9;return '<path d="M'+(x+r*.3)+' '+(y-r)+'A'+r+' '+r+' 0 1 0 '+(x+r)+' '+(y+r*.55)+'A'+(r*1.1)+' '+(r*1.1)+' 0 0 1 '+(x+r*.3)+' '+(y-r)+'Z" fill="#F4D77A" stroke="#C98A12" stroke-width="1.2"/>';}
function sun(x,y,r){r=r||8;var s='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+YEL+'"/>';for(var i=0;i<8;i++){var a=i*Math.PI/4;s+='<path d="M'+(x+Math.cos(a)*(r+3)).toFixed(1)+' '+(y+Math.sin(a)*(r+3)).toFixed(1)+'L'+(x+Math.cos(a)*(r+6)).toFixed(1)+' '+(y+Math.sin(a)*(r+6)).toFixed(1)+'" stroke="'+YEL+'" stroke-width="2" stroke-linecap="round"/>';}return s;}
function box(x,y,w,h,c){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="2" fill="'+(c||'#E3B97F')+'" stroke="'+K+'" stroke-width="1.4"/><path d="M'+(x+w/2)+' '+y+'v'+(h*.35)+'" stroke="'+WOOD_D+'" stroke-width="1.4"/>';}
function shinMini(mood,x,y,w){var svg=shin(mood);return svg.replace(/^\s*<svg[^>]*>/,'<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+(w*124/120).toFixed(1)+'" viewBox="0 0 120 124" class="hv-shin">');}
function panel(x,y,w,h,c){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" fill="'+(c||PANEL)+'"/>';}

/* Khung tranh */
function svg(vb,label,inner,cls){return '<svg viewBox="'+vb+'" role="img" aria-label="'+label+'"'+(cls?' class="'+cls+'"':'')+'>'+inner+'</svg>';}
/* Tranh đôi: bây giờ ↔ sang Nhật. a, b vẽ trong khung 160×150 riêng. */
function duo(label,a,b,la,lb,ph,tags){ph=ph||154;tags=tags||['Ở TRƯỜNG','Ở NHẬT'];var ly=ph+24,tw=function(t){return t.length*7.2+18;};return svg('0 0 340 '+(ph+42),label,
  panel(4,4,160,ph)+panel(176,4,160,ph,'#EEF4FF')+
  g(4,4,1,a)+g(176,4,1,b)+
  pill(10+tw(tags[0])/2,20,tw(tags[0]),tags[0],'#fff',BLUE_T)+pill(182+tw(tags[1])/2,20,tw(tags[1]),tags[1],'#fff','#B5402F')+
  arrow(160,82,180,82,BLUE,2.4)+
  T(84,ly,la[0],{s:12.5,w:800,c:BLUE_T})+(la[1]?T(84,ly+15,la[1],{s:11.5,w:600,c:MUTE}):'')+
  T(256,ly,lb[0],{s:12.5,w:800,c:'#B5402F'})+(lb[1]?T(256,ly+15,lb[1],{s:11.5,w:600,c:MUTE}):''));}
/* Cặp Nên ✓ / Tránh ✗ */
function pair(label,a,b,la,lb){return svg('0 0 340 190',label,
  panel(4,4,160,150,'#E2F7EE')+panel(176,4,160,150,'#FDECE8')+g(4,4,1,a)+g(176,4,1,b)+check(150,20,11)+cross(322,20,11)+
  T(84,173,la[0],{s:12.5,w:800,c:GREEN_T})+(la[1]?T(84,188,la[1],{s:11.5,w:600,c:GREEN_T}):'')+
  T(256,173,lb[0],{s:12.5,w:800,c:RED_T})+(lb[1]?T(256,188,lb[1],{s:11.5,w:600,c:RED_T}):''));}

/* =========================================================
   VẬN ĐỘNG MỖI NGÀY
   ========================================================= */
var VD={
 duo:function(){
  var a='<rect x="96" y="30" width="46" height="40" rx="4" fill="#DDEBFA" stroke="'+K+'" stroke-width="1.4"/><path d="M119 30v40M96 50h46" stroke="'+K+'" stroke-width="1.2"/>'+sun(108,42,5)+
   floor(6,154,138)+g(62,138,.82,chairGhost(0)+squatGood({girl:true}))+pill(128,100,40,'× 10','#fff',GREEN_T);
  var b=floor(6,154,138)+g(96,138,.8,standSide({f:-1,cap:true,shirt:'#DCE7F7',arms:[[-14,-82,-26,-74]]}))+
   '<rect x="6" y="96" width="148" height="14" rx="7" fill="#C7D3E6" stroke="'+K+'" stroke-width="1.4"/><circle cx="18" cy="103" r="3" fill="'+K+'"/><circle cx="142" cy="103" r="3" fill="'+K+'"/>'+
   box(20,78,20,18)+box(56,80,18,16,'#F1C98C')+box(120,78,20,18)+'<path d="M30 112v26M130 112v26" stroke="'+K+'" stroke-width="3"/>'+
   '<g transform="translate(130 44)"><circle r="13" fill="#fff" stroke="'+K+'" stroke-width="1.6"/><path d="M0 0V-8M0 0l6 3" stroke="'+K+'" stroke-width="1.8" stroke-linecap="round"/><path d="M0 -13A13 13 0 1 1 -12.4 4" fill="none" stroke="'+GREEN+'" stroke-width="3" stroke-linecap="round"/></g>';
  return duo('Bây giờ: một phút squat mỗi sáng. Sang Nhật: đứng cả ca vẫn khỏe.',a,b,['1 phút mỗi sáng'],['Đứng cả ca vẫn khỏe'],154,['BÂY GIỜ','SANG NHẬT']);},
 steps:[
  function(){return svg('0 0 300 160','Đứng hai chân rộng bằng vai, hai tay đưa ra trước',
   floor(10,290,150)+dash(71,66,71,150,'#9DB9E8')+dash(93,66,93,150,'#9DB9E8')+g(82,150,.88,standFront({legs:[[-6,-58,-11,-31,-14,-6],[6,-58,11,-31,14,-6]],arms:[[-11,-91,-17,-73,-20,-56],[11,-91,17,-73,20,-56]]}))+
   '<path d="M69 156h26" stroke="'+BLUE+'" stroke-width="2"/><path d="M69 152v8M95 152v8" stroke="'+BLUE+'" stroke-width="2"/>'+
   T(82,22,'Chân rộng bằng vai',{s:11.5,w:800,c:BLUE_T})+
   g(206,150,.88,standSide({armsFwd:true}))+arrow(232,70,262,70,GREEN,2.4)+T(214,22,'Tay đưa ra trước',{s:11.5,w:800,c:BLUE_T}));},
  function(){return svg('0 0 300 160','Ngồi xuống như ngồi ghế: lưng thẳng, gối không vượt quá mũi chân',
   floor(10,290,150)+g(138,150,1,chairGhost(-6)+squatGood())+
   '<path d="M100 110L128 60" stroke="'+GREEN+'" stroke-width="3" stroke-linecap="round" opacity=".9"/>'+
   dash(149,96,149,150,GREEN,2)+check(238,80,8)+
   T(70,40,'Lưng thẳng',{s:11.5,w:800,c:GREEN_T})+'<path d="M90 46l20 26" stroke="'+GREEN+'" stroke-width="1.4"/>'+
   T(238,100,'Gối không quá',{s:11.5,w:800,c:GREEN_T})+T(238,115,'mũi chân',{s:11.5,w:800,c:GREEN_T})+'<path d="M200 106h-42" stroke="'+GREEN+'" stroke-width="1.4"/>');},
  function(){return svg('0 0 300 160','Đứng lên và đếm, làm đủ 10 lần, thở đều',
   floor(10,290,150)+g(66,150,1,squatGood(),' opacity=".28"')+arrow(108,104,132,82,BLUE,2.6)+g(160,150,1,standSide({armsFwd:true}))+
   bubble(204,26,84,52,['1, 2, 3…','… 10'],{tail:'bl',s:13})+
   '<path d="M210 112q8-8 16 0t16 0t16 0" stroke="#7FB3D5" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+T(234,134,'Thở đều',{s:11.5,w:800,c:BLUE_T}));}
 ],
 key:function(){return '<figure class="ill hv-key hv-anim">'+svg('0 0 340 170','Hình động: xuống chậm, lên nhẹ, làm 10 lần',
   floor(20,320,158)+g(120,158,1,chairGhost(-6)+'<g class="hv-p1">'+standSide({armsFwd:true})+'</g><g class="hv-p2">'+squatHalf()+'</g><g class="hv-p3">'+squatGood()+'</g>')+
   '<g class="hv-p1">'+arrow(64,66,64,98,BLUE,2.6)+'</g><g class="hv-p2">'+arrow(64,66,64,98,BLUE,2.6)+'</g><g class="hv-p3">'+arrow(64,98,64,66,GREEN,2.6)+'</g>'+
   T(240,58,'Xuống chậm',{s:13,w:800,c:BLUE_T})+T(240,80,'Lên nhẹ',{s:13,w:800,c:GREEN_T})+T(240,102,'× 10 lần',{s:13,w:800,c:'#C98A12'})+
   shinMini('cheer',262,108,46))+'<figcaption>Nhịp một lần: xuống chậm, lên nhẹ.</figcaption></figure>';},
 pair:function(){return pair('Nên: lưng thẳng, gối sau mũi chân. Tránh: gập lưng, gối vượt mũi chân.',
   floor(10,150,136)+g(84,136,.92,chairGhost(-6)+squatGood({girl:true}))+dash(94,74,94,136,GREEN,2),
   floor(10,150,136)+g(62,136,.92,squatBad({girl:true}))+dash(72,70,72,136,RED,2)+'<circle cx="84" cy="105" r="9" fill="none" stroke="'+RED+'" stroke-width="2"/>',
   ['Lưng thẳng','gối sau mũi chân'],['Gập lưng','gối vượt mũi chân']);},
 tip:['cheer','Tưởng tượng phía sau có một cái ghế. Đẩy mông ra sau như sắp ngồi xuống, gối sẽ không vượt mũi chân.']
};

/* =========================================================
   NGỦ ĐỦ GIẤC
   ========================================================= */
function bed(x,y,w,o){o=o||{};var s='<rect x="'+x+'" y="'+(y-4)+'" width="'+w+'" height="20" rx="4" fill="#fff" stroke="'+K+'" stroke-width="1.6"/>'+
  '<path d="M'+(x+3)+' '+(y+16)+'v12M'+(x+w-3)+' '+(y+16)+'v12" stroke="'+WOOD_D+'" stroke-width="4" stroke-linecap="round"/>'+
  '<rect x="'+(x+w-8)+'" y="'+(y-30)+'" width="10" height="56" rx="3" fill="'+WOOD+'" stroke="'+K+'" stroke-width="1.5"/>'+
  '<rect x="'+(x+w-38)+'" y="'+(y-14)+'" width="28" height="12" rx="6" fill="#fff" stroke="'+K+'" stroke-width="1.5"/>';
 if(o.sleeper){var hx=x+w-24,hy=y-16;s+=g(hx,hy,1,head(0,0,0,{closed:!o.awake,girl:o.girl,sad:o.sad}),'');}
 s+='<path d="M'+(x+2)+' '+(y-2)+'q'+(w*.2)+' -18 '+(w-46)+' -12q10 1 10 10v12h-'+(w-36)+'z" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.6" stroke-linejoin="round"/>';
 return s;}
function desk(x,y,w){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="8" rx="3" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.5"/><path d="M'+(x+8)+' '+(y+8)+'v'+(196-y-8)+'M'+(x+w-8)+' '+(y+8)+'v'+(196-y-8)+'" stroke="'+WOOD_D+'" stroke-width="4" stroke-linecap="round"/>';}
function charging(x,y){return phone(x,y)+'<path d="M'+x+' '+(y+11)+'q0 10 12 10h14" stroke="'+K+'" stroke-width="1.6" fill="none"/><rect x="'+(x+26)+'" y="'+(y+16)+'" width="9" height="10" rx="2" fill="#fff" stroke="'+K+'" stroke-width="1.4"/><path d="M'+(x-2)+' '+(y-4)+'l3-4v3h2l-3 4v-3z" fill="'+GREEN+'" transform="translate(2 2)"/>';}
function bag(x,y,o){o=o||{};return '<rect x="'+x+'" y="'+y+'" width="34" height="28" rx="7" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.5"/><path d="M'+(x+9)+' '+y+'q8-10 16 0" stroke="'+K+'" stroke-width="2" fill="none"/>'+(o.open?'':'<path d="M'+(x+4)+' '+(y+9)+'h26" stroke="'+K+'" stroke-width="1.2"/>');}
function shirtFold(x,y){return '<path d="M'+x+' '+y+'h30v14h-30z" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.4"/><path d="M'+(x+10)+' '+y+'l5 6 5-6" stroke="'+K+'" stroke-width="1.2" fill="none"/>';}
var NG={
 duo:function(){
  var a='<rect x="96" y="28" width="50" height="40" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.4"/>'+moon(112,44,7)+'<circle cx="134" cy="38" r="1.3" fill="#fff"/><circle cx="128" cy="56" r="1" fill="#fff"/>'+
   floor(6,154,140)+bed(8,118,104,{sleeper:true,girl:true})+'<rect x="118" y="104" width="34" height="6" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.2"/><path d="M124 110v30M146 110v30" stroke="'+WOOD_D+'" stroke-width="3"/>'+g(126,96,.8,phone(0,0))+'<path d="M126 105q0 8 10 8" stroke="'+K+'" stroke-width="1.2" fill="none"/>';
  var row=function(y,jp,ic,t1){return '<rect x="10" y="'+y+'" width="140" height="44" rx="10" fill="#fff" stroke="#D5DEEF" stroke-width="1.2"/>'+T(34,y+19,jp,{jp:1,s:12,w:700,c:'#B5402F'})+T(34,y+35,ic==='sun'?'Ca sớm':'Ca muộn',{s:10.5,w:600,c:MUTE})+
    (ic==='sun'?sun(76,y+22,6):moon(76,y+22,7))+arrow(90,y+22,104,y+22,MUTE,1.8)+T(128,y+19,t1[0],{s:10.5,w:700,c:BLUE_T})+T(128,y+33,t1[1],{s:10.5,w:700,c:BLUE_T});};
  var b=row(38,'早番','sun',['ngủ','sớm hơn'])+row(90,'遅番','moon',['dậy','muộn hơn']);
  return duo('Bây giờ: ngủ theo lịch học. Sang Nhật: ngủ theo ca làm, ca sớm ngủ sớm hơn, ca muộn dậy muộn hơn.',a,b,['Ngủ theo lịch học'],['Ngủ theo ca làm'],154,['BÂY GIỜ','SANG NHẬT']);},
 steps:[
  function(){var s=pill(34,18,44,'Ví dụ','#fff',MUTE)+T(170,22,'Bắt đầu từ giờ cần dậy, tính ngược lại',{s:11.5,w:800,c:BLUE_T});
   s+='<rect x="26" y="78" width="52" height="16" rx="8" fill="'+YEL+'"/><rect x="74" y="78" width="160" height="16" rx="4" fill="#2F3D5A"/>'+
    '<g fill="#F4D77A"><circle cx="90" cy="86" r="1.6"/><circle cx="130" cy="84" r="1.3"/><circle cx="170" cy="88" r="1.6"/><circle cx="210" cy="85" r="1.3"/></g>';
   s+=clock(262,74,17,'',{bells:true,c:'#B5402F'})+T(262,116,'6:00',{s:13,w:800})+T(262,131,'Dậy',{s:11.5,w:700,c:MUTE});
   s+=moon(86,58,8)+T(90,116,'22:30',{s:13,w:800})+T(90,131,'Ngủ',{s:11.5,w:700,c:MUTE});
   s+=T(34,116,'22:00',{s:12,w:800,c:'#946400'})+T(34,131,'Chuẩn bị',{s:11,w:700,c:'#946400'});
   s+=arrow(230,58,110,58,BLUE,2)+T(166,50,'7–8 tiếng',{s:12,w:800,c:BLUE_T});
   return svg('0 0 300 150','Ví dụ: cần dậy lúc 6 giờ, tính ngược 7 đến 8 tiếng, chuẩn bị ngủ từ 22 giờ',s);},
  function(){var s=floor(10,290,150)+desk(14,100,104)+charging(36,88)+shirtFold(74,92)+bag(78,64)+
    bed(150,124,140,{})+shinMini('sleep',220,84,44)+
    arrow(124,72,170,72,GREEN,2)+T(147,62,'xa giường',{s:11,w:800,c:GREEN_T})+
    T(40,40,'Sạc ở bàn',{s:11.5,w:800,c:BLUE_T})+'<path d="M40 46v26" stroke="'+BLUE+'" stroke-width="1.3"/>'+T(96,30,'Đồ cho mai',{s:11.5,w:800,c:BLUE_T})+'<path d="M96 36v24" stroke="'+BLUE+'" stroke-width="1.3"/>';
   return svg('0 0 300 160','Chuẩn bị trước giờ đã chọn: sạc điện thoại ở bàn, soạn đồ cho mai',s);},
  function(){var rows=[['T2','22:30','6:00',176,1],['T3','0:15','6:00',110,0],['T4','22:30','6:00',176,1]],s='<rect x="18" y="12" width="264" height="130" rx="12" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.5"/>'+
    T(32,32,'Ngày',{a:'start',s:10.5,w:700,c:MUTE})+T(80,32,'Ngủ → Dậy',{a:'start',s:10.5,w:700,c:MUTE})+T(252,32,'Tỉnh táo?',{s:10,w:700,c:MUTE});
   rows.forEach(function(r,i){var y=58+i*30;s+=T(32,y+4,r[0],{a:'start',s:12,w:800})+'<rect x="68" y="'+(y-6)+'" width="'+r[3]+'" height="12" rx="6" fill="'+(r[4]?'#2F3D5A':'#E9A34D')+'"/>'+T(72,y-9,'',{})+
     T(68+r[3]-4,y+3.5,r[1]+' → '+r[2],{a:'end',s:9.5,w:700,c:'#fff'})+(r[4]?check(258,y,9):'<g transform="translate(258 '+y+')"><circle r="9" fill="'+YEL+'"/><path d="M0 -4.5v5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cy="4.5" r="1.4" fill="#fff"/></g>');});
   s+=T(150,152,'Ghi lại vài ngày, thấy chỗ cần chỉnh',{s:11,w:700,c:BLUE_T});
   return svg('0 0 300 160','Nhìn lại: ghi giờ ngủ, giờ dậy và cảm giác tỉnh táo vài ngày để điều chỉnh',s);}
 ],
 pair:function(){return pair('Nên: sạc điện thoại xa giường rồi ngủ. Tránh: nằm xuống rồi lướt điện thoại mãi.',
   floor(8,152,138)+bed(36,112,116,{sleeper:true,girl:true})+'<rect x="6" y="98" width="26" height="6" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.2"/><path d="M10 104v34M28 104v34" stroke="'+WOOD_D+'" stroke-width="3"/>'+g(19,88,.7,phone(0,0))+'<g fill="#9DB9E8"><text x="112" y="66" style="'+FONT_SVG+';font-weight:800" font-size="13">z</text><text x="122" y="56" style="'+FONT_SVG+';font-weight:800" font-size="10">z</text></g>',
   floor(8,152,138)+bed(20,112,130,{sleeper:true,awake:true,sad:true,girl:true})+phone(110,74,{glow:true,r:-12})+'<path d="M112 86l-6 12" stroke="'+K+'" stroke-width="1.4"/>'+clock(36,52,14,'1:00',{tc:RED_T}),
   ['Sạc xa giường','rồi tắt đèn'],['Nằm rồi lướt mãi','đến khuya']);},
 tip:['sleep','Đặt thêm một báo thức nhắc giờ chuẩn bị ngủ, không chỉ báo thức buổi sáng.'],
 spot:{w:340,h:232,
  scene:function(){var s='<rect width="340" height="232" fill="#EEF2FB"/><rect y="196" width="340" height="36" fill="#E6D8BE"/>'+
    '<rect x="22" y="18" width="74" height="56" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.6"/><path d="M59 18v56M22 46h74" stroke="'+K+'" stroke-width="1.2"/>'+moon(42,32,7)+'<circle cx="80" cy="28" r="1.3" fill="#fff"/><circle cx="72" cy="60" r="1.1" fill="#fff"/>';
   s+='<g transform="translate(150 40)"><circle r="16" fill="#fff" stroke="'+K+'" stroke-width="1.8"/><path d="M0 0L-6.4 -6.4M0 0V12" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/></g>'+T(150,72,'22:30',{s:11,w:800,c:MUTE});
   s+=desk(12,140,142);
   s+='<rect x="30" y="98" width="60" height="40" rx="4" fill="#CFE8FF" stroke="'+K+'" stroke-width="1.6"/><path d="M24 138h72" stroke="'+K+'" stroke-width="3.4" stroke-linecap="round"/><circle cx="60" cy="114" r="9" fill="'+BLUE+'"/><path d="M57 109v10l8-5z" fill="#fff"/>'+T(60,133,'Tập tiếp: 5…',{s:8.5,w:800,c:BLUE_T});
   s+='<rect x="102" y="120" width="12" height="19" rx="2" fill="#DDF1FA" stroke="'+K+'" stroke-width="1.4"/><rect x="104" y="128" width="8" height="9" fill="#9FD3FF"/>'+clock(132,128,10,'',{bells:true,c:'#B5402F'});
   s+='<g transform="rotate(-8 176 186)">'+bag(160,172,{open:true})+'</g><rect x="186" y="186" width="22" height="7" rx="1.5" fill="'+YEL+'" stroke="'+K+'" stroke-width="1.2" transform="rotate(14 197 189)"/><rect x="146" y="190" width="18" height="6" rx="1.5" fill="#9BD3AE" stroke="'+K+'" stroke-width="1.2" transform="rotate(-18 155 193)"/>'+
    '<path d="M196 200q8-10 18-4q6 6-2 10q-10 2-16-6z" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.3"/>';
   s+=bed(212,160,122,{sleeper:true,awake:true})+phone(282,114,{glow:true,r:-18})+arm([296,152],[286,140],[284,128],SHIRT,1);
   return svg('0 0 340 232','Phòng ngủ lúc 22 giờ 30 có vài chỗ chưa ổn',s);},
  spots:[
   {x:282,y:116,r:24,bad:true,name:'Điện thoại trên giường',fix:'Cắm sạc ở bàn, xa giường rồi mới nằm xuống.'},
   {x:60,y:117,r:28,bad:true,name:'Máy tính đang chiếu phim',fix:'Tắt máy trước khi tập sau tự chạy.'},
   {x:180,y:188,r:28,bad:true,name:'Cặp và đồ dưới sàn',fix:'Soạn cặp, để đồ cho mai một chỗ từ tối.'},
   {x:108,y:129,r:15,name:'Ly nước',fix:'Ly nước để sẵn cho sáng mai. Chỗ này ổn rồi.'},
   {x:132,y:128,r:15,name:'Đồng hồ báo thức',fix:'Báo thức đã đặt theo giờ cần dậy. Chỗ này ổn rồi.'}]}
};

/* =========================================================
   CHI TIÊU CÓ KẾ HOẠCH
   ========================================================= */
function jar(x,y,w,h,fill,label,o){o=o||{};var lv=o.level==null?.7:o.level,fh=(h-10)*lv;return '<rect x="'+(x+3)+'" y="'+(y+h-fh-2)+'" width="'+(w-6)+'" height="'+fh+'" rx="5" fill="'+fill+'"/>'+
  '<rect x="'+x+'" y="'+(y+6)+'" width="'+w+'" height="'+(h-6)+'" rx="9" fill="none" stroke="'+K+'" stroke-width="1.6"/><rect x="'+(x+4)+'" y="'+y+'" width="'+(w-8)+'" height="8" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.5"/>'+
  (label?T(x+w/2,y+h+15,label,{s:11,w:800,c:o.lc||INK}):'');}
function coin(x,y,r,t){r=r||7;return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+YEL+'" stroke="#C98A12" stroke-width="1.4"/>'+(t?T(x,y+r*.42,t,{s:r*1.15,w:800,c:'#946400'}):'');}
function envelope(x,y,t,c){return '<rect x="'+x+'" y="'+y+'" width="42" height="30" rx="4" fill="'+(c||'#fff')+'" stroke="'+K+'" stroke-width="1.4"/><path d="M'+x+' '+(y+1)+'l21 13 21-13" stroke="'+K+'" stroke-width="1.2" fill="none"/>'+T(x+21,y+26,t,{s:9.5,w:800,c:INK});}
function tag(x,y,t,ok){return '<rect x="'+(x-22)+'" y="'+(y-11)+'" width="44" height="18" rx="9" fill="'+(ok?'#E2F7EE':'#FFF0DE')+'" stroke="'+(ok?GREEN:'#E9A34D')+'" stroke-width="1.2"/>'+T(x,y+2,t,{s:9.5,w:800,c:ok?GREEN_T:'#A35A00'});}
var CT={
 duo:function(){
  var a=floor(6,154,140)+g(46,140,.8,standSide({girl:true,arms:[[16,-86,30,-80]]}))+'<g transform="translate(70 66) rotate(-8)"><rect width="34" height="42" rx="3" fill="#FFFDF6" stroke="'+K+'" stroke-width="1.4"/><path d="M6 12h22M6 20h22M6 28h14" stroke="#C9B07A" stroke-width="1.6" stroke-linecap="round"/></g>'+
   '<g transform="translate(110 104)"><rect width="38" height="26" rx="5" fill="#8A5A3B" stroke="'+K+'" stroke-width="1.4"/><path d="M24 8h16v12h-16z" fill="#A87451" stroke="'+K+'" stroke-width="1.2"/></g>'+coin(124,96,6)+coin(136,92,6)+moon(136,40,7);
  var b=envelope(10,34,'Nhà')+envelope(59,34,'Ăn')+envelope(108,34,'Đi lại')+envelope(30,78,'Để dành','#E2F7EE')+envelope(86,78,'Gửi về','#E5EFFC')+coin(80,128,9,'¥')+coin(100,132,7)+coin(62,132,7);
  return duo('Bây giờ: ghi lại tiền làm thêm, tiền chi mỗi tối. Sang Nhật: lương chia nhiều khoản như nhà, ăn, đi lại, để dành, gửi về.',a,b,['Ghi 1 dòng mỗi tối'],['Lương chia nhiều khoản'],154,['BÂY GIỜ','SANG NHẬT']);},
 steps:[
  function(){var s='<g transform="translate(40 20)"><path d="M0 0h70v110l-7-5-7 5-7-5-7 5-7-5-7 5-7-5-7 5-7-5-7 5z" fill="#fff" stroke="'+K+'" stroke-width="1.5"/>'+
    T(35,18,'HÓA ĐƠN',{s:9.5,w:800,c:MUTE})+'<path d="M8 30h54M8 42h40M8 54h46" stroke="#D5DEEF" stroke-width="2" stroke-linecap="round"/>'+T(8,78,'Cơm trưa',{a:'start',s:10.5,w:700})+T(62,92,'35.000đ',{a:'end',s:11,w:800,c:BLUE_T})+'</g>';
   s+=arrow(124,78,160,78,BLUE,2.4);
   s+='<g transform="translate(176 14)"><rect width="74" height="126" rx="12" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.5"/><rect x="6" y="12" width="62" height="102" rx="6" fill="#fff"/>'+T(37,30,'Ghi chú',{s:10,w:800,c:MUTE})+
    '<rect x="11" y="40" width="52" height="30" rx="6" fill="#E5EFFC"/>'+T(37,53,'Cơm trưa',{s:9.5,w:700,c:INK})+T(37,65,'35.000đ',{s:10,w:800,c:BLUE_T})+'<path d="M14 82h46M14 92h32" stroke="#E4E8F2" stroke-width="2" stroke-linecap="round"/></g>';
   s+=pill(270,22,40,'Ví dụ','#fff',MUTE)+T(90,152,'Giữ hóa đơn',{s:11.5,w:800,c:BLUE_T})+T(213,152,'hoặc ghi nhanh',{s:11.5,w:800,c:BLUE_T});
   return svg('0 0 300 160','Nhớ số tiền mỗi lần trả: giữ hóa đơn hoặc ghi nhanh vào điện thoại',s);},
  function(){var s='<rect x="16" y="12" width="268" height="126" rx="12" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.5"/>'+moon(262,32,8);
   for(var i=0;i<7;i++)s+='<circle cx="'+(46+i*34)+'" cy="12" r="4" fill="#fff" stroke="#686E76" stroke-width="1.4"/>';
   s+=T(32,42,'Món',{a:'start',s:11,w:800,c:BLUE_T})+T(150,42,'Tiền',{a:'start',s:11,w:800,c:BLUE_T})+T(216,42,'Cần/Thích',{s:11,w:800,c:BLUE_T})+'<path d="M30 50h240" stroke="#EADCB8" stroke-width="1.4"/>';
   [['Cơm trưa','35.000',1],['Trà sữa','30.000',0],['Vé xe buýt','7.000',1]].forEach(function(r,i){var y=70+i*24;s+=T(32,y,r[0],{a:'start',s:12,w:600})+T(150,y,r[1],{a:'start',s:12,w:700})+tag(216,y-4,r[2]?'CẦN':'THÍCH',r[2])+'<path d="M30 '+(y+9)+'h240" stroke="#F1E8D2" stroke-width="1"/>';});
   s+=T(150,154,'Mỗi tối một lượt, chưa đến 1 phút',{s:11,w:700,c:MUTE});
   return svg('0 0 300 160','Tối ghi một dòng: món gì, bao nhiêu tiền, cần hay thích',s);},
  function(){var s='<g transform="translate(16 40)"><path d="M10 0l12-6q6 6 14 0l12 6 10 18-12 6v40h-48v-40l-12-6z" fill="#F29A3C" stroke="'+K+'" stroke-width="1.5" stroke-linejoin="round"/></g>'+
    '<g transform="translate(56 30) rotate(14)"><rect width="34" height="18" rx="4" fill="'+RED+'"/>'+T(17,13,'SALE',{s:10,w:800,c:'#fff'})+'</g>'+T(42,132,'Món THÍCH',{s:11.5,w:800,c:'#A35A00'});
   s+='<g transform="translate(104 46)"><rect width="52" height="52" rx="8" fill="#fff" stroke="'+K+'" stroke-width="1.5"/><rect width="52" height="14" rx="7" fill="'+RED+'"/><path d="M0 8h52v6H0z" fill="'+RED+'"/>'+T(26,40,'+1',{s:18,w:800,c:INK})+'</g>'+T(130,124,'chờ 1 ngày',{s:11.5,w:800,c:BLUE_T})+arrow(84,72,100,72,MUTE,2)+arrow(160,72,176,72,MUTE,2);
   s+='<rect x="182" y="30" width="108" height="36" rx="10" fill="#E5EFFC"/>'+T(236,46,'Vẫn cần?',{s:11,w:800,c:BLUE_T})+T(236,60,'→ cân nhắc mua',{s:10.5,w:700,c:BLUE_T})+
    '<rect x="182" y="76" width="108" height="36" rx="10" fill="#E2F7EE"/>'+T(236,92,'Hết muốn?',{s:11,w:800,c:GREEN_T})+T(236,106,'→ tiền ở lại',{s:10.5,w:700,c:GREEN_T})+
    jar(212,120,22,28,YEL,'',{level:.6})+shinMini('cheer',242,114,40);
   return svg('0 0 300 160','Món thích thì chờ một ngày. Hôm sau vẫn cần mới cân nhắc mua, hết muốn thì tiền ở lại',s);}
 ],
 pair:function(){return pair('Nên: để riêng tiền cho thứ cần trước. Tránh: tiêu trước, còn bao nhiêu mới để dành.',
   coin(80,34,9,'¥')+arrow(80,48,52,70,GREEN,2)+arrow(80,48,108,70,GREEN,1.6)+jar(30,74,44,52,GREEN,'CẦN',{level:.85,lc:GREEN_T})+jar(90,92,36,34,'#F29A3C','THÍCH',{level:.5,lc:'#A35A00'}),
   '<g transform="translate(22 40)"><path d="M0 14h36l-4 38h-28z" fill="#F29A3C" stroke="'+K+'" stroke-width="1.5"/><path d="M10 14q0-12 8-12t8 12" stroke="'+K+'" stroke-width="1.6" fill="none"/></g>'+
   '<g transform="translate(58 58)"><path d="M0 10h28l-3 28h-22z" fill="#C79BE0" stroke="'+K+'" stroke-width="1.5"/><path d="M8 10q0-9 6-9t6 9" stroke="'+K+'" stroke-width="1.5" fill="none"/></g>'+
   jar(104,74,40,52,GREEN,'Để dành',{level:.04,lc:RED_T})+T(124,108,'?',{s:20,w:800,c:RED_T}),
   ['Để riêng tiền CẦN trước'],['Tiêu trước, còn mới để dành']);},
 tip:['think','Trước khi trả tiền, hỏi nhỏ một câu: mình CẦN hay chỉ THÍCH?']
};

/* =========================================================
   BÁO CÁO VÀ XÁC NHẬN (Hō-Ren-Sō)
   ========================================================= */
var TEACH={shirt:'#FCE3D0',girl:true},LEAD={shirt:'#FFE9B8',cap:'#E9A34D'};
function hrsTag(jp,vi){return '<rect x="8" y="8" width="96" height="22" rx="11" fill="#fff" stroke="#F3B2A7" stroke-width="1.2"/>'+T(32,23,jp,{jp:1,s:11.5,w:700,c:'#B5402F'})+T(78,23,vi,{s:11,w:800,c:'#B5402F'});}
var HR={
 duo:function(){
  var a=floor(6,154,162)+g(50,162,.64,standSide({arms:[[14,-82,24,-72]]}))+g(118,162,.64,standSide(Object.assign({f:-1,arms:[[-4,-76,-6,-56]]},TEACH)))+
   bubble(12,36,104,40,['Em xin báo:','bài xong rồi ạ.'],{tail:'bl',s:10.5});
  var b=floor(6,154,162)+g(50,162,.64,standSide({cap:true,girl:true,shirt:'#DCE7F7',arms:[[14,-82,24,-72]]}))+g(118,162,.64,standSide(Object.assign({f:-1,arms:[[-4,-76,-6,-56]]},LEAD)))+
   bubble(12,36,104,40,['報告します','Em xin báo cáo'],{tail:'bl',s:10.5,jp:1});
  return duo('Ở trường: báo lại với thầy cô. Ở Nhật: báo cáo với tổ trưởng, 報告します, em xin báo cáo.',a,b,['Báo thầy cô'],['Báo tổ trưởng'],176);},
 steps:[
  function(){var s=hrsTag('報告','Báo')+floor(10,290,182)+box(24,150,30,26)+check(39,140,9)+g(96,182,.8,standSide({arms:[[16,-84,28,-74]]}))+g(236,182,.8,standSide(Object.assign({f:-1,arms:[[-4,-76,-6,-56]]},TEACH)))+
    bubble(108,26,112,40,['Em đã làm xong','… rồi ạ.'],{tail:'bl',s:11.5});
   return svg('0 0 300 190','Xong việc thì báo lại một câu với người giao việc',s);},
  function(){var s=hrsTag('連絡','Liên lạc')+'<g transform="translate(64 36)"><rect width="112" height="118" rx="14" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.5"/><rect x="7" y="10" width="98" height="100" rx="8" fill="#fff"/>'+
    T(56,26,'Cô chủ nhiệm',{s:10.5,w:800,c:MUTE})+'<rect x="16" y="36" width="84" height="46" rx="9" fill="'+BLUE+'"/>'+T(58,52,'Em bị sốt, xin',{s:10.5,w:700,c:'#fff'})+T(58,66,'nghỉ hôm nay ạ.',{s:10.5,w:700,c:'#fff'})+
    T(96,96,'7:30 · Đã gửi',{a:'end',s:9.5,w:700,c:GREEN_T})+'</g>';
   s+=clock(236,74,22,'',{})+T(236,116,'8:00 vào học',{s:11.5,w:800,c:'#B5402F'})+T(236,132,'báo trước giờ',{s:11,w:700,c:MUTE})+arrow(186,74,208,74,GREEN,2.2);
   return svg('0 0 300 160','Có thay đổi thì liên lạc ngay, trước giờ học hoặc giờ làm',s);},
  function(){var s=hrsTag('相談','Bàn')+floor(10,290,182)+g(70,182,.8,standSide({girl:true,arms:[[16,-80,26,-70]]}))+'<g transform="translate(86 122) rotate(-10)"><rect width="20" height="26" rx="2" fill="#FFFDF6" stroke="'+K+'" stroke-width="1.3"/><path d="M4 8h12M4 14h12M4 20h8" stroke="#C9B07A" stroke-width="1.4"/></g>'+
    g(236,182,.8,standSide(Object.assign({f:-1,arms:[[-4,-76,-6,-56]]},LEAD)))+
    bubble(40,30,150,40,['Em nhắc lại: kho B,','trước 10 giờ, đúng không ạ?'],{tail:'bl',s:10.5})+bubble(204,34,78,26,['Đúng rồi.'],{tail:'br',s:11,st:GREEN,c:GREEN_T});
   return svg('0 0 300 190','Chưa chắc thì hỏi, nhắc lại để xác nhận rồi mới làm',s);}
 ],
 pair:function(){return pair('Nên: nói kết luận trước, lý do sau. Tránh: kể dài rồi mới nói kết quả.',
   bubble(12,32,136,62,['Dạ, xong 2/3 phần.','Phần cuối xong','trước thứ Sáu ạ.'],{tail:'bl',s:11.5,st:GREEN,c:GREEN_T})+shinMini('proud',104,96,40),
   '<rect x="12" y="32" width="136" height="80" rx="10" fill="#fff" stroke="#D9A49A" stroke-width="1.6"/><path d="M24 50h108M24 62h96M24 74h104M24 86h80" stroke="#E9D4CF" stroke-width="4" stroke-linecap="round"/>'+T(80,104,'… rồi kết quả ở cuối',{s:10.5,w:700,c:RED_T}),
   ['Kết luận trước','lý do sau'],['Kể dài trước','kết quả ở cuối']);},
 tip:['think','Câu đầu tiên nói kết quả: xong, chưa xong hay đang vướng. Chi tiết nói sau.']
};
/* =========================================================
   ĐỢT 2 · đồ vật dùng thêm
   ========================================================= */
function glass(x,y,s){s=s||1;return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-7 -10h14l-2 20h-10z" fill="#EAF6FC" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M-5.6 -3h11.2l-1.3 12h-8.6z" fill="#9FD3FF"/></g>';}
function bottle(x,y,r,s){return '<g transform="translate('+x+' '+y+') rotate('+(r||0)+') scale('+(s||1)+')"><rect x="-6" y="-14" width="12" height="28" rx="4" fill="#9FD3FF" stroke="'+K+'" stroke-width="1.4"/><rect x="-4" y="-19" width="8" height="6" rx="1.5" fill="'+BLUE+'" stroke="'+K+'" stroke-width="1.2"/><path d="M-6 -2h12" stroke="#fff" stroke-width="2"/></g>';}
function backpack(x,y,bot){return (bot?bottle(x+40,y+14,8,.9):'')+'<rect x="'+x+'" y="'+y+'" width="40" height="46" rx="10" fill="#F29A3C" stroke="'+K+'" stroke-width="1.5"/><rect x="'+(x+7)+'" y="'+(y+22)+'" width="26" height="16" rx="5" fill="#F7B565" stroke="'+K+'" stroke-width="1.3"/><path d="M'+(x+12)+' '+y+'q8-12 16 0" stroke="'+K+'" stroke-width="2.2" fill="none"/>'+(bot?'<rect x="'+(x+34)+'" y="'+(y+18)+'" width="12" height="22" rx="4" fill="#F7B565" stroke="'+K+'" stroke-width="1.3"/>':'');}
function nightstand(x,y,w){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="7" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.3"/><path d="M'+(x+5)+' '+(y+7)+'V150M'+(x+w-5)+' '+(y+7)+'V150" stroke="'+WOOD_D+'" stroke-width="3.4"/>';}
function carrier(o){o=o||{};var f=o.f==null?1:o.f,s=standSide(Object.assign({arms:[[14*f,-84,26*f,-78]]},o));var bx=f>0?10:-36,n=o.n||2,bs='';for(var i=0;i<n;i++)bs+=box(bx,-104-i*22+(o.lean?i*1.5:0),26,22,i%2?'#F1C98C':'#E3B97F');return s+bs+(o.sweat?'<path d="M'+(f>0?-14:14)+' -128q-3 5 0 7q3-2 0-7z" fill="#8FD0E8"/>':'');}
function tray(x,y,w){return '<path d="M'+x+' '+y+'h'+w+'l-8 16h-'+(w-16)+'z" fill="#DCE3F2" stroke="'+K+'" stroke-width="1.5" stroke-linejoin="round"/>';}
function bowlRice(x,y){return '<path d="M'+(x-16)+' '+y+'q16 22 32 0z" fill="#fff" stroke="'+K+'" stroke-width="1.4"/><path d="M'+(x-15)+' '+y+'q15-14 30 0z" fill="#fff" stroke="'+K+'" stroke-width="1.2"/><g fill="#D5DEEF"><circle cx="'+(x-5)+'" cy="'+(y-4)+'" r="1.4"/><circle cx="'+(x+4)+'" cy="'+(y-6)+'" r="1.4"/><circle cx="'+(x+7)+'" cy="'+(y-2)+'" r="1.4"/></g>';}
function veg(x,y){return '<ellipse cx="'+x+'" cy="'+(y+2)+'" rx="18" ry="6" fill="#fff" stroke="'+K+'" stroke-width="1.3"/><g fill="#4CB27A" stroke="#2C7A4E" stroke-width="1"><ellipse cx="'+(x-7)+'" cy="'+(y-3)+'" rx="7" ry="4.5" transform="rotate(-20 '+(x-7)+' '+(y-3)+')"/><ellipse cx="'+(x+5)+'" cy="'+(y-4)+'" rx="7" ry="4.5" transform="rotate(18 '+(x+5)+' '+(y-4)+')"/><ellipse cx="'+x+'" cy="'+(y-7)+'" rx="5.5" ry="4"/></g>';}
function fish(x,y){return '<ellipse cx="'+x+'" cy="'+(y+2)+'" rx="20" ry="6" fill="#fff" stroke="'+K+'" stroke-width="1.3"/><path d="M'+(x-12)+' '+(y-3)+'q10-9 20 0q-10 8-20 0zM'+(x+8)+' '+(y-3)+'l7-5v10z" fill="#E9A35A" stroke="'+K+'" stroke-width="1.2" stroke-linejoin="round"/><circle cx="'+(x-6)+'" cy="'+(y-4)+'" r="1.1" fill="'+K+'"/>';}
function noodle(x,y){return '<path d="M'+(x-14)+' '+(y-24)+'h28l-4 30h-20z" fill="#fff" stroke="'+K+'" stroke-width="1.5" stroke-linejoin="round"/><rect x="'+(x-15)+'" y="'+(y-28)+'" width="30" height="6" rx="2" fill="'+RED+'" stroke="'+K+'" stroke-width="1.3"/><path d="M'+(x-10)+' '+(y-12)+'q5-4 10 0t10 0" stroke="#E9A34D" stroke-width="2" fill="none"/>';}
function soda(x,y){return '<rect x="'+(x-8)+'" y="'+(y-24)+'" width="16" height="26" rx="3" fill="#E8604F" stroke="'+K+'" stroke-width="1.4"/><path d="M'+(x-8)+' '+(y-14)+'h16" stroke="#fff" stroke-width="2.4"/>';}
function snack(x,y){return '<path d="M'+(x-14)+' '+(y-28)+'h28l-3 6 3 22-3 6h-22l-3-6 3-22z" fill="#F4B63B" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M'+(x-6)+' '+(y-14)+'l4-4 4 4 4-4" stroke="#B5402F" stroke-width="2" fill="none" stroke-linecap="round"/>';}
function banana(x,y){return '<path d="M'+(x-16)+' '+(y-10)+'q14 16 32 0q-6 4-14 4q-12 0-18-4z" fill="#F7D65A" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/>';}
function chip(x,y,t,on){var w=t.length*7.4+18;return '<rect x="'+(x-w/2)+'" y="'+(y-12)+'" width="'+w+'" height="24" rx="12" fill="'+(on?'#FDECE8':'#fff')+'" stroke="'+(on?RED:'#C9CEE0')+'" stroke-width="'+(on?2:1.3)+'"/>'+T(x,y+4.5,t,{s:12,w:on?800:600,c:on?RED_T:MUTE});}
function notebook(x,y,w,h,lines){var s='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.5"/>';for(var i=0;i<Math.floor(w/26);i++)s+='<circle cx="'+(x+14+i*26)+'" cy="'+y+'" r="3.5" fill="#fff" stroke="#686E76" stroke-width="1.3"/>';
 (lines||[]).forEach(function(l,i){s+=T(x+12,y+26+i*20,l[0],{a:'start',s:l[1]||12,w:l[2]||700,c:l[3]||INK,jp:l[4]});});return s;}
function wrench(x,y,r){return '<g transform="translate('+x+' '+y+') rotate('+(r||-35)+')"><rect x="-3.5" y="-2" width="7" height="34" rx="3" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.4"/><path d="M-9 -4a9 9 0 1 1 18 0l-5 0v-6h-8v6z" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/></g>';}
function bench(x,w){return '<rect x="'+x+'" y="-34" width="'+w+'" height="7" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.3"/><path d="M'+(x+6)+' -27V0M'+(x+w-6)+' -27V0" stroke="'+WOOD_D+'" stroke-width="3.4"/>';}
function sitBench(o){return sitChair(Object.assign({legs:[[-6,-34,18,-34,18,-6]],hip:[-6,-34],sh:[-4,-72],head:[-1,-94]},o||{}));}

/* =========================================================
   ĂN UỐNG DINH DƯỠNG, ĐIỀU ĐỘ
   ========================================================= */
var AU={
 duo:function(){
  var a=floor(6,154,140)+g(52,140,.8,standSide({girl:true,arms:[[14,-90,13,-106]]}))+bottle(72,49,-70,.85)+backpack(98,92,true);
  var b=floor(6,154,140)+g(92,140,.8,standSide({f:-1,arms:[[-18,-88,-30,-86]]}))+
   '<rect x="6" y="104" width="148" height="36" rx="3" fill="#E6ECF5" stroke="'+K+'" stroke-width="1.4"/><rect x="18" y="98" width="42" height="7" rx="2" fill="#6B7A99"/>'+
   '<path d="M24 98v-14h30v14z" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.4"/><path d="M20 84h38" stroke="'+K+'" stroke-width="2.4" stroke-linecap="round"/><path d="M32 76q-3-5 0-9M42 76q-3-5 0-9" stroke="#9DB9E8" stroke-width="1.6" fill="none" stroke-linecap="round"/>'+
   '<rect x="112" y="88" width="36" height="16" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.3"/><rect x="112" y="84" width="36" height="6" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.2"/>';
  return duo('Bây giờ: mang bình nước, ăn đủ bữa. Sang Nhật: tự nấu ăn, chuẩn bị cơm hộp.',a,b,['Đủ nước, đủ bữa'],['Tự nấu, mang cơm hộp'],154,['BÂY GIỜ','SANG NHẬT']);},
 steps:[
  function(){var s='<rect x="22" y="18" width="62" height="50" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.4"/><path d="M53 18v50M22 43h62" stroke="'+K+'" stroke-width="1.2"/>'+moon(40,32,7)+
    floor(10,290,150)+bed(150,124,140,{sleeper:true,girl:true})+nightstand(104,112,40)+glass(124,100,1.1)+
    T(124,62,'Ly nước',{s:11.5,w:800,c:BLUE_T})+'<path d="M124 68v18" stroke="'+BLUE+'" stroke-width="1.3"/>'+T(212,40,'Đặt từ tối, cạnh giường',{s:11.5,w:800,c:BLUE_T});
   return svg('0 0 300 160','Tối đặt sẵn một ly nước cạnh giường hoặc bàn học',s);},
  function(){var s='<rect x="22" y="18" width="62" height="50" rx="4" fill="#DDEBFA" stroke="'+K+'" stroke-width="1.4"/><path d="M53 18v50M22 43h62" stroke="'+K+'" stroke-width="1.2"/>'+sun(40,32,6)+
    floor(10,290,150)+bed(30,118,150,{})+g(112,150,1,sitChair({f:1,legs:[[-6,-38,18,-38,18,-6]],hip:[-6,-38],sh:[-4,-76],head:[-1,-98],arms:[[10,-82,15,-96]]}))+glass(128,52,1)+
    nightstand(212,110,44)+'<rect x="222" y="104" width="22" height="7" rx="2" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.2"/>'+
    '<g transform="translate(150 22)"><circle r="10" fill="'+GREEN+'"/>'+T(0,4.5,'1',{s:12,w:800,c:'#fff'})+'</g>'+T(194,26,'Uống nước',{s:11.5,w:800,c:GREEN_T})+
    '<g transform="translate(234 74)"><circle r="10" fill="#9DA9BC"/>'+T(0,4.5,'2',{s:12,w:800,c:'#fff'})+'</g>'+T(234,58,'Điện thoại: sau',{s:11,w:700,c:MUTE});
   return svg('0 0 300 160','Uống nước ngay khi thức dậy, trước khi mở điện thoại',s);},
  function(){var s='<circle cx="110" cy="80" r="62" fill="#fff" stroke="'+K+'" stroke-width="1.8"/><circle cx="110" cy="80" r="54" fill="none" stroke="#E4E8F2" stroke-width="1.4"/><path d="M110 26v108M110 80h54" stroke="#C9CEE0" stroke-width="1.6"/>';
   s+='<g fill="#F4F1EA" stroke="#D5DEEF" stroke-width="1">'+[[78,58],[90,72],[72,82],[86,96],[96,56],[70,104],[96,108],[80,70]].map(function(p){return '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="4.5" ry="3"/>';}).join('')+'</g>';
   s+=veg(138,56)+'<g transform="translate(136 104)"><ellipse cx="-6" cy="-2" rx="9" ry="7" fill="#fff" stroke="'+K+'" stroke-width="1.3"/><circle cx="-6" cy="-2" r="3.6" fill="'+YEL+'"/><path d="M4 -8q10-6 18 0q-8 6-18 0z" fill="#E9A35A" stroke="'+K+'" stroke-width="1.2"/></g>';
   s+=T(56,152,'Cơm',{s:11.5,w:800,c:INK})+'<path d="M64 144l14-20" stroke="'+MUTE+'" stroke-width="1.2"/>'+
    T(206,30,'Rau',{s:11.5,w:800,c:GREEN_T})+'<path d="M196 34l-34 14" stroke="'+GREEN+'" stroke-width="1.2"/>'+
    T(214,140,'Đạm: trứng, cá, thịt',{s:11.5,w:800,c:'#A35A00'})+'<path d="M190 130l-36-20" stroke="#E9A34D" stroke-width="1.2"/>'+
    banana(246,84)+'<circle cx="270" cy="66" r="10" fill="#F29A3C" stroke="'+K+'" stroke-width="1.4"/><path d="M270 56l2-4" stroke="#2C7A4E" stroke-width="2"/>'+T(258,112,'Trái cây',{s:11.5,w:800,c:'#A35A00'});
   return svg('0 0 300 160','Bữa chính có cơm, rau, đạm và trái cây',s);}
 ],
 pair:function(){return pair('Nên: mang bình nước đi học. Tránh: khát mới mua nước ngọt.',
   floor(10,150,138)+backpack(46,80,true)+g(116,138,.72,standSide({girl:true})),
   floor(10,150,138)+'<rect x="34" y="22" width="64" height="116" rx="6" fill="'+RED+'" stroke="'+K+'" stroke-width="1.6"/><rect x="42" y="32" width="48" height="58" rx="3" fill="#FFF3F0" stroke="'+K+'" stroke-width="1.2"/>'+
   [0,1,2].map(function(r){return [0,1,2].map(function(c){return '<rect x="'+(47+c*14)+'" y="'+(37+r*18)+'" width="10" height="14" rx="2" fill="'+['#E8604F','#F4B63B','#7FB3D5'][(r+c)%3]+'" stroke="'+K+'" stroke-width=".9"/>';}).join('');}).join('')+
   '<rect x="46" y="110" width="40" height="14" rx="3" fill="#2F3D5A"/>'+g(124,138,.72,standSide({f:-1,arms:[[-12,-82,-22,-74]]})),
   ['Mang bình nước','đi học'],['Khát mới mua','nước ngọt']);},
 tip:['hi','Uống xong ly nước buổi sáng rồi mới mở điện thoại: ghép hai việc thành một cặp.'],
 spot:{w:340,h:182,
  scene:function(){var s='<rect width="340" height="232" fill="#EEF2FB"/><rect x="0" y="0" width="340" height="112" fill="#F7EEDC"/>'+
    '<rect x="20" y="58" width="92" height="44" rx="5" fill="#DDEBFA" stroke="'+K+'" stroke-width="1.5"/><path d="M66 58v44" stroke="'+K+'" stroke-width="1.2"/>'+sun(42,76,6)+
    '<g transform="translate(230 80)"><circle r="16" fill="#fff" stroke="'+K+'" stroke-width="1.8"/><path d="M0 0V-11" stroke="'+K+'" stroke-width="2.2" stroke-linecap="round"/></g>'+T(278,84,'Giờ ăn trưa',{s:11,w:800,c:MUTE});
   s+='<rect x="6" y="158" width="328" height="12" rx="3" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.5"/><path d="M28 170v62M312 170v62" stroke="'+WOOD_D+'" stroke-width="6"/>';
   s+=noodle(44,158)+soda(84,158)+tray(108,142,120)+bowlRice(132,134)+veg(170,136)+fish(206,138)+banana(250,152)+snack(288,158)+bottle(322,142,0,1);
   return svg('0 50 340 182','Bàn ăn trưa có cơm, rau, cá và vài món nên thay',s);},
  spots:[
   {x:44,y:92,r:22,bad:true,name:'Ly mì gói',fix:'Thay bằng cơm hoặc bánh mì, thêm phần rau.'},
   {x:84,y:94,r:16,bad:true,name:'Lon nước ngọt',fix:'Đổi bằng nước lọc hoặc trà không đường.'},
   {x:288,y:92,r:20,bad:true,name:'Gói bánh snack',fix:'Thay bằng một phần trái cây.'},
   {x:168,y:86,r:30,name:'Khay cơm, rau, cá',fix:'Cơm, rau và cá: phần chính của bữa ăn. Chỗ này ổn rồi.'},
   {x:250,y:100,r:15,name:'Quả chuối',fix:'Trái cây sau bữa ăn. Chỗ này ổn rồi.'},
   {x:322,y:90,r:14,name:'Bình nước lọc',fix:'Bình nước mang từ nhà. Chỗ này ổn rồi.'}]}
};

/* =========================================================
   NHẬN BIẾT VÀ ĐIỀU CHỈNH CẢM XÚC
   ========================================================= */
var CX={
 duo:function(){
  var a=floor(6,154,162)+g(46,162,.64,standSide({arms:[[12,-72,20,-82]]}))+g(118,162,.64,standSide({f:-1,girl:true}))+
   bubble(10,40,62,26,['Haha!'],{tail:'bl',s:11,st:'#C9CEE0',c:MUTE})+'<circle cx="118" cy="60" r="14" fill="none" stroke="#7FB3D5" stroke-width="2" stroke-dasharray="3 3"/>'+T(118,42,'hít… thở…',{s:10,w:700,c:BLUE_T});
  var b=floor(6,154,162)+g(46,162,.64,standSide(Object.assign({arms:[[16,-84,26,-90]]},LEAD)))+g(118,162,.64,standSide({f:-1,cap:true,girl:true,shirt:'#DCE7F7'}))+
   bubble(8,36,72,28,['急いで!'],{tail:'bl',s:12,jp:1,st:'#E9A34D',c:'#A35A00'})+bubble(90,44,62,26,['はい'],{tail:'br',s:12,jp:1,st:GREEN,c:GREEN_T});
  return duo('Ở trường: bị bạn trêu, thở chậm trước khi đáp. Ở Nhật: bị nhắc nhanh lên lúc bận, vẫn bình tĩnh đáp vâng.',a,b,['Bị trêu: thở trước'],['Bị nhắc: vẫn bình tĩnh'],176);},
 steps:[
  function(){var s=g(84,82,2.4,head(0,0,0,{blush:true,mad:true,smile:false,sad:true}))+
    '<path d="M66 30q-4-5 0-10t0-10M84 26q-4-5 0-10t0-10M102 30q-4-5 0-10t0-10" stroke="#E8604F" stroke-width="2.2" fill="none" stroke-linecap="round"/>'+
    '<g transform="translate(200 62)"><path d="M0 12C-22-2-14-22 0-10C14-22 22-2 0 12z" fill="'+RED+'" stroke="'+K+'" stroke-width="1.6"/><path d="M-36 -6h-10M-34 4h-14M30 -6h10M32 4h14" stroke="'+RED+'" stroke-width="2" stroke-linecap="round"/></g>'+
    T(84,150,'Mặt nóng',{s:11.5,w:800,c:RED_T})+T(200,104,'Tim đập nhanh',{s:11.5,w:800,c:RED_T})+bubble(184,120,100,28,['Muốn nói ngay!'],{tail:'bl',s:11,st:RED,c:RED_T});
   return svg('0 0 300 160','Nhận ra dấu hiệu: mặt nóng, tim đập nhanh, muốn nói ngay',s);},
  function(){var s=floor(10,290,150)+g(70,150,1,standFront({girl:true,closed:true,arms:[[-11,-91,-14,-74,-6,-62],[11,-91,14,-74,6,-62]]}));
   s+='<circle cx="196" cy="60" r="40" fill="none" stroke="#C9DBF5" stroke-width="1.4" stroke-dasharray="3 4"/><g class="hv-breath"><circle cx="196" cy="60" r="34" fill="#E5EFFC" stroke="#7FB3D5" stroke-width="2"/></g>'+shinMini('still',178,40,36)+
    '<g class="hv-in">'+T(196,118,'Hít vào bằng mũi',{s:12.5,w:800,c:BLUE_T})+'</g><g class="hv-out">'+T(196,118,'Thở ra thật dài',{s:12.5,w:800,c:GREEN_T})+'</g>';
   s+=[0,1,2].map(function(i){return '<circle cx="'+(172+i*24)+'" cy="146" r="9" fill="'+GREEN+'"/>'+T(172+i*24,150.5,String(i+1),{s:11,w:800,c:'#fff'});}).join('')+T(258,150,'3 hơi',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Thở chậm ba hơi: hít bằng mũi, thở ra dài',s,'hv-anim-breath');},
  function(){var s=floor(10,290,150)+g(40,150,.85,standSide({}))+bubble(66,14,132,30,['“Mình đang bực.”'],{tail:'bl',s:12.5,st:RED,c:RED_T});
   s+=chip(96,70,'vui')+chip(138,70,'buồn')+chip(184,70,'lo')+chip(222,70,'mệt')+chip(264,70,'bực',true);
   s+=arrow(96,100,120,118,BLUE,2)+'<rect x="128" y="104" width="150" height="34" rx="10" fill="#E2F7EE"/>'+T(203,118,'Rồi mới chọn:',{s:10.5,w:700,c:GREEN_T})+T(203,132,'nói sau · đi uống nước',{s:11,w:800,c:GREEN_T});
   return svg('0 0 300 160','Gọi tên cảm xúc, như mình đang bực, rồi mới chọn cách nói hoặc làm',s);}
 ],
 pair:function(){var ph=function(x,y,body){return '<g transform="translate('+x+' '+y+')"><rect width="70" height="112" rx="12" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.5"/><rect x="5" y="10" width="60" height="92" rx="6" fill="#fff"/>'+body+'</g>';};
  return pair('Nên: nguôi rồi mới nhắn tin. Tránh: nhắn tin lúc đang giận.',
   ph(14,22,'<rect x="10" y="20" width="50" height="34" rx="7" fill="#EEF0F7"/><path d="M16 31h36M16 41h26" stroke="#C9CEE0" stroke-width="3" stroke-linecap="round"/>'+T(35,74,'Bản nháp',{s:9.5,w:700,c:MUTE}))+
   '<g transform="translate(118 64)"><circle r="20" fill="#fff" stroke="'+GREEN+'" stroke-width="2.2"/><path d="M0 0V-11M0 0l7 4" stroke="'+K+'" stroke-width="2" stroke-linecap="round"/></g>'+T(118,104,'đợi nguôi',{s:11,w:800,c:GREEN_T}),
   ph(14,22,'<rect x="10" y="20" width="50" height="40" rx="7" fill="'+RED+'"/>'+T(35,45,'!!!',{s:15,w:800,c:'#fff'})+T(35,80,'Đã gửi',{s:9.5,w:700,c:RED_T}))+
   g(118,138,.72,standSide({f:-1,mad:true,blush:true,smile:false,arms:[[-14,-84,-24,-76]]}))+'<path d="M96 46l8-10M108 50l10-6" stroke="'+RED+'" stroke-width="2.2" stroke-linecap="round"/>',
   ['Nguôi rồi','mới nhắn tin'],['Nhắn tin','lúc đang giận']);},
 tip:['comfort','Gọi tên cảm xúc không có nghĩa là phải hết buồn ngay. Chỉ cần biết mình đang thế nào để chọn bước tiếp theo.']
};

/* =========================================================
   GIÚP ĐỠ MỘT VIỆC
   ========================================================= */
var GD={
 duo:function(){
  var a=floor(6,154,162)+'<path d="M16 162L30 92" stroke="'+WOOD_D+'" stroke-width="3"/><path d="M10 162h14l-4-10h-6z" fill="#E3B97F" stroke="'+K+'" stroke-width="1.2"/>'+g(56,162,.64,standSide({girl:true,arms:[[14,-84,22,-76]]}))+g(122,162,.64,carrier({f:-1,n:2}))+
   bubble(8,36,96,28,['Mình giúp nhé?'],{tail:'bl',s:11});
  var b=floor(6,154,162)+g(56,162,.64,standSide({cap:true,shirt:'#DCE7F7',arms:[[14,-84,22,-76]]}))+g(122,162,.64,carrier({f:-1,n:3,cap:'#E9A34D',shirt:'#FFE9B8',girl:true,sweat:true}))+
   bubble(6,34,104,40,['何か手伝い','ましょうか'],{tail:'bl',s:11,jp:1});
  return duo('Ở trường: trực nhật xong, hỏi bạn có cần giúp không. Ở Nhật: xong việc, hỏi đồng nghiệp 何か手伝いましょうか.',a,b,['Xong trực nhật, hỏi bạn'],['Xong việc, hỏi đồng nghiệp'],176);},
 steps:[
  function(){var s=floor(10,290,150)+g(62,150,1,standFront({girl:true}))+'<rect x="120" y="18" width="160" height="118" rx="12" fill="#fff" stroke="#D5DEEF" stroke-width="1.4"/>'+T(136,40,'Việc của mình',{a:'start',s:12,w:800,c:BLUE_T});
   [['Lau bảng'],['Xếp ghế'],['Đã báo cô']].forEach(function(r,i){var y=66+i*26;s+=check(142,y-4,9)+T(158,y,r[0],{a:'start',s:12.5,w:700});});
   return svg('0 0 300 160','Xong phần việc của mình và đã báo lại, rồi mới giúp',s);},
  function(){var s=floor(10,290,150)+g(56,150,.92,standSide({}))+shinMini('curious',96,96,46)+
    '<path d="M66 44Q140 20 190 52" stroke="#9DB9E8" stroke-width="1.8" fill="none" stroke-dasharray="4 4"/>'+g(214,150,.92,carrier({f:-1,n:3,girl:true,sweat:true,lean:true}))+
    T(150,140,'Ai đang bưng vác?',{s:11.5,w:800,c:BLUE_T});
   return svg('0 0 300 160','Nhìn quanh xem ai đang bưng vác hoặc làm chậm',s);},
  function(){var s=floor(10,290,182)+g(70,182,.8,standSide({girl:true,arms:[[14,-84,22,-76]]}))+g(226,182,.8,carrier({f:-1,n:2}))+
    bubble(14,38,150,28,['Có cần mình giúp không?'],{tail:'bl',s:11.5})+bubble(186,14,104,26,['Ừ, cảm ơn nhé!'],{tail:'bl',s:11,st:GREEN,c:GREEN_T});
   return svg('0 0 300 190','Hỏi trước khi làm: có cần mình giúp không. Người kia đồng ý mới giúp',s);}
 ],
 pair:function(){return pair('Nên: hỏi trước rồi mới giúp. Tránh: tự ý làm thay việc người khác.',
   floor(8,152,138)+g(40,138,.6,standSide({arms:[[14,-84,22,-76]]}))+g(116,138,.6,carrier({f:-1,n:2,girl:true}))+bubble(8,8,96,38,['Mình giúp','phần nào?'],{tail:'bl',s:11}),
   floor(8,152,138)+g(54,138,.66,standSide({girl:true,arms:[[18,-90,34,-86]]}))+box(70,60,24,20)+g(118,138,.66,standSide({f:-1,arms:[[-14,-88,-24,-90]],sad:true}))+bubble(80,14,48,24,['Ơ…?'],{tail:'br',s:11,st:RED,c:RED_T}),
   ['Hỏi trước','rồi mới giúp'],['Tự ý','làm thay']);},
 tip:['cheer','Hỏi thêm một câu: “Mình làm phần nào?” để giúp đúng cách người kia muốn.']
};

/* =========================================================
   TẬN DỤNG 05 PHÚT
   ========================================================= */
var NP={
 duo:function(){
  var a=floor(6,154,140)+'<rect x="70" y="104" width="80" height="7" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.2"/><path d="M78 111v29M142 111v29" stroke="'+WOOD_D+'" stroke-width="3"/>'+
   g(52,140,.8,sitChair({girl:true,arms:[[10,-60,22,-66]]}))+'<g transform="translate(74 82) rotate(-10)"><rect x="-7" y="-11" width="14" height="22" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.4"/>'+T(0,4,'漢',{jp:1,s:9,w:700,c:BLUE_T})+'</g>'+
   clock(124,52,13,'')+T(124,80,'7:50',{s:10.5,w:800,c:MUTE});
  var b=floor(6,154,140)+g(60,140,1,bench(-34,90))+g(52,140,.8,sitBench({cap:true,shirt:'#DCE7F7',arms:[[10,-56,22,-62]]}))+
   '<g transform="translate(70 78) rotate(-8)"><rect width="24" height="30" rx="2" fill="#FFFDF6" stroke="'+K+'" stroke-width="1.3"/><path d="M4 9h16M4 15h16M4 21h10" stroke="#C9B07A" stroke-width="1.4"/></g>'+
   wrench(124,34,-30)+T(130,98,'スパナ',{jp:1,s:11,w:700,c:'#B5402F'})+T(130,112,'cờ lê',{s:10.5,w:700,c:MUTE});
  return duo('Ở trường: chờ vào lớp, ôn vài chữ Hán. Ở Nhật: giờ nghỉ, ghi một từ mới như スパナ, cờ lê.',a,b,['Chờ vào lớp: ôn vài chữ'],['Giờ nghỉ: ghi 1 từ mới']);},
 steps:[
  function(){var seg=[[18,74,'Học',BLUE],[74,104,'5′',YEL],[104,170,'Học',BLUE],[170,214,'15′',YEL],[214,282,'Làm thêm',GREEN]],s=T(150,24,'Một ngày có nhiều khoảng trống nhỏ',{s:11.5,w:800,c:BLUE_T});
   seg.forEach(function(g2){var gap=g2[3]===YEL;s+='<rect x="'+g2[0]+'" y="'+(gap?60:66)+'" width="'+(g2[1]-g2[0])+'" height="'+(gap?32:20)+'" rx="'+(gap?8:4)+'" fill="'+g2[3]+'" opacity="'+(gap?1:.85)+'"'+(gap?' stroke="#C98A12" stroke-width="1.6"':'')+'/>'+T((g2[0]+g2[1])/2,gap?81:80,g2[2],{s:gap?13:11,w:800,c:gap?'#5A3E00':'#fff'});});
   s+=T(89,114,'chờ vào lớp',{s:10.5,w:700,c:'#946400'})+T(192,114,'chờ hồ sơ',{s:10.5,w:700,c:'#946400'})+arrow(89,40,89,56,'#C98A12',2)+arrow(192,40,192,56,'#C98A12',2);
   s+=T(150,146,'Không cần lấp kín mọi lúc nghỉ',{s:11,w:700,c:MUTE});
   return svg('0 0 300 160','Nhận ra khoảng trống 5, 10 hoặc 15 phút trong ngày',s);},
  function(){var card=function(x,ic,l1,l2){return '<rect x="'+x+'" y="38" width="64" height="104" rx="12" fill="#fff" stroke="#D5DEEF" stroke-width="1.4"/>'+ic+T(x+32,118,l1,{s:10.5,w:800,c:INK})+(l2?T(x+32,132,l2,{s:10.5,w:800,c:INK}):'');};
   var s=T(150,22,'Chọn 1 việc vừa thời gian',{s:11.5,w:800,c:BLUE_T});
   s+=card(10,'<rect x="30" y="50" width="24" height="40" rx="5" fill="#2F3D5A"/><rect x="33" y="55" width="18" height="28" rx="2" fill="#fff"/>'+T(42,75,'漢',{jp:1,s:13,w:700,c:BLUE_T}),'Hack-','kanji');
   s+=card(82,'<rect x="96" y="52" width="36" height="40" rx="5" fill="#FFFDF6" stroke="'+K+'" stroke-width="1.3"/>'+T(114,80,'学',{jp:1,s:20,w:700}),'Ôn','chữ Hán');
   s+=card(154,'<rect x="162" y="52" width="34" height="18" rx="9" fill="#E5EFFC"/>'+T(179,65,'…',{s:12,w:800,c:BLUE_T})+'<rect x="176" y="74" width="34" height="18" rx="9" fill="#E2F7EE"/>'+T(193,87,'…',{s:12,w:800,c:GREEN_T}),'Kaiwa','vài câu');
   s+=card(226,'<rect x="234" y="52" width="48" height="34" rx="8" fill="#FFF0DE"/>'+T(258,67,'はじめ',{jp:1,s:9.5,w:700,c:'#A35A00'})+T(258,79,'まして',{jp:1,s:9.5,w:700,c:'#A35A00'}),'Tự','giới thiệu');
   return svg('0 0 300 160','Chọn một việc vừa thời gian: Hack-kanji, ôn chữ Hán, kaiwa vài câu, tập tự giới thiệu',s);},
  function(){var s=notebook(24,24,170,112,[['Hôm nay ghi được:',11,700,MUTE],['スパナ = cờ lê',13,800,INK,1],['Ý Senpai: siết vừa tay',12,700,BLUE_T]])+check(176,78,9)+check(176,98,9)+
    wrench(238,52,-30)+shinMini('proud',214,96,52)+T(150,154,'Chỉ cần một điều dùng lại được',{s:11,w:700,c:MUTE});
   return svg('0 0 300 160','Giữ lại một điều dùng được, như tên dụng cụ hoặc ý Senpai vừa chỉ',s);}
 ],
 pair:function(){return pair('Nên: học lúc ngồi chờ. Tránh: vừa đi đường vừa xem điện thoại.',
   floor(8,152,138)+g(76,138,1,bench(-52,104))+g(76,138,.72,sitBench({girl:true,arms:[[10,-56,22,-62]]}))+g(95,93,.7,phone(0,0,{glow:true}))+clock(124,40,12,''),
   floor(8,152,138)+'<path d="M8 138h144" stroke="#fff" stroke-width="6" stroke-dasharray="10 8"/>'+g(66,132,.72,fig({f:1,legs:[[-2,-58,-8,-31,-14,-6],[2,-58,8,-31,12,-6]],hip:[0,-58],sh:[1,-95],head:[5,-115],arms:[[14,-80,22,-90]]}))+g(84,62,.7,phone(0,0,{glow:true}))+
   '<g transform="translate(124 44)"><path d="M0 -16L16 12H-16z" fill="'+YEL+'" stroke="'+K+'" stroke-width="1.5" stroke-linejoin="round"/><path d="M0 -6v8" stroke="'+K+'" stroke-width="2.4" stroke-linecap="round"/><circle cy="7" r="1.5" fill="'+K+'"/></g>',
   ['Học lúc','ngồi chờ'],['Vừa đi đường','vừa xem']);},
 tip:['think','Tối trước chọn sẵn 5 từ hoặc 1 câu. Lúc có khoảng trống chỉ cần mở ra là học.']
};
/* =========================================================
   ĐỢT 3 · đồ vật dùng thêm
   ========================================================= */
function bowSide(o,deg){o=o||{};var f=o.f==null?1:o.f,a=(deg||15)*Math.PI/180,L=38,sx=Math.sin(a)*L*f,sy=-Math.cos(a)*L,hx=Math.sin(a)*60*f,hy=-Math.cos(a)*60;
 return fig(Object.assign({f:f,legs:[[-2*f,-58,0,-31,0,-6]],hip:[0,-58],sh:[sx,-58+sy],head:[hx+3*f,-58+hy+2],arms:[[sx+2*f,-58+sy+18,sx+4*f,-58+sy+36]]},o));}
function shoe(x,y,c,r){return '<g transform="translate('+x+' '+y+') rotate('+(r||0)+')"><path d="M-6 9v-12q0-9 6-9t6 9v12q0 3-6 3t-6-3z" fill="'+c+'" stroke="'+K+'" stroke-width="1.3"/><path d="M-3 -4h6" stroke="#fff" stroke-width="1.4"/></g>';}
function trash(x,y,full){var s='<path d="M'+(x-14)+' '+(y-30)+'h28l-3 30h-22z" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.5" stroke-linejoin="round"/><path d="M'+(x-7)+' '+(y-24)+'v18M'+x+' '+(y-24)+'v18M'+(x+7)+' '+(y-24)+'v18" stroke="#8D9AB3" stroke-width="1.2"/>';
 if(full)s+='<circle cx="'+(x-6)+'" cy="'+(y-33)+'" r="6" fill="#fff" stroke="'+K+'" stroke-width="1.2"/><circle cx="'+(x+5)+'" cy="'+(y-35)+'" r="5" fill="#F7EEDC" stroke="'+K+'" stroke-width="1.2"/><rect x="'+(x+8)+'" y="'+(y-46)+'" width="6" height="13" rx="2" fill="#9FD3FF" stroke="'+K+'" stroke-width="1.1" transform="rotate(25 '+(x+11)+' '+(y-40)+')"/><circle cx="'+(x+20)+'" cy="'+(y-4)+'" r="4.5" fill="#fff" stroke="'+K+'" stroke-width="1.1"/>';return s;}
function shelf(x,y,w,items){var s='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="6" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.3"/>';(items||[]).forEach(function(it){s+=it;});return s;}
function bookRow(x,y,cols){return cols.map(function(c,i){return '<rect x="'+(x+i*9)+'" y="'+(y-(24+(i%2)*3))+'" width="8" height="'+(24+(i%2)*3)+'" rx="1.5" fill="'+c+'" stroke="'+K+'" stroke-width="1.1"/>';}).join('');}
function label(x,y,t){return '<rect x="'+(x-16)+'" y="'+(y-7)+'" width="32" height="13" rx="3" fill="#fff" stroke="#9DB9E8" stroke-width="1"/>'+T(x,y+3,t,{s:8.5,w:800,c:BLUE_T});}
function sparkle(x,y,r){r=r||5;return '<path d="M'+x+' '+(y-r)+'l'+(r*.3)+' '+(r*.7)+' '+(r*.7)+' '+(r*.3)+'-'+(r*.7)+' '+(r*.3)+'-'+(r*.3)+' '+(r*.7)+'-'+(r*.3)+'-'+(r*.7)+'-'+(r*.7)+'-'+(r*.3)+' '+(r*.7)+'-'+(r*.3)+'z" fill="'+YEL+'"/>';}
function door(x,y,h){return '<rect x="'+x+'" y="'+(y-h)+'" width="40" height="'+h+'" rx="3" fill="#E3B97F" stroke="'+K+'" stroke-width="1.5"/><circle cx="'+(x+32)+'" cy="'+(y-h/2)+'" r="2.4" fill="'+K+'"/>';}
var GUARD={cap:'#2F3D5A',shirt:'#C7D3E6'};

/* =========================================================
   5S · GỌN GÀNG VÀ NGĂN NẮP
   ========================================================= */
var S5={
 duo:function(){
  var a=floor(6,154,140)+shelf(80,72,70,[bookRow(86,72,['#7FB3D5','#F4B63B','#9BD3AE','#E8604F']),'<rect x="126" y="56" width="14" height="16" rx="3" fill="#BFE3F0" stroke="'+K+'" stroke-width="1.1"/>'])+label(98,84,'Sách')+label(133,84,'Bút')+
   shelf(80,110,70,['<rect x="88" y="96" width="22" height="14" rx="2" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.1"/>','<rect x="118" y="98" width="22" height="12" rx="2" fill="#F29A3C" stroke="'+K+'" stroke-width="1.1"/>'])+'<path d="M84 72V140M146 72V140" stroke="'+WOOD_D+'" stroke-width="3"/>'+
   g(46,140,.8,standSide({girl:true,arms:[[16,-84,30,-82]]}));
  var b='<rect x="70" y="30" width="78" height="76" rx="4" fill="#F1E6CF" stroke="'+K+'" stroke-width="1.5"/>'+
   '<g fill="none" stroke="#B39A70" stroke-width="1.4" stroke-dasharray="3 2"><rect x="80" y="40" width="10" height="34" rx="3"/><path d="M104 40h12v8h-4v26h-4v-26h-4z"/><circle cx="134" cy="48" r="7"/><path d="M134 55v20"/></g>'+wrench(85,42,0)+
   T(109,94,'Dụng cụ',{s:9.5,w:800,c:'#8A5A3B'})+floor(6,154,140)+g(46,140,.8,standSide({cap:true,shirt:'#DCE7F7',arms:[[16,-86,32,-92]]}));
  return duo('Ở trường: phòng ký túc xá gọn, mỗi món một chỗ có nhãn. Ở Nhật: dụng cụ dùng xong treo về đúng hình vẽ trên bảng.',a,b,['Mỗi món một chỗ'],['Dụng cụ về đúng chỗ']);},
 steps:[
  function(){var s=floor(10,290,150)+desk(20,104,120)+'<rect x="36" y="88" width="30" height="16" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.1"/><circle cx="84" cy="96" r="7" fill="#fff" stroke="'+K+'" stroke-width="1.2"/><rect x="104" y="80" width="10" height="24" rx="3" fill="#9FD3FF" stroke="'+K+'" stroke-width="1.1" transform="rotate(-12 109 92)"/>';
   s+=arrow(150,80,184,60,GREEN,2)+arrow(150,96,184,116,'#9DA9BC',2);
   s+='<rect x="190" y="30" width="90" height="44" rx="10" fill="#E2F7EE"/>'+T(235,48,'Cần dùng',{s:11.5,w:800,c:GREEN_T})+T(235,64,'giữ lại',{s:11,w:700,c:GREEN_T})+
    trash(250,150,true)+T(244,84,'Không dùng',{s:11.5,w:800,c:MUTE})+T(244,98,'bỏ, cất đi',{s:11,w:700,c:MUTE});
   return svg('0 0 300 160','Sàng lọc: món cần dùng giữ lại, món không dùng thì bỏ hoặc cất đi',s);},
  function(){var s=floor(10,290,150)+'<rect x="40" y="20" width="160" height="124" rx="6" fill="#FBF6EC" stroke="'+WOOD_D+'" stroke-width="2"/>'+
    shelf(44,68,152,[bookRow(52,68,['#7FB3D5','#F4B63B','#9BD3AE']),'<g fill="none" stroke="#B39A70" stroke-width="1.4" stroke-dasharray="3 2"><rect x="110" y="44" width="16" height="24" rx="3"/></g>','<rect x="150" y="50" width="16" height="18" rx="3" fill="#BFE3F0" stroke="'+K+'" stroke-width="1.1"/>'])+
    label(64,80,'Sách')+label(118,80,'Sạc')+label(158,80,'Bút')+
    shelf(44,120,152,['<rect x="56" y="106" width="34" height="14" rx="2" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.1"/>','<rect x="118" y="100" width="30" height="20" rx="3" fill="#F29A3C" stroke="'+K+'" stroke-width="1.1"/>'])+label(73,132,'Áo')+label(133,132,'Cặp');
   s+='<g transform="translate(246 70) rotate(-10)"><rect x="-8" y="-12" width="16" height="24" rx="3" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.3"/></g>'+arrow(232,64,132,58,GREEN,2)+T(254,110,'Đúng chỗ',{s:11.5,w:800,c:GREEN_T})+T(254,126,'của nó',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Sắp xếp: mỗi món về đúng chỗ của nó, chỗ có nhãn',s);},
  function(){var s=floor(10,290,150)+desk(120,104,150)+g(78,150,.92,standSide({arms:[[18,-72,36,-50]]}))+
    '<rect x="108" y="96" width="22" height="9" rx="3" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.2"/><path d="M134 100h60" stroke="#BFE3F0" stroke-width="5" stroke-linecap="round" opacity=".8"/>'+
    sparkle(206,86,7)+sparkle(232,78,5)+sparkle(250,92,6)+T(214,40,'Lau một lượt',{s:11.5,w:800,c:BLUE_T})+T(214,56,'chỗ vừa dùng',{s:11.5,w:800,c:BLUE_T});
   return svg('0 0 300 160','Sạch sẽ: lau một lượt chỗ vừa dùng',s);}
 ],
 pair:function(){return pair('Nên: mỗi món một chỗ cố định. Tránh: nhét hết vào túi cho khuất.',
   '<rect x="24" y="28" width="112" height="100" rx="5" fill="#FBF6EC" stroke="'+WOOD_D+'" stroke-width="1.8"/>'+shelf(28,66,104,[bookRow(36,66,['#7FB3D5','#F4B63B','#9BD3AE']),'<rect x="92" y="48" width="14" height="18" rx="3" fill="#BFE3F0" stroke="'+K+'" stroke-width="1.1"/>'])+label(50,78,'Sách')+label(99,78,'Bút')+
   shelf(28,110,104,['<rect x="40" y="96" width="30" height="14" rx="2" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.1"/>','<rect x="84" y="92" width="26" height="18" rx="3" fill="#F29A3C" stroke="'+K+'" stroke-width="1.1"/>']),
   '<path d="M40 70h80l-8 66h-64z" fill="#C79BE0" stroke="'+K+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M58 70q0-16 22-16t22 16" stroke="'+K+'" stroke-width="1.8" fill="none"/>'+
   '<rect x="50" y="52" width="10" height="22" rx="2" fill="#9FD3FF" stroke="'+K+'" stroke-width="1.1" transform="rotate(-20 55 63)"/><rect x="66" y="46" width="26" height="8" rx="2" fill="#F4B63B" stroke="'+K+'" stroke-width="1.1" transform="rotate(14 79 50)"/><circle cx="100" cy="58" r="7" fill="#fff" stroke="'+K+'" stroke-width="1.1"/><path d="M106 48q12-8 8 6" stroke="'+K+'" stroke-width="1.6" fill="none"/>'+
   T(80,108,'?',{s:20,w:800,c:'#fff'}),
   ['Mỗi món','một chỗ cố định'],['Nhét hết vào túi','cho khuất']);},
 tip:['hi','Dùng xong món nào, trả về chỗ cũ ngay món đó. Không để dồn đến cuối tuần.'],
 spot:{w:340,h:232,
  scene:function(){var s='<rect width="340" height="232" fill="#EEF2FB"/><rect y="196" width="340" height="36" fill="#E6D8BE"/>'+door(14,196,112)+T(34,72,'Cửa',{s:10,w:800,c:'#8A5A3B'});
   s+=shoe(30,208,'#7FB3D5',120)+shoe(56,216,'#7FB3D5',-40)+shoe(78,204,'#F29A3C',200)+shoe(46,224,'#F29A3C',70);
   s+='<rect x="96" y="40" width="64" height="46" rx="4" fill="#FBF6EC" stroke="'+WOOD_D+'" stroke-width="1.6"/>'+shelf(98,62,60,[bookRow(102,62,['#7FB3D5','#F4B63B','#9BD3AE','#E8604F'])])+shelf(98,84,60,['<rect x="104" y="72" width="22" height="12" rx="2" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1.1"/>'])+label(140,74,'Áo');
   s+=desk(96,140,92)+'<rect x="112" y="118" width="6" height="22" fill="#6B7A99"/><path d="M106 118h18l-5-12h-8z" fill="#F4B63B" stroke="'+K+'" stroke-width="1.2"/><rect x="138" y="128" width="30" height="12" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.1"/>';
   s+=trash(208,196,true);
   s+='<rect x="232" y="92" width="102" height="10" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.4"/><path d="M236 102V196M330 102V196" stroke="'+WOOD_D+'" stroke-width="4"/>'+
    '<rect x="236" y="150" width="94" height="14" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.4"/><rect x="306" y="140" width="20" height="10" rx="4" fill="#fff" stroke="'+K+'" stroke-width="1.3"/>'+
    '<path d="M238 150q14-22 34-8q12-16 30-2q10 4 6 10z" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M262 132q6 8 2 16M286 136q-4 6 0 12" stroke="'+K+'" stroke-width="1.1" fill="none"/>'+
    '<rect x="236" y="68" width="94" height="10" rx="3" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.3"/><rect x="236" y="76" width="94" height="16" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.3"/>';
   return svg('0 0 340 232','Phòng ký túc xá buổi sáng có vài chỗ chưa gọn',s);},
  spots:[
   {x:54,y:204,r:26,bad:true,name:'Giày ở cửa',fix:'Xếp giày thành đôi, mũi hướng ra cửa.'},
   {x:276,y:144,r:30,bad:true,name:'Chăn trên giường dưới',fix:'Gấp chăn gọn ở đầu giường trước khi đi.'},
   {x:210,y:176,r:22,bad:true,name:'Thùng rác',fix:'Đổ rác, thay túi mới khi đầy.'},
   {x:128,y:62,r:24,name:'Kệ sách',fix:'Sách xếp đứng, có nhãn. Chỗ này ổn rồi.'},
   {x:140,y:126,r:18,name:'Bàn học',fix:'Bàn chỉ có đèn và sách đang dùng. Chỗ này ổn rồi.'},
   {x:283,y:80,r:20,name:'Chăn giường trên',fix:'Chăn đã gấp gọn. Chỗ này ổn rồi.'}]}
};

/* =========================================================
   ĐÚNG GIỜ, ĐÚNG HẸN
   ========================================================= */
var SM={
 duo:function(){
  var a=floor(6,154,140)+'<rect x="66" y="98" width="84" height="7" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.2"/><path d="M74 105v35M142 105v35" stroke="'+WOOD_D+'" stroke-width="3"/>'+
   '<rect x="94" y="88" width="24" height="10" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.1"/><rect x="122" y="90" width="14" height="8" rx="2" fill="#F4B63B" stroke="'+K+'" stroke-width="1.1"/>'+g(48,140,.8,sitChair({girl:true,arms:[[10,-60,24,-64]]}))+clock(124,50,14,'')+T(124,80,'7:50',{s:10.5,w:800,c:GREEN_T});
  var b='<rect x="98" y="46" width="44" height="58" rx="5" fill="#C7D3E6" stroke="'+K+'" stroke-width="1.5"/><rect x="106" y="54" width="28" height="14" rx="2" fill="#2F3D5A"/>'+T(120,65,'7:50',{s:9.5,w:800,c:'#9FF0C8'})+'<rect x="112" y="74" width="16" height="5" rx="2" fill="'+K+'"/>'+T(120,96,'IN',{s:9,w:800,c:MUTE})+
   floor(6,154,140)+g(64,140,.8,standSide({cap:true,shirt:'#DCE7F7',arms:[[16,-86,30,-88]]}));
  return duo('Ở trường: đến sớm, bày sẵn sách trước giờ học. Ở Nhật: bấm thẻ giờ và sẵn sàng trước giờ vào ca.',a,b,['Đến sớm, bày sách sẵn'],['Sẵn sàng trước giờ ca']);},
 steps:[
  function(){var s=floor(10,290,150)+'<rect x="196" y="20" width="62" height="46" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.4"/>'+moon(214,36,7)+
    '<path d="M70 150V70h46v80M70 104h46" stroke="'+WOOD_D+'" stroke-width="4" fill="none" stroke-linecap="round"/>'+shirtFold(78,90)+'<rect x="76" y="86" width="34" height="5" rx="2" fill="#2F3D5A"/>'+
    bag(132,116)+shoe(162,144,'#7FB3D5',0)+shoe(176,144,'#7FB3D5',0)+'<rect x="60" y="66" width="140" height="88" rx="14" fill="none" stroke="'+GREEN+'" stroke-width="2" stroke-dasharray="6 5"/>'+
    T(130,40,'Đồ để một chỗ',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Tối chuẩn bị sẵn: đồng phục, sách vở, giày để một chỗ',s);},
  function(){var s=floor(10,290,150)+bed(26,124,170,{})+g(118,150,1,fig({f:0,legs:[[-7,-40,-8,-26,-9,-6],[7,-40,8,-26,9,-6]],hip:[0,-40],sh:[0,-76],head:[0,-98],arms:[[-10,-74,-21,-91,-25,-110],[10,-74,21,-91,25,-110]]}))+
    clock(250,50,18,'',{bells:true,c:'#B5402F'})+'<path d="M224 32l-8-6M276 32l8-6M222 56h-8M278 56h8" stroke="'+RED+'" stroke-width="2" stroke-linecap="round"/>'+T(250,88,'6:00',{s:12,w:800})+
    '<rect x="210" y="98" width="80" height="24" rx="12" fill="#fff" stroke="#C9CEE0" stroke-width="1.3"/>'+T(250,114,'Báo lại 5 phút',{s:10,w:700,c:MUTE})+'<path d="M214 110h72" stroke="'+RED+'" stroke-width="2"/>'+
    T(52,40,'Dậy ngay!',{s:12.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Dậy ngay khi báo thức reo, không bấm báo lại thêm 5 phút',s);},
  function(){var s=floor(10,290,150)+door(30,150,104)+g(110,150,1,standSide({girl:true,arms:[[14,-80,22,-64]]}))+bag(120,92)+arrow(150,110,176,110,GREEN,2.4)+
    '<rect x="190" y="30" width="96" height="40" rx="10" fill="#EEF0F7"/>'+T(238,46,'Thường đi',{s:10.5,w:700,c:MUTE})+T(238,62,'7:40',{s:12.5,w:800,c:MUTE})+
    '<rect x="190" y="80" width="96" height="44" rx="10" fill="#E2F7EE" stroke="'+GREEN+'" stroke-width="1.6"/>'+T(238,98,'Nay đi',{s:10.5,w:700,c:GREEN_T})+T(238,116,'7:35',{s:14,w:800,c:GREEN_T})+T(238,142,'sớm 5 phút',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Ra khỏi phòng sớm 5 phút so với giờ bạn hay đi',s);}
 ],
 pair:function(){return pair('Nên: chuẩn bị đồ từ tối. Tránh: sáng mới lục tìm đồ.',
   floor(8,152,138)+g(46,138,.7,standSide({girl:true}))+'<path d="M84 138V84h40v54" stroke="'+WOOD_D+'" stroke-width="3" fill="none"/>'+shirtFold(88,100)+bag(88,110)+clock(132,36,12,'')+T(132,62,'7:35',{s:10,w:800,c:GREEN_T}),
   floor(8,152,138)+g(60,138,.7,squatHalf({arms:[[14,-70,26,-58]],sad:true}))+'<path d="M96 138q4-30 30-24q14 6 10 24z" fill="#F29A3C" stroke="'+K+'" stroke-width="1.4"/><rect x="100" y="104" width="18" height="6" rx="2" fill="'+SHIRT+'" stroke="'+K+'" stroke-width="1" transform="rotate(-24 109 107)"/><rect x="118" y="100" width="8" height="16" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1" transform="rotate(30 122 108)"/>'+
   '<path d="M50 52q-3 5 0 7q3-2 0-7z" fill="#8FD0E8"/>'+clock(132,36,12,'',{c:RED})+T(132,62,'7:58',{s:10,w:800,c:RED_T}),
   ['Chuẩn bị đồ','từ tối'],['Sáng mới','lục tìm đồ']);},
 tip:['hi','Đặt báo thức xa giường một chút: muốn tắt chuông là phải đứng dậy.']
};

/* =========================================================
   CHỦ ĐỘNG CHÀO HỎI VÀ CẢM ƠN
   ========================================================= */
var CH={
 duo:function(){
  var a=floor(6,154,162)+'<path d="M8 162V82h14v80M8 96h14" stroke="#9DA9BC" stroke-width="3" fill="none"/>'+g(56,162,.64,bowSide({girl:true},15))+g(122,162,.64,standSide(Object.assign({f:-1},GUARD)))+
   bubble(28,36,90,28,['Chào chú ạ!'],{tail:'bl',s:11});
  var b=floor(6,154,162)+g(56,162,.64,bowSide({cap:true,shirt:'#DCE7F7'},15))+g(122,162,.64,standSide(Object.assign({f:-1},LEAD)))+
   bubble(10,34,118,40,['おはよう','ございます'],{tail:'bl',s:11,jp:1});
  return duo('Ở trường: chủ động chào bác bảo vệ từ cổng trường. Ở Nhật: chào おはようございます khi đến xưởng.',a,b,['Chào từ cổng trường'],['Chào khi đến xưởng'],176);},
 steps:[
  function(){var s=floor(10,290,182)+g(84,182,.8,standSide({girl:true,arms:[[21,-88,27,-111]]}))+g(220,182,.8,standSide({f:-1}))+
    bubble(22,34,120,28,['Chào bạn!'],{tail:'bl',s:12})+'<g transform="translate(150 22)"><circle r="11" fill="'+GREEN+'"/>'+T(0,5,'1',{s:13,w:800,c:'#fff'})+'</g>'+T(214,52,'Mình chào trước,',{s:11.5,w:800,c:GREEN_T})+T(214,68,'không chờ nhắc',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 190','Chủ động chào trước, không chờ được nhắc',s);},
  function(){var s=floor(10,290,182)+g(70,182,.8,standSide({arms:[[6,-74,12,-58]]}))+g(230,182,.8,standSide(Object.assign({f:-1},LEAD)))+
    '<path d="M80 92Q150 72 222 92" stroke="#9DB9E8" stroke-width="1.6" fill="none" stroke-dasharray="4 4"/>'+
    bubble(20,14,190,44,['Em cảm ơn chị đã chỉ em','cách gấp hộp ạ!'],{tail:'bl',s:11.5})+T(150,150,'nói rõ việc được giúp',{s:10.5,w:700,c:MUTE});
   return svg('0 0 300 190','Nhìn người đối diện, nói rõ lời, cảm ơn kèm việc cụ thể',s);},
  function(){var s=floor(10,290,182)+'<g transform="translate(16 18)"><rect width="56" height="54" rx="8" fill="#fff" stroke="'+K+'" stroke-width="1.4"/><rect width="56" height="16" rx="8" fill="'+RED+'"/><path d="M0 9h56v7H0z" fill="'+RED+'"/>'+T(28,44,'Hôm sau',{s:10.5,w:800})+'</g>'+
    g(110,182,.8,standSide({girl:true,arms:[[21,-88,27,-111]]}))+g(236,182,.8,standSide({f:-1,shirt:'#FCE3D0'}))+
    bubble(84,22,148,40,['Hôm qua cảm ơn bạn','cho mình mượn bút nhé!'],{tail:'bl',s:11});
   return svg('0 0 300 190','Khi gặp lại, nhắc một câu cảm ơn về chuyện hôm trước',s);}
 ],
 pair:function(){return pair('Nên: chào rõ lời, nói trước rồi cúi. Tránh: vừa nhìn điện thoại vừa chào.',
   floor(8,152,138)+g(60,138,.66,bowSide({},15))+g(128,138,.66,standSide({f:-1,girl:true}))+bubble(6,8,104,38,['おはよう','ございます'],{tail:'bl',s:10,jp:1}),
   floor(8,152,138)+g(54,138,.66,standSide({arms:[[12,-78,18,-90]],smile:false}))+g(69,74,.6,phone(0,0,{glow:true}))+g(128,138,.66,standSide({f:-1,girl:true}))+T(54,40,'…chào',{s:11,w:700,c:'#9DA9BC'}),
   ['Nói rõ lời','rồi mới cúi'],['Vừa nhìn điện thoại','vừa chào']);},
 tip:['hi','Chào bác bảo vệ, cô lao công cũng rõ lời như khi chào thầy cô.']
};
/* =========================================================
   ĐỢT 4 · QUAN SÁT, HỎI VÀ GHI LẠI
   ========================================================= */
function memoPad(x,y,r,s){return '<g transform="translate('+x+' '+y+') rotate('+(r||-8)+') scale('+(s||1)+')"><rect x="-10" y="-13" width="20" height="26" rx="2" fill="#FFFDF6" stroke="'+K+'" stroke-width="1.3"/><path d="M-6 -6h12M-6 0h12M-6 6h8" stroke="#C9B07A" stroke-width="1.4"/></g>';}
function board(x,y,w,h){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="#2F5A4A" stroke="'+K+'" stroke-width="1.5"/><path d="M'+(x+10)+' '+(y+14)+'h'+(w*.5)+'M'+(x+10)+' '+(y+26)+'h'+(w*.35)+'" stroke="#E7F2EC" stroke-width="2" stroke-linecap="round"/>';}
var MM={
 duo:function(){
  var a=board(84,30,64,40)+floor(6,154,140)+g(124,140,.72,standSide(Object.assign({f:-1,arms:[[-14,-96,-26,-112]]},TEACH)))+g(52,140,.72,standSide({arms:[[14,-80,24,-74]]}))+memoPad(74,84,-10,.9);
  var b=floor(6,154,140)+'<rect x="96" y="96" width="56" height="10" rx="2" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.3"/><path d="M104 106v34M144 106v34" stroke="'+K+'" stroke-width="3"/>'+box(108,78,24,18)+
   g(126,140,.72,standSide(Object.assign({f:-1,arms:[[-12,-80,-22,-84]]},LEAD)))+g(52,140,.72,standSide({cap:true,girl:true,shirt:'#DCE7F7',arms:[[14,-80,24,-74]]}))+memoPad(74,84,-10,.9);
  return duo('Ở trường: nghe cô dặn, ghi từ khóa. Ở Nhật: Senpai chỉ việc, ghi vào sổ memo.',a,b,['Nghe cô dặn, ghi từ khóa'],['Senpai chỉ việc, ghi memo']);},
 steps:[
  function(){var s=floor(10,290,150)+g(70,150,.92,standSide({girl:true}))+'<rect x="170" y="96" width="110" height="10" rx="2" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.3"/><path d="M180 106v44M270 106v44" stroke="'+K+'" stroke-width="3"/>'+box(206,74,26,22)+
    g(252,150,.92,standSide(Object.assign({f:-1,arms:[[-14,-82,-30,-78]]},LEAD)))+'<path d="M80 44Q150 30 212 70" stroke="#9DB9E8" stroke-width="1.8" fill="none" stroke-dasharray="4 4"/>'+
    T(140,22,'Dừng tay, nhìn và nghe',{s:11.5,w:800,c:BLUE_T})+shinMini('curious',106,100,44);
   return svg('0 0 300 160','Dừng lại để quan sát cách làm và nghe điều được dặn',s);},
  function(){var s=floor(10,290,182)+g(64,182,.8,standSide({arms:[[14,-80,24,-74]]}))+memoPad(84,124,-10,.9)+bubble(10,30,124,28,['Dạ, lúc mấy giờ ạ?'],{tail:'bl',s:11.5})+
    '<rect x="140" y="24" width="152" height="132" rx="10" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.5"/>'+T(152,46,'Từ khóa',{a:'start',s:11,w:800,c:MUTE});
   [['Ai','Tổ trưởng'],['Việc','Găng tay mới'],['Khi nào','Thứ Sáu, 9 giờ'],['Lưu ý','Xuống kho B']].forEach(function(r,i){var y=72+i*24;s+=T(150,y,r[0],{a:'start',s:10.5,w:800,c:BLUE_T})+T(196,y,r[1],{a:'start',s:10.5,w:700})+'<path d="M150 '+(y+8)+'h134" stroke="#F1E8D2" stroke-width="1"/>';});
   return svg('0 0 300 190','Hỏi cho rõ và ghi từ khóa: ai, việc gì, khi nào, lưu ý gì',s);},
  function(){var s=floor(10,290,150)+g(56,150,.9,standSide({girl:true,arms:[[14,-82,26,-80]]}))+memoPad(84,82,-6,1.1)+arrow(110,80,150,80,BLUE,2.2)+
    '<rect x="160" y="96" width="110" height="10" rx="2" fill="#B8C3D6" stroke="'+K+'" stroke-width="1.3"/><path d="M170 106v44M260 106v44" stroke="'+K+'" stroke-width="3"/>'+box(198,70,32,26)+check(232,64,10)+
    T(80,30,'Mở sổ đọc lại',{s:11.5,w:800,c:BLUE_T})+T(214,40,'rồi mới làm',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 160','Đọc lại sổ memo trước khi làm và thử áp dụng',s);}
 ],
 pair:function(){return pair('Nên: ghi từ khóa rồi xác nhận. Tránh: chép cho nhiều nhưng chưa hiểu.',
   notebook(26,30,108,96,[['Thứ Sáu · 9 giờ',12,800,INK],['Găng tay mới',12,800,INK],['Kho B',12,800,INK]])+check(118,110,10),
   '<rect x="26" y="30" width="108" height="96" rx="8" fill="#FFFDF6" stroke="#C9B07A" stroke-width="1.5"/>'+[0,1,2,3,4,5,6,7].map(function(i){return '<path d="M36 '+(44+i*10)+'h'+(i%3===2?64:88)+'" stroke="#C9B07A" stroke-width="2.2" stroke-linecap="round"/>';}).join('')+
   '<circle cx="118" cy="110" r="12" fill="#fff" stroke="'+RED+'" stroke-width="2"/>'+T(118,115,'?',{s:14,w:800,c:RED_T}),
   ['Ghi từ khóa','rồi xác nhận'],['Chép cho nhiều','nhưng chưa hiểu']);},
 tip:['curious','Xin phép một câu “Em ghi lại được không ạ?” rồi mở sổ. Chỉ cần ghi từ khóa, không cần chép đủ câu.']
};

/* =========================================================
   LẮNG NGHE VÀ SỬA SAI
   ========================================================= */
var XL={
 duo:function(){
  var a=floor(6,154,162)+g(122,162,.64,standSide(Object.assign({f:-1,arms:[[-14,-86,-26,-90]]},TEACH)))+g(52,162,.64,standSide({arms:[[14,-80,24,-74]]}))+memoPad(70,112,-10,.8)+
   bubble(60,36,96,28,['Chỗ này nhé…'],{tail:'br',s:11,st:'#E9A34D',c:'#A35A00'});
  var b=floor(6,154,162)+box(84,140,24,22)+g(126,162,.64,standSide(Object.assign({f:-1,arms:[[-14,-86,-26,-82]]},LEAD)))+g(48,162,.64,bowSide({cap:true,shirt:'#DCE7F7'},30))+
   bubble(6,30,112,40,['申し訳','ありません'],{tail:'bl',s:11,jp:1});
  return duo('Ở trường: được cô góp ý, nghe hết. Ở Nhật: làm sai thì nhận lỗi 申し訳ありません và sửa ngay.',a,b,['Được góp ý: nghe hết'],['Làm sai: nhận lỗi, sửa ngay'],176);},
 steps:[
  function(){var s=floor(10,290,182)+g(70,182,.8,standSide({girl:true,arms:[[6,-74,10,-58]]}))+box(98,158,28,24)+g(232,182,.8,standSide(Object.assign({f:-1,arms:[[-14,-86,-26,-90]]},LEAD)))+
    bubble(150,24,132,40,['Chỗ dán này','cần chặt hơn…'],{tail:'br',s:11,st:'#E9A34D',c:'#A35A00'})+bubble(14,34,104,28,['Dạ, chỗ nào ạ?'],{tail:'bl',s:11});
   return svg('0 0 300 190','Dừng việc để nghe hết, chưa hiểu thì hỏi lại',s);},
  function(){var s=g(48,150,.9,standSide({}))+floor(10,290,150)+shinMini('think',8,20,40)+arrow(86,70,118,46,BLUE,2)+arrow(86,90,118,114,BLUE,2)+
    '<rect x="124" y="16" width="162" height="58" rx="10" fill="#E5EFFC"/>'+T(205,36,'Góp ý chưa rõ?',{s:11.5,w:800,c:BLUE_T})+T(205,54,'hỏi lại, trao đổi',{s:11,w:700,c:BLUE_T})+T(205,68,'bình tĩnh',{s:11,w:700,c:BLUE_T})+
    '<rect x="124" y="86" width="162" height="58" rx="10" fill="#E2F7EE"/>'+T(205,106,'Mình sai?',{s:11.5,w:800,c:GREEN_T})+T(205,124,'xin lỗi, nhận đúng',{s:11,w:700,c:GREEN_T})+T(205,138,'phần của mình',{s:11,w:700,c:GREEN_T});
   return svg('0 0 300 160','Phân biệt góp ý chưa rõ và lỗi của mình',s);},
  function(){var s=floor(10,290,182)+notebook(10,40,136,62,[['Cách sửa:',10.5,700,MUTE],['dán 2 lớp băng keo',11,800,BLUE_T]])+arrow(148,72,158,72,BLUE,2)+
    box(160,148,36,32)+'<path d="M160 160h36" stroke="#9FD3FF" stroke-width="5"/>'+check(200,140,10)+g(250,182,.8,standSide({f:-1,girl:true,arms:[[-12,-86,-20,-104]]}))+
    bubble(186,16,104,40,['Em đã sửa','xong ạ.'],{tail:'br',s:11,st:GREEN,c:GREEN_T});
   return svg('0 0 300 190','Ghi cách sửa, làm lại và báo lại khi xong',s);}
 ],
 pair:function(){return pair('Nên: hỏi lại điều chưa rõ. Tránh: gật đầu nhưng chưa hiểu.',
   floor(8,152,138)+g(46,138,.62,standSide({girl:true,arms:[[12,-86,18,-100]]}))+g(124,138,.62,standSide(Object.assign({f:-1},LEAD)))+bubble(8,10,100,40,['Chỗ này làm','lại thế nào ạ?'],{tail:'bl',s:10.5}),
   floor(8,152,138)+g(46,138,.62,bowSide({girl:true},12))+g(124,138,.62,standSide(Object.assign({f:-1},LEAD)))+T(30,24,'Dạ, hiểu…',{a:'start',s:11,w:700,c:'#9DA9BC'})+
   '<circle cx="78" cy="44" r="4" fill="#fff" stroke="#C9CEE0"/><circle cx="88" cy="34" r="6" fill="#fff" stroke="#C9CEE0"/><rect x="92" y="10" width="34" height="22" rx="10" fill="#fff" stroke="#C9CEE0" stroke-width="1.4"/>'+T(109,26,'???',{s:11,w:800,c:RED_T}),
   ['Hỏi lại','điều chưa rõ'],['Gật đầu','nhưng chưa hiểu']);},
 tip:['comfort','Được góp ý là được chỉ thêm một cách làm, không phải bị ghét. Nghe hết rồi mới nghĩ.']
};

/* =========================================================
   DÁM THỬ VIỆC KHÓ
   ========================================================= */
var VK={
 duo:function(){
  var a=board(90,24,60,38)+floor(6,154,162)+g(56,162,.64,standSide({girl:true,arms:[[10,-104,14,-128]]}))+g(126,162,.64,standSide(Object.assign({f:-1},TEACH)))+bubble(6,34,82,28,['Em xin thử ạ!'],{tail:'bl',s:10.5});
  var b=floor(6,154,162)+'<rect x="88" y="96" width="62" height="40" rx="6" fill="#C7D3E6" stroke="'+K+'" stroke-width="1.4"/><circle cx="104" cy="112" r="7" fill="#fff" stroke="'+K+'" stroke-width="1.3"/><rect x="118" y="106" width="24" height="8" rx="2" fill="'+GREEN+'"/><path d="M96 136v26M142 136v26" stroke="'+K+'" stroke-width="3"/>'+
   g(50,162,.64,standSide({cap:true,shirt:'#DCE7F7',arms:[[14,-86,26,-90]]}))+bubble(8,34,96,28,['やってみます'],{tail:'bl',s:11,jp:1});
  return duo('Ở trường: giơ tay xin thử phát biểu. Ở Nhật: nhận việc mới, nói やってみます, để em thử.',a,b,['Giơ tay xin thử'],['Nhận việc mới'],176);},
 steps:[
  function(){var card=function(y,t,on){return '<rect x="110" y="'+y+'" width="176" height="34" rx="10" fill="'+(on?'#E2F7EE':'#fff')+'" stroke="'+(on?GREEN:'#D5DEEF')+'" stroke-width="'+(on?2:1.3)+'"/>'+T(124,y+22,t,{a:'start',s:12,w:on?800:600,c:on?GREEN_T:MUTE})+(on?check(268,y+17,9):'');};
   var s=floor(10,290,150)+g(56,150,.9,standSide({arms:[[16,-88,30,-96]]}))+card(16,'Phát biểu 1 ý trước lớp',true)+card(58,'Nói 1 câu tiếng Nhật')+card(100,'Tìm hiểu việc làm thêm');
   return svg('0 0 300 160','Chọn một việc hơi ngại nhưng vừa sức, như phát biểu một ý trước lớp',s);},
  function(){var s=floor(10,290,182)+notebook(14,24,96,70,[['Ý cần nói:',10.5,700,MUTE],['1. …',11,800,BLUE_T],['2. …',11,800,BLUE_T]])+
    g(150,182,.8,standSide({girl:true,arms:[[14,-86,24,-96]]}))+g(250,182,.8,standSide({f:-1,arms:[[-6,-74,-10,-58]]}))+bubble(126,34,120,28,['Em xin phát biểu…'],{tail:'bl',s:11})+T(254,22,'Tập với bạn',{s:11.5,w:800,c:GREEN_T});
   return svg('0 0 300 190','Chuẩn bị một bước: viết ý cần nói, tập với bạn rồi thử',s);},
  function(){var s=notebook(18,22,190,120,[['Sau khi thử:',11,700,MUTE],['Mình học được gì?',12,800,INK],['Cần nhờ ai hỗ trợ?',12,800,INK],['Lần sau tốt hơn ở đâu?',12,800,INK]])+shinMini('proud',224,74,62);
   return svg('0 0 300 160','Rút ra một điều sau khi thử: học được gì, cần nhờ ai, lần sau tốt hơn ở đâu',s);}
 ],
 key:function(){return '<figure class="ill hv-key">'+svg('0 0 340 184','Ba vùng: an toàn, vừa sức, quá sức. Chọn việc ở vùng vừa sức',
   '<circle cx="118" cy="92" r="84" fill="#FDECE8"/><circle cx="118" cy="92" r="58" fill="#E2F7EE" stroke="'+GREEN+'" stroke-width="2"/><circle cx="118" cy="92" r="30" fill="#E5EFFC"/>'+
   T(118,26,'Quá sức',{s:12,w:800,c:RED_T})+T(118,52,'Vừa sức',{s:12.5,w:800,c:GREEN_T})+T(118,90,'An toàn',{s:11.5,w:800,c:BLUE_T})+T(118,104,'(quen)',{s:10,w:700,c:BLUE_T})+
   arrow(132,112,160,128,GREEN,2.4)+g(166,148,.42,standSide({girl:true,arms:[[12,-104,16,-128]]}))+
   T(270,64,'Chọn việc',{s:12.5,w:800,c:INK})+T(270,82,'ở vùng giữa:',{s:12.5,w:800,c:INK})+T(270,104,'hơi ngại,',{s:12.5,w:800,c:GREEN_T})+T(270,122,'vừa sức',{s:12.5,w:800,c:GREEN_T}))+'<figcaption>Bước ra một chút khỏi việc quen, không nhảy vào việc quá sức.</figcaption></figure>';},
 pair:function(){return pair('Nên: nhận việc hơi khó, vừa sức. Tránh: ôm việc quá sức rồi bỏ dở.',
   floor(8,152,138)+g(80,138,.72,carrier({n:2,girl:true})),
   floor(8,152,138)+g(70,138,.72,carrier({n:5,sweat:true,sad:true,lean:true}))+'<g transform="rotate(18 112 44)">'+box(100,30,24,20,'#F1C98C')+'</g>',
   ['Hơi khó','vừa sức'],['Ôm quá sức','rồi bỏ dở']);},
 tip:['cheer','Nói “やってみます – để em thử” rồi hỏi ngay chỗ chưa rõ. Dám thử đi cùng biết hỏi.']
};

var HV={vandong:VD,ngu:NG,chitieu:CT,horenso:HR,anuong:AU,camxuc:CX,giup:GD,'5phut':NP,'5s':S5,som:SM,chao:CH,memo:MM,xinloi:XL,viecko:VK};

/* ---------- Ghép vào "Cách làm" ---------- */
function stepsHTML(id,x,V){return '<div class="hw__k">Ba bước</div><div class="hwsteps hv-steps">'+x.steps.map(function(s,i){var art=V.steps&&V.steps[i]?V.steps[i]():'';return '<div class="hws hv-step">'+(art?'<figure class="hv-fig">'+art+'</figure>':'')+'<div class="hv-step-t"><i>'+(i+1)+'</i><div><b>'+esc(s[0])+'</b><span>'+esc(s[1])+'</span></div></div></div>';}).join('')+'</div>'+(x.ill?oldIll(x.ill[1]):'')+(V.key?V.key():'')+tipHTML(V);}
function tipHTML(V){if(!V.tip)return '';return '<div class="hv-tip"><span class="hv-tip-shin" aria-hidden="true">'+shin(V.tip[0]).replace(/^\s*<svg /,'<svg class="hv-shin" ')+'</span><p><b>Shin mách nhỏ</b>'+esc(V.tip[1])+'</p></div>';}
function oldIll(n){return n&&ILL_CAP[n]!=null?'<figure class="ill">'+illSVG(n)+'<figcaption>'+esc(ILL_CAP[n]||'')+'</figcaption></figure>':'';}
function whyHTML(x,V){var h='<div class="hw__k">Vì sao nên làm?</div><figure class="ill hv-duo">'+V.duo()+'</figure>'+(x.ill?oldIll(x.ill[0]):'');
 if(x.why)h+='<div class="hw__why"><small>VỚI BẠN</small>'+esc(x.why.now)+'</div><div class="hw__why"><small>Ở NHẬT</small>'+esc(x.why.jp)+'</div>';
 if(x.quote)h+='<div class="quote">“'+esc(x.quote.q)+'”<small>'+esc(x.quote.by)+'</small></div>';return h;}
var hvBaseOpenHow=openHow;
openHow=function(id){hvBaseOpenHow(id);var V=HV[id],x=HMAP[id];if(!V||!x||!x.steps||!HW||HW.id!==id)return;
 HW.cards=HW.cards.map(function(c){
  if(c[0]==='Vì sao'&&V.duo)return [c[0],whyHTML(x,V)];
  if(c[0]==='Các bước')return [c[0],stepsHTML(id,x,V)];
  if(c[0]==='Ghi nhớ'&&V.pair)return [c[0],c[1].replace('<div class="hw__k">Nên và tránh</div>','<div class="hw__k">Nên và tránh</div><figure class="ill hv-pair">'+V.pair()+'</figure>')];
  return c;});
 drawHow();};

/* ---------- Thực tập "Tìm điểm chưa ổn" (type:'spot') ---------- */
PRAC['5s']={type:'spot',hv:'5s',q:'Sáng nay trước khi đi học. Chạm vào 3 chỗ chưa gọn trong phòng.',win:'Tìm đủ 3 chỗ! Giày thành đôi, chăn gấp gọn, rác đổ đi: phòng gọn ngay từ sáng.'};
PRAC.anuong={type:'spot',hv:'anuong',q:'Giờ ăn trưa. Chạm vào 3 món nên thay để bữa ăn đủ chất hơn.',win:'Tìm đủ 3 món! Giữ cơm, rau, cá, trái cây và nước lọc: đủ sức cho cả buổi chiều.'};
PRAC.ngu={type:'spot',hv:'ngu',q:'22 giờ 30, đến giờ chuẩn bị ngủ. Chạm vào 3 chỗ chưa ổn trong phòng.',win:'Tìm đủ 3 chỗ! Cất màn hình, soạn đồ sẵn: giấc ngủ bắt đầu từ lúc chuẩn bị.'};
function spotDraw(){var P=PR.P,b=$('#prBox');if(!b)return;var SP=HV[P.hv].spot,found=PR.found||(PR.found=[]),seen=PR.okSeen||(PR.okSeen={}),n=SP.spots.filter(function(s){return s.bad;}).length;
 var h='<p class="pr__q">'+esc(P.q)+'</p><div class="hv-spot-count" aria-live="polite">Đã tìm '+found.length+'/'+n+' <span aria-hidden="true">'+SP.spots.filter(function(s){return s.bad;}).map(function(_,i){return '<i class="'+(i<found.length?'on':'')+'"></i>';}).join('')+'</span></div>';
 h+='<div class="hv-spot">'+SP.scene()+SP.spots.map(function(s,i){var k=found.indexOf(i),cls=k>=0?'hv-found':(seen[i]?'hv-ok':'');
  return '<button type="button" data-act="prTap" data-v="'+i+'" class="'+cls+'" style="left:'+((s.x-s.r)/SP.w*100).toFixed(2)+'%;top:'+((s.y-s.r)/SP.h*100).toFixed(2)+'%;width:'+(2*s.r/SP.w*100).toFixed(2)+'%;height:'+(2*s.r/SP.h*100).toFixed(2)+'%" aria-label="'+esc(s.name)+'"'+(k>=0||seen[i]?' aria-pressed="true"':'')+'>'+(k>=0?'<i>'+(k+1)+'</i>':'')+'</button>';}).join('')+'</div>';
 if(PR.note)h+='<div class="hv-spot-note">'+esc(PR.note)+'</div>';
 if(found.length)h+='<ul class="hv-spot-list">'+found.map(function(i,k){var s=SP.spots[i];return '<li><b>'+(k+1)+'</b><span><strong>'+esc(s.name)+'</strong><br>'+esc(s.fix)+'</span></li>';}).join('')+'</ul>';
 if(found.length===n)h+=PR.msg||(PR.msg=prWin(esc(P.win)));
 b.innerHTML=h;}
function spotAct(a,v){if(a!=='prTap'||PR.done)return;var SP=HV[PR.P.hv].spot,i=+v,s=SP.spots[i];if(!s)return;PR.found=PR.found||[];PR.okSeen=PR.okSeen||{};
 if(s.bad){if(PR.found.indexOf(i)<0){PR.found.push(i);PR.note='';tone([520+PR.found.length*80],.08);}}
 else{PR.okSeen[i]=1;PR.note=s.fix;}
 spotDraw();var btn=$('#prBox .hv-spot button[data-v="'+i+'"]');if(btn)btn.focus({preventScroll:true});}
var hvPrDraw=prDraw;prDraw=function(){if(PR&&PR.P&&PR.P.type==='spot'){spotDraw();return;}hvPrDraw();};
var hvPrAct=prAct;prAct=function(a,v){if(PR&&PR.P&&PR.P.type==='spot'){spotAct(a,v);return;}hvPrAct(a,v);};
/* =========================================================
   NỀN TẢNG RÈN LUYỆN · 5 bài học (M.Claude.3.3.26)
   Hiểu: hình ý chính · Senpai kể: cảnh câu chuyện · Trong app: mô phỏng thẻ thật, khoanh chỗ cần nhìn.
   ========================================================= */
function book(x,y,s,open){s=s||1;return '<g transform="translate('+x+' '+y+') scale('+s+')">'+(open?'<path d="M0 0q-12-6-24-2v22q12-4 24 2q12-6 24-2v-22q-12-4-24 2z" fill="#fff" stroke="'+K+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M0 0v22" stroke="'+K+'" stroke-width="1.2"/><path d="M-19 4h12M-19 9h12M5 4h12M5 9h12" stroke="#C9B07A" stroke-width="1.3"/>':'<rect x="-10" y="-14" width="20" height="26" rx="2" fill="#7FB3D5" stroke="'+K+'" stroke-width="1.4"/><path d="M-6 -14v26" stroke="#5B8FB8" stroke-width="2"/>')+'</g>';}
function toothbrush(x,y,r){return '<g transform="translate('+x+' '+y+') rotate('+(r||-30)+')"><rect x="-2.5" y="-20" width="5" height="32" rx="2.5" fill="#9FD3FF" stroke="'+K+'" stroke-width="1.3"/><rect x="-4" y="-28" width="8" height="9" rx="2" fill="#fff" stroke="'+K+'" stroke-width="1.2"/><path d="M-3 -26v6M0 -26v6M3 -26v6" stroke="#9DB9E8" stroke-width="1"/></g>';}
function stamp(x,y,r,t){return '<g transform="translate('+x+' '+y+') rotate(-8)"><circle r="'+r+'" fill="#FDECE8" stroke="'+RED+'" stroke-width="1.8"/>'+T(0,r*.38,t||'済',{jp:1,s:r*1.05,w:700,c:RED_T})+'</g>';}
function dayDot(x,y,st,t){var s=st==='y'?'<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+GREEN+'"/><path d="M'+(x-5)+' '+y+'l3.5 3.5 6.5-7" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>':
 st==='s'?'<circle cx="'+x+'" cy="'+y+'" r="11" fill="#9BD3AE"/><circle cx="'+x+'" cy="'+y+'" r="4" fill="#fff"/>':st==='n'?'<circle cx="'+x+'" cy="'+y+'" r="11" fill="#fff" stroke="'+RED+'" stroke-width="1.8" stroke-dasharray="3 3"/>':'<circle cx="'+x+'" cy="'+y+'" r="11" fill="#fff" stroke="#C9CEE0" stroke-width="1.5"/>';
 return s+(t?T(x,y-17,t,{s:10,w:700,c:MUTE}):'');}
/* Mô phỏng thẻ thói quen trong app (nhãn đúng như thẻ thật: MÌNH SẼ · KHI · Trở thành…). */
function cardMock(x,y,o){var w=196,h=o.h||186,s='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="16" fill="#F2EBF8" stroke="#D9CDE6" stroke-width="1.5"/>',hl=function(yy,hh){return '<rect x="'+(x+8)+'" y="'+yy+'" width="'+(w-16)+'" height="'+hh+'" rx="8" fill="#FFF3C4" stroke="'+YEL+'" stroke-width="2"/>';};
 s+=T(x+14,y+20,o.level||'CẤP 1 · Tập sự',{a:'start',s:10,w:700,c:'#6B5A7A'})+T(x+14,y+40,o.title,{a:'start',s:13.5,w:800,c:'#4A2E5C'});
 if(o.hl==='se')s+=hl(y+48,38);if(o.hl==='khi')s+=hl(y+88,36);if(o.hl==='tro')s+=hl(y+126,22);if(o.hl==='week')s+=hl(y+150,30);
 s+=T(x+14,y+60,'MÌNH SẼ',{a:'start',s:9,w:800,c:'#8A7A99'})+T(x+14,y+78,o.se,{a:'start',s:12,w:700,c:'#4A2E5C'})+
  T(x+14,y+100,'KHI',{a:'start',s:9,w:800,c:'#8A7A99'})+T(x+14,y+117,o.khi,{a:'start',s:11.5,w:600,c:'#7A6A88'})+
  T(x+14,y+141,'Trở thành '+o.tro,{a:'start',s:11,w:600,c:'#7A6A88'});
 var wk=o.week||['y','y','y','','','',''];['T2','T3','T4','T5','T6','T7','CN'].forEach(function(d,i){var cx=x+22+i*25.5,cy=y+168,st=wk[i];s+=st==='y'?'<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="#3E5BBF"/><path d="M'+(cx-3.5)+' '+cy+'l2.5 2.5 4.5-5" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>':st==='n'?'<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="#fff" stroke="'+RED+'" stroke-width="1.4" stroke-dasharray="2.5 2.5"/>':'<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="none" stroke="#C9C1D6" stroke-width="1.3"/>';});
 return s;}
function callout(x,y,w,lines,c){c=c||BLUE_T;var h=15+lines.length*15,s='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10" fill="#fff" stroke="'+(c===GREEN_T?GREEN:BLUE)+'" stroke-width="1.5"/>';lines.forEach(function(l,i){s+=T(x+w/2,y+19+i*15,l,{s:11.5,w:i?600:800,c:c});});return s;}
function lfig(cls,label,inner,cap,vb){return '<figure class="ill hv-key '+(cls||'')+'">'+svg(vb||'0 0 340 200',label,inner)+(cap?'<figcaption>'+esc(cap)+'</figcaption>':'')+'</figure>';}
function bars(x,y,vals,c,max){var s='<path d="M'+x+' '+y+'h'+(vals.length*9+4)+'" stroke="#C9CEE0" stroke-width="1.4"/>';vals.forEach(function(v,i){if(v>0)s+='<rect x="'+(x+3+i*9)+'" y="'+(y-v/max*56)+'" width="6" height="'+(v/max*56)+'" rx="2" fill="'+c+'"/>';else s+='<circle cx="'+(x+6+i*9)+'" cy="'+(y-2)+'" r="1.6" fill="#C9CEE0"/>';});return s;}

var LV={
 b1:{
  hieu:function(){return lfig('','Kiểu 1 học 1 tiếng mỗi tối được 3 hôm rồi bỏ. Kiểu 2 học 10 phút mỗi tối, đều cả tháng, có hôm thành 30 phút.',
   panel(4,4,162,170,'#FDECE8')+panel(174,4,162,170,'#E2F7EE')+T(85,26,'KIỂU 1 · 1 tiếng/tối',{s:11,w:800,c:RED_T})+T(255,26,'KIỂU 2 · 10 phút/tối',{s:11,w:800,c:GREEN_T})+
   bars(16,120,[60,60,60,0,0,0,0,0,0,0,0,0,0,0],'#E8604F',60)+bars(186,120,[10,10,30,10,10,10,20,10,10,30,10,10,20,10],GREEN,60)+
   T(85,142,'3 hôm rồi nghỉ',{s:11.5,w:800,c:RED_T})+T(255,142,'Đều mỗi ngày',{s:11.5,w:800,c:GREEN_T})+T(85,160,'cả tuần trống',{s:10.5,w:600,c:RED_T})+T(255,160,'có hôm 30 phút',{s:10.5,w:600,c:GREEN_T})+
   cross(150,20,9)+check(320,20,9),'Làm đều trước, làm nhiều sau.','0 0 340 180');},
  story:function(){return lfig('','Đi làm thêm về mệt, vẫn mở sách đọc vài từ trong 10 phút',
   '<rect x="0" y="0" width="340" height="170" rx="14" fill="#E9EEF8"/><rect x="20" y="16" width="70" height="48" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.4"/>'+moon(40,32,7)+
   floor(10,330,156)+desk(120,112,150)+g(150,156,1,sitChair({f:1,legs:[[-6,-40,18,-40,18,-6]],hip:[-6,-40],sh:[-4,-78],head:[-1,-100],arms:[[12,-62,30,-50]],smile:false}))+'<path d="M128 46q-3 5 0 7q3-2 0-7z" fill="#8FD0E8"/>'+
   book(196,102,1,true)+bag(60,128)+clock(268,52,16,'')+T(268,86,'10 phút',{s:12,w:800,c:GREEN_T})+shinMini('cheer',284,100,46),'Ngày mệt nhất vẫn làm được: đó là việc vừa đủ nhỏ.','0 0 340 170');},
  app:function(){return lfig('','Trên thẻ, dòng Mình sẽ là việc nhỏ của bạn. Cấp Tập sự 7 ngày đầu chỉ cần việc nhỏ đó.',
   cardMock(8,8,{title:'Ôn tiếng Nhật',se:'mở sổ, đọc 3 từ vựng',khi:'vừa ngồi vào bàn học',tro:'người tiến bộ mỗi ngày',hl:'se'})+
   arrow(206,74,226,74,'#C98A12',2.2)+callout(228,44,108,['Việc nhỏ','ngày mệt vẫn làm','được'])+callout(228,118,108,['Tập sự: 7 ngày','chỉ cần việc nhỏ'],GREEN_T),'','0 0 340 202');}
 },
 b2:{
  hieu:function(){var pts=[['☀','Thức dậy'],['','Cổng trường'],['','Vào lớp'],['','Ăn trưa'],['','Đi làm về'],['','Đánh răng']],s='<path d="M24 70H316" stroke="#C9CEE0" stroke-width="3" stroke-linecap="round"/>'+T(170,24,'Mỗi ngày đã có sẵn nhiều việc quen',{s:11.5,w:800,c:BLUE_T});
   pts.forEach(function(p,i){var x=34+i*54,on=i===5;s+='<circle cx="'+x+'" cy="70" r="'+(on?11:8)+'" fill="'+(on?YEL:'#fff')+'" stroke="'+(on?'#C98A12':BLUE)+'" stroke-width="2"/>'+T(x,i%2?98:52,p[1],{s:11,w:on?800:700,c:on?'#946400':MUTE});});
   s+=toothbrush(40,150,-20)+arrow(60,140,100,140,BLUE,2.2)+book(130,134,1,true)+T(166,140,'Đánh răng xong',{a:'start',s:11.5,w:800,c:'#946400'})+T(166,157,'→ mở sổ, đọc 5 từ',{a:'start',s:11.5,w:800,c:GREEN_T});
   return lfig('','Mỗi ngày có sẵn nhiều việc quen như thức dậy, vào lớp, đánh răng. Gắn việc mới ngay sau một việc quen.',s,'Việc quen thành tín hiệu nhắc bạn làm việc mới.','0 0 340 176');},
  story:function(){return lfig('','Đánh răng xong, lên giường là mở sổ đọc 5 từ',
   '<rect x="0" y="0" width="340" height="170" rx="14" fill="#E9EEF8"/><rect x="240" y="16" width="70" height="48" rx="4" fill="#2F3D5A" stroke="'+K+'" stroke-width="1.4"/>'+moon(262,32,7)+floor(10,330,156)+
   '<rect x="24" y="92" width="58" height="10" rx="3" fill="#fff" stroke="'+K+'" stroke-width="1.4"/><path d="M30 102v54M76 102v54" stroke="'+K+'" stroke-width="2"/><rect x="34" y="60" width="38" height="30" rx="4" fill="#DDF1FA" stroke="'+K+'" stroke-width="1.3"/>'+toothbrush(66,90,-10)+
   arrow(96,110,130,110,BLUE,2.2)+bed(130,134,190,{})+g(216,156,1,sitChair({f:1,girl:true,legs:[[-6,-40,18,-40,18,-6]],hip:[-6,-40],sh:[-4,-78],head:[-1,-100],arms:[[12,-64,26,-60]]}))+book(254,96,.9,true)+
   T(53,46,'Đánh răng xong',{s:10.5,w:800,c:'#946400'})+T(150,46,'mở sổ, 5 từ',{s:11,w:800,c:GREEN_T}),'Việc quen kéo việc mới theo.','0 0 340 170');},
  app:function(){return lfig('','Trên thẻ, dòng Khi là tín hiệu. Chọn việc ngày nào cũng có; nút Gợi ý có sẵn những lúc quen thuộc.',
   cardMock(8,8,{title:'Ôn tiếng Nhật',se:'mở sổ, đọc 5 từ vựng',khi:'đánh răng buổi tối xong',tro:'người tiến bộ mỗi ngày',hl:'khi'})+
   arrow(206,114,226,114,'#C98A12',2.2)+callout(228,84,108,['Tín hiệu','việc ngày nào','cũng có'])+'<rect x="236" y="150" width="92" height="28" rx="14" fill="#E5EFFC" stroke="'+BLUE+'" stroke-width="1.4"/>'+T(282,168,'+ Gợi ý',{s:11.5,w:800,c:BLUE_T}),'','0 0 340 202');}
 },
 b3:{
  hieu:function(){var s=panel(4,4,162,176,'#E2F7EE')+panel(174,4,162,176,'#FDECE8')+T(85,26,'Việc tốt: để GẦN',{s:11.5,w:800,c:GREEN_T})+T(255,26,'Việc chưa tốt: để XA',{s:11.5,w:800,c:RED_T});
   s+=g(54,160,.72,standSide({girl:true,arms:[[10,-80,14,-66]]}))+memoPad(70,96,-6,.7)+desk(90,124,64)+bottle(118,108,0,.8)+shoe(108,170,'#7FB3D5',0)+shoe(124,170,'#7FB3D5',0)+T(85,52,'sổ trong túi áo',{s:10,w:700,c:GREEN_T})+T(122,82,'bình nước',{s:10,w:700,c:GREEN_T});
   s+='<rect x="190" y="60" width="62" height="70" rx="4" fill="#E3B97F" stroke="'+K+'" stroke-width="1.4"/><path d="M190 96h62" stroke="'+K+'" stroke-width="1.2"/><circle cx="244" cy="80" r="2" fill="'+K+'"/><circle cx="244" cy="114" r="2" fill="'+K+'"/>'+snack(220,94)+soda(222,128)+T(221,148,'kẹo cất tủ',{s:10,w:700,c:RED_T})+
    charging(290,108)+T(296,148,'sạc xa giường',{s:10,w:700,c:RED_T})+T(290,62,'điện thoại',{s:10,w:700,c:RED_T})+T(290,76,'ngoài tầm tay',{s:10,w:700,c:RED_T});
   return lfig('','Việc tốt để gần, dễ thấy: sổ trong túi áo, bình nước trên bàn, giày cạnh cửa. Việc chưa tốt để xa: kẹo cất tủ, điện thoại sạc xa giường.',s,'Đừng chỉ dựa vào cố gắng: sắp xếp để việc tốt dễ làm hơn.','0 0 340 184');},
  story:function(){var s='<rect x="0" y="0" width="340" height="176" rx="14" fill="#E9EEF8"/>'+floor(10,330,166);
   s+='<rect x="14" y="144" width="312" height="6" rx="2" fill="'+WOOD+'" stroke="'+WOOD_D+'" stroke-width="1.2"/><path d="M24 150v16M316 150v16M170 150v16" stroke="'+WOOD_D+'" stroke-width="3"/>';
   [[50,0],[110,1],[230,0],[290,1]].forEach(function(p,i){s+=g(p[0],166,.62,sitBench({f:i<2?1:-1,girl:i%2===1,arms:[[i<2?10:-10,-56,i<2?20:-20,-62]]}));});
   s+='<rect x="148" y="112" width="44" height="32" rx="4" fill="#F4B63B" stroke="'+K+'" stroke-width="1.4"/><rect x="160" y="112" width="20" height="4" fill="'+K+'"/>'+T(170,134,'100¥',{s:11,w:800,c:'#5A3E00'})+
    bubble(10,14,90,26,['日本語で!'],{tail:'bl',s:11,jp:1})+bubble(240,14,92,26,['いいね!'],{tail:'br',s:11,jp:1,st:GREEN,c:GREEN_T});
   return lfig('','Bốn người cùng phòng thống nhất nói tiếng Nhật với nhau, quên thì bỏ 100 yên vào hộp chung',s,'Người xung quanh cũng là môi trường.','0 0 340 176');},
  app:function(){return lfig('','Ví dụ trong app: thẻ 5S, mỗi món một chỗ; thẻ Ngủ đủ giấc, sạc điện thoại xa giường.',
   cardMock(8,8,{title:'5S - Gọn gàng',se:'cất đồ về đúng chỗ',khi:'học xong, trước khi đứng dậy',tro:'người ngăn nắp',hl:'se'})+
   arrow(206,74,226,74,'#C98A12',2.2)+callout(228,48,108,['Mỗi món','một chỗ'])+
   '<rect x="228" y="108" width="108" height="86" rx="12" fill="#F2EBF8" stroke="#D9CDE6" stroke-width="1.4"/>'+T(282,128,'Ngủ đủ giấc',{s:11.5,w:800,c:'#4A2E5C'})+g(258,158,1,charging(0,0))+T(296,152,'xa',{s:11,w:800,c:BLUE_T})+T(296,166,'giường',{s:11,w:800,c:BLUE_T}),'','0 0 340 202');}
 },
 b4:{
  hieu:function(){var r1=['y','y','y','n','s','y','y'],r2=['y','y','y','n','n','',''],s=T(14,30,'Lỡ 1 ngày',{a:'start',s:11.5,w:800,c:GREEN_T})+T(14,46,'làm nhỏ, nối lại',{a:'start',s:10.5,w:700,c:GREEN_T});
   r1.forEach(function(st,i){var x=136+i*29;if(i)s+='<path d="M'+(x-18)+' 40h7" stroke="'+(st===''?'#E4E8F2':GREEN)+'" stroke-width="3"/>';s+=dayDot(x,40,st);});
   s+=T(14,104,'Lỡ 2 ngày liền',{a:'start',s:11.5,w:800,c:RED_T})+T(14,120,'thói quen bỏ bắt đầu',{a:'start',s:10.5,w:700,c:RED_T});
   r2.forEach(function(st,i){var x=136+i*29;if(i&&st==='y')s+='<path d="M'+(x-18)+' 114h7" stroke="'+GREEN+'" stroke-width="3"/>';s+=dayDot(x,114,st);});
   s+='<path d="M232 128q28 22 60 0" stroke="'+RED+'" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/>'+T(262,158,'chuỗi đứt',{s:10.5,w:800,c:RED_T})+T(252,74,'phiên bản nhỏ nhất',{s:10,w:700,c:GREEN_T})+'<path d="M252 64l-6-10" stroke="'+GREEN+'" stroke-width="1.3"/>';
   return lfig('','Lỡ một ngày rồi làm phiên bản nhỏ nhất ngay hôm sau thì chuỗi nối lại. Lỡ hai ngày liền là chuỗi đứt.',s,'Sau ngày lỡ: không bù gấp đôi, làm nhỏ ngay hôm nay.','0 0 340 170');},
  story:function(){return lfig('','Thi trượt N2 vẫn không bỏ: hôm mệt chỉ làm một trang đề',
   '<rect x="0" y="0" width="340" height="170" rx="14" fill="#E9EEF8"/>'+floor(10,330,156)+desk(110,112,150)+g(138,156,1,sitChair({f:1,girl:true,legs:[[-6,-40,18,-40,18,-6]],hip:[-6,-40],sh:[-4,-78],head:[-1,-100],arms:[[12,-62,30,-52]]}))+
   '<rect x="168" y="90" width="40" height="22" rx="2" fill="#fff" stroke="'+K+'" stroke-width="1.3"/>'+T(188,106,'1 trang',{s:9.5,w:800,c:BLUE_T})+
   '<g transform="translate(30 30)"><rect width="64" height="44" rx="6" fill="#fff" stroke="'+K+'" stroke-width="1.3"/>'+T(32,18,'N2',{s:12,w:800,c:INK})+T(32,34,'chưa đạt',{s:10,w:700,c:RED_T})+'</g>'+arrow(100,52,124,52,MUTE,2)+
   [0,1,2,3,4].map(function(i){return dayDot(236+i*20,40,i===2?'s':'y').replace(/r="11"/g,'r="8"');}).join('')+T(276,70,'không để 2 ngày trống',{s:10,w:800,c:GREEN_T})+shinMini('cheer',272,92,46),'Ngã bảy lần, đứng dậy tám lần.','0 0 340 170');},
  app:function(){var s='<rect x="8" y="8" width="210" height="150" rx="16" fill="#fff" stroke="#D5DEEF" stroke-width="1.5"/>'+T(22,32,'Tuần này',{a:'start',s:11,w:800,c:INK})+
    '<g transform="translate(176 26)"><path d="M0 -10q10 8 6 18q-2 6-6 6q-8 0-8-8q0-6 8-16z" fill="#F29A3C" stroke="'+K+'" stroke-width="1.2"/></g>'+T(196,34,'12',{s:13,w:800,c:'#A35A00'});
   ['y','y','n','y','y','',''].forEach(function(st,i){s+=dayDot(28+i*28,72,st,['T2','T3','T4','T5','T6','T7','CN'][i]).replace(/r="11"/g,'r="9.5"');});
   s+='<rect x="18" y="96" width="190" height="24" rx="8" fill="#E2F7EE"/>'+T(113,112,'Lỡ 1 ngày: chuỗi vẫn giữ',{s:10.5,w:800,c:GREEN_T})+'<rect x="18" y="126" width="190" height="24" rx="8" fill="#FDECE8"/>'+T(113,142,'Lỡ 2 ngày liền: chuỗi về 0',{s:10.5,w:800,c:RED_T});
   s+='<path d="M82 56q0-18-18-18" stroke="'+BLUE+'" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/>'+callout(228,14,108,['Quên đóng dấu?','ghi bù trong 3 ngày'])+callout(228,74,108,['Thẻ khi gặp dịp','tính theo số lần','3 · 6 · 12'],GREEN_T)+
    '<g transform="translate(250 150)" stroke="#9DA9BC" stroke-width="1" fill="none"><path d="M0 0L-14 0M0 0L-10-10M0 0L0-14M0 0L10-10M0 0L14 0"/><path d="M-5 0Q-4-4-3.5-3.5Q-1-5 0-5Q1-5 3.5-3.5Q4-4 5 0M-10 0Q-8-7-7-7Q-2-10 0-10Q2-10 7-7Q8-7 10 0"/></g>'+T(296,150,'7 ngày',{s:10.5,w:700,c:MUTE})+T(296,164,'không làm:',{s:10.5,w:700,c:MUTE})+T(272,182,'“mạng nhện”',{s:11,w:800,c:MUTE});
   return lfig('','Trong app: lỡ 1 ngày chuỗi vẫn giữ, lỡ 2 ngày liền chuỗi về 0. Quên đóng dấu ghi bù trong 3 ngày.',s,'','0 0 340 194');}
 },
 b5:{
  hieu:function(){var s=T(86,22,'Mỗi lần làm = 1 lá phiếu',{s:11.5,w:800,c:BLUE_T})+'<rect x="40" y="82" width="92" height="70" rx="8" fill="#E5EFFC" stroke="'+K+'" stroke-width="1.5"/><rect x="66" y="80" width="40" height="5" rx="2" fill="'+K+'"/>'+T(86,124,'người',{s:11,w:800,c:BLUE_T})+T(86,140,'đúng giờ',{s:11,w:800,c:BLUE_T})+
    stamp(66,52,12)+stamp(98,44,12)+'<path d="M84 66v10" stroke="'+BLUE+'" stroke-width="2"/>';
   s+=T(254,22,'Tuần sau nhiều phiếu hơn',{s:11.5,w:800,c:GREEN_T})+'<path d="M190 150h134" stroke="#C9CEE0" stroke-width="1.6"/>'+
    '<rect x="206" y="104" width="40" height="46" rx="4" fill="#9BD3AE"/>'+T(226,166,'Tuần này',{s:10.5,w:700,c:MUTE})+T(226,98,'4',{s:13,w:800,c:GREEN_T})+
    '<rect x="270" y="86" width="40" height="64" rx="4" fill="'+GREEN+'"/>'+T(290,166,'Tuần sau',{s:10.5,w:700,c:MUTE})+T(290,80,'5',{s:13,w:800,c:GREEN_T});
   return lfig('','Mỗi lần làm là một lá phiếu cho con người mình chọn, như người đúng giờ. Không cần hoàn hảo, chỉ cần tuần sau nhiều phiếu hơn tuần trước.',s,'','0 0 340 176');},
  ladder:function(){var st=['Bị','Phải','Muốn','Thích','Đam mê'],s='';st.forEach(function(t,i){var x=14+i*64,y=150-i*26;s+='<rect x="'+x+'" y="'+y+'" width="62" height="'+(26+i*26)+'" rx="6" fill="'+['#E9EEF8','#DCE7F7','#CFE0F5','#C1EBD6','#9BD3AE'][i]+'" stroke="#9DB9E8" stroke-width="1.2"/>'+T(x+31,y+17,t,{s:12,w:800,c:i>2?GREEN_T:BLUE_T});});
   s+=g(176,98,.42,standSide({girl:true,arms:[[12,-104,16,-128]]}))+arrow(206,70,236,46,GREEN,2);
   return lfig('','Thang năm bậc: Bị, Phải, Muốn, Thích, Đam mê',s,'Bạn đang ở bậc nào với thói quen của mình?','0 0 340 180');},
  story:function(){var s='<rect x="0" y="0" width="340" height="170" rx="14" fill="#E9EEF8"/>'+floor(10,330,156)+clock(40,32,15,'')+T(40,62,'giờ tự học',{s:10.5,w:700,c:MUTE})+
    desk(30,112,120)+desk(170,112,120)+g(64,156,.9,sitChair({f:1,arms:[[12,-62,28,-52]]}))+book(104,104,.85,true)+g(204,156,.9,sitChair({f:1,girl:true,arms:[[12,-62,28,-52]]}))+book(244,104,.85,true)+
    '<rect x="250" y="14" width="78" height="44" rx="8" fill="#fff" stroke="#C9CEE0" stroke-width="1.3" stroke-dasharray="3 3"/>'+T(289,33,'không ai',{s:10.5,w:700,c:MUTE})+T(289,49,'giám sát',{s:10.5,w:700,c:MUTE});
   return lfig('','Giờ tự học buổi tối không có người giám sát, vẫn vào đúng giờ và học',s,'Người Nhật tin mình từ chính những lúc không ai nhìn.','0 0 340 170');},
  app:function(){return lfig('','Trên thẻ, dòng Trở thành là con người bạn chọn. Mỗi con dấu là một lá phiếu; lên cấp có bạn và thầy cô xác nhận.',
   cardMock(8,8,{title:'Đúng giờ, đúng hẹn',se:'ra khỏi phòng sớm 5 phút',khi:'nghe báo thức reo',tro:'người đúng giờ',hl:'tro',week:['y','y','y','y','','','']})+
   arrow(206,144,226,144,'#C98A12',2.2)+callout(228,20,108,['Con người','bạn chọn'])+stamp(282,100,16)+T(282,132,'1 dấu = 1 phiếu',{s:10,w:800,c:RED_T})+
   callout(228,146,108,['Lên cấp: bạn và','thầy cô xác nhận'],GREEN_T),'','0 0 340 202');}
 }
};
/* Ghép vào bài học */
LESSONS.forEach(function(L){var V=LV[L.id];if(!V||L._hv)return;L._hv=1;var c=L.c1,i=c.indexOf('</p>');
 if(V.hieu&&i>0)c=c.slice(0,i+4)+V.hieu()+c.slice(i+4);
 if(V.pair)c=c.replace('<div class="pair">',V.pair()+'<div class="pair">');
 if(V.ladder)c=c.replace(/<div class="ladder">[\s\S]*?<\/div>/,V.ladder());
 L.c1=c;});
var hvLsDialog=lsDialog;lsDialog=function(L){var V=LV[L.id],h=hvLsDialog(L);return V&&V.story?h.replace('<div class="hw__k">SHIN PHỎNG VẤN SENPAI</div>','<div class="hw__k">SHIN PHỎNG VẤN SENPAI</div>'+V.story()):h;};
var hvLsApp=lsApp;lsApp=function(L){var V=LV[L.id],h=hvLsApp(L);return V&&V.app?h.replace('<div class="hw__k">Trong app này</div>','<div class="hw__k">Trong app này</div>'+V.app()):h;};

window.HOW_VISUAL={lessons:LV,data:HV,parts:{stepsHTML:stepsHTML,whyHTML:whyHTML,tipHTML:tipHTML}};
})();
