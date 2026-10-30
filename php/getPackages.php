<?php

include "db.php";

header('Content-Type: application/json');

$sql = "SELECT * FROM packages";
$result = $conn->query($sql);

$packages = [];

if ($result) {

    while ($row = $result->fetch_assoc()) {

        
        $packages[] = [
            "id" => $row["id"] ?? null,
            "title" => $row["title"] ?? "",
            "description" => $row["description"] ?? "",
            "price" => $row["price"] ?? 0,
            "duration" => $row["duration"] ?? "",
            "image" => $row["image"] ?? ""
        ];
    }

}

echo json_encode($packages);
exit;
?>