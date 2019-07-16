<?php

// example: https://gist.github.com/james2doyle/33794328675a6c88edd6

if (file_exists('../env.php')) {
    include '../env.php';
}

$http_referer = $_SERVER['HTTP_REFERER'];

if ($http_referer) {
    if ($http_referer === getenv('ALLOWED_CALLING_URL')) {

        $post_data = file_get_contents('php://input');

        $decoded_post_data = (array) json_decode($post_data);
        print_r($decoded_post_data);

        file_put_contents('data.csv', dataToCsvLine($decoded_post_data), FILE_APPEND | LOCK_EX);

        http_response_code(200);

        //header('Content-Type: application/json');
        //http_response_code(200);
        //header('Status: 200');
        //echo '{"status":"ok"}';
        //echo json_encode(["status" => 200, "message" => "success"]);
    }
}

http_response_code(403);

function dataToCsvLine($data)
{
    return "\"" . $data['platform'] . "\", \"" . $data['userAgent'] . "\"\n";
}
