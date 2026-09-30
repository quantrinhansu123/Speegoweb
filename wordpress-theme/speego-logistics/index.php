<?php
if (is_404()) {
    require __DIR__ . '/404.php';
    return;
}
require __DIR__ . '/front-page.php';
