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
    $html = str_replace(['src="assets/', 'href="assets/'], ['src="' . $assetBase . 'assets/', 'href="' . $assetBase . 'assets/'], $html);
    if ($partial === 'footer') {
        $html = speego_localize_footer_html($html, $language);
        $html = preg_replace('#<p\b[^>]*\bspeego-footer-move\b[^>]*>.*?</p>#is', '', $html);
    }
    return $html;
}

/** Translate the shared footer and point its links at the active language. */
function speego_localize_footer_html($html, $language)
{
    $language = in_array($language, ['vi', 'en', 'es'], true) ? $language : 'vi';
    $labels = [
        'vi' => [
            'footer_move' => "LET'S MOVE FORWARD",
            'footer_tagline' => 'Đơn vị sản xuất và cung cấp dịch vụ logistics toàn cầu. Chuyên tuyến Trung Quốc và Việt Nam đi Mỹ, Canada, Úc. Tối ưu chi phí, minh bạch hành trình.',
            'footer_services_title' => 'Dịch Vụ Chính',
            'footer_service_sourcing' => 'Sourcing & QC',
            'footer_service_routes' => 'Logistics Quốc Tế',
            'footer_service_fulfillment' => 'Fulfillment & Kho Bãi',
            'footer_service_import_export' => 'Thủ Tục Hải Quan',
            'footer_service_air' => 'Vận Chuyển Hàng Không',
            'footer_quick_title' => 'Liên Kết Nhanh',
            'footer_quick_process' => 'Quy Trình 8 Bước',
            'footer_quick_why' => 'Vì Sao Chọn SpeeGo',
            'footer_quick_news' => 'Tin Tức & Thị Trường',
            'footer_quick_knowledge' => 'SpeeGo Knowledge',
            'footer_quick_contact' => 'Liên Hệ Trực Tiếp',
            'policy_privacy' => 'Chính Sách Bảo Mật',
            'policy_terms' => 'Điều Khoản & Điều Kiện',
            'footer_offices_title' => 'Văn Phòng Đại Diện',
            'office_us_title' => 'Hoa Kỳ',
            'office_hanoi_title' => 'Hà Nội',
            'office_hcm_title' => 'Hồ Chí Minh',
            'office_canada_title' => 'Canada',
            'office_china_title' => 'Trung Quốc',
            'footer_copyright' => '© 2026 SpeeGo Logistics. All rights reserved. Designed for Global Supply Chain Excellence.',
        ],
        'en' => [
            'footer_move' => "LET'S MOVE FORWARD",
            'footer_tagline' => 'Global manufacturing and logistics provider specializing in routes from China and Vietnam to the US, Canada, and Australia. Optimized costs and transparent tracking.',
            'footer_services_title' => 'Core services',
            'footer_service_sourcing' => 'Sourcing & QC',
            'footer_service_routes' => 'International logistics',
            'footer_service_fulfillment' => 'Fulfillment & warehousing',
            'footer_service_import_export' => 'Customs procedures',
            'footer_service_air' => 'Air freight',
            'footer_quick_title' => 'Quick links',
            'footer_quick_process' => '8-step process',
            'footer_quick_why' => 'Why choose SpeeGo',
            'footer_quick_news' => 'News & market insights',
            'footer_quick_knowledge' => 'SpeeGo Knowledge',
            'footer_quick_contact' => 'Contact us',
            'policy_privacy' => 'Privacy Policy',
            'policy_terms' => 'Terms & Conditions',
            'footer_offices_title' => 'Representative offices',
            'office_us_title' => 'United States',
            'office_hanoi_title' => 'Hanoi',
            'office_hcm_title' => 'Ho Chi Minh City',
            'office_canada_title' => 'Canada',
            'office_china_title' => 'China',
            'footer_copyright' => '© 2026 SpeeGo Logistics. All rights reserved. Designed for Global Supply Chain Excellence.',
        ],
        'es' => [
            'footer_move' => 'AVANCEMOS JUNTOS',
            'footer_tagline' => 'Proveedor global de servicios de manufactura y logística. Especialistas en rutas China y Vietnam a EE.UU., Canadá y Australia.',
            'footer_services_title' => 'Servicios Principales',
            'footer_service_sourcing' => 'Sourcing y Control de Calidad',
            'footer_service_routes' => 'Rutas de Envío Global',
            'footer_service_fulfillment' => 'Fulfillment y Almacenamiento',
            'footer_service_import_export' => 'Aduanas e Import-Export',
            'footer_service_air' => 'Carga Aérea',
            'footer_quick_title' => 'Enlaces Rápidos',
            'footer_quick_process' => 'Proceso de 8 Pasos',
            'footer_quick_why' => 'Por Qué SpeeGo',
            'footer_quick_news' => 'Noticias y mercados',
            'footer_quick_knowledge' => 'SpeeGo Knowledge',
            'footer_quick_contact' => 'Contacto',
            'policy_privacy' => 'Política de Privacidad',
            'policy_terms' => 'Términos y Condiciones',
            'footer_offices_title' => 'Oficinas Representativas',
            'office_us_title' => 'Estados Unidos',
            'office_hanoi_title' => 'Hanói',
            'office_hcm_title' => 'Ciudad Ho Chi Minh',
            'office_canada_title' => 'Canadá',
            'office_china_title' => 'China',
            'footer_copyright' => '© 2026 SpeeGo Logistics. Todos los derechos reservados.',
        ],
    ];
    $html = preg_replace_callback(
        '/(<(?:a|h4|h5|p)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)(.*?)(<\/(?:a|h4|h5|p)>)/is',
        function ($matches) use ($labels, $language) {
            if (!isset($labels[$language][$matches[2]])) {
                return $matches[0];
            }
            return $matches[1] . esc_html($labels[$language][$matches[2]]) . $matches[4];
        },
        $html
    );
    if ($language !== 'vi') {
        $phrases = [
            'en' => [
                'Leadvisors Tower, 643 Phạm Văn Đồng, Phường Nghĩa Đô, Hà Nội' => 'Leadvisors Tower, 643 Pham Van Dong Street, Nghia Do Ward, Hanoi',
                '<strong>Mã ZIP:</strong>' => '<strong>ZIP code:</strong>',
                '<strong>Văn phòng:</strong>' => '<strong>Office:</strong>',
                '<strong>Kho hàng:</strong>' => '<strong>Warehouse:</strong>',
                'Khu công nghiệp Shengzhifu, Zhongluotan, quận Bạch Vân, Quảng Châu' => 'Shengzhifu Industrial Park, Zhongluotan, Baiyun District, Guangzhou',
                'Gửi yêu cầu tư vấn thành công! SpeeGo sẽ liên hệ lại sớm nhất.' => 'Your consultation request was sent. SpeeGo will contact you shortly.',
            ],
            'es' => [
                'Leadvisors Tower, 643 Phạm Văn Đồng, Phường Nghĩa Đô, Hà Nội' => 'Leadvisors Tower, 643 Pham Van Dong, barrio Nghia Do, Hanói',
                '<strong>Mã ZIP:</strong>' => '<strong>Código postal:</strong>',
                '<strong>Văn phòng:</strong>' => '<strong>Oficina:</strong>',
                '<strong>Kho hàng:</strong>' => '<strong>Almacén:</strong>',
                '01 Đường số 4, KDC Cityland Park Hills, phường Gò Vấp, TP.HCM' => '01 Calle No. 4, Cityland Park Hills, barrio Go Vap, Ciudad Ho Chi Minh',
                '42 Nguyễn Văn Dung, phường An Nhơn, TP.HCM' => '42 Nguyen Van Dung, barrio An Nhon, Ciudad Ho Chi Minh',
                'Khu công nghiệp Shengzhifu, Zhongluotan, quận Bạch Vân, Quảng Châu' => 'Parque industrial Shengzhifu, Zhongluotan, distrito de Baiyun, Cantón',
                'Gửi yêu cầu tư vấn thành công! SpeeGo sẽ liên hệ lại sớm nhất.' => 'Solicitud de asesoría enviada. SpeeGo le contactará pronto.',
            ],
        ];
        $html = str_replace(array_keys($phrases[$language]), array_values($phrases[$language]), $html);
    }
    $routes = [
        'home' => ['vi' => '/vi/', 'en' => '/en/', 'es' => '/es/'],
        'sourcing' => ['vi' => '/vi/tim-nguon-hang/', 'en' => '/en/sourcing/', 'es' => '/es/abastecimiento/'],
        'shipping' => ['vi' => '/vi/tuyen-van-chuyen/', 'en' => '/en/logistics/', 'es' => '/es/logistica/'],
        'fulfillment' => ['vi' => '/vi/kho-van/', 'en' => '/en/fulfillment/', 'es' => '/es/fulfillment/'],
        'import' => ['vi' => '/vi/xuat-nhap-khau/', 'en' => '/en/import-export/', 'es' => '/es/import-export/'],
        'knowledge' => ['vi' => '/vi/kien-thuc/', 'en' => '/en/knowledge/', 'es' => '/es/conocimiento/'],
        'contact' => ['vi' => '/vi/lien-he/', 'en' => '/en/contact/', 'es' => '/es/contacto/'],
        'about' => ['vi' => '/vi/ve-chung-toi/', 'en' => '/en/about-us/', 'es' => '/es/sobre-nosotros/'],
    ];
    $aliases = [
        '/vi/' => 'home',
        '/en/' => 'home',
        '/es/' => 'home',
        '/vi/tim-nguon-hang/' => 'sourcing',
        '/en/sourcing/' => 'sourcing',
        '/es/abastecimiento/' => 'sourcing',
        '/vi/logistics/' => 'shipping',
        '/vi/tuyen-van-chuyen/' => 'shipping',
        '/en/logistics/' => 'shipping',
        '/es/logistica/' => 'shipping',
        '/vi/kho-van/' => 'fulfillment',
        '/en/fulfillment/' => 'fulfillment',
        '/es/fulfillment/' => 'fulfillment',
        '/vi/xuat-nhap-khau/' => 'import',
        '/en/import-export/' => 'import',
        '/es/import-export/' => 'import',
        '/vi/kien-thuc/' => 'knowledge',
        '/en/knowledge/' => 'knowledge',
        '/es/conocimiento/' => 'knowledge',
        '/vi/lien-he/' => 'contact',
        '/en/contact/' => 'contact',
        '/es/contacto/' => 'contact',
        '/vi/ve-chung-toi/' => 'about',
        '/en/about-us/' => 'about',
        '/es/sobre-nosotros/' => 'about',
    ];
    $html = preg_replace_callback('/\bhref="([^"]*)"/i', function ($matches) use ($aliases, $routes, $language) {
        $path = wp_parse_url($matches[1], PHP_URL_PATH);
        if (!is_string($path) || $path === '') {
            return $matches[0];
        }
        $path = untrailingslashit($path) . '/';
        if (!isset($aliases[$path], $routes[$aliases[$path]][$language])) {
            return $matches[0];
        }
        return 'href="' . esc_url(home_url($routes[$aliases[$path]][$language])) . '"';
    }, $html);
    $html = preg_replace_callback('/<a\b[^>]*\bdata-page-route="home"[^>]*\bdata-section="([^"]+)"[^>]*>/i', function ($matches) use ($routes, $language) {
        $section = sanitize_key($matches[1]);
        $url = esc_url(home_url($routes['home'][$language])) . '#' . $section;
        return preg_replace('/\bhref="[^"]*"/i', 'href="' . $url . '"', $matches[0], 1);
    }, $html);
    return $html;
}

/** Prepare navigation in the first HTML response for a native Post. */
function speego_localize_post_header($html, $language)
{
    $labels = [
        'vi' => ['policy_label' => 'Chính sách', 'policy_privacy' => 'Chính sách bảo mật', 'policy_terms' => 'Điều khoản & Điều kiện', 'nav_home' => 'Trang chủ', 'nav_about' => 'Về SpeeGo', 'nav_sourcing' => 'Tìm nguồn hàng', 'nav_routes' => 'Vận chuyển', 'nav_origin_china' => 'Origin: China', 'nav_origin_vietnam' => 'Origin: Vietnam', 'nav_fulfillment' => 'Kho vận', 'nav_import_export' => 'Xuất nhập khẩu', 'nav_knowledge' => 'Kiến thức', 'nav_quote_btn' => 'Nhận báo giá'],
        'en' => ['policy_label' => 'Policy', 'policy_privacy' => 'Privacy Policy', 'policy_terms' => 'Terms & Conditions', 'nav_home' => 'Homepage', 'nav_about' => 'About', 'nav_sourcing' => 'Sourcing', 'nav_routes' => 'Logistics', 'nav_origin_china' => 'Origin: China', 'nav_origin_vietnam' => 'Origin: Vietnam', 'nav_fulfillment' => 'Fulfillment', 'nav_import_export' => 'Import & Export', 'nav_knowledge' => 'Knowledge', 'nav_quote_btn' => 'Get a Quote'],
        'es' => ['policy_label' => 'Políticas', 'policy_privacy' => 'Política de Privacidad', 'policy_terms' => 'Términos y Condiciones', 'nav_home' => 'Inicio', 'nav_about' => 'Acerca de', 'nav_sourcing' => 'Abastecimiento', 'nav_routes' => 'Logística', 'nav_origin_china' => 'Origen: China', 'nav_origin_vietnam' => 'Origen: Vietnam', 'nav_fulfillment' => 'Fulfillment', 'nav_import_export' => 'Importación y exportación', 'nav_knowledge' => 'Conocimientos', 'nav_quote_btn' => 'Cotizar'],
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
