<?php
/** Language links for WordPress Posts created after the seeded SpeeGo pages. */

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
});

add_action('init', function () {
    $auth = function ($allowed, $metaKey, $postId) {
        return current_user_can('edit_post', $postId);
    };
    register_post_meta('post', '_speego_post_language', [
        'type' => 'string',
        'single' => true,
        'default' => 'vi',
        'show_in_rest' => true,
        'sanitize_callback' => function ($value) {
            return in_array($value, ['vi', 'en', 'es'], true) ? $value : 'vi';
        },
        'auth_callback' => $auth,
    ]);
    register_post_meta('post', '_speego_translation_group', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_key',
        'auth_callback' => $auth,
    ]);
});

function speego_post_language($postId)
{
    $language = get_post_meta($postId, '_speego_post_language', true);
    return in_array($language, ['vi', 'en', 'es'], true) ? $language : 'vi';
}

function speego_post_translation_group($postId)
{
    return sanitize_key((string) get_post_meta($postId, '_speego_translation_group', true));
}

/** A group is usable only when each published language has one Post. */
function speego_post_alternates($postId)
{
    $group = speego_post_translation_group($postId);
    if ($group === '') {
        return [];
    }
    $posts = get_posts([
        'post_type' => 'post',
        'post_status' => 'publish',
        'numberposts' => -1,
        'meta_key' => '_speego_translation_group',
        'meta_value' => $group,
    ]);
    $alternates = [];
    foreach ($posts as $post) {
        $language = speego_post_language($post->ID);
        if (isset($alternates[$language])) {
            return []; // Duplicate language: avoid conflicting hreflang clusters.
        }
        $alternates[$language] = get_permalink($post->ID);
    }
    if (count($alternates) < 2 || !isset($alternates[speego_post_language($postId)])) {
        return [];
    }
    return $alternates;
}

function speego_post_hreflang()
{
    if (!is_singular('post')) {
        return;
    }
    $alternates = speego_post_alternates(get_queried_object_id());
    foreach (['vi', 'en', 'es'] as $language) {
        if (isset($alternates[$language])) {
            echo '<link rel="alternate" hreflang="' . esc_attr($language) . '" href="' . esc_url($alternates[$language]) . '">' . "\n";
        }
    }
    if (isset($alternates['en'])) {
        echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($alternates['en']) . '">' . "\n";
    }
}
add_action('wp_head', 'speego_post_hreflang', 2);

function speego_post_language_meta_box($post)
{
    $language = speego_post_language($post->ID);
    $group = speego_post_translation_group($post->ID);
    wp_nonce_field('speego_post_translation_' . $post->ID, 'speego_post_translation_nonce');
    echo '<p><label for="speego_post_language"><strong>Ngôn ngữ bài viết</strong></label></p>';
    echo '<select id="speego_post_language" name="speego_post_language" style="width:100%">';
    foreach (['vi' => 'Tiếng Việt', 'en' => 'English', 'es' => 'Español'] as $code => $label) {
        echo '<option value="' . esc_attr($code) . '"' . selected($language, $code, false) . '>' . esc_html($label) . '</option>';
    }
    echo '</select>';
    echo '<p><label for="speego_translation_group"><strong>Mã nhóm bản dịch</strong></label></p>';
    echo '<input id="speego_translation_group" name="speego_translation_group" type="text" value="' . esc_attr($group) . '" style="width:100%" placeholder="vi-du: huong-dan-gui-hang">';
    echo '<p class="description">Nhập cùng một mã ở các bài dịch VI/EN/ES. Chỉ bài đã xuất bản mới được nối bằng hreflang. Mỗi nhóm chỉ có một bài cho mỗi ngôn ngữ.</p>';
}

add_action('add_meta_boxes_post', function () {
    add_meta_box(
        'speego-post-translations',
        'Ngôn ngữ & bản dịch SpeeGo',
        'speego_post_language_meta_box',
        'post',
        'side',
        'high'
    );
});

function speego_save_post_translation($postId)
{
    if (!isset($_POST['speego_post_translation_nonce'])
        || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['speego_post_translation_nonce'])), 'speego_post_translation_' . $postId)
        || !current_user_can('edit_post', $postId)
        || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)) {
        return;
    }
    $language = isset($_POST['speego_post_language'])
        ? sanitize_key(wp_unslash($_POST['speego_post_language'])) : 'vi';
    $language = in_array($language, ['vi', 'en', 'es'], true) ? $language : 'vi';
    $group = isset($_POST['speego_translation_group'])
        ? sanitize_key(wp_unslash($_POST['speego_translation_group'])) : '';
    update_post_meta($postId, '_speego_post_language', $language);
    if ($group !== '') {
        update_post_meta($postId, '_speego_translation_group', $group);
    } else {
        delete_post_meta($postId, '_speego_translation_group');
    }
}
add_action('save_post_post', 'speego_save_post_translation');

/** Read the same editable shell partials used by the 57 seeded pages. */
function speego_shared_partial_html($partial, $language)
{
    $posts = get_posts([
        'post_type' => 'page',
        'post_status' => ['publish', 'draft'],
        'numberposts' => 1,
        'meta_key' => '_speego_content_key',
        'meta_value' => $partial . '-' . $language,
    ]);
    $html = $posts ? trim($posts[0]->post_content) : '';
    if ($html === '') {
        $file = __DIR__ . '/explore/partials/' . $partial . '.html';
        $html = is_readable($file) ? file_get_contents($file) : '';
    }
    $html = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $html);
    $html = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $html);
    $assetBase = esc_url(trailingslashit(get_template_directory_uri() . '/explore'));
    return str_replace(['src="assets/', 'href="assets/'], ['src="' . $assetBase . 'assets/', 'href="' . $assetBase . 'assets/'], $html);
}

/** Prepare navigation in the first HTML response for a native Post. */
function speego_localize_post_header($html, $language)
{
    $labels = [
        'vi' => ['policy_label' => 'Chính sách', 'policy_privacy' => 'Chính sách bảo mật', 'policy_terms' => 'Điều khoản & Điều kiện', 'nav_home' => 'Trang chủ', 'nav_about' => 'Về SpeeGo', 'nav_sourcing' => 'Tìm nguồn hàng', 'nav_routes' => 'Vận chuyển', 'nav_origin_china' => 'Tuyến Trung Quốc', 'nav_origin_vietnam' => 'Tuyến Việt Nam', 'nav_fulfillment' => 'Kho vận', 'nav_import_export' => 'Xuất nhập khẩu', 'nav_knowledge' => 'Kiến thức', 'nav_quote_btn' => 'Nhận báo giá'],
        'en' => ['policy_label' => 'Policy', 'policy_privacy' => 'Privacy Policy', 'policy_terms' => 'Terms & Conditions', 'nav_home' => 'Homepage', 'nav_about' => 'About', 'nav_sourcing' => 'Sourcing', 'nav_routes' => 'Logistics', 'nav_origin_china' => 'Origin: China', 'nav_origin_vietnam' => 'Origin: Vietnam', 'nav_fulfillment' => 'Fulfillment', 'nav_import_export' => 'Import & Export', 'nav_knowledge' => 'Knowledge', 'nav_quote_btn' => 'Get a Quote'],
        'es' => ['policy_label' => 'Políticas', 'policy_privacy' => 'Política de privacidad', 'policy_terms' => 'Términos y condiciones', 'nav_home' => 'Inicio', 'nav_about' => 'Nosotros', 'nav_sourcing' => 'Abastecimiento', 'nav_routes' => 'Logística', 'nav_origin_china' => 'Origen: China', 'nav_origin_vietnam' => 'Origen: Vietnam', 'nav_fulfillment' => 'Almacenamiento', 'nav_import_export' => 'Importación y exportación', 'nav_knowledge' => 'Conocimiento', 'nav_quote_btn' => 'Solicitar cotización'],
    ];
    $html = preg_replace_callback(
        '/(<(?:a|span|button)\b[^>]*data-i18n="([^"]+)"[^>]*>)([^<]*)(<\/(?:a|span|button)>)/i',
        function ($matches) use ($labels, $language) {
            return isset($labels[$language][$matches[2]])
                ? $matches[1] . esc_html($labels[$language][$matches[2]]) . $matches[4]
                : $matches[0];
        },
        $html
    );
    $routeHashes = [
        'navLinkHome' => ['#/home', '#/en/home', '#/es/inicio'],
        'headerLogoLink' => ['#/home', '#/en/home', '#/es/inicio'],
        'navLinkAbout' => ['#/about-us', '#/en/about-us', '#/es/about-us'],
        'navLinkSourcing' => ['#/sourcing', '#/en/sourcing', '#/es/sourcing'],
        'navLinkRoutes' => ['#/tuyen-van-chuyen', '#/en/shipping-routes', '#/es/rutas-de-envio'],
        'navLinkOriginChina' => ['#/logistics/china-to-us-ca-au', '#/en/logistics/china-to-us-ca-au', '#/es/logistica/china-a-eeuu-canada-australia'],
        'navLinkOriginVietnam' => ['#/logistics/vietnam-to-us-ca-au', '#/en/logistics/vietnam-to-us-ca-au', '#/es/logistica/vietnam-a-eeuu-canada-australia'],
        'navLinkFulfillment' => ['#/fulfillment', '#/en/fulfillment', '#/es/fulfillment'],
        'navLinkImportExport' => ['#/xuat-nhap-khau', '#/en/import-export', '#/es/import-export'],
        'navLinkKnowledge' => ['#/knowledge', '#/en/knowledge', '#/es/knowledge'],
        'mHeaderCtaBtn' => ['#/contact', '#/en/contact', '#/es/contact'],
        'headerCtaBtn' => ['#/contact', '#/en/contact', '#/es/contact'],
    ];
    $index = array_search($language, ['vi', 'en', 'es'], true);
    $urls = speego_public_route_urls();
    $html = preg_replace_callback('/<a\b[^>]*\bid="([^"]+)"[^>]*>/i', function ($matches) use ($routeHashes, $urls, $index) {
        if (!isset($routeHashes[$matches[1]], $urls[$routeHashes[$matches[1]][$index]])) {
            return $matches[0];
        }
        return preg_replace('/\bhref="[^"]*"/i', 'href="' . esc_url($urls[$routeHashes[$matches[1]][$index]]) . '"', $matches[0], 1);
    }, $html);
    $html = preg_replace(
        '/(<span\b[^>]*id="speego-current-lang-text"[^>]*>).*?(<\/span>)/is',
        '$1' . strtoupper($language) . '$2',
        $html,
        1
    );
    $html = preg_replace_callback('/(<span\b[^>]*id="speego-current-lang-flag"[^>]*>).*?(<\/span>)/is', function ($matches) use ($language) {
        $assetBase = esc_url(trailingslashit(get_template_directory_uri() . '/explore'));
        if ($language === 'en') {
            $flag = '<img src="' . $assetBase . 'assets/flags/us.png" alt="EN" class="speego-lang-flag" width="18" height="13">';
        } elseif ($language === 'es') {
            $flag = '<svg class="speego-lang-flag" viewBox="0 0 3 2" width="18" height="13" aria-hidden="true"><rect width="3" height="2" fill="#c60b1e"/><rect y="0.5" width="3" height="1" fill="#ffc400"/></svg>';
        } else {
            $flag = '<img src="' . $assetBase . 'assets/flags/vn.png" alt="VN" class="speego-lang-flag" width="18" height="13">';
        }
        return $matches[1] . $flag . $matches[2];
    }, $html, 1);
    $html = preg_replace_callback('/<button\b[^>]*>/i', function ($matches) use ($language) {
        $button = $matches[0];
        if (!preg_match('/\bclass="[^"]*\bspeego-lang-option\b[^"]*"/i', $button)
            || !preg_match('/\bdata-lang="(vi|en|es)"/i', $button, $option)) {
            return $button;
        }
        $active = $option[1] === $language;
        $button = preg_replace_callback('/\bclass="([^"]*)"/i', function ($class) use ($active) {
            $classes = preg_split('/\s+/', trim($class[1]));
            $classes = array_values(array_filter($classes, function ($name) {
                return $name !== '' && $name !== 'active';
            }));
            if ($active) {
                $classes[] = 'active';
            }
            return 'class="' . implode(' ', $classes) . '"';
        }, $button, 1);
        return preg_replace('/\baria-selected="[^"]*"/i',
            'aria-selected="' . ($active ? 'true' : 'false') . '"', $button, 1);
    }, $html);
    return $html;
}
