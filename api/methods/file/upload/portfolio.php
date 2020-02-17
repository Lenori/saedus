<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $_POST['id'];
$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

$sql = "INSERT INTO portfolio (user, ext) VALUES ('$id', '$ext')";
$rst = mysqli_query($conn, $sql);

$pic = $conn->insert_id;

$response = new stdClass();

if (move_uploaded_file($_FILES['file']['tmp_name'], '../../../resources/profile/portfolio/' . $pic .'.' . $ext .'')) {
    $response->success = true;
    $response->error = false;
} else {
    $response->success = false;
    $response->error = true;
    $response->message = $_FILES['file']['error'];
}

echo json_encode($response);
