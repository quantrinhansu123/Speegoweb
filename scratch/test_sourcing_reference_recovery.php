<?php
// Check that a Visual Editor save cannot remove Sourcing's reference graphics.
function get_post($id) { return $GLOBALS['page']; }
function get_post_meta($id, $key, $single = false) {
    return $GLOBALS['meta'][$key] ?? '';
}
function get_template_directory_uri() { return 'https://example.test/wp-content/themes/speego-logistics'; }
function untrailingslashit($value) { return rtrim($value, '/'); }
function esc_url($value) { return $value; }
function esc_html($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
function wp_json_encode($value, $flags = 0) { return json_encode($value, $flags); }
function home_url($path = '/') { return 'https://example.test' . $path; }
function trailingslashit($value) { return rtrim($value, '/') . '/'; }
function get_option($key) { return $key === 'blog_public' ? 0 : null; }

require __DIR__ . '/../wordpress-theme/speego-logistics/sourcing-reference.php';

$reference = file_get_contents(__DIR__ . '/../wordpress-theme/speego-logistics/sourcing-reference/vi.html');
preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', $reference, $match);
$original = $match[1];
$referenceIconCount = substr_count($reference, '<svg');
$GLOBALS['meta'] = [
    '_speego_route_hash' => '#/sourcing',
    '_speego_sourcing_reference' => '1',
];
$GLOBALS['page'] = (object) ['ID' => 6, 'post_status' => 'publish', 'post_content' => $original];
$intact = speego_render_reference_sourcing('#/sourcing', 6);
preg_match('/<main\b[^>]*\bid="app-main"[^>]*>(.*?)<\/main>/is', $intact, $renderedMain);
$expectedMain = str_replace('/wp-content/themes/logistica/', get_template_directory_uri() . '/sourcing-reference/logistica/', $original);
$expectedMain = str_replace('/explore/', get_template_directory_uri() . '/explore/', $expectedMain);
$expectedMain = str_replace('https://speegologistic.com/', 'https://example.test/', $expectedMain);
if (substr_count($intact, '<svg') !== $referenceIconCount
    || strpos($intact, 'chất lượng toàn diện.') === false
    || $renderedMain[1] !== $expectedMain) {
    throw new RuntimeException('Intact reference content did not render.');
}

$damaged = preg_replace('/<svg\b.*?<\/svg>/is', '', $original);
$damaged = str_replace('<span class="text-orange">chất lượng toàn diện.</span>', '<span class="text-orange">Anh Công chỉnh</span>', $damaged);
$GLOBALS['page']->post_content = $damaged;
$recovered = speego_render_reference_sourcing('#/sourcing', 6);
if (substr_count($recovered, '<svg') !== $referenceIconCount
    || strpos($recovered, '<span class="text-orange">Anh Công chỉnh</span>') === false
    || substr_count($recovered, '<h1') !== 1) {
    throw new RuntimeException('Visual Editor damage was not recovered.');
}

$GLOBALS['meta']['_speego_sourcing_headline'] = 'Đã chỉnh an toàn';
$fieldEdited = speego_render_reference_sourcing('#/sourcing', 6);
if (strpos($fieldEdited, '<span class="text-orange">Đã chỉnh an toàn</span>') === false
    || substr_count($fieldEdited, '<svg') !== $referenceIconCount) {
    throw new RuntimeException('The dedicated headline field did not render.');
}

$entries = speego_sourcing_text_entries($original);
$productKey = null;
foreach ($entries as $key => $entry) {
    if ($entry['source'] === 'Mỹ phẩm') {
        $productKey = $key;
        break;
    }
}
if ($productKey === null || count($entries) < 50) {
    throw new RuntimeException('Text fields were not extracted from the reference.');
}
$GLOBALS['meta']['_speego_sourcing_text_overrides'] = [$productKey => 'Mỹ phẩm & chăm sóc <da>'];
$textEdited = speego_render_reference_sourcing('#/sourcing', 6);
if (strpos($textEdited, '>Mỹ phẩm &amp; chăm sóc &lt;da&gt;</h3>') === false
    || strpos($textEdited, '<h3 class="industry-card-title">Mỹ phẩm</h3>') !== false
    || substr_count($textEdited, '<svg') !== $referenceIconCount) {
    throw new RuntimeException('A plain-text edit damaged the reference layout.');
}

if (isset($argv[1])) {
    unset($GLOBALS['meta']['_speego_sourcing_headline']);
    unset($GLOBALS['meta']['_speego_sourcing_text_overrides']);
    $GLOBALS['page']->post_content = $argv[1] === '-'
        ? stream_get_contents(STDIN)
        : file_get_contents($argv[1]);
    $currentHeadline = speego_sourcing_headline_from_content($GLOBALS['page']->post_content);
    $liveRecovered = speego_render_reference_sourcing('#/sourcing', 6);
    if (substr_count($liveRecovered, '<svg') !== $referenceIconCount
        || $currentHeadline === ''
        || strpos($liveRecovered, '<span class="text-orange">' . esc_html($currentHeadline) . '</span>') === false) {
        throw new RuntimeException('The current WordPress page was not recovered.');
    }
}

echo "Sourcing reference recovery passed.\n";
