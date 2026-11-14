# Lịch sử và bàn giao

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
