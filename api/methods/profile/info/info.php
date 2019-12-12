<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;

$response = new stdClass();

$sql = "SELECT * FROM users WHERE id = '$id'";
$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'User not found.';

}

else {

    $profile = mysqli_fetch_assoc($rst);

    $response->success = true;
    $response->data = $profile;
    $response->error = false;

    $sql = "SELECT
                a.*, u.fname AS creator_fname,
                u.lname AS creator_lname,
                p.title AS project_title
            FROM
                reviews AS a
            INNER JOIN
                users AS u ON u.id = a.creator
            INNER JOIN
                projects AS p ON p.id = a.project
            WHERE user = '$id'";
    $rst = mysqli_query($conn, $sql);

    $data = [];

    while ($dataDB = mysqli_fetch_assoc($rst))
        $data[] = $dataDB;

    $response->reviews = $data;
    $response->number_reviews = mysqli_num_rows($rst);

    $sql = "SELECT
                *
            FROM
                certificates
            WHERE user = '$id'";
    $rst = mysqli_query($conn, $sql);

    $data = [];

    while ($dataDB = mysqli_fetch_assoc($rst))
        $data[] = $dataDB;

    $response->certificates = $data;
    $response->number_certificates = mysqli_num_rows($rst);

}

echo json_encode($response);
