<?php
session_start();
include 'db.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name']);
$email = trim($data['email']);
$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("
UPDATE users
SET name=?, email=?
WHERE id=?
");

$stmt->bind_param("ssi",$name,$email,$user_id);

if($stmt->execute()){
    $_SESSION['user_name']=$name;
    $_SESSION['user_email']=$email;

    echo json_encode(["success"=>true]);
}else{
    echo json_encode([
      "success"=>false,
      "message"=>"Update failed"
    ]);
}
?>