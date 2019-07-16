<?php
$variables = [
    'ALLOWED_CALLING_URL' => 'https://flxbe.github.io/',
];
foreach ($variables as $key => $value) {
    putenv("$key=$value");
}
