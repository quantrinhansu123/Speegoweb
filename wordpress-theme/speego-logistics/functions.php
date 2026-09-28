<?php
/**
 * SpeeGo Logistics Theme Functions
 */
require_once __DIR__ . '/sourcing-reference.php';

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
            'slug' => 'fulfillment',
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
            'slug' => 'fulfillment-es',
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
});

// Auto-seed on first admin visit if homepage doesn't exist
add_action('admin_init', function () {
    $existing = get_posts([
        'post_type' => 'page',
        'post_status' => ['publish', 'draft'],
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => '#/home',
    ]);
    if (!$existing) {
        speego_seed_all_pages(false);
    }
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
        ['name' => 'Tiếng Việt (Mặc định)', 'flag' => '🇻🇳', 'page' => $viHome, 'url' => home_url('/'), 'route' => '#/home'],
        ['name' => 'English (Tiếng Anh)', 'flag' => '🇺🇸', 'page' => $enHome, 'url' => add_query_arg('lang', 'en', home_url('/')), 'route' => '#/en/home'],
        ['name' => 'Español (Tiếng Tây Ban Nha)', 'flag' => '🇪🇸', 'page' => $esHome, 'url' => add_query_arg('lang', 'es', home_url('/')), 'route' => '#/es/inicio'],
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
    echo '<p style="margin:0 0 12px 0;color:#50575e;">Nếu bạn muốn khởi tạo lại hoặc nạp lại đầy đủ 17+ trang (Trang chủ 3 ngôn ngữ, Sourcing, Logistics, Fulfillment, Knowledge, v.v.) từ các file HTML chuẩn của dự án vào WordPress, bấm nút bên dưới:</p>';
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
    echo '<a href="' . esc_url(home_url('/vi/sourcing/')) . '" target="_blank" class="button">👁️ Mở trang Sourcing</a></p>';
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
    echo '<p><a href="' . esc_url(home_url('/vi/sourcing/')) . '" target="_blank" rel="noopener">Mở trang Sourcing để kiểm tra</a></p></form></div>';
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
    $requestPath = trim($requestPath, '/');
    if ($requestPath === '') {
        return '';
    }
    if (strpos($requestPath, 'vi/') === 0) {
        $requestPath = substr($requestPath, 3);
    }
    return '#/' . $requestPath;
}

function speego_resolve_route_page($wp)
{
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
    }
}
add_action('parse_request', 'speego_resolve_route_page');

// Prevent redirecting virtual language routes
add_filter('redirect_canonical', function ($redirectUrl) {
    $path = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($path, $homePath . '/') === 0) {
        $path = substr($path, strlen($homePath) + 1);
    }
    if (in_array(trim($path, '/'), ['vi/sourcing', 'en/sourcing', 'es/sourcing'], true)) {
        return false;
    }
    return $redirectUrl;
});

/**
 * 6. Link pages to their public URLs
 */
function speego_page_link_fix($link, $post_id)
{
    if (is_admin() || wp_is_json_request()) {
        $route = get_post_meta($post_id, '_speego_route_hash', true);
        $sourcingPaths = [
            '#/home' => '/',
            '#/en/home' => '/?lang=en',
            '#/es/inicio' => '/?lang=es',
            '#/sourcing' => '/vi/sourcing/',
            '#/en/sourcing' => '/en/sourcing/',
            '#/es/sourcing' => '/es/sourcing/',
        ];
        if (isset($sourcingPaths[$route])) {
            return home_url($sourcingPaths[$route]);
        }
        if ($route) {
            return home_url('/' . $route);
        }
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
