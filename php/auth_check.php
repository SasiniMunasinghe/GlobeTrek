<?php
header("Content-Type: application/json");
session_start();

echo json_encode([
    "loggedIn" => isset($_SESSION['user_id']),
    "user" => $_SESSION['user_name'] ?? null,
    "user_id" => $_SESSION['user_id'] ?? null,
    "role" => $_SESSION['user_role'] ?? null
]);
exit;
?>