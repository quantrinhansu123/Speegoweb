# Đăng bài WordPress nhiều ngôn ngữ

Các bài mẫu trong Knowledge là **Page** có URL cố định và `hreflang` từ `route-map.json`.
Quy trình dưới đây áp dụng cho bài mới tạo tại **Bài viết → Viết bài mới (Posts)**.

1. Tạo một bài riêng cho mỗi ngôn ngữ cần xuất bản. Đặt tiêu đề, nội dung và slug phù hợp với ngôn ngữ đó.
2. Trong hộp **Ngôn ngữ & bản dịch SpeeGo**, chọn `Tiếng Việt`, `English` hoặc `Español`.
3. Nhập **cùng một Mã nhóm bản dịch** cho các bản cùng chủ đề, ví dụ `huong-dan-gui-hang`.
4. Xuất bản từng bài. Nhóm chỉ được phát `hreflang` khi có ít nhất hai bản đã xuất bản và không có hai bài cùng ngôn ngữ.
5. Mở nguồn HTML của từng URL để kiểm tra `canonical` trỏ về chính URL đó và các thẻ `hreflang` trỏ qua lại giữa những bản đã xuất bản.

Ví dụ: bài VI, EN, ES có cùng mã `huong-dan-gui-hang` sẽ tự phát các thẻ `hreflang="vi"`, `hreflang="en"`, `hreflang="es"` và `x-default` (trỏ về EN). Nếu mới có một bản, theme chưa phát `hreflang` để tránh trỏ đến trang chưa tồn tại.

URL bài mới tuân theo cấu hình **Cài đặt → Đường dẫn tĩnh** của WordPress; hộp ngôn ngữ không tự thêm `/vi/`, `/en/` hay `/es/` vào URL. Các bài đã xuất bản được thêm vào `/sitemap.xml`. Cần đặt liên kết nội bộ từ Knowledge hoặc trang liên quan vì danh sách Knowledge tĩnh hiện không tự thêm bài mới.

Nếu website cài plugin đa ngôn ngữ có chức năng phát `hreflang`, chỉ để một hệ thống phát thẻ cho cùng bài để tránh trùng lặp.
