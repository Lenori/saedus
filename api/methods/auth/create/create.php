<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$email = $data->email;
$password = $data->password;
$fname = $data->fname;
$lname = $data->lname;
$add1 = $data->add1;
$add2 = $data->add2;
$city = $data->city;
$zip = $data->zip;

$response = new stdClass();

$sql = "SELECT * FROM users WHERE email = '$email'";
$rstEmail = mysqli_query($conn, $sql);

if (mysqli_num_rows($rstEmail) > 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'E-mail already in use.';

}

else {

    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $charactersLength; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    $sql = "INSERT INTO users (email, password, fname, lname, description, address1, address2, city, zip, email_confirmation_code) VALUES ('$email', '$password', '$fname', '$lname', 'Hi! Check my profile for more info.', '$add1', '$add2', '$city', '$zip', '$randomString')";
    $rst = mysqli_query($conn, $sql);

    $user = $conn->insert_id;

    $sql = "INSERT INTO wallet (user) VALUES ('$user')";
    $rst = mysqli_query($conn, $sql);

    $response->success = true;
    $response->id = $user;
    $response->error = false;


    // base_url is defined in access.php
    $mail_body = "
    <p>Greetings,</p>
    <p>Please confirm your e-mail by entering the follow link:</p>
    <p>".$base_url."confirm-email?code=".$randomString."</p>
    <br/>
    <p>Best Regards,<br />Epropers</p>
    ";
    require '../../email/phpmailer.php';
    $mail = new PHPMailer;
    $mail->IsSMTP();        //Sets Mailer to send message using SMTP
    $mail->Host = $smtp_host;  //Sets the SMTP hosts of your Email hosting, this for Godaddy
    $mail->Port = '25';        //Sets the default SMTP server port
    $mail->SMTPAuth = true;       //Sets SMTP authentication. Utilizes the Username and Password variables
    $mail->Username = $smtp_username;     //Sets SMTP username
    $mail->Password = $smtp_password;     //Sets SMTP password
    $mail->SMTPSecure = 'tls';       //Sets connection prefix. Options are "", "ssl" or "tls"
    $mail->From = 'info@epropers.com';   //Sets the From email address for the message
    $mail->FromName = 'Epropers';     //Sets the From name of the message
    $mail->AddAddress($email);  //Adds a "To" address
    $mail->WordWrap = 50;       //Sets word wrapping on the body of the message to a given number of characters
    $mail->IsHTML(true);       //Sets message type to HTML
    $mail->Subject = 'Email Verification';   //Sets the Subject of the message
    $mail->Body = $mail_body;       //An HTML or plain text message body

    $mail->Send();     //Send an Email. Return true on success or false on error
  }

echo json_encode($response);
