# Lịch sử và bàn giao

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
