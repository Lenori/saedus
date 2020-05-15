<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$user = $data->user;

$response = new stdClass();
$wallet = new stdClass();

$sql = "SELECT * FROM wallet WHERE user = '$user'";
$rst = mysqli_query($conn, $sql);

$data = mysqli_fetch_assoc($rst);

$wallet->id = $data['id'];
$wallet->user = $data['user'];
$wallet->value = number_format($data['value']/100, 2, ',', '.');

$response->success = true;
$response->wallet = $wallet;
$response->error = false;

echo json_encode($response);
