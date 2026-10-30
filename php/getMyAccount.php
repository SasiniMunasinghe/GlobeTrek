<?php
session_start();
include 'db.php';
header("Content-Type: application/json");

$user_id = $_SESSION['user_id'];

$userStmt = $conn->prepare("
    SELECT name,email,role
    FROM users
    WHERE id=?
");
$userStmt->bind_param("i",$user_id);
$userStmt->execute();
$user = $userStmt->get_result()->fetch_assoc();

$bookings = $conn->query("
    SELECT
      COUNT(*) total,
      SUM(status='pending') pending,
      SUM(status='confirmed') confirmed
    FROM bookings
    WHERE user_id=$user_id
")->fetch_assoc();

$messages = $conn->query("
    SELECT
      COUNT(*) total,
      SUM(reply IS NOT NULL) replied
    FROM queries
    WHERE user_id=$user_id
")->fetch_assoc();

echo json_encode([
  "user"=>$user,
  "bookings"=>$bookings,
  "messages"=>$messages
]);
?>