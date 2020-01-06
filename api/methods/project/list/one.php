<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;

$response = new stdClass();

$sql = "SELECT
            a.*
        FROM
            projects AS a
        WHERE
            id = '$id'";
$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'Project not found.';

}

else {

    $data = mysqli_fetch_assoc($rst);

    $response->success = true;
    $response->project = $data;
    $response->error = false;

    $owner = $data['owner'];

    $sql = "SELECT id AS owner_id, fname AS owner_fname, lname AS owner_lname FROM users WHERE id = '$owner'";
    $rst = mysqli_query($conn, $sql);

    $data = mysqli_fetch_assoc($rst);
    $response->owner = $data;


    $sql = "SELECT
            b.*,
            u.fname AS professional_fname,
            u.lname AS professional_lname,
            u.description AS professional_description
        FROM
            bids AS b
        INNER JOIN
            users AS u
        ON
            b.user = u.id
        WHERE
            project = '$id'";
    $rst = mysqli_query($conn, $sql);

    $data = [];

    $profiles = [];

    while ($dataDB = mysqli_fetch_assoc($rst))
        $profiles[] = $dataDB;

    foreach ($profiles as $prof) {

        $meta = [];
        $id = $prof['id'];

        $sql = "SELECT s.*, c.id AS category_id, c.name AS category_name FROM selectedCategories AS s INNER JOIN categories AS c ON c.id = s.category WHERE s.user = '$id'";
        $rst = mysqli_query($conn, $sql);

        while ($metaDB = mysqli_fetch_assoc($rst))
            $meta[] = $metaDB;

        $prof[] = $meta;
        $data[] = $prof;

    }

    $response->bids = $data;

}

echo json_encode($response);
