# Shin routine M3.3.20 — bản 5S.1

Bản dọn và tổ chức lại mã nguồn dựa trên gói M3.3.19 GitHub 79 tệp. Giữ nội dung và cách tính tiến độ; bổ sung mặt sau minh họa đã duyệt và sửa hiệu ứng lật. Các tệp trong scripts/ và styles/ là mã nguồn chỉnh sửa trực tiếp; không cần biên dịch.

## Đưa lên GitHub
Giải nén rồi tải toàn bộ nội dung **bên trong thư mục** lên nơi có index.html. Giữ cấu trúc scripts/, styles/ và assets/. Không tải nguyên ZIP để thay ứng dụng. Giữ cùng địa chỉ web để tiếp tục đọc dữ liệu học viên trên thiết bị đó.

Khi cập nhật từ gói 79 tệp, các tệp JS/CSS gốc ở cấp ngoài đã được chuyển vào scripts/ và styles/. Nên đồng bộ toàn bộ bộ tệp mới; source-map.json liệt kê các tên cũ để nhận diện. Các tệp cũ còn trên GitHub không được index/sw mới tải nữa, nhưng có thể xóa sau khi kiểm tra bản cập nhật và giữ một bản sao để quay lại.

## Chuyển sang ChatGPT, Claude hoặc công cụ AI khác
Gửi **toàn bộ ZIP mới nhất** rồi yêu cầu công cụ đọc README.md, AGENTS.md và AI_CONTEXT.md trước khi sửa. CLAUDE.md trỏ về cùng hướng dẫn chung. CHANGELOG.md và VALIDATION.json ghi mốc đã làm và kiểm tra. Sau mỗi lần sửa, yêu cầu cập nhật các tài liệu này và trả lại gói hoàn chỉnh; không chỉ gửi một tệp đã sửa.

## Xem trên máy và kiểm tra cấu trúc
Nếu máy có Python: `python3 -m http.server 8080 --bind 127.0.0.1` trong thư mục này, rồi mở http://127.0.0.1:8080/. Địa chỉ này chỉ hoạt động trên máy đang chạy nó. Để thử điện thoại cần một địa chỉ website HTTPS.

Nếu máy có Node.js: chạy `node tools/verify.mjs`. Lệnh chỉ kiểm tra cấu trúc/tài nguyên; không thay cho thử giao diện hay thao tác. Demo-KZ là mã lớp xem dữ liệu minh họa.

## Giới hạn của lần 5S này
Đã bỏ một số phần thay thế chắc chắn không còn dùng và gom tệp theo nhóm chức năng. Những lớp mã còn phụ thuộc nhau được giữ lại và ghi rõ để tránh xóa nhầm. Đây là dọn có kiểm chứng, chưa phải viết lại toàn bộ kiến trúc hay bảo đảm không bao giờ có lỗi.

## M3.3.20: mặt sau và lật thẻ
14 thẻ có minh họa vector riêng và nền xanh đậm như check-in; chữ sáng. Khung giữ sẵn hai mặt để xoay 360 ms mà không dựng lại popup. Vùng đọc cuộn riêng; nút nghe tiếng Nhật và Senpai được giữ. Gói gồm 51 tệp, không thêm tệp ảnh ngoài.
