<?php
session_start();
header("Content-Type: application/json");
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Not logged in"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

$result = $conn->query("
    SELECT b.*, p.title 
    FROM bookings b
    JOIN packages p ON b.package_id = p.id
    WHERE b.user_id = $user_id
");

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$bookings = [];

while ($row = $result->fetch_assoc()) {
    $bookings[] = $row;
}

echo json_encode([
    "success" => true,
    "bookings" => $bookings
]);
?>