<?php
header("Content-Type: application/json");
session_start();
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request"
    ]);
    exit;
}

$email = $data['email'];
$password = $data['password'];


$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {

    if (password_verify($password, $user['password'])) {

        // SESSION
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['user_email'] = $user['email'];

        // force password change logic (STAFF + ADMIN)
        $forceChange = (
            ($user['role'] === 'staff' || $user['role'] === 'admin')
            && intval($user['must_change_password']) === 1
        );

        echo json_encode([
            "status" => "success",
            "name" => $user['name'],
            "role" => $user['role'],
            "email" => $user['email'],
            "forceChangePassword" => $forceChange,
            "redirect" => $forceChange ? "changePassword.html" : null
        ]);

        exit;

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Wrong password"
        ]);
        exit;
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
    exit;
}
