<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;
$premove = $data->premove;

$response = new stdClass();

if (isset($premove)) {

    $sql = "DELETE from portfolio WHERE id = '$premove' AND user = '$id'";
    $rst = mysqli_query($conn, $sql);

}

$response->success = true;
$response->error = false;

echo json_encode($response, true);
