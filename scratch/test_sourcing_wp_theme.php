<?php
// Standalone smoke test for the Sourcing WordPress theme path and HTML output.
function add_action() {}
function add_filter() {}
function remove_filter() {}
function wp_parse_url($url, $component) { return parse_url($url, $component); }
function untrailingslashit($value) { return rtrim($value, '/'); }
function trailingslashit($value) { return rtrim($value, '/') . '/'; }
function home_url($path = '/') { return 'http://localhost/wordpress_demo' . $path; }
function get_template_directory() { return dirname(__DIR__); }
function get_template_directory_uri() { return 'http://localhost/wordpress_demo/wp-content/themes/speego-logistics'; }
function get_option($key) { return $key === 'blog_public' ? 0 : null; }
function esc_attr($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function esc_html($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function esc_textarea($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function esc_url($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function admin_url($path = '') { return 'http://localhost/wordpress_demo/wp-admin/' . $path; }
function current_user_can($capability) { return true; }
function wp_nonce_field($action, $name) { echo '<input type="hidden" name="' . $name . '">'; }
function submit_button($text, $type = 'primary', $name = 'submit', $wrap = true) { echo '<button type="submit">' . $text . '</button>'; }
function wp_json_encode($value, $flags = 0) { return json_encode($value, $flags); }
function status_header($status) {}
$GLOBALS['mockRoutes'] = [10 => '#/sourcing', 28 => '#/en/sourcing', 48 => '#/es/sourcing'];
$GLOBALS['createdPages'] = [];
function get_post_meta($id, $key, $single = false)
{
    return $key === '_speego_route_hash' ? ($GLOBALS['mockRoutes'][$id] ?? '') : '';
}
function get_posts($args)
{
    foreach ($GLOBALS['mockRoutes'] as $id => $route) {
        if ($args['meta_value'] === $route) {
            return [(object) ['ID' => $id]];
        }
    }
    return [];
}
function wp_insert_post($args, $returnError = false)
{
    $id = 100 + count($GLOBALS['createdPages']);
    $GLOBALS['createdPages'][$id] = $args;
    return $id;
}
function update_post_meta($id, $key, $value)
{
    if ($key === '_speego_route_hash') $GLOBALS['mockRoutes'][$id] = $value;
}
function is_wp_error($value) { return false; }
function get_post($id)
{
    $files = [
        10 => 'sourcing.html',
        28 => 'en-sourcing.html',
        48 => 'es-sourcing.html',
    ];
    if (!isset($files[$id])) return null;
    return (object) [
        'ID' => $id,
        'post_status' => 'publish',
        'post_content' => file_get_contents(__DIR__ . '/../explore/pages/sourcing/' . $files[$id]),
    ];
}

require __DIR__ . '/../wordpress-theme/speego-logistics/functions.php';
require __DIR__ . '/../wordpress-theme/speego-logistics/sourcing-seo.php';

$cases = [
    ['/wordpress_demo/vi/sourcing/', 10, '#/sourcing', 'vi-VN'],
    ['/wordpress_demo/en/sourcing/', 28, '#/en/sourcing', 'en'],
    ['/wordpress_demo/es/sourcing/', 48, '#/es/sourcing', 'es'],
    ['/wordpress_demo/sourcing/', 10, '#/sourcing', 'vi-VN'],
];
$shell = '<html lang="vi"><head><title>Generic</title></head><body><main id="app-main"></main></body></html>';
foreach ($cases as [$path, $id, $route, $language]) {
    $_SERVER['REQUEST_URI'] = $path;
    $wp = (object) ['query_vars' => []];
    speego_resolve_route_page($wp);
    if (($wp->query_vars['page_id'] ?? null) !== $id) {
        throw new RuntimeException("Wrong page for $path");
    }
    $html = speego_render_sourcing_seo($shell, $route, $id);
    if (strpos($html, 'lang="' . $language . '"') === false
        || strpos($html, 'data-speego-prerendered-route="' . $route . '"') === false
        || strpos($html, 'hreflang="' . substr($language, 0, 2) . '"') === false
        || strpos($html, 'name="robots" content="noindex,follow"') === false
        || substr_count($html, '<h1') !== 1
        || strpos($html, 'window.location.replace') !== false) {
        throw new RuntimeException("Invalid initial HTML for $path");
    }
}
ob_start();
speego_render_sourcing_headline_page();
$admin = ob_get_clean();
if (strpos($admin, 'Tìm chữ cần sửa') === false
    || strpos($admin, 'Mỹ phẩm') === false
    || substr_count($admin, 'class="speego-text-row"') < 50) {
    throw new RuntimeException('The Sourcing text editing screen is incomplete.');
}
$_SERVER['REQUEST_URI'] = '/wordpress_demo/fr/sourcing/';
$wp = (object) ['query_vars' => []];
speego_resolve_route_page($wp);
if ($wp->query_vars) throw new RuntimeException('Unknown language resolved to a page');
$GLOBALS['mockRoutes'] = [];
speego_seed_sourcing_pages();
speego_seed_sourcing_pages();
if (count($GLOBALS['createdPages']) !== 3 || count($GLOBALS['mockRoutes']) !== 3) {
    throw new RuntimeException('Sourcing seed must create three pages only once');
}
$_SERVER['REQUEST_URI'] = '/wordpress_demo/vi/tim-nguon-hang/';
ob_start();
include __DIR__ . '/../wordpress-theme/speego-logistics/front-page.php';
$legacyRedirect = ob_get_clean();
if (strpos($legacyRedirect, 'location.hash') === false
    || strpos($legacyRedirect, '/sourcing/') === false
    || strpos($legacyRedirect, 'location.replace(') === false) {
    throw new RuntimeException('Legacy Sourcing URL did not redirect to the canonical page.');
}
echo "Sourcing route and HTML smoke tests passed.\n";
