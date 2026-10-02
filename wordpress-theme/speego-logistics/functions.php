<?php
/**
 * SpeeGo Logistics Theme Functions
 */
require_once __DIR__ . '/sourcing-reference.php';
require_once __DIR__ . '/managed-markup.php';
require_once __DIR__ . '/post-translations.php';
require_once __DIR__ . '/vercel-parity.php';
require_once __DIR__ . '/news-reference.php';

/** Use the packaged SpeeGo icon when no WordPress Site Icon is configured. */
function speego_site_icon_url($url, $size, $blogId)
{
    if (($blogId && (int) $blogId !== get_current_blog_id()) || (int) get_option('site_icon') > 0) {
        return $url;
    }

    return add_query_arg('ver', wp_get_theme()->get('Version'), get_template_directory_uri() . '/explore/assets/favicon-speego.png');
}
add_filter('get_site_icon_url', 'speego_site_icon_url', 100, 3);

/**
 * 1. Definitions of all SpeeGo Pages
 */
function speego_get_pages_definitions()
{
    return [
        // Homepages (Tri-lingual)
        '#/home' => [
            'title' => 'Trang chủ (SpeeGo Logistics)',
            'slug' => 'home',
            'file' => 'pages/home/vi-home.html',
            'lang' => 'vi',
            'is_front' => true,
        ],
        '#/en/home' => [
            'title' => 'Home - SpeeGo Logistics (EN)',
            'slug' => 'home-en',
            'file' => 'pages/home/en-home.html',
            'lang' => 'en',
        ],
        '#/es/inicio' => [
            'title' => 'Inicio - SpeeGo Logistics (ES)',
            'slug' => 'inicio-es',
            'file' => 'pages/home/es-home.html',
            'lang' => 'es',
        ],

        // About Us Pages (Tri-lingual)
        '#/about-us' => [
            'title' => 'Về SpeeGo (About Us)',
            'slug' => 've-chung-toi',
            'file' => 'pages/about/vi-about.html',
            'lang' => 'vi',
        ],
        '#/en/about-us' => [
            'title' => 'About SpeeGo (EN)',
            'slug' => 'about-us-en',
            'file' => 'pages/about/en-about.html',
            'lang' => 'en',
        ],
        '#/es/about-us' => [
            'title' => 'Sobre SpeeGo (ES)',
            'slug' => 'sobre-nosotros',
            'file' => 'pages/about/es-about.html',
            'lang' => 'es',
        ],

        // Sourcing Pages
        '#/sourcing' => [
            'title' => 'Sourcing & QC - Tìm nguồn hàng',
            'slug' => 'sourcing',
            'file' => 'pages/sourcing/sourcing.html',
            'lang' => 'vi',
            'ref' => 'vi.html',
        ],
        '#/en/sourcing' => [
            'title' => 'Global Sourcing & QC (EN)',
            'slug' => 'sourcing-en',
            'file' => 'pages/sourcing/en-sourcing.html',
            'lang' => 'en',
            'ref' => 'en.html',
        ],
        '#/es/sourcing' => [
            'title' => 'Abastecimiento y QC (ES)',
            'slug' => 'sourcing-es',
            'file' => 'pages/sourcing/es-sourcing.html',
            'lang' => 'es',
            'ref' => 'es.html',
        ],

        // Shipping Routes
        '#/tuyen-van-chuyen' => [
            'title' => 'Tuyến vận chuyển SpeeGo',
            'slug' => 'tuyen-van-chuyen',
            'file' => 'pages/tuyen_van_chuyen/tuyen-van-chuyen.html',
            'lang' => 'vi',
        ],
        '#/en/shipping-routes' => [
            'title' => 'Global Shipping Routes (EN)',
            'slug' => 'shipping-routes-en',
            'file' => 'pages/tuyen_van_chuyen/en-tuyen-van-chuyen.html',
            'lang' => 'en',
        ],
        '#/es/rutas-de-envio' => [
            'title' => 'Rutas de Envío Global (ES)',
            'slug' => 'rutas-de-envio-es',
            'file' => 'pages/tuyen_van_chuyen/es-tuyen-van-chuyen.html',
            'lang' => 'es',
        ],

        // Fulfillment
        '#/fulfillment' => [
            'title' => 'Fulfillment & Kho bãi',
            'slug' => 'kho-van',
            'file' => 'pages/fulfillment/vi-fulfillment.html',
            'lang' => 'vi',
        ],
        '#/en/fulfillment' => [
            'title' => 'Fulfillment & Warehousing (EN)',
            'slug' => 'fulfillment-en',
            'file' => 'pages/fulfillment/en-fulfillment.html',
            'lang' => 'en',
        ],
        '#/es/fulfillment' => [
            'title' => 'Fulfillment y Almacén (ES)',
            'slug' => 'almacenamiento-es',
            'file' => 'pages/fulfillment/es-fulfillment.html',
            'lang' => 'es',
        ],

        // Import & Export
        '#/xuat-nhap-khau' => [
            'title' => 'Thủ tục hải quan & Xuất nhập khẩu',
            'slug' => 'xuat-nhap-khau',
            'file' => 'pages/xuat_nhap_khau/xuat-nhap-khau.html',
            'lang' => 'vi',
        ],
        '#/en/import-export' => [
            'title' => 'Customs & Import-Export (EN)',
            'slug' => 'import-export-en',
            'file' => 'pages/xuat_nhap_khau/en-xuat-nhap-khau.html',
            'lang' => 'en',
        ],
        '#/es/import-export' => [
            'title' => 'Aduanas e Import-Export (ES)',
            'slug' => 'import-export-es',
            'file' => 'pages/xuat_nhap_khau/es-xuat-nhap-khau.html',
            'lang' => 'es',
        ],

        // Knowledge Hub
        '#/knowledge' => [
            'title' => 'SpeeGo Knowledge Hub',
            'slug' => 'knowledge',
            'file' => 'pages/Knowledge/VI/vi-01-chuyenmuc-tat-ca-chuyen-muc.html',
            'lang' => 'vi',
        ],
        '#/en/knowledge' => [
            'title' => 'SpeeGo Knowledge Hub (EN)',
            'slug' => 'knowledge-en',
            'file' => 'pages/Knowledge/EN/en-01-chuyenmuc-tat-ca-chuyen-muc.html',
            'lang' => 'en',
        ],
        '#/es/knowledge' => [
            'title' => 'SpeeGo Knowledge Hub (ES)',
            'slug' => 'knowledge-es',
            'file' => 'pages/Knowledge/ES/es-01-chuyenmuc-tat-ca-chuyen-muc.html',
            'lang' => 'es',
        ],
    ];
}

/**
 * 2. Seed / Synchronize all SpeeGo pages into WordPress database
 */
function speego_seed_all_pages($force = false)
{
    $pages = speego_get_pages_definitions();
    $homeId = 0;

    foreach ($pages as $route => $page) {
        $existing = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $route,
        ]);

        if ($existing && !$force) {
            if (!empty($page['is_front'])) {
                $homeId = $existing[0]->ID;
            }
            continue;
        }

        $file = get_template_directory() . '/explore/' . $page['file'];
        if (!is_readable($file)) {
            // Also check scratch folder if explore copy not found
            $scratchFile = get_template_directory() . '/' . $page['file'];
            if (is_readable($scratchFile)) {
                $file = $scratchFile;
            } else {
                continue;
            }
        }

        $content = file_get_contents($file);
        $content = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $content);

        $usesReference = false;
        if (!empty($page['ref'])) {
            $refFile = get_template_directory() . '/sourcing-reference/' . $page['ref'];
            if (is_readable($refFile) && preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', file_get_contents($refFile), $match)) {
                $content = trim($match[1]);
                $usesReference = true;
            }
        }

        if ($existing && $force) {
            $postId = $existing[0]->ID;
            wp_update_post([
                'ID' => $postId,
                'post_title' => $page['title'],
                'post_content' => $content,
                'post_status' => 'publish',
            ]);
        } else {
            $postId = wp_insert_post([
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => $page['title'],
                'post_name' => $page['slug'],
                'post_content' => $content,
            ], true);
        }

        if ($postId && !is_wp_error($postId)) {
            update_post_meta($postId, '_speego_route_hash', $route);
            update_post_meta($postId, '_speego_content_editable', '1');
            if ($usesReference) {
                update_post_meta($postId, '_speego_sourcing_reference', '1');
            }
            if (!empty($page['is_front'])) {
                $homeId = $postId;
            }
        }
    }

    // Set WordPress homepage if created
    if ($homeId) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $homeId);
    }
}

add_action('after_switch_theme', function () {
    speego_seed_all_pages(false);
    update_option('speego_theme_content_version', '1.2.25');
});

/**
 * Enable the theme features needed by Elementor without making Elementor a
 * hard dependency. The static explore/ fallback continues to work when the
 * plugin is not installed.
 */
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');
    add_theme_support('elementor');
});

function speego_is_elementor_document($postId = 0)
{
    if (!class_exists('\Elementor\Plugin')) {
        return false;
    }

    $postId = $postId ?: get_queried_object_id();
    if ($postId) {
        $document = \Elementor\Plugin::$instance->documents->get($postId);
        if ($document && $document->is_built_with_elementor()) {
            return true;
        }
    }

    return isset(\Elementor\Plugin::$instance->editor)
        && \Elementor\Plugin::$instance->editor->is_edit_mode();
}

/**
 * Load the SpeeGo design system for Elementor-rendered documents.
 *
 * Elementor pages (page.php) render the shared header partial with the
 * language dropdown, but unlike front-page.php they never received the
 * navigation bridge (SPEEGO_PUBLIC_ROUTES / speegoInitialRoute /
 * wp-navigation.js) nor the dropdown toggle handler from speego-main.js.
 * Without them the VI/EN/ES button renders but does nothing. Enqueue the
 * same navigation script plus a minimal toggle so the header can switch
 * languages on Elementor documents too.
 */
function speego_enqueue_elementor_assets()
{
    if (!speego_is_elementor_document()) {
        return;
    }

    $themeUri = trailingslashit(get_template_directory_uri());
    $version = wp_get_theme()->get('Version');

    $managedRoute = $GLOBALS['speego_active_route'] ?? get_post_meta(get_queried_object_id(), '_speego_route_hash', true);
    if (in_array($managedRoute, ['#/sourcing', '#/en/sourcing', '#/es/sourcing'], true)) {
        wp_enqueue_style('speego-sourcing-bootstrap', $themeUri . 'sourcing-reference/logistica/css/bootstrapb54d.css', [], $version);
        wp_enqueue_style('speego-sourcing-base', $themeUri . 'sourcing-reference/logistica/css/mainb54d.css', ['speego-sourcing-bootstrap'], $version);
        wp_enqueue_style('speego-sourcing-parity', $themeUri . 'explore/css/wp-sourcing-parity.css', ['speego-custom-style', 'speego-explore-style'], $version);
        wp_enqueue_script('speego-sourcing-interactions', $themeUri . 'explore/js/wp-sourcing.js', [], $version, true);
    }

    wp_enqueue_style('speego-explore-style', $themeUri . 'explore/css/style.css', [], $version);
    wp_enqueue_style('speego-custom-style', $themeUri . 'explore/css/speego-custom.css', ['speego-explore-style'], $version);
    wp_enqueue_style('speego-process-tabs', $themeUri . 'explore/css/speego-process-tabs.css', ['speego-custom-style'], $version);
    wp_enqueue_style('speego-header-layout', $themeUri . 'explore/css/wp-header-layout.css', ['speego-custom-style'], $version);
    if (in_array($managedRoute, ['#/knowledge', '#/en/knowledge', '#/es/knowledge'], true)) {
        wp_enqueue_style('speego-knowledge-parity', $themeUri . 'explore/css/wp-knowledge-parity.css', ['speego-custom-style', 'speego-explore-style'], $version);
    }

    wp_enqueue_script('speego-wp-navigation', $themeUri . 'explore/js/wp-navigation.js', [], $version, true);
    wp_enqueue_script('speego-cta-band', $themeUri . 'explore/js/cta-band.js', [], $version, true);

    $routeHash = isset($GLOBALS['speego_active_route']) && is_string($GLOBALS['speego_active_route'])
        ? $GLOBALS['speego_active_route']
        : '';
    if ($routeHash === '') {
        $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
        $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
        if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
            $requestPath = substr($requestPath, strlen($homePath) + 1);
        }
        $routeHash = function_exists('speego_route_hash_for_path')
            ? speego_route_hash_for_path(trim($requestPath, '/'))
            : '';
    }
    if ($routeHash === '') {
        $queriedId = get_queried_object_id();
        $metaRoute = $queriedId ? (string) get_post_meta($queriedId, '_speego_route_hash', true) : '';
        if ($metaRoute !== '') {
            $routeHash = $metaRoute;
        }
    }

    $publicUrls = function_exists('speego_public_route_urls') ? speego_public_route_urls() : [];
    $counterpartMap = speego_elementor_counterpart_map($routeHash);
    $alternates = [];
    foreach (['vi', 'en', 'es'] as $lang) {
        if (isset($counterpartMap[$lang], $publicUrls[$counterpartMap[$lang]])) {
            $alternates[$lang] = $publicUrls[$counterpartMap[$lang]];
        }
    }

    $boot = 'window.SPEEGO_WP_HOME=' . wp_json_encode(home_url('/'))
        . ';window.SPEEGO_PUBLIC_ROUTES=' . wp_json_encode($publicUrls)
        . ';window.speegoInitialRoute=' . wp_json_encode($routeHash)
        . ';window.SPEEGO_POST_ALTERNATES=' . wp_json_encode($alternates)
        . ';window.speegoCounterpartRoute=' . speego_elementor_counterpart_js($counterpartMap) . ';';
    wp_add_inline_script('speego-wp-navigation', $boot, 'before');

    $toggle = '(function(){function bind(){var btn=document.getElementById("speego-lang-toggle");'
        . 'var dd=document.getElementById("speego-lang-dropdown");if(!btn||!dd||btn.__speegoLangBound)return;'
        . 'btn.__speegoLangBound=true;btn.addEventListener("click",function(e){e.stopPropagation();'
        . 'var open=dd.classList.toggle("active");btn.setAttribute("aria-expanded",String(open));});'
        . 'document.addEventListener("click",function(e){if(!dd.classList.contains("active"))return;'
        . 'if(e.target.closest&&e.target.closest("#speegoLangSelector"))return;'
        . 'dd.classList.remove("active");btn.setAttribute("aria-expanded","false");});'
        . 'document.addEventListener("keydown",function(e){if(e.key==="Escape"&&dd.classList.contains("active"))'
        . '{dd.classList.remove("active");btn.setAttribute("aria-expanded","false");}});}'
        . 'if(document.readyState!=="loading")bind();'
        . 'else document.addEventListener("DOMContentLoaded",bind);})();';
    wp_add_inline_script('speego-wp-navigation', $toggle, 'after');
}
add_action('wp_enqueue_scripts', 'speego_enqueue_elementor_assets', 20);

// Vercel's Sourcing shell uses the shared "home" header rules on mobile.
add_filter('body_class', function ($classes) {
    $route = $GLOBALS['speego_active_route'] ?? get_post_meta(get_queried_object_id(), '_speego_route_hash', true);
    if (in_array($route, ['#/sourcing', '#/en/sourcing', '#/es/sourcing'], true)) {
        $classes[] = 'home';
        $classes[] = 'speego-seo-page';
    }
    return array_unique($classes);
});

/**
 * Build a language => route-hash map for the page that shares the same
 * content as the current Elementor route (same group + numeric file key +
 * china/vietnam keyword so detail routes do not cross-match).
 */
function speego_elementor_counterpart_map($routeHash)
{
    if (!function_exists('speego_public_route_map') || $routeHash === '') {
        return [];
    }
    $pages = speego_public_route_map();
    $pages = isset($pages['pages']) && is_array($pages['pages']) ? $pages['pages'] : [];
    if (!isset($pages[$routeHash])) {
        return [];
    }
    $keyOf = function ($hash, $page) {
        $file = basename((string) ($page['file'] ?? ''));
        $number = '';
        if (preg_match('/-(\d+)-/', $file, $m)) {
            $number = $m[1];
        }
        $hay = strtolower($hash . ' ' . (string) ($page['slug'] ?? '') . ' ' . $file);
        $keyword = '';
        if (strpos($hay, 'china') !== false || strpos($hay, 'trung-quoc') !== false) {
            $keyword = 'china';
        } elseif (strpos($hay, 'vietnam') !== false || strpos($hay, 'viet-nam') !== false) {
            $keyword = 'vietnam';
        }
        return (string) ($page['group'] ?? '') . '|' . $number . '|' . $keyword;
    };
    $targetKey = $keyOf($routeHash, $pages[$routeHash]);
    $map = [];
    foreach ($pages as $hash => $page) {
        if ($keyOf($hash, $page) !== $targetKey) {
            continue;
        }
        $lang = $page['language'] ?? '';
        if (in_array($lang, ['vi', 'en', 'es'], true) && !isset($map[$lang])) {
            $map[$lang] = $hash;
        }
    }
    return $map;
}

/**
 * Render the counterpart lookup as JS. Returning null lets wp-navigation.js
 * fall back to the language home route when no same-content page exists.
 */
function speego_elementor_counterpart_js(array $map)
{
    if (empty($map)) {
        return 'function(){return null;}';
    }
    return 'function(current,lang){var m=' . wp_json_encode($map) . ';return m[lang]||null;}';
}

/** Render managed HTML as markup while keeping editor filters for other pages. */
function speego_render_editable_content($contentPost)
{
    if (!$contentPost instanceof WP_Post) {
        return '';
    }

    $isElementor = get_post_meta($contentPost->ID, '_elementor_edit_mode', true) === 'builder';
    if ($contentPost->post_content === '' && !$isElementor) {
        return '';
    }

    global $post;
    $previousPost = $post;
    $post = $contentPost;
    setup_postdata($post);

    // HTML imported from the SpeeGo templates is already complete markup.
    // wpautop adds empty paragraphs inside grids and changes their height.
    // Elementor and Gutenberg still need the normal content filters.
    $needsContentFilters = $isElementor
        || get_post_meta($post->ID, '_speego_content_editable', true) !== '1'
        || preg_match('/<!--\s*wp:(?!html(?:\s|-->))/i', $post->post_content);
    $content = $needsContentFilters
        ? apply_filters('the_content', $post->post_content)
        : $post->post_content;

    wp_reset_postdata();
    $post = $previousPost;

    $content = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', trim($content));
    return speego_repair_knowledge_markup($isElementor ? $content : speego_prepare_managed_markup($content));
}

// A theme ZIP replacement does not activate the theme again. Refresh the
// theme-managed pages once on the first admin request after this upgrade.
add_action('admin_init', function () {
    if (get_option('speego_theme_content_version') === '1.2.25') {
        return;
    }
    foreach (speego_get_pages_definitions() as $route => $definition) {
        $page = speego_get_page_by_route($route);
        if ($page && !metadata_exists('post', $page->ID, '_speego_content_backup_before_1_2_0')) {
            update_post_meta($page->ID, '_speego_content_backup_before_1_2_0', $page->post_content);
        }
    }
    speego_seed_all_pages(true);
    update_option('speego_theme_content_version', '1.2.25');
});

/**
 * 3. Admin Menus & Management Interfaces
 */
function speego_register_admin_menus()
{
    // Main SpeeGo Menu
    add_menu_page(
        'Quản lý SpeeGo',
        'SpeeGo Logistics',
        'edit_pages',
        'speego-manager',
        'speego_render_homepage_manager_page',
        'dashicons-admin-site',
        20
    );

    // Submenu 1: Homepage Manager
    add_submenu_page(
        'speego-manager',
        'Quản lý Trang Chủ (Homepage)',
        'Trang Chủ (Home)',
        'edit_pages',
        'speego-manager',
        'speego_render_homepage_manager_page'
    );

    // Submenu 2: Sourcing Headline
    add_submenu_page(
        'speego-manager',
        'Chỉnh tiêu đề Sourcing',
        'Chỉnh Sourcing',
        'edit_pages',
        'speego-sourcing-headline',
        'speego_render_sourcing_headline_page'
    );

    // Submenu 3: Direct link to Pages
    add_submenu_page(
        'speego-manager',
        'Tất cả các trang SpeeGo',
        'Tất cả trang (Pages)',
        'edit_pages',
        'edit.php?post_type=page'
    );
}
add_action('admin_menu', 'speego_register_admin_menus');

function speego_get_page_by_route($route)
{
    $pages = get_posts([
        'post_type' => 'page',
        'post_status' => ['publish', 'draft'],
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => $route,
    ]);
    return $pages ? $pages[0] : null;
}

/**
 * Render Homepage Manager in WP Admin
 */
function speego_render_homepage_manager_page()
{
    if (!current_user_can('edit_pages')) {
        wp_die('Bạn không có quyền truy cập trang này.');
    }

    $viHome = speego_get_page_by_route('#/home');
    $enHome = speego_get_page_by_route('#/en/home');
    $esHome = speego_get_page_by_route('#/es/inicio');

    echo '<div class="wrap" style="max-width:1100px;">';
    echo '<h1 style="display:flex;align-items:center;gap:10px;"><span class="dashicons dashicons-admin-home" style="font-size:32px;width:32px;height:32px;"></span> Quản lý Trang Chủ (SpeeGo Homepage)</h1>';

    if (isset($_GET['synced']) && $_GET['synced'] === '1') {
        echo '<div class="notice notice-success is-dismissible"><p><strong>Đã đồng bộ thành công tất cả các trang SpeeGo từ mã nguồn vào WordPress!</strong></p></div>';
    }
    if (isset($_GET['saved']) && $_GET['saved'] === '1') {
        echo '<div class="notice notice-success is-dismissible"><p><strong>Đã lưu thông tin trang chủ thành công!</strong></p></div>';
    }

    echo '<div style="background:#fff;border:1px solid #ccd0d4;padding:20px;border-radius:8px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);">';
    echo '<h2 style="margin-top:0;">1. Trạng thái & Chỉnh sửa trực tiếp trên WordPress</h2>';
    echo '<p style="color:#646970;">Trang chủ SpeeGo được quản lý hoàn toàn dưới dạng các WordPress Page với đầy đủ 9 sections (Hero, Dịch vụ, Năng lực, Quy trình 8 bước, Form tư vấn, Đối tác, Đánh giá, Vì sao chọn SpeeGo, Tin tức). Bạn có thể bấm vào nút dưới đây để chỉnh sửa nội dung bằng trình soạn thảo của WordPress:</p>';

    echo '<table class="widefat striped" style="margin-top:15px;margin-bottom:20px;">';
    echo '<thead><tr><th>Ngôn ngữ</th><th>Tiêu đề Page trên WP</th><th>ID</th><th>Đường dẫn công khai</th><th>Hành động</th></tr></thead>';
    echo '<tbody>';

    $languages = [
        ['name' => 'Tiếng Việt (Mặc định)', 'flag' => '🇻🇳', 'page' => $viHome, 'url' => home_url('/vi/'), 'route' => '#/home'],
        ['name' => 'English (Tiếng Anh)', 'flag' => '🇺🇸', 'page' => $enHome, 'url' => home_url('/en/'), 'route' => '#/en/home'],
        ['name' => 'Español (Tiếng Tây Ban Nha)', 'flag' => '🇪🇸', 'page' => $esHome, 'url' => home_url('/es/'), 'route' => '#/es/inicio'],
    ];

    foreach ($languages as $lang) {
        $p = $lang['page'];
        echo '<tr>';
        echo '<td><strong>' . $lang['flag'] . ' ' . esc_html($lang['name']) . '</strong></td>';
        if ($p) {
            echo '<td>' . esc_html($p->post_title) . '</td>';
            echo '<td>#' . esc_html($p->ID) . '</td>';
            echo '<td><a href="' . esc_url($lang['url']) . '" target="_blank" style="text-decoration:none;">' . esc_html($lang['url']) . ' ↗</a></td>';
            echo '<td>';
            echo '<a href="' . esc_url(admin_url('post.php?post=' . $p->ID . '&action=edit')) . '" class="button button-primary" style="margin-right:8px;">✏️ Chỉnh sửa nội dung</a>';
            echo '<a href="' . esc_url($lang['url']) . '" target="_blank" class="button">👁️ Xem trang</a>';
            echo '</td>';
        } else {
            echo '<td colspan="3" style="color:#d63638;"><em>Chưa được tạo trong cơ sở dữ liệu</em></td>';
            echo '<td><span style="color:#d63638;">Vui lòng bấm Đồng bộ bên dưới</span></td>';
        }
        echo '</tr>';
    }

    echo '</tbody></table>';

    // Sync button form
    echo '<div style="background:#f0f6fc;border-left:4px solid #72aee6;padding:15px;margin-top:20px;border-radius:0 4px 4px 0;">';
    echo '<h3 style="margin:0 0 8px 0;">🔄 Đồng bộ lại toàn bộ trang từ mã nguồn (1-Click Sync)</h3>';
    echo '<p style="margin:0 0 12px 0;color:#50575e;">Khi cập nhật theme, 21 trang WordPress được đồng bộ một lần từ bản demo mới nhất; nội dung cũ được lưu trong post meta. Nút bên dưới dùng để đồng bộ lại thủ công và sẽ ghi đè các chỉnh sửa mới sau lần đồng bộ tự động.</p>';
    echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '" style="display:inline-block;">';
    wp_nonce_field('speego_sync_pages_action', 'speego_sync_pages_nonce');
    echo '<input type="hidden" name="action" value="speego_sync_all_pages">';
    echo '<button type="submit" class="button button-secondary" onclick="return confirm(\'Bạn có chắc chắn muốn nạp và đồng bộ lại tất cả trang từ mã nguồn theme vào WordPress không?\');">';
    echo '📥 Nạp / Đồng bộ tất cả trang vào WordPress ngay';
    echo '</button>';
    echo '</form>';
    echo '</div>';

    echo '</div>'; // End box 1

    // Box 2: Sourcing Quick Edit Link
    echo '<div style="background:#fff;border:1px solid #ccd0d4;padding:20px;border-radius:8px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);">';
    echo '<h2 style="margin-top:0;">2. Quản lý trang Sourcing & QC</h2>';
    echo '<p style="color:#646970;">Trang Sourcing hỗ trợ công cụ thay đổi tiêu đề chữ màu cam và các đoạn văn bản riêng biệt.</p>';
    echo '<p><a href="' . esc_url(admin_url('admin.php?page=speego-sourcing-headline')) . '" class="button button-primary">🛠️ Chuyển đến màn hình Chỉnh Sourcing</a> ';
    echo '<a href="' . esc_url(home_url('/vi/tim-nguon-hang/')) . '" target="_blank" class="button">👁️ Mở trang Sourcing</a></p>';
    echo '</div>';

    echo '</div>'; // End wrap
}

/**
 * Handle Sync Action POST
 */
function speego_handle_sync_all_pages()
{
    if (!current_user_can('edit_pages')
        || !isset($_POST['speego_sync_pages_nonce'])
        || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['speego_sync_pages_nonce'])), 'speego_sync_pages_action')) {
        wp_die('Yêu cầu không hợp lệ.');
    }

    speego_seed_all_pages(true);
    wp_safe_redirect(add_query_arg('synced', '1', admin_url('admin.php?page=speego-manager')));
    exit;
}
add_action('admin_post_speego_sync_all_pages', 'speego_handle_sync_all_pages');

/**
 * 4. Sourcing Headline Editor Screen
 */
function speego_sourcing_page_id()
{
    $pages = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => '#/sourcing',
    ]);
    return $pages ? $pages[0]->ID : 0;
}


/**
 * Render About Page Manager in WP Admin
 */
function speego_render_about_manager_page()
{
    if (!current_user_can('edit_pages')) {
        wp_die('Bạn không có quyền truy cập trang này.');
    }

    $viAbout = speego_get_page_by_route('#/about-us');
    $enAbout = speego_get_page_by_route('#/en/about-us');
    $esAbout = speego_get_page_by_route('#/es/about-us');

    echo '<div class="wrap" style="max-width:1100px;">';
    echo '<h1 style="display:flex;align-items:center;gap:10px;"><span class="dashicons dashicons-groups" style="font-size:32px;width:32px;height:32px;"></span> Quản lý Trang Về SpeeGo (About Us)</h1>';

    echo '<div style="background:#fff;border:1px solid #ccd0d4;padding:20px;border-radius:8px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);">';
    echo '<h2 style="margin-top:0;">1. Trạng thái & Chỉnh sửa trực tiếp trên WordPress</h2>';
    echo '<p style="color:#646970;">Trang About Us chứa đầy đủ nội dung giới thiệu SpeeGo, 6 trụ cột giá trị (Why SpeeGo), và form liên hệ/tư vấn. Bạn có thể bấm nút dưới đây để chỉnh sửa nội dung bằng trình soạn thảo của WordPress:</p>';

    echo '<table class="widefat striped" style="margin-top:15px;margin-bottom:20px;">';
    echo '<thead><tr><th>Ngôn ngữ</th><th>Tiêu đề Page trên WP</th><th>ID</th><th>Đường dẫn công khai</th><th>Hành động</th></tr></thead>';
    echo '<tbody>';

    $languages = [
        ['name' => 'Tiếng Việt', 'flag' => '🇻🇳', 'page' => $viAbout, 'url' => home_url(speego_public_route_path('#/about-us')), 'route' => '#/about-us'],
        ['name' => 'English (Tiếng Anh)', 'flag' => '🇺🇸', 'page' => $enAbout, 'url' => home_url(speego_public_route_path('#/en/about-us')), 'route' => '#/en/about-us'],
        ['name' => 'Español (Tiếng Tây Ban Nha)', 'flag' => '🇪🇸', 'page' => $esAbout, 'url' => home_url(speego_public_route_path('#/es/about-us')), 'route' => '#/es/about-us'],
    ];

    foreach ($languages as $lang) {
        $p = $lang['page'];
        echo '<tr>';
        echo '<td><strong>' . $lang['flag'] . ' ' . esc_html($lang['name']) . '</strong></td>';
        if ($p) {
            echo '<td>' . esc_html($p->post_title) . '</td>';
            echo '<td>#' . esc_html($p->ID) . '</td>';
            echo '<td><a href="' . esc_url($lang['url']) . '" target="_blank" style="text-decoration:none;">' . esc_html($lang['url']) . ' ↗</a></td>';
            echo '<td>';
            echo '<a href="' . esc_url(admin_url('post.php?post=' . $p->ID . '&action=edit')) . '" class="button button-primary" style="margin-right:8px;">✏️ Chỉnh sửa nội dung</a>';
            echo '<a href="' . esc_url($lang['url']) . '" target="_blank" class="button">👁️ Xem trang</a>';
            echo '</td>';
        } else {
            echo '<td colspan="3" style="color:#d63638;"><em>Chưa được tạo trong cơ sở dữ liệu</em></td>';
            echo '<td><a href="' . esc_url(admin_url('admin.php?page=speego-manager')) . '" class="button">Đến trang đồng bộ</a></td>';
        }
        echo '</tr>';
    }

    echo '</tbody></table>';
    echo '</div>';
    echo '</div>';
}

function speego_render_sourcing_headline_page()
{
    if (!current_user_can('edit_pages')) {
        wp_die('Bạn không có quyền chỉnh trang này.');
    }
    $pageId = speego_sourcing_page_id();
    echo '<div class="wrap"><h1>Chỉnh tiêu đề trang Sourcing</h1>';
    if (!$pageId) {
        echo '<p>Không tìm thấy trang Sourcing đã xuất bản. Vui lòng bấm <a href="' . esc_url(admin_url('admin.php?page=speego-manager')) . '">Đồng bộ tất cả trang</a> trước.</p></div>';
        return;
    }
    if (isset($_GET['updated']) && $_GET['updated'] === '1') {
        echo '<div class="notice notice-success is-dismissible"><p>Đã lưu tiêu đề.</p></div>';
    }
    $headline = get_post_meta($pageId, '_speego_sourcing_headline', true);
    if ($headline === '') {
        $headline = speego_sourcing_headline_from_content(get_post($pageId)->post_content);
    }
    $reference = file_get_contents(__DIR__ . '/sourcing-reference/vi.html');
    if ($reference === false || !preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', $reference, $main)) {
        echo '<p>Không đọc được nội dung gốc của trang.</p></div>';
        return;
    }
    if ($headline === '') {
        $headline = speego_sourcing_headline_from_content($main[1]);
    }
    $entries = speego_sourcing_text_entries($main[1]);
    $overrides = get_post_meta($pageId, '_speego_sourcing_text_overrides', true);
    if (!is_array($overrides)) {
        $overrides = [];
    }
    echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '">';
    wp_nonce_field('speego_sourcing_headline_save', 'speego_sourcing_headline_nonce');
    echo '<input type="hidden" name="action" value="speego_save_sourcing_headline">';
    echo '<p><label for="speego_sourcing_headline">Chữ màu cam trong tiêu đề chính</label></p>';
    echo '<p><input id="speego_sourcing_headline" name="speego_sourcing_headline" type="text" class="regular-text" value="' . esc_attr($headline) . '" required></p>';
    echo '<h2>Các đoạn chữ khác trên trang</h2>';
    echo '<p>Tìm đoạn cần sửa rồi thay chữ trong ô bên phải. Bố cục, ảnh và đường dẫn sẽ được giữ nguyên.</p>';
    echo '<p><input id="speego_text_search" type="search" class="regular-text" placeholder="Tìm chữ cần sửa" aria-label="Tìm chữ cần sửa"></p>';
    submit_button('Lưu thay đổi', 'primary', 'submit', false);
    echo '<table class="widefat striped"><thead><tr><th scope="col">Chữ hiện tại</th><th scope="col">Sửa thành</th></tr></thead><tbody>';
    foreach ($entries as $key => $entry) {
        $current = isset($overrides[$key]) && is_string($overrides[$key])
            ? $overrides[$key]
            : $entry['source'];
        echo '<tr class="speego-text-row"><th scope="row">' . esc_html($entry['source']) . '</th>';
        echo '<td><textarea class="large-text" rows="2" name="speego_sourcing_texts[' . esc_attr($key) . ']">' . esc_textarea($current) . '</textarea></td></tr>';
    }
    echo '</tbody></table>';
    echo '<script>document.getElementById("speego_text_search").addEventListener("input",function(){var q=this.value.toLocaleLowerCase();document.querySelectorAll(".speego-text-row").forEach(function(row){row.style.display=row.textContent.toLocaleLowerCase().includes(q)?"":"none";});});</script>';
    submit_button('Lưu thay đổi');
    echo '<p><a href="' . esc_url(home_url('/vi/tim-nguon-hang/')) . '" target="_blank" rel="noopener">Mở trang Sourcing để kiểm tra</a></p></form></div>';
}

function speego_save_sourcing_headline()
{
    $pageId = speego_sourcing_page_id();
    if (!$pageId || !current_user_can('edit_post', $pageId)
        || !isset($_POST['speego_sourcing_headline_nonce'])
        || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['speego_sourcing_headline_nonce'])), 'speego_sourcing_headline_save')) {
        wp_die('Không thể lưu tiêu đề.');
    }
    $headline = isset($_POST['speego_sourcing_headline'])
        ? sanitize_text_field(wp_unslash($_POST['speego_sourcing_headline']))
        : '';
    if ($headline === '') {
        wp_die('Tiêu đề không được để trống.');
    }
    update_post_meta($pageId, '_speego_sourcing_headline', $headline);
    $reference = file_get_contents(__DIR__ . '/sourcing-reference/vi.html');
    if ($reference !== false && preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', $reference, $main)) {
        $entries = speego_sourcing_text_entries($main[1]);
        $submitted = isset($_POST['speego_sourcing_texts']) && is_array($_POST['speego_sourcing_texts'])
            ? wp_unslash($_POST['speego_sourcing_texts'])
            : [];
        $overrides = [];
        foreach ($entries as $key => $entry) {
            if (!isset($submitted[$key]) || !is_string($submitted[$key])) {
                continue;
            }
            $value = sanitize_textarea_field($submitted[$key]);
            if ($value !== $entry['source']) {
                $overrides[$key] = $value;
            }
        }
        update_post_meta($pageId, '_speego_sourcing_text_overrides', $overrides);
    }
    wp_safe_redirect(add_query_arg('updated', '1', admin_url('admin.php?page=speego-sourcing-headline')));
    exit;
}
add_action('admin_post_speego_save_sourcing_headline', 'speego_save_sourcing_headline');

/**
 * 5. Resolve route pages by their full language-aware path
 */
function speego_route_hash_for_path($requestPath)
{
    $requestPath = rawurldecode((string) wp_parse_url($requestPath, PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    } elseif ($homePath !== '' && $requestPath === $homePath) {
        $requestPath = '';
    }
    $requestPath = trim($requestPath, '/');
    if ($requestPath === '') {
        return '';
    }
    $routeMap = speego_public_route_map();
    foreach ($routeMap['pages'] as $routeHash => $definition) {
        if (trim($definition['path'], '/') === $requestPath) {
            return $routeHash;
        }
    }
    // Check aliases in route-map
    $normalized = '/' . $requestPath . '/';
    if (isset($routeMap['aliases'][$normalized])) {
        $target = trim(explode('#', $routeMap['aliases'][$normalized], 2)[0], '/');
        foreach ($routeMap['pages'] as $routeHash => $definition) {
            if (trim($definition['path'], '/') === $target) {
                return $routeHash;
            }
        }
    }
    $normalizedNoSlash = '/' . $requestPath;
    if (isset($routeMap['aliases'][$normalizedNoSlash])) {
        $target = trim(explode('#', $routeMap['aliases'][$normalizedNoSlash], 2)[0], '/');
        foreach ($routeMap['pages'] as $routeHash => $definition) {
            if (trim($definition['path'], '/') === $target) {
                return $routeHash;
            }
        }
    }
    $aliases = [
        'vi/tim-nguon-hang' => '#/sourcing',
        'vi/logistics' => '#/tuyen-van-chuyen',
        'en/logistics' => '#/en/shipping-routes',
        'es/abastecimiento' => '#/es/sourcing',
        'es/logistics' => '#/es/rutas-de-envio',
        'vi/about-us' => '#/about-us',
        'en/about-us' => '#/en/about-us',
        'es/about-us' => '#/es/about-us',
        'about-us' => '#/about-us',
        'about' => '#/about-us',
        'vi/contact' => '#/contact',
        'en/contact' => '#/en/contact',
        'es/contact' => '#/es/contact',
        'contact' => '#/en/contact',
        'vi/sourcing' => '#/sourcing',
        'es/sourcing' => '#/es/sourcing',
        'vi/kho-van' => '#/fulfillment',
        'vi/hoan-tat-don-hang' => '#/fulfillment',
        'vi/fulfillment' => '#/fulfillment',
        'es/almacenamiento' => '#/es/fulfillment',
        'es/cumplimiento' => '#/es/fulfillment',
        'es/almacen' => '#/es/fulfillment',
        'es/fulfillment' => '#/es/fulfillment',
        'vi/ve-chung-toi' => '#/about-us',
        'es/sobre-nosotros' => '#/es/about-us',
        'en' => '#/en/home',
        'vi' => '#/home',
        'es' => '#/es/inicio',
    ];
    if (isset($aliases[$requestPath])) {
        return $aliases[$requestPath];
    }
    return '';
}

/** Shared public URL definitions for the first multilingual routes. */
function speego_public_route_map()
{
    static $routeMap = null;
    if ($routeMap !== null) {
        return $routeMap;
    }
    $file = __DIR__ . '/route-map.json';
    $decoded = is_readable($file) ? json_decode(file_get_contents($file), true) : null;
    $routeMap = is_array($decoded) && isset($decoded['pages'], $decoded['aliases'])
        ? $decoded
        : ['pages' => [], 'aliases' => []];
    // Old Vercel bookmarks encode a section as the final path segment.
    foreach ($routeMap['pages'] as $definition) {
        if (($definition['group'] ?? '') !== 'fulfillment') continue;
        foreach (['bang-gia-fulfillment', 'fulfillment-cost', 'warehouse-handling', 'shipping-rates', 'uoc-tinh-chi-phi', 'chinh-sach-fulfillment'] as $section) {
            $alias = rtrim($definition['path'], '/') . '/' . $section;
            $routeMap['aliases'][$alias] = $definition['path'] . '#' . $section;
            $routeMap['aliases'][$alias . '/'] = $definition['path'] . '#' . $section;
        }
    }
    // Some legacy aliases point at other aliases. Resolve them once so a
    // request and a generated link both reach the public URL in one step.
    foreach ($routeMap['aliases'] as $alias => $target) {
        $visited = [$alias => true];
        while (isset($routeMap['aliases'][$target]) && !isset($visited[$target])) {
            $visited[$target] = true;
            $target = $routeMap['aliases'][$target];
        }
        $routeMap['aliases'][$alias] = $target;
    }
    return $routeMap;
}

function speego_public_route_path($routeHash)
{
    $routeMap = speego_public_route_map();
    return isset($routeMap['pages'][$routeHash]['path']) ? $routeMap['pages'][$routeHash]['path'] : '';
}

/** URLs used by the WordPress navigation bridge, including legacy aliases. */
function speego_public_route_urls()
{
    $urls = [];
    $map = speego_public_route_map();
    foreach ($map['pages'] as $hash => $page) {
        $url = home_url($page['path']);
        $urls[$hash] = $url;
        $urls[$page['path']] = $url;
        $urls[rtrim($page['path'], '/')] = $url;
    }
    foreach ($map['aliases'] as $alias => $path) {
        $url = home_url($path);
        $urls[$alias] = $url;
        $urls[rtrim($alias, '/')] = $url;
    }
    return $urls;
}

/** Redirect the old home and page slugs to the language-aware canonical URLs. */
function speego_redirect_public_route_aliases()
{
    if (isset($_GET['elementor-preview']) || isset($_GET['elementor-preview-type'])) {
        return;
    }
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && $requestPath === $homePath) {
        $requestPath = '/';
    } elseif ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath));
    }
    $routeMap = speego_public_route_map();
    $trimmed = trim($requestPath, '/');
    $normalized = '/' . $trimmed . '/';
    $normalizedNoSlash = '/' . $trimmed;

    if ($trimmed === '') {
        $language = isset($_GET['lang']) ? sanitize_key(wp_unslash($_GET['lang'])) : 'en';
        $destination = $language === 'vi' ? '/vi/' : ($language === 'es' ? '/es/' : '/en/');
        wp_safe_redirect(home_url($destination), 301);
        exit;
    }

    $destination = '';
    if (isset($routeMap['aliases'][$normalized])) {
        $destination = $routeMap['aliases'][$normalized];
    } elseif (isset($routeMap['aliases'][$normalizedNoSlash])) {
        $destination = $routeMap['aliases'][$normalizedNoSlash];
    }

    // WordPress can still resolve the pages under their database slugs
    // (for example /home-en/). Those addresses must not show a second copy.
    if ($destination === '') {
        $queriedId = get_queried_object_id();
        $route = $queriedId ? get_post_meta($queriedId, '_speego_route_hash', true) : '';
        $destination = $route ? speego_public_route_path($route) : '';
    }

    if ($destination !== '' && $destination !== $requestPath) {
        wp_safe_redirect(home_url($destination), 301);
        exit;
    }
}
add_action('template_redirect', 'speego_redirect_public_route_aliases', 1);

function speego_resolve_route_page($wp)
{
    if (isset($_GET['elementor-preview'])) {
        // Resolve the preview before Elementor initializes its document.
        // Virtual VI/ES paths otherwise look like missing attachments until
        // template_include runs, which is too late for the editor iframe.
        $previewId = (int) $_GET['elementor-preview'];
        $previewPost = get_post($previewId);
        if ($previewPost && current_user_can('edit_post', $previewId)) {
            $wp->query_vars = $previewPost->post_type === 'page'
                ? ['page_id' => $previewId]
                : ['p' => $previewId, 'post_type' => $previewPost->post_type];
        }
        return;
    }
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && $requestPath === $homePath) {
        return;
    }
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    } else {
        $requestPath = ltrim($requestPath, '/');
    }

    $route = speego_route_hash_for_path($requestPath);
    if (!$route) {
        return;
    }
    $posts = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => $route,
    ]);
    if ($posts) {
        $wp->query_vars = ['page_id' => $posts[0]->ID];
        return;
    }

    // Language pages such as /vi/ and /en/ make WordPress parse the next
    // segment (/vi/lien-he/, /en/contact/) as an attachment. These routes have
    // no media file, so redirect_canonical() calls get_attachment_link() on a
    // null post and PHP warns. Mark the request as a normal miss instead.
    $wp->query_vars = ['error' => '404'];
}
add_action('parse_request', 'speego_resolve_route_page');

// Prevent redirecting virtual language routes
add_filter('redirect_canonical', function ($redirectUrl) {
    $path = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($path, $homePath . '/') === 0) {
        $path = substr($path, strlen($homePath) + 1);
    }
    $clean = trim($path, '/');
    $routeMap = speego_public_route_map();
    foreach ($routeMap['pages'] as $def) {
        if (trim($def['path'], '/') === $clean) {
            return false;
        }
    }
    if (isset($routeMap['aliases']['/' . $clean . '/']) || isset($routeMap['aliases']['/' . $clean])) {
        return false;
    }
    if (in_array($clean, ['vi/sourcing', 'en/sourcing', 'es/sourcing', 'vi/about-us', 'en/about-us', 'es/about-us', 'about-us', 'about', 'vi/ve-chung-toi', 'es/sobre-nosotros', 'vi/tim-nguon-hang', 'es/abastecimiento', 'vi/kho-van', 'es/almacenamiento', 'vi/fulfillment', 'es/fulfillment', 'en', 'vi', 'es'], true)) {
        return false;
    }
    return $redirectUrl;
});

// Ensure any SpeeGo route loads front-page.php and returns status 200 without 404
add_filter('pre_handle_404', function ($preempt, $wp_query) {
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    }
    $clean = trim($requestPath, '/');
    if (function_exists('speego_route_hash_for_path') && speego_route_hash_for_path($clean)) {
        $wp_query->is_404 = false;
        status_header(200);
        return true;
    }
    return $preempt;
}, 10, 2);

function speego_elementor_route_page($routeHash)
{
    $titles = [
        '#/knowledge' => 'SpeeGo Knowledge Hub Elementor VI',
        '#/en/knowledge' => 'SpeeGo Knowledge Hub Elementor EN',
        '#/es/knowledge' => 'SpeeGo Knowledge Hub Elementor ES',
    ];
    if (!isset($titles[$routeHash])) {
        return null;
    }

    // Only published pages may serve public routes. Drafts must never leak
    // to visitors (Elementor previews use ?elementor-preview= instead).
    $matches = get_posts([
        'post_type' => 'page',
        'post_status' => ['publish'],
        'numberposts' => 5,
        's' => $titles[$routeHash],
    ]);
    foreach ($matches as $match) {
        if ($match->post_title === $titles[$routeHash]) {
            return $match;
        }
    }

    return null;
}

add_filter('pre_get_document_title', function ($title) {
    $route = $GLOBALS['speego_active_route'] ?? '';
    if ($route === '' || !function_exists('speego_public_route_map')) {
        return $title;
    }
    $seoTitle = speego_public_route_map()['pages'][$route]['title'] ?? '';
    return $seoTitle !== '' ? $seoTitle : $title;
});

add_action('wp_head', function () {
    $route = $GLOBALS['speego_active_route'] ?? '';
    if ($route === '' || !function_exists('speego_public_route_map')) {
        return;
    }
    $page = speego_public_route_map()['pages'][$route] ?? null;
    if (!$page) {
        return;
    }
    if (!empty($page['description'])) {
        echo '<meta name="description" content="' . esc_attr($page['description']) . '">' . "\n";
    }
    if (!empty($page['path'])) {
        echo '<link rel="canonical" href="' . esc_url(home_url($page['path'])) . '">' . "\n";
    }
}, 1);

add_filter('language_attributes', function ($output) {
    $route = $GLOBALS['speego_active_route'] ?? '';
    if ($route === '' || !function_exists('speego_public_route_map')) {
        return $output;
    }
    $language = speego_public_route_map()['pages'][$route]['language'] ?? '';
    $htmlLang = $language === 'vi' ? 'vi-VN' : ($language === 'es' ? 'es-ES' : ($language === 'en' ? 'en' : ''));
    if ($htmlLang === '') {
        return $output;
    }
    if (preg_match('/\blang="/', $output)) {
        return preg_replace('/\blang="[^"]*"/', 'lang="' . esc_attr($htmlLang) . '"', $output, 1);
    }
    return trim($output) . ' lang="' . esc_attr($htmlLang) . '"';
});

add_filter('template_include', function ($template) {
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    }
    $clean = trim($requestPath, '/');
    $routeHash = function_exists('speego_route_hash_for_path') ? speego_route_hash_for_path($clean) : '';

    // Elementor / WP preview links use the PUBLIC route URL (rewritten by the
    // page_link filter), which has no real WP page query behind it, so the
    // template hierarchy would resolve 404.php and the preview iframe shows
    // "Not Found 404". Point the main query at the previewed post instead.
    $previewId = 0;
    if (isset($_GET['elementor-preview'])) {
        $previewId = (int) $_GET['elementor-preview'];
    } elseif (isset($_GET['preview_id'])) {
        $previewId = (int) $_GET['preview_id'];
    } elseif (isset($_GET['preview'], $_GET['p'])) {
        $previewId = (int) $_GET['p'];
    } elseif (isset($_GET['preview'], $_GET['page_id'])) {
        $previewId = (int) $_GET['page_id'];
    }
    if ($previewId) {
        $previewPost = get_post($previewId);
        if ($previewPost && in_array($previewPost->post_status, ['publish', 'draft', 'pending', 'private', 'future'], true)
            && ($previewPost->post_status === 'publish' || current_user_can('edit_post', $previewId))) {
            global $wp_query, $post;
            $wp_query->is_404 = false;
            $wp_query->is_preview = true;
            $wp_query->is_home = false;
            $wp_query->is_archive = false;
            $wp_query->is_attachment = false;
            $wp_query->is_singular = true;
            $wp_query->is_page = $previewPost->post_type === 'page';
            $wp_query->is_single = $previewPost->post_type !== 'page';
            $wp_query->is_front_page = ((int) get_option('page_on_front') === (int) $previewPost->ID);
            $wp_query->queried_object = $previewPost;
            $wp_query->queried_object_id = (int) $previewPost->ID;
            $wp_query->posts = [$previewPost];
            $wp_query->post_count = 1;
            $wp_query->found_posts = 1;
            $post = $previewPost;
            $GLOBALS['speego_active_route'] = $routeHash !== ''
                ? $routeHash
                : (string) get_post_meta($previewPost->ID, '_speego_route_hash', true);
            setup_postdata($previewPost);
            status_header(200);
            return get_template_directory() . ($previewPost->post_type === 'page' ? '/page.php' : '/single.php');
        }
        return $template;
    }
    if ($routeHash) {
        $page = function_exists('speego_elementor_route_page') ? speego_elementor_route_page($routeHash) : null;
        if (!$page || !speego_is_elementor_document($page->ID)) {
            $page = speego_get_page_by_route($routeHash);
        }
        if ($page && function_exists('speego_is_elementor_document') && speego_is_elementor_document($page->ID)) {
            global $wp_query, $post;
            $wp_query->is_404 = false;
            $wp_query->is_page = true;
            $wp_query->is_singular = true;
            $wp_query->is_home = false;
            $wp_query->is_front_page = false;
            $wp_query->queried_object = $page;
            $wp_query->queried_object_id = (int) $page->ID;
            $wp_query->posts = [$page];
            $wp_query->post_count = 1;
            $wp_query->found_posts = 1;
            $post = $page;
            $GLOBALS['speego_active_route'] = $routeHash;
            setup_postdata($page);
            return get_template_directory() . '/page.php';
        }
        return get_template_directory() . '/front-page.php';
    }
    return $template;
});


// Deliver clean plain-text robots.txt and XML sitemap for WordPress
add_action('init', function () {
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    }
    $requestPath = trim($requestPath, '/');
    if ($requestPath === 'robots.txt') {
        header('Content-Type: text/plain; charset=UTF-8');
        if (get_option('blog_public')) {
            echo "User-agent: *\nAllow: /\nSitemap: " . esc_url(home_url('/sitemap.xml')) . "\n";
        } else {
            echo "User-agent: *\nDisallow: /\n";
        }
        exit;
    }
    if ($requestPath === 'sitemap.xml' || $requestPath === 'wp-sitemap.xml') {
        header('Content-Type: application/xml; charset=UTF-8');
        $routeMap = speego_public_route_map();
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";
        foreach ($routeMap['pages'] as $hash => $page) {
            $loc = home_url($page['path']);
            $changefreq = ($page['group'] === 'home') ? 'weekly' : 'monthly';
            echo "  <url>\n";
            echo "    <loc>" . esc_url($loc) . "</loc>\n";
            echo "    <changefreq>{$changefreq}</changefreq>\n";
            echo "  </url>\n";
        }
        // Native WordPress Posts are added after the fixed route-map pages.
        foreach (get_posts(['post_type' => 'post', 'post_status' => 'publish', 'numberposts' => -1]) as $post) {
            echo "  <url>\n";
            echo '    <loc>' . esc_url(get_permalink($post->ID)) . "</loc>\n";
            echo "    <changefreq>monthly</changefreq>\n";
            echo "  </url>\n";
        }
        echo "</urlset>\n";
        exit;
    }
});

/**
 * 6. Link pages to their public URLs
 */
function speego_page_link_fix($link, $post_id)
{
    $route = get_post_meta($post_id, '_speego_route_hash', true);
    $publicPath = speego_public_route_path($route);
    if ($publicPath !== '') {
        return home_url($publicPath);
    }
    return $link;
}
add_filter('page_link', 'speego_page_link_fix', 10, 2);

/**
 * 7. REST API Endpoint for Editable Content
 */
function speego_editable_content($request)
{
    $partial = $request->get_param('partial');
    if ($partial) {
        $posts = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_content_key',
            'meta_value' => sanitize_key($partial),
        ]);
    } else {
        $route = (string) $request->get_param('route');
        $posts = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $route,
        ]);
    }

    if (!$posts) {
        return new WP_Error('speego_content_not_found', 'Editable SpeeGo content not found.', ['status' => 404]);
    }

    $raw = $posts[0]->post_content;
    // Strip file:// offline redirection scripts
    $raw = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $raw);
    // Strip Gutenberg HTML comment markers
    $raw = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $raw);
    $raw = trim($raw);
    if (get_post_meta($posts[0]->ID, '_elementor_edit_mode', true) !== 'builder') {
        $raw = speego_restore_home_consultation(speego_prepare_managed_markup($raw));
        $raw = speego_align_route_components($raw, (string) get_post_meta($posts[0]->ID, '_speego_route_hash', true));
        $raw = speego_repair_knowledge_markup($raw);
        if (strpos($raw, 'speego-hero-bg-video') !== false) {
            $raw = speego_restore_home_hero_video($raw);
        }
    }

    return rest_ensure_response([
        'id' => $posts[0]->ID,
        'title' => $posts[0]->post_title,
        'content' => $raw,
    ]);
}

add_action('rest_api_init', function () {
    register_rest_route('speego/v1', '/content', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'speego_editable_content',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * 8. Allow SVG, data-* attributes, and rich markup in SpeeGo pages
 */
remove_filter('content_save_pre', 'wp_filter_post_kses');
remove_filter('content_filtered_save_pre', 'wp_filter_post_kses');

add_filter('wp_kses_allowed_html', function ($tags, $context) {
    if ($context === 'post') {
        foreach ($tags as $tag_name => &$tag_attrs) {
            if (is_array($tag_attrs)) {
                $tag_attrs['data-i18n'] = true;
                $tag_attrs['data-i18n-ph'] = true;
                $tag_attrs['data-nav'] = true;
                $tag_attrs['data-breadcrumb'] = true;
                $tag_attrs['data-variant'] = true;
                $tag_attrs['data-component'] = true;
                $tag_attrs['data-heading'] = true;
                $tag_attrs['data-subtext'] = true;
                $tag_attrs['data-phone'] = true;
                $tag_attrs['data-tag'] = true;
                $tag_attrs['data-target'] = true;
                $tag_attrs['data-lang'] = true;
                $tag_attrs['data-step'] = true;
                $tag_attrs['data-label'] = true;
                $tag_attrs['data-route-origin'] = true;
                $tag_attrs['data-page-route'] = true;
                $tag_attrs['data-section'] = true;
                $tag_attrs['data-cookie-choice'] = true;
                $tag_attrs['data-track-search-close'] = true;
                $tag_attrs['data-track-modal-close'] = true;
                $tag_attrs['data-origin'] = true;
                $tag_attrs['data-post-breadcrumb-slot'] = true;
            }
        }
        $tags['svg'] = ['class' => true, 'viewbox' => true, 'width' => true, 'height' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true, 'aria-hidden' => true, 'focusable' => true, 'style' => true];
        $tags['path'] = ['d' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true];
        $tags['circle'] = ['cx' => true, 'cy' => true, 'r' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true];
        $tags['line'] = ['x1' => true, 'y1' => true, 'x2' => true, 'y2' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true];
        $tags['polyline'] = ['points' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true];
        $tags['rect'] = ['x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true];
        $tags['polygon'] = ['points' => true, 'fill' => true, 'stroke' => true];
        $tags['template'] = ['id' => true];
    }
    return $tags;
}, 10, 2);
