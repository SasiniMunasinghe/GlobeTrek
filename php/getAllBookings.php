<?php
include 'db.php';

header("Content-Type: application/json");

$bookings = [];

$result = $conn->query("
    SELECT b.*, p.title 
    FROM bookings b
    JOIN packages p ON b.package_id = p.id
");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

echo json_encode($bookings);
?>