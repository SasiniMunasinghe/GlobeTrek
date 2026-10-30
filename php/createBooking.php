<?php
error_reporting(0);
ini_set('display_errors', 0);
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success"=>false,"message"=>"No JSON received"]);
    exit;
}

$user_id = $data['user_id'] ?? null;
$package_id = $data['package_id'] ?? null;
$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$phone = $data['phone'] ?? "";
$people = $data['people'] ?? null;
$notes = $data['notes'] ?? "";
$booking_date = $data['booking_date'] ?? null;

if (!$user_id || !$package_id || !$name || !$email || !$people || !$booking_date) {
    echo json_encode([
        "success"=>false,
        "message"=>"Missing fields"
    ]);
    exit;
}

$stmt = $conn->prepare("
INSERT INTO bookings 
(user_id, package_id, name, email, phone, people, notes, booking_date, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
");

$stmt->bind_param(
    "iisssiss",
    $user_id,
    $package_id,
    $name,
    $email,
    $phone,
    $people,
    $notes,
    $booking_date
);

if ($stmt->execute()) {
    echo json_encode([
        "success"=>true,
        "message"=>"Booking saved"
    ]);
} else {
    echo json_encode([
        "success"=>false,
        "message"=>$stmt->error
    ]);
}

exit;
?>