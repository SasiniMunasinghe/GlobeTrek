<?php
include 'db.php';
header("Content-Type: application/json");

$result = $conn->query("SELECT * FROM destinations");

$data = [];

while ($row = $result->fetch_assoc()) {

    $data[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "slug" => $row["slug"],
        "description" => $row["description"],
        "image" => $row["image"],
        "mapImage" => $row["mapImage"],
        "bestTime" => $row["bestTime"],
        "activities" => json_decode($row["activities"], true) ?? [],
        "tips" => json_decode($row["tips"], true) ?? [],
        "facts" => json_decode($row["facts"], true) ?? []
    ];
}

echo json_encode($data);
?>