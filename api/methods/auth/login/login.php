<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$email = $data->email;
$password = $data->password;

$response = new stdClass();

$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'Invalid e-mail or password';

}

else {

    $customer = mysqli_fetch_assoc($rst);

    $response->success = true;
    $response->id = $customer['id'];
    $response->fname = $customer['fname'];
    $response->error = false;

}

echo json_encode($response);

$response = new stdClass();
