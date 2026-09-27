<?php
/**
 * SpeeGo Logistics Theme Functions
 */
require_once __DIR__ . '/sourcing-reference.php';

// Give editors a dedicated screen, so saving a headline cannot rewrite the
// large HTML page or remove its inline graphics.
function speego_register_sourcing_headline_page()
{
    add_menu_page(
        'Chỉnh tiêu đề Sourcing',
        'Sourcing',
        'edit_pages',
        'speego-sourcing-headline',
        'speego_render_sourcing_headline_page',
        'dashicons-edit',
        21
    );
}
add_action('admin_menu', 'speego_register_sourcing_headline_page');

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
        echo '<p>Không tìm thấy trang Sourcing đã xuất bản.</p></div>';
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

// 1. Resolve route pages by their full language-aware path.
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

// These public paths are virtual WordPress routes backed by editable pages.
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

// Populate an empty WordPress.com site when this preview theme is activated.
// Existing local/XAMPP Sourcing pages are left intact.
function speego_seed_sourcing_pages()
{
    $pages = [
        '#/sourcing' => ['title' => 'Sourcing & QC', 'slug' => 'sourcing', 'file' => 'sourcing.html', 'lang' => 'vi'],
        '#/en/sourcing' => ['title' => 'Global Sourcing & QC', 'slug' => 'sourcing-en', 'file' => 'en-sourcing.html', 'lang' => 'en'],
        '#/es/sourcing' => ['title' => 'Abastecimiento y control de calidad', 'slug' => 'sourcing-es', 'file' => 'es-sourcing.html', 'lang' => 'es'],
    ];
    foreach ($pages as $route => $page) {
        $existing = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $route,
        ]);
        if ($existing) {
            continue;
        }
        $file = get_template_directory() . '/explore/pages/sourcing/' . $page['file'];
        if (!is_readable($file)) {
            continue;
        }
        $content = file_get_contents($file);
        $content = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $content);
        $reference = get_template_directory() . '/sourcing-reference/' . $page['lang'] . '.html';
        $usesReference = false;
        if (is_readable($reference)
            && preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', file_get_contents($reference), $match)) {
            $content = trim($match[1]);
            $usesReference = true;
        }
        $id = wp_insert_post([
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_title' => $page['title'],
            'post_name' => $page['slug'],
            'post_content' => $content,
        ], true);
        if (!is_wp_error($id)) {
            update_post_meta($id, '_speego_route_hash', $route);
            update_post_meta($id, '_speego_content_editable', '1');
            if ($usesReference) {
                update_post_meta($id, '_speego_sourcing_reference', '1');
            }
        }
    }
}
add_action('after_switch_theme', 'speego_seed_sourcing_pages');

// 2. Link the Sourcing pages to their language-specific public URLs.
function speego_page_link_fix($link, $post_id)
{
    if (is_admin() || wp_is_json_request()) {
        $route = get_post_meta($post_id, '_speego_route_hash', true);
        $sourcingPaths = [
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

// 3. REST API Endpoint for Editable Content
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

// 4. Allow SVG, data-* attributes, and rich markup in SpeeGo pages
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


