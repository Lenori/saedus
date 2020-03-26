<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$id = $data->id;

$fname = $data->fname;
$lname = $data->lname;
$email = $data->email;
$add1 = $data->add1;
$add2 = $data->add2;
$city = $data->city;
$zip = $data->zip;
$pass = $data->password;
$description = $data->description;

$website = $data->website;
$facebook = $data->facebook;
$instagram = $data->instagram;
$twitter = $data->twitter;

if (isset($data->rate))
    $rate = number_format($data->rate, 2, ',', '');
else
    $rate = 0;

$ctitle = $data->ctitle;
$cdesc = $data->cdesc;
$cissuer = $data->cissuer;

$ltitle = $data->ltitle;

$categories = $data->categories;

$response = new stdClass();

if ($pass == 'NULL') {

    $sql = "UPDATE users SET
            fname = '$fname',
            lname = '$lname',
            email = '$email',
            address1 = '$add1',
            address2 = '$add2',
            city = '$city',
            zip = '$zip',
            description = '$description',
            rate = '$rate',
            website = '$website',
            facebook = '$facebook',
            instagram = '$instagram',
            twitter = '$twitter'
            WHERE id = '$id'";
}

else {

    $sql = "UPDATE users SET
            fname = '$fname',
            lname = '$lname',
            email = '$email',
            address1 = '$add1',
            address2 = '$add2',
            city = '$city',
            zip = '$zip',
            password = '$pass',
            description = '$description',
            rate = '$rate',
            website = '$website',
            facebook = '$facebook',
            instagram = '$instagram',
            twitter = '$twitter'
            WHERE id = '$id'";

}

$rst = mysqli_query($conn, $sql);

$sql = "DELETE FROM selectedCategories WHERE user = '$id'";
$rst = mysqli_query($conn, $sql);

foreach ($categories AS $cat) {

    $sql = "INSERT INTO selectedCategories (category, user) VALUES ('$cat', '$id')";
    $rst = mysqli_query($conn, $sql);

}

if ($ltitle <> NULL) {

    $sql = "INSERT INTO selectedLanguages (user, lang) VALUES ('$id', '$ltitle')";
    $rst = mysqli_query($conn, $sql);

}

$response->success = true;
$response->error = false;

echo json_encode($response, true);
