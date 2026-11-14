
    /**
     * TABLETOP HABIT HOOP
     * Kết hợp thiết kế UI mô-đun của Google Tabletop Experiment với vật lý 2D Matter.js.
     */
    window.addEventListener('DOMContentLoaded', () => {
      const { Engine, World, Bodies, Body, Events, Mouse, MouseConstraint } = Matter;

      // Tham chiếu DOM
      const courtWrapper = document.getElementById('court-wrapper');
      const itemsContainer = document.getElementById('items-container');
      const interactionLayer = document.getElementById('interaction-layer');
      const hoopBackboard = document.getElementById('hoop-backboard');
      const hoopForeground = document.getElementById('hoop-foreground');
      const hoopNetSvg = document.getElementById('hoop-net-svg');
      const fxLayer = document.getElementById('fx-layer');

      const hudBadge = document.getElementById('hud-badge');
      const hudTitle = document.getElementById('hud-title');
      const hudDesc = document.getElementById('hud-desc');
      const hudTag = document.getElementById('hud-tag');
      const scorePill = document.getElementById('score-pill');

      const tossBtn = document.getElementById('toss-btn');
      const resetBtn = document.getElementById('reset-btn');
      const soundToggleBtn = document.getElementById('sound-toggle');
      const soundIcon = document.getElementById('sound-icon');

      const emptyHabitsMsg = document.getElementById('empty-habits-msg');
      const selectedHabitsList = document.getElementById('selected-habits-list');
      const selectedCountBadge = document.getElementById('selected-count-badge');

      /**
       * Bộ 20 Thói Quen Tốt từ Shin routine · M3 theo ngôn ngữ thiết kế Google Tabletop
       * (Đã loại bỏ khối lập phương/rubic, giữ các thẻ mô-đun pastel, scoreboard, sticky note & bánh xe màu)
       */
      let TABLETOP_HABITS = [
        {
          id: 'chao',
          tag: 'GREETING',
          title: 'Chào & cười trước',
          habit: 'Chào trước, cười trước với mọi người xung quanh',
          accent: '#F59E0B',
          shape: 'rect',
          w: 118,
          h: 52,
          radius: 18,
          style: 'background:#FDF4DC; border:1.5px solid #F3DFA8; color:#1C1917;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex flex-col justify-between">
              <div class="flex items-center justify-between text-[8px] font-mono-tag font-bold text-amber-800/80 uppercase">
                <span>SMILE FIRST</span>
                <span>+1</span>
              </div>
              <div class="text-[11px] font-extrabold leading-tight tracking-tight truncate">Chào & cười trước</div>
              <div class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span class="flex-1 h-[1.5px] border-b border-dotted border-amber-500/70"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </div>
            </div>`
        },
        {
          id: 'som',
          tag: 'PUNCTUAL',
          title: 'Đến sớm 5 phút',
          habit: 'Luôn có mặt trước giờ hẹn hoặc giờ làm 5 phút',
          accent: '#0284C7',
          shape: 'rect',
          w: 116,
          h: 50,
          radius: 22,
          style: 'background:#E3F6FD; border:1.5px solid #BAE6FD; color:#0C4A6E;',
          renderInner: () => `
            <div class="w-full h-full px-3 py-1.5 flex flex-col justify-center">
              <div class="flex items-center justify-between font-mono-tag text-[8px] font-bold text-sky-700/80 uppercase">
                <span>ON TIME</span>
                <span>-5 MIN</span>
              </div>
              <div class="text-[11px] font-extrabold leading-tight mt-0.5 truncate">Đến sớm 5 phút</div>
            </div>`
        },
        {
          id: 'memo',
          tag: 'MEMO',
          title: 'Mang sổ memo',
          habit: 'Luôn mang sổ memo và bút bên mình để ghi chú kịp thời',
          accent: '#EA580C',
          shape: 'rect',
          w: 106,
          h: 52,
          radius: 18,
          style: 'background:#FFEDD5; border:1.5px solid #FED7AA; color:#7C2D12;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex flex-col justify-between">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-orange-800/75">NOTEBOOK</div>
              <div class="text-[11px] font-extrabold leading-tight truncate">Mang sổ memo</div>
            </div>`
        },
        {
          id: '5s',
          tag: '5S • 1 MIN',
          title: '5S một phút',
          habit: 'Dành 1 phút thực hành 5S giữ góc làm việc luôn gọn gàng',
          accent: '#00B875',
          shape: 'rect',
          w: 112,
          h: 56,
          radius: 18,
          style: 'background:#00B875; border:1.5px solid #009E64; color:#052E16;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-emerald-950/75">TIDY UP</div>
                <div class="text-[11px] font-extrabold leading-tight text-emerald-950 truncate">5S 1 phút</div>
              </div>
              <div class="shrink-0 px-2 py-1 rounded-lg bg-[#043927] text-emerald-300 font-mono-tag text-[10px] font-bold leading-none">
                5S
              </div>
            </div>`
        },
        {
          id: 'camon',
          tag: 'GRATITUDE',
          title: 'Cảm ơn chân thành',
          habit: 'Nói lời cảm ơn chân thành và rõ ràng khi nhận được sự giúp đỡ',
          accent: '#F43F5E',
          shape: 'rect',
          w: 118,
          h: 50,
          radius: 22,
          style: 'background:#FFE4E6; border:1.5px solid #FECDD3; color:#881337;',
          renderInner: () => `
            <div class="w-full h-full px-3 py-1.5 flex flex-col justify-center">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-rose-700/80">THANK YOU</div>
              <div class="text-[11px] font-extrabold leading-tight mt-0.5 truncate">Cảm ơn chân thành</div>
            </div>`
        },
        {
          id: 'xinloi',
          tag: 'OWNERSHIP',
          title: 'Nhận lỗi thẳng thắn',
          habit: 'Nhận lỗi không viện cớ, tập trung tìm cách khắc phục',
          accent: '#EAB308',
          shape: 'rect',
          w: 98,
          h: 62,
          radius: 18,
          style: 'background:#FFE44D; border:1.5px solid #FACC15; color:#18181B;',
          renderInner: () => `
            <div class="w-full h-full p-2.5 flex flex-col justify-between">
              <div class="font-mono-tag text-[7.5px] font-bold uppercase text-stone-800/75">NO EXCUSE</div>
              <div class="text-[11px] font-extrabold leading-[1.15] tracking-tight">Lắng nghe và sửa sai</div>
            </div>`
        },
        {
          id: 'loihua',
          tag: 'PROMISE',
          title: 'Giữ lời với mình',
          habit: 'Giữ lời hứa với chính mình, hoàn thành cam kết cá nhân',
          accent: '#8B5CF6',
          shape: 'rect',
          w: 118,
          h: 50,
          radius: 22,
          style: 'background:#EAE0FF; border:1.5px solid #D8B4FE; color:#2E1065;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-mono-tag text-[7.5px] font-bold uppercase text-purple-800/75">STREAK</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Giữ lời với mình</div>
              </div>
              <span class="shrink-0 px-2 py-0.5 rounded-full bg-violet-600 text-white font-mono-tag text-[9px] font-bold">100%</span>
            </div>`
        },
        {
          id: '5phut',
          tag: '5 MIN FOCUS',
          title: 'Tận dụng 5p chờ',
          habit: 'Tận dụng 5 phút chờ để đọc nhanh, ôn từ vựng hoặc sắp xếp ý tưởng',
          accent: '#059669',
          shape: 'rect',
          w: 114,
          h: 52,
          radius: 18,
          style: 'background:#D1FAE5; border:1.5px solid #6EE7B7; color:#064E3B;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-emerald-800/80">MICRO TIME</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Tận dụng 5p chờ</div>
              </div>
              <span class="px-1.5 py-1 rounded-lg bg-emerald-900 text-emerald-200 font-mono-tag text-[9px] font-bold">05:00</span>
            </div>`
        },
        {
          id: 'gopy',
          tag: 'CALM MIND',
          title: 'Nhận góp ý bình tĩnh',
          habit: 'Nhận góp ý không nóng nảy, lắng nghe để hoàn thiện bản thân',
          accent: '#0891B2',
          shape: 'rect',
          w: 118,
          h: 50,
          radius: 18,
          style: 'background:#CFFAFE; border:1.5px solid #A5F3FC; color:#164E63;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex flex-col justify-center">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-cyan-800/75">FEEDBACK</div>
              <div class="text-[11px] font-extrabold leading-tight truncate">Nhận góp ý bình tĩnh</div>
            </div>`
        },
        {
          id: 'camxuc',
          tag: 'EMOTION',
          title: 'Gọi tên cảm xúc',
          habit: 'Gọi tên cảm xúc hiện tại để làm chủ tâm trạng trước khi phản ứng',
          accent: '#8B5CF6',
          shape: 'circle',
          size: 64,
          style: 'background:#FFFFFF; border:1.5px solid #E7E5E4; color:#18181B;',
          renderInner: () => `
            <div class="w-full h-full flex flex-col items-center justify-center p-1">
              <!-- Bánh xe màu sắc cảm xúc chuẩn Google Tabletop -->
              <svg class="w-8 h-8" viewBox="0 0 40 40">
                <path d="M20 20 L20 3 A17 17 0 0 1 34.7 11.5 Z" fill="#8B5CF6"/>
                <path d="M20 20 L34.7 11.5 A17 17 0 0 1 34.7 28.5 Z" fill="#06B6D4"/>
                <path d="M20 20 L34.7 28.5 A17 17 0 0 1 20 37 Z" fill="#3B82F6"/>
                <path d="M20 20 L20 37 A17 17 0 0 1 5.3 28.5 Z" fill="#10B981"/>
                <path d="M20 20 L5.3 28.5 A17 17 0 0 1 5.3 11.5 Z" fill="#FACC15"/>
                <path d="M20 20 L5.3 11.5 A17 17 0 0 1 20 3 Z" fill="#EF4444"/>
                <circle cx="20" cy="20" r="5.5" fill="#18181B"/>
                <circle cx="20" cy="20" r="2" fill="#FFFFFF"/>
              </svg>
              <span class="text-[8.5px] font-extrabold tracking-tight mt-0.5">Cảm xúc</span>
            </div>`
        },
        {
          id: 'vandong',
          tag: 'MOVEMENT',
          title: 'Vận động mỗi ngày',
          habit: 'Vận động mỗi ngày giúp cơ thể dẻo dai và tràn đầy năng lượng',
          accent: '#00B875',
          shape: 'rect',
          w: 118,
          h: 52,
          radius: 22,
          style: 'background:#CCFBF1; border:1.5px solid #99F6E4; color:#115E59;',
          renderInner: () => `
            <div class="w-full h-full px-3 py-1.5 flex flex-col justify-center">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-teal-800/75">DAILY ACTIVE</div>
              <div class="text-[11px] font-extrabold leading-tight truncate">Vận động mỗi ngày</div>
            </div>`
        },
        {
          id: 'anuong',
          tag: 'NUTRITION',
          title: 'Ăn uống đủ chất',
          habit: 'Ăn/uống đủ bữa, cân bằng dinh dưỡng và uống đủ nước mỗi ngày',
          accent: '#65A30D',
          shape: 'rect',
          w: 114,
          h: 50,
          radius: 22,
          style: 'background:#ECFCCB; border:1.5px solid #D9F99D; color:#365314;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-lime-800/80">BALANCE</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Ăn/uống đủ</div>
              </div>
              <span class="px-1.5 py-0.5 rounded-full bg-lime-600 text-white font-mono-tag text-[9px] font-bold">OK</span>
            </div>`
        },
        {
          id: 'ngu',
          tag: 'SLEEP • 7–8h',
          title: 'Ngủ trước 7–8h',
          habit: 'Ngủ trước 23 giờ để phục hồi trí não và sức khỏe bền vững',
          accent: '#4F46E5',
          shape: 'rect',
          w: 114,
          h: 52,
          radius: 18,
          style: 'background:#E0E7FF; border:1.5px solid #C7D2FE; color:#1E1B4B;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-indigo-800/75">BEDTIME</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Ngủ đủ giấc</div>
              </div>
              <span class="px-1.5 py-1 rounded-lg bg-indigo-900 text-indigo-100 font-mono-tag text-[9px] font-bold">7–8h</span>
            </div>`
        },
        {
          id: 'bot',
          tag: 'CLEAN HABIT',
          title: 'Giảm thói quen xấu',
          habit: 'Giảm thói quen chưa tốt (lướt điện thoại vô thức, thức khuya...)',
          accent: '#E11D48',
          shape: 'rect',
          w: 118,
          h: 48,
          radius: 22,
          style: 'background:#FFF1F2; border:1.5px solid #FECDD3; color:#9F1239;',
          renderInner: () => `
            <div class="w-full h-full px-3 py-1.5 flex flex-col justify-center">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-rose-600/80">LESS IS MORE</div>
              <div class="text-[11px] font-extrabold leading-tight truncate">Giảm thói quen xấu</div>
            </div>`
        },
        {
          id: 'chitieu',
          tag: 'FINANCE',
          title: 'Ghi 1 dòng chi tiêu',
          habit: 'Ghi 1 dòng chi tiêu mỗi ngày để kiểm soát tài chính cá nhân',
          accent: '#D97706',
          shape: 'rect',
          w: 118,
          h: 50,
          radius: 18,
          style: 'background:#FEF9C3; border:1.5px solid #FDE047; color:#713F12;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-amber-800/80">1 LINE/DAY</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Ghi 1 dòng chi tiêu</div>
              </div>
              <span class="px-1.5 py-0.5 rounded-md bg-amber-600 text-white font-mono-tag text-[9px] font-bold">₫</span>
            </div>`
        },
        {
          id: 'tiengnhat',
          tag: '日本語 • JP',
          title: 'Nói tiếng Nhật',
          habit: 'Mạnh dạn nói tiếng Nhật, không ngại sai để tiến bộ mỗi ngày',
          accent: '#2563EB',
          shape: 'rect',
          w: 114,
          h: 50,
          radius: 18,
          style: 'background:#DBEAFE; border:1.5px solid #BFDBFE; color:#1E3A8A;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-blue-700/80">SPEAK UP</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Nói tiếng Nhật</div>
              </div>
              <span class="px-1.5 py-0.5 rounded-md bg-blue-600 text-white font-mono-tag text-[9px] font-bold">JP</span>
            </div>`
        },
        {
          id: 'quansat',
          tag: 'CURIOSITY',
          title: 'Quan sát & hỏi 1 câu',
          habit: 'Quan sát kỹ quy trình và chủ động hỏi 1 câu chất lượng mỗi ngày',
          accent: '#9333EA',
          shape: 'rect',
          w: 120,
          h: 50,
          radius: 22,
          style: 'background:#F3E8FF; border:1.5px solid #E9D5FF; color:#581C87;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-purple-700/80">OBSERVE</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Quan sát & hỏi 1 câu</div>
              </div>
              <span class="shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white font-mono-tag text-[10px] font-bold flex items-center justify-center">?</span>
            </div>`
        },
        {
          id: 'viecko',
          tag: 'CHALLENGE',
          title: 'Nhận việc khó',
          habit: 'Xung phong làm việc khó để bứt phá giới hạn và trưởng thành nhanh',
          accent: '#18181B',
          shape: 'rect',
          w: 108,
          h: 48,
          radius: 18,
          style: 'background:#F5F5F4; border:1.5px solid #D6D3D1; color:#18181B;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex flex-col justify-center">
              <div class="font-mono-tag text-[8px] font-bold uppercase text-stone-500">STEP UP</div>
              <div class="text-[11px] font-extrabold leading-tight truncate">Nhận việc khó</div>
            </div>`
        },
        {
          id: 'horenso',
          tag: '報・連・相',
          title: 'Hō-Ren-Sō',
          habit: 'Áp dụng Hō-Ren-Sō (Báo cáo – Liên lạc – Thảo luận) chủ động, rõ ràng',
          accent: '#00B875',
          shape: 'rect',
          w: 116,
          h: 56,
          radius: 18,
          style: 'background:#00B875; border:1.5px solid #009E64; color:#052E16;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-emerald-950/80">報・連・相</div>
                <div class="text-[11px] font-extrabold leading-tight text-emerald-950 truncate">Hō-Ren-Sō</div>
              </div>
              <div class="shrink-0 px-2 py-1 rounded-lg bg-[#043927] text-emerald-300 font-mono-tag text-[9px] font-bold leading-none">
                3X
              </div>
            </div>`
        },
        {
          id: 'giup',
          tag: 'TEAMWORK',
          title: 'Xong việc & giúp 1 việc',
          habit: 'Hoàn thành trọn vẹn việc của mình và chủ động giúp thêm một việc',
          accent: '#16A34A',
          shape: 'rect',
          w: 124,
          h: 50,
          radius: 22,
          style: 'background:#F0FDF4; border:1.5px solid #BBF7D0; color:#14532D;',
          renderInner: () => `
            <div class="w-full h-full px-2.5 py-1.5 flex items-center justify-between gap-1">
              <div class="min-w-0">
                <div class="font-mono-tag text-[8px] font-bold uppercase text-green-700/80">DONE + HELP</div>
                <div class="text-[11px] font-extrabold leading-tight truncate">Xong & giúp 1 việc</div>
              </div>
              <span class="shrink-0 px-1.5 py-0.5 rounded-full bg-green-600 text-white font-mono-tag text-[9px] font-bold">+1</span>
            </div>`
        }
      ];

      const host = window.parent !== window && typeof window.parent.shinGameCatalog14 === 'function' ? window.parent : null;
      const catalog = host ? host.shinGameCatalog14() : [{"id": "chao", "title": "Chủ động chào hỏi và cảm ơn", "shortTitle": "Chào hỏi và cảm ơn", "description": "chào người đầu tiên gặp, nhìn mắt, mỉm cười"}, {"id": "som", "title": "Đúng giờ, đúng hẹn", "shortTitle": "Đúng giờ, đúng hẹn", "description": "ra khỏi phòng sớm hơn 5 phút"}, {"id": "memo", "title": "Quan sát, hỏi và ghi lại", "shortTitle": "Quan sát, hỏi và ghi lại", "description": "ghi một lời dặn hoặc một điều học được"}, {"id": "5s", "title": "5S - Gọn gàng và ngăn nắp", "shortTitle": "5S - Gọn gàng và ngăn nắp", "description": "cất đồ về đúng chỗ"}, {"id": "xinloi", "title": "Lắng nghe và sửa sai", "shortTitle": "Lắng nghe và sửa sai", "description": "nghe hết lời góp ý, ghi điều cần xem lại"}, {"id": "5phut", "title": "Tận dụng 05 phút", "shortTitle": "Tận dụng 05 phút", "description": "làm một việc học nhỏ trong khoảng trống phù hợp"}, {"id": "camxuc", "title": "Nhận biết và điều chỉnh cảm xúc", "shortTitle": "Cảm xúc", "description": "hít ba hơi và gọi tên cảm xúc"}, {"id": "vandong", "title": "Vận động mỗi ngày", "shortTitle": "Vận động", "description": "vận động một chút vừa sức"}, {"id": "anuong", "title": "Ăn uống dinh dưỡng, điều độ", "shortTitle": "Ăn uống điều độ", "description": "chọn một việc nhỏ để chăm sóc bữa ăn"}, {"id": "ngu", "title": "Ngủ đủ giấc", "shortTitle": "Ngủ đủ giấc", "description": "chuẩn bị ngủ vào giờ mình đã chọn"}, {"id": "chitieu", "title": "Chi tiêu có kế hoạch", "shortTitle": "Chi tiêu", "description": "ghi một dòng chi tiêu"}, {"id": "viecko", "title": "Dám thử việc khó", "shortTitle": "Dám thử việc khó", "description": "chuẩn bị và thử một việc hơi ngại, vừa sức"}, {"id": "horenso", "title": "Báo cáo và xác nhận", "shortTitle": "Báo cáo và xác nhận", "description": "báo lại với người giao việc"}, {"id": "giup", "title": "Giúp đỡ một việc", "shortTitle": "Giúp đỡ một việc", "description": "hỏi xem bạn cần giúp gì"}];
      TABLETOP_HABITS = TABLETOP_HABITS.filter(item => catalog.some(h => h.id === item.id));
      TABLETOP_HABITS.forEach(item => {
        const source = catalog.find(h => h.id === item.id);
        if(source){item.title=source.title;item.shortTitle=source.shortTitle;item.habit=source.description;}
        const draw=item.renderInner;
        item.renderInner=()=>{const box=document.createElement('div');box.innerHTML=draw();const label=box.querySelector('.truncate');if(label)label.textContent=item.shortTitle||item.title;return box.innerHTML;};
      });
      function reportResults(){if(host)host.shinGameResults14(selectedHabits.map(x=>x.data.id));}
      function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
      let resultsVisible=false;
      const resultsSection=selectedHabitsList.closest('section'),jumpButton=document.getElementById('game14-results-jump');
      function viewResults(){resultsSection.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});}
      scorePill.addEventListener('click',viewResults);jumpButton.addEventListener('click',viewResults);
      new IntersectionObserver(entries=>{resultsVisible=entries[0].isIntersecting;jumpButton.hidden=resultsVisible||!selectedHabits.length;},{threshold:.4}).observe(resultsSection);
      // Trạng thái game
      let engine = null;
      let world = null;
      let mouseConstraint = null;
      let activeEntities = [];
      let selectedHabits = [];
      let draggedBody = null;
      let hoopSensorBody = null;
      let hoopGeometry = { x: 230, y: 135, radius: 60 };
      let soundEnabled = host ? host.shinGameSound14() : false;
      let audioCtx = null;
      let lastBounceSound = 0;
      let courtWidth = 460;
      let courtHeight = 610;

      /**
       * Hiệu ứng âm thanh Web Audio API tinh tế
       */
      function playSound(type, intensity = 0.5) {
        if (!soundEnabled) return;
        try {
          if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
          }
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const now = audioCtx.currentTime;

          if (type === 'bounce') {
            if (performance.now() - lastBounceSound < 55) return;
            lastBounceSound = performance.now();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const vol = Math.min(Math.max(intensity, 0.1), 1) * 0.11;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150 + intensity * 110, now);
            osc.frequency.exponentialRampToValueAtTime(55, now + 0.05);

            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.06);
          } else if (type === 'score') {
            const notes = [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((freq, idx) => {
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              const t = now + idx * 0.05;

              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, t);

              gain.gain.setValueAtTime(0.13, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start(t);
              osc.stop(t + 0.25);
            });
          }
        } catch (e) {}
      }

      /**
       * Hiệu ứng hạt màu Tabletop khi ném trúng rổ
       */
      function spawnScoreParticles(cx, cy) {
        const colors = ['#00B875', '#FFE44D', '#8B5CF6', '#38BDF8', '#F97316', '#F43F5E'];
        for (let i = 0; i < 18; i++) {
          const p = document.createElement('div');
          p.className = 'tt-particle';
          const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.3;
          const dist = 38 + Math.random() * 48;
          p.style.left = `${cx}px`;
          p.style.top = `${cy}px`;
          p.style.backgroundColor = colors[i % colors.length];
          p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
          p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
          fxLayer.appendChild(p);
          setTimeout(() => p.remove(), 700);
        }
      }

      /**
       * Cập nhật thanh thông tin phía trên mặt bàn
       */
      function updateHud(accentColor, title, desc, tagText) {
        hudBadge.style.backgroundColor = accentColor;
        hudTitle.textContent = title;
        hudDesc.textContent = desc;
        hudTag.textContent = tagText;
      }

      /**
       * Render danh sách thói quen đã chọn bên dưới
       */
      function renderSelectedHabits() {
        scorePill.textContent = `${selectedHabits.length} / ${TABLETOP_HABITS.length}`;
        selectedCountBadge.textContent = `${selectedHabits.length} GỢI Ý`;
        emptyHabitsMsg.classList.toggle('hidden',selectedHabits.length>0);
        selectedHabitsList.innerHTML=selectedHabits.map((entry,index)=>{
          const data=entry.data,state=host?host.shinGameHabitState14(data.id):{label:'Chưa rèn',onHand:false};
          return `<article class="result14"><b>${safe(data.title)}</b><p>${safe(data.habit)}</p><span class="result14-status">${safe(state.label)}</span><div class="result14-actions"><button type="button" data-action="view" data-index="${index}">Xem thẻ</button>${state.onHand?'':`<button type="button" data-action="choose" data-index="${index}">${state.exists?'Đưa lên tay':'Chọn rèn'}</button>`}<button type="button" data-action="return" data-index="${index}" aria-label="Trả ${safe(data.title)} về bàn">Trả về bàn</button></div></article>`;
        }).join('');
        const jump=document.getElementById('game14-results-jump');
        jump.textContent=selectedHabits.length+' gợi ý · Xem ↓';jump.hidden=!selectedHabits.length||resultsVisible;
        reportResults();
      }

      /**
       * Tạo một thẻ/khối vật lý Tabletop và đặt lên mặt bàn
       */
      function spawnTabletopWidget(habitData, x, y) {
        const scale = Math.min(courtWidth / 460, 1.05);
        let body, w, h;

        const commonPhysics = {
          angle: (Math.random() - 0.5) * 0.28,
          restitution: 0.52,
          friction: 0.24,
          frictionStatic: 0.35,
          frictionAir: 0.012,
          density: 0.002
        };

        if (habitData.shape === 'circle') {
          const diameter = Math.round(habitData.size * scale);
          w = diameter;
          h = diameter;
          body = Bodies.circle(x, y, diameter / 2, commonPhysics);
        } else {
          w = Math.round(habitData.w * scale);
          h = Math.round(habitData.h * scale);
          const r = Math.round((habitData.radius || 18) * scale);
          body = Bodies.rectangle(x, y, w, h, {
            ...commonPhysics,
            chamfer: { radius: r }
          });
        }

        body.habitData = habitData;

        const el = document.createElement('div');
        el.className = 'tt-widget overflow-hidden';
        el.style.cssText = habitData.style;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.borderRadius = habitData.shape === 'circle'
          ? '9999px'
          : `${Math.round((habitData.radius || 18) * scale)}px`;
        el.innerHTML = habitData.renderInner();

        itemsContainer.appendChild(el);
        World.add(world, body);

        activeEntities.push({
          body,
          element: el,
          width: w,
          height: h,
          data: habitData,
          scored: false
        });
      }

      /**
       * Khởi tạo toàn bộ không gian Tabletop & Rổ
       */
      function initGameWorld(keepSelected = false) {
        courtWidth = courtWrapper.clientWidth || 420;
        courtHeight = courtWrapper.clientHeight || 600;
        const scale = Math.min(courtWidth / 460, 1.05);

        if (!keepSelected) {
          selectedHabits = [];
          renderSelectedHabits();
        }

        if (mouseConstraint && mouseConstraint.mouse) {
          const m=mouseConstraint.mouse,el=m.element;
          [['mousemove',m.mousemove],['mousedown',m.mousedown],['mouseup',m.mouseup],['touchmove',m.mousemove],['touchstart',m.mousedown],['touchend',m.mouseup]].forEach(([type,fn])=>el.removeEventListener(type,fn));
          Mouse.clearSourceEvents(m);
        }
        if (engine) {
          Events.off(engine);World.clear(world);
          Engine.clear(engine);
        }
        itemsContainer.innerHTML = '';
        activeEntities = [];
        draggedBody = null;

        engine = Engine.create({
          positionIterations: 8,
          velocityIterations: 6
        });
        world = engine.world;
        engine.gravity.y = 1.05;

        // 1. Tường bao quanh mặt bàn
        const wallThick = 90;
        const wallOpts = { isStatic: true, restitution: 0.5, friction: 0.3 };
        World.add(world, [
          Bodies.rectangle(courtWidth / 2, -wallThick / 2, courtWidth + wallThick * 2, wallThick, wallOpts),
          Bodies.rectangle(courtWidth / 2, courtHeight + wallThick / 2, courtWidth + wallThick * 2, wallThick, wallOpts),
          Bodies.rectangle(-wallThick / 2, courtHeight / 2, wallThick, courtHeight + wallThick * 2, wallOpts),
          Bodies.rectangle(courtWidth + wallThick / 2, courtHeight / 2, wallThick, courtHeight + wallThick * 2, wallOpts)
        ]);

        // 2. Chiếc Rổ ở phía trên chính giữa
        const hoopX = courtWidth / 2;
        const hoopY = Math.round(145 * scale);
        const hoopOpening = Math.round(132 * scale); // Độ rộng miệng rổ thoải mái cho các thẻ Tabletop
        const hoopRadius = hoopOpening / 2;
        hoopGeometry = { x: hoopX, y: hoopY, radius: hoopRadius };

        const boardW = Math.round(164 * scale);
        const boardH = Math.round(98 * scale);
        hoopBackboard.style.left = `${hoopX}px`;
        hoopBackboard.style.top = `${hoopY - boardH + Math.round(12 * scale)}px`;
        hoopBackboard.style.width = `${boardW}px`;
        hoopBackboard.style.height = `${boardH}px`;

        hoopForeground.style.left = `${hoopX}px`;
        hoopForeground.style.top = `${hoopY - 5}px`;
        hoopForeground.style.width = `${hoopOpening}px`;

        const rimPostRadius = Math.max(5, Math.round(6 * scale));
        const leftRimPost = Bodies.circle(hoopX - hoopRadius, hoopY, rimPostRadius, {
          isStatic: true,
          restitution: 0.65,
          friction: 0.1
        });
        const rightRimPost = Bodies.circle(hoopX + hoopRadius, hoopY, rimPostRadius, {
          isStatic: true,
          restitution: 0.65,
          friction: 0.1
        });

        hoopSensorBody = Bodies.rectangle(
          hoopX,
          hoopY + Math.round(15 * scale),
          hoopOpening * 0.74,
          Math.round(14 * scale),
          {
            isStatic: true,
            isSensor: true,
            label: 'hoop-sensor'
          }
        );

        World.add(world, [leftRimPost, rightRimPost, hoopSensorBody]);

        // 3. Xếp 20 thẻ Tabletop ở nửa dưới mặt bàn
        const selectedIds = new Set(selectedHabits.map(s => s.data.id));
        const widgetsToSpawn = TABLETOP_HABITS.filter(item => !selectedIds.has(item.id));

        const cols = 3;
        const startX = courtWidth * 0.20;
        const stepX = (courtWidth * 0.60) / (cols - 1);
        const bottomStartY = courtHeight - Math.round(46 * scale);
        const rowGapY = Math.round(54 * scale);

        widgetsToSpawn.forEach((habitData, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const jitterX = (Math.random() - 0.5) * 18 * scale;
          const x = startX + col * stepX + jitterX;
          const y = bottomStartY - row * rowGapY;
          spawnTabletopWidget(habitData, x, y);
        });

        // 4. Kích hoạt kéo & ném
        setupPointerInteraction();

        // 5. Lắng nghe va chạm & lọt rổ
        Events.on(engine, 'collisionStart', (event) => {
          const pairs = event.pairs;
          for (let i = 0; i < pairs.length; i++) {
            const { bodyA, bodyB } = pairs[i];
            if (bodyA === hoopSensorBody || bodyB === hoopSensorBody) {
              const itemBody = bodyA === hoopSensorBody ? bodyB : bodyA;
              handleHoopSensorCollision(itemBody);
            } else {
              const impact = (bodyA.speed || 0) + (bodyB.speed || 0);
              if (impact > 2.2) {
                playSound('bounce', impact / 15);
              }
            }
          }
        });
      }

      /**
       * Xử lý khi thẻ thói quen lọt qua vành rổ
       */
      function handleHoopSensorCollision(itemBody) {
        const entity = activeEntities.find(e => e.body === itemBody);
        if (!entity || entity.scored || !entity.armed) return;

        if (itemBody.velocity.y > 0.3 && draggedBody !== itemBody) {
          entity.scored = true;
          playSound('score');

          hoopNetSvg.classList.remove('net-swish-anim');
          void hoopNetSvg.offsetWidth;
          hoopNetSvg.classList.add('net-swish-anim');
          spawnScoreParticles(hoopGeometry.x, hoopGeometry.y + 18);

          updateHud(
            '#10B981',
            `Vào rổ: ${entity.data.title}!`,
            entity.data.habit,
            'GỢI Ý'
          );

          selectedHabits.unshift({
            data: entity.data,
            
          });
          renderSelectedHabits();

          entity.element.style.opacity = '0';
          setTimeout(() => {
            World.remove(world, entity.body);
            entity.element.remove();
            activeEntities = activeEntities.filter(e => e !== entity);
          }, 180);
        } else if (draggedBody === itemBody && itemBody.velocity.y > 0) {
          updateHud(
            '#F97316',
            'Thả tay ra để ném thẻ vào rổ!',
            entity.data.habit,
            'RELEASE'
          );
        }
      }

      /**
       * Điều khiển kéo thả & ném thẻ bằng chuột hoặc cảm ứng
       */
      function setupPointerInteraction() {
        const mouse = Mouse.create(interactionLayer);
        mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.36,
            damping: 0.12,
            render: { visible: false }
          }
        });

        Events.on(mouseConstraint, 'startdrag', (event) => {
          const body = event.body;
          const entity = activeEntities.find(e => e.body === body);
          if (entity) {
            draggedBody = body;
            entity.element.classList.add('is-grabbed');
            activeEntities.forEach(e => Matter.Sleeping.set(e.body, false));
            entity.armed=true;
            updateHud(entity.data.accent, entity.data.title, entity.data.habit, entity.data.tag);
          }
        });

        Events.on(mouseConstraint, 'enddrag', (event) => {
          const body = event.body;
          const entity = activeEntities.find(e => e.body === body);
          if (entity) {
            entity.element.classList.remove('is-grabbed');
            const maxSpeed = 27;
            if (body.speed > maxSpeed) {
              const ratio = maxSpeed / body.speed;
              Body.setVelocity(body, {
                x: body.velocity.x * ratio,
                y: body.velocity.y * ratio
              });
            }
          }
          draggedBody = null;
        });

        World.add(world, mouseConstraint);
      }

      /**
       * Hất tung & xáo trộn toàn bộ thẻ trên mặt bàn (Toss the table)
       */
      function tossTable() {
        playSound('bounce', 0.85);
        activeEntities.forEach(entity => {
          entity.armed=true;
          const {body}=entity;
          Matter.Sleeping.set(body, false);
          const fx = (Math.random() - 0.5) * 0.05 * body.mass;
          const fy = -(0.032 + Math.random() * 0.036) * body.mass;
          Body.applyForce(body, body.position, { x: fx, y: fy });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
        });
      }

      /**
       * Vòng lặp 60fps cập nhật vị trí & góc xoay của từng thẻ DOM
       */
      let lastFrameTime = performance.now();
      function gameLoop(now) {
        const delta = Math.min(now - lastFrameTime, 32);
        lastFrameTime = now;

        if (engine) {
          Engine.update(engine, delta);
          for (let i = 0; i < activeEntities.length; i++) {
            const { body, element, width, height } = activeEntities[i];
            const x = body.position.x - width / 2;
            const y = body.position.y - height / 2;
            element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${body.angle.toFixed(4)}rad)`;
          }
        }

        if(running)frame=requestAnimationFrame(gameLoop);
      }

      // Sự kiện các nút điều khiển
      tossBtn.addEventListener('click', tossTable);

      resetBtn.addEventListener('click', () => {
        playSound('bounce', 0.5);
        updateHud(
          '#10B981',
          'Kéo & ném thẻ thói quen vào rổ phía trên',
          'Kéo một khối rồi thả tay để ném, hoặc bấm Tung lên.',
          'SHIN M3'
        );
        initGameWorld(true);
      });

      soundToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
        if (soundEnabled) playSound('bounce', 0.6);
      });

      // Tương tác danh sách thói quen đã chọn bên dưới
      selectedHabitsList.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);
        const target = selectedHabits[index];
        if (!target) return;

        if (action === 'view' || action === 'choose') {
          reportResults();
          if(host)host.shinGameAction14(action,target.data.id);
        } else if (action === 'return') {
          selectedHabits.splice(index, 1);
          renderSelectedHabits();
          spawnTabletopWidget(target.data, courtWidth / 2, courtHeight * 0.44);
          playSound('bounce', 0.5);
          updateHud(target.data.accent, `Đã trả "${target.data.title}" về bàn`, target.data.habit, target.data.tag);
        }
      });

      // Tự động điều chỉnh khi thay đổi kích thước màn hình
      let resizeTimeout = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newW = courtWrapper.clientWidth;
          if (Math.abs(newW - courtWidth) > 10) {
            initGameWorld(true);
          }
        }, 160);
      });

      // Khởi chạy
      selectedHabits=(host?host.shinGameSaved14():[]).map(id=>({data:TABLETOP_HABITS.find(x=>x.id===id)})).filter(x=>x.data);
      soundIcon.textContent=soundEnabled?'🔊':'🔇';
      initGameWorld(true);renderSelectedHabits();
      let running=true,frame=0;
      function resume(){if(!running){running=true;lastFrameTime=performance.now();frame=requestAnimationFrame(gameLoop);}}
      document.addEventListener('visibilitychange',()=>{if(document.hidden){running=false;cancelAnimationFrame(frame);if(audioCtx&&audioCtx.state==='running')audioCtx.suspend();}else resume();});
      window.addEventListener('pagehide',()=>{running=false;cancelAnimationFrame(frame);if(audioCtx)audioCtx.close();});
      frame=requestAnimationFrame(gameLoop);
    });
  
