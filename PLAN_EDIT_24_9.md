# Kế hoạch chỉnh sửa website — Edit 24.9

Kế hoạch này phân rã **toàn bộ checklist khách hàng** trong `Edit_24_9_Task_List.md` thành đầu việc có thể giao và nghiệm thu. Checklist gốc là tiêu chí yêu cầu; `rule.md` và `architecture.md` là quy tắc triển khai. Nội dung trong tài liệu khách hàng không tự động thay thế các quy tắc kiến trúc của repository.

## Trạng thái và cách dùng

- `[ ]` Chưa nghiệm thu. Không coi task là hoàn tất chỉ vì đã có markup hoặc CSS.
- `CẦN XÁC MINH` Đã thấy một phần implementation nhưng chưa chứng minh đủ yêu cầu/kiểm thử.
- `CHƯA THẤY` Chưa thấy bằng chứng phù hợp trong lần rà soát tĩnh ban đầu.
- `PHỤ THUỘC` Cần đầu vào bên ngoài (ví dụ ảnh khách đánh dấu) trước khi chốt đúng yêu cầu.
- Cập nhật checkbox, trạng thái, bằng chứng và liên kết commit sau khi task được kiểm tra.
- Trạng thái ban đầu dưới đây là rà soát mã tĩnh; chưa chạy website, build, kiểm thử trực quan hay Google URL Inspection.

### Bằng chứng hiện có trước khi triển khai

| Nhóm | Kết quả rà soát tĩnh ban đầu | Hướng xử lý trong kế hoạch |
|---|---|---|
| Global | Có shared header, SPA routes và generator SEO; URL generator hiện chưa khớp các public URL khách yêu cầu, còn thiếu một số trang/route và chưa xác nhận ẩn breadcrumb theo trang. | Task G xác minh/hợp nhất implementation, hoàn thiện route/path/metadata và kiểm tra bằng build + URL trực tiếp. |
| Sourcing | Có trang riêng, section và quick navigation; working tree lúc lập file sạch. Chưa có bằng chứng xác nhận cỡ chữ, thứ tự section và spacing theo ảnh khách. | Giữ phần đã có, chỉ chỉnh phần chưa đạt; ảnh đánh dấu là phụ thuộc cho spacing cụ thể. |
| Fulfillment | Có trang cùng một số thành phần Process/FAQ/testimonial. Chưa xác nhận slider, số lượng card, kích thước và section order đúng yêu cầu. | Task FUL đo/so sánh, hoàn thiện và kiểm tra trên các viewport. |
| Logistics | Có route/page và nội dung quy trình; chưa xác nhận slider, cân bằng cột/ảnh và thứ tự section. | Task LOG kiểm chứng từng tiêu chí và xin chỉ rõ section nếu tài liệu không định danh được. |
| Import & Export | Có trang tổng hợp; yêu cầu tách trang và placement/submit form chưa được xác nhận hoàn tất. | Task IE giữ trang tổng hợp và thêm hai trang con theo giả định đã chốt; kiểm tra integration form thật. |
| Knowledge / Blog | Có trang danh mục và bài viết đa ngôn ngữ; slug hiện chưa theo mẫu `/knownledge/...` của checklist. | Task KNO/POST chuẩn hóa route, mapping, metadata, nội dung tĩnh và redirect. |
| Final QA | Chưa có bằng chứng đã chạy visual/responsive/navigation/SEO QA cho yêu cầu Edit 24.9. | Chạy toàn bộ Task 8 và ghi link/ảnh/kết quả vào tracker. |

## Task 0 — Baseline, quy tắc và tài liệu tham chiếu

- [ ] **0.1 Chốt baseline trước mỗi đợt sửa.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra `git status`/diff và ghi các file đang thay đổi để không ghi đè công việc có sẵn. Lần tạo kế hoạch này working tree sạch; vẫn phải kiểm tra lại khi bắt đầu triển khai.
- [ ] **0.2 Xác định đúng kiến trúc cho từng hành vi.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng `explore/` làm kiến trúc đích; site legacy tại `themes.pixelwars.org/logistica/demo-01/` là nguồn tham chiếu cho nội dung/chức năng còn cần bảo toàn. Không giả định sửa `explore/` tự động đổi production root.
- [ ] **0.3 Đối chiếu nội dung trước khi di chuyển/thay layout.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. So sánh bản cũ và bản mới về nội dung kinh doanh, section, assets, CTA, form, routing, ngôn ngữ, animation và responsive; không xóa thông tin/chức năng quan trọng.
- [ ] **0.4 Chuẩn bị ảnh thiết kế và ảnh đánh dấu.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng ảnh khách cung cấp để đối chiếu. Đã tìm thấy `10-sourcing.png` trong Downloads; ảnh này không cho thấy rõ các mũi tên đỏ được checklist nhắc đến. **Phụ thuộc:** tìm đúng ảnh có mũi tên/khoanh đỏ; nếu không có thì yêu cầu khách cung cấp trước khi tự quyết vị trí spacing.
- [ ] **0.5 Duy trì một implementation dùng chung.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Header/footer, route, language mapping, CTA/form và các component dùng chung phải ở đúng nơi dùng chung; không tạo website hoặc bản trang trùng lặp ngoài ý muốn.

## Task 1 — Global: header, URL, SEO và breadcrumb

### 1A. Header / Navigation

- [ ] **G-HDR-01 Đồng bộ Header + Topbar.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng một thiết kế và hành vi thống nhất trên các trang thuộc kiến trúc đích; so sánh site legacy, homepage và `explore/` trước khi hợp nhất.
- [ ] **G-HDR-02 Chỉ dùng một Header chung.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Chuyển phần dùng chung vào `explore/partials/header.html`; đảm bảo trang và route không render hai header.
- [ ] **G-HDR-03 Lấy Header Homepage làm chuẩn.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Giữ nhận diện, topbar, CTA, language switcher và mobile behavior cần thiết.
- [ ] **G-NAV-01 Homepage.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu dẫn tới homepage đúng ngôn ngữ.
- [ ] **G-NAV-02 About.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Bổ sung route/link About; đích English là `/en/about-us`.
- [ ] **G-NAV-03 Sourcing.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu tới trang sourcing đúng ngôn ngữ.
- [ ] **G-NAV-04 Logistics.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu tới trang logistics/tuyến vận chuyển đúng ngôn ngữ.
- [ ] **G-NAV-05 Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu tới trang fulfillment đúng ngôn ngữ.
- [ ] **G-NAV-06 Import & Export.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu tới trang tổng hợp Import & Export.
- [ ] **G-NAV-07 Knowledge.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Menu tới landing Knowledge đúng slug công khai đã chốt.
- [ ] **G-HDR-04 Sticky Header.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng cùng ngưỡng, trạng thái và cách hoạt động như homepage; kiểm tra desktop/mobile và khi đổi route.

### 1B. URL Structure và route compatibility

- [ ] **G-URL-01 Homepage English `/en/`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo route trang chủ English có nội dung được render trực tiếp/crawl được.
- [ ] **G-URL-02 Homepage Vietnamese `/vi/`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo route trang chủ Vietnamese.
- [ ] **G-URL-03 Homepage Spanish `/es/`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo route trang chủ Spanish.
- [ ] **G-URL-04 Sourcing `/en/sourcing`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Route trực tiếp và route điều hướng đều tới đúng trang.
- [ ] **G-URL-05 Logistics `/en/logistics`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo landing/route chính cho Logistics.
- [ ] **G-URL-06 China → US/Australia/Canada `/en/logistics/china-to-us-ca-au`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đăng ký route và nội dung đúng tuyến.
- [ ] **G-URL-07 Vietnam → US/Australia/Canada `/en/logistics/vietnam-to-us-ca-au`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đăng ký route và nội dung đúng tuyến.
- [ ] **G-URL-08 Fulfillment `/en/fulfillment`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Route khớp URL công khai yêu cầu.
- [ ] **G-URL-09 Import & Export `/en/import-export`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Giữ làm landing/tổng hợp và không làm mất link cũ.
- [ ] **G-URL-10 About `/en/about-us`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Bổ sung nội dung/route; không để menu dẫn đến trang rỗng.
- [ ] **G-URL-11 Contact `/en/contact`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Bổ sung route contact, giữ form/integration hiện có.
- [ ] **G-URL-12 Knowledge `/en/knownledge`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng đúng slug khách ghi trong checklist; giữ route hash `/knowledge` làm tương thích nếu còn link nội bộ.
- [ ] **G-URL-13 Shipping Guides `/en/knownledge/shipping-guides`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo URL sạch và mapping tới đúng danh mục.
- [ ] **G-URL-14 Các danh mục Knowledge khác.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng cùng cấu trúc `/en/knownledge/{slug}`, chuẩn hóa slug và liên kết giữa các trang.
- [ ] **G-URL-15 Post `/en/chuyen-muc/tieu-de-bai-viet`.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Chuẩn hóa cấu trúc URL bài viết; mapping slug thực tế và xử lý URL cũ.
- [ ] **G-URL-16 Route hash hiện tại.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Duy trì tương thích cho link cũ, chuyển ngôn ngữ và điều hướng nội bộ trong khi URL công khai dùng path sạch.

### 1C. SEO / Technical

- [ ] **G-SEO-01 Hreflang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Khai báo alternate language cho các trang có bản dịch tương ứng; không trỏ sang trang sai nội dung.
- [ ] **G-SEO-02 Canonical.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mỗi URL công khai có canonical tự trỏ chính xác, không chứa hash route hoặc prefix sai.
- [ ] **G-SEO-03 Crawl/render nội dung.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Nội dung chính có mặt trong HTML tĩnh được sinh ra, không chỉ xuất hiện sau tương tác client-side.
- [ ] **G-SEO-04 Rà soát trang con.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra title, description, robots/indexing, canonical, hreflang, nội dung render và asset trên từng route.
- [ ] **G-SEO-05 Broken links/redirect.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra URL mới, URL cũ, redirect một bước, không loop và không trỏ nhầm.
- [ ] **G-SEO-06 Sitemap.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Sitemap liệt kê canonical path đúng và alternate language hợp lệ.
- [ ] **G-SEO-07 Robots.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Robots cho phép crawl nội dung cần index và khai báo sitemap đúng.

### 1D. Global Breadcrumb

- [ ] **G-BREAD-01 Sourcing.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Ẩn breadcrumb trên trang Sourcing.
- [ ] **G-BREAD-02 Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Ẩn breadcrumb trên trang Fulfillment.
- [ ] **G-BREAD-03 Logistics VN.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Ẩn breadcrumb trên trang Logistics Việt Nam.
- [ ] **G-BREAD-04 Logistics China.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Ẩn breadcrumb trên trang Logistics Trung Quốc.
- [ ] **G-BREAD-05 Import & Export.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Ẩn breadcrumb trên trang Import & Export.
- [ ] **G-BREAD-06 Các trang còn lại.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Giữ breadcrumb phù hợp và không làm hỏng breadcrumb bài Post/Knowledge.

## Task 2 — Sourcing

- [ ] **SOU-01 Font cơ bản 16px.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đặt cỡ chữ cơ bản trang ở `1rem = 16px`; kiểm tra kế thừa và breakpoint.
- [ ] **SOU-02 Tiêu đề đầu trang 60px.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Áp dụng kích thước yêu cầu ở desktop và scale hợp lý trên tablet/mobile.
- [ ] **SOU-03 Bỏ title phủ trên ảnh banner.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xóa đúng title trên ảnh, giữ nội dung/alt/caption cần thiết.
- [ ] **SOU-04 Cân lại banner.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Sau khi bỏ title, kiểm tra bố cục, tương phản, chiều cao và CTA.
- [ ] **SOU-05 Giao diện theo Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Điều chỉnh các phần khách yêu cầu theo pattern/style của trang Fulfillment; không xóa nội dung nghiệp vụ sourcing.
- [ ] **SOU-06 Nhóm GLOBAL SOURCING.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị rõ nhóm/section này.
- [ ] **SOU-07 Nhóm QUALITY CONTROL.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị rõ nhóm/section này.
- [ ] **SOU-08 Nhóm INTERNATIONAL LOGISTICS.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị rõ nhóm/section này.
- [ ] **SOU-09 Nhóm FULFILLMENT.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị rõ nhóm/section này.
- [ ] **SOU-10 Nhóm SUPPLY CHAIN SOLUTIONS.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị rõ nhóm/section này.
- [ ] **SOU-11 Spacing theo mũi tên đỏ.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. **Phụ thuộc ảnh tham chiếu có đánh dấu.** Chỉ chỉnh các vị trí được chỉ định sau khi tìm/nhận ảnh; không tự suy diễn tọa độ.
- [ ] **SOU-12 Rà spacing toàn trang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Sau khi sửa từng điểm, đối chiếu nhịp khoảng cách giữa các section ở các viewport.
- [ ] **SOU-13 Shipping Methods bằng hình ảnh.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị phương thức vận chuyển bằng ảnh phù hợp, có alt text và asset path hợp lệ.
- [ ] **SOU-14 Vị trí Shipping Methods.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đặt section ảnh phương thức vận chuyển trước section Quy trình.
- [ ] **SOU-15 Responsive Shipping Methods.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra desktop và mobile, ảnh không tràn/cắt sai và thứ tự vẫn đúng.
- [ ] **SOU-16 Process theo Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng pattern Quy trình Fulfillment đã được chốt; giữ tương tác và nội dung quy trình cần thiết.
- [ ] **SOU-17 Thứ tự sau di chuyển.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xác nhận Shipping Methods đứng trước Process sau render.

## Task 3 — Fulfillment

- [ ] **FUL-01 Body text 16px.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Cỡ chữ text thường là 16px, không làm vỡ component/breakpoint.
- [ ] **FUL-02 FAQ rate card 14px.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Nội dung FAQ “SpeeGo Fulfillment rate card” hiển thị ở 14px.
- [ ] **FUL-03 Spacing giữa các nhóm.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Điều chỉnh margin/padding để các nhóm nội dung thoáng, thống nhất.
- [ ] **FUL-04 Spacing theo mũi tên đỏ.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. **Phụ thuộc ảnh tham chiếu có đánh dấu.** Chỉ áp dụng sau khi xác định đúng vị trí khách ghi chú.
- [ ] **FUL-05 Rà spacing toàn trang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra desktop/tablet/mobile, tránh khoảng cách chồng lấn hoặc thiếu.
- [ ] **FUL-06 Banner một màn hình.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Điều chỉnh banner để nội dung mục tiêu hiển thị gọn trong một viewport desktop phổ biến.
- [ ] **FUL-07 Banner các kích thước.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra viewport phổ biến; mobile được phép xếp lại nội dung miễn giữ đầy đủ và dễ đọc.
- [ ] **FUL-08 Testimonials 3–4 ảnh/hàng dạng slide.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị 3–4 ảnh trên một hàng và có hành vi slide theo yêu cầu.
- [ ] **FUL-09 Hai testimonials/hàng.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mỗi hàng/slide nội dung hiển thị 2 testimonials.
- [ ] **FUL-10 Điều khiển slider.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Nút/điều khiển chuyển slide hoạt động bằng chuột và bàn phím; trạng thái không bị lệch.
- [ ] **FUL-11 Responsive testimonials.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra desktop/mobile, số cột và thao tác vuốt/chuyển slide.
- [ ] **FUL-12 Process theo Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Chuẩn hóa style Quy trình theo thiết kế Fulfillment được duyệt.
- [ ] **FUL-13 Thứ tự Process.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đặt Process trước “Vì sao chọn SpeeGo”.
- [ ] **FUL-14 Xác nhận thứ tự cuối trang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra DOM/rendered order sau di chuyển và không mất section.

## Task 4 — Logistics

- [ ] **LOG-01 Testimonials dạng slider.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị 3–4 ảnh trên một hàng dạng slide.
- [ ] **LOG-02 Hai testimonials/hàng.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mỗi hàng/slide chứa 2 testimonials.
- [ ] **LOG-03 Navigation slider.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra điều khiển chuyển slide, focus bàn phím và responsive.
- [ ] **LOG-04 Giảm khoảng cách hai cột.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Thu hẹp khoảng trống giữa cột tiêu đề và cột hình.
- [ ] **LOG-05 Tăng diện tích ảnh.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mở rộng vùng ảnh mà vẫn giữ tỉ lệ/crop có chủ đích.
- [ ] **LOG-06 Cân bằng desktop.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra chiều rộng, căn chỉnh và trọng tâm hai cột trên desktop.
- [ ] **LOG-07 Responsive tablet/mobile.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra thứ tự xếp cột, kích thước ảnh, overflow và CTA.
- [ ] **LOG-08 Di chuyển section yêu cầu.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xác định đúng section được khách nhắc tới và đặt xuống dưới “Vì sao chọn SpeeGo”. **Phụ thuộc:** nếu checklist/ảnh không xác định rõ section, cần xin xác nhận trước khi di chuyển.
- [ ] **LOG-09 Xác nhận thứ tự toàn trang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. So sánh thứ tự tất cả section trước/sau và bảo toàn nội dung.

## Task 5 — Import & Export

- [ ] **IE-01 Bỏ cơ chế chuyển qua lại hiện tại.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xác định cơ chế hiện tại và thay bằng điều hướng trang rõ ràng, không làm mất nội dung.
- [ ] **IE-02 Trang tổng hợp.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Giữ `/en/import-export` làm trang tổng hợp để đáp ứng URL toàn cục trong checklist.
- [ ] **IE-03 Trang Import riêng.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo `/en/import-export/import` với nội dung/route riêng.
- [ ] **IE-04 Trang Export riêng.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo `/en/import-export/export` với nội dung/route riêng.
- [ ] **IE-05 Navigation hai trang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Có điều hướng rõ giữa trang tổng hợp, Import và Export; kiểm tra ngôn ngữ có sẵn.
- [ ] **IE-06 Thiết kế section khoanh đỏ.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. **Phụ thuộc ảnh có khoanh đỏ.** Tìm/nhận ảnh tham chiếu và xác định section trước khi thiết kế lại.
- [ ] **IE-07 Phân biệt hai section.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tạo visual hierarchy khác nhau theo nội dung, không dùng hai section trông như bản sao.
- [ ] **IE-08 Section order.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đưa nội dung được yêu cầu lên trên “Vì sao chọn SpeeGo”; nếu nội dung cụ thể chưa xác định, ghi phụ thuộc và xin khách chỉ rõ.
- [ ] **IE-09 Form sau Fulfillment Policy.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đưa form ngay dưới Fulfillment Policy và xác nhận policy nằm trước form trong trang liên quan.
- [ ] **IE-10 Spacing Policy → Form.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra khoảng cách, heading, nền và CTA giữa hai phần.
- [ ] **IE-11 Submit/validation.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xác minh form thật được render ở cả SPA và trang SEO tĩnh; kiểm tra validation và submit/integration. Không chấp nhận placeholder rỗng.
- [ ] **IE-12 URL/navigation.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mở trực tiếp, refresh, chuyển trang và back/forward trên URL tổng hợp/Import/Export.

## Task 6 — Knowledge / Blog

### Landing và danh mục

- [ ] **KNO-01 Landing tổng hợp.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Knowledge landing page giới thiệu/tổng hợp danh mục bài viết.
- [ ] **KNO-02 Khoảng 8 danh mục.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Hiển thị khoảng 8 category theo nội dung thực tế được duyệt; ghi rõ category nào có nội dung và không tạo card trỏ rỗng.
- [ ] **KNO-03 Layout và navigation.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra bố cục landing và link từ mỗi card sang đúng danh mục.
- [ ] **KNO-04 Shipping Guides path.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. URL công khai `/en/knownledge/shipping-guides` ánh xạ đúng category.
- [ ] **KNO-05 Slug danh mục còn lại.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng mẫu `/en/knownledge/{category-slug}` và chuẩn hóa slug.
- [ ] **KNO-06 Slug nhất quán.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đồng bộ giữa ROUTES, link nội bộ, static output, canonical, sitemap và hreflang.
- [ ] **KNO-07 Link category.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra liên kết từ landing tới tất cả category và từ category về Knowledge/điều hướng phù hợp.

### SEO danh mục

- [ ] **KNO-08 Canonical.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Canonical tự trỏ về URL path sạch của Knowledge và từng category.
- [ ] **KNO-09 Hreflang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Chỉ liên kết ngôn ngữ tương ứng thực sự tồn tại; không tạo alternate sai.
- [ ] **KNO-10 Crawl/index category.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra HTML tĩnh có nội dung, robots cho phép và sitemap liệt kê category.

## Task 7 — Post / Trang bài viết

- [ ] **POST-01 Process trên Post.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Xác định chính xác phần Quy trình trong mẫu bài viết và điều chỉnh giao diện.
- [ ] **POST-02 Dùng style Process Fulfillment.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tái sử dụng component/style chung thay vì tạo bản trùng.
- [ ] **POST-03 Kiểm tra nhiều bài.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra trên các post hiện có với độ dài/nội dung khác nhau.
- [ ] **POST-04 Responsive Post.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra ảnh, typography, Process, breadcrumb và nội dung ở desktop/tablet/mobile.
- [ ] **POST-05 Chuẩn URL Post.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Dùng `/en/chuyen-muc/{slug-bai-viet}` như checklist; đối chiếu slug thực tế trước khi chuyển.
- [ ] **POST-06 Redirect URL cũ.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Lập mapping URL cũ → URL mới, kiểm tra redirect và internal links không loop/mất đích.

## Task 8 — Final QA

### Visual

- [ ] **QA-VIS-01 So sánh từng trang** — Trạng thái ban đầu: CHƯA NGHIỆM THU. với design/ảnh khách đánh dấu; ghi viewport và ảnh chụp.
- [ ] **QA-VIS-02 Font size** — Trạng thái ban đầu: CHƯA NGHIỆM THU. đối chiếu mọi giá trị được yêu cầu.
- [ ] **QA-VIS-03 Margin/padding** — Trạng thái ban đầu: CHƯA NGHIỆM THU. đối chiếu ảnh đánh dấu; nếu ảnh thiếu thì ghi rõ chưa nghiệm thu.
- [ ] **QA-VIS-04 Section order** — Trạng thái ban đầu: CHƯA NGHIỆM THU. đối chiếu từng trang với checklist.
- [ ] **QA-VIS-05 Banner** — Trạng thái ban đầu: CHƯA NGHIỆM THU. kiểm tra desktop, tablet, mobile và nội dung không bị che/cắt.
- [ ] **QA-VIS-06 Testimonials slider** — Trạng thái ban đầu: CHƯA NGHIỆM THU. kiểm tra số ảnh/card, navigation và responsive.
- [ ] **QA-VIS-07 Breadcrumb** — Trạng thái ban đầu: CHƯA NGHIỆM THU. kiểm tra trang phải ẩn và trang cần hiển thị.

### Responsive

- [ ] **QA-RESP-01 Desktop.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra tất cả trang và thành phần chính.
- [ ] **QA-RESP-02 Tablet.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra breakpoint, cột, menu, ảnh và slider.
- [ ] **QA-RESP-03 Mobile.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra overflow, cỡ chữ, CTA, ảnh và thứ tự.
- [ ] **QA-RESP-04 Menu mobile.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Mở/đóng, focus, điều hướng và language switch.
- [ ] **QA-RESP-05 Slider mobile.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Vuốt/chuyển slide, số cột và trạng thái điều khiển.
- [ ] **QA-RESP-06 Banner mobile.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Nội dung và CTA hiển thị đầy đủ.

### Navigation và technical SEO

- [ ] **QA-NAV-01 Menu links.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Tất cả mục menu dẫn đúng URL.
- [ ] **QA-NAV-02 Internal links.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Link nội bộ/cross-language/category/Post không hỏng.
- [ ] **QA-NAV-03 Broken links.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Không có link 404 hoặc asset path lỗi trong các route thuộc phạm vi.
- [ ] **QA-NAV-04 Redirect loop.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Không có vòng lặp; redirect cũ tới URL canonical một cách nhất quán.
- [ ] **QA-SEO-01 URL structure.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Đối chiếu từng public URL với checklist.
- [ ] **QA-SEO-02 Canonical.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra canonical của homepage, dịch vụ, Knowledge, category và Post.
- [ ] **QA-SEO-03 Hreflang.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra cặp/ngôn ngữ ba chiều cho trang có bản dịch.
- [ ] **QA-SEO-04 Sitemap.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Sitemap mới có đủ URL, không có hash/prefix sai/URL trùng.
- [ ] **QA-SEO-05 Robots/indexing.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Không chặn nhầm nội dung; kiểm tra robots và meta robots.
- [ ] **QA-SEO-06 Crawl nội dung.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra HTML trả về từ route công khai và Google URL Inspection sau khi có preview/đích kiểm tra phù hợp.
- [ ] **QA-BUILD-01 Build static.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Chạy `npm run build`; xác nhận route HTML, sitemap, robots và assets sinh ra đúng.
- [ ] **QA-DEPLOY-01 Vercel Preview.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Kiểm tra bản preview và các URL trực tiếp; không deploy production trong phạm vi kế hoạch này.
- [ ] **QA-CONSOLE-01 Browser console/network.** — Trạng thái ban đầu: CHƯA NGHIỆM THU. Không có lỗi runtime, asset 404 hoặc lỗi khởi tạo route/form/slider.

## Quy tắc kiểm thử áp dụng cho mọi task

1. Trước khi sửa, ghi nhận trạng thái hiện tại và nơi sở hữu hành vi (Explore hay legacy); bảo toàn mọi diff có sẵn.
2. Sau mỗi task, chạy kiểm tra mục tiêu cho task đó; sau mỗi nhóm trang, chạy smoke test cho cả trang mới và chức năng dùng chung bị ảnh hưởng.
3. Với trang đã migrate: kiểm tra route trực tiếp, route SPA/hash tương thích, refresh, header navigation, language switch, back/forward và asset loading.
4. Với mọi thay đổi layout: chụp/so sánh desktop, tablet và mobile; kiểm tra typography, spacing, container, hero, card alignment, ảnh, CTA và thứ tự section.
5. Kiểm tra form bằng thao tác thật trên môi trường test/preview: required fields, invalid input, success/failure feedback và integration. Không gửi dữ liệu thử tới khách hàng thật.
6. Kiểm tra slider/menu bằng chuột, bàn phím và mobile; tôn trọng `prefers-reduced-motion` với animation hiện có.
7. Chạy build hiện có `npm run build`; kiểm tra HTML được sinh, canonical/hreflang, sitemap, robots, assets và trực tiếp mở các URL chính.
8. Kiểm tra Vercel Preview trước nghiệm thu; production release là bước riêng và không thuộc kế hoạch này.
9. Chỉ đánh dấu `[x]` khi có bằng chứng phù hợp. Bằng chứng gồm route/viewport đã kiểm tra, kết quả, ảnh chụp hoặc commit; task bị thiếu ảnh/thông tin phải giữ trạng thái `PHỤ THUỘC`.

## Thứ tự và phụ thuộc thực hiện

| Đợt | Task | Điều kiện bắt đầu / phụ thuộc |
|---|---|---|
| 0 | Baseline, xác định kiến trúc, thu thập ảnh/design | Trước mọi thay đổi; cần ảnh đánh dấu để nghiệm thu spacing chính xác |
| 1 | Global header, route, ngôn ngữ, breadcrumb, SEO output | Chốt route mapping trước khi đổi link page |
| 2 | Sourcing | Dựa trên header/breadcrumb dùng chung; spacing theo ảnh tham chiếu |
| 3 | Fulfillment | Cần chốt component Process/testimonial dùng làm chuẩn |
| 4 | Logistics | Tái sử dụng testimonial pattern sau khi Fulfillment được nghiệm thu |
| 5 | Import & Export | Cần xác định section khoanh đỏ/nội dung cần chuyển; giữ form integration |
| 6 | Knowledge / Blog và Post | Cần route convention/canonical đã thống nhất ở đợt 1 |
| 7 | Final QA và Vercel Preview | Sau khi các route/page trong phạm vi hoàn thành |

## Progress Tracker

| Nhóm | Tổng task | Đã nghiệm thu | Còn lại / phụ thuộc | Ghi chú / bằng chứng |
|---|---:|---:|---:|---|
| Baseline | 5 | 0 | 5 | |
| Global | 40 | 0 | 40 | |
| Sourcing | 17 | 0 | 17 | |
| Fulfillment | 14 | 0 | 14 | |
| Logistics | 9 | 0 | 9 | |
| Import & Export | 12 | 0 | 12 | |
| Knowledge / Blog | 10 | 0 | 10 | |
| Post | 6 | 0 | 6 | |
| Final QA | 26 | 0 | 26 | |
| **Tổng** | **139** | **0** | **139** | Cập nhật sau nghiệm thu từng task |

## Ghi chú triển khai

- Checklist khách hàng ghi slug `knownledge`; kế hoạch giữ nguyên chuỗi này cho URL công khai theo yêu cầu đã chốt. Route `knowledge` hiện tại có thể tiếp tục làm alias/redirect tương thích.
- Checklist vừa yêu cầu URL tổng hợp `/en/import-export`, vừa yêu cầu tách thành hai trang. Kế hoạch giữ URL tổng hợp và thêm `/en/import-export/import`, `/en/import-export/export` làm hai trang riêng.
- Ảnh `10-sourcing.png` có thể dùng làm tham chiếu tổng thể cho Sourcing; chưa có ảnh thể hiện rõ các mũi tên đỏ/khoanh đỏ. Không tự suy ra vị trí chỉnh sửa từ ảnh không đánh dấu.
- Đạt checklist giao diện không thay thế quy tắc migration trong `rule.md`: không copy mù CSS/JS, kiểm tra xung đột selector, chuẩn hóa asset path, dùng router hiện có, giữ header/footer dùng chung, bảo toàn form/integration và kiểm tra hai kiến trúc trước khi đổi production entry.
