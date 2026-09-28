const fs = require('fs');
const path = require('path');

const fpPath = path.join(__dirname, '..', 'wordpress-theme', 'speego-logistics', 'front-page.php');
let fpCode = fs.readFileSync(fpPath, 'utf8');

const aboutHandler = `
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

    $entry = preg_replace('/<title\b[^>]*>.*?<\/title>/is', '<title>' . esc_html($seoTitle) . '</title><meta name="description" content="' . esc_attr($seoDesc) . '">', $entry, 1);
    $entry = preg_replace('/<html\b([^>]*\blang=")[^"]*("[^>]*)>/i', '<html$1' . esc_attr($currentMeta['schemaLanguage']) . '$2>', $entry, 1);

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
        $aboutHtml = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $aboutHtml);
    } elseif (is_readable($currentMeta['file'])) {
        $aboutHtml = trim(file_get_contents($currentMeta['file']));
    }

    if ($aboutHtml !== '') {
        $entry = preg_replace_callback(
            '/(<main\b[^>]*\bid="app-main"[^>]*>).*?(<\/main>)/is',
            function ($matches) use ($aboutHtml, $routeHash) {
                $mainOpen = preg_replace('/>$/', ' data-speego-prerendered-route="' . esc_attr($routeHash) . '">', $matches[1], 1);
                return $mainOpen . $aboutHtml . $matches[2];
            },
            $entry,
            1
        );
    }
}
`;

if (!fpCode.includes('// Handle About Us Server-Side Rendering & SEO Metadata')) {
  fpCode = fpCode.replace('require_once __DIR__ . \'/sourcing-seo.php\';', aboutHandler + '\nrequire_once __DIR__ . \'/sourcing-seo.php\';');
}

fs.writeFileSync(fpPath, fpCode, 'utf8');
console.log('Successfully updated wordpress-theme/speego-logistics/front-page.php!');
