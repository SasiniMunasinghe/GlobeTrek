document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("userIcon");
    const dropdown = document.getElementById("dropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    if (userIcon && dropdown) {
        userIcon.addEventListener("click", (e) => {
            e.preventDefault();
            dropdown.style.display = (dropdown.style.display === "flex") ? "none" : "flex";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "../php/logout.php";
        });
    }

    loadStaffDashboard();
});

function loadStaffDashboard() {
    Promise.all([
        fetch("../php/staffDashboard.php", { credentials: "include" }),
        fetch("../php/getReports.php", { credentials: "include" })
    ])
    .then(async ([resDashboard, resReports]) => {
        const dashboardData = await resDashboard.json();
        const reportsData = await resReports.json();

        console.log("PHP Data Received:", dashboardData);

        // 1. Pending Bookings
        document.getElementById("pendingBookings").innerText = 
            dashboardData.pending || dashboardData.bookings || 0;

        // 2. Active Packages (Checks for both camelCase and under_score)
        document.getElementById("activePackages").innerText = 
            dashboardData.activePackages || dashboardData.active_packages || 0;

        // 3. Customer Queries
        document.getElementById("queries").innerText = 
            dashboardData.queries || 0;

        // 4. Completed Tours
        if (document.getElementById("completedTours")) {
            document.getElementById("completedTours").innerText = 
                reportsData.completed || reportsData.tours || 0;
        }
    })
    .catch(err => console.error("Dashboard load error:", err));
}