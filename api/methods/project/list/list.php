<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$owner = $data->owner;

$response = new stdClass();

$sql = "SELECT
            a.*,
            count(c.id) AS bids_count,
            b.fname AS professional_fname,
            b.lname AS professional_lname,
            b.description AS professional_description
        FROM projects AS a
        LEFT OUTER JOIN
             bids AS c
             ON c.project = a.id
        LEFT OUTER JOIN
             users AS b
             ON b.id = a.awarded
        WHERE owner = '$owner'
        GROUP BY a.id
        ORDER BY a.status";

$rst = mysqli_query($conn, $sql);

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

$response->success = true;
$response->projects = $data;
$response->error = false;

echo json_encode($response);
