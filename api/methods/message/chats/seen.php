<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$from = $data->from;
$to = $data->to;

$response = new stdClass();

$sql = "UPDATE messages SET seen = 1 WHERE `from` = '$from' AND `to` = '$to'";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
