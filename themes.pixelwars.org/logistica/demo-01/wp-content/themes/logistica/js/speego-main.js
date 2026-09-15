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
      hero_title_row1: 'From sourcing',
      hero_title_row2_to: 'To',
      hero_title_row2_highlight: 'Global delivery',
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
      hero_title_prefix: 'From sourcing to',
      hero_title_highlight: 'Global delivery',
      hero_desc: 'We help businesses source, inspect, ship and fulfil with confidence — faster, safer and more cost-effective.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Request Consultation',
      hero_cta_quote: 'Get a Quote',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'INTRODUCTION',
      tab_form: 'CONSULTATION',
      tab_tracking: 'TRACKING',
      tab_quote: 'Quick Quote',
      tab_knowledge: 'Logistics Hub',

      intro_lead: 'SpeeGo Logistics connects factories in Vietnam & China to buyers in the US, Canada, and Australia — end to end.',
      intro_b1: 'Sourcing, MOQ negotiation & on-site QC',
      intro_b2: 'Ocean FCL/LCL & air freight with live OMS tracking',
      intro_b3: 'Customs clearance & destination fulfillment',
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
      about_title: 'About us',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> pioneers multi-industry manufacturing and global logistics services, connecting production – shipping – distribution so businesses can expand into new markets.',
      about_desc2: 'From verified supplier matching and MOQ price negotiation to stringent on-site QC inspection, customs clearance, and omnichannel fulfillment, we empower businesses to scale globally with transparency and zero hidden costs.',
      about_btn: 'Learn more',
      about_badge_text: 'Global Trade Lanes Active',

      // 4 Services
      services_tag: 'NĂNG LỰC CỐT LÕI',
      services_title: 'SpeeGo Logistics core services',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'SpeeGo Logistics Core Services',
      trust_section_subtitle: 'Safety, schedule, cost clarity, and long-term partnership — built into every shipment.',
      srv_feat1_title: 'Safe',
      srv_feat1_desc: 'Cargo always protected',
      srv_feat2_title: 'On schedule',
      srv_feat2_desc: 'Clear timeline commitment',
      srv_feat3_title: 'Cost optimized',
      srv_feat3_desc: 'Efficient shipping solutions',
      srv_feat4_title: 'Long-term partnership',
      srv_feat4_desc: 'Sustainable growth partner',

      // 8-Step Process Tabs
      process_tag: 'STANDARDIZED PROCESS',
      process_title: '8-step operating process',
      process_subtitle: 'Transparent at every stage — from idea to goods arriving at your warehouse.',
      process_step_label: 'STEP',
      process_micro_brand: 'CONNECT BUSINESSES\nWITH THE WORLD',
      process_side_copy: 'FASTER\nSAFER\nSMARTER\nTOGETHER\nFURTHER',
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
      why_title: 'Why choose SpeeGo Logistics',
      why_subtitle: 'Transparent value, synchronized infrastructure, and a dedicated expert team.',
      why1_title: 'Multi-industry supply chain',
      why1_desc: 'Meeting every manufacturing and international shipping need. Strongest in cosmetics, nail accessories, furniture, and more.',
      why2_title: 'Factory network across China & Vietnam',
      why2_desc: 'Partner factories and workshops across China and Vietnam — price deals and MOQs matched to your business.',
      why3_title: 'Diverse shipping modes',
      why3_desc: 'FCL and LCL via air and ocean from Vietnam and China to the US, Australia, and Canada.',
      why4_title: 'No hidden costs',
      why4_desc: 'SpeeGo Logistics provides itemized quotes with a 100% commitment — no surprise fees.',
      stat_partners: 'Global Partners',
      stat_delivery: 'On-time Delivery',
      stat_countries: 'Countries Covered',
      hero_scroll_explore: 'SCROLL TO EXPLORE',
      hero_trust_label: 'TRUSTED BY GROWING BUSINESSES',
      hero_trust_more: 'AND MANY MORE',

      // Hero legacy compat
      hero_badge: 'GLOBAL LOGISTICS PARTNER',
      hero_title_prefix: 'From sourcing to',
      hero_title_highlight: 'Global delivery',
      hero_desc: 'We help businesses source, inspect, ship and fulfil with confidence — faster, safer and more cost-effective.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Request Consultation',
      hero_cta_quote: 'Get a Quote',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'INTRODUCTION',
      tab_form: 'CONSULTATION',
      tab_tracking: 'TRACKING',
      tab_quote: 'Quick Quote',
      tab_knowledge: 'Logistics Hub',

      intro_lead: 'SpeeGo Logistics connects factories in Vietnam & China to buyers in the US, Canada, and Australia — end to end.',
      intro_b1: 'Sourcing, MOQ negotiation & on-site QC',
      intro_b2: 'Ocean FCL/LCL & air freight with live OMS tracking',
      intro_b3: 'Customs clearance & destination fulfillment',
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
      about_title: 'About us',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> pioneers multi-industry manufacturing and global logistics services, connecting production – shipping – distribution so businesses can expand into new markets.',
      about_desc2: 'From verified supplier matching and MOQ price negotiation to stringent on-site QC inspection, customs clearance, and omnichannel fulfillment, we empower businesses to scale globally with transparency and zero hidden costs.',
      about_btn: 'Learn more',
      about_badge_text: 'Global Trade Lanes Active',

      // 4 Services
      services_tag: 'NĂNG LỰC CỐT LÕI',
      services_title: 'SpeeGo Logistics core services',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'SpeeGo Logistics Core Services',
      trust_section_subtitle: 'Safety, schedule, cost clarity, and long-term partnership — built into every shipment.',
      srv_feat1_title: 'Safe',
      srv_feat1_desc: 'Cargo always protected',
      srv_feat2_title: 'On schedule',
      srv_feat2_desc: 'Clear timeline commitment',
      srv_feat3_title: 'Cost optimized',
      srv_feat3_desc: 'Efficient shipping solutions',
      srv_feat4_title: 'Long-term partnership',
      srv_feat4_desc: 'Sustainable growth partner',

      // 8-Step Process Tabs
      process_tag: 'STANDARDIZED WORKFLOW',
      process_title: '8-step standardized operating workflow',
      process_subtitle: 'End-to-end transparency and optimization from requirement intake to final delivery.',
      process_step_label: 'STEP',
      process_micro_brand: 'CONNECT BUSINESSES\nWITH THE WORLD',
      process_side_copy: 'FASTER\nSAFER\nSMARTER\nTOGETHER\nFURTHER',
      step1_title: 'Requirement intake',
      step1_desc: 'Capture your request and analyze business needs.',
      step2_title: 'Solution consulting',
      step2_desc: 'Provide in-depth solutions optimized for cost and timeline.',
      step3_title: 'Sourcing & factories',
      step3_desc: 'Source goods and connect factories, negotiate price and MOQ.',
      step4_title: 'Production supervision',
      step4_desc: "Track progress to keep the customer's production plan on schedule.",
      step5_title: 'Quality inspection',
      step5_desc: 'Inspect product quality before packing and factory release.',
      step6_title: 'Customs documents',
      step6_desc: 'Complete documentation and support required customs procedures.',
      step7_title: 'International freight',
      step7_desc: 'Ship by the appropriate mode to the correct delivery point.',
      step8_title: 'Payment & completion',
      step8_desc: 'Complete the transaction and hand over all related documents.',
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
      why_title: 'Why choose SpeeGo Logistics',
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
      form_tag_top: 'CONSULTATION FORM',
      form_tag: 'Consultation',
      form_title: 'Consultation & Quote Request',
      form_subtitle: 'Send your request and a SpeeGo Logistics specialist will respond with an optimal plan within two hours.',
      form_headline: 'Submit cargo details,<br>receive itemized<br>transparent quote.',
      form_lead: 'SpeeGo logistics specialists respond within business hours with tailored routes and schedules. 100% zero hidden costs.',
      form_card_title: 'Request Free Consultation',
      form_card_sub: 'Your information is used strictly for consultation.',
      form_name_lbl: 'FULL NAME',
      form_phone_lbl: 'PHONE NUMBER',
      form_email_lbl: 'EMAIL',
      form_service_lbl: 'SERVICE REQUIRED',
      form_msg_lbl: 'CONSULTATION DETAILS',
      form_submit_btn: 'Submit information',
      form_footnote: 'Data synced securely to SpeeGo Sheet based on active language.',
      form_name_ph: 'John Doe',
      form_phone_ph: '+1 555 000 0000',
      form_email_ph: 'contact@company.com',
      form_msg_ph: 'Product type, trade route, estimated volume...',

      // Partners & Testimonials & News
      partner_tag: 'Strategic Alliances',
      partner_title: 'International shipping routes',
      partner_subtitle: 'Flexible connections from China and Vietnam to key global markets.',
      partner_china_title: 'China routes',
      partner_vietnam_title: 'Vietnam routes',
      partner_cn_us: 'China → USA',
      partner_cn_us_meta: 'FCL · LCL · Air',
      partner_cn_ca: 'China → Canada',
      partner_cn_ca_meta: 'FCL · LCL',
      partner_cn_au: 'China → Australia',
      partner_cn_au_meta: 'FCL · LCL',
      partner_cn_other: 'China → other markets',
      partner_cn_other_meta: 'on request',
      partner_vn_us: 'Vietnam → USA',
      partner_vn_us_meta: 'FCL · LCL · Air',
      partner_vn_ca: 'Vietnam → Canada',
      partner_vn_ca_meta: 'FCL · LCL',
      partner_vn_au: 'Vietnam → Australia',
      partner_vn_au_meta: 'FCL · LCL',
      partner_vn_fulfillment: 'Fulfillment in Texas, USA',
      partner_vn_fulfillment_meta: 'Storage & local delivery',
      testi_tag: 'Testimonials',
      testi_title: 'What global business leaders say',
      news_tag: 'Market Intelligence',
      news_title: 'Latest logistics & trade insights',
      news_view_all: 'View All',
      news1_cat: 'Freight Market', news1_title: 'Trans-Pacific Ocean Rates Outlook & Peak Season Prep', news1_desc: 'Key strategies for importers to secure vessel capacity and avoid port demurrage during peak Q3/Q4 shipping cycles.',
      news2_cat: 'Air Freight', news2_title: 'Fast-Track Cosmetics & E-Commerce Clearance in the US', news2_desc: 'Understanding FDA prior notice, Section 321 exemptions, and expedited air customs declarations for rapid stock turn.',
      news3_cat: 'Factory Sourcing', news3_title: 'Navigating Low MOQs & Production Audits in Vietnam', news3_desc: 'How small and mid-sized e-commerce enterprises can leverage Vietnam’s growing manufacturing hub for high-yield margins.',
      news4_cat: 'Technology', news4_title: 'The Power of Real-time Order Management Systems (OMS)', news4_desc: 'Why end-to-end milestone visibility across maritime cargo and trucking is transforming modern supply chain resilience.',
      news_read: 'Read Analysis'
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
      hero_title_row1: 'Từ tìm nguồn hàng',
      hero_title_row2_to: 'Đến',
      hero_title_row2_highlight: 'Giao hàng toàn cầu',
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
      hero_title_prefix: 'Từ tìm nguồn hàng đến',
      hero_title_highlight: 'Giao hàng toàn cầu',
      hero_desc: 'Dịch vụ tìm nguồn hàng, đàm phán nhà máy, kiểm định chất lượng QC, vận chuyển quốc tế và fulfillment trọn gói kết nối Việt Nam & Trung Quốc đi Mỹ, Úc, Canada.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Nhận tư vấn miễn phí',
      hero_cta_quote: 'Báo giá chi tiết',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'GIỚI THIỆU',
      tab_form: 'FORM NHẬP',
      tab_tracking: 'TRACKING',
      tab_quote: 'Form Báo Giá Nhanh',
      tab_knowledge: 'Cẩm Nang Logistics',

      intro_lead: 'SpeeGo Logistics kết nối nhà máy Việt Nam & Trung Quốc tới người mua tại Mỹ, Canada và Úc — trọn chuỗi.',
      intro_b1: 'Tìm nguồn, đàm phán MOQ & QC tại xưởng',
      intro_b2: 'FCL/LCL đường biển & hàng không kèm OMS realtime',
      intro_b3: 'Hải quan & fulfillment tại điểm đến',
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
      about_title: 'Về chúng tôi',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> tiên phong trong sản xuất đa lĩnh vực và cung ứng dịch vụ logistics toàn cầu, mang sứ mệnh kết nối chuỗi giá trị sản xuất – vận chuyển – phân phối, giúp doanh nghiệp mở rộng thị trường kinh doanh',
      about_desc2: 'Từ việc thẩm định nhà xưởng uy tín, hỗ trợ deal giá và MOQ tốt nhất đến kiểm tra chất lượng tại chỗ (QC), hoàn tất chứng từ hải quan và fulfillment kho bãi, chúng tôi giúp doanh nghiệp tối ưu chi phí và tăng trưởng bền vững.',
      about_btn: 'Tìm hiểu thêm',
      about_badge_text: 'Tuyến vận tải quốc tế trực tiếp',

            // 4 Services
      services_tag: 'NĂNG LỰC CỐT LÕI',
      services_title: '<span class="speego-accent-num">4</span> Dịch vụ trọng tâm của SpeeGo',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'Cam kết của SpeeGo Logistics',
      trust_section_subtitle: 'An toàn, đúng tiến độ, chi phí rõ ràng và đồng hành dài hạn — trong mọi lô hàng.',
      srv_feat1_title: 'An toàn',
      srv_feat1_desc: 'Hàng hóa luôn được bảo vệ',
      srv_feat2_title: 'Đúng tiến độ',
      srv_feat2_desc: 'Cam kết lịch trình rõ ràng',
      srv_feat3_title: 'Tối ưu chi phí',
      srv_feat3_desc: 'Giải pháp vận chuyển hiệu quả',
      srv_feat4_title: 'Đồng hành dài hạn',
      srv_feat4_desc: 'Đối tác tăng trưởng bền vững',

      // 8-Step Process Tabs
      process_tag: 'QUY TRÌNH CHUẨN HÓA',
      process_title: 'Quy trình vận hành 8 bước',
      process_subtitle: 'Minh bạch từng giai đoạn, đồng hành cùng quý doanh nghiệp từ ý tưởng đến khi hàng hóa vào tận kho.',
      process_step_label: 'BƯỚC',
      process_micro_brand: 'KẾT NỐI DOANH NGHIỆP\nVỚI THẾ GIỚI',
      process_side_copy: 'NHANH HƠN\nAN TOÀN HƠN\nTHÔNG MINH HƠN\nCÙNG NHAU\nVƯƠN XA',
      step1_title: 'Tiếp nhận thông tin',
      step1_desc: 'Tiếp nhận yêu cầu và phân tích nhu cầu của doanh nghiệp.',
      step2_title: 'Tư vấn giải pháp',
      step2_desc: 'Đề xuất chuyên sâu các giải pháp tối ưu về chi phí và thời gian.',
      step3_title: 'Tìm nguồn hàng & nhà máy',
      step3_desc: 'Tìm nguồn hàng & kết nối nhà máy, deal giá & MOQ.',
      step4_title: 'Giám sát sản xuất',
      step4_desc: 'Theo dõi tiến độ, đảm bảo kế hoạch sản xuất cho khách hàng.',
      step5_title: 'Kiểm tra chất lượng',
      step5_desc: 'Kiểm tra chất lượng hàng hóa trước khi đóng gói và xuất xưởng.',
      step6_title: 'Chứng từ thuế quan',
      step6_desc: 'Hoàn thiện chứng từ và hỗ trợ các thủ tục hải quan cần thiết.',
      step7_title: 'Vận chuyển quốc tế',
      step7_desc: 'Vận chuyển bằng phương thức phù hợp đến đúng điểm nhận.',
      step8_title: 'Thanh toán & hoàn tất',
      step8_desc: 'Hoàn tất giao dịch và bàn giao đầy đủ hồ sơ liên quan.',
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
      why_title: 'Tại sao nên chọn SpeeGo Logistics',
      why_subtitle: 'Cam kết giá trị minh bạch, hạ tầng đồng bộ và đội ngũ chuyên gia tận tâm',
      why1_title: 'Chuỗi cung ứng đa lĩnh vực',
      why1_desc: 'Đáp ứng mọi nhu cầu sản xuất và vận chuyển quốc tế cho doanh nghiệp của bạn. Nổi bật nhất trong sản xuất mỹ phẩm, phụ kiện nails, nội thất...',
      why2_title: 'Mạng lưới nhà máy rộng khắp TQ, VN',
      why2_desc: 'Hệ thống đối tác, nhà máy, xưởng sản xuất trên toàn Trung Quốc và Việt Nam, hỗ trợ deal giá và MOQ phù hợp với nhu cầu doanh nghiệp.',
      why3_title: 'Đa dạng phương thức vận chuyển',
      why3_desc: 'Hỗ trợ FCL, LCL theo đường hàng không và đường biển, tuyến Việt Nam và Trung Quốc đi Mỹ, Úc, Canada.',
      why4_title: 'Cam kết không chi phí ẩn',
      why4_desc: 'SpeeGo Logistics báo giá chi tiết từng hạng mục, cam kết 100% không phát sinh bất kỳ chi phí ẩn nào khác.',
      why5_title: 'Đội ngũ hỗ trợ nhanh chóng',
      stat_delivery: 'Giao Hàng Đúng Hạn',
      stat_countries: 'Quốc Gia Phủ Sóng',
      hero_scroll_explore: 'CUỘN ĐỂ KHÁM PHÁ',
      hero_trust_label: 'ĐƯỢC TIN CHỌN BỞI CÁC DOANH NGHIỆP PHÁT TRIỂN',
      hero_trust_more: 'VÀ NHIỀU ĐỐI TÁC KHÁC',

      // Hero legacy compat
      hero_badge: 'ĐỐI TÁC LOGISTICS TOÀN CẦU',
      hero_title_prefix: 'Từ tìm nguồn hàng đến',
      hero_title_highlight: 'Giao hàng toàn cầu',
      hero_desc: 'Dịch vụ tìm nguồn hàng, đàm phán nhà máy, kiểm định chất lượng QC, vận chuyển quốc tế và fulfillment trọn gói kết nối Việt Nam & Trung Quốc đi Mỹ, Úc, Canada.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Nhận tư vấn miễn phí',
      hero_cta_quote: 'Báo giá chi tiết',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'GIỚI THIỆU',
      tab_form: 'FORM NHẬP',
      tab_tracking: 'TRACKING',
      tab_quote: 'Form Báo Giá Nhanh',
      tab_knowledge: 'Cẩm Nang Logistics',

      intro_lead: 'SpeeGo Logistics kết nối nhà máy Việt Nam & Trung Quốc tới người mua tại Mỹ, Canada và Úc — trọn chuỗi.',
      intro_b1: 'Tìm nguồn, đàm phán MOQ & QC tại xưởng',
      intro_b2: 'FCL/LCL đường biển & hàng không kèm OMS realtime',
      intro_b3: 'Hải quan & fulfillment tại điểm đến',
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
      about_title: 'Về chúng tôi',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> tiên phong trong sản xuất đa lĩnh vực và cung ứng dịch vụ logistics toàn cầu, mang sứ mệnh kết nối chuỗi giá trị sản xuất – vận chuyển – phân phối, giúp doanh nghiệp mở rộng thị trường kinh doanh',
      about_desc2: 'Từ việc thẩm định nhà xưởng uy tín, hỗ trợ deal giá và MOQ tốt nhất đến kiểm tra chất lượng tại chỗ (QC), hoàn tất chứng từ hải quan và fulfillment kho bãi, chúng tôi giúp doanh nghiệp tối ưu chi phí và tăng trưởng bền vững.',
      about_btn: 'Tìm hiểu thêm',
      about_badge_text: 'Tuyến vận tải quốc tế trực tiếp',

            // 4 Services
      services_tag: 'NĂNG LỰC CỐT LÕI',
      services_title: '<span class="speego-accent-num">4</span> Dịch vụ trọng tâm của SpeeGo',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'Cam kết của SpeeGo Logistics',
      trust_section_subtitle: 'An toàn, đúng tiến độ, chi phí rõ ràng và đồng hành dài hạn — trong mọi lô hàng.',
      srv_feat1_title: 'An toàn',
      srv_feat1_desc: 'Hàng hóa luôn được bảo vệ',
      srv_feat2_title: 'Đúng tiến độ',
      srv_feat2_desc: 'Cam kết lịch trình rõ ràng',
      srv_feat3_title: 'Tối ưu chi phí',
      srv_feat3_desc: 'Giải pháp vận chuyển hiệu quả',
      srv_feat4_title: 'Đồng hành dài hạn',
      srv_feat4_desc: 'Đối tác tăng trưởng bền vững',

      // 8-Step Process Tabs
      process_tag: 'QUY TRÌNH CHUẨN HÓA',
      process_title: 'Quy trình vận hành 8 bước',
      process_subtitle: 'Minh bạch từng giai đoạn, đồng hành cùng quý doanh nghiệp từ ý tưởng đến khi hàng hóa vào tận kho.',
      process_step_label: 'BƯỚC',
      process_micro_brand: 'KẾT NỐI DOANH NGHIỆP\nVỚI THẾ GIỚI',
      process_side_copy: 'NHANH HƠN\nAN TOÀN HƠN\nTHÔNG MINH HƠN\nCÙNG NHAU\nVƯƠN XA',
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
      why_title: 'Tại sao nên chọn SpeeGo Logistics',
      why_subtitle: 'Cam kết giá trị minh bạch, hạ tầng đồng bộ và đội ngũ chuyên gia tận tâm',
      why1_title: 'Chuỗi cung ứng đa lĩnh vực',
      why1_desc: 'Đáp ứng mọi nhu cầu sản xuất và vận chuyển quốc tế cho doanh nghiệp của bạn. Nổi bật nhất trong sản xuất mỹ phẩm, phụ kiện nails, nội thất...',
      why2_title: 'Mạng lưới nhà máy rộng khắp TQ, VN',
      why2_desc: 'Hệ thống đối tác, nhà máy, xưởng sản xuất trên toàn Trung Quốc và Việt Nam, hỗ trợ deal giá và MOQ phù hợp với nhu cầu doanh nghiệp.',
      why3_title: 'Đa dạng phương thức vận chuyển',
      why3_desc: 'Hỗ trợ FCL, LCL theo đường hàng không và đường biển, tuyến Việt Nam và Trung Quốc đi Mỹ, Úc, Canada.',
      why4_title: 'Cam kết không chi phí ẩn',
      why4_desc: 'SpeeGo Logistics báo giá chi tiết từng hạng mục, cam kết 100% không phát sinh bất kỳ chi phí ẩn nào khác.',
      why5_title: 'Đội ngũ hỗ trợ nhanh chóng',
      why5_desc: 'Đội ngũ chuyên viên giàu kinh nghiệm luôn sẵn sàng tư vấn, cập nhật tình trạng lô hàng và hỗ trợ xử lý vấn đề phát sinh kịp thời.',
      why6_title: 'Tracking bằng hệ thống OMS',
      why6_desc: 'Theo dõi tình trạng đơn hàng theo thời gian thực một cách nhanh chóng, thuận tiện và chính xác.',

      // Consultation Form
      form_tag: 'Đăng ký tư vấn',
      form_tag_top: 'FORM TƯ VẤN',
      form_headline: 'Gửi thông tin lô hàng,<br>nhận báo giá chi<br>tiết từng hạng mục.',
      form_lead: 'Chuyên viên SpeeGo phản hồi trong giờ làm việc, kèm phương án vận chuyển và mốc thời gian dự kiến. Cam kết 100% không phát sinh chi phí ẩn.',
      form_card_title: 'Đăng ký tư vấn miễn phí',
      form_card_sub: 'Thông tin của bạn chỉ dùng để liên hệ tư vấn.',
      form_name_lbl: 'HỌ VÀ TÊN',
      form_phone_lbl: 'SỐ ĐIỆN THOẠI',
      form_email_lbl: 'EMAIL',
      form_service_lbl: 'DỊCH VỤ QUAN TÂM',
      form_msg_lbl: 'NỘI DUNG CẦN TƯ VẤN',
      form_submit_btn: 'Gửi thông tin',
      form_footnote: 'Dữ liệu đổ về Google Sheet theo phiên bản ngôn ngữ đang xem.',
      form_name_ph: 'Nguyễn Văn A',
      form_phone_ph: '09xx xxx xxx',
      form_email_ph: 'ban@congty.com',
      form_msg_ph: 'Ngành hàng, tuyến vận chuyển, sản lượng dự kiến...',

      // Partners & Testimonials & News
      partner_tag: 'Mạng Lưới Đối Tác',
      partner_title: 'Tuyến vận chuyển quốc tế',
      partner_subtitle: 'Kết nối linh hoạt từ Trung Quốc và Việt Nam đến các thị trường trọng điểm.',
      partner_china_title: 'Tuyến Trung Quốc',
      partner_vietnam_title: 'Tuyến Việt Nam',
      partner_cn_us: 'Trung Quốc → Mỹ',
      partner_cn_us_meta: 'FCL · LCL · Air',
      partner_cn_ca: 'Trung Quốc → Canada',
      partner_cn_ca_meta: 'FCL · LCL',
      partner_cn_au: 'Trung Quốc → Úc',
      partner_cn_au_meta: 'FCL · LCL',
      partner_cn_other: 'Trung Quốc → thị trường khác',
      partner_cn_other_meta: 'theo yêu cầu',
      partner_vn_us: 'Việt Nam → Mỹ',
      partner_vn_us_meta: 'FCL · LCL · Air',
      partner_vn_ca: 'Việt Nam → Canada',
      partner_vn_ca_meta: 'FCL · LCL',
      partner_vn_au: 'Việt Nam → Úc',
      partner_vn_au_meta: 'FCL · LCL',
      partner_vn_fulfillment: 'Fulfillment tại Texas, Mỹ',
      partner_vn_fulfillment_meta: 'kho & giao nội địa',
      testi_tag: 'Đánh giá khách hàng',
      testi_title: 'Khách hàng quốc tế nói về SpeeGo Logistics',
      news_tag: 'Bản tin thị trường',
      news_title: 'Tin tức chuỗi cung ứng<br>&amp; vận tải biển mới nhất',
      news_view_all: 'Xem tất cả',
      news1_cat: 'Thị trường vận tải', news1_title: 'Cước vận tải xuyên Thái Bình Dương và kế hoạch mùa cao điểm', news1_desc: 'Chiến lược giúp doanh nghiệp chủ động chỗ tàu, tối ưu chi phí và hạn chế lưu container trong mùa cao điểm.',
      news2_cat: 'Hàng không', news2_title: 'Thông quan nhanh mỹ phẩm và hàng e-commerce tại Mỹ', news2_desc: 'Các lưu ý về FDA, miễn trừ Section 321 và quy trình khai báo hàng không nhanh chóng.',
      news3_cat: 'Tìm nguồn nhà máy', news3_title: 'Tối ưu MOQ và kiểm định sản xuất tại Việt Nam', news3_desc: 'Cách doanh nghiệp khai thác năng lực sản xuất Việt Nam với quy trình kiểm định minh bạch.',
      news4_cat: 'Công nghệ', news4_title: 'Sức mạnh của hệ thống quản lý đơn hàng OMS thời gian thực', news4_desc: 'Theo dõi toàn bộ hành trình hàng hóa giúp chuỗi cung ứng vận hành linh hoạt và chính xác hơn.',
      news_read: 'Xem phân tích'
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
      hero_title_row1: 'Desde el abastecimiento',
      hero_title_row2_to: 'hasta la',
      hero_title_row2_highlight: 'Entrega global',
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
      hero_title_prefix: 'Desde el abastecimiento hasta la',
      hero_title_highlight: 'Entrega global',
      hero_desc: 'Abastecimiento integral, negociación con fábricas, control de calidad QC, flete internacional y fulfillment moderno conectando Vietnam y China con EE.UU., Canadá y Australia.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Solicitar Asesoría',
      hero_cta_quote: 'Cotización Detallada',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'INTRODUCCIÓN',
      tab_form: 'FORMULARIO',
      tab_tracking: 'TRACKING',
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
      about_title: 'Sobre nosotros',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> es pionera en fabricación multiindustria y logística global, conectando producción – transporte – distribución para que las empresas expandan sus mercados.',
      about_desc2: 'Desde la auditoría de fábricas y negociación de MOQ hasta inspecciones QC en sitio, gestión aduanal y fulfillment omnicanal, impulsamos el crecimiento de su negocio sin costos ocultos.',
      about_btn: 'Saber más',
      about_badge_text: 'Rutas Comerciales Activas',

      // 4 Services
      services_tag: 'Capacidades',
      services_title: '<span class="speego-accent-num">4</span> Servicios clave de SpeeGo',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'Compromisos de SpeeGo Logistics',
      trust_section_subtitle: 'Seguridad, puntualidad, costos claros y alianza a largo plazo — en cada envío.',
      srv_feat1_title: 'Seguro',
      srv_feat1_desc: 'Mercancía siempre protegida',
      srv_feat2_title: 'A tiempo',
      srv_feat2_desc: 'Compromiso de calendario claro',
      srv_feat3_title: 'Costo optimizado',
      srv_feat3_desc: 'Soluciones de envío eficientes',
      srv_feat4_title: 'Alianza a largo plazo',
      srv_feat4_desc: 'Socio de crecimiento sostenible',

      // 8-Step Process Tabs
      process_tag: 'PROCESO ESTANDARIZADO',
      process_title: 'Proceso operativo de 8 pasos',
      process_subtitle: 'Transparencia en cada etapa, acompañando a su empresa desde la idea hasta que la mercancía llega al almacén.',
      process_step_label: 'PASO',
      process_micro_brand: 'CONECTAMOS EMPRESAS\nCON EL MUNDO',
      process_side_copy: 'MÁS RÁPIDO\nMÁS SEGURO\nMÁS INTELIGENTE\nJUNTOS\nMÁS LEJOS',
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
      why_title: 'Por qué elegir SpeeGo Logistics',
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
stat_delivery: 'Entrega a Tiempo',
      stat_countries: 'Países Cubiertos',
      hero_scroll_explore: 'DESPLAZARSE PARA EXPLORAR',
      hero_trust_label: 'CON LA CONFIANZA DE EMPRESAS EN CRECIMIENTO',
      hero_trust_more: 'Y MUCHOS MÁS',

      // Hero legacy compat
      hero_badge: 'SOCIO LOGÍSTICO GLOBAL',
      hero_title_prefix: 'Desde el abastecimiento hasta la',
      hero_title_highlight: 'Entrega global',
      hero_desc: 'Abastecimiento integral, negociación con fábricas, control de calidad QC, flete internacional y fulfillment moderno conectando Vietnam y China con EE.UU., Canadá y Australia.',
      hero_cta_call: '(+84) 906 828 898',
      hero_cta_form: 'Solicitar Asesoría',
      hero_cta_quote: 'Cotización Detallada',

      // 3-Tab Console (Intro / Form / Tracking)
      tab_intro: 'INTRODUCCIÓN',
      tab_form: 'FORMULARIO',
      tab_tracking: 'TRACKING',
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
      about_title: 'Sobre nosotros',
      about_desc1: '<strong class="speego-brand-name">SpeeGo</strong> <strong class="speego-brand-logistics">Logistics</strong> es pionera en fabricación multiindustria y logística global, conectando producción – transporte – distribución para que las empresas expandan sus mercados.',
      about_desc2: 'Desde la auditoría de fábricas y negociación de MOQ hasta inspecciones QC en sitio, gestión aduanal y fulfillment omnicanal, impulsamos el crecimiento de su negocio sin costos ocultos.',
      about_btn: 'Saber más',
      about_badge_text: 'Rutas Comerciales Activas',

      // 4 Services
      services_tag: 'Capacidades',
      services_title: '<span class="speego-accent-num">4</span> Servicios clave de SpeeGo',
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
      srv_learn_more: 'Xem dịch vụ',
      trust_section_title: 'Compromisos de SpeeGo Logistics',
      trust_section_subtitle: 'Seguridad, puntualidad, costos claros y alianza a largo plazo — en cada envío.',
      srv_feat1_title: 'Seguro',
      srv_feat1_desc: 'Mercancía siempre protegida',
      srv_feat2_title: 'A tiempo',
      srv_feat2_desc: 'Compromiso de calendario claro',
      srv_feat3_title: 'Costo optimizado',
      srv_feat3_desc: 'Soluciones de envío eficientes',
      srv_feat4_title: 'Alianza a largo plazo',
      srv_feat4_desc: 'Socio de crecimiento sostenible',

      // 8-Step Process Tabs
      process_tag: 'FLUJO ESTANDARIZADO',
      process_title: 'Proceso operativo de 8 pasos',
      process_subtitle: 'Estandarización de la cadena de suministro desde la recepción, aprovisionamiento hasta el flete internacional.',
      process_step_label: 'PASO',
      process_micro_brand: 'CONECTAMOS EMPRESAS\nCON EL MUNDO',
      process_side_copy: 'MÁS RÁPIDO\nMÁS SEGURO\nMÁS INTELIGENTE\nJUNTOS\nMÁS LEJOS',
      step1_title: 'Recepción de información',
      step1_desc: 'Recibimos la solicitud y analizamos las necesidades de la empresa.',
      step2_title: 'Consultoría de soluciones',
      step2_desc: 'Proponemos soluciones especializadas optimizadas en costo y plazo.',
      step3_title: 'Sourcing y fábricas',
      step3_desc: 'Buscamos proveedores y conectamos fábricas; negociamos precio y MOQ.',
      step4_title: 'Supervisión de producción',
      step4_desc: 'Damos seguimiento al avance para mantener el plan de producción del cliente a tiempo.',
      step5_title: 'Control de calidad',
      step5_desc: 'Inspeccionamos la calidad del producto antes del empaque y la salida de fábrica.',
      step6_title: 'Documentos aduaneros',
      step6_desc: 'Completamos documentos y apoyamos los trámites aduaneros necesarios.',
      step7_title: 'Flete internacional',
      step7_desc: 'Transportamos por el medio adecuado hasta el punto de entrega correcto.',
      step8_title: 'Pago y finalización',
      step8_desc: 'Completamos la transacción y entregamos todos los documentos relacionados.',
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
      why_title: 'Por qué elegir SpeeGo Logistics',
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
      form_tag: 'Solicitar Cotización',      // Consultation Form
      form_tag_top: 'FORMULARIO DE CONSULTA',
      form_headline: 'Envíe los datos de su carga,<br>reciba cotización<br>desglosada y clara.',
      form_lead: 'Los especialistas de SpeeGo responden en horario laboral con alternativas y plazos estimados. 100% sin costos ocultos.',
      form_card_title: 'Solicitar asesoría gratuita',
      form_card_sub: 'Su información se utiliza únicamente para fines de asesoría.',
      form_name_lbl: 'NOMBRE COMPLETO',
      form_phone_lbl: 'TELÉFONO',
      form_email_lbl: 'CORREO ELECTRÓNICO',
      form_service_lbl: 'SERVICIO DE INTERÉS',
      form_msg_lbl: 'DETALLES DE LA CONSULTA',
      form_submit_btn: 'Enviar información',
      form_footnote: 'Datos enviados a Google Sheet según el idioma en uso.',
      form_name_ph: 'Juan Pérez',
      form_phone_ph: '+34 600 000 000',
      form_email_ph: 'contacto@empresa.com',
      form_msg_ph: 'Tipo de mercancía, ruta, volumen estimado...',

      // Partners & Testimonials & News
      partner_tag: 'Alianzas Estratégicas',
      partner_title: 'Rutas de transporte internacional',
      partner_subtitle: 'Conexiones flexibles desde China y Vietnam hacia mercados globales clave.',
      partner_china_title: 'Rutas desde China',
      partner_vietnam_title: 'Rutas desde Vietnam',
      partner_cn_us: 'China → EE. UU.',
      partner_cn_us_meta: 'FCL · LCL · Air',
      partner_cn_ca: 'China → Canadá',
      partner_cn_ca_meta: 'FCL · LCL',
      partner_cn_au: 'China → Australia',
      partner_cn_au_meta: 'FCL · LCL',
      partner_cn_other: 'China → otros mercados',
      partner_cn_other_meta: 'bajo solicitud',
      partner_vn_us: 'Vietnam → EE. UU.',
      partner_vn_us_meta: 'FCL · LCL · Air',
      partner_vn_ca: 'Vietnam → Canadá',
      partner_vn_ca_meta: 'FCL · LCL',
      partner_vn_au: 'Vietnam → Australia',
      partner_vn_au_meta: 'FCL · LCL',
      partner_vn_fulfillment: 'Fulfillment en Texas, EE. UU.',
      partner_vn_fulfillment_meta: 'Almacén y entrega local',
      testi_tag: 'Testimonios',
      testi_title: 'Opiniones de nuestros clientes internacionales',
      news_tag: 'Inteligencia de Mercado',
      news_title: 'Últimas noticias y tendencias de<br>transporte marítimo',
      news_view_all: 'Ver todo',
      news1_cat: 'Mercado de fletes', news1_title: 'Tarifas transpacíficas y preparación de temporada alta', news1_desc: 'Estrategias para asegurar capacidad y evitar demoras portuarias.',
      news2_cat: 'Carga aérea', news2_title: 'Despacho rápido de cosméticos y e-commerce en EE. UU.', news2_desc: 'Aspectos clave de FDA y despacho aduanero acelerado.',
      news3_cat: 'Abastecimiento', news3_title: 'MOQ y auditorías de producción en Vietnam', news3_desc: 'Cómo aprovechar la producción vietnamita con control de calidad.',
      news4_cat: 'Tecnología', news4_title: 'El poder del OMS en tiempo real', news4_desc: 'Visibilidad integral para una cadena de suministro más ágil.',
      news_read: 'Leer análisis'
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
      image: 'wp-content/uploads/sites/2/2023/08/process-step-02-solution-consulting.png',
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
      image: 'wp-content/uploads/sites/2/2023/08/foreman-control-loading-containers-box-from-cargo-freight-ship-import-export-created-with-generative-ai-technology.jpg',
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
      image: 'wp-content/uploads/sites/2/2023/08/transport-logistic-manager-engineer-checking-generative-ai-illustration.jpg',
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
      image: 'wp-content/themes/logistica/images/015-speego-logistics-services-1.jpg',
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
      image: 'wp-content/uploads/sites/2/2023/08/transport-logistic-manager-engineer-checking-generative-ai-illustration-copy.jpg',
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
      image: 'wp-content/themes/logistica/images/017-speego-logistics-services-4.jpg',
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

  // Keep the service section concise in every language. The section markup
  // intentionally has no eyebrow label and no numeric prefix.
  i18nData.en.services_title = 'SpeeGo Logistics core services';
  i18nData.vi.services_title = 'Dịch vụ trọng tâm của SpeeGo Logistics';
  i18nData.es.services_title = 'Servicios principales de SpeeGo Logistics';

  Object.assign(i18nData.en, {
    nav_testimonials: 'Reviews',
    policy_label: 'Policy',
    policy_privacy: 'Privacy Policy',
    policy_terms: 'Terms & Conditions',
    form_consult_title: 'Request a free consultation',
    form_consult_note: 'Your information is used only for consultation.',
    form_service_sourcing: 'Sourcing & QC (Factory sourcing & inspection)',
    form_service_logistics: 'International logistics (Ocean / Air freight)',
    form_service_fulfillment: 'Fulfillment, warehousing & order packing',
    form_service_customs: 'Customs procedures & import/export',
    form_service_all_in_one: 'End-to-end supply chain service',
    form_route_vn_us: 'Vietnam → United States (US)',
    form_route_cn_us: 'China → United States (US)',
    form_route_vn_cn_ca: 'Vietnam / China → Canada',
    form_route_vn_cn_au: 'Vietnam / China → Australia',
    form_route_other: 'Other shipping route',
    partners_title: 'Shipping & factory partners',
    partners_subtitle: 'Direct connections to trusted logistics and manufacturing networks in Vietnam, China, and international markets.',
    partners_shipping_title: 'Shipping partners',
    partners_shipping_desc: 'Working with airlines, shipping lines, and international logistics providers for clear schedules, transparent tracking, and optimized costs for every shipment.',
    partners_factory_title: 'Factory partners',
    partners_factory_desc: 'Our factory network in China and Vietnam supports sourcing, MOQ negotiation, production monitoring, and on-site quality inspection.',
    cookie_title: 'Cookie preferences',
    cookie_copy: 'We use cookies to improve your experience and analyze site traffic. You can choose which cookie categories to allow.',
    cookie_reject: 'Reject all',
    cookie_accept: 'Accept all'
  });

  Object.assign(i18nData.es, {
    nav_testimonials: 'Opiniones',
    policy_label: 'Políticas',
    policy_privacy: 'Política de privacidad',
    policy_terms: 'Términos y condiciones',
    form_consult_title: 'Solicita una consulta gratuita',
    form_consult_note: 'Tu información se utiliza únicamente para fines de asesoría.',
    form_invite: 'Completa el formulario · respuesta en 2 horas',
    form_name_lbl: 'Nombre completo *',
    form_phone_lbl: 'Teléfono / Zalo / WhatsApp *',
    form_email_lbl: 'Correo electrónico corporativo *',
    form_company_lbl: 'Nombre de empresa / Marca',
    form_service_lbl: 'Servicio de interés *',
    form_route_lbl: 'Ruta de envío de interés *',
    form_msg_lbl: 'Detalles de la consulta *',
    form_submit_btn: 'Enviar solicitud de consulta',
    form_footnote: 'Tu información está cifrada y se sincroniza de forma segura con el sistema de gestión de SpeeGo.',
    form_msg_ph: 'Describe el producto, volumen estimado (CBM / KG), destino y fecha deseada...',
    form_service_sourcing: 'Sourcing y QC (búsqueda e inspección de fábrica)',
    form_service_logistics: 'Logística internacional (marítima / aérea)',
    form_service_fulfillment: 'Fulfillment, almacén y preparación de pedidos',
    form_service_customs: 'Aduanas e importación / exportación',
    form_service_all_in_one: 'Servicio integral de cadena de suministro',
    form_route_vn_us: 'Vietnam → Estados Unidos (EE. UU.)',
    form_route_cn_us: 'China → Estados Unidos (EE. UU.)',
    form_route_vn_cn_ca: 'Vietnam / China → Canadá',
    form_route_vn_cn_au: 'Vietnam / China → Australia',
    form_route_other: 'Otra ruta de envío',
    partners_title: 'Socios de transporte y fábricas',
    partners_subtitle: 'Conexiones directas con redes logísticas y de producción de confianza en Vietnam, China y mercados internacionales.',
    partners_shipping_title: 'Socios de transporte',
    partners_shipping_desc: 'Colaboramos con aerolíneas, navieras y proveedores logísticos internacionales para ofrecer itinerarios claros, seguimiento transparente y costos optimizados en cada envío.',
    partners_factory_title: 'Socios de fábrica',
    partners_factory_desc: 'Nuestra red de fábricas en China y Vietnam apoya la búsqueda de proveedores, negociación de MOQ, seguimiento de producción e inspección de calidad en sitio.',
    cookie_title: 'Preferencias de cookies',
    cookie_copy: 'Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Puedes elegir las categorías de cookies que deseas permitir.',
    cookie_reject: 'Rechazar todo',
    cookie_accept: 'Aceptar todo'
  });

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

  let currentLang = getLangFromQuery() || safeStorage.getItem('speego_lang') || 'vi';
  if (!i18nData[currentLang]) currentLang = 'vi';

  // =========================================================================
  // 3. I18N ENGINE + HREFLANG / CANONICAL SYNC
  // =========================================================================
  function syncSeoLocale(lang) {
    const meta = LOCALE_META[lang] || LOCALE_META.vi || LOCALE_META.en;
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
      if (lang === 'vi') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  // A few legacy labels predate the data-i18n markup. Keep them reversible
  // until their templates are moved into the shared dictionary.
  const staticEnglishText = {
    'Xem dịch vụ': 'View service',
    'TIÊU CHUẨN & CAM KẾT': 'STANDARDS & COMMITMENT',
    'SpeeGo Logistics kết nối doanh nghiệp với mạng lưới hãng bay, đối tác vận tải và nhà máy tại Trung Quốc, Việt Nam.': 'SpeeGo Logistics connects businesses with airline, freight, and factory partners across China and Vietnam.',
    'Kết nối trực tiếp · Theo dõi minh bạch · Đồng hành trọn chuỗi': 'Direct connection · Transparent tracking · End-to-end support',
    'Đối tác vận chuyển': 'Shipping partners',
    'Nhà máy': 'Factories',
    'Trung Quốc': 'China',
    'Mạng lưới nhà máy đa ngành, hỗ trợ MOQ linh hoạt.': 'Multi-industry factory network with flexible MOQs.',
    'Việt Nam': 'Vietnam',
    'Đối tác sản xuất và kiểm định chất lượng tận nơi.': 'On-site production and quality-inspection partners.',
    'Gửi yêu cầu để chuyên viên SpeeGo Logistics phân tích và liên hệ phản hồi phương án tối ưu trong vòng 2 giờ.': 'Send your request and a SpeeGo Logistics specialist will respond with an optimal plan within two hours.',
    'FORM TƯ VẤN': 'CONSULTATION FORM',
    'Chuyên viên SpeeGo phản hồi trong giờ làm việc, kèm phương án vận chuyển và mốc thời gian dự kiến.': 'SpeeGo specialists respond during business hours with a shipping plan and estimated timeline.',
    'Đăng ký tư vấn miễn phí': 'Request a free consultation',
    'Thông tin của bạn chỉ dùng để liên hệ tư vấn.': 'Your information is used only for consultation.',
    'Điền ngay · phản hồi trong 2 giờ': 'Submit now · response within two hours',
    'Tên công ty / Thương hiệu': 'Company / Brand name',
    'Sourcing & QC (Tìm xưởng & Kiểm định)': 'Sourcing & QC (Factory sourcing & inspection)',
    'Logistics quốc tế (Đường biển / Hàng không)': 'International logistics (Ocean / Air freight)',
    'Fulfillment kho bãi & Đóng gói giao hàng': 'Fulfillment, warehousing & order packing',
    'Thủ tục hải quan & Xuất nhập khẩu': 'Customs procedures & import/export',
    'Trọn gói toàn chuỗi cung ứng': 'End-to-end supply chain service',
    'Tuyến vận chuyển quan tâm *': 'Shipping route of interest *',
    'Việt Nam ➔ Hoa Kỳ (US)': 'Vietnam ➔ United States (US)',
    'Trung Quốc ➔ Hoa Kỳ (US)': 'China ➔ United States (US)',
    'Việt Nam / Trung Quốc ➔ Canada': 'Vietnam / China ➔ Canada',
    'Việt Nam / Trung Quốc ➔ Úc (Australia)': 'Vietnam / China ➔ Australia',
    'Tuyến vận chuyển khác': 'Other shipping route',
    'Đơn vị sản xuất và cung cấp dịch vụ logistics toàn cầu. Chuyên tuyến Trung Quốc và Việt Nam đi Mỹ, Canada, Úc. Tối ưu chi phí, minh bạch hành trình.': 'Global manufacturing and logistics provider specializing in routes from China and Vietnam to the US, Canada, and Australia. Optimized costs and transparent tracking.',
    'Dịch Vụ Chính': 'Core services',
    'Logistics Quốc Tế': 'International logistics',
    'Fulfillment & Kho Bãi': 'Fulfillment & warehousing',
    'Thủ Tục Hải Quan': 'Customs procedures',
    'Vận Chuyển Hàng Không': 'Air freight',
    'Liên Kết Nhanh': 'Quick links',
    'Về SpeeGo': 'About SpeeGo',
    'Quy Trình 8 Bước': '8-step process',
    'Vì Sao Chọn SpeeGo': 'Why choose SpeeGo',
    'Tin Tức & Thị Trường': 'News & market insights',
    'Liên Hệ Trực Tiếp': 'Contact us',
    'Văn Phòng Đại Diện': 'Representative offices',
    'Hà Nội': 'Hanoi',
    'Leadvisors Tower, 643 Phạm Văn Đồng, Phường Nghĩa Đô, Hà Nội': 'Leadvisors Tower, 643 Pham Van Dong Street, Nghia Do Ward, Hanoi',
    'Mã ZIP:': 'ZIP code:',
    'Hồ Chí Minh': 'Ho Chi Minh City',
    'Văn phòng:': 'Office:',
    'Kho hàng:': 'Warehouse:',
    'Hoa Kỳ': 'United States',
    'Khu công nghiệp Shengzhifu, Zhongluotan, quận Bạch Vân, Quảng Châu': 'Shengzhifu Industrial Park, Zhongluotan, Baiyun District, Guangzhou'
  };

  function translateLegacyStaticText(lang) {
    document.querySelectorAll('body *').forEach(function (el) {
      if (el.children.length) return;
      const text = el.textContent.trim();
      if (!text) return;
      if (lang === 'en' && staticEnglishText[text]) {
        if (!el.dataset.speegoOriginalText) el.dataset.speegoOriginalText = text;
        el.textContent = staticEnglishText[text];
      } else if (lang !== 'en' && el.dataset.speegoOriginalText) {
        el.textContent = el.dataset.speegoOriginalText;
      }
    });
  }

  function applyLanguage(lang, options) {
    const opts = options || {};
    if (!i18nData[lang]) lang = 'vi';
    currentLang = lang;
    safeStorage.setItem('speego_lang', lang);
    syncSeoLocale(lang);
    if (opts.updateUrl !== false) {
      syncLangQueryParam(lang);
    }

    // Update active label in button
    const activeLabelEl = document.getElementById('speego-current-lang-text');
    if (activeLabelEl) {
      const labels = { vi: 'VN', en: 'EN', es: 'ES' };
      activeLabelEl.textContent = labels[lang] || 'VN';
    }

    // Update active flag in button
    const activeFlagEl = document.getElementById('speego-current-lang-flag');
    if (activeFlagEl) {
      if (lang === 'vi') {
        activeFlagEl.innerHTML = '<img src="wp-content/themes/logistica/images/flags/vn.png" alt="VN" class="speego-lang-flag" width="18" height="13">';
      } else if (lang === 'en') {
        activeFlagEl.innerHTML = '<img src="wp-content/themes/logistica/images/flags/us.png" alt="US" class="speego-lang-flag" width="18" height="13">';
      } else if (lang === 'es') {
        activeFlagEl.innerHTML = '<svg class="speego-lang-flag" viewBox="0 0 3 2" width="18" height="13" aria-hidden="true" style="border-radius:2px;box-shadow:0 1px 2px rgba(0,0,0,0.15);"><rect width="3" height="2" fill="#c60b1e"/><rect y="0.5" width="3" height="1" fill="#ffc400"/></svg>';
      }
    }

    // Update dropdown and pill active classes
    document.querySelectorAll('.speego-lang-pill, .speego-lang-option').forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
        opt.setAttribute('aria-selected', 'true');
      } else {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
      }
    });

    // Translate all [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!el.dataset.speegoI18nOriginal) el.dataset.speegoI18nOriginal = el.textContent;
      if (i18nData[lang] && i18nData[lang][key]) {
        const val = i18nData[lang][key];
        // Plain strings: use textContent (keeps "&" intact for titles/marquee)
        if (String(val).indexOf('<') === -1) {
          el.textContent = val;
        } else {
          el.innerHTML = val;
        }
      } else if (lang === 'vi') {
        el.textContent = el.dataset.speegoI18nOriginal;
      }
    });

    // Translate all [data-i18n-ph] (placeholders)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (i18nData[lang] && i18nData[lang][key]) {
        el.setAttribute('placeholder', i18nData[lang][key]);
      }
    });

    translateLegacyStaticText(lang);

    // The market-news cards contain nested editorial markup, so update their
    // category, headline, summary and CTA as one scoped group.
    document.querySelectorAll('#news-speego .speego-service-card').forEach(function (card, index) {
      var number = index + 1;
      var dictionary = i18nData[lang] || {};
      var category = card.querySelector('.speego-service-body > span');
      var headline = card.querySelector('.speego-service-title');
      var summary = card.querySelector('.speego-service-text');
      var link = card.querySelector('.speego-service-link');
      if (category && dictionary['news' + number + '_cat']) category.textContent = dictionary['news' + number + '_cat'];
      if (headline && dictionary['news' + number + '_title']) headline.textContent = dictionary['news' + number + '_title'];
      if (summary && dictionary['news' + number + '_desc']) summary.textContent = dictionary['news' + number + '_desc'];
      if (link && dictionary.news_read) link.innerHTML = '<span>' + dictionary.news_read + '</span> <i class="fas fa-arrow-right" aria-hidden="true"></i>';
    });

    // Re-render active process step detail with current language
    if (typeof renderStepDetail === 'function') {
      renderStepDetail(currentActiveStep, false, { force: true, skipProgress: true });
    }

    // Re-render active hero text slide with current language
    if (typeof setHeroSlide === 'function') {
      setHeroSlide(currentHeroSlide);
    }

    // Rebuild letter-reveal titles after i18n HTML replace
    if (typeof refreshSectionTitleReveal === 'function') {
      refreshSectionTitleReveal();
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
    var pack = i18nData[currentLang] || i18nData.en;
    var stepWord = (pack && pack.process_step_label) || 'STEP';
    numEl.textContent = pad;
    line1.textContent = langData.line1;
    line2.textContent = langData.line2;
    desc.textContent = langData.desc;
    var stepLabelEl = document.getElementById('process-step-label');
    if (stepLabelEl) {
      stepLabelEl.textContent = stepWord;
    }
    if (nextLabel) {
      nextLabel.textContent = langData.next || (currentLang === 'vi' ? 'Khám phá bước tiếp theo' : 'Explore the next step');
    }
    if (activeTitle) {
      activeTitle.textContent = langData.title;
    }
    if (counter) {
      counter.innerHTML = stepWord + ' <strong>' + pad + '</strong> / 08';
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
        btn.setAttribute('aria-label', stepWord + ' ' + stepId + ': ' + tipData.title);
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
  // 8b. WHY SPEEGO — plane x2 + chữ hiệu ứng theo scroll
  // =========================================================================
  function initWhyCinematic() {
    var section = document.querySelector('[data-why-cinematic]');
    if (!section) return;

    var pairs = section.querySelectorAll('[data-why-pair]');
    if (!pairs.length) return;

    if (prefersReducedMotion()) {
      pairs.forEach(function (pair) { pair.classList.add('is-in'); });
      return;
    }

    function animatePairOnce(pair) {
      if (pair.classList.contains('is-in')) return;
      pair.classList.add('is-in');

      var title = pair.querySelector('.speego-why-pair__card h3');
      var desc = pair.querySelector('.speego-why-pair__card p');
      var num = pair.querySelector('.speego-why-pair__num');
      var planeIcon = pair.querySelector('.speego-why-pair__plane');
      var img = pair.querySelector('.speego-why-pair__visual img');
      var asset = pair.getAttribute('data-asset');
      var isPlane = asset === 'plane';
      var isShip = asset === 'ship';

      if (typeof gsap === 'undefined') return;

      if (num) {
        gsap.fromTo(
          num,
          { opacity: 0, x: -20, scale: 0.85 },
          { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'power3.out' }
        );
      }
      if (planeIcon) {
        gsap.fromTo(
          planeIcon,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.12 }
        );
      }

      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, x: -48, y: 18 },
          { opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 }
        );
      }
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, x: -36, y: 24 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.22 }
        );
      }
      if (img) {
        gsap.fromTo(
          img,
          {
            opacity: 0.35,
            scale: isPlane ? 1.35 : isShip ? 0.78 : 0.82,
            x: isPlane ? 80 : isShip ? 56 : 40,
            y: isPlane ? 30 : 20
          },
          {
            opacity: 1,
            scale: isPlane ? 1 : isShip ? 1 : 1,
            x: isShip ? 20 : 0,
            y: 0,
            duration: isPlane ? 1.25 : 1.0,
            ease: 'power2.out',
            delay: 0.08
          }
        );
      }
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      try {
        gsap.registerPlugin(ScrollTrigger);

        pairs.forEach(function (pair) {
          var title = pair.querySelector('.speego-why-pair__card h3');
          var desc = pair.querySelector('.speego-why-pair__card p');
          var num = pair.querySelector('.speego-why-pair__num');
          var planeIcon = pair.querySelector('.speego-why-pair__plane');
          var rail = pair.querySelector('.speego-why-pair__rail');
          var img = pair.querySelector('.speego-why-pair__visual img');
          var asset = pair.getAttribute('data-asset');
          var isPlane = asset === 'plane';
          var isShip = asset === 'ship';

          // Continuous scroll-linked motion while pair is in view
          if (title) {
            gsap.fromTo(
              title,
              { y: 40, opacity: 0.15 },
              {
                y: -18,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: pair,
                  start: 'top 90%',
                  end: 'bottom 35%',
                  scrub: 0.65
                }
              }
            );
          }
          if (desc) {
            gsap.fromTo(
              desc,
              { y: 56, opacity: 0.1 },
              {
                y: -10,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: pair,
                  start: 'top 88%',
                  end: 'bottom 30%',
                  scrub: 0.75
                }
              }
            );
          }
          if (num) {
            gsap.fromTo(
              num,
              { y: 24, opacity: 0.25 },
              {
                y: -8,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: pair,
                  start: 'top 90%',
                  end: 'bottom 40%',
                  scrub: 0.6
                }
              }
            );
          }
          if (planeIcon && rail) {
            gsap.fromTo(
              planeIcon,
              { y: 0, x: -4, rotation: -55, opacity: 0.35 },
              {
                y: function () {
                  return Math.max(0, rail.offsetHeight - 34);
                },
                x: 6,
                rotation: -35,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: pair,
                  start: 'top 85%',
                  end: 'bottom 35%',
                  scrub: 0.55,
                  invalidateOnRefresh: true
                }
              }
            );
          }
          if (img) {
            gsap.fromTo(
              img,
              {
                scale: isPlane ? 1.08 : isShip ? 0.82 : 0.92,
                x: isPlane ? 36 : isShip ? 48 : 28,
                y: isPlane ? 16 : 12
              },
              {
                scale: isPlane ? 1 : isShip ? 1 : 1,
                x: isShip ? 20 : 0,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: pair,
                  start: 'top 95%',
                  end: 'bottom 25%',
                  scrub: 0.7
                }
              }
            );
          }

          ScrollTrigger.create({
            trigger: pair,
            start: 'top 82%',
            once: true,
            onEnter: function () {
              pair.classList.add('is-in');
            }
          });
        });
        return;
      } catch (e) {
        /* fallback */
      }
    }

    if (!('IntersectionObserver' in window)) {
      pairs.forEach(function (pair) { pair.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animatePairOnce(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
    );
    pairs.forEach(function (pair) { io.observe(pair); });
  }

  // =========================================================================
  // 8c. SECTION TITLES — letter-by-letter reveal (giống QI animated text)
  // =========================================================================
  var titleRevealObserver = null;
  var titleRevealPending = [];

  function escapeHtmlPlain(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function unwrapTitleChars(el) {
    el.querySelectorAll('.speego-title-char').forEach(function (c) {
      c.replaceWith(document.createTextNode(c.textContent === '\u00A0' ? ' ' : c.textContent));
    });
    el.querySelectorAll('.speego-title-word').forEach(function (word) {
      word.replaceWith.apply(word, Array.prototype.slice.call(word.childNodes));
    });
    el.normalize();
  }

  function wrapTitleChars(el) {
    if (!el) return;
    el.classList.remove('is-title-in');
    el.removeAttribute('data-title-played');
    if (el.querySelector('.speego-title-char')) {
      unwrapTitleChars(el);
    }

    var index = 0;
    function walk(node) {
      if (node.nodeType === 3) {
        var text = node.nodeValue;
        if (!text) return;
        var frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            index += part.length;
            return;
          }
          var word = document.createElement('span');
          word.className = 'speego-title-word';
          for (var i = 0; i < part.length; i++) {
            var span = document.createElement('span');
            span.className = 'speego-title-char';
            span.style.setProperty('--i', String(index++));
            span.textContent = part.charAt(i);
            word.appendChild(span);
          }
          frag.appendChild(word);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName === 'BR') {
        // Keep intentional line breaks intact
        return;
      } else if (node.nodeType === 1 && !node.classList.contains('speego-title-char')) {
        Array.prototype.slice.call(node.childNodes).forEach(walk);
      }
    }

    walk(el);
  }

  function playTitleReveal(el) {
    if (!el || el.getAttribute('data-title-played') === '1') return;
    el.setAttribute('data-title-played', '1');
    el.classList.remove('is-title-in');
    void el.offsetWidth;
    requestAnimationFrame(function () {
      el.classList.add('is-title-in');
    });
  }

  function isTitleNearViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    // Trigger when title enters lower 90% of viewport
    return rect.top < vh * 0.9 && rect.bottom > 40;
  }

  function observeTitle(el) {
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add('is-title-in');
      el.setAttribute('data-title-played', '1');
      return;
    }

    if (isTitleNearViewport(el)) {
      playTitleReveal(el);
      return;
    }

    titleRevealPending.push(el);

    if (!('IntersectionObserver' in window)) {
      return;
    }

    if (!titleRevealObserver) {
      titleRevealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            playTitleReveal(entry.target);
            titleRevealObserver.unobserve(entry.target);
          });
        },
        { threshold: [0, 0.08, 0.2], rootMargin: '0px 0px -4% 0px' }
      );
    }
    titleRevealObserver.observe(el);
  }

  function checkPendingTitles() {
    if (!titleRevealPending.length) return;
    titleRevealPending = titleRevealPending.filter(function (el) {
      if (!el.isConnected || el.getAttribute('data-title-played') === '1') return false;
      if (isTitleNearViewport(el)) {
        playTitleReveal(el);
        if (titleRevealObserver) {
          try { titleRevealObserver.unobserve(el); } catch (e) {}
        }
        return false;
      }
      return true;
    });
  }

  function refreshSectionTitleReveal() {
    titleRevealPending = [];
    if (titleRevealObserver) {
      titleRevealObserver.disconnect();
      titleRevealObserver = null;
    }

    var titles = document.querySelectorAll(
      '.speego-about-heading, .speego-trust-section__title, .speego-consult-card-title, .process-tabs-title'
    );
    titles.forEach(function (el) {
      // Ensure plain-text i18n titles with "&" wrap cleanly
      if (el.getAttribute('data-i18n') && !el.querySelector('.speego-accent-num')) {
        var key = el.getAttribute('data-i18n');
        var langPack = i18nData[currentLang] || i18nData.en;
        if (langPack && langPack[key] && langPack[key].indexOf('<') === -1) {
          el.innerHTML = escapeHtmlPlain(langPack[key]);
        }
      }
      wrapTitleChars(el);
      observeTitle(el);
    });
  }

  function initSectionTitleReveal() {
    refreshSectionTitleReveal();
    window.addEventListener('scroll', checkPendingTitles, { passive: true });
    window.addEventListener('resize', checkPendingTitles, { passive: true });
  }

  // =========================================================================
  // 8d. TRUST BAR — staggered entrance
  // =========================================================================
  function initTrustBarReveal() {
    var bar = document.querySelector('.speego-trust-bar');
    if (!bar) return;
    if (prefersReducedMotion()) {
      bar.classList.add('is-in');
      return;
    }
    if (!('IntersectionObserver' in window)) {
      bar.classList.add('is-in');
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            bar.classList.add('is-in');
            io.unobserve(bar);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(bar);
  }

  // =========================================================================
  // 8.5 CONSULTATION VIDEO AUTOPLAY
  // =========================================================================
  function initConsultVideo() {
    var video = document.getElementById('speego-consult-video');
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    function tryPlay() {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          // Autoplay blocked until user gesture / visibility
        });
      }
    }

    tryPlay();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      io.observe(video);
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
    });
  }

  // =========================================================================
  // 8.6 SCROLL EXPLORE COMPANION
  // Keep the existing floating control useful beyond the hero: it advances
  // to the next homepage section.
  // =========================================================================
  function initScrollExploreCompanion() {
    var scrollIndicator = document.querySelector('.speego-hero-scroll-indicator');
    if (!scrollIndicator) return;

    var sectionIds = [
      'home',
      'services-speego',
      'trust-speego',
      'process-speego',
      'why-speego',
      'partners-speego',
      'testimonials-speego',
      'news-speego',
      'consultation-form'
    ];

    function getHeaderOffset() {
      var header = document.querySelector('.site-header');
      return header ? header.getBoundingClientRect().height : 0;
    }

    function getPageTop(element) {
      return element.getBoundingClientRect().top + window.pageYOffset;
    }

    scrollIndicator.addEventListener('click', function (event) {
      event.preventDefault();

      // Treat a section already entering the viewport as the current one so
      // the control does not scroll back to the same section at its boundary.
      var currentTop = window.pageYOffset + getHeaderOffset() + 80;
      var nextSection = null;

      for (var i = 0; i < sectionIds.length; i++) {
        var section = document.getElementById(sectionIds[i]);
        if (section && getPageTop(section) > currentTop) {
          nextSection = section;
          break;
        }
      }

      var targetTop = nextSection
        ? getPageTop(nextSection) - getHeaderOffset() - 12
        : 0;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  }

  // =========================================================================
  // 9. INITIALIZATION ON DOM READY
  // =========================================================================
  function initStickyHeaderAndScrollSpy() {
    var header = document.getElementById('masthead');
    var menuToggle = document.querySelector('.speego-menu-toggle');
    var navItems = Array.prototype.slice.call(document.querySelectorAll('.speego-nav-item'));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.speego-nav-link[href^="#"]'));
    var targets = navItems.map(function (item) {
      var link = item.querySelector('.speego-nav-link');
      var href = link ? link.getAttribute('href') : '';
      return {
        item: item,
        section: href && href.charAt(0) === '#' ? document.querySelector(href) : null
      };
    });

    function getHeaderOffset() {
      if (!header) return 0;
      var position = window.getComputedStyle(header).position;
      return position === 'fixed' || position === 'sticky'
        ? header.getBoundingClientRect().height
        : 0;
    }

    function closeMobileMenu() {
      if (!header) return;
      header.classList.remove('is-menu-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && header) {
      menuToggle.addEventListener('click', function () {
        var open = header.classList.toggle('is-menu-open');
        menuToggle.setAttribute('aria-expanded', String(open));
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');
        var section = href && document.querySelector(href);
        if (!section) return;

        event.preventDefault();
        closeMobileMenu();
        requestAnimationFrame(function () {
          var top = section.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset() - 12;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
          });
          window.history.pushState(null, '', href);
        });
      });
    });

    function refreshHeader() {
      var scrolled = window.pageYOffset > 12;
      document.body.classList.toggle('is-header-scrolled', scrolled);
      if (header) header.classList.toggle('is-scrolled', scrolled);

      var offset = (header ? header.offsetHeight : 76) + 24;
      var current = null;
      targets.forEach(function (target) {
        if (target.section && target.section.getBoundingClientRect().top <= offset) current = target.item;
      });

      navItems.forEach(function (item) {
        item.classList.toggle('active', item === current);
      });
    }

    window.addEventListener('scroll', refreshHeader, { passive: true });
    window.addEventListener('resize', refreshHeader);
    refreshHeader();
  }

  function placeConsultationBeforeNews() {
    var consultation = document.getElementById('consultation-form');
    var news = document.getElementById('news-speego');
    if (consultation && news && news.parentNode) {
      news.parentNode.insertBefore(consultation, news);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('speego-cookie-consent');
    if (cookieConsent && !safeStorage.getItem('speego_cookie_consent')) {
      cookieConsent.hidden = false;
      cookieConsent.querySelectorAll('[data-cookie-choice]').forEach(function (button) {
        button.addEventListener('click', function () {
          safeStorage.setItem('speego_cookie_consent', button.dataset.cookieChoice);
          cookieConsent.hidden = true;
        });
      });
    }

	const policyMenu = document.querySelector('.speego-policy-menu');
	const policyToggle = document.querySelector('.speego-policy-toggle');

	if (policyMenu && policyToggle) {
	  policyToggle.addEventListener('click', function () {
		var open = policyMenu.classList.toggle('is-open');
		policyToggle.setAttribute('aria-expanded', String(open));
	  });

	  document.addEventListener('click', function (event) {
		if (!policyMenu.contains(event.target)) {
		  policyMenu.classList.remove('is-open');
		  policyToggle.setAttribute('aria-expanded', 'false');
		}
	  });
	}

    // Language dropdown toggle
    const langBtn = document.getElementById('speego-lang-toggle');
    const langDropdown = document.getElementById('speego-lang-dropdown');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const open = langDropdown.classList.toggle('active');
        langBtn.setAttribute('aria-expanded', String(open));
      });
    }

    // The current top-bar selector uses direct EN / VI / ES buttons, not a
    // dropdown trigger. Bind options independently so both selector variants
    // remain functional.
    document.querySelectorAll('.speego-lang-option, .speego-lang-pill').forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const targetLang = this.getAttribute('data-lang');
        if (targetLang) {
          applyLanguage(targetLang);
        }
        if (langDropdown) {
          langDropdown.classList.remove('active');
          if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    if (langDropdown) {
      document.addEventListener('click', function () {
        langDropdown.classList.remove('active');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Apply initial language (English default)
    applyLanguage(currentLang);

    // Initialize components
    initHeroSliderNav();
    initHeroConsole();
    initStickyHeaderAndScrollSpy();
    initProcessTabs();
    initWhyCinematic();
    initTrustBarReveal();
    initConsultationForm();
    initTrustPartnerMarquee();
    // Titles after i18n + layout settle
    requestAnimationFrame(function () {
      initSectionTitleReveal();
    });
    initScrollExploreCompanion();
  });
})();
