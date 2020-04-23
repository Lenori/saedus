<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$from = $data->from;
$to = $data->to;
$message = $data->message;

$response = new stdClass();

$sql = "INSERT INTO messages (`from`, `to`, message) VALUES ('$from', '$to', '$message')";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
