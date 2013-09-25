<?php
header('Content-type: application/json');

// Define some constants
define( "RECIPIENT_NAME", "John Smith" );
define( "RECIPIENT_EMAIL", "svinkle@gmail.com" );

// Read the form values
$success = false;
$senderName = isset( $_POST['senderName'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['senderName'] ) : "";
$senderEmail = isset( $_POST['senderEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['senderEmail'] ) : "";
$senderSubject = isset( $_POST['senderSubject'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['senderSubject'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $senderName && $senderEmail && $message ) {
    $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
    $headers = "From: " . $senderName . " <" . $senderEmail . ">";
    $text = "Name: " . $senderName . "\n\n" . "Email: " . $senderEmail . "\n\n" . $message;
    $success = mail( $recipient, $senderSubject, $text );
}

// Return an appropriate response to the browser
if ( isset($_GET['ajax']) ) {
    echo $success ? '{ "message": "success" }' : '{ "message": "error" }';
}
?>