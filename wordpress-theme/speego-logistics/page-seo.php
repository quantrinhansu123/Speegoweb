<?php
/**
 * Universal Server-Side SEO & Content Pre-rendering for SpeeGo pages
 * (Knowledge Hub, Categories, Single Posts, Logistics, Fulfillment, Import-Export, Contact)
 */

function speego_render_generic_page_seo($entry, $routeHash, $queriedId)
{
    // Skip routes that have dedicated handlers
    $handledRoutes = [
        '#/home', '#/en/home', '#/es/inicio',
        '#/about-us', '#/en/about-us', '#/es/about-us', '#/about', '#/en/about', '#/es/about',
        '#/sourcing', '#/en/sourcing', '#/es/sourcing'
    ];
    if (in_array($routeHash, $handledRoutes, true)) {
        return $entry;
    }

    $routeMap = function_exists('speego_public_route_map') ? speego_public_route_map() : ['pages' => []];
    if (!isset($routeMap['pages'][$routeHash])) {
        return $entry;
    }

    $page = $routeMap['pages'][$routeHash];
    $lang = $page['language'] ?? 'vi';
    $htmlLang = $lang === 'vi' ? 'vi-VN' : ($lang === 'es' ? 'es-ES' : 'en');
    $locale = $lang === 'vi' ? 'vi_VN' : ($lang === 'es' ? 'es_ES' : 'en_US');
    $seoTitle = $page['title'] ?? 'SpeeGo Logistics';
    $seoDesc = $page['description'] ?? '';
    $canonicalUrl = home_url($page['path']);
    $robots = get_option('blog_public') ? 'index,follow,max-image-preview:large' : 'noindex,follow';

    // Counterpart mapping for alternate hreflang tags
    $counterparts = [
        // Corridors
        '#/logistics/china-to-us-ca-au' => ['vi' => '#/logistics/china-to-us-ca-au', 'en' => '#/en/logistics/china-to-us-ca-au', 'es' => '#/es/logistica/china-a-eeuu-canada-australia'],
        '#/logistics/vietnam-to-us-ca-au' => ['vi' => '#/logistics/vietnam-to-us-ca-au', 'en' => '#/en/logistics/vietnam-to-us-ca-au', 'es' => '#/es/logistica/vietnam-a-eeuu-canada-australia'],
        '#/en/logistics/china-to-us-ca-au' => ['vi' => '#/logistics/china-to-us-ca-au', 'en' => '#/en/logistics/china-to-us-ca-au', 'es' => '#/es/logistica/china-a-eeuu-canada-australia'],
        '#/en/logistics/vietnam-to-us-ca-au' => ['vi' => '#/logistics/vietnam-to-us-ca-au', 'en' => '#/en/logistics/vietnam-to-us-ca-au', 'es' => '#/es/logistica/vietnam-a-eeuu-canada-australia'],
        '#/es/logistica/china-a-eeuu-canada-australia' => ['vi' => '#/logistics/china-to-us-ca-au', 'en' => '#/en/logistics/china-to-us-ca-au', 'es' => '#/es/logistica/china-a-eeuu-canada-australia'],
        '#/es/logistica/vietnam-a-eeuu-canada-australia' => ['vi' => '#/logistics/vietnam-to-us-ca-au', 'en' => '#/en/logistics/vietnam-to-us-ca-au', 'es' => '#/es/logistica/vietnam-a-eeuu-canada-australia'],

        // Parent logistics
        '#/tuyen-van-chuyen' => ['vi' => '#/tuyen-van-chuyen', 'en' => '#/en/shipping-routes', 'es' => '#/es/rutas-de-envio'],
        '#/en/shipping-routes' => ['vi' => '#/tuyen-van-chuyen', 'en' => '#/en/shipping-routes', 'es' => '#/es/rutas-de-envio'],
        '#/es/rutas-de-envio' => ['vi' => '#/tuyen-van-chuyen', 'en' => '#/en/shipping-routes', 'es' => '#/es/rutas-de-envio'],

        // Fulfillment
        '#/fulfillment' => ['vi' => '#/fulfillment', 'en' => '#/en/fulfillment', 'es' => '#/es/fulfillment'],
        '#/en/fulfillment' => ['vi' => '#/fulfillment', 'en' => '#/en/fulfillment', 'es' => '#/es/fulfillment'],
        '#/es/fulfillment' => ['vi' => '#/fulfillment', 'en' => '#/en/fulfillment', 'es' => '#/es/fulfillment'],

        // Import-Export
        '#/xuat-nhap-khau' => ['vi' => '#/xuat-nhap-khau', 'en' => '#/en/import-export', 'es' => '#/es/import-export'],
        '#/en/import-export' => ['vi' => '#/xuat-nhap-khau', 'en' => '#/en/import-export', 'es' => '#/es/import-export'],
        '#/es/import-export' => ['vi' => '#/xuat-nhap-khau', 'en' => '#/en/import-export', 'es' => '#/es/import-export'],

        // Knowledge Hub
        '#/knowledge' => ['vi' => '#/knowledge', 'en' => '#/en/knowledge', 'es' => '#/es/knowledge'],
        '#/en/knowledge' => ['vi' => '#/knowledge', 'en' => '#/en/knowledge', 'es' => '#/es/knowledge'],
        '#/es/knowledge' => ['vi' => '#/knowledge', 'en' => '#/en/knowledge', 'es' => '#/es/knowledge'],

        // Knowledge categories
        '#/knowledge/huong-dan-van-chuyen' => ['vi' => '#/knowledge/huong-dan-van-chuyen', 'en' => '#/en/shipping-guides', 'es' => '#/es/guias-de-envio'],
        '#/en/shipping-guides' => ['vi' => '#/knowledge/huong-dan-van-chuyen', 'en' => '#/en/shipping-guides', 'es' => '#/es/guias-de-envio'],
        '#/es/guias-de-envio' => ['vi' => '#/knowledge/huong-dan-van-chuyen', 'en' => '#/en/shipping-guides', 'es' => '#/es/guias-de-envio'],

        '#/knowledge/kien-thuc-nganh-hang' => ['vi' => '#/knowledge/kien-thuc-nganh-hang', 'en' => '#/en/industry-guides', 'es' => '#/es/guias-por-industria'],
        '#/en/industry-guides' => ['vi' => '#/knowledge/kien-thuc-nganh-hang', 'en' => '#/en/industry-guides', 'es' => '#/es/guias-por-industria'],
        '#/es/guias-por-industria' => ['vi' => '#/knowledge/kien-thuc-nganh-hang', 'en' => '#/en/industry-guides', 'es' => '#/es/guias-por-industria'],

        '#/knowledge/tuyen-thuong-mai' => ['vi' => '#/knowledge/tuyen-thuong-mai', 'en' => '#/en/trade-routes', 'es' => '#/es/rutas-comerciales'],
        '#/en/trade-routes' => ['vi' => '#/knowledge/tuyen-thuong-mai', 'en' => '#/en/trade-routes', 'es' => '#/es/rutas-comerciales'],
        '#/es/rutas-comerciales' => ['vi' => '#/knowledge/tuyen-thuong-mai', 'en' => '#/en/trade-routes', 'es' => '#/es/rutas-comerciales'],

        '#/knowledge/sourcing-qc' => ['vi' => '#/knowledge/sourcing-qc', 'en' => '#/en/sourcing-qc', 'es' => '#/es/sourcing-qc'],
        '#/en/sourcing-qc' => ['vi' => '#/knowledge/sourcing-qc', 'en' => '#/en/sourcing-qc', 'es' => '#/es/sourcing-qc'],
        '#/es/sourcing-qc' => ['vi' => '#/knowledge/sourcing-qc', 'en' => '#/en/sourcing-qc', 'es' => '#/es/sourcing-qc'],

        '#/knowledge/fulfillment-kho-van' => ['vi' => '#/knowledge/fulfillment-kho-van', 'en' => '#/en/fulfillment-warehouse', 'es' => '#/es/fulfillment-almacen'],
        '#/en/fulfillment-warehouse' => ['vi' => '#/knowledge/fulfillment-kho-van', 'en' => '#/en/fulfillment-warehouse', 'es' => '#/es/fulfillment-almacen'],
        '#/es/fulfillment-almacen' => ['vi' => '#/knowledge/fulfillment-kho-van', 'en' => '#/en/fulfillment-warehouse', 'es' => '#/es/fulfillment-almacen'],

        '#/knowledge/tin-xuat-nhap-khau' => ['vi' => '#/knowledge/tin-xuat-nhap-khau', 'en' => '#/en/import-export-news', 'es' => '#/es/noticias-import-export'],
        '#/en/import-export-news' => ['vi' => '#/knowledge/tin-xuat-nhap-khau', 'en' => '#/en/import-export-news', 'es' => '#/es/noticias-import-export'],
        '#/es/noticias-import-export' => ['vi' => '#/knowledge/tin-xuat-nhap-khau', 'en' => '#/en/import-export-news', 'es' => '#/es/noticias-import-export'],

        // Single posts
        '#/knowledge/chuan-bi-lo-hang' => ['vi' => '#/knowledge/chuan-bi-lo-hang', 'en' => '#/en/post/preparing-your-shipment', 'es' => '#/es/post/preparar-su-envio'],
        '#/en/post/preparing-your-shipment' => ['vi' => '#/knowledge/chuan-bi-lo-hang', 'en' => '#/en/post/preparing-your-shipment', 'es' => '#/es/post/preparar-su-envio'],
        '#/es/post/preparar-su-envio' => ['vi' => '#/knowledge/chuan-bi-lo-hang', 'en' => '#/en/post/preparing-your-shipment', 'es' => '#/es/post/preparar-su-envio'],

        '#/knowledge/quy-trinh-nhap-kho' => ['vi' => '#/knowledge/quy-trinh-nhap-kho', 'en' => '#/en/post/fulfillment-receiving', 'es' => '#/es/post/recepcion-fulfillment'],
        '#/en/post/fulfillment-receiving' => ['vi' => '#/knowledge/quy-trinh-nhap-kho', 'en' => '#/en/post/fulfillment-receiving', 'es' => '#/es/post/recepcion-fulfillment'],
        '#/es/post/recepcion-fulfillment' => ['vi' => '#/knowledge/quy-trinh-nhap-kho', 'en' => '#/en/post/fulfillment-receiving', 'es' => '#/es/post/recepcion-fulfillment'],

        '#/knowledge/kiem-soat-chat-luong' => ['vi' => '#/knowledge/kiem-soat-chat-luong', 'en' => '#/en/post/quality-control', 'es' => '#/es/post/control-de-calidad'],
        '#/en/post/quality-control' => ['vi' => '#/knowledge/kiem-soat-chat-luong', 'en' => '#/en/post/quality-control', 'es' => '#/es/post/control-de-calidad'],
        '#/es/post/control-de-calidad' => ['vi' => '#/knowledge/kiem-soat-chat-luong', 'en' => '#/en/post/quality-control', 'es' => '#/es/post/control-de-calidad'],

        // Contact
        '#/contact' => ['vi' => '#/contact', 'en' => '#/en/contact', 'es' => '#/es/contact'],
        '#/en/contact' => ['vi' => '#/contact', 'en' => '#/en/contact', 'es' => '#/es/contact'],
        '#/es/contact' => ['vi' => '#/contact', 'en' => '#/en/contact', 'es' => '#/es/contact'],
    ];

    $alternates = '';
    if (isset($counterparts[$routeHash])) {
        foreach ($counterparts[$routeHash] as $l => $cHash) {
            if (isset($routeMap['pages'][$cHash])) {
                $alternates .= '<link rel="alternate" hreflang="' . esc_attr($l) . '" href="' . esc_url(home_url($routeMap['pages'][$cHash]['path'])) . '">';
            }
        }
        if (isset($counterparts[$routeHash]['en'], $routeMap['pages'][$counterparts[$routeHash]['en']])) {
            $alternates .= '<link rel="alternate" hreflang="x-default" href="' . esc_url(home_url($routeMap['pages'][$counterparts[$routeHash]['en']]['path'])) . '">';
        }
    }

    $seoHead = '<meta name="description" content="' . esc_attr($seoDesc) . '">'
        . '<meta name="robots" content="' . esc_attr($robots) . '">'
        . '<link rel="canonical" href="' . esc_url($canonicalUrl) . '">'
        . $alternates
        . '<meta property="og:type" content="website">'
        . '<meta property="og:locale" content="' . esc_attr($locale) . '">'
        . '<meta property="og:site_name" content="SpeeGo Logistics">'
        . '<meta property="og:title" content="' . esc_attr($seoTitle) . '">'
        . '<meta property="og:description" content="' . esc_attr($seoDesc) . '">'
        . '<meta property="og:url" content="' . esc_url($canonicalUrl) . '">';

    $entry = preg_replace(
        '/<title\b[^>]*>.*?<\/title>/is',
        '<title>' . esc_html($seoTitle) . '</title>' . $seoHead,
        $entry,
        1
    );
    $entry = preg_replace('/<html\b([^>]*\blang=")[^"]*("[^>]*)>/i', '<html$1' . esc_attr($htmlLang) . '$2>', $entry, 1);

    // Fetch editable content from WordPress post or static template file
    $contentHtml = '';
    if ($queriedId) {
        $p = get_post($queriedId);
        if ($p && $p->post_status === 'publish' && !empty(trim($p->post_content))) {
            $contentHtml = trim($p->post_content);
            $contentHtml = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $contentHtml);
        }
    }

    if ($contentHtml === '' && !empty($page['file'])) {
        $filePath = __DIR__ . '/explore/' . $page['file'];
        if (is_readable($filePath)) {
            $contentHtml = trim(file_get_contents($filePath));
        }
    }

    if ($contentHtml !== '') {
        $contentHtml = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $contentHtml);
        $homePath = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
        if ($homePath !== '') {
            $contentHtml = preg_replace('#href="/(vi|en|es)/#i', 'href="/' . $homePath . '/$1/', $contentHtml);
        }
        $entry = preg_replace_callback(
            '/(<main\b[^>]*\bid="app-main"[^>]*>).*?(<\/main>)/is',
            function ($matches) use ($contentHtml, $routeHash) {
                $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
                return $mainOpen . $contentHtml . $matches[2];
            },
            $entry,
            1
        );
    }

    return $entry;
}
