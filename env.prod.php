<?php
$variables = [
    'ALLOWED_CALLING_URL' => 'https://nst2.codegewerk.de/',
];
foreach ($variables as $key => $value) {
    putenv("$key=$value");
}
