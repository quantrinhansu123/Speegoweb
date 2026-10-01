<?php
/** Repair media paths and editor-added layout wrappers in legacy SpeeGo pages. */
function speego_prepare_managed_markup($markup)
{
    if (!is_string($markup) || $markup === '') {
        return $markup;
    }

    // The classic editor wraps layout comments in paragraphs. Inside a grid,
    // those empty paragraphs become extra columns and push the image below.
    $markup = preg_replace('~<p\b[^>]*>\s*(?:<!--.*?-->\s*)+</p>~is', '', $markup);

    // Vercel serves /explore/assets directly; WordPress keeps them in the theme.
    $assets = esc_url(untrailingslashit(get_template_directory_uri()) . '/explore/assets/');
    return preg_replace_callback('~(["\'])/explore/assets/~i', function ($match) use ($assets) {
        return $match[1] . $assets;
    }, $markup);
}

/** Restore the homepage clip when WordPress has removed its source element. */
function speego_restore_home_hero_video($markup)
{
    if (!is_string($markup) || strpos($markup, 'speego-hero-bg-video') === false) {
        return $markup;
    }

    $source = '<source src="' . esc_url(untrailingslashit(get_template_directory_uri())
        . '/explore/assets/hero-bg-video.mp4') . '" type="video/mp4">';

    return preg_replace_callback(
        '~(<video\b[^>]*\bspeego-hero-bg-video\b[^>]*>)(.*?)(</video>)~is',
        function ($match) use ($source) {
            $remaining = preg_replace('~<source\b[^>]*>(?:\s*</source>)?~is', '', $match[2]);
            return $match[1] . $source . $remaining . $match[3];
        },
        $markup,
        1
    );
}
