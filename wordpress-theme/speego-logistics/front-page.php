<?php
$requestPath = trim(rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), '/');
$homePath = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
    $requestPath = substr($requestPath, strlen($homePath) + 1);
}
if ($requestPath === 'vi/tim-nguon-hang') {
    $siteBase = wp_json_encode(trailingslashit(home_url('/')), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    status_header(200);
    echo '<!doctype html><html><head><meta charset="utf-8"><script>';
    echo 'var route=location.hash;var lang=route.indexOf("#/en/sourcing")===0?"en":route.indexOf("#/es/sourcing")===0?"es":"vi";';
    echo 'location.replace(' . $siteBase . '+lang+"/sourcing/");';
    echo '</script></head><body></body></html>';
    return;
}
$entry = file_get_contents(__DIR__ . '/explore/index.html');
if ($entry === false) {
    status_header(500);
    exit('SpeeGo app entry point is missing.');
}

status_header(200);

$base = esc_url(trailingslashit(get_template_directory_uri() . '/explore'));
$home = wp_json_encode(home_url('/'), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);

$queriedId = get_queried_object_id();
$routeHash = get_post_meta($queriedId, '_speego_route_hash', true);
if (!$routeHash && function_exists('speego_route_hash_for_path')) {
    $requestPath = (string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $routeHash = speego_route_hash_for_path($requestPath);
}
require_once __DIR__ . '/sourcing-reference.php';
$referenceSourcing = speego_render_reference_sourcing($routeHash, $queriedId);
if ($referenceSourcing !== false) {
    echo $referenceSourcing;
    return;
}
$homepageLanguages = [
    'vi' => '#/home',
    'en' => '#/en/home',
    'es' => '#/es/inicio',
];
$requestedLanguage = isset($_GET['lang']) && is_string($_GET['lang'])
    ? sanitize_key(wp_unslash($_GET['lang']))
    : '';

if (is_front_page() && isset($homepageLanguages[$requestedLanguage])) {
    $routeHash = $homepageLanguages[$requestedLanguage];
}

if (!$routeHash) {
    if (is_front_page() || is_home()) {
        $routeHash = '#/home';
    }
}
$route = wp_json_encode($routeHash ?: '#/home', JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);

// Provide unique, language-matched search metadata in the original response.
$seoHead = '';
if (in_array($routeHash, ['#/home', '#/en/home', '#/es/inicio'], true)) {
    $seoByLanguage = [
        'vi' => [
            'title' => 'SpeeGo Logistics | Tìm nguồn hàng & logistics quốc tế',
            'description' => 'Tìm nguồn hàng tại Việt Nam và Trung Quốc, kiểm định chất lượng tại xưởng, vận chuyển quốc tế và fulfillment tại Mỹ, Canada, Úc cùng SpeeGo Logistics.',
            'locale' => 'vi_VN',
            'schemaLanguage' => 'vi-VN',
        ],
        'en' => [
            'title' => 'SpeeGo Logistics | Global Sourcing & Logistics',
            'description' => 'Source products in Vietnam and China, inspect quality at the factory, and ship to the US, Canada, and Australia with SpeeGo Logistics.',
            'locale' => 'en_US',
            'schemaLanguage' => 'en',
        ],
        'es' => [
            'title' => 'SpeeGo Logistics | Abastecimiento y logística global',
            'description' => 'Encuentra proveedores en Vietnam y China, inspecciona la calidad en fábrica y envía a EE. UU., Canadá y Australia con SpeeGo Logistics.',
            'locale' => 'es_ES',
            'schemaLanguage' => 'es',
        ],
    ];
    $languageByRoute = [
        '#/home' => 'vi',
        '#/en/home' => 'en',
        '#/es/inicio' => 'es',
    ];
    $seoLanguage = $languageByRoute[$routeHash];
    $seo = $seoByLanguage[$seoLanguage];
    $seoTitle = $seo['title'];
    $seoDescription = $seo['description'];
    $canonicalUrl = $seoLanguage === 'vi'
        ? home_url('/')
        : add_query_arg('lang', $seoLanguage, home_url('/'));
    $alternateUrls = [
        'vi' => home_url('/'),
        'en' => add_query_arg('lang', 'en', home_url('/')),
        'es' => add_query_arg('lang', 'es', home_url('/')),
    ];
    $logoUrl = get_template_directory_uri() . '/explore/assets/speego-logo-dark.png';
    $shareImageUrl = get_template_directory_uri() . '/explore/assets/anh-nen.png';
    $websiteId = $canonicalUrl . '#website';
    $organizationId = trailingslashit(home_url('/')) . '#organization';

    $structuredData = [
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'WebSite',
                '@id' => $websiteId,
                'url' => $canonicalUrl,
                'name' => 'SpeeGo Logistics',
                'alternateName' => 'SpeeGo',
                'inLanguage' => $seo['schemaLanguage'],
                'publisher' => ['@id' => $organizationId],
            ],
            [
                '@type' => 'WebPage',
                '@id' => $canonicalUrl . '#webpage',
                'url' => $canonicalUrl,
                'name' => $seoTitle,
                'description' => $seoDescription,
                'inLanguage' => $seo['schemaLanguage'],
                'isPartOf' => ['@id' => $websiteId],
                'primaryImageOfPage' => [
                    '@type' => 'ImageObject',
                    'url' => $shareImageUrl,
                ],
                'about' => ['@id' => $organizationId],
            ],
            [
                '@type' => 'Organization',
                '@id' => $organizationId,
                'name' => 'SpeeGo Logistics',
                'url' => $canonicalUrl,
                'logo' => $logoUrl,
                'email' => 'info@speegologistic.com',
                'telephone' => '+84-906-828-898',
                'areaServed' => ['Vietnam', 'China', 'United States', 'Canada', 'Australia'],
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'contactType' => 'sales',
                    'telephone' => '+84-906-828-898',
                    'email' => 'info@speegologistic.com',
                    'availableLanguage' => ['Vietnamese', 'English', 'Spanish'],
                ],
            ],
        ],
    ];

    $alternateHead = '';
    foreach ($alternateUrls as $language => $alternateUrl) {
        $alternateHead .= sprintf(
            '<link rel="alternate" hreflang="%1$s" href="%2$s">',
            esc_attr($language),
            esc_url($alternateUrl)
        );
    }
    $alternateHead .= sprintf('<link rel="alternate" hreflang="x-default" href="%s">', esc_url($alternateUrls['vi']));
    $alternateLocales = array_values(array_diff(array_column($seoByLanguage, 'locale'), [$seo['locale']]));
    $alternateLocaleHead = '';
    foreach ($alternateLocales as $alternateLocale) {
        $alternateLocaleHead .= sprintf('<meta property="og:locale:alternate" content="%s">', esc_attr($alternateLocale));
    }

    $seoHead = sprintf(
        '<meta name="description" content="%1$s">' .
        '<meta name="robots" content="index,follow,max-image-preview:large">' .
        '<link rel="canonical" href="%2$s">' .
        '%6$s' .
        '<meta property="og:type" content="website">' .
        '<meta property="og:locale" content="%7$s">' .
        '%8$s' .
        '<meta property="og:site_name" content="SpeeGo Logistics">' .
        '<meta property="og:title" content="%3$s">' .
        '<meta property="og:description" content="%1$s">' .
        '<meta property="og:url" content="%2$s">' .
        '<meta property="og:image" content="%4$s">' .
        '<meta name="twitter:card" content="summary_large_image">' .
        '<meta name="twitter:title" content="%3$s">' .
        '<meta name="twitter:description" content="%1$s">' .
        '<meta name="twitter:image" content="%4$s">' .
        '<script type="application/ld+json">%5$s</script>',
        esc_attr($seoDescription),
        esc_url($canonicalUrl),
        esc_attr($seoTitle),
        esc_url($shareImageUrl),
        wp_json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT),
        $alternateHead,
        esc_attr($seo['locale']),
        $alternateLocaleHead
    );

    $entry = preg_replace(
        '/<title\b[^>]*>.*?<\/title>/is',
        '<title>' . esc_html($seoTitle) . '</title>' . $seoHead,
        $entry,
        1
    );
    $entry = preg_replace('/<html\b([^>]*\blang=")[^"]*("[^>]*)>/i', '<html$1' . esc_attr($seo['schemaLanguage']) . '$2>', $entry, 1);

    // Put the editable homepage content into the first HTML response so
    // crawlers and link previews can read it without waiting for the SPA.
    $homepagePosts = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => $routeHash,
    ]);
    $homepageHtml = '';
    if ($homepagePosts) {
        $homepageHtml = trim($homepagePosts[0]->post_content);
        $homepageHtml = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $homepageHtml);
    } else {
        $homeFallbackMap = [
            '#/home' => __DIR__ . '/explore/pages/home/vi-home.html',
            '#/en/home' => __DIR__ . '/explore/pages/home/en-home.html',
            '#/es/inicio' => __DIR__ . '/explore/pages/home/es-home.html',
        ];
        if (isset($homeFallbackMap[$routeHash]) && is_readable($homeFallbackMap[$routeHash])) {
            $homepageHtml = trim(file_get_contents($homeFallbackMap[$routeHash]));
        }
    }

    if ($homepageHtml !== '') {

        $dictionaryPath = __DIR__ . '/explore/js/speego-page-i18n.js';
        $dictionarySource = is_readable($dictionaryPath) ? file_get_contents($dictionaryPath) : false;
        $dictionaryPrefix = 'window.SPEEGO_I18N_DATA = ';
        if ($dictionarySource !== false && strpos($dictionarySource, $dictionaryPrefix) === 0) {
            $dictionaryJson = rtrim(substr($dictionarySource, strlen($dictionaryPrefix)), " \t\n\r\0\x0B;");
            $allTranslations = json_decode($dictionaryJson, true);
            $pageTranslations = is_array($allTranslations) && isset($allTranslations[$seoLanguage])
                ? $allTranslations[$seoLanguage]
                : [];

            if (class_exists('DOMDocument') && $pageTranslations) {
                $document = new DOMDocument('1.0', 'UTF-8');
                $previousLibxmlSetting = libxml_use_internal_errors(true);
                $document->loadHTML('<?xml encoding="UTF-8">' . $homepageHtml, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
                $xpath = new DOMXPath($document);

                // The final two homepage news cards have translations in the
                // shared dictionary but were missing data-i18n attributes.
                $newsCards = $xpath->query('//*[@id="news-speego"]//*[contains(concat(" ", normalize-space(@class), " "), " speego-service-card ")]');
                foreach ([2 => 3, 3 => 4] as $cardIndex => $translationIndex) {
                    $card = $newsCards ? $newsCards->item($cardIndex) : null;
                    if (!$card) {
                        continue;
                    }

                    $newsSelectors = [
                        './/*[contains(concat(" ", normalize-space(@class), " "), " speego-service-title ")]' => 'news' . $translationIndex . '_title',
                        './/*[contains(concat(" ", normalize-space(@class), " "), " speego-service-text ")]' => 'news' . $translationIndex . '_desc',
                        './/*[contains(concat(" ", normalize-space(@class), " "), " speego-service-body ")]/span' => 'news' . $translationIndex . '_cat',
                        './/*[contains(concat(" ", normalize-space(@class), " "), " speego-service-link ")]/span' => 'news_read',
                    ];
                    foreach ($newsSelectors as $selector => $translationKey) {
                        $localizedNode = $xpath->query($selector, $card)->item(0);
                        if ($localizedNode) {
                            $localizedNode->setAttribute('data-i18n', $translationKey);
                        }
                    }
                }

                foreach ($xpath->query('//*[@data-i18n]') as $element) {
                    $key = $element->getAttribute('data-i18n');
                    if (!isset($pageTranslations[$key]) || !is_string($pageTranslations[$key])) {
                        continue;
                    }

                    $translation = $pageTranslations[$key];
                    while ($element->firstChild) {
                        $element->removeChild($element->firstChild);
                    }

                    if (strpos($translation, '<') !== false) {
                        $fragmentDocument = new DOMDocument('1.0', 'UTF-8');
                        $fragmentDocument->loadHTML('<?xml encoding="UTF-8"><div>' . $translation . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
                        $fragmentRoot = $fragmentDocument->getElementsByTagName('div')->item(0);
                        if ($fragmentRoot) {
                            foreach (iterator_to_array($fragmentRoot->childNodes) as $child) {
                                $element->appendChild($document->importNode($child, true));
                            }
                        }
                    } else {
                        $element->appendChild($document->createTextNode($translation));
                    }
                }

                foreach ($xpath->query('//*[@data-i18n-ph]') as $element) {
                    $key = $element->getAttribute('data-i18n-ph');
                    if (isset($pageTranslations[$key]) && is_string($pageTranslations[$key])) {
                        $element->setAttribute('placeholder', $pageTranslations[$key]);
                    }
                }

                $body = $document->getElementsByTagName('body')->item(0);
                if ($body) {
                    $localizedHtml = '';
                    foreach ($body->childNodes as $child) {
                        $localizedHtml .= $document->saveHTML($child);
                    }
                } else {
                    $localizedHtml = $document->saveHTML();
                    $localizedHtml = preg_replace('/^.*?<body[^>]*>|<\/body>.*$/is', '', $localizedHtml);
                }
                $localizedHtml = preg_replace('/<\?xml[^>]*>\s*/i', '', $localizedHtml);
                $homepageHtml = $localizedHtml;
                libxml_clear_errors();
                libxml_use_internal_errors($previousLibxmlSetting);
            }
        }

        $entry = preg_replace_callback(
            '/(<main\b[^>]*\bid="app-main"[^>]*>).*?(<\/main>)/is',
            function ($matches) use ($homepageHtml, $routeHash) {
                $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
                return $mainOpen . $homepageHtml . $matches[2];
            },
            $entry,
            1
        );
    }
}


// Handle About Us Server-Side Rendering & SEO Metadata
if (in_array($routeHash, ['#/about-us', '#/en/about-us', '#/es/about-us', '#/about', '#/en/about', '#/es/about'], true)) {
    $aboutMeta = [
        'vi' => [
            'title' => 'Về SpeeGo Logistics | Đối tác cung ứng & logistics toàn cầu',
            'description' => 'Tìm hiểu vì sao doanh nghiệp tin tưởng SpeeGo cho sourcing, logistics quốc tế, fulfillment và xuất nhập khẩu.',
            'locale' => 'vi_VN',
            'schemaLanguage' => 'vi-VN',
            'file' => __DIR__ . '/explore/pages/about/vi-about.html',
        ],
        'en' => [
            'title' => 'About SpeeGo Logistics | Global Sourcing & Supply Chain Partner',
            'description' => 'Discover why leading businesses trust SpeeGo for global sourcing, factory QC, international freight and fulfillment.',
            'locale' => 'en_US',
            'schemaLanguage' => 'en',
            'file' => __DIR__ . '/explore/pages/about/en-about.html',
        ],
        'es' => [
            'title' => 'Sobre SpeeGo Logistics | Socio de abastecimiento y logística global',
            'description' => 'Descubra por qué las empresas confían en SpeeGo para abastecimiento global, control de calidad, logística y fulfillment.',
            'locale' => 'es_ES',
            'schemaLanguage' => 'es',
            'file' => __DIR__ . '/explore/pages/about/es-about.html',
        ],
    ];

    $langKey = strpos($routeHash, '/en/') !== false ? 'en' : (strpos($routeHash, '/es/') !== false ? 'es' : 'vi');
    $currentMeta = $aboutMeta[$langKey];
    $seoTitle = $currentMeta['title'];
    $seoDesc = $currentMeta['description'];

    $entry = preg_replace('/<title\\b[^>]*>.*?<\\/title>/is', '<title>' . esc_html($seoTitle) . '</title><meta name="description" content="' . esc_attr($seoDesc) . '">', $entry, 1);
    $entry = preg_replace('/<html\\b([^>]*\\blang=")[^"]*("[^>]*)>/i', '<html$1' . esc_attr($currentMeta['schemaLanguage']) . '$2>', $entry, 1);

    // Fetch editable content from WordPress post or fallback to static HTML file
    $aboutPosts = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'numberposts' => 1,
        'meta_key' => '_speego_route_hash',
        'meta_value' => $routeHash,
    ]);

    $aboutHtml = '';
    if ($aboutPosts && !empty($aboutPosts[0]->post_content)) {
        $aboutHtml = trim($aboutPosts[0]->post_content);
        $aboutHtml = preg_replace('#<!--s*/?wp:htmls*-->#i', '', $aboutHtml);
    } elseif (is_readable($currentMeta['file'])) {
        $aboutHtml = trim(file_get_contents($currentMeta['file']));
    }

    if ($aboutHtml !== '') {
        $entry = preg_replace_callback(
            '/(<main\\b[^>]*\\bid="app-main"[^>]*>).*?(<\\/main>)/is',
            function ($matches) use ($aboutHtml, $routeHash) {
                $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
                return $mainOpen . $aboutHtml . $matches[2];
            },
            $entry,
            1
        );
    }
}

require_once __DIR__ . '/sourcing-seo.php';
$entry = speego_render_sourcing_seo($entry, $routeHash, $queriedId);

$bridge = '<base href="' . $base . '"><script>window.SPEEGO_WP_HOME=' . $home . ';var speegoInitialRoute=' . $route . ';if(speegoInitialRoute&&(!window.location.hash||window.location.hash==="#"||window.location.hash==="#/")&&window.location.pathname==="/"&&/^#\\/(?:home|en\\/home|es\\/inicio)$/.test(speegoInitialRoute)){window.location.hash="#home";}document.addEventListener("click",function(event){const link=event.target.closest&&event.target.closest("a[href]");if(!link)return;const href=link.getAttribute("href");if(!href||href.startsWith("//")||href.startsWith("http://")||href.startsWith("https://")||href.startsWith("tel:")||href.startsWith("mailto:"))return;if(href==="/"||href==="/index.html"){event.preventDefault();window.location.hash="#home";return;}if(href.startsWith("/#")){event.preventDefault();const id=href.slice(2);const targetHome="#home";const el=document.getElementById(id);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});}else{try{sessionStorage.setItem("speegoScrollTo",id);}catch(_){}window.location.hash=targetHome;}return;}if(href.startsWith("#/")){event.preventDefault();if(window.location.hash!==href){window.location.hash=href;}return;}},true);</script>';
$entry = preg_replace('/<head>/i', '<head>' . $bridge, $entry, 1);
echo $entry;
