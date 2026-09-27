<?php
/** Search metadata and initial HTML for the three editable Sourcing pages. */

function speego_render_sourcing_seo($entry, $routeHash, $queriedId)
{
    $pages = [
        '#/sourcing' => [
            'lang' => 'vi',
            'htmlLang' => 'vi-VN',
            'locale' => 'vi_VN',
            'title' => 'Tìm nguồn hàng & kiểm soát chất lượng | SpeeGo Logistics',
            'description' => 'SpeeGo giúp doanh nghiệp tìm nhà sản xuất phù hợp, xác minh năng lực nhà máy, đàm phán hợp tác và kiểm soát chất lượng trước khi xuất xưởng.',
        ],
        '#/en/sourcing' => [
            'lang' => 'en',
            'htmlLang' => 'en',
            'locale' => 'en_US',
            'title' => 'Global Sourcing & Quality Control | SpeeGo Logistics',
            'description' => 'SpeeGo helps businesses find manufacturers, verify factory capabilities, negotiate terms and check product quality before factory release.',
        ],
        '#/es/sourcing' => [
            'lang' => 'es',
            'htmlLang' => 'es',
            'locale' => 'es_ES',
            'title' => 'Abastecimiento y control de calidad | SpeeGo Logistics',
            'description' => 'SpeeGo ayuda a encontrar fabricantes, auditar instalaciones, negociar condiciones y controlar la calidad de cada lote antes del envío.',
        ],
    ];
    if (!isset($pages[$routeHash])) {
        return $entry;
    }

    $post = get_post($queriedId);
    if (!$post || $post->post_status !== 'publish' || get_post_meta($post->ID, '_speego_route_hash', true) !== $routeHash) {
        return $entry;
    }
    $content = trim($post->post_content);
    $content = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $content);
    $content = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $content);
    if (!preg_match('/<h1\b/i', $content)) {
        return $entry;
    }

    $page = $pages[$routeHash];
    $paths = [
        'vi' => '/vi/sourcing/',
        'en' => '/en/sourcing/',
        'es' => '/es/sourcing/',
    ];
    $canonical = home_url($paths[$page['lang']]);
    $image = get_template_directory_uri() . '/explore/assets/warehouse_racks_hero.jpg';
    $robots = get_option('blog_public') ? 'index,follow,max-image-preview:large' : 'noindex,follow';

    $alternates = '';
    foreach ($paths as $lang => $path) {
        $alternates .= '<link rel="alternate" hreflang="' . esc_attr($lang) . '" href="' . esc_url(home_url($path)) . '">';
    }
    $alternates .= '<link rel="alternate" hreflang="x-default" href="' . esc_url(home_url($paths['vi'])) . '">';

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Service',
        '@id' => $canonical . '#service',
        'name' => $page['title'],
        'description' => $page['description'],
        'url' => $canonical,
        'inLanguage' => $page['htmlLang'],
        'provider' => [
            '@type' => 'Organization',
            'name' => 'SpeeGo Logistics',
            'url' => home_url('/'),
        ],
    ];
    $head = '<meta name="description" content="' . esc_attr($page['description']) . '">'
        . '<meta name="robots" content="' . esc_attr($robots) . '">'
        . '<link rel="canonical" href="' . esc_url($canonical) . '">'
        . $alternates
        . '<meta property="og:type" content="website">'
        . '<meta property="og:locale" content="' . esc_attr($page['locale']) . '">'
        . '<meta property="og:site_name" content="SpeeGo Logistics">'
        . '<meta property="og:title" content="' . esc_attr($page['title']) . '">'
        . '<meta property="og:description" content="' . esc_attr($page['description']) . '">'
        . '<meta property="og:url" content="' . esc_url($canonical) . '">'
        . '<meta property="og:image" content="' . esc_url($image) . '">'
        . '<meta name="twitter:card" content="summary_large_image">'
        . '<script type="application/ld+json">'
        . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT)
        . '</script>';

    $entry = preg_replace(
        '/<title\b[^>]*>.*?<\/title>/is',
        '<title>' . esc_html($page['title']) . '</title>' . $head,
        $entry,
        1
    );
    $entry = preg_replace('/<html\b([^>]*\blang=")[^"]*("[^>]*)>/i', '<html$1' . esc_attr($page['htmlLang']) . '$2>', $entry, 1);
    return preg_replace_callback(
        '/(<main\b[^>]*\bid="app-main"[^>]*>).*?(<\/main>)/is',
        function ($matches) use ($content, $routeHash) {
            $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
            return $mainOpen . $content . $matches[2];
        },
        $entry,
        1
    );
}
