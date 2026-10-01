# Theme 1.2.20 — đối chiếu Vercel, 01/10/2026

ZIP cài đặt: `speego-logistics-theme-v1.2.20.zip`.
Bản cùng nội dung: `speego-logistics-vercel-parity.zip`.

## Đã sửa

- Khôi phục video bản đồ/logo cạnh form tư vấn, 4 ô nhập, 2 dropdown và form trong hero. Khôi phục ô nhập tracking bị WordPress loại mất.
- Đồng bộ typography form với Vercel, giữ video/ảnh trong theme.
- Sửa đường dẫn ảnh, thẻ đoạn văn và xuống dòng thừa của widget Elementor cũ trên trang Tìm nguồn hàng; khôi phục 5 icon và ngắt dòng tiêu đề. Giữ các nội dung chữ đã chỉnh sửa.
- Bỏ khung Elementor 1.140px bọc ngoài trang Tìm nguồn hàng để bố cục dùng đúng chiều rộng Vercel. Sửa header/menu mobile, FAQ và chuyển ảnh.
- Trang Liên hệ VI/EN/ES chỉ hiển thị khối tư vấn như Vercel, thay vì cả trang chủ.
- Chuyển form của các chuyên mục kiến thức xuống cuối trang theo bản build Vercel; không thay đổi ba trang Knowledge Hub Elementor.
- Không ghi đè database, dữ liệu Elementor hoặc thay đổi `page.php`, CSS Knowledge và script CTA của đồng nghiệp.

## Kiểm tra đã chạy

- `npm.cmd run build`: đạt, tạo 68 route SEO.
- PHP lint: đạt cho 12 file PHP của theme; JavaScript `wp-sourcing.js`: đạt.
- `scratch/test_parity_1220.php`: đạt với HTML thực đã lấy từ staging; kiểm tra form/video/icon/ảnh, giữ chữ đã chỉnh sửa, chạy sửa hai lần không làm đổi kết quả, và không sửa widget Knowledge.
- Browser: 57 URL desktop local trả HTTP 200, đọc được trang Vercel tương ứng; không phát hiện tràn ngang. Đây là rà cấu trúc/nội dung/tài nguyên, không phải chứng nhận mọi pixel giống nhau.
- 15 trường hợp mobile local: không tràn ngang. Các request Vercel mobile trong lượt rà bị HTTP 403 / Security Checkpoint, nên không tính chúng là đối chiếu mobile đạt.
- Browser trên HTML staging được áp dụng bản sửa: form/video, lưới 2 cột, 5 icon, ảnh hero, FAQ, gallery và menu mobile đạt ở 1280px và 375px. Kiểm tra thêm home/sourcing ở tablet 768px.
- 21 route chuyên mục/Liên hệ kiểm tra lại sau sửa: đạt; ba video trang Liên hệ tải từ theme và phát được.
- VI/EN/ES: form có tiêu đề đúng ngôn ngữ và 5 lựa chọn tuyến vận chuyển.
- ZIP: 192 file, CRC hợp lệ; so sánh byte từng file ZIP với thư mục theme; không thiếu file nào so với ZIP 1.2.19. SHA256 nằm trong file `.zip.sha256` đi kèm.

Ảnh và kết quả máy đọc: `scratch/review-1.2.20/`.

## Giới hạn và việc cần kiểm tra sau cài

- Chưa cài theme 1.2.20 lên staging. Không khẳng định staging đã hết lỗi hoặc giống Vercel 100% trước khi cài và xóa cache.
- Form trang chủ chưa có endpoint nhận đăng ký trong code hiện tại. Bản sửa báo rõ chưa kết nối, giữ nội dung đã điền, không báo gửi thành công giả. Form tư vấn soạn email vẫn mở trình soạn email; kiểm tra không gửi lead thật.
- Chưa kiểm tra phiên quản trị “Edit with Elementor” trên staging. Các hook mới được giới hạn theo route/widget và không thay đổi nội dung ba Knowledge Hub.
- Bài smoke test cũ `scratch/test_wp_render.php` có ba assertion nhãn CTA Knowledge cũ không còn khớp nội dung hiện tại; không tính bài đó là đạt. Các kiểm tra renderer/browser nêu trên là kết quả kiểm tra dùng cho bản này.
- Ảnh `src=""` trong lightbox About đang đóng được công cụ rà tài nguyên ghi nhận; không phải ảnh nội dung đang hiển thị.

## Cài đặt

1. WordPress → Appearance → Themes → Add New → Upload Theme.
2. Chọn `speego-logistics-theme-v1.2.20.zip`, thay thế theme SpeeGo Logistics hiện tại.
3. Xóa cache WordPress.com.
4. Mở cửa sổ riêng tư kiểm tra trang chủ, Tìm nguồn hàng, Liên hệ ở VI/EN/ES; kiểm tra ba Knowledge Hub vẫn mở được bằng Elementor.

Đóng lại đúng thư mục theme đã kiểm tra: `python package_verified_theme.py`.
Không dùng script đóng gói cũ để chép ngược `explore/` đè lên các file theme vừa sửa.
