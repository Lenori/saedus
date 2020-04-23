<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$creator = $data->creator;
$user = $data->user;
$project = $data->project;
$review = $data->review;
$grade = $data->grade;

$response = new stdClass();

$sql = "INSERT INTO reviews (creator, user, project, review, grade) VALUES ('$creator', '$user', '$project', '$review', '$grade')";
$rst = mysqli_query($conn, $sql);

$response->success = true;
$response->id = $conn->insert_id;
$response->error = false;

echo json_encode($response);
