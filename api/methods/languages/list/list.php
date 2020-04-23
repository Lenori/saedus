<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");

$response = new stdClass();

$sql = "SELECT DISTINCT lang FROM selectedLanguages GROUP BY lang";

$rst = mysqli_query($conn, $sql);

if ($rst) {
  $data = [];

  while ($dataDB = mysqli_fetch_array($rst))
    $data[] = $dataDB['lang'];

  $response->success = true;
  $response->data = $data;
  $response->error = false;
} else {
  $response->success = false;
  $response->error = true;
}
echo json_encode($response);
