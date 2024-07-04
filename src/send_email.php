<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    if (empty($name) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid input. Please check your entries.";
        exit;
    }

    $recipient = "hr@rgbweb.studio";
    $subject = "New Webinar Registration";
    $email_content = "Name: $name\nPhone: $phone\nEmail: $email\n";
    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    echo "There was a problem with your submission. Please try again.";
}