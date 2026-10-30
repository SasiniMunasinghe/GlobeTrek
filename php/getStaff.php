<?php
include 'db.php';
header("Content-Type: application/json");

$staff = [];

$result = $conn->query("
    SELECT id, name, email, role, created_at
    FROM users
    WHERE role != 'customer'
");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $staff[] = $row;
    }
}

echo json_encode($staff);
?>