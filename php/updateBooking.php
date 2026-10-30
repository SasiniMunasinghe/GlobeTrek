<?php
session_start();
header("Content-Type: application/json");
include 'db.php';


$id = $_POST['id'] ?? null;
$status = $_POST['status'] ?? null;


if (!$id || !$status) {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit;
}


if (
    !isset($_SESSION['user_role']) ||
    !in_array($_SESSION['user_role'], ['admin', 'staff'])
) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}


$stmt = $conn->prepare("UPDATE bookings SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Status updated"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}
?>