<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$name = $data->name;
$home = $data->home;

$response = new stdClass();

$sql = "SELECT * FROM categories WHERE name = 'name'";
$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) > 0) {
    $response->success = false;
    $response->error = true;
    $response->message = 'Category name already in use.';
}
else {
    $sql = "INSERT INTO categories (name, home) VALUES ('$name', '$home')";
    $rst = mysqli_query($conn, $sql);

    $response->success = true;
    $response->error = false;
    $response->name = $name;
    $response->home = $home;
 }

echo json_encode($response);
