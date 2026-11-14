# Bàn giao Shin routine cho công cụ AI tiếp theo

## App này là gì?
Ứng dụng web/PWA tiếng Việt cho học viên rèn luyện thói quen nhỏ. Chạy tĩnh trên GitHub Pages; không có máy chủ dữ liệu, tài khoản hay quy trình biên dịch. Có 14 thói quen, bốn trang Hôm nay / Tuần / Hành trình / Thư viện; nhật ký, check-in, thẻ hai mặt, mục tiêu tuần, cấp thẻ/XP, cây thành tựu, thư, 5 bài học, Pomodoro, tập thở và game.

Dữ liệu nằm trên thiết bị/trình duyệt. Mã lớp Demo-KZ dùng dữ liệu minh họa. Khác địa chỉ web có thể khác vùng dữ liệu. Đừng suy luận rằng dữ liệu đã mất chỉ vì chuyển sang địa chỉ xem thử khác.

## Mốc hiện tại
- Giao diện/chức năng: M3.3.20.
- Gói bảo trì/cache: **M3.3.20-5S.2 — bản chốt**, ngày 14/11/2026; 52 tệp.
- Gốc trực tiếp của lần này: M3.3.20-5S (cache 5S.1). Gốc lịch sử của lần dọn 5S là M3.3.19 GitHub 79 tệp.
- Đã hoàn thành yêu cầu cuối: áp dụng 7 hình vẽ lại đã duyệt; 6 chọn **6A cầu đá trong sương sớm**, 7 chọn **7B hoa và cánh bướm**. Danh sách đầy đủ và hướng dẫn phiên sau ở HANDOFF.md.
- **Không dùng M3.3.21-5S-preview làm gốc.** Người dùng đã tạm bỏ bản thử minh họa “Cách làm” của Quan sát–Memo, 5S và Lắng nghe–Sửa sai; không đưa lại vào app khi chưa có yêu cầu mới.
- Yêu cầu 5S: dọn an toàn, ít tệp hơn, dễ bàn giao AI; giữ giao diện, nội dung, dữ liệu và cách tính hiện có.
- Hệ chữ chính: tiêu đề trang 22, popup 20, tiêu đề mục 18, nội dung 16, nhãn 14, chú thích 12 px; nội dung chính trên thẻ 18 px. Bộ M3.3.19 đã bỏ cơ chế đo rồi tăng/giảm từng chữ bằng JavaScript.
- Các luồng nhiều bước dùng shinFlowProgress: thanh 4px, tên bước, Bước x/y. Đây không phải cách tính ngày rèn.

## Bản đồ nơi sửa
| Tệp | Trách nhiệm |
| --- | --- |
| index.html | Điểm vào; thứ tự CSS và classic script |
| scripts/core.js | Thư/tem nền, nội dung nền và phần lõi: trạng thái, lưu/khôi phục, tính tiến độ, sự kiện chính |
| scripts/interface.js | Khung M3, popup, Cách làm, bài học, sổ tay, focus; tương thích dữ liệu |
| scripts/habits.js | Luồng thói quen, mục tiêu, hành trình/cây, mẫu công thức, hai mặt thẻ |
| scripts/interaction.js | Điều hướng, cử chỉ, check-in và thư viện/nhìn lại |
| scripts/extensions.js | Pomodoro, nối game, lịch sử Back/cuộn; danh mục 14 thói quen hiện tại; các tinh chỉnh; tập thở |
| design-system.js / .css | Thành phần và chữ dùng chung; lời chào ngắn, header, tiến độ bước, responsive |
| styles/base.css | Font cục bộ và nền giao diện cũ vẫn được sử dụng |
| styles/components.css | Thành phần M3 nền và bố cục chung |
| styles/habits.css | Thói quen, thẻ, hành trình, check-in, thư viện, cử chỉ |
| styles/extensions.css | Bố cục tinh chỉnh và công cụ thở |
| boot.js | Chỉ khởi động sau khi các phần mở rộng đã đăng ký |
| habit-game.html, assets/game/, design-game.css | Tài liệu iframe game riêng; không cộng tiến độ rèn khi chơi |
| sw.js, manifest.webmanifest | Cache offline và cài PWA |

Trong các tệp đã gom, tìm `SECTION: tên-tệp-cũ` để đi đúng vị trí. source-map.json ghi đầy đủ đường chuyển tệp. Nội dung hiện hành 14 thói quen nằm ở SECTION curriculum14.js; không lấy danh mục nền cũ trong core.js làm chuẩn duy nhất.

## Phụ thuộc quan trọng
App dùng global và các hàm bọc: phần sau có thể lưu hàm trước rồi gọi lại nó. Giữ thứ tự core → interface → habits → interaction → extensions → design-system → boot. Đây vẫn là kiến trúc mở rộng theo lớp, chưa chuyển thành module độc lập. Đừng xóa một hàm chỉ vì thấy nó bị gán lại.

Các vùng chưa dọn triệt để: các lớp CSS nền và nhiều hàm bọc còn phụ thuộc nhau; một số định nghĩa nội dung cũ còn làm nền cho khôi phục/bài học hoặc được biến đổi thành danh mục mới. Không tuyên bố rằng mã cũ đã được loại hết. Muốn làm phẳng từng luồng, cần truy vết hàm bọc và đối chiếu đầy đủ riêng cho luồng đó.

## Khi nhận yêu cầu mới
1. Đọc HANDOFF.md để biết việc đã chốt và phạm vi đang tạm dừng. Hiện không có hạng mục đã duyệt nào còn chờ thực hiện. Nhận yêu cầu mới rồi xác định người dùng muốn đổi giao diện, nội dung đào tạo, quy tắc tiến độ hay cấu trúc dữ liệu.
2. Đọc AGENTS.md và phần mã tương ứng; sửa trên bản sao.
3. Ưu tiên sửa nơi chịu trách nhiệm, không tạo thêm một tệp vá cho từng yêu cầu nhỏ.
4. Kiểm tra dữ liệu cũ, mobile và offline; cập nhật ghi chú bàn giao. Nếu công cụ không kiểm tra được Safari/điện thoại thật, nói rõ.

## Tình trạng kiểm tra
Xem CHANGELOG.md và VALIDATION.json trong chính gói này để biết các kiểm tra đã thực hiện, không suy diễn từ hướng dẫn kiểm tra thành kết quả đã đạt.

## Thẻ — thay đổi đã duyệt ở M3.3.20
Mặt sau 14 thẻ dùng xanh #173F79 và chữ xanh trắng theo mẫu duyệt; 1/4 phía trên là minh họa riêng. Renderer và bộ hình nằm trong design-system.js; bố cục trong design-system.css. scripts/habits.js gọi shinCardFaces, scripts/interaction.js xử lý xoay ổn định, scripts/extensions.js đo khung và nhớ cuộn. Hai mặt có DOM thường trú; mặt ẩn inert/aria-hidden; không chọn phần tử .flow-paper đầu tiên để suy ra mặt hiện tại. Mặt sau cuộn ở .shin-back-copy. Thẻ tự tạo tiếp tục có mặt sau riêng, chưa tự tạo minh họa cho nội dung tùy ý.

Ở bản chốt 5S.2, chỉ thay 7 mục som, 5s, chitieu, vandong, viecko, horenso, giup trong SHIN_BACK_ART và thêm SHIN_BACK_ART_VIEWBOX để giữ tỷ lệ SVG. Bảy hình còn lại giữ nguyên. Không đổi CSS, nội dung câu Nhật, phiên âm, nghĩa, mặt trước, hiệu ứng lật hay các tệp scripts/*.js. Hình được lưu nội tuyến đầy đủ trong gói, không cần các thư mục xem mẫu ở phiên trước. Tên gradient có tiền tố riêng theo thói quen, tránh trùng ID.
