# Lịch sử và bàn giao

## M.Claude.3.3.28 — 14/11/2026 — Bản final của đợt "Cách làm bằng hình"

Người dùng duyệt 2 câu mới ở Bài 3, Bài 5 và đồng ý sửa 4 chỗ chữ bài học chưa khớp app.

- `scripts/core.js` (LESSONS):
  - Bài 1: "Ô “Tôi sẽ…”" → "Dòng “Mình sẽ…”" (ở mục Trong app và Luyện ngay), khớp nhãn MÌNH SẼ trên thẻ.
  - Bài 3: "Thẻ 5S một phút" → "Thẻ 5S - Gọn gàng và ngăn nắp"; "Thẻ Ngủ sớm" → "Thẻ Ngủ đủ giấc"; bỏ câu về "Thẻ Giảm dần" (thẻ đã bỏ khỏi bộ 14).
  - Bài 4: "(như Nhận góp ý)" → "(như Lắng nghe và sửa sai)" — thẻ này đúng là loại "khi gặp dịp" trong bộ 14 (cùng Dám thử việc khó, Báo cáo và xác nhận, Giúp đỡ một việc).
- APP_VER và cache: M.Claude.3.3.28.

**Tổng kết đợt M.Claude.3.3.22 → 3.3.28:** 14/14 thói quen có hình trong "Cách làm" (tranh đôi Ở TRƯỜNG/Ở NHẬT hoặc BÂY GIỜ/SANG NHẬT, 3 khung bước, cặp Nên/Tránh, Shin mách nhỏ; giữ 9 hình cũ); 3 bài Tìm điểm (Ngủ, Ăn uống, 5S); 2 hình động (squat, vòng thở); 5 bài Nền tảng rèn luyện có hình ở thẻ Hiểu, Senpai kể, Trong app; bỏ mọi trích dẫn lời Thầy. Dữ liệu, khóa lưu, cách tính tiến độ/XP không đổi. Việc còn lại: thử trên Safari/iPhone và điện thoại Android thật.

## M.Claude.3.3.27 — 14/11/2026 — Bỏ trích dẫn Thầy Lê Long Sơn

Yêu cầu: xóa hết trích dẫn của Thầy trong 5 bài học và "Cách làm" của 14 thói quen; câu nào hay thì chuyển thành chữ của khóa học.

- `scripts/core.js`: xóa 5 trường `quote` (chao, memo và 3 thẻ cũ đã bỏ khỏi bộ 14 thẻ: loihua và hai thẻ cũ khác).
- Bài 3: khung trích dẫn đổi thành câu của khóa học "Thói lười có thể lây sang nhau." (nối với "Siêng năng cũng lây…").
- Bài 5: khung trích dẫn đổi thành "Khi đã thật sự muốn, mình tự học, tự làm mà không cần ai nhắc." (dẫn vào thang Bị → Đam mê).
- Kiểm tra: không còn chữ "Lê Long Sơn" trong mã; mở mọi thẻ của 14 thói quen và 5 bài không còn khung trích dẫn.
- **Quy ước:** app không trích dẫn lời Thầy; không thêm lại.
- APP_VER và cache: M.Claude.3.3.27.

## M.Claude.3.3.26 — 14/11/2026 — 5 bài "Nền tảng rèn luyện" bằng hình (chờ duyệt)

Yêu cầu: áp dụng hướng "Cách làm bằng hình" cho 5 bài học nền tảng (hiểu cách dùng app và phương pháp rèn luyện).

- `scripts/how-visual.js`, mục `LV` (b1–b5), không sửa chữ của bài:
  - **Hiểu**: hình ý chính chèn sau câu in đậm đầu bài — b1 biểu đồ 14 ngày "1 tiếng/tối vs 10 phút/tối"; b2 dòng thời gian việc quen trong ngày + "đánh răng xong → mở sổ"; b3 GẦN/XA; b4 chuỗi ngày lỡ 1 ngày vs lỡ 2 ngày liền; b5 hộp phiếu + cột phiếu tuần này/tuần sau, và thang 5 bậc Bị → Đam mê vẽ thành bậc thang (thay khối chữ `.ladder`, giữ nguyên 5 từ).
  - **Senpai kể**: cảnh minh họa câu chuyện ở đầu thẻ (bọc `lsDialog`).
  - **Trong app**: mô phỏng thẻ thói quen đúng nhãn thật (MÌNH SẼ · KHI · Trở thành…), khoanh vàng chỗ bài nhắc tới; b4 mô phỏng chuỗi tuần, ghi bù 3 ngày, thẻ "khi gặp dịp", "mạng nhện" (bọc `lsApp`).
- Thẻ "Thử" giữ nguyên tương tác cũ.
- APP_VER và cache: M.Claude.3.3.26. Dữ liệu không đổi.
- Phát hiện chữ cũ chưa khớp app hiện tại (chưa sửa, chờ người dùng duyệt): b1 "Ô “Tôi sẽ…”" (thẻ ghi MÌNH SẼ); b3 "Thẻ 5S một phút", "Thẻ Ngủ sớm", "Thẻ Giảm dần" (đã bỏ khỏi bộ 14 thẻ); b4 "(như Nhận góp ý)" (nay là Lắng nghe và sửa sai).

## M.Claude.3.3.25 — 14/11/2026 — "Cách làm" bằng hình, đợt 4 (đủ 14 thói quen, chờ duyệt)

Người dùng duyệt đợt 3, góp ý: bàn tay vẽ hơi thô (Đúng giờ hình 2; Chào hỏi tranh đôi và hình 1–3; 5S hình 3).

- **Bàn tay mới cho mọi hình**: hàm `hand()` vẽ lòng bàn tay bo tròn xoay theo cẳng tay, có ngón cái, viền mảnh hơn; `arm()` dùng chung. Tay mọc từ vai (thấp hơn đỉnh thân 4px) thay vì đỉnh thân. Áp dụng tự động cho cả 14 thói quen.
  - Đúng giờ bước 2: vẽ lại dáng ngồi nhìn thẳng, hai tay vươn lên.
  - Chào hỏi bước 1, 3: tay vẫy chào; bước 2 và tranh đôi: tay buông tự nhiên.
- Đợt 4: **memo, xinloi, viecko** (giữ hình cũ memo, sorry). Dám thử việc khó có hình trọng tâm "3 vùng: An toàn / Vừa sức / Quá sức".
- Đủ 14/14 thói quen có tranh đôi, 3 khung bước, cặp Nên/Tránh, Shin mách nhỏ; 3 bài Tìm điểm (Ngủ, Ăn uống, 5S); 2 hình động (squat, vòng thở).
- APP_VER và cache: M.Claude.3.3.25. Dữ liệu không đổi.

## M.Claude.3.3.24 — 14/11/2026 — "Cách làm" bằng hình, đợt 3 (chờ người dùng duyệt)

Người dùng duyệt đợt 2, nhắc: lời thoại (bóng chữ) không được đè lên nhân vật; đồng ý thay bài dọn bàn 30 giây của 5S.

- Đợt 3 trong `scripts/how-visual.js`: **5s, som, chao**.
  - **Giữ hình cũ**: `whyHTML`/`stepsHTML` giờ tự chèn `x.ill[0]` (Vì sao) và `x.ill[1]` (Các bước) bằng `illSVG` gốc — Chào hỏi giữ "nói trước, cúi sau" và "3 mức cúi"; 5S giữ "bàn trước/sau" và "xếp giày"; Đúng giờ giữ "thước 7:45–8:00".
  - 5S: Thực tập `tidy` (dọn bàn 30 giây) thay bằng `spot` phòng ký túc xá buổi sáng (giày ở cửa, chăn chưa gấp, rác đầy; 3 chỗ ổn).
  - Hàm mới `bowSide()` (dáng cúi chào nhìn ngang), đồ vật: giày, thùng rác, kệ có nhãn, cửa, bảng treo dụng cụ.
- Rà lại lời thoại đợt 1–2: dời bóng chữ ở Báo cáo (bước 1, bước 3) và Giúp đỡ (bước 3, cặp Nên/Tránh) để không chạm đầu nhân vật; dời Shin ở Giúp đỡ bước 2.
- APP_VER và cache: M.Claude.3.3.24. Dữ liệu không đổi; bài 5S vẫn ghi S.prDone như cũ.

Còn lại (đợt 4): memo, xinloi, viecko.

## M.Claude.3.3.23 — 14/11/2026 — "Cách làm" bằng hình, đợt 2 (chờ người dùng duyệt)

Người dùng duyệt đợt 1 ("rất ổn, tiếp tục hướng như thế") và chốt thêm: cân bằng nhân vật nam/nữ; nhãn tranh đôi mặc định **Ở TRƯỜNG / Ở NHẬT**, dùng **BÂY GIỜ / SANG NHẬT** khi bối cảnh là đời sống ngoài trường; thêm bài "Tìm điểm chưa ổn" cho Ăn uống (và 5S ở đợt sau).

- Đợt 2 trong `scripts/how-visual.js`: **anuong, camxuc, giup, 5phut** — tranh đôi, 3 khung bước, cặp Nên/Tránh, Shin mách nhỏ.
  - Ăn uống: Thực tập đổi sang `spot` (bàn ăn trưa: 3 món nên thay, 3 chỗ ổn), thay bài chọn chữ cũ.
  - Cảm xúc: bước 2 có hình động vòng thở 8 giây (dừng khi giảm chuyển động).
- `duo()` nhận tham số nhãn; Báo cáo, Cảm xúc, Giúp đỡ, 05 phút dùng Ở TRƯỜNG/Ở NHẬT; Vận động, Ngủ, Chi tiêu, Ăn uống dùng BÂY GIỜ/SANG NHẬT.
- Cân bằng nam/nữ ở đợt 1: Vận động (tranh đôi, cặp hình), Ngủ (tranh đôi, cặp hình), Chi tiêu (tranh đôi), Báo cáo (bước 3, người làm ở Nhật) dùng nhân vật nữ.
- `head()` thêm tùy chọn `blush`, `mad` (mặt đỏ, nhíu mày) cho Cảm xúc.
- APP_VER và cache: M.Claude.3.3.23.
- Dữ liệu: không đổi khóa lưu, schema, cách tính tiến độ/XP. Bài Thực tập Ăn uống đổi dạng nhưng vẫn ghi S.prDone như cũ.

Còn lại (đợt 3–4): chao, som, 5s, memo, xinloi, viecko — giữ 9 hình cũ, bổ sung khung bước, tranh đôi, cặp Nên/Tránh; bài Tìm điểm cho 5S (phòng KTX).

## M.Claude.3.3.22 — 14/11/2026 — "Cách làm" bằng hình, đợt 1 (chờ người dùng duyệt)

Yêu cầu: mọi thói quen có ít nhất 2–3 hình trong "Cách làm", đồng bộ nét với hình gốc (chào hỏi, memo, 5S). Người dùng chốt PA2 "Bước bằng hình", nhân vật kết hợp (người làm động tác, Shin nhắc mẹo), duyệt cả 4 ý A–D, tên bản M.Claude.3.3.22. Lý do bỏ bản thử M3.3.21: vẽ chưa đẹp, không đồng bộ với hình sẵn có — bản này vẽ lại từ đầu theo đúng nét `person()`/`illSVG()` trong core.js.

- **Mới `scripts/how-visual.js`** (nạp sau design-system.js, trước boot.js): bộ nét vẽ chung (dáng người nhiều tư thế, đồ vật), bọc `openHow` để thay 3 thẻ của 4 thói quen đợt 1:
  - Vì sao: tranh đôi "BÂY GIỜ ↔ SANG NHẬT" (ý A), hai ô chữ giữ nguyên nội dung, xếp lại thứ tự Với bạn → Ở Nhật cho khớp tranh.
  - Các bước: mỗi bước một khung tranh phía trên chữ; Vận động có hình động squat 3 dáng (ý C, dừng khi bật giảm chuyển động); hộp "Shin mách nhỏ" (ý D) cuối thẻ; Shin xuất hiện trong một vài khung.
  - Ghi nhớ: cặp hình Nên ✓ / Tránh ✗ trên danh sách chữ.
  - Thực tập kiểu mới `type:'spot'` "Tìm điểm chưa ổn" (ý B), dùng cho **Ngủ** (thay bài chọn chữ cũ): phòng lúc 22:30, 3 chỗ chưa ổn + 2 chỗ ổn (chạm vào chỉ hiện ghi chú, không trừ điểm). Bọc `prDraw`/`prAct`; hoàn thành gọi `prWin` như cũ.
- Đợt 1: **vandong, ngu, chitieu, horenso** (4 thói quen chưa có hình). 10 thói quen còn lại hiển thị như M3.3.20.
- `design-system.css`: thêm SECTION how-visual cuối tệp (bỏ giới hạn cao 180px cho hình mới, khung bước, hộp Shin, hình động, Tìm điểm).
- `scripts/core.js`: chỉ đổi APP_VER thành M.Claude.3.3.22. `index.html`, `habit-game.html`, `sw.js`: cache M.Claude.3.3.22, thêm how-visual.js vào CORE offline.
- Chữ mới (cần người dùng duyệt): nhãn trong hình, chú thích, 4 câu "Shin mách nhỏ", đề và phản hồi bài Tìm điểm. Số tiền/giờ trong hình là ví dụ, có nhãn "Ví dụ".
- Dữ liệu: không đổi khóa lưu, schema, cách tính tiến độ/XP.

Kiểm tra thực sự đã chạy: xem VALIDATION.json. Chưa thử WebKit/Safari và điện thoại thật.

**Việc tiếp theo:** người dùng duyệt đợt 1 → sửa theo góp ý → đợt 2–4 cho 10 thói quen còn lại (giữ 9 hình cũ, bổ sung khung bước, tranh đôi, cặp Nên/Tránh; cân nhắc thêm bài Tìm điểm cho 5S phòng KTX, Ăn uống khay cơm).

## M3.3.20-5S.2 — 14/11/2026 — bản chốt sau duyệt hình

Người dùng duyệt đủ 7 hình vẽ lại, chốt 6A và 7B, yêu cầu áp dụng trên M3.3.20–5S và đóng gói kèm tiến độ để chuyển hội thoại/công cụ AI. Bản thử “Cách làm bằng hình” M3.3.21-5S-preview được tạm bỏ, không nhập vào bản này.

- `design-system.js`: thay đúng 7 SVG trong SHIN_BACK_ART: som, 5s, chitieu, vandong, viecko, horenso (6A — cầu đá trong sương sớm), giup (7B — hoa và cánh bướm). Giữ 7 SVG còn lại; thêm bảng viewBox để giữ tỷ lệ hình mới và tiền tố ID gradient theo thói quen. SVG nằm hoàn toàn nội tuyến, không cần tải ảnh hay thư viện mới.
- `index.html`, `habit-game.html`, `sw.js`: đồng bộ cache M3.3.20-5S.2; sửa chú thích phiên bản đầu sw.js. APP_VER vẫn M3.3.20.
- `HANDOFF.md` mới: bản gốc chính thức, tiến độ, các phương án đã chốt/tạm dừng, yêu cầu cho AI tiếp theo, nơi sửa, bảo toàn dữ liệu, cách đóng gói và câu nhắn gửi kèm ZIP.
- `README.md`, `AGENTS.md`, `CLAUDE.md`, `AI_CONTEXT.md`, `source-map.json`, `VALIDATION.json`: cập nhật mốc cuối, nguồn hình và kiểm tra thực sự của bản 5S.2.
- Không đổi các tệp scripts/*.js, styles/*.css, design-system.css, boot.js, manifest, game hay các tài nguyên khác. Không đổi câu thành ngữ, phiên âm, nghĩa, cách tính tiến độ, khóa dữ liệu, schema, mặt trước hoặc xử lý lật thẻ.
- Gói hoàn chỉnh 52 tệp, index.html ở gốc ZIP; không kèm bản thử, công cụ xem mẫu, node_modules hay dữ liệu học viên.

Kết quả kiểm tra bản này nằm trong VALIDATION.json. Bản gốc M3.3.20–5S được giữ riêng. Không có hạng mục đã duyệt còn chờ thực hiện trong phạm vi phiên; bước tiếp theo là dùng bản chốt này cho yêu cầu mới và kiểm tra thiết bị thật sau triển khai nếu cần.

## M3.3.20-5S.1 — 14/11/2026

Yêu cầu đã duyệt: áp dụng mặt sau xanh đậm và minh họa trên 1/4 phía trên cho cả 14 thẻ; sửa lật thẻ trên bản 5S, giữ gói dưới 100 tệp.

- design-system.js/.css: 14 hình vector nội tuyến, màu #173F79, chữ xanh trắng, giữ nguyên câu Nhật/phiên âm/nghĩa/nội dung.
- scripts/habits.js: dựng hai mặt trong cùng khung thường trú.
- scripts/interaction.js: xoay một turner 360 ms; không dựng lại popup ở cuối; chặn lật chồng và hỗ trợ giảm chuyển động. Bỏ các hiệu ứng ghost/press-tilt cũ không còn dùng.
- scripts/extensions.js: hai mặt cùng kích thước, nhớ cuộn theo mặt; mặt sau cuộn vùng chữ riêng.
- core/index/habit-game/sw: phiên bản chức năng M3.3.20, cache M3.3.20-5S.1. Khóa dữ liệu và cách tính ngày/cấp/XP giữ nguyên.
- Gói vẫn 51 tệp, gồm đầy đủ hướng dẫn bàn giao.

Kiểm tra thực tế đã chạy và giới hạn nằm trong VALIDATION.json. Không đồng nhất kiểm tra Chrome/WebKit mô phỏng với thử trên điện thoại thật.

## M3.3.19-5S.1 — 14/11/2026

Mục đích: dọn mã có kiểm chứng và giảm số tệp để dễ tải GitHub, dễ chuyển công cụ AI. Giữ chức năng M3.3.19.

- Giảm gói 79 tệp còn **51 tệp**, đã tính cả hướng dẫn và công cụ kiểm tra.
- Tổ chức các tệp JS/CSS thành scripts/ và styles/, có ranh giới SECTION và source-map.json. Đây là nguồn chỉnh sửa trực tiếp, không có bản nguồn trùng khác hay bước biên dịch.
- Bỏ ba hàm giao diện nền drawHow, drawLesson, drawNote29 đã được thay hoàn toàn; bỏ một lệnh APP_VER trùng; bỏ 16 quy tắc CSS cho các thanh tiến độ không còn phát sinh. Danh sách chi tiết trong source-map.json.
- Giữ thứ tự classic scripts và cascade. Cập nhật đường dẫn font CSS, danh sách offline và mã cache 5S.1. Không đổi khóa dữ liệu hay quy tắc tiến độ/XP.
- Thêm AGENTS.md, CLAUDE.md, AI_CONTEXT.md, VALIDATION.json và tools/verify.mjs để bàn giao.

Kiểm chứng: 72/72 kiểm tra hồi quy; 170/170 lượt đối chiếu giao diện/hàm trên Chrome và WebKit; 372 trạng thái bố cục Chrome và 171 trạng thái bổ sung WebKit; 6 kiểm tra offline tại gốc và 6 tại đường dẫn con như GitHub Pages. Các bộ kiểm tra này không ghi nhận lỗi JavaScript. Chưa thử thiết bị điện thoại thật. Chi tiết phạm vi trong VALIDATION.json.

Không tuyên bố đã loại hết mọi đoạn mã cũ: các hàm bọc và CSS nền còn phụ thuộc nhau được giữ lại. Bước tiếp theo khi có nhu cầu là làm phẳng từng luồng riêng, đối chiếu trước/sau cho luồng đó; không xóa hàng loạt theo tên hoặc lịch sử phiên bản.

Sau lần chỉnh sửa tiếp theo, thêm mục mới ghi rõ yêu cầu, tệp đã đổi, dữ liệu bị ảnh hưởng hay không, kiểm tra thực sự đã chạy và việc còn lại. Không sửa lịch sử này thành kết quả chưa được kiểm chứng.
