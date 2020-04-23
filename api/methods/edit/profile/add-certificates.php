<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;
$ctitle = $data->ctitle;
$cdesc = $data->cdesc;
$cissuer = $data->cissuer;

$response = new stdClass();

if ($ctitle <> NULL AND $cdesc <> NULL AND $cissuer <> NULL) {
    $sql = "INSERT INTO certificates (user, title, description, issuer) VALUES ('$id', '$ctitle', '$cdesc', '$cissuer')";
    $rst = mysqli_query($conn, $sql);

    $response->id = $conn->insert_id;
    $response->success = true;
    $response->error = false;
} else {
    $response->success = false;
    $response->error = true;
    $response->message = "Missing information in new certificate.";
}


echo json_encode($response, true);
