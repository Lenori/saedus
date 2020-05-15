<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$owner = $data->owner;
$title = $data->title;
$description = $data->description;
$tags = $data->tags;
$budget = number_format($data->budget, 2, ',', '.');

$response = new stdClass();

$sql = "INSERT INTO projects (owner, title, description, tags, budget) VALUES ('$owner', '$title', '$description', '$tags', '$budget')";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->id = $conn->insert_id;
$response->error = false;

echo json_encode($response);
