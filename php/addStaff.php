<?php
include 'db.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$role = $data['role'] ?? 'staff';

if (!$name || !$email) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}


$plainPassword = bin2hex(random_bytes(4));
$hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);


$mustChange = 1;


$stmt = $conn->prepare("
    INSERT INTO users (name, email, password, role, must_change_password)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->bind_param("ssssi", $name, $email, $hashedPassword, $role, $mustChange);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "password" => $plainPassword
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed"
    ]);
}
?>