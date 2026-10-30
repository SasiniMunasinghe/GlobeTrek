document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});
const userIcon = document.getElementById("userIcon");
const dropdown = document.getElementById("dropdown");
const logoutBtn = document.getElementById("logoutBtn");

/* TOGGLE DROPDOWN */
userIcon.addEventListener("click", function(e) {
    e.preventDefault();

    if (dropdown.style.display === "flex") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "flex";
    }
});

/* LOGOUT */
logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();

    
    localStorage.clear();
    sessionStorage.clear();

    
    window.location.href = "../php/logout.php";
});

function loadDashboard() {

  fetch("../php/getReports.php")
    .then(res => res.json())
    .then(data => {

      console.log("DASHBOARD DATA:", data);

      document.getElementById("bookings").innerText = data.bookings || 0;
      document.getElementById("activePackages").innerText = data.activePackages || 0;
      document.getElementById("users").innerText = data.users || 0;
      document.getElementById("queries").innerText = data.queries || 0;

      document.getElementById("revenue").innerText = "LKR " + (data.revenue || 0);
      document.getElementById("topPackage").innerText = data.topPackage || "-";

    })
    .catch(err => {
      console.error("Dashboard error:", err);
    });
}