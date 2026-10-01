<?php
/** Keep legacy editable pages aligned with the checked-in Vercel layout. */

function speego_move_home_consultation_after_why($content)
{
    if (!preg_match('/<section\b[^>]*\bid="consultation-form"[^>]*>.*?<\/section>/is', $content, $consultation, PREG_OFFSET_CAPTURE)
        || !preg_match('/<section\b[^>]*\bid="news-speego"[^>]*>/i', $content, $news, PREG_OFFSET_CAPTURE)
        || $consultation[0][1] > $news[0][1]) {
        return $content;
    }

    $block = $consultation[0][0];
    $withoutBlock = substr_replace($content, '', $consultation[0][1], strlen($block));
    return preg_replace_callback(
        '/(?=<section\b[^>]*\bid="news-speego"[^>]*>)/i',
        function () use ($block) {
            return $block . "\n\n";
        },
        $withoutBlock,
        1
    );
}

function speego_align_legacy_pages_with_vercel()
{
    $version = '2026-10-01';
    if (get_option('speego_vercel_layout_version') === $version) {
        return;
    }

    $routes = [
        '#/home' => 'home',
        '#/en/home' => 'home',
        '#/es/inicio' => 'home',
        '#/about-us' => 'about',
        '#/en/about-us' => 'about',
        '#/es/about-us' => 'about',
    ];
    $definitions = speego_get_pages_definitions();
    foreach ($routes as $route => $kind) {
        $pages = get_posts([
            'post_type' => 'page',
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_key' => '_speego_route_hash',
            'meta_value' => $route,
        ]);
        if (!$pages || get_post_meta($pages[0]->ID, '_elementor_edit_mode', true) === 'builder') {
            continue;
        }

        $original = $pages[0]->post_content;
        $updated = $original;
        if ($kind === 'home') {
            $updated = speego_move_home_consultation_after_why($original);
        } elseif (strpos($original, 'about-intro-frame') !== false) {
            $file = get_template_directory() . '/explore/' . $definitions[$route]['file'];
            if (is_readable($file)) {
                $updated = preg_replace(
                    '#<script\b[^>]*>.*?window\.location\.replace\(.*?</script>#is',
                    '',
                    file_get_contents($file)
                );
            }
        }

        if ($updated === $original || !is_string($updated) || trim($updated) === '') {
            continue;
        }
        $backupKey = '_speego_content_backup_before_vercel_alignment_20261001';
        if (!metadata_exists('post', $pages[0]->ID, $backupKey)) {
            update_post_meta($pages[0]->ID, $backupKey, $original);
        }
        wp_update_post(['ID' => $pages[0]->ID, 'post_content' => $updated]);
    }

    update_option('speego_vercel_layout_version', $version, false);
}
add_action('init', 'speego_align_legacy_pages_with_vercel', 30);
