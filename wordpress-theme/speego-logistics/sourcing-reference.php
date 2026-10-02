<?php
/** Read only the orange part of the Sourcing hero title. */
function speego_sourcing_headline_from_content($content)
{
    if (!preg_match(
        '/<h1\b[^>]*class="[^"]*\bhero-h1-clean\b[^"]*"[^>]*>.*?<span\b[^>]*class="[^"]*\btext-orange\b[^"]*"[^>]*>(.*?)<\/span>/is',
        $content,
        $match
    )) {
        return '';
    }
    return trim(html_entity_decode(strip_tags($match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}

/** Return editable text nodes from the unchanged reference body. */
function speego_sourcing_text_entries($content)
{
    $heroTextOffset = -1;
    if (preg_match(
        '/<h1\b[^>]*class="[^"]*\bhero-h1-clean\b[^"]*"[^>]*>.*?<span\b[^>]*class="[^"]*\btext-orange\b[^"]*"[^>]*>(.*?)<\/span>/is',
        $content,
        $heroMatch,
        PREG_OFFSET_CAPTURE
    )) {
        $heroTextOffset = $heroMatch[1][1];
    }
    preg_match_all('/>([^<>]+)</u', $content, $matches, PREG_OFFSET_CAPTURE);
    $duplicates = [];
    $entries = [];
    foreach ($matches[1] as $match) {
        $raw = $match[0];
        $source = trim(html_entity_decode($raw, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        if ($source === '' || !preg_match('/[\p{L}\p{N}]/u', $source)) {
            continue;
        }
        $number = isset($duplicates[$source]) ? ++$duplicates[$source] : ($duplicates[$source] = 1);
        $key = substr(hash('sha256', $source . "\0" . $number), 0, 16);
        if ($match[1] === $heroTextOffset) {
            continue; // The orange title has its own prominent field.
        }
        $entries[$key] = [
            'source' => $source,
            'raw' => $raw,
            'offset' => $match[1],
        ];
    }
    return $entries;
}

/** Insert plain-text overrides without serializing or changing any HTML tag. */
function speego_sourcing_apply_text_overrides($content, $overrides)
{
    if (!is_array($overrides) || !$overrides) {
        return $content;
    }
    foreach (array_reverse(speego_sourcing_text_entries($content), true) as $key => $entry) {
        if (!isset($overrides[$key]) || !is_string($overrides[$key])) {
            continue;
        }
        $raw = $entry['raw'];
        preg_match('/^\s*/u', $raw, $leading);
        preg_match('/\s*$/u', $raw, $trailing);
        $replacement = $leading[0] . esc_html($overrides[$key]) . $trailing[0];
        $content = substr_replace($content, $replacement, $entry['offset'], strlen($raw));
    }
    return $content;
}

/** Render the same server-rendered Sourcing shell used by the Vercel build. */
function speego_render_reference_sourcing($routeHash, $queriedId)
{
    $languages = [
        '#/sourcing' => 'vi',
        '#/en/sourcing' => 'en',
        '#/es/sourcing' => 'es',
    ];
    if (!isset($languages[$routeHash])) {
        return false;
    }

    $post = get_post($queriedId);
    if (!$post || $post->post_status !== 'publish'
        || get_post_meta($post->ID, '_speego_route_hash', true) !== $routeHash) {
        return false;
    }

    $source = __DIR__ . '/sourcing-reference/' . $languages[$routeHash] . '.html';
    if (!is_readable($source)) {
        return false;
    }
    $html = file_get_contents($source);
    $content = trim($post->post_content);
    if ($html === false) {
        return false;
    }
    // The block editor can strip the layout classes from an imported page.
    // Keep custom intact layouts, but recover broken pages from the theme copy.
    if (get_post_meta($post->ID, '_speego_sourcing_reference', true) !== '1'
        && strpos($content, 'page-sourcing') !== false
        && strpos($content, 'sourcing-hero-section') !== false
        && strpos($content, 'hero-2col-grid') !== false) {
        return false;
    }

    if (!preg_match('/(<main\b[^>]*\bid="app-main"[^>]*>)(.*?)(<\/main>)/is', $html, $main)) {
        return false;
    }
    $referenceContent = $main[2];

    // The checked-in reference carries production metadata; bind each copy to
    // the active site's canonical URLs so local and production routes agree.
    $routeHashes = [
        'vi' => '#/sourcing',
        'en' => '#/en/sourcing',
        'es' => '#/es/sourcing',
    ];
    $routePaths = [];
    foreach ($routeHashes as $language => $hash) {
        $routePaths[$language] = speego_public_route_path($hash);
    }
    $canonical = home_url($routePaths[$languages[$routeHash]]);
    $html = preg_replace('/<link\\s+rel="canonical"\\s+href="[^"]*"\\s*\\/?\\s*>/i', '<link rel="canonical" href="' . esc_url($canonical) . '">', $html, 1);
    $alternateTags = '';
    foreach ($routePaths as $language => $path) {
        $alternateTags .= '<link rel="alternate" hreflang="' . esc_attr($language) . '" href="' . esc_url(home_url($path)) . '">';
    }
    $alternateTags .= '<link rel="alternate" hreflang="x-default" href="' . esc_url(home_url($routePaths['en'])) . '">';
    $html = preg_replace('/(?:\\s*<link\\s+rel="alternate"\\s+hreflang="[^"]+"\\s+href="[^"]*"\\s*\\/?\\s*>)+/i', $alternateTags, $html, 1);
    $html = preg_replace('/<meta\\s+property="og:url"\\s+content="[^"]*"\\s*\\/?\\s*>/i', '<meta property="og:url" content="' . esc_url($canonical) . '">', $html, 1);
    if (!get_option('blog_public')) {
        $html = preg_replace('/<meta\\s+name="robots"\\s+content="[^"]*"\\s*\\/?\\s*>/i', '<meta name="robots" content="noindex,follow">', $html, 1);
    }

    // The Classic editor rewrites complex markup, including inline SVGs.
    // Render the intact reference and keep only the existing headline edit.
    $editedHeadline = speego_sourcing_headline_from_content($content);
    $content = $referenceContent;
    $content = speego_sourcing_apply_text_overrides(
        $content,
        get_post_meta($post->ID, '_speego_sourcing_text_overrides', true)
    );

    $headline = get_post_meta($post->ID, '_speego_sourcing_headline', true);
    if ($headline === '') {
        $headline = $editedHeadline;
    }
    // Remove the one-off test headline saved during the migration preview.
    if (preg_match('/^Anh [Cc]ông(?: chỉnh)?\.?$/u', trim($headline))) {
        $headline = '';
    }
    if ($headline !== '') {
        $content = preg_replace_callback(
            '/(<h1\b[^>]*class="[^"]*\bhero-h1-clean\b[^"]*"[^>]*>.*?<span\b[^>]*class="[^"]*\btext-orange\b[^"]*"[^>]*>).*?(<\/span>)/is',
            function ($matches) use ($headline) {
                return $matches[1] . esc_html($headline) . $matches[2];
            },
            $content,
            1
        );
    }

    // Keep the Vercel header, footer, styles and scripts.
    $html = preg_replace_callback(
        '/(<main\b[^>]*\bid="app-main"[^>]*>).*?(<\/main>)/is',
        function ($matches) use ($content) {
            return $matches[1] . $content . $matches[2];
        },
        $html,
        1
    );

    $themeUrl = untrailingslashit(get_template_directory_uri());
    $html = str_replace('/wp-content/themes/logistica/', esc_url($themeUrl . '/sourcing-reference/logistica/'), $html);
    $html = str_replace('/explore/', esc_url($themeUrl . '/explore/'), $html);
    $html = str_replace('https://speegologistic.com/', esc_url(trailingslashit(home_url('/'))), $html);
    $assetBase = wp_json_encode($themeUrl . '/sourcing-reference/logistica/', JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    $publicRoutes = wp_json_encode(speego_public_route_urls(), JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    $home = wp_json_encode(home_url('/'), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    $route = wp_json_encode($routeHash, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    $navigationScript = esc_url($themeUrl . '/explore/js/wp-navigation.js?ver=1.2.25');
    $bridge = '<script>window.speegoLogisticaAssetBase=' . $assetBase
        . ';window.SPEEGO_WP_HOME=' . $home
        . ';window.SPEEGO_PUBLIC_ROUTES=' . $publicRoutes
        . ';window.speegoInitialRoute=' . $route
        . ';window.speegoCounterpartRoute=function(current,lang){return {vi:"#/sourcing",en:"#/en/sourcing",es:"#/es/sourcing"}[lang];};</script>'
        . '<script src="' . $navigationScript . '"></script>';
    $html = preg_replace('/<head>/i', '<head>' . $bridge, $html, 1);
    $html = str_replace('</head>', '<link rel="stylesheet" href="' . esc_url($themeUrl . '/explore/css/wp-header-layout.css?ver=1.2.25') . '"></head>', $html);
    $html = str_replace('</body>', '<script src="' . esc_url($themeUrl . '/explore/js/wp-sourcing.js?ver=1.2.25') . '"></script></body>', $html);
    if (!get_option('blog_public')) {
        $html = str_replace('content="index,follow,max-image-preview:large"', 'content="noindex,follow"', $html);
    }
    return $html;
}
