<?php
/**
 * Elementor-compatible page renderer.
 *
 * SpeeGo's normal pages are still rendered by front-page.php, but Elementor
 * needs a real the_content() call in the current page template.
 */
$speego_elementor_page = false;
$speego_page_id = get_queried_object_id();

if (function_exists('speego_is_elementor_document')) {
    $speego_elementor_page = speego_is_elementor_document($speego_page_id);
}

if ($speego_elementor_page) {
    if (have_posts()) {
        the_post();
    }

    $speego_route = $GLOBALS['speego_active_route'] ?? (string) get_post_meta(get_the_ID(), '_speego_route_hash', true);
    $speego_definitions = function_exists('speego_get_pages_definitions') ? speego_get_pages_definitions() : [];
    $speego_language = $speego_definitions[$speego_route]['lang'] ?? (
        function_exists('speego_post_language') ? speego_post_language(get_the_ID()) : 'vi'
    );
    $speego_header = function_exists('speego_shared_partial_html')
        ? speego_shared_partial_html('header', $speego_language)
        : '';
    if ($speego_header && function_exists('speego_localize_post_header')) {
        $speego_header = speego_localize_post_header($speego_header, $speego_language);
    }
    $speego_footer = function_exists('speego_shared_partial_html')
        ? speego_shared_partial_html('footer', $speego_language)
        : '';
    $speego_hub_breadcrumbs = [
        '#/knowledge' => [
            'aria' => 'Đường dẫn trang',
            'items' => [
                ['label' => 'Trang chủ', 'href' => home_url('/vi/')],
                ['label' => 'Kho kiến thức'],
            ],
        ],
        '#/en/knowledge' => [
            'aria' => 'Breadcrumb',
            'items' => [
                ['label' => 'Home', 'href' => home_url('/en/')],
                ['label' => 'Knowledge Hub'],
            ],
        ],
        '#/es/knowledge' => [
            'aria' => 'Miga de pan',
            'items' => [
                ['label' => 'Inicio', 'href' => home_url('/es/')],
                ['label' => 'Centro de Conocimiento'],
            ],
        ],
    ];
    $speego_breadcrumb = $speego_hub_breadcrumbs[$speego_route] ?? null;
    $speego_breadcrumb_html = '';
    if ($speego_breadcrumb) {
        $speego_crumbs = '';
        $speego_last = count($speego_breadcrumb['items']) - 1;
        foreach ($speego_breadcrumb['items'] as $speego_index => $speego_item) {
            if ($speego_index === $speego_last) {
                $speego_crumbs .= '<span class="breadcrumb-current">' . esc_html($speego_item['label']) . '</span>';
                continue;
            }
            $speego_crumbs .= '<a href="' . esc_url($speego_item['href']) . '" class="breadcrumb-link">' . esc_html($speego_item['label']) . '</a>';
            $speego_crumbs .= '<span class="breadcrumb-sep">/</span>';
        }
        $speego_breadcrumb_html = '<nav class="breadcrumb-section" aria-label="' . esc_attr($speego_breadcrumb['aria']) . '"><div class="container"><div class="breadcrumb-list">' . $speego_crumbs . '</div></div></nav>';
    }
    $speego_main_nav = $speego_breadcrumb ? ' data-nav="knowledge"' : '';
    ?>
    <!doctype html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class('speego-elementor-page'); ?>>
    <?php wp_body_open(); ?>
    <div id="header-container"><?php echo $speego_header; ?></div>
    <main id="app-main" class="speego-elementor-content"<?php echo $speego_main_nav; ?>>
        <?php echo $speego_breadcrumb_html; ?>
        <?php the_content(); ?>
    </main>
    <div id="footer-container"><?php echo $speego_footer; ?></div>
    <?php wp_footer(); ?>
    </body>
    </html>
    <?php
    return;
}

require __DIR__ . '/front-page.php';