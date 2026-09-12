/**
 * SpeeGo Logistics - Core Interactive Engine
 * Handles Multi-language (EN / VI / ES), Hero 3-Tab Console, 8-Step Interactive Process, and Google Sheets Form
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MULTI-LANGUAGE TRANSLATION DICTIONARY (EN [Default], VI, ES)
  // =========================================================================
  const i18nData = {
    en: {
      // Nav
      nav_home: 'Home',
      nav_about: 'About Us',
      nav_services: 'Services',
      nav_process: '8-Step Process',
      nav_why: 'Why SpeeGo',
      nav_partners: 'Partners',
      nav_news: 'News',
      nav_contact: 'Contact',
      nav_quote_btn: 'Get Quote',

      // Hero (Spec from Image 2)
      hero_subheading: 'GLOBAL LOGISTICS PARTNER',
      hero_title_row1: 'From Sourcing',
      hero_title_row2_to: 'to',
      hero_title_row2_highlight: 'Global Delivery',
      hero_desc_main: 'We help businesses source, inspect, ship and fulfil with confidence — faster, safer and more cost-effective.',
      hero_btn_quote: 'Get a Quote',
      hero_btn_call: '(+84) 906 828 898',
      stat_partners: 'Global Partners',
      stat_delivery: 'On-time Delivery',
      stat_countries: 'Countries Covered',
      hero_scroll_explore: 'SCROLL TO EXPLORE',
      hero_trust_label: 'TRUSTED BY GROWING BUSINESSES',
      hero_trust_more: 'AND MANY MORE',

      // Hero legacy compat
      hero_badge: 'GLOBAL LOGISTICS PARTNER',
      hero_title_prefix: 'From Sourcing to',
      hero_title_highlight: 'Global Delivery',
      hero_desc: 'We help businesses source, inspect, ship and fulfil with confidence — faster, safer and more cost-effective.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Request Consultation',
      hero_cta_quote: 'Get a Quote',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'Introduction',
      tab_form: 'Consultation',
      tab_tracking: 'Tracking',
      tab_quote: 'Quick Quote',
      tab_knowledge: 'Logistics Hub',

      intro_lead: 'SpeeGo Logistics connects factories in Vietnam &amp; China to buyers in the US, Canada, and Australia — end to end.',
      intro_b1: 'Sourcing, MOQ negotiation &amp; on-site QC',
      intro_b2: 'Ocean FCL/LCL &amp; air freight with live OMS tracking',
      intro_b3: 'Customs clearance &amp; destination fulfillment',
      intro_b4: 'Transparent quotes — zero hidden surcharges',
      intro_cta: 'Learn more about SpeeGo',

      quote_origin_lbl: 'Origin Port / Country',
      quote_dest_lbl: 'Destination Country',
      quote_mode_lbl: 'Shipping Mode',
      quote_weight_lbl: 'Cargo Weight / Volume',
      quote_btn: 'Calculate & Get Quote',

      track_placeholder: 'Enter Container, B/L, or OMS Tracking Number (e.g. SPG-8921)',
      track_btn: 'Track Now',
      track_searching: 'Locating shipment journey…',
      track_success: 'Shipment journey loaded. View each milestone below.',
      track_modal_title: 'Shipment Journey',
      track_modal_open_ups: 'Open on UPS',
      track_modal_loading: 'Building shipment route…',
      track_modal_powered: 'SpeeGo OMS Journey · Linked with UPS',
      track_modal_code_label: 'Tracking No.',
      track_label_status: 'Status',
      track_label_origin: 'Origin',
      track_label_dest: 'Destination',
      track_label_eta: 'ETA',
      track_label_carrier: 'Carrier',
      track_label_route: 'Route timeline',
      track_status_transit: 'In Transit',
      track_origin: 'Ho Chi Minh City, Vietnam',
      track_dest: 'Los Angeles, CA, USA',
      track_carrier: 'SpeeGo OMS · UPS Last Mile',
      track_ev1_title: 'Order created',
      track_ev1_loc: 'SpeeGo OMS — Vietnam HQ',
      track_ev1_detail: 'Booking confirmed. Shipping documents generated.',
      track_ev2_title: 'Picked up at factory',
      track_ev2_loc: 'Binh Duong Industrial Park, VN',
      track_ev2_detail: 'Cargo collected and sealed. QC checklist attached.',
      track_ev3_title: 'Arrived at export warehouse',
      track_ev3_loc: 'Cat Lai Logistics Hub, HCMC',
      track_ev3_detail: 'Received, weighed, and staged for international departure.',
      track_ev4_title: 'Export customs cleared',
      track_ev4_loc: 'Cat Lai Customs, Vietnam',
      track_ev4_detail: 'Export declaration approved. Container released.',
      track_ev5_title: 'Departed origin port',
      track_ev5_loc: 'Port of Ho Chi Minh (VNSGN)',
      track_ev5_detail: 'Vessel departed. Ocean transit to US West Coast.',
      track_ev6_title: 'In transit — Pacific Ocean',
      track_ev6_loc: 'En route to POLA',
      track_ev6_detail: 'Shipment moving on schedule. Live vessel tracking active.',
      track_ev7_title: 'Arrived destination hub',
      track_ev7_loc: 'Port of Los Angeles, CA',
      track_ev7_detail: 'Import arrival notice issued. Awaiting discharge.',
      track_ev8_title: 'Out for delivery',
      track_ev8_loc: 'UPS Metro LA Facility',
      track_ev8_detail: 'Last-mile handoff to UPS. Delivery window confirmed.',
      track_ev9_title: 'Delivered',
      track_ev9_loc: 'Consignee address, Los Angeles',
      track_ev9_detail: 'Proof of delivery available. Journey completed.',

      knowledge_chip1: 'Incoterms 2020 Guide',
      knowledge_chip2: 'US Import Customs & FDA',
      knowledge_chip3: 'Cosmetics & Nail Compliance',
      knowledge_chip4: 'FCL vs LCL Cost Calculator',
      knowledge_chip5: 'Amazon FBA Prep Rules',

      // About
      about_tag: 'About SpeeGo Logistics',
      about_title: 'ABOUT US',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> pioneers multi-industry manufacturing and global logistics services, connecting production – shipping – distribution so businesses can expand into new markets.',
      about_desc2: 'From verified supplier matching and MOQ price negotiation to stringent on-site QC inspection, customs clearance, and omnichannel fulfillment, we empower businesses to scale globally with transparency and zero hidden costs.',
      about_btn: 'Learn more',
      about_badge_text: 'Global Trade Lanes Active',

      // 4 Services
      services_tag: 'Our Capabilities',
      services_title: '<span class="speego-accent-num">4</span> Core Services of SpeeGo',
      services_subtitle: 'Comprehensive supply chain solutions tailored for import-export and e-commerce businesses.',
      services_slogan: 'Your Cargo Our Commitment',

      srv1_title: 'Sourcing & QC',
      srv1_desc: 'Support in finding reputable suppliers, evaluating capabilities, and inspecting product quality before shipment to reduce supply chain risk.',
      srv2_title: 'International Logistics',
      srv2_desc: 'International ocean and air freight solutions with flexible schedules, optimized costs, and transparent tracking.',
      srv3_title: 'Modern Fulfillment',
      srv3_desc: 'Warehousing, order processing, packing, and fast delivery to optimize operations and improve the customer experience.',
      srv4_title: 'Import & Export Customs',
      srv4_desc: 'Advisory on procedures, documentation, customs declarations, and import-export workflows for compliant, smooth cargo movement.',
      srv_learn_more: 'View details',
      srv_feat1_title: 'Safe',
      srv_feat1_desc: 'Cargo always protected',
      srv_feat2_title: 'On time',
      srv_feat2_desc: 'Schedule commitment',
      srv_feat3_title: 'Cost optimized',
      srv_feat3_desc: 'Competitive advantage',
      srv_feat4_title: 'Long-term partnership',
      srv_feat4_desc: 'For your business growth',

      // 8-Step Process Tabs
      process_tag: 'STANDARDIZED PROCESS',
      process_title: '8-Step Operating Process',
      process_subtitle: 'Transparent at every stage — from idea to goods arriving at your warehouse.',
      step_btn1: 'Intake',
      step_btn2: 'Consult',
      step_btn3: 'Sourcing',
      step_btn4: 'Production',
      step_btn5: 'QC Check',
      step_btn6: 'Documents',
      step_btn7: 'Freight',
      step_btn8: 'Complete',
      j_s1_title: 'Requirement intake',
      j_s1_desc: 'Capture your request and analyze business needs.',
      j_s1_p1: 'Define requirements',
      j_s1_p2: 'Product analysis',
      j_s1_p3: 'Goals and budget alignment',
      j_s2_title: 'Solution consulting',
      j_s2_desc: 'Recommend the optimal plan for sourcing, cost, and timeline.',
      j_s2_p1: 'Option analysis',
      j_s2_p2: 'Cost optimization',
      j_s2_p3: 'Timeline planning',
      j_s3_title: 'Sourcing & factories',
      j_s3_desc: 'Find the right suppliers, evaluate capacity, negotiate price and MOQ.',
      j_s3_p1: 'Supplier sourcing',
      j_s3_p2: 'Factory evaluation',
      j_s3_p3: 'Price & MOQ deal',
      j_s4_title: 'Production supervision',
      j_s4_desc: 'Track progress, control the production plan, and resolve issues early.',
      j_s4_p1: 'Progress tracking',
      j_s4_p2: 'Timeline control',
      j_s4_p3: 'Production status reports',
      j_s5_title: 'Quality inspection',
      j_s5_desc: 'Inspect products before packing and factory release.',
      j_s5_p1: 'Product inspection',
      j_s5_p2: 'Quantity verification',
      j_s5_p3: 'Quality standard checks',
      j_s6_title: 'Customs & documents',
      j_s6_desc: 'Prepare dossiers, file customs declarations, and clear import/export procedures.',
      j_s6_p1: 'Import/export paperwork',
      j_s6_p2: 'Customs declaration',
      j_s6_p3: 'Document verification',
      j_s7_title: 'International freight',
      j_s7_desc: 'Move cargo by ocean, air, or multimodal transport.',
      j_s7_p1: 'Sea Freight',
      j_s7_p2: 'Air Freight',
      j_s7_p3: 'Shipment tracking',
      j_s8_title: 'Handover & completion',
      j_s8_desc: 'Deliver to destination, complete documents, and support after delivery.',
      j_s8_p1: 'Door-to-door',
      j_s8_p2: 'Handover & POD',
      j_s8_p3: 'After-delivery support',
      j_delivered: 'DELIVERED',
      j_cta_title: 'Ready to start your journey with SpeeGo?',
      j_cta_primary: 'Get a free consultation →',
      j_cta_secondary: 'View services',

      // Why Choose SpeeGo (6 Pillars)
      why_tag: 'Why Choose SpeeGo',
      why_title: 'WHY CHOOSE SPEEGO LOGISTICS',
      why_subtitle: 'Transparent value, synchronized infrastructure, and a dedicated expert team.',
      why1_title: 'Multi-industry supply chain',
      why1_desc: 'Meeting every manufacturing and international shipping need. Strongest in cosmetics, nail accessories, furniture, and more.',
      why2_title: 'Factory network across China & Vietnam',
      why2_desc: 'Partner factories and workshops across China and Vietnam — price deals and MOQs matched to your business.',
      why3_title: 'Diverse shipping modes',
      why3_desc: 'FCL and LCL via air and ocean from Vietnam and China to the US, Australia, and Canada.',
      why4_title: 'No hidden costs',
      why4_desc: 'SpeeGo Logistics provides itemized quotes with a 100% commitment — no surprise fees.',
      why5_title: 'Fast support team',
      why5_desc: 'Experienced specialists ready to advise, update shipment status, and resolve issues quickly.',
      why6_title: 'Integrated OMS tracking',
      why6_desc: 'Track order status in real time — fast, convenient, and accurate.',

      // Consultation Form
      form_tag: 'Start Your Journey',
      form_title: 'Request a Free Consultation & Quote',
      form_subtitle: 'Tell us your cargo requirements. Our logistics engineers will respond within 2 business hours.',
      form_name_lbl: 'Full Name *',
      form_phone_lbl: 'Phone / Zalo / WhatsApp *',
      form_email_lbl: 'Business Email *',
      form_company_lbl: 'Company / Brand Name',
      form_service_lbl: 'Primary Service Needed *',
      form_route_lbl: 'Trade Lane / Route *',
      form_msg_lbl: 'Cargo Details / Requirements *',
      form_submit_btn: 'Send Consultation Request',
      form_name_ph: 'Your full name',
      form_msg_ph: 'Product type, volume, destination...',

      // Partners & Testimonials & News
      partner_tag: 'Strategic Alliances',
      partner_title: 'Trusted Global Shipping Lines & Airline Partners',
      partner_subtitle: 'SpeeGo Logistics proudly partners directly with premier international ocean carriers, cargo airlines, and global logistics networks.',
      testi_tag: 'Testimonials',
      testi_title: 'What Global Business Leaders Say',
      news_tag: 'Market Intelligence',
      news_title: 'Latest Logistics & Trade Insights'
    },

    vi: {
      // Nav
      nav_home: 'Trang chủ',
      nav_about: 'Về SpeeGo',
      nav_services: 'Dịch vụ',
      nav_process: 'Quy trình 8 bước',
      nav_why: 'Vì sao chọn SpeeGo',
      nav_partners: 'Đối tác',
      nav_news: 'Tin tức',
      nav_contact: 'Liên hệ',
      nav_quote_btn: 'Nhận báo giá',

      // Hero (Spec from Image 2)
      hero_subheading: 'ĐỐI TÁC LOGISTICS TOÀN CẦU',
      hero_title_row1: 'Từ Tìm Nguồn Hàng',
      hero_title_row2_to: 'Đến',
      hero_title_row2_highlight: 'Giao Hàng Toàn Cầu',
      hero_desc_main: 'Chúng tôi giúp doanh nghiệp tìm nguồn cung, kiểm định chất lượng, vận chuyển và hoàn tất đơn hàng với sự an tâm tuyệt đối — nhanh hơn, an toàn hơn và tối ưu chi phí hơn.',
      hero_btn_quote: 'Nhận Báo Giá',
      hero_btn_call: '(+84) 906 828 898',
      stat_partners: 'Đối Tác Toàn Cầu',
      stat_delivery: 'Giao Hàng Đúng Hạn',
      stat_countries: 'Quốc Gia Phủ Sóng',
      hero_scroll_explore: 'CUỘN ĐỂ KHÁM PHÁ',
      hero_trust_label: 'ĐƯỢC TIN CHỌN BỞI CÁC DOANH NGHIỆP PHÁT TRIỂN',
      hero_trust_more: 'VÀ NHIỀU ĐỐI TÁC KHÁC',

      // Hero legacy compat
      hero_badge: 'ĐỐI TÁC LOGISTICS TOÀN CẦU',
      hero_title_prefix: 'Từ Tìm Nguồn Hàng Đến',
      hero_title_highlight: 'Giao Hàng Toàn Cầu',
      hero_desc: 'Dịch vụ tìm nguồn hàng, đàm phán nhà máy, kiểm định chất lượng QC, vận chuyển quốc tế và fulfillment trọn gói kết nối Việt Nam & Trung Quốc đi Mỹ, Úc, Canada.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Nhận tư vấn miễn phí',
      hero_cta_quote: 'Báo giá chi tiết',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'Giới thiệu',
      tab_form: 'Form nhập',
      tab_tracking: 'Tracking',
      tab_quote: 'Form Báo Giá Nhanh',
      tab_knowledge: 'Cẩm Nang Logistics',

      intro_lead: 'SpeeGo Logistics kết nối nhà máy Việt Nam &amp; Trung Quốc tới người mua tại Mỹ, Canada và Úc — trọn chuỗi.',
      intro_b1: 'Tìm nguồn, đàm phán MOQ &amp; QC tại xưởng',
      intro_b2: 'FCL/LCL đường biển &amp; hàng không kèm OMS realtime',
      intro_b3: 'Hải quan &amp; fulfillment tại điểm đến',
      intro_b4: 'Báo giá minh bạch — không phụ phí ẩn',
      intro_cta: 'Tìm hiểu thêm về SpeeGo',

      quote_origin_lbl: 'Cảng / Điểm xuất phát',
      quote_dest_lbl: 'Quốc gia đến',
      quote_mode_lbl: 'Phương thức vận chuyển',
      quote_weight_lbl: 'Trọng lượng / Thể tích (CBM)',
      quote_btn: 'Ước tính & Lấy báo giá',

      track_placeholder: 'Nhập số Container, B/L hoặc Mã vận đơn OMS (Ví dụ: SPG-8921)',
      track_btn: 'Tra cứu ngay',
      track_searching: 'Đang dựng lộ trình vận đơn…',
      track_success: 'Đã tải lộ trình. Xem từng mốc thời gian bên dưới.',
      track_modal_title: 'Lộ trình vận đơn',
      track_modal_open_ups: 'Mở trên UPS',
      track_modal_loading: 'Đang dựng lộ trình SpeeGo…',
      track_modal_powered: 'Lộ trình SpeeGo OMS · Liên kết UPS',
      track_modal_code_label: 'Mã vận đơn',
      track_label_status: 'Trạng thái',
      track_label_origin: 'Điểm đi',
      track_label_dest: 'Điểm đến',
      track_label_eta: 'Dự kiến',
      track_label_carrier: 'Đơn vị',
      track_label_route: 'Lộ trình theo thời điểm',
      track_status_transit: 'Đang vận chuyển',
      track_origin: 'TP. Hồ Chí Minh, Việt Nam',
      track_dest: 'Los Angeles, CA, Hoa Kỳ',
      track_carrier: 'SpeeGo OMS · UPS Last Mile',
      track_ev1_title: 'Tạo đơn hàng',
      track_ev1_loc: 'SpeeGo OMS — Vietnam HQ',
      track_ev1_detail: 'Xác nhận booking. Đã tạo bộ chứng từ vận chuyển.',
      track_ev2_title: 'Lấy hàng tại nhà máy',
      track_ev2_loc: 'KCN Bình Dương, Việt Nam',
      track_ev2_detail: 'Thu gom và niêm phong hàng. Đính kèm checklist QC.',
      track_ev3_title: 'Về kho xuất khẩu',
      track_ev3_loc: 'Hub Logistics Cát Lái, TP.HCM',
      track_ev3_detail: 'Nhập kho, cân đo và xếp chờ xuất cảnh.',
      track_ev4_title: 'Thông quan xuất khẩu',
      track_ev4_loc: 'Hải quan Cát Lái, Việt Nam',
      track_ev4_detail: 'Tờ khai xuất được duyệt. Container được giải phóng.',
      track_ev5_title: 'Rời cảng đi',
      track_ev5_loc: 'Cảng TP.HCM (VNSGN)',
      track_ev5_detail: 'Tàu khởi hành. Hành trình biển tới bờ Tây Mỹ.',
      track_ev6_title: 'Đang trên biển — Thái Bình Dương',
      track_ev6_loc: 'Trên đường tới POLA',
      track_ev6_detail: 'Đúng lịch trình. Theo dõi tàu thời gian thực.',
      track_ev7_title: 'Đến hub đích',
      track_ev7_loc: 'Cảng Los Angeles, CA',
      track_ev7_detail: 'Thông báo nhập khẩu. Chờ dỡ hàng.',
      track_ev8_title: 'Đang giao last-mile',
      track_ev8_loc: 'Kho UPS Metro LA',
      track_ev8_detail: 'Bàn giao UPS. Đã xác nhận khung giờ giao.',
      track_ev9_title: 'Đã giao hàng',
      track_ev9_loc: 'Địa chỉ người nhận, Los Angeles',
      track_ev9_detail: 'Có biên bản giao hàng. Hoàn tất lộ trình.',

      knowledge_chip1: 'Cẩm nang Incoterms 2020',
      knowledge_chip2: 'Thủ tục hải quan & FDA Mỹ',
      knowledge_chip3: 'Quy định hàng mỹ phẩm & nails',
      knowledge_chip4: 'Công thức tính cước FCL vs LCL',
      knowledge_chip5: 'Tiêu chuẩn dán nhãn Amazon FBA',

      // About
      about_tag: 'Về SpeeGo Logistics',
      about_title: 'VỀ CHÚNG TÔI',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> tiên phong trong sản xuất đa lĩnh vực và cung ứng dịch vụ logistics toàn cầu, mang sứ mệnh kết nối chuỗi giá trị sản xuất – vận chuyển – phân phối, giúp doanh nghiệp mở rộng thị trường kinh doanh',
      about_desc2: 'Từ việc thẩm định nhà xưởng uy tín, hỗ trợ deal giá và MOQ tốt nhất đến kiểm tra chất lượng tại chỗ (QC), hoàn tất chứng từ hải quan và fulfillment kho bãi, chúng tôi giúp doanh nghiệp tối ưu chi phí và tăng trưởng bền vững.',
      about_btn: 'Tìm hiểu thêm',
      about_badge_text: 'Tuyến vận tải quốc tế trực tiếp',

      // 4 Services
      services_tag: 'Năng lực cốt lõi',
      services_title: '<span class="speego-accent-num">4</span> Dịch Vụ Trọng Tâm Của SpeeGo',
      services_subtitle: 'Giải pháp chuỗi cung ứng toàn diện được thiết kế riêng cho các doanh nghiệp xuất nhập khẩu và e-commerce.',
      services_slogan: 'Your Cargo Our Commitment',

      srv1_title: 'Sourcing & QC',
      srv1_desc: 'Hỗ trợ tìm kiếm nhà cung cấp uy tín, đánh giá năng lực và kiểm tra chất lượng sản phẩm trước khi xuất hàng, giúp giảm rủi ro trong chuỗi cung ứng.',
      srv2_title: 'Logistics Quốc Tế',
      srv2_desc: 'Cung cấp giải pháp vận chuyển quốc tế bằng đường biển, đường hàng không với lịch trình linh hoạt, chi phí tối ưu và theo dõi minh bạch.',
      srv3_title: 'Fulfillment Hiện Đại',
      srv3_desc: 'Quản lý lưu kho, xử lý đơn hàng, đóng gói và giao hàng nhanh chóng, giúp doanh nghiệp tối ưu vận hành và nâng cao trải nghiệm khách hàng.',
      srv4_title: 'Xuất Nhập Khẩu & Hải Quan',
      srv4_desc: 'Hỗ trợ tư vấn thủ tục, chứng từ, khai báo hải quan và các quy trình xuất nhập khẩu, giúp hàng hóa lưu thông thuận lợi và tuân thủ quy định.',
      srv_learn_more: 'Xem chi tiết',
      srv_feat1_title: 'An toàn',
      srv_feat1_desc: 'Hàng hóa luôn được bảo vệ',
      srv_feat2_title: 'Đúng thời gian',
      srv_feat2_desc: 'Cam kết tiến độ',
      srv_feat3_title: 'Tối ưu chi phí',
      srv_feat3_desc: 'Gia tăng lợi thế',
      srv_feat4_title: 'Đồng hành lâu dài',
      srv_feat4_desc: 'Vì sự phát triển của doanh nghiệp',

      // 8-Step Process Tabs
      process_tag: 'QUY TRÌNH CHUẨN HÓA',
      process_title: 'Quy Trình Vận Hành 8 Bước',
      process_subtitle: 'Minh bạch từng giai đoạn, đồng hành cùng quý doanh nghiệp từ ý tưởng đến khi hàng hóa vào tận kho.',
      step_btn1: 'Tiếp nhận',
      step_btn2: 'Tư vấn',
      step_btn3: 'Tìm nguồn',
      step_btn4: 'Giám sát',
      step_btn5: 'Kiểm tra QC',
      step_btn6: 'Chứng từ',
      step_btn7: 'Vận chuyển',
      step_btn8: 'Hoàn tất',
      j_s1_title: 'Tiếp nhận thông tin',
      j_s1_desc: 'Tiếp nhận yêu cầu và phân tích nhu cầu của doanh nghiệp.',
      j_s1_p1: 'Xác định nhu cầu',
      j_s1_p2: 'Phân tích sản phẩm',
      j_s1_p3: 'Xác định mục tiêu và ngân sách',
      j_s2_title: 'Tư vấn giải pháp',
      j_s2_desc: 'Đề xuất phương án tối ưu về nguồn hàng, chi phí và thời gian.',
      j_s2_p1: 'Phân tích phương án',
      j_s2_p2: 'Tối ưu chi phí',
      j_s2_p3: 'Xây dựng timeline',
      j_s3_title: 'Tìm nguồn hàng & nhà máy',
      j_s3_desc: 'Tìm nhà cung cấp phù hợp, đánh giá năng lực, đàm phán giá và MOQ.',
      j_s3_p1: 'Supplier sourcing',
      j_s3_p2: 'Đánh giá nhà máy',
      j_s3_p3: 'Deal giá & MOQ',
      j_s4_title: 'Giám sát sản xuất',
      j_s4_desc: 'Theo dõi tiến độ, kiểm soát kế hoạch sản xuất và xử lý các phát sinh.',
      j_s4_p1: 'Theo dõi tiến độ',
      j_s4_p2: 'Kiểm soát timeline',
      j_s4_p3: 'Báo cáo tình trạng sản xuất',
      j_s5_title: 'Kiểm tra chất lượng',
      j_s5_desc: 'Kiểm tra sản phẩm trước khi đóng gói và xuất xưởng.',
      j_s5_p1: 'Product inspection',
      j_s5_p2: 'Kiểm tra số lượng',
      j_s5_p3: 'Kiểm tra tiêu chuẩn chất lượng',
      j_s6_title: 'Thông quan & chứng từ',
      j_s6_desc: 'Chuẩn bị hồ sơ, khai báo hải quan và xử lý thủ tục xuất nhập khẩu.',
      j_s6_p1: 'Hồ sơ xuất nhập khẩu',
      j_s6_p2: 'Khai báo hải quan',
      j_s6_p3: 'Kiểm tra chứng từ',
      j_s7_title: 'Vận chuyển quốc tế',
      j_s7_desc: 'Vận chuyển bằng đường biển, hàng không hoặc đa phương thức.',
      j_s7_p1: 'Sea Freight',
      j_s7_p2: 'Air Freight',
      j_s7_p3: 'Theo dõi vận chuyển',
      j_s8_title: 'Bàn giao & hoàn tất',
      j_s8_desc: 'Giao hàng tận nơi, hoàn tất hồ sơ và tiếp tục hỗ trợ sau giao hàng.',
      j_s8_p1: 'Door-to-door',
      j_s8_p2: 'Bàn giao & POD',
      j_s8_p3: 'Hỗ trợ sau giao hàng',
      j_delivered: 'DELIVERED',
      j_cta_title: 'Sẵn sàng bắt đầu hành trình cùng SpeeGo?',
      j_cta_primary: 'Nhận tư vấn miễn phí →',
      j_cta_secondary: 'Xem dịch vụ',

      // Why Choose SpeeGo (6 Pillars)
      why_tag: 'Lợi thế vượt trội',
      why_title: 'TẠI SAO NÊN CHỌN SPEEGO LOGISTICS',
      why_subtitle: 'Cam kết giá trị minh bạch, hạ tầng đồng bộ và đội ngũ chuyên gia tận tâm.',
      why1_title: 'Chuỗi cung ứng đa lĩnh vực',
      why1_desc: 'Đáp ứng mọi nhu cầu sản xuất và vận chuyển quốc tế cho doanh nghiệp của bạn. Nổi bật nhất trong sản xuất mỹ phẩm, phụ kiện nails, nội thất...',
      why2_title: 'Mạng lưới nhà máy rộng khắp TQ, VN',
      why2_desc: 'Hệ thống đối tác, nhà máy, xưởng sản xuất trên toàn Trung Quốc, Việt Nam, hỗ trợ deal giá, MOQ phù hợp với nhu cầu doanh nghiệp của bạn.',
      why3_title: 'Đa dạng phương thức vận chuyển',
      why3_desc: 'Hỗ trợ FCL, LCL theo phương thức vận chuyển đường hàng không, đường biển tuyến Việt Nam và Trung Quốc đi Mỹ, Úc, Canada.',
      why4_title: 'Cam kết không chi phí ẩn',
      why4_desc: 'SpeeGo Logistics báo giá chi tiết từng hạng mục, cam kết 100% không phát sinh bất kỳ chi phí ẩn nào khác.',
      why5_title: 'Đội ngũ hỗ trợ nhanh chóng',
      why5_desc: 'Đội ngũ chuyên viên giàu kinh nghiệm luôn sẵn sàng tư vấn, cập nhật tình trạng lô hàng và hỗ trợ xử lý các vấn đề phát sinh kịp thời.',
      why6_title: 'Tracking bằng hệ thống quản lý OMS tích hợp',
      why6_desc: 'Có thể tracking tình trạng đơn hàng theo thời gian thực một cách nhanh chóng, thuận tiện và chính xác.',

      // Consultation Form
      form_tag: 'Đăng ký tư vấn',
      form_title: 'Form Tư Vấn Dịch Vụ & Nhận Báo Giá',
      form_subtitle: 'Gửi yêu cầu của bạn để chuyên viên SpeeGo liên hệ phản hồi phương án tối ưu trong vòng 2 giờ.',
      form_name_lbl: 'Họ và tên *',
      form_phone_lbl: 'SĐT / Zalo / WhatsApp *',
      form_email_lbl: 'Email doanh nghiệp *',
      form_company_lbl: 'Tên công ty / Thương hiệu',
      form_service_lbl: 'Dịch vụ cần tư vấn *',
      form_route_lbl: 'Tuyến vận chuyển quan tâm *',
      form_msg_lbl: 'Chi tiết hàng & yêu cầu *',
      form_submit_btn: 'Gửi Yêu Cầu Tư Vấn Ngay',
      form_name_ph: 'Họ và tên của bạn',
      form_msg_ph: 'Loại hàng, khối lượng, điểm đến...',

      // Partners & Testimonials & News
      partner_tag: 'Mạng Lưới Đối Tác',
      partner_title: 'Mạng Lưới Đối Tác Vận Tải Hàng Hải & Hàng Không Toàn Cầu',
      partner_subtitle: 'SpeeGo Logistics tự hào đồng hành trực tiếp cùng các hãng hàng không vận chuyển hàng hóa, hãng tàu biển quốc tế và liên minh logistics hàng đầu thế giới.',
      testi_tag: 'Đánh giá khách hàng',
      testi_title: 'Khách Hàng Quốc Tế Nói Về SpeeGo',
      news_tag: 'Bản tin thị trường',
      news_title: 'Tin Tức Chuỗi Cung Ứng & Vận Tải Biển Mới Nhất'
    },

    es: {
      // Nav
      nav_home: 'Inicio',
      nav_about: 'Sobre SpeeGo',
      nav_services: 'Servicios',
      nav_process: 'Proceso 8 Pasos',
      nav_why: 'Por qué SpeeGo',
      nav_partners: 'Socios',
      nav_news: 'Noticias',
      nav_contact: 'Contacto',
      nav_quote_btn: 'Cotizar',

      // Hero (Spec from Image 2)
      hero_subheading: 'SOCIO LOGÍSTICO GLOBAL',
      hero_title_row1: 'Desde el Abastecimiento',
      hero_title_row2_to: 'hasta la',
      hero_title_row2_highlight: 'Entrega Global',
      hero_desc_main: 'Ayudamos a las empresas a abastecerse, inspeccionar, enviar y cumplir con confianza — más rápido, más seguro y más rentable.',
      hero_btn_quote: 'Solicitar Cotización',
      hero_btn_call: '(+84) 906 828 898',
      stat_partners: 'Socios Globales',
      stat_delivery: 'Entrega a Tiempo',
      stat_countries: 'Países Cubiertos',
      hero_scroll_explore: 'DESPLAZARSE PARA EXPLORAR',
      hero_trust_label: 'CON LA CONFIANZA DE EMPRESAS EN CRECIMIENTO',
      hero_trust_more: 'Y MUCHOS MÁS',

      // Hero legacy compat
      hero_badge: 'SOCIO LOGÍSTICO GLOBAL',
      hero_title_prefix: 'Desde el Abastecimiento hasta la',
      hero_title_highlight: 'Entrega Global',
      hero_desc: 'Abastecimiento integral, negociación con fábricas, control de calidad QC, flete internacional y fulfillment moderno conectando Vietnam y China con EE.UU., Canadá y Australia.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Solicitar Asesoría',
      hero_cta_quote: 'Cotización Detallada',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'Introducción',
      tab_form: 'Formulario',
      tab_tracking: 'Rastreo',
      tab_quote: 'Cotización Rápida',
      tab_knowledge: 'Centro de Logística',

      intro_lead: 'SpeeGo Logistics conecta fábricas en Vietnam y China con compradores en EE.UU., Canadá y Australia — de extremo a extremo.',
      intro_b1: 'Abastecimiento, negociación de MOQ e inspección QC en planta',
      intro_b2: 'FCL/LCL marítimo y aéreo con rastreo OMS en vivo',
      intro_b3: 'Aduanas y fulfillment en destino',
      intro_b4: 'Cotizaciones transparentes — sin recargos ocultos',
      intro_cta: 'Conozca más sobre SpeeGo',

      quote_origin_lbl: 'Puerto de Origen',
      quote_dest_lbl: 'País de Destino',
      quote_mode_lbl: 'Modalidad de Envío',
      quote_weight_lbl: 'Peso / Volumen (CBM)',
      quote_btn: 'Calcular y Cotizar',

      track_placeholder: 'Ingrese Contenedor, B/L o Guía OMS (ej. SPG-8921)',
      track_btn: 'Rastrear Ahora',
      track_searching: 'Construyendo la ruta del envío…',
      track_success: 'Ruta cargada. Revise cada hito abajo.',
      track_modal_title: 'Ruta del envío',
      track_modal_open_ups: 'Abrir en UPS',
      track_modal_loading: 'Construyendo la ruta SpeeGo…',
      track_modal_powered: 'Ruta SpeeGo OMS · Enlace UPS',
      track_modal_code_label: 'N.º de seguimiento',
      track_label_status: 'Estado',
      track_label_origin: 'Origen',
      track_label_dest: 'Destino',
      track_label_eta: 'ETA',
      track_label_carrier: 'Transportista',
      track_label_route: 'Línea de tiempo',
      track_status_transit: 'En tránsito',
      track_origin: 'Ciudad Ho Chi Minh, Vietnam',
      track_dest: 'Los Ángeles, CA, EE.UU.',
      track_carrier: 'SpeeGo OMS · UPS Last Mile',
      track_ev1_title: 'Pedido creado',
      track_ev1_loc: 'SpeeGo OMS — Vietnam HQ',
      track_ev1_detail: 'Reserva confirmada. Documentos generados.',
      track_ev2_title: 'Recogida en fábrica',
      track_ev2_loc: 'Parque Industrial Binh Duong, VN',
      track_ev2_detail: 'Carga recogida y precintada. Checklist QC adjunto.',
      track_ev3_title: 'Llegada a almacén de exportación',
      track_ev3_loc: 'Hub Logistics Cat Lai, HCMC',
      track_ev3_detail: 'Recibido, pesado y preparado para salida.',
      track_ev4_title: 'Aduana de exportación',
      track_ev4_loc: 'Aduana Cat Lai, Vietnam',
      track_ev4_detail: 'Declaración aprobada. Contenedor liberado.',
      track_ev5_title: 'Salida del puerto de origen',
      track_ev5_loc: 'Puerto de Ho Chi Minh (VNSGN)',
      track_ev5_detail: 'Buque zarpa. Tránsito oceánico a la costa oeste de EE.UU.',
      track_ev6_title: 'En tránsito — Océano Pacífico',
      track_ev6_loc: 'En ruta a POLA',
      track_ev6_detail: 'Según horario. Seguimiento del buque activo.',
      track_ev7_title: 'Llegada al hub de destino',
      track_ev7_loc: 'Puerto de Los Ángeles, CA',
      track_ev7_detail: 'Aviso de llegada. Pendiente de descarga.',
      track_ev8_title: 'En reparto',
      track_ev8_loc: 'Instalación UPS Metro LA',
      track_ev8_detail: 'Entrega a UPS. Ventana de entrega confirmada.',
      track_ev9_title: 'Entregado',
      track_ev9_loc: 'Dirección del consignatario, Los Ángeles',
      track_ev9_detail: 'POD disponible. Ruta completada.',

      knowledge_chip1: 'Guía Incoterms 2020',
      knowledge_chip2: 'Aduanas FDA en EE.UU.',
      knowledge_chip3: 'Regulaciones Cosméticos y Nails',
      knowledge_chip4: 'Calculadora FCL vs LCL',
      knowledge_chip5: 'Estándares Amazon FBA',

      // About
      about_tag: 'Acerca de SpeeGo',
      about_title: 'SOBRE NOSOTROS',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> es pionera en fabricación multiindustria y logística global, conectando producción – transporte – distribución para que las empresas expandan sus mercados.',
      about_desc2: 'Desde la auditoría de fábricas y negociación de MOQ hasta inspecciones QC en sitio, gestión aduanal y fulfillment omnicanal, impulsamos el crecimiento de su negocio sin costos ocultos.',
      about_btn: 'Saber más',
      about_badge_text: 'Rutas Comerciales Activas',

      // 4 Services
      services_tag: 'Capacidades',
      services_title: '<span class="speego-accent-num">4</span> Servicios Clave de SpeeGo',
      services_subtitle: 'Soluciones de cadena de suministro diseñadas para empresas de importación/exportación y e-commerce.',
      services_slogan: 'Your Cargo Our Commitment',

      srv1_title: 'Sourcing & QC',
      srv1_desc: 'Apoyo para encontrar proveedores confiables, evaluar capacidades e inspeccionar la calidad del producto antes del envío, reduciendo riesgos en la cadena de suministro.',
      srv2_title: 'Logística Internacional',
      srv2_desc: 'Soluciones de transporte internacional marítimo y aéreo con itinerarios flexibles, costos optimizados y seguimiento transparente.',
      srv3_title: 'Fulfillment Moderno',
      srv3_desc: 'Gestión de almacén, procesamiento de pedidos, empaque y entrega rápida para optimizar operaciones y mejorar la experiencia del cliente.',
      srv4_title: 'Importación y Aduanas',
      srv4_desc: 'Asesoría en trámites, documentación, declaraciones aduaneras y procesos de importación/exportación para un flujo de mercancía ágil y conforme a la normativa.',
      srv_learn_more: 'Ver detalles',
      srv_feat1_title: 'Seguro',
      srv_feat1_desc: 'Mercancía siempre protegida',
      srv_feat2_title: 'A tiempo',
      srv_feat2_desc: 'Compromiso de plazo',
      srv_feat3_title: 'Costo optimizado',
      srv_feat3_desc: 'Mayor competitividad',
      srv_feat4_title: 'Alianza a largo plazo',
      srv_feat4_desc: 'Por el crecimiento de su empresa',

      // 8-Step Process Tabs
      process_tag: 'PROCESO ESTANDARIZADO',
      process_title: 'Proceso Operativo de 8 Pasos',
      process_subtitle: 'Transparencia en cada etapa, acompañando a su empresa desde la idea hasta que la mercancía llega al almacén.',
      step_btn1: 'Recepción',
      step_btn2: 'Consulta',
      step_btn3: 'Sourcing',
      step_btn4: 'Producción',
      step_btn5: 'QC',
      step_btn6: 'Documentos',
      step_btn7: 'Flete',
      step_btn8: 'Cierre',
      j_s1_title: 'Recepción de información',
      j_s1_desc: 'Recibimos su solicitud y analizamos las necesidades del negocio.',
      j_s1_p1: 'Definir necesidades',
      j_s1_p2: 'Análisis de producto',
      j_s1_p3: 'Objetivos y presupuesto',
      j_s2_title: 'Consultoría de solución',
      j_s2_desc: 'Propuesta óptima de sourcing, costo y plazos.',
      j_s2_p1: 'Análisis de opciones',
      j_s2_p2: 'Optimización de costos',
      j_s2_p3: 'Construcción del timeline',
      j_s3_title: 'Sourcing y fábricas',
      j_s3_desc: 'Encontrar proveedores, evaluar capacidad, negociar precio y MOQ.',
      j_s3_p1: 'Supplier sourcing',
      j_s3_p2: 'Evaluación de fábrica',
      j_s3_p3: 'Negociación de precio y MOQ',
      j_s4_title: 'Supervisión de producción',
      j_s4_desc: 'Seguimiento del avance, control del plan y resolución de incidencias.',
      j_s4_p1: 'Seguimiento de avance',
      j_s4_p2: 'Control de timeline',
      j_s4_p3: 'Reportes de producción',
      j_s5_title: 'Control de calidad',
      j_s5_desc: 'Inspección del producto antes del empaque y salida de fábrica.',
      j_s5_p1: 'Product inspection',
      j_s5_p2: 'Verificación de cantidad',
      j_s5_p3: 'Estándares de calidad',
      j_s6_title: 'Aduanas y documentos',
      j_s6_desc: 'Preparar expedientes, declarar aduanas y gestionar import/export.',
      j_s6_p1: 'Expedientes import/export',
      j_s6_p2: 'Declaración aduanera',
      j_s6_p3: 'Verificación documental',
      j_s7_title: 'Flete internacional',
      j_s7_desc: 'Transporte marítimo, aéreo o multimodal.',
      j_s7_p1: 'Sea Freight',
      j_s7_p2: 'Air Freight',
      j_s7_p3: 'Seguimiento del envío',
      j_s8_title: 'Entrega y cierre',
      j_s8_desc: 'Entrega en destino, cierre documental y soporte post-entrega.',
      j_s8_p1: 'Door-to-door',
      j_s8_p2: 'Entrega y POD',
      j_s8_p3: 'Soporte post-entrega',
      j_delivered: 'DELIVERED',
      j_cta_title: '¿Listo para iniciar el viaje con SpeeGo?',
      j_cta_primary: 'Consulta gratuita →',
      j_cta_secondary: 'Ver servicios',

      // Why Choose SpeeGo (6 Pillars)
      why_tag: 'Ventajas Competitivas',
      why_title: 'POR QUÉ ELEGIR SPEEGO LOGISTICS',
      why_subtitle: 'Valor transparente, infraestructura sincronizada y un equipo experto dedicado.',
      why1_title: 'Cadena de suministro multirubro',
      why1_desc: 'Cubrimos producción y envío internacional. Especialistas en cosméticos, uñas, mobiliario y más.',
      why2_title: 'Red de fábricas en China y Vietnam',
      why2_desc: 'Socios, fábricas y talleres en China y Vietnam — precios y MOQ adaptados a su negocio.',
      why3_title: 'Múltiples modos de transporte',
      why3_desc: 'FCL y LCL por aire y mar desde Vietnam y China hacia EE.UU., Australia y Canadá.',
      why4_title: 'Sin costos ocultos',
      why4_desc: 'SpeeGo Logistics cotiza cada rubro con compromiso 100% — sin cargos sorpresa.',
      why5_title: 'Soporte ágil',
      why5_desc: 'Especialistas listos para asesorar, actualizar el estado del envío y resolver imprevistos a tiempo.',
      why6_title: 'Tracking con OMS integrado',
      why6_desc: 'Siga el estado del pedido en tiempo real de forma rápida, cómoda y precisa.',

      // Consultation Form
      form_tag: 'Solicitar Cotización',
      form_title: 'Formulario de Consulta y Cotización',
      form_subtitle: 'Indíquenos los detalles de su carga. Responderemos con una propuesta personalizada en menos de 2 horas.',
      form_name_lbl: 'Nombre y Apellido *',
      form_phone_lbl: 'Teléfono / WhatsApp *',
      form_email_lbl: 'Correo Electrónico *',
      form_company_lbl: 'Empresa / Marca',
      form_service_lbl: 'Servicio Solicitado *',
      form_route_lbl: 'Ruta de Transporte *',
      form_msg_lbl: 'Detalles de Mercancía *',
      form_submit_btn: 'Enviar Solicitud',
      form_name_ph: 'Su nombre completo',
      form_msg_ph: 'Tipo de producto, volumen, destino...',

      // Partners & Testimonials & News
      partner_tag: 'Alianzas Estratégicas',
      partner_title: 'Red de Alianzas Navieras y Aéreas Globales',
      partner_subtitle: 'SpeeGo Logistics se enorgullece de asociarse directamente con las principales aerolíneas de carga, navieras y redes logísticas del mundo.',
      testi_tag: 'Testimonios',
      testi_title: 'Opiniones de Nuestros Clientes Internacionales',
      news_tag: 'Inteligencia de Mercado',
      news_title: 'Últimas Noticias y Tendencias de Transporte Marítimo'
    }
  };

  // =========================================================================
  // 2. DETAILED 8-STEP PROCESS DATA (full-bleed hero overlay)
  // =========================================================================
  const processSteps = [
    {
      step: 1,
      image: 'wp-content/themes/logistica/images/buoc-1.png',
      progress: '0%',
      en: {
        line1: 'REQUIREMENT',
        line2: 'INTAKE',
        title: 'Requirement intake',
        desc: 'Capture your request and analyze business needs.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'TIẾP NHẬN',
        line2: 'THÔNG TIN',
        title: 'Tiếp nhận thông tin',
        desc: 'Tiếp nhận yêu cầu và phân tích nhu cầu của doanh nghiệp.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'RECEPCIÓN',
        line2: 'DE INFORMACIÓN',
        title: 'Recepción de información',
        desc: 'Recibimos su solicitud y analizamos las necesidades del negocio.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 2,
      image: 'wp-content/uploads/sites/2/2023/08/foreman-control-loading-containers-box-from-cargo-freight-ship-import-export-created-with-generative-ai-technology-1060x398.jpg',
      progress: '14.2%',
      en: {
        line1: 'SOLUTION',
        line2: 'CONSULTING',
        title: 'Solution consulting',
        desc: 'In-depth proposals optimized for cost and timeline.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'TƯ VẤN',
        line2: 'GIẢI PHÁP',
        title: 'Tư vấn giải pháp',
        desc: 'Đề xuất chuyên sâu các giải pháp tối ưu về chi phí và thời gian.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'CONSULTORÍA',
        line2: 'DE SOLUCIÓN',
        title: 'Consultoría de solución',
        desc: 'Propuestas especializadas optimizadas en costo y plazos.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 3,
      image: 'wp-content/uploads/sites/2/2023/08/top-viwe-transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration.jpg',
      progress: '28.5%',
      en: {
        line1: 'SOURCING &',
        line2: 'FACTORIES',
        title: 'Sourcing & factories',
        desc: 'Source goods, connect factories, negotiate price and MOQ.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'TÌM NGUỒN',
        line2: 'HÀNG & NHÀ MÁY',
        title: 'Tìm nguồn hàng & nhà máy',
        desc: 'Tìm nguồn hàng & kết nối nhà máy, deal giá & MOQ.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'SOURCING Y',
        line2: 'FÁBRICAS',
        title: 'Sourcing y fábricas',
        desc: 'Abastecimiento, conexión con fábricas, negociación de precio y MOQ.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 4,
      image: 'wp-content/uploads/sites/2/2023/08/aerial-view-cargo-ship-with-cargo-container-sea.jpg',
      progress: '42.8%',
      en: {
        line1: 'PRODUCTION',
        line2: 'SUPERVISION',
        title: 'Production supervision',
        desc: 'Track progress and keep the production plan on schedule for the customer.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'GIÁM SÁT',
        line2: 'SẢN XUẤT',
        title: 'Giám sát sản xuất',
        desc: 'Theo dõi tiến độ, đảm bảo kế hoạch sản xuất cho khách hàng.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'SUPERVISIÓN',
        line2: 'DE PRODUCCIÓN',
        title: 'Supervisión de producción',
        desc: 'Seguimiento del avance y cumplimiento del plan de producción para el cliente.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 5,
      image: 'wp-content/uploads/sites/2/2023/08/truck-with-white-trailer-that-says-scania-side.jpg',
      progress: '57.1%',
      en: {
        line1: 'QUALITY',
        line2: 'INSPECTION',
        title: 'Quality inspection',
        desc: 'Inspect goods before packing and factory release.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'KIỂM TRA',
        line2: 'CHẤT LƯỢNG',
        title: 'Kiểm tra chất lượng',
        desc: 'Kiểm tra chất lượng hàng hóa trước khi đóng gói và xuất xưởng.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'CONTROL DE',
        line2: 'CALIDAD',
        title: 'Control de calidad',
        desc: 'Inspección de calidad antes del empaque y salida de fábrica.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 6,
      image: 'wp-content/uploads/sites/2/2023/08/cargo-ship-carrying-containers-export-import-is-shown-global-world-service-freight.jpg',
      progress: '71.4%',
      en: {
        line1: 'CUSTOMS',
        line2: 'DOCUMENTS',
        title: 'Customs documents',
        desc: 'Complete documentation and support required customs procedures.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'CHỨNG TỪ',
        line2: 'THUẾ QUAN',
        title: 'Chứng từ thuế quan',
        desc: 'Hoàn thiện chứng từ và hỗ trợ các thủ tục hải quan cần thiết.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'DOCUMENTOS',
        line2: 'ADUANEROS',
        title: 'Documentos aduaneros',
        desc: 'Completar documentación y apoyar los trámites aduaneros necesarios.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 7,
      image: 'wp-content/uploads/sites/2/2023/08/aerial-view-top-view-cargo-plane-flying-ship-port-export-import-logistics-international-goods-ai-generation.jpg',
      progress: '85.7%',
      en: {
        line1: 'INTERNATIONAL',
        line2: 'FREIGHT',
        title: 'International freight',
        desc: 'Ship by the right mode to the correct destination.',
        next: 'Explore the next step'
      },
      vi: {
        line1: 'VẬN CHUYỂN',
        line2: 'QUỐC TẾ',
        title: 'Vận chuyển quốc tế',
        desc: 'Vận chuyển bằng phương thức phù hợp đến đúng điểm nhận.',
        next: 'Khám phá bước tiếp theo'
      },
      es: {
        line1: 'FLETE',
        line2: 'INTERNACIONAL',
        title: 'Flete internacional',
        desc: 'Transporte con el modo adecuado hasta el punto de recepción.',
        next: 'Explorar el siguiente paso'
      }
    },
    {
      step: 8,
      image: 'wp-content/uploads/sites/2/2023/08/large-containers-with-cargo-delivered-by-cargo-train-railway-station.jpg',
      progress: '100%',
      en: {
        line1: 'PAYMENT &',
        line2: 'COMPLETION',
        title: 'Payment & completion',
        desc: 'Complete the transaction and hand over all related documents.',
        next: 'Start your journey'
      },
      vi: {
        line1: 'THANH TOÁN',
        line2: '& HOÀN TẤT',
        title: 'Thanh toán & hoàn tất',
        desc: 'Hoàn tất giao dịch và bàn giao đầy đủ hồ sơ liên quan.',
        next: 'Bắt đầu hành trình'
      },
      es: {
        line1: 'PAGO Y',
        line2: 'CIERRE',
        title: 'Pago y cierre',
        desc: 'Cerrar la transacción y entregar la documentación completa.',
        next: 'Comenzar el viaje'
      }
    }
  ];

  // =========================================================================
  // 2.1 HERO DYNAMIC SLIDES (Hiệu ứng chữ chạy tự động như code cũ 01, 02, 03, 04)
  // =========================================================================
  const heroSlides = [
    {
      index: 0,
      en: {
        badge: 'Driving Global Commerce',
        prefix: 'Global Supply Chain &',
        highlight: 'Logistics Excellence',
        desc: 'End-to-end sourcing, factory negotiation, quality control, international freight, and modern fulfillment connecting Vietnam & China to the US, Canada, and Australia.'
      },
      vi: {
        badge: 'Kết nối thương mại toàn cầu',
        prefix: 'Giải pháp chuỗi cung ứng &',
        highlight: 'Logistics xuất sắc',
        desc: 'Dịch vụ tìm nguồn hàng, đàm phán nhà máy, kiểm định chất lượng QC, vận chuyển quốc tế và fulfillment trọn gói kết nối Việt Nam & Trung Quốc đi Mỹ, Úc, Canada.'
      },
      es: {
        badge: 'Impulsando el Comercio Global',
        prefix: 'Cadena de Suministro Global &',
        highlight: 'Logística de Excelencia',
        desc: 'Abastecimiento integral, negociación con fábricas, control de calidad QC, flete internacional y fulfillment moderno conectando Vietnam y China con EE.UU., Canadá y Australia.'
      }
    },
    {
      index: 1,
      en: {
        badge: 'Delivering Success',
        prefix: 'Efficiency in Motion,',
        highlight: 'Logistics in Action',
        desc: 'Optimized international freight and multimodal routing reduce transportation costs, storage overhead, and lead-time risks for high profitability.'
      },
      vi: {
        badge: 'Đồng hành thành công',
        prefix: 'Hiệu quả chuyển động,',
        highlight: 'Vận hành bứt phá',
        desc: 'Tối ưu hóa thời gian vận chuyển, lưu kho và chi phí chuỗi cung ứng, giúp doanh nghiệp bứt phá xuất khẩu an toàn và đúng hẹn.'
      },
      es: {
        badge: 'Impulso y Éxito Continuo',
        prefix: 'Eficiencia en Movimiento,',
        highlight: 'Logística Activa',
        desc: 'Logística optimizada que reduce costos de transporte, almacenamiento e inventario, impulsando una mayor rentabilidad para su negocio.'
      }
    },
    {
      index: 2,
      en: {
        badge: 'Supply Chain Mastery',
        prefix: 'Mastering Movement,',
        highlight: 'Defining Logistics',
        desc: 'Direct network of verified factories in Vietnam & China, securing factory-gate wholesale pricing, flexible low MOQs, and 100% zero hidden fees.'
      },
      vi: {
        badge: 'Làm chủ chuỗi cung ứng',
        prefix: 'Dẫn lối vận tải,',
        highlight: 'Kiến tạo giá trị',
        desc: 'Mạng lưới đối tác xưởng sản xuất uy tín tại Việt Nam & Trung Quốc, hỗ trợ deal giá gốc, MOQ linh hoạt và cam kết 100% không chi phí ẩn.'
      },
      es: {
        badge: 'Dominio en Cadena de Suministro',
        prefix: 'Liderazgo en Movimiento,',
        highlight: 'Distribución Global',
        desc: 'Alianzas estratégicas con fábricas en Vietnam y China con MOQs flexibles y compromiso garantizado de cero costos ocultos.'
      }
    },
    {
      index: 3,
      en: {
        badge: 'Intelligent Visibility',
        prefix: 'Real-Time Tracking With',
        highlight: 'Integrated OMS System',
        desc: 'Monitor every container milestone across the Pacific Ocean with real-time GPS tracking, electronic customs status, and dedicated 24/7 expert support.'
      },
      vi: {
        badge: 'Minh bạch thời gian thực',
        prefix: 'Hệ thống quản lý',
        highlight: 'Vận đơn OMS tích hợp',
        desc: 'Theo dõi chính xác tiến độ từng kiện hàng theo thời gian thực một cách nhanh chóng, thuận tiện và chính xác qua nền tảng OMS đồng bộ.'
      },
      es: {
        badge: 'Trazabilidad Inteligente',
        prefix: 'Rastreo en Tiempo Real con',
        highlight: 'Sistema OMS Integrado',
        desc: 'Monitoreo constante de cada hito de su carga a través del Pacífico con estatus aduanal en vivo y soporte dedicado las 24 horas.'
      }
    }
  ];

  let currentHeroSlide = 0;
  let heroSliderTimer = null;

  function setHeroSlide(index) {
    currentHeroSlide = index;
    const slide = heroSlides[index];
    if (!slide) return;
    const data = slide[currentLang] || slide.en;

    const contentBox = document.getElementById('speego-hero-content-box');
    const badgeText = document.getElementById('speego-hero-badge-text');
    const titlePrefix = document.getElementById('speego-hero-title-prefix');
    const titleHighlight = document.getElementById('speego-hero-title-highlight');
    const desc = document.getElementById('speego-hero-desc');

    if (contentBox) {
      contentBox.classList.remove('speego-hero-text-anim');
      void contentBox.offsetWidth; // trigger reflow
      contentBox.classList.add('speego-hero-text-anim');
    }

    if (badgeText) badgeText.textContent = data.badge;
    if (titlePrefix) titlePrefix.innerHTML = data.prefix;
    if (titleHighlight) titleHighlight.innerHTML = data.highlight;
    if (desc) desc.innerHTML = data.desc;

    // Update nav indicators 01, 02, 03, 04
    const navItems = document.querySelectorAll('#speego-hero-slider-nav li');
    navItems.forEach((li, idx) => {
      if (idx === index) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  function startHeroSlider() {
    if (heroSliderTimer) clearInterval(heroSliderTimer);
    // Preserved for Image 2 static design
  }

  function initHeroSliderNav() {
    const navItems = document.querySelectorAll('#speego-hero-slider-nav li');
    if (navItems.length === 0) return;
    navItems.forEach(li => {
      li.addEventListener('click', function () {
        const slideIdx = parseInt(this.getAttribute('data-slide'));
        setHeroSlide(slideIdx);
        startHeroSlider();
      });
    });
  }

  // Safe storage helper
  const safeStorage = {
    getItem: function (k) {
      try { return typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null; } catch (e) { return null; }
    },
    setItem: function (k, v) {
      try { if (typeof localStorage !== 'undefined') localStorage.setItem(k, v); } catch (e) {}
    }
  };

  // Current language state (Default: 'en')
  // Prefer ?lang= from URL when valid, else localStorage, else English
  const LOCALE_META = {
    en: {
      htmlLang: 'en',
      ogLocale: 'en_US',
      canonical: 'https://speegologistic.com/en/'
    },
    vi: {
      htmlLang: 'vi',
      ogLocale: 'vi_VN',
      canonical: 'https://speegologistic.com/'
    },
    es: {
      htmlLang: 'es',
      ogLocale: 'es_ES',
      canonical: 'https://speegologistic.com/es/'
    }
  };

  function getLangFromQuery() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = (params.get('lang') || '').toLowerCase();
      return i18nData[q] ? q : null;
    } catch (e) {
      return null;
    }
  }

  let currentLang = getLangFromQuery() || safeStorage.getItem('speego_lang') || 'en';
  if (!i18nData[currentLang]) currentLang = 'en';

  // =========================================================================
  // 3. I18N ENGINE + HREFLANG / CANONICAL SYNC
  // =========================================================================
  function syncSeoLocale(lang) {
    const meta = LOCALE_META[lang] || LOCALE_META.en;
    if (typeof document === 'undefined') return;

    document.documentElement.lang = meta.htmlLang;

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', meta.ogLocale);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', meta.canonical);

    // Keep static hreflang alternate links intact; they already cover EN/VI/ES/x-default
  }

  function syncLangQueryParam(lang) {
    try {
      const url = new URL(window.location.href);
      if (lang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  function applyLanguage(lang, options) {
    const opts = options || {};
    if (!i18nData[lang]) lang = 'en';
    currentLang = lang;
    safeStorage.setItem('speego_lang', lang);
    syncSeoLocale(lang);
    if (opts.updateUrl !== false) {
      syncLangQueryParam(lang);
    }

    // Update active label in button
    const activeLabelEl = document.getElementById('speego-current-lang-text');
    if (activeLabelEl) {
      const labels = { en: 'English', vi: 'Tiếng Việt', es: 'Español' };
      activeLabelEl.textContent = labels[lang] || 'English';
    }

    // Update dropdown active classes
    document.querySelectorAll('.speego-lang-option').forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Translate all [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18nData[lang] && i18nData[lang][key]) {
        el.innerHTML = i18nData[lang][key];
      }
    });

    // Translate all [data-i18n-ph] (placeholders)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18nData[lang] && i18nData[lang][key]) {
        el.setAttribute('placeholder', i18nData[lang][key]);
      }
    });

    // Re-render active process step detail with current language
    if (typeof renderStepDetail === 'function') {
      renderStepDetail(currentActiveStep, false);
    }

    // Re-render active hero text slide with current language
    if (typeof setHeroSlide === 'function') {
      setHeroSlide(currentHeroSlide);
    }
  }

  // =========================================================================
  // 4. HERO 3-TAB CONSOLE LOGIC (Intro / Form / Tracking)
  // =========================================================================
  function initHeroConsole() {
    const tabBtns = document.querySelectorAll('.speego-console-tab');
    const tabPanes = document.querySelectorAll('.speego-console-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const activePane = document.getElementById(targetTab);
        if (activePane) activePane.classList.add('active');
      });
    });

    // Tracking → SpeeGo journey timeline + UPS link
    const trackBtn = document.getElementById('speego-track-btn');
    const trackInput = document.getElementById('speego-track-input');
    const trackResult = document.getElementById('speego-track-result');
    const trackModal = document.getElementById('speego-track-modal');
    const trackJourney = document.getElementById('speego-track-journey');
    const trackModalCode = document.getElementById('speego-track-modal-code');
    const trackOpenUps = document.getElementById('speego-track-open-ups');
    const trackLoader = document.getElementById('speego-track-modal-loader');

    var TRACK_EVENT_META = [
      { key: 1, icon: 'fa-file-invoice' },
      { key: 2, icon: 'fa-box' },
      { key: 3, icon: 'fa-warehouse' },
      { key: 4, icon: 'fa-stamp' },
      { key: 5, icon: 'fa-ship' },
      { key: 6, icon: 'fa-globe-asia' },
      { key: 7, icon: 'fa-anchor' },
      { key: 8, icon: 'fa-truck' },
      { key: 9, icon: 'fa-check-circle' }
    ];

    function buildUpsTrackUrl(code) {
      var params = new URLSearchParams();
      params.set('loc', 'vi_VN');
      params.set('requester', 'ST');
      params.set('tracknum', code);
      return 'https://www.ups.com/track?' + params.toString();
    }

    function hashTrackCode(code) {
      var h = 0;
      for (var i = 0; i < code.length; i++) {
        h = ((h << 5) - h) + code.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h);
    }

    function formatTrackDate(date, lang) {
      try {
        return date.toLocaleString(
          lang === 'vi' ? 'vi-VN' : lang === 'es' ? 'es-ES' : 'en-US',
          { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
        );
      } catch (err) {
        return date.toISOString().slice(0, 16).replace('T', ' ');
      }
    }

    function buildTrackJourney(code, lang) {
      var t = i18nData[lang] || i18nData.en;
      var seed = hashTrackCode(code);
      // Current milestone: 5–7 so mid-journey feels active
      var currentIdx = 4 + (seed % 3);
      var dayOffsets = [18, 16, 14, 12, 9, 5, 2, -1, -3];
      var now = new Date();

      var events = TRACK_EVENT_META.map(function (meta, idx) {
        var d = new Date(now);
        d.setDate(d.getDate() - dayOffsets[idx]);
        d.setHours(8 + ((seed + idx * 3) % 10), (seed + idx * 17) % 60, 0, 0);
        var state = idx < currentIdx ? 'done' : idx === currentIdx ? 'current' : 'upcoming';
        return {
          icon: meta.icon,
          title: t['track_ev' + meta.key + '_title'],
          location: t['track_ev' + meta.key + '_loc'],
          detail: t['track_ev' + meta.key + '_detail'],
          time: state === 'upcoming' ? '—' : formatTrackDate(d, lang),
          state: state
        };
      });

      var eta = new Date(now);
      eta.setDate(eta.getDate() + (3 + (seed % 4)));

      return {
        status: t.track_status_transit,
        origin: t.track_origin,
        destination: t.track_dest,
        eta: formatTrackDate(eta, lang),
        carrier: t.track_carrier,
        progress: Math.round(((currentIdx + 1) / events.length) * 100),
        currentIdx: currentIdx,
        events: events
      };
    }

    function renderTrackJourney(code) {
      if (!trackJourney) return;
      var t = i18nData[currentLang] || i18nData.en;
      var data = buildTrackJourney(code, currentLang);

      var eventsHtml = data.events.map(function (ev, idx) {
        return (
          '<li class="speego-track-step speego-track-step--' + ev.state + '">' +
            '<div class="speego-track-step__rail" aria-hidden="true">' +
              '<span class="speego-track-step__icon"><i class="fas ' + ev.icon + '"></i></span>' +
              (idx < data.events.length - 1 ? '<span class="speego-track-step__line"></span>' : '') +
            '</div>' +
            '<div class="speego-track-step__card">' +
              '<div class="speego-track-step__head">' +
                '<h4 class="speego-track-step__title">' + ev.title + '</h4>' +
                '<time class="speego-track-step__time">' + ev.time + '</time>' +
              '</div>' +
              '<p class="speego-track-step__loc"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ' + ev.location + '</p>' +
              '<p class="speego-track-step__detail">' + ev.detail + '</p>' +
            '</div>' +
          '</li>'
        );
      }).join('');

      trackJourney.innerHTML =
        '<div class="speego-track-summary">' +
          '<div class="speego-track-summary__status">' +
            '<span class="speego-track-summary__badge"><i class="fas fa-shipping-fast" aria-hidden="true"></i> ' + data.status + '</span>' +
            '<span class="speego-track-summary__progress-label">' + data.progress + '%</span>' +
          '</div>' +
          '<div class="speego-track-summary__bar" role="progressbar" aria-valuenow="' + data.progress + '" aria-valuemin="0" aria-valuemax="100">' +
            '<span style="width:' + data.progress + '%"></span>' +
          '</div>' +
          '<div class="speego-track-summary__grid">' +
            '<div><span>' + t.track_label_origin + '</span><strong>' + data.origin + '</strong></div>' +
            '<div><span>' + t.track_label_dest + '</span><strong>' + data.destination + '</strong></div>' +
            '<div><span>' + t.track_label_eta + '</span><strong>' + data.eta + '</strong></div>' +
            '<div><span>' + t.track_label_carrier + '</span><strong>' + data.carrier + '</strong></div>' +
          '</div>' +
        '</div>' +
        '<div class="speego-track-route">' +
          '<h3 class="speego-track-route__title"><i class="fas fa-route" aria-hidden="true"></i> ' + t.track_label_route + '</h3>' +
          '<ol class="speego-track-timeline">' + eventsHtml + '</ol>' +
        '</div>';

      trackJourney.hidden = false;
    }

    function closeTrackModal() {
      if (!trackModal) return;
      trackModal.hidden = true;
      trackModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('speego-track-modal-open');
      if (trackJourney) {
        trackJourney.hidden = true;
        trackJourney.innerHTML = '';
      }
    }

    function openTrackModal(code) {
      if (!trackModal) return;
      var url = buildUpsTrackUrl(code);
      var t = i18nData[currentLang] || i18nData.en;

      if (trackModalCode) {
        trackModalCode.textContent = (t.track_modal_code_label || 'Tracking No.') + ': ' + code;
      }
      if (trackOpenUps) {
        trackOpenUps.href = url;
      }
      if (trackJourney) {
        trackJourney.hidden = true;
        trackJourney.innerHTML = '';
      }
      if (trackLoader) {
        trackLoader.hidden = false;
      }

      trackModal.hidden = false;
      trackModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('speego-track-modal-open');

      if (trackResult) {
        trackResult.style.display = 'block';
        trackResult.innerHTML =
          '<div style="display:flex;align-items:flex-start;gap:12px;">' +
          '<i class="fas fa-route" style="color:#f26419;font-size:18px;margin-top:2px;"></i>' +
          '<div><strong>' + code + '</strong><br>' +
          '<span style="opacity:.9;font-size:13px;">' + (t.track_searching || '') + '</span></div></div>';
      }

      window.setTimeout(function () {
        if (trackLoader) trackLoader.hidden = true;
        renderTrackJourney(code);
        if (trackResult) {
          trackResult.innerHTML =
            '<div style="display:flex;align-items:flex-start;gap:12px;">' +
            '<i class="fas fa-check-circle" style="color:#16a34a;font-size:18px;margin-top:2px;"></i>' +
            '<div><strong>' + code + '</strong><br>' +
            '<span style="opacity:.9;font-size:13px;">' + (t.track_success || '') + '</span></div></div>';
        }
      }, 700);
    }

    function submitTrackLookup() {
      if (!trackInput) return;
      var query = trackInput.value.trim();
      if (!query) {
        trackInput.focus();
        return;
      }
      openTrackModal(query);
    }

    if (trackBtn && trackInput) {
      trackBtn.addEventListener('click', function (e) {
        e.preventDefault();
        submitTrackLookup();
      });
      trackInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitTrackLookup();
        }
      });
    }

    if (trackModal) {
      trackModal.querySelectorAll('[data-track-modal-close]').forEach(function (el) {
        el.addEventListener('click', closeTrackModal);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && trackModal && !trackModal.hidden) {
          closeTrackModal();
        }
      });
    }
  }

  // =========================================================================
  // 5. 8-STEP PROCESS — PINNED SCROLL JOURNEY
  // =========================================================================
  let currentActiveStep = 1;
  let processBgToggle = false;
  let processAnimTimer = null;
  const PROCESS_STEP_COUNT = 8;

  function prefersReducedMotion() {
    return typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function fillStepContent(stepData, langData, options) {
    options = options || {};
    const numEl = document.getElementById('process-step-num');
    const line1 = document.getElementById('process-title-line1');
    const line2 = document.getElementById('process-title-line2');
    const desc = document.getElementById('process-description');
    const nextLabel = document.getElementById('process-next-label');
    const section = document.querySelector('[data-process-hero]');
    const timeline = document.getElementById('process-timeline');
    const activeTitle = document.getElementById('process-nav-active-title');
    const counter = document.getElementById('process-nav-counter');

    if (!numEl || !line1 || !line2 || !desc) return;

    const pad = String(stepData.step).padStart(2, '0');
    numEl.textContent = pad;
    line1.textContent = langData.line1;
    line2.textContent = langData.line2;
    desc.textContent = langData.desc;
    if (nextLabel) {
      nextLabel.textContent = langData.next || (currentLang === 'vi' ? 'Khám phá bước tiếp theo' : 'Explore the next step');
    }
    if (activeTitle) {
      activeTitle.textContent = langData.title;
    }
    if (counter) {
      counter.innerHTML = 'BƯỚC <strong>' + pad + '</strong> / 08';
    }

    if (section) {
      var keepAnim = section.classList.contains('is-animating');
      section.className = 'process-hero process-hero--step-0' + stepData.step + (keepAnim ? ' is-animating' : '');
    }

    if (timeline && !options.skipProgress) {
      timeline.style.setProperty('--progress', stepData.progress || '0%');
    }

    document.querySelectorAll('#process-timeline .timeline-step').forEach(function (btn) {
      var stepId = parseInt(btn.getAttribute('data-step'), 10);
      var isActive = stepId === stepData.step;
      btn.classList.toggle('timeline-step--active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'step');
      } else {
        btn.removeAttribute('aria-current');
      }

      var tip = btn.querySelector('.timeline-step__tooltip');
      var stepObj = processSteps.find(function (s) { return s.step === stepId; });
      if (stepObj) {
        var tipData = stepObj[currentLang] || stepObj.en;
        btn.setAttribute('data-label', tipData.title);
        btn.setAttribute('aria-label', 'Bước ' + stepId + ': ' + tipData.title);
        if (tip) tip.textContent = tipData.title;
      }
    });

    // Crossfade backgrounds (do not early-return the whole filler)
    var bgA = document.getElementById('process-hero-bg-a');
    var bgB = document.getElementById('process-hero-bg-b');
    if (bgA && bgB) {
      function normSrc(src) {
        if (!src) return '';
        try {
          return new URL(src, window.location.href).pathname.replace(/\\/g, '/');
        } catch (err) {
          return String(src).split('?')[0];
        }
      }

      var activeBg = bgA.classList.contains('is-active') ? bgA : bgB;
      var currentSrc = normSrc(activeBg.getAttribute('src') || activeBg.src);
      var nextSrc = normSrc(stepData.image);
      if (currentSrc === nextSrc) return;

      var incoming = processBgToggle ? bgA : bgB;
      var outgoing = processBgToggle ? bgB : bgA;
      processBgToggle = !processBgToggle;

      if (normSrc(incoming.getAttribute('src') || incoming.src) !== nextSrc) {
        incoming.setAttribute('src', stepData.image);
      }
      incoming.setAttribute('alt', '');
      incoming.setAttribute('aria-hidden', 'true');

      if (prefersReducedMotion()) {
        outgoing.classList.remove('is-active');
        incoming.classList.add('is-active');
      } else {
        incoming.classList.add('is-active');
        outgoing.classList.remove('is-active');
      }
    }
  }

  function renderStepDetail(stepNum, animate, options) {
    var step = processSteps.find(function (s) { return s.step === stepNum; }) || processSteps[0];
    if (!step) return;

    var langData = step[currentLang] || step.en;
    var section = document.querySelector('[data-process-hero]');
    if (!section) return;

    currentActiveStep = step.step;
    var shouldAnimate = animate && !prefersReducedMotion();

    fillStepContent(step, langData, options);

    if (shouldAnimate) {
      section.classList.remove('is-animating');
      void section.offsetWidth;
      section.classList.add('is-animating');
      if (processAnimTimer) window.clearTimeout(processAnimTimer);
      processAnimTimer = window.setTimeout(function () {
        section.classList.remove('is-animating');
        processAnimTimer = null;
      }, 680);
    }
  }

  function goToProcessStep(stepNum, animate, options) {
    options = options || {};
    if (!stepNum || stepNum < 1 || stepNum > PROCESS_STEP_COUNT) return;
    if (stepNum === currentActiveStep && !options.force) return;
    renderStepDetail(stepNum, animate, options);
  }

  function getProcessJourneyMetrics(journey) {
    var viewH = window.innerHeight || 1;
    var journeyTop = journey.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    var journeyHeight = Math.max(journey.offsetHeight, PROCESS_STEP_COUNT * viewH);
    var total = Math.max(1, journeyHeight - viewH);
    var scrolled = Math.min(total, Math.max(0, (window.scrollY || window.pageYOffset || 0) - journeyTop));
    return {
      progress: scrolled / total,
      start: journeyTop,
      range: total,
      viewH: viewH
    };
  }

  function setProcessJourneyHeight(journey) {
    if (!journey) return;
    var viewH = window.innerHeight || 1;
    // Force tall scroll track so sticky pinning has room for all 8 steps
    journey.style.height = (PROCESS_STEP_COUNT * viewH) + 'px';
    journey.style.minHeight = (PROCESS_STEP_COUNT * viewH) + 'px';
  }

  function scrollProcessToStep(stepNum, behavior) {
    var journey = document.querySelector('[data-process-journey]');
    if (!journey) return;
    setProcessJourneyHeight(journey);
    var metrics = getProcessJourneyMetrics(journey);
    var t = (stepNum - 0.5) / PROCESS_STEP_COUNT;
    t = Math.min(0.999, Math.max(0, t));
    var top = metrics.start + t * metrics.range;
    window.scrollTo({
      top: top,
      behavior: behavior || (prefersReducedMotion() ? 'auto' : 'smooth')
    });
  }

  function initProcessTabs() {
    var journey = document.querySelector('[data-process-journey]');
    var section = document.querySelector('[data-process-hero]');
    if (!section) return;

    var timeline = document.getElementById('process-timeline');
    var reduced = prefersReducedMotion();
    var wheelLock = false;
    var lastSyncedStep = 0;

    if (journey) {
      setProcessJourneyHeight(journey);
    }

    function syncFromScroll() {
      if (!journey) return;
      var metrics = getProcessJourneyMetrics(journey);
      var progress = metrics.progress;
      var step = Math.min(PROCESS_STEP_COUNT, Math.floor(progress * PROCESS_STEP_COUNT) + 1);
      if (progress >= 0.999) step = PROCESS_STEP_COUNT;
      if (progress <= 0) step = 1;

      if (timeline) {
        timeline.style.setProperty('--progress', (progress * 100).toFixed(2) + '%');
      }

      if (step !== currentActiveStep) {
        lastSyncedStep = step;
        goToProcessStep(step, !reduced, { skipProgress: true });
      }
    }

    function isJourneyPinned() {
      if (!journey) return false;
      var rect = journey.getBoundingClientRect();
      var viewH = window.innerHeight || 1;
      // Pinned while journey top is above/at viewport top and bottom still below viewport bottom
      return rect.top <= 2 && rect.bottom > viewH + 2;
    }

    if (journey) {
      var ticking = false;
      function onScrollOrResize() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          syncFromScroll();
          ticking = false;
        });
      }

      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', function () {
        setProcessJourneyHeight(journey);
        onScrollOrResize();
      }, { passive: true });

      // Mouse wheel: one slide per gesture while pinned
      section.addEventListener('wheel', function (e) {
        if (!isJourneyPinned()) return;
        if (Math.abs(e.deltaY) < 4) return;

        var goingDown = e.deltaY > 0;
        var atFirst = currentActiveStep <= 1;
        var atLast = currentActiveStep >= PROCESS_STEP_COUNT;

        // Release page scroll at edges
        if (goingDown && atLast) return;
        if (!goingDown && atFirst) return;

        e.preventDefault();
        if (wheelLock || reduced) {
          if (!wheelLock && !goingDown && !atFirst) {
            goToProcessStep(currentActiveStep - 1, false, { skipProgress: true });
            scrollProcessToStep(currentActiveStep, 'auto');
          } else if (!wheelLock && goingDown && !atLast) {
            goToProcessStep(currentActiveStep + 1, false, { skipProgress: true });
            scrollProcessToStep(currentActiveStep, 'auto');
          }
          return;
        }

        wheelLock = true;
        var target = goingDown
          ? Math.min(PROCESS_STEP_COUNT, currentActiveStep + 1)
          : Math.max(1, currentActiveStep - 1);

        goToProcessStep(target, true, { skipProgress: true });
        scrollProcessToStep(target, 'smooth');

        window.setTimeout(function () {
          wheelLock = false;
        }, 700);
      }, { passive: false });
    }

    var tabs = document.querySelectorAll('#process-timeline .timeline-step[data-step]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        var stepNum = parseInt(tab.getAttribute('data-step'), 10);
        if (journey) {
          goToProcessStep(stepNum, !reduced, { skipProgress: true });
          scrollProcessToStep(stepNum, reduced ? 'auto' : 'smooth');
        } else {
          goToProcessStep(stepNum, !reduced);
        }
      });
    });

    var nextBtn = document.getElementById('process-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentActiveStep >= PROCESS_STEP_COUNT) {
          var why = document.getElementById('why-speego');
          if (why) why.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          return;
        }
        if (journey) {
          var next = currentActiveStep + 1;
          goToProcessStep(next, !reduced, { skipProgress: true });
          scrollProcessToStep(next, reduced ? 'auto' : 'smooth');
        } else {
          goToProcessStep(currentActiveStep + 1, !reduced);
        }
      });
    }

    var scrollHint = document.getElementById('process-scroll-indicator');
    if (scrollHint) {
      scrollHint.addEventListener('click', function (e) {
        if (!journey || currentActiveStep >= PROCESS_STEP_COUNT) return;
        e.preventDefault();
        var next = Math.min(PROCESS_STEP_COUNT, currentActiveStep + 1);
        goToProcessStep(next, !reduced, { skipProgress: true });
        scrollProcessToStep(next, reduced ? 'auto' : 'smooth');
      });
    }

    section.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentActiveStep >= PROCESS_STEP_COUNT) return;
        var next = currentActiveStep + 1;
        if (journey) {
          goToProcessStep(next, !reduced, { skipProgress: true });
          scrollProcessToStep(next, reduced ? 'auto' : 'smooth');
        } else {
          goToProcessStep(next, !reduced);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentActiveStep <= 1) return;
        var prev = currentActiveStep - 1;
        if (journey) {
          goToProcessStep(prev, !reduced, { skipProgress: true });
          scrollProcessToStep(prev, reduced ? 'auto' : 'smooth');
        } else {
          goToProcessStep(prev, !reduced);
        }
      }
    });

    renderStepDetail(1, false);
    if (journey) syncFromScroll();
  }

  // =========================================================================
  // 6. CONSULTATION FORM & GOOGLE SHEETS WEBHOOK INTEGRATION
  // =========================================================================
  // To connect real Google Sheet, paste your Google Apps Script Web App URL here:
  const GOOGLE_SHEET_WEBHOOK_URL = '';

  function getConsultSuccessMessage() {
    if (currentLang === 'vi') {
      return 'Yêu cầu tư vấn đã được gửi thành công! Chuyên viên SpeeGo sẽ liên hệ lại trong 2 giờ.';
    }
    if (currentLang === 'es') {
      return '¡Solicitud enviada con éxito! Un especialista de SpeeGo le contactará en breve.';
    }
    return 'Consultation request sent successfully! A SpeeGo specialist will contact you shortly.';
  }

  function submitConsultationLead(formData, form, submitBtn) {
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    try {
      const stored = JSON.parse(safeStorage.getItem('speego_leads') || '[]');
      stored.push(formData);
      safeStorage.setItem('speego_leads', JSON.stringify(stored));
    } catch (err) {
      console.warn('Could not store lead to safeStorage', err);
    }

    function finishOk() {
      showToast(getConsultSuccessMessage(), 'success');
      if (form) form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }

    if (GOOGLE_SHEET_WEBHOOK_URL) {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(finishOk)
        .catch(finishOk);
    } else {
      setTimeout(finishOk, 800);
    }
  }

  function bindConsultationForm(form, fieldMap) {
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const getVal = function (id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const formData = {
        fullName: getVal(fieldMap.name),
        phone: getVal(fieldMap.phone),
        email: getVal(fieldMap.email),
        company: fieldMap.company ? getVal(fieldMap.company) : '',
        service: getVal(fieldMap.service),
        route: fieldMap.route ? getVal(fieldMap.route) : '',
        notes: getVal(fieldMap.msg),
        source: fieldMap.source || 'consultation',
        timestamp: new Date().toISOString(),
        language: currentLang
      };

      if (!formData.fullName || !formData.phone || !formData.email || !formData.notes) {
        showToast(
          currentLang === 'vi'
            ? 'Vui lòng điền đầy đủ các trường bắt buộc.'
            : (currentLang === 'es'
              ? 'Complete todos los campos obligatorios.'
              : 'Please fill in all required fields.'),
          'success'
        );
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitConsultationLead(formData, form, submitBtn);
    });
  }

  function initConsultationForm() {
    // Full page consultation section
    bindConsultationForm(document.getElementById('speego-consultation-form'), {
      name: 'speego-form-name',
      phone: 'speego-form-phone',
      email: 'speego-form-email',
      company: 'speego-form-company',
      service: 'speego-form-service',
      route: 'speego-form-route',
      msg: 'speego-form-msg',
      source: 'page-consultation'
    });

    // Hero console Form tab
    bindConsultationForm(document.getElementById('speego-hero-consult-form'), {
      name: 'speego-hero-form-name',
      phone: 'speego-hero-form-phone',
      email: 'speego-hero-form-email',
      service: 'speego-hero-form-service',
      msg: 'speego-hero-form-msg',
      source: 'hero-console'
    });
  }

  function showToast(message, type) {
    let toast = document.getElementById('speego-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'speego-toast';
      toast.className = 'speego-toast';
      document.body.appendChild(toast);
    }

    toast.className = `speego-toast ${type} show`;
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #10b981; font-size: 18px;"></i> <span>${message}</span>`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // =========================================================================
  // 7. HERO STATS COUNT-UP ANIMATION
  // =========================================================================
  function animateStatCount(el, duration) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic for a natural finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function initHeroStatCounters() {
    const stats = document.querySelectorAll('.speego-hero-stat-num[data-count]');
    if (!stats.length) return;

    const row = document.querySelector('.speego-hero-stats-row');
    if (!row) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          stats.forEach(function (el) {
            animateStatCount(el, 1600);
          });
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(row);
  }

  // =========================================================================
  // 8. TRUST BAR — LOAD & SCROLL LOGOS FROM logos-partners FOLDER
  // =========================================================================
  // Source: wp-content/themes/logistica/images/logos-partners/
  // Excludes SpeeGo brand mark & Zalo icon (not shipping partners)
  const PARTNER_LOGOS = [
    { file: '025-Vietnam_Airlines_logo.svg_.png', name: 'Vietnam Airlines Cargo' },
    { file: '029-Press-Release-image-Cathay-Cargo-Logo-scaled.png', name: 'Cathay Cargo' },
    { file: '028-Singapore-Airlines-Cargo-Logo-scaled.png', name: 'Singapore Airlines Cargo' },
    { file: '024-American-Airlines-Cargo_0.png', name: 'American Airlines Cargo' },
    { file: '026-Air_Canada_Cargo_logo.svg_.png', name: 'Air Canada Cargo' },
    { file: '023-China-Eastern-Airlines-Logo-scaled.png', name: 'China Eastern Airlines Cargo' },
    { file: '027-Qantas_Freight_Logo.svg_.png', name: 'Qantas Freight' },
    { file: '031-Logo_di_Air_China_Cargo.png', name: 'Air China Cargo' },
    { file: '032-Hong_Kong_Airlines-Logo.wine_-scaled.png', name: 'Hong Kong Airlines Cargo' },
    { file: '022-UPS_Logo_Shield_2017.svg-1.png', name: 'UPS Supply Chain Solutions' },
    { file: '043-ft-logo.png', name: 'FT Express Freight Logistics' },
    { file: '020-image-7.png', name: 'Global Logistics Partner' },
    { file: '021-image-3.png', name: 'International Cargo Network' }
  ];

  function buildPartnerLogoItems(baseDir) {
    return PARTNER_LOGOS.map(function (logo) {
      return (
        '<div class="speego-trust-logo-item" title="' + logo.name + '">' +
          '<img src="' + baseDir + '/' + logo.file + '" alt="' + logo.name + '" ' +
          'class="speego-trust-logo-img" loading="lazy">' +
        '</div>'
      );
    }).join('');
  }

  function initTrustPartnerMarquee() {
    const track = document.getElementById('speego-trust-logo-track');
    if (!track) return;

    const baseDir = track.getAttribute('data-partners-dir') ||
      'wp-content/themes/logistica/images/logos-partners';

    const itemsHtml = buildPartnerLogoItems(baseDir);
    // Duplicate set for seamless infinite scroll (translateX -50%)
    track.innerHTML = itemsHtml + itemsHtml;
  }

  // =========================================================================
  // 9. INITIALIZATION ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    // Language dropdown toggle
    const langBtn = document.getElementById('speego-lang-toggle');
    const langDropdown = document.getElementById('speego-lang-dropdown');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
      });

      document.querySelectorAll('.speego-lang-option').forEach(item => {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          const targetLang = this.getAttribute('data-lang');
          applyLanguage(targetLang);
          langDropdown.classList.remove('active');
        });
      });

      document.addEventListener('click', function () {
        langDropdown.classList.remove('active');
      });
    }

    // Apply initial language (English default)
    applyLanguage(currentLang);

    // Initialize components
    initHeroSliderNav();
    initHeroConsole();
    initProcessTabs();
    initConsultationForm();
    initHeroStatCounters();
    initTrustPartnerMarquee();
  });
})();
