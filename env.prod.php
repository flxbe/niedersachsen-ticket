<?php
$variables = [
    'APP_URL' => 'https://nst.codegewerk.de/',
];
foreach ($variables as $key => $value) {
    putenv("$key=$value");
}
