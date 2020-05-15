<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$code = $data->code;

$response = new stdClass();

$sql = "SELECT * FROM users WHERE email_confirmation_code = '$code'";
$rstEmail = mysqli_query($conn, $sql);

if (mysqli_num_rows($rstEmail) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'Confirmation recover code not found.';

}

else {
    $sql = "UPDATE users SET
            email_confirmation_code = 'CONFIRMED'
            WHERE email_confirmation_code = '$code'";

    $rst = mysqli_query($conn, $sql);

    $response->success = true;
    $response->message = 'Email confirmed with success!';
    $response->error = false;
}

echo json_encode($response);
