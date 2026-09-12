# SpeeGo Logistics --- Journey Process Section

## Mục tiêu

Thiết kế lại section **"Quy trình vận hành 8 bước"** thành một hành
trình logistics trực quan.

Không dùng giao diện tab 8 ô ngang như hiện tại.

Thay bằng:

-   Một tuyến hành trình chạy xuyên suốt section
-   8 checkpoint tương ứng 8 bước
-   Khi scroll, tuyến đường được animate dần
-   Bước đang xem trở thành active
-   Mỗi bước có hình ảnh / icon / mô tả ngắn
-   Cảm giác giống một shipment đang di chuyển qua toàn bộ chuỗi cung
    ứng

Phong cách:

-   US SaaS
-   Premium logistics
-   Clean
-   Corporate
-   Storytelling
-   Interactive journey

------------------------------------------------------------------------

## 1. Section Header

Background:

``` css
background: #F8FAFC;
```

Padding:

``` css
padding: 120px 0 140px;
```

Header căn giữa.

Eyebrow:

``` text
QUY TRÌNH CHUẨN HÓA
```

``` css
font-family: Inter, sans-serif;
font-size: 12px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #FF5A1F;
```

Heading:

``` text
Hành Trình 8 Bước
Từ Ý Tưởng Đến Giao Hàng
```

``` css
font-size: 48px;
line-height: 1.08;
font-weight: 800;
letter-spacing: -0.035em;
color: #071A2F;
max-width: 720px;
margin: 18px auto 0;
```

Subtitle:

``` text
Một quy trình xuyên suốt từ tìm nguồn hàng, kiểm soát sản xuất
đến vận chuyển và bàn giao tận nơi.
```

``` css
font-size: 17px;
line-height: 1.7;
color: #657587;
max-width: 680px;
margin: 22px auto 0;
```

------------------------------------------------------------------------

## 2. Journey Layout

Không dùng 8 tab.

Layout desktop theo dạng zig-zag, đường hành trình mềm và bo cong.

``` text
01 ●─────────╮
             │
             ╰────────● 02

                     ╭───────
03 ●─────────────────╯

   ╰────────────────● 04

05 ●─────────────────╮
                     ╰────● 06

07 ●────────────────────────● 08
```

Không dùng đường thẳng timeline nhàm chán.

------------------------------------------------------------------------

## 3. Main Journey Container

``` css
.journey {
  position: relative;
  max-width: 1240px;
  margin: 80px auto 0;
  padding: 40px 20px;
}
```

Mỗi step chiếm khoảng:

``` css
min-height: 340px;
```

Journey zig-zag trái / phải.

------------------------------------------------------------------------

## 4. Journey Route

Sử dụng SVG path.

Stroke mặc định:

``` css
stroke: #DCE5EC;
stroke-width: 3;
fill: none;
```

Active route:

``` css
stroke: #FF5A1F;
stroke-width: 3;
```

``` css
stroke-linecap: round;
stroke-linejoin: round;
```

Có thể thêm đường dash nhẹ cho phần chưa hoàn thành:

``` css
stroke-dasharray: 5 8;
```

Active path nên solid.

------------------------------------------------------------------------

## 5. Scroll Animation

Khi người dùng scroll:

``` text
Scroll xuống
↓
Đường màu cam chạy theo hành trình
↓
Đến checkpoint
↓
Checkpoint active
↓
Card nội dung xuất hiện
```

Có thể sử dụng:

``` js
strokeDasharray
strokeDashoffset
```

Hoặc Framer Motion:

``` js
useScroll()
useTransform()
```

Duration mỗi step:

``` text
400–600ms
```

Animation nhẹ, mượt, không gây chóng mặt.

------------------------------------------------------------------------

## 6. Checkpoint

Checkpoint thường:

``` css
width: 20px;
height: 20px;
border-radius: 50%;
background: #FFFFFF;
border: 3px solid #C8D3DE;
```

Active:

``` css
background: #FF5A1F;
border-color: #FF5A1F;
box-shadow: 0 0 0 7px rgba(255,90,31,0.12);
```

Completed:

``` css
background: #071A2F;
border-color: #071A2F;
```

------------------------------------------------------------------------

## 7. Step Number

``` text
STEP 01
```

``` css
font-size: 12px;
font-weight: 800;
letter-spacing: 0.12em;
color: #FF5A1F;
```

------------------------------------------------------------------------

## 8. Journey Card

``` css
.journey-card {
  width: 430px;
  padding: 30px;
  background: rgba(255,255,255,0.94);
  border: 1px solid #E3EAF0;
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(7,26,47,0.07);
}
```

Hover:

``` css
transform: translateY(-4px);
box-shadow: 0 24px 60px rgba(7,26,47,0.11);
```

Card gồm:

``` text
STEP 01

[ICON] Tiếp nhận thông tin

Tiếp nhận yêu cầu và phân tích
nhu cầu của doanh nghiệp.

✓ Khảo sát nhu cầu
✓ Xác định sản phẩm
✓ Xác định thị trường
```

------------------------------------------------------------------------

## 9. Step Icon

Dùng Lucide Icons.

  Step   Icon gợi ý
  ------ --------------------------
  01     ClipboardList
  02     MessagesSquare
  03     Search / Factory
  04     Settings / Factory
  05     BadgeCheck / SearchCheck
  06     FileCheck
  07     Ship / Plane / Truck
  08     PackageCheck / Handshake

Icon container:

``` css
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 12px;
background: #FFF1EA;
color: #FF5A1F;
```

Icon:

``` css
width: 22px;
height: 22px;
stroke-width: 1.8;
```

------------------------------------------------------------------------

## 10. Step Typography

Title:

``` css
font-family: Inter, sans-serif;
font-size: 25px;
font-weight: 750;
line-height: 1.25;
letter-spacing: -0.025em;
color: #071A2F;
```

Description:

``` css
font-size: 15px;
line-height: 1.7;
color: #637385;
```

Supporting points:

``` css
font-size: 13px;
font-weight: 500;
color: #263B50;
```

Check icon:

``` css
color: #16A36A;
```

------------------------------------------------------------------------

## 11. Visual Images

Không để mỗi step đều có ảnh lớn.

Chỉ dùng ảnh tại các milestone quan trọng:

-   Step 03 --- ảnh nhà máy / sourcing
-   Step 05 --- ảnh inspection / QC
-   Step 07 --- container ship / aircraft
-   Step 08 --- warehouse / fulfillment

Image:

``` css
width: 440px;
height: 280px;
object-fit: cover;
border-radius: 18px;
box-shadow: 0 20px 50px rgba(7,26,47,0.12);
```

------------------------------------------------------------------------

## 12. Alternating Layout

Step lẻ:

``` text
[CARD]        ●────── route
```

Step chẵn:

``` text
route ──────●        [CARD]
```

Ví dụ:

``` text
[ STEP 01 CARD ]
               ●
               │
               ╰───────────╮
                           ●
                  [ STEP 02 CARD ]

   ╭───────────────────────╯
   ●
[ STEP 03 CARD ]

   │
   ╰──────────────────────╮
                          ●
                 [ STEP 04 CARD ]
```

Mục tiêu là tạo cảm giác người dùng đang đi theo một hành trình, không
phải đọc một grid card.

------------------------------------------------------------------------

## 13. Logistics Moving Object

Thêm một visual nhỏ di chuyển theo SVG path.

Không dùng emoji.

Dùng SVG / Lucide icon:

-   Package
-   Container
-   Ship
-   Plane
-   Truck

Ví dụ theo từng giai đoạn:

``` text
Step 01 → 04 : Package
Step 05 → 06 : Container
Step 07      : Ship / Plane
Step 08      : Truck
```

Style:

``` css
width: 34px;
height: 34px;
background: #071A2F;
border-radius: 10px;
color: #FFFFFF;
box-shadow: 0 8px 20px rgba(7,26,47,0.18);
```

Object di chuyển theo scroll progress.

------------------------------------------------------------------------

## 14. Background Decorative Elements

Có thể thêm dotted world map rất mờ:

``` css
opacity: 0.035;
```

Có thể thêm các từ khóa trang trí:

``` text
SOURCE
INSPECT
SHIP
DELIVER
```

Opacity:

``` css
opacity: 0.12;
```

Không để decoration tranh sự chú ý với journey.

------------------------------------------------------------------------

# Nội dung 8 bước

## 01 --- Tiếp nhận thông tin

Tiếp nhận yêu cầu và phân tích nhu cầu của doanh nghiệp.

-   Xác định nhu cầu
-   Phân tích sản phẩm
-   Xác định mục tiêu và ngân sách

## 02 --- Tư vấn giải pháp

Đề xuất phương án tối ưu về nguồn hàng, chi phí và thời gian.

-   Phân tích phương án
-   Tối ưu chi phí
-   Xây dựng timeline

## 03 --- Tìm nguồn hàng & nhà máy

Tìm nhà cung cấp phù hợp, đánh giá năng lực, đàm phán giá và MOQ.

-   Supplier sourcing
-   Đánh giá nhà máy
-   Deal giá & MOQ

## 04 --- Giám sát sản xuất

Theo dõi tiến độ, kiểm soát kế hoạch sản xuất và xử lý các phát sinh.

-   Theo dõi tiến độ
-   Kiểm soát timeline
-   Báo cáo tình trạng sản xuất

## 05 --- Kiểm tra chất lượng

Kiểm tra sản phẩm trước khi đóng gói và xuất xưởng.

-   Product inspection
-   Kiểm tra số lượng
-   Kiểm tra tiêu chuẩn chất lượng

## 06 --- Thông quan & chứng từ

Chuẩn bị hồ sơ, khai báo hải quan và xử lý thủ tục xuất nhập khẩu.

-   Hồ sơ xuất nhập khẩu
-   Khai báo hải quan
-   Kiểm tra chứng từ

## 07 --- Vận chuyển quốc tế

Vận chuyển bằng đường biển, hàng không hoặc đa phương thức.

-   Sea Freight
-   Air Freight
-   Theo dõi vận chuyển

## 08 --- Bàn giao & hoàn tất

Giao hàng tận nơi, hoàn tất hồ sơ và tiếp tục hỗ trợ sau giao hàng.

-   Door-to-door
-   Bàn giao & POD
-   Hỗ trợ sau giao hàng

------------------------------------------------------------------------

## 15. Last Step --- Destination

Step 08 phải có visual khác biệt.

Checkpoint:

``` css
width: 56px;
height: 56px;
background: #FF5A1F;
border-radius: 50%;
```

Icon:

``` text
Check
```

màu trắng.

Status label:

``` text
DELIVERED
```

``` css
background: #EAF8F1;
color: #16845B;
padding: 7px 12px;
border-radius: 999px;
font-size: 11px;
font-weight: 700;
```

------------------------------------------------------------------------

## 16. CTA Cuối Journey

Sau Step 08:

``` text
Sẵn sàng bắt đầu hành trình cùng SpeeGo?
```

Primary CTA:

``` text
Nhận tư vấn miễn phí →
```

Secondary CTA:

``` text
Xem dịch vụ
```

Container:

``` css
margin-top: 100px;
text-align: center;
```

Heading:

``` css
font-size: 36px;
font-weight: 800;
color: #071A2F;
```

------------------------------------------------------------------------

## 17. Mobile

Mobile không dùng zig-zag.

Chuyển thành timeline dọc:

``` text
● 01
│
│  Tiếp nhận thông tin
│  Description
│
● 02
│
│  Tư vấn giải pháp
│
● 03
│
│  Tìm nguồn hàng
│
...
│
◎ 08
   Hoàn tất
```

Rail:

``` css
left: 18px;
```

Cards:

``` css
margin-left: 50px;
width: auto;
```

Title:

``` css
font-size: 21px;
```

Section heading:

``` css
font-size: 36px;
```

------------------------------------------------------------------------

## 18. Color System

``` css
:root {
  --navy-950: #071A2F;
  --navy-900: #0B1F36;

  --orange-500: #FF5A1F;
  --orange-600: #F4511E;

  --text-primary: #071A2F;
  --text-secondary: #637385;

  --surface: #FFFFFF;
  --surface-soft: #F8FAFC;

  --border: #E3EAF0;
  --route-inactive: #DCE5EC;

  --success: #16A36A;
}
```

------------------------------------------------------------------------

## 19. Font

Font chính:

``` css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Ưu tiên: **Inter**.

------------------------------------------------------------------------

## 20. Desktop Visual Target

``` text
                    01 ●
                 TIẾP NHẬN
                       ╲
                        ╲
                         ● 02
                         TƯ VẤN
                           ╲
                            ╲

              03 ●──────────╯
        TÌM NGUỒN & DEAL

                  ╲
                   ╲
                    ● 04
                    GIÁM SÁT SX

         05 ●──────╯
        KIỂM TRA QC

               ╲
                ╲
                 ● 06
                 THÔNG QUAN

        07 ●──────╯
       VẬN CHUYỂN
                     ╲
                      ╲
                       ◎ 08
                       HOÀN TẤT
```

------------------------------------------------------------------------

# Yêu cầu quan trọng cho AI Code

Không tạo cảm giác:

> "8 bước được đặt thành 8 card."

Phải tạo cảm giác:

> "Một lô hàng đang thực sự di chuyển qua 8 chặng."

Section nên dài khoảng **2--2.5 màn hình desktop**.

Khi người dùng scroll:

1.  SVG journey path được vẽ dần bằng màu cam.
2.  Checkpoint hiện tại chuyển sang active.
3.  Checkpoint trước đó chuyển sang completed.
4.  Card tương ứng fade + slide vào.
5.  Logistics icon di chuyển theo route.
6.  Step 08 kết thúc bằng trạng thái `DELIVERED`.
7.  Animation phải hỗ trợ `prefers-reduced-motion`.

## Tech Recommendation

Nếu project dùng React / Next.js:

-   React / Next.js
-   Tailwind CSS hoặc CSS Modules
-   Framer Motion cho scroll progress
-   SVG path cho journey route
-   Lucide React cho icon
-   Intersection Observer cho active checkpoint

Không hard-code animation theo pixel scroll tuyệt đối nếu có thể; tính
progress dựa trên vị trí section để responsive ổn định.
