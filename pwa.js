(() => {
 'use strict';
 const key='cd49.pwa.install-guide.v1';
 let promptEvent=null, panel=null, previousFocus=null;
 const installed=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const mobile=ios||/Android/i.test(navigator.userAgent);
 const read=()=>{try{return localStorage.getItem(key)==='1';}catch{return false;}};
 const remember=()=>{try{localStorage.setItem(key,'1');}catch{}};
 function close(){if(panel){panel.hidden=true;if(panel.contains(document.activeElement)&&previousFocus)previousFocus.focus();}remember();}
 function show(){
  if(installed()||read())return;
  if(!panel){
   panel=document.createElement('aside'); panel.id='cd49-install';panel.setAttribute('aria-labelledby','cd49-install-title');
   panel.innerHTML='<button class="cd49-close" type="button" aria-label="Đóng hướng dẫn">×</button><h2 id="cd49-install-title">Cài Career Design</h2><p>Mở khóa học nhanh từ màn hình chính.</p><p class="cd49-steps"></p><div class="cd49-actions"><button class="cd49-install-now" type="button" hidden>Cài ứng dụng</button><button class="cd49-later" type="button">Để sau</button></div><p style="font-size:12px">Sau khi cài, hãy học từ biểu tượng ứng dụng. Bài làm được lưu trên thiết bị; trên iPhone có thể lưu riêng với trình duyệt. Có thể xem lại hướng dẫn trong mục cài ứng dụng của khóa học.</p>';
   document.body.appendChild(panel);
   panel.querySelector('.cd49-close').onclick=close;
   panel.querySelector('.cd49-later').onclick=close;
   panel.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
   panel.querySelector('.cd49-install-now').onclick=async()=>{
    if(!promptEvent)return;
    const event=promptEvent;promptEvent=null;
    try{await event.prompt();await event.userChoice;close();}catch{update();}
   };
  }
  update();previousFocus=document.activeElement;panel.hidden=false;
 }
 function update(){
  if(!panel)return;
  panel.querySelector('.cd49-steps').textContent=ios?'Trên iPhone/iPad: mở bằng Safari → Chia sẻ → Thêm vào Màn hình chính → bật “Mở dưới dạng ứng dụng web” nếu có → Thêm. Nếu chưa thấy, kéo xuống danh sách Chia sẻ.':promptEvent?'Chạm “Cài ứng dụng” rồi xác nhận theo hướng dẫn của trình duyệt.':'Trong menu trình duyệt (⋮ hoặc ☰), chọn “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính”. Nếu không có, mở đường link này bằng Chrome trên Android hoặc Safari trên iPhone.';
  panel.querySelector('.cd49-install-now').hidden=!promptEvent||ios;
 }
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;update();if(!mobile)show();});
 window.addEventListener('appinstalled',()=>{promptEvent=null;close();});
 if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){
  window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(error=>console.warn('CD49 offline support unavailable',error));});
 }
 if(mobile)setTimeout(show,1800);
})();
