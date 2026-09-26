# Quy tắc triển khai WordPress trên XAMPP và tối ưu SEO SpeeGo

Tài liệu này ghi lại quy trình đã được người dùng yêu cầu cho lần nhận folder WordPress tiếp theo. Brief của khách là: chuẩn SEO, khách tự chỉnh sửa nội dung, Google có thể thu thập và lập chỉ mục trang; yêu cầu ban đầu cũng gồm tối ưu tốc độ. Phạm vi hiện tại **không bao gồm thiết kế lại**.

## 1. Phạm vi và ranh giới thiết kế

- Thiết kế đã hoàn tất. Không thay đổi layout, màu sắc, font, kích thước chữ, khoảng cách, bố cục responsive, hình ảnh trang trí, hiệu ứng, giao diện header/footer, hoặc thành phần hiển thị.
- Chỉ thực hiện công việc cần cho SEO kỹ thuật/trên trang, khả năng khách sửa nội dung, khả năng crawl/index, và tối ưu tốc độ không làm đổi giao diện.
- Có thể chỉnh metadata không hiển thị trong phần thân trang; title SEO, meta description, canonical, robots directives, sitemap, schema dữ liệu có cấu trúc, alt text phù hợp, liên kết nội bộ, nội dung văn bản và cấu trúc heading khi cần.
- Thay đổi văn bản hiển thị chỉ khi thật sự cần để đáp ứng nội dung SEO hoặc sửa nội dung được khách yêu cầu. Giữ nguyên ý nghĩa, vị trí và cách trình bày; không tự viết lại nội dung nghiệp vụ.
- Tối ưu ảnh/CSS/JS/cache chỉ khi giữ nguyên giao diện và hoạt động. Không xóa hoặc thay thế asset nhìn thấy trên trang nếu có thể làm giao diện khác đi.
- Nếu SEO/tốc độ cần một thay đổi làm ảnh hưởng giao diện, dừng ở trang đó, ghi rõ vấn đề và đưa phương án để người dùng duyệt trước. Không tự ý thực hiện.
- Các rule cũ trong repo có thể nói về tích hợp hoặc chỉnh giao diện. Với công việc WordPress SEO này, ranh giới ở tài liệu này và chỉ dẫn mới nhất của người dùng được ưu tiên.

## 2. Khi người dùng gửi folder WP: cài lên XAMPP trước

Không bắt đầu sửa SEO hoặc thiết kế trước khi website chạy được local trên XAMPP.

1. Kiểm kê folder, nhận diện phiên bản WordPress, theme, plugin, file cấu hình, cấu trúc `wp-content`, dump database nếu có, và các asset tùy chỉnh.
2. Giữ nguyên folder nguồn; tạo bản làm việc riêng trong XAMPP. Không ghi đè hoặc xóa bản gốc.
3. Kiểm tra XAMPP/PHP/MySQL tương thích với project. Nếu cần đổi phiên bản hoặc phát sinh lỗi môi trường, báo nguyên nhân và xử lý theo hướng ít ảnh hưởng nhất.
4. Khởi động Apache và MySQL; tạo database riêng cho site; import database được cung cấp; cấu hình `wp-config.php` cho local. Không đưa mật khẩu database vào file được commit hoặc chia sẻ.
5. Cập nhật URL local trong database bằng cách an toàn với dữ liệu serialized (không dùng thay thế chuỗi thô có thể làm hỏng dữ liệu). Kiểm tra trang chủ, wp-admin, media, permalink và plugin/theme quan trọng.
6. Nếu thiếu database dump, thông tin cần thiết, hoặc folder không phải bản WordPress đầy đủ, không đoán cấu hình. Nêu chính xác phần thiếu và tiếp tục phần kiểm kê không phụ thuộc vào đó.
7. Giữ môi trường local ở trạng thái không lập chỉ mục. Không gửi URL localhost như URL mà Google/khách ngoài Internet có thể truy cập.
8. Sao lưu bản nguồn và database trước khi chỉnh sửa; ghi lại đường dẫn XAMPP local và cách khởi chạy.

**Cổng hoàn tất bước cài đặt:** website và trang quản trị mở được trên XAMPP; trang chủ và các URL quan trọng tải đúng; không có lỗi nghiêm trọng khiến không thể rà soát. Sau đó mới chuyển qua phân tích SEO.

## 3. Kiểm kê và lập kế hoạch trước khi sửa bất kỳ trang nào

Sau khi cài chạy được, lập danh sách tất cả URL/trang công khai từ WordPress, menu, sitemap hiện có và nội dung trong database. Không sửa trang nào trong lúc kiểm kê.

Với từng trang, lập bảng có các trường:

| Trường | Nội dung cần ghi |
| --- | --- |
| Tên trang / URL / ngôn ngữ | URL local và URL dự kiến trên domain thật nếu đã biết |
| Mục đích tìm kiếm | Khách cần tìm gì và trang giải quyết nhu cầu nào |
| Từ khóa/chủ đề chính | Dựa trên nội dung và yêu cầu khách; không nhồi từ khóa |
| SEO hiện trạng | Title, description, slug, canonical, robots, heading, schema, liên kết, ảnh |
| Trạng thái Google | Trang công khai/indexable hay trang chỉ dùng nội bộ; local không thể xác nhận Google đã index |
| Khả năng chỉnh sửa | Nội dung nào khách tự sửa được, bằng màn hình nào, và có cần hướng dẫn không |
| Rủi ro/phụ thuộc | Nội dung chưa có, URL cũ, bản trùng lặp, plugin SEO, quyền truy cập, thiết kế có nguy cơ bị ảnh hưởng |
| Thứ tự xử lý | Ưu tiên theo trang chủ, trang dịch vụ/chuyển đổi, nội dung/blog, trang phụ; xác nhận thứ tự với người dùng |

Gửi cho người dùng:

- Sơ đồ trang/URL và các nhóm trang.
- Bảng audit ban đầu theo từng trang.
- Danh sách vấn đề toàn cục dùng chung: cấu hình WordPress, sitemap, robots, HTTPS/domain, plugin SEO, schema, hiệu năng.
- Kế hoạch thứ tự làm và mục tiêu/tiêu chí nghiệm thu cho mỗi trang.

Chờ người dùng xem kế hoạch và chọn trang đầu tiên (hoặc đồng ý thứ tự đề xuất) trước khi chỉnh nội dung/SEO của trang.

## 4. Xử lý theo từng trang và dừng sau mỗi demo

Chỉ xử lý **một trang mỗi lượt**. Không sửa hàng loạt nhiều trang rồi mới trình bày.

Cho trang đang làm:

1. Ghi trạng thái ban đầu: URL, title/meta, canonical/robots, cấu trúc heading, schema, alt text, internal links, trạng thái chỉnh sửa và ảnh chụp màn hình tham chiếu.
2. Đề xuất các chỉnh sửa SEO cần thiết. Tách rõ thay đổi metadata/kỹ thuật và thay đổi nội dung hiển thị.
3. Giữ nguyên thiết kế theo Mục 1. Nếu cần sửa nội dung hiển thị, chỉ sửa phần đã xác định trong phạm vi được duyệt.
4. Cấu hình trường chỉnh sửa để khách cập nhật nội dung an toàn, nếu phần này nằm trong phạm vi trang. Không cho quyền sửa code/theme/plugin cho khách chỉ để họ sửa nội dung.
5. Kiểm tra trang trên XAMPP: URL/permalink, title/description, canonical, robots, H1 và heading, ảnh/alt, liên kết, schema hợp lệ khi có, nội dung render được, và giao diện trước/sau không đổi.
6. Với tối ưu tốc độ, đo hiện trạng và sau thay đổi bằng công cụ phù hợp. Chỉ giữ các thay đổi không làm giao diện/hoạt động khác đi; ghi rõ điều kiện và giới hạn của số đo local.
7. Demo trang đã xử lý bằng URL local và ảnh chụp/preview khi có thể. Báo thay đổi nào đã làm, kết quả kiểm tra, vấn đề còn lại và tiêu chí chưa thể xác nhận local.
8. **Dừng tại đây và chờ người dùng duyệt.** Không chuyển sang trang kế tiếp cho đến khi người dùng xác nhận tiếp tục hoặc yêu cầu chỉnh trang hiện tại.

Không coi việc người dùng im lặng là duyệt. Không gộp demo nhiều trang thành một lần.

## 5. Quy tắc SEO và Google

- Mỗi trang cần nội dung chính hữu ích, tiêu đề SEO riêng và mô tả phù hợp; không dùng một title/description giống nhau cho toàn site.
- Giữ slug rõ nghĩa và ổn định. Trước khi đổi slug đang có, lập phương án redirect 301 và rà liên kết nội bộ; không đổi URL chỉ để “có vẻ SEO hơn”.
- Kiểm tra mỗi trang có canonical đúng, không bị `noindex` ngoài ý muốn, không bị robots chặn, và có thể truy cập bằng URL công khai.
- Heading phải phản ánh cấu trúc nội dung, không dùng heading chỉ để tạo kiểu. Giữ thiết kế; nếu cấu trúc hiện tại cần thay đổi markup, đảm bảo hình ảnh giao diện không đổi.
- Viết alt mô tả đúng nội dung/chức năng của ảnh; ảnh trang trí dùng alt rỗng phù hợp. Không nhồi từ khóa.
- Dùng liên kết HTML crawlable, link nội bộ tới nội dung liên quan, trang lỗi 404 hữu ích, HTTPS và phiên bản domain chuẩn nhất quán.
- Không cài nhiều plugin để làm cùng một việc. Kiểm tra plugin/theme hiện có trước khi thêm plugin SEO, cache, schema hoặc redirect.
- Trên domain production: xác minh Google Search Console, gửi sitemap đúng, kiểm tra URL Inspection và báo cáo indexing. Gỡ mọi chế độ chặn index dùng cho staging/local khi production sẵn sàng.
- Phân biệt rõ “crawl được”, “đã được lập chỉ mục”, và “được xếp hạng”. Sitemap/request indexing chỉ là tín hiệu; không hứa Google index ngay hoặc đứng hạng cụ thể.

## 6. Tài khoản để khách chỉnh sửa

- Tạo tài khoản WordPress riêng cho khách; không chia sẻ tài khoản cá nhân của developer hoặc dùng chung một tài khoản Administrator.
- Mặc định dùng role **Editor** nếu khách cần tạo/sửa/xuất bản bài viết và trang. Chỉ cấp quyền cao hơn khi có nhu cầu cụ thể đã được người dùng xác nhận.
- Nếu khách chỉ cần sửa một số vùng cố định, cấu hình CMS để những vùng đó dễ sửa; không cấp quyền cài plugin, sửa theme hoặc quản lý user chỉ để thay text/ảnh.
- Kiểm tra bằng tài khoản/role của khách rằng họ có thể sửa đúng nội dung, không thể thay đổi phần kỹ thuật ngoài phạm vi, và nội dung đã publish hiển thị đúng.
- Tạo và bàn giao thông tin đăng nhập trong một mục riêng, rõ nhãn **TÀI KHOẢN KHÁCH**: URL đăng nhập, username, email gắn với user, role, mật khẩu tạm, phạm vi môi trường (local/staging/production), và bước đổi mật khẩu khi đăng nhập lần đầu.
- Không ghi mật khẩu thật vào repo, tài liệu rule, log, source code, commit hoặc file cấu hình được chia sẻ. Chỉ hiển thị mật khẩu tạm riêng trong phần bàn giao cho người dùng khi user được tạo; không tái sử dụng mật khẩu giữa các môi trường/tài khoản.
- Tài khoản tạo trên XAMPP chỉ tồn tại trong database local, không tự xuất hiện trên production. Ghi rõ điều này khi bàn giao; tạo lại user trên staging/production khi môi trường đó có sẵn và được cấp quyền phù hợp.
- Nếu chưa có email khách, không tự bịa email thật. Ghi rõ cần email nào để tạo account; tiếp tục các việc không phụ thuộc vào thông tin đó.

## 7. Tối ưu tốc độ trong giới hạn không đổi thiết kế

- Đo trang mẫu trước và sau bằng PageSpeed Insights (production/staging công khai) hoặc Lighthouse (local). Ghi thiết bị, URL, điểm số và Core Web Vitals có dữ liệu hay không.
- Ưu tiên nén/đổi định dạng ảnh mà vẫn giữ chất lượng và kích thước hiển thị; lazy-load ảnh dưới màn hình đầu; đặt width/height để tránh layout shift; giảm script/plugin/font thừa; dùng cache phù hợp.
- Không gỡ animation, ảnh hero, font thương hiệu, hay thay bố cục chỉ để tăng điểm. Báo trước nếu một tối ưu có thể làm thay đổi giao diện.
- Không kết luận số đo local tương đương số liệu người dùng thật. Đánh giá thực tế bằng dữ liệu field của Search Console/PageSpeed sau khi site production có đủ dữ liệu.

## 8. Bàn giao cho mỗi trang

Mỗi lần demo phải có:

- Tên trang và URL local.
- Tóm tắt thay đổi theo nhóm: SEO, khả năng chỉnh sửa, kỹ thuật/tốc độ.
- Xác nhận rõ thiết kế trước/sau có giữ nguyên hay không; nếu có sai khác, dừng và khôi phục/trao đổi.
- Các kiểm tra đã làm và kết quả; không tuyên bố đã test điều chưa chạy.
- Vấn đề cần input, phụ thuộc production, hoặc việc Google chưa thể xác nhận từ local.
- Phần tài khoản riêng nếu có tạo user; nêu môi trường và thông tin đăng nhập đúng Mục 6.
- Câu hỏi duyệt trang hiện tại trước khi tiếp tục trang kế tiếp.

## 9. Kết thúc toàn site

Sau khi từng trang đã được người dùng duyệt:

- Rà soát lại sitemap, robots, canonical, redirect, internal links và các trang trùng lặp ở cấp toàn site.
- Xác nhận môi trường production có thể crawl/index; xóa noindex/staging protection chỉ khi domain chính thức sẵn sàng công khai.
- Hoàn tất hướng dẫn ngắn cho khách: đăng nhập, sửa bài/trang, cập nhật ảnh/alt, preview, publish, và nơi yêu cầu hỗ trợ.
- Bàn giao tài khoản theo Mục 6 và ghi riêng việc gì cần thực hiện trên production.
- Báo rõ phần SEO nào đã cấu hình, phần nào cần nội dung/production hoặc thời gian để Google thu thập và lập chỉ mục.
