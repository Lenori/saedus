<?php

// Always start this first
session_start();

require_once('db_conn.php');

if (isset($_POST['email']) && $_POST['password'] && $_POST['email'] == "patrick.jomaldini@yahoo.com") {

  $email = $_POST['email'];
  $password = md5($_POST['password']);

  $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
  $rst = mysqli_query($conn, $sql);

  if (mysqli_num_rows($rst) == 0) {
     echo "Wrong credentials. Try again.";
  }

  else {
      $_SESSION['user_id'] = $rst;

      header('Location: /admin/index.php');
  }
}
