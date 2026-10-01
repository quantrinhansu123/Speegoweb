<?php
/** Repair media paths and editor-added layout wrappers in legacy SpeeGo pages. */
function speego_prepare_managed_markup($markup)
{
    if (!is_string($markup) || $markup === '') {
        return $markup;
    }

    // The classic editor wraps layout comments in paragraphs. Inside a grid,
    // those empty paragraphs become extra columns and push the image below.
    $markup = preg_replace('~<p\b[^>]*>\s*(?:<!--.*?-->\s*)+</p>~is', '', $markup);
    $markup = preg_replace('~<p\b[^>]*>\s*</p>~i', '', $markup);

    // Apply the reviewed changes to already-saved pages as well as new installs.
    // Keep edited copy and Elementor documents in the database untouched.
    if (preg_match('~class=["\'][^"\']*\bpage-about\b~i', $markup)) {
        $markup = preg_replace('~<section\b[^>]*class=["\'][^"\']*\babout-banner\b[^"\']*["\'][^>]*>.*?</section>~is', '', $markup, 1);
    }
    $markup = preg_replace_callback('~(<section\b[^>]*\bid=["\']news-speego["\'][^>]*>)(.*?)(</section>)~is', function ($section) {
        $section[2] = preg_replace_callback('~\bhref=(["\'])(.*?)\1~i', function ($link) {
            $host = wp_parse_url(html_entity_decode($link[2]), PHP_URL_HOST);
            if ($host && $host !== wp_parse_url(home_url('/'), PHP_URL_HOST)) return $link[0];
            $path = (string) wp_parse_url(html_entity_decode($link[2]), PHP_URL_PATH);
            if (preg_match('~(?:^|/)(?:news(?:/index\.html)?|(?:vi/kien-thuc|en/knowledge|es/conocimiento))/?$~i', $path)) {
                return 'href=' . $link[1] . esc_url(home_url('/news/')) . $link[1];
            }
            return $link[0];
        }, $section[2]);
        return $section[1] . $section[2] . $section[3];
    }, $markup);

    // <base> points at the theme assets. Give section links a public page URL
    // so opening them in another tab also reaches the correct WordPress page.
    $requestRoute = speego_route_hash_for_path((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
    $publicPath = $requestRoute ? speego_public_route_path($requestRoute) : '';
    if ($publicPath !== '') {
        $markup = preg_replace_callback('~<a\b[^>]*>~i', function ($anchor) use ($publicPath) {
            return preg_replace_callback('~\bhref=(["\'])#(?!home["\'])([a-z][\w-]*)\1~i', function ($href) use ($publicPath) {
                return 'href=' . $href[1] . esc_url(home_url($publicPath) . '#' . $href[2]) . $href[1];
            }, $anchor[0]);
        }, $markup);
    }

    // Vercel serves /explore/assets directly; WordPress keeps them in the theme.
    $assets = esc_url(untrailingslashit(get_template_directory_uri()) . '/explore/assets/');
    return preg_replace_callback('~(["\'])/explore/assets/~i', function ($match) use ($assets) {
        return $match[1] . $assets;
    }, $markup);
}

/** Undo wpautop's layout wrappers in imported Knowledge HTML, keeping prose. */
function speego_repair_knowledge_markup($markup)
{
    if (!is_string($markup)
        || !preg_match('~class=["\'][^"\']*\bpage-container\b[^"\']*["\']~i', $markup)
        || !preg_match('~data-nav=["\']knowledge["\']~i', $markup)) {
        return $markup;
    }

    $markup = speego_prepare_managed_markup($markup);
    $markup = preg_replace('~<p\b[^>]*>[\s\x{FEFF}]*(?:<!--.*?-->[\s\x{FEFF}]*)*</p>~isu', '', $markup);
    $previous = libxml_use_internal_errors(true);
    $document = new DOMDocument();
    $document->loadHTML('<?xml encoding="UTF-8"><div id="speego-knowledge-repair-root">' . $markup . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    $xpath = new DOMXPath($document);

    // Paragraphs belong in article copy, but not around badges, links or form
    // controls that are direct children of a layout container.
    $layoutClasses = [
        'topic-grid-3x2', 'topic-card-header', 'topic-article-list',
        'topic-article-item', 'topic-card-footer', 'subcat-grid-4col',
        'subcat-header', 'subcat-list', 'subcat-item', 'categories-pills',
        'form-row-2', 'breadcrumb-list',
    ];
    $conditions = [];
    foreach ($layoutClasses as $class) {
        $conditions[] = 'contains(concat(" ", normalize-space(@class), " "), " ' . $class . ' ")';
    }
    $wrappers = '//*[(' . implode(' or ', $conditions) . ')]/p[not(@*)]'
        . ' | //form/p[not(@*) and button]'
        . ' | //p[not(@*) and span[contains(concat(" ", normalize-space(@class), " "), " section-tag ")]]';
    foreach (iterator_to_array($xpath->query($wrappers)) as $wrapper) {
        while ($wrapper->firstChild) {
            $wrapper->parentNode->insertBefore($wrapper->firstChild, $wrapper);
        }
        $wrapper->parentNode->removeChild($wrapper);
    }
    foreach (iterator_to_array($xpath->query('//br[not(ancestor::p or ancestor::h1 or ancestor::h2 or ancestor::h3 or ancestor::h4 or ancestor::blockquote)]')) as $break) {
        $break->parentNode->removeChild($break);
    }
    // wpautop appends a break after a heading's final inline span.
    foreach (iterator_to_array($xpath->query('//h1/br[not(following-sibling::* or following-sibling::text()[normalize-space()])] | //h2/br[not(following-sibling::* or following-sibling::text()[normalize-space()])]')) as $break) {
        $break->parentNode->removeChild($break);
    }
    foreach (iterator_to_array($xpath->query('//p[not(*) and not(text()[normalize-space()])]')) as $empty) {
        $empty->parentNode->removeChild($empty);
    }
    $root = $document->getElementById('speego-knowledge-repair-root');
    $result = '';
    foreach ($root->childNodes as $child) $result .= $document->saveHTML($child);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    return $result;
}

add_filter('the_content', 'speego_repair_knowledge_markup', 20);
add_filter('elementor/widget/render_content', 'speego_repair_knowledge_markup', 20);

/** Recover the consultation component that WordPress.com strips on save. */
function speego_restore_home_consultation($markup)
{
    $pattern = '~<section\b[^>]*\bid="consultation-form"[^>]*>.*?</section>~is';
    if (!is_string($markup) || !preg_match($pattern, $markup, $current)) {
        return $markup;
    }
    $template = file_get_contents(__DIR__ . '/explore/pages/home/vi-home.html');
    if (strpos($markup, 'id="speego-hero-form-name"') === false) {
        $consolePattern = '~<div\b[^>]*\bid="console-form"[^>]*>.*?(?=<div\b[^>]*\bid="console-tracking")~is';
        if (preg_match($consolePattern, $template, $console)) {
            $markup = preg_replace_callback($consolePattern, function () use ($console) { return $console[0]; }, $markup, 1);
        }
    }
    if (!preg_match('~<input\b[^>]*\bid="speego-track-input"~i', $markup)
        && preg_match('~<input\b[^>]*\bid="speego-track-input"[^>]*>~i', $template, $tracking)) {
        $markup = preg_replace_callback('~<button\b[^>]*\bid="speego-track-btn"[^>]*>~i', function ($match) use ($tracking) {
            return $tracking[0] . $match[0];
        }, $markup, 1);
    }
    if (strpos($current[0], 'id="speego-form-name"') !== false
        && strpos($current[0], 'id="speego-form-route"') !== false
        && strpos($current[0], 'consult-video.mp4') !== false) {
        return $markup;
    }
    if (!preg_match($pattern, $template, $reference)) {
        return $markup;
    }
    // Keep edited labels and headings; localization still runs on the result.
    $replacement = $reference[0];
    preg_match_all('~<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>(.*?)</\1>~is', $current[0], $labels, PREG_SET_ORDER);
    foreach ($labels as $label) {
        $replacement = preg_replace_callback(
            '~(<[a-z0-9]+\b[^>]*\bdata-i18n="' . preg_quote($label[2], '~') . '"[^>]*>).*?(</[a-z0-9]+>)~is',
            function ($match) use ($label) { return $match[1] . $label[3] . $match[2]; },
            $replacement
        );
    }
    return preg_replace_callback($pattern, function () use ($replacement) { return $replacement; }, $markup, 1);
}

/** Repair the imported Sourcing text widget without changing its saved data. */
function speego_repair_sourcing_widget($markup)
{
    if (!is_string($markup) || strpos($markup, 'page-sourcing') === false) {
        return $markup;
    }
    $markup = speego_prepare_managed_markup($markup);
    // wpautop inserts line breaks around inline links and between grid children.
    $markup = preg_replace('~(<a\b[^>]*>)\s*(?:<br\s*/?>\s*)+~i', '$1', $markup);
    $markup = preg_replace('~(?:<br\s*/?>\s*)+(</a>)~i', '$1', $markup);
    $markup = preg_replace('~(</a>)\s*<br\s*/?>\s*(<a\b)~i', '$1$2', $markup);

    $previous = libxml_use_internal_errors(true);
    $document = new DOMDocument();
    $document->loadHTML('<?xml encoding="UTF-8"><div id="speego-repair-root">' . $markup . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    $xpath = new DOMXPath($document);
    foreach (iterator_to_array($xpath->query('//form/p[not(@*) and count(*)=1 and button]')) as $wrapper) {
        $wrapper->parentNode->replaceChild($wrapper->getElementsByTagName('button')->item(0), $wrapper);
    }
    $reference = new DOMDocument();
    $reference->loadHTML('<?xml encoding="UTF-8">' . file_get_contents(__DIR__ . '/explore/pages/sourcing/sourcing.html'));
    $referencePath = new DOMXPath($reference);
    foreach (iterator_to_array($xpath->query('//br[not(ancestor::h1 or ancestor::h2 or ancestor::h3 or ancestor::p)]')) as $break) {
        $break->parentNode->removeChild($break);
    }
    // Recover the deliberate three-line title if its words are unchanged.
    $heading = $xpath->query('//h1')->item(0);
    foreach (['sourcing.html', 'en-sourcing.html', 'es-sourcing.html'] as $file) {
        $template = file_get_contents(__DIR__ . '/explore/pages/sourcing/' . $file);
        if (!$heading || !preg_match('~<h1\b[^>]*>.*?</h1>~is', $template, $match)) continue;
        $normalize = function ($html) {
            return trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags(str_replace(['<br>', '<br/>', '<br />'], ' ', $html)), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
        };
        if ($normalize($document->saveHTML($heading)) === $normalize($match[0])) {
            $fragment = new DOMDocument();
            $fragment->loadHTML('<?xml encoding="UTF-8">' . $match[0]);
            $heading->parentNode->replaceChild($document->importNode($fragment->getElementsByTagName('h1')->item(0), true), $heading);
            break;
        }
    }
    // Match each icon's container and position, preserving all editable text.
    foreach ($referencePath->query('//svg/parent::*[@class]') as $parent) {
        $class = $parent->getAttribute('class');
        $peers = $referencePath->query('//*[@class="' . $class . '"]');
        $targets = $xpath->query('//*[@class="' . $class . '"]');
        foreach ($peers as $index => $peer) {
            $target = $targets->item($index);
            if (!$target || $target->getElementsByTagName('svg')->length) continue;
            foreach ($peer->childNodes as $child) {
                if ($child instanceof DOMElement && $child->tagName === 'svg') {
                    $target->insertBefore($document->importNode($child, true), $target->firstChild);
                }
            }
        }
    }
    $root = $document->getElementById('speego-repair-root');
    $result = '';
    foreach ($root->childNodes as $child) $result .= $document->saveHTML($child);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    return $result;
}

// Only the legacy Sourcing widget needs this repair. Knowledge widgets retain
// their normal Elementor rendering and editor behavior.
add_filter('elementor/widget/render_content', function ($content) {
    return speego_repair_sourcing_widget($content);
}, 20);

/** Match the Vercel category CTA placement without changing the Knowledge hubs. */
function speego_align_route_components($markup, $routeHash)
{
    $routes = speego_public_route_map();
    $page = $routes['pages'][$routeHash] ?? [];
    if (($page['group'] ?? '') !== 'knowledge-cat') return $markup;
    if (strpos($markup, 'data-component="cta-form"') === false) return $markup;
    // Some headings contain a literal <br> inside a quoted data attribute.
    // An HTML-aware parser is required; [^>]* stops halfway through that value.
    $previous = libxml_use_internal_errors(true);
    $document = new DOMDocument();
    $document->loadHTML('<?xml encoding="UTF-8"><div id="speego-category-repair-root">' . $markup . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    $xpath = new DOMXPath($document);
    $placeholders = iterator_to_array($xpath->query('//div[@data-component="cta-form" and not(*) and not(text()[normalize-space()])]'));
    if (!$placeholders) {
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
        return $markup;
    }
    foreach ($placeholders as $placeholder) $placeholder->parentNode->removeChild($placeholder);
    $root = $document->getElementById('speego-category-repair-root');
    $result = '';
    foreach ($root->childNodes as $child) $result .= $document->saveHTML($child);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    $language = in_array($page['language'], ['vi', 'en', 'es'], true) ? $page['language'] : 'vi';
    $band = file_get_contents(__DIR__ . '/explore/partials/cta-band-' . $language . '.html');
    return $result . "\n" . $band;
}

/** Restore the homepage clip when WordPress has removed its source element. */
function speego_restore_home_hero_video($markup)
{
    if (!is_string($markup) || strpos($markup, 'speego-hero-bg-video') === false) {
        return $markup;
    }

    $source = '<source src="' . esc_url(untrailingslashit(get_template_directory_uri())
        . '/explore/assets/hero-bg-video.mp4') . '" type="video/mp4">';

    return preg_replace_callback(
        '~(<video\b[^>]*\bspeego-hero-bg-video\b[^>]*>)(.*?)(</video>)~is',
        function ($match) use ($source) {
            $remaining = preg_replace('~<source\b[^>]*>(?:\s*</source>)?~is', '', $match[2]);
            return $match[1] . $source . $remaining . $match[3];
        },
        $markup,
        1
    );
}
