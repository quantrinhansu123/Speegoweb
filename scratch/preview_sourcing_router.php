<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$prefix = '/wordpress-theme/speego-logistics/explore/';
if (strpos($path, $prefix) === 0) {
    $relative = substr($path, strlen($prefix));
    $file = realpath(__DIR__ . '/../explore/' . $relative);
    $root = realpath(__DIR__ . '/../explore');
    if ($file && strpos($file, $root . DIRECTORY_SEPARATOR) === 0 && is_file($file)) {
        $types = ['css' => 'text/css', 'js' => 'application/javascript', 'jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', 'svg' => 'image/svg+xml'];
        header('Content-Type: ' . ($types[strtolower(pathinfo($file, PATHINFO_EXTENSION))] ?? 'application/octet-stream'));
        readfile($file);
        return true;
    }
}
return false;
