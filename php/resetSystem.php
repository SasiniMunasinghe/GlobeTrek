<?php
session_start();
header("Content-Type: application/json");
include 'db.php';


$conn->query("DELETE FROM bookings");

echo json_encode([
    "success" => true,
    "message" => "System reset complete"
]);
?>