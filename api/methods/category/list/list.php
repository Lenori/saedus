<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$list = $data->list;

$response = new stdClass();

$sql = "SELECT * FROM categories ORDER BY rand() LIMIT 8";
$rst = mysqli_query($conn, $sql);

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

$response->success = true;
$response->data = $data;
$response->error = false;

echo json_encode($response);
