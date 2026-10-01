<?php
/** The homepage news CTAs open the same archive as the Vercel reference. */
function speego_news_reference_key()
{
    if (is_admin() || isset($_GET['elementor-preview'])) return '';
    $path = (string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $base = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($base !== '' && strpos($path, $base . '/') === 0) $path = substr($path, strlen($base));
    $path = trim($path, '/');
    if (in_array($path, ['news', 'news/index.html'], true)) return 'news';
    $articles = [
        'architectural-heritage',
        'iconic-skyscrapers-redefining-city-skylines-across-the-globe',
        'smart-cities-of-tomorrow',
        'architectural-marvels',
        'exploring-the-evolution-of-modern-architecture',
        'the-evolution-of-modern-architecture',
    ];
    foreach ($articles as $article) {
        if ($path === 'news/' . $article || $path === 'news/' . $article . '/index.html') return $article;
    }
    return '';
}

add_filter('pre_handle_404', function ($preempt, $query) {
    if (!speego_news_reference_key()) return $preempt;
    $query->is_404 = false;
    status_header(200);
    return true;
}, 5, 2);

add_filter('redirect_canonical', function ($url) {
    return speego_news_reference_key() ? false : $url;
});

add_filter('template_include', function ($template) {
    return speego_news_reference_key() ? __DIR__ . '/news.php' : $template;
}, 20);
