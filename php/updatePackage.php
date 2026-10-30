<?php
include "db.php";
header("Content-Type: application/json");

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];
$duration = $_POST['duration'];


if (!empty($_FILES['image']['name'])) {

    $imageName = time() . "_" . basename($_FILES["image"]["name"]);
    $tmp = $_FILES["image"]["tmp_name"];
    $targetPath = "../images/" . $imageName;

    if (move_uploaded_file($tmp, $targetPath)) {

        $stmt = $conn->prepare("
            UPDATE packages 
            SET title=?, description=?, price=?, duration=?, image=? 
            WHERE id=?
        ");

        $stmt->bind_param(
            "sssssi",
            $title,
            $description,
            $price,
            $duration,
            $targetPath,
            $id
        );

    } else {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }

} else {

   
    $stmt = $conn->prepare("
        UPDATE packages 
        SET title=?, description=?, price=?, duration=? 
        WHERE id=?
    ");

    $stmt->bind_param(
        "ssssi",
        $title,
        $description,
        $price,
        $duration,
        $id
    );
}

$stmt->execute();

echo json_encode(["success" => true]);
?>