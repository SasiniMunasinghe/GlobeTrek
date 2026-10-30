<?php
header("Content-Type: application/json");
include 'db.php';

$result = $conn->query("SELECT * FROM admin_settings LIMIT 1");

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode([
        "admin_name" => "",
        "admin_email" => "",
        "notifications" => "on",
        "auto_confirm" => "no"
    ]);
}
?>