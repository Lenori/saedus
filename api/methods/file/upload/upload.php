<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $_POST['id'];

$response = new stdClass();

if (move_uploaded_file($_FILES['file']['tmp_name'], '../../../resources/profile/avatar/' . $id .'.jpg')) {
    $response->success = true;
    $response->error = false;
} else {
    $response->success = false;
    $response->error = true;
    $response->message = $_FILES['file']['error'];
}

echo json_encode($response);
