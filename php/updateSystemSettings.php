<?php
session_start();
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$notifications = $data['notifications'] ?? "on";
$autoConfirm = $data['autoConfirm'] ?? "no";

$stmt = $conn->prepare("
    UPDATE admin_settings 
    SET notifications=?, auto_confirm=? 
    WHERE id=1
");

$stmt->bind_param("ss", $notifications, $autoConfirm);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}
?>