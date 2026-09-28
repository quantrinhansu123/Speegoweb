<?php
require_once 'C:/xampp/htdocs/wordpress_demo/wp-load.php';

$posts = get_posts([
    'post_type' => 'page',
    'post_status' => ['publish', 'draft'],
    'numberposts' => -1
]);

echo "Total pages: " . count($posts) . PHP_EOL;
foreach ($posts as $p) {
    $h = get_post_meta($p->ID, '_speego_route_hash', true);
    echo "ID: {$p->ID} | slug: {$p->post_name} | hash: {$h} | title: {$p->post_title}" . PHP_EOL;
}
