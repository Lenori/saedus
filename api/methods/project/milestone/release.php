<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;
$prof = $data->prof;

$response = new stdClass();

$sql = "SELECT price FROM milestones WHERE id = '$id'";
$rst = mysqli_query($conn, $sql);

$price = mysqli_fetch_assoc($rst);
$value = intval(str_replace(',', '', $price['price']));

$sql = "UPDATE wallet SET value = value + '$value' WHERE user = '$prof'";
$rst = mysqli_query($conn, $sql);

$sql = "UPDATE milestones SET status = 1, released_date = now() WHERE id = '$id'";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
