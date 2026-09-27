<?php
// Local visual comparison fixture for the Vercel Sourcing page shell.
$lang = isset($_GET['lang']) && in_array($_GET['lang'], ['vi', 'en', 'es'], true) ? $_GET['lang'] : 'vi';
$routes = ['vi' => '#/sourcing', 'en' => '#/en/sourcing', 'es' => '#/es/sourcing'];
$theme = dirname(__DIR__) . '/wordpress-theme/speego-logistics';
$reference = file_get_contents($theme . '/sourcing-reference/' . $lang . '.html');
preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', $reference, $match);

function get_post($id)
{
    global $match;
    return (object) ['ID' => $id, 'post_status' => 'publish', 'post_content' => trim($match[1])];
}
function get_post_meta($id, $key, $single = false)
{
    global $routes, $lang;
    return $key === '_speego_route_hash' ? $routes[$lang] : '1';
}
function get_template_directory_uri()
{
    return 'http://127.0.0.1:8765/wordpress-theme/speego-logistics';
}
function untrailingslashit($value) { return rtrim($value, '/'); }
function trailingslashit($value) { return rtrim($value, '/') . '/'; }
function home_url($path = '/') { return 'http://127.0.0.1:8765' . $path; }
function esc_url($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function wp_json_encode($value, $flags = 0) { return json_encode($value, $flags); }
function get_option($name) { return 1; }

require $theme . '/sourcing-reference.php';
echo speego_render_reference_sourcing($routes[$lang], 10);
