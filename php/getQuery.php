<?php
header("Content-Type: application/json");
include 'db.php';

$sql = "SELECT id, user_id, name, email, message, status, created_at FROM queries ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$queries = [];

while ($row = $result->fetch_assoc()) {
    $queries[] = $row;
}

echo json_encode($queries);
?>