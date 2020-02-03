<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;
$lremove = $data->lremove;

$response = new stdClass();

if (isset($lremove)) {

    $sql = "DELETE from selectedLanguages WHERE id = '$lremove' AND user = '$id'";
    $rst = mysqli_query($conn, $sql);

}

$response->success = true;
$response->error = false;

echo json_encode($response, true);
