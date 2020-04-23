<?php

$conn = mysqli_connect(

    "18.224.180.162",
    "saedus",
    "8aC]2&~LV#4gq",
    "saedus"

);

if (mysqli_connect_errno())
    echo "DB Connection failure: " . mysqli_connect_error();

mysqli_set_charset($conn, "utf8");
date_default_timezone_set("America/Toronto");

?>
