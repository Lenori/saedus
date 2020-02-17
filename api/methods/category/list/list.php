<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$list = $data->list;

$response = new stdClass();

if ($list == 'home')
    $sql = "SELECT * FROM categories WHERE home = 1 ORDER BY rand()";

else if ($list == 'all')
    $sql = "SELECT * FROM categories ORDER BY name";

$rst = mysqli_query($conn, $sql);

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

$response->success = true;
$response->data = $data;
$response->error = false;

echo json_encode($response);
