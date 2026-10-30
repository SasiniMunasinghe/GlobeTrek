<?php
include 'db.php';
header("Content-Type: application/json");

/* TOTAL BOOKINGS */
$total = $conn->query("SELECT COUNT(*) as count FROM bookings");
$totalCount = $total->fetch_assoc()['count'];

/* PENDING BOOKINGS */
$pending = $conn->query("SELECT COUNT(*) as count FROM bookings WHERE status='pending'");
$pendingCount = $pending->fetch_assoc()['count'];

/* CONFIRMED BOOKINGS */
$confirmed = $conn->query("SELECT COUNT(*) as count FROM bookings WHERE status='confirmed'");
$confirmedCount = $confirmed->fetch_assoc()['count'];

/* CANCELLED BOOKINGS */
$cancelled = $conn->query("SELECT COUNT(*) as count FROM bookings WHERE status='cancelled'");
$cancelledCount = $cancelled->fetch_assoc()['count'];

/* PACKAGES (NO STATUS NEEDED) */
$packages = $conn->query("SELECT COUNT(*) as count FROM packages");
$packagesCount = $packages->fetch_assoc()['count'];

/* CUSTOMER QUERIES */
$queries = $conn->query("SELECT COUNT(*) as count FROM queries WHERE status='new'");
$queriesCount = $queries->fetch_assoc()['count'];

echo json_encode([
  "bookings" => $totalCount,
  "pending" => $pendingCount,
  "confirmed" => $confirmedCount,
  "cancelled" => $cancelledCount,
  "activePackages" => $packagesCount, // Changed "packages" to "activePackages"
  "queries" => $queriesCount
]);
?>