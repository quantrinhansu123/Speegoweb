<?php
/**
 * SpeeGo Logistics Theme Functions
 */

// 1. Resolve Route Pages & Direct Permalinks
function speego_resolve_route_page($wp)
{
    $requestPath = rawurldecode((string) wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $homePath = untrailingslashit((string) wp_parse_url(home_url('/'), PHP_URL_PATH));
    if ($homePath !== '' && strpos($requestPath, $homePath . '/') === 0) {
        $requestPath = substr($requestPath, strlen($homePath) + 1);
    } else {
        $requestPath = ltrim($requestPath, '/');
    }
    $requestPath = trim($requestPath, '/');

    if (empty($requestPath)) {
        return;
    }

    // Try finding page by direct path
    $page = get_page_by_path($requestPath, OBJECT, 'page');
    if ($page && get_post_meta($page->ID, '_speego_route_hash', true)) {
        $wp->query_vars = ['page_id' => $page->ID];
        return;
    }

    // Try finding page by leaf slug
    $segments = explode('/', $requestPath);
    $slug = end($segments);
    if ($slug) {
        $posts = get_posts([
            'post_type' => 'page',
            'name' => sanitize_title($slug),
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1
        ]);
        if ($posts && get_post_meta($posts[0]->ID, '_speego_route_hash', true)) {
            $wp->query_vars = ['page_id' => $posts[0]->ID];
        }
    }
}
add_action('parse_request', 'speego_resolve_route_page');

// 2. Fix Admin "View Page" / "Xem trang" permalinks to point to direct SPA route
function speego_page_link_fix($link, $post_id)
{
    if (is_admin() || wp_is_json_request()) {
        $route = get_post_meta($post_id, '_speego_route_hash', true);
        if ($route) {
            return home_url('/' . $route);
        }
    }
    return $link;
}
add_filter('page_link', 'speego_page_link_fix', 10, 2);

// 3. REST API Endpoint for Editable Content
function speego_editable_content($request)
{
    $partial = $request->get_param('partial');
    if ($partial) {
        $posts = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_content_key',
            'meta_value' => sanitize_key($partial),
        ]);
    } else {
        $route = (string) $request->get_param('route');
        $posts = get_posts([
            'post_type' => 'page',
            'post_status' => ['publish', 'draft'],
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $route,
        ]);
    }

    if (!$posts) {
        return new WP_Error('speego_content_not_found', 'Editable SpeeGo content not found.', ['status' => 404]);
    }

    $raw = $posts[0]->post_content;
    // Strip file:// offline redirection scripts
    $raw = preg_replace('#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is', '', $raw);
    // Strip Gutenberg HTML comment markers
    $raw = preg_replace('#<!--\s*/?wp:html\s*-->#i', '', $raw);
    $raw = trim($raw);

    return rest_ensure_response([
        'id' => $posts[0]->ID,
        'title' => $posts[0]->post_title,
        'content' => $raw,
    ]);
}

add_action('rest_api_init', function () {
    register_rest_route('speego/v1', '/content', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'speego_editable_content',
        'permission_callback' => '__return_true',
    ]);
});

// 4. Allow SVG, data-* attributes, and rich markup in SpeeGo pages
remove_filter('content_save_pre', 'wp_filter_post_kses');
remove_filter('content_filtered_save_pre', 'wp_filter_post_kses');

add_filter('wp_kses_allowed_html', function ($tags, $context) {
    if ($context === 'post') {
        foreach ($tags as $tag_name => &$tag_attrs) {
            if (is_array($tag_attrs)) {
                $tag_attrs['data-i18n'] = true;
                $tag_attrs['data-i18n-ph'] = true;
                $tag_attrs['data-nav'] = true;
                $tag_attrs['data-breadcrumb'] = true;
                $tag_attrs['data-variant'] = true;
                $tag_attrs['data-component'] = true;
                $tag_attrs['data-heading'] = true;
                $tag_attrs['data-subtext'] = true;
                $tag_attrs['data-phone'] = true;
                $tag_attrs['data-tag'] = true;
                $tag_attrs['data-target'] = true;
                $tag_attrs['data-lang'] = true;
                $tag_attrs['data-step'] = true;
                $tag_attrs['data-label'] = true;
                $tag_attrs['data-route-origin'] = true;
                $tag_attrs['data-page-route'] = true;
                $tag_attrs['data-section'] = true;
                $tag_attrs['data-cookie-choice'] = true;
                $tag_attrs['data-track-search-close'] = true;
                $tag_attrs['data-track-modal-close'] = true;
                $tag_attrs['data-origin'] = true;
                $tag_attrs['data-post-breadcrumb-slot'] = true;
            }
        }
        $tags['svg'] = ['class' => true, 'viewbox' => true, 'width' => true, 'height' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true, 'aria-hidden' => true, 'focusable' => true, 'style' => true];
        $tags['path'] = ['d' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true];
        $tags['circle'] = ['cx' => true, 'cy' => true, 'r' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true];
        $tags['line'] = ['x1' => true, 'y1' => true, 'x2' => true, 'y2' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true];
        $tags['polyline'] = ['points' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true];
        $tags['rect'] = ['x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true];
        $tags['polygon'] = ['points' => true, 'fill' => true, 'stroke' => true];
        $tags['template'] = ['id' => true];
    }
    return $tags;
}, 10, 2);


