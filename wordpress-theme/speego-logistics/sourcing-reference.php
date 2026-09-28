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
        || get_post_meta($post->ID, '_speego_route_hash', true) !== $routeHash
        || get_post_meta($post->ID, '_speego_sourcing_reference', true) !== '1') {
        return false;
    }

    $source = __DIR__ . '/sourcing-reference/' . $languages[$routeHash] . '.html';
    if (!is_readable($source)) {
        return false;
    }
    $html = file_get_contents($source);
    $content = trim($post->post_content);
    if ($html === false || strpos($content, 'page-sourcing') === false) {
        return false;
    }

    if (!preg_match('/(<main\b[^>]*\bid="app-main"[^>]*>)(.*?)(<\/main>)/is', $html, $main)) {
        return false;
    }
    $referenceContent = $main[2];

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
    $html = preg_replace('/<head>/i', '<head><script>window.speegoLogisticaAssetBase=' . $assetBase . ';</script>', $html, 1);
    if (!get_option('blog_public')) {
        $html = str_replace('content="index,follow,max-image-preview:large"', 'content="noindex,follow"', $html);
    }
    return $html;
}
