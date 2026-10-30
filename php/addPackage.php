<?php
include "db.php";
header("Content-Type: application/json");

$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$price = $_POST['price'] ?? '';
$duration = $_POST['duration'] ?? '';

if (!isset($_FILES["image"])) {
    echo json_encode(["success" => false, "message" => "No image uploaded"]);
    exit;
}

$imageName = time() . "_" . basename($_FILES["image"]["name"]);
$tmp = $_FILES["image"]["tmp_name"];


$uploadDir = "../images/";


if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fullPath = $uploadDir . $imageName;


$dbPath = "images/" . $imageName;

if (move_uploaded_file($tmp, $fullPath)) {

    $stmt = $conn->prepare("
        INSERT INTO packages (title, description, price, duration, image)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->bind_param("sssss", $title, $description, $price, $duration, $dbPath);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => $stmt->error]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Image upload failed"]);
}
?>