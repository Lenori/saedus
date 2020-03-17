<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$creator = $data->creator;
$project = $data->project;

$response = new stdClass();

$sql = "SELECT
            *
        FROM
            reviews
        WHERE
            creator = '$creator' AND project = '$project'";
$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) == 0) {
    $response->success = false;
    $response->error = true;
    $response->message = 'Review not found.';
}
else {
    $data = mysqli_fetch_assoc($rst);
    $response->success = true;
    $response->error = false;
    $response->review = $data;
}

echo json_encode($response);
