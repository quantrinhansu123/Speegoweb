# Audit giao diện và SEO: WordPress local so với Vercel

**Ngày kiểm tra:** 27-09-2026  
**Bản tham chiếu:** [https://speegoweb.vercel.app/](https://speegoweb.vercel.app/)  
**Bản WordPress:** `http://localhost/wordpress_demo/` (XAMPP)  
**Phạm vi:** kiểm kê đủ 51 route nội dung trong database; so sánh trực quan trên homepage, Sourcing và Fulfillment; kiểm tra HTML/SEO thô, điều hướng, permalink, `robots.txt` và sitemap. Chưa chụp so sánh trực quan riêng từng route trong 51 route.

> **Cách đọc trạng thái Google:** “SEO metadata đã cấu hình local” không có nghĩa Google đã index hoặc trang đã có thứ hạng. XAMPP `localhost` không phải URL công khai để Google truy cập. Không có quyền Search Console trong lượt audit này nên trạng thái index của từng URL production chưa thể xác nhận.

## Tóm tắt

| Hạng mục | Trạng thái đã xác minh |
| --- | --- |
| Homepage VI/EN/ES trên WordPress | Có title, description, canonical, hreflang, Open Graph, JSON-LD và một H1 trong phản hồi local. Chưa được xác nhận index trên Google. |
| 48 trang nội dung còn lại | Chưa hoàn tất SEO trên WordPress. HTML thô dùng title chung `Khám phá dịch vụ | SpeeGo Logistics`, thiếu meta description/canonical và nội dung H1 ban đầu; nội dung được nạp bằng JavaScript. |
| Permalink theo ngôn ngữ | Lỗi đã tái hiện: `/en/sourcing/` resolve sang route tiếng Việt `#/sourcing`. |
| robots/sitemap WordPress local | `robots.txt`, `wp-sitemap.xml`, `sitemap_index.xml` đều trả `text/html` là app shell, không phải robots/plain text hoặc XML sitemap. |
| So sánh thiết kế | Homepage, Sourcing mobile và Fulfillment desktop được xem trực tiếp. Có sai khác khoảng cách ở Sourcing mobile; các màn đã xem còn giữ cấu trúc, màu sắc và thành phần chính gần với Vercel. 48 route còn lại chưa được so sánh ảnh từng trang. |
| Khách tự sửa nội dung | WordPress có lưu page content, nhưng tài khoản/role Editor và quy trình sửa-preview-publish cho khách chưa được nghiệm thu. |
| Tốc độ | Chưa có số Lighthouse/PageSpeed. Video homepage cục bộ là 11.49 MiB và 3.17 MiB; cần đo rồi tối ưu tải. |
| Có tìm được trên Google không? | Google Search trả về một số URL thuộc `speegologistic.com`, nhưng Vercel preview và WordPress local là môi trường/domain khác. Không dùng kết quả của domain này để khẳng định domain kia đã index. |

## Lỗi và sai khác giao diện / điều hướng

| Mã | Mức | Trang/phạm vi | Quan sát | Việc cần làm |
| --- | --- | --- | --- | --- |
| UI-01 | P2 | Sourcing, mobile | Ở ảnh cùng khung xem khoảng 785 px, phần tiêu đề/nội dung/ảnh đầu WordPress bắt đầu cao hơn bản Vercel khoảng 40–45 px. Nội dung, màu sắc và thứ tự section nhìn gần giống; khác biệt chủ yếu là khoảng trắng phía trên hero. | Xác nhận đây có phải chủ ý của bản thiết kế mới không; nếu không, chỉnh spacing trong giới hạn giữ nguyên thiết kế đã duyệt. |
| UI-02 | P1 | Các trang ngôn ngữ EN | Mở trực tiếp `http://localhost/wordpress_demo/en/sourcing/` tạo URL `#/sourcing`, selector hiển thị VN và nội dung tiếng Việt. Trong khi `/vi/sourcing/` của Vercel là route tiếng Việt, `/en/sourcing/` phải là nội dung tiếng Anh. Đây là lỗi định tuyến theo slug trùng giữa ngôn ngữ, không phải lỗi CSS. | Resolver phải nhận diện cả prefix ngôn ngữ và slug; không lấy trang đầu tiên chỉ theo leaf slug. Sau khi sửa cần mở trực tiếp và refresh từng route VI/EN/ES. |
| UI-03 | P1 | Menu/liên kết tới trang | Các trang WordPress hiện vẫn dùng hash route kiểu `/#/sourcing`, `/#/fulfillment`, `/#/knowledge`. Hash không tạo URL tài liệu riêng ở server như `/vi/sourcing/`; ngoài ra các đường dẫn nested chưa ánh xạ đúng ngôn ngữ. | Chốt permalink công khai, làm internal link crawlable tới route chuẩn và giữ điều hướng SPA chỉ như trải nghiệm điều hướng; kiểm tra direct-load/refresh/back. |
| UI-04 | P2 / cần thống nhất | Homepage Vercel gốc | Trong lần mở trực tiếp, nội dung homepage hiển thị tiếng Việt nhưng HTML phản hồi khai báo `lang="en"` và canonical `https://speegologistic.com/en/`. Menu trên Vercel cũng hiển thị nhiều nhãn tiếng Anh trong khi phần nội dung là tiếng Việt. WordPress local đang hiển thị menu tiếng Việt. Sai khác ngôn ngữ này có sẵn ở bản tham chiếu; không nên coi phần menu đã dịch trên WordPress là lỗi nếu chưa có chỉ dẫn thiết kế khác. | Chốt route/domain chuẩn cho trang chủ VI và đồng bộ nội dung, menu, `lang`, canonical và hreflang ở production. |
| UI-05 | Ghi chú kiểm tra | Homepage | Ảnh nền là video autoplay nên khung cảnh trong ảnh chụp thay đổi theo thời điểm. Ở các lần chụp có lúc thấy tàu, có lúc thấy máy bay/xe tải; đây chưa đủ bằng chứng để kết luận WordPress dùng sai video. | So sánh tên/hash asset và playback trên cùng thời điểm trước khi báo lỗi media. |
| OK-01 | Đã đối chiếu | Header / Fulfillment | Header và bố cục Fulfillment desktop nhìn gần với Vercel; ở các ảnh đã xem, menu responsive trên màn hình hẹp chuyển sang nút hamburger. Không thấy sai lệch bố cục lớn ở trang Fulfillment trong phạm vi kiểm tra. | Giữ làm mốc so sánh; chưa xem đủ mọi section/viewport của toàn site. |

### Phạm vi ảnh đã đối chiếu

- Homepage: desktop, so sánh hero, header, video nền và phần giới thiệu.
- Sourcing: mobile khoảng 785 px, so sánh hero, header và ảnh đầu nội dung.
- Fulfillment: desktop, so sánh hero, menu và khối giá trị dịch vụ.
- Các route còn lại được kiểm kê theo route trong database và route map; chưa được xác nhận bằng ảnh từng trang. Không xem bảng route ở dưới là bằng chứng mọi giao diện đã được nghiệm thu.

## Trạng thái SEO theo trang

### Đã cấu hình metadata trên WordPress local

| Ngôn ngữ | URL kiểm tra trên XAMPP | Canonical đang sinh ở local | Ghi chú |
| --- | --- | --- | --- |
| VI | `/` | `/` | Title/description VI, `lang=vi-VN`, hreflang VI/EN/ES/x-default, OG, WebSite/WebPage/Organization JSON-LD, nội dung homepage render sẵn. |
| EN | `/?lang=en` | `/?lang=en` | Metadata EN và nội dung homepage render sẵn; route hash mặc định là `#/en/home`. |
| ES | `/?lang=es` | `/?lang=es` | Metadata ES và nội dung homepage render sẵn; route hash mặc định là `#/es/inicio`. |

Cả ba URL local trả HTTP 200; HTML thô có đúng một H1. Đây là trạng thái của XAMPP tại thời điểm kiểm tra, không phải xác nhận Google đã crawl/index. Khi lên hosting cần thay canonical/local base sang domain production đã chốt và kiểm tra bằng Search Console.

### Chưa hoàn tất SEO trên WordPress

Các route dưới đây có nội dung trong WordPress nhưng chưa có SEO page-level đầy đủ trên phản hồi ban đầu: title riêng theo route, meta description, canonical, hreflang, nội dung server-rendered và sitemap URL chuẩn. Title SPA có thể được JavaScript cập nhật sau khi chạy, nhưng HTML thô không có đủ tín hiệu đó. Do Google có thể render JavaScript nhưng không đảm bảo thay thế được kiểm tra trực tiếp, các trang này được xếp **chưa nghiệm thu SEO**, không kết luận rằng chắc chắn Google sẽ không index.

#### Toàn bộ 51 trang nội dung
| Ngôn ngữ | ID WP | Trang | Route hash đang lưu | SEO WordPress hiện trạng |
| --- | ---: | --- | --- | --- |
| VI | 152 | Trang chủ SpeeGo | `#/home` | Metadata đã cấu hình local; index Google chưa xác minh |
| VI | 10 | Sourcing & QC | `#/sourcing` | Chưa hoàn tất SEO trên WordPress |
| VI | 9 | Fulfillment | `#/fulfillment` | Chưa hoàn tất SEO trên WordPress |
| VI | 11 | Tuyến vận chuyển toàn cầu | `#/tuyen-van-chuyen` | Chưa hoàn tất SEO trên WordPress |
| VI | 13 | Trung Quốc → Mỹ, Canada, Úc | `#/logistics/china-to-us-ca-au` | Chưa hoàn tất SEO trên WordPress |
| VI | 14 | Việt Nam → Mỹ, Canada, Úc | `#/logistics/vietnam-to-us-ca-au` | Chưa hoàn tất SEO trên WordPress |
| VI | 15 | Xuất nhập khẩu & hải quan | `#/xuat-nhap-khau` | Chưa hoàn tất SEO trên WordPress |
| VI | 8 | Knowledge Hub | `#/knowledge` | Chưa hoàn tất SEO trên WordPress |
| VI | 16 | Shipping Guides | `#/knowledge/huong-dan-van-chuyen` | Chưa hoàn tất SEO trên WordPress |
| VI | 17 | Industry Guides | `#/knowledge/kien-thuc-nganh-hang` | Chưa hoàn tất SEO trên WordPress |
| VI | 18 | Trade Routes | `#/knowledge/tuyen-thuong-mai` | Chưa hoàn tất SEO trên WordPress |
| VI | 19 | Sourcing & QC knowledge | `#/knowledge/sourcing-qc` | Chưa hoàn tất SEO trên WordPress |
| VI | 20 | Fulfillment & Warehouse knowledge | `#/knowledge/fulfillment-kho-van` | Chưa hoàn tất SEO trên WordPress |
| VI | 21 | Import & Export News | `#/knowledge/tin-xuat-nhap-khau` | Chưa hoàn tất SEO trên WordPress |
| VI | 22 | Chuẩn bị lô hàng | `#/knowledge/chuan-bi-lo-hang` | Chưa hoàn tất SEO trên WordPress |
| VI | 23 | Quy trình nhập kho | `#/knowledge/quy-trinh-nhap-kho` | Chưa hoàn tất SEO trên WordPress |
| VI | 24 | Kiểm soát chất lượng trước xuất hàng | `#/knowledge/kiem-soat-chat-luong` | Chưa hoàn tất SEO trên WordPress |
| EN | 153 | SpeeGo Home (English) | `#/en/home` | Metadata đã cấu hình local; index Google chưa xác minh |
| EN | 28 | Global Sourcing & QC | `#/en/sourcing` | Chưa hoàn tất SEO trên WordPress |
| EN | 27 | Fulfillment & Warehouse | `#/en/fulfillment` | Chưa hoàn tất SEO trên WordPress |
| EN | 29 | Global Shipping Routes | `#/en/shipping-routes` | Chưa hoàn tất SEO trên WordPress |
| EN | 32 | China → US, Canada, Australia | `#/en/logistics/china-to-us-ca-au` | Chưa hoàn tất SEO trên WordPress |
| EN | 33 | Vietnam → US, Canada, Australia | `#/en/logistics/vietnam-to-us-ca-au` | Chưa hoàn tất SEO trên WordPress |
| EN | 34 | Import & Export / Customs Brokerage | `#/en/import-export` | Chưa hoàn tất SEO trên WordPress |
| EN | 26 | Knowledge Hub | `#/en/knowledge` | Chưa hoàn tất SEO trên WordPress |
| EN | 35 | Shipping Guides | `#/en/shipping-guides` | Chưa hoàn tất SEO trên WordPress |
| EN | 36 | Industry Guides | `#/en/industry-guides` | Chưa hoàn tất SEO trên WordPress |
| EN | 37 | Trade Routes | `#/en/trade-routes` | Chưa hoàn tất SEO trên WordPress |
| EN | 38 | Sourcing & QC | `#/en/sourcing-qc` | Chưa hoàn tất SEO trên WordPress |
| EN | 39 | Fulfillment & Warehouse | `#/en/fulfillment-warehouse` | Chưa hoàn tất SEO trên WordPress |
| EN | 40 | Import & Export News | `#/en/import-export-news` | Chưa hoàn tất SEO trên WordPress |
| EN | 42 | Preparing Your Shipment | `#/en/post/preparing-your-shipment` | Chưa hoàn tất SEO trên WordPress |
| EN | 43 | Fulfillment: Barcodes to Receiving | `#/en/post/fulfillment-receiving` | Chưa hoàn tất SEO trên WordPress |
| EN | 44 | Quality Control at Every Stage | `#/en/post/quality-control` | Chưa hoàn tất SEO trên WordPress |
| ES | 154 | Inicio de SpeeGo | `#/es/inicio` | Metadata đã cấu hình local; index Google chưa xác minh |
| ES | 48 | Abastecimiento global y control de calidad | `#/es/sourcing` | Chưa hoàn tất SEO trên WordPress |
| ES | 47 | Fulfillment y almacén | `#/es/fulfillment` | Chưa hoàn tất SEO trên WordPress |
| ES | 49 | Rutas de envío globales | `#/es/rutas-de-envio` | Chưa hoàn tất SEO trên WordPress |
| ES | 52 | China → EE. UU., Canadá y Australia | `#/es/logistica/china-a-eeuu-canada-australia` | Chưa hoàn tất SEO trên WordPress |
| ES | 53 | Vietnam → EE. UU., Canadá y Australia | `#/es/logistica/vietnam-a-eeuu-canada-australia` | Chưa hoàn tất SEO trên WordPress |
| ES | 54 | Importación, exportación y aduanas | `#/es/import-export` | Chưa hoàn tất SEO trên WordPress |
| ES | 46 | Centro de conocimiento | `#/es/knowledge` | Chưa hoàn tất SEO trên WordPress |
| ES | 55 | Guías de envío | `#/es/guias-de-envio` | Chưa hoàn tất SEO trên WordPress |
| ES | 56 | Guías por industria | `#/es/guias-por-industria` | Chưa hoàn tất SEO trên WordPress |
| ES | 57 | Rutas comerciales | `#/es/rutas-comerciales` | Chưa hoàn tất SEO trên WordPress |
| ES | 58 | Abastecimiento y control de calidad | `#/es/sourcing-qc` | Chưa hoàn tất SEO trên WordPress |
| ES | 59 | Fulfillment y almacén | `#/es/fulfillment-almacen` | Chưa hoàn tất SEO trên WordPress |
| ES | 60 | Noticias de importación y exportación | `#/es/noticias-import-export` | Chưa hoàn tất SEO trên WordPress |
| ES | 62 | Preparar su envío | `#/es/post/preparar-su-envio` | Chưa hoàn tất SEO trên WordPress |
| ES | 63 | De códigos de barras a recepción | `#/es/post/recepcion-fulfillment` | Chưa hoàn tất SEO trên WordPress |
| ES | 64 | Control de calidad en cada etapa | `#/es/post/control-de-calidad` | Chưa hoàn tất SEO trên WordPress |
**Tổng kiểm kê:** 51 trang nội dung (17 VI, 17 EN, 17 ES). Ngoài ra database có 12 record thành phần dùng chung (header/footer/utilities/form) và một trang mẫu; chúng không phải 13 landing page SEO. Cần đặt trạng thái/canonical phù hợp cho thành phần nội bộ, không đưa chúng vào sitemap như trang đích.

## Vấn đề kỹ thuật SEO đã tái hiện

### 1. Metadata/body của trang dịch vụ chưa có trong HTML ban đầu

Kiểm tra `http://localhost/wordpress_demo/vi/sourcing/` trả HTTP 200 nhưng HTML thô có:

- Title chung `Khám phá dịch vụ | SpeeGo Logistics`.
- Không có meta description hoặc canonical.
- Không có H1 trong HTML thô trước khi JavaScript render nội dung.
- Sau khi app khởi chạy, title/nội dung mới được cập nhật phía client.

Nhánh SEO trong theme hiện chỉ thêm metadata và prerender cho ba route homepage. Các route còn lại dùng cùng app shell. Ví dụ `/en/sourcing/` còn bị resolver fallback về `#/sourcing` tiếng Việt.

### 2. robots.txt và sitemap local trả sai nội dung

| URL | Trạng thái local | Content-Type / phản hồi |
| --- | ---: | --- |
| `/robots.txt` | 200 | `text/html`, trả app shell khoảng 138 KB |
| `/wp-sitemap.xml` | 200 | `text/html`, không phải sitemap XML |
| `/sitemap_index.xml` | 200 | `text/html`, không phải sitemap XML |

Đây là endpoint được rewrite về theme, không phải file/tài liệu tương ứng. Trên WordPress production cần tạo/khôi phục robots và sitemap đúng, chỉ liệt kê URL canonical công khai và loại các record thành phần.

### 3. Chốt domain canonical trước khi đưa WordPress lên Google

- Phản hồi `https://speegoweb.vercel.app/robots.txt` khai báo sitemap tại `https://speegologistic.com/sitemap.xml`.
- Sitemap từ Vercel có 61 URL, các URL đều dùng host `speegologistic.com`; không dùng host `speegoweb.vercel.app`.
- HTML homepage Vercel gốc trả `lang="en"` và canonical `/en/`, trong khi lần xem browser hiện nội dung tiếng Việt.
- Google Search hiện trả về kết quả thuộc `speegologistic.com` (ví dụ [trang chủ](https://speegologistic.com/) và [dịch vụ logistics](https://speegologistic.com/logistics/)). Các kết quả đó không chứng minh bản WordPress local hoặc Vercel preview đã được index đúng.

Cần thống nhất một domain production duy nhất, ngôn ngữ mặc định, URL trang chủ và chiến lược redirect/canonical. Không gửi sitemap của Vercel sang site WordPress mà chưa đổi host.

### 4. Chỉ số tốc độ chưa đo

Tài sản local lớn nhất trong nhóm đã kiểm tra:

| Tài sản | Dung lượng file |
| --- | ---: |
| `explore/assets/hero-bg-video.mp4` | 11.49 MiB |
| `explore/assets/consult-video.mp4` | 3.17 MiB |
| `explore/assets/anh-nen.png` | 2.25 MiB |
| `explore/assets/buoc-1.png` | 1.95 MiB |

Homepage tải video nền với `preload="auto"`; đây là ứng viên cần đo/giảm tải. Dung lượng file không thay cho số đo truyền thực tế. Chưa có Lighthouse/PageSpeed, LCP/INP/CLS hoặc số đo mobile/desktop trong audit này.

## Việc còn lại theo yêu cầu trong ảnh

| # | Yêu cầu | Trạng thái hiện tại | Việc cần giải quyết / tiêu chí hoàn tất |
| ---: | --- | --- | --- |
| 1 | Chuẩn SEO | Homepage VI/EN/ES có bộ metadata trên local. 48 route khác chưa nghiệm thu; permalink theo ngôn ngữ, robots.txt và sitemap đang có lỗi; Google index chưa xác nhận. | Chốt domain; làm URL/route sạch theo ngôn ngữ; sửa resolver; thêm metadata/canonical/hreflang và body crawlable từng trang; sitemap/robots đúng; kiểm tra Search Console sau khi site public. |
| 2 | Khách có thể chỉnh sửa | Nội dung 51 trang được lưu thành WordPress pages và có API đọc nội dung. Chưa nghiệm thu quyền và trải nghiệm sửa cho khách. | Tạo user riêng role Editor; xác định vùng khách được sửa; thử sửa-preview-publish bằng tài khoản khách; cấp URL đăng nhập và thông tin tạm trong mục bàn giao riêng, không lưu mật khẩu thật trong repo. |
| 3 | Tối ưu tốc độ | Chưa có số đo. Homepage có 2 video tổng 14.66 MiB cùng một số ảnh 1–2 MiB. | Đo Lighthouse/PageSpeed ở thiết bị mobile/desktop; tối ưu video/ảnh và tải trì hoãn phù hợp; xác nhận không đổi bố cục/giao diện; ghi lại số trước/sau. |

## Thứ tự xử lý đề xuất

1. Chốt domain production và mẫu URL cho VI/EN/ES; sửa resolver để `/en/sourcing/` không trỏ nhầm sang VI.
2. Làm `robots.txt`, sitemap và canonical đồng nhất với domain đó; xác minh lại URL production bằng HTTP và Search Console.
3. Tiếp tục SEO từng trang theo quy tắc đã thống nhất: một trang mỗi lượt, giữ thiết kế, demo trước khi chuyển trang kế.
4. Tạo/kiểm tra account khách Editor và hướng dẫn cập nhật nội dung.
5. Đo rồi tối ưu tốc độ, so sánh giao diện trước/sau.

## Nguồn và giới hạn

- So sánh website trực tiếp: [Vercel](https://speegoweb.vercel.app/) và XAMPP local `http://localhost/wordpress_demo/`.
- Danh sách 51 route lấy từ database dump/`SEO_PAGE_ROADMAP.md`; SEO status phân loại theo phản hồi WordPress hiện tại và nhánh metadata trong theme.
- Google Search Central: [website đa ngôn ngữ và hreflang](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Tìm kiếm Google không thay cho Search Console/URL Inspection. Không xác nhận được trạng thái index của từng URL trong các tài khoản Google của chủ site.


