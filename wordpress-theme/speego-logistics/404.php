<?php
status_header(404);
nocache_headers();

$path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
$language = preg_match('#^(vi|en|es)(?:/|$)#', $path, $matches) ? $matches[1] : 'en';
$copy = [
    'vi' => ['title' => 'Không tìm thấy trang', 'message' => 'Địa chỉ này không tồn tại hoặc đã được chuyển đi.', 'back' => 'Về trang chủ'],
    'en' => ['title' => 'Page not found', 'message' => 'This address does not exist or has moved.', 'back' => 'Back to homepage'],
    'es' => ['title' => 'Página no encontrada', 'message' => 'Esta dirección no existe o se ha trasladado.', 'back' => 'Volver al inicio'],
][$language];
$home = home_url('/' . $language . '/');
$logo = get_template_directory_uri() . '/explore/assets/speego-logo-dark.png';
?>
<!doctype html>
<html lang="<?php echo esc_attr($language); ?>">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title><?php echo esc_html($copy['title']); ?> | SpeeGo Logistics</title>
  <style>
    body{margin:0;background:#f7f9fb;color:#082b48;font:16px/1.6 Arial,sans-serif}
    header{background:#fff;border-bottom:1px solid #e5ebf0;padding:16px max(24px,calc((100vw - 1120px)/2))}
    header img{display:block;width:180px;max-width:100%;height:auto}
    main{box-sizing:border-box;min-height:70vh;max-width:760px;margin:auto;padding:100px 24px}
    .code{color:#ec601a;font-size:1rem;font-weight:700;letter-spacing:.08em}
    h1{font-size:clamp(2rem,5vw,3.25rem);line-height:1.15;margin:12px 0 20px}
    p{color:#536c7d;margin:0 0 28px}
    .button{display:inline-block;padding:12px 22px;border-radius:8px;background:#082b48;color:#fff;text-decoration:none;font-weight:700}
    .button:focus-visible{outline:3px solid #ec601a;outline-offset:3px}
  </style>
  <?php wp_head(); ?>
</head>
<body <?php body_class('speego-not-found'); ?>>
<?php wp_body_open(); ?>
<header><a href="<?php echo esc_url($home); ?>"><img src="<?php echo esc_url($logo); ?>" alt="SpeeGo Logistics"></a></header>
<main>
  <div class="code">404</div>
  <h1><?php echo esc_html($copy['title']); ?></h1>
  <p><?php echo esc_html($copy['message']); ?></p>
  <a class="button" href="<?php echo esc_url($home); ?>"><?php echo esc_html($copy['back']); ?></a>
</main>
<?php wp_footer(); ?>
</body>
</html>
