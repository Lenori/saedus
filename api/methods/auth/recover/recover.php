<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../access.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$email = $data->email;
$response = new stdClass();

$sql = "SELECT * FROM users WHERE email = '$email'";
$rstEmail = mysqli_query($conn, $sql);


if (mysqli_num_rows($rstEmail) == 0) {

    $response->success = false;
    $response->error = true;
    $response->message = 'E-mail not found.';

}
else {

    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $charactersLength; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    $sql = "UPDATE users SET
            password_recover_code = '$randomString'
            WHERE email = '$email'";

    $rst = mysqli_query($conn, $sql);

    // base_url is defined in access.php
    $mail_body = "
    <p>Greetings,</p>
    <p>Open the following link to recover your password:</p>
    <p>".$base_url."change-password?code=".$randomString."</p>
    <br/>
    <p>If you did not tried to recover your password, please ignore this e-mail.</p>
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
    $mail->Subject = 'Password Recovery';   //Sets the Subject of the message
    $mail->Body = $mail_body;       //An HTML or plain text message body
    if($mail->Send())        //Send an Email. Return true on success or false on error
    {
      $response->success = true;
      $response->message = 'Check your e-mail to recover your account.';
      $response->error = false;
    }
}

echo json_encode($response);
