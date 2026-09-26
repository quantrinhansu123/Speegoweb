<?php
define('WP_USE_THEMES', false);
require 'E:/download/xamp/htdocs/wordpress_demo/wp-load.php';

// Unhook KSES to prevent stripping of SVGs, data-* attributes, etc.
kses_remove_filters();

$srcRoot = 'D:/Speegoweb';

// 1. Hompepage content map (from scratch extracted 9 sections)
$homeMap = [
    152 => "$srcRoot/scratch/vi_home_sections.html",
    153 => "$srcRoot/scratch/en_home_sections.html",
    154 => "$srcRoot/scratch/es_home_sections.html"
];

foreach ($homeMap as $id => $file) {
    if (file_exists($file)) {
        $content = file_get_contents($file);
        wp_update_post([
            'ID' => $id,
            'post_content' => $content,
            'post_status' => 'publish'
        ]);
        echo "Updated Home Page ID $id from $file (" . strlen($content) . " bytes)\n";
    }
}

// 2. Explore pages map
$pagesMap = [
    // VI Services
    10 => "$srcRoot/explore/pages/sourcing/sourcing.html",
    11 => "$srcRoot/explore/pages/tuyen_van_chuyen/tuyen-van-chuyen.html",
    13 => "$srcRoot/explore/pages/tuyen_van_chuyen/tuyen-van-chuyen.html",
    14 => "$srcRoot/explore/pages/tuyen_van_chuyen/tuyen-van-chuyen.html",
    9  => "$srcRoot/explore/pages/fulfillment/vi-fulfillment.html",
    15 => "$srcRoot/explore/pages/xuat_nhap_khau/xuat-nhap-khau.html",

    // VI Knowledge
    8  => "$srcRoot/explore/pages/Knowledge/VI/vi-01-chuyenmuc-tat-ca-chuyen-muc.html",
    16 => "$srcRoot/explore/pages/Knowledge/VI/vi-02-chuyenmuc-shipping-guides.html",
    17 => "$srcRoot/explore/pages/Knowledge/VI/vi-03-chuyenmuc-industry-guides.html",
    18 => "$srcRoot/explore/pages/Knowledge/VI/vi-04-chuyenmuc-trade-route.html",
    19 => "$srcRoot/explore/pages/Knowledge/VI/vi-05-chuyenmuc-sourcing-qc.html",
    20 => "$srcRoot/explore/pages/Knowledge/VI/vi-06-chuyenmuc-fulfillment-warehouse.html",
    21 => "$srcRoot/explore/pages/Knowledge/VI/vi-07-chuyenmuc-import-export-news.html",
    22 => "$srcRoot/explore/pages/Knowledge/VI/vi-08-post-chuan-bi-lo-hang.html",
    23 => "$srcRoot/explore/pages/Knowledge/VI/vi-09-post-quy-trinh-nhap-kho.html",
    24 => "$srcRoot/explore/pages/Knowledge/VI/vi-10-post-kiem-soat-chat-luong.html",

    // EN Services
    28 => "$srcRoot/explore/pages/sourcing/en-sourcing.html",
    29 => "$srcRoot/explore/pages/tuyen_van_chuyen/en-tuyen-van-chuyen.html",
    32 => "$srcRoot/explore/pages/tuyen_van_chuyen/en-tuyen-van-chuyen.html",
    33 => "$srcRoot/explore/pages/tuyen_van_chuyen/en-tuyen-van-chuyen.html",
    27 => "$srcRoot/explore/pages/fulfillment/en-fulfillment.html",
    34 => "$srcRoot/explore/pages/xuat_nhap_khau/en-xuat-nhap-khau.html",

    // EN Knowledge
    26 => "$srcRoot/explore/pages/Knowledge/EN/en-01-chuyenmuc-tat-ca-chuyen-muc.html",
    35 => "$srcRoot/explore/pages/Knowledge/EN/en-02-chuyenmuc-shipping-guides.html",
    36 => "$srcRoot/explore/pages/Knowledge/EN/en-03-chuyenmuc-industry-guides.html",
    37 => "$srcRoot/explore/pages/Knowledge/EN/en-04-chuyenmuc-trade-route.html",
    38 => "$srcRoot/explore/pages/Knowledge/EN/en-05-chuyenmuc-sourcing-qc.html",
    39 => "$srcRoot/explore/pages/Knowledge/EN/en-06-chuyenmuc-fulfillment-warehouse.html",
    40 => "$srcRoot/explore/pages/Knowledge/EN/en-07-chuyenmuc-import-export-news.html",
    42 => "$srcRoot/explore/pages/Knowledge/EN/en-08-post-chuan-bi-lo-hang.html",
    43 => "$srcRoot/explore/pages/Knowledge/EN/en-09-post-quy-trinh-nhap-kho.html",
    44 => "$srcRoot/explore/pages/Knowledge/EN/en-10-post-kiem-soat-chat-luong.html",

    // ES Services
    48 => "$srcRoot/explore/pages/sourcing/es-sourcing.html",
    49 => "$srcRoot/explore/pages/tuyen_van_chuyen/es-tuyen-van-chuyen.html",
    52 => "$srcRoot/explore/pages/tuyen_van_chuyen/es-tuyen-van-chuyen.html",
    53 => "$srcRoot/explore/pages/tuyen_van_chuyen/es-tuyen-van-chuyen.html",
    47 => "$srcRoot/explore/pages/fulfillment/es-fulfillment.html",
    54 => "$srcRoot/explore/pages/xuat_nhap_khau/es-xuat-nhap-khau.html",

    // ES Knowledge
    46 => "$srcRoot/explore/pages/Knowledge/ES/es-01-chuyenmuc-tat-ca-chuyen-muc.html",
    55 => "$srcRoot/explore/pages/Knowledge/ES/es-02-chuyenmuc-shipping-guides.html",
    56 => "$srcRoot/explore/pages/Knowledge/ES/es-03-chuyenmuc-industry-guides.html",
    57 => "$srcRoot/explore/pages/Knowledge/ES/es-04-chuyenmuc-trade-route.html",
    58 => "$srcRoot/explore/pages/Knowledge/ES/es-05-chuyenmuc-sourcing-qc.html",
    59 => "$srcRoot/explore/pages/Knowledge/ES/es-06-chuyenmuc-fulfillment-warehouse.html",
    60 => "$srcRoot/explore/pages/Knowledge/ES/es-07-chuyenmuc-import-export-news.html",
    62 => "$srcRoot/explore/pages/Knowledge/ES/es-08-post-chuan-bi-lo-hang.html",
    63 => "$srcRoot/explore/pages/Knowledge/ES/es-09-post-quy-trinh-nhap-kho.html",
    64 => "$srcRoot/explore/pages/Knowledge/ES/es-10-post-kiem-soat-chat-luong.html"
];

foreach ($pagesMap as $id => $file) {
    if (file_exists($file)) {
        $content = file_get_contents($file);
        // Strip offline file:// redirect script
        $content = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $content);
        wp_update_post([
            'ID' => $id,
            'post_content' => $content,
            'post_status' => 'publish'
        ]);
        echo "Updated Page ID $id from $file (" . strlen($content) . " bytes)\n";
    } else {
        echo "File NOT found for ID $id: $file\n";
    }
}

// 3. Shared Partials
$partials = [
    114 => "$srcRoot/explore/partials/header.html",
    115 => "$srcRoot/explore/partials/footer.html",
    117 => "$srcRoot/explore/partials/cta-form.html",
    135 => "$srcRoot/explore/partials/header.html",
    136 => "$srcRoot/explore/partials/footer.html",
    118 => "$srcRoot/explore/partials/cta-form.html",
    138 => "$srcRoot/explore/partials/header.html",
    139 => "$srcRoot/explore/partials/footer.html",
    119 => "$srcRoot/explore/partials/cta-form.html",
];

foreach ($partials as $id => $file) {
    if (file_exists($file)) {
        $content = file_get_contents($file);
        wp_update_post([
            'ID' => $id,
            'post_content' => $content,
            'post_status' => 'publish'
        ]);
        echo "Updated Shared Partial ID $id from $file\n";
    }
}

echo "All pages successfully synchronized!\n";
