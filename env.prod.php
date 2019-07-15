<?php
$variables = [
    'APP_HOST' => '',
];
foreach ($variables as $key => $value) {
    putenv("$key=$value");
}
