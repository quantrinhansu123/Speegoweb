<?php
$requestPath = trim(rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), '/');
$homePath = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
    $requestPath = substr($requestPath, strlen($homePath) + 1);
} elseif ($homePath !== '' && $requestPath === $homePath) {
    $requestPath = '';
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
    $routeHash = speego_route_hash_for_path($requestPath);
}
if (!$queriedId && $routeHash && function_exists('speego_get_page_by_route')) {
    $matchedPost = speego_get_page_by_route($routeHash);
    if ($matchedPost) {
        $queriedId = $matchedPost->ID;
    }
}
require_once __DIR__ . '/sourcing-reference.php';
$referenceSourcing = speego_render_reference_sourcing($routeHash, $queriedId);
if ($referenceSourcing !== false) {
    echo $referenceSourcing;
    return;
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
    $robots = get_option('blog_public') ? 'index,follow,max-image-preview:large' : 'noindex,follow';
    $homepagePaths = [
        'vi' => speego_public_route_path('#/home'),
        'en' => speego_public_route_path('#/en/home'),
        'es' => speego_public_route_path('#/es/inicio'),
    ];
    $canonicalUrl = home_url($homepagePaths[$seoLanguage]);
    $alternateUrls = [
        'vi' => home_url($homepagePaths['vi']),
        'en' => home_url($homepagePaths['en']),
        'es' => home_url($homepagePaths['es']),
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
    $alternateHead .= sprintf('<link rel="alternate" hreflang="x-default" href="%s">', esc_url($alternateUrls['en']));
    $alternateLocales = array_values(array_diff(array_column($seoByLanguage, 'locale'), [$seo['locale']]));
    $alternateLocaleHead = '';
    foreach ($alternateLocales as $alternateLocale) {
        $alternateLocaleHead .= sprintf('<meta property="og:locale:alternate" content="%s">', esc_attr($alternateLocale));
    }

    $seoHead = sprintf(
        '<meta name="description" content="%1$s">' .
        '<meta name="robots" content="' . esc_attr($robots) . '">' .
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
        $homepageHtml = speego_render_editable_content($homepagePosts[0]);
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
        $homepageHtml = speego_restore_home_consultation($homepageHtml);

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

        // Seeded WordPress page content can retain demo links from older
        // versions. Bind the homepage CTAs to real public routes on output.
        $contactRoute = ['vi' => '#/contact', 'en' => '#/en/contact', 'es' => '#/es/contact'][$seoLanguage];
        $contactPath = speego_public_route_path($contactRoute);
        $homepageHtml = str_replace(
            ['href="contact/index.html"', 'href="' . $contactPath . '"'],
            [
                'href="' . esc_url(home_url($contactPath)) . '"',
                'href="' . esc_url(home_url($contactPath)) . '"',
            ],
            $homepageHtml
        );

        $homepageHtml = speego_restore_home_hero_video(speego_prepare_managed_markup($homepageHtml));

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
    $aboutPaths = [
        'vi' => speego_public_route_path('#/about-us'),
        'en' => speego_public_route_path('#/en/about-us'),
        'es' => speego_public_route_path('#/es/about-us'),
    ];
    $canonicalUrl = home_url($aboutPaths[$langKey]);
    $robots = get_option('blog_public') ? 'index,follow,max-image-preview:large' : 'noindex,follow';
    $alternateHead = '';
    foreach ($aboutPaths as $language => $path) {
        $alternateHead .= '<link rel="alternate" hreflang="' . esc_attr($language) . '" href="' . esc_url(home_url($path)) . '">';
    }
    $alternateHead .= '<link rel="alternate" hreflang="x-default" href="' . esc_url(home_url($aboutPaths['en'])) . '">';

    $aboutSeoHead = '<meta name="description" content="' . esc_attr($seoDesc) . '">'
        . '<meta name="robots" content="' . esc_attr($robots) . '">'
        . '<link rel="canonical" href="' . esc_url($canonicalUrl) . '">'
        . $alternateHead
        . '<meta property="og:type" content="website">'
        . '<meta property="og:locale" content="' . esc_attr($currentMeta['locale']) . '">'
        . '<meta property="og:title" content="' . esc_attr($seoTitle) . '">'
        . '<meta property="og:description" content="' . esc_attr($seoDesc) . '">'
        . '<meta property="og:url" content="' . esc_url($canonicalUrl) . '">';
    $entry = preg_replace('/<title\\b[^>]*>.*?<\\/title>/is', '<title>' . esc_html($seoTitle) . '</title>' . $aboutSeoHead, $entry, 1);
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
        $aboutHtml = speego_render_editable_content($aboutPosts[0]);
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

// Prerender any other registered SpeeGo page (Fulfillment, Shipping Routes, Import-Export, Knowledge)
if (strpos($entry, 'data-speego-prerendered-route=') === false) {
    $defs = function_exists('speego_get_pages_definitions') ? speego_get_pages_definitions() : [];
    if (isset($defs[$routeHash])) {
        $pageDef = $defs[$routeHash];
        $pagePosts = get_posts([
            'post_type' => 'page',
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $routeHash,
        ]);
        $pageHtml = '';
        if ($pagePosts && !empty($pagePosts[0]->post_content)) {
            $pageHtml = speego_render_editable_content($pagePosts[0]);
        } else {
            $pageFile = __DIR__ . '/explore/' . $pageDef['file'];
            if (is_readable($pageFile)) {
                $pageHtml = trim(file_get_contents($pageFile));
            }
        }
        if ($pageHtml !== '') {
            if (isset($pageDef['title'])) {
                $entry = preg_replace('/<title\\b[^>]*>.*?<\\/title>/is', '<title>' . esc_html($pageDef['title']) . '</title>', $entry, 1);
            }
            $entry = preg_replace_callback(
                '/(<main\\b[^>]*\\bid="app-main"[^>]*>).*?(<\\/main>)/is',
                function ($matches) use ($pageHtml, $routeHash) {
                    $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
                    return $mainOpen . $pageHtml . $matches[2];
                },
                $entry,
                1
            );
        }
    }
}

require_once __DIR__ . '/sourcing-seo.php';
$entry = speego_render_sourcing_seo($entry, $routeHash, $queriedId);

require_once __DIR__ . '/page-seo.php';
$entry = speego_render_generic_page_seo($entry, $routeHash, $queriedId);

// The page body is already in the first response. Render the editable header
// there too, so it does not appear only after the REST partials have loaded.
$headerLanguage = strpos($routeHash, '#/en/') === 0 ? 'en'
    : (strpos($routeHash, '#/es/') === 0 ? 'es' : 'vi');
$entry = str_replace('<html lang="vi">', '<html lang="' . $headerLanguage . '">', $entry);
if (in_array($routeHash, ['#/home', '#/en/home', '#/es/inicio'], true)) {
    $entry = str_replace('<body>', '<body class="home">', $entry);
}
$headerHtml = speego_shared_partial_html('header', $headerLanguage);
if ($headerHtml !== '') {
    $entry = str_replace(
        '<div id="header-container"></div>',
        '<div id="header-container" data-speego-prerendered-header="1">' . $headerHtml . '</div>',
        $entry
    );
}
$footerHtml = speego_shared_partial_html('footer', $headerLanguage);
if ($footerHtml !== '') {
    $entry = str_replace(
        '<div id="footer-container"></div>',
        '<div id="footer-container" data-speego-prerendered-footer="1">' . $footerHtml . '</div>',
        $entry
    );
}

$publicRoutes = speego_public_route_urls();
$publicRoutesJson = wp_json_encode($publicRoutes, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);

$navigationScript = esc_url(get_template_directory_uri() . '/explore/js/wp-navigation.js?ver=1.2.25');
$bridge = '<base href="' . $base . '"><script>window.SPEEGO_WP_HOME=' . $home
    . ';window.SPEEGO_PUBLIC_ROUTES=' . $publicRoutesJson
    . ';window.speegoInitialRoute=' . $route . ';</script>'
    . '<script src="' . $navigationScript . '"></script>';
$entry = preg_replace('/<head>/i', '<head>' . $bridge, $entry, 1);

// The explore shell is a static HTML document, so it has no native
// wp_head/wp_footer calls. Inject the WordPress hooks explicitly so Elementor
// can enqueue its CSS, JavaScript, and frontend settings on editable pages.
ob_start();
wp_head();
$wpHead = ob_get_clean();
ob_start();
wp_body_open();
$wpBodyOpen = ob_get_clean();
ob_start();
wp_footer();
$wpFooter = ob_get_clean();

$entry = str_replace('</head>', $wpHead . '</head>', $entry);
$entry = preg_replace_callback(
    '/(<body\b[^>]*>)/i',
    function ($matches) use ($wpBodyOpen) {
        return $matches[1] . $wpBodyOpen;
    },
    $entry,
    1
);
$entry = str_replace('</body>', $wpFooter . '</body>', $entry);
echo $entry;
