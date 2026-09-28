const fs = require('fs');
const path = require('path');

const functionsPath = path.join(__dirname, '..', 'wordpress-theme', 'speego-logistics', 'functions.php');
let funcCode = fs.readFileSync(functionsPath, 'utf8');

// 1. Add About pages to speego_get_pages_definitions
const aboutDef = `        // About Us Pages (Tri-lingual)
        '#/about-us' => [
            'title' => 'Về SpeeGo (About Us)',
            'slug' => 'about-us',
            'file' => 'pages/about/vi-about.html',
            'lang' => 'vi',
        ],
        '#/en/about-us' => [
            'title' => 'About SpeeGo (EN)',
            'slug' => 'about-us-en',
            'file' => 'pages/about/en-about.html',
            'lang' => 'en',
        ],
        '#/es/about-us' => [
            'title' => 'Sobre SpeeGo (ES)',
            'slug' => 'about-us-es',
            'file' => 'pages/about/es-about.html',
            'lang' => 'es',
        ],

        // Sourcing Pages`;

if (!funcCode.includes("'#/about-us' =>")) {
  funcCode = funcCode.replace('        // Sourcing Pages', aboutDef);
}

// 2. Add About Submenu to Admin
const submenuTarget = `    // Submenu 2: Sourcing Headline
    add_submenu_page(
        'speego-manager',
        'Chỉnh tiêu đề Sourcing',
        'Chỉnh Sourcing',
        'edit_pages',
        'speego-sourcing-headline',
        'speego_render_sourcing_headline_page'
    );`;

const submenuReplacement = `    // Submenu 2: About Page Manager
    add_submenu_page(
        'speego-manager',
        'Quản lý Trang Về SpeeGo (About Us)',
        'Về SpeeGo (About)',
        'edit_pages',
        'speego-about-manager',
        'speego_render_about_manager_page'
    );

    // Submenu 3: Sourcing Headline
    add_submenu_page(
        'speego-manager',
        'Chỉnh tiêu đề Sourcing',
        'Chỉnh Sourcing',
        'edit_pages',
        'speego-sourcing-headline',
        'speego_render_sourcing_headline_page'
    );`;

if (!funcCode.includes('speego-about-manager')) {
  funcCode = funcCode.replace(submenuTarget, submenuReplacement);
}

// 3. Add speego_render_about_manager_page function before closing of admin views
const aboutRenderFunc = `
/**
 * Render About Page Manager in WP Admin
 */
function speego_render_about_manager_page()
{
    if (!current_user_can('edit_pages')) {
        wp_die('Bạn không có quyền truy cập trang này.');
    }

    $viAbout = speego_get_page_by_route('#/about-us');
    $enAbout = speego_get_page_by_route('#/en/about-us');
    $esAbout = speego_get_page_by_route('#/es/about-us');

    echo '<div class="wrap" style="max-width:1100px;">';
    echo '<h1 style="display:flex;align-items:center;gap:10px;"><span class="dashicons dashicons-groups" style="font-size:32px;width:32px;height:32px;"></span> Quản lý Trang Về SpeeGo (About Us)</h1>';

    echo '<div style="background:#fff;border:1px solid #ccd0d4;padding:20px;border-radius:8px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,.05);">';
    echo '<h2 style="margin-top:0;">1. Trạng thái & Chỉnh sửa trực tiếp trên WordPress</h2>';
    echo '<p style="color:#646970;">Trang About Us chứa đầy đủ nội dung giới thiệu SpeeGo, 6 trụ cột giá trị (Why SpeeGo), và form liên hệ/tư vấn. Bạn có thể bấm nút dưới đây để chỉnh sửa nội dung bằng trình soạn thảo của WordPress:</p>';

    echo '<table class="widefat striped" style="margin-top:15px;margin-bottom:20px;">';
    echo '<thead><tr><th>Ngôn ngữ</th><th>Tiêu đề Page trên WP</th><th>ID</th><th>Đường dẫn công khai</th><th>Hành động</th></tr></thead>';
    echo '<tbody>';

    $languages = [
        ['name' => 'Tiếng Việt (Mặc định)', 'flag' => '🇻🇳', 'page' => $viAbout, 'url' => home_url('/about-us/'), 'route' => '#/about-us'],
        ['name' => 'English (Tiếng Anh)', 'flag' => '🇺🇸', 'page' => $enAbout, 'url' => home_url('/about-us-en/'), 'route' => '#/en/about-us'],
        ['name' => 'Español (Tiếng Tây Ban Nha)', 'flag' => '🇪🇸', 'page' => $esAbout, 'url' => home_url('/about-us-es/'), 'route' => '#/es/about-us'],
    ];

    foreach ($languages as $lang) {
        $p = $lang['page'];
        echo '<tr>';
        echo '<td><strong>' . $lang['flag'] . ' ' . esc_html($lang['name']) . '</strong></td>';
        if ($p) {
            echo '<td>' . esc_html($p->post_title) . '</td>';
            echo '<td>#' . esc_html($p->ID) . '</td>';
            echo '<td><a href="' . esc_url($lang['url']) . '" target="_blank" style="text-decoration:none;">' . esc_html($lang['url']) . ' ↗</a></td>';
            echo '<td>';
            echo '<a href="' . esc_url(admin_url('post.php?post=' . $p->ID . '&action=edit')) . '" class="button button-primary" style="margin-right:8px;">✏️ Chỉnh sửa nội dung</a>';
            echo '<a href="' . esc_url($lang['url']) . '" target="_blank" class="button">👁️ Xem trang</a>';
            echo '</td>';
        } else {
            echo '<td colspan="3" style="color:#d63638;"><em>Chưa được tạo trong cơ sở dữ liệu</em></td>';
            echo '<td><a href="' . esc_url(admin_url('admin.php?page=speego-manager')) . '" class="button">Đến trang đồng bộ</a></td>';
        }
        echo '</tr>';
    }

    echo '</tbody></table>';
    echo '</div>';
    echo '</div>';
}
`;

if (!funcCode.includes('speego_render_about_manager_page')) {
  funcCode = funcCode.replace('function speego_render_sourcing_headline_page()', aboutRenderFunc + '\nfunction speego_render_sourcing_headline_page()');
}

fs.writeFileSync(functionsPath, funcCode, 'utf8');
console.log('Successfully updated wordpress-theme/speego-logistics/functions.php!');
