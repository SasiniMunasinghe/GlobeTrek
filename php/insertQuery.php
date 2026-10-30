<?php
session_start();
include 'db.php';
header("Content-Type: application/json");

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';


$user_id = $_SESSION['user_id'] ?? null;

if (!$name || !$email || !$message) {
    echo json_encode([
        "success" => false,
        "message" => "Missing fields"
    ]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO queries (user_id, name, email, message, status)
    VALUES (?, ?, ?, ?, 'new')
");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}


$stmt->bind_param("isss", $user_id, $name, $email, $message);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>