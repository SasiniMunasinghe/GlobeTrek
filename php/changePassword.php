<?php
session_start();
include 'db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

/* CHECK LOGIN */
if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Not logged in"
    ]);

    exit;
}

/* VALIDATE PASSWORD */
if (
    !$data ||
    !isset($data['password']) ||
    empty($data['password'])
) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid password"
    ]);

    exit;
}

$userId = $_SESSION['user_id'];

/* GET USER ROLE */
$getRole = $conn->prepare("SELECT role FROM users WHERE id = ?");
$getRole->bind_param("i", $userId);
$getRole->execute();

$result = $getRole->get_result();
$user = $result->fetch_assoc();

$role = $user['role'] ?? 'user';

/* HASH PASSWORD */
$newPass = password_hash($data['password'], PASSWORD_DEFAULT);

/* UPDATE PASSWORD */
$stmt = $conn->prepare("
    UPDATE users
    SET password = ?, must_change_password = 0
    WHERE id = ?
");

$stmt->bind_param("si", $newPass, $userId);

/* RESPONSE */
if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Password updated",
        "role" => $role
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Update failed"
    ]);
}
?>