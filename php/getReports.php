<?php
session_start();
header("Content-Type: application/json");
include 'db.php';

$response = [
    "bookings" => 0,
    "revenue" => 0,
    "topPackage" => "-",
    "queries" => 0,
    "monthly" => [],
    "users" => 0,
    "activePackages" => 0
];


$result = $conn->query("SELECT COUNT(*) AS total FROM bookings");

if ($result && $row = $result->fetch_assoc()) {
    $response["bookings"] = (int)$row['total'];
}


$pkgResult = $conn->query("SELECT COUNT(*) AS total FROM packages");

if ($pkgResult && $row = $pkgResult->fetch_assoc()) {
    $response["activePackages"] = (int)$row['total'];
}



$userResult = $conn->query("SELECT COUNT(*) AS total FROM users");

if ($userResult && $row = $userResult->fetch_assoc()) {
    $response["users"] = (int)$row['total'];
}


$revenueResult = $conn->query("
    SELECT SUM(p.price * b.people) AS revenue
    FROM bookings b
    JOIN packages p ON b.package_id = p.id
");

if ($revenueResult && $row = $revenueResult->fetch_assoc()) {
    $response["revenue"] = (float)($row['revenue'] ?? 0);
}


$topPackageResult = $conn->query("
    SELECT p.title, COUNT(*) AS count
    FROM bookings b
    JOIN packages p ON b.package_id = p.id
    GROUP BY b.package_id
    ORDER BY count DESC
    LIMIT 1
");

if ($topPackageResult && $row = $topPackageResult->fetch_assoc()) {
    $response["topPackage"] = $row['title'] ?? "-";
}


$tableCheck = $conn->query("SHOW TABLES LIKE 'contact'");

if ($tableCheck && $tableCheck->num_rows > 0) {
    $q = $conn->query("SELECT COUNT(*) AS total FROM contact WHERE status='pending'");

    if ($q && $row = $q->fetch_assoc()) {
        $response["queries"] = (int)$row['total'];
    }
}


for ($i = 5; $i >= 0; $i--) {
    $month = date("Y-m", strtotime("-$i months"));

    $result = $conn->query("
        SELECT COUNT(*) AS total
        FROM bookings
        WHERE DATE_FORMAT(booking_date, '%Y-%m') = '$month'
    ");

    $count = 0;

    if ($result && $row = $result->fetch_assoc()) {
        $count = $row['total'] ?? 0;
    }

    $response["monthly"][] = (int)$count;
}

echo json_encode($response);
?>