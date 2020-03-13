<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$term = $data->term;

if (!isset($term) || trim($term) === '') {
  $term = '%';
}

$response = new stdClass();

$sql = "SELECT
            u.*,
            COUNT(r.id) AS number_reviews,
            ROUND(AVG(r.grade)) AS avg_review
        FROM users AS u
        LEFT OUTER JOIN
            reviews AS r
            ON r.user = u.id
        GROUP BY u.id";

$rst = mysqli_query($conn, $sql);

if (mysqli_num_rows($rst) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'No results found.';

}

else {

    $total = mysqli_num_rows($rst);

    $data = [];

    $profiles = [];

    while ($dataDB = mysqli_fetch_assoc($rst))
        $profiles[] = $dataDB;

    foreach ($profiles as $prof) {

        $meta = [];
        $id = $prof['id'];

        $sql = "SELECT
                    s.*,
                    c.id AS category_id,
                    c.name AS category_name
                FROM selectedCategories AS s
                INNER JOIN
                    categories AS c
                    ON c.id = s.category
                WHERE s.user = '$id' AND c.name LIKE '$term'";

        $rst = mysqli_query($conn, $sql);

        while ($metaDB = mysqli_fetch_assoc($rst))
            $meta[] = $metaDB;

        $prof[] = $meta;
        $data[] = $prof;

    }

    $response->success = true;
    $response->data = $data;
    $response->total = $total;
    $response->error = false;

}

echo json_encode($response, true);
