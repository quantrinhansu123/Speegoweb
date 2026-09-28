<?php
define('WP_USE_THEMES', false);
require_once 'C:/xampp/htdocs/wordpress_demo/wp-load.php';
$posts = get_posts(['post_type' => 'page', 'numberposts' => -1]);
foreach ($posts as $p) {
    $route = get_post_meta($p->ID, '_speego_route_hash', true);
    echo $p->ID . ' | ' . $p->post_title . ' | slug=' . $p->post_name . ' | route=' . $route . PHP_EOL;
}
