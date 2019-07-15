<?php

//echo "hello world";
header('Content-Type: application/json');
http_response_code(200);
header('Status: 200');
//echo '{"status":"ok"}';
echo json_encode(["status" => 200, "message" => "success"]);
