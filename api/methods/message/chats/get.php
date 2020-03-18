<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$user = $data->user;
$other = $data->other;

$response = new stdClass();

$sql = "SELECT
        `message`,
        `date`,
        `from`,
        `to`,
        u.fname AS from_fname,
        u.lname AS from_lname,
        u2.fname AS to_fname,
        u2.lname AS to_lname
        FROM messages
        INNER JOIN
            users AS u
            ON
            `from` = u.id
        INNER JOIN
            users AS u2
            ON
            `to` = u2.id
        WHERE (`from`='$user' AND `to`='$other') OR (`from`='$other' AND `to`='$user')";

$rst = mysqli_query($conn, $sql);

if($rst === FALSE) {
    die(mysqli_error());
}

$data = [];

while ($dataDB = mysqli_fetch_assoc($rst))
    $data[] = $dataDB;

$response->success = true;
$response->data = $data;
$response->error = false;

echo json_encode($response);
