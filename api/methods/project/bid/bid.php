<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$project = $data->id;
$professional = $data->user;
$value = number_format($data->value, 2, ',', '.');
$proposal = $data->proposal;

$response = new stdClass();

$sql = "INSERT INTO bids (project, user, bid, proposal) VALUES ('$project', '$professional', '$value', '$proposal')";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
