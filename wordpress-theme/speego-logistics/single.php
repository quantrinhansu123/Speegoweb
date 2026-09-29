<?php
if (!have_posts()) {
    status_header(404);
    exit;
}
the_post();
$postId = get_the_ID();
$language = speego_post_language($postId);
$knowledgeRoutes = ['vi' => '#/knowledge', 'en' => '#/en/knowledge', 'es' => '#/es/knowledge'];
$routes = speego_public_route_urls();
$knowledgeUrl = $routes[$knowledgeRoutes[$language]];
$alternates = speego_post_alternates($postId);
$header = speego_localize_post_header(speego_shared_partial_html('header', $language), $language);
$themeBase = esc_url(trailingslashit(get_template_directory_uri() . '/explore'));
$homeJson = wp_json_encode(home_url('/'), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
$routesJson = wp_json_encode($routes, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
$alternatesJson = wp_json_encode($alternates, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
$routeJson = wp_json_encode($knowledgeRoutes[$language], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
$backLabel = ['vi' => 'Kiến thức', 'en' => 'Knowledge', 'es' => 'Conocimiento'][$language];
?>
<!doctype html>
<html lang="<?php echo esc_attr($language); ?>">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="<?php echo $themeBase; ?>assets/favicon-speego.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo $themeBase; ?>css/style.css">
  <link rel="stylesheet" href="<?php echo $themeBase; ?>css/speego-custom.css">
  <style>
    #breadcrumbSection { display: none; }
    .speego-post-main { min-height: 60vh; background: #fff; padding: 56px 20px 96px; }
    .speego-post-article { max-width: 840px; margin: 0 auto; color: #18364c; }
    .speego-post-back { color: #ed651b; font-weight: 700; text-decoration: none; }
    .speego-post-article h1 { color: #082b48; font: 800 clamp(2rem, 4vw, 3.5rem)/1.15 'Plus Jakarta Sans', Inter, sans-serif; margin: 28px 0 14px; }
    .speego-post-date { color: #687c8c; font-size: .9rem; margin-bottom: 32px; }
    .speego-post-content { font: 400 1.05rem/1.8 Inter, sans-serif; overflow-wrap: anywhere; }
    .speego-post-content h2, .speego-post-content h3 { color: #082b48; line-height: 1.3; margin: 1.7em 0 .6em; }
    .speego-post-content img, .speego-post-content video { max-width: 100%; height: auto; }
    .speego-post-content a { color: #e86418; }
    .speego-post-content blockquote { border-left: 4px solid #ed651b; margin-left: 0; padding-left: 20px; }
    .speego-post-footer { background: #04243d; color: #fff; padding: 30px 20px; text-align: center; }
    .speego-post-footer a { color: #fff; text-decoration: none; }
    .speego-post-footer a:hover { color: #ff7935; }
    @media (max-width: 767px) { .speego-post-main { padding-top: 32px; } }
  </style>
  <script>window.SPEEGO_WP_HOME=<?php echo $homeJson; ?>;window.SPEEGO_PUBLIC_ROUTES=<?php echo $routesJson; ?>;window.SPEEGO_POST_ALTERNATES=<?php echo $alternatesJson; ?>;window.speegoInitialRoute=<?php echo $routeJson; ?>;</script>
  <script defer src="<?php echo $themeBase; ?>js/wp-navigation.js?ver=1.2.4"></script>
  <?php wp_head(); ?>
</head>
<body <?php body_class('speego-native-post'); ?>>
<?php wp_body_open(); ?>
<div id="header-container"><?php echo $header; ?></div>
<main id="app-main" class="speego-post-main">
  <article <?php post_class('speego-post-article'); ?>>
    <a class="speego-post-back" href="<?php echo esc_url($knowledgeUrl); ?>">← <?php echo esc_html($backLabel); ?></a>
    <h1><?php echo esc_html(get_the_title()); ?></h1>
    <div class="speego-post-date"><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time></div>
    <div class="speego-post-content"><?php the_content(); ?></div>
  </article>
</main>
<footer class="speego-post-footer"><a href="<?php echo esc_url($routes[['vi' => '#/home', 'en' => '#/en/home', 'es' => '#/es/inicio'][$language]]); ?>">SpeeGo Logistics</a> · <?php echo esc_html($backLabel); ?></footer>
<script>
  (() => {
    const header = document.getElementById('masthead');
    const toggle = document.getElementById('mobileMenuOpen');
    const langButton = document.getElementById('speego-lang-toggle');
    const langList = document.getElementById('speego-lang-dropdown');
    const policyButton = document.getElementById('speegoPolicyToggle');
    const policyList = document.getElementById('speego-policy-dropdown');
    toggle?.addEventListener('click', () => {
      const open = header.classList.toggle('is-menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    langButton?.addEventListener('click', () => {
      const open = langList.classList.toggle('active');
      langButton.setAttribute('aria-expanded', String(open));
    });
    policyButton?.addEventListener('click', () => {
      const open = policyList.classList.toggle('is-open');
      policyButton.setAttribute('aria-expanded', String(open));
    });
  })();
</script>
<?php wp_footer(); ?>
</body>
</html>
