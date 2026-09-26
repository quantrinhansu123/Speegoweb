# SEO Roadmap cho WordPress SpeeGo local

> Trạng thái: kiểm kê sau khi import commit `2c04706`. Đây là kế hoạch, chưa thực hiện chỉnh SEO hoặc đổi giao diện. Site local: `http://localhost/wordpress_demo/`.

## Kết quả cài đặt

- Apache và MariaDB của XAMPP đang chạy.
- Đã import `database/wordpress_demo_backup.sql` vào database local `wordpress_demo`; `wp-config.php` local trỏ database mới này.
- Đã kích hoạt theme `speego-logistics` theo giá trị trong database và chép theme cùng `explore/` vào `wp-content/themes/speego-logistics/`.
- Bản WordPress/database cũ được sao lưu ở `C:\xampp\backup\speego-preinstall-20260926\`; database cũ `data_speego` vẫn còn nguyên.
- Site trả HTTP 200 và trang chủ render được tại `http://localhost/wordpress_demo/#/home`.
- Tắt tùy chọn cho phép lập chỉ mục trong database local. Không áp dụng tùy chọn này cho production.

## Phát hiện trước khi bắt đầu tối ưu từng trang

1. Database dump có **64 trang WordPress published**: 51 trang nội dung theo 3 ngôn ngữ (17/ngôn ngữ), 12 trang thành phần dùng chung và 1 trang mẫu. Vì vậy con số “26 trang” trong ghi chú commit không khớp với dữ liệu dump hiện tại; cần phân biệt trang nội dung công khai với các record nội bộ.
2. 51 trang nội dung được đánh dấu bằng hash routes (`#/...`). Theme cũng nạp nội dung vào một ứng dụng SPA. URL có fragment không được gửi lên server như một đường dẫn riêng; đây là vấn đề kiến trúc cần giải quyết để Google có URL riêng cho từng trang.
3. Các URL đường dẫn trực tiếp được kiểm tra trả HTTP 200, nhưng cùng một `<title>` tĩnh (“Khám phá dịch vụ | SpeeGo Logistics”); chưa thấy meta description riêng. Cần kiểm tra cách theme gắn đúng nội dung, URL chuẩn, metadata và ngôn ngữ cho từng đường dẫn trước khi SEO từng trang.
4. Có các slug trùng giữa các ngôn ngữ (`sourcing`, `fulfillment`, `knowledge`...). Resolver tìm theo leaf slug có thể lấy nhầm trang ngôn ngữ. Kế hoạch phải sửa ánh xạ route/URL dùng chung một lần theo cách giữ nguyên giao diện.
5. Mười hai trang header/footer/utilities/form là nội dung thành phần; không để chúng thành trang tìm kiếm độc lập. Cần xác định cách giới hạn index/canonical phù hợp.
6. Hai đường dẫn ảnh nền trong CSS (`explore/images/hero-bg-speego.jpg` và `explore/images/map-world.png`) không có trong source đã pull. Không thay CSS/ảnh trong bước cài đặt; khi xử lý hiệu năng/asset cần kiểm tra và báo riêng nếu ảnh hưởng giao diện.
7. `sync_all_pages_to_wp.php` đang chứa đường dẫn máy cũ `E:/download/xamp/...` và `D:/Speegoweb`. Không chạy script đó; database dump đã có nội dung và theme đã được cài từ source hiện tại.

## Kế hoạch chung

| Giai đoạn | Việc cần làm | Điều kiện nghiệm thu |
| --- | --- | --- |
| 0. Cài local | Đã hoàn thành backup, import DB, cài theme/assets, xác nhận trang chủ chạy | Site local trả 200, theme hoạt động, DB cũ còn nguyên |
| 1. Khóa bản đồ URL | Xác định URL sạch cho VI/EN/ES, sửa resolver để URL phân biệt đúng trang/ngôn ngữ; giữ thiết kế | Mỗi route mở trực tiếp/refresh được đúng nội dung và trả đúng URL; không dùng hash làm URL SEO chính |
| 2. SEO dùng chung | Cấu hình title/description động, canonical, hreflang, robots, sitemap, schema cấp site, xử lý trang thành phần và redirects | Không có title trùng; sitemap chỉ có URL canonical công khai; trang nội bộ không vào index |
| 3. Tối ưu lần lượt từng trang | Theo danh sách 51 trang bên dưới; một trang mỗi lượt, demo và chờ duyệt | Nội dung/render đúng, metadata/heading/link/alt/schema phù hợp; hình ảnh giao diện không đổi |
| 4. Quyền sửa nội dung | Xác định các trường khách cần sửa, thử role Editor, tách tài khoản khách khỏi Administrator | Khách sửa nội dung cần thiết được mà không thể sửa theme/plugin/kỹ thuật |
| 5. Production | Chỉ khi có domain/hosting: HTTPS, Search Console, sitemap, kiểm tra URL Inspection, PageSpeed field data | Site public và indexable; Google đã crawl/index được xác nhận bằng Search Console, không chỉ bằng localhost |

**Thứ tự đề xuất:** xử lý URL/metadata dùng chung như nền tảng; sau đó trang chủ VI, trang dịch vụ VI, Knowledge VI, rồi cùng thứ tự cho EN và ES. Giữa mỗi trang sẽ có demo và điểm dừng chờ duyệt.

## Danh sách 51 trang nội dung

URL ở cột hiện trạng là hash route được lưu trong database. URL sạch là hướng dự kiến để phân tích và chốt; chưa thay đổi URL nào. Trước khi đổi URL công khai cần lập redirect 301 và xác nhận domain production.

### Tiếng Việt

| ID | Trang | Route hiện lưu | Trọng tâm SEO/việc sẽ rà |
| ---: | --- | --- | --- |
| 152 | Trang chủ SpeeGo | `#/home` | Ý định thương hiệu/logistics; title/description trang chủ; một H1 chính; Organization/WebSite schema; liên kết tới các dịch vụ. URL mục tiêu dự kiến `/`. |
| 10 | Sourcing & QC | `#/sourcing` | Tìm nguồn hàng, đánh giá nhà cung cấp, kiểm soát chất lượng; title/description; H1 và heading; Service schema nếu phù hợp; CTA/link dịch vụ. URL mục tiêu `/sourcing/`. |
| 9 | Fulfillment | `#/fulfillment` | Kho vận, xử lý đơn hàng, đóng gói/giao hàng; metadata riêng; cấu trúc dịch vụ, FAQ nếu nội dung hiện có; liên kết tới báo giá. URL mục tiêu `/fulfillment/`. |
| 11 | Tuyến vận chuyển toàn cầu | `#/tuyen-van-chuyen` | Vận chuyển quốc tế, biển/hàng không và tuyến phục vụ; metadata/heading; liên kết sang trang tuyến cụ thể. URL mục tiêu `/tuyen-van-chuyen/`. |
| 13 | Trung Quốc → Mỹ, Canada, Úc | `#/logistics/china-to-us-ca-au` | Tuyến xuất phát Trung Quốc; nội dung đích đến, phương thức, thủ tục; tránh trùng trang tuyến Việt Nam. URL mục tiêu `/logistics/china-to-us-ca-au/`. |
| 14 | Việt Nam → Mỹ, Canada, Úc | `#/logistics/vietnam-to-us-ca-au` | Tuyến xuất phát Việt Nam; nội dung/metadata riêng, khác trang Trung Quốc; URL mục tiêu `/logistics/vietnam-to-us-ca-au/`. |
| 15 | Xuất nhập khẩu & hải quan | `#/xuat-nhap-khau` | Dịch vụ khai báo, chứng từ, thông quan; metadata, nội dung tin cậy và CTA. URL mục tiêu `/xuat-nhap-khau/`. |
| 8 | Knowledge Hub | `#/knowledge` | Trang tổng hợp bài kiến thức; mục đích hub, đường dẫn crawlable tới category/bài viết; URL mục tiêu `/knowledge/`. |
| 16 | Shipping Guides | `#/knowledge/huong-dan-van-chuyen` | Chủ đề hướng dẫn vận chuyển; metadata/category intro, link bài viết, phân trang nếu có. URL mục tiêu `/knowledge/huong-dan-van-chuyen/`. |
| 17 | Industry Guides | `#/knowledge/kien-thuc-nganh-hang` | Chủ đề theo ngành hàng; nội dung category độc nhất và liên kết bài viết. URL mục tiêu `/knowledge/kien-thuc-nganh-hang/`. |
| 18 | Trade Routes | `#/knowledge/tuyen-thuong-mai` | Kiến thức tuyến thương mại; liên kết đến dịch vụ/tuyến liên quan. URL mục tiêu `/knowledge/tuyen-thuong-mai/`. |
| 19 | Sourcing & QC knowledge | `#/knowledge/sourcing-qc` | Nội dung thông tin QC/sourcing, tách rõ với trang dịch vụ Sourcing. URL mục tiêu `/knowledge/sourcing-qc/`. |
| 20 | Fulfillment & Warehouse knowledge | `#/knowledge/fulfillment-kho-van` | Chủ đề kho/fulfillment; phân biệt category kiến thức với dịch vụ Fulfillment. URL mục tiêu `/knowledge/fulfillment-kho-van/`. |
| 21 | Import & Export News | `#/knowledge/tin-xuat-nhap-khau` | Tin xuất nhập khẩu; rà cập nhật/ngày đăng, category intro và bài có thật. URL mục tiêu `/knowledge/tin-xuat-nhap-khau/`. |
| 22 | Chuẩn bị lô hàng | `#/knowledge/chuan-bi-lo-hang` | Bài viết hướng dẫn checklist chuẩn bị; Article metadata/schema, tác giả/ngày, heading và internal links. URL mục tiêu `/knowledge/chuan-bi-lo-hang/`. |
| 23 | Quy trình nhập kho | `#/knowledge/quy-trinh-nhap-kho` | Bài hướng dẫn fulfillment/barcode/nhập kho; Article schema, nội dung và link dịch vụ. URL mục tiêu `/knowledge/quy-trinh-nhap-kho/`. |
| 24 | Kiểm soát chất lượng trước xuất hàng | `#/knowledge/kiem-soat-chat-luong` | Bài QC theo giai đoạn; Article schema, heading, ngày/tác giả và liên kết Sourcing & QC. URL mục tiêu `/knowledge/kiem-soat-chat-luong/`. |

### English

| ID | Page | Route hiện lưu | Trọng tâm SEO/việc sẽ rà |
| ---: | --- | --- | --- |
| 153 | SpeeGo Home (English) | `#/en/home` | English brand/logistics intent; English title/description, H1, Organization/WebSite data, service links. URL mục tiêu `/en/`. |
| 28 | Global Sourcing & QC | `#/en/sourcing` | Supplier sourcing, factory audits and QC; unique English metadata/content and service links. `/en/sourcing/`. |
| 27 | Fulfillment & Warehouse | `#/en/fulfillment` | Warehousing, order fulfilment and shipping; metadata, H1, service details/CTA. `/en/fulfillment/`. |
| 29 | Global Shipping Routes | `#/en/shipping-routes` | Ocean/air forwarding and global routes; distinguish from route-specific pages. `/en/shipping-routes/`. |
| 32 | China → US, Canada, Australia | `#/en/logistics/china-to-us-ca-au` | China-origin freight routes; unique destination/process copy, metadata and links. `/en/logistics/china-to-us-ca-au/`. |
| 33 | Vietnam → US, Canada, Australia | `#/en/logistics/vietnam-to-us-ca-au` | Vietnam-origin routes; distinguish from China route page. `/en/logistics/vietnam-to-us-ca-au/`. |
| 34 | Import & Export / Customs Brokerage | `#/en/import-export` | Customs brokerage/import/export intent; English metadata, service information and CTA. `/en/import-export/`. |
| 26 | Knowledge Hub | `#/en/knowledge` | English knowledge landing; crawlable category/article links and English metadata. `/en/knowledge/`. |
| 35 | Shipping Guides | `#/en/shipping-guides` | Shipping education category; unique intro and links to English articles. `/en/shipping-guides/`. |
| 36 | Industry Guides | `#/en/industry-guides` | Industry-specific logistics/sourcing resources; category content and links. `/en/industry-guides/`. |
| 37 | Trade Routes | `#/en/trade-routes` | Trade corridor content; route-focused metadata and links. `/en/trade-routes/`. |
| 38 | Sourcing & QC | `#/en/sourcing-qc` | Educational content distinct from the Sourcing service page. `/en/sourcing-qc/`. |
| 39 | Fulfillment & Warehouse | `#/en/fulfillment-warehouse` | Educational category distinct from fulfillment service page. `/en/fulfillment-warehouse/`. |
| 40 | Import & Export News | `#/en/import-export-news` | News/resources category; verify dates and published article links. `/en/import-export-news/`. |
| 42 | Preparing Your Shipment | `#/en/post/preparing-your-shipment` | English article; Article metadata/schema, author/date, headings and related service links. `/en/post/preparing-your-shipment/`. |
| 43 | Fulfillment: Barcodes to Receiving | `#/en/post/fulfillment-receiving` | English article on warehouse receiving; article SEO and link to fulfillment page. `/en/post/fulfillment-receiving/`. |
| 44 | Quality Control at Every Stage | `#/en/post/quality-control` | English QC article; article metadata/schema and sourcing service links. `/en/post/quality-control/`. |

### Español

| ID | Página | Route hiện lưu | Trọng tâm SEO/việc sẽ rà |
| ---: | --- | --- | --- |
| 154 | Inicio de SpeeGo | `#/es/inicio` | Spanish brand/logistics intent; localized title/description/H1 and links. URL mục tiêu dự kiến `/es/`. |
| 48 | Abastecimiento global y control de calidad | `#/es/sourcing` | Abastecimiento, proveedores y control de calidad; metadatos y contenido ES únicos. `/es/sourcing/`. |
| 47 | Fulfillment y almacén | `#/es/fulfillment` | Almacenamiento, preparación y entrega de pedidos; metadatos/CTA en español. `/es/fulfillment/`. |
| 49 | Rutas de envío globales | `#/es/rutas-de-envio` | Transporte marítimo/aéreo y rutas; enlazar a rutas específicas. `/es/rutas-de-envio/`. |
| 52 | China → EE. UU., Canadá y Australia | `#/es/logistica/china-a-eeuu-canada-australia` | Transporte desde China; contenido y metadatos distintos de la ruta desde Vietnam. `/es/logistica/china-a-eeuu-canada-australia/`. |
| 53 | Vietnam → EE. UU., Canadá y Australia | `#/es/logistica/vietnam-a-eeuu-canada-australia` | Ruta desde Vietnam; destino, servicio, metadatos y enlaces propios. `/es/logistica/vietnam-a-eeuu-canada-australia/`. |
| 54 | Importación, exportación y aduanas | `#/es/import-export` | Despacho aduanero y comercio exterior; metadata, contenido de servicio y CTA. `/es/import-export/`. |
| 46 | Centro de conocimiento | `#/es/knowledge` | Landing del centro de conocimiento; enlaces rastreables a categorías y artículos ES. `/es/knowledge/`. |
| 55 | Guías de envío | `#/es/guias-de-envio` | Categoría educativa de transporte; introducción y enlaces en español. `/es/guias-de-envio/`. |
| 56 | Guías por industria | `#/es/guias-por-industria` | Recursos de logística por sector; contenido y metadata localizados. `/es/guias-por-industria/`. |
| 57 | Rutas comerciales | `#/es/rutas-comerciales` | Información sobre corredores comerciales; enlaces a rutas de servicio. `/es/rutas-comerciales/`. |
| 58 | Abastecimiento y control de calidad | `#/es/sourcing-qc` | Contenido educativo distinto del servicio de sourcing. `/es/sourcing-qc/`. |
| 59 | Fulfillment y almacén | `#/es/fulfillment-almacen` | Categoría educativa distinta de la página de servicio. `/es/fulfillment-almacen/`. |
| 60 | Noticias de importación y exportación | `#/es/noticias-import-export` | Noticias, fechas y enlaces a artículos publicados. `/es/noticias-import-export/`. |
| 62 | Preparar su envío | `#/es/post/preparar-su-envio` | Artículo ES; metadatos/schema Article, fecha/autor, estructura y enlaces. `/es/post/preparar-su-envio/`. |
| 63 | De códigos de barras a recepción | `#/es/post/recepcion-fulfillment` | Artículo sobre recepción/almacén; SEO de artículo y enlace al servicio. `/es/post/recepcion-fulfillment/`. |
| 64 | Control de calidad en cada etapa | `#/es/post/control-de-calidad` | Artículo de QC; metadatos/schema, estructura y enlaces a Sourcing & QC. `/es/post/control-de-calidad/`. |

## Record nội bộ không nên xử lý như landing page

- **ID 2:** Trang Mẫu.
- **ID 114–119:** Header, footer, utilities, form dùng chung VI/EN/ES.
- **ID 135–140:** Header, footer, utilities dùng chung EN/ES.

Các record này cần kiểm tra trạng thái, URL/canonical và quyền truy cập sau khi mô hình URL được chốt. Không viết title SEO như trang đích cho chúng.

## Quy trình duyệt

1. Người dùng chọn trang đầu tiên hoặc duyệt thứ tự đề xuất.
2. Làm đúng một trang, giữ nguyên giao diện.
3. Demo tại local và trình bày thay đổi/kiểm tra.
4. Dừng chờ người dùng duyệt rồi mới mở trang tiếp theo.
