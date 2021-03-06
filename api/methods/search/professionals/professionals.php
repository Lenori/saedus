<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$term = $data->term;
$rating = intval($data->rating);
$price = intval($data->price);
$languages = $data->languages;
$cities = $data->cities;

if ($cities == []) $cities = NULL;
if ($languages == []) $languages = NULL;

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
            selectedLanguages AS l
            ON l.user = u.id
        LEFT OUTER JOIN
            reviews AS r
            ON r.user = u.id"
        .((isset($price) && $price != 0) || isset($cities) || isset($languages) ? " WHERE " : "")
        .($price != 0 ? "CAST(u.rate AS DECIMAL(10,2)) <= $price" : "").((isset($price) && $price != 0) && ( isset($cities) || isset($languages)) ? " AND " : "")
        .(isset($cities) ? "u.city IN('".join("','", $cities)."')" : "").(isset($cities) && isset($languages) ? " AND " : "")
        .(isset($languages) ? "l.lang IN('".join("','", $languages)."')" : "")
        ." GROUP BY u.id"
        .($rating != 0 ? " HAVING ROUND(AVG(r.grade)) >= $rating" : "");

#echo $sql;

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

        $sql = "SELECT *
                FROM users
                WHERE id = $id AND (fname LIKE '%$term%' OR lname LIKE '%$term%')";


        $rst = mysqli_query($conn, $sql);

        if (mysqli_num_rows($rst) == 0) {
            $sql = "SELECT
                        s.*,
                        c.id AS category_id,
                        c.name AS category_name
                    FROM selectedCategories AS s
                    INNER JOIN
                        categories AS c
                        ON c.id = s.category
                    LEFT OUTER JOIN
                        users AS u
                        ON s.user = u.id
                    WHERE c.name LIKE '%$term%' AND s.user = '$id'";

            $rst = mysqli_query($conn, $sql);

            if (mysqli_num_rows($rst) > 0) {
              while ($metaDB = mysqli_fetch_assoc($rst))
                  $meta[] = $metaDB;

              $prof[] = $meta;

              $data[] = $prof;
            }
        } else {
            $sql = "SELECT
                s.*,
                c.id AS category_id,
                c.name AS category_name
            FROM selectedCategories AS s
            INNER JOIN
                categories AS c
                ON c.id = s.category
            LEFT OUTER JOIN
                users AS u
                ON s.user = u.id
            WHERE s.user = '$id'";

            $rst = mysqli_query($conn, $sql);

            while ($metaDB = mysqli_fetch_assoc($rst))
              $meta[] = $metaDB;

            $prof[] = $meta;

            $data[] = $prof;
        }
    }

    $response->success = true;
    $response->data = $data;
    $response->total = $total;
    $response->error = false;

}

echo json_encode($response, true);
