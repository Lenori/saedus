<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;
$title = $data->title;
$description = $data->description;
$tags = $data->tags;
$budget = number_format($data->budget, 2, ',', '.');

$response = new stdClass();

$sql = "UPDATE projects SET
            title = '$title',
            description = '$description',
            tags = '$tags',
            budget = '$budget'
        WHERE id = '$id'";

$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->error = false;

echo json_encode($response);
