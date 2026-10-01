<?php
$key = speego_news_reference_key();
$file = __DIR__ . '/news-reference/' . $key . '.html';
if ($key === '' || !is_readable($file)) {
    status_header(404);
    return;
}
status_header(200);
$theme = untrailingslashit(get_template_directory_uri());
$html = strtr(file_get_contents($file), [
    '{{HOME}}' => esc_url(untrailingslashit(home_url('/'))),
    '{{ASSETS}}' => esc_url($theme . '/news-reference/assets'),
    '{{THEME}}' => esc_url($theme),
]);
$canonical = home_url($key === 'news' ? '/news/' : '/news/' . $key . '/');
$robots = get_option('blog_public') ? 'index,follow' : 'noindex,follow';
ob_start();
wp_head();
$head = ob_get_clean();
$head .= '<link rel="canonical" href="' . esc_url($canonical) . '">'
    . '<meta name="robots" content="' . esc_attr($robots) . '">';
ob_start();
wp_body_open();
$body = ob_get_clean();
ob_start();
wp_footer();
$footer = ob_get_clean();
$html = str_replace('</head>', $head . '</head>', $html);
$html = preg_replace_callback('/<body\b[^>]*>/i', function ($match) use ($body) {
    return $match[0] . $body;
}, $html, 1);
echo str_replace('</body>', $footer . '</body>', $html);
