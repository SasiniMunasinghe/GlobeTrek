<?php
include "db.php";
session_start();
header("Content-Type: application/json");


if (!isset($_SESSION['user_role']) || strtolower($_SESSION['user_role']) !== 'admin') {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

// validate ID
if (!isset($_POST['id']) || empty($_POST['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing ID"
    ]);
    exit;
}

$id = intval($_POST['id']);

$stmt = $conn->prepare("DELETE FROM packages WHERE id=?");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Package deleted successfully"
    ]);

} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}
?>