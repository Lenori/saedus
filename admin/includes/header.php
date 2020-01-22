<?php

include('db_conn.php');

$sql = "SELECT * FROM users";
$rst = mysqli_query($conn, $sql);

$users = [];

while ($usersDB = mysqli_fetch_assoc($rst))
    $users[] = $usersDB;

$sql = "SELECT
            a.*,
            b.fname AS owner_fname,
            b.lname AS owner_lname,
            c.fname AS awarded_fname,
            c.lname AS awarded_lname
        FROM projects AS a
        INNER JOIN
            users AS b
        ON b.id = a.owner
        LEFT OUTER JOIN
            users AS c
        ON c.id = a.awarded";
$rst = mysqli_query($conn, $sql);

$projects = [];

while ($projDB = mysqli_fetch_assoc($rst))
    $projects[] = $projDB;

$sql = "SELECT
            a.*,
            b.fname AS user_fname,
            b.lname AS user_lname
        FROM bids AS a
        INNER JOIN
            users AS b
        ON b.id = a.user";
$rst = mysqli_query($conn, $sql);

$bids = [];

while ($bidsDB = mysqli_fetch_assoc($rst))
    $bids[] = $bidsDB;

$sql = "SELECT * FROM milestones";
$rst = mysqli_query($conn, $sql);

$milestones = [];

while ($milesDB = mysqli_fetch_assoc($rst))
    $milestones[] = $milesDB;

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Saedus Admin</title>

    <link href="css/style.css" rel="stylesheet">
    <link href="css/mobile-style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

</head>

<body>
