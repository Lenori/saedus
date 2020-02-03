<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$response = new stdClass();

$sql = "SELECT
            a.*,
            count(b.id) AS bids_count
        FROM projects AS a
        INNER JOIN
             bids AS b
             ON b.project = a.id
        WHERE a.status = 0
        GROUP BY a.id";

$rst = mysqli_query($conn, $sql);

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

$response->success = true;
$response->projects = $data;
$response->error = false;

echo json_encode($response);
