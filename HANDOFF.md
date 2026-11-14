# ĐỌC TRƯỚC — bàn giao Shin routine sau phiên 14/11/2026

## 1. Bản nào là bản đúng để làm tiếp?

**Dùng chính gói này: Shin routine M3.3.20–5S.2, bản chốt, 52 tệp.**

- Phiên bản chức năng `APP_VER`: **M3.3.20**.
- Phiên bản cache `sw.js VERSION` và các đường dẫn JS/CSS `?v=`: **M3.3.20-5S.2**.
- Gốc trực tiếp: M3.3.20–5S, cache 5S.1, bản có 14 hình vector riêng ở mặt sau và hiệu ứng lật thường trú.
- Lần này thay đúng 7 hình mặt sau đã được người dùng duyệt. Giữ 7 hình còn lại, nội dung, cách tính tiến độ và dữ liệu như bản gốc.
- **M3.3.21-5S-preview không phải bản mới nhất để tiếp tục.** Đó là thử nghiệm hình minh họa/tương tác trong “Cách làm” của Quan sát–Memo, 5S và Lắng nghe–Sửa sai. Người dùng đã tạm bỏ bản thử này và yêu cầu quay về M3.3.20–5S. Không tự đưa nó trở lại.
- Không cần truy cập hội thoại cũ hoặc các thư mục xem mẫu để chạy hay chỉnh app: mã nguồn và hình đã có đủ trong ZIP này.

## 2. Tiến độ và quyết định đã chốt

| Việc | Trạng thái |
| --- | --- |
| Dọn 5S, gom nguồn, giảm số tệp, hướng dẫn AI | Đã làm ở bản 5S trước; giữ trong gói này |
| Mặt sau xanh đậm, chữ xanh trắng, hình trên 1/4 thẻ | Đã áp dụng cho 14 thẻ |
| Lật mượt bằng hai mặt thường trú, nhớ cuộn riêng | Giữ nguyên triển khai M3.3.20 |
| Vẽ lại 7 hình chưa đạt | Đã duyệt đủ và áp dụng trong 5S.2 |
| Đưa hình vào “Cách làm” | Tạm dừng; không nằm trong gói này |
| Yêu cầu đã duyệt còn chờ lập trình | Không còn trong phạm vi phiên này |
| Kiểm tra | Xem kết quả thực sự trong VALIDATION.json; không coi hướng dẫn kiểm tra là kết quả đã chạy |

### Bộ 7 hình cuối cùng — không thay bằng các mẫu từng bị loại

| Số người dùng duyệt | Thẻ / ID trong mã | Hình đã chốt |
| --- | --- | --- |
| 1 | Đúng giờ, đúng hẹn / `som` | Bình minh qua cửa sổ, đồng hồ báo thức và cặp đã chuẩn bị |
| 2 | 5S / `5s` | Chim rõ đầu, mỏ và hai cánh cất lên trên mặt nước trong |
| 3 | Chi tiêu / `chitieu` | Ví tiền, đồng yên tròn rõ nét, chồng tiền và mầm cây |
| 4 | Vận động mỗi ngày / `vandong` | Tre vươn cao qua từng đốt nhỏ — 継続は力なり |
| 5 | Dám thử việc khó / `viecko` | Chim non tách vỏ trứng — 案ずるより産むが易し |
| **6A** | Báo cáo và xác nhận / `horenso` | **Cầu đá trong sương sớm**, phong cảnh suối và núi — 石橋を叩いて渡る |
| **7B** | Giúp đỡ / `giup` | **Hoa và cánh bướm**, đồi và nắng nhẹ — 情けは人の為ならず |

Người dùng thích nét vector đơn giản, nhẹ, dễ nhận ra; riêng 4–7 thích ẩn dụ theo câu thành ngữ Nhật, không có hình người. 6–7 đã chọn phong cảnh/thiên nhiên nên thơ; không dùng lại búa gõ cầu hoặc hai ngọn nến. Không cần xin duyệt lại bộ hình đã chốt khi chỉ bảo trì mã mà giữ nguyên hình.

## 3. Công cụ AI tiếp theo cần làm gì?

1. Đọc file này, README.md, AGENTS.md, AI_CONTEXT.md, CHANGELOG.md và VALIDATION.json. Nhận diện đây là **M3.3.20-5S.2**, không chọn bản thử 3.3.21 theo số phiên bản lớn hơn.
2. Tóm tắt ngắn bản hiện tại và nhận yêu cầu mới của người dùng. Không tự mở lại hạng mục “Cách làm bằng hình” hay tự mở rộng phạm vi.
3. Tạo bản sao/nhánh riêng trước khi sửa. Giữ gói chốt này để đối chiếu và quay lại.
4. Đọc đúng phần nguồn chịu trách nhiệm; sửa ở đó, tránh thêm lớp vá hoặc tệp mới cho từng chỉnh sửa nhỏ. Trước khi xóa mã, truy vết phụ thuộc thật.
5. Kiểm tra phù hợp với thay đổi trên điện thoại nhỏ, Chrome và WebKit; kiểm tra dữ liệu cũ, offline và đường dẫn con GitHub Pages. Chỉ ghi những bài kiểm tra đã chạy. Nói rõ nếu chưa thử Android/iPhone thật.
6. Cập nhật phiên bản cache khi thay tài nguyên; cập nhật các file bàn giao, tiến độ và kết quả kiểm tra. Trả **gói hoàn chỉnh dưới 100 tệp**, không chỉ tệp đã sửa. Không tự tải lên GitHub hoặc phát hành công khai khi chưa có yêu cầu.

Nếu việc tiếp theo chỉ là đăng bản đã chốt: dùng nguyên gói này, xác nhận đúng kho/địa chỉ triển khai theo yêu cầu mới, kiểm tra website sau cập nhật; không cần thiết kế lại các hình đã duyệt.

## 4. Những điểm phải giữ khi lập trình

### Nguồn và hình

- Đây là app HTML/CSS/JS chạy tĩnh, không cần build, không cần cài thư viện để chạy. `index.html` nằm ngay gốc gói; game là tài liệu riêng `habit-game.html`.
- Nguồn trực tiếp ở `scripts/`, `styles/`, `design-system.js`, `design-system.css`. Bảng chức năng chi tiết ở AI_CONTEXT.md; tên SECTION và source-map.json giúp tìm vị trí cũ.
- Classic scripts dùng global và bọc hàm theo thứ tự. Không đổi thứ tự tải, chuyển sang module hoặc xóa hàm bọc chỉ vì thấy tên bị gán lại.
- **Nguồn hình duy nhất để chỉnh: `SHIN_BACK_ART` trong `design-system.js`.** Cả 14 hình là SVG nội tuyến, dùng được offline; không phải tìm/tải hình bên ngoài. Không tạo một bộ nguồn hình thứ hai rồi quên đồng bộ.
- `SHIN_BACK_ART_VIEWBOX` ghi 480×220 cho 7 hình mới; 7 hình cũ dùng mặc định 340×150. Giữ tỷ lệ khi hiển thị. ID gradient được đặt tiền tố theo thói quen để không xung đột.
- Không xây lại popup/DOM thẻ khi lật xong. Giữ `shinCardFaces`, `touchFlipCard`, `shinActivePaper`, trạng thái inert/aria-hidden và cuộn riêng hai mặt.

### Dữ liệu và cách tính tiến độ

- Ba khóa lưu trữ phải giữ: `shin-curriculum16-v1-data`, `shin-curriculum16-v1-demo`, `shin-curriculum16-v1-mode`.
- Tiến độ bước giao diện không phải tiến độ rèn: thanh bước dùng `shinFlowProgress`; ngày rèn, mục tiêu tuần, cấp thẻ, phần trăm và XP có quy tắc riêng trong mã hiện hành. Không gộp hay thay cách tính để khớp một hình/nhãn.
- Không reset dữ liệu, tự bật Demo thay bài làm thật, hoặc đổi schema khi chỉ chỉnh giao diện. Nháp ghi chú/check-in khác với bản ghi đã lưu; không đổi thời điểm ghi nhận.
- Kiểm tra bằng dữ liệu tổng hợp/Demo trong trình duyệt riêng. Gói bàn giao không chứa bài làm học viên hoặc khóa bí mật.
- Bài làm nằm trong trình duyệt theo địa chỉ web. Khi đổi thiết bị, tên miền, đường dẫn hoặc xem ở localhost, cần xuất/khôi phục bản sao để chuyển dữ liệu; dữ liệu không tự đi theo ZIP mã nguồn.

### Điện thoại và thiết kế

- Ưu tiên Android/iPhone, rộng 320–430 px; thử chiều cao thấp, chữ dài, bàn phím, phóng to và giảm chuyển động khi phù hợp.
- Giữ hệ chữ và thành phần dùng chung; không đưa lại JavaScript đo rồi co/giãn từng chữ. Nhãn T2–CN và mục tiêu 1–7 cần nằm gọn một hàng; popup nằm trong màn hình.
- Tiếp tục theo Material 3 với bảng màu đã dùng. Không tuyên bố toàn app đạt mọi tiêu chuẩn Material 3 hay không còn mọi lỗi chỉ dựa vào một lần kiểm tra.
- Các lớp CSS và hàm bọc cũ còn có phụ thuộc. Lần 5S đã giảm tệp có kiểm chứng, chưa viết lại toàn bộ kiến trúc. Nếu cần dọn tiếp, làm từng luồng và so sánh trước/sau.

## 5. Bàn giao, tải GitHub và kiểm tra lại

- ZIP là **52 tệp** gồm app, tài nguyên, giấy phép, hướng dẫn và công cụ kiểm tra. Giải nén sẽ thấy `index.html` ngay gốc; tải toàn bộ nội dung đã giải nén và giữ cấu trúc thư mục. Không tải riêng ZIP để thay website, không bỏ font/âm thanh/game vì tưởng là tệp thừa.
- Chạy `node tools/verify.mjs` để kiểm tra cấu trúc, cú pháp và cache. Lệnh này không thay thế thử giao diện.
- Xem local: chạy `python3 -m http.server 8080 --bind 127.0.0.1` trong thư mục gói rồi mở `http://127.0.0.1:8080/`. Điện thoại cần địa chỉ HTTPS có thể truy cập; localhost trên máy không phải link điện thoại.
- Sau triển khai, mở lại khi có mạng và nhận bản cập nhật trong app nếu được nhắc; xác nhận hình 6A/7B, bản ghi cũ và offline. Không hướng dẫn xóa dữ liệu trình duyệt để ép cập nhật.
- Các kiểm tra tự động sử dụng trình duyệt mô phỏng, không thay cho kiểm tra độ mượt, bàn phím và giọng đọc trên điện thoại thật. VALIDATION.json phân biệt kết quả hiện tại và giới hạn.

## 6. Câu nhắn có thể gửi kèm ZIP ở phiên sau

> Đây là bản Shin routine M3.3.20–5S.2 đã chốt cuối phiên, gồm 52 tệp. Hãy đọc HANDOFF.md, README.md, AGENTS.md, AI_CONTEXT.md, CHANGELOG.md và VALIDATION.json trước khi làm. Dùng chính gói này làm gốc, sửa trên bản sao. Bộ hình mặt sau đã duyệt đủ, cuối cùng chọn 6A và 7B; không dùng lại bản thử M3.3.21 “Cách làm bằng hình”. Giữ dữ liệu và cách tính tiến độ, ưu tiên giao diện điện thoại. Sau yêu cầu mới của tôi, hãy kiểm tra, cập nhật đầy đủ tài liệu bàn giao và gửi lại gói hoàn chỉnh dưới 100 tệp.
