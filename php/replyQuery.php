<?php
header("Content-Type: application/json");
include 'db.php';

$id = intval($_POST['id'] ?? 0);
$reply = trim($_POST['reply'] ?? '');

if (!$id || $reply === '') {
    echo json_encode([
        "success" => false,
        "message" => "Missing id or reply"
    ]);
    exit;
}

$stmt = $conn->prepare("UPDATE queries SET reply = ?, status = 'replied' WHERE id = ?");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("si", $reply, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Reply saved successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>