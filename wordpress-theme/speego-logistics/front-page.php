<?php
$entry = file_get_contents(__DIR__ . '/explore/index.html');
if ($entry === false) {
    status_header(500);
    exit('SpeeGo app entry point is missing.');
}

status_header(200);

$base = esc_url(trailingslashit(get_template_directory_uri() . '/explore'));
$home = wp_json_encode(home_url('/'), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);

$queriedId = get_queried_object_id();
$routeHash = get_post_meta($queriedId, '_speego_route_hash', true);

if (!$routeHash) {
    if (is_front_page() || is_home()) {
        $routeHash = '#/home';
    }
}
$route = wp_json_encode($routeHash ?: '#/home', JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
$bridge = '<base href="' . $base . '"><script>window.SPEEGO_WP_HOME=' . $home . ';var speegoInitialRoute=' . $route . ';if(speegoInitialRoute&&(!window.location.hash||window.location.hash==="#"||window.location.hash==="#/")){window.location.hash=speegoInitialRoute;}document.addEventListener("click",function(event){const link=event.target.closest&&event.target.closest("a[href]");if(!link)return;const href=link.getAttribute("href");if(!href||href.startsWith("//")||href.startsWith("http://")||href.startsWith("https://")||href.startsWith("tel:")||href.startsWith("mailto:"))return;if(href==="/"||href==="/index.html"){event.preventDefault();window.location.hash=(window.location.hash.startsWith("#/en")?"#/en/home":(window.location.hash.startsWith("#/es")?"#/es/inicio":"#/home"));return;}if(href.startsWith("/#")){event.preventDefault();const id=href.slice(2);const targetHome=(window.location.hash.startsWith("#/en")?"#/en/home":(window.location.hash.startsWith("#/es")?"#/es/inicio":"#/home"));const el=document.getElementById(id);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});}else{try{sessionStorage.setItem("speegoScrollTo",id);}catch(_){}window.location.hash=targetHome;}return;}if(href.startsWith("#")){return;}},true);</script>';
$entry = preg_replace('/<head>/i', '<head>' . $bridge, $entry, 1);
echo $entry;
