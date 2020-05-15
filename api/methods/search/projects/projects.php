<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$response = new stdClass();

$sql = "SELECT *
        FROM projects
        WHERE status = 0";

$rst = mysqli_query($conn, $sql);

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

foreach ($data as $key => $value) {

    $project = $value["id"];

    $sql = "SELECT
            COUNT(*) as bids_count
            FROM bids
            WHERE project='$project'";

    $rst = mysqli_query($conn, $sql);

    $bids_count = mysqli_fetch_assoc($rst);

    $data[$key]["bids_count"] = $bids_count["bids_count"];
}

$response->success = true;
$response->projects = $data;
$response->error = false;

echo json_encode($response);
