<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$project = $data->project;
$status = $data->status;
$professional = $data->professional;
$bid = $data->bid;
$value = $data->value;

$response = new stdClass();

$sql = "UPDATE projects SET status = '$status', awarded = '$professional', price = '$value' WHERE id = '$project'";
$rst = mysqli_query($conn, $sql);

$sql = "UPDATE bids SET status = '$status' WHERE id = '$bid'";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
